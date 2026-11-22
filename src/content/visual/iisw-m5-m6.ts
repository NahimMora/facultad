/**
 * IISW · Módulos 5 (modelado de procesos) y 6 (ingeniería de requerimientos), tema por tema.
 * Fuentes revisadas (privadas): apuntes de los módulos 5 y 6 y finales anteriores (los de "marcar tres errores del
 * BPMN" y "definir la lista de requerimientos"). Redacción, casos y diagramas propios: no se copian los del examen.
 */
import type { Col, Prim } from '../../vis/types';
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { arr, box, head, line, txt } from './h';
import { asker, cards, flow, grow, list, sc, VIDEO_NOTE } from './kit';

const F = 'finales anteriores (Drive de estudiantes)';

/** Pool con dos carriles (notación BPMN). */
const pool = (top: string, bottom: string): Prim[] => [
  box(15, 48, 570, 285, '', { c: 'gray' }),
  line([[15, 190], [585, 190]], { c: 'gray' }),
  txt(25, 68, top, { fs: 16, b: true, c: 'gray', anchor: 'start' }),
  txt(25, 210, bottom, { fs: 16, b: true, c: 'gray', anchor: 'start' }),
];
const event = (x: number, y: number, id: string, c: Col, o: { s?: number } = {}) => box(x, y, 36, 36, '', { shape: 'circle', c, id, ...o });

