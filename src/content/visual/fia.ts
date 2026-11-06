/** FIA · final · recorridos visuales propios. */
import type { VisScene } from '../../vis/types';
import { arr, bars, bits, box, head, ico, plot, scene, table, tree, txt } from './h';

const SEARCH_TREE = (order: Record<string, number>, c: 'blue' | 'orange') => ({
  t: 'A', c, s: order.A, kids: [
    { t: 'B', c, s: order.B, kids: [{ t: 'D', c, s: order.D }, { t: 'E', c, s: order.E }] },
    { t: 'C', c, s: order.C, kids: [{ t: 'F ★', c: 'green' as const, s: order.F }, { t: 'G', c: 'gray' as const, s: order.G }] },
  ],
});

export const SCENES: Record<string, VisScene[]> = {
  f1: [
    scene([
      head('IA ⊃ Machine Learning ⊃ Deep Learning'),
      box(30, 50, 460, 380, '', { shape: 'circle', c: 'blue' }), txt(260, 85, 'Inteligencia Artificial', { b: true, fs: 22, c: 'blue' }),
      box(90, 120, 340, 290, '', { shape: 'circle', c: 'orange', s: 1 }), txt(260, 160, 'Machine Learning', { b: true, fs: 21, c: 'orange', s: 1 }),
      box(160, 200, 200, 190, '', { shape: 'circle', c: 'green', s: 2 }), txt(260, 285, 'Deep\nLearning', { b: true, fs: 21, c: 'green', s: 2 }),
      box(520, 60, 260, 90, 'ML: el usuario define las características', { c: 'orange', fs: 17, s: 1 }),
      box(520, 165, 260, 90, 'DL: la red aprende sola qué atributos importan', { c: 'green', fs: 17, s: 2 }),
      table(520, 280, 260, ['Tipos de ML'], [['supervisado'], ['no supervisado'], ['por refuerzo']], { rh: 36, fs: 17, s: 3 }),
    ], [
      'La **inteligencia artificial** busca **comprender** y **construir** entidades inteligentes: que una computadora haga tareas en las que, por ahora, el humano es mejor. En los 50 resolvía problemas fijos, como juegos.',
      'Dentro está el **machine learning**, desde los 80: el sistema **aprende** del feedback del ambiente. Pero el usuario tiene que definir las **características** que importan.',
      'Y dentro del machine learning, desde 2010, el **deep learning**: redes neuronales multicapa que **aprenden solas** qué atributos son relevantes.',
      'El machine learning se divide en **supervisado**, **no supervisado** y **por refuerzo**. Y no te olvides de las tres leyes de la robótica de Asimov: no dañar humanos, obedecer y protegerse, en ese orden de prioridad.',
    ]),
  ],
  f2: [
    scene([
      head('La IA se apoya en otras ciencias'),
      box(300, 180, 200, 90, 'IA', { c: 'yellow', fs: 34, id: 'ia' }),
      ...[['Filosofía', 'razonamiento, lógica', 30, 50, 'blue'], ['Matemática', 'lógica, probabilidad', 570, 50, 'purple'], ['Psicología y neurociencia', 'cómo aprende el cerebro', 30, 330, 'pink'], ['Lingüística', 'lenguaje natural', 570, 330, 'green'], ['Ingeniería', 'computadoras, control', 300, 340, 'orange']].map(([t, sub, x, y, c], i) =>
        box(x as number, y as number, 200, 80, t as string, { c, sub, fs: 17, s: i < 2 ? 0 : 1, id: 'c' + i })),
      ...[0, 1, 2, 3, 4].map((i) => arr('c' + i, 'ia', { c: 'gray', s: i < 2 ? 0 : 1 })),
      box(260, 50, 280, 90, 'Aplicaciones: deportes (Deep Blue vs Kasparov), medicina, finanzas, industria', { c: 'cyan', fs: 14, s: 2 }),
    ], [
      'La IA no nace sola: toma de la **filosofía** el razonamiento y la lógica, y de la **matemática** la lógica formal, la probabilidad y la computabilidad.',
      'De la **psicología y la neurociencia**, cómo piensa y aprende el cerebro; de la **lingüística**, el lenguaje natural; y de la **ingeniería**, las computadoras y el control.',
      'Y se aplica en todas partes: en deportes, como Deep Blue venciendo a Kasparov al ajedrez, en medicina, finanzas e industria.',
    ]),
  ],
  f3: [
    scene([
      head('Búsqueda en AMPLITUD: nivel por nivel'),
      tree(20, 55, 460, 300, SEARCH_TREE({ A: 0, B: 1, C: 1, D: 2, E: 2, F: 2, G: 2 }, 'blue'), { fs: 20 }),
      bits(20, 390, 460, ['A', 'B', 'C', 'D', 'E', 'F'].map((t, i) => ({ t, c: i === 5 ? 'green' as const : 'blue' as const, s: i === 0 ? 0 : i < 3 ? 1 : 2 })), { h: 44, fs: 20, title: 'orden de expansión' }),
      table(510, 60, 270, ['', 'Amplitud'], [['Completa', 'sí'], ['Óptima', 'sí (costos =)'], ['Memoria', 'mucha']], { rh: 46, fs: 17, s: 3 }),
    ], [
      'Un **problema** existe cuando alguien **desea algo** y **no conoce la secuencia de acciones** para lograrlo. El **espacio de estados** contiene todas las posibilidades; la búsqueda explora solo una parte.',
      'La búsqueda en **amplitud** recorre **nivel por nivel**: primero A, después todos sus hijos, B y C…',
      '…después todos los del nivel siguiente, hasta encontrar la meta F.',
      'Es **completa**: si hay solución, la encuentra. Y con costos uniformes es **óptima**: encuentra el camino más corto. El precio: **mucha memoria**, porque guarda niveles enteros.',
    ]),
    scene([
      head('Búsqueda en PROFUNDIDAD: una rama hasta el fondo'),
      tree(20, 55, 460, 300, SEARCH_TREE({ A: 0, B: 1, D: 1, E: 2, C: 3, F: 3, G: 3 }, 'orange'), { fs: 20 }),
      bits(20, 390, 460, ['A', 'B', 'D', 'E', 'C', 'F'].map((t, i) => ({ t, c: i === 5 ? 'green' as const : 'orange' as const, s: i < 3 ? (i === 0 ? 0 : 1) : i === 3 ? 2 : 3 })), { h: 44, fs: 20, title: 'orden de expansión' }),
      table(510, 60, 270, ['', 'Profundidad'], [['Completa', 'NO'], ['Óptima', 'NO'], ['Memoria', 'poca']], { rh: 46, fs: 17, s: 4 }),
      box(510, 265, 270, 165, 'Informadas (heurísticas): ascenso en colina, búsqueda en haz, primero el mejor', { c: 'purple', fs: 17, s: 5 }),
    ], [
      'La búsqueda en **profundidad** baja por **una rama hasta el fondo** antes de probar otra.',
      'A, B, D: llegó al fondo de la rama izquierda.',
      'Retrocede y prueba E.',
      'Recién después pasa a C y encuentra F.',
      'Gasta **poca memoria**, pero **no es completa**: si una rama fuera infinita, nunca saldría de ahí. **Ni óptima**. Esta comparación la tomaron en el final de diciembre 2025.',
      'Amplitud y profundidad son búsquedas **ciegas**. Las **informadas** usan una heurística: **ascenso en colina**, **búsqueda en haz** y **primero el mejor**.',
    ]),
  ],
  f4: [
    scene([
      head('Prolog: hechos, reglas y consultas'),
      box(30, 55, 360, 110, '', { c: 'blue' }),
      txt(50, 85, 'padre(juan, ana).', { anchor: 'start', mono: true, fs: 20 }), txt(50, 125, 'padre(ana, luis).', { anchor: 'start', mono: true, fs: 20 }),
      txt(380, 85, 'HECHOS', { anchor: 'end', b: true, c: 'blue', fs: 16 }),
      box(30, 185, 740, 70, '', { c: 'orange', s: 1 }),
      txt(50, 220, 'abuelo(X, Z) :- padre(X, Y), padre(Y, Z).', { anchor: 'start', mono: true, fs: 20, s: 1 }),
      txt(760, 220, 'REGLA', { anchor: 'end', b: true, c: 'orange', fs: 16, s: 1 }),
      box(410, 55, 360, 110, '?- abuelo(juan, Q).', { c: 'green', fs: 22, sub: 'consulta → Q = luis', s: 2 }),
      box(30, 280, 240, 150, 'Unificación', { c: 'cyan', sub: 'hacer coincidir términos: X = juan', fs: 20, s: 3 }),
      box(280, 280, 240, 150, 'Instanciación', { c: 'purple', sub: 'Y toma el valor ana', fs: 20, s: 3 }),
      box(530, 280, 240, 150, 'Backtracking', { c: 'pink', sub: 'si falla, vuelve atrás y prueba otra opción', fs: 20, s: 4 }),
    ], [
      'Un programa **Prolog** es conocimiento escrito como **hechos** y **reglas**. Un hecho es una afirmación incondicional: Juan es padre de Ana.',
      'Una **regla** es una conclusión condicionada: X es abuelo de Z si X es padre de Y e Y es padre de Z. Las **variables** empiezan con **mayúscula**.',
      'El programa se usa haciendo **consultas**: ¿de quién es abuelo Juan? Responde Luis.',
      'Para responder, Prolog **unifica**, hace coincidir términos, e **instancia** variables: X vale Juan, Y vale Ana, Z vale Luis.',
      'Y si un camino falla, hace **backtracking**: vuelve atrás y prueba otra alternativa.',
    ]),
  ],
  f5: [
    scene([
      head('Arquitectura de un sistema experto'),
      ico(70, 220, 'user', { t: 'usuario', c: 'blue' }),
      box(200, 60, 200, 90, 'Base de reglas', { c: 'orange', sub: 'SI … ENTONCES …', fs: 19, id: 'br' }),
      box(200, 180, 200, 90, 'Motor de inferencias', { c: 'purple', sub: 'razona', fs: 19, id: 'mi', s: 1 }),
      box(200, 300, 200, 90, 'Memoria de trabajo', { c: 'green', sub: 'hechos del caso', fs: 19, id: 'mt', s: 2 }),
      box(460, 180, 200, 90, 'Trazador de explicaciones', { c: 'cyan', sub: '¿cómo? ¿por qué?', fs: 17, id: 'te', s: 3 }),
      arr('br', 'mi', { c: 'orange', s: 1 }), arr('mt', 'mi', { c: 'green', s: 2, two: true }), arr('mi', 'te', { c: 'cyan', s: 3 }),
      box(460, 60, 320, 90, 'Hacia ADELANTE: datos → antecedentes', { c: 'yellow', fs: 17, s: 4 }),
      box(460, 300, 320, 90, 'Hacia ATRÁS: objetivo → consecuentes', { c: 'pink', fs: 17, s: 4 }),
    ], [
      'Un **sistema experto** simula la conducta de un experto humano en un dominio. Su conocimiento está en la **base de reglas**: si pasa esto, entonces aquello.',
      'El **motor de inferencias** es el que razona: decide qué reglas aplicar.',
      'La **memoria de trabajo** guarda los **hechos del caso** que se está analizando.',
      'Y el **trazador de explicaciones** responde **cómo** y **por qué** llegó a una conclusión.',
      'El motor puede encadenar **hacia adelante**, guiado por los **datos**: dispara las reglas cuyos **antecedentes** son verdaderos. O **hacia atrás**, guiado por el **objetivo**: verifica los **consecuentes**.',
    ]),
    scene([
      head('Metodología de desarrollo'),
      ...['Adquisición', 'Conceptualización', 'Formalización', 'Implementación', 'Validación'].map((t, i) => box(15 + i * 157, 80, 145, 90, t, { c: (['blue', 'cyan', 'yellow', 'purple', 'green'] as const)[i], fs: 14, s: i, id: 'm' + i })),
      ...[0, 1, 2, 3].map((i) => arr('m' + i, 'm' + (i + 1), { c: 'white', s: i + 1 })),
      txt(165, 200, 'árbol de causalidad', { fs: 15, b: true, c: 'cyan', s: 1 }),
      txt(400, 200, '→ reglas IF-THEN', { fs: 15, b: true, c: 'yellow', s: 2 }),
      txt(560, 200, 'con un shell', { fs: 15, b: true, c: 'purple', s: 3 }),
      box(30, 250, 360, 180, 'Roles: ingeniero del conocimiento, experto humano, programadores y usuario final', { c: 'white', fs: 17, s: 0 }),
      box(410, 250, 360, 180, 'SHELL: sistema experto con la base de reglas VACÍA · abarata el desarrollo, pero tiene costo y curva de aprendizaje', { c: 'purple', fs: 16, s: 3 }),
    ], [
      'El desarrollo empieza por la **adquisición**: el **ingeniero del conocimiento** extrae lo que sabe el **experto humano**.',
      'En la **conceptualización** se organiza ese conocimiento: enunciación, parámetros y causalidad, en un **árbol de causalidad**.',
      'En la **formalización**, el árbol se transforma en **reglas IF-THEN**. Esta pregunta salió en el final de diciembre 2025.',
      'La **implementación** suele hacerse con un **shell**: un sistema experto ya programado con la base de reglas vacía.',
      'Y al final, la **validación** con casos reales.',
    ]),
  ],
  f6: [
    scene([
      head('Lógica difusa: "alto" no es sí o no'),
      plot(40, 55, 470, 260, [140, 210], [0, 1.15], { xt: 10, yt: 0.5, xl: 'estatura (cm)', yl: 'pertenencia',
        fns: [{ pts: [[140, 0], [175, 0], [175, 1], [210, 1]], c: 'gray', step: false, dash: true, t: 'clásica: 0 o 1' }, { f: 'min(1,max(0,(x-160)/30))', c: 'orange', s: 1, t: 'difusa: [0, 1]' }],
        dots: [{ x: 172, y: 0.4, t: '172 cm → 0,4', c: 'yellow', s: 2 }],
      }),
      box(530, 55, 250, 110, 'Verdad graduada en el intervalo [0, 1]', { c: 'orange', fs: 19, s: 1 }),
      ...['Fuzzificación', 'Inferencia', 'Defuzzificación'].map((t, i) => box(40 + i * 160, 345, 145, 70, t, { c: (['cyan', 'purple', 'green'] as const)[i], fs: 16, s: 3, id: 'z' + i })),
      arr('z0', 'z1', { s: 3 }), arr('z1', 'z2', { s: 3 }),
      box(530, 185, 250, 110, 'Redes bayesianas: grafo acíclico dirigido con dependencias', { c: 'blue', fs: 16, s: 4 }),
      box(530, 315, 250, 110, 'Defuzzificar: de conjunto difuso a un valor (ej.: MOM)', { c: 'green', fs: 16, s: 3 }),
    ], [
      'En la lógica **clásica**, alguien es alto o no lo es: el salto de 0 a 1 es brusco.',
      'En la lógica **difusa**, el valor de verdad se **gradúa en el intervalo de 0 a 1**. La **función de pertenencia** dice cuánto pertenece cada valor al conjunto "alto".',
      'Alguien de 172 centímetros es "alto" con grado **0,4**.',
      'El proceso: **fuzzificación**, que pasa un valor nítido a grados de pertenencia; **inferencia** con reglas difusas; y **defuzzificación**, que vuelve a un valor nítido, por ejemplo con la media de los máximos.',
      'Para la incertidumbre probabilística están las **redes bayesianas**: un grafo acíclico dirigido con dependencias condicionales.',
    ]),
  ],
  f7: [
    scene([
      head('Neurona artificial'),
      ...[0, 1, 2].map((i) => box(30, 80 + i * 110, 80, 60, `x${i + 1}`, { shape: 'circle', c: 'blue', fs: 22, id: 'x' + i })),
      box(310, 170, 140, 110, 'Σ xᵢ·wᵢ + b', { shape: 'circle', c: 'orange', fs: 20, id: 'sum', s: 1 }),
      ...[0, 1, 2].map((i) => arr('x' + i, 'sum', { c: 'gray', t: `w${i + 1}`, s: 1 })),
      box(510, 180, 130, 90, 'f( )', { c: 'purple', fs: 26, sub: 'activación', id: 'f', s: 2 }),
      arr('sum', 'f', { c: 'orange', s: 2, t: 'Net' }),
      box(690, 195, 80, 60, 'y', { shape: 'circle', c: 'green', fs: 24, id: 'y', s: 3 }),
      arr('f', 'y', { c: 'green', s: 3 }),
      table(20, 380, 760, undefined, [['dendritas → entradas', 'sinapsis → pesos', 'núcleo → suma', 'axón → salida']], { rh: 46, fs: 15, s: 4 }),
    ], [
      'Una neurona artificial recibe **entradas**, x1, x2, x3.',
      'Cada entrada se multiplica por su **peso** y se suman, más el **bias**: eso es la **función de suma**, Net.',
      'A Net se le aplica la **función de activación**, no lineal, como un escalón o una sigmoide. Ojo, que en el final preguntaron justamente esto: lo que aplica la no linealidad es la **activación**, no la suma.',
      'El resultado es la **salida**. Aprender es **modificar los pesos**.',
      'La analogía biológica: dendritas son las entradas, sinapsis los pesos, el núcleo procesa y el axón es la salida. Las capas de entrada y salida están siempre; las **ocultas son opcionales**.',
    ]),
  ],
  f8: [
    scene([
      head('Perceptrón: separa con una RECTA'),
      plot(40, 55, 330, 300, [0, 1.3], [0, 1.3], { ticks: false, xl: 'x1', yl: 'x2',
        dots: [{ x: 0, y: 0, c: 'red' }, { x: 1, y: 0, c: 'red' }, { x: 0, y: 1, c: 'red' }, { x: 1, y: 1, c: 'green', t: '1' }],
        fns: [{ f: '1.5-x', c: 'yellow', s: 1 }],
      }),
      txt(205, 385, 'AND: separable ✔', { b: true, fs: 19, c: 'green', s: 1 }),
      plot(430, 55, 330, 300, [0, 1.3], [0, 1.3], { ticks: false, xl: 'x1', yl: 'x2', s: 2,
        dots: [{ x: 0, y: 0, c: 'red' }, { x: 1, y: 1, c: 'red' }, { x: 1, y: 0, c: 'green', t: '1' }, { x: 0, y: 1, c: 'green', t: '1' }],
      }),
      txt(595, 385, 'XOR: ninguna recta sirve ✘', { b: true, fs: 19, c: 'red', s: 2 }),
      box(100, 405, 600, 40, 'Aprende: w ← w + α · error · x · Multicapa → no separables y más de 2 clases', { c: 'purple', fs: 15, s: 3 }),
    ], [
      'El **perceptrón** clasifica en **dos clases** trazando una **recta** que las separa: una función discriminante lineal. Para el AND, el único punto verde es (1, 1).',
      'Una recta lo separa del resto: el AND es **linealmente separable** y el perceptrón lo aprende.',
      'En el **XOR**, los verdes están en diagonales opuestas: **ninguna recta** los separa. El perceptrón simple no puede.',
      'Aprende por **corrección del error**: cada peso suma alfa por error por su entrada, hasta una pasada sin errores. Para problemas no separables o más de dos clases está el **perceptrón multicapa**.',
    ]),
  ],
  f9: [
    scene([
      head('Algoritmo genético: una generación'),
      bits(30, 75, 340, ['1', '0', '1', '1', '0', '0', '1', '0'].map((t) => ({ t, c: 'blue' as const })), { h: 44, fs: 20, mono: true, title: 'padre A (cromosoma, cada bit es un gen)' }),
      bits(430, 75, 340, ['0', '1', '1', '0', '1', '1', '0', '1'].map((t) => ({ t, c: 'orange' as const })), { h: 44, fs: 20, mono: true, title: 'padre B' }),
      txt(400, 165, 'SELECCIÓN: los más aptos según el fitness', { b: true, fs: 18, c: 'yellow' }),
      bits(230, 220, 340, ['1', '0', '1', '1', '1', '1', '0', '1'].map((t, i) => ({ t, c: i < 4 ? 'blue' as const : 'orange' as const })), { h: 44, fs: 20, mono: true, title: 'CRUCE: hijo = mitad de cada uno', s: 1 }),
      bits(230, 320, 340, ['1', '0', '1', '1', '1', '0', '0', '1'].map((t, i) => ({ t, c: i === 5 ? 'red' as const : i < 4 ? 'blue' as const : 'orange' as const })), { h: 44, fs: 20, mono: true, title: 'MUTACIÓN: un gen al azar (baja probabilidad)', s: 2 }),
      txt(400, 420, 'mutación → DIVERSIDAD, evita estancarse en óptimos locales', { b: true, fs: 18, c: 'red', s: 3 }),
    ], [
      'Los **algoritmos genéticos** imitan a Darwin: una **población** de soluciones evoluciona. Cada solución es un **cromosoma**, un vector de **genes**, y la **función de fitness** mide qué tan buena es. Se **seleccionan** los más aptos como padres.',
      'El **cruce** mezcla los genes de los padres: el hijo puede salir mejor, igual o peor.',
      'La **mutación** cambia algún gen al azar, con baja probabilidad.',
      'Su función es aportar **diversidad** y evitar el **estancamiento** en óptimos locales: es la palabra que piden completar en el final. No garantiza mejora. El reemplazo puede ser destructivo, solo hijos, o constructivo, los mejores de padres e hijos.',
    ]),
  ],
  f10: [
    scene([
      head('Memético = evolutivo + búsqueda local'),
      plot(40, 55, 500, 300, [0, 10], [0, 10], { ticks: false, xl: 'solución', yl: 'fitness',
        fns: [{ f: '5+2.5*sin(x*1.3)+1.5*sin(x*3.1)', c: 'blue' }],
        dots: [{ x: 1.5, y: 6.2, c: 'orange' }, { x: 4, y: 3.5, c: 'orange' }, { x: 6.2, y: 6.5, c: 'orange' }, { x: 8.7, y: 3.9, c: 'orange' }, { x: 6.55, y: 8.4, c: 'green', t: 'refinada', s: 2 }],
      }),
      box(560, 60, 220, 100, 'EXPLORACIÓN global: el evolutivo', { c: 'orange', fs: 17, s: 1 }),
      box(560, 175, 220, 100, 'EXPLOTACIÓN: la búsqueda local refina', { c: 'green', fs: 17, s: 2 }),
      box(560, 290, 220, 140, 'Lamarck: se hereda lo aprendido · Baldwin: solo el fitness', { c: 'purple', fs: 16, s: 3 }),
      txt(290, 400, 'Riesgo: convergencia prematura → preservar diversidad', { b: true, fs: 17, c: 'red', s: 4 }),
    ], [
      'Un **meme**, según Dawkins, es una unidad de información cultural. Un **algoritmo memético** combina un evolutivo con **búsqueda local**.',
      'El evolutivo hace bien la **exploración**: tira soluciones por todo el espacio.',
      'La **búsqueda local** hace la **explotación**: toma una buena solución y la refina hasta su pico. Esa es la diferencia con los evolutivos puros, un verdadero o falso del final.',
      'Dos variantes: **Lamarck**, donde lo aprendido se hereda y el individuo se reemplaza por su mejor vecino; y **Baldwin**, donde solo se hereda el **fitness**.',
      'El riesgo es la **convergencia prematura**, que la búsqueda local agrava: hay que preservar la diversidad.',
    ]),
  ],
  f11: [
    scene([
      head('Agente: percibe y actúa'),
      ico(400, 230, 'cpu', { t: 'agente', c: 'purple', size: 90, id: 'ag' }),
      ico(110, 230, 'globe', { t: 'ambiente', c: 'green', size: 90, id: 'amb' }),
      arr('amb', 'ag', { c: 'cyan', t: 'sensores (percepción)', bend: -70, s: 1 }),
      arr('ag', 'amb', { c: 'orange', bend: -70, s: 1 }), txt(255, 335, 'efectores (acción)', { b: true, fs: 19, c: 'orange', s: 1 }),
      box(560, 55, 220, 85, 'Racional: maximiza su rendimiento (no es omnisciente)', { c: 'purple', fs: 15, s: 2 }),
      box(560, 150, 220, 75, 'Autónomo: depende de su experiencia', { c: 'blue', fs: 15, s: 2 }),
      box(560, 235, 220, 85, 'Reactivo: estímulo → respuesta · Inteligente: razona y planifica', { c: 'yellow', fs: 14, s: 3 }),
      box(560, 330, 220, 100, 'Multiagente: se comunican (informar, pedir, aceptar)', { c: 'pink', fs: 15, s: 4 }),
    ], [
      'Un **agente** está en un **ambiente**.',
      'Lo percibe con **sensores** y actúa sobre él con **efectores**. Si es un programa, se llama softbot.',
      'Es **racional** si hace lo que maximiza su rendimiento según lo que percibe y sabe: no es omnisciente. Es **autónomo** si su accionar depende de su propia experiencia.',
      'Un agente **reactivo** responde directamente a estímulos; uno **inteligente** decide de forma razonada y planifica, con técnicas de IA.',
      'En un sistema **multiagente**, varios agentes se comunican intencionalmente.',
    ]),
  ],
  f12: [
    scene([
      head('Automatización ⊃ robótica'),
      box(40, 55, 420, 360, '', { shape: 'circle', c: 'blue' }), txt(250, 110, 'AUTOMATIZACIÓN', { b: true, fs: 22, c: 'blue' }),
      txt(250, 140, 'procesos SIN intervención humana', { fs: 16, c: 'blue' }),
      box(140, 180, 220, 200, '', { shape: 'circle', c: 'orange', s: 1 }), txt(250, 260, 'ROBÓTICA', { b: true, fs: 22, c: 'orange', s: 1 }),
      txt(250, 290, 'caso más específico', { fs: 15, c: 'orange', s: 1 }),
      box(500, 60, 280, 110, 'Robot = hardware (cuerpo, actuadores, sensores) + software (cerebro)', { c: 'orange', fs: 16, s: 2 }),
      box(500, 190, 280, 100, 'SCARA: brazo rápido casi en un plano, para recoger y colocar', { c: 'purple', fs: 16, s: 3 }),
      box(500, 310, 280, 110, 'V/F del final: la frase que define a la robótica como "sin intervención humana" es FALSA', { c: 'red', fs: 15, s: 4 }),
    ], [
      'La **automatización** es lo más amplio: procesos que se ejecutan **sin intervención humana**, con aplicaciones y máquinas.',
      'La **robótica** es un caso **más específico** dentro de la automatización.',
      'Un **robot** es una máquina controlada por software: hardware, con cuerpo, actuadores y sensores, y software, que hace de cerebro.',
      'Se clasifican por finalidad, por generación y por tipo de brazo: el **SCARA** se mueve casi en un plano, rápido, para recoger y colocar.',
      'En el final de diciembre 2025 dieron una afirmación que define a la **robótica** como "procesos sin intervención humana". Es **falsa**: eso define a la **automatización**.',
    ]),
  ],
};

