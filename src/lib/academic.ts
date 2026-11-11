import { CAREER, initialCareerStates, type CareerState } from '../content/career';
export const CAREER_KEY = 'career-states';
export type AcademicStates = ReturnType<typeof initialCareerStates>;
export const courseName = (id: string) => CAREER.find((c) => c.id === id)?.name ?? id;
export function finalBlockers(id: string, states: AcademicStates) {
  return (CAREER.find((c) => c.id === id)?.prerequisites ?? []).filter((p) => states[p] !== 'aprobada');
}
export function nextCourses(states: AcademicStates) {
  return ['eda','lab1','ml','pye2','so','ingles2','am3','lab2','discreta','fisica1','vision'].map((id) => CAREER.find((c) => c.id === id)!).filter((c) => states[c.id] === 'sin-cursar' && c.prerequisites.every((p) => ['regularizada','aprobada'].includes(states[p]))).slice(0,6);
}
export function nextFinal(states: AcademicStates) {
  return ['am2','bd','sd1','iisw','ca','sym','fia','pye','arq','aid','itc'].find((id) => states[id] === 'regularizada' && finalBlockers(id, states).length === 0);
}
export function urgentSubject(states: AcademicStates, now = new Date()) {
  if (states.itc === 'cursando' && now >= new Date('2026-11-10T00:00:00-03:00') && now < new Date('2026-11-13T14:00:00-03:00')) return 'itc';
  return undefined;
}
export function stateCount(states: AcademicStates, state: CareerState) { return CAREER.filter((c) => states[c.id] === state).length; }