export const M5_THEORY: TheoryBlock[] = [
  {
    id: 'm5-modelado', module: 'm5', title: 'Modelos y modelo de negocio', videoNote: VIDEO_NOTE,
    lead: ['Un **modelo** es una versión simplificada de la realidad para responder preguntas. El **modelo de negocio** describe los procesos de la empresa: "¿para qué sirve?" salió en un final.'],
    scenes: [flow('Para qué modelar el negocio', [
      ['Realidad', 'cómo se trabaja en el club', 'La **realidad**: los procesos del club, con todos sus detalles.'],
      ['Abstraer', 'lo importante, sin lo irrelevante', 'Se **abstrae**: resaltar lo importante y minimizar lo demás.'],
      ['Modelo', 'diagrama de los procesos', 'El **modelo de negocio** describe esos procesos.'],
      ['Uso', 'recomendar qué informatizar', 'Sirve para **comprender al cliente**, recomendar qué informatizar y cómo acoplar lo nuevo a lo existente.'],
    ])],
    points: [
      '**Modelo:** representación de una porción de la realidad para mostrar su apariencia y comportamiento.',
      '**Davis:** responde un conjunto bien definido de preguntas, con una tolerancia adecuada al propósito.',
      '**Características:** no es la realidad; respeta una forma de construcción; permite mostrar o predecir; usarlo es más económico.',
      '**Ventaja:** detectar errores temprano y ajustar el diseño.',
    ],
    written: 'El modelo de negocio es una descripción de los procesos de una empresa. Sirve para comprender el negocio del cliente y así recomendar qué informatizar o, si se incorporan funcionalidades, cómo acoplarlas a lo existente. Como todo modelo, es una abstracción que permite detectar errores en forma temprana.',
  },
  {
    id: 'm5-actividad', module: 'm5', title: 'Diagrama de actividad',
    lead: ['**"Explique su finalidad y describa tres elementos"**: 10 puntos en el final de 2023. Parece un diagrama de flujo, con una diferencia: **muestra procesamiento en paralelo**.'],
    scenes: [sc([
      head('Consulta en informes'),
      box(282, 42, 34, 34, '', { shape: 'circle', c: 'white', solid: true, id: 'i' }),
      box(205, 98, 190, 46, 'Recibir consulta', { c: 'blue', fs: 16, shape: 'pill', id: 'r', s: 1 }),
      line([[90, 170], [510, 170]], { c: 'yellow', sw: 7, s: 2 }),
      box(45, 197, 215, 56, 'Ver cursos', { c: 'green', fs: 16, shape: 'pill', id: 'a', s: 2 }),
      box(340, 197, 215, 56, 'Ver horarios', { c: 'green', fs: 16, shape: 'pill', id: 'b', s: 2 }),
      line([[90, 283], [510, 283]], { c: 'yellow', sw: 7, s: 3 }),
      box(205, 305, 190, 46, 'Informar', { c: 'blue', fs: 16, shape: 'pill', id: 'o', s: 3 }),
      box(278, 380, 42, 42, '●', { shape: 'circle', c: 'white', fs: 20, id: 'f', s: 4 }),
      arr('i', 'r', { s: 1 }), arr('r', [300, 166], { s: 2 }),
      arr([152, 174], 'a', { s: 2 }), arr([447, 174], 'b', { s: 2 }),
      arr('a', [152, 279], { s: 3 }), arr('b', [447, 279], { s: 3 }), arr([300, 287], 'o', { s: 3 }), arr('o', 'f', { s: 4 }),
    ], [
      '**Estado inicial**: un círculo negro relleno. Acá se dibuja claro por el fondo oscuro.',
      '**Actividad**: caja de extremos redondeados. Produce un cambio o devuelve un valor. La flecha es la **transición**.',
      '**Barra de sincronización, división o split**: el flujo se abre en hilos paralelos. Cursos y horarios se consultan a la vez.',
      '**Unión o merge**: espera que terminen todos los hilos antes de seguir.',
      '**Estado final**: un círculo con un punto en el centro.',
    ])],
    points: [
      '**Finalidad:** comprender el comportamiento de alto nivel, sin detalle interno: qué acciones, cuándo y qué rol.',
      '**Elementos:** inicial, final, actividad, transición (con guarda entre [ ]), decisión (rombo, guardas excluyentes), barra de sincronización, carriles.',
      '**Usos:** acciones de una operación, realización de un caso de uso, un dominio con roles y tareas, procesos concurrentes.',
      '**Fortaleza:** paralelismo (workflow, multihilo). **Debilidad:** no muestra bien el enlace acciones-objetos; para eso, secuencia.',
    ],
    table: { head: ['', 'Decisión (rombo)', 'Barra'], rows: [['Al salir', 'un camino', 'todos a la vez'], ['Guardas', 'sí, excluyentes', 'no']] },
    written: 'El diagrama de actividad sirve para comprender el comportamiento de alto nivel de un proceso, detallando qué acciones se ejecutan, en qué secuencia y qué rol las realiza, incluido el procesamiento en paralelo. Elementos: la **actividad** (caja redondeada, acción que produce un cambio o retorna un valor), la **decisión** (rombo con salidas excluyentes y condición de guarda) y la **barra de sincronización** (divide el flujo en hilos paralelos o los une esperando a todos).',
  },
  {
    id: 'm5-bpm', module: 'm5', title: 'BPM y BPMN: qué son',
    lead: ['**BPM es la gestión** de los procesos. **BPMN es la notación** para dibujarlos de modo que entiendan negocio y sistemas.'],
    scenes: [cards('Una letra de diferencia', [
      ['BPM', 'enfoque de gestión', '**BPM**: enfoque sistemático para identificar, documentar, diseñar, ejecutar, medir y controlar procesos manuales y automatizados, alineados con la estrategia.'],
      ['BPMN', 'notación gráfica', '**BPMN**: la notación gráfica. Nace en 2004 y pasa al OMG. La 2.0 es un lenguaje común entre negocio e ingeniería.'],
    ])],
    points: [
      '**Ventajas de BPM:** acota a requerimientos de negocio, más flexibilidad, baja costos de desarrollo, procesos como activo corporativo.',
      '**BPMN:** simple de aprender y de leer; mejora la comunicación entre diseño e implementación.',
      'BPM viene de los **workflows** tradicionales.',
    ],
    written: 'BPM es un enfoque sistemático para identificar, documentar, diseñar, ejecutar, medir y controlar procesos manuales y automatizados alineados con la estrategia. BPMN es su notación gráfica estándar, un lenguaje común entre profesionales del negocio e ingenieros de software.',
  },
  {
    id: 'm5-bpmn', module: 'm5', title: 'Cómo se arma un BPMN',
    lead: ['Son cuatro familias de elementos. Para el final tenés que poder **leer uno y completarlo**.'],
    scenes: [
      sc([
        head('Un pool, dos carriles'),
        ...pool('Socio', 'Recepción'),
        event(45, 105, 'i', 'green'),
        box(110, 92, 125, 62, 'Pedir turno', { c: 'blue', fs: 15, id: 'a', s: 1 }),
        box(110, 235, 125, 62, 'Ver cupo', { c: 'blue', fs: 15, id: 'b', s: 2 }),
        box(272, 228, 92, 78, '¿hay?', { c: 'yellow', fs: 15, shape: 'diamond', id: 'g', s: 3 }),
        box(402, 235, 112, 62, 'Reservar', { c: 'blue', fs: 15, id: 'c', s: 4 }),
        box(260, 92, 116, 62, 'Ver rechazo', { c: 'blue', fs: 15, id: 'n', s: 4 }),
        event(400, 105, 'f2', 'red', { s: 5 }),
        event(540, 248, 'f1', 'red', { s: 5 }),
        arr('i', 'a', { s: 1 }), arr('a', 'b', { s: 2 }), arr('b', 'g', { s: 3 }),
        arr('g', 'c', { s: 4 }), txt(376, 250, 'sí', { fs: 15, b: true, s: 4 }), arr('g', 'n', { s: 4 }), txt(333, 208, 'no', { fs: 15, b: true, s: 4 }),
        arr('c', 'f1', { s: 5 }), arr('n', 'f2', { s: 5 }),
        txt(300, 375, 'verde: inicio · rojo: fin · rombo: gateway', { fs: 17, b: true, c: 'gray' }),
      ], [
        'El **pool** es el proceso y cada **carril** un responsable. Arranca con un **evento de inicio**.',
        'La **actividad** se nombra con un verbo y va en el carril de quien la hace.',
        'El **flujo de secuencia** pasa al carril de recepción, que verifica el cupo.',
        'El **gateway** decide. Lleva la pregunta.',
        'Cada salida lleva su condición y llega a una actividad: sí o no.',
        'Y **cada camino termina en un evento de fin**. Ninguna actividad queda colgada.',
      ]),
      cards('Cuatro categorías', [
        ['Flujo', 'eventos, actividades, gateways', '**Elementos de flujo**: eventos, actividades y gateways.'],
        ['Conexión', 'secuencia, mensaje, asociación', '**Conexión**: flujo de secuencia, de mensaje y asociación.'],
        ['Contenedores', 'pool y lane', '**Contenedores o swimlanes**: pool y lane.'],
        ['Artefactos', 'datos, grupo, anotación', '**Artefactos**: objetos de datos, grupo y anotación.'],
      ]),
    ],
    points: [
      '**Flujo:** eventos, actividades, gateways. **Conexión:** secuencia, mensaje, asociación. **Contenedores:** pool, lane. **Artefactos:** datos, grupo, anotación.',
      '**Secuencia:** dentro de un pool. **Mensaje:** entre pools distintos.',
      '**Para completar uno:** subrayá en el relato **quién** (carriles), **qué hace** (actividades), **si…** (gateways) y **cómo termina** (fines).',
    ],
    written: 'BPMN agrupa sus elementos en cuatro categorías: de flujo (eventos, actividades, gateways), de conexión (flujo de secuencia, de mensaje y asociación), contenedores (pool y lane) y artefactos (objetos de datos, grupo y anotación).',
  },
  {
    id: 'm5-errores', module: 'm5', title: 'Cazar errores en un BPMN',
    lead: [
      '**"Marque tres errores"** aparece en casi todos los finales, por 10 puntos, y a veces **las marcas incorrectas descuentan**.',
      'Pasá siempre la misma lista, en el mismo orden.',
    ],
    scenes: [
      sc([
        head('Encontrá los errores'),
        ...pool('Cliente', 'Taller'),
        box(45, 92, 125, 62, 'Pedir arreglo', { c: 'blue', fs: 15, id: 'a', hl: [1] }),
        box(45, 235, 125, 62, 'Revisar', { c: 'blue', fs: 15, id: 'b' }),
        box(225, 228, 95, 78, '', { c: 'yellow', shape: 'diamond', id: 'g', hl: [2] }),
        box(400, 235, 135, 62, 'Reparar', { c: 'blue', fs: 15, id: 'c', hl: [3] }),
        box(212, 92, 125, 62, 'Ver rechazo', { c: 'blue', fs: 15, id: 'n' }),
        event(420, 105, 'f', 'red'),
        arr('a', 'b'), arr('b', 'g'), arr('g', 'c'), arr('g', 'n'), arr('n', 'f'),
        txt(300, 360, '1 · no hay evento de inicio', { fs: 16, b: true, c: 'red', s: 1 }),
        txt(300, 388, '2 · gateway sin pregunta ni condiciones', { fs: 16, b: true, c: 'red', s: 2 }),
        txt(300, 416, '3 · "Reparar" queda sin fin', { fs: 16, b: true, c: 'red', s: 3 }),
      ], [
        'Un proceso de taller. Antes de seguir, buscá vos los tres errores.',
        'Primero: **no hay evento de inicio**. El pedido no tiene de dónde arrancar.',
        'Segundo: el **gateway no tiene pregunta** y sus salidas no dicen cuándo se toma cada una.',
        'Tercero: la rama de reparar **no llega a un fin**. Queda colgada.',
      ]),
      list('La lista, siempre en orden', [
        ['Inicio', '¿hay? ¿apunta a la primera actividad?', '**Inicio**: que exista, que sea uno por proceso y que no aparezca otro cortando el flujo.'],
        ['Fin', '¿cada camino termina?', '**Fin**: cada camino termina, y no hay un fin en la mitad del proceso.'],
        ['Conexiones', '¿algo suelto?', '**Conexiones**: toda actividad tiene entrada y salida.'],
        ['Flechas', '¿van para el lado correcto?', '**Flechas**: el rechazo sale del gateway, no entra.'],
        ['Gateways', '¿pregunta, 2 salidas, condiciones?', '**Gateways**: con pregunta, dos o más salidas y condiciones. Con una sola salida, sobra.'],
        ['Carriles', '¿nombre y responsable correcto?', '**Carriles y actividades**: con nombre, en el responsable correcto y sin repetir.'],
      ]),
    ],
    points: [
      '**Los que más salieron:** falta el inicio; una actividad final sin fin; gateway con una salida o sin etiqueta; fin e inicio que cortan un proceso único; flecha al revés; carril sin nombre; actividad en el rol equivocado o repetida.',
      '**Cómo escribirlo:** dónde, qué está mal y cómo se corrige.',
      'Si descuentan, marcá **solo tres**, los más seguros.',
    ],
    written: '1) En el carril [X], la actividad [A] no tiene evento de inicio: debe agregarse uno que la preceda. 2) El gateway posterior a [B] no tiene condición ni salidas rotuladas: agregar la pregunta y "sí / no". 3) La actividad [C] no llega a un evento de fin: agregarlo.',
    trap: 'Un fin y un inicio nuevo **en el medio del mismo proceso** son un error: esas actividades van conectadas.',
  },
];

