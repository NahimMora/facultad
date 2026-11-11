import { POCKET } from '../cheatsheets';
import type { Question, SubjectContent, TheoryBlock, WorkedExercise } from '../types';
import { VIDEOS } from '../videos/sd1';
import { EX_SCENES, SCENES } from '../visual/sd1';
import { FINAL_EXERCISES, FINAL_SCENES } from '../visual/sd1-final';
import { REVIEW_LESSONS, REVIEW_QUESTIONS } from '../visual/sd1-repaso';

/** SD I · final. Redacción propia sobre los apuntes de la cátedra, las autoevaluaciones y los temas de final (Drive). */
const F = 'temas de final de la cátedra (Drive de estudiantes)';
const A = 'autoevaluación de la cátedra';

const theory: TheoryBlock[] = [
  { id: 's1', module: 't1', title: 'Numeración y aritmética binaria', points: [
    'Conversión: decimal → base b por divisiones sucesivas; base b → decimal por suma de potencias. Hexadecimal: cada dígito = 4 bits (16₁₀ = 10₁₆).',
    '**Complemento a 1**: invertir todos los bits. Tiene **dos ceros** (0000 y 1111) y el carry final **se suma** al resultado (end-around carry).',
    '**Complemento a 2**: invertir y sumar 1. Un solo cero; el carry final **se descarta**. Rango con n bits: **−2ⁿ⁻¹ … 2ⁿ⁻¹ − 1** (4 bits: −8 a 7).',
    'Restar = sumar el complemento a 2 del sustraendo. El bit más significativo es el **signo** (1 = negativo).',
    '**Overflow**: sumar dos positivos da negativo (o dos negativos da positivo). En el circuito: V = C₍ₙ₋₁₎ ⊕ Cₙ.',
  ], trap: 'En complemento a 2 el carry final **no** indica error: se descarta. El error es el **overflow**.' },
  { id: 's2', module: 't2', title: 'Compuertas y álgebra de Boole', points: [
    'AND (·), OR (+), NOT (\'), **NAND** y **NOR** (universales: con una sola de ellas se arma cualquier circuito), **XOR** (A ⊕ B = A\'B + AB\': 1 si son distintas), XNOR.',
    '**De Morgan**: (A · B)\' = A\' + B\' · (A + B)\' = A\' · B\'.',
    'Absorción: A + A·B = A · A + A\'·B = A + B. Distributiva "rara": A + B·C = (A + B)(A + C).',
  ], trap: 'A·B + C **no** es igual a A·B + A·C (no se distribuye así). Y la barra larga sobre A·B **no** es igual a A\'·B\' (es A\' + B\').' },
  { id: 's3', module: 't3', title: 'Funciones lógicas y formas canónicas', points: [
    '**1ª forma canónica (SOP)**: suma de **minitérminos** (los 1 de la tabla). Cada término tiene **todas** las variables. Numérica: Σm(…).',
    '**2ª forma canónica (POS)**: producto de **maxitérminos** (los 0 de la tabla). Numérica: ΠM(…).',
    'Estandarizar: a cada término le falta una variable X → multiplicar por (X + X\').',
    'En el final: diagrama lógico **inicial** (tal cual la expresión), tabla de verdad **con columnas parciales**, y diagrama **final** después de simplificar.',
  ] },
  { id: 's4', module: 't4', title: 'Mapas de Karnaugh', points: [
    'Las celdas siguen **código Gray** (00, 01, 11, 10): celdas vecinas difieren en un solo bit; los bordes también son vecinos.',
    'Agrupar **1** en rectángulos de **1, 2, 4, 8 o 16** celdas, lo más grandes posible, con la menor cantidad de grupos. Se pueden superponer.',
    'Cada grupo da un producto con las variables que **no cambian** dentro del grupo. Grupo de 2ᵏ celdas elimina k variables.',
    'Condiciones **no importa** (X): se usan como 1 solo si agrandan un grupo.',
  ] },
  { id: 's5', module: 't5', title: 'Hardware digital', points: [
    'Familias **TTL** (bipolar) y **CMOS** (bajo consumo estático).',
    '**Fan-out**: cuántas entradas puede manejar una salida. **Margen de ruido**: cuánto ruido tolera sin cambiar el nivel lógico. **Retardo de propagación**: tiempo de entrada a salida.',
    '**Tri-state**: salida 0, 1 o alta impedancia (para compartir buses). **Colector abierto**: necesita resistencia de pull-up.',
  ] },
  { id: 's6', module: 't6', title: 'Circuitos combinatorios y aritméticos', points: [
    '**Decodificador** n → 2ⁿ: activa una sola salida según el código. **Codificador**: lo inverso.',
    '**Multiplexor** 2ⁿ:1: n entradas de selección eligen qué entrada pasa a la salida. **Demultiplexor**: lo inverso.',
    'MUX 16:1 con MUX 4:1: **5 MUX** (4 en el primer nivel con S1 S0, 1 en el segundo con S3 S2). Con decodificador: 4 MUX 4:1 con **enable** manejados por un decodificador 2→4 (S3 S2) y salidas unidas con OR.',
    '**Semisumador**: S = A ⊕ B, C = A·B. **Sumador completo**: S = A ⊕ B ⊕ Cᵢₙ, Cₒᵤₜ = A·B + Cᵢₙ(A ⊕ B).',
    '**Sumador/restador**: entrada de control M; cada bit de B pasa por un **XOR con M** y M entra como **Cᵢₙ**. M = 0 suma; M = 1 resta (complemento a 2 de B).',
  ], trap: 'En el sumador/restador, con M = 1 el XOR invierte B (complemento a 1) y el **Cᵢₙ = 1** completa el +1: así se obtiene el complemento a 2 sin otro circuito.' },
  { id: 's7', module: 't7', title: 'Biestables (latches y flip-flops)', points: [
    '**Latch SR** con NOR: S = 1 pone Q = 1, R = 1 pone Q = 0, S = R = 0 mantiene, **S = R = 1 prohibido**.',
    'El **flip-flop** cambia solo en el **flanco** del reloj (ascendente o descendente); el latch, mientras el enable está activo.',
    '**D**: Q toma el valor de D en el flanco. **T**: si T = 1 **cambia** (toggle), si T = 0 mantiene. **JK**: 00 mantiene, 10 pone 1, 01 pone 0, **11 cambia**.',
  ], table: { head: ['FF', 'Entradas', 'Q siguiente'], rows: [['D', 'D', 'D'], ['T', 'T = 0 / 1', 'Q / Q\''], ['JK', '00 · 10 · 01 · 11', 'Q · 1 · 0 · Q\'']] } },
  { id: 's8', module: 't8', title: 'Contadores y máquinas de estado', points: [
    'Diseño: **diagrama de estados** → **tabla de diseño** (estado actual, siguiente, entradas de los FF) → ecuaciones (Karnaugh) → esquema.',
    '**Contador ascendente 0–7 con FF T (síncrono)**: T₀ = 1, T₁ = Q₀, T₂ = Q₀·Q₁ (un bit cambia cuando todos los de abajo están en 1).',
    '**Descendente**: un bit cambia cuando todos los de abajo están en **0**: T₀ = 1, T₁ = Q₀\', T₂ = Q₀\'·Q₁\'. Para que **se detenga** en 0 se multiplica cada T por (Q₂ + Q₁ + Q₀).',
    '**Moore**: la salida depende solo del estado. **Mealy**: del estado **y** de las entradas.',
  ] },
];

