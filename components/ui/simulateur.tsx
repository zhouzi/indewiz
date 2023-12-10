import { cn } from "@/lib/utils";

interface SimulateurContainerProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "children"> {}

const SimulateurContainer = ({ children }: SimulateurContainerProps) => {
  return <div className="container pb-4 flex-1 flex flex-col">{children}</div>;
};

interface SimulateurContentProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "children"> {}

const SimulateurContent = ({ children }: SimulateurContentProps) => {
  return <div className="flex-1 md:flex-initial mb-20">{children}</div>;
};

interface SimulateurActionsProps
  extends Pick<
    React.HTMLAttributes<HTMLDivElement>,
    "className" | "children"
  > {}

const SimulateurActions = ({ className, children }: SimulateurActionsProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row gap-2", className)}>
      {children}
    </div>
  );
};

interface SimulateurQuestionCounterProps
  extends Pick<React.HTMLAttributes<HTMLParagraphElement>, "children"> {}

const SimulateurQuestionCounter = ({
  children,
}: SimulateurQuestionCounterProps) => {
  return <h2 className="text-sm text-text-300 mb-1">{children}</h2>;
};

interface SimulateurQuestionProps
  extends Pick<React.HTMLAttributes<HTMLHeadingElement>, "children"> {}

const SimulateurQuestion = ({ children }: SimulateurQuestionProps) => {
  return <h2 className="text-3xl font-bold mb-2">{children}</h2>;
};

interface SimulateurDescriptionProps
  extends Pick<React.HTMLAttributes<HTMLParagraphElement>, "children"> {}

const SimulateurDescription = ({ children }: SimulateurDescriptionProps) => {
  return <p className="text-text-300 mb-9">{children}</p>;
};

export {
  SimulateurContainer,
  SimulateurContent,
  SimulateurActions,
  SimulateurQuestionCounter,
  SimulateurQuestion,
  SimulateurDescription,
};