export const EX_SCENES: Record<string, VisScene[]> = {
  'fia-e1': [
    scene([
      head('Amplitud vs profundidad (meta F)'),
      tree(20, 60, 360, 260, SEARCH_TREE({ A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 }, 'blue'), { fs: 20 }),
      bits(400, 90, 380, ['A', 'B', 'C', 'D', 'E', 'F'].map((t, i) => ({ t, c: i === 5 ? 'green' as const : 'blue' as const })), { h: 50, fs: 22, title: 'AMPLITUD', s: 1 }),
      bits(400, 200, 380, ['A', 'B', 'D', 'E', 'C', 'F'].map((t, i) => ({ t, c: i === 5 ? 'green' as const : 'orange' as const })), { h: 50, fs: 22, title: 'PROFUNDIDAD', s: 2 }),
      box(400, 290, 380, 130, 'Si la rama de B fuera infinita, profundidad nunca llegaría a F → no es completa', { c: 'red', fs: 17, s: 3 }),
    ], [
      'Árbol: A con hijos B y C; B con D y E; C con F y G. La meta es F.',
      '**Amplitud**: nivel por nivel. A, B, C, después D, E y **F**. Encuentra el camino más corto, A, C, F.',
      '**Profundidad**: rama izquierda hasta el fondo. A, B, D, E, y recién ahí C y **F**.',
      'Acá los dos llegan, pero si la rama de B fuera infinita, profundidad **nunca** llegaría a F. Por eso **no es completa**.',
    ]),
  ],
  'fia-e2': [
    scene([
      head('Un paso de aprendizaje del perceptrón'),
      box(30, 60, 740, 70, 'w1 = 0,5 · w2 = −0,2 · bias = 0 · entrada (1, 1) · deseada 0 · α = 0,1', { c: 'white', fs: 18 }),
      box(30, 155, 360, 70, 'Net = 0,5 − 0,2 = 0,3 ≥ 0 → salida 1', { c: 'orange', fs: 18, s: 1 }),
      box(410, 155, 360, 70, 'error = 0 − 1 = −1', { c: 'red', fs: 22, s: 2 }),
      bars(80, 260, 640, 130, [{ t: 'w1: 0,5 → 0,4', v: 0.4, c: 'blue' }, { t: 'w2: −0,2 → −0,3', v: 0.3, c: 'orange' }, { t: 'bias: 0 → −0,1', v: 0.1, c: 'purple' }], { s: 3, max: 0.5 }),
      txt(400, 438, 'w ← w + α · error · x (con x = 1 en las tres)', { b: true, fs: 17, c: 'yellow', s: 3 }),
    ], [
      'Pesos 0,5 y menos 0,2, bias 0. Entra el par (1, 1) y la salida deseada es 0. Tasa de aprendizaje 0,1.',
      'Net: 0,5 por 1 más menos 0,2 por 1: **0,3**. Como es mayor o igual a 0, la salida es **1**.',
      'El error es deseada menos obtenida: 0 menos 1, **menos 1**.',
      'Cada peso suma alfa por error por su entrada: menos 0,1. w1 queda **0,4**, w2 **menos 0,3** y el bias **menos 0,1**. Se repite hasta una pasada sin errores.',
    ]),
  ],
};
