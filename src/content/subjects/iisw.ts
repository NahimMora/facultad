import { POCKET } from '../cheatsheets';
import { M1_MAP, M1_QUESTIONS, M1_THEORY, M2_MAP, M2_QUESTIONS, M2_THEORY } from '../visual/iisw-m1-m2';
import { M3_MAP, M3_QUESTIONS, M3_THEORY, M4_MAP, M4_QUESTIONS, M4_THEORY } from '../visual/iisw-m3-m4';
import { M5_MAP, M5_QUESTIONS, M5_THEORY, M6_MAP, M6_QUESTIONS, M6_THEORY } from '../visual/iisw-m5-m6';
import type { Question, SubjectContent, TheoryBlock, VideoItem, WorkedExercise } from '../types';
import port from '../banks/iisw-port.json';
import { VIDEOS } from '../videos/iisw';
import { EX_SCENES, SCENES } from '../visual/iisw';
import { FINAL_EXERCISES, FINAL_QUESTIONS, FINAL_SCENES, FINAL_LESSON } from '../visual/iisw-final';

/**
 * IISW · final. Módulos 1–7: redacción propia sobre los apuntes de la cátedra y los temas de finales viejos.
 * Módulos 8–12: contenido propio exportado del sitio del 2º parcial (iisw-parcial2).
 */
const SRC_F = 'finales anteriores (Drive de estudiantes)';

const theory: TheoryBlock[] = [
  ...M1_THEORY,
  ...M2_THEORY,
  ...M3_THEORY,
  ...M4_THEORY,
  ...M5_THEORY,
  ...M6_THEORY,
  { id: 'm7-srs', module: 'm7', title: 'Especificación de requerimientos (SRS)', points: [
    'La **SRS** describe el **comportamiento externo** completo del software, con requerimientos funcionales y no funcionales. Mejor si la hacen proveedor y cliente juntos.',
    'Debe incluir: **funcionalidad, interfaces externas, rendimiento, atributos** (portabilidad, seguridad…) y **restricciones de diseño**. **No** incluye costos, cronogramas, diseño ni planes de prueba o configuración.',
    'Atributos de una buena SRS (IEEE 830): **correcta, no ambigua, completa, consistente, clasificada por importancia, verificable, modificable y trazable**.',
    'El estándar **IEEE 830-1998** es una **guía** que las organizaciones adaptan.',
    '**Cuantificación:** además del "qué", el "cuánto": un mismo problema con distinto volumen lleva a soluciones distintas. Requisitos **estáticos** (terminales, usuarios simultáneos, cantidad de información) y **dinámicos** (transacciones por período). Tabla por entidad: volumen inicial, crecimiento, máximo, obsolescencia.',
    'Requerimientos **no funcionales**: restricciones del cliente y atributos de calidad; deben ser medibles (**SMART**) para poder verificarse.',
  ], trap: 'V/F de final: "al relevar hay que cuantificar, **aunque esto no afectará la solución**" → **Falso**: el volumen sí cambia la solución.' },
];

