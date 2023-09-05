import Engine, { formatValue } from "publicodes";
import rules from "modele-social";

const microEntreprise = new Engine(rules);

function calculerME({
  ca,
  nature,
}: {
  ca: number;
  nature: "libérale" | "commerciale";
}) {
  microEntreprise.setSituation({
    "impôt . foyer fiscal . situation de famille": "'célibataire'",
    "impôt . méthode de calcul": "'barème standard'",
    "dirigeant . auto-entrepreneur . impôt . versement libératoire": "non",
    "dirigeant . exonérations . ACRE": "non",
    "entreprise . date de création": "01/01/2023",
    "entreprise . activité . nature": `'${nature}'`,
    "entreprise . activité . nature . libérale . réglementée": "non",
    "dirigeant . auto-entrepreneur . chiffre d'affaires": ca,
    "entreprise . catégorie juridique": "'EI'",
    "entreprise . catégorie juridique . EI . auto-entrepreneur": "oui",
  });

  const revenu = Math.round(
    microEntreprise.evaluate(
      "dirigeant . auto-entrepreneur . revenu net . après impôt"
    ).nodeValue as number
  );
  const cotisations = Math.round(
    microEntreprise.evaluate({
      valeur: "dirigeant . auto-entrepreneur . cotisations et contributions",
      unité: "€/an",
    }).nodeValue as number
  );
  const ir = Math.round(
    microEntreprise.evaluate("dirigeant . rémunération . impôt")
      .nodeValue as number
  );

  return {
    revenu,
    cotisations,
    ir,
  };
}

export { calculerME };
