/**
 * SyM · Módulo 6 (El proceso administrativo), tema por tema.
 * Fuentes revisadas (privadas): apuntes "El proceso administrativo y la optimización de operaciones" e "Introducción
 * y definiciones", presentación del módulo y finales anteriores. Las pautas del cursograma salen de respuestas de
 * finales, no del apunte: queda dicho en el tema. Redacción y diagramas propios. Empresa ficticia: Yerbatera Ñandú.
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { arr, box, head, line, txt } from './h';
import { asker, cards, flow, grow, list, sc, VIDEO_NOTE } from './kit';

const module = 'm6';
const F = 'final anterior (Drive de estudiantes)';

export const M6_THEORY: TheoryBlock[] = [
  {
    id: 'y6', module, title: 'El sistema de operaciones', videoNote: VIDEO_NOTE,
    lead: ['Toda organización **transforma**: entra algo, se le hace algo, sale algo que vale más. Administrar operaciones es planificar, organizar, dirigir y controlar esa transformación.'],
    scenes: [flow('Ñandú como sistema', [
      ['Insumos', 'hoja verde, gente, máquinas, datos', 'Los **insumos** son todos los recursos: materia prima, equipos, información, personas. Los dan los proveedores.'],
      ['Proceso', 'secar, estacionar, moler, envasar', 'El **proceso** transforma los insumos en algo de mayor valor.'],
      ['Productos', 'paquetes de yerba', 'Los **productos** son los bienes o servicios que reciben los clientes.'],
      ['Información y control', 'mide y ajusta todo', 'El **sistema de información y control** retroalimenta: monitorea todo y permite ajustar.'],
    ])],
    points: [
      '**Operaciones:** actividades de transformación de una organización.',
      '**Organización de producción:** bienes tangibles, en masa, que se almacenan.',
      '**Organización de servicios:** bienes intangibles, con participación del consumidor, que no se almacenan.',
      '**Administración de operaciones:** planificar la producción, organizar recursos, dirigir operaciones y personal, controlar el sistema.',
      'El proceso operativo necesita además conocer la **producción acumulada y la demanda** para estimar.',
    ],
    table: { head: ['', 'Producción', 'Servicios'], rows: [['Resultado', 'tangible', 'intangible'], ['Se almacena', 'sí', 'no'], ['Participa el cliente', 'no hace falta', 'sí'], ['Ejemplo', 'yerba envasada', 'visita guiada a la planta']] },
    written: 'El sistema de operaciones representa a la organización como un proceso de transformación de insumos en productos o servicios de mayor valor, monitoreado por un sistema de información y control que lo retroalimenta.',
  },
  {
    id: 'y6p', module, title: 'Productividad y calidad',
    lead: ['**Productividad** es cuánto saco por lo que pongo. **Calidad** es si lo que saco satisface al cliente. La idea de Deming: mejorar la calidad **baja** los costos y **sube** la productividad.'],
    scenes: [flow('10 personas, mejores máquinas', [
      ['Fórmula', 'salidas / entradas', 'Productividad es **salidas sobre entradas**: lo producido dividido los recursos usados.'],
      ['Antes', '100 cajas / 10 = 10', 'Antes se hacían 100 cajas con 10 personas: 10 cajas por persona.'],
      ['Después', '120 cajas / 10 = 12', 'Con máquinas mejores, 120 con las mismas 10 personas: 12 por persona.'],
      ['Mejora', '(12 − 10)/10 = +20 %', 'La productividad subió **20 %**. También sube produciendo lo mismo con menos recursos.'],
    ])],
    points: [
      '**Productividad = salidas (outputs) / entradas (inputs).** Es una medida de eficiencia.',
      '**Calidad:** relativa; capacidad de satisfacer las expectativas del cliente (latín *qualitas*).',
      '**Deming:** más calidad → menos desperdicio, reproceso y errores → menos costo a largo plazo → más productividad.',
    ],
    example: { title: 'apurarse sale caro', body: ['Ñandú acelera la envasadora y salen paquetes mal cerrados. Parece más productivo, pero suma devoluciones, reenvasado y quejas: **la productividad real cae**.'] },
    written: 'La productividad relaciona lo producido con los recursos utilizados (salidas/entradas). La calidad es la capacidad de satisfacer las expectativas del cliente. Según Deming, mejorar la calidad reduce desperdicios y reprocesos, por lo que baja costos y aumenta la productividad.',
    trap: 'El apunte tiene la fórmula escrita al revés por un error de formato: su propio ejemplo hace **salidas / entradas**.',
  },
  {
    id: 'y6t', module, title: 'Tiempos, cronogramas y cycle time',
    lead: ['Para mejorar primero se mide: **cuánto tarda cada paso** y **cuánto es espera**. La espera es lo primero que se recorta.'],
    scenes: [grow('Preparar un pedido', ['Paso', 'Minutos', 'Tipo'], [
      [['Verificar el pedido', '10', 'trabajo'], 'Se cronometra cada paso con un trabajador calificado, método fijo y ritmo normal.'],
      [['Buscar la zorra', '5', 'tiempo muerto'], 'Buscar la herramienta no agrega valor: es **tiempo muerto**.'],
      [['Armar las cajas', '30', 'trabajo'], 'Armar las cajas sí es trabajo.'],
      [['Esperar el camión', '15', 'tiempo muerto'], 'Otra espera: 15 minutos más.'],
      [['Ciclo completo', '60', '33 % muerto'], 'El **cycle time** es 60 minutos de punta a punta, con 20 muertos: un tercio. Por ahí se optimiza.'],
    ], [2, 1, 1.4])],
    points: [
      '**Estudio de tiempos:** mide lo que tarda un trabajador calificado, con método preestablecido y ritmo normal, para fijar un **tiempo estándar**.',
      '**Sirve para:** planificar, costear y evaluar el desempeño.',
      '**Cronograma (Gantt):** actividades en el tiempo; muestra duraciones, tiempos muertos y cuellos de botella.',
      '**Cycle time:** tiempo total de una tarea, de principio a fin. 3 minutos por café → 20 por hora.',
    ],
    written: 'El estudio de tiempos establece el tiempo estándar de una tarea. El cronograma distribuye las actividades en el tiempo y permite detectar tiempos muertos y cuellos de botella. El cycle time es el tiempo total para completar una tarea, desde que comienza hasta que termina.',
  },
  {
    id: 'y6s', module, title: 'Six Sigma y DMAIC',
    lead: ['Six Sigma usa estadística para **bajar defectos y variabilidad**. Dos cosas de memoria: **3,4 por millón** y las cinco letras de **DMAIC**.'],
    scenes: [flow('Paquetes mal cerrados', [
      ['Definir', 'problema, alcance y objetivo', '**Definir**: el problema, el alcance y la meta.'],
      ['Medir', '800 fallados por millón', '**Medir**: el desempeño actual, con datos.'],
      ['Analizar', 'causa: temperatura del sellador', '**Analizar**: los datos para hallar la causa raíz.'],
      ['Mejorar', 'termostato nuevo', '**Mejorar, improve**: diseñar, probar e implementar la solución.'],
      ['Controlar', 'muestreo por turno', '**Controlar**: que la mejora se mantenga y no se vuelva atrás.'],
    ])],
    points: ['**Meta:** hasta **3,4 defectos por millón de oportunidades**, 99,99966 % (el apunte lo redondea a 99,9996 %).', '**DMAIC:** definir, medir, analizar, mejorar, controlar.'],
    written: 'Six Sigma es una metodología de mejora de procesos que usa herramientas estadísticas para reducir defectos y variabilidad, con una meta de no más de 3,4 defectos por millón de oportunidades. Su ciclo es DMAIC: definir, medir, analizar, mejorar y controlar.',
    trap: 'DMAIC **analiza antes de mejorar**.',
  },
  {
    id: 'y6m', module, title: 'Manuales administrativos',
    lead: ['Los manuales **escriben el saber hacer**. Tres preguntas, tres manuales: ¿quién es quién? ¿cómo circula el trabajo? ¿cómo uso esto?'],
    scenes: [list('Tres manuales', [
      ['Organización', '¿quién es quién? → organigrama', '**De organización**: el diseño funcional. Jerarquías, funciones, autoridad y responsabilidad de cada puesto.'],
      ['Procedimientos', '¿cómo se hace? → cursograma', '**De procedimientos**: los circuitos paso a paso, con formularios, archivos y controles. Por ejemplo compras, caja o facturación.'],
      ['Usuario', '¿cómo lo uso? → instrucciones', '**De usuario**: instrucciones para un sistema o una función. Técnico, del supervisor, del especialista.'],
    ])],
    points: [
      '**Sirven para:** comunicar, controlar, estandarizar y capacitar.',
      '**Organización incluye:** objetivo, alcance, misión y funciones, organigramas, atribuciones, coordinación, supervisión.',
      '**Procedimientos incluye:** contenido, alcance, cursogramas, normas y políticas, instrucciones, controles, formularios, diagramas de flujo de datos, relación con los sistemas.',
    ],
    table: { head: ['Necesito saber…', 'Manual'], rows: [['de quién depende Tesorería', 'organización'], ['cómo se aprueba una compra', 'procedimientos'], ['cómo se carga una factura en el sistema', 'usuario']] },
    written: 'Los manuales administrativos formalizan el funcionamiento de la organización. El de **organización** refleja la estructura formal, con funciones, autoridad y responsabilidad de cada puesto; el de **procedimientos** detalla los circuitos operativos; el de **usuario** da instrucciones para operar un sistema o función.',
  },
  {
    id: 'y6c', module, title: 'Circuitos administrativos y cursogramas',
    lead: [
      'Un **circuito** es el recorrido de un documento o dato por la organización. El **cursograma** es su dibujo: quién hace qué, en qué orden y con qué comprobante.',
      '"¿Qué son los cursogramas?" fue pregunta de desarrollo.',
    ],
    scenes: [sc([
      head('Cursograma horizontal: facturación'),
      ...['Ventas', 'Caja', 'Contaduría'].map((t, i) => txt(105 + i * 195, 62, t, { fs: 18, b: true, c: 'gray' })),
      line([[202, 48], [202, 425]], { c: 'gray', dash: true }), line([[397, 48], [397, 425]], { c: 'gray', dash: true }),
      box(30, 92, 150, 62, '1 Emitir', { c: 'blue', fs: 17, shape: 'circle', id: 'e' }),
      box(30, 192, 150, 70, 'Factura ×2', { c: 'cyan', fs: 16, shape: 'note', id: 'f', s: 1 }),
      box(225, 192, 150, 70, '2 Verificar', { c: 'orange', fs: 17, id: 'v', s: 2 }),
      box(225, 310, 150, 90, '¿pagó?', { c: 'yellow', fs: 17, shape: 'diamond', id: 'd', s: 3 }),
      box(432, 320, 152, 70, '3 Registrar', { c: 'green', fs: 17, shape: 'circle', id: 'r', s: 4 }),
      arr('e', 'f', { s: 1 }), arr('f', 'v', { s: 2 }), arr('v', 'd', { s: 3 }), arr('d', 'r', { s: 4 }), txt(384, 330, 'sí', { fs: 16, b: true, s: 4 }),
    ], [
      'En el **horizontal** cada columna es un sector. Arranca arriba a la izquierda con una operación numerada: Ventas emite.',
      'La operación genera un **documento**. Se indica la cantidad de copias y adónde va cada una.',
      'El documento pasa a Caja, que hace un **control**: lo compara contra un estándar.',
      'Una **decisión** bifurca el flujo con un rombo.',
      'Si pagó, Contaduría registra. El diagrama baja **en cascada** y se ve dónde falta un control o se repite una tarea.',
    ])],
    points: [
      '**Circuito administrativo:** secuencia gráfica de las operaciones, con sus elementos y su ubicación funcional.',
      '**Objetivos:** brindar información, detectar deficiencias, detectar controles débiles, evitar duplicidad de tareas y detectar fallas de relevamiento.',
      '**Usos:** dar orden racional a los procesos, evitar que cada uno haga lo que quiera, servir de base a controles futuros.',
      '**Horizontal:** una columna por sector, sin narrativa. **Vertical:** una sola columna, admite explicaciones al margen (respuesta de final con 10/10).',
    ],
    written: 'Un cursograma es la representación gráfica y secuencial de las operaciones de un circuito administrativo, con los sectores que intervienen y los documentos que circulan. Permite brindar información, detectar deficiencias y controles débiles, evitar la duplicidad de tareas y detectar fallas de relevamiento. Puede ser horizontal (una columna por sector) o vertical (una sola columna).',
    trap: 'Final: objetivos de los circuitos → **brindar información** y **detectar fallas de relevamiento**. "Identificar oportunidades y amenazas" es FODA.',
  },
  {
    id: 'y6g', module, title: 'Símbolos y pautas para diagramar',
    lead: ['"¿Cuáles son las pautas para diagramar cursogramas?" fue **la primera pregunta de un final**. La simbología sale del apunte (norma IRAM 34.501); las siete pautas, de respuestas de ese final.'],
    scenes: [
      sc([
        head('Símbolos del apunte'),
        box(15, 50, 185, 80, 'Operación', { c: 'blue', fs: 17, shape: 'circle' }),
        box(208, 50, 185, 80, 'Control', { c: 'orange', fs: 17, s: 1 }),
        line([[415, 50], [520, 50], [548, 55], [568, 68], [579, 90], [568, 112], [548, 125], [520, 130], [415, 130], [415, 50]], { c: 'pink', sw: 3, s: 2 }),
        txt(492, 90, 'Demora', { fs: 17, b: true, s: 2 }),
        box(15, 160, 185, 100, 'Decisión', { c: 'yellow', fs: 17, shape: 'diamond', s: 3 }),
        box(208, 170, 185, 80, 'Documento', { c: 'cyan', fs: 17, shape: 'note', s: 4 }),
        line([[430, 285], [550, 285], [490, 365], [430, 285]], { c: 'purple', s: 5 }),
        txt(490, 395, 'archivo definitivo', { fs: 16, b: true, c: 'purple', s: 5 }),
        line([[50, 365], [170, 365], [110, 285], [50, 365]], { c: 'green', s: 6 }),
        txt(110, 395, 'archivo transitorio', { fs: 16, b: true, c: 'green', s: 6 }),
      ], [
        '**Óvalo: operación**, una acción o tarea que agrega valor.',
        '**Rectángulo: control**, una verificación contra un estándar.',
        '**Letra D: demora**, una espera o interrupción del flujo.',
        '**Rombo: decisión** o alternativa, donde el flujo se abre según una condición.',
        '**Documento**: formulario, factura o listado. En el apunte es un rectángulo con base curva; si tiene copias se dibuja repetido.',
        '**Triángulo hacia abajo: archivo definitivo**. El documento queda guardado.',
        '**Triángulo hacia arriba: archivo transitorio**. Además existen traslado, conector, destructor y proceso no representado.',
      ]),
      list('Las siete pautas', [
        ['1 · Símbolos', 'definidos de antemano', 'Uno: la **simbología se define antes** y se acuerda con el usuario.'],
        ['2 · Cascada', 'desde arriba a la izquierda', 'Dos: se dibuja **en cascada**, desde la esquina superior izquierda.'],
        ['3 · Conectores', 'para seguir en otra hoja', 'Tres: si sigue en otra página o cursograma, se usan **conectores**.'],
        ['4 · Copias', 'número y destinatario', 'Cuatro: cada comprobante indica **número de copia y destinatario**.'],
        ['5 · Numeración', 'procesos enumerados', 'Cinco: los **procesos van numerados**.'],
        ['6 · Externos', 'afuera no se grafica', 'Seis: los **sectores externos no se grafican** ni se escribe en la parte exterior.'],
        ['7 · Sin relato', 'nada de narrativas', 'Siete: **sin textos narrativos**.'],
      ]),
    ],
    points: [
      '**Símbolos:** operación (óvalo), control (rectángulo), demora (D), decisión (rombo), documento, archivo (triángulo), traslado, conector, destructor.',
      '**Pautas:** símbolos previos, cascada, conectores, copias con destinatario, procesos numerados, sin sectores externos, sin narrativas.',
    ],
    written: 'Para diagramar un cursograma: 1) definir previamente la simbología; 2) dibujar en cascada desde el ángulo superior izquierdo; 3) usar conectores al continuar en otra hoja o cursograma; 4) indicar número de copia y destinatario de cada comprobante; 5) numerar los procesos; 6) no graficar los sectores externos; 7) evitar textos narrativos.',
    trap: 'En esta cátedra el **rectángulo es control**, no "proceso" como en un diagrama de flujo de programación.',
  },
  {
    id: 'y6f', module, title: 'Formularios y layout de oficinas',
    lead: ['La información formal viaja en **formularios**, y la gente se mueve dentro de un **layout**. Los dos se diseñan para que el circuito funcione.'],
    scenes: [
      flow('Optimizar un formulario', [
        ['Analizar', 'los nuevos y los existentes', 'Primero el **análisis** de los formularios nuevos o existentes.'],
        ['Diseñar', 'datos claros y sin errores', 'Después el **diseño**, para capturar datos con claridad.'],
        ['Normar', 'uso y llenado', 'Se fijan **normas de uso y llenado**.'],
        ['Controlar', 'su utilización', 'Se **controla** que se use como corresponde.'],
        ['Reponer', 'circuito de reposición', 'Y se define el **circuito de reposición**.'],
      ]),
      cards('Layout: disposición física', [
        ['Funcionalidad operativa', 'menos traslados, flujo corto', 'El layout busca **funcionalidad operativa**: minimizar traslados innecesarios.'],
        ['Funcionalidad del personal', 'comunicación y buen ambiente', 'Y **funcionalidad del personal**: facilitar la comunicación y un ambiente adecuado. No es solo estética.'],
      ]),
    ],
    points: [
      '**Formulario:** principal vehículo de la información formal, dentro y fuera de la organización.',
      '**Digitales:** seguridad, difusión, concurrencia, almacenamiento, experiencia de usuario, variedad de dispositivos.',
      '**Layout:** disposición física del espacio; funcionalidad operativa y del personal.',
    ],
    written: 'Los formularios son el principal medio de información formal; su optimización comprende análisis, diseño, normas de uso, control y circuito de reposición. El layout es la disposición física de la oficina y busca funcionalidad operativa y del personal.',
  },
];

const { mcq, tf } = asker(module);

export const M6_QUESTIONS: Question[] = [
  mcq('sym-m6-01', 'y6', 'Una organización de servicios se caracteriza porque su producto:', 'Es intangible y no se almacena', ['Es tangible y en masa', 'Se guarda para consumo posterior', 'No necesita al consumidor'], 'Los servicios requieren participación del consumidor y no se guardan.'),
  mcq('sym-m6-02', 'y6p', 'De 100 a 120 unidades con la misma gente. La productividad:', 'Sube 20 %', ['Baja 20 %', 'No cambia', 'Sube 120 %'], 'Salidas sobre entradas: (12 − 10)/10.'),
  tf('sym-m6-03', 'y6p', 'Según Deming, mejorar la calidad sube necesariamente los costos a largo plazo.', false, 'Los reduce, porque baja desperdicios, reprocesos y errores.'),
  mcq('sym-m6-04', 'y6t', 'El tiempo total desde que empieza hasta que termina una tarea es el:', 'Cycle time', ['Tiempo muerto', 'Tiempo estándar de espera', 'Layout'], 'Cycle time es el tiempo de ciclo.'),
  mcq('sym-m6-05', 'y6s', 'En DMAIC, después de medir se:', 'Analiza la causa raíz', ['Mejora', 'Controla', 'Define el problema'], 'Definir, medir, analizar, mejorar, controlar.'),
  mcq('sym-m6-06', 'y6m', 'Para saber cómo se aprueba una compra, paso a paso, consultás el manual de:', 'Procedimientos', ['Organización', 'Usuario', 'Puestos'], 'Detalla los circuitos operativos.'),
  mcq('sym-m6-07', 'y6c', 'Son objetivos directos de los circuitos administrativos:', 'Brindar información y detectar fallas de relevamiento', ['Identificar oportunidades y amenazas', 'Motivar y delegar', 'Fijar la misión y la visión'], 'Además detectan controles débiles y evitan duplicidad.', F),
  mcq('sym-m6-08', 'y6c', 'En un cursograma horizontal, cada columna representa:', 'Un sector', ['Un día', 'Una copia', 'Un manual'], 'En el vertical, en cambio, hay una sola columna.', F),
  mcq('sym-m6-09', 'y6g', 'En la simbología del apunte, el rectángulo representa:', 'Un control', ['Una decisión', 'Una demora', 'Un archivo'], 'Operación es óvalo, decisión rombo, demora una D.'),
  mcq('sym-m6-10', 'y6g', '¿Cuál es una pauta para diagramar cursogramas?', 'Indicar copia y destinatario de cada comprobante', ['Explicar con narrativas', 'Graficar los sectores externos', 'Inventar símbolos a medida que hacen falta'], 'La simbología se define antes, sin narrativa ni externos.', F),
  mcq('sym-m6-11', 'y6f', 'Reubicar escritorios para reducir traslados y mejorar la comunicación es trabajar sobre:', 'El layout', ['El organigrama', 'El cycle time de un formulario', 'El manual de usuario'], 'Layout es la disposición física del espacio.'),
];

export const M6_MAP: ConceptMap = {
  module, root: 'El proceso administrativo',
  branches: [
    { t: 'Operaciones', d: 'insumos → transformación → productos', topic: 'y6' },
    { t: 'Optimizar', kids: [
      { t: 'Productividad y calidad', d: 'salidas/entradas · expectativas del cliente', topic: 'y6p' },
      { t: 'Tiempos', d: 'estándar, Gantt, cycle time', topic: 'y6t' },
      { t: 'Six Sigma', d: '3,4 por millón · DMAIC', topic: 'y6s' },
    ] },
    { t: 'Documentar', kids: [
      { t: 'Manuales', d: 'organización, procedimientos, usuario', topic: 'y6m' },
      { t: 'Cursogramas', d: 'el circuito dibujado', topic: 'y6c', kids: [{ rel: 'se dibujan con', t: 'Símbolos y siete pautas', topic: 'y6g' }] },
      { t: 'Formularios y layout', d: 'información y espacio', topic: 'y6f' },
    ] },
  ],
  links: ['El manual de organización usa el **organigrama** (Módulo 1) y las **descripciones de puestos** (Módulo 2).', 'Los manuales **estandarizan procesos**, un mecanismo de Mintzberg (Módulo 3).'],
};
