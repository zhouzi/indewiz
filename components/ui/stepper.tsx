import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const stepperVariants = cva("w-full flex");

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: boolean[];
}

const Stepper = ({ className, progress }: StepperProps) => {
  return (
    <div className={cn(stepperVariants({ className }))}>
      {progress.map((step, index) => (
        <div
          key={index}
          className={cn(
            "flex-1 pt-1",
            step ? "bg-primary" : "bg-secondary-lightest"
          )}
        />
      ))}
    </div>
  );
};

export { Stepper };
