import { describe, expect, it } from 'vitest';
import { byExamDate, dateLabel, isISODate, topicChecks } from '../../src/lib/plan';

describe('Plan: fechas y progreso recuperados', () => {
  it('acepta fechas reales y rechaza fechas inexistentes o valores de otro tipo', () => {
    expect(isISODate('2026-11-30')).toBe(true);
    expect(isISODate('2028-02-29')).toBe(true);
    for (const value of ['2026-02-29', '2026-04-31', '2026-13-01', '30/11/2026', '', null, {}, 20261130]) expect(isISODate(value)).toBe(false);
    expect(dateLabel('2026-12-18')).toBe('18/12/2026');
    expect(dateLabel('2026-02-30')).toBe('A confirmar');
  });

  it('ordena las fechas conocidas primero, conserva empates y no modifica la lista original', () => {
    const subjects = [{ id: 'sin-fecha' }, { id: 'ultimo' }, { id: 'primero' }, { id: 'empate' }, { id: 'corrupto' }];
    const result = byExamDate(subjects, { ultimo: '2026-12-18', primero: '2026-11-30', empate: '2026-11-30', corrupto: '2026-02-30' });
    expect(result.map((s) => s.id)).toEqual(['primero', 'empate', 'ultimo', 'sin-fecha', 'corrupto']);
    expect(subjects[0].id).toBe('sin-fecha');
  });

  it('descarta estados corruptos de la checklist sin convertir textos en casillas marcadas', () => {
    expect(topicChecks({ visto: true, pendiente: false, texto: 'true', numero: 1, objeto: {} })).toEqual({ visto: true, pendiente: false });
    for (const value of [null, true, 'todo', [true]]) expect(topicChecks(value)).toEqual({});
  });
});
