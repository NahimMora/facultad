import type { Question, WorkedExercise } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, box, head, scene } from './h';

interface Case {
  module: string; title: string; prompt: string; options: string[]; answer: number;
  labels: [string, string, string]; say: [string, string, string];
}

// Redacción propia a partir de los catorce puntos de un final anterior.
// Las respuestas marcadas por estudiantes se contrastan con los conceptos.
const cases: Case[] = [
  { module: 'm6', title: '1 · Reglas del cursograma', prompt: 'Revisás un circuito administrativo que continúa en otra hoja. ¿Qué mejora permite seguirlo sin perder la referencia?', options: ['Un conector identificado y una simbología definida', 'Un párrafo libre en lugar de símbolos', 'Eliminar los números de los procesos'], answer: 0,
    labels: ['Simbología acordada', 'Procesos y documentos identificados', 'Conector: continuidad entre hojas'], say: [
      'Antes de dibujar, definí qué significa cada símbolo. Esa convención permite que otras personas interpreten el procedimiento y distingue operaciones, documentos y decisiones sin depender de una explicación improvisada.',
      'Identificá los procesos y los comprobantes, incluyendo copias y destinos cuando correspondan. Después seguí su recorrido ordenado: un documento no debería aparecer de golpe en otra etapa sin una transferencia comprensible.',
      'Si el dibujo continúa en otra hoja, usá un conector identificado en ambos extremos.',
    ] },
  { module: 'm6', title: '2 · Qué representa el cursograma', prompt: 'Querés ver quién recibe un comprobante, qué operación realiza y adónde lo envía. ¿Qué representación elegís?', options: ['Un organigrama de cargos', 'Un cursograma del procedimiento', 'Una lista de objetivos estratégicos'], answer: 1,
    labels: ['Entrada: comprobante', 'Operación y sector responsable', 'Salida: documento al siguiente sector'], say: [
      'Ubicá primero la entrada: un comprobante o información que inicia una actividad. El cursograma permite observar cómo circula y qué operaciones se realizan, manteniendo una secuencia comprensible para revisar el procedimiento.',
      'Después relacioná cada operación con el sector que la realiza. Eso permite identificar transferencias, controles, duplicaciones o tareas sin un responsable claro, según la información que incluye el circuito analizado.',
      'Seguí la salida hacia la próxima operación.',
    ] },
  { module: 'm4', title: '3 · Habilidades del liderazgo', prompt: 'Una responsable escucha al equipo, aclara metas y acuerda responsabilidades. ¿Qué conjunto de habilidades está aplicando?', options: ['Solo autoridad formal', 'Solo control de inventarios', 'Comunicación, motivación y delegación'], answer: 2,
    labels: ['Comunicar: metas comprensibles', 'Motivar: compromiso con el objetivo', 'Delegar: responsabilidad y seguimiento'], say: [
      'La comunicación permite compartir el objetivo y comprender lo que necesita el equipo. Escuchar y comprobar que el mensaje se entendió es distinto de emitir órdenes sin observar cómo se interpretan.',
      'La motivación relaciona el trabajo con metas y razones para comprometerse. Liderar exige influir sobre el esfuerzo conjunto y resolver dificultades; tener un cargo no garantiza que aparezca ese compromiso.',
      'Delegar implica asignar responsabilidades y dar condiciones para actuar, con seguimiento adecuado.',
    ] },
  { module: 'm4', title: '4 · Decidir racionalmente', prompt: 'Ya identificaste el problema y comparaste varias alternativas. ¿Cuál es el siguiente paso antes de implementar?', options: ['Elegir una alternativa con los criterios evaluados', 'Reiniciar siempre el diagnóstico', 'Implementar todas simultáneamente'], answer: 0,
    labels: ['Definir y analizar el problema', 'Generar y evaluar alternativas', 'Elegir → aplicar → revisar resultados'], say: [
      'Definí qué problema querés resolver y analizá sus causas y restricciones. Si empezás directamente por una solución favorita, podés invertir esfuerzo en una respuesta que no atiende la necesidad real.',
      'Generá alternativas y comparalas con criterios explícitos. Evaluar es analizar consecuencias, ventajas y dificultades; todavía no implica que hayas elegido la opción que vas a llevar a la práctica.',
      'Después de evaluar, elegí la alternativa y organizá su aplicación.',
    ] },
  { module: 'm2', title: '5 · Equipo e interdependencia', prompt: 'Tres personas integran aportes complementarios y responden por una meta compartida. ¿Qué rasgo permite reconocer un equipo?', options: ['Compartir solamente el lugar físico', 'Coordinar esfuerzos interdependientes para un resultado común', 'Trabajar sin interacción ni responsabilidad conjunta'], answer: 1,
    labels: ['Aportes y habilidades diferentes', 'Coordinación e interdependencia', 'Meta y responsabilidad compartidas'], say: [
      'Las personas pueden aportar habilidades distintas y complementarias. La simple presencia de varias personas no alcanza para reconocer un equipo: también necesitás observar cómo se relacionan para realizar el trabajo.',
      'La coordinación conecta los aportes y genera interdependencia. Cada integrante necesita que los demás cumplan parte del trabajo; por eso la colaboración modifica el resultado que podrían obtener actuando de manera aislada.',
      'El resultado se orienta a una meta común y existe responsabilidad compartida, además de la individual.',
    ] },
  { module: 'm2', title: '6 · Equipos formales', prompt: 'La organización reúne especialistas para resolver un problema específico y disuelve el equipo al terminar. ¿Qué tipo corresponde?', options: ['Comité permanente', 'Grupo espontáneo de amistades', 'Task force temporal'], answer: 2,
    labels: ['Grupo de trabajo: gerente y dependientes', 'Comité: cometido sostenido', 'Task force: objetivo y duración acotados'], say: [
      'Un grupo formal surge de una decisión de la organización y de responsabilidades asignadas. El grupo de trabajo reúne a un responsable con las personas que dependen de él dentro de esa estructura.',
      'Un comité reúne participantes para un cometido que puede sostenerse en el tiempo. La duración ayuda a distinguirlo del equipo creado para abordar una necesidad específica y terminar cuando la resuelve.',
      'En el ejemplo, el objetivo está delimitado y el equipo se disuelve al cumplirlo: corresponde a una task force.',
    ] },
  { module: 'm1', title: '7 · Estructura lineal', prompt: 'En una estructura lineal, ¿qué relación organiza principalmente la autoridad?', options: ['Una cadena jerárquica de mando', 'Ausencia de superiores y subordinados', 'Dos jefaturas obligatorias para cada puesto'], answer: 0,
    labels: ['Dirección', 'Responsable del área', 'Personal dependiente'], say: [
      'La estructura lineal se organiza mediante relaciones jerárquicas de autoridad. En el dibujo, la dirección tiene una relación de mando con el siguiente nivel; no se trata de personas sin dependencia definida.',
      'El responsable del área recibe autoridad y dirige a sus dependientes. Seguí la cadena para distinguirla de una estructura donde cada persona responde a responsables de dimensiones diferentes, como en una organización matricial.',
      'La característica que permite elegir es la cadena de mando.',
    ] },
  { module: 'm2', title: '8 · Comité y organigrama', prompt: 'Un comité es formal porque fue creado por la organización. ¿Eso alcanza para asegurar que siempre aparecerá dibujado en cualquier organigrama?', options: ['Sí, sin excepciones', 'No: su carácter formal y su representación son cuestiones distintas', 'No, porque todo comité es informal'], answer: 1,
    labels: ['Creación por decisión organizativa', 'Comité con responsabilidad asignada', 'Representación según alcance del gráfico'], say: [
      'Para reconocer el carácter formal, mirá cómo se creó el comité y qué responsabilidad le asignó la organización. Eso no depende solamente de que veas su nombre en una imagen determinada del organigrama.',
      'Un comité puede reunir participantes de distintos sectores para un cometido específico. Su pertenencia a la organización formal debe distinguirse de grupos que se forman espontáneamente por afinidad entre sus integrantes.',
      'El alcance y la convención del organigrama determinan qué se representa.',
    ] },
  { module: 'm5', title: '9 · Por qué hace falta control', prompt: 'El ambiente cambió y los resultados se apartan de lo planificado. ¿Qué aporta el control?', options: ['Garantizar que jamás cambie el contexto', 'Eliminar la necesidad de planificar', 'Detectar desvíos y orientar acciones correctivas'], answer: 2,
    labels: ['Estándar o resultado esperado', 'Medir y comparar con lo real', 'Evaluar desvíos → corregir'], say: [
      'El control necesita una referencia: qué resultado se esperaba o qué estándar debía alcanzarse. Aun un plan bien formulado puede quedar afectado por cambios del ambiente o por dificultades durante su ejecución.',
      'Medí lo que ocurrió y comparalo con la referencia. Esa comparación permite identificar desvíos; mirar solamente un resultado aislado, sin objetivo ni criterio, dificulta decidir si requiere alguna intervención.',
      'Evaluá las causas y elegí una acción correctiva cuando corresponda.',
    ] },
  { module: 'm1', title: '10 · División y departamentalización', prompt: 'Una empresa separa el trabajo en tareas y luego reúne las tareas comerciales en un área. ¿Cómo se llama este segundo paso?', options: ['Departamentalización', 'División del trabajo', 'Descentralización de todas las decisiones'], answer: 0,
    labels: ['Trabajo total de la organización', 'División: separar tareas', 'Departamentalización: agrupar actividades'], say: [
      'Partí del trabajo total que necesita la organización. Para organizarlo, primero distinguí qué actividades deben realizarse y qué resultados requiere cada una, sin confundir todavía esa separación con la formación de departamentos.',
      'La división del trabajo descompone actividades en tareas o responsabilidades especializadas. Permite distribuir el esfuerzo, pero todavía necesitás coordinarlo para que los aportes individuales contribuyan al objetivo de la organización.',
      'La departamentalización agrupa actividades relacionadas en áreas.',
    ] },
  { module: 'm5', title: '11 · Niveles de estrategia', prompt: 'Identificá la clasificación de tres niveles de estrategia que distingue el conjunto de la empresa, cada negocio y sus funciones.', options: ['Datos, información y conocimiento', 'Corporativo, de negocio y funcional', 'Entrada, procesamiento y salida'], answer: 1,
    labels: ['Corporativo: conjunto de negocios', 'Negocio: cómo competir', 'Funcional: aporte de cada función'], say: [
      'La estrategia corporativa aborda el conjunto de la organización y sus negocios. El nivel de análisis es más amplio que una función específica; preguntá dónde participa la empresa y cómo se relacionan esas actividades.',
      'La estrategia de negocio se concentra en cómo competir dentro de un negocio determinado. No es idéntica a decidir la cartera completa de actividades de una organización que participa en varios mercados.',
      'La estrategia funcional define el aporte de áreas como operaciones o comercialización.',
    ] },
  { module: 'm7', title: '12 · Estabilidad y cambio', prompt: 'Un sistema se autorregula para conservar su equilibrio y también modifica su estructura para adaptarse. ¿Qué conceptos permiten distinguir esas tendencias?', options: ['Solo entropía', 'Solo división del trabajo', 'Homeostasis y morfogénesis'], answer: 2,
    labels: ['Perturbación del entorno', 'Homeostasis: autorregular el equilibrio', 'Morfogénesis: cambio de estructura'], say: [
      'El entorno puede perturbar el funcionamiento de un sistema. Para analizar la respuesta, distinguí la conservación de condiciones de funcionamiento de los cambios que alteran su forma de organizarse o su estructura.',
      'La homeostasis expresa autorregulación orientada al equilibrio dinámico. No significa inmovilidad absoluta: el sistema puede ajustar su funcionamiento para sostener condiciones que necesita mientras interactúa con un entorno cambiante.',
      'La morfogénesis se relaciona con la transformación de la estructura.',
    ] },
  { module: 'm2', title: '13 · Grupo informal', prompt: 'Varias personas se reúnen voluntariamente para estudiar, sin que la organización les asigne esa actividad. ¿Cómo clasificás ese grupo?', options: ['Informal, surgido por intereses compartidos', 'Task force formal por definición', 'Comité permanente obligatorio'], answer: 0,
    labels: ['Interés compartido', 'Vínculo espontáneo entre personas', 'Grupo informal de estudio'], say: [
      'Empezá por el origen: las personas comparten el interés de estudiar. La necesidad puede aparecer dentro de una organización, pero eso no convierte automáticamente el grupo en una unidad formal de su estructura.',
      'El vínculo surge de una decisión voluntaria de los participantes. Para distinguir formal e informal, observá si existe una asignación organizativa de funciones o si el grupo nace espontáneamente por afinidad o intereses.',
      'En este escenario corresponde grupo informal de estudio.',
    ] },
  { module: 'm3', title: '14 · Poder y autoridad', prompt: 'Una especialista influye por sus conocimientos, aunque no ocupa una jefatura. ¿Qué explica esa influencia?', options: ['Autoridad lineal obligatoria', 'Poder experto', 'Ausencia de cualquier forma de poder'], answer: 1,
    labels: ['Conocimiento reconocido', 'Capacidad de influir: poder experto', 'Autoridad: derecho formal del puesto'], say: [
      'Observá la fuente de influencia: las demás personas valoran los conocimientos de la especialista. Su capacidad de modificar decisiones o conductas no depende necesariamente de tener subordinados asignados en el organigrama.',
      'Ese ejemplo corresponde al poder experto. Poder es la capacidad de influir, y puede tener distintas bases. Concluir que solo una jefatura puede influir dejaría afuera varias relaciones relevantes dentro de una organización.',
      'La autoridad se vincula al derecho formal de decidir o mandar desde un puesto.',
    ] },
];