const questions: Question[] = [
  { id: 'iswf-01', module: 'm1', type: 'mcq', prompt: 'Marque la diferencia correcta entre **sistema** y **software**:', options: ['Un sistema abarca procesos computarizados y manuales; el software es solo la parte computacional', 'El sistema es manual y el software es computacional', 'El sistema es puramente computacional y el software son procesos manuales', 'No hay diferencia'], answer: 0, explain: 'Un sistema basado en computadora combina software, hardware, personas, datos, documentación y **procedimientos** (incluye lo manual). El software es el componente **lógico**.', source: SRC_F },
  { id: 'iswf-02', module: 'm1', type: 'mcq', prompt: 'La cualidad de **oportunidad** se refiere a:', options: ['La habilidad de entregar el producto a tiempo', 'Que el software corra en distintas plataformas', 'Que el usuario pueda depender del software', 'Que se use eficientemente la memoria'], answer: 0, explain: 'Es una cualidad **del proceso**: entregar a tiempo, con buena estimación, planificación de recursos y metas claras. Las otras opciones son portabilidad, confiabilidad y performance.', source: SRC_F },
  { id: 'iswf-03', module: 'm1', type: 'mcq', prompt: 'Sobre la **modularidad**, ¿qué es correcto?', options: ['Separa un problema complejo en partes más chicas y debe lograr alta cohesión y bajo acoplamiento', 'Debe presentar baja cohesión y alto acoplamiento', 'Solo sirve en proyectos chicos', 'Aumenta la complejidad'], answer: 0, explain: 'Alta **cohesión** (cada módulo hace una cosa bien) y bajo **acoplamiento** (poca dependencia entre módulos) es la marca de un buen diseño modular.', source: SRC_F },
  { id: 'iswf-04', module: 'm1', type: 'mcq', prompt: 'Un producto es **robusto** si:', options: ['Se comporta razonablemente aun en situaciones no previstas en la especificación', 'Cumple exactamente la especificación', 'Usa poca memoria', 'Es fácil de usar'], answer: 0, explain: 'Correctitud = cumplir la especificación; **robustez** = no romperse ante lo no previsto (ej.: una tecla equivocada no produce un error irrecuperable).' },
  { id: 'iswf-05', module: 'm1', type: 'tf', prompt: 'Productividad, oportunidad y visibilidad son cualidades del proceso de desarrollo.', answer: true, explain: 'Las tres describen el **proceso**: eficiencia en recursos, entrega a tiempo y estado documentado y accesible.' },
  { id: 'iswf-06', module: 'm1', type: 'mcq', prompt: 'Según Brooks, la complejidad, la conformidad, la variabilidad y la invisibilidad son dificultades:', options: ['Esenciales', 'Accidentales', 'Temporales', 'Del hardware'], answer: 0, explain: 'Son **esenciales**: inherentes a la naturaleza del software y persisten pese al avance tecnológico. Las accidentales son las que las herramientas pueden reducir.' },
  { id: 'iswf-07', module: 'm2', type: 'mcq', prompt: '¿Qué modelo de ciclo de vida incorpora el **análisis de riesgos**?', options: ['Espiral', 'Cascada', 'Incremental', 'Prototipos'], answer: 0, explain: 'Boehm propuso el **espiral** con un cuadrante específico de análisis de riesgos; cada vuelta es un mini-proyecto centrado en riesgos.' },
  { id: 'iswf-08', module: 'm2', type: 'mcq', prompt: 'La principal desventaja de cascada (el cliente no ve avances hasta muy tarde) la subsana el modelo:', options: ['Incremental', 'Espiral', 'Clásico modificado', 'Formal'], answer: 0, explain: 'El **incremental** entrega subsistemas operativos parciales, así el cliente ve y usa avances desde temprano.', source: SRC_F },
  { id: 'iswf-09', module: 'm2', type: 'mcq', prompt: 'Las fases del **Proceso Unificado (UP)** son:', options: ['Inicio, Elaboración, Construcción y Transición', 'Análisis, Diseño, Codificación y Prueba', 'Planificación, Riesgos, Ingeniería y Evaluación', 'Sprint, Review, Retro y Planning'], answer: 0, explain: 'UP: **Inicio, Elaboración, Construcción, Transición**, cada una con iteraciones. Planificación-Riesgos-Ingeniería-Evaluación son los cuadrantes del **espiral**.', source: SRC_F },
  { id: 'iswf-10', module: 'm2', type: 'mcq', prompt: 'El UP es un modelo:', options: ['Iterativo e incremental (híbrido)', 'Estrictamente secuencial', 'Sin fases', 'Exclusivo de métodos formales'], answer: 0, explain: 'UP combina fases con iteraciones que recorren todos los flujos de trabajo: es **iterativo e incremental**, y se asocia a UML.' },
  { id: 'iswf-11', module: 'm2', type: 'mcq', prompt: 'El modelo de **prototipos** es especialmente útil cuando:', options: ['El cliente no puede describir claramente lo que quiere', 'Los requisitos están totalmente definidos y estables', 'El proyecto es crítico y requiere matemática formal', 'Hay que entregar sin ver al cliente'], answer: 0, explain: 'El prototipo simula el sistema para obtener **retroalimentación** y descubrir requisitos. Con requisitos estables conviene cascada.' },
  { id: 'iswf-12', module: 'm2', type: 'tf', prompt: 'El modelo en cascada es apropiado cuando los requisitos están completamente definidos al inicio y no se esperan cambios.', answer: true, explain: 'Por su rigidez, cascada solo encaja con requisitos **estables y completos** desde el principio.' },
  { id: 'iswf-13', module: 'm3', type: 'mcq', prompt: 'En Scrum, ¿quién administra el product backlog y define prioridades?', options: ['El Product Owner', 'El Scrum Master', 'El equipo', 'El cliente final directamente'], answer: 0, explain: 'El **Product Owner** (una sola persona) es dueño del backlog. El Scrum Master es coach y quita impedimentos; no es jefe.', source: SRC_F },
  { id: 'iswf-14', module: 'm3', type: 'tf', prompt: 'En Scrum, el Product Owner y el Scrum Master pueden ser la misma persona si el equipo es chico.', answer: false, explain: 'La cátedra lo marca: **nunca** pueden ser la misma persona, porque tienen responsabilidades en tensión (valor del producto vs proceso del equipo).' },
  { id: 'iswf-15', module: 'm3', type: 'mcq', prompt: '¿Cuál de estas es una práctica de **XP**?', options: ['Programación en pares y cliente en el sitio', 'Sprints con Scrum Master', 'Documentación exhaustiva antes de codificar', 'Análisis de riesgos por cuadrantes'], answer: 0, explain: 'XP: liberación limitada, semana de 40 h, **cliente en el sitio** y **programación en pares**, con historias de usuario.' },
  { id: 'iswf-16', module: 'm3', type: 'mcq', prompt: 'Duración típica de un **sprint**:', options: ['Entre 1 y 4 semanas', 'Un día', 'Entre 3 y 6 meses', 'Lo que dure el proyecto'], answer: 0, explain: 'Sprints de **1 a 4 semanas**, con equipo, calidad y alcance fijos durante el sprint.' },
  { id: 'iswf-17', module: 'm4', type: 'mcq', prompt: 'Una entrevista que empieza con preguntas **abiertas** y termina con **cerradas** tiene estructura:', options: ['Embudo', 'Pirámide', 'Diamante', 'Libre'], answer: 0, explain: '**Embudo** (deductiva): de lo general a lo específico; útil cuando el entrevistado necesita expresarse. Pirámide es al revés y diamante combina las dos.', source: SRC_F },
  { id: 'iswf-18', module: 'm4', type: 'mcq', prompt: 'La estructura **piramidal** se usa cuando:', options: ['El entrevistado no se muestra participativo: se arranca con cerradas para involucrarlo', 'El entrevistado necesita expresar sus sentimientos', 'Se quiere evitar preguntas cerradas', 'Hay muchas personas a la vez'], answer: 0, explain: 'Pirámide = inductiva: **cerradas → abiertas**, para ir "soltando" a alguien poco participativo.' },
  { id: 'iswf-19', module: 'm4', type: 'mcq', prompt: '¿Cuándo conviene usar un **cuestionario**?', options: ['Cuando hay muchas personas o están en ubicaciones dispersas', 'Para ver procedimientos informales en el puesto', 'Siempre antes que una entrevista', 'Solo con la gerencia'], answer: 0, explain: 'El cuestionario escala: muchas personas, filiales lejanas, estudios preliminares. Los procedimientos informales se detectan con **observación directa**.', source: SRC_F },
  { id: 'iswf-20', module: 'm4', type: 'mcq', prompt: '"¿Qué opina de este **obsoleto** modo de trabajo?" es un ejemplo de pregunta:', options: ['Tendenciosa', 'De sondeo', 'Cerrada', 'Doble'], answer: 0, explain: 'Muestra la opinión del entrevistador y condiciona la respuesta: es **tendenciosa**. Una pregunta doble mete dos preguntas en una.' },
  { id: 'iswf-21', module: 'm5', type: 'mcq', prompt: 'En un diagrama de actividad, la **barra de sincronización** sirve para:', options: ['Dividir en hilos paralelos (split) y unirlos (merge)', 'Tomar una decisión con condiciones', 'Marcar el fin del proceso', 'Indicar quién hace cada actividad'], answer: 0, explain: 'Split y merge modelan **paralelismo**. La decisión es el rombo, el fin es ◉ y los responsables van en carriles.' },
  { id: 'iswf-22', module: 'm5', type: 'mcq', prompt: 'El principal aporte del diagrama de actividad es:', options: ['Modelar comportamiento paralelo (workflows, multihilo)', 'Mostrar los mensajes entre objetos en el tiempo', 'Diseñar la base de datos', 'Reemplazar a los casos de uso'], answer: 0, explain: 'Su fuerte es el **paralelismo**; su debilidad, que no muestra bien la relación acción-objeto (eso lo hace el diagrama de secuencia).' },
  { id: 'iswf-23', module: 'm5', type: 'mcq', prompt: '¿Para qué sirve el **modelo de negocio**?', options: ['Para comprender los procesos del cliente y recomendar qué informatizar', 'Para programar la interfaz', 'Para estimar el costo del hardware', 'Para probar el sistema'], answer: 0, explain: 'Describe los procesos de la empresa: entenderlos permite proponer qué automatizar y cómo encajar lo nuevo con lo existente.', source: SRC_F },
  { id: 'iswf-24', module: 'm6', type: 'mcq', prompt: 'La ingeniería de requerimientos debe:', options: ['Obtener una descripción completa del comportamiento externo y generar la SRS', 'Incluir el diseño de las estructuras de datos', 'Detallar la estructura modular del sistema', 'Abstraerse de la extracción de requerimientos'], answer: 0, explain: 'Su resultado es la **SRS** con el comportamiento **externo**. Estructuras de datos y módulos son **diseño**, otra etapa.', source: SRC_F },
  { id: 'iswf-25', module: 'm6', type: 'mcq', prompt: '¿Cuál es un **defecto** típico de la ingeniería de requerimientos?', options: ['Requisitos ambiguos y usuarios poco involucrados', 'Requisitos necesarios y suficientes', 'Validación con el cliente', 'Documentar los límites del sistema'], answer: 0, explain: 'La ambigüedad genera interpretaciones distintas y la falta de participación del usuario es una de las principales causas de fracaso.', source: SRC_F },
  { id: 'iswf-26', module: 'm6', type: 'mcq', prompt: 'El orden de las etapas de la ingeniería de requerimientos es:', options: ['Extracción → análisis → especificación → validación', 'Diseño → extracción → prueba → validación', 'Especificación → extracción → análisis', 'Validación → análisis → extracción'], answer: 0, explain: 'Se relevan las necesidades, se analizan, se especifican en la SRS y el cliente **valida**.' },
  { id: 'iswf-27', module: 'm6', type: 'tf', prompt: 'Un error de requerimientos detectado en la etapa de pruebas cuesta lo mismo de corregir que si se detecta en requerimientos.', answer: false, explain: 'El costo crece con el avance del proyecto: en pruebas puede ser **miles de veces** mayor que en la etapa de requerimientos.' },
  { id: 'iswf-28', module: 'm7', type: 'mcq', prompt: '¿Qué **no** debe incluir la SRS?', options: ['Costos, cronogramas y diseño', 'Funcionalidad', 'Interfaces externas', 'Restricciones de diseño'], answer: 0, explain: 'La SRS describe **qué** hace el software. Costos, cronogramas, diseño y planes de prueba van en otros documentos.' },
  { id: 'iswf-29', module: 'm7', type: 'mcq', prompt: 'Tres atributos de una buena especificación de requerimientos son:', options: ['Correcta, no ambigua y verificable', 'Extensa, técnica y cerrada', 'Informal, rápida y oral', 'Ambigua, flexible y abierta'], answer: 0, explain: 'IEEE 830: **correcta, no ambigua, completa, consistente, clasificada por importancia, verificable, modificable y trazable**.', source: SRC_F },
  { id: 'iswf-30', module: 'm7', type: 'tf', prompt: 'Al relevar hay que cuantificar procesos y almacenamientos, aunque eso no afectará la solución a implementar.', answer: false, explain: 'Un mismo problema con distinto volumen lleva a **soluciones distintas** (20 autorizaciones por día no es lo mismo que 5000 por hora).', source: SRC_F },
  { id: 'iswf-31', module: 'm7', type: 'tf', prompt: 'El estándar IEEE 830 es una guía para especificar requerimientos que las organizaciones adaptan a su forma de trabajo.', answer: true, explain: 'No se aplica al pie de la letra: es una **guía** de referencia que cada organización adapta.', source: SRC_F },
  { id: 'iswf-32', module: 'm7', type: 'mcq', prompt: 'Los requerimientos de **capacidad** como número de terminales o usuarios simultáneos son requisitos:', options: ['Estáticos', 'Dinámicos', 'Funcionales', 'De diseño'], answer: 0, explain: '**Estáticos**: cantidades fijas (terminales, usuarios, volumen de información). **Dinámicos**: transacciones o datos por período de tiempo.' },
];

