/**
 * PyE · 2º parcial y recuperatorio del 16/11 resueltos, con los comentarios reales de la corrección.
 * Enunciados resumidos con palabras propias. Las respuestas modelo siguen el formato que pide la cátedra:
 * cada cálculo escrito, variables nombradas y una conclusión en términos del problema.
 */
import type { VisScene } from '../../vis/types';
import { arr, box, head, plot, scene, table, txt } from '../visual/h';

export interface SolvedItem {
  id: string;
  exam: 'parcial' | 'recu';
  n: number;
  title: string;
  points: [number, number];
  prompt: string;
  mine: string;
  comment: string;
  lost: string;
  /** Respuesta modelo, en el orden de los subítems, lista para escribir en el editor. */
  model: string[];
  /** Lo que la corrección mira en este tipo de consigna. */
  checklist: string[];
  /** Aclaración honesta cuando la corrección no deja cerrada la respuesta. */
  note?: string;
  scene: VisScene;
}

const sc = (items: Parameters<typeof scene>[0], say: string[]): VisScene => scene(items, say, 600, 440);
const t9 = '0.3880*pow(1+x*x/9,-5)';
const t6 = '0.3827*pow(1+x*x/6,-3.5)';

/** Reglas que se desprenden de los comentarios de la corrección (parcial y recu). */
export const RULES: { rule: string; cost: string }[] = [
  { rule: '**Escribí cada cálculo**, aunque el número te parezca obvio: EM = A/2, p̂ = LS − EM, gl = (f−1)(c−1), t = (x̄ − μ₀)/(s/√n).', cost: 'Recu P1: números bien, sin cálculo y con un dato incoherente → 0/20.' },
  { rule: '**Todo tiene que ser coherente.** Si escribís EM = 0,08 y después usás 0,04, el ítem entero vale 0.', cost: 'Recu P1.' },
  { rule: '**Una población = un solo parámetro μ.** H₀: μ ≥ 6,7 · H₁: μ < 6,7. El 5,9 es **x̄** (estadístico), no otra μ. Nada de "μ₀ y μ₁".', cost: 'Parcial P4 y Recu P3.' },
  { rule: '**Nombrá la prueba exacta**: Z de diferencia de proporciones, t apareadas, Levene + Student/Welch, χ² de independencia, χ² de bondad de ajuste.', cost: 'Recu P4: "chi cuadrado independiente" donde iba diferencia de proporciones; "independientes" donde iba apareadas; "homogénea" donde iba bondad de ajuste.' },
  { rule: '**Independientes o apareadas se decide por el diseño**, nunca por la normalidad: ¿son unidades distintas o las mismas medidas dos veces?', cost: 'Parcial P2 ("la distribución normal no indica que son independientes") y Recu P4b.' },
  { rule: 'En dos poblaciones escribí **variable dependiente, factor y niveles**. Si faltan, el ítem vale 0.', cost: 'Parcial P2.' },
  { rule: 'Con muestras independientes, **primero Levene** (H₀: σ₁² = σ₂²) y recién después Student o Welch.', cost: 'Parcial P2b.' },
  { rule: '**Las hipótesis nombran las variables del problema**, completas. "Hay relación entre frecuencia e interacción" no alcanza.', cost: 'Parcial P3a.' },
  { rule: '**Siempre concluí**: p vs α → decisión sobre H₀ → frase en el contexto. Sin conclusión no hay puntos.', cost: 'Parcial P3c ("no concluye") y Recu P4a (conclusión invertida).' },
  { rule: 'Del valor p decí **qué probabilidad es**: p = P(T₉ ≤ −1,5058) = 0,0832, y cuánto vale el estadístico.', cost: 'Parcial P4b.' },
  { rule: 'R²: "el X % de las variaciones de **Y** (la que se predice) se explican por las variaciones de **X**". No al revés.', cost: 'Recu P2c.' },
  { rule: 'Si la consigna dice "completar con el número de la opción", **poné el número**.', cost: 'Recu P2.' },
  { rule: '**α ↓ → confianza ↑ → z ↑ → EM ↑ → menos precisión.** Para ganar precisión sin perder confianza hay que aumentar n.', cost: 'Parcial P5b.' },
];

