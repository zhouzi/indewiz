import { cn } from "@/lib/utils";
import styles from "./shadow.module.css";

const Shadow = () => {
  return (
    <div
      className={cn(
        "absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[200%] h-full",
        styles.shadow,
      )}
    />
  );
};

export { Shadow };
