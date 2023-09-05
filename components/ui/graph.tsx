import { cn } from "@/lib/utils";
import styles from "./graph.module.css";

type GraphValue = {
  color: string;
  label: string;
  value: number;
};

type GraphProps = {
  greens: GraphValue[];
  reds: GraphValue[];
};

const Graph = ({ greens, reds }: GraphProps) => {
  const greensTotal = greens.reduce((acc, { value }) => acc + value, 0);
  const redsTotal = reds.reduce((acc, { value }) => acc + value, 0);

  return (
    <div style={{ maxWidth: "200px", width: "100%" }}>
      <div className="flex justify-end">
        <div className="flex flex-col items-center px-8">
          <div>{greensTotal}€</div>
          <div style={{ height: `${greensTotal / 1000}px` }}>
            {greens.map((green) => (
              <div
                key={green.label}
                style={{
                  width: "8px",
                  height: `${(green.value / greensTotal) * 100}%`,
                  backgroundColor: green.color,
                }}
                className={cn("relative cursor-pointer", styles.graphValue)}
              >
                <div className="absolute top-1/2 left-full transform -translate-y-1/2 py-2 px-4 rounded bg-gray-800 font-medium text-white whitespace-nowrap ml-2">
                  {green.label} : +{green.value}€
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border border-b-0 border-secondary-lighter" />
      <div className="flex justify-start">
        <div className="flex flex-col items-center px-8">
          <div style={{ height: `${redsTotal / 1000}px` }}>
            {reds.map((red) => (
              <div
                key={red.label}
                style={{
                  width: "8px",
                  height: `${(red.value / redsTotal) * 100}%`,
                  backgroundColor: red.color,
                }}
                className={cn("relative cursor-pointer", styles.graphValue)}
              >
                <div className="absolute top-1/2 right-full transform -translate-y-1/2 py-2 px-4 rounded bg-gray-800 font-medium text-white whitespace-nowrap mr-2">
                  {red.label} : -{red.value}€
                </div>
              </div>
            ))}
          </div>
          <div>-{redsTotal}€</div>
        </div>
      </div>
    </div>
  );
};

export { Graph };
