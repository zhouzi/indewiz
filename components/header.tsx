/* eslint-disable react/no-unescaped-entities */
import NextLink from "next/link";
import { Logo } from "./ui/logo";
import { Link } from "./ui/link";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row items-center max-w-7xl m-auto py-6 sm:mb-10 px-4">
      <NextLink
        href="/"
        className="inline-flex gap-2 items-center sm:pr-4 mb-2 sm:mb-0"
      >
        <Logo />
        <span className="px-2 py-1 leading-none bg-secondary-lightest text-primary-dark uppercase font-medium text-sm rounded">
          beta
        </span>
      </NextLink>
      <p className="flex-1 text-center sm:text-left md:text-right text-secondary">
        Des remarques ? Des idées d'évolution ?{" "}
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSee1ebfvyT2z7IiFFxdYujP3nyieMmoha61bwALN8Ac_afUHg/viewform"
          target="_blank"
        >
          Contacte-nous
        </Link>
      </p>
    </header>
  );
};

export { Header };