export const FINAL_EX_SCENES: Record<string, VisScene[]> = Object.fromEntries(cases.map((c, i) => [`sym-final-e${i + 1}`, [scene([
  head(c.title),
  ...c.labels.map((t, s) => box(25, 65 + s * 145, 470, 90, t, { s, fs: 27, c: (['blue', 'yellow', 'green'] as const)[s] })),
  arr([260, 155], [260, 204], { s: 1 }), arr([260, 300], [260, 349], { s: 2 }),
], c.say, 520, 480)]]));

export const FINAL_EXERCISES: WorkedExercise[] = cases.map((c, i) => ({
  id: `sym-final-e${i + 1}`, module: c.module, title: `Final resuelto · ${c.title}`,
  statement: `${c.prompt}\n${c.options.map((o, j) => `${String.fromCharCode(65 + j)}) ${o}`).join('\n')}`,
  steps: c.say.map((body, j) => ({ title: c.labels[j], body })), result: `Correcta: ${c.options[c.answer]}.`,
}));

export const FINAL_QUESTIONS: Question[] = cases.map((c, i) => ({
  id: `sym-final-q${i + 1}`, module: c.module, type: 'mcq', prompt: c.prompt, options: c.options, answer: c.answer,
  explain: c.say.join(' '), source: 'final anterior, adaptación y resolución propias', vis: FINAL_EX_SCENES[`sym-final-e${i + 1}`][0].v,
}));
