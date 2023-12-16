function calculerIntêrêts({
  yearlyInvestment,
  duration,
  yearlyInterestRate,
}: {
  yearlyInvestment: number;
  duration: number;
  yearlyInterestRate: number;
}) {
  let capital = 0;

  for (let i = 0; i < duration; i++) {
    capital *= 1 + yearlyInterestRate;
    capital += yearlyInvestment;
  }

  capital = Math.round(capital);

  const invested = yearlyInvestment * duration;
  const interests = capital - invested;

  return { capital, invested, interests };
}

export { calculerIntêrêts };
