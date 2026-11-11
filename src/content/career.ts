import { SUBJECTS } from './subjects';

export type CareerState = 'sin-cursar' | 'cursando' | 'regularizada' | 'aprobada';
export const CAREER_STATES: Record<CareerState, string> = { 'sin-cursar': 'Sin cursar', cursando: 'Cursando', regularizada: 'Regularizada · final pendiente', aprobada: 'Aprobada con final' };
export interface CareerCourse { id: string; name: string; semester: number; prerequisites: string[]; note?: string }
// Registro propio de nombres y relaciones del plan 2023 proporcionado por el usuario.
// No contiene el PDF ni reproduce sus figuras.
const groups: [string, string, string[]?, string?][][] = [
  [['sym','Sistemas y Métodos'],['am1','Análisis Matemático I'],['sd1','Sistemas Digitales I'],['ip','Introducción a la Programación'],['ca','Computación Aplicada']],
  [['algebra','Álgebra'],['am2','Análisis Matemático II',['am1']],['arq','Arquitectura de Computadores',['sd1']],['bd','Base de Datos'],['eda','Estructuras de Datos y Algoritmos',['ip']],['ingles1','Inglés I']],
  [['lineal','Álgebra Lineal',['algebra']],['fia','Fundamentos de Inteligencia Artificial',['am2']],['pye','Probabilidad y Estadística',['am2']],['lab1','Laboratorio I',['ip']],['iisw','Introducción a la Ingeniería de Software'],['cultura','Electiva de Cultura General']],
  [['as','Análisis de Sistemas',['iisw','lab1']],['pye2','Probabilidad y Estadística II',['pye']],['ml','Aprendizaje de Máquina',['fia']],['aid','Análisis de la Información y la Decisión',['bd']],['discreta','Matemática Discreta',['algebra']],['ingles2','Inglés II',['ingles1']]],
  [['itc','Introducción a las Comunicaciones'],['fisica1','Física I',['am1']],['lab2','Laboratorio II',['ip','bd']],['rn','Redes Neuronales',['ml','pye2']],['pln','Procesamiento de Lenguaje Natural',['ml','pye2']]],
  [['bigdata','Big Data',['aid']],['so','Sistemas Operativos',['arq']],['fisica2','Física II',['fisica1','am2']],['am3','Análisis Matemático III',['am2']],['features','Ingeniería de Características',['ml']],['ingles3','Inglés III',['ingles2']]],
  [['refuerzo','Aprendizaje por Refuerzo',['rn']],['lab3','Laboratorio III',['so','eda','ca']],['numerico','Cálculo Numérico',['am3']],['electiva1','Electiva I'],['vision','Visión Computacional',['fia']],['ingles4','Inglés IV',['ingles3']]],
  [['ds','Fundamentos de Data Science',['aid']],['electiva2','Electiva II'],['derecho','Derecho aplicado a la Informática'],['proyectos','Administración de Proyectos',['as']],['investigacion','Proyecto de Investigación I',['lab1','as']]],
  [['economia','Fundamentos de Economía y Finanzas',['am1']],['robotica','Introducción a la Robótica'],['electiva3','Electiva III'],['sod','Sistemas Operativos Distribuidos',['so']],['practica','Práctica Profesional',['proyectos','lab3','ds']]],
  [['organizacion','Organización, Gestión y Entrepreneurship',['economia']],['electiva4','Electiva IV'],['electiva5','Electiva V'],['electiva6','Electiva VI'],['tfg','Trabajo Final de Grado',[],'El plan indica 35 asignaturas como requisito.']],
];
export const CAREER: CareerCourse[] = groups.flatMap((group, semester) => group.map(([id,name,prerequisites=[],note]) => ({id,name,semester:semester+1,prerequisites,note})));

export function initialCareerStates(raw: unknown): Record<string, CareerState> {
  const overrides = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw as Record<string,unknown> : {};
  return Object.fromEntries(CAREER.map((course) => {
    const subject = SUBJECTS.find((s) => s.id === course.id);
    const confirmed: CareerState = ['am1','ip','algebra','lineal'].includes(course.id) ? 'aprobada' : course.id === 'ingles1' ? 'regularizada' : subject?.status === 'cursando' ? 'cursando' : subject?.status === 'regular' ? 'regularizada' : 'sin-cursar';
    const stored = overrides[course.id];
    return [course.id, typeof stored === 'string' && Object.prototype.hasOwnProperty.call(CAREER_STATES, stored) ? stored as CareerState : confirmed];
  }));
}
