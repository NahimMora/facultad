import { describe, expect, it } from 'vitest';
import sym from '../../src/content/subjects/sym';
import type { MapNode } from '../../src/content/types';

const walk = (n: MapNode): MapNode[] => [n, ...(n.kids ?? []).flatMap(walk)];

describe('mapas conceptuales', () => {
  it('cada concepto enlazado abre un tema existente de su módulo', () => {
    for (const map of sym.maps ?? []) {
      const ids = sym.theory.filter((b) => b.module === map.module).map((b) => b.id);
      for (const n of map.branches.flatMap(walk)) if (n.topic) expect(ids, `${map.module}: ${n.t}`).toContain(n.topic);
      const linked = new Set(map.branches.flatMap(walk).map((n) => n.topic).filter(Boolean));
      expect([...linked].sort(), `${map.module}: todos los temas aparecen en el mapa`).toEqual([...ids].sort());
    }
  });
});
