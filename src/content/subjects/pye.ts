import type { Question, SubjectContent, TheoryBlock, WorkedExercise } from '../types';
import { VIDEOS } from '../videos/pye';
import { EX_SCENES, SCENES } from '../visual/pye';
import { FINAL_EXERCISES } from '../visual/pye-final';
import { REVIEW_LESSONS, REVIEW_QUESTIONS } from '../visual/pye-repaso';

/** PyE · final. Redacción propia sobre el teórico/práctico de la cátedra y los modelos de final 2022–2025. */
const F = 'modelos de final de la cátedra (Drive de estudiantes)';

const theory: TheoryBlock[] = [
  { id: 'p1', module: 'u1', title: 'Estadística descriptiva', points: [
    '**Población** (todos) vs **muestra** (parte). **Parámetro** (de la población: μ, σ, p) vs **estadístico** (de la muestra: x̄, s, p̂).',
    'Variables **cualitativas** (nominales u ordinales) y **cuantitativas** (discretas o continuas).',
    'Posición: **media**, **mediana** (deja 50 % a cada lado), **moda** (valor más frecuente), **percentiles**: P(75) = valor por debajo del cual está el 75 % de los datos.',
    'Dispersión: rango, varianza, desvío estándar y **coeficiente de variación CV = s / x̄** (sin unidades: sirve para **comparar la homogeneidad** de grupos con medias distintas). **Mayor CV = más heterogéneo.**',
    'Forma: **simétrica** (media = mediana = moda), **asimétrica positiva o a derecha** (cola larga a la derecha: Mo < Me < x̄) y **negativa o a izquierda** (Mo > Me > x̄).',
  ], trap: 'Para decir "en qué grupo los datos son más heterogéneos" se compara el **CV**, no el desvío solo, porque las medias son distintas.' },
  { id: 'p2', module: 'u2', title: 'Probabilidad', points: [
    'P(A ∪ B) = P(A) + P(B) − P(A ∩ B). **Excluyentes:** P(A ∩ B) = 0.',
    '**Condicional:** P(A / B) = P(A ∩ B) / P(B). **Independientes:** P(A ∩ B) = P(A)·P(B), y entonces P(A / B) = P(A).',
    '**Probabilidad total:** P(R) = Σ P(R / Aᵢ)·P(Aᵢ). **Bayes:** P(Aᵢ / R) = P(R / Aᵢ)·P(Aᵢ) / P(R).',
  ], trap: 'No confundir **excluyentes** (no pueden ocurrir juntos) con **independientes** (uno no cambia la probabilidad del otro).' },
  { id: 'p3', module: 'u3', title: 'Variables discretas: binomial y Poisson', points: [
    '**Binomial (n, p):** n ensayos independientes con probabilidad de éxito p constante; X = cantidad de éxitos. E(X) = n·p · V(X) = n·p·(1 − p).',
    '**Poisson (λ):** cantidad de ocurrencias en un intervalo (de tiempo, espacio…) con tasa media λ. E(X) = V(X) = λ. Si cambia el intervalo, λ cambia proporcionalmente.',
  ] },
  { id: 'p4', module: 'u4', title: 'Distribución normal', points: [
    'Campana simétrica: media = mediana = moda. Se estandariza con **Z = (X − μ) / σ** ~ N(0, 1).',
    'Regla práctica: μ ± σ ≈ 68 %, μ ± 2σ ≈ 95 %, μ ± 3σ ≈ 99,7 %.',
    'Percentil de la normal: x = μ + z·σ (ej.: P(80) usa z ≈ 0,84).',
  ] },
  { id: 'p5', module: 'u5', title: 'Suma de variables y Teorema Central del Límite', points: [
    'E(aX + bY) = aE(X) + bE(Y). Si son independientes, V(aX + bY) = a²V(X) + b²V(Y).',
    '**TCL clásico:** con observaciones independientes e idénticamente distribuidas y varianza finita, la media estandarizada se aproxima a una normal al crecer n. La media muestral tiene centro μ y error estándar σ/√n. Treinta es una orientación práctica, no una garantía universal.',
  ] },
  { id: 'p6', module: 'u6', title: 'Inferencia: intervalos y prueba de hipótesis', points: [
    '**Intervalo de confianza:** "con una confianza del 95 % se estima que la **media poblacional** está entre a y b". Se interpreta sobre el **parámetro**, no sobre los datos. σ desconocido → distribución **t de Student**.',
    '**Prueba de hipótesis:** H0 (lo que se supone, lleva el =) y H1 (lo que se quiere probar: >, < o ≠, que define si la prueba es unilateral derecha, izquierda o bilateral).',
    '**Regla de decisión con p-valor:** si **p-v < α → se rechaza H0**; si p-v ≥ α, no se rechaza.',
    '**Error tipo I** (α): rechazar H0 siendo verdadera. **Error tipo II** (β): no rechazar H0 siendo falsa. **Potencia** = 1 − β: rechazar H0 cuando es falsa.',
    'Si se rechazó H0, el error posible es **tipo I**; si no se rechazó, **tipo II**. Hay que expresarlo **en términos del problema**.',
  ], trap: 'Trampa de autoevaluación: "si α es **menor** al p-valor se rechaza H1" → no: con α < p-v **no se rechaza H0** (H1 nunca "se rechaza", se acepta o no hay evidencia).' },
  { id: 'p7', module: 'u7', title: 'Comparación de dos poblaciones', points: [
    '**Diferencia de medias, muestras independientes** (dos grupos distintos, ej.: sector administrativo vs comercial). Antes se prueba la **homogeneidad de varianzas** (H0: σ₁² = σ₂²).',
    '**Muestras apareadas** (los mismos individuos medidos dos veces, antes y después): se trabaja con las diferencias.',
    '**Diferencia de proporciones** para variables cualitativas en dos grupos.',
  ] },
  { id: 'p8', module: 'u8', title: 'Datos categóricos y pruebas no paramétricas', points: [
    '**Chi cuadrado de bondad de ajuste:** ¿la distribución observada sigue una proporción teórica o histórica? g.l. = categorías − 1.',
    '**Chi cuadrado de independencia:** tabla de contingencia de dos variables cualitativas; g.l. = (filas − 1)(columnas − 1).',
    '**No paramétricas:** no suponen una distribución (normal) para la población; se usan con muestras chicas o datos ordinales.',
  ] },
  { id: 'p9', module: 'u9', title: 'Regresión y correlación lineal', points: [
    'ŷ = a + b·x. **Pendiente b:** por cada unidad que aumenta x, y cambia en b unidades (en promedio). **Ordenada a:** valor de y cuando x = 0 (a veces no tiene sentido práctico).',
    '**r** (correlación) mide fuerza y sentido de la asociación lineal (−1 a 1). **r²** (determinación): **porcentaje de la variación de y explicada por la variación de x**. Si dan r = 0,931, entonces r² = 0,867.',
    'La prueba sobre la pendiente concluye si las variables están **linealmente asociadas**, **nunca causalidad**. Modelo útil para pronosticar si r² > 0,5 (criterio de la cátedra).',
  ], trap: 'Las tres trampas del final 2025: confundir r con r², interpretar la ordenada fuera de contexto y concluir **causalidad** a partir de la regresión.' },
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

const content: SubjectContent = {
  subjectId: 'pye', theory, questions: [...q, ...REVIEW_QUESTIONS], exercises: ex, videos: VIDEOS,
  cheatsheet: [
    { t: 'Descriptiva', d: 'CV = s/x̄ (mayor = más heterogéneo) · P(k): el k % está por debajo · asimetría positiva: Mo < Me < x̄.' },
    { t: 'Probabilidad', d: 'Independientes: P(A∩B) = P(A)P(B), P(A/B) = P(A) · total: Σ P(R/Aᵢ)P(Aᵢ) · Bayes.' },
    { t: 'Distribuciones', d: 'Binomial n·p · Poisson λ (media = varianza) · Normal Z = (x − μ)/σ · TCL: x̄ ~ N(μ, σ/√n).' },
    { t: 'Prueba de hipótesis', d: 'H1 = lo que se quiere probar · p-v < α → rechazo H0 · rechacé → posible error I; no rechacé → posible error II · potencia = 1 − β.' },
    { t: 'Qué prueba', d: '2 grupos distintos → independientes (antes homogeneidad) · mismos individuos → apareadas · cualitativas vs proporción → χ² bondad (k − 1 g.l.) · 2 cualitativas → χ² independencia.' },
    { t: 'IC', d: '"Con confianza del X % la MEDIA poblacional está entre a y b". σ desconocido → t.' },
    { t: 'Regresión', d: 'b: cambio de y por unidad de x · a: y con x = 0 · r² = % de variación explicada (r² = r²) · asociación, NO causalidad · útil si r² > 0,5.' },
  ],
};

content.theory = content.theory.map((b) => ({ ...b, scenes: SCENES[b.id] }));
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
