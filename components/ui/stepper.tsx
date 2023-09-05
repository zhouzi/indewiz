import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { PropsWithChildren } from "react";

type StepperProps = PropsWithChildren<{}>;

const Stepper = ({ children }: StepperProps) => {
  return <ul className="flex gap-10">{children}</ul>;
};

const stepperItemVariants = cva("rounded-full", {
  variants: {
    filled: {
      true: "bg-gradient-to-t from-primary-dark to-primary",
      false: "bg-secondary-lighter",
    },
  },
  defaultVariants: {
    filled: false,
  },
});

interface StepperItemProps extends VariantProps<typeof stepperItemVariants> {}

const StepperItem = ({ filled }: StepperItemProps) => {
  return (
    <li
      className={cn(stepperItemVariants({ filled }))}
      style={{ width: "40px", height: "4px" }}
    />
  );
};

export { Stepper, StepperItem };
