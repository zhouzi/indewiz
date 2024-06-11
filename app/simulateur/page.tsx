/* eslint-disable react/no-unescaped-entities */

"use client";

import { FunctionComponent, useEffect, useReducer, useState } from "react";
import { produce } from "immer";

import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/ui/number-input";
import { Collapsible } from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, TrendingDown, TrendingUp } from "lucide-react";
import { calculerME } from "@/lib/calculerME";
import { calculerEURL } from "@/lib/calculerEURL";
import { cn } from "@/lib/utils";

import { calculerSASU } from "@/lib/calculerSASU";
import { Shadow } from "@/components/ui/shadow";
import {
  SimulateurActions,
  SimulateurContainer,
  SimulateurContent,
  SimulateurDescription,
  SimulateurQuestion,
  SimulateurQuestionCounter,
} from "@/components/ui/simulateur";
import { formatNumber } from "@/lib/formatNumber";
import { InlineNumberInput } from "@/components/ui/inline-number-input";

type StepId = "nature" | "ca" | "rémunération" | "résultat";

interface StepProps {
  goToStep: (step: StepId) => void;
  patchState: (patch: Partial<State>) => void;
  state: State;
}

const steps = {
  nature: ({ goToStep }) => (
    <>
      <Progress value={100 / 3} />
      <SimulateurContainer>
        <SimulateurContent>
          <SimulateurQuestionCounter>Question 1/3</SimulateurQuestionCounter>
          <SimulateurQuestion>Qu'est-ce que tu vends ?</SimulateurQuestion>
          <SimulateurDescription>
            La nature de ton activité détermine les avantages dont tu bénéficies
            en micro-entreprise.
          </SimulateurDescription>
          <RadioGroup defaultValue="libérale">
            <RadioGroupItem value="libérale">Des services</RadioGroupItem>
            <RadioGroupItem value="commerciale" disabled>
              Des marchandises (bientôt)
            </RadioGroupItem>
          </RadioGroup>
        </SimulateurContent>
        <SimulateurActions>
          <Button onClick={() => goToStep("ca")}>Question suivante</Button>
        </SimulateurActions>
      </SimulateurContainer>
    </>
  ),
  ca: ({ goToStep, patchState, state }) => (
    <>
      <Progress value={100 / 2} />
      <SimulateurContainer>
        <SimulateurContent>
          <SimulateurQuestionCounter>Question 2/3</SimulateurQuestionCounter>
          <SimulateurQuestion>
            Quel chiffre d'affaires prévois-tu de réaliser cette année ?
          </SimulateurQuestion>
          <SimulateurDescription>
            La micro-entreprise devient désavantageuse lorsque ton chiffre
            d'affaires se développe.
          </SimulateurDescription>
          <NumberInput
            onChange={(value) => patchState({ ca: value })}
            value={state.ca}
            afterIcon="€/an"
          />
        </SimulateurContent>
        <SimulateurActions>
          <Button variant="ghost" onClick={() => goToStep("nature")}>
            Question précédente
          </Button>
          <Button onClick={() => goToStep("rémunération")}>
            Question suivante
          </Button>
        </SimulateurActions>
      </SimulateurContainer>
    </>
  ),
  rémunération: ({ goToStep, patchState, state }) => (
    <>
      <Progress value={100 / 1} />
      <SimulateurContainer>
        <SimulateurContent>
          <SimulateurQuestionCounter>Question 3/3</SimulateurQuestionCounter>
          <SimulateurQuestion>
            De combien as-tu besoin pour vivre tous les mois ?
          </SimulateurQuestion>
          <SimulateurDescription>
            Adapter ta rémunération à ton besoin réel permet de réaliser des
            économies.
          </SimulateurDescription>
          <NumberInput
            onChange={(value) => patchState({ rémunération: value })}
            value={state.rémunération}
            afterIcon="€/mois"
          />
        </SimulateurContent>
        <SimulateurActions>
          <Button variant="ghost" onClick={() => goToStep("ca")}>
            Question précédente
          </Button>
          <Button onClick={() => goToStep("résultat")}>Voir le résultat</Button>
        </SimulateurActions>
      </SimulateurContainer>
    </>
  ),
  résultat: function StepRésultat({ goToStep, patchState, state }) {
    const [{ me, eurl, sasu, stale }, setState] = useState(() => ({
      me: calculerME({
        nature: "libérale",
        ca: state.ca,
      }),
      eurl: calculerEURL({
        nature: "libérale",
        ca: state.ca,
        rémunération: state.rémunération,
      }),
      sasu: calculerSASU({
        ca: state.ca,
        rémunération: state.rémunération,
      }),
      stale: false,
    }));

    useEffect(() => {
      setState((currentState) => ({
        ...currentState,
        stale: true,
      }));
      const timeoutId = setTimeout(() => {
        setState({
          me: calculerME({
            nature: "libérale",
            ca: state.ca,
          }),
          eurl: calculerEURL({
            nature: "libérale",
            ca: state.ca,
            rémunération: state.rémunération,
          }),
          sasu: calculerSASU({
            ca: state.ca,
            rémunération: state.rémunération,
          }),
          stale: false,
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    }, [state.ca, state.rémunération]);

    const groups = [
      {
        title: "Micro-entreprise",
        titleSuffix: "(situation actuelle)",
        différence: null,
        compteBancairePro: [
          { label: "Chiffre d'affaires", value: state.ca },
          { label: "Virement vers compte perso", value: -me.revenu - me.ir },
          { label: "Cotisations", value: -me.cotisations },
        ],
        compteBancairePerso: [
          { label: "Virement depuis compte pro", value: me.revenu + me.ir },
          { label: "Impôt sur le revenu", value: -me.ir },
        ],
      },
      {
        title: "EURL",
        titleSuffix: null,
        différence: Math.round(
          ((eurl.revenu + eurl.trésorerie) / me.revenu - 1) * 100,
        ),
        compteBancairePro: [
          { label: "Chiffre d'affaires", value: state.ca },
          {
            label: "Virement vers compte perso",
            value: -eurl.revenu - eurl.ir,
          },
          { label: "Cotisations", value: -eurl.cotisations },
          { label: "Impôt sur les sociétés", value: -eurl.is },
        ],
        compteBancairePerso: [
          { label: "Virement depuis compte pro", value: eurl.revenu + eurl.ir },
          { label: "Impôt sur le revenu", value: -eurl.ir },
        ],
      },
      {
        title: "SASU",
        titleSuffix: null,
        différence: Math.round(
          ((sasu.revenu + sasu.trésorerie) / me.revenu - 1) * 100,
        ),
        compteBancairePro: [
          { label: "Chiffre d'affaires", value: state.ca },
          {
            label: "Virement vers compte perso",
            value: -sasu.revenu - sasu.ir,
          },
          { label: "Cotisations", value: -sasu.cotisations },
          { label: "Impôt sur les sociétés", value: -sasu.is },
        ],
        compteBancairePerso: [
          { label: "Virement depuis compte pro", value: sasu.revenu + sasu.ir },
          { label: "Impôt sur le revenu", value: -sasu.ir },
        ],
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
                <Button onClick={() => goToStep("nature")}>
                  Relance le simulateur
                </Button>
              </div>
            </div>
            <SimulateurDescription>
              Avec un chiffre d'affaires de{" "}
              <InlineNumberInput
                onChange={(value) => patchState({ ca: value })}
                value={state.ca}
                afterIcon="€/an"
              />{" "}
              et une rémunération nette de
              <InlineNumberInput
                onChange={(value) => patchState({ rémunération: value })}
                value={state.rémunération}
                afterIcon="€/mois"
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
                          [
                            ...group.compteBancairePro,
                            ...group.compteBancairePerso,
                          ].reduce(
                            (acc, transaction) => acc + transaction.value,
                            0,
                          ),
                        )}{" "}
                        €/an{" "}
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
                              Compte bancaire pro
                            </TableHead>
                            <TableHead className="text-right">
                              {formatNumber(
                                group.compteBancairePro.reduce(
                                  (acc, transaction) => acc + transaction.value,
                                  0,
                                ),
                              )}{" "}
                              €/an
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {group.compteBancairePro.map((transaction) => (
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
                              Compte bancaire perso
                            </TableHead>
                            <TableHead className="text-right">
                              {formatNumber(
                                group.compteBancairePerso.reduce(
                                  (acc, transaction) => acc + transaction.value,
                                  0,
                                ),
                              )}{" "}
                              €/an
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {group.compteBancairePerso.map((transaction) => (
                            <TableRow key={transaction.label}>
                              <TableCell>{transaction.label}</TableCell>
                              <TableCell className="text-right">
                                {formatNumber(transaction.value)} €/an
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
            <Button onClick={() => goToStep("nature")}>
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
  ca: number;
  rémunération: number;
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
  step: "nature",
  ca: 77700,
  rémunération: 2500,
};

export default function Simulateur() {
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
