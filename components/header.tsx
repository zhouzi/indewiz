import NextLink from "next/link";
import { Logo } from "./ui/logo";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex max-w-7xl px-4 m-auto items-center py-5">
      <NextLink href="/" className="flex flex-1 gap-2">
        <Logo />
        <span className="px-2 py-1 leading-none bg-secondary-lightest text-primary-dark uppercase text-xs rounded-sm">
          beta
        </span>
      </NextLink>
      <Button variant="secondary">Contacte-nous</Button>
    </header>
  );
};

export { Header };
