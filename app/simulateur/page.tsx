/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import { FormOption } from "@/components/ui/form-option";
import { Graph } from "@/components/ui/graph";
import { NumberInput } from "@/components/ui/number-input";
import { Result } from "@/components/ui/result";
import { calculerEURL } from "@/lib/calculerEURL";
import { calculerME } from "@/lib/calculerME";
import { produce } from "immer";
import { FunctionComponent, useEffect, useReducer, useState } from "react";

type StepId = "nature" | "ca" | "rémunération" | "résultat";

const steps = {
  nature: ({ goToStep }) => (
    <>
      <p className="text-secondary text-sm mb-4">Question 1/3</p>
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
      <p className="text-secondary text-sm mb-4">Question 2/3</p>
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
      <p className="text-secondary text-sm mb-4">Question 3/3</p>
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
      <div className="max-w-7xl m-auto flex flex-col md:flex-row gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <article className="p-8 rounded-lg bg-white">
            <h3 className="text-3xl font-bold text-center mb-4">
              Changement de statut ?
            </h3>
            <p className="text-center">
              {différence > 0 ? (
                <Result>
                  Oui, ça pourrait être intéressant financièrement
                </Result>
              ) : (
                <Result variant="negative">
                  Non, ça pourrait ne pas être intéressant financièrement
                </Result>
              )}
            </p>
          </article>
          <article className="p-8 rounded-lg bg-white">
            <h3 className="text-3xl font-bold mb-2">Ta situation actuelle</h3>
            <p className="text-secondary">En micro-entreprise (EI)</p>
            <div className="mt-8 flex justify-center">
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
          </article>
          <article className="hidden md:flex flex-1 p-8 rounded-lg bg-white md:flex-col md:items-center md:justify-center">
            <Button onClick={() => goToStep("nature")}>
              Relance le simulateur
            </Button>
          </article>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <article className="p-8 rounded-lg bg-white">
            <h3 className="text-3xl font-bold mb-2">Si tu passes en EURL...</h3>
            <p className="text-secondary mb-2">
              Revenu net mensuel après impôt
            </p>
            <div>
              <NumberInput
                onChange={(value) => patchState({ rémunération: value })}
                value={state.rémunération}
                placeholder="0"
                afterIcon="€/mois"
              />
              {eurl.trésorerie < 0 && (
                <p className="text-red-700 text-sm mt-1">
                  Tu ne fais pas assez de CA pour atteindre cet objectif
                </p>
              )}
            </div>
            <div className="mt-8 flex justify-center">
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
          </article>
          <article className="flex-1 p-8 rounded-lg bg-white">
            <h3 className="text-3xl font-bold text-center mb-2">
              En conclusion
            </h3>
            <p className="text-secondary mb-4 text-center">
              Si tu passais en EURL, ça représenterait :
            </p>
            {différence > 0 ? (
              <p className="text-center">
                <strong className="font-bold">Un gain de</strong>
                <br />
                <Result>+{différence}€/an</Result>
              </p>
            ) : (
              <p className="text-center">
                <strong className="font-bold">Une perte de</strong>
                <br />
                <Result variant="negative">-{Math.abs(différence)}€/an</Result>
              </p>
            )}
          </article>
          <article className="md:hidden p-8 rounded-lg bg-white text-center">
            <Button
              className="w-full sm:w-auto"
              onClick={() => goToStep("nature")}
            >
              Relance le simulateur
            </Button>
          </article>
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
  const Step = steps[state.step];

  return (
    <main className="max-w-7xl m-auto py-6 px-4">
      <Step
        state={state}
        goToStep={(step: StepId) => dispatch({ type: "goToStep", step: step })}
        patchState={(patch: Partial<State>) =>
          dispatch({ type: "patchState", patch })
        }
      />
    </main>
  );
}
