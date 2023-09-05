import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const formOptionVariants = cva(
  "py-4 px-8 border border-transparent rounded-full text-xl",
  {
    variants: {
      variant: {
        primary: "border-secondary-lightest",
        selected: "bg-primary text-white",
      },
      disabled: {
        true: "opacity-50 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      disabled: false,
    },
  }
);

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
