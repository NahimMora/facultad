import { describe, expect, it } from 'vitest';
import sym from '../../src/content/subjects/sym';
import iisw from '../../src/content/subjects/iisw';
import pye from '../../src/content/subjects/pye';
import arq from '../../src/content/subjects/arq';
import type { MapNode } from '../../src/content/types';

const walk = (n: MapNode): MapNode[] => [n, ...(n.kids ?? []).flatMap(walk)];

describe('mapas conceptuales', () => {
  it('cada concepto enlazado abre un tema existente de su módulo', () => {
    for (const c of [sym, iisw, pye, arq]) for (const map of c.maps ?? []) {
      const ids = c.theory.filter((b) => b.module === map.module).map((b) => b.id);
      for (const n of map.branches.flatMap(walk)) if (n.topic) expect(ids, `${map.module}: ${n.t}`).toContain(n.topic);
      const linked = new Set(map.branches.flatMap(walk).map((n) => n.topic).filter(Boolean));
      expect([...linked].sort(), `${map.module}: todos los temas aparecen en el mapa`).toEqual([...ids].sort());
    }
  });
});

describe('módulos ampliados tema por tema', () => {
  const upTo6 = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'];
  const cases = [[sym, upTo6], [iisw, upTo6], [pye, Array.from({ length: 9 }, (_, i) => `u${i + 1}`)]] as const;
  it.each(cases.map(([c, mods]) => [c.subjectId, c, mods] as const))('%s: cada tema tiene introducción, diagrama y práctica, y cada módulo su mapa', (_id, c, mods) => {
    for (const m of mods) {
      const topics = c.theory.filter((b) => b.module === m);
      expect(c.maps?.some((x) => x.module === m), m).toBe(true);
      expect(topics.length, m).toBeGreaterThan(1);
      for (const b of topics) {
        expect(b.lead?.length, b.id).toBeGreaterThan(0);
        expect(b.scenes?.length, b.id).toBeGreaterThan(0);
        expect(c.questions.some((q) => q.topic === b.id), `${b.id}: sin práctica`).toBe(true);
      }
    }
  });

  it('cada pregunta con tema apunta a un tema de su propio módulo', () => {
    for (const [c] of cases) for (const q of c.questions) if (q.topic) expect(c.theory.find((b) => b.id === q.topic)?.module, q.id).toBe(q.module);
  });
});
