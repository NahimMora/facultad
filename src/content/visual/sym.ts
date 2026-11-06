/** Sistemas y Métodos · final · recorridos visuales propios. */
import type { VisScene } from '../../vis/types';
import { arr, bars, bits, box, grid, head, ico, plot, scene, stack, tree, txt } from './h';

export const SCENES: Record<string, VisScene[]> = {
  y1: [
    scene([
      head('Estructuras y las 5 fuerzas de Porter'),
      txt(130, 80, 'Gerente funcional', { b: true, fs: 15, c: 'blue' }),
      ...[0, 1, 2].map((i) => box(232 + i * 70, 55, 64, 50, ['TI', 'Ventas', 'Finanzas'][i], { c: 'blue', fs: 12 })),
      ...[0, 1].map((j) => box(110, 130 + j * 70, 120, 50, `Proyecto ${['A', 'B'][j]}`, { c: 'orange', fs: 14 })),
      ...[0, 1, 2].flatMap((i) => [0, 1].map((j) => box(242 + i * 70, 135 + j * 70, 44, 40, '', { shape: 'circle', c: 'yellow', fs: 20, s: 1 }))),
      txt(270, 290, 'MATRICIAL: mando múltiple', { b: true, fs: 17, c: 'yellow', s: 1 }),
      box(575, 160, 150, 70, 'Rivalidad', { c: 'red', fs: 17, id: 'r', s: 2 }),
      box(575, 55, 150, 60, 'Nuevos entrantes', { c: 'orange', fs: 14, id: 'n', s: 2 }),
      box(575, 280, 150, 60, 'Sustitutos', { c: 'orange', fs: 14, id: 'su', s: 2 }),
      box(455, 160, 95, 70, 'Provee- dores', { c: 'purple', fs: 13, id: 'p', s: 2 }),
      box(740, 160, 55, 70, 'Clien- tes', { c: 'purple', fs: 12, id: 'c', s: 2 }),
      arr('n', 'r', { s: 2 }), arr('su', 'r', { s: 2 }), arr('p', 'r', { s: 2 }), arr('c', 'r', { s: 2 }),
      box(30, 360, 360, 75, 'Eficacia: lograr los objetivos correctos', { c: 'green', fs: 17, s: 3 }),
      box(410, 360, 370, 75, 'Eficiencia: con el mínimo de recursos', { c: 'cyan', fs: 17, s: 3 }),
    ], [
      'La **organización formal** es la estructura creada deliberadamente, con organigrama y normas, y la **departamentalización** agrupa actividades similares por función, producto, zona o cliente.',
      'En la estructura **matricial** hay **mando múltiple**: cada empleado depende de un gerente funcional y, a la vez, de uno de proyecto.',
      'Las **cinco fuerzas de Porter**: la rivalidad entre competidores, la amenaza de nuevos entrantes y de sustitutos, y el poder de negociación de proveedores y de clientes. Los grupos reguladores **no** son una fuerza.',
      'Y no confundas: **eficacia** es lograr los objetivos correctos; **eficiencia**, hacerlo con el mínimo de recursos.',
    ]),
  ],
  y2: [
    scene([
      head('Puesto, grupo, equipo, task force y comité'),
      box(30, 55, 360, 100, 'Puesto', { c: 'blue', fs: 22, sub: 'descripción formal y escrita: tareas, ubicación, objetivos' }),
      box(410, 55, 360, 100, 'Rol', { c: 'purple', fs: 22, sub: 'el puesto + las conductas que se esperan', s: 1 }),
      bars(40, 180, 340, 160, [{ t: 'suma individual', v: 3, c: 'gray' }, { t: 'equipo (sinergia)', v: 5, c: 'green' }], { s: 2, unit: '' }),
      box(410, 180, 175, 160, 'Task force', { c: 'orange', fs: 19, sub: 'TEMPORAL: una tarea concreta', s: 3 }),
      box(600, 180, 170, 160, 'Comité', { c: 'cyan', fs: 19, sub: 'DURADERO: temas recurrentes', s: 3 }),
      txt(590, 370, 'ambos: interdisciplinarios', { b: true, fs: 17, c: 'yellow', s: 3 }),
      txt(210, 400, 'Grupo de trabajo: gerente + empleados directos', { b: true, fs: 16, c: 'gray', s: 2 }),
    ], [
      'El **puesto** es la descripción formal y escrita: tareas, ubicación en el organigrama y objetivos con su medición.',
      'El **rol** suma las **conductas** que se esperan de quien lo ocupa.',
      'Un **grupo de trabajo** es un gerente con sus empleados directos. Un **equipo** genera **sinergia**: el resultado es más que la suma de los esfuerzos individuales.',
      'El **task force** reúne especialistas de distintas áreas para una tarea concreta y **temporal**; el **comité** es **duradero**, para temas recurrentes. Los dos son interdisciplinarios.',
    ]),
  ],
  y3: [
    scene([
      head('Bases del poder y tipos de autoridad'),
      ...[['Legítimo', 'el cargo', 'blue'], ['Recompensa', 'premios', 'green'], ['Coercitivo', 'sanción', 'red'], ['Experto', 'saber', 'purple'], ['Referente', 'carisma', 'pink']].map(([t, sub, c], i) => box(15 + i * 157, 60, 145, 90, t, { c, sub, fs: 18, s: i < 2 ? 0 : 1 })),
      box(30, 170, 740, 50, '"Como su jefe les pido… si lo logran tendrán un bono" = legítimo + recompensa', { c: 'yellow', fs: 16, s: 2 }),
      tree(30, 245, 450, 180, { t: 'Gerente general', c: 'blue', kids: [{ t: 'Ventas', c: 'blue', e: 'lineal' }, { t: 'Producción', c: 'blue', e: 'lineal' }] }, { fs: 16, s: 3 }),
      box(500, 245, 280, 80, 'Staff: asesora', { c: 'gray', fs: 18, s: 3 }),
      box(500, 340, 280, 95, 'Funcional: TI impone su norma de seguridad a todas las áreas', { c: 'orange', fs: 15, s: 4 }),
    ], [
      'El **poder** es la capacidad de cambiar conductas, y la **autoridad**, el poder formal del puesto. Sus bases: **legítimo**, por el cargo, y **de recompensa**…',
      '…**coercitivo**, por sanción; **experto**, por saber; y **referente**, por carisma.',
      'Ejemplo de final: "como su jefe les pido esto, y si lo logran tendrán un bono" combina **legítimo y recompensa**.',
      'Tipos de autoridad: **lineal**, de los gerentes en la cadena de mando; **staff**, que asesora…',
      '…y **funcional**: un área de staff impone una norma de su especialidad a toda la empresa, como TI exigiendo una capacitación de seguridad.',
    ]),
  ],
  y4: [
    scene([
      head('Motivación y rejilla administrativa'),
      stack(30, 55, 330, 300, [{ t: 'Autorrealización', c: 'purple' }, { t: 'Estima', c: 'blue' }, { t: 'Sociales (afecto)', c: 'green' }, { t: 'Seguridad', c: 'orange' }, { t: 'Fisiológicas', c: 'red' }], { fs: 17 }),
      txt(195, 385, 'MASLOW: de abajo hacia arriba', { b: true, fs: 17, c: 'yellow' }),
      grid(440, 55, 80, [['1.9 club', '9.9 equipo'], ['1.1', '9.1 tarea']], { left: ['gente ↑', ''], top: ['', 'tarea →'], fs: 15, groups: [{ r: 1, c: 1, h: 1, w: 1, col: 'red', s: 1 }, { r: 0, c: 1, h: 1, w: 1, col: 'green', s: 2 }] }),
      box(420, 300, 360, 130, 'Decisión racional: problema → alternativas → evaluar → elegir → implementar · negociación dura: posición rígida y desconfianza', { c: 'cyan', fs: 15, s: 3 }),
    ], [
      'La **pirámide de Maslow**: primero las necesidades fisiológicas, después seguridad, después las **sociales**, de amistad y afecto, después estima y, arriba, autorrealización.',
      'En la **rejilla administrativa**, el estilo **9.1** es dirección de **tareas**: mucho interés en los resultados y poco en la gente.',
      'El **9.9** es el estilo de **equipo**, y el 1.9, el club campestre.',
      'La decisión racional sigue pasos: identificar el problema, generar alternativas, **evaluarlas**, **elegir**, implementar y evaluar. Y la negociación **dura** se reconoce por la posición rígida y la desconfianza.',
    ]),
  ],
  y5: [
    scene([
      head('Planificación: FODA, cadena de valor y control'),
      grid(30, 55, 125, [['Fortalezas', 'Debilidades'], ['Oportunidades', 'AMENAZAS']], { left: ['interno', 'externo'], fs: 15, marks: [{ r: 1, c: 1, col: 'red', s: 1 }] }),
      txt(220, 330, 'competidores más tecnificados = amenaza', { b: true, fs: 15, c: 'red', s: 1 }),
      box(440, 60, 340, 90, 'Cadena de valor: primarias (logística, operaciones, MARKETING Y VENTAS, servicio) + apoyo', { c: 'blue', fs: 15, s: 2 }),
      box(440, 165, 340, 80, 'Balanced scorecard: financiera · clientes · procesos internos · aprendizaje', { c: 'green', fs: 15, s: 3 }),
      ...['Estándar', 'Medir', 'Evaluar', 'Corregir'].map((t, i) => box(440 + i * 87, 280, 78, 56, t, { c: 'orange', fs: 13, id: 'k' + i, s: 4 })),
      ...[0, 1, 2].map((i) => arr('k' + i, 'k' + (i + 1), { s: 4 })),
      txt(610, 380, 'Niveles: estratégico · táctico · operativo', { b: true, fs: 16, c: 'gray', s: 5 }),
    ], [
      'El **FODA** cruza lo **interno**, fortalezas y debilidades, con lo **externo**, oportunidades y amenazas.',
      'La entrada de competidores más tecnificados es una **amenaza**: viene de afuera.',
      'La **cadena de valor** de Porter separa actividades **primarias**, como logística, operaciones, **marketing y ventas** y servicio, de las de apoyo.',
      'El **balanced scorecard** mira cuatro perspectivas: financiera, clientes, **procesos internos** y aprendizaje.',
      'El **control**: fijar estándares, **medir**, **evaluar** y corregir.',
      'Y la planificación tiene niveles: **estratégico**, de largo plazo; **táctico**, de mandos medios; y operativo.',
    ]),
  ],
  y6: [
    scene([
      head('Proceso administrativo y flujogramas'),
      ...['Insumos', 'Transformación', 'Productos'].map((t, i) => box(30 + i * 260, 60, 220, 70, t, { c: (['blue', 'orange', 'green'] as const)[i], fs: 20, id: 'o' + i })),
      arr('o0', 'o1'), arr('o1', 'o2'),
      box(80, 170, 160, 50, 'Recibir pedido', { c: 'white', fs: 15, id: 'f1', s: 1 }),
      box(80, 255, 160, 70, '¿Aprobado?', { shape: 'diamond', c: 'yellow', fs: 14, id: 'f2', s: 1 }),
      box(80, 360, 160, 50, 'Emitir orden', { c: 'white', fs: 15, id: 'f3', s: 1 }),
      arr('f1', 'f2', { s: 1 }), arr('f2', 'f3', { s: 1, t: 'sí' }),
      txt(340, 290, 'rombo = DECISIÓN', { b: true, fs: 17, c: 'yellow', s: 1 }),
      box(450, 170, 330, 110, 'Manuales: de ORGANIZACIÓN (estructura) y de PROCEDIMIENTOS (circuitos)', { c: 'purple', fs: 16, s: 2 }),
      box(450, 300, 330, 120, 'Six Sigma: 3,4 defectos por millón · DMAIC', { c: 'red', fs: 18, s: 3 }),
    ], [
      'Todo sistema de operaciones transforma **insumos**, materias primas, personas, equipos e información, en **productos**.',
      'Los circuitos administrativos se dibujan con **flujogramas**: el **rombo** es una decisión. Sirven para detectar deficiencias y tareas duplicadas.',
      'Los **manuales** pueden ser de **organización**, con la estructura, o de **procedimientos**, con los circuitos.',
      'Y **Six Sigma** apunta a no más de **3,4 defectos por millón**, con el ciclo DMAIC: definir, medir, analizar, mejorar y controlar.',
    ]),
  ],
  y7: [
    scene([
      head('Teoría de sistemas'),
      box(250, 120, 300, 160, 'SISTEMA', { c: 'blue', fs: 26, sub: 'componentes que interactúan por un objetivo', id: 's' }),
      ico(90, 200, 'globe', { t: 'entorno', c: 'green', id: 'e', s: 1 }),
      arr('e', 's', { c: 'green', t: 'entradas', s: 1, bend: -40 }), arr('s', 'e', { c: 'orange', t: 'salidas', s: 1, bend: -40 }),
      box(600, 60, 180, 120, 'Homeostasis: equilibrio por AUTORREGULACIÓN', { c: 'purple', fs: 15, s: 2 }),
      box(600, 200, 180, 110, 'En línea: actualiza al instante (stock web)', { c: 'cyan', fs: 15, s: 3 }),
      box(600, 325, 180, 100, 'Por lotes (batch)', { c: 'gray', fs: 16, s: 3 }),
      txt(330, 360, 'Desarrollo estructurado: análisis TOP-DOWN', { b: true, fs: 16, c: 'yellow', s: 4 }),
    ], [
      'Un **sistema** es un conjunto de componentes que interactúan para lograr un objetivo común.',
      'Un sistema **abierto** intercambia entradas y salidas con su entorno; uno cerrado, no.',
      'La **homeostasis** es el equilibrio dinámico que se logra por **autorregulación**.',
      'El procesamiento puede ser **en línea**, que actualiza al instante, como el stock de una tienda online, o **por lotes**.',
      'Y el **desarrollo estructurado** partió de la programación estructurada, con análisis **top-down**.',
    ]),
  ],
  y8: [
    scene([
      head('Proyectos: WBS, esfuerzo y camino crítico'),
      tree(20, 55, 460, 190, { t: 'Proyecto', c: 'blue', kids: [{ t: 'Análisis', c: 'blue', kids: [{ t: 'paquete', c: 'green' }, { t: 'paquete', c: 'green' }] }, { t: 'Desarrollo', c: 'blue', kids: [{ t: 'paquete', c: 'green' }] }] }, { fs: 15 }),
      txt(250, 270, 'WBS: el nivel más bajo es el PAQUETE DE TRABAJO', { b: true, fs: 15, c: 'green' }),
      box(500, 55, 280, 110, '24 h-persona ÷ (2 personas × 8 h) = 1,5 días', { c: 'yellow', fs: 17, s: 1 }),
      plot(500, 180, 280, 130, [0, 10], [0, 4], { ticks: false, s: 2, fns: [{ pts: [[0, 3], [4, 3]], c: 'red' }, { pts: [[4, 2], [9, 2]], c: 'red' }, { pts: [[0, 1], [3, 1]], c: 'gray' }] }),
      txt(640, 330, 'Gantt · en rojo: camino crítico', { b: true, fs: 15, c: 'red', s: 2 }),
      box(20, 300, 460, 135, 'SMART: específico, medible, alcanzable, relevante, con tiempo · "mejorar la satisfacción" no lo es', { c: 'purple', fs: 15, s: 3 }),
      box(500, 355, 280, 80, 'Riesgo: anticipar = servidor de respaldo listo · QA audita procesos', { c: 'orange', fs: 13, s: 4 }),
    ], [
      'Un **proyecto** es temporal y con un resultado único. El **PMBOK**, del PMI, reúne las buenas prácticas, y el **project charter** lo autoriza. La **WBS** descompone los entregables; su nivel más bajo es el **paquete de trabajo**.',
      'Ojo con **esfuerzo** y **duración**: 24 horas-persona, con dos personas de 8 horas por día, son **1,5 días**.',
      'En el diagrama de **Gantt**, el **camino crítico** son las tareas que, si se atrasan, atrasan todo el proyecto.',
      'Los objetivos deben ser **SMART**: específicos, medibles, alcanzables, relevantes y con plazo. "Mejorar la satisfacción del cliente" no cumple.',
      'Ante riesgos: evitar, transferir, mitigar o **anticipar**, como tener un servidor de respaldo listo. Y en calidad, el aseguramiento audita procesos y el control revisa productos.',
    ]),
  ],
  y9: [
    scene([
      head('Tipos de sistemas de información'),
      stack(150, 55, 500, 300, [{ t: 'ESS', d: 'alta dirección', c: 'purple' }, { t: 'DSS', d: 'modelos: ¿qué pasa si…? (semiestructuradas)', c: 'orange', s: 2 }, { t: 'MIS', d: 'informes predefinidos (estructuradas)', c: 'blue', s: 1 }, { t: 'TPS', d: 'transacciones: punto de venta', c: 'green' }], { fs: 17 }),
      box(150, 375, 500, 60, 'Dato = hecho en bruto · Información = datos con significado', { c: 'yellow', fs: 17, s: 3 }),
    ], [
      'De abajo hacia arriba: el **TPS** registra **transacciones**, como un punto de venta.',
      'El **MIS** da **informes predefinidos** y de rutina a los mandos medios, para decisiones **estructuradas**.',
      'El **DSS** permite **manipular** datos y modelos: "¿qué pasa si sube la tasa?". Es para decisiones **semiestructuradas**. Arriba, el ESS para la alta dirección.',
      'Y la base de todo: un **dato** es un hecho en bruto; la **información** son datos procesados con significado.',
    ]),
  ],
  y10: [
    scene([
      head('Análisis, diseño e implementación'),
      box(30, 60, 360, 110, 'Modelo LÓGICO', { c: 'blue', fs: 22, sub: 'conceptual, independiente de la tecnología' }),
      box(410, 60, 360, 110, 'Modelo FÍSICO', { c: 'orange', fs: 22, sub: 'archivos, bases, hardware y software concretos', s: 1 }),
      box(30, 195, 360, 110, 'Cuestionarios: muchos usuarios o dispersos', { c: 'purple', fs: 17, s: 2 }),
      box(410, 195, 360, 110, 'Pruebas: código · almacenamiento · volumen · usuario', { c: 'green', fs: 17, s: 3 }),
      bits(30, 335, 740, [{ t: 'Desarrollo', c: 'gray' }, { t: 'Prueba', c: 'yellow' }, { t: 'PRODUCCIÓN (usuarios reales)', n: 2, c: 'red' }], { h: 54, fs: 17, s: 4 }),
    ], [
      'El **modelo lógico** describe la solución en forma conceptual, sin depender de la tecnología.',
      'El **modelo físico** baja a archivos, bases de datos y el hardware y software concretos.',
      'Para relevar: entrevistas, observación, documentos y **cuestionarios**, cuando hay muchos usuarios o están dispersos.',
      'Las pruebas incluyen la de **código**, la de **almacenamiento**, que verifica la capacidad de guardar la información, la de volumen y la de usuario.',
      'Y los entornos: desarrollo, prueba y **producción**, donde trabajan los usuarios reales.',
    ]),
  ],
  y11: [
    scene([
      head('Estrategias de implementación'),
      ...[['Directa', 'se apaga el viejo y entra el nuevo', 'red'], ['En paralelo', 'conviven un tiempo', 'blue'], ['PILOTO', 'una sola sucursal primero', 'green'], ['Por fases', 'de a módulos', 'orange']].map(([t, sub, c], i) => box(15 + i * 197, 70, 180, 140, t, { c, sub, fs: 20, s: i })),
      box(30, 260, 360, 150, 'Plan de contingencia: continuidad de las operaciones críticas', { c: 'purple', fs: 18, s: 4 }),
      box(410, 260, 360, 150, 'Posimplementación: verificar objetivos y necesidades de capacitación', { c: 'cyan', fs: 18, s: 4 }),
    ], [
      'Implementación **directa**: se apaga el sistema viejo y entra el nuevo. Rápida y riesgosa.',
      'En **paralelo**: los dos conviven un tiempo, más seguro y más caro.',
      '**Piloto**: se prueba primero en **una sola sucursal**.',
      'Y **por fases**: de a módulos.',
      'Además, un **plan de contingencia** para mantener las operaciones críticas, y una **evaluación posimplementación** para verificar objetivos y capacitación.',
    ]),
  ],
  y12: [
    scene([
      head('Proceso de comunicación'),
      ...['Emisor', 'Mensaje', 'Canal', 'RECEPTOR'].map((t, i) => box(15 + i * 197, 80, 180, 70, t, { c: (['blue', 'green', 'orange', 'pink'] as const)[i], fs: 19, id: 'p' + i, s: i === 3 ? 1 : 0 })),
      ...[0, 1, 2].map((i) => arr('p' + i, 'p' + (i + 1), { s: i === 2 ? 1 : 0 })),
      arr('p3', 'p0', { bend: 90, c: 'yellow', t: 'retroalimentación', s: 1 }),
      box(30, 280, 360, 150, 'Oratoria: persuadir o convencer · 1º elegir el tema · concisión · objetividad', { c: 'purple', fs: 16, s: 2 }),
      box(410, 280, 360, 150, 'Informes y actas: comunicación formal interna', { c: 'gray', fs: 18, s: 3 }),
    ], [
      'La comunicación va del **emisor**, con un **mensaje**, por un **canal**…',
      '…al **receptor**, quien recibe la información, y vuelve como **retroalimentación**.',
      'La **oratoria** busca **persuadir o convencer**. El primer paso es **elegir el tema**; se valoran la concisión y la objetividad.',
      'Y los informes y las actas son comunicaciones **formales internas**.',
    ]),
  ],
};
