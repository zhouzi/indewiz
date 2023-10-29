"use client";

import * as React from "react";
import { Portal, Root, Trigger, Content } from "@radix-ui/react-dialog";
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
        <Content className="absolute top-full z-50 w-full">
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
