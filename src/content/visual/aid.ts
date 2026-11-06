/** AID · 2º parcial (Data Mining) · recorridos visuales propios. */
import type { VisScene } from '../../vis/types';
import { arr, bars, bits, box, head, ico, line, plot, scene, table, tree, txt } from './h';

const A: [number, number][] = [[1.5, 2.5], [2.2, 3.4], [2.8, 2.2], [1.8, 1.6], [3.1, 3.0], [2.4, 2.8]];
const B: [number, number][] = [[6.6, 7.2], [7.4, 6.4], [7.9, 7.6], [6.9, 8.1], [8.3, 6.9], [7.2, 7.0]];
const Cc: [number, number][] = [[7.6, 2.2], [8.4, 1.5], [8.9, 2.8], [7.9, 3.1], [8.6, 2.0]];
const dots = (pts: [number, number][], c: string) => pts.map(([x, y]) => ({ x, y, c }));

export const SCENES: Record<string, VisScene[]> = {
  /* ======================= Módulo 8 ======================= */
  'dm-def': [
    scene([
      head('Data Mining: de los datos a los patrones'),
      ico(110, 200, 'db', { t: 'datos\n(OLTP, DW)', c: 'blue', size: 90, id: 'd' }),
      box(270, 160, 260, 80, 'exploración y análisis automático o semiautomático', { c: 'purple', fs: 18, s: 1, id: 'p' }),
      arr('d', 'p', { c: 'purple', s: 1 }),
      box(590, 120, 190, 70, 'SI edad < 30 Y ... ENTONCES responde', { c: 'green', fs: 15, s: 2, id: 'r1' }),
      box(590, 210, 190, 70, 'grupos de clientes parecidos', { c: 'orange', fs: 16, s: 2, id: 'r2' }),
      arr('p', 'r1', { c: 'green', s: 2 }), arr('p', 'r2', { c: 'orange', s: 2 }),
      txt(685, 310, 'patrones y reglas', { b: true, c: 'green', fs: 20, s: 2 }),
      box(30, 350, 175, 80, 'Biología', { c: 'pink', sub: 'redes neuronales, genéticos', fs: 18, s: 3 }),
      box(220, 350, 175, 80, 'IA', { c: 'cyan', sub: 'razonamiento basado en memoria', fs: 18, s: 3 }),
      box(410, 350, 175, 80, 'Grafos', { c: 'yellow', sub: 'análisis de links', fs: 18, s: 3 }),
      box(600, 350, 175, 80, 'Estadística', { c: 'blue', sub: 'muestras, regresión', fs: 18, s: 3 }),
    ], [
      'La cátedra define al **Data Mining** así: la **exploración y el análisis**, por medios **automáticos o semiautomáticos**, de grandes volúmenes de datos…',
      '…para **descubrir patrones y reglas**. El insumo son los datos de los sistemas transaccionales y del data warehouse.',
      'El resultado son **reglas**, como "si tiene menos de 30 y tal ingreso, responde a la oferta", o **grupos** de clientes parecidos. Lo que importa es que el resultado sea **accionable**.',
      'No es una disciplina aislada: toma de la **biología** las redes neuronales y los algoritmos genéticos, de la **IA** el razonamiento basado en memoria, de la **teoría de grafos** el análisis de links y de la **estadística** las muestras, la regresión y la correlación.',
    ]),
    scene([
      head('¿Por qué ahora? ¿Para qué?'),
      box(30, 60, 175, 120, 'Muchos datos', { c: 'blue', sub: 'grandes OLTP y data warehouses', fs: 20 }),
      box(220, 60, 175, 120, 'Más cómputo', { c: 'purple', sub: 'procesar millones de registros', fs: 20, s: 1 }),
      box(410, 60, 175, 120, 'Competencia', { c: 'orange', sub: 'todo negocio es de servicio', fs: 20, s: 2 }),
      box(600, 60, 175, 120, 'Productos', { c: 'green', sub: 'software que ya trae los algoritmos', fs: 20, s: 3 }),
      ico(140, 290, 'user', { c: 'red', t: 'Inteligencia', s: 4 }), txt(140, 380, 'conducta criminal', { fs: 16, c: 'gray', s: 4 }),
      ico(400, 290, 'brain', { c: 'pink', t: 'Medicina', s: 4 }), txt(400, 380, 'riesgo de enfermedad', { fs: 16, c: 'gray', s: 4 }),
      ico(660, 290, 'money', { c: 'green', t: 'Comercial', s: 4 }), txt(660, 380, 'retener, ofrecer, dar crédito', { fs: 16, c: 'gray', s: 4 }),
    ], [
      '¿Por qué el data mining aparece ahora? Primero, porque hay **demasiados datos** para analizarlos a mano: bases transaccionales enormes y data warehouses.',
      'Segundo, porque hay **poder de cómputo** para recorrerlos.',
      'Tercero, por la **presión competitiva**: todo negocio se volvió de servicio y conocer al cliente es la ventaja.',
      'Y cuarto, porque hay **productos comerciales** que ya traen los algoritmos.',
      'Se aplica en **inteligencia**, para detectar patrones de conducta criminal; en **medicina**, para agrupar patologías y estimar riesgos; y en lo **comercial**: retener a los buenos clientes, perder a los que cuestan más de lo que dejan, y saber qué ofrecerle a cada uno.',
    ]),
  ],

  'dm-tareas': [
    scene([
      head('Las 6 tareas del Data Mining'),
      box(30, 55, 240, 120, 'Clasificación', { c: 'blue', sub: 'a una clase PREDEFINIDA: ¿buen o mal pagador?', fs: 21 }),
      box(280, 55, 240, 120, 'Estimación', { c: 'green', sub: 'valor CONTINUO que se confirma HOY: ingreso estimado', fs: 21, s: 1 }),
      box(530, 55, 240, 120, 'Predicción', { c: 'orange', sub: 'se confirma en el FUTURO: ¿se dará de baja?', fs: 21, s: 2 }),
      box(30, 195, 240, 120, 'Afinidad / asociación', { c: 'pink', sub: 'qué ocurre junto con qué: lo que se compra junto', fs: 20, s: 3 }),
      box(280, 195, 240, 120, 'Clustering', { c: 'purple', sub: 'grupos homogéneos SIN clases previas', fs: 21, s: 4 }),
      box(530, 195, 240, 120, 'Descripción', { c: 'cyan', sub: 'explica un suceso o qué reglas lo originan', fs: 21, s: 5 }),
      line([[60, 380], [740, 380]], { c: 'gray', sw: 3, s: 6, arrow: true }),
      txt(250, 350, 'HOY', { b: true, c: 'green', fs: 20, s: 6 }), box(240, 372, 20, 16, '', { shape: 'circle', c: 'green', solid: true, s: 6 }),
      txt(600, 350, 'FUTURO', { b: true, c: 'orange', fs: 20, s: 6 }), box(590, 372, 20, 16, '', { shape: 'circle', c: 'orange', solid: true, s: 6 }),
      txt(400, 420, 'Estimación vs predicción: ¿cuándo podés verificar el resultado?', { b: true, c: 'yellow', fs: 19, s: 6 }),
    ], [
      'El data mining resuelve seis tipos de tareas. **Clasificación**: asignar cada caso a una **clase ya definida**, por ejemplo buen o mal pagador.',
      '**Estimación**: calcular un valor **continuo**, como el ingreso de un cliente, que se puede verificar **en el presente**.',
      '**Predicción**: es una clasificación o estimación cuyo resultado **solo se confirma en el futuro**, como si un cliente se va a dar de baja el mes que viene.',
      '**Grupos de afinidad o asociación**: descubrir qué hechos ocurren **juntos**, como los productos que se compran en el mismo ticket.',
      '**Clustering**: armar **grupos homogéneos** cuando **no hay clases previas**.',
      '**Descripción**: explicar un suceso o las reglas que originan un comportamiento.',
      'La trampa clásica es estimación contra predicción: la diferencia **no es el tipo de dato**, sino **cuándo** podés comprobar el resultado. Hoy, estimación. En el futuro, predicción.',
    ]),
    scene([
      head('¿Qué herramienta sirve para qué tarea?'),
      table(20, 50, 760, ['Herramienta', 'Clasif.', 'Estim.', 'Predic.', 'Afinid.', 'Cluster', 'Descrip.'], [
        ['Canasta de mercado', '', '', '✔', '✔', '✔', '✔'],
        ['MBR', '✔', '', '✔', '✔', '✔', ''],
        ['Algoritmos genéticos', '✔', '', '✔', '', '', ''],
        ['Cluster detection', '', '', '', '', '✔', ''],
        ['Árboles de decisión', '✔', '', '✔', '', '✔', '✔'],
        ['Redes neuronales', '✔', '✔', '✔', '', '✔', ''],
      ], { rh: 46, fs: 18, cw: [2.4, 1, 1, 1, 1, 1, 1], hi: [{ r: 5, s: 1, c: 'yellow' }, { r: 3, s: 2, c: 'purple' }] }),
      txt(400, 395, 'Solo las REDES NEURONALES hacen estimación', { b: true, c: 'yellow', fs: 21, s: 1 }),
      txt(400, 430, 'Cluster detection: solo clustering', { b: true, c: 'purple', fs: 20, s: 2 }),
    ], [
      'Esta tabla de la cátedra cruza las herramientas con las tareas. Conviene mirarla por columnas.',
      'La columna de **estimación** tiene una sola marca: **solo las redes neuronales estiman** valores continuos. Es una pregunta típica de verdadero o falso.',
      'Y la detección de clusters hace **solo clustering**. Las cuatro herramientas que ven en la cursada son **cluster, MBR, canasta de mercado y árbol de decisión**.',
    ]),
  ],

  'dm-circulo': [
    scene([
      head('El círculo virtuoso'),
      box(20, 60, 170, 80, 'Técnicas', { c: 'blue', fs: 22 }), txt(205, 100, '+', { fs: 36, b: true }),
      box(220, 60, 170, 80, 'Poder de cómputo', { c: 'purple', fs: 20, s: 1 }), txt(405, 100, '+', { fs: 36, b: true, s: 1 }),
      box(420, 60, 170, 80, 'Datos justos', { c: 'green', fs: 22, s: 2 }), txt(605, 100, '+', { fs: 36, b: true, s: 2 }),
      box(620, 60, 160, 80, 'Área justa', { c: 'orange', fs: 22, s: 3 }),
      box(200, 190, 400, 70, 'Minar', { c: 'cyan', fs: 24, s: 4, id: 'm' }),
      box(520, 330, 250, 70, 'Tomar acción', { c: 'green', fs: 22, s: 5, id: 'a' }),
      box(30, 330, 250, 70, 'Medir', { c: 'yellow', fs: 22, s: 6, id: 'me' }),
      arr('m', 'a', { c: 'green', s: 5, bend: -30 }), arr('a', 'me', { c: 'yellow', s: 6 }), arr('me', 'm', { c: 'cyan', s: 6, bend: -30 }),
      txt(400, 440, 'Planear la medición desde el inicio: demorarla es GRAVE', { b: true, c: 'red', fs: 19, s: 6 }),
    ], [
      'Los algoritmos solos no alcanzan. El **círculo virtuoso** del data mining combina: las **técnicas**…',
      '…el **poder computacional**…',
      '…los **datos justos**, los correctos…',
      '…y el **área justa**: procesos que necesitan análisis, como lanzar un producto o entender por qué se van los clientes, donde los usuarios cooperan.',
      'Con eso se **mina**. Pero el data mining es **un paso** de un proceso más grande: lo que se busca es un resultado **accionable**.',
      'Después hay que **tomar acción**, incorporando el conocimiento a los procesos del negocio…',
      '…y **medir** el resultado, que alimenta la próxima vuelta. La medición se planea **desde el principio**: demorarla es grave.',
    ]),
    scene([
      head('Lo que corta el círculo'),
      ...['Datos malos o incompletos', 'Datos que se borran', 'OLTP de origen con poca funcionalidad', 'Resistencia de sectores al cambio', 'Falta de oportunidad: llega tarde'].map((t, i) => box(60, 55 + i * 66, 470, 54, t, { c: 'red', fs: 19, s: i, align: 'l' })),
      ico(660, 200, 'gear', { c: 'red', size: 110, s: 0, t: 'el círculo se corta' }),
    ], [
      '¿Qué rompe el círculo? Primero, **datos malos o incompletos**.',
      'Datos que **se borran** y entonces no hay historia.',
      'Sistemas transaccionales de origen con **poca funcionalidad**, que no registran lo necesario.',
      'La **resistencia** de algunos sectores al cambio.',
      'Y la **falta de oportunidad**: si el resultado llega tarde, ya no es accionable.',
    ]),
  ],

  'dm-modos': [
    scene([
      head('Dos modos de aplicación'),
      txt(200, 70, 'TESTEO DE HIPÓTESIS', { b: true, c: 'orange', fs: 22 }), txt(200, 98, 'top-down', { c: 'orange', fs: 18 }),
      box(70, 120, 260, 56, 'Hipótesis (idea)', { c: 'orange', fs: 20, id: 'h1' }),
      box(70, 225, 260, 56, 'Datos necesarios → modelo', { c: 'blue', fs: 18, id: 'h2', s: 1 }),
      box(70, 330, 260, 56, 'Confirmar o rechazar', { c: 'green', fs: 20, id: 'h3', s: 1 }),
      arr('h1', 'h2', { c: 'orange', s: 1 }), arr('h2', 'h3', { c: 'orange', s: 1 }),
      txt(600, 70, 'BÚSQUEDA DE CONOCIMIENTO', { b: true, c: 'cyan', fs: 22, s: 2 }), txt(600, 98, 'bottom-up', { c: 'cyan', fs: 18, s: 2 }),
      box(470, 330, 260, 56, 'Datos', { c: 'blue', fs: 20, id: 'b1', s: 2 }),
      box(470, 225, 260, 56, 'Patrones', { c: 'purple', fs: 20, id: 'b2', s: 2 }),
      box(470, 120, 260, 56, 'Nuevas hipótesis', { c: 'cyan', fs: 20, id: 'b3', s: 2 }),
      arr('b1', 'b2', { c: 'cyan', s: 2 }), arr('b2', 'b3', { c: 'cyan', s: 2 }),
      txt(400, 430, 'Etapas: ideas → datos → ubicarlos → prepararlos → modelo → aplicar → evaluar', { fs: 17, c: 'gray', b: true, s: 1, out: 2 }),
    ], [
      'Hay dos formas de aplicar data mining. El **testeo de hipótesis** es **top-down**: arrancás con una **idea**, por ejemplo "los clientes que se van tienen tal perfil"…',
      '…buscás y preparás los datos necesarios, armás el modelo y lo usás para **confirmar o rechazar** la hipótesis.',
      'La **búsqueda de conocimiento** es al revés, **bottom-up**: partís de los **datos**, sin suponer nada, encontrás **patrones** y de ahí salen **nuevas hipótesis**.',
    ]),
    scene([
      head('Búsqueda de conocimiento: directa o indirecta'),
      box(30, 60, 360, 100, 'DIRECTA', { c: 'green', fs: 24, sub: 'hay un campo OBJETIVO para explicar o predecir (ej.: ¿se va?)' }),
      box(410, 60, 360, 100, 'INDIRECTA', { c: 'purple', fs: 24, sub: 'no hay objetivo: ¿qué se vende junto? ¿qué segmentos hay?', s: 2 }),
      bits(30, 210, 360, [{ t: 'Entrenamiento', n: 2, c: 'blue' }, { t: 'Testeo', c: 'orange' }, { t: 'Evaluación', c: 'pink' }], { h: 56, fs: 16, s: 1, title: 'datos con el objetivo YA CONOCIDO' }),
      txt(210, 300, 'aprende · se ajusta · se mide el error', { fs: 16, c: 'gray', b: true, s: 1 }),
      box(410, 200, 360, 100, 'Termina generando hipótesis y oportunidades para una búsqueda directa', { c: 'purple', fs: 18, s: 3, id: 'ind' }),
      arr([590, 300], [210, 330], { c: 'purple', s: 3, bend: -40 }),
      box(160, 370, 480, 60, 'Conviene usar el DW: datos limpios, integrados e históricos', { c: 'cyan', fs: 18, s: 4 }),
    ], [
      'La búsqueda de conocimiento puede ser **directa**: hay un **campo objetivo** que querés explicar o predecir, como la permanencia de un cliente o el riesgo de un crédito.',
      'Para eso es **imprescindible** tener datos donde el objetivo **ya se conoce**, y se dividen en tres grupos: **entrenamiento**, donde el modelo aprende; **testeo**, donde se ajusta para generalizar; y **evaluación**, donde se mide el porcentaje de error.',
      'O puede ser **indirecta**: **no hay objetivo**. Preguntas como qué productos se venden juntos o cómo segmentar a los clientes.',
      'La indirecta suele terminar **generando hipótesis** y **oportunidades para una búsqueda directa**.',
      'Como fuente conviene el **data warehouse**: datos limpios, integrados, históricos y verificados. Y se agregan **campos derivados**, como promedios o índices, que hacen visibles relaciones que el analista ya conoce.',
    ]),
  ],

  'dm-medir': [
    scene([
      head('Descriptivo vs predictivo'),
      box(30, 60, 360, 90, 'DESCRIPTIVO', { c: 'cyan', fs: 24, sub: 'conocer y explicar' }),
      box(410, 60, 360, 90, 'PREDICTIVO', { c: 'orange', fs: 24, sub: 'clasificar o predecir', s: 2 }),
      box(30, 170, 170, 90, '70 % ✔', { c: 'green', fs: 30, sub: 'con 5 reglas', s: 1 }),
      box(220, 170, 170, 90, '75 %', { c: 'red', fs: 30, sub: 'con 48 reglas', s: 1 }),
      txt(210, 290, 'menos precisión, más simple · se mide con MDL', { fs: 17, b: true, c: 'cyan', s: 1 }),
      box(410, 170, 360, 90, 'requiere MÁS precisión', { c: 'orange', fs: 21, sub: '% de error (clasificación) o predicho − real (estimación)', s: 2 }),
      bars(80, 320, 300, 90, [{ t: 'al azar', v: 10, c: 'gray' }, { t: 'con modelo', v: 30, c: 'green' }], { s: 3, unit: ' %' }),
      box(430, 330, 340, 90, 'LIFT = 30 / 10 = 3 → compara modelos y se traduce en ROI', { c: 'green', fs: 18, s: 3 }),
    ], [
      'Cómo medir un modelo depende de para qué es. Un modelo **descriptivo** busca **conocer y explicar**.',
      'Por eso se prefiere **menos precisión con más simpleza**: mejor 70 % de acierto con 5 reglas que 75 % con 48 que nadie entiende. Se mide con **MDL**, la mínima longitud de la descripción.',
      'Un modelo **predictivo** necesita **más precisión**. Se mide sobre una muestra: el **porcentaje de error** si clasifica, o la diferencia entre lo predicho y lo real si estima.',
      'Para **comparar modelos de distinto tipo** se usa el **lift**: si al azar responde el 10 % y con el modelo responde el 30 %, el lift es 3. Después hay que traducirlo en **retorno de inversión**.',
    ]),
    scene([
      head('El riesgo de sobreajustar (sobreestimar los datos)'),
      plot(60, 50, 680, 300, [0, 10], [0, 8], {
        ticks: false, xl: 'x', yl: 'y',
        dots: [[0.5, 1.6], [1.4, 2.6], [2.2, 2.3], [3.1, 3.6], [4.0, 3.4], [4.8, 4.6], [5.7, 4.3], [6.5, 5.5], [7.4, 5.2], [8.3, 6.4], [9.2, 6.3]].map(([x, y]) => ({ x, y, c: 'white' as const })),
        fns: [
          { f: '1.2 + 0.56*x', c: 'green', s: 1, t: 'modelo simple: generaliza' },
          { f: '1.2 + 0.56*x + 0.75*sin(3.3*x)', c: 'red', s: 2, t: 'pegado al training' },
        ],
      }),
      box(40, 375, 350, 60, 'Sobreestimar: memoriza el entrenamiento', { c: 'red', fs: 17, s: 2 }),
      box(410, 375, 350, 60, 'Subestimar: se sacaron campos predictivos', { c: 'orange', fs: 17, s: 3 }),
    ], [
      'Un riesgo clásico: con los datos de entrenamiento, los puntos blancos, queremos un modelo que **generalice**.',
      'Un modelo simple, la línea verde, no pasa por todos los puntos pero sigue la tendencia y va a andar bien con datos nuevos.',
      'Un modelo que **sobreestima** los datos se pega al entrenamiento, la línea roja: acierta todo ahí y falla con casos nuevos. Es el **sobreajuste**.',
      'El riesgo opuesto es **subestimar**: eliminar campos que sí eran predictivos. Y un tercer riesgo es la **poca explicabilidad**, típica de los clusters.',
    ]),
  ],

  'dm-estad': [
    scene([
      head('Medidas sobre 6 valores: 2, 3, 3, 5, 7, 10'),
      bits(100, 70, 600, ['2', '3', '3', '5', '7', '10'].map((t) => ({ t, c: 'blue' as const })), { h: 56, fs: 24, mono: true }),
      box(30, 160, 230, 64, 'Rango = 10 − 2 = 8', { c: 'orange', fs: 19, s: 1 }),
      box(285, 160, 230, 64, 'Media = 30 / 6 = 5', { c: 'green', fs: 19, s: 2 }),
      box(540, 160, 230, 64, 'Mediana = (3+5)/2 = 4', { c: 'cyan', fs: 19, s: 3 }),
      box(30, 245, 230, 64, 'Moda = 3', { c: 'pink', fs: 19, s: 4 }),
      bits(285, 265, 485, ['−3', '−2', '−2', '0', '+2', '+5'].map((t) => ({ t, c: 'purple' as const })), { h: 50, fs: 19, mono: true, s: 5, title: 'desviaciones (valor − media)' }),
      box(30, 345, 360, 80, 'Varianza = (9+4+4+0+4+25) / 6 ≈ 7,67', { c: 'purple', fs: 18, s: 6 }),
      box(410, 345, 360, 80, 'Desvío estándar = √7,67 ≈ 2,77', { c: 'yellow', fs: 19, s: 6 }),
    ], [
      'Repasemos las medidas con seis valores: 2, 3, 3, 5, 7 y 10.',
      '**Rango**: el mayor menos el menor, 10 menos 2, **8**.',
      '**Media**: la suma dividida la cantidad, 30 sobre 6, **5**.',
      '**Mediana**: el valor central. Como son seis, se promedian los dos del medio, 3 y 5: **4**. La mediana se ve **menos afectada** por valores extremos que la media.',
      '**Moda**: el valor más repetido, **3**.',
      'La **desviación** de cada valor es su distancia a la media: menos 3, menos 2, menos 2, 0, más 2 y más 5.',
      'La **varianza** es el promedio de esas desviaciones **al cuadrado**: 46 sobre 6, cerca de 7,67. Y el **desvío estándar** es su raíz: unos 2,77.',
    ]),
    scene([
      head('Población, muestra y muestra sesgada'),
      box(40, 60, 330, 330, '', { shape: 'circle', c: 'blue' }),
      ...Array.from({ length: 36 }, (_, i) => box(85 + (i % 6) * 42 + ((i * 7) % 11), 105 + Math.floor(i / 6) * 42 + ((i * 5) % 9), 14, 14, '', { shape: 'circle', c: 'gray', solid: true })),
      ...[0, 8, 15, 21, 28, 34].map((i) => box(82 + (i % 6) * 42 + ((i * 7) % 11), 102 + Math.floor(i / 6) * 42 + ((i * 5) % 9), 20, 20, '', { shape: 'circle', c: 'green', solid: true, s: 1 })),
      txt(205, 420, 'POBLACIÓN: todo el universo', { b: true, fs: 19, c: 'blue' }),
      box(430, 80, 340, 100, 'Muestra aleatoria: representativa', { c: 'green', fs: 20, s: 1 }),
      box(430, 210, 340, 100, 'Muestra SESGADA: elegida con un método NO aleatorio', { c: 'red', fs: 19, s: 2 }),
      ...[0, 1, 2, 6, 7].map((i) => box(82 + (i % 6) * 42 + ((i * 7) % 11), 102 + Math.floor(i / 6) * 42 + ((i * 5) % 9), 20, 20, '', { shape: 'circle', c: 'red', solid: true, s: 2 })),
      box(430, 340, 340, 80, 'Chi²: variables cualitativas; mayor χ² → menos verosímil la independencia', { c: 'yellow', fs: 16, s: 3 }),
    ], [
      'La **población** es todo el universo que querés estudiar.',
      'Una **muestra** es una porción **representativa**: si la elegís al azar, cubre todo el universo.',
      'Una **muestra sesgada** se elige con un método **no aleatorio**, por ejemplo solo los primeros de la lista, y entonces representa mal a la población.',
      'Y para variables **cualitativas** está el **Chi cuadrado**, una prueba no paramétrica: compara lo observado con lo esperado. **Cuanto mayor es χ², menos verosímil** es la hipótesis de independencia. Lo vemos con un ejercicio.',
    ]),
  ],

  'dm-casos': [
    scene([
      head('Caso: fraude con tarjetas de crédito'),
      plot(60, 50, 460, 330, [0, 10], [0, 10], {
        ticks: false, xl: 'frecuencia de uso', yl: 'monto',
        dots: [...dots(A, 'blue'), ...[[1.2, 8.8], [9.0, 9.2], [8.6, 4.8]].map(([x, y]) => ({ x, y, c: 'red' as const, s: 2 }))],
      }),
      box(110, 230, 180, 160, '', { shape: 'circle', c: 'blue', dash: true, s: 1 }),
      txt(300, 405, 'la "huella" del titular', { b: true, c: 'blue', fs: 18, s: 1 }),
      box(540, 70, 240, 110, 'Uso fraudulento: distinto en CUÁNTO y en CÓMO', { c: 'red', fs: 18, s: 2 }),
      box(540, 200, 240, 90, 'Técnica: clustering borroso', { c: 'purple', fs: 19, s: 3 }),
      box(540, 310, 240, 110, 'Supervisar en tiempo real · comercios sospechosos', { c: 'green', fs: 17, s: 4 }),
    ], [
      'Un caso de la cátedra: el **fraude con tarjetas**. Cada punto azul es una compra del titular, según su frecuencia y su monto.',
      'Las compras del titular forman una **huella**: frecuencia, comercios habituales, respeto del límite.',
      'La hipótesis: quien usa la tarjeta sin autorización lo hace de forma **cuantitativa y cualitativamente distinta**. Esos puntos rojos quedan **fuera de la huella**.',
      'Se usó **clustering borroso** para caracterizar los tipos de fraude y separar el uso normal del fraudulento.',
      'Recomendaciones: supervisar **en tiempo real**, analizar comercios sospechosos y consolidar los datos de fraude. El otro caso, préstamos, es una **clasificación** con búsqueda directa: usar el comportamiento pasado para aprobar o no.',
    ]),
  ],

  /* ======================= Módulo 9 ======================= */
  arbol: [
    scene([
      head('Árbol de decisión: cada camino es una regla'),
      tree(20, 55, 760, 280, {
        t: '¿Ingreso > 50 mil?', c: 'blue', kids: [
          { t: '¿Edad < 30?', c: 'blue', e: 'sí', s: 1, kids: [
            { t: 'OTORGAR · 90 %', c: 'green', e: 'sí', s: 2 },
            { t: 'OTORGAR · 75 %', c: 'green', e: 'no', s: 2 },
          ] },
          { t: '¿Tiene deuda?', c: 'blue', e: 'no', s: 1, kids: [
            { t: 'RECHAZAR · 85 %', c: 'red', e: 'sí', s: 2 },
            { t: 'REVISAR · 60 %', c: 'orange', e: 'no', s: 2 },
          ] },
        ],
      }, { fs: 17 }),
      box(60, 360, 680, 70, 'REGLA: SI ingreso > 50 mil Y edad < 30 ENTONCES otorgar (90 % de aciertos)', { c: 'yellow', fs: 18, s: 3 }),
    ], [
      'Un **árbol de decisión** clasifica haciendo preguntas. Se construye con un **set de entrenamiento preclasificado**: casos donde ya sabemos el resultado. La primera pregunta, la raíz, es la que mejor separa los casos.',
      'Cada respuesta abre una rama con otra pregunta. Al crecer, el algoritmo elige el corte que **maximiza la ganancia de diversidad**: que los grupos hijos queden lo más puros posible.',
      'Las **hojas** dan la clase y su porcentaje de acierto. Todos los registros que caen en una hoja reciben el mismo valor: por eso los árboles **estiman con poca precisión**.',
      'Cada camino de la raíz a una hoja es **una regla**. Por eso el árbol tiene **expresividad alta**: su resultado se entiende. Modalidad: **directa**.',
    ]),
    scene([
      head('CART, CHAID y C4.5'),
      box(20, 55, 245, 95, 'CART', { c: 'blue', fs: 24, sub: 'divide en DOS · menos preparación' }),
      tree(30, 170, 225, 140, { t: '·', c: 'blue', kids: [{ t: '·', c: 'blue' }, { t: '·', c: 'blue' }] }, { fs: 16 }),
      box(278, 55, 245, 95, 'CHAID', { c: 'orange', fs: 24, sub: 'usa Chi² · más ramas · más preparación', s: 1 }),
      tree(288, 170, 225, 140, { t: '·', c: 'orange', s: 1, kids: [{ t: '·', c: 'orange', s: 1 }, { t: '·', c: 'orange', s: 1 }, { t: '·', c: 'orange', s: 1 }] }, { fs: 16 }),
      box(536, 55, 245, 95, 'C4.5', { c: 'green', fs: 24, sub: 'n ramas · poda pesimista', s: 2 }),
      tree(546, 170, 225, 140, { t: '·', c: 'green', s: 2, kids: [{ t: '·', c: 'green', s: 2 }, { t: '·', c: 'green', s: 2 }, { t: '·', c: 'green', s: 2 }, { t: '·', c: 'green', s: 2 }] }, { fs: 16 }),
      box(40, 330, 340, 100, 'Pruning: se podan ramas con bajo poder predictivo', { c: 'purple', fs: 18, s: 3 }),
      box(420, 330, 340, 100, 'Débil para valores continuos, series de tiempo y pocos datos', { c: 'red', fs: 18, s: 4 }),
    ], [
      'Los algoritmos más nombrados: **CART**, árbol de clasificación y regresión, divide **en dos** en cada nodo y requiere **menos preparación** de los datos.',
      '**CHAID** usa **Chi cuadrado** para detectar interacciones, genera **múltiples ramas** y necesita **más preparación**.',
      '**C4.5** permite **n ramas por nodo** y hace **poda pesimista**: puede reemplazar un subárbol entero por una de sus ramas. También se menciona ID3, su antecesor.',
      'El **pruning** o poda elimina las ramas con **bajo poder predictivo** que no bajan el error.',
      'Fortalezas: reglas entendibles, pocos recursos, manejan datos continuos y categóricos. Debilidades: **malos para estimar valores continuos**, problemas con **series de tiempo** y errores grandes si hay pocos datos de entrenamiento.',
    ]),
  ],

  cluster: [
    scene([
      head('K-means paso a paso (k = 3)'),
      plot(60, 45, 460, 360, [0, 10], [0, 10], { ticks: false, out: 1, dots: dots([...A, ...B, ...Cc], 'gray') }),
      plot(60, 45, 460, 360, [0, 10], [0, 10], { ticks: false, s: 1, out: 2, dots: [...dots([...A, ...B, ...Cc], 'gray'), { x: 4.5, y: 5, c: 'yellow', t: '★' }, { x: 5.5, y: 2, c: 'yellow', t: '★' }, { x: 3, y: 8, c: 'yellow', t: '★' }] }),
      plot(60, 45, 460, 360, [0, 10], [0, 10], { ticks: false, s: 2, out: 3, dots: [...dots(A, 'blue'), ...dots(B, 'pink'), ...dots(Cc, 'green'), { x: 4.5, y: 5, c: 'yellow', t: '★' }, { x: 5.5, y: 2, c: 'yellow', t: '★' }, { x: 3, y: 8, c: 'yellow', t: '★' }] }),
      plot(60, 45, 460, 360, [0, 10], [0, 10], { ticks: false, s: 3, dots: [...dots(A, 'blue'), ...dots(B, 'pink'), ...dots(Cc, 'green'), { x: 2.4, y: 2.8, c: 'yellow', t: '★' }, { x: 7.4, y: 7.2, c: 'yellow', t: '★' }, { x: 8.4, y: 2.0, c: 'yellow', t: '★' }] }),
      box(550, 60, 230, 70, '1. Fijar k de antemano', { c: 'gray', fs: 18 }),
      box(550, 145, 230, 70, '2. Centroides al azar', { c: 'yellow', fs: 18, s: 1 }),
      box(550, 230, 230, 70, '3. Cada punto al más cercano', { c: 'pink', fs: 18, s: 2 }),
      box(550, 315, 230, 90, '4. Recalcular centroides y repetir hasta que no cambie', { c: 'green', fs: 17, s: 3 }),
      txt(400, 435, 'Centroide = objeto REAL más cercano a la media del grupo', { b: true, c: 'yellow', fs: 18, s: 4 }),
    ], [
      'La **detección de clusters** es una herramienta **indirecta**: agrupa objetos parecidos **sin clases previas**. En **K-means** la cantidad de grupos, k, **se fija de antemano**. Acá, 3.',
      'En la primera iteración los **centroides** se eligen **al azar**.',
      'Cada punto se asigna al centroide **más cercano**. Así quedan tres grupos, todavía imperfectos.',
      'Se recalcula el centroide de cada grupo y se repite. Los grupos se **reorganizan en forma iterativa** hasta que dejan de cambiar.',
      'Según la cátedra, el **centroide** es el **objeto real más cercano a la media** del grupo: el más representativo.',
    ]),
    scene([
      head('Jerárquicos y distancias'),
      tree(40, 60, 420, 220, { t: 'todos', c: 'purple', kids: [{ t: 'A+B', c: 'purple', kids: [{ t: 'A', c: 'blue' }, { t: 'B', c: 'blue' }] }, { t: 'C+D+E', c: 'purple', kids: [{ t: 'C', c: 'blue' }, { t: 'D+E', c: 'purple', kids: [{ t: 'D', c: 'blue' }, { t: 'E', c: 'blue' }] }] }] }, { fs: 16 }),
      txt(30, 330, '↓ top-down: el todo se divide', { anchor: 'start', fs: 18, b: true, c: 'orange', s: 1 }),
      txt(30, 365, '↑ bottom-up (aglomerativo): cada objeto empieza solo', { anchor: 'start', fs: 18, b: true, c: 'cyan', s: 1 }),
      box(500, 60, 280, 90, 'Jerárquico: la cantidad de grupos RESULTA del algoritmo', { c: 'purple', fs: 17, s: 1 }),
      table(500, 175, 280, ['Cliente', 'Edad', 'Ingreso'], [['X', '30', '50.000'], ['Y', '60', '51.000']], { rh: 38, fs: 16, s: 2 }),
      box(500, 300, 280, 110, 'Unidades distintas: sin normalizar, el ingreso domina la distancia', { c: 'red', fs: 17, s: 2 }),
      txt(400, 435, 'Expresividad BAJA · suele ser el primer paso del proyecto', { b: true, fs: 18, c: 'yellow', s: 3 }),
    ], [
      'En los **métodos jerárquicos**, la cantidad de grupos **no se fija**: **resulta** del algoritmo.',
      'Pueden ser **top-down**, donde todo el conjunto es un cluster que se va dividiendo, o **bottom-up, aglomerativos**, donde cada objeto empieza siendo un cluster y se van uniendo.',
      'La distancia puede medirse entre puntos, por ángulo entre vectores o por campos que coinciden. Problema clásico: **unidades distintas**. Entre X e Y la edad difiere en 30, pero el ingreso en mil: sin normalizar, **el ingreso domina** y la edad casi no cuenta.',
      'El cluster tiene **expresividad baja**: los grupos cuestan de interpretar. Por eso suele ser el **primer paso** de un proyecto, que después se combina con otras técnicas.',
    ]),
  ],

  /* ======================= Módulo 10 ======================= */
  canasta: [
    scene([
      head('Canasta de mercado: soporte, confianza y lift'),
      box(60, 70, 300, 260, '', { shape: 'circle', c: 'blue' }),
      box(240, 70, 300, 260, '', { shape: 'circle', c: 'orange' }),
      txt(140, 200, 'X\n(pan)', { b: true, fs: 24, c: 'blue' }), txt(460, 200, 'Y\n(leche)', { b: true, fs: 24, c: 'orange' }),
      box(255, 140, 90, 120, 'X y Y', { c: 'green', solid: true, fs: 18, s: 1 }),
      txt(300, 360, 'Regla X ⇒ Y: si el ticket tiene X, tiene Y', { b: true, fs: 19 }),
      box(570, 60, 210, 100, 'Soporte', { c: 'green', fs: 22, sub: 'P(X y Y): (X y Y) / total', s: 1 }),
      box(570, 175, 210, 100, 'Confianza', { c: 'blue', fs: 22, sub: 'P(X y Y) / P(X): de los que tienen X', s: 2 }),
      box(570, 290, 210, 100, 'Lift', { c: 'yellow', fs: 22, sub: 'P(X y Y) / (P(X) · P(Y)): vs el azar', s: 3 }),
      txt(300, 420, 'Soporte de X ⇒ Y = soporte de Y ⇒ X (la confianza no)', { b: true, fs: 17, c: 'gray', s: 4 }),
    ], [
      'La **canasta de mercado** descubre **qué se compra con qué**. El resultado son reglas **X implica Y**: X es el **antecedente** e Y el **consecuente**.',
      'El **soporte** es la proporción de tickets que tienen **X e Y juntos** sobre el total: qué tan frecuente es la regla completa.',
      'La **confianza** mira solo los tickets que tienen X: de ellos, ¿cuántos tienen también Y? Es P de X e Y sobre P de X.',
      'El **lift** compara la regla con el **azar**: divide P de X e Y por P de X por P de Y. Es la medida para decidir si la regla sirve.',
      'Ojo: el **soporte** de X implica Y es **igual** al de Y implica X, porque es la misma intersección. La **confianza no**, porque cambia el denominador.',
    ]),
    scene([
      head('¿Cómo leer el lift?'),
      bits(40, 70, 720, [{ t: 'lift < 1', c: 'red', sub: 'peor que el azar' }, { t: 'lift = 1', c: 'gray', sub: 'independencia' }, { t: 'lift > 1', c: 'green', sub: 'la regla sirve' }], { h: 70, fs: 24 }),
      box(40, 180, 340, 80, 'Lift < 1 → la NEGADA (X ⇒ no Y) predice mejor', { c: 'red', fs: 18, s: 1 }),
      box(420, 180, 340, 80, 'APRIORI (con candidatos) · FP-TREE (sin)', { c: 'purple', fs: 18, s: 2 }),
      box(40, 290, 230, 100, 'Accionable', { c: 'green', fs: 22, sub: 'útil para decidir', s: 3 }),
      box(285, 290, 230, 100, 'Trivial', { c: 'gray', fs: 22, sub: 'cafetera ⇒ café', s: 3 }),
      box(530, 290, 230, 100, 'Inexplicable', { c: 'orange', fs: 22, sub: 'sin explicación ni acción', s: 3 }),
      txt(400, 425, 'Ítem poco frecuente → subir de nivel en la taxonomía', { b: true, fs: 18, c: 'cyan', s: 4 }),
    ], [
      'El lift se lee contra 1. **Mayor que 1**: la regla predice mejor que el azar, sirve. **Igual a 1**: X e Y son independientes. **Menor que 1**: la regla es peor que el azar.',
      'Y cuando el lift es **menor que 1**, la regla **negada**, X implica no Y, predice **mejor** que el azar.',
      'Las reglas se generan **con generación de candidatos**, el algoritmo **APRIORI**, o **sin generación de candidatos**, con **FP-TREE**.',
      'Un experto clasifica las reglas: **accionables**, que sirven para decidir; **triviales**, que cualquiera del rubro ya sabe, como cafetera implica café; e **inexplicables**.',
      'Si un producto aparece en **muy pocos tickets**, conviene **subir de nivel** en la taxonomía y agruparlo: de "yogur de frutilla" a "lácteos". El pruning exige un **soporte mínimo** a cada ítem.',
    ]),
  ],

  mbr: [
    scene([
      head('MBR: decidir por los vecinos más cercanos'),
      plot(60, 45, 460, 360, [0, 10], [0, 10], {
        ticks: false, xl: 'edad', yl: 'ingreso',
        dots: [
          { x: 2, y: 3, c: 'green', t: 'Sí' }, { x: 3.2, y: 4.4, c: 'green', t: 'Sí' }, { x: 4.6, y: 2.4, c: 'red', t: 'No' },
          { x: 7.5, y: 7.8, c: 'red', t: 'No' }, { x: 8.4, y: 5.6, c: 'red', t: 'No' }, { x: 2.6, y: 8.2, c: 'red', t: 'No' }, { x: 6, y: 6.5, c: 'green', t: 'Sí' },
          { x: 3.1, y: 3.2, c: 'yellow', t: 'NUEVO', s: 1 },
        ],
      }),
      box(180, 255, 130, 120, '', { shape: 'circle', c: 'yellow', dash: true, s: 2 }),
      box(550, 60, 230, 90, 'Caso nuevo: ¿responderá?', { c: 'yellow', fs: 19, s: 1 }),
      box(550, 165, 230, 90, 'k = 3 vecinos: Sí, Sí, No', { c: 'cyan', fs: 19, s: 2 }),
      box(550, 270, 230, 70, 'Democrática: Sí 67 %', { c: 'green', fs: 19, s: 3 }),
      box(550, 350, 230, 70, 'Ponderada: pesa 1/distancia', { c: 'purple', fs: 18, s: 4 }),
    ], [
      'El **razonamiento basado en memoria**, MBR, se basa en la **similitud**: para un caso nuevo, busca casos parecidos del pasado y predice según lo que pasó con ellos. Acá cada punto es un cliente que respondió sí o no a una oferta.',
      'Llega un **cliente nuevo**. ¿Responderá?',
      'Buscamos sus **k vecinos más cercanos**, por ejemplo 3: dos dijeron que sí y uno que no.',
      'Con la **combinación democrática** cada vecino vota igual: **sí, con 67 % de certeza**.',
      'Con la **combinación ponderada**, el voto de cada vecino pesa **inversamente a su distancia**: los más cercanos pesan más. Modalidad **directa**; no presenta expresividad.',
    ]),
    scene([
      head('Los 4 factores del MBR'),
      box(30, 50, 360, 100, '1. Set de entrenamiento BALANCEADO', { c: 'blue', fs: 18, sub: 'muy grande: lento · muy chico: pobre · usar centroides' }),
      box(410, 55, 360, 80, '3. Cantidad de vecinos', { c: 'orange', fs: 19, sub: 'más vecinos → más soporte', s: 2 }),
      box(410, 150, 360, 80, '4. Función de combinación', { c: 'green', fs: 19, sub: 'democrática o ponderada', s: 3 }),
      txt(210, 180, '2. Función de distancia', { b: true, fs: 20, c: 'purple', s: 1 }),
      box(70, 330, 70, 70, 'A', { shape: 'circle', c: 'purple', fs: 24, id: 'a', s: 1 }),
      box(320, 330, 70, 70, 'B', { shape: 'circle', c: 'purple', fs: 24, id: 'b', s: 1 }),
      box(195, 205, 70, 70, 'C', { shape: 'circle', c: 'purple', fs: 24, id: 'c', s: 1 }),
      arr('a', 'b', { c: 'purple', s: 1, two: true }), txt(230, 430, 'd(A,B) = d(B,A)', { b: true, fs: 18, c: 'purple', s: 1 }), arr('a', 'c', { c: 'gray', s: 1, head: false }), arr('c', 'b', { c: 'gray', s: 1, head: false }),
      box(410, 260, 360, 170, 'Bien definida (≥ 0) · identidad d(A,A) = 0 · conmutativa · triangular: d(A,C) + d(C,B) ≥ d(A,B)', { c: 'purple', fs: 18, s: 1 }),
    ], [
      'El MBR depende de cuatro factores. Uno: el **set de entrenamiento**, que debe estar **balanceado** con todas las categorías. Si es muy grande clasifica bien pero es lento; si es muy chico, rápido pero pobre. Un truco: usar los **centroides de clusters** como set.',
      'Dos: la **función de distancia**, con cuatro propiedades: **bien definida**, real y positiva; **identidad**, la distancia de A a A es cero; **conmutativa**, de A a B igual que de B a A; y la **desigualdad triangular**: ir de A a B pasando por C nunca es más corto que ir directo.',
      'Tres: la **cantidad de vecinos**. Más vecinos dan más soporte a la predicción.',
      'Cuatro: la **función de combinación**, democrática o ponderada. La gran **desventaja** del MBR: predecir es **caro**, porque hay que recorrer mucho historial para encontrar los vecinos.',
    ]),
  ],

  /* ======================= Módulo 11 ======================= */
  crisp: [
    scene([
      head('CRISP-DM: 6 fases'),
      ico(400, 240, 'db', { t: 'Datos', c: 'gray', size: 80 }),
      box(70, 60, 200, 80, '1. Negocio', { c: 'blue', fs: 21, sub: 'objetivos, plan', id: 'f1' }),
      box(530, 60, 200, 80, '2. Datos', { c: 'cyan', fs: 21, sub: 'recolectar, explorar, CALIDAD', id: 'f2', s: 1 }),
      box(600, 200, 190, 80, '3. Preparación', { c: 'green', fs: 20, sub: 'limpiar, integrar, formatear', id: 'f3', s: 2 }),
      box(530, 340, 200, 80, '4. Modelado', { c: 'orange', fs: 21, sub: 'técnica, construir', id: 'f4', s: 3 }),
      box(70, 340, 200, 80, '5. Evaluación', { c: 'pink', fs: 21, sub: 'resultados, revisar', id: 'f5', s: 4 }),
      box(10, 200, 190, 80, '6. Implementación', { c: 'purple', fs: 19, sub: 'despliegue, monitoreo, reporte', id: 'f6', s: 5 }),
      arr('f1', 'f2', { c: 'cyan', s: 1, two: true }), arr('f2', 'f3', { c: 'green', s: 2 }), arr('f3', 'f4', { c: 'orange', s: 3, two: true }),
      arr('f4', 'f5', { c: 'pink', s: 4 }), arr('f5', 'f1', { c: 'blue', s: 4, dash: true, bend: 70 }), arr('f5', 'f6', { c: 'purple', s: 5 }),
    ], [
      '**CRISP-DM** es la metodología estándar para proyectos de data mining: un proceso jerárquico en **seis fases**. Todo empieza por la **comprensión del negocio**: objetivos y factores de éxito, entorno, restricciones y riesgos, objetivos de data mining y el plan del proyecto.',
      'Dos: **comprensión de los datos**: recolección inicial, descripción, exploración y **verificación de la calidad**. Entre negocio y datos se va y se vuelve.',
      'Tres: **preparación de los datos**: seleccionar, **limpiar**, construir, **integrar y formatear**. Trampa típica: verificar la calidad es de comprensión; limpiar e integrar es de preparación.',
      'Cuatro: **modelado**: elegir la técnica, testear, construir y seleccionar el modelo. Puede pedir volver a preparar datos.',
      'Cinco: **evaluación**: evaluar resultados, revisar el proceso y decidir los próximos pasos, que pueden ser volver al negocio.',
      'Y seis: **implementación** o despliegue: plan de implementación, **plan de monitoreo y mantenimiento**, **reporte final** y documentación.',
    ]),
  ],

  /* ======================= Módulo 12 ======================= */
  text: [
    scene([
      head('Text Mining: de texto libre a patrones'),
      ico(80, 120, 'doc', { c: 'blue', size: 70 }), ico(120, 150, 'doc', { c: 'blue', size: 70 }), ico(160, 180, 'doc', { c: 'blue', size: 70, t: 'textos no\nestructurados', id: 'd' }),
      box(250, 110, 220, 110, '1. Preprocesamiento', { c: 'purple', fs: 19, sub: 'el texto pasa a una forma estructurada', s: 1, id: 'p' }),
      table(500, 80, 280, ['término', 'doc1', 'doc2'], [['reclamo', '3', '0'], ['demora', '2', '1'], ['precio', '0', '4']], { rh: 34, fs: 16, s: 1 }),
      box(500, 230, 280, 70, '2. Descubrimiento de patrones', { c: 'green', fs: 18, s: 2 }),
      arr('d', 'p', { c: 'purple', s: 1 }),
      box(40, 330, 340, 100, 'Problema: ambigüedad. "banco" = asiento o entidad', { c: 'red', fs: 18, s: 3 }),
      box(420, 330, 360, 100, 'Responde QUÉ pasó y también POR QUÉ · modalidad indirecta', { c: 'yellow', fs: 18, s: 4 }),
    ], [
      'El **text mining** busca lo mismo que el data mining, relaciones y modelos, pero sobre **texto no estructurado**: reclamos, mails, notas.',
      'Trabaja en dos etapas. Primero, el **preprocesamiento**: el texto se transforma en una **representación estructurada**, por ejemplo cuántas veces aparece cada término en cada documento.',
      'Después, el **descubrimiento**: se buscan patrones sobre esa representación.',
      'El gran problema es el **lenguaje natural**: es **ambiguo**, con sinónimos, palabras de varios significados, errores de tipeo y distintos idiomas.',
      'Su valor: además de **qué** ocurrió, permite saber **por qué**. Y deja conocer el sentido de un texto sin leerlo entero. Modalidad: **indirecta**.',
    ]),
  ],

  web: [
    scene([
      head('Web Mining: tres tipos'),
      tree(20, 55, 760, 220, {
        t: 'Web Mining', c: 'yellow', kids: [
          { t: 'Contenido', c: 'blue', s: 1, kids: [{ t: 'text', c: 'blue', s: 1 }, { t: 'hypertext', c: 'blue', s: 1 }, { t: 'markup', c: 'blue', s: 1 }, { t: 'multimedia', c: 'blue', s: 1 }] },
          { t: 'Estructura', c: 'green', s: 2, kids: [{ t: 'topología de enlaces', c: 'green', s: 2 }] },
          { t: 'Uso', c: 'orange', s: 3, kids: [{ t: 'sesiones y logs', c: 'orange', s: 3 }] },
        ],
      }, { fs: 16 }),
      box(30, 310, 360, 120, 'Fortalezas: mejorar el servidor, reestructurar el sitio, horas pico, dónde poner publicidad', { c: 'green', fs: 17, s: 4 }),
      box(410, 310, 360, 120, 'Debilidades: no se sabe inicio/fin de sesión; la CACHÉ local no queda registrada', { c: 'red', fs: 17, s: 5 }),
    ], [
      'El **web mining** descubre conocimiento útil y desconocido a partir de **datos de la Web**, que son desestructurados o semiestructurados. Hay tres tipos.',
      '**Web content mining**, sobre el **contenido**: texto plano, hipertexto con enlaces, documentos con marcas, o multimedia.',
      '**Web structure mining**, sobre la **estructura**: arma un modelo a partir de la **topología de los enlaces** entre páginas.',
      '**Web usage mining**, sobre el **uso**: hábitos y preferencias a partir de las **sesiones** y los registros de navegación.',
      'Fortalezas: mejorar la performance del servidor, reestructurar el sitio, encontrar clientes potenciales y las **horas pico** para la publicidad.',
      'Debilidades: no hay forma exacta de saber dónde **empieza y termina una sesión**, y las páginas que el navegador sirve desde su **caché local** no quedan registradas en el servidor.',
    ]),
  ],
};

