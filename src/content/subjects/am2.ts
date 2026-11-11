import { POCKET } from '../cheatsheets';
import type { Question, SubjectContent, TheoryBlock, WorkedExercise } from '../types';
import { VIDEOS } from '../videos/am2';
import { EX_SCENES, SCENES } from '../visual/am2';
import { FINAL_EXERCISES, FINAL_SCENES } from '../visual/am2-final';
import { REVIEW_LESSONS, REVIEW_QUESTIONS } from '../visual/am2-repaso';

/** AM II · final. Redacción propia; ejercicios tomados de los modelos de final 2026 y resueltos acá. */
const F = 'modelos de final 2026 (Drive de estudiantes)';

const theory: TheoryBlock[] = [
  { id: 'a1', module: 'm1', title: 'Aplicación de la derivada: extremos y concavidad', points: [
    '**Puntos críticos**: f\'(x) = 0 o f\' no existe (dentro del dominio). Crece donde f\' > 0, decrece donde f\' < 0.',
    '**Criterio de la 2ª derivada**: f\'(c) = 0 y f\'\'(c) > 0 → **mínimo**; f\'\'(c) < 0 → **máximo**.',
    '**Concavidad**: f\'\' > 0 → curva hacia arriba (∪); f\'\' < 0 → curva hacia abajo (∩). Los nombres (cóncava/convexa) cambian según el libro: en el final **justificá con el signo de f\'\'**.',
    '**Punto de inflexión**: f\'\' **cambia de signo** (f\'\'(a) = 0 es condición necesaria, no suficiente). Se informa como punto (a, f(a)).',
  ], trap: 'Si f\'\' cambia de signo **dentro** del intervalo que te dan, la afirmación "tiene la misma concavidad en todo el intervalo" es **falsa**.' },
  { id: 'a2', module: 'm2', title: 'Estudio completo de funciones', points: [
    'Orden: dominio → intersecciones → asíntotas (vertical: límite infinito en un punto; horizontal u oblicua: límite en ±∞) → f\' (crecimiento y extremos) → f\'\' (concavidad e inflexión) → gráfico.',
    'Para verificar "tiene un mínimo en (a; b)": primero que **b = f(a)** (que el punto esté en la gráfica), después que f\'(a) = 0 y f\'\'(a) > 0.',
  ] },
  { id: 'a3', module: 't-lh', title: 'Límites indeterminados: regla de L\'Hôpital', points: [
    'Con **0/0 o ∞/∞**: lim f/g = lim f\'/g\' (si este existe). Se puede aplicar varias veces.',
    '**0·∞** → se reescribe como cociente. **1^∞, ∞⁰, 0⁰** → se toma logaritmo: L = e^(lim ln(…)).',
    'Truco para ln(e^(kx) + algo)/x con x → +∞: el término e^(kx) domina → el límite es **k**.',
  ], trap: 'Antes de derivar, **verificá** que sea 0/0 o ∞/∞. Se derivan numerador y denominador **por separado**, no como cociente.' },
  { id: 'a4', module: 'm4', title: 'Métodos de integración', points: [
    '**Sustitución**: buscá una función y su derivada. ∫5/(x(2 + ln x)) dx → u = 2 + ln x, du = dx/x → 5 ln|2 + ln x| + C.',
    'Con raíces: t = √x → x = t², **dx = 2t dt** (no te olvides el 2t).',
    '**Partes**: ∫u dv = uv − ∫v du (polinomio × exponencial, ln x, arcotangente…).',
    '**Fracciones simples**: cocientes de polinomios con denominador factorizable.',
  ] },
  { id: 'a5', module: 't-int', title: 'Integrales definidas, impropias y áreas', points: [
    '**Barrow**: ∫ₐᵇ f = F(b) − F(a). **Área** entre curvas: ∫ (de arriba − de abajo) entre los puntos de corte.',
    '**Impropia**: intervalo infinito o integrando no acotado **dentro** de [a, b]. Se calcula como límite: converge si da un número finito.',
    '**p-integrales**: ∫₁^∞ 1/xᵖ converge si p > 1 (vale 1/(p − 1)). ∫₀¹ 1/xᵖ converge si p < 1.',
  ], trap: 'Revisá si el denominador se anula **dentro** del intervalo: ∫₀⁸ 5x/(3x² − 27) parece de sustitución, pero 3x² − 27 = 0 en x = 3 → es impropia y **diverge**.' },
  { id: 'a6', module: 'm7', title: 'Funciones de dos variables: dominio', points: [
    'Condiciones: **raíz par** → radicando ≥ 0; **raíz par en el denominador** → radicando > 0; **ln** → argumento > 0; denominador ≠ 0.',
    'Se grafica cada frontera (recta, parábola, elipse) y se marca la región. Borde **lleno** si se incluye (≥), **punteado** si no (>).',
    '**Elipse**: 25x² + 36y² ≤ 900 ⇔ x²/36 + y²/25 ≤ 1 (semiejes 6 en x y 5 en y).',
    'Si piden el **área del dominio**, es un área entre curvas de una variable.',
  ] },
  { id: 'a7', module: 'm8', title: 'Límite doble', points: [
    'Si por dos caminos distintos (rectas y = mx, parábolas…) el límite da distinto → **no existe**.',
    'Que dé igual por varios caminos **no prueba** que exista: hace falta acotar (o pasar a polares).',
  ] },
  { id: 'a8', module: 't-der', title: 'Derivadas parciales y direccionales', points: [
    'Fₓ: derivar respecto de x tomando y como **constante**. Derivadas segundas: Fₓₓ, Fᵧᵧ, Fₓᵧ = Fᵧₓ (Schwarz).',
    'Regla de la cadena: (cos u)\' = −sin u · u\' · (e^u)\' = e^u · u\'.',
    '**Gradiente** ∇F = (Fₓ, Fᵧ). **Derivada direccional** según el versor u: D_u F = ∇F · u. Máxima en la dirección del gradiente (vale |∇F|).',
  ] },
  { id: 'a9', module: 't-ext', title: 'Extremos de funciones de dos variables', points: [
    '**Puntos críticos**: Fₓ = 0 y Fᵧ = 0 a la vez.',
    '**Hessiano** H = Fₓₓ·Fᵧᵧ − (Fₓᵧ)².',
    'H > 0 y Fₓₓ > 0 → **mínimo** · H > 0 y Fₓₓ < 0 → **máximo** · H < 0 → **punto de ensilladura** · H = 0 → el criterio no decide.',
    '**Extremos ligados** (con condición g(x, y) = 0): multiplicadores de Lagrange o despeje y sustitución.',
  ], table: { head: ['H', 'Fₓₓ', 'Conclusión'], rows: [['> 0', '> 0', 'mínimo relativo'], ['> 0', '< 0', 'máximo relativo'], ['< 0', '—', 'punto de ensilladura'], ['= 0', '—', 'no decide']] } },
];

