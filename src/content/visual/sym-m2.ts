/**
 * SyM · Módulo 2 (Descripción de puestos y tipos de equipos), tema por tema.
 * Fuentes revisadas (privadas): apunte "Tipos de puestos y tipos de equipos", presentación
 * "Descripción de puestos y tipos de equipos", "La organización · descripción" y un final 2023 de estudiantes.
 * Redacción y diagramas propios. Empresa ficticia: Yerbatera Ñandú.
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, bars, box, head, scene, txt } from './h';

const sc = (items: Parameters<typeof scene>[0], say: string[]): VisScene => scene(items, say, 600, 440);
const AP = 'apunte del módulo 2';
const F23 = 'final 2023 (Drive de estudiantes)';

export const M2_THEORY: TheoryBlock[] = [
  {
    id: 'y2p', module: 'm2', title: 'El puesto de trabajo y su descripción',
    lead: [
      'El **puesto** es la unidad básica de la estructura: una posición **formal** dentro del organigrama, con un conjunto predefinido de tareas, deberes y responsabilidades. Si el organigrama es el mapa, los puestos son sus casilleros.',
      'Para entender un puesto hacé siempre tres preguntas: **¿qué se hace?** (tareas), **¿sobre qué rinde cuentas?** (responsabilidad) y **¿qué puede decidir solo?** (autoridad). La **descripción de puestos** las deja por escrito y después sirve para evaluar a quien lo ocupa.',
    ],
    scenes: [
      sc([
        head('Las tres preguntas de un puesto'),
        box(170, 45, 260, 70, 'Analista de compras', { c: 'blue', fs: 19, sub: 'puesto en Ñandú', id: 'p' }),
        box(15, 165, 180, 120, 'Tareas', { c: 'green', fs: 19, sub: '¿qué se hace? cotizar hoja verde, emitir órdenes de compra', id: 't', s: 1 }),
        box(210, 165, 180, 120, 'Responsabilidad', { c: 'orange', fs: 17, sub: '¿sobre qué rinde cuentas? bajar 5 % el costo de compra', id: 'r', s: 2 }),
        box(405, 165, 180, 120, 'Autoridad', { c: 'purple', fs: 19, sub: '¿qué decide solo? compras hasta un monto; más arriba, su jefa', id: 'a', s: 3 }),
        arr('p', 't', { s: 1 }), arr('p', 'r', { s: 2 }), arr('p', 'a', { s: 3 }),
        box(15, 320, 570, 105, 'Descripción del puesto', { c: 'yellow', fs: 18, sub: 'responsabilidades · requisitos · lugar en el organigrama · dimensiones (jerarquía, personal a cargo, responsabilidad patrimonial) · objetivos · acciones y resultados · medición de logros', s: 4 }),
      ], [
        'Tomemos un puesto de Ñandú: **analista de compras**. Es una posición formal del organigrama, no una persona: si quien lo ocupa se va, el puesto sigue existiendo.',
        '**Tareas**: el qué. Las actividades concretas que el ocupante ejecuta, como cotizar con los productores de hoja verde o emitir órdenes de compra.',
        '**Responsabilidad**: aquello por lo que **rinde cuentas**. Por ejemplo, bajar un 5 % el costo de compra en el año. No es una tarea: es un resultado que se le va a pedir.',
        '**Autoridad**: qué decisiones puede tomar **sin consultar**. Puede aprobar compras hasta cierto monto; por encima, necesita a su jefa.',
        'La **descripción del puesto** junta todo por escrito: responsabilidades, requisitos, ubicación en el organigrama, dimensiones, objetivos, acciones, resultados y **cómo se miden los logros**. Esa medición se usa después para evaluar al empleado y otorgar méritos o premios.',
      ]),
    ],
    points: [
      '**Puesto**: posición específica y formal dentro de la estructura, con un conjunto de tareas, deberes y responsabilidades.',
      'Componentes: **tareas** (¿qué se hace?), **responsabilidad** (¿sobre qué se rinde cuentas?), **autoridad** (¿qué decisiones se pueden tomar?).',
      '**Descripción de puestos**: responsabilidades, requisitos, ubicación en el organigrama, dimensiones (jerarquía, cantidad de personal, responsabilidad patrimonial y financiera), objetivos de la posición, acciones y resultados, y medición de los logros.',
      'Para qué sirve: asignar responsabilidades con claridad y **evaluar** al empleado (méritos y premios) según objetivos medibles.',
    ],
    written: 'El **puesto de trabajo** es una posición específica y formal dentro de la estructura de la organización, que implica un conjunto de tareas, deberes y responsabilidades. Sus componentes son las tareas (qué se hace), la responsabilidad (sobre qué se rinde cuentas) y la autoridad (qué decisiones puede tomar). La descripción del puesto detalla además requisitos, ubicación en el organigrama, dimensiones, objetivos y la forma de medir los logros, que luego sirven para evaluar al empleado.',
    trap: 'No confundas **responsabilidad** (rendir cuentas por un resultado) con **autoridad** (poder decidir). Un puesto puede tener mucha responsabilidad y poca autoridad.',
  },
  {
    id: 'y2r', module: 'm2', title: 'Puesto y rol: lo escrito y lo vivido',
    lead: [
      'El puesto es lo que está **escrito**. El **rol** es cómo una persona **vive** ese puesto en la práctica: los comportamientos y expectativas que ella y la organización tienen sobre la posición, aunque no figuren en ningún papel.',
    ],
    scenes: [
      sc([
        head('Mismo puesto, distinto rol'),
        box(150, 45, 300, 80, 'Puesto: vendedor de salón', { c: 'blue', fs: 18, sub: 'atender, cobrar, ordenar el sector', id: 'p' }),
        box(15, 175, 270, 150, 'Vendedor A', { c: 'gray', fs: 19, sub: 'cumple exactamente lo escrito: atiende a quien se acerca, cobra y ordena', id: 'a', s: 1 }),
        box(315, 175, 270, 150, 'Vendedor B', { c: 'green', fs: 19, sub: 'además se acerca a indecisos, recuerda nombres, avisa promociones y anticipa faltantes con stock', id: 'b', s: 2 }),
        arr('p', 'a', { s: 1 }), arr('p', 'b', { s: 2 }),
        txt(300, 370, 'puesto = estático y formal', { fs: 17, b: true, c: 'blue', s: 3 }),
        txt(300, 405, 'rol = dinámico y conductual', { fs: 17, b: true, c: 'green', s: 3 }),
      ], [
        'Dos personas ocupan **el mismo puesto**, con la misma descripción escrita.',
        'El vendedor A cumple **estrictamente** con lo que dice el puesto. No hace nada mal.',
        'El vendedor B cumple lo mismo y, además, **interpreta** la posición de forma proactiva: se anticipa, se vincula, colabora con otra área. Su **rol** es distinto y su impacto también.',
        'Resumen: el **puesto** es la descripción formal y estática (el papel); el **rol** es la dimensión dinámica y conductual (cómo se vive en la relación con los demás).',
      ]),
    ],
    points: [
      '**Puesto**: descripción formal y estática; el documento que detalla lo que se espera de la posición.',
      '**Rol**: conjunto de comportamientos y expectativas sobre esa posición; cómo se vive en la práctica y en relación con colegas, jefes y clientes. Incluye cosas no escritas.',
      'Dos personas en el mismo puesto pueden desempeñar roles muy distintos.',
    ],
    example: { title: 'Yerbatera Ñandú', body: [
      'En la planta hay dos supervisores de turno con la misma descripción de puesto. Uno solo controla que se cumplan los horarios. El otro, además, enseña a los operarios nuevos y le avisa a Mantenimiento antes de que falle una máquina. **Mismo puesto, distinto rol.**',
    ] },
    trap: 'V/F típico: "puesto y rol son lo mismo" → **falso**. El rol suma los comportamientos esperados que no están en la descripción.',
  },
  {
    id: 'y2', module: 'm2', title: 'Grupo y equipo: la sinergia',
    videoNote: 'Video resumen anterior: repasa en pocos minutos puesto, rol, grupo, equipo, task force y comité. El detalle está en los cinco temas del módulo.',
    lead: [
      'No toda reunión de personas es un equipo. En un **grupo**, cada uno persigue su meta y el resultado es la **suma** de los esfuerzos. En un **equipo**, hay una **meta común**, habilidades complementarias y responsabilidad **mutua**: el resultado supera la suma. Eso es la **sinergia** ("1 + 1 = 3").',
    ],
    scenes: [
      sc([
        head('Suma de esfuerzos vs. sinergia'),
        bars(40, 60, 520, 230, [
          { t: 'Ana', v: 2, c: 'gray' }, { t: 'Juan', v: 2, c: 'gray' }, { t: 'Grupo: 2 + 2', v: 4, c: 'blue', s: 1 }, { t: 'Equipo', v: 5, c: 'green', s: 2 },
        ], { unit: '' }),
        box(15, 340, 280, 90, 'Grupo', { c: 'blue', fs: 18, sub: 'metas individuales · responsabilidad individual · líder único y fuerte', s: 1 }),
        box(305, 340, 280, 90, 'Equipo', { c: 'green', fs: 18, sub: 'meta colectiva · responsabilidad individual y mutua · liderazgo compartido', s: 2 }),
      ], [
        'Cada persona aporta su esfuerzo individual.',
        'En un **grupo**, los miembros comparten información para que cada uno haga mejor **su propio** trabajo. El rendimiento es la **suma**: E grupo = Σ E individuales. Metas y responsabilidad son individuales, y suele haber un líder único y fuerte.',
        'En un **equipo**, la meta es **colectiva** y la responsabilidad es individual **y mutua**: si uno falla, falla el resultado de todos. La coordinación produce un resultado **mayor** que la suma: E equipo > Σ E individuales. El liderazgo suele ser compartido.',
      ]),
    ],
    points: [
      '**Grupo de trabajo** (en el sentido de esta comparación): interactúan para compartir información; rendimiento = suma de esfuerzos; metas y responsabilidad individuales; liderazgo único y fuerte.',
      '**Equipo**: personas con habilidades complementarias, comprometidas con un propósito común y metas por las que se sienten **mutuamente responsables**; meta colectiva; liderazgo a menudo compartido.',
      '**Sinergia**: el esfuerzo colectivo genera un resultado mayor que la suma de los aportes individuales (1 + 1 = 3).',
      'Definición de la presentación: equipo son **dos o más personas que interactúan y se influyen** entre sí, con un propósito común. La actitud en el equipo cuenta para la evaluación del empleado.',
    ],
    table: { head: ['', 'Grupo', 'Equipo'], rows: [
      ['Meta', 'individual', 'colectiva'],
      ['Resultado', 'suma de esfuerzos', 'sinergia (más que la suma)'],
      ['Responsabilidad', 'individual', 'individual y mutua'],
      ['Liderazgo', 'único y fuerte', 'compartido'],
    ] },
    example: { title: 'Yerbatera Ñandú', body: [
      '**Grupo**: los cinco vendedores zonales se reúnen los lunes con su gerente. Cada uno tiene su cuota. Si a Juan le va mal, la cuota de María no cambia.',
      '**Equipo**: para lanzar el mate cocido en saquitos trabajan juntas una diseñadora, un ingeniero de envases y una analista comercial. Si el envase sale mal, el lanzamiento falla para las tres: son mutuamente responsables.',
    ] },
    written: 'Un **equipo** es un conjunto de dos o más personas con habilidades complementarias que interactúan y se comprometen con un propósito común, con responsabilidad individual y mutua y liderazgo compartido. A diferencia del grupo, cuyo rendimiento es la suma de los esfuerzos individuales, el equipo genera **sinergia**: un resultado mayor que esa suma.',
    trap: 'Cuidado con el doble uso de "grupo de trabajo": acá se compara **grupo vs. equipo** (suma vs. sinergia); en el tema siguiente, "grupo de trabajo" es además un **tipo de equipo formal** (un gerente y sus empleados directos).',
  },
  {
    id: 'y2t', module: 'm2', title: 'Equipos formales: grupo de trabajo, task force y comité',
    lead: [
      'La organización crea **deliberadamente** tres tipos de equipos formales. Se distinguen con tres criterios: **para qué** existen, **cuánto duran** y **de qué áreas** vienen sus miembros.',
      'También existen **equipos informales**, que surgen espontáneamente entre las personas y no los crea la organización (la misma lógica de la organización informal del Módulo 1).',
    ],
    scenes: [
      sc([
        head('Tres equipos formales'),
        box(15, 45, 180, 170, 'Grupo de trabajo', { c: 'blue', fs: 17, sub: 'un gerente + sus empleados directos', id: 'g' }),
        box(210, 45, 180, 170, 'Task force', { c: 'orange', fs: 18, sub: 'misión específica con principio y fin', id: 't', s: 1 }),
        box(405, 45, 180, 170, 'Comité', { c: 'purple', fs: 19, sub: 'gobernar, asesorar, decidir temas transversales', id: 'c', s: 2 }),
        txt(105, 245, 'PERMANENTE', { fs: 15, b: true, c: 'blue' }), txt(105, 270, 'unifuncional', { fs: 15, c: 'blue' }),
        txt(300, 245, 'TEMPORAL', { fs: 15, b: true, c: 'orange', s: 1 }), txt(300, 270, 'multifuncional', { fs: 15, c: 'orange', s: 1 }),
        txt(495, 245, 'DURADERO', { fs: 15, b: true, c: 'purple', s: 2 }), txt(495, 270, 'multifuncional', { fs: 15, c: 'purple', s: 2 }),
        txt(105, 300, 'Dpto. de Contabilidad', { fs: 13, c: 'gray' }),
        txt(300, 300, 'Lanzar un producto', { fs: 13, c: 'gray', s: 1 }),
        txt(495, 300, 'Comité de Seguridad', { fs: 13, c: 'gray', s: 2 }),
        box(15, 330, 180, 95, '✔ en el organigrama', { c: 'green', fs: 15, sub: 'es una unidad de la estructura', s: 3 }),
        box(210, 330, 375, 95, '✘ no figuran en el organigrama', { c: 'red', fs: 15, sub: 'pero igual son FORMALES: los crea la organización', s: 3 }),
      ], [
        'El **grupo de trabajo** es el equipo más tradicional: un **gerente y los empleados que le reportan** directamente. Opera una función continua, es **permanente** y **unifuncional** (todos de la misma área).',
        'La **task force** (fuerza de tarea o equipo de proyecto) se arma para **resolver un problema concreto** o ejecutar un proyecto. Es **temporal**: se disuelve al cumplir su misión. Es **multifuncional**: gente de distintas áreas.',
        'El **comité** se orienta a **gobernar, supervisar y asesorar** sobre temas estratégicos, operativos, comerciales o legales que cruzan varias áreas. Suele ser de **existencia duradera** y también es multifuncional. Participar en uno es un reconocimiento.',
        'Dato que preguntó el final: el grupo de trabajo **es** una unidad del organigrama; la task force y el comité **no figuran** en él. Y aun así **los tres son formales**, porque los crea la organización. Ser formal no depende de aparecer dibujado.',
      ]),
    ],
    points: [
      '**Grupo de trabajo**: gerente + empleados que le reportan; unidad del organigrama; operar una función; permanente; unifuncional. Ej.: Gerencia de créditos, Mantenimiento.',
      '**Task force**: proyecto de alcance temporal para un problema específico (funcional, administrativo u operativo); se disuelve al terminar; multifuncional; gerencia media y empleados con experiencia; no figura en el organigrama.',
      '**Comité**: equipo formal, en general de existencia duradera, para tareas específicas sobre temas estratégicos, operativos, comerciales o legales; gobernar, asesorar, coordinar y decidir; multifuncional; suele integrarse con gerencia media y alta; no figura en el organigrama.',
      '**Equipos informales**: surgen espontáneamente por afinidad o interés común, sin que la organización los cree. En el final 2023 aparece el **grupo de estudio** como ejemplo.',
    ],
    table: { head: ['', 'Grupo de trabajo', 'Task force', 'Comité'], rows: [
      ['Propósito', 'operar una función', 'resolver un problema', 'gobernar / asesorar'],
      ['Duración', 'permanente', '**temporal**', 'duradero (puede ser temporal)'],
      ['Composición', '**unifuncional**', 'multifuncional', 'multifuncional'],
      ['¿En el organigrama?', 'sí', 'no', 'no'],
      ['Ñandú', 'Dpto. de Compras', 'recuperar ventas en AMBA', 'Comité de Seguridad e Higiene'],
    ] },
    written: 'Los equipos formales son tres. **Grupos de trabajo**: un gerente y los empleados que dependen de él, que forman parte formal del organigrama (por ejemplo, la Gerencia de créditos). **Task force**: equipos para proyectos de alcance temporal, conformados para solucionar un problema específico. **Comités**: equipos formales, por lo general de existencia duradera, creados para tareas específicas referidas a temas estratégicos, operativos, comerciales o legales.',
    trap: 'V/F del final: "los comités figuran en el organigrama" → **falso**. Y la diferencia task force / comité es la **duración y el propósito**, no la composición: los dos son multifuncionales.',
  },
  {
    id: 'y2c', module: 'm2', title: 'Qué equipo corresponde a cada situación',
    lead: [
      'En un caso, identificá primero si el equipo **lo creó la organización**. Si es así, mirá el **propósito** y la **duración**: con eso alcanza para elegir entre los tres formales.',
    ],
    scenes: [
      sc([
        head('Elegir el tipo de equipo'),
        box(15, 48, 360, 54, '¿Lo creó la organización?', { c: 'yellow', fs: 17, id: 'q0' }),
        box(420, 45, 165, 60, 'INFORMAL', { c: 'gray', fs: 17, solid: true, id: 'a0', s: 1 }),
        arr('q0', 'a0', { t: 'no', s: 1 }),
        box(15, 135, 360, 70, '¿Opera una función continua de un área, con su gerente?', { c: 'yellow', fs: 15, id: 'q1', s: 2 }),
        box(420, 140, 165, 60, 'GRUPO DE TRABAJO', { c: 'blue', fs: 14, solid: true, id: 'a1', s: 2 }),
        arr('q0', 'q1', { t: 'sí', s: 2 }), arr('q1', 'a1', { t: 'sí', s: 2 }),
        box(15, 240, 360, 70, '¿Resuelve un problema puntual y se disuelve al terminar?', { c: 'yellow', fs: 15, id: 'q2', s: 3 }),
        box(420, 245, 165, 60, 'TASK FORCE', { c: 'orange', fs: 16, solid: true, id: 'a2', s: 3 }),
        arr('q1', 'q2', { t: 'no', s: 3 }), arr('q2', 'a2', { t: 'sí', s: 3 }),
        box(110, 350, 170, 70, 'COMITÉ', { c: 'purple', fs: 18, solid: true, id: 'a3', s: 4 }),
        arr('q2', 'a3', { t: 'no', s: 4 }),
        txt(440, 385, 'gobierna o asesora, duradero', { fs: 14, c: 'purple', b: true, s: 4 }),
      ], [
        'Primera pregunta: ¿el equipo fue **creado por la organización**, con una responsabilidad asignada?',
        'Si surgió espontáneamente (un grupo de estudio, compañeros que se juntan por afinidad), es **informal**.',
        'Si es formal y opera una **función continua** de un área, con su gerente y los empleados que le reportan, es un **grupo de trabajo**.',
        'Si se armó para un **problema o proyecto concreto**, con principio y fin, y se disuelve al terminar, es una **task force**.',
        'Si existe de forma **duradera** para gobernar, supervisar, asesorar o decidir sobre temas que cruzan áreas, es un **comité**.',
      ]),
    ],
    points: [
      'Pistas de **task force**: "durante seis meses", "para resolver", "lanzamiento", "se disolverá".',
      'Pistas de **comité**: "se reúne mensualmente", "aprueba", "dictamina", "supervisa", "revisa normativas".',
      'Pistas de **grupo de trabajo**: "el gerente y su equipo", "el departamento de…".',
    ],
    example: { title: 'tres casos rápidos', body: [
      '**A.** Representantes de RR. HH., Operaciones y los empleados se reúnen cada mes para revisar normas y prevenir accidentes. → **Comité** (de Seguridad e Higiene).',
      '**B.** Por una caída del 20 % en la satisfacción de clientes, se arma un equipo con Ventas, Logística y Atención por tres meses. → **Task force**.',
      '**C.** Cuatro analistas de distintas áreas se juntan los viernes después del trabajo a estudiar inglés. → **Equipo informal**.',
    ] },
  },
];

const q = (id: string, topic: string, prompt: string, options: string[], answer: number, explain: string, why: (string | null)[], source = AP): Question =>
  ({ id, module: 'm2', topic, type: 'mcq', prompt, options, answer, explain, why, source });
const tf = (id: string, topic: string, prompt: string, answer: boolean, explain: string, source = AP): Question =>
  ({ id, module: 'm2', topic, type: 'tf', prompt, answer, explain, source });

export const M2_QUESTIONS: Question[] = [
  q('sym-m2-01', 'y2p', 'Una analista puede publicar contenido en redes sin consultar, pero necesita aprobación para una campaña de más de USD 500. ¿Qué componente del puesto describe ese límite?', ['Autoridad', 'Tarea', 'Responsabilidad', 'Rol'], 0,
    'La autoridad es el grado de autonomía para decidir y usar recursos sin consultar a un superior. El límite de USD 500 marca hasta dónde llega.',
    [null, 'La tarea sería "publicar contenido" o "armar la campaña": el qué se hace.', 'La responsabilidad es por qué resultado rinde cuentas, por ejemplo aumentar la interacción.', 'El rol es cómo vive el puesto, no un límite formal de decisión.']),
  q('sym-m2-02', 'y2p', '"El jefe de planta debe reducir los accidentes un 30 % este año y responderá por ese resultado." ¿Qué componente del puesto es?', ['Responsabilidad', 'Autoridad', 'Tarea', 'Requisito'], 0,
    'Rendir cuentas por un resultado es responsabilidad.',
    [null, 'La autoridad indica qué puede decidir, no por qué responde.', 'Una tarea sería una actividad concreta, como inspeccionar las máquinas.', 'Un requisito es lo que se pide para ocupar el puesto (formación, experiencia).']),
  q('sym-m2-03', 'y2p', '¿Para qué sirve que la descripción de un puesto incluya objetivos y la forma de medir los logros?', ['Para evaluar al empleado y otorgarle méritos o premios', 'Para que figure en el organigrama', 'Para reemplazar el rol', 'Para eliminar la autoridad del puesto'], 0,
    'Los objetivos medibles permiten evaluar el desempeño y fundamentar méritos o premios.',
    [null, 'La ubicación en el organigrama es otro elemento de la descripción.', 'El rol no se reemplaza: es cómo se vive el puesto.', 'La autoridad sigue siendo un componente del puesto.']),
  tf('sym-m2-04', 'y2r', 'Dos personas que ocupan el mismo puesto siempre desempeñan el mismo rol.', false,
    'El puesto es la descripción formal; el rol es cómo cada persona lo vive e interpreta. Pueden ser muy distintos.'),
  q('sym-m2-05', 'y2r', 'Una recepcionista, además de lo que dice su descripción, recibe a cada visitante por su nombre y avisa a Mantenimiento cuando algo se rompe. Eso describe su:', ['Rol', 'Puesto', 'Autoridad formal', 'Comité'], 0,
    'Los comportamientos que van más allá de lo escrito forman parte del rol.',
    [null, 'El puesto es lo escrito; estas conductas no figuran ahí.', 'No está tomando decisiones con autoridad formal.', 'No es un equipo.']),
  q('sym-m2-06', 'y2', 'Un estudio de arquitectura reúne a un arquitecto, una ingeniera y un paisajista para un proyecto: si una parte falla, falla el proyecto de todos. ¿Qué lo hace un equipo y no un grupo?', ['Meta colectiva y responsabilidad mutua, que generan sinergia', 'Que tiene un jefe fuerte', 'Que cada uno tiene su propia meta', 'Que son más de dos personas'], 0,
    'El equipo comparte una meta y responde en conjunto por el resultado; eso genera un rendimiento mayor que la suma.',
    [null, 'El liderazgo único y fuerte es típico del grupo.', 'Las metas individuales son propias del grupo.', 'Un grupo también puede tener más de dos personas: la cantidad no los distingue.']),
  q('sym-m2-07', 'y2', 'Los vendedores de una concesionaria se reúnen los lunes a compartir estrategias, pero cada uno tiene su cuota y el resultado de uno no afecta al otro. Son:', ['Un grupo: el resultado es la suma de esfuerzos individuales', 'Un equipo con sinergia', 'Una task force', 'Un comité'], 0,
    'Metas y responsabilidad individuales, con intercambio de información: es un grupo.',
    [null, 'No hay meta colectiva ni responsabilidad mutua.', 'No se armó para un problema temporal.', 'No gobierna ni asesora sobre temas transversales.']),
  q('sym-m2-08', 'y2t', 'Un banco arma un equipo con gente de Sistemas, Legales y Comercial para adaptar sus productos a una nueva normativa en cuatro meses; después se disuelve. Es:', ['Una task force', 'Un comité', 'Un grupo de trabajo', 'Un equipo informal'], 0,
    'Problema específico, duración limitada y miembros de varias áreas: task force.',
    [null, 'El comité suele ser duradero y se orienta a gobernar o asesorar.', 'El grupo de trabajo es un gerente con sus empleados de un área, permanente.', 'Lo creó la organización: es formal.']),
  q('sym-m2-09', 'y2t', 'Representantes de Finanzas, Operaciones y la Dirección se reúnen todos los años para revisar y aprobar los presupuestos de cada área. Es:', ['Un comité', 'Una task force', 'Un grupo de trabajo', 'Un equipo informal'], 0,
    'Es duradero, multifuncional y decide sobre un tema transversal: comité (de presupuesto).',
    [null, 'No se disuelve tras resolver un problema: se repite cada año.', 'Reúne varias áreas, no a un gerente con su personal.', 'Lo creó la organización.']),
  q('sym-m2-10', 'y2t', '¿Qué característica tienen en común la task force y el comité?', ['Ambos son multifuncionales', 'Ambos son permanentes', 'Ambos figuran en el organigrama', 'Ambos son unifuncionales'], 0,
    'Los dos reúnen personas de distintas áreas. Se diferencian por la duración y el propósito.',
    [null, 'La task force es temporal.', 'Ninguno de los dos figura en el organigrama.', 'El unifuncional es el grupo de trabajo.']),
  tf('sym-m2-11', 'y2t', 'Los comités figuran en el organigrama de la empresa.', false,
    'Son equipos formales, pero no representan una función operativa y no figuran en el organigrama. Este V/F apareció en un final.', F23),
  q('sym-m2-12', 'y2t', 'Según el final 2023, ¿cuál de estos es un ejemplo de equipo **informal**?', ['Un grupo de estudio', 'Un grupo de trabajo', 'Una task force', 'Un comité'], 0,
    'Los otros tres son equipos formales: los crea la organización. Un grupo de estudio surge por iniciativa de sus miembros.',
    [null, 'Es formal: un gerente y sus empleados en el organigrama.', 'Es formal: la organización la crea para un problema.', 'Es formal, aunque no figure en el organigrama.'], F23),
  q('sym-m2-13', 'y2c', 'La Gerencia de Créditos de un banco, con su gerente y los analistas que le reportan, ¿qué tipo de equipo es?', ['Grupo de trabajo', 'Task force', 'Comité', 'Equipo informal'], 0,
    'Gerente + empleados directos, función continua, unidad del organigrama: grupo de trabajo.',
    [null, 'No es temporal ni multifuncional.', 'No gobierna ni asesora sobre temas transversales.', 'Lo creó la organización.']),
  q('sym-m2-14', 'y2c', 'Una empresa crea un equipo para organizar la mudanza de sus oficinas a un nuevo edificio. ¿Qué tipo es?', ['Task force', 'Comité', 'Grupo de trabajo', 'Equipo informal'], 0,
    'Tiene una misión concreta con principio y fin: se disuelve cuando termina la mudanza.',
    [null, 'Un comité es duradero y gobierna o asesora.', 'No es la unidad permanente de un área.', 'Lo crea la organización.']),
];

export const M2_MAP: ConceptMap = {
  module: 'm2', root: 'Puestos y equipos',
  branches: [
    { t: 'Puesto de trabajo', d: 'posición formal del organigrama con tareas, deberes y responsabilidades', topic: 'y2p', kids: [
      { rel: 'se compone de', t: 'Tareas · responsabilidad · autoridad', d: 'qué se hace · sobre qué rinde cuentas · qué decide sin consultar' },
      { rel: 'se documenta en la', t: 'Descripción del puesto', d: 'responsabilidades, requisitos, lugar en el organigrama, dimensiones, objetivos, acciones y resultados, medición de logros' },
      { rel: 'sirve para', t: 'Evaluar al empleado', d: 'méritos y premios según objetivos medibles' },
      { rel: 'en la práctica se vive como', t: 'Rol', d: 'conductas y expectativas, también las no escritas. Mismo puesto ≠ mismo rol', topic: 'y2r' },
    ] },
    { t: 'Trabajo colectivo', d: 'no toda reunión de personas es un equipo', topic: 'y2', kids: [
      { t: 'Grupo', d: 'metas individuales · resultado = **suma** · responsabilidad individual · líder único y fuerte' },
      { t: 'Equipo', d: '2+ personas que interactúan con propósito común · meta colectiva · **sinergia (1+1=3)** · responsabilidad individual y mutua · liderazgo compartido' },
    ] },
    { t: 'Equipos formales', d: 'los crea la organización', topic: 'y2t', kids: [
      { t: 'Grupo de trabajo', d: 'gerente + empleados directos · operar una función · **permanente** · **unifuncional** · ✔ en el organigrama' },
      { t: 'Task force', d: 'resolver un problema puntual · **temporal** (se disuelve) · multifuncional · ✘ no figura en el organigrama' },
      { t: 'Comité', d: 'gobernar, asesorar, decidir temas transversales · **duradero** · multifuncional · ✘ no figura en el organigrama' },
      { rel: 'para elegir en un caso', t: '¿lo creó la organización? → ¿función continua? → ¿problema con fin? → si no, comité', topic: 'y2c' },
    ] },
    { t: 'Equipos informales', d: 'surgen espontáneamente por afinidad. Ej. del final: **grupo de estudio**', topic: 'y2t' },
  ],
  links: [
    '"Grupo de trabajo" tiene dos usos: en **grupo vs. equipo** (suma vs. sinergia) y como **tipo de equipo formal** (gerente + directos).',
    'Task force y comité son **los dos multifuncionales**: los distinguen la **duración** y el **propósito**.',
    'V/F del final: "los comités figuran en el organigrama" → **falso**, aunque son formales (Módulo 1: formal ≠ dibujado).',
    'La **autoridad** del puesto se desarrolla en el Módulo 3.',
  ],
};