export const M6_THEORY: TheoryBlock[] = [
  {
    id: 'm6-ir', module: 'm6', title: 'Requerimiento e ingeniería de requerimientos', videoNote: VIDEO_NOTE,
    lead: ['Un **requerimiento** es lo que el sistema tiene que ser o hacer. La **ingeniería de requerimientos** lleva de una idea vaga a un documento que el cliente firma: la **SRS**.'],
    scenes: [flow('Cuatro etapas', [
      ['Extracción', 'entrevistas, cuestionarios, observación', '**Extracción**: obtener la información con las técnicas del Módulo 4.'],
      ['Análisis', 'entender lo obtenido', '**Análisis**: estudiar toda la información.'],
      ['Especificación', 'documento formal: SRS', '**Especificación**: un documento formal, la SRS, con el comportamiento externo.'],
      ['Validación', '¿es lo que esperaba el cliente?', '**Validación**: el cliente confirma que eso es lo que espera.'],
    ])],
    points: [
      '**Pfleeger:** característica del sistema o descripción de algo que es capaz de hacer para satisfacer su propósito.',
      '**IEEE 610:** 1) condición o capacidad que necesita el usuario; 2) la que debe poseer el sistema para cumplir un contrato, estándar o especificación; 3) la representación documentada de 1 o 2.',
      '**Debe:** describir por completo el comportamiento externo y generar la SRS.',
      '**No debe:** diseñar estructuras de datos ni módulos, ni abstraerse de la extracción.',
    ],
    written: 'La ingeniería de requerimientos es el proceso de elaborar las ideas y necesidades de los usuarios hasta expresarlas en una especificación de requerimientos. Comprende extracción, análisis, especificación en un documento formal y validación por el cliente.',
    trap: 'Choice múltiple: **comportamiento externo** y **generar la SRS**. Lo que suene a diseño está mal.',
  },
  {
    id: 'm6-costo', module: 'm6', title: 'Por qué importa: el costo de un error',
    lead: ['Un error de requerimientos **se arrastra**: se diseña mal, se programa mal y se prueba mal. Cuanto más tarde aparece, más caro.'],
    scenes: [
      sc([
        head('El costo crece con la etapa'),
        ...[['Requer.', 30, 'green'], ['Diseño', 80, 'yellow'], ['Código', 155, 'orange'], ['Pruebas', 250, 'red'], ['Uso', 305, 'pink']].flatMap(([t, h, c], i) => [
          box(30 + i * 112, 380 - (h as number), 95, h as number, '', { c: c as Col, solid: true, s: i }),
          txt(77 + i * 112, 408, t as string, { fs: 16, b: true, s: i }),
        ]),
      ], [
        'Detectado en **requerimientos**, corregirlo cuesta casi nada. Las barras muestran la tendencia, no están a escala.',
        'En **diseño**, ya hay que rehacer modelos.',
        'En **código**, además hay que reprogramar.',
        'En **pruebas**, el apunte habla de multiplicar el costo muchísimo, hasta miles de veces.',
        'En **uso** es peor: ya lo sufren los usuarios.',
      ]),
      list('Standish, 280.000 proyectos, año 2000', [
        ['28 %', 'exitosos', 'Solo el **28 %** terminó con éxito: en fecha, en costo, con lo esperado y funcionando.'],
        ['23 %', 'cancelados o nunca implementados', 'El **23 %** se canceló o nunca se implementó.'],
        ['49 %', 'tarde, caros o incompletos', 'El **49 %** se entregó con demoras, sobrecostos o faltantes.'],
      ]),
    ],
    points: [
      '**Por qué hacerla:** muchos errores se descubren acá; detectarlos tarde cuesta más; sin especificación sale el producto incorrecto; la ambigüedad genera desacuerdos.',
      '**Causas de problemas:** requisitos deficientes, estimar sin basarse en ellos, procesos deficientes, estimaciones poco realistas, usuario sin participar.',
      '**Éxito:** sin desvíos de fecha ni costo, cubre expectativas y funciona.',
    ],
    written: 'Es importante porque muchos errores se originan y pueden descubrirse en esta etapa, su costo de corrección crece cuanto más tarde se detectan, sin especificación puede construirse el producto incorrecto y la ambigüedad genera desacuerdos entre usuarios y desarrolladores.',
  },
  {
    id: 'm6-limites', module: 'm6', title: 'Límites, dominios y abstracción',
    lead: ['Lo primero y más difícil: **qué es parte del sistema y qué no**. Después, separar **el problema** (qué) de **la solución** (cómo).'],
    scenes: [
      sc([
        head('La frontera del sistema'),
        box(170, 120, 260, 180, 'Sistema de reservas', { c: 'blue', fs: 18 }),
        box(130, 80, 340, 260, '', { c: 'yellow', dash: true, s: 1 }),
        txt(300, 100, 'zona gris: se negocia', { fs: 15, b: true, c: 'yellow', s: 1 }),
        txt(300, 372, 'entorno: socios, banco, AFIP', { fs: 17, b: true, c: 'gray', s: 2 }),
        txt(300, 410, 'influyen la técnica y el presupuesto', { fs: 16, c: 'green', b: true, s: 3 }),
      ], [
        'Adentro, lo que el sistema **hace**.',
        'En el borde quedan **áreas grises** que se negocian. Hay que minimizarlas.',
        'Afuera, el **entorno**. Hay que decidir qué eventos de afuera necesitan respuesta.',
        'El límite **no es arbitrario**: lo condicionan los stakeholders, la técnica y el presupuesto.',
      ]),
      cards('Dos dominios', [
        ['De la aplicación', 'QUÉ: el problema del cliente', '**Dominio de la aplicación**: donde existe el requerimiento. Qué hay que hacer. Se analiza primero.'],
        ['Del software', 'CÓMO: la solución', '**Dominio del software**: da la solución. Cómo se va a construir.'],
      ]),
    ],
    points: [
      'Definir límites permite **calcular tiempos y costos**.',
      'Reemplazar un sistema existente facilita definirlos.',
      'La separación entre dominios es **relativa al problema**.',
      '**Problema de la abstracción:** el software no es tangible como un plano. Evitar lo genérico y lo ambiguo, conocer el entorno, no suponer, dedicar tiempo.',
    ],
    written: 'El límite del sistema define qué forma parte de él y qué es su entorno; se acuerda con los stakeholders considerando factores técnicos y económicos. El dominio de la aplicación representa qué hay que hacer (el problema) y el dominio del software, cómo se construirá la solución.',
  },
  {
    id: 'm6-defectos', module: 'm6', title: 'Los seis defectos típicos',
    lead: ['"Marque los defectos de la ingeniería de requerimientos" es pregunta repetida. Son seis y los distractores son **su versión buena** (suficientes, necesarios).'],
    scenes: [list('Seis fuentes de defectos', [
      ['Sin usuarios', 'no se involucraron', 'Uno: **cliente y usuarios no se involucraron** lo suficiente.'],
      ['Cambios', 'cambian o crecen sin gestión', 'Dos: **cambios o crecimiento** de los requerimientos. Hay que analizar impacto, acordar y documentar.'],
      ['Ambiguos', 'dos interpretaciones', 'Tres: **requisitos ambiguos**, con más de una interpretación.'],
      ['Innecesarios', 'lo agregó el desarrollador', 'Cuatro: **requisitos innecesarios** que nadie pidió y cuestan.'],
      ['Insuficientes', 'solo una idea inicial', 'Cinco: **requisitos insuficientes**, falta detalle.'],
      ['Omitidos', 'un grupo olvidado', 'Seis: **omitir las necesidades de un grupo** de usuarios.'],
    ])],
    points: ['**Usuarios no involucrados, cambios o crecimiento, ambiguos, innecesarios, insuficientes, grupo omitido.**', 'El cambio es normal: el defecto es no partir de una base completa ni gestionarlo.'],
    written: 'Los defectos más frecuentes son: poca participación de clientes y usuarios, cambios o crecimiento de los requerimientos, requisitos ambiguos, requisitos innecesarios, requisitos insuficientes y omisión de necesidades de algún grupo de usuarios.',
    trap: 'En el final de cinco opciones eran **tres** correctas: ambiguos, **cambios o crecimiento** y usuarios no involucrados.',
  },
  {
    id: 'm6-beneficios', module: 'm6', title: 'Beneficios y pérdida por lenguaje',
    lead: ['Especificar bien da **acuerdo, criterio y base para estimar**. El riesgo: en cada pasaje, de la realidad a las palabras y de ahí al documento, **algo se pierde**.'],
    scenes: [
      list('Cinco beneficios', [
        ['Acuerdo', 'qué se va a hacer', '**Acuerdo** entre desarrolladores, usuarios y clientes.'],
        ['Validación', 'criterios pactados', '**Criterios de validación**: poder demostrar que se cumplió.'],
        ['Estimación', 'personal, costos, equipos', '**Base objetiva para estimar** recursos.'],
        ['Calidad', 'incluye restricciones', '**Atributos de calidad**: se especifican y validan eficiencia, seguridad y demás.'],
        ['Menos retrabajo', 'sin prueba y error', '**Menos costos**: no se trabaja a prueba y error.'],
      ]),
      flow('Transformación por lenguaje', [
        ['Realidad', 'lo que pasa', 'Arriba está la **realidad** de la organización.'],
        ['Percepción', 'lo que cada uno ve', 'Cada persona la **percibe** a su manera.'],
        ['Lenguaje natural', 'lo que cuenta', 'La expresa en **lenguaje natural**, que se interpreta distinto.'],
        ['Especificación', 'lo escrito: algo se perdió', 'La **especificación** llega con pérdida de información. Por eso se recorren todos los sectores.'],
      ]),
    ],
    points: ['**Acuerdo, validación, estimación, calidad, menos retrabajo.**', 'El lenguaje natural no se interpreta igual por todos: hay pérdida de información.'],
    written: 'Los buenos requisitos permiten acordar el trabajo entre las partes, fijar criterios de validación, estimar recursos con una base objetiva, cumplir atributos de calidad y reducir costos al evitar retrabajo.',
  },
  {
    id: 'm6-tipos', module: 'm6', title: 'Funcionales y no funcionales',
    lead: ['**Funcional: qué hace. No funcional: una restricción sobre cómo lo hace.** Si lo podés decir como "el sistema debe + verbo", con entrada y salida, es funcional.'],
    scenes: [grow('Clasificar', ['El sistema debe…', 'Tipo'], [
      [['registrar una reserva', 'funcional'], 'Registrar una reserva: **funcional**. Tiene entrada, proceso y salida.'],
      [['avisar si la cancha está ocupada', 'funcional'], 'Avisar que está ocupada: también funcional. Es la salida para una entrada inválida.'],
      [['responder en menos de 5 s', 'no funcional'], 'Responder en cinco segundos: **no funcional**, de performance.'],
      [['correr en celulares ARM', 'no funcional'], 'Correr en ARM: no funcional, restricción de plataforma.'],
      [['cifrar las contraseñas', 'no funcional'], 'Cifrar contraseñas: no funcional, de seguridad.'],
    ], [2, 1])],
    points: [
      '**Funcional (behavioral):** entradas, salidas, interacción con el ambiente y comportamiento ante cada estímulo, válido o inválido.',
      '**No funcional:** restricción que limita la construcción: performance, plataforma, lenguaje, eficiencia, seguridad, portabilidad.',
    ],
    written: 'Un requerimiento funcional describe qué hace el sistema: entradas, proceso, salidas y comportamiento ante cada estímulo. Uno no funcional describe una restricción sobre el sistema que limita la solución, como performance, plataforma, lenguaje, seguridad o portabilidad.',
  },
  {
    id: 'm6-lista', module: 'm6', title: 'Armar la lista de requerimientos de un relato',
    lead: [
      'Es **el ejercicio práctico más repetido**, por 10 puntos. En un final corregido, copiar el relato paso a paso sacó **0/10**; la lista separada en funcionales y no funcionales, con "el sistema debe…", sacó **10/10**.',
      'Caso: "La óptica toma pedidos en el mostrador. Se verifica la receta, se calcula el precio con la lista y se manda la orden al taller. Solo se paga con tarjeta. El taller avisa cuando está listo."',
    ],
    scenes: [
      grow('Relato → funcional', ['Dice el relato', 'RF: el sistema debe…'], [
        [['toma pedidos', 'registrar el pedido'], 'Recorré **verbo por verbo**. Toma pedidos: el sistema debe **registrar el pedido** con cliente, lentes y receta.'],
        [['verifica la receta', 'validar la receta'], 'Verifica la receta: el sistema debe **validarla** e informar si no es válida.'],
        [['calcula el precio', 'calcular el importe'], 'Calcula el precio: debe **calcular el importe** con la lista vigente.'],
        [['paga con tarjeta', 'cobrar con tarjeta'], 'Paga con tarjeta: debe **registrar el cobro con tarjeta**.'],
        [['manda la orden', 'enviar la orden al taller'], 'Manda la orden: debe **generarla y enviarla** al taller.'],
        [['avisa cuando está', 'notificar pedido listo'], 'Avisa: debe **permitir marcarlo listo y notificar**.'],
      ]),
      list('Y los no funcionales', [
        ['Restricción', 'único medio de pago: tarjeta', 'Buscá las palabras **solo, siempre, máximo**: son restricciones del enunciado.'],
        ['Seguridad', 'proteger los datos de salud', 'Sumá atributos razonables: **seguridad** de los datos de recetas.'],
        ['Performance', 'precio en menos de 3 s', 'Y **performance** medible. Los que agregás vos, marcalos como supuestos.'],
      ]),
    ],
    points: [
      '**Dos títulos:** Requerimientos funcionales y Requerimientos no funcionales.',
      '**Numerados:** RF1, RF2… RNF1, RNF2…',
      '**Redacción:** "El sistema debe [verbo] [qué] [condición]" o "[rol] debe poder…".',
      '**Uno por acción**, verificable y sin ambigüedad.',
      '**No va:** lo que hace la gente sin el sistema, ni cómo se programa, ni costos ni plazos.',
    ],
    written: 'Requerimientos funcionales:\nRF1. El sistema debe permitir registrar un pedido con cliente, lentes y receta.\nRF2. El sistema debe validar la receta e informar si es inválida.\nRF3. El sistema debe calcular el importe con la lista de precios vigente.\nRF4. El sistema debe registrar el pago con tarjeta.\nRF5. El sistema debe generar y enviar la orden al taller.\nRF6. El taller debe poder marcar el pedido como listo y el sistema notificarlo.\nRequerimientos no funcionales:\nRNF1. El único medio de pago admitido es la tarjeta.\nRNF2. Los datos de las recetas deben estar protegidos contra accesos no autorizados (supuesto).\nRNF3. El importe debe mostrarse en menos de 3 segundos (supuesto).',
    trap: '**No copies el relato.** "El cliente elige el artículo" no es un requerimiento; "el sistema debe permitir seleccionar artículos del catálogo" sí.',
  },
];

