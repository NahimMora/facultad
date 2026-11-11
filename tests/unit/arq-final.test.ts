import { describe, expect, it } from 'vitest';
import { IEEE_FINAL_HEX } from '../../src/content/visual/arq-final';

describe('representaciones del final de Arquitectura', () => {
  it('redondea −278,05 a binary32 sin cambiarlo por −278,5', () => {
    const view = new DataView(new ArrayBuffer(4));
    view.setFloat32(0, -278.05);
    expect(view.getUint32(0).toString(16).toUpperCase()).toBe(IEEE_FINAL_HEX);
    expect(view.getFloat32(0)).toBe(-278.04998779296875);
  });
  it('mantiene explícita la cuantización antes de restar punto fijo', () => {
    for (const quantize of [Math.trunc, Math.round]) {
      const a = quantize(17.89 * 4), b = quantize(21.2 * 4);
      expect(((a - b) & 255).toString(2)).toBe('11110011');
      expect((a - b) / 4).toBe(-3.25);
    }
  });
});
