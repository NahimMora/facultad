import { describe, expect, it } from 'vitest';
import { RULES, SOLVED } from '../../src/content/recovery/pyeSolved';

describe('PyE: parcial y recu resueltos', () => {
  it('tiene los 5 puntos del parcial y los 4 del recu con sus puntajes reales', () => {
    expect(SOLVED.filter((s) => s.exam === 'parcial').map((s) => s.points)).toEqual([[12, 24], [14, 24], [2, 10], [12, 24], [8, 18]]);
    expect(SOLVED.filter((s) => s.exam === 'recu').map((s) => s.points)).toEqual([[0, 20], [15, 25], [20, 27], [5, 28]]);
    expect(RULES.length).toBeGreaterThan(10);
  });
  it('cada diagrama tiene una explicación por paso', () => {
    for (const s of SOLVED) {
      const steps = s.scene.v.items.flatMap((p) => [p.s ?? 0, ...(p.out !== undefined ? [p.out - 1] : [])]);
      expect(Math.max(...steps), s.id).toBeLessThan(s.scene.say.length);
    }
  });
  it('las cuentas de las respuestas modelo son coherentes', () => {
    expect((5.9 - 6.7) / (1.68 / Math.sqrt(10))).toBeCloseTo(-1.5058, 3);
    expect(-Math.sqrt(0.82)).toBeCloseTo(-0.9055, 3);
    expect(0.41 - 0.08 / 2).toBeCloseTo(0.37, 6);
  });
});