const exercises: WorkedExercise[] = [
  { id: 'iswf-e1', module: 'm10', title: 'Final · objetos entidad del caso "Motores"', statement: 'Una empresa vende repuestos. Los pedidos se hacen por teléfono, solo para clientes (el alta es personal: datos y número de cliente). Al pedir, se consultan las existencias; si se puede cumplir se confecciona un **remito** para Expedición, que envía con la **factura** (se paga contra entrega). Si no se puede, el pedido queda **pendiente**. Definí los objetos **entidad** mínimos para el diagrama de secuencia.', steps: [
    { title: 'Buscar lo que se guarda en el tiempo', body: 'Entidad = información que **persiste** más allá del caso de uso. Subrayá sustantivos que se registran.' },
    { title: 'Candidatos', body: '**Cliente** (datos + número) · **Repuesto** (con su existencia/stock) · **Pedido** (con estado: cumplido o pendiente) · **Remito** · **Factura**.' },
    { title: 'Descartar', body: 'Teléfono (medio, no dato), Expedición (actor o área externa, no entidad del sistema), "existencias" (atributo del repuesto).' },
  ], result: 'Entidades: **Cliente, Repuesto, Pedido, Remito, Factura**. Interfaz: pantalla de pedidos; control: control de pedidos.' },
];

