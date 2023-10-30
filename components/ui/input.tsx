import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  afterIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, afterIcon, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex px-12 rounded-full border border-secondary-300 items-center [&:has(:focus)]:border-primary-500 w-full md:w-auto",
          className,
        )}
      >
        <input
          type={type}
          className="py-4 bg-transparent rounded-full outline-none flex-1"
          ref={ref}
          {...props}
        />
        {afterIcon && <span className="text-text-300">{afterIcon}</span>}
      </label>
    );
  },
);
Input.displayName = "Input";

export { Input };
