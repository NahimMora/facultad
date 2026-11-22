import { POCKET } from '../cheatsheets';
import type { Question, SubjectContent, TheoryBlock, WorkedExercise } from '../types';
import { VIDEOS } from '../videos/pye';
import { EX_SCENES } from '../visual/pye';
import { U1_MAP, U1_QUESTIONS, U1_THEORY, U2_MAP, U2_QUESTIONS, U2_THEORY } from '../visual/pye-u1-u2';
import { U3_MAP, U3_QUESTIONS, U3_THEORY, U4_MAP, U4_QUESTIONS, U4_THEORY, U5_MAP, U5_QUESTIONS, U5_THEORY } from '../visual/pye-u3-u5';
import { U6_MAP, U6_QUESTIONS, U6_THEORY } from '../visual/pye-u6';
import { U7_MAP, U7_QUESTIONS, U7_THEORY } from '../visual/pye-u7';
import { U8_MAP, U8_QUESTIONS, U8_THEORY } from '../visual/pye-u8';
import { U9_MAP, U9_QUESTIONS, U9_THEORY } from '../visual/pye-u9';
import { FINAL_EXERCISES } from '../visual/pye-final';
import { REVIEW_LESSONS, REVIEW_QUESTIONS } from '../visual/pye-repaso';

/** PyE · recuperatorio, oral y final. Redacción propia sobre el teórico/práctico de la cátedra y los modelos de final 2022–2025. */
const F = 'modelos de final de la cátedra (Drive de estudiantes)';

const theory: TheoryBlock[] = [
  ...U1_THEORY, ...U2_THEORY, ...U3_THEORY, ...U4_THEORY, ...U5_THEORY,
  ...U6_THEORY, ...U7_THEORY, ...U8_THEORY, ...U9_THEORY,
];

