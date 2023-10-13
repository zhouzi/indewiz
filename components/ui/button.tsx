import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded border border-transparent inline-flex justify-center",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-t from-primary-dark to-primary font-bold text-white border-primary-dark",
        secondary: "border-primary-dark text-primary-dark font-medium",
      },
      size: {
        small: "py-2 px-6",
        normal: "py-4 px-12 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "normal",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