const q: Question[] = [
  { id: 'am2-01', module: 't-lh', type: 'mcq', prompt: 'lim (x→+∞) ln(e^(6x) + 4) / x =', options: ['6', '0', '1', '+∞'], answer: 0, explain: 'ln(e^(6x)(1 + 4e^(−6x))) = 6x + ln(1 + …) → dividido x tiende a **6**. (Con L\'Hôpital: 6e^(6x)/(e^(6x) + 4) → 6).', source: F },
  { id: 'am2-02', module: 't-der', type: 'mcq', prompt: 'F(x, y) = cos(4x² − 4y) + e^(3 − 3xy). F\'\'ₓₓ(1, 1) =', options: ['−55', '−73', '55', '73'], answer: 0, explain: 'Fₓₓ = −64x²·cos(4x² − 4y) − 8·sin(4x² − 4y) + 9y²·e^(3 − 3xy). En (1, 1): cos 0 = 1, sin 0 = 0, e⁰ = 1 → −64 + 9 = **−55**.', source: F },
  { id: 'am2-03', module: 'm4', type: 'mcq', prompt: 'En ∫√(4 + √x) dx con t = √x se obtiene:', options: ['∫2t·√(4 + t) dt', '∫t·√(4 + t) dt', '∫√(4 + t) dt', '∫½t·√(4 + t) dt'], answer: 0, explain: 'x = t² → dx = **2t dt**.', source: F },
  { id: 'am2-04', module: 't-int', type: 'mcq', prompt: '∫₁^+∞ 1/x⁴ dx =', options: ['1/3', '+∞', '4', '1/5'], answer: 0, explain: '[−1/(3x³)]₁^∞ = 0 − (−1/3) = **1/3**. Converge porque p = 4 > 1.', source: F },
  { id: 'am2-05', module: 't-int', type: 'mcq', prompt: 'El área encerrada por y = x, x = 4 e y = 2 se calcula con:', options: ['∫₂⁴ (x − 2) dx', '∫₂⁴ x dx', '∫₀⁴ (x − 2) dx', '∫₀² (2 − x) dx + ∫₂⁴ (x − 2) dx'], answer: 0, explain: 'y = x corta a y = 2 en x = 2: triángulo entre x = 2 y x = 4, con y = x arriba e y = 2 abajo. Área = 2.', source: F },
  { id: 'am2-06', module: 't-int', type: 'tf', prompt: '∫₀^π 1/x⁴ dx converge.', answer: false, explain: 'Es impropia en x = 0 y ∫₀ 1/xᵖ con p = 4 ≥ 1 **diverge**.', source: 'final con respuestas (Drive)' },
  { id: 'am2-07', module: 't-int', type: 'mcq', prompt: '∫₀⁸ 5x/(3x² − 27) dx:', options: ['Diverge: el denominador se anula en x = 3, dentro del intervalo', '(5/6)·ln(165/27)', '(5/6)·ln 165', '0'], answer: 0, explain: 'La primitiva es (5/6)ln|3x² − 27|, pero en x = 3 el integrando no está acotado: se parte en dos impropias y ln → −∞. **Diverge**. Aplicar Barrow directo es el error típico.', source: 'final 2023 (Drive)' },
  { id: 'am2-08', module: 't-ext', type: 'mcq', prompt: 'F(x, y) = −3x² − 2y² + 3x − 4y + 5 tiene en (½, −1):', options: ['Un máximo relativo (vale 31/4)', 'Un mínimo relativo', 'Un punto de ensilladura', 'No es punto crítico'], answer: 0, explain: 'Fₓ = −6x + 3 = 0 → x = ½; Fᵧ = −4y − 4 = 0 → y = −1. H = (−6)(−4) − 0 = 24 > 0 y Fₓₓ < 0 → **máximo**. F(½, −1) = 7,75.', source: F },
  { id: 'am2-09', module: 't-ext', type: 'mcq', prompt: 'F(x, y) = y² − 3xy − x². En (0, 0) hay:', options: ['Un punto de ensilladura', 'Un máximo', 'Un mínimo', 'El criterio no decide'], answer: 0, explain: 'Fₓₓ = −2, Fᵧᵧ = 2, Fₓᵧ = −3 → H = −4 − 9 = −13 < 0 → **ensilladura**.', source: F },
  { id: 'am2-10', module: 't-ext', type: 'mcq', prompt: 'F(x, y) = (b + 1)x − x² − y² tiene un punto crítico en (3, 0) si b =', options: ['5', '3', '6', '−1'], answer: 0, explain: 'Fₓ = b + 1 − 2x = 0 en x = 3 → b = 5. (Y como H = 4 > 0 con Fₓₓ = −2 < 0, es un máximo).', source: F },
  { id: 'am2-11', module: 't-ext', type: 'tf', prompt: 'Si el hessiano es negativo en un punto crítico, hay un máximo relativo.', answer: false, explain: 'H < 0 → **punto de ensilladura**. Máximo es H > 0 con Fₓₓ < 0.' },
  { id: 'am2-12', module: 't-lh', type: 'mcq', prompt: 'lim (x→0) ln(e^(ax) + 2x) / ln(4x + 1) = −1 si a =', options: ['−6', '−2', '2', '−4'], answer: 0, explain: '0/0 → L\'Hôpital: [(a·e^(ax) + 2)/(e^(ax) + 2x)] / [4/(4x + 1)] → (a + 2)/4 = −1 → **a = −6**.', source: F },
  { id: 'am2-13', module: 't-lh', type: 'mcq', prompt: 'lim (x→+∞) (2x + eˣ)^(1/x) =', options: ['e', '1', '+∞', '0'], answer: 0, explain: 'Indeterminación ∞⁰: ln L = lim ln(2x + eˣ)/x = lim (2 + eˣ)/(2x + eˣ) = 1 → L = **e**.', source: F },
  { id: 'am2-14', module: 'm4', type: 'mcq', prompt: '∫ 5 / (x(2 + ln x)) dx =', options: ['5·ln|2 + ln x| + C', '5·ln|x| + C', '5/(2 + ln x) + C', '5x·ln(2 + ln x) + C'], answer: 0, explain: 'u = 2 + ln x, du = dx/x → ∫5/u du.', source: F },
  { id: 'am2-15', module: 'm1', type: 'mcq', prompt: 'f(x) = 3x⁴ − 6x³ − 36 tiene puntos de inflexión en:', options: ['(0, −36) y (1, −39)', 'x = 0 únicamente', '(1, 0)', 'No tiene'], answer: 0, explain: 'f\'\' = 36x² − 36x = 36x(x − 1): cambia de signo en 0 y en 1. f(0) = −36, f(1) = −39.', source: F },
  { id: 'am2-16', module: 'm1', type: 'tf', prompt: 'f(x) = ln(x² + 4) tiene la misma concavidad en todo (−∞; 2).', answer: false, explain: 'f\'\' = (8 − 2x²)/(x² + 4)²: cambia de signo en x = −2, que está dentro del intervalo. Es **falsa** con cualquier convención de nombres.', source: F },
  { id: 'am2-17', module: 'm2', type: 'tf', prompt: 'f(x) = e^(−x²) tiene un mínimo en (1; 0).', answer: false, explain: 'f(1) = e⁻¹ ≠ 0: el punto ni siquiera está en la gráfica. Además f\' = −2x·e^(−x²) se anula solo en x = 0, donde hay un **máximo** (0; 1).', source: F },
  { id: 'am2-18', module: 'm1', type: 'tf', prompt: 'Si f\'\'(a) = 0, entonces (a, f(a)) es un punto de inflexión.', answer: false, explain: 'Es condición **necesaria**, no suficiente: f(x) = x⁴ tiene f\'\'(0) = 0 y no tiene inflexión (no cambia el signo).', source: 'autoevaluación de la cátedra' },
  { id: 'am2-19', module: 'm7', type: 'mcq', prompt: 'Dominio de F(x, y) = e^(ln(x + y)) − √(900 − 25x² − 36y²):', options: ['x + y > 0 y x²/36 + y²/25 ≤ 1', 'x + y ≥ 0 y x²/36 + y²/25 ≥ 1', 'Todo ℝ²', 'x²/25 + y²/36 ≤ 1'], answer: 0, explain: 'ln pide x + y > 0 (recta punteada); la raíz pide 25x² + 36y² ≤ 900 → elipse con semiejes 6 y 5, borde incluido.', source: F },
  { id: 'am2-20', module: 'm7', type: 'mcq', prompt: 'En F = √(2x + 8 − y) / ⁴√(−2x² − 4 + y), la condición del denominador es:', options: ['y > 2x² + 4 (estricta, porque está en el denominador)', 'y ≥ 2x² + 4', 'y < 2x² + 4', 'Ninguna'], answer: 0, explain: 'Raíz par → radicando ≥ 0, pero en el denominador no puede ser 0 → **> 0**.', source: F },
  { id: 'am2-21', module: 'm8', type: 'tf', prompt: 'Si el límite doble da lo mismo por todas las rectas y = mx, entonces el límite existe.', answer: false, explain: 'Puede dar distinto por parábolas u otros caminos: coincidir en rectas no alcanza.' },
  { id: 'am2-22', module: 't-der', type: 'mcq', prompt: 'La derivada direccional es máxima en la dirección de:', options: ['El gradiente', 'El eje x', 'Perpendicular al gradiente', 'Cualquier dirección'], answer: 0, explain: 'D_u F = ∇F · u es máxima cuando u apunta como ∇F, y vale |∇F|.' },
];

