import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateProjection } from './financialProjection.ts';

const base = {
  initialAmount: 0, monthlyContribution: 1000, annualReturnPercent: 0,
  annualInflationPercent: 0, monthlyExpenses: 1000, withdrawalRatePercent: 4, years: 1,
};

test('zero return adds twelve end-of-month contributions', () => {
  const result = calculateProjection(base);
  assert.equal(result.years[1].balance, 12000);
  assert.equal(result.years[1].contributions, 12000);
  assert.equal(result.years[1].earnings, 0);
  assert.equal(result.independenceTarget, 300000);
});

test('effective annual rate produces one percent monthly and end-of-month annuity', () => {
  const result = calculateProjection({ ...base, annualReturnPercent: (1.01 ** 12 - 1) * 100 });
  const expected = 1000 * ((1.01 ** 12 - 1) / 0.01);
  assert.ok(Math.abs(result.years[1].balance - expected) < 1e-7);
});

test('inflation-adjusted target is crossed at the correct month', () => {
  const result = calculateProjection({ ...base, initialAmount: 100000, monthlyContribution: 0,
    annualReturnPercent: 21, annualInflationPercent: 10, monthlyExpenses: 275,
    withdrawalRatePercent: 4, years: 1 });
  assert.equal(result.independenceTarget, 82500);
  assert.equal(result.independenceMonth, 0);
  assert.ok(Math.abs(result.years[1].realBalance - 110000) < 1e-6);
});

test('invalid horizon is rejected', () => {
  assert.throws(() => calculateProjection({ ...base, years: 1.5 }), RangeError);
});
