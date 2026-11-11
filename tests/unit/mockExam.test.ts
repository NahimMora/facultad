import { describe, expect, it } from 'vitest';
import aid from '../../src/content/subjects/aid';
import { startMock, validMock } from '../../src/lib/mockExam';

describe('simulacro persistente', () => {
  it('sortea sin repetidos dentro del banco y limita la cantidad', () => {
    const s = startMock(aid.questions, 20);
    expect(s.ids).toHaveLength(20);
    expect(new Set(s.ids).size).toBe(20);
    expect(validMock(s, aid.questions)).toBe(true);
    expect(startMock(aid.questions, 999).ids).toHaveLength(aid.questions.length);
  });
  it('descarta progreso corrupto o de un banco que cambió', () => {
    for (const v of [null, {}, { ids: ['inexistente'], answers: {}, startedAt: 1 }]) expect(validMock(v, aid.questions)).toBe(false);
    const s = startMock(aid.questions, 1);
    expect(validMock({ ...s, answers: { [s.ids[0]]: -1 } }, aid.questions)).toBe(false);
    expect(validMock({ ...s, finishedAt: 0 }, aid.questions)).toBe(false);
  });
});