const q: Question[] = [
  { id: 'sd1-01', module: 't1', type: 'mcq', prompt: 'En complemento a 2 (6 bits): 100111 + 001101 = ¿en decimal?', options: ['−12', '52', '12', '−25'], answer: 0, explain: '100111 = −25 y 001101 = 13 → −12. En binario: 110100 (signo 1, negativo: invertir y sumar 1 da 001100 = 12).', source: A },
  { id: 'sd1-02', module: 't1', type: 'mcq', prompt: '16₁₀ en hexadecimal es:', options: ['10', '16', 'F', '1F'], answer: 0, explain: '16 = 1·16 + 0 → 10₁₆.', source: A },
  { id: 'sd1-03', module: 't1', type: 'tf', prompt: 'En complemento a 1, el carry final se suma al resultado.', answer: true, explain: 'Es el **end-around carry**. En complemento a 2, en cambio, se descarta.', source: A },
  { id: 'sd1-04', module: 't1', type: 'tf', prompt: 'En complemento a 1, el cero es único.', answer: false, explain: 'Hay +0 (0000) y −0 (1111). Por eso se prefiere el complemento a 2.', source: A },
  { id: 'sd1-05', module: 't1', type: 'mcq', prompt: 'Rango de un número en complemento a 2 con 4 bits:', options: ['−8 a 7', '−7 a 7', '0 a 15', '−8 a 8'], answer: 0, explain: 'Con n bits el rango es −2ⁿ⁻¹ … 2ⁿ⁻¹ − 1: con 4 bits, −8 a 7.' },
  { id: 'sd1-06', module: 't1', type: 'mcq', prompt: 'Hay overflow al sumar en complemento a 2 cuando:', options: ['Dos números del mismo signo dan un resultado de signo opuesto', 'Hay carry final', 'El resultado es negativo', 'Se suman un positivo y un negativo'], answer: 0, explain: 'El carry final no importa; el overflow es el cambio de signo imposible (V = Cₙ₋₁ ⊕ Cₙ).' },
  { id: 'sd1-07', module: 't2', type: 'mcq', prompt: 'Por De Morgan, (A · B)\' es igual a:', options: ['A\' + B\'', 'A\' · B\'', 'A + B', '(A + B)\''], answer: 0, explain: 'Negar un producto = sumar las negaciones.' },
  { id: 'sd1-08', module: 't2', type: 'tf', prompt: 'A · B + C = A · B + A · C.', answer: false, explain: 'Esa "distribución" no existe. La que sí vale es A + B·C = (A + B)(A + C).', source: A },
  { id: 'sd1-09', module: 't2', type: 'mcq', prompt: 'La expresión A\'·B + A·B\' corresponde a:', options: ['XOR', 'XNOR', 'NAND', 'OR'], answer: 0, explain: 'Vale 1 cuando A y B son distintas.' },
  { id: 'sd1-10', module: 't2', type: 'mcq', prompt: 'Se llaman compuertas universales a:', options: ['NAND y NOR', 'AND y OR', 'XOR y XNOR', 'NOT'], answer: 0, explain: 'Con solo NAND (o solo NOR) se arma cualquier función.' },
  { id: 'sd1-11', module: 't2', type: 'mcq', prompt: 'A + A\'·B se simplifica a:', options: ['A + B', 'A', 'B', 'A·B'], answer: 0, explain: 'Absorción: A + A\'B = (A + A\')(A + B) = A + B.' },
  { id: 'sd1-12', module: 't3', type: 'mcq', prompt: 'A\' + B\'A + C\'BA (C peso 4, B peso 2, A peso 1) en forma canónica numérica es:', options: ['Σm(0, 1, 2, 3, 4, 5, 6)', 'Σm(7)', 'Σm(1, 3, 5, 7)', 'Σm(0, 2, 4, 6)'], answer: 0, explain: 'A\' + AB\' = A\' + B\'; sumando ABC\' queda A\' + B\' + C\' = (ABC)\': vale 0 **solo** en 111. Es todo menos el 7.', source: F },
  { id: 'sd1-13', module: 't3', type: 'mcq', prompt: 'La 1ª forma canónica (SOP) se arma con:', options: ['Los minitérminos donde la función vale 1', 'Los maxitérminos donde vale 0', 'Solo las variables negadas', 'Los términos simplificados'], answer: 0, explain: 'SOP = suma de minitérminos (Σm). POS = producto de maxitérminos (ΠM) con los 0.' },
  { id: 'sd1-14', module: 't3', type: 'mcq', prompt: 'Para estandarizar el término A·B en una función de A, B, C se lo multiplica por:', options: ['(C + C\')', 'C', 'C\'', '(A + B)'], answer: 0, explain: 'C + C\' = 1 no cambia la función y agrega la variable faltante: A·B·C + A·B·C\'.' },
  { id: 'sd1-15', module: 't4', type: 'mcq', prompt: 'En un mapa de Karnaugh, las filas y columnas se ordenan:', options: ['En código Gray (00, 01, 11, 10)', 'En binario natural (00, 01, 10, 11)', 'Por cantidad de unos', 'Al azar'], answer: 0, explain: 'Así las celdas vecinas difieren en un solo bit y se pueden agrupar.' },
  { id: 'sd1-16', module: 't4', type: 'mcq', prompt: 'Un grupo de 4 celdas en un mapa de 4 variables da un término de:', options: ['2 variables', '4 variables', '1 variable', '3 variables'], answer: 0, explain: 'Un grupo de 2ᵏ celdas elimina k variables: 4 = 2² → quedan 4 − 2 = 2.' },
  { id: 'sd1-17', module: 't4', type: 'mcq', prompt: 'Σm(2, 3, 4, 5, 6, 7, 12, 13, 15) en variables D C B A se simplifica a:', options: ['D\'B + CB\' + CA', 'D\'C + D\'B + DC', 'C + D\'B', 'D\'B + CB\''], answer: 0, explain: 'D\'B (2, 3, 6, 7) + CB\' (4, 5, 12, 13) + CA (5, 7, 13, 15). Sin CA queda afuera el 15.', source: F },
  { id: 'sd1-18', module: 't4', type: 'tf', prompt: 'Las condiciones "no importa" deben incluirse siempre en algún grupo.', answer: false, explain: 'Se usan como 1 solo si ayudan a agrandar un grupo; si no, se dejan afuera.' },
  { id: 'sd1-19', module: 't5', type: 'mcq', prompt: 'El fan-out de una compuerta es:', options: ['La cantidad de entradas que puede manejar su salida', 'El tiempo de propagación', 'El ruido que tolera', 'Su consumo'], answer: 0, explain: 'Margen de ruido y retardo son otros parámetros.' },
  { id: 'sd1-20', module: 't5', type: 'mcq', prompt: 'Una salida tri-state permite:', options: ['Estado de alta impedancia para compartir un bus', 'Tres niveles de tensión lógicos', 'Más velocidad', 'Menor consumo'], answer: 0, explain: '0, 1 o desconectada (Z).' },
  { id: 'sd1-21', module: 't6', type: 'mcq', prompt: '¿Cuántos MUX 4:1 hacen falta para un MUX 16:1 (sin decodificador)?', options: ['5', '4', '8', '16'], answer: 0, explain: '4 en el primer nivel (16 entradas) + 1 que elige entre sus 4 salidas.', source: F },
  { id: 'sd1-22', module: 't6', type: 'mcq', prompt: 'Un decodificador de 3 entradas tiene:', options: ['8 salidas', '3 salidas', '6 salidas', '9 salidas'], answer: 0, explain: 'Un decodificador de n entradas tiene 2ⁿ salidas: 2³ = 8.' },
  { id: 'sd1-23', module: 't6', type: 'mcq', prompt: 'En el sumador/restador con M = 1:', options: ['B pasa invertido por los XOR y Cᵢₙ = 1: se suma el complemento a 2 de B', 'Se suma A + B', 'Se invierte A', 'Se apaga el circuito'], answer: 0, explain: 'XOR con 1 invierte; el Cᵢₙ = 1 agrega el +1.' },
  { id: 'sd1-24', module: 't6', type: 'mcq', prompt: '3 − 5 con un sumador/restador de 4 bits da:', options: ['1110 (−2), sin overflow', '0010 (2)', '1110 con overflow', '1000 (−8)'], answer: 0, explain: '0011 + 1010 + 1 = 1110 → −2. Cₙ = 0, Cₙ₋₁ = 0 → V = 0.', source: F },
  { id: 'sd1-25', module: 't6', type: 'mcq', prompt: 'La salida de carry de un sumador completo es:', options: ['A·B + Cᵢₙ·(A ⊕ B)', 'A ⊕ B ⊕ Cᵢₙ', 'A + B', 'A·B·Cᵢₙ'], answer: 0, explain: 'A ⊕ B ⊕ Cᵢₙ es la **suma**.' },
  { id: 'sd1-26', module: 't7', type: 'mcq', prompt: 'En un flip-flop JK, J = K = 1 en el flanco activo:', options: ['Q cambia (toggle)', 'Q = 1', 'Q = 0', 'Estado prohibido'], answer: 0, explain: 'El JK resuelve el estado prohibido del SR: con 11 invierte.' },
  { id: 'sd1-27', module: 't7', type: 'mcq', prompt: 'En un latch SR con compuertas NOR, la combinación prohibida es:', options: ['S = R = 1', 'S = R = 0', 'S = 1, R = 0', 'S = 0, R = 1'], answer: 0, explain: 'Forzaría Q y Q\' al mismo valor.' },
  { id: 'sd1-28', module: 't7', type: 'tf', prompt: 'Un flip-flop D de flanco descendente copia D en Q cuando el reloj pasa de 1 a 0.', answer: true, explain: 'Flanco descendente = transición 1 → 0. Entre flancos, Q se mantiene aunque D cambie.' },
  { id: 'sd1-29', module: 't8', type: 'mcq', prompt: 'Contador síncrono ascendente 0–7 con FF T. La entrada T₂ es:', options: ['Q₀ · Q₁', 'Q₀', '1', 'Q₀\' · Q₁\''], answer: 0, explain: 'Un bit cambia cuando todos los inferiores están en 1. (Q₀\'·Q₁\' sería para el descendente).', source: F },
  { id: 'sd1-30', module: 't8', type: 'mcq', prompt: 'En una máquina de Moore, la salida depende de:', options: ['Solo el estado actual', 'El estado y las entradas', 'Solo las entradas', 'El reloj'], answer: 0, explain: 'En Mealy depende del estado **y** de las entradas.' },
];

