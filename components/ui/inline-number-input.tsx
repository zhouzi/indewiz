import * as React from "react";

import { Input } from "./input";
import { Pen } from "lucide-react";

export interface InlineNumberInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Input>,
    "type" | "onChange"
  > {
  onChange?: (value: number) => void;
  afterIcon?: React.ReactNode;
}

const InlineNumberInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  InlineNumberInputProps
>(
  (
    {
      value,
      onChange = () => {},
      afterIcon,
      min = -Infinity,
      max = Infinity,
      ...props
    },
    ref,
  ) => {
    return (
      <label className="inline-flex items-center gap-1 cursor-pointer p-1">
        <span className="text-text border-b-[1px] border-b-text leading-tight">
          <input
            {...props}
            ref={ref}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(event) => {
              const value = Math.max(
                Number(min),
                Math.min(Number(max), Number(event.currentTarget.value)),
              );
              if (isNaN(value)) return;

              onChange(value);
            }}
            onFocus={(event) => event.currentTarget.select()}
            value={value}
            className="inline bg-transparent focus:outline-none"
            style={{
              width: `${String(value).length}ch`,
            }}
          />
          {afterIcon}
        </span>
        <Pen size={16} />
      </label>
    );
  },
);
InlineNumberInput.displayName = "InlineNumberInput";

export { InlineNumberInput };
