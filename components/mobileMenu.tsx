"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import NextLink from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { HeaderLogo } from "./headerLogo";

const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.DialogTrigger asChild>
        <button type="button" className="text-primary p-1">
          <Menu size={32} />
        </button>
      </DialogPrimitive.DialogTrigger>

      <DialogPrimitive.DialogPortal>
        <DialogPrimitive.Overlay
          className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm")}
        />
        <DialogPrimitive.Content
          className="absolute z-50 py-5 px-4 top-0 left-0 w-full bg-white flex flex-col gap-8 border-b-[0.25rem] border-b-secondary-lightest"
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center justify-between">
            <HeaderLogo />
            <DialogPrimitive.Close
              className="opacity-70 hover:opacity-100"
              asChild
            >
              <Button variant="ghost">
                <X size={24} />
              </Button>
            </DialogPrimitive.Close>
          </div>
          <ul className="flex flex-col [&_li]:flex [&_li]:flex-col gap-2">
            <li>
              <Button variant="ghost" asChild>
                <NextLink href="/a-propos">À propos</NextLink>
              </Button>
            </li>
            <li>
              <Button variant="secondary" asChild>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSee1ebfvyT2z7IiFFxdYujP3nyieMmoha61bwALN8Ac_afUHg/viewform"
                  target="_blank"
                >
                  Contacte-nous
                </a>
              </Button>
            </li>
          </ul>
        </DialogPrimitive.Content>
      </DialogPrimitive.DialogPortal>
    </DialogPrimitive.Root>
  );
};

export { MobileMenu };
