import Link from "next/link";

import { MobileMenu } from "./mobileMenu";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex items-center relative">
      <Link href="/" className="inline-flex items-end gap-2 flex-1">
        <img
          src="/logo.png"
          alt="Logo indéwiz"
          className="h-[24px] w-auto hidden md:inline-flex"
        />
        <img
          src="/logo-small.png"
          alt="Logo indéwiz"
          className="h-[24px] w-auto inline-flex md:hidden"
        />
        <span className="uppercase rounded text-xs bg-primary-50 px-2 py-1 leading-none text-primary-700">
          beta
        </span>
      </Link>
      <nav>
        <ul className="flex gap-2">
          <li className="md:hidden">
            <MobileMenu />
          </li>
          <li className="hidden md:inline-flex">
            <Button variant="ghost" asChild>
              <Link href="/a-propos">À propos</Link>
            </Button>
          </li>
          <li className="hidden md:inline-flex">
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
    </header>
  );
};

export { Header };