const a = asker('m5');
export const M5_QUESTIONS: Question[] = [
  a.mcq('iisw-m5-02', 'm5-actividad', '¿Qué elemento espera a que terminen todos los hilos paralelos?', 'La barra de unión (merge)', ['El rombo', 'El estado inicial', 'La condición de guarda'], 'La unión espera todos los hilos activos.', F),
  a.mcq('iisw-m5-03', 'm5-bpm', 'BPMN es:', 'Una notación gráfica de procesos', ['Un lenguaje de consultas', 'Una fase de UP', 'Una técnica de entrevista'], 'BPM es la gestión; BPMN, la notación.'),
  a.mcq('iisw-m5-04', 'm5-bpmn', 'Pool y lane pertenecen a la categoría:', 'Contenedores', ['Artefactos', 'Conexión', 'Flujo'], 'También llamados swimlanes o andariveles.'),
  a.mcq('iisw-m5-05', 'm5-errores', 'Un gateway tiene una entrada, una salida y ninguna pregunta. El error es:', 'No decide nada: faltan condición y alternativas, o sobra', ['Le falta un artefacto', 'Debería ser un pool', 'Ninguno'], 'Una decisión necesita condición y dos o más salidas.', F),
  a.mcq('iisw-m5-06', 'm5-errores', 'La última actividad de una rama no tiene nada a continuación. Corresponde:', 'Agregar un evento de fin', ['Agregar un evento de inicio', 'Borrar el carril', 'Cambiarla por un gateway'], 'Todo camino termina en un evento de fin.', F),
];

