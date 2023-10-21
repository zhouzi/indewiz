import * as React from "react";

import { cn } from "@/lib/utils";
import styles from "./input.module.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  afterIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, afterIcon, ...props }, ref) => {
    return (
      <div className="relative border border-secondary-lightest rounded-full text-xl inline-flex items-center max-w-full">
        <input
          type={type}
          className={cn(
            "py-3 px-12 bg-transparent rounded-full outline-none min-w-0",
            styles.input,
            className
          )}
          ref={ref}
          {...props}
        />
        {afterIcon && <div className="pr-8 text-secondary">{afterIcon}</div>}
        <div
          className={cn(
            "absolute inset-0 z-0 pointer-events-none rounded-full outline outline-2 outline-primary",
            styles.inputFocusRing
          )}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
