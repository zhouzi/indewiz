import NextLink from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row gap-4 max-w-7xl px-4 m-auto items-center py-5">
      <NextLink href="/" className="flex flex-1 gap-2 items-end">
        <img src="/logo.png" alt="" />
        <span className="px-[8px] py-[2px] leading-tight bg-secondary-lightest text-primary-dark uppercase text-xs rounded-sm">
          beta
        </span>
      </NextLink>
      <div className="flex gap-2 items-center">
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
