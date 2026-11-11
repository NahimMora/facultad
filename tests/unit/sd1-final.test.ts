import { describe, expect, it } from 'vitest';
import { JK_OUTPUT, LOGIC_ROWS, SOP_MINTERMS } from '../../src/content/visual/sd1-final';

describe('resolución del modelo de Digitales', () => {
  it('conserva los minterms y el orden DCBA en las tablas', () => {
    expect(LOGIC_ROWS.filter((r) => r[6] === '1').map((r) => parseInt(r[0], 2))).toEqual([0, 3, 5, 8, 10, 13, 15]);
    expect(SOP_MINTERMS).toEqual([1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 14, 15]);
  });
  it('la expresión reducida cubre exactamente los minterms del mapa', () => {
    const expected = [2, 3, 4, 5, 6, 7, 12, 13, 15];
    for (let n = 0; n < 16; n++) {
      const [d, c, b, a] = [3, 2, 1, 0].map((k) => (n >> k) & 1);
      expect(Boolean((c && !b) || (b && !d) || (a && c))).toBe(expected.includes(n));
    }
  });
  it('resuelve los ocho flancos del JK desde Q=0', () => {
    expect(JK_OUTPUT).toEqual([1, 1, 0, 0, 1, 1, 0, 1]);
  });
});
