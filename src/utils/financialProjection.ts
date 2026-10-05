export interface ProjectionInputs {
  initialAmount: number;
  monthlyContribution: number;
  annualReturnPercent: number;
  annualInflationPercent: number;
  monthlyExpenses: number;
  withdrawalRatePercent: number;
  years: number;
}

export interface AnnualProjection {
  year: number;
  balance: number;
  contributions: number;
  earnings: number;
  realBalance: number;
}

export interface ProjectionResult {
  years: AnnualProjection[];
  independenceTarget: number;
  independenceMonth: number | null;
}

/** Effective monthly rates preserve the entered annual compound rates. Contributions occur at month end. */
export function calculateProjection(inputs: ProjectionInputs): ProjectionResult {
  const values = [inputs.initialAmount, inputs.monthlyContribution, inputs.annualReturnPercent,
    inputs.annualInflationPercent, inputs.monthlyExpenses, inputs.withdrawalRatePercent, inputs.years];
  if (values.some(value => !Number.isFinite(value)) || inputs.initialAmount < 0 ||
    inputs.monthlyContribution < 0 || inputs.annualReturnPercent <= -100 ||
    inputs.annualInflationPercent <= -100 || inputs.monthlyExpenses < 0 ||
    inputs.withdrawalRatePercent <= 0 || inputs.withdrawalRatePercent > 100 ||
    !Number.isInteger(inputs.years) || inputs.years < 1 || inputs.years > 60) {
    throw new RangeError('Parâmetros inválidos para a projeção financeira.');
  }

  const monthlyRate = Math.expm1(Math.log1p(inputs.annualReturnPercent / 100) / 12);
  const monthlyInflation = Math.expm1(Math.log1p(inputs.annualInflationPercent / 100) / 12);
  const independenceTarget = inputs.monthlyExpenses * 12 / (inputs.withdrawalRatePercent / 100);
  let balance = inputs.initialAmount;
  let contributions = inputs.initialAmount;
  let inflationFactor = 1;
  let independenceMonth: number | null = balance >= independenceTarget ? 0 : null;
  const years: AnnualProjection[] = [{ year: 0, balance, contributions, earnings: 0, realBalance: balance }];

  for (let month = 1; month <= inputs.years * 12; month++) {
    balance = balance * (1 + monthlyRate) + inputs.monthlyContribution;
    contributions += inputs.monthlyContribution;
    inflationFactor *= 1 + monthlyInflation;
    const realBalance = balance / inflationFactor;
    if (independenceMonth === null && realBalance >= independenceTarget) independenceMonth = month;
    if (month % 12 === 0) {
      years.push({ year: month / 12, balance, contributions,
        earnings: balance - contributions, realBalance });
    }
  }

  return { years, independenceTarget, independenceMonth };
}
