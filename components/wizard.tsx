import { PropsWithChildren } from "react";
import { Stepper, StepperItem } from "./ui/stepper";

type WizardProps = PropsWithChildren<{}>;

const Wizard = ({ children }: WizardProps) => {
  return <div className="max-w-5xl m-auto">{children}</div>;
};

type WizardTitleProps = PropsWithChildren<{ steps: boolean[] }>;

const WizardTitle = ({ steps, children }: WizardTitleProps) => {
  return (
    <div className="p-8 rounded-lg bg-white mb-2 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">{children}</h2>
      <Stepper>
        {steps.map((filled, index) => (
          <StepperItem key={index} filled={filled} />
        ))}
      </Stepper>
    </div>
  );
};

type WizardContentProps = PropsWithChildren<{}>;

const WizardContent = ({ children }: WizardContentProps) => {
  return <div className="p-8 rounded-lg bg-white mb-2">{children}</div>;
};

type WizardContentTitleProps = PropsWithChildren<{}>;

const WizardContentTitle = ({ children }: WizardContentTitleProps) => {
  return <h3 className="text-xl font-medium mb-2">{children}</h3>;
};

type WizardContentSubTitleProps = PropsWithChildren<{}>;

const WizardContentSubTitle = ({ children }: WizardContentSubTitleProps) => {
  return <p className="text-secondary mb-4">{children}</p>;
};

type WizardContentActionsProps = PropsWithChildren<{}>;

const WizardContentActions = ({ children }: WizardContentActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:justify-end mt-8 gap-4 sm:gap-6">
      {children}
    </div>
  );
};

export {
  Wizard,
  WizardTitle,
  WizardContent,
  WizardContentTitle,
  WizardContentSubTitle,
  WizardContentActions,
};