export const EX_SCENES: Record<string, VisScene[]> = {
  'aid-e1': [
    scene([
      head('6 tickets: pan ⇒ leche y café ⇒ pan'),
      table(20, 50, 380, ['Ticket', 'Productos'], [['T1', 'pan, leche'], ['T2', 'pan, manteca, café'], ['T3', 'leche, café'], ['T4', 'pan, leche, café'], ['T5', 'pan, leche, manteca'], ['T6', 'café']], { rh: 38, fs: 17, cw: [0.7, 2.3] }),
      bars(440, 60, 340, 180, [{ t: 'pan', v: 4, c: 'orange' }, { t: 'leche', v: 4, c: 'blue' }, { t: 'café', v: 4, c: 'pink' }, { t: 'pan y\nleche', v: 3, c: 'green' }, { t: 'café y\npan', v: 2, c: 'red' }], { s: 1, max: 6 }),
      table(20, 330, 760, ['Regla', 'Soporte', 'Confianza', 'Lift'], [['pan ⇒ leche', '3/6 = 0,50', '3/4 = 0,75', '0,50 / (4/6 · 4/6) = 1,125'], ['café ⇒ pan', '2/6 = 0,33', '2/4 = 0,50', '0,33 / 0,444 = 0,75'], ['café ⇒ NO pan', '2/6', '2/4', '(2/6) / (4/6 · 2/6) = 1,5']], { rh: 30, fs: 16, rs: [2, 3, 4], hi: [{ r: 0, s: 2, c: 'green' }, { r: 1, s: 3, c: 'red' }, { r: 2, s: 4, c: 'yellow' }], cw: [1.2, 1, 1, 2.2] }),
    ], [
      'Tenemos seis tickets. Queremos evaluar dos reglas: pan implica leche, y café implica pan.',
      'Primero contamos apariciones. Pan está en 4 de 6 tickets, leche en 4, café en 4. Pan con leche juntos: 3. Café con pan: 2.',
      '**Pan implica leche**: soporte 3 sobre 6, **0,50**. Confianza: de 4 tickets con pan, 3 tienen leche, **0,75**. Lift: 0,50 dividido 4 sextos por 4 sextos, **1,125**. Mayor que 1: la regla **sirve**.',
      '**Café implica pan**: soporte 2 sobre 6. Confianza 2 de 4, 0,50. Lift **0,75**: **menor que 1**, peor que el azar.',
      'Entonces probamos la **negada**: café implica **no** pan. Pasa en T3 y T6. Lift: 2 sextos sobre 4 sextos por 2 sextos, **1,5**. La negada predice **mejor** que el azar.',
    ]),
  ],
  'aid-e2': [
    scene([
      head('R1: A ⇒ 0 vs R2: B ⇒ 1 (8 eventos)'),
      bits(40, 60, 720, ['A→0', 'A→0', 'A→0', 'A→1', 'A→0', 'B→1', 'B→1', 'B→0'].map((t, i) => ({ t, c: i < 5 ? 'blue' as const : 'orange' as const })), { h: 54, fs: 18, mono: true }),
      txt(400, 150, 'P(0) = 5/8 · P(1) = 3/8', { b: true, fs: 20, c: 'gray', s: 1 }),
      bars(60, 190, 320, 190, [{ t: 'R1 confianza', v: 0.8, c: 'blue' }, { t: 'R2 confianza', v: 0.67, c: 'orange' }], { s: 2, max: 2 }),
      bars(420, 190, 320, 190, [{ t: 'R1 lift', v: 1.28, c: 'blue' }, { t: 'R2 lift', v: 1.78, c: 'orange' }], { s: 3, max: 2 }),
      txt(400, 435, 'Más confianza no es mejor regla: gana R2 por LIFT', { b: true, fs: 20, c: 'yellow', s: 4 }),
    ], [
      'Ocho eventos: cinco con antecedente A y tres con B.',
      'El consecuente 0 aparece 5 veces de 8, y el 1 aparece 3 de 8. Estas probabilidades son clave para el lift.',
      'Confianzas: R1, A implica 0, se cumple 4 de 5 veces: **0,80**. R2, B implica 1, se cumple 2 de 3: **0,67**. Parece que gana R1.',
      'Pero el lift divide por la probabilidad del consecuente. R1: 0,80 sobre 5 octavos, **1,28**. R2: 0,67 sobre 3 octavos, **1,78**.',
      'R2 mejora mucho más respecto del azar. La **confianza alta no alcanza**: para comparar reglas, mirá el **lift**.',
    ]),
  ],
  'aid-e3': [
    scene([
      head('MBR con k = 3: cliente nuevo 27 años, 40 mil, F'),
      table(20, 50, 760, ['Cliente', 'Edad', 'Ingreso', 'Sexo', '¿Resp.?', 'Distancia'], [
        ['C1', '25', '30', 'F', 'Sí', '2/25 + 10/50 + 0 = 0,28'], ['C2', '45', '80', 'M', 'No', '18/25 + 40/50 + 1 = 2,52'], ['C3', '30', '35', 'M', 'No', '3/25 + 5/50 + 1 = 1,22'], ['C4', '50', '60', 'F', 'No', '23/25 + 20/50 + 0 = 1,32'], ['C5', '28', '50', 'F', 'Sí', '1/25 + 10/50 + 0 = 0,24'],
      ], { rh: 40, fs: 17, cw: [0.8, 0.7, 0.8, 0.6, 0.8, 2.6], hi: [{ r: 4, s: 2, c: 'green' }, { r: 0, s: 2, c: 'green' }, { r: 2, s: 2, c: 'orange' }] }),
      txt(400, 305, 'rango edad = 25 · rango ingreso = 50 · sexo: 0 si coincide, 1 si no', { b: true, fs: 17, c: 'gray', s: 1 }),
      box(40, 340, 340, 90, 'Democrática: Sí 2 votos, No 1 → Sí 67 %', { c: 'green', fs: 19, s: 3 }),
      box(420, 340, 340, 90, 'Ponderada (1/d): Sí 7,74 vs No 0,82 → Sí ≈ 90 %', { c: 'purple', fs: 18, s: 4 }),
    ], [
      'Tenemos cinco clientes de entrenamiento y uno nuevo: 27 años, ingreso 40 mil, mujer.',
      'Para que edad e ingreso pesen parecido, cada diferencia se divide por el **rango**: 25 para la edad y 50 para el ingreso. En sexo se suma 0 si coincide y 1 si no.',
      'Calculamos las distancias. Las tres más chicas son **C5, 0,24**, que respondió sí; **C1, 0,28**, sí; y **C3, 1,22**, no.',
      'Con **combinación democrática**: dos votos a uno, **sí con 67 %** de certeza.',
      'Con **combinación ponderada**, cada voto pesa 1 sobre la distancia: el sí suma 7,74 y el no 0,82. **Sí, con cerca de 90 %**: los vecinos que dijeron sí están mucho más cerca.',
    ]),
  ],
  'aid-e4': [
    scene([
      head('Error de un árbol con 2 hojas (100 registros de prueba)'),
      tree(100, 50, 600, 180, { t: 'nodo raíz · 100', c: 'blue', kids: [{ t: 'Hoja 1 · 60 reg · 54 bien', c: 'green', s: 1 }, { t: 'Hoja 2 · 40 reg · 30 bien', c: 'orange', s: 1 }] }, { fs: 17 }),
      box(40, 260, 350, 70, 'Error hoja 1 = 1 − 54/60 = 10 % · peso 0,6', { c: 'green', fs: 17, s: 2 }),
      box(410, 260, 350, 70, 'Error hoja 2 = 1 − 30/40 = 25 % · peso 0,4', { c: 'orange', fs: 17, s: 2 }),
      box(100, 355, 600, 70, 'Árbol = 0,10 · 0,6 + 0,25 · 0,4 = 0,16 → 16 %', { c: 'yellow', fs: 22, s: 3 }),
    ], [
      'Un árbol con dos hojas. Pasamos 100 registros de prueba.',
      'A la hoja 1 llegan **60** y acierta 54. A la hoja 2 llegan **40** y acierta 30.',
      'Error de cada hoja: 1 menos aciertos. Hoja 1: **10 %**. Hoja 2: **25 %**. El **peso** de cada hoja es la probabilidad de que un dato nuevo caiga ahí: 0,6 y 0,4.',
      'El error del árbol es la **suma de error por peso**: 0,06 más 0,10, **16 %**. El promedio simple daría 17,5 y estaría mal, porque ignora el peso de cada hoja.',
    ]),
  ],
  'aid-e5': [
    scene([
      head('Chi²: ¿el sexo influye en la compra? (n = 100)'),
      table(30, 60, 360, ['Observado', 'Compra', 'No', 'Total'], [['Hombres', '30', '20', '50'], ['Mujeres', '10', '40', '50'], ['Total', '40', '60', '100']], { rh: 44, fs: 18 }),
      table(410, 60, 360, ['Esperado', 'Compra', 'No'], [['Hombres', '20', '30'], ['Mujeres', '20', '30']], { rh: 44, fs: 18, s: 1, c: 'orange' }),
      txt(590, 220, 'e = fila × columna / n (ej.: 50·40/100 = 20)', { fs: 16, b: true, c: 'orange', s: 1 }),
      bits(30, 280, 740, [{ t: '(30−20)²/20 = 5', c: 'blue' }, { t: '(20−30)²/30 = 3,33', c: 'blue' }, { t: '(10−20)²/20 = 5', c: 'pink' }, { t: '(40−30)²/30 = 3,33', c: 'pink' }], { h: 56, fs: 16, s: 2, title: '(observado − esperado)² / esperado' }),
      box(100, 362, 600, 70, 'χ² = 16,67 → grande: la independencia es poco verosímil', { c: 'yellow', fs: 21, s: 3 }),
    ], [
      'Cien clientes: hombres que compran 30 y no compran 20; mujeres que compran 10 y no 40. ¿Hay relación entre sexo y compra?',
      'Primero, las **frecuencias esperadas** si fueran **independientes**: total de la fila por total de la columna, dividido n. Hombres que compran: 50 por 40 sobre 100, **20**. Y así cada celda.',
      'Después, para cada celda: observado menos esperado, **al cuadrado**, dividido el esperado. Da 5, 3,33, 5 y 3,33.',
      'La suma es **χ² ≈ 16,67**. Es **grande**: lo observado se aleja mucho de lo esperado bajo independencia, así que **hay asociación**: los hombres compran más de lo esperado.',
    ]),
  ],
};
