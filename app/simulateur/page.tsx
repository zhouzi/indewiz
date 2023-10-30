/* eslint-disable react/no-unescaped-entities */

"use client";

import {
  FunctionComponent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
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

import styles from "./simulateur.module.css";

interface SimulateurContainerProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "children"> {}

const SimulateurContainer = ({ children }: SimulateurContainerProps) => {
  return <div className="container pb-4 flex-1 flex flex-col">{children}</div>;
};

interface SimulateurContentProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "children"> {}

const SimulateurContent = ({ children }: SimulateurContentProps) => {
  return <div className="flex-1 md:flex-initial mb-20">{children}</div>;
};

interface SimulateurActionsProps
  extends Pick<
    React.HTMLAttributes<HTMLDivElement>,
    "className" | "children"
  > {}

const SimulateurActions = ({ className, children }: SimulateurActionsProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row gap-2", className)}>
      {children}
    </div>
  );
};

interface SimulateurQuestionCounterProps
  extends Pick<React.HTMLAttributes<HTMLParagraphElement>, "children"> {}

const SimulateurQuestionCounter = ({
  children,
}: SimulateurQuestionCounterProps) => {
  return <h2 className="text-sm text-text-300 mb-1">{children}</h2>;
};

interface SimulateurQuestionProps
  extends Pick<React.HTMLAttributes<HTMLHeadingElement>, "children"> {}

const SimulateurQuestion = ({ children }: SimulateurQuestionProps) => {
  return <h2 className="text-3xl font-bold mb-2">{children}</h2>;
};

interface SimulateurDescriptionProps
  extends Pick<React.HTMLAttributes<HTMLParagraphElement>, "children"> {}

const SimulateurDescription = ({ children }: SimulateurDescriptionProps) => {
  return <p className="text-text-300 mb-9">{children}</p>;
};

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
            Passé un seuil de chiffre d'affaires les avantages de la
            micro-entreprise sont gommés.
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
            afterIcon="€/an"
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
    const [{ me, eurl }, setState] = useState(() => ({
      me: calculerME({
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
          me: calculerME({
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
      ((eurl.revenu + eurl.trésorerie) / me.revenu - 1) * 100,
    );

    const inputRef = useRef<HTMLInputElement>(null);

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
              En te versant une rémunération net de{" "}
              <span
                className="inline-flex items-center gap-1 cursor-pointer"
                onClick={() => inputRef.current?.select()}
              >
                <span className="text-text border-b-[1px] border-b-text leading-tight">
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(event) => {
                      const value = Number(event.currentTarget.value);
                      if (isNaN(value)) return;

                      patchState({ rémunération: Number(event.target.value) });
                    }}
                    onClick={(event) => event.stopPropagation()}
                    value={state.rémunération}
                    className="inline bg-transparent focus:outline-none"
                    style={{ width: `${String(state.rémunération).length}ch` }}
                  />
                  €/mois
                </span>
                <Pen size={16} />
              </span>
            </SimulateurDescription>
            <Collapsible
              className="mb-2"
              trigger={
                <span className="flex flex-col text-xl font-medium md:flex-row md:gap-2">
                  <span className="md:flex-1">
                    Micro-entreprise{" "}
                    <small className="text-sm font-normal text-text-300">
                      (situation actuelle)
                    </small>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-text-300 font-normal">Résultat</span>{" "}
                    {me.revenu} €/an
                    <span className="inline-flex items-center gap-1 w-[60px]" />
                  </span>
                </span>
              }
              content={
                <>
                  <Table className="mb-10">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-full">Entrées</TableHead>
                        <TableHead className="text-right">
                          {me.revenu} €/an
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Revenu</TableCell>
                        <TableCell className="text-right">
                          {me.revenu} €/an
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Table className="mb-10">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-full">Sorties</TableHead>
                        <TableHead className="text-right">
                          {me.cotisations + me.ir} €/an
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Cotisations</TableCell>
                        <TableCell className="text-right">
                          {me.cotisations} €/an
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Impôt sur le revenu</TableCell>
                        <TableCell className="text-right">
                          {me.ir} €/an
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              }
            />
            <Collapsible
              trigger={
                <span className="flex flex-col text-xl font-medium md:flex-row md:gap-2">
                  <span className="md:flex-1">EURL</span>
                  <span className="flex items-center gap-1">
                    <span className="text-text-300 font-normal">Résultat</span>{" "}
                    {eurl.revenu + eurl.trésorerie} €/an
                    <span className="inline-flex items-center gap-1 w-[60px]">
                      {eurlDifférence >= 0 ? (
                        <>
                          <span className="bg-positive-50 text-positive-500 rounded-full p-1">
                            <TrendingUp size={16} />
                          </span>
                          <span className="text-text-300 text-sm">
                            +{eurlDifférence}%
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="bg-negative-50 text-negative-500 rounded-full p-1">
                            <TrendingDown size={16} />
                          </span>
                          <span className="text-text-300 text-sm">
                            {eurlDifférence}%
                          </span>
                        </>
                      )}
                    </span>
                  </span>
                </span>
              }
              content={
                <>
                  <Table className="mb-10">
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
                  <Table className="mb-10">
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
                        <TableCell className="text-right">
                          {eurl.ir} €/an
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Impôt sur les sociétés</TableCell>
                        <TableCell className="text-right">
                          {eurl.is} €/an
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              }
            />
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
      <div className="absolute -z-10 pointer-events-none top-0 right-0 w-1/2 h-[420px]">
        <div
          className={cn(
            "absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[200%] h-full",
            styles.shadow,
          )}
        />
      </div>
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
