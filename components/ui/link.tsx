import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

import styles from "./link.module.css";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ asChild, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        className={cn("text-text inline-flex relative font-medium", className)}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            styles.linkStroke,
            "bg-gradient-to-t from-primary-dark to-primary font-bold text-white rounded-full"
          )}
        />
        {children}
      </Comp>
    );
  }
);
Link.displayName = "Link";

export { Link };
