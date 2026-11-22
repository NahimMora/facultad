/**
 * IISW · Módulos 1 (conceptos) y 2 (ciclos de vida), tema por tema.
 * Fuentes revisadas (privadas): apuntes de los módulos 1 y 2 y finales anteriores, incluido el del 07/12/2023.
 * Redacción y diagramas propios. Caso ficticio: la app de reservas del club.
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { arr, box, head, line, txt } from './h';
import { asker, cards, flow, grow, list, sc, VIDEO_NOTE } from './kit';

const F = 'finales anteriores (Drive de estudiantes)';

export const M1_THEORY: TheoryBlock[] = [
  {
    id: 'm1-def', module: 'm1', title: 'Origen y definiciones', videoNote: VIDEO_NOTE,
    lead: ['La ingeniería de software nace como **respuesta a un desastre**: proyectos caros, tarde, cancelados o imposibles de mantener. La idea fue construir software con método, como en otras ingenierías.'],
    scenes: [flow('De la crisis a la disciplina', [
      ['1968', 'conferencia de la OTAN', 'En 1968, la conferencia de la OTAN acuña dos términos: **crisis del software** e **ingeniería del software**.'],
      ['La crisis', 'fuera de costo y plazo, cancelados', 'La crisis: proyectos que se pasaban de costo y tiempo o se cancelaban. Los que terminaban costaban en mantenimiento casi lo mismo que en desarrollo.'],
      ['Bauer', 'económico y eficiente en máquinas reales', '**Bauer**: usar principios de ingeniería para obtener software económico que trabaje de forma eficiente en máquinas reales.'],
      ['IEEE 1993', 'sistemático, disciplinado, cuantificable', '**IEEE**: aplicar métodos sistemáticos, disciplinados y cuantificables al desarrollo, operación y mantenimiento.'],
      ['Boehm', 'programas + su documentación', '**Boehm**, la más completa: conocimiento científico aplicado al diseño y construcción de programas **y la documentación** para desarrollarlos, operarlos y mantenerlos.'],
    ])],
    points: [
      '**1968, OTAN:** crisis del software e ingeniería del software.',
      '**IEEE:** métodos sistemáticos, disciplinados y cuantificables para desarrollo, operación y mantenimiento.',
      '**Boehm:** suma explícitamente la documentación.',
      'Contempla **todos** los aspectos de la producción de software, no solo programar.',
    ],
    written: 'La ingeniería de software es la aplicación de métodos sistemáticos, disciplinados y cuantificables al desarrollo, operación y mantenimiento del software (IEEE, 1993). Surge en 1968 como respuesta a la crisis del software: proyectos que excedían costos y plazos, se cancelaban o tenían altísimos costos de mantenimiento.',
  },
  {
    id: 'm1-prod', module: 'm1', title: 'Producto, proceso e ingeniero de software',
    lead: ['**Producto** es todo lo que se obtiene; **proceso**, cómo se lo obtiene. El producto es mucho más que el ejecutable.'],
    scenes: [list('La app de reservas del club', [
      ['Proceso', 'actividades para crearla y evolucionarla', '**Proceso**, según Sommerville: conjunto de actividades cuya meta es el desarrollo o la evolución del software.'],
      ['Producto', 'app + requerimientos, diseño, fuente, pruebas, manual', '**Producto**: el ejecutable y también los requerimientos, el diseño, el código fuente, los datos de prueba y el manual.'],
      ['Ingeniero', 'traduce, modela, abstrae, comunica', 'El **ingeniero de software** programa, traduce deseos vagos en especificaciones, cambia de vocabulario según con quién habla, modela y trabaja con otros.'],
    ])],
    points: [
      '**Producto:** programas y documentación generada durante el proceso.',
      '**Proceso:** genera el producto a partir de los requerimientos del usuario.',
      '**Ingeniero:** experiencia en programación y estructuras de datos, traducir lo vago, manejar vocabularios, moverse entre niveles de abstracción, modelar, comunicarse y administrar.',
    ],
    written: 'El producto de software incluye los programas y toda la documentación asociada (requerimientos, diseño, código fuente, datos de prueba, manuales). El proceso es el conjunto de actividades cuya meta es el desarrollo o evolución del software.',
    trap: 'Producto **no es** solo el ejecutable más el manual.',
  },
  {
    id: 'm1-sistema', module: 'm1', title: 'Sistema contra software',
    lead: ['Pregunta textual de un final. **El sistema es todo; el software es una pieza, la lógica.** Un sistema tiene partes computarizadas y partes manuales.'],
    scenes: [sc([
      head('Sistema de reservas del club'),
      box(205, 185, 190, 75, 'Sistema', { c: 'purple', fs: 22, id: 's' }),
      box(15, 55, 180, 85, 'Software', { c: 'blue', fs: 18, sub: 'lógico: la app', id: 'a', s: 1 }),
      box(405, 55, 180, 85, 'Hardware', { c: 'orange', fs: 18, sub: 'físico: servidor', id: 'b', s: 2 }),
      box(15, 178, 160, 90, 'Gente', { c: 'green', fs: 18, sub: 'socios, personal', id: 'c', s: 3 }),
      box(425, 178, 160, 90, 'Base de datos', { c: 'cyan', fs: 17, sub: 'turnos', id: 'd', s: 3 }),
      box(15, 315, 260, 95, 'Documentación', { c: 'gray', fs: 18, sub: 'manuales', id: 'e', s: 4 }),
      box(325, 315, 260, 95, 'Procedimientos', { c: 'yellow', fs: 18, sub: 'también manuales', id: 'f', s: 4 }),
      arr('a', 's', { s: 1 }), arr('b', 's', { s: 2 }), arr('c', 's', { s: 3 }), arr('d', 's', { s: 3 }), arr('e', 's', { s: 4 }), arr('f', 's', { s: 4 }),
    ], [
      'Un **sistema** es una colección de componentes organizados para cumplir funciones específicas, según IEEE.',
      'El **software** es el componente lógico: programas y documentación que satisfacen requisitos.',
      'El **hardware** es el componente físico.',
      'También lo integran la **gente** que lo usa y opera, y la **base de datos**.',
      'Y la **documentación** y los **procedimientos**, que pueden ser manuales. Por eso sistema es más que software.',
    ])],
    points: [
      '**Sistema (IEEE 610.12):** componentes organizados para cumplir una función o funciones específicas.',
      '**Componentes:** software, hardware, gente, base de datos, documentación, procedimientos.',
      '**Software:** colección de programas y documentación; puede ser independiente o subsistema de uno mayor (el GPS del celular).',
    ],
    written: 'Un sistema es una colección de componentes organizados para cumplir funciones específicas; combina procesos computarizados y manuales: software, hardware, personas, base de datos, documentación y procedimientos. El software es solo el componente lógico y computacional.',
    trap: 'Correcta del final: "un sistema son procesos computarizados **y** manuales; el software, solo computacional". "El sistema es manual" es falso.',
  },
  {
    id: 'm1-cual', module: 'm1', title: 'Calidad, vistas y tipos de cualidades', videoNote: VIDEO_NOTE,
    lead: ['Calidad no es "excelencia": es **tener los atributos que hacían falta y que el cliente lo perciba**. Por eso cambia según quién mire.'],
    scenes: [list('¿Qué es una app de calidad?', [
      ['Usuario', 'confiable, rápida, fácil', 'Para el **usuario**: confiable, eficiente y fácil de usar. Son cualidades externas.'],
      ['Desarrollador', 'verificable, mantenible', 'Para el **desarrollador**: fácil de probar y de mantener. Son internas.'],
      ['Administrador', 'proceso productivo', 'Para el **administrador del proyecto**: productividad y eficiencia del proceso.'],
    ])],
    points: [
      '**IEEE:** buena combinación de atributos deseados y el cliente percibe que cumple sus expectativas.',
      '**Ghezzi:** **internas** (desarrolladores) o **externas** (usuarios); del **producto** o del **proceso**.',
      '**Proceso → producto:** la relación es más compleja que en hardware, porque el software es creativo, pero un buen proceso reduce defectos.',
      '**Maleabilidad:** el software se modifica fácil, por eso se espera que se adapte.',
      'No se piden todas las cualidades siempre: se eligen las relevantes.',
    ],
    written: 'Hay calidad de software cuando posee una buena combinación de atributos deseados y el usuario percibe que cumple sus expectativas (IEEE). Según Ghezzi las cualidades son internas (relevantes para desarrolladores) o externas (visibles para usuarios), y del producto o del proceso.',
  },
  {
    id: 'm1-cualp', module: 'm1', title: 'Cualidades del producto',
    lead: ['El final te describe una situación y te pide **el nombre de la cualidad**. Las tres que se confunden: correcto, confiable y robusto.'],
    scenes: [
      list('Las tres que se confunden', [
        ['Correctitud', 'hace lo especificado', '**Correctitud**: se comporta según la especificación. No deja reservar dos veces la misma cancha.'],
        ['Confiabilidad', 'puedo depender de él', '**Confiabilidad**: la probabilidad de operar como se espera en un intervalo de tiempo. No se cae los sábados.'],
        ['Robustez', 'aguanta lo no previsto', '**Robustez**: se comporta razonablemente ante lo no anticipado. Una fecha absurda da un aviso, no un cuelgue.'],
      ]),
      cards('El resto', [
        ['Performance', 'usa bien tiempo y memoria', '**Performance**: usar los recursos en forma económica.'],
        ['Amigabilidad', 'fácil de usar', '**Amigabilidad**: más que la interfaz; si responde mal o lento no es amigable.'],
        ['Verificabilidad', 'fácil de probar', '**Verificabilidad**: sus propiedades se comprueban fácil.'],
        ['Mantenibilidad', 'corregir y mejorar', '**Mantenibilidad**: modificar después de la entrega, para arreglar, mejorar o adaptar.'],
        ['Reusabilidad', 'sirve en otro producto', '**Reusabilidad**: reutilizar partes. Se piensa de antemano.'],
        ['Portabilidad', 'corre en otros ambientes', '**Portabilidad**: correr en otro hardware, software o sistema operativo.'],
        ['Interoperabilidad', 'coopera con otros', '**Interoperabilidad**: coexistir y cooperar con otros sistemas por interfaces estándar.'],
        ['Integridad', 'controla accesos', '**Integridad**: controla los accesos no autorizados a datos o software.'],
      ]),
    ],
    points: [
      '**Mantenibilidad** incluye arreglar errores, agregar mejoras e incorporar nuevos requerimientos.',
      '**Reusabilidad** es difícil de lograr después: se diseña desde el principio.',
      '**Amigabilidad** depende también de correctitud y performance.',
    ],
    table: { head: ['Dice el enunciado', 'Cualidad'], rows: [['el usuario puede depender de él para decidir', 'confiabilidad'], ['no se cuelga con una tecla errónea', 'robustez'], ['cumple la especificación', 'correctitud'], ['intercambia datos con otro sistema', 'interoperabilidad'], ['funciona en Android e iOS', 'portabilidad']] },
    trap: 'Final 2023: "que los usuarios **puedan depender** de los resultados" → **confiabilidad**.',
  },
  {
    id: 'm1-cualproc', module: 'm1', title: 'Cualidades del proceso',
    lead: ['Son solo tres y no hablan de la app sino **de cómo se trabaja**. "¿A qué refiere oportunidad?" salió y vale 10 puntos.'],
    scenes: [list('¿Cómo trabaja el equipo?', [
      ['Productividad', 'con cuántos recursos produce', '**Productividad**: eficiencia del proceso según los recursos que requiere. Las rutinas reusables la mejoran.'],
      ['Oportunidad', 'entrega a tiempo', '**Oportunidad**: la habilidad de entregar a tiempo. Pide buena programación, estimación y metas claras.'],
      ['Visibilidad', 'se ve en qué estado está', '**Visibilidad**: pasos y estado documentados y accesibles para examinarlos desde afuera.'],
    ])],
    points: ['**Productividad, oportunidad, visibilidad.**', '**Performance** es eficiencia del **producto**; **productividad**, del **proceso**.'],
    table: { head: ['', 'Performance', 'Productividad'], rows: [['De qué', 'producto', 'proceso'], ['Mide', 'tiempo y memoria al ejecutar', 'recursos para desarrollar'], ['Ejemplo', 'busca canchas en 1 segundo', 'reservas hechas en 2 semanas']] },
    written: 'La oportunidad es una cualidad del proceso y se refiere a la habilidad de entregar el producto a tiempo. La productividad mide la eficiencia del proceso según los recursos requeridos; la performance, en cambio, es una cualidad del producto: el uso económico de tiempo y memoria.',
    trap: 'Oportunidad **no es** encontrar clientes ni evitar accesos: es **entregar a tiempo**. No elijas "todas".',
  },
  {
    id: 'm1-princ', module: 'm1', title: 'Los siete principios', videoNote: VIDEO_NOTE,
    lead: ['Las cualidades son **lo que querés lograr**; los principios, **cómo trabajás** durante todo el proceso. La estrella es modularidad.'],
    scenes: [
      list('Siete principios', [
        ['Rigor y formalidad', 'precisión; al máximo, matemática', '**Rigor y formalidad**: complementa la creatividad. La formalidad es el nivel máximo, con leyes matemáticas.'],
        ['Incumbencias', 'cada aspecto por separado', '**Separación de incumbencias**: tratar cada aspecto por separado, como desarrollo, testing y redes.'],
        ['Modularidad', 'dividir en módulos', '**Modularidad**: partir lo complejo en módulos más simples.'],
        ['Abstracción', 'solo lo importante', '**Abstracción**: identificar lo importante e ignorar lo irrelevante.'],
        ['Anticipar cambios', 'prever; controlar versiones', '**Anticipación al cambio**: prever la evolución. La apoya la administración de configuraciones.'],
        ['Generalización', 'el problema más general', '**Generalización**: descubrir el problema más general detrás del que te dieron.'],
        ['Incrementalidad', 'entregar de a partes', '**Incrementalidad**: entregar subconjuntos para tener realimentación temprana.'],
      ]),
      sc([
        head('Modularidad bien hecha'),
        box(20, 70, 250, 230, '', { c: 'blue' }), txt(145, 96, 'Reservas', { fs: 18, b: true, c: 'blue' }),
        box(45, 125, 90, 60, 'alta', { c: 'blue', fs: 16, id: 'a' }), box(155, 125, 90, 60, 'baja', { c: 'blue', fs: 16, id: 'b' }), box(100, 215, 90, 60, 'validar', { c: 'blue', fs: 16, id: 'c' }),
        arr('a', 'b', { head: false, s: 1 }), arr('a', 'c', { head: false, s: 1 }), arr('b', 'c', { head: false, s: 1 }),
        box(390, 70, 190, 230, 'Pagos', { c: 'orange', fs: 18, id: 'p' }),
        arr([274, 185], [386, 185], { c: 'yellow', s: 2 }),
        txt(145, 350, 'alta cohesión adentro', { fs: 17, b: true, c: 'blue', s: 1 }),
        txt(455, 350, 'bajo acoplamiento', { fs: 17, b: true, c: 'yellow', s: 2 }),
      ], [
        'Dos **módulos**: Reservas y Pagos. Cada uno resuelve una parte del problema.',
        '**Cohesión** es la relación entre los componentes de adentro de un módulo. Se busca **alta**.',
        '**Acoplamiento** es la comunicación entre módulos. Se busca **bajo**: cambiar Pagos no rompe Reservas.',
      ]),
    ],
    points: [
      'Se aplican durante **todo** el desarrollo y la evolución, no en una fase.',
      '**Rigor y formalidad, separación de incumbencias, modularidad, abstracción, anticipación al cambio, generalización, incrementalidad.**',
      '**Modularidad:** reduce complejidad y facilita modificar o corregir; alta cohesión y bajo acoplamiento.',
    ],
    written: 'Los principios son rigor y formalidad, separación de incumbencias, modularidad, abstracción, anticipación al cambio, generalización e incrementalidad. La modularidad divide un sistema complejo en partes más simples, con alta cohesión (relación interna del módulo) y bajo acoplamiento (relación entre módulos).',
    trap: 'Es choice múltiple: marcá **las dos** correctas, "separa un problema complejo" **y** "alta cohesión, bajo acoplamiento".',
  },
  {
    id: 'm1-brooks', module: 'm1', title: 'Brooks: esencia y accidente',
    lead: ['En "No silver bullet", Brooks dice que **no hay bala de plata**: hay dificultades que ninguna herramienta saca porque son parte de qué es el software.'],
    scenes: [cards('Dos clases de dificultades', [
      ['Esenciales', 'complejidad, conformidad, variabilidad, invisibilidad', '**Esenciales**: inherentes al software. Complejidad, conformidad, variabilidad e invisibilidad siguen aunque avance la tecnología.'],
      ['Accidentales', 'lenguajes, memoria, velocidad', '**Accidentales**: las del momento, no inherentes. Con la tecnología van cambiando, como los límites de memoria.'],
    ])],
    points: ['**Esenciales:** complejidad, conformidad, variabilidad (mutabilidad), invisibilidad.', '**Accidentales:** lenguajes, espacio, velocidad.'],
    written: 'Brooks distingue dificultades esenciales, inherentes a la naturaleza del software (complejidad, conformidad, variabilidad e invisibilidad), que persisten pese al avance tecnológico, y accidentales, propias del momento de producción, que pueden reducirse con la tecnología.',
  },
];

export const M2_THEORY: TheoryBlock[] = [
  {
    id: 'm2-ciclos', module: 'm2', title: 'Qué es un ciclo de vida y cuál elegir', videoNote: VIDEO_NOTE,
    lead: ['El **ciclo de vida** va desde que surge la necesidad hasta que el sistema sale de uso. Cada modelo es una forma de ordenar ese camino. El final pregunta **cuál conviene, qué desventaja tiene y quién la subsana**.'],
    scenes: [grow('¿Cuál conviene?', ['Si…', 'Modelo'], [
      [['requisitos completos y estables', 'cascada'], 'Si los requisitos están completos y no van a cambiar: **cascada**.'],
      [['hay riesgos altos', 'espiral'], 'Si hay riesgos importantes: **espiral**.'],
      [['hace falta usar algo pronto', 'incremental'], 'Si el cliente necesita una parte funcionando pronto: **incremental**.'],
      [['el cliente no sabe explicar', 'prototipos'], 'Si el cliente no puede describir lo que quiere: **prototipos**.'],
      [['se desconocen las necesidades', 'evolutivo'], 'Si se desconocen las necesidades o el entorno cambia: **evolutivo**.'],
      [['híbrido con UML, por fases', 'UP'], 'Si se busca un híbrido iterativo e incremental con UML: **Proceso Unificado**.'],
    ], [1.6, 1])],
    points: [
      'También se llaman **paradigmas de proceso**: definen orden y forma de especificar, diseñar, probar, implementar.',
      'Elegir bien mejora productividad, calidad, riesgo y cercanía con el cliente.',
    ],
    table: { head: ['Desventaja', 'La subsana'], rows: [['cascada: el cliente no ve avances', 'incremental'], ['los anteriores no miran riesgos', 'espiral'], ['cascada: no admite requisitos confusos', 'prototipos, evolutivo'], ['prototipo descartable: se tira lo hecho', 'prototipo evolutivo']] },
    written: 'El ciclo de vida es el conjunto de actividades desde que surge la necesidad de un sistema hasta que sale de uso. Cada modelo define la forma y secuencia de esas actividades, y se elige según la estabilidad de los requisitos, los riesgos y la necesidad de entregas tempranas.',
  },
  {
    id: 'm2-cascada', module: 'm2', title: 'Cascada (clásico o lineal)',
    lead: ['Una etapa atrás de otra: **no empezás la siguiente hasta cerrar y documentar la anterior**. Simple y rígido.'],
    scenes: [flow('Seis etapas', [
      ['Requerimientos', 'QUÉ hay que hacer', '**Análisis y especificación de requerimientos**: relevar y especificar el qué.'],
      ['Diseño', 'CÓMO: módulos, datos, interfaces', '**Diseño**: el cómo. Módulos, algoritmos, estructuras de datos, arquitectura e interfaces.'],
      ['Codificación', 'pasarlo al lenguaje', '**Codificación**: traducir el diseño al lenguaje de programación.'],
      ['Pruebas', '¿cumple los requerimientos?', '**Pruebas**: verificar que las entradas den las salidas esperadas.'],
      ['Integración', 'unir los módulos', '**Integración**: combinar los módulos en el sistema.'],
      ['Operación', 'uso y mantenimiento', '**Operación y mantenimiento**: usarlo y corregirlo, adaptarlo o ampliarlo después de la entrega.'],
    ])],
    points: [
      '**Ventajas:** simple de planificar y administrar sin personal muy experto, sin solapamientos, permite cronograma, todo documentado.',
      '**Desventajas:** rígido, el cliente ve el producto recién cerca de las pruebas, mucha documentación.',
      '**Conviene:** requisitos completos al inicio y sin cambios esperados.',
      '**Modificado:** permite volver a etapas anteriores para corregir.',
    ],
    written: 'El modelo en cascada organiza el desarrollo en etapas secuenciales (requerimientos, diseño, codificación, pruebas, integración, operación y mantenimiento), donde cada una debe finalizar y documentarse antes de la siguiente. Es simple de administrar, pero rígido: conviene con requisitos estables y su principal desventaja es que el cliente no ve avances hasta etapas muy avanzadas.',
    trap: 'Análisis = **qué**. Diseño = **cómo**.',
  },
  {
    id: 'm2-espiral', module: 'm2', title: 'Espiral',
    lead: ['Boehm, años 80: lo nuevo es el **análisis de riesgos**. El proyecto se vuelve una suma de miniproyectos, cada vuelta con cuatro pasos.'],
    scenes: [sc([
      head('Cada vuelta, cuatro cuadrantes'),
      line([[300, 52], [300, 425]], { c: 'gray', dash: true }), line([[15, 238], [585, 238]], { c: 'gray', dash: true }),
      box(25, 60, 255, 160, 'Planificación', { c: 'blue', fs: 18, sub: 'objetivos, alternativas, restricciones', id: 'p' }),
      box(320, 60, 255, 160, 'Análisis de riesgos', { c: 'red', fs: 18, sub: 'elegir y prevenir', id: 'r', s: 1 }),
      box(320, 258, 255, 160, 'Ingeniería', { c: 'green', fs: 18, sub: 'desarrollar', id: 'i', s: 2 }),
      box(25, 258, 255, 160, 'Evaluación del cliente', { c: 'yellow', fs: 18, sub: 'decidir cómo seguir', id: 'e', s: 3 }),
      arr('p', 'r', { s: 1 }), arr('r', 'i', { s: 2 }), arr('i', 'e', { s: 3 }), arr('e', 'p', { s: 4 }),
    ], [
      '**Planificación**: objetivos, alternativas y restricciones. Qué parte se aborda en el ciclo.',
      '**Análisis de riesgos**: elegir la mejor alternativa, identificar y prevenir riesgos. Es el aporte del modelo.',
      '**Ingeniería**: desarrollar, pudiendo usar otro modelo adentro, como cascada.',
      '**Evaluación del cliente**: valora lo hecho y se decide cómo seguir.',
      'Y arranca **otra vuelta**, más afuera: otra parte del desarrollo con sus riesgos.',
    ])],
    points: ['**Boehm, años 80.**', '**Planificación → riesgos → ingeniería → evaluación del cliente.**', 'Suma de miniproyectos, cada uno centrado en uno o más riesgos.'],
    written: 'El modelo espiral, de Boehm, incorpora el análisis de riesgos. El proyecto es una sucesión de miniproyectos y cada ciclo atraviesa planificación, análisis de riesgos, ingeniería y evaluación del cliente.',
  },
  {
    id: 'm2-incremental', module: 'm2', title: 'Incremental',
    lead: ['Se pidió de desarrollo en el final de 2023: **etapas, una ventaja y una desventaja**. Parte de una especificación, divide en partes y **entrega cada una funcionando**.'],
    scenes: [sc([
      head('Cada parte tiene su ciclo'),
      ...['Reservas', 'Pagos', 'Torneos'].flatMap((name, i) => [
        txt(20 + i * 60, 72 + i * 125, `Incremento ${i + 1}: ${name}`, { fs: 17, b: true, anchor: 'start', s: i }),
        ...['Req.', 'Diseño', 'Código', 'Prueba', 'Entrega'].map((t, j) => box(15 + i * 60 + j * 88, 92 + i * 125, 82, 62, t, { c: j === 4 ? 'green' as const : 'blue' as const, fs: 15, s: i })),
      ]),
    ], [
      'Primer incremento: **Reservas** pasa por requerimientos, diseño, código y pruebas, y se **entrega operativo**.',
      'Segundo: **Pagos**, con el mismo ciclo. El cliente ya usa el primero y puede corregir requisitos.',
      'Tercero: **Torneos**. Los ciclos pueden solaparse según la planificación, y cada entrega se integra.',
    ])],
    points: [
      '**Etapas por incremento:** requerimientos, diseño, codificación, pruebas, integración, operación y mantenimiento.',
      '**Ventajas:** algo operativo pronto, avances visibles, requisitos corregibles, calma la ansiedad del cliente.',
      '**Desventaja:** hace falta más experiencia para dividir en subsistemas operativos y planificar las entregas.',
      '**Diseño por planificación:** entregar por prioridad decreciente; si se cancela, lo importante ya está.',
    ],
    written: 'El modelo incremental parte de una especificación de requerimientos y divide el sistema en partes; a cada una le aplica un ciclo completo (requerimientos, diseño, codificación, pruebas, integración, operación y mantenimiento) y entrega un subsistema operativo. Ventaja: el cliente usa y ve avances temprano. Desventaja: requiere más experiencia para definir los subsistemas y planificar las entregas.',
    trap: 'No pongas "el cliente no ve avances" como desventaja: eso es **cascada** y es justo lo que el incremental resuelve.',
  },
  {
    id: 'm2-proto', module: 'm2', title: 'Prototipos',
    lead: ['Un prototipo **simula** el sistema para que el cliente reaccione. Se usa cuando **nadie sabe explicar bien qué hace falta**.'],
    scenes: [cards('Dos clasificaciones', [
      ['Descartable', 'se aprende y se tira', '**Descartable**: sirve para entender y se descarta. El cliente no entiende por qué tiran lo hecho.'],
      ['Evolutivo', 'sobre la arquitectura final', '**Evolutivo**: se hace sobre la arquitectura definitiva y no se tira.'],
      ['Ligero', 'bocetos de pantallas', '**Ligero**: bocetos de pantallas con su navegación dibujada.'],
      ['Operativo', 'módulos que funcionan en parte', '**Operativo**: módulos con parte de la funcionalidad.'],
    ])],
    points: ['**Cuándo:** el cliente no puede describir lo que quiere o el desarrollador desconoce la organización.', '**Objetivo:** retroalimentación para definir requisitos.', '**Según destino:** descartable o evolutivo. **Según forma:** ligero u operativo.'],
    written: 'El modelo de prototipos construye una simulación del sistema para obtener retroalimentación y definir requisitos cuando el cliente no puede describirlos. Pueden ser descartables o evolutivos, y ligeros (bocetos) u operativos (funcionalidad parcial).',
  },
  {
    id: 'm2-evol', module: 'm2', title: 'Evolutivo',
    lead: ['Se parece al incremental y no es igual: el evolutivo entrega **un sistema completo y chico que se va refinando**; el incremental, **partes** de un sistema ya especificado.'],
    scenes: [flow('Versión tras versión', [
      ['Lista inicial', 'lo poco que se sabe', 'Se arranca rápido con una **lista inicial** de especificaciones.'],
      ['Versión 1', 'sistema completo, básico', 'Se enlazan especificación, desarrollo y validación para dar un **sistema completo operable**.'],
      ['El cliente opera', 'aparecen pedidos', 'El cliente lo usa y de ahí surge la información del próximo ciclo.'],
      ['Versión 2', 'requisitos ampliados', 'Se amplían los requisitos y se rediseña: una versión mejor, hasta cubrir todo.'],
    ])],
    points: ['**Cada ciclo:** especificación + desarrollo + validación → sistema completo.', '**Útil:** área sin experiencia, entorno nuevo, urgencia extrema o entorno cambiante (normas en definición).'],
    table: { head: ['', 'Incremental', 'Evolutivo'], rows: [['Al inicio', 'especificación', 'lista inicial'], ['Entrega', 'una parte', 'sistema completo'], ['Crece', 'agregando partes', 'refinando versiones']] },
    written: 'El modelo evolutivo consta de varios ciclos que enlazan especificación, desarrollo y validación; cada uno genera un sistema completo operable que se refina con los pedidos del cliente. Sirve cuando se desconocen las necesidades o el entorno es cambiante.',
  },
  {
    id: 'm2-up', module: 'm2', title: 'Proceso Unificado (UP)',
    lead: ['Salió dos veces de desarrollo, una **comparado con cascada y espiral**. Es **híbrido**: las etapas de cascada, pero repetidas en iteraciones dentro de cuatro fases.'],
    scenes: [flow('Cuatro fases', [
      ['Inicio', 'procesos de negocio, con quién interactúa', '**Inicio**: procesos de negocio, con quién interactuará el sistema y cómo.'],
      ['Elaboración', 'casos de uso, arquitectura, plan, riesgos', '**Elaboración**: entender el dominio. Termina con casos de uso, arquitectura, plan y riesgos.'],
      ['Construcción', 'diseño, código, pruebas', '**Construcción**: diseño, programación y pruebas. Termina con un sistema operativo documentado.'],
      ['Transición', 'al entorno real', '**Transición**: pasar al entorno real hasta que funcione correctamente.'],
    ])],
    points: [
      '**Autores:** Jacobson, Booch y Rumbaugh; asociado a **UML**. RUP es la versión de Rational.',
      '**Iterativo e incremental:** cada fase se divide en iteraciones, cada una un incremento.',
      '**Flujos de trabajo** en cada iteración: requisitos, análisis, diseño, implementación, pruebas.',
      'Cada fase termina con objetivos cumplidos y un entregable.',
    ],
    table: { head: ['', 'Cascada', 'Espiral', 'UP'], rows: [['Forma', 'secuencial', 'ciclos', 'fases con iteraciones'], ['Eje', 'documentos', 'riesgos', 'casos de uso y arquitectura'], ['Cambios', 'cuestan mucho', 'por vuelta', 'por iteración'], ['Cliente ve', 'al final', 'cada vuelta', 'cada incremento']] },
    written: 'El Proceso Unificado, de Jacobson, Booch y Rumbaugh, es un modelo híbrido, iterativo e incremental asociado a UML. Tiene cuatro fases (inicio, elaboración, construcción y transición) divididas en iteraciones que recorren flujos de requisitos, análisis, diseño, implementación y pruebas. Toma de la cascada esas actividades, pero las repite en lugar de hacerlas una sola vez; al igual que el espiral avanza por ciclos y considera los riesgos (en elaboración), pero se organiza por fases con entregables en lugar de girar alrededor del análisis de riesgos.',
    trap: 'Las **fases** no son las etapas de cascada. Esas son los **flujos de trabajo** dentro de cada iteración.',
  },
];

const a = asker('m1');
export const M1_QUESTIONS: Question[] = [
  a.mcq('iisw-m1-01', 'm1-def', '¿Qué definición incluye expresamente la documentación asociada?', 'La de Boehm', ['La de Bauer', 'La de Brooks', 'La de Ghezzi'], 'Boehm: programas y documentación para desarrollarlos, operarlos y mantenerlos.'),
  a.mcq('iisw-m1-02', 'm1-prod', '¿Qué forma parte del producto de software?', 'Código, diseño, datos de prueba y manuales', ['Solo el ejecutable', 'Solo el ejecutable y el manual', 'El equipo de programadores'], 'El producto incluye la documentación generada en el proceso.'),
  a.tf('iisw-m1-04', 'm1-cual', 'Una cualidad interna es la que resulta visible para el usuario final.', false, 'Esa es externa. Las internas importan a los desarrolladores.'),
  a.mcq('iisw-m1-05', 'm1-cualp', 'Los usuarios necesitan poder depender de la aplicación para decidir. La cualidad es:', 'Confiabilidad', ['Performance', 'Amigabilidad', 'Oportunidad'], 'Confiable es que el usuario puede depender del software.', F),
  a.mcq('iisw-m1-06', 'm1-cualp', 'Arreglar errores, agregar mejoras e incorporar requerimientos tras la entrega refiere a:', 'Mantenibilidad', ['Robustez', 'Portabilidad', 'Verificabilidad'], 'Mantenibilidad abarca las tres cosas.', F),
];

const b = asker('m2');
export const M2_QUESTIONS: Question[] = [
  b.mcq('iisw-m2-02', 'm2-cascada', 'Definir la arquitectura y las estructuras de datos corresponde a:', 'Diseño', ['Requerimientos', 'Integración', 'Pruebas'], 'El diseño define el cómo; los requerimientos, el qué.'),
  b.mcq('iisw-m2-04', 'm2-incremental', '¿Cuál es una desventaja del incremental?', 'Exige más experiencia para planificar las entregas', ['El cliente no ve nada hasta el final', 'No permite corregir requisitos', 'No entrega software operativo'], 'Hay que saber partir el sistema en subsistemas operativos.', F),
  b.mcq('iisw-m2-05', 'm2-proto', 'Bocetos de pantallas con su navegación dibujada son prototipos:', 'Ligeros', ['Operativos', 'Evolutivos', 'Incrementales'], 'Los operativos tienen módulos con funcionalidad.'),
  b.mcq('iisw-m2-06', 'm2-evol', 'En el evolutivo, cada ciclo entrega:', 'Un sistema completo operable', ['Solo documentación', 'Una parte aislada', 'Un boceto descartable'], 'Se refina versión a versión.'),
  b.mcq('iisw-m2-07', 'm2-up', 'En UP, los casos de uso y la arquitectura se obtienen al cerrar:', 'Elaboración', ['Inicio', 'Construcción', 'Transición'], 'Elaboración termina con modelo de requerimientos, arquitectura y plan.', F),
];

export const M1_MAP: ConceptMap = {
  module: 'm1', root: 'Conceptos de ingeniería del software',
  branches: [
    { t: 'Ingeniería del software', d: '1968, crisis del software', topic: 'm1-def', kids: [
      { rel: 'mediante un proceso genera', t: 'Un producto', d: 'programas y documentación', topic: 'm1-prod' },
      { rel: 'que integra un', t: 'Sistema', d: 'software, hardware, gente, datos, documentos, procedimientos', topic: 'm1-sistema' },
      { rel: 'enfrenta', t: 'Esencia y accidente', d: 'Brooks: no hay bala de plata', topic: 'm1-brooks' },
    ] },
    { t: 'Calidad', d: 'atributos deseados y percepción del cliente', topic: 'm1-cual', kids: [
      { rel: 'cualidades', t: 'Del producto', d: 'correctitud, confiabilidad, robustez, performance…', topic: 'm1-cualp' },
      { rel: 'cualidades', t: 'Del proceso', d: 'productividad, oportunidad, visibilidad', topic: 'm1-cualproc' },
    ] },
    { t: 'Principios', d: 'siete; modularidad con alta cohesión y bajo acoplamiento', topic: 'm1-princ' },
  ],
  links: ['La **maleabilidad** explica por qué importan mantenibilidad y anticipación al cambio.', 'La **incrementalidad** reaparece en los Módulos 2 y 3.', 'La **formalidad** se desarrolla en el Módulo 12.'],
};

export const M2_MAP: ConceptMap = {
  module: 'm2', root: 'Modelos de ciclo de vida',
  branches: [
    { t: 'Ciclo de vida', d: 'de la necesidad al retiro', topic: 'm2-ciclos' },
    { t: 'Secuencial', kids: [{ t: 'Cascada', d: 'requisitos estables; el cliente ve al final', topic: 'm2-cascada' }] },
    { t: 'Por ciclos', kids: [
      { t: 'Espiral', d: 'riesgos', topic: 'm2-espiral' },
      { t: 'Incremental', d: 'partes operativas', topic: 'm2-incremental' },
      { t: 'Evolutivo', d: 'versiones completas', topic: 'm2-evol' },
    ] },
    { t: 'Para descubrir requisitos', kids: [{ t: 'Prototipos', d: 'descartable o evolutivo · ligero u operativo', topic: 'm2-proto' }] },
    { t: 'Híbrido', kids: [{ t: 'Proceso Unificado', d: 'inicio, elaboración, construcción, transición', topic: 'm2-up' }] },
  ],
  links: ['Los modelos **se combinan**: cascada dentro del cuadrante de ingeniería del espiral.', 'Los **ágiles** del Módulo 3 también son iterativos e incrementales.'],
};
