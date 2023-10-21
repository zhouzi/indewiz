/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import { FormOption } from "@/components/ui/form-option";
import { NumberInput } from "@/components/ui/number-input";
import { Stepper } from "@/components/ui/stepper";
import { calculerEURL } from "@/lib/calculerEURL";
import { calculerME } from "@/lib/calculerME";
import { produce } from "immer";
import { FunctionComponent, useEffect, useReducer, useState } from "react";
import { Collapsible } from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styles from "./simulateur.module.css";
import { TrendingDown, TrendingUp } from "lucide-react";

type StepId = "nature" | "ca" | "rémunération" | "résultat";

const steps = {
  nature: ({ goToStep }) => (
    <>
      <h2 className="text-3xl font-medium mb-2">Qu'est-ce que tu vends ?</h2>
      <p className="text-secondary mb-9">
        En micro-entreprise tu paies plus ou moins de cotisations selon le type
        de ton activité.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <FormOption variant="selected">Des services</FormOption>
        <FormOption disabled>Des marchandises (bientôt)</FormOption>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-20 items-center">
        <Button className="w-full sm:w-auto" onClick={() => goToStep("ca")}>
          Suivant
        </Button>
      </div>
    </>
  ),
  ca: ({ goToStep, state, patchState }) => (
    <>
      <h2 className="text-3xl font-medium mb-2">
        Quel chiffre d'affaires tu prévois de réaliser cette année ?
      </h2>
      <p className="text-secondary mb-9">
        À partir d'un certain montant de chiffre d'affaires un changement de
        statut peut te faire gagner de l'argent.
      </p>
      <NumberInput
        onChange={(value) => patchState({ ca: value })}
        value={state.ca}
        placeholder="0"
        afterIcon="€/an"
      />
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-20 items-center">
        <Button
          className="w-full sm:w-auto"
          onClick={() => goToStep("nature")}
          variant="ghost"
        >
          Précédent
        </Button>
        <Button
          className="w-full sm:w-auto "
          onClick={() => goToStep("rémunération")}
        >
          Suivant
        </Button>
      </div>
    </>
  ),
  rémunération: ({ goToStep, state, patchState }) => (
    <>
      <h2 className="text-3xl font-medium mb-2">
        De quel montant net tu as besoin pour vivre par mois ?
      </h2>
      <p className="text-secondary mb-9">
        Tu peux payer moins de charges sociales en fonction du revenu que tu te
        verses.
      </p>
      <NumberInput
        onChange={(value) => patchState({ rémunération: value })}
        value={state.rémunération}
        placeholder="0"
        afterIcon="€/mois"
      />
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-20 items-center">
        <Button
          className="w-full sm:w-auto"
          onClick={() => goToStep("ca")}
          variant="ghost"
        >
          Précédent
        </Button>
        <Button
          className="w-full sm:w-auto"
          onClick={() => goToStep("résultat")}
        >
          Voir le résultat
        </Button>
      </div>
    </>
  ),
  résultat: function StepRésultat({ goToStep, state, patchState }) {
    const [{ microEntreprise, eurl }, setState] = useState(() => ({
      microEntreprise: calculerME({
        nature: "libérale",
        ca: state.ca,
      }),
      eurl: calculerEURL({
        nature: "libérale",
        ca: state.ca,
        rémunération: state.rémunération,
      }),
    }));

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setState({
          microEntreprise: calculerME({
            nature: "libérale",
            ca: state.ca,
          }),
          eurl: calculerEURL({
            nature: "libérale",
            ca: state.ca,
            rémunération: state.rémunération,
          }),
        });
      }, 250);
      return () => clearTimeout(timeoutId);
    }, [state.ca, state.rémunération]);

    const eurlDifférence = Math.round(
      ((eurl.revenu + eurl.trésorerie) / microEntreprise.revenu - 1) * 100
    );

    return (
      <>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-3xl font-medium flex-1">Résultats</h2>
          <Button onClick={() => goToStep("nature")}>
            Relance la simulation
          </Button>
        </div>
        <p className="mb-12 text-secondary">
          En te versant une rémunération net de {state.rémunération} €/mois.
        </p>
        <Collapsible
          className="mb-6"
          trigger={
            <>
              <span className="flex-1">
                <span className="text-lg font-medium">Micro-entreprise</span>{" "}
                <span className="text-secondary text-sm block md:inline">
                  (situation actuelle)
                </span>
              </span>
              <span className="text-lg font-medium">
                {microEntreprise.revenu} €/an
              </span>
            </>
          }
          content={
            <>
              <Table className="mb-12">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-full">Entrées</TableHead>
                    <TableHead className="text-right">
                      {microEntreprise.revenu} €/an
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Revenu</TableCell>
                    <TableCell className="text-right">
                      {microEntreprise.revenu} €/an
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-full">Sorties</TableHead>
                    <TableHead className="text-right">
                      {microEntreprise.cotisations + microEntreprise.ir} €/an
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Cotisations</TableCell>
                    <TableCell className="text-right">
                      {microEntreprise.cotisations} €/an
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Impôt sur le revenu</TableCell>
                    <TableCell className="text-right">
                      {microEntreprise.ir} €/an
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          }
        />
        <Collapsible
          trigger={
            <>
              <span className="flex-1">
                <span className="text-lg font-medium">EURL</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg font-medium">
                  {eurl.revenu + eurl.trésorerie} €/an
                </span>
                <span className="inline-flex">
                  {eurlDifférence >= 0 ? (
                    <>
                      <span className="bg-positive-light text-positive-dark rounded-full p-1">
                        <TrendingUp size={16} />
                      </span>
                      <span className="text-secondary ml-1">
                        +{eurlDifférence}%
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="bg-negative-light text-negative-dark rounded-full p-1">
                        <TrendingDown size={16} />
                      </span>
                      <span className="text-secondary ml-1">
                        {eurlDifférence}%
                      </span>
                    </>
                  )}
                </span>
              </span>
            </>
          }
          content={
            <>
              <Table className="mb-12">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-full">Entrées</TableHead>
                    <TableHead className="text-right">
                      {eurl.revenu + eurl.trésorerie} €/an
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Revenu</TableCell>
                    <TableCell className="text-right">
                      {eurl.revenu} €/an
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Trésorerie</TableCell>
                    <TableCell className="text-right">
                      {eurl.trésorerie} €/an
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-full">Sorties</TableHead>
                    <TableHead className="text-right">
                      {eurl.cotisations + eurl.ir + eurl.is} €/an
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Cotisations</TableCell>
                    <TableCell className="text-right">
                      {eurl.cotisations} €/an
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Impôt sur le revenu</TableCell>
                    <TableCell className="text-right">{eurl.ir} €/an</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Impôt sur les sociétés</TableCell>
                    <TableCell className="text-right">{eurl.is} €/an</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          }
        />
      </>
    );
  },
} satisfies Record<
  StepId,
  FunctionComponent<{
    state: State;
    goToStep: (step: StepId) => void;
    patchState: (patch: Partial<State>) => void;
  }>