const ex: WorkedExercise[] = [
  { id: 'sd1-e1', module: 't4', title: 'Final · simplificar con Karnaugh', statement: 'F = D\'C\'BA\' + D\'CB\'A + D\'CBA\' + D\'C\'BA + DCB\'A\' + DCB\'A + D\'CBA + D\'CB\'A\' + DCBA.', steps: [
    { title: 'Canónica numérica', body: 'Con D C B A (pesos 8, 4, 2, 1): Σm(2, 3, 4, 5, 6, 7, 12, 13, 15).' },
    { title: 'Grupos', body: 'D\'B → 2, 3, 6, 7 · CB\' → 4, 5, 12, 13 · CA → 5, 7, 13, 15.' },
    { title: 'Resultado', body: 'F = D\'B + CB\' + CA (3 AND de 2 entradas + 1 OR de 3 entradas).' },
  ] },
  { id: 'sd1-e2', module: 't6', title: 'Final · sumador/restador: 3 − 5', statement: 'Con un sumador/restador de 4 bits, calcular 3 − 5 indicando el estado de cada entrada y salida.', steps: [
    { title: 'Entradas', body: 'A = 0011 · B = 0101 · M = 1 (restar) → los XOR entregan B\' = 1010 y Cᵢₙ = 1.' },
    { title: 'Suma bit a bit', body: 'bit0: 1 + 0 + 1 = 0, carry 1 · bit1: 1 + 1 + 1 = 1, carry 1 · bit2: 0 + 0 + 1 = 1, carry 0 · bit3: 0 + 1 + 0 = 1, carry 0.' },
    { title: 'Salidas', body: 'S = 1110 · C₄ = 0 · V = C₃ ⊕ C₄ = 0 (sin overflow). Signo 1 → negativo: complemento a 2 de 1110 = 0010 → **−2**.' },
  ], result: '3 − 5 = 1110₂ = −2.' },
  { id: 'sd1-e3', module: 't8', title: 'Final · contador descendente 7 → 0 que se detiene', statement: 'Contador con FF T de flanco descendente que cuente de 7 a 0 y quede detenido en 0.', steps: [
    { title: 'Diagrama', body: '7 → 6 → 5 → 4 → 3 → 2 → 1 → 0 ↺ (0 vuelve a 0).' },
    { title: 'Regla', body: 'Bajando, un bit cambia cuando todos los de abajo están en 0: T₀ = 1, T₁ = Q₀\', T₂ = Q₀\'Q₁\'.' },
    { title: 'Detener en 0', body: 'Multiplicar por (Q₂ + Q₁ + Q₀): T₀ = Q₂ + Q₁ + Q₀ · T₁ = Q₀\'(Q₂ + Q₁) · T₂ = Q₂Q₁\'Q₀\'.' },
  ] },
];

