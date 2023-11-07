import Engine from "publicodes";
import rules from "modele-social";

const sasuEngine = new Engine(rules);
const isEngine = new Engine(rules);

function calculerSASU({
  ca,
  rémunération,
}: {
  ca: number;
  rémunération: number;
}) {
  sasuEngine.setSituation({
    "entreprise . date de création": "01/01/2023",
    "impôt . méthode de calcul": "'barème standard'",
    "salarié . régimes spécifiques . DFS": "non",
    "salarié . rémunération . avantages en nature": "non",
    "salarié . rémunération . net . payé après impôt": rémunération,
    "entreprise . catégorie juridique": "'SAS'",
  });
  const revenuBrut = Math.round(
    sasuEngine.evaluate("dirigeant . rémunération . totale")
      .nodeValue as number,
  );
  const résultat = ca - revenuBrut;

  isEngine.setSituation({
    "entreprise . imposition . IS . éligible taux réduit": "oui",
    "entreprise . imposition . IS . résultat imposable": Math.max(0, résultat),
  });

  const revenu = Math.round(
    sasuEngine.evaluate({
      valeur: "salarié . rémunération . net . payé après impôt",
      unité: "€/an",
    }).nodeValue as number,
  );
  const is = Math.round(
    isEngine.evaluate("entreprise . imposition . IS . montant")
      .nodeValue as number,
  );
  const cotisations = Math.round(
    sasuEngine.evaluate({
      valeur: "dirigeant . assimilé salarié . cotisations",
      unité: "€/an",
    }).nodeValue as number,
  );
  const ir = Math.round(
    sasuEngine.evaluate("impôt . montant").nodeValue as number,
  );

  return {
    revenu,
    trésorerie: résultat - is,
    cotisations,
    ir,
    is,
  };
}

export { calculerSASU };
