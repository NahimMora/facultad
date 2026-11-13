import { describe, expect, it } from 'vitest';
import type { SubjectContent } from '../../src/content/types';
import type { Prim, VisScene } from '../../src/vis/types';
import aid from '../../src/content/subjects/aid';
import itc from '../../src/content/subjects/itc';
import iisw from '../../src/content/subjects/iisw';
import fia from '../../src/content/subjects/fia';
import pye from '../../src/content/subjects/pye';
import bd from '../../src/content/subjects/bd';
import am2 from '../../src/content/subjects/am2';
import sd1 from '../../src/content/subjects/sd1';
import ca from '../../src/content/subjects/ca';
import sym from '../../src/content/subjects/sym';
import arq from '../../src/content/subjects/arq';

const CONTENT: SubjectContent[] = [aid, itc, iisw, fia, pye, bd, am2, sd1, ca, sym, arq];

/** Todos los pasos en los que aparece algún elemento (incluidos los internos). */
function stepsUsed(p: Prim): number[] {
  const out = [p.s ?? 0];
  const add = (xs?: { s?: number }[]) => xs?.forEach((x) => out.push(x.s ?? 0));
  if (p.k === 'bits') add(p.cells);
  if (p.k === 'seq') add(p.msgs);
  if (p.k === 'stack') add(p.layers);
  if (p.k === 'bars') add(p.items);
  if (p.k === 'plot') { add(p.fns); add(p.dots); add(p.vl); add(p.hlines); }
  if (p.k === 'table') out.push(...(p.rs ?? []), ...(p.hi ?? []).map((h) => h.s));
  if (p.k === 'tree') { const walk = (n: { s?: number; kids?: unknown[] }) => { out.push(n.s ?? 0); (n.kids as typeof n[] | undefined)?.forEach(walk); }; walk(p.root); }
  return out;
}

function scenesOf(c: SubjectContent): [string, VisScene][] {
  return [
    ...c.theory.flatMap((b) => (b.scenes ?? []).map((s) => [b.id, s] as [string, VisScene])),
    ...c.exercises.flatMap((e) => (e.scenes ?? []).map((s) => [e.id, s] as [string, VisScene])),
    ...[...c.questions, ...(c.selfAssessments ?? [])].flatMap((q) => (q.scenes ?? []).map((s) => [q.id, s] as [string, VisScene])),
  ];
}

describe.each(CONTENT.map((c) => [c.subjectId, c] as const))('diagramas de %s', (_id, c) => {
  it('cada escena tiene explicación en todos sus pasos y ningún elemento cae en un paso inexistente', () => {
    for (const [id, sc] of scenesOf(c)) {
      expect(sc.say.length, id).toBeGreaterThan(0);
      for (const say of sc.say) expect(say.trim().length, id).toBeGreaterThan(15);
      for (const p of sc.v.items) for (const s of stepsUsed(p)) expect(s, `${id}: paso ${s} de ${sc.say.length}`).toBeLessThan(sc.say.length);
    }
  });

  it('las fórmulas de los gráficos compilan y dan números', () => {
    for (const [id, sc] of scenesOf(c)) for (const p of sc.v.items) {
      if (p.k !== 'plot') continue;
      for (const f of p.fns ?? []) for (const expr of [f.f, f.between].filter(Boolean) as string[]) {
        const fn = new Function('x', `const {sin,cos,tan,exp,log,sqrt,abs,PI,E,pow,floor,ceil,max,min,sign,atan,round}=Math; return (${expr});`) as (x: number) => number;
        const xs = Array.from({ length: 21 }, (_, i) => p.xr[0] + ((p.xr[1] - p.xr[0]) * i) / 20);
        expect(xs.some((x) => Number.isFinite(fn(x))), `${id}: ${expr}`).toBe(true);
      }
    }
  });

  it('las flechas apuntan a cajas o íconos que existen', () => {
    for (const [id, sc] of scenesOf(c)) {
      const ids = new Set(sc.v.items.flatMap((p) => ((p.k === 'box' || p.k === 'icon') && p.id ? [p.id] : [])));
      for (const p of sc.v.items) if (p.k === 'arrow') for (const e of [p.a, p.b]) if (typeof e === 'string') expect(ids.has(e), `${id}: ${e}`).toBe(true);
    }
  });

  it('cada clase en video usa temas, ejercicios y preguntas que existen', () => {
    for (const block of c.theory.filter((b) => b.videoParts?.length)) {
      expect(c.lessons?.some((l) => block.videoParts!.every((p) => l.parts.includes(p))), `${block.id}: falta una clase con sus partes de video`).toBe(true);
    }
    for (const l of c.lessons ?? []) {
      expect(l.id.startsWith(`${c.subjectId}-clase-`)).toBe(true);
      for (const part of l.parts) {
        if (part.startsWith('q:')) expect(c.questions.some((q) => q.id === part.slice(2)), `${l.id} ${part}`).toBe(true);
        else if (part.startsWith('ex:')) expect(c.exercises.some((e) => e.id === part.slice(3)), `${l.id} ${part}`).toBe(true);
        else expect(c.theory.some((b) => b.id === part), `${l.id} ${part}`).toBe(true);
      }
    }
  });
});