const q: Question[] = [
  { id: 'pye-01', module: 'u1', type: 'mcq', prompt: 'Administración: x̄ = 2590, s = 396. Comercial: x̄ = 2915, s = 669. ¿Dónde las remuneraciones son **más heterogéneas**?', options: ['Comercial (CV ≈ 0,23 > 0,15)', 'Administración, porque tiene menor media', 'Son iguales', 'No se puede saber sin el rango'], answer: 0, explain: 'CV = s/x̄: administración 396/2590 ≈ **0,153**; comercial 669/2915 ≈ **0,229**. Mayor CV = más heterogéneo.', source: F },
  { id: 'pye-02', module: 'u1', type: 'mcq', prompt: 'P(75) = 2809,8 (miles de $) en el sector administrativo significa que:', options: ['El 75 % de los empleados cobra menos de $2.809.800', 'El 75 % cobra más de $2.809.800', 'La media es 2809,8', 'El 25 % cobra menos de esa cifra'], answer: 0, explain: 'El percentil 75 deja **por debajo** al 75 % de los datos.', source: F },
  { id: 'pye-03', module: 'u1', type: 'mcq', prompt: 'Si los valores más frecuentes están en las puntuaciones **bajas** (cola larga hacia la derecha), la distribución es:', options: ['Asimétrica positiva: Mo < Me < x̄', 'Asimétrica negativa: Mo > Me > x̄', 'Simétrica', 'Uniforme'], answer: 0, explain: 'La moda queda a la izquierda y la cola larga arrastra la media a la derecha: **asimetría positiva**, Mo < Me < x̄. (Ojo: una respuesta de los modelos de final dice "negativa" con ese mismo orden; el orden Mo < Me < x̄ corresponde a la **positiva**).', source: F },
  { id: 'pye-04', module: 'u1', type: 'mcq', prompt: 'El coeficiente de variación sirve para:', options: ['Comparar la dispersión relativa de grupos con distintas medias o unidades', 'Medir la posición central', 'Calcular percentiles', 'Probar hipótesis'], answer: 0, explain: 'CV = s/x̄ no tiene unidades: compara homogeneidad entre grupos distintos.' },
  { id: 'pye-05', module: 'u2', type: 'mcq', prompt: 'Errores independientes: respiración P = 0,27 y postura P = 0,46. ¿Probabilidad de que ocurran **ambos**?', options: ['0,1242', '0,73', '0,19', '0,5958'], answer: 0, explain: 'Independientes → P(R ∩ P) = 0,27 · 0,46 = **0,1242**. La unión es 0,27+0,46−0,1242=0,6058; 0,5958 no corresponde a esa cuenta.', source: F },
  { id: 'pye-06', module: 'u2', type: 'mcq', prompt: 'Con los mismos datos, si hubo error de respiración, ¿probabilidad de error de postura?', options: ['0,46, porque son independientes', '0,27', '0,1242', '0,46 · 0,27 / 0,46'], answer: 0, explain: 'Si son independientes, P(P / R) = **P(P)** = 0,46: saber que hubo uno no cambia la probabilidad del otro.', source: F },
  { id: 'pye-07', module: 'u2', type: 'tf', prompt: 'Dos sucesos excluyentes con probabilidad positiva son independientes.', answer: false, explain: 'Si son excluyentes, P(A ∩ B) = 0 ≠ P(A)·P(B) > 0: son **dependientes** (que ocurra uno impide el otro).' },
  { id: 'pye-08', module: 'u2', type: 'mcq', prompt: 'El 30 % de los clientes es de la zona A (12 % reclama) y el 70 % de la zona B (16 % reclama). ¿P(reclamo)?', options: ['0,148', '0,28', '0,14', '0,112'], answer: 0, explain: 'Probabilidad total: 0,12·0,3 + 0,16·0,7 = 0,036 + 0,112 = **0,148**.', source: F },
  { id: 'pye-09', module: 'u3', type: 'mcq', prompt: '¿Qué distribución modela la cantidad de llamadas que llegan a una central **por hora**?', options: ['Poisson', 'Binomial', 'Normal', 't de Student'], answer: 0, explain: 'Ocurrencias en un intervalo con una tasa media → **Poisson**. La binomial cuenta éxitos en n ensayos fijos.' },
  { id: 'pye-10', module: 'u3', type: 'mcq', prompt: 'En una binomial con n = 16 y p = 0,289, el valor esperado es:', options: ['4,62', '0,289', '16', '3,29'], answer: 0, explain: 'E(X) = n·p = 16 · 0,289 ≈ **4,62**.' },
  { id: 'pye-11', module: 'u3', type: 'tf', prompt: 'En la distribución de Poisson la media y la varianza son iguales.', answer: true, explain: 'En la Poisson, E(X) = V(X) = λ: la media y la varianza coinciden.' },
  { id: 'pye-12', module: 'u4', type: 'mcq', prompt: 'X ~ N(μ = 500, σ = 20). ¿Qué Z le corresponde a x = 530?', options: ['1,5', '30', '−1,5', '0,15'], answer: 0, explain: 'Z = (530 − 500)/20 = **1,5**.' },
  { id: 'pye-13', module: 'u4', type: 'mcq', prompt: 'En una normal, ¿qué porcentaje queda aproximadamente entre μ − 2σ y μ + 2σ?', options: ['95 %', '68 %', '99,7 %', '50 %'], answer: 0, explain: 'Regla práctica 68–95–99,7: μ ± 2σ concentra cerca del 95 %.' },
  { id: 'pye-14', module: 'u5', type: 'mcq', prompt: 'Bajo los supuestos del TCL clásico y con n suficientemente grande, la media muestral tiene distribución:', options: ['Aproximadamente normal con desvío σ/√n', 'Igual a la de la población', 'Binomial', 'Uniforme'], answer: 0, explain: 'Para observaciones i.i.d. con varianza finita, la aproximación mejora al crecer n. El tamaño suficiente depende de la distribución; n=30 no es una garantía universal.' },
  { id: 'pye-15', module: 'u5', type: 'mcq', prompt: 'X e Y independientes con V(X) = 4 y V(Y) = 9. ¿V(X − Y)?', options: ['13', '−5', '5', '36'], answer: 0, explain: 'V(X − Y) = V(X) + V(Y) = **13** (las varianzas se suman aunque se resten las variables).' },
  { id: 'pye-16', module: 'u6', type: 'mcq', prompt: 'IC del 90 % para la media: (18,12 ; 19,68) g/kg. La interpretación correcta es:', options: ['Con 90 % de confianza, el contenido MEDIO del lote está entre 18,12 y 19,68 g/kg', 'El 90 % de los productos tiene entre 18,12 y 19,68 g/kg', 'La media muestral está entre esos valores con 90 %', 'Hay 10 % de productos fuera de rango'], answer: 0, explain: 'El intervalo estima el **parámetro** (la media poblacional), no el porcentaje de unidades individuales.', source: F },
  { id: 'pye-17', module: 'u6', type: 'mcq', prompt: 'Se obtuvo p-v = 0,041 con α = 0,05. La decisión es:', options: ['Rechazar H0', 'No rechazar H0', 'Rechazar H1', 'Aumentar α'], answer: 0, explain: '**p-v < α** (0,041 < 0,05) → se rechaza H0.', source: F },
  { id: 'pye-18', module: 'u6', type: 'mcq', prompt: 'Si en la prueba anterior **se rechazó H0**, ¿qué error se pudo cometer?', options: ['Tipo I', 'Tipo II', 'Ninguno', 'Ambos'], answer: 0, explain: 'Rechazar H0 cuando era verdadera es el **error tipo I**. El tipo II solo es posible si **no** se rechaza.', source: F },
  { id: 'pye-19', module: 'u6', type: 'mcq', prompt: 'Se quiere probar que el contenido medio es **menor a 20**. Las hipótesis son:', options: ['H0: μ ≥ 20 · H1: μ < 20', 'H0: μ < 20 · H1: μ ≥ 20', 'H0: μ = 20 · H1: μ ≠ 20', 'H0: μ > 20 · H1: μ ≤ 20'], answer: 0, explain: 'Lo que se quiere probar va en **H1** (sin igual); H0 lleva la igualdad. Unilateral izquierda.', source: F },
  { id: 'pye-20', module: 'u6', type: 'tf', prompt: 'Si el nivel de significación es menor al p-valor, se rechaza la hipótesis alternativa.', answer: false, explain: 'Con α < p-v **no se rechaza H0**: no hay evidencia suficiente a favor de H1. Pero H1 no "se rechaza": se decide sobre H0.', source: 'autoevaluación de la cátedra' },
  { id: 'pye-21', module: 'u6', type: 'mcq', prompt: 'La **potencia** de una prueba es:', options: ['La probabilidad de rechazar H0 cuando es falsa (1 − β)', 'La probabilidad del error tipo I', 'El p-valor', 'El nivel de confianza'], answer: 0, explain: 'Potencia = 1 − β: detectar el efecto cuando realmente existe.' },
  { id: 'pye-22', module: 'u6', type: 'mcq', prompt: 'Con σ poblacional desconocido y muestra chica, para estimar la media se usa:', options: ['La distribución t de Student', 'La normal estándar siempre', 'La Poisson', 'La chi cuadrado'], answer: 0, explain: 'Al estimar σ con s aparece incertidumbre extra: **t** con n − 1 grados de libertad.' },
  { id: 'pye-23', module: 'u7', type: 'mcq', prompt: 'Para probar si los empleados **comerciales** cobran más que los **administrativos** (dos grupos distintos de personas) se usa:', options: ['Prueba de diferencia de medias para muestras independientes', 'Prueba para muestras apareadas', 'Chi cuadrado de bondad de ajuste', 'Regresión lineal'], answer: 0, explain: 'Variable cuantitativa medida en dos grupos independientes → diferencia de medias (previa prueba de homogeneidad de varianzas).', source: F },
  { id: 'pye-24', module: 'u7', type: 'mcq', prompt: 'Medir el peso de las mismas personas antes y después de una dieta requiere:', options: ['Muestras apareadas', 'Muestras independientes', 'Diferencia de proporciones', 'Chi cuadrado'], answer: 0, explain: 'Son los **mismos individuos** medidos dos veces: se analizan las diferencias.' },
  { id: 'pye-25', module: 'u8', type: 'mcq', prompt: 'Para probar si el tiempo de conexión sigue la **proporción histórica** en 4 categorías se usa:', options: ['Chi cuadrado de bondad de ajuste con 3 g.l.', 'Chi cuadrado de independencia', 't de Student', 'Regresión'], answer: 0, explain: 'Observado vs proporción teórica → **bondad de ajuste**, g.l. = 4 − 1 = 3.', source: F },
  { id: 'pye-26', module: 'u8', type: 'mcq', prompt: 'En esa prueba p-v = 0,1031 con α = 0,08. La conclusión es:', options: ['No se rechaza H0: sigue la proporción histórica', 'Se rechaza H0', 'Se rechaza H1', 'Faltan datos'], answer: 0, explain: '0,1031 > 0,08 → no se rechaza H0.', source: F },
  { id: 'pye-27', module: 'u8', type: 'tf', prompt: 'Las pruebas no paramétricas requieren que la población sea normal.', answer: false, explain: 'Justamente **no** suponen una distribución: sirven cuando no se cumple la normalidad.' },
  { id: 'pye-28', module: 'u9', type: 'mcq', prompt: 'ŷ = 12 − 0,17x (x: precio en cientos de $, y: ventas en cientos de unidades). Por cada $100 que aumenta el precio:', options: ['Las ventas disminuyen 17 unidades', 'Las ventas disminuyen 0,17 unidades', 'Las ventas aumentan 12 unidades', 'Las ventas disminuyen 1700 unidades'], answer: 0, explain: 'b = −0,17 cientos de unidades por cada 100 $ → −17 unidades. (La respuesta de la guía dice 170: revisá las unidades: 0,17 × 100 = 17).', source: F },
  { id: 'pye-29', module: 'u9', type: 'mcq', prompt: 'En la regresión anterior r² = 0,81. Significa que:', options: ['El 81 % de la variación de las ventas se explica por la variación del precio', 'El 81 % de las ventas se debe al precio', 'La correlación es 0,81', 'El precio causa las ventas'], answer: 0, explain: 'r² es el **porcentaje de variación explicada**. La correlación sería r = −0,9 (negativa por la pendiente).', source: F },
  { id: 'pye-30', module: 'u9', type: 'mcq', prompt: 'Dan r = 0,931 entre población y CO₂. ¿Qué porcentaje de la variación de CO₂ explica la población?', options: ['86,7 %', '93,1 %', '96,5 %', '6,9 %'], answer: 0, explain: 'r² = 0,931² ≈ **0,867**. Decir "93,1 %" es confundir r con r² (afirmación falsa del final 2025).', source: F },
  { id: 'pye-31', module: 'u9', type: 'mcq', prompt: 'Si la prueba sobre la pendiente resulta significativa, se concluye que:', options: ['Las variables están linealmente asociadas', 'Una variable es causa de la otra', 'r² = 1', 'La ordenada es cero'], answer: 0, explain: 'Regresión **no prueba causalidad**: solo asociación lineal.', source: F },
  { id: 'pye-32', module: 'u9', type: 'tf', prompt: 'La ordenada al origen siempre tiene una interpretación práctica.', answer: false, explain: 'Es el valor de y con x = 0; muchas veces no tiene sentido (una ciudad sin habitantes).', source: F },
];

