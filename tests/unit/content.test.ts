import { describe, expect, it } from 'vitest';
import { SUBJECTS, allModules, examModules } from '../../src/content/subjects';
import type { SubjectContent } from '../../src/content/types';
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
import { shuffledIndices } from '../../src/lib/shuffle';
import { countdownLabel, daysUntil } from '../../src/lib/dates';

const CONTENT: SubjectContent[] = [aid, itc, iisw, fia, pye, bd, am2, sd1, ca, sym, arq];

describe('registro de materias', () => {
  it('tiene las 11 materias con id único', () => {
    expect(SUBJECTS).toHaveLength(11);
    expect(new Set(SUBJECTS.map((s) => s.id)).size).toBe(11);
  });

  it('2 cursando y 9 regulares', () => {
    expect(SUBJECTS.filter((s) => s.status === 'cursando').map((s) => s.id).sort()).toEqual(['aid', 'itc']);
    expect(SUBJECTS.filter((s) => s.status === 'regular')).toHaveLength(9);
  });

  for (const s of SUBJECTS) {
    it(`${s.id}: módulos únicos, exámenes válidos y foco existente`, () => {
      const ids = allModules(s).map((m) => m.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids.length).toBeGreaterThan(0);
      for (const e of s.exams) for (const m of e.modules) expect(ids, `${s.id}/${e.id} → ${m}`).toContain(m);
      expect(s.exams.map((e) => e.id)).toContain(s.focus.examId);
      expect(s.exams.some((e) => e.kind === 'final')).toBe(true);
      expect(examModules(s, 'final').length).toBe(ids.length);
    });
  }
});

describe('contenido de estudio', () => {
  for (const c of CONTENT) {
    const s = SUBJECTS.find((x) => x.id === c.subjectId)!;
    const mods = allModules(s).map((m) => m.id);

    it(`${c.subjectId}: todo apunta a módulos existentes`, () => {
      for (const x of [...c.theory, ...c.questions, ...c.exercises]) expect(mods, x.id).toContain(x.module);
    });

    it(`${c.subjectId}: ids únicos`, () => {
      const ids = [...c.theory, ...c.questions, ...c.exercises].map((x) => x.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it(`${c.subjectId}: preguntas bien formadas (respuesta en rango, opciones distintas, explicación)`, () => {
      for (const q of c.questions) {
        expect(q.explain.length, q.id).toBeGreaterThan(20);
        if (q.type === 'mcq') {
          expect(q.options.length, q.id).toBeGreaterThanOrEqual(3);
          expect(q.answer, q.id).toBeGreaterThanOrEqual(0);
          expect(q.answer, q.id).toBeLessThan(q.options.length);
          expect(new Set(q.options).size, q.id).toBe(q.options.length);
          if (q.why) expect(q.why.length, q.id).toBe(q.options.length);
        }
      }
    });

    it(`${c.subjectId}: cada módulo del 2º parcial tiene teoría y preguntas`, () => {
      const p2 = s.exams.find((e) => e.id === 'p2');
      for (const m of p2?.modules ?? []) {
        expect(c.theory.some((t) => t.module === m), `teoría ${m}`).toBe(true);
        expect(c.questions.some((q) => q.module === m), `preguntas ${m}`).toBe(true);
      }
    });
  }
});

describe('utilidades', () => {
  it('shuffledIndices es una permutación estable', () => {
    const a = shuffledIndices(5, 'x');
    expect([...a].sort()).toEqual([0, 1, 2, 3, 4]);
    expect(shuffledIndices(5, 'x')).toEqual(a);
  });

  it('cuenta regresiva', () => {
    const today = new Date(2026, 10, 6);
    expect(daysUntil('2026-11-10', today)).toBe(4);
    expect(daysUntil('2026-11-06', today)).toBe(0);
    expect(countdownLabel(0)).toBe('¡es hoy!');
    expect(countdownLabel(1)).toBe('mañana');
    expect(countdownLabel(-2)).toBe('ya pasó');
  });
});
