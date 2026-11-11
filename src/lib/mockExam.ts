import type { Question } from '../content/types';
import { shuffledIndices } from './shuffle';

export interface MockSession {
  ids: string[];
  answers: Record<string, number | boolean>;
  startedAt: number;
  finishedAt?: number;
}

export function startMock(items: Question[], count: number, now = Date.now()): MockSession {
  return { ids: shuffledIndices(items.length, `${now}-${Math.random()}`).slice(0, Math.max(1, Math.min(items.length, Math.floor(count)))).map((i) => items[i].id), answers: {}, startedAt: now };
}

export function validMock(value: unknown, items: Question[]): value is MockSession {
  if (!value || typeof value !== 'object') return false;
  const s = value as MockSession;
  if (!Array.isArray(s.ids) || !s.ids.length || new Set(s.ids).size !== s.ids.length || !Number.isFinite(s.startedAt) || s.startedAt <= 0 || !s.answers || typeof s.answers !== 'object' || Array.isArray(s.answers)) return false;
  if (s.finishedAt !== undefined && (!Number.isFinite(s.finishedAt) || s.finishedAt < s.startedAt)) return false;
  if (!s.ids.every((id) => items.some((q) => q.id === id))) return false;
  return Object.entries(s.answers).every(([id, a]) => {
    const q = items.find((q) => q.id === id);
    return s.ids.includes(id) && !!q && (q.type === 'tf' ? typeof a === 'boolean' : Number.isInteger(a) && typeof a === 'number' && a >= 0 && a < q.options.length);
  });
}
