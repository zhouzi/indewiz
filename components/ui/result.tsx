import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const resultVariants = cva("py-3 px-6 rounded-full text-xl inline-flex", {
  variants: {
    variant: {
      positive: "bg-positive-light text-positive-dark",
      negative: "bg-negative-light text-negative-dark",
    },
  },
  defaultVariants: {
    variant: "positive",
  },
});

export interface ResultProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof resultVariants> {}

const Result = ({ className, variant, children }: ResultProps) => {
  return (
    <span className={cn(resultVariants({ variant, className }))}>
      {children}
    </span>
  );
};

export { Result };