const ex: WorkedExercise[] = [
  ...FINAL_EXERCISES,
  { id: 'pye-e3', module: 'u2', title: 'Probabilidad total', statement: 'El 30 % de las llamadas viene de la zona A y el 70 % de la B. Reclaman el 12 % de A y el 16 % de B. ¿P(reclamo)? Si hubo reclamo, ¿P(zona A)?', steps: [
    { title: 'Total', body: 'P(R) = 0,12·0,3 + 0,16·0,7 = 0,036 + 0,112 = **0,148**.' },
    { title: 'Bayes', body: 'P(A / R) = 0,036 / 0,148 ≈ **0,243**.' },
  ], result: 'P(R) = 0,148 · P(A/R) ≈ 0,24.' },
];

/** Preguntas anteriores que se ofrecen como práctica dentro de su tema. */
const OLD_TOPIC: Record<string, string> = {
  'pye-01': 'p1d', 'pye-04': 'p1d', 'pye-rep-3': 'p1d',
  'pye-02': 'p1c', 'pye-rep-1': 'p1c', 'pye-rep-2': 'p1c',
  'pye-03': 'p1a',
  'pye-05': 'p2c', 'pye-06': 'p2c', 'pye-07': 'p2c',
  'pye-08': 'p2b', 'pye-rep-6': 'p2b',
  'pye-rep-4': 'p2u', 'pye-rep-5': 'p2u',
  'pye-09': 'p3e',
  'pye-10': 'p3b', 'pye-rep-7': 'p3b', 'pye-rep-9': 'p3b',
  'pye-11': 'p3p', 'pye-rep-8': 'p3p',
  'pye-13': 'p4', 'pye-rep-10': 'p4', 'pye-rep-12': 'p4',
  'pye-12': 'p4z', 'pye-rep-11': 'p4z',
  'pye-15': 'p5', 'pye-rep-13': 'p5', 'pye-rep-14': 'p5',
  'pye-14': 'p5t', 'pye-rep-15': 'p5t',
  'pye-16': 'p6i', 'pye-22': 'p6i',
  'pye-17': 'p6t', 'pye-rep-16': 'p6t', 'pye-rep-17': 'p6t',
  'pye-18': 'p6a', 'pye-21': 'p6a', 'pye-rep-19': 'p6a',
  'pye-19': 'p6h', 'pye-20': 'p6h',
  'pye-rep-18': 'p6e',
  'pye-23': 'p7',
  'pye-24': 'p7a', 'pye-rep-20': 'p7a',
  'pye-rep-21': 'p7l',
  'pye-25': 'p8b', 'pye-26': 'p8b', 'pye-rep-22': 'p8b', 'pye-rep-23': 'p8b',
  'pye-27': 'p8',
  'pye-rep-24': 'p8i',
  'pye-28': 'p9', 'pye-32': 'p9', 'pye-rep-25': 'p9',
  'pye-29': 'p9r', 'pye-30': 'p9r', 'pye-rep-27': 'p9r',
  'pye-31': 'p9b',
  'pye-rep-26': 'p9x', 'pye-rep-28': 'p9x',
};

