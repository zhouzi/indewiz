"use client";

import * as React from "react";
import { Root, Item } from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

import styles from "./radio-group.module.css";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  return (
    <Root
      className={cn("flex flex-col md:flex-row gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => {
  return (
    <Item
      ref={ref}
      className={cn(
        "inline-flex px-12 py-4 rounded-full font-medium justify-center",
        styles.radioGroupItem,
        className,
      )}
      {...props}
    >
      {children}
    </Item>
  );
});
RadioGroupItem.displayName = Item.displayName;

export { RadioGroup, RadioGroupItem };
