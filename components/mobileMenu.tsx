"use client";

import * as React from "react";
import {
  Portal,
  Root,
  Trigger,
  Content,
  Overlay,
} from "@radix-ui/react-dialog";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "./ui/button";

const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <Button
          variant="ghost"
          onClick={() => setOpen((currentOpen) => !currentOpen)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </Trigger>
      <Portal container={document.querySelector("header")}>
        <Overlay className="absolute top-full translate-y-[4px] w-full h-screen z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Content className="absolute top-full translate-y-[4px] z-50 w-full bg-white">
          <nav>
            <ul className="flex flex-col gap-2 [&_li]:flex [&_li]:flex-col">
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/a-propos">À propos</Link>
                </Button>
              </li>
              <li>
                <Button variant="secondary" asChild>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSee1ebfvyT2z7IiFFxdYujP3nyieMmoha61bwALN8Ac_afUHg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contacte-nous
                  </a>
                </Button>
              </li>
            </ul>
          </nav>
        </Content>
      </Portal>
    </Root>
  );
};

export { MobileMenu };