export const SOLVED: SolvedItem[] = [
  {
    id: 'p1', exam: 'parcial', n: 1, title: 'Regresión lineal con salida de Jamovi', points: [12, 24],
    prompt: 'Tiempo de entrenamiento de un modelo (minutos) según la cantidad de datos (miles de registros, entre 7 y 20). Jamovi: constante 2,3507; pendiente 5,1809; R = 0,9577; R² = 0,9171. Completar: a) por cada aumento en 1… se espera que…; b) ¿buen o mal modelo para pronosticar?; c) ¿tiene sentido el intercepto? ¿es confiable?',
    mine: 'a) "Por cada mil registros, el modelo tarda 2,350 minutos" (usaste el intercepto como pendiente). b) bueno porque |r| = 0,95 > 0,7. c) no tiene sentido porque no puede tardar 2,35 minutos con 0 datos.',
    comment: 'a) mal · b) bien · c) "en realidad es el tiempo de entrenamiento"',
    lost: 'Confundiste **intercepto** (fila "Constante") con **pendiente** (fila de la variable). En c) faltó leer el intercepto como lo que es (un tiempo de entrenamiento estimado) y discutir si es confiable según el rango.',
    model: [
      'a) Recta estimada: ŷ = 2,3507 + 5,1809·x. Por cada aumento en **1 mil registros** se espera que el **tiempo de entrenamiento aumente en promedio 5,1809 minutos** (b = 5,1809 > 0).',
      'b) Es un **buen** modelo para pronosticar porque r = 0,9577 indica una asociación lineal positiva muy intensa (|r| ≥ 0,7) y R² = 0,9171: el 91,71 % de las variaciones del tiempo de entrenamiento se explican por las variaciones de la cantidad de registros. Sirve para pronosticar **dentro del rango observado** (7 a 20 mil registros).',
      'c) **Sí** se puede interpretar: a = 2,3507 minutos sería el tiempo de entrenamiento estimado cuando x = 0 registros. Pero **no es confiable**, porque x = 0 está fuera del rango de los datos (7 a 20 mil): es una extrapolación.',
    ],
    checklist: ['Pendiente con unidades de Y por unidad de X', 'r y R² con su interpretación', 'Rango observado de X', 'Intercepto: qué representa y si es extrapolación'],
    note: 'La corrección no dejó la respuesta completa de c). Lo de arriba es la lectura coherente con el comentario ("es el tiempo de entrenamiento"): el intercepto se interpreta, pero no es confiable por estar fuera del rango.',
    scene: sc([
      head('ŷ = 2,3507 + 5,1809·x'),
      plot(60, 50, 500, 300, [0, 22], [0, 120], { fns: [{ f: '2.3507+5.1809*x', c: 'blue' }], vl: [{ x: 7, t: '7', c: 'gray' }, { x: 20, t: '20', c: 'gray' }], dots: [{ x: 10, y: 54.16, c: 'green', s: 1 }, { x: 11, y: 59.34, c: 'green', s: 1 }, { x: 0, y: 2.35, t: 'a = 2,35', c: 'red', s: 3 }], xl: 'miles de registros', yl: 'minutos', xt: 5, yt: 40 }),
      txt(300, 385, '+1 mil registros → +5,18 min (pendiente)', { fs: 16, b: true, c: 'green', s: 1 }),
      txt(300, 385, 'R = 0,9577 · R² = 91,71 %: buen modelo', { fs: 16, b: true, c: 'blue', s: 2, out: 3 }),
      txt(300, 410, 'x = 0 está fuera de [7; 20] → extrapolación, no confiable', { fs: 15, b: true, c: 'red', s: 3 }),
    ], [
      'En Jamovi, la fila **Constante** es el intercepto **a = 2,3507** y la fila de la variable es la pendiente **b = 5,1809**. La recta es ŷ = 2,3507 + 5,1809·x, y los datos van de 7 a 20 mil registros.',
      'La **pendiente** es lo que cambia Y cuando X aumenta 1 unidad: por cada mil registros más, el tiempo de entrenamiento aumenta en promedio **5,1809 minutos**. Siempre con las unidades de las dos variables.',
      'R = 0,9577 (asociación muy intensa) y R² = 0,9171: el 91,71 % de las variaciones del **tiempo** se explican por las de la **cantidad de registros**. Por eso es un buen modelo para pronosticar dentro del rango.',
      'El **intercepto** es el tiempo estimado para x = 0. Como 0 está fuera del rango observado, usarlo es extrapolar: se puede leer, pero **no es confiable**.',
    ]),
  },
  {
    id: 'p2', exam: 'parcial', n: 2, title: 'Dos medias independientes: variables, Levene e hipótesis', points: [14, 24],
    prompt: 'Dos muestras de sensores: una calibrada con el método tradicional y otra con un método automatizado. Se quiere saber si el automatizado produce **menor** error de medición. Errores normales. a) Tipo de prueba con variable dependiente, factor y niveles. b) Hipótesis de todas las pruebas necesarias.',
    mine: 'a) "Dos independientes" porque se supone normalidad; definiste μT y μA. b) H₀: μT ≤ μA, H₁: μT > μA. Sin Levene.',
    comment: 'a) "¿de qué variable o factor depende el error de medición? la distribución normal no indica que son independientes" · b) "Debe realizarse primero la prueba de homogeneidad de las varianzas"',
    lost: 'No escribiste **factor y niveles**, justificaste la independencia con la **normalidad** (es por el diseño) y faltaron las hipótesis de **Levene**.',
    model: [
      'a) Variable dependiente (cuantitativa): **error de medición del sensor**. Factor (variable independiente cualitativa): **método de calibración**, con dos niveles: **tradicional** y **automatizado**. Son dos grupos **distintos** de sensores, entonces las muestras son **independientes** (por el diseño, no por la normalidad). Como se supone normalidad, corresponde la **prueba t para dos medias independientes**, previa prueba de **Levene** de homogeneidad de varianzas: si no se rechaza, t de Student (varianzas iguales); si se rechaza, Welch.',
      'b) Levene: H₀: σ²_A = σ²_T · H₁: σ²_A ≠ σ²_T.',
      'Medias: H₀: μ_A ≥ μ_T · H₁: μ_A < μ_T, donde μ_A y μ_T son los errores medios de medición con el método automatizado y con el tradicional.',
    ],
    checklist: ['Variable dependiente', 'Factor con sus niveles', 'Independencia justificada por el diseño', 'Normalidad (dada o Shapiro-Wilk)', 'Hipótesis de Levene', 'Student o Welch según Levene', 'Hipótesis de medias con la dirección correcta'],
    scene: sc([
      head('Qué hay que escribir, en orden'),
      box(15, 45, 280, 75, 'VD: error de medición', { c: 'blue', fs: 16, sub: 'cuantitativa' }),
      box(305, 45, 280, 75, 'Factor: método', { c: 'purple', fs: 16, sub: 'niveles: tradicional · automatizado' }),
      box(15, 140, 570, 60, 'Grupos DISTINTOS de sensores → independientes (diseño)', { c: 'green', fs: 16, s: 1 }),
      box(15, 220, 570, 60, 'Levene · H₀: σ²_A = σ²_T  ·  H₁: σ²_A ≠ σ²_T', { c: 'orange', fs: 16, id: 'lv', s: 2 }),
      box(15, 300, 280, 55, 'no rechaza → Student', { c: 'cyan', fs: 15, id: 'st', s: 2 }),
      box(305, 300, 280, 55, 'rechaza → Welch', { c: 'cyan', fs: 15, id: 'we', s: 2 }),
      arr('lv', 'st', { s: 2 }), arr('lv', 'we', { s: 2 }),
      box(15, 370, 570, 60, 'H₀: μ_A ≥ μ_T  ·  H₁: μ_A < μ_T', { c: 'red', fs: 18, s: 3 }),
    ], [
      'Arrancá identificando las variables: la **dependiente** es lo que se mide (error de medición) y el **factor** es lo que define los grupos (método de calibración), con sus **dos niveles**.',
      'El tipo de muestra sale del **diseño**: son sensores distintos en cada grupo, así que son **independientes**. Si fueran los mismos sensores medidos con los dos métodos, serían apareadas. La normalidad es un supuesto aparte.',
      'Con muestras independientes, **primero Levene**: si no rechazás la igualdad de varianzas, usás Student; si la rechazás, Welch.',
      'Recién al final, las hipótesis de medias. "El automatizado produce **menor** error" va en **H₁**: μ_A < μ_T.',
    ]),
  },
  {
    id: 'p3', exam: 'parcial', n: 3, title: 'Chi-cuadrado de independencia', points: [2, 10],
    prompt: '300 usuarios. Frecuencia de publicación en redes (nunca; 1–2 por mes; 1 por semana; 2 o más por semana) y tipo de interacción con publicaciones de otras cuentas (no interactúa, comparte, reacciona, comenta, otros). a) H₁. b) gl con cálculo. c) Mínimo nivel de significación 0,07: conclusión al 5 %.',
    mine: 'a) H₀ y H₁ genéricas ("relación entre frecuencia e interacción"). b) gl = (4−1)(5−1) = 12. c) sin responder.',
    comment: 'a) "¿cuál es la hipótesis alternativa? ¿H0 o H1? ¿qué frecuencia? no es la interacción, ¿cuáles son las variables?" · b) bien · c) "no concluye"',
    lost: 'Pedía **solo H₁** y con las variables completas. Y c) quedó en blanco: un subítem sin responder vale 0.',
    model: [
      'a) H₁: **la frecuencia con que los usuarios publican contenido en redes sociales y el tipo de interacción que realizan con publicaciones de otras cuentas están asociados** (no son independientes).',
      'b) Tabla de 4 filas (frecuencia) × 5 columnas (interacción): ν = (f − 1)(c − 1) = (4 − 1)(5 − 1) = 3 · 4 = **12**.',
      'c) El mínimo nivel de significación es el valor p: p = 0,07. Como p = 0,07 > α = 0,05, **no se rechaza H₀**. Con un nivel de significación del 5 % **no hay evidencia suficiente** para concluir que la frecuencia de publicación y el tipo de interacción estén asociados.',
    ],
    checklist: ['H₁ con las dos variables nombradas completas', 'gl = (f−1)(c−1) con la cuenta', '"Mínimo nivel de significación" = p', 'p vs α → decisión → conclusión en contexto', 'No rechazar H₀ ≠ demostrar independencia'],
    scene: sc([
      head('χ² de independencia'),
      table(15, 45, 570, ['', 'no int.', 'comparte', 'reacciona', 'comenta', 'otros'], [['nunca', '', '', '', '', ''], ['1–2/mes', '', '', '', '', ''], ['1/semana', '', '', '', '', ''], ['2+/semana', '', '', '', '', '']], { fs: 13, rh: 34 }),
      txt(300, 230, 'ν = (4 − 1)(5 − 1) = 12', { fs: 20, b: true, c: 'blue', s: 1 }),
      box(15, 260, 570, 70, 'H₁: la frecuencia de publicación y el tipo de interacción con publicaciones ajenas están asociados', { c: 'purple', fs: 15, s: 2 }),
      box(15, 345, 570, 80, 'p = 0,07 > α = 0,05 → no se rechaza H₀: no hay evidencia suficiente de asociación al 5 %', { c: 'orange', fs: 15, s: 3 }),
    ], [
      'Dos variables cualitativas medidas sobre los mismos 300 usuarios: una tabla de contingencia de **4 filas por 5 columnas**. Es una prueba **χ² de independencia**.',
      'Grados de libertad: (filas − 1)(columnas − 1) = 3 · 4 = **12**. Escribí la cuenta.',
      'H₁ es la que afirma la **asociación**, nombrando las dos variables completas. H₀ dice que son independientes.',
      '"Mínimo nivel de significación" es otra forma de decir **valor p**. Si p = 0,07 > 0,05, no se rechaza H₀. Y **siempre** terminá con la frase en contexto.',
    ]),
  },
  {
    id: 'p4', exam: 'parcial', n: 4, title: 't de Student para una media', points: [12, 24],
    prompt: '¿El consumo medio de RAM del nuevo algoritmo es inferior a 6,7 GB por tarea? n = 10, x̄ = 5,9 GB, s = 1,68 GB. a) Hipótesis. b) Con la salida de Jamovi: valor p, qué probabilidad es y conclusión al 5 %. c) Error posible.',
    mine: 'a) "μ₀ = 6,7 y μ₁ = 5,9", H₀: μ₁ ≥ μ₀. b) gl = 9, p = 0,0832 > 0,05, no rechaza. c) error tipo II.',
    comment: 'a) "Mal, no hay dos parámetros u; 5,9 no es un parámetro. Es una prueba para una población" · b) "¿y qué probabilidad representa el pv? ¿cuánto vale el estadístico tm?" · c) bien',
    lost: 'Convertiste x̄ en un parámetro. En b) faltó **calcular t** y escribir la probabilidad: p = P(T₉ ≤ t).',
    model: [
      'a) μ: consumo medio poblacional de RAM por tarea con el nuevo algoritmo. H₀: μ ≥ 6,7 GB · H₁: μ < 6,7 GB.',
      'b) σ desconocido, n = 10 y población normal → t de Student con ν = n − 1 = 9. t = (x̄ − μ₀)/(s/√n) = (5,9 − 6,7)/(1,68/√10) = −0,8/0,5313 = **−1,5058**. Como H₁ es "<", la cola es izquierda: **p = P(T₉ ≤ −1,5058) = 0,0832**. Es la probabilidad de obtener un estadístico igual o menor que −1,5058 si H₀ fuera cierta (μ = 6,7). Como p = 0,0832 > α = 0,05, **no se rechaza H₀**: con un 5 % de significación no hay evidencia suficiente para afirmar que el nuevo algoritmo redujo el consumo medio de RAM por debajo de 6,7 GB. (El enunciado también menciona α = 0,04: la decisión es la misma.)',
      'c) Como no se rechazó H₀, puede cometerse un **error de tipo II**: concluir que no hay evidencia de reducción cuando en realidad el consumo medio sí es menor a 6,7 GB.',
    ],
    checklist: ['Un solo μ, definido en palabras', 'μ₀ en las hipótesis; x̄ solo en el estadístico', 't con la fórmula reemplazada', 'gl = n − 1', 'p escrita como probabilidad con su cola', 'Decisión y conclusión en contexto', 'Error tipo I o II según la decisión'],
    scene: sc([
      head('H₀: μ ≥ 6,7  ·  H₁: μ < 6,7'),
      txt(300, 62, 't = (5,9 − 6,7) / (1,68/√10) = −1,5058   ·   ν = 9', { fs: 17, b: true, c: 'blue', s: 1 }),
      plot(60, 90, 500, 250, [-4, 4], [0, 0.42], { fns: [{ f: t9, c: 'blue', area: [-4, -1.5058], s: 2 }], vl: [{ x: -1.5058, t: '−1,51', c: 'orange', s: 2 }], xl: 't', xt: 2, yt: 0.2 }),
      txt(300, 375, 'p = P(T₉ ≤ −1,5058) = 0,0832', { fs: 18, b: true, c: 'orange', s: 2 }),
      txt(300, 410, '0,0832 > 0,05 → no se rechaza H₀ · posible error tipo II', { fs: 16, b: true, c: 'red', s: 3 }),
    ], [
      'Es **una sola población**, así que hay un solo parámetro: μ, el consumo medio de RAM. 6,7 es el valor de referencia μ₀ y va en las hipótesis. El 5,9 es **x̄**: un dato de la muestra.',
      'Con σ desconocido usás t: reemplazás en la fórmula y obtenés **t = −1,5058** con ν = 9 grados de libertad.',
      'H₁ dice "<", entonces el valor p es el **área a la izquierda** de t: p = P(T₉ ≤ −1,5058) = 0,0832. En la tabla de Jamovi elegís df = 9 y "P(X ≤ x1)".',
      'Como p > α, no rechazás H₀. Al no rechazar, el error que podés cometer es el de **tipo II**.',
    ]),
  },
  {
    id: 'p5', exam: 'parcial', n: 5, title: 'Intervalo de confianza para una proporción (V/F)', points: [8, 18],
    prompt: 'La proporción de módulos sin errores críticos está entre 0,82 y 0,88. V/F justificando: a) p̂ = 0,85. b) Para ganar precisión se disminuyó el riesgo manteniendo el tamaño de la muestra.',
    mine: 'a) Verdadero, p̂ = (0,82 + 0,88)/2 = 0,85. b) Verdadero, "más precisa pero menos confiable".',
    comment: 'a) bien · b) "mal, si alpha disminuye, la confianza aumenta, entonces menos preciso"',
    lost: 'En b) invertiste la relación: bajar el riesgo α **aumenta** la confianza y **ensancha** el intervalo.',
    model: [
      'a) **Verdadero.** El intervalo es simétrico alrededor de p̂: p̂ = (LI + LS)/2 = (0,82 + 0,88)/2 = 0,85, y EM = LS − p̂ = 0,88 − 0,85 = 0,03.',
      'b) **Falso.** Disminuir el riesgo α aumenta el nivel de confianza (1 − α), entonces aumenta z, aumenta el error muestral EM = z·√(p̂q̂/n) y el intervalo es **más ancho: menos preciso**. Para ganar precisión manteniendo la confianza hay que **aumentar n**.',
    ],
    checklist: ['V o F explícito', 'Cálculo de p̂ y EM con signo correcto', 'Cadena α → confianza → z → EM → precisión', 'En las falsas, señalar el error y corregirlo'],
    scene: sc([
      head('IC: [0,82 ; 0,88]'),
      box(40, 70, 520, 8, '', { c: 'blue', solid: true }),
      txt(40, 110, '0,82', { fs: 18, b: true }), txt(300, 110, 'p̂ = 0,85', { fs: 18, b: true, c: 'green', s: 1 }), txt(560, 110, '0,88', { fs: 18, b: true }),
      txt(170, 55, 'EM = 0,03', { fs: 15, c: 'orange', s: 1 }), txt(430, 55, 'EM = 0,03', { fs: 15, c: 'orange', s: 1 }),
      ...['α ↓', 'confianza ↑', 'z ↑', 'EM ↑', 'menos precisión'].map((t, i) => box(15 + i * 117, 190, 107, 70, t, { c: i === 4 ? 'red' : 'purple', fs: 15, id: `c${i}`, s: 2 })),
      ...[0, 1, 2, 3].map((i) => arr(`c${i}`, `c${i + 1}`, { s: 2 })),
      box(15, 300, 570, 110, 'Para ganar precisión sin perder confianza: aumentar n (EM = z·√(p̂q̂/n))', { c: 'green', fs: 17, s: 3 }),
    ], [
      'El intervalo de una proporción es simétrico: p̂ está justo en el medio.',
      'p̂ = (0,82 + 0,88)/2 = **0,85** y EM = 0,88 − 0,85 = **0,03**. Escribí las dos cuentas.',
      'Bajar el riesgo α sube la confianza, y con ella z: el intervalo se **ensancha** y pierde precisión. Por eso b) es **falsa**.',
      'La única forma de ganar precisión sin bajar la confianza es **aumentar el tamaño de la muestra**.',
    ]),
  },
  {
    id: 'r1', exam: 'recu', n: 1, title: 'IC de una proporción: límites y error muestral', points: [0, 20],
    prompt: 'IC para el porcentaje de usuarios con autenticación en dos factores: n = 420, confianza 96 %, amplitud 0,08. a) Si LS = 0,41, ¿cuánto valen el valor muestral y el límite inferior? b) Misma confianza y menor n: ¿el error muestral es mayor o menor a 0,04?',
    mine: 'a) p̂ = 0,37 y LI = 0,33, "dado que la amplitud es 0,08 (A = 2·EM), por lo cual EM = 0,08". b) mayor a 0,04.',
    comment: '"¿cómo calculás el valor muestral? No envías cálculo, no lo explicás. EM = 0,04"',
    lost: 'Los números eran correctos, pero **no escribiste las cuentas** y pusiste **EM = 0,08** (incoherente con A = 2·EM). La consigna avisaba que todo debía ser coherente: el ítem entero quedó en 0.',
    model: [
      'a) A = 2·EM → EM = A/2 = 0,08/2 = **0,04**. Valor muestral: p̂ = LS − EM = 0,41 − 0,04 = **0,37**. Límite inferior: LI = p̂ − EM = 0,37 − 0,04 = **0,33**. IC = [0,33 ; 0,41].',
      'b) EM = z·√(p̂·q̂/n). Con la misma confianza (z fijo), si n disminuye, √(p̂q̂/n) aumenta: el error muestral es **mayor a 0,04**.',
    ],
    checklist: ['EM = A/2 escrito', 'p̂ = LS − EM escrito', 'LI = p̂ − EM escrito', 'Coherencia entre todos los números', 'Justificar b) con la fórmula de EM'],
    scene: sc([
      head('Amplitud 0,08 → EM = 0,04'),
      box(40, 80, 520, 8, '', { c: 'blue', solid: true }),
      txt(40, 120, 'LI = 0,33', { fs: 17, b: true, c: 'gray', s: 2 }), txt(300, 120, 'p̂ = 0,37', { fs: 17, b: true, c: 'green', s: 1 }), txt(560, 120, 'LS = 0,41', { fs: 17, b: true }),
      txt(300, 60, 'A = 2·EM = 0,08  →  EM = 0,08/2 = 0,04', { fs: 16, b: true, c: 'orange' }),
      txt(300, 175, 'p̂ = LS − EM = 0,41 − 0,04 = 0,37', { fs: 17, c: 'green', b: true, s: 1 }),
      txt(300, 210, 'LI = p̂ − EM = 0,37 − 0,04 = 0,33', { fs: 17, c: 'gray', b: true, s: 2 }),
      box(15, 260, 570, 80, 'n ↓ con z fijo → √(p̂q̂/n) ↑ → EM > 0,04', { c: 'purple', fs: 18, s: 3 }),
      box(15, 355, 570, 70, 'Sin estas cuentas escritas, el ítem vale 0', { c: 'red', fs: 17, s: 4 }),
    ], [
      'Primer dato que se saca: la amplitud es el doble del error muestral, así que **EM = 0,08/2 = 0,04**.',
      'El valor muestral está en el centro: **p̂ = LS − EM = 0,37**.',
      'Y el límite inferior, a la misma distancia: **LI = p̂ − EM = 0,33**.',
      'Si baja n y la confianza se mantiene, el error muestral **crece**: queda mayor a 0,04.',
      'Llegaste a los números correctos, pero sin cuentas y con EM = 0,08 escrito la profe lo calificó con 0. **Escribí cada paso.**',
    ]),
  },
  {
    id: 'r2', exam: 'recu', n: 2, title: 'Regresión: r, intercepto y R² (por número de opción)', points: [15, 25],
    prompt: 'Tiempo de detección de amenazas (s) según la cantidad de procesos de análisis simultáneos (entre 3 y 7). ŷ = 13,45 − 0,78x; R² = 0,82. Completar **con el número de la opción**: a) r y tipo de asociación; b) intercepto y si tiene sentido; c) el …% de las variaciones de … se explica por las variaciones de …',
    mine: 'a) −0,9055, intensa inversa. b) 13,45, no tiene sentido. c) "El 82 % de las variaciones en la cantidad de procesos se explican por… 90,55". Escribiste textos en vez de números.',
    comment: '"Tenés que poner los números de las opciones correctas" · c) mal',
    lost: 'No respetaste el formato (números de opción) y en c) **invertiste las variables**: lo que se explica es Y (tiempo de detección).',
    model: [
      'a) **2 y 6.** r = −√R² = −√0,82 = −0,9055 (negativo porque la pendiente es −0,78 < 0): asociación lineal intensa e inversa.',
      'b) **1 y 3.** a = 13,45; x = 0 procesos de análisis no tiene sentido en esta situación (sin procesos no hay detección) y además está fuera del rango 3 a 7.',
      'c) **1, 5 y 6.** El 82 % de las variaciones en el tiempo de detección de amenazas se explica por las variaciones en la cantidad de procesos de análisis que se ejecutan simultáneamente.',
    ],
    checklist: ['Responder con números si lo pide', 'Signo de r = signo de la pendiente', 'r = ±√R²', 'R²: varía Y, explicada por X', 'Intercepto: sentido y rango'],
    note: 'En b) la corrección no marcó error en "no tiene sentido". Criterio para decidir: si x = 0 es imposible o absurdo en el contexto → "no tiene sentido"; si es posible pero queda fuera del rango → "tiene sentido, pero no es confiable" (como en el parcial).',
    scene: sc([
      head('ŷ = 13,45 − 0,78·x  ·  R² = 0,82'),
      txt(300, 75, 'r = −√0,82 = −0,9055', { fs: 22, b: true, c: 'blue' }),
      txt(300, 105, 'signo de la pendiente (−0,78) → inversa e intensa', { fs: 15, c: 'blue' }),
      box(15, 135, 570, 60, 'a) opciones 2 y 6', { c: 'blue', fs: 18, solid: true }),
      box(15, 215, 570, 60, 'b) a = 13,45 → opciones 1 y 3', { c: 'purple', fs: 18, solid: true, s: 1 }),
      box(15, 295, 570, 130, 'c) 82 % (1) de las variaciones del TIEMPO DE DETECCIÓN (5) se explican por las de la CANTIDAD DE PROCESOS (6)', { c: 'green', fs: 17, s: 2 }),
    ], [
      'r tiene el **signo de la pendiente**: como b = −0,78, r = −√0,82 = −0,9055. Es una asociación lineal intensa e **inversa**. Opciones **2 y 6**.',
      'El intercepto es 13,45 (opción 1). Con 0 procesos de análisis no tiene sentido hablar de detectar una amenaza (opción 3).',
      'R² siempre se lee igual: el % de las variaciones de **Y** (lo que se predice) se explica por las variaciones de **X**. Acá Y es el tiempo de detección: opciones **1, 5 y 6**.',
    ]),
  },
  {
    id: 'r3', exam: 'recu', n: 3, title: 'α, β, potencia y t para una media', points: [20, 27],
    prompt: 'Copias de seguridad en la nube: piloto en 7 equipos; se implementa si el tiempo medio de recuperación es inferior a 45 s. P(implementar | μ ≥ 45) = 0,03; P(no implementar | μ = 40) = 0,05. Normalidad. a) Hipótesis, α, β y potencia en términos del problema. b) Valor muestral −1,824: ¿qué aconsejás con un error del 4 %? Justificar la probabilidad elegida.',
    mine: 'a) "μ₀ = 45", H₀: μ₁ ≥ μ₀ · H₁: μ₁ < μ₀, α = 0,03, β = 0,05, potencia 95 %. b) t, cola izquierda, p = 0,059 > 0,04, no rechaza.',
    comment: 'a) "No hay u1 y u0, es solo u"',
    lost: 'Otra vez **dos μ** para una sola población. El resto estaba bien encaminado.',
    model: [
      'a) μ: tiempo medio de recuperación de datos con el nuevo sistema. H₀: μ ≥ 45 s · H₁: μ < 45 s. **α = 0,03** = P(rechazar H₀ | H₀ verdadera) = P(implementar el sistema cuando μ ≥ 45 s). **β = 0,05** = P(no rechazar H₀ | μ = 40 s) = P(no implementar cuando μ = 40 s). **Potencia = 1 − β = 0,95**: probabilidad de implementar el sistema cuando el tiempo medio de recuperación es de 40 segundos.',
      'b) Población normal, n = 7 y σ desconocido → t de Student con ν = n − 1 = 6 (por eso no se usa la tabla z). H₁ es "<", cola izquierda: **p = P(T₆ < −1,824) = 0,059**. Como p = 0,059 > α = 0,04, **no se rechaza H₀**: no hay evidencia suficiente de que el tiempo medio de recuperación sea inferior a 45 s. Se aconseja **no implementar** el sistema por ahora.',
    ],
    checklist: ['Un solo μ definido', 'α y β traducidos al problema', 'Potencia = 1 − β con el valor de μ que corresponde (40 s)', 'Por qué t y no z', 'Cola según H₁', 'Consejo concreto a la empresa'],
    scene: sc([
      head('H₀: μ ≥ 45  ·  H₁: μ < 45'),
      table(15, 40, 570, ['', 'μ ≥ 45 (H₀ cierta)', 'μ = 40 (H₀ falsa)'], [['implementa (rechaza H₀)', 'α = 0,03 · tipo I', 'potencia = 0,95'], ['no implementa', '0,97', 'β = 0,05 · tipo II']], { fs: 14, rh: 44 }),
      plot(60, 190, 500, 170, [-4, 4], [0, 0.42], { fns: [{ f: t6, c: 'blue', area: [-4, -1.824], s: 1 }], vl: [{ x: -1.824, t: '−1,824', c: 'orange', s: 1 }], xl: 't (ν = 6)', xt: 2, yt: 0.2, s: 1 }),
      txt(300, 395, 'p = P(T₆ < −1,824) = 0,059 > 0,04', { fs: 17, b: true, c: 'orange', s: 1 }),
      txt(300, 425, 'no se rechaza H₀ → aconsejar no implementar', { fs: 16, b: true, c: 'red', s: 2 }),
    ], [
      'Armá la tabla de decisión: **α** es implementar cuando no corresponde (μ ≥ 45) y **β** es no implementar cuando μ = 40. La **potencia** (1 − β = 0,95) es implementar cuando μ = 40.',
      'σ desconocido, n = 7 y población normal: **t con 6 gl**. H₁ "<" → cola izquierda: p = P(T₆ < −1,824) = 0,059.',
      'Como 0,059 > 0,04, no se rechaza H₀. El consejo a la empresa: **no implementar**, porque no hay evidencia de que cumpla el requisito.',
    ]),
  },
  {
    id: 'r4', exam: 'recu', n: 4, title: 'Elegir la prueba: proporciones, apareadas y bondad de ajuste', points: [5, 28],
    prompt: 'a) 50 empleados de Informática y 50 de otras áreas: ¿el porcentaje con capacitación en ciberataques es mayor en Informática? Mínimo nivel de significación 0,05; concluir al 3 %. b) 10 servidores medidos con la configuración de firewall habitual y con la nueva: ¿el tiempo de respuesta es menor con la nueva? Normalidad. c) Calificaciones de una app (4 categorías), 50 usuarios: ¿cambiaron respecto del patrón histórico?',
    mine: 'a) "distribución independiente en chi cuadrado" y concluiste que sí es superior. b) "muestras independientes" con Levene. c) "distribución homogénea", gl = 3.',
    comment: 'a) "mal, diferencia de proporciones" · b) "Mal, son muestras apareadas" · c) "mal, bondad de ajuste"',
    lost: 'Los tres errores son de **reconocer la prueba**. Además, en a) concluiste lo contrario: p = 0,05 > 0,03 → no se rechaza H₀.',
    model: [
      'a) H₁: **p_I > p_O** (la proporción de empleados que recibió capacitación en prevención de ciberataques es mayor en Informática que en otras áreas). Prueba de **diferencia de proporciones**: se usa la distribución **normal (Z)**. El mínimo nivel de significación es el valor p = 0,05; como 0,05 > α = 0,03, **no se rechaza H₀**: con un 3 % de significación no hay evidencia suficiente para concluir que el porcentaje de capacitados sea superior en Informática.',
      'b) i) Prueba **t para muestras apareadas** (dependientes): los **mismos 10 servidores** se miden con las dos configuraciones. Se estudia la variable **tiempo de respuesta (ms)**, dependiente de la **configuración del firewall**, con niveles **habitual** y **nueva**. (No corresponde Levene: se analizan las diferencias D = habitual − nueva, que se suponen normales.)',
      'b) ii) H₁: **μ_D > 0**, con D = tiempo con la configuración habitual − tiempo con la nueva (equivale a μ_habitual > μ_nueva).',
      'c) Prueba **χ² de bondad de ajuste** (compara la distribución observada con el patrón histórico). Distribución **χ²** con ν = k − 1 = 4 − 1 = **3** grados de libertad.',
    ],
    checklist: ['Proporciones de dos grupos → Z de diferencia de proporciones', 'Mismas unidades dos veces → apareadas', 'Una variable contra un patrón → bondad de ajuste', 'Dos variables en una tabla → independencia', 'Conclusión con p vs α del enunciado'],
    scene: sc([
      head('¿Qué prueba corresponde?'),
      box(15, 45, 360, 70, '¿Comparás proporciones (%) de dos grupos?', { c: 'yellow', fs: 15, id: 'q1' }),
      box(410, 45, 175, 70, 'Z · diferencia de proporciones', { c: 'blue', fs: 14, solid: true, id: 'a1' }),
      arr('q1', 'a1', { t: 'sí' }),
      box(15, 150, 360, 70, '¿Medias de las MISMAS unidades medidas dos veces?', { c: 'yellow', fs: 15, id: 'q2', s: 1 }),
      box(410, 150, 175, 70, 't apareadas (sin Levene)', { c: 'green', fs: 14, solid: true, id: 'a2', s: 1 }),
      arr('q2', 'a2', { t: 'sí', s: 1 }),
      box(15, 255, 360, 70, '¿Una variable cualitativa contra un patrón?', { c: 'yellow', fs: 15, id: 'q3', s: 2 }),
      box(410, 255, 175, 70, 'χ² bondad de ajuste · ν = k − 1', { c: 'orange', fs: 14, solid: true, id: 'a3', s: 2 }),
      arr('q3', 'a3', { t: 'sí', s: 2 }),
      box(15, 360, 360, 65, '¿Dos variables cualitativas en una tabla?', { c: 'yellow', fs: 15, id: 'q4', s: 3 }),
      box(410, 360, 175, 65, 'χ² independencia · (f−1)(c−1)', { c: 'purple', fs: 14, solid: true, id: 'a4', s: 3 }),
      arr('q4', 'a4', { t: 'sí', s: 3 }),
    ], [
      'a) Se compara el **porcentaje** de capacitados en dos grupos: es una **diferencia de proporciones** con distribución normal (Z). No es χ². Y con p = 0,05 > 0,03 **no** se rechaza H₀.',
      'b) Son **los mismos 10 servidores** medidos con las dos configuraciones: muestras **apareadas**. Se trabaja con las diferencias, sin Levene.',
      'c) Una sola variable (la calificación) comparada con un **patrón histórico**: **bondad de ajuste**, con ν = 4 − 1 = 3.',
      'Y si tuvieras dos variables cualitativas cruzadas en una tabla, como en el parcial, sería **χ² de independencia**.',
    ]),
  },
];
