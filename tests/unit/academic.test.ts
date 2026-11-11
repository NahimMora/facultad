import { expect, it } from 'vitest';
import { initialCareerStates } from '../../src/content/career';
import { finalBlockers, nextCourses, nextFinal, urgentSubject } from '../../src/lib/academic';

it('separa previas para rendir de previas para cursar seis materias',()=>{
  const states=initialCareerStates(null);
  expect(finalBlockers('fia',states)).toEqual(['am2']);
  expect(finalBlockers('pye',states)).toEqual(['am2']);
  expect(finalBlockers('arq',states)).toEqual(['sd1']);
  expect(finalBlockers('aid',states)).toEqual(['bd']);
  expect(nextCourses(states).map(c=>c.id)).toEqual(['eda','lab1','ml','pye2','so','ingles2']);
  expect(finalBlockers('ml',states)).toEqual(['fia']);
  expect(finalBlockers('fia',{...states,am2:'aprobada'})).toEqual([]);
});

it('recomienda bases pendientes y excluye cursadas aún no aprobadas',()=>{
  const states=initialCareerStates(null);
  expect(nextFinal(states)).toBe('am2');
  expect(nextFinal({...states,am2:'aprobada'})).toBe('bd');
  expect(nextCourses({...states,fia:'cursando'}).map(c=>c.id)).not.toContain('ml');
  expect(nextCourses({...states,eda:'cursando'}).map(c=>c.id)).not.toContain('eda');
});

it('la urgencia de ITc termina exactamente al cierre confirmado',()=>{
  const states=initialCareerStates(null);
  expect(urgentSubject(states,new Date('2026-11-11T10:00:00-03:00'))).toBe('itc');
  expect(urgentSubject(states,new Date('2026-11-13T13:59:59-03:00'))).toBe('itc');
  expect(urgentSubject(states,new Date('2026-11-13T14:00:00-03:00'))).toBeUndefined();
  expect(urgentSubject({...states,itc:'regularizada'},new Date('2026-11-11T10:00:00-03:00'))).toBeUndefined();
});
