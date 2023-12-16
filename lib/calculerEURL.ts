import Engine from "publicodes";
import rules from "modele-social";

const eurlEngine = new Engine(rules);

// TODO: use calculerIS
const isEngine = new Engine(rules);

function calculerEURL({
  ca,
  rémunération,
  nature,
}: {
  ca: number;
  rémunération: number;
  nature: "libérale" | "commerciale";
}) {
  eurlEngine.setSituation({
    "impôt . foyer fiscal . situation de famille": "'célibataire'",
    "impôt . méthode de calcul": "'barème standard'",
    "dirigeant . rémunération . net . après impôt": rémunération * 12,
    "dirigeant . indépendant . IJSS": "non",
    "dirigeant . indépendant . revenus étrangers": "non",
    "dirigeant . indépendant . PL . régime général . taux spécifique retraite complémentaire":
      "non",
    "dirigeant . indépendant . conjoint collaborateur": "non",
    "dirigeant . indépendant . cotisations facultatives": "non",
    "entreprise . activités . saisonnière": "non",
    "situation personnelle . RSA": "non",
    "entreprise . activité . nature . libérale . réglementée": "non",
    "entreprise . activité . nature": `'${nature}'`,
    "situation personnelle . domiciliation fiscale à l'étranger": "non",
    "entreprise . date de création": "01/01/2023",
    "dirigeant . exonérations . ACRE": "non",
    "dirigeant . indépendant . cotisations et contributions . exonérations . pension invalidité":
      "non",
    "entreprise . imposition": "'IS'",
    "entreprise . associés": "'unique'",
    "entreprise . catégorie juridique": "'SARL'",
  });
  const revenuBrut = Math.round(
    eurlEngine.evaluate("dirigeant . rémunération . totale")
      .nodeValue as number,
  );
  const résultat = ca - revenuBrut;

  isEngine.setSituation({
    "entreprise . imposition . IS . éligible taux réduit": "oui",
    "entreprise . imposition . IS . résultat imposable": Math.max(0, résultat),
  });

  const revenu = Math.round(
    eurlEngine.evaluate({
      valeur: "dirigeant . rémunération . net . après impôt",
      unité: "€/an",
    }).nodeValue as number,
  );
  const is = Math.round(
    isEngine.evaluate("entreprise . imposition . IS . montant")
      .nodeValue as number,
  );
  const cotisations = Math.round(
    eurlEngine.evaluate(
      "dirigeant . indépendant . cotisations et contributions",
    ).nodeValue as number,
  );
  const ir = Math.round(
    eurlEngine.evaluate("impôt . montant").nodeValue as number,
  );

  return {
    revenu,
    trésorerie: résultat - is,
    cotisations,
    ir,
    is,
  };
}

export { calculerEURL };
