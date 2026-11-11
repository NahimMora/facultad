import { load } from './storage';
import { SUBJECTS } from '../content/subjects';
export interface StudyResume { subject: string; exam: string; topic: string; mode: string }
export function readResume(): StudyResume | null {
  const value = load<unknown>('study-resume', null);
  if (!value || typeof value !== 'object') return null;
  const v = value as StudyResume; const s = SUBJECTS.find((s) => s.id === v.subject);
  return s && s.exams.some((e) => e.id === v.exam) && typeof v.topic === 'string' && ['aprender','practicar','simulacro','machete'].includes(v.mode) ? v : null;
}
export function resumeUrl(r: StudyResume) { return `/m/${r.subject}?${new URLSearchParams({examen:r.exam,modo:r.mode,tema:r.topic})}`; }
