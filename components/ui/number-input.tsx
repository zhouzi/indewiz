import * as React from "react";

import { Input } from "./input";

export interface NumberInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Input>,
    "type" | "onChange"
  > {
  onChange: (value: number) => void;
}

const NumberInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  NumberInputProps
>(({ onChange, ...props }, ref) => {
  return (
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      onChange={(event) => {
        const value = Number(event.currentTarget.value);
        if (isNaN(value)) return;

        onChange(value);
      }}
      ref={ref}
      {...props}
    />
  );
});
NumberInput.displayName = "NumberInput";

export { NumberInput };