const P = port as { theory: TheoryBlock[]; questions: Question[]; videos: VideoItem[] };

/** Preguntas anteriores que se ofrecen como práctica dentro de su tema. */
const OLD_TOPIC: Record<string, string> = {
  'iswf-01': 'm1-sistema', 'iisw-final-q1': 'm1-sistema',
  'iswf-02': 'm1-cualproc', 'iswf-05': 'm1-cualproc',
  'iswf-03': 'm1-princ',
  'iswf-04': 'm1-cualp',
  'iswf-06': 'm1-brooks',
  'iswf-07': 'm2-espiral',
  'iswf-08': 'm2-ciclos',
  'iswf-09': 'm2-up', 'iswf-10': 'm2-up', 'iisw-final-q2': 'm2-up',
  'iswf-11': 'm2-proto',
  'iswf-12': 'm2-cascada',
  'iswf-13': 'm3-scrum', 'iswf-14': 'm3-scrum', 'iswf-16': 'm3-scrum',
  'iswf-15': 'm3-xp',
  'iswf-17': 'm4-estructura', 'iswf-18': 'm4-estructura',
  'iswf-19': 'm4-cuest',
  'iswf-20': 'm4-preguntas',
  'iswf-21': 'm5-actividad', 'iswf-22': 'm5-actividad',
  'iswf-23': 'm5-modelado',
  'iisw-final-q7': 'm5-errores',
  'iswf-24': 'm6-ir', 'iswf-26': 'm6-ir',
  'iswf-25': 'm6-defectos', 'iisw-final-q3': 'm6-defectos',
  'iswf-27': 'm6-costo',
};