>;

type State = {
  step: StepId;
  ca: number;
  rémunération: number;
};

type Action =
  | { type: "goToStep"; step: StepId }
  | { type: "patchState"; patch: Partial<State> };

const initialState: State = {
  step: "nature",
  ca: 77700,
  rémunération: 2500,
};

function reducer(draft: State, action: Action) {
  switch (action.type) {
    case "goToStep": {
      draft.step = action.step;
      return draft;
    }
    case "patchState": {
      Object.assign(draft, action.patch);
      return draft;
    }
    default:
      return draft;
  }
}

export default function Simulateur() {
  const [state, dispatch] = useReducer(produce(reducer), initialState);

  const stepsList = Object.entries(steps);
  const currentStepIndex = stepsList.findIndex(([id]) => id === state.step);
  const [, Step] = stepsList[currentStepIndex];

  // The last step is the result which is not a question
  const totalQuestions = stepsList.length - 1;
  const currentQuestion = currentStepIndex + 1;

  return (
    <>
      <div className={styles.shadow} />
      <Stepper
        progress={Array.from({ length: stepsList.length - 1 }).map(
          (_, index) => index < currentQuestion
        )}
      />
      <main className="max-w-7xl m-auto py-28 px-4">
        <p className="text-secondary text-sm mb-4">
          {currentQuestion <= totalQuestions ? (
            <>
              Question {currentQuestion}/{totalQuestions}
            </>
          ) : (
            <>&nbsp;</>
          )}
        </p>
        <Step
          state={state}
          goToStep={(step: StepId) =>
            dispatch({ type: "goToStep", step: step })
          }
          patchState={(patch: Partial<State>) =>
            dispatch({ type: "patchState", patch })
          }
        />
      </main>
    </>
  );
}
