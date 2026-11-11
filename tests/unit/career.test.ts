import { expect, it } from 'vitest';
import { CAREER, initialCareerStates } from '../../src/content/career';

it('el registro completo tiene ids únicos y correlativas existentes, sin ciclos', () => {
  expect(CAREER).toHaveLength(55);
  expect(new Set(CAREER.map(c=>c.id)).size).toBe(CAREER.length);
  const visit=(id:string,path:string[])=>{
    expect(path).not.toContain(id);
    const course=CAREER.find(c=>c.id===id);
    expect(course, id).toBeDefined();
    course!.prerequisites.forEach(p=>visit(p,[...path,id]));
  };
  CAREER.forEach(c=>visit(c.id,[]));
});
it('distingue las cuatro aprobadas, Inglés I regularizada y las materias sin cursar', () => {
  const states=initialCareerStates(null);
  expect(Object.keys(states).filter(id=>states[id]==='aprobada').sort()).toEqual(['algebra','am1','ip','lineal']);
  expect(states.ingles1).toBe('regularizada');
  expect(states.eda).toBe('sin-cursar');
  expect(states.lab1).toBe('sin-cursar');
  expect(states.aid).toBe('cursando');
});
it('recupera cambios válidos y descarta estados corruptos', () => {
  expect(initialCareerStates({ingles1:'aprobada',eda:'inventado',am1:42})).toMatchObject({ingles1:'aprobada',eda:'sin-cursar',am1:'aprobada'});
  expect(initialCareerStates(['aprobada'])).toEqual(initialCareerStates(null));
});
