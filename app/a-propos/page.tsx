/* eslint-disable react/no-unescaped-entities */

import { Stepper } from "@/components/ui/stepper";

export default function APropos() {
  return (
    <>
      <Stepper progress={[false]} />
      <main className=" max-w-7xl m-auto py-28 px-4">
        <div className="max-w-3xl">
          <h1 className="font-medium text-4xl mb-4">À propos</h1>
          <p className="text-secondary mb-2">
            IndeWIZ est un simulateur{" "}
            <a
              href="https://github.com/zhouzi/indewiz"
              className="font-medium text-text hover:text-primary"
            >
              open source
            </a>{" "}
            en cours de conception et de développement par{" "}
            <a
              href="https://twitter.com/gabinaureche"
              className="font-medium text-text hover:text-primary"
            >
              Gabin Aureche
            </a>{" "}
            et{" "}
            <a
              href="https://twitter.com/pixseb_perfect"
              className="font-medium text-text hover:text-primary"
            >
              Sébastien Chaine
            </a>
            .
          </p>
          <p className="text-secondary">
            IndeWIZ utilise les mêmes règles que celles des simulateurs de
            l'URSSAF. Mais il ne se substitue pas aux conseils d'un comptable
            qui saura étudier ta situation et tes besoins de plus près.
          </p>
        </div>
      </main>
    </>
  );
}
