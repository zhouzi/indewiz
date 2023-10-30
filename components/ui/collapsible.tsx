"use client";

import * as React from "react";
import { Root, Trigger, Content } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

import styles from "./collapsible.module.css";

export interface CollapsibleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Root>, "content"> {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const Collapsible = React.forwardRef<
  React.ElementRef<typeof Root>,
  CollapsibleProps
>(({ trigger, content, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Root ref={ref} {...props} open={open} onOpenChange={setOpen}>
      <Trigger
        className={cn(
          "flex w-full py-5 pl-11 pr-2 border-2 rounded text-left items-center",
          styles.trigger,
        )}
      >
        <span className="flex-1">{trigger}</span>
        <span className="ml-5 text-primary">
          {open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </span>
      </Trigger>
      <Content className="py-3 pl-11 pr-[122px]">{content}</Content>
    </Root>
  );
});
Collapsible.displayName = "Collapsible";

export { Collapsible };