const content: SubjectContent = {
  subjectId: 'iisw',
  theory: [...theory, ...P.theory],
  questions: [
    ...[...questions, ...FINAL_QUESTIONS].map((x) => ({ ...x, topic: OLD_TOPIC[x.id] })),
    ...M1_QUESTIONS, ...M2_QUESTIONS, ...M3_QUESTIONS, ...M4_QUESTIONS, ...M5_QUESTIONS, ...M6_QUESTIONS,
    ...P.questions,
  ],
  exercises: [...exercises, ...FINAL_EXERCISES],
  videos: [...VIDEOS, ...P.videos],
  cheatsheet: POCKET['iisw'],
  maps: [M1_MAP, M2_MAP, M3_MAP, M4_MAP, M5_MAP, M6_MAP],
};

/** Módulos reescritos tema por tema: traen sus propias escenas. */
const AMPLIADOS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'];
content.theory = content.theory.map((b) => {
  if (['m8', 'm9', 'm10', 'm11', 'm12'].includes(b.module) && SCENES[b.id]) {
    const scenes = SCENES[b.id];
    const heading = scenes[0].v.items[0];
    return { id: b.id, module: b.module, title: heading.k === 'text' ? heading.t : b.title, points: scenes.flatMap((s) => s.say), scenes };
  }
  // los temas de la 2ª mitad vienen del sitio anterior: se les asocia el video de su capítulo (ch1-t3 → ch1-v1)
  const v = P.videos.find((x) => x.id === `${b.id.split('-')[0]}-v1`);
  return { ...b, scenes: AMPLIADOS.includes(b.module) ? b.scenes : SCENES[b.id] ?? b.scenes, video: v ? { src: v.src, poster: v.poster, minutes: v.minutes } : undefined };
});
content.exercises = content.exercises.map((e) => ({ ...e, scenes: EX_SCENES[e.id] ?? FINAL_SCENES[e.id] }));
content.lessons = [
  {
    id: 'iisw-clase-2', examId: 'final', title: 'Requerimientos, casos de uso, secuencia y pruebas',
    summary: 'Módulos 8 a 10: de la necesidad del usuario a las interacciones y la evidencia de aceptación, con diagramas propios.',
    intro: ['En esta clase vamos a unir requerimientos, casos de uso, secuencia y pruebas. Los diagramas se construyen paso a paso: seguí primero el objetivo del negocio y después las responsabilidades.', 'Usamos ejemplos propios de una biblioteca. Cada representación responde una pregunta distinta: qué necesita el actor, cómo interactúa, qué objetos colaboran y cómo verificamos el resultado.'],
    parts: content.theory.filter((b) => ['m8', 'm9', 'm10'].includes(b.module)).map((b) => b.id),
    outro: ['Revisá que requisitos, casos de uso y pruebas estén relacionados. El diagrama de casos de uso muestra objetivos; la descripción explica recorridos y la secuencia ordena mensajes entre participantes.', 'Volvé a las escenas en la web y practicá con las preguntas de opción múltiple y verdadero o falso. Cada explicación te permite comprobar por qué una respuesta corresponde al concepto.'],
  },
  {
    id: 'iisw-clase-3', examId: 'final', title: 'Tipos de sistemas, evolución y métodos formales',
    summary: 'Módulos 11 y 12: sistemas de información, tiempo real, distribución, dispositivos embebidos, mantenimiento, reingeniería y formalización.',
    intro: ['En esta clase distinguimos tipos de sistemas y formas de mantenerlos y verificarlos. Mirá las propiedades de cada ejemplo: las etiquetas pueden combinarse y una no implica automáticamente las demás.', 'Después del desarrollo inicial, el software sigue cambiando. Vamos a conectar esos cambios con mantenimiento, reingeniería y métodos formales, siempre preguntando qué propiedad buscamos preservar y con qué evidencia la comprobamos.'],
    parts: content.theory.filter((b) => ['m11', 'm12'].includes(b.module)).map((b) => b.id),
    outro: ['Tiempo real exige cumplir plazos; distribuido reparte procesamiento entre máquinas; embebido integra cómputo en un dispositivo. Justificá cada propiedad por separado al clasificar un ejemplo.', 'Mantenimiento cambia el producto después de entregarlo. Reingeniería mejora su estructura conservando el comportamiento previsto. Los métodos formales razonan sobre modelos y supuestos precisos, que también deben validarse frente a las necesidades reales.', 'Para repasar, recorré los ocho diagramas de esta clase y respondé las preguntas de esos módulos. Al equivocarte, compará la explicación con la propiedad del sistema que habías pasado por alto.'],
  },
  {
    id: 'iisw-clase-1', examId: 'final', title: 'Final · primera mitad: módulos 1 a 7',
    summary: 'Definiciones, cualidades y principios; ciclos de vida; Scrum; técnicas de extracción; diagrama de actividad y BPMN; ingeniería de requerimientos y SRS.',
    intro: [
      'Esta clase cubre la primera mitad de Introducción a la Ingeniería de Software para el final: los módulos 1 a 7. La segunda mitad, casos de uso y secuencia, ya tiene sus videos.',
      'Vamos a ver qué es la ingeniería de software, cualidades y principios, ciclos de vida, Scrum, cómo se extraen requerimientos, el modelado de procesos y la especificación.',
    ],
    parts: ['m1-def', 'm1-cual', 'm1-princ', 'm2-ciclos', 'm3-agiles', 'm4-extraccion', 'm5-modelado', 'm6-ir', 'm7-srs', 'ex:iswf-e1'],
    outro: [
      'Sistema = software + hardware + gente + procedimientos manuales. Oportunidad = entregar a tiempo. Alta cohesión y bajo acoplamiento.',
      'Cascada: el cliente ve todo al final (lo subsana el incremental). Espiral = riesgos. UP: inicio, elaboración, construcción, transición.',
      'Pirámide: cerradas → abiertas; embudo: al revés. SRS: comportamiento externo, sin costos ni cronogramas; cuantificar sí cambia la solución.',
    ],
  },
];

content.lessons.push(FINAL_LESSON);
export default content;