const b = asker('m6');
export const M6_QUESTIONS: Question[] = [
  b.mcq('iisw-m6-03', 'm6-limites', 'El dominio de la aplicación representa:', 'Qué hay que hacer', ['Cómo se construirá', 'El hardware', 'El lenguaje elegido'], 'El cómo es el dominio del software.'),
  b.mcq('iisw-m6-04', 'm6-defectos', '¿Cuál de estos es un defecto de requerimientos?', 'Cambios o crecimiento de los requerimientos', ['Requisitos suficientes', 'Requisitos necesarios', 'Validar con el cliente'], 'Junto con ambigüedad y poca participación, fue correcta en el final.', F),
  b.tf('iisw-m6-05', 'm6-beneficios', 'Pasar del lenguaje natural a la especificación implica cierta pérdida de información.', true, 'Cada transformación puede perder o cambiar significado.'),
  b.mcq('iisw-m6-06', 'm6-tipos', '"Las consultas se responden en menos de 5 segundos" es un requerimiento:', 'No funcional', ['Funcional', 'De dominio', 'De extracción'], 'Es una restricción de performance.'),
  b.mcq('iisw-m6-07', 'm6-lista', '¿Cuál está bien redactado para una lista de requerimientos?', 'El sistema debe registrar el pedido con cliente y artículos', ['El cliente llega y elige', 'Se arma todo y se manda', 'Programarlo con una tabla de pedidos'], 'Sistema, verbo y objeto, verificable y sin diseño.', F),
];