const content: SubjectContent = {
  subjectId: 'pye', theory, questions: [
    ...[...q, ...REVIEW_QUESTIONS].map((x) => ({ ...x, topic: OLD_TOPIC[x.id] })),
    ...U1_QUESTIONS, ...U2_QUESTIONS, ...U3_QUESTIONS, ...U4_QUESTIONS, ...U5_QUESTIONS,
    ...U6_QUESTIONS, ...U7_QUESTIONS, ...U8_QUESTIONS, ...U9_QUESTIONS,
  ], exercises: ex, videos: VIDEOS,
  cheatsheet: POCKET['pye'],
  maps: [U1_MAP, U2_MAP, U3_MAP, U4_MAP, U5_MAP, U6_MAP, U7_MAP, U8_MAP, U9_MAP],
};

content.exercises = content.exercises.map((e) => ({ ...e, scenes: EX_SCENES[e.id] }));
content.lessons = [
  {
    id: 'pye-clase-1', examId: 'final', title: 'Final · Clase 1: descriptiva, probabilidad y distribuciones',
    summary: 'Forma, CV y percentiles; probabilidad, independencia, total y Bayes; binomial, Poisson, normal y TCL.',
    intro: [
      'Primera clase para el final de Probabilidad y Estadística: la primera mitad de la materia, con los gráficos que conviene tener en la cabeza.',
      'Vamos a ver la forma de una distribución y el coeficiente de variación, probabilidad con un árbol de Bayes, binomial y Poisson, la normal y el Teorema Central del Límite.',
    ],
    parts: ['p1', 'q:pye-03', 'p2', 'ex:pye-e3', 'p3', 'p4', 'p5', 'q:pye-15', 'q:pye-rep-13', 'q:pye-rep-14', 'q:pye-rep-15'],
    outro: [
      'Asimetría positiva: Mo < Me < x̄. CV = s/x̄ (mayor, más heterogéneo). P(k): el k % está por debajo.',
      'Independientes: P(A∩B) = P(A)P(B). Total y Bayes con árbol. Binomial: n·p; Poisson: media = varianza = λ.',
      'Normal: 68–95–99,7 y Z = (x − μ)/σ. TCL: x̄ ≈ N(μ, σ/√n).',
    ],
  },
  {
    id: 'pye-clase-3', examId: 'final', title: 'Final · Inferencia, pruebas y regresión',
    summary: 'Intervalos de confianza, prueba de hipótesis y errores, qué prueba usar, Chi cuadrado y regresión, con los ejercicios del final.',
    intro: [
      'Repasamos inferencia, comparación de medias y regresión con ejemplos de los modelos anteriores. Su presencia en una guía no confirma el formato del próximo examen.',
      'Vamos a ver intervalos de confianza, pruebas de hipótesis con sus errores, cómo elegir la prueba, Chi cuadrado, regresión, y dos ejercicios de finales resueltos.',
    ],
    parts: ['p6', 'q:pye-16', 'ex:pye-final-e4', 'p7', 'ex:pye-e1', 'p8', 'p9', 'ex:pye-e2'],
    outro: [
      'IC: "con X % de confianza la MEDIA poblacional está entre a y b". H1 = lo que quiero probar; p-v < α → rechazo H0.',
      'Rechacé → posible error tipo I; no rechacé → tipo II. Grupos distintos → independientes; mismos individuos → apareadas.',
      'Regresión: b es el cambio por unidad, r² el % de variación explicada, y nunca causalidad.',
    ],
  },
  {
    id: 'pye-clase-2', examId: 'final', title: 'Final resuelto: cinco partes, con cuentas verificadas',
    summary: 'Un modelo anterior completo: sectores, independencia, regresión, prueba t, intervalo, Poisson y percentil normal. Incluye dos erratas de la respuesta o del enunciado.',
    intro: [
      'Vamos a resolver las cinco partes de un modelo anterior de Probabilidad y Estadística con dibujos propios y cuentas verificadas. No confirma cómo será tu próximo examen. Antes de calcular, identificá la variable, la unidad y qué probabilidad o parámetro te piden.',
      'El recorrido va de remuneraciones e independencia a regresión; después usamos ocho observaciones para una prueba y un intervalo, y cerramos con Poisson y normal. Hay un p-valor incorrecto en la respuesta adjunta y un cambio de sustancia en el enunciado que vamos a señalar sin inventar datos.',
    ],
    parts: ['ex:pye-e1', 'ex:pye-final-e2', 'ex:pye-e2', 'ex:pye-final-e4', 'ex:pye-final-e5', 'ex:pye-final-e6', 'ex:pye-final-e7'],
    outro: [
      'Elegí el procedimiento por la variable y el objetivo: CV para dispersión relativa, producto para sucesos independientes, t para la media con desvío desconocido bajo sus supuestos y Poisson con la tasa ajustada al volumen.',
      'El intervalo estima la media, un percentil describe un umbral de observaciones y el p-valor se compara con alfa. En regresión, variación explicada y causalidad son ideas diferentes. Si el material se contradice, verificá la cuenta y dejá visible la limitación.',
    ],
  },
];

content.lessons.push(...REVIEW_LESSONS);
export default content;
