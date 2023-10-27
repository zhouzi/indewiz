import NextLink from "next/link";
import { Button } from "./ui/button";
import { MobileMenu } from "./mobileMenu";
import { HeaderLogo } from "./headerLogo";

const Header = () => {
  return (
    <header className="flex flex-row gap-4 max-w-7xl px-4 m-auto items-center justify-between py-5">
      <HeaderLogo />
      <div className="flex items-center md:hidden">
        <MobileMenu />
      </div>
      <div className="gap-2 items-center hidden md:flex">
        <Button variant="ghost" asChild>
          <NextLink href="/a-propos">À propos</NextLink>
        </Button>
        <Button variant="secondary" asChild>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSee1ebfvyT2z7IiFFxdYujP3nyieMmoha61bwALN8Ac_afUHg/viewform"
            target="_blank"
          >
            Contacte-nous
          </a>
        </Button>
      </div>
    </header>
  );
};

export { Header };
