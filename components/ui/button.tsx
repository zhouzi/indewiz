import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import styles from "./button.module.css";

const buttonVariants = cva(
  "rounded inline-flex justify-center py-3 px-12 font-medium",
  {
    variants: {
      variant: {
        primary: cn(
          "bg-gradient-to-t from-primary-dark to-primary text-white border-primary-dark",
          styles.buttonPrimary
        ),
        secondary: cn(
          "border-primary-dark text-primary-dark",
          styles.buttonSecondary
        ),
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
