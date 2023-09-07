import * as React from "react";

import { Input, InputProps } from "./input";

export interface NumberInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: number) => void;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, onChange, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(event) => {
          const value = Number(event.currentTarget.value);
          if (isNaN(value)) return;

          onChange(value);
        }}
        {...props}
      />
    );
  }
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