const ex: WorkedExercise[] = [
  { id: 'am2-e1', module: 'm1', title: 'Final (A) · concavidad, inflexión e integral', statement: 'f(x) = 3x⁴ − 6x³ − 36. 1) Intervalos de concavidad y puntos de inflexión. 2) Calcular ∫₁ᵉ f\'\'\'(x)/x dx.', steps: [
    { title: 'Derivadas', body: 'f\' = 12x³ − 18x² · f\'\' = 36x² − 36x = 36x(x − 1) · f\'\'\' = 72x − 36.' },
    { title: 'Signo de f\'\'', body: '(−∞, 0): + (∪) · (0, 1): − (∩) · (1, +∞): + (∪).' },
    { title: 'Inflexión', body: 'Cambia de signo en 0 y 1 → (0, −36) y (1, −39).' },
    { title: 'Integral', body: '∫₁ᵉ (72x − 36)/x dx = ∫₁ᵉ (72 − 36/x) dx = 72(e − 1) − 36(ln e − ln 1) = **72e − 108 ≈ 87,7**.' },
  ] },
  { id: 'am2-e2', module: 'm7', title: 'Final · dominio y su área', statement: 'F(x; y) = √(2x + 8 − y) / ⁴√(−2x² − 4 + y). a) Dominio gráfico y analítico. b) Área del dominio.', steps: [
    { title: 'Condiciones', body: 'y ≤ 2x + 8 (recta, borde incluido) · y > 2x² + 4 (parábola, borde excluido).' },
    { title: 'Región', body: 'Entre la parábola (abajo) y la recta (arriba). Cortes: 2x² + 4 = 2x + 8 → x² − x − 2 = 0 → x = −1 y x = 2.' },
    { title: 'Área', body: '∫₋₁² (2x + 8 − 2x² − 4) dx = [−2x³/3 + x² + 4x]₋₁² = 20/3 − (−7/3) = **9**.' },
  ], result: 'Área del dominio = 9.' },
  { id: 'am2-e3', module: 't-ext', title: 'Final · extremos con parámetro', statement: 'F(x, y) = (b + 1)x − x² − y². Hallar b para que haya un punto crítico en (3, 0) y clasificarlo.', steps: [
    { title: 'Punto crítico', body: 'Fₓ = b + 1 − 2x = 0 en x = 3 → b = 5 · Fᵧ = −2y = 0 en y = 0 ✓.' },
    { title: 'Hessiano', body: 'Fₓₓ = −2, Fᵧᵧ = −2, Fₓᵧ = 0 → H = 4 > 0, Fₓₓ < 0 → **máximo**. F(3, 0) = 6·3 − 9 = 9.' },
  ], result: 'b = 5 · máximo relativo en (3, 0, 9).' },
  { id: 'am2-e4', module: 't-lh', title: 'Final · límite 1^∞ / ∞⁰', statement: 'Calcular lim (x→+∞) (2x + eˣ)^(1/x).', steps: [
    { title: 'Tipo', body: '∞⁰ → se toma logaritmo: ln L = lim ln(2x + eˣ) / x (∞/∞).' },
    { title: 'L\'Hôpital', body: '(2 + eˣ)/(2x + eˣ) → otra vez ∞/∞ → eˣ/(2 + eˣ) → 1.' },
    { title: 'Resultado', body: 'ln L = 1 → **L = e**.' },
  ] },
];

