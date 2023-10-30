/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  return (
    <>
      <Progress />
      <main className="container">
        <div className="max-w-2xl lg:max-w-4xl">
          <h1 className="text-4xl font-medium mb-6">À propos</h1>
          <p className="text-text-300 mb-3">
            indéwiz est un simulateur en cours de conception et de développement
            par{" "}
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
            . Il se base sur les règles officielles utilisées dans les
            simulateurs de l'Urssaf.
          </p>
          <p className="text-text-300 mb-12">
            Le simulateur ne se substitue pas aux conseils d'un comptable qui
            saura étudier ta situation et tes besoins de plus près.
          </p>
          <div className="flex flex-col md:flex-row gap-2">
            <Button variant="secondary" asChild>
              <Link href="/">Accueil</Link>
            </Button>
            <Button asChild>
              <Link href="/simulateur">Lance le simulateur</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
