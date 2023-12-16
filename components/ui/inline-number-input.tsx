import * as React from "react";

import { Input } from "./input";
import { Pen } from "lucide-react";

export interface InlineNumberInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Input>,
    "type" | "onChange" | "onKeyDown"
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
      afterIcon,
      min = -Infinity,
      max = Infinity,
      step = 0,
      onChange = () => {},
      value = Math.max(Number(min), 0),
      ...props
    },
    ref,
  ) => {
    const onUpdate = (updatedValue: number) => {
      const validValue = Math.max(
        Number(min),
        Math.min(Number(max), updatedValue),
      );
      if (isNaN(validValue)) return;

      onChange(validValue);
    };
    return (
      <label className="inline-flex items-center gap-1 cursor-pointer p-1">
        <span className="text-text border-b-[1px] border-b-text leading-tight">
          <input
            {...props}
            ref={ref}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(event) => onUpdate(Number(event.currentTarget.value))}
            onKeyDown={(event) => {
              const increment = Number(step);

              if (increment <= 0) {
                return;
              }

              const currentValue = Number(value);

              switch (event.key) {
                case "ArrowUp":
                  onUpdate(currentValue + increment);
                  break;
                case "ArrowDown":
                  onUpdate(currentValue - increment);
                  break;
                default:
                  break;
              }
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
