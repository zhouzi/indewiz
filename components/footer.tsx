/* eslint-disable react/no-unescaped-entities */
import { Link } from "./ui/link";

const Footer = () => {
  return (
    <footer className="max-w-7xl m-auto px-4">
      <p className="text-secondary text-sm mb-3">
        IndeWIZ est un simulateur{" "}
        <Link href="https://github.com/zhouzi/indewiz" target="_blank">
          open source
        </Link>{" "}
        en cours de conception et de développement par{" "}
        <Link href="https://twitter.com/gabinaureche" target="_blank">
          Gabin Aureche
        </Link>{" "}
        et{" "}
        <Link href="https://twitter.com/pixseb_perfect" target="_blank">
          Sébastien Chaine
        </Link>
        .
      </p>
      <p className="text-secondary text-sm">
        IndeWIZ utilise les mêmes règles que celles des simulateurs de l'URSSAF.
        Mais il ne se substitue pas aux conseils d'un comptable qui saura
        étudier ta situation et tes besoins de plus près.
      </p>
    </footer>
  );
};

export { Footer };