const content: SubjectContent = {
  subjectId: 'am2', theory, questions: [...q, ...REVIEW_QUESTIONS], exercises: [...ex, ...FINAL_EXERCISES], videos: VIDEOS,
  cheatsheet: POCKET['am2'],
};

content.theory = content.theory.map((b) => ({ ...b, scenes: SCENES[b.id] }));
content.exercises = content.exercises.map((e) => ({ ...e, scenes: EX_SCENES[e.id] ?? FINAL_SCENES[e.id] }));
content.lessons = [
  {
    id: 'am2-clase-2', examId: 'final', title: 'Final resuelto paso a paso · modelo completo',
    summary: 'Los siete incisos de un modelo: primitiva logarítmica, límite con potencia, dominio y área, ensilladura y dos V/F sobre concavidad y extremos.',
    intro: ['Vamos a resolver un modelo completo de final de Análisis Matemático II. Los gráficos están redibujados y las explicaciones son propias. Seguí cada cuenta y usá pausa antes de avanzar a la siguiente.', 'El recorrido tiene siete incisos: una integral por sustitución, un límite con potencia, un dominio con raíces y su área, un punto de ensilladura y dos afirmaciones de verdadero o falso. En cada uno buscamos una justificación que puedas reconstruir.'],
    parts: ['ex:am2-final-1', 'ex:am2-e4', 'ex:am2-final-2', 'ex:am2-e2', 'ex:am2-final-3', 'ex:am2-final-4', 'ex:am2-final-5'],
    outro: ['En las raíces, distinguí numerador y denominador: la frontera que anula el denominador queda afuera. Para el área, integrá arriba menos abajo entre los puntos de corte.', 'Un determinante hessiano negativo señala ensilladura. Para verificar extremos, primero comprobá que el punto pertenezca a la gráfica y luego analizá las derivadas. En concavidad, construí los intervalos de signo de la segunda derivada.', 'Ahora recorré los siete ejercicios en la web y respondé las preguntas del simulacro. Al corregir un error, explicá qué condición habías omitido: dominio, signo, punto crítico o comportamiento en distintas direcciones.'],
  },
  {
    id: 'am2-clase-1', examId: 'final', title: 'Final completo: una y dos variables',
    summary: 'Extremos y concavidad, estudio de funciones, L’Hôpital, integración, impropias, dominios, límite doble, gradiente y hessiano, con los ejercicios de los modelos 2026.',
    intro: [
      'Esta es la clase completa para el final de Análisis Matemático II, armada sobre los modelos de final 2026. Todo se ve en gráficos.',
      'Primero una variable: extremos, concavidad, estudio de funciones, la regla de L’Hôpital e integrales. Después dos variables: dominio, límite doble, derivadas parciales y extremos con el hessiano.',
    ],
    parts: ['a1', 'ex:am2-e1', 'a2', 'a3', 'ex:am2-e4', 'a4', 'a5', 'a6', 'ex:am2-e2', 'a7', 'a8', 'a9', 'ex:am2-e3'],
    outro: [
      "f' = 0 → críticos; f'' > 0 mínimo, f'' < 0 máximo; inflexión si f'' cambia de signo. L’Hôpital solo con 0/0 o ∞/∞.",
      'Impropias: revisá si el denominador se anula dentro del intervalo. Dominio: ≥ 0, > 0, ≠ 0; borde lleno o punteado.',
      'Dos variables: H = Fₓₓ·Fᵧᵧ − Fₓᵧ²; H > 0 y Fₓₓ > 0 mínimo, Fₓₓ < 0 máximo, H < 0 ensilladura.',
    ],
  },
];

content.lessons.push(...REVIEW_LESSONS);
export default content;
