import { expect, it } from 'vitest';
import { SUGAR_CI, SUGAR_P, SUGAR_SAMPLE } from '../../src/content/visual/pye-final';

it('recalcula la muestra y verifica el p-valor unilateral por integración independiente', () => {
  const n = SUGAR_SAMPLE.length;
  const mean = SUGAR_SAMPLE.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(SUGAR_SAMPLE.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1));
  const se = sd / Math.sqrt(n);
  const statistic = (mean - 20) / se;
  expect(mean).toBeCloseTo(18.9, 10);
  expect(statistic).toBeCloseTo(-2.6706987061, 9);
  // t con 7 gl: Γ(4)/(√(7π) Γ(3,5)) · (1+t²/7)^−4.
  const density = (x: number) => 16 / (5 * Math.PI * Math.sqrt(7)) * (1 + x * x / 7) ** -4;
  const a = -100;
  const count = 20000;
  const h = (statistic - a) / count;
  let sum = density(a) + density(statistic);
  for (let i = 1; i < count; i++) sum += (i % 2 ? 4 : 2) * density(a + i * h);
  expect(sum * h / 3).toBeCloseTo(SUGAR_P, 8);
  expect(SUGAR_P).toBeLessThan(0.04);
  expect(mean - 1.8945786051 * se).toBeCloseTo(SUGAR_CI[0], 6);
  expect(mean + 1.8945786051 * se).toBeCloseTo(SUGAR_CI[1], 6);
});
