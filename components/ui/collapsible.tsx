"use client";

import React, { useState } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./collapsible.module.css";

interface CollapsibleProps
  extends Pick<CollapsiblePrimitive.CollapsibleProps, "className"> {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

const Collapsible = ({ trigger, content, ...props }: CollapsibleProps) => {
  const [open, setOpen] = useState(false);
  return (
    <CollapsiblePrimitive.Root {...props} open={open} onOpenChange={setOpen}>
      <CollapsiblePrimitive.Trigger
        className={cn(
          "flex w-full py-5 pl-11 pr-2 border-2 rounded text-left items-center",
          styles.collapsibleTrigger
        )}
      >
        {trigger}
        <span className="ml-5 text-primary">
          {open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </span>
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className={cn("py-3 pl-11 pr-12")}>
        {content}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
};

export { Collapsible };