export const M5_MAP: ConceptMap = {
  module: 'm5', root: 'Modelado de procesos de negocio',
  branches: [
    { t: 'Modelo de negocio', d: 'comprender y recomendar qué informatizar', topic: 'm5-modelado' },
    { t: 'Se dibuja con', kids: [
      { t: 'Diagrama de actividad', d: 'paralelismo con barras', topic: 'm5-actividad' },
      { t: 'BPMN', d: 'notación de BPM', topic: 'm5-bpm', kids: [
        { rel: 'tiene', t: 'Cuatro categorías', d: 'flujo, conexión, contenedores, artefactos', topic: 'm5-bpmn' },
        { rel: 'en el final', t: 'Marcar tres errores', topic: 'm5-errores' },
      ] },
    ] },
  ],
  links: ['El **diagrama de secuencia** (Módulo 10) cubre la debilidad del de actividad.', 'El modelo de negocio alimenta los **requerimientos** (Módulo 6).'],
};

export const M6_MAP: ConceptMap = {
  module: 'm6', root: 'Ingeniería de requerimientos',
  branches: [
    { t: 'Qué es', d: 'extracción → análisis → especificación → validación', topic: 'm6-ir' },
    { t: 'Por qué', kids: [
      { t: 'Costo del error', d: 'más tarde, más caro', topic: 'm6-costo' },
      { t: 'Defectos', d: 'seis típicos', topic: 'm6-defectos' },
      { t: 'Beneficios', d: 'acuerdo, validación, estimación', topic: 'm6-beneficios' },
    ] },
    { t: 'Cómo', kids: [
      { t: 'Límites y dominios', d: 'qué entra · qué contra cómo', topic: 'm6-limites' },
      { t: 'Funcional / no funcional', topic: 'm6-tipos', kids: [{ rel: 'se aplica en', t: 'Lista de requerimientos', topic: 'm6-lista' }] },
    ] },
  ],
  links: ['La **SRS** y sus atributos siguen en el Módulo 7.', 'Los **funcionales** se modelan con casos de uso (Módulo 8).'],
};
