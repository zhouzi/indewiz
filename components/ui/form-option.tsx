import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import styles from "./form-option.module.css";

const formOptionVariants = cva("py-3 px-12 rounded-full cursor-pointer", {
  variants: {
    variant: {
      primary: cn("", styles.formOption),
      selected: cn("text-white font-bold", styles.formOptionSelected),
    },
    disabled: {
      true: cn(
        "text-secondary-lighter pointer-events-none",
        styles.formOptionDisabled
      ),
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    disabled: false,
  },
});

export interface FormOptionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof formOptionVariants> {
  asChild?: boolean;
}

const FormOption = React.forwardRef<HTMLButtonElement, FormOptionProps>(
  ({ className, variant, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(formOptionVariants({ variant, disabled, className }))}
        disabled={disabled ?? undefined}
        ref={ref}
        {...props}
      />
    );
  }
);
FormOption.displayName = "FormOption";

export { FormOption, formOptionVariants };
