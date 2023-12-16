import Engine from "publicodes";
import rules from "modele-social";

const isEngine = new Engine(rules);

function calculerIS({ bénéfices }: { bénéfices: number }) {
  isEngine.setSituation({
    "entreprise . imposition . IS . éligible taux réduit": "oui",
    "entreprise . imposition . IS . résultat imposable": Math.max(0, bénéfices),
  });

  const is = Math.round(
    isEngine.evaluate("entreprise . imposition . IS . montant")
      .nodeValue as number,
  );

  return {
    is,
  };
}

export { calculerIS };
