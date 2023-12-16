/* eslint-disable react/no-unescaped-entities */

"use client";

import { FunctionComponent, useReducer, useState } from "react";
import { produce } from "immer";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { Shadow } from "@/components/ui/shadow";
import {
  SimulateurActions,
  SimulateurContainer,
  SimulateurContent,
  SimulateurDescription,
  SimulateurQuestion,
  SimulateurQuestionCounter,
} from "@/components/ui/simulateur";
import { NumberInput } from "@/components/ui/number-input";
import { Pen, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible } from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculerIntêrêts } from "@/lib/calculerIntêrêts";
import { calculerIS } from "@/lib/calculerIS";
import { formatNumber } from "@/lib/formatNumber";
import { InlineNumberInput } from "@/components/ui/inline-number-input";

type StepId = "yearlyInvestment" | "duration" | "résultat";

interface StepProps {
  goToStep: (step: StepId) => void;
  patchState: (patch: Partial<State>) => void;
  state: State;
}

const steps = {
  yearlyInvestment: ({ goToStep, patchState, state }) => (
    <>
      <Progress value={100 / 3} />
      <SimulateurContainer>
        <SimulateurContent>
          <SimulateurQuestionCounter>Question 1/2</SimulateurQuestionCounter>
          <SimulateurQuestion>
            Combien souhaites-tu investir tous les ans ?
          </SimulateurQuestion>
          <SimulateurDescription>
            Il s'agit de la part des bénéfices que tu réalises chaque année que
            tu aimerais investir dans un compte-titres.
          </SimulateurDescription>
          <NumberInput
            onChange={(value) => patchState({ yearlyInvestment: value })}
            value={state.yearlyInvestment}
            afterIcon="€/an"
            min={0}
          />
        </SimulateurContent>
        <SimulateurActions>
          <Button onClick={() => goToStep("duration")}>
            Question suivante
          </Button>
        </SimulateurActions>
      </SimulateurContainer>
    </>
  ),
  duration: ({ goToStep, patchState, state }) => (
    <>
      <Progress value={100 / 1} />
      <SimulateurContainer>
        <SimulateurContent>
          <SimulateurQuestionCounter>Question 2/2</SimulateurQuestionCounter>
          <SimulateurQuestion>
            Dans combien d'années aimerais-tu sortir l'argent ?
          </SimulateurQuestion>
          <SimulateurDescription>
            Tes placements en bourse génèrent des intérêts qui se décuplent au
            fil des années.
          </SimulateurDescription>
          <NumberInput
            onChange={(value) => patchState({ duration: value })}
            value={state.duration}
            afterIcon="an(s)"
            min={0}
            max={100}
          />
        </SimulateurContent>
        <SimulateurActions>
          <Button variant="ghost" onClick={() => goToStep("yearlyInvestment")}>
            Question précédente
          </Button>
          <Button onClick={() => goToStep("résultat")}>Voir le résultat</Button>
        </SimulateurActions>
      </SimulateurContainer>
    </>
  ),
  résultat: function StepRésultat({ goToStep, patchState, state }) {
    const [stale, setStale] = useState(false);

    const ctoParticulier = calculerIntêrêts({
      yearlyInvestment: state.yearlyInvestment * 0.7,
      duration: state.duration,
      yearlyInterestRate: state.yearlyInterestRate,
    });
    const ctoParticulierInstantFinalReturns = [
      {
        label: "Montant total investit",
        value: ctoParticulier.invested,
      },
      { label: "Plus value", value: ctoParticulier.interests },
      {
        label: "Flat tax sur plus value",
        value: -Math.round(ctoParticulier.interests * 0.3),
      },
    ];
    const ctoParticulierInstantFinalReturnsTotal =
      ctoParticulierInstantFinalReturns.reduce(
        (acc, transaction) => acc + transaction.value,
        0,
      );

    const ctoSociété = calculerIntêrêts({
      yearlyInvestment: state.yearlyInvestment,
      duration: state.duration,
      yearlyInterestRate: state.yearlyInterestRate,
    });
    const ctoSociétéInstantFinalReturns = [
      {
        label: "Montant total investit",
        value: ctoSociété.invested,
      },
      { label: "Plus value", value: ctoSociété.interests },
      {
        label: "IS sur plus value",
        value: -calculerIS({ bénéfices: ctoSociété.interests }).is,
      },
      {
        label: "Flat tax sur dividendes",
        value: -Math.round(
          (ctoSociété.invested +
            (ctoSociété.interests -
              calculerIS({ bénéfices: ctoSociété.interests }).is)) *
            0.3,
        ),
      },
    ];
    const ctoSociétéInstantFinalReturnsTotal =
      ctoSociétéInstantFinalReturns.reduce(
        (acc, transaction) => acc + transaction.value,
        0,
      );

    const groups = [
      {
        title: "CTO Particulier",
        titleSuffix: null,
        différence: null,
        yearlyInvestment: [
          { label: "Bénéfices à investir", value: state.yearlyInvestment },
          {
            label: "Flat tax sur dividendes",
            value: -(state.yearlyInvestment * 0.3),
          },
        ],
        finalReturns: ctoParticulierInstantFinalReturns,
      },
      {
        title: "CTO Société",
        titleSuffix: "(sortie instantanée)",
        différence: Math.round(
          (ctoSociétéInstantFinalReturnsTotal /
            ctoParticulierInstantFinalReturnsTotal -
            1) *
            100,
        ),
        yearlyInvestment: [
          { label: "Bénéfices à investir", value: state.yearlyInvestment },
        ],
        finalReturns: ctoSociétéInstantFinalReturns,
      },
    ];

    return (
      <>
        <Progress value={100 / 1} />
        <SimulateurContainer>
          <SimulateurContent>
            <div className="mb-2 flex items-center">
              <h2 className="text-3xl font-bold flex-1">Résultat</h2>
              <div className="hidden md:block">
                <Button onClick={() => goToStep("yearlyInvestment")}>
                  Relance le simulateur
                </Button>
              </div>
            </div>
            <SimulateurDescription>
              En investissant{" "}
              <InlineNumberInput
                value={state.yearlyInvestment}
                onChange={(value) =>
                  patchState({
                    yearlyInvestment: value,
                  })
                }
                afterIcon="€/an"
              />{" "}
              sur{" "}
              <InlineNumberInput
                value={state.duration}
                onChange={(value) => patchState({ duration: value })}
                afterIcon="ans"
              />{" "}
              et une performance de{" "}
              <InlineNumberInput
                value={state.yearlyInterestRate * 100}
                onChange={(value) =>
                  patchState({
                    yearlyInterestRate: value / 100,
                  })
                }
                afterIcon="%/an"
              />
            </SimulateurDescription>
            <div className={cn("flex gap-2 flex-col", stale && "opacity-40")}>
              {groups.map((group) => (
                <Collapsible
                  key={group.title}
                  trigger={
                    <span className="flex flex-col md:flex-row md:gap-2">
                      <span className="md:flex-1 md:text-xl md:font-medium">
                        {group.title}{" "}
                        {!!group.titleSuffix && (
                          <small className="text-sm font-normal text-text-300">
                            {group.titleSuffix}
                          </small>
                        )}
                      </span>
                      <span className="flex items-center gap-1 text-xl font-medium">
                        <span className="text-text-300 font-normal hidden md:inline">
                          Résultat
                        </span>{" "}
                        {formatNumber(
                          group.finalReturns.reduce(
                            (acc, transaction) => acc + transaction.value,
                            0,
                          ),
                        )}{" "}
                        €{" "}
                        {group.différence == null ? (
                          <span className="inline-flex items-center gap-1 md:w-[60px]" />
                        ) : (
                          <span className="inline-flex items-center gap-1 md:w-[60px]">
                            {group.différence >= 0 ? (
                              <>
                                <span className="bg-positive-50 text-positive-500 rounded-full p-1">
                                  <TrendingUp size={16} />
                                </span>
                                <span className="text-text-300 text-sm">
                                  +{group.différence}%
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="bg-negative-50 text-negative-500 rounded-full p-1">
                                  <TrendingDown size={16} />
                                </span>
                                <span className="text-text-300 text-sm">
                                  {group.différence}%
                                </span>
                              </>
                            )}
                          </span>
                        )}
                      </span>
                    </span>
                  }
                  content={
                    <>
                      <Table className="mb-10">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-full">
                              Montant annuel investit
                            </TableHead>
                            <TableHead className="text-right">
                              {formatNumber(
                                group.yearlyInvestment.reduce(
                                  (acc, transaction) => acc + transaction.value,
                                  0,
                                ),
                              )}{" "}
                              €/an
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {group.yearlyInvestment.map((transaction) => (
                            <TableRow key={transaction.label}>
                              <TableCell>{transaction.label}</TableCell>
                              <TableCell className="text-right">
                                {formatNumber(transaction.value)} €/an
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Table className="mb-10">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-full">
                              Valeur finale
                            </TableHead>
                            <TableHead className="text-right">
                              {formatNumber(
                                group.finalReturns.reduce(
                                  (acc, transaction) => acc + transaction.value,
                                  0,
                                ),
                              )}{" "}
                              €
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {group.finalReturns.map((transaction) => (
                            <TableRow key={transaction.label}>
                              <TableCell>{transaction.label}</TableCell>
                              <TableCell className="text-right">
                                {formatNumber(transaction.value)} €
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </>
                  }
                />
              ))}
            </div>
          </SimulateurContent>
          <SimulateurActions className="md:hidden">
            <Button onClick={() => goToStep("yearlyInvestment")}>
              Relance le simulateur
            </Button>
          </SimulateurActions>
        </SimulateurContainer>
      </>
    );
  },
} satisfies Record<StepId, FunctionComponent<StepProps>>;

interface State {
  step: StepId;
  yearlyInvestment: number;
  duration: number;
  yearlyInterestRate: number;
}

type Action =
  | { type: "goToStep"; step: StepId }
  | { type: "patchState"; patch: Partial<State> };

function reducer(draft: State, action: Action) {
  switch (action.type) {
    case "patchState":
      Object.assign(draft, action.patch);
      return draft;
    case "goToStep":
      draft.step = action.step;
      return draft;
    default:
      return draft;
  }
}

const initialState: State = {
  step: "yearlyInvestment",
  yearlyInvestment: 10000,
  duration: 30,
  yearlyInterestRate: 0.12,
};

export default function CTO() {
  const [state, dispatch] = useReducer(produce(reducer), initialState);
  const Step = steps[state.step];

  return (
    <>
      <Shadow />
      <Step
        goToStep={(step: StepId) => dispatch({ type: "goToStep", step })}
        patchState={(patch: Partial<State>) =>
          dispatch({ type: "patchState", patch })
        }
        state={state}
      />
    </>
  );
}
