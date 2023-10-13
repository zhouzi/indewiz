/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import { FormOption } from "@/components/ui/form-option";
import { Graph } from "@/components/ui/graph";
import { NumberInput } from "@/components/ui/number-input";
import { Stepper } from "@/components/ui/stepper";
import { calculerEURL } from "@/lib/calculerEURL";
import { calculerME } from "@/lib/calculerME";
import { produce } from "immer";
import { TrendingDown, TrendingUp } from "lucide-react";
import { FunctionComponent, useEffect, useReducer, useState } from "react";

type StepId = "nature" | "ca" | "rémunération" | "résultat";

const steps = {
  nature: ({ goToStep }) => (
    <>
      <h2 className="text-3xl font-bold mb-4">Qu'est-ce que tu vends ?</h2>
      <p className="text-secondary mb-9">
        En micro-entreprise tu paies plus ou moins de cotisations selon le type
        de ton activité.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <FormOption variant="selected">Des services</FormOption>
        <FormOption disabled>Des marchandises (bientôt)</FormOption>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-20">
        <Button className="w-full sm:w-auto" onClick={() => goToStep("ca")}>
          Suivant
        </Button>
      </div>
    </>
  ),
  ca: ({ goToStep, state, patchState }) => (
    <>
      <h2 className="text-3xl font-bold mb-4">
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
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-20">
        <Button
          className="w-full sm:w-auto"
          onClick={() => goToStep("nature")}
          variant="secondary"
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
      <h2 className="text-3xl font-bold mb-4">
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
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-20">
        <Button
          className="w-full sm:w-auto"
          onClick={() => goToStep("ca")}
          variant="secondary"
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

    const différence = eurl.revenu + eurl.trésorerie - microEntreprise.revenu;

    return (
      <div className="flex gap-20">
        <div>
          <h2 className="text-xl mb-4">Changement de statut</h2>
          {différence > 0 ? (
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-positive-light text-positive-dark inline-flex p-3">
                <TrendingUp size={16} />
              </span>{" "}
              +{différence}€/an en EURL
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-negative-light text-negative-dark inline-flex p-3">
                <TrendingDown size={16} />
              </span>{" "}
              -{différence}€/an en EURL
            </div>
          )}
          <Button onClick={() => goToStep("nature")} className="mt-20">
            Relance le simulateur
          </Button>
        </div>
        <div className="flex-1">
          <div>
            <h2>En micro-entreprise</h2>
            <div className="flex justify-center">
              <Graph
                greens={[
                  {
                    label: "Revenu",
                    value: microEntreprise.revenu,
                    color: "#63CC3D",
                  },
                ]}
                reds={[
                  {
                    label: "Cotisations",
                    value: microEntreprise.cotisations,
                    color: "#99312E",
                  },
                  { label: "IR", value: microEntreprise.ir, color: "#E5605C" },
                ]}
              />
            </div>
          </div>
          <div>
            <h2>En EURL</h2>
            <div className="flex justify-center">
              <Graph
                greens={[
                  { label: "Revenu", value: eurl.revenu, color: "#63CC3D" },
                  {
                    label: "Trésorerie",
                    value: Math.max(0, eurl.trésorerie),
                    color: "#4A992E",
                  },
                ]}
                reds={[
                  {
                    label: "Cotisations",
                    value: eurl.cotisations,
                    color: "#99312E",
                  },
                  { label: "IR", value: eurl.ir, color: "#E5605C" },
                  { label: "IS", value: eurl.is, color: "#F72019" },
                ].concat(
                  eurl.trésorerie < 0
                    ? [
                        {
                          label: "Déficit",
                          value: Math.abs(eurl.trésorerie),
                          color: "#FF0000",
                        },
                      ]
                    : []
                )}
              />
            </div>
          </div>
        </div>
      </div>
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
      <Stepper
        progress={Array.from({ length: stepsList.length - 1 }).map(
          (_, index) => index < currentQuestion
        )}
      />
      <main className="max-w-7xl m-auto py-36 px-4">
        {currentQuestion <= totalQuestions && (
          <p className="text-secondary text-sm mb-4">
            Question {currentQuestion}/{totalQuestions}
          </p>
        )}
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