const content: SubjectContent = {
  subjectId: 'sd1', theory, questions: [...q, ...REVIEW_QUESTIONS], exercises: [...ex, ...FINAL_EXERCISES], videos: VIDEOS,
  cheatsheet: POCKET['sd1'],
};

content.theory = content.theory.map((b) => ({ ...b, scenes: SCENES[b.id] }));
content.exercises = content.exercises.map((e) => ({ ...e, scenes: EX_SCENES[e.id] ?? FINAL_SCENES[e.id] }));
content.lessons = [
  {
    id: 'sd1-clase-2', examId: 'final', title: 'Final resuelto paso a paso · siete puntos',
    summary: 'Circuito y tabla parcial, SOP, Karnaugh, resta en C2, MUX 16:1, forma de onda JK y contador ascendente cíclico.',
    intro: ['Vamos a resolver los siete puntos de un modelo de final de Sistemas Digitales I. Las figuras están redibujadas y la explicación conecta cada salida con una cuenta que puedas comprobar.', 'Usamos orden de variables de, ce, be, a en las tablas de cuatro entradas. Al llegar al flip-flop, leemos los valores del modelo únicamente en los flancos descendentes; el contador se implementa con reloj común.'],
    parts: ['ex:sd1-final-e1', 'ex:sd1-final-e2', 'ex:sd1-final-e3', 'ex:sd1-e2', 'ex:sd1-final-e5', 'ex:sd1-final-e6', 'ex:sd1-final-e7'],
    outro: ['En lógica combinatoria, comprobá que el circuito, la tabla y la expresión describan la misma función. En Karnaugh conservá solo las variables que no cambian dentro de cada grupo.', 'En la resta por complemento a dos, separá acarreo y overflow. En el multiplexor, los bits superiores eligen el grupo y los inferiores la posición. En JK, once conmuta y cero cero mantiene.', 'El contador síncrono ascendente usa te cero igual a uno, te uno igual a cu cero y te dos igual al producto de los dos bits inferiores. Repasá el paso de siete a cero para comprobar el reinicio cíclico.'],
  },
  {
    id: 'sd1-clase-1', examId: 'final', title: 'Final completo: de los bits a los contadores',
    summary: 'Complemento a 2 y overflow, compuertas y De Morgan, formas canónicas, Karnaugh, hardware, MUX y sumador/restador, flip-flops y contadores, con los ejercicios del final.',
    intro: [
      'Esta es la clase completa para el final de Sistemas Digitales I: de la numeración binaria hasta los contadores con flip-flops, con los ejercicios que toman en el final resueltos.',
      'Vamos a ver complemento a 2, compuertas, formas canónicas, Karnaugh, parámetros de hardware, multiplexores y el sumador/restador, flip-flops y contadores.',
    ],
    parts: ['s1', 's2', 's3', 's4', 'ex:sd1-e1', 's5', 's6', 'ex:sd1-e2', 's7', 's8', 'ex:sd1-e3'],
    outro: [
      'C2: invertir y sumar 1; el carry final se descarta; el error es el overflow (V = Cₙ₋₁ ⊕ Cₙ). De Morgan: (AB)’ = A’ + B’.',
      'Karnaugh en Gray: grupos de 2ᵏ, los bordes son vecinos. Sumador/restador: XOR con M y M como Cin.',
      'FF D copia en el flanco; T cambia con 1; JK 11 cambia. Contador T: un bit cambia cuando todos los de abajo están en 1 (subiendo) o en 0 (bajando).',
    ],
  },
];

content.lessons.push(...REVIEW_LESSONS);
export default content;
