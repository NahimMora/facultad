/**
 * PyE · Unidades 3 (discretas), 4 (normal) y 5 (propiedades y TCL), tema por tema.
 * Fuentes revisadas (privadas): presentaciones de variables discretas, binomial y Poisson, normal y TCL, y modelos
 * de 1er parcial con respuestas. Redacción y datos propios (Mate Cloud). Cuentas verificadas con SciPy.
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { bars, head, plot, txt } from './h';
import { asker, bell, flow, grow, sc, VIDEO_NOTE } from './kit';

export const U3_THEORY: TheoryBlock[] = [
  {
    id: 'p3', module: 'u3', title: 'Distribución de probabilidad, esperanza y varianza', videoNote: VIDEO_NOTE,
    lead: ['Una distribución discreta es una **tabla con cada valor posible y su probabilidad**. La esperanza es su promedio teórico; la varianza, su dispersión.'],
    scenes: [grow('X: incidentes por día', ['x', 'P(x)', 'x · P(x)', 'x² · P(x)'], [
      [['0', '0,20', '0', '0'], 'Cada valor posible lleva su probabilidad. La de cero incidentes es 0,20.'],
      [['1', '0,40', '0,40', '0,40'], 'Para la esperanza multiplicás valor por probabilidad. Para la varianza, también el cuadrado por la probabilidad.'],
      [['2', '0,30', '0,60', '1,20'], 'Con el 2 aporta 0,60 y 1,20. Solo se eleva al cuadrado la x, **no la probabilidad**.'],
      [['3', '0,10', '0,30', '0,90'], 'Con el 3, lo mismo: 0,30 y 0,90.'],
      [['Σ', '1', '1,30', '2,50'], 'La **esperanza** es 1,30. La **varianza** es 2,50 menos 1,30 al cuadrado: 0,81. El desvío es 0,9.'],
    ])],
    points: [
      '**Condiciones:** P(x) ≥ 0 y ΣP(x) = 1.',
      '**E(X) = Σ x·P(x)**',
      '**V(X) = E(X²) − [E(X)]²**, con E(X²) = Σ x²·P(x).',
      '**σ = √V(X)** y **CV = σ/E(X)**.',
      'En una discreta **P(x < 7) = P(x ≤ 6)** si toma enteros; "al menos 1" = 1 − P(0).',
    ],
    example: { title: 'ganancia por contratos', body: ['Valores 0, 22.000, 40.000 y 62.000 con probabilidades 0,12; 0,16; 0,07 y 0,65. E(X) = **$46.620**: 0 + 3.520 + 2.800 + 40.300. (La respuesta del modelo dice 46.420: es un error de suma.)'] },
    written: 'X: [variable]. E(X) = ΣxP(x) = … V(X) = E(X²) − E(X)² = … σ = √V(X) = … Se espera en promedio … [unidades].',
    trap: 'La esperanza no tiene por qué ser un valor posible: 1,3 incidentes está bien.',
  },
  {
    id: 'p3b', module: 'u3', title: 'Binomial',
    lead: ['Binomial: **cuántos éxitos en n intentos**. La reconocés porque hay una cantidad **fija** de casos y cada uno es sí o no.'],
    scenes: [sc([
      head('n = 5, p = 0,2'),
      bars(50, 70, 500, 220, [0.328, 0.410, 0.205, 0.051, 0.006, 0].map((v, i) => ({ t: String(i), v, c: i === 2 ? 'yellow' as const : 'blue' as const }))),
      txt(300, 360, 'P(X = 2) = 10 · 0,2² · 0,8³ = 0,205', { fs: 18, b: true, c: 'yellow', s: 1 }),
      txt(300, 410, 'E = n·p = 1  ·  V = n·p·(1−p) = 0,8', { fs: 18, b: true, c: 'green', s: 2 }),
    ], [
      'Cinco servidores, cada uno falla con probabilidad 0,2 sin depender de los demás. **X cuenta cuántos fallan**, de 0 a 5.',
      'Para exactamente 2: las 10 formas de elegir cuáles, por 0,2 al cuadrado, por 0,8 al cubo. Da 0,205.',
      'La esperanza es **n por p** y la varianza, **n por p por su complemento**.',
    ])],
    points: [
      '**Condiciones (Bernoulli):** n ensayos, dos resultados, p constante, independientes.',
      '**X ~ Bi(n; p)**, de 0 a n. **P(X = k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ**',
      '**E = n·p** · **V = n·p·(1−p)**',
      '**Forma:** p < 0,5 asimétrica positiva; p = 0,5 simétrica; p > 0,5 negativa.',
    ],
    table: { head: ['Dice', 'Calculás'], rows: [['por lo menos 3', 'P(X ≥ 3) = 1 − P(X ≤ 2)'], ['más de 3', 'P(X ≥ 4)'], ['a lo sumo 3', 'P(X ≤ 3)'], ['menos de 3', 'P(X ≤ 2)']] },
    example: { title: 'con p calculada', body: ['40 % preocupado por el trabajo y 10 % por trabajo y notas: solo trabajo p = 0,30. En 12 alumnos, P(X ≥ 3) = **0,747**. Primero hubo que sacar p.'] },
    written: 'X: cantidad de [éxitos] en n = … [ensayos]. X ~ Bi(n = …; p = …) porque los ensayos son independientes, con dos resultados y p constante. P(X …) = …',
    trap: '"Menos de 3" **no incluye** el 3.',
  },
  {
    id: 'p3p', module: 'u3', title: 'Poisson',
    lead: ['Poisson: **cuántas veces pasa algo en un pedazo de tiempo, superficie o volumen**. No hay n. Lo único que hacés es ajustar **λ** al pedazo que te preguntan.'],
    scenes: [flow('3 alertas por hora, ¿4 en 2 horas?', [
      ['Tasa', '3 alertas por hora', 'La tasa es el promedio de ocurrencias por unidad: 3 alertas cada hora.'],
      ['Ajustar', 'λ = 3 · 2 = 6', 'Te preguntan por **dos horas**: lambda es tasa por extensión, o sea 6.'],
      ['Variable', 'X: alertas en 2 horas', 'La variable se define con esa extensión. Puede valer 0, 1, 2 y así sin tope.'],
      ['Cuenta', 'P(X = 4) = e⁻⁶ · 6⁴ / 4! = 0,134', 'Con la fórmula o con Jamovi, la probabilidad de exactamente 4 es 0,134.'],
    ])],
    points: [
      '**X ~ Po(λ)**, valores 0, 1, 2…',
      '**λ = tasa · extensión**',
      '**P(X = k) = e^(−λ)·λᵏ/k!**',
      '**E(X) = V(X) = λ**',
      '**Condición:** ocurrencias independientes y tasa constante en el continuo.',
      'λ ≤ 20 asimétrica positiva; más grande, tiende a simétrica.',
    ],
    example: { title: 'pizzería', body: ['12 personas cada 15 minutos. En 20 minutos λ = 16 y P(menos de 18) = P(X ≤ 17) = **0,659**. En 10 minutos λ = 8 y P(X = 12) = **0,048**.'] },
    written: 'X: cantidad de [sucesos] en [extensión]. X ~ Po(λ), con λ = tasa · extensión = … P(X …) = …',
    trap: 'El error clásico es usar λ de 15 minutos para una pregunta de 20.',
  },
  {
    id: 'p3e', module: 'u3', title: '¿Binomial, Poisson o las dos?',
    lead: ['El punto difícil del parcial las **encadena**: una te da la probabilidad p que necesita la binomial.'],
    scenes: [flow('8 máquinas con desperfectos', [
      ['Una máquina', 'desperfectos en un mes: Poisson', 'Lo que le pasa a **una** máquina a lo largo del tiempo es Poisson, con un desperfecto cada 120 horas y 208 horas por mes.'],
      ['Su probabilidad', 'P(X ≤ 2 / λ = 1,733) = 0,748', 'La probabilidad de que una máquina tenga a lo sumo 2 es 0,748.'],
      ['Varias máquinas', 'cuántas de 8 lo cumplen: binomial', 'Cuántas **de las 8** cumplen eso ya es una cantidad fija de sí o no: binomial con p igual a 0,748.'],
      ['Final', 'P(Y ≤ 4 / n = 8) = 0,117', 'Menos de 5 máquinas es 4 o menos: 0,117. El resultado de la primera fue el p de la segunda.'],
    ])],
    points: ['**¿Hay n fijo y sí/no?** Binomial.', '**¿Hay tasa en un continuo?** Poisson.', '**¿"De n unidades, cuántas cumplen…"?** Primero calculás p con la distribución de una unidad y después binomial.'],
    table: { head: ['', 'Binomial', 'Poisson'], rows: [['Parámetros', 'n y p', 'λ'], ['Valores', '0 a n', '0 en adelante'], ['Media', 'n·p', 'λ'], ['Varianza', 'n·p·(1−p)', 'λ']] },
    trap: 'También pasa **normal → binomial**: p = P(una caja se reprocesa) y después cuántas de 20.',
  },
];

export const U4_THEORY: TheoryBlock[] = [
  {
    id: 'p4', module: 'u4', title: 'La curva normal', videoNote: VIDEO_NOTE,
    lead: ['En una variable continua **la probabilidad es un área bajo la curva**. La normal es la campana simétrica que queda definida con solo dos números: μ y σ.'],
    scenes: [bell('Un desvío a cada lado', { area: [-1, 1], marks: [{ x: -1, t: 'μ−σ' }, { x: 1, t: 'μ+σ' }], lines: [
      ['Simétrica: μ = Me = Mo', 'Es simétrica respecto de la media, que coincide con la mediana y la moda. El área total vale 1.'],
      ['μ ± σ → 68,27 %', 'Entre menos uno y más un desvío está el **68,27 %**. Ahí están los puntos de inflexión.'],
      ['μ ± 2σ → 95,45 %  ·  μ ± 3σ → 99,73 %', 'A dos desvíos está el 95,45 % y a tres el 99,73 %.'],
      ['P(X = a) = 0', 'En una continua, un valor exacto tiene probabilidad **cero**: menor y menor o igual dan lo mismo.'],
    ] })],
    points: [
      '**Densidad:** f(x) ≥ 0, área total 1, P(a < X < b) = área.',
      '**X ~ N(μ; σ)**: dominio real, simétrica, asintótica al eje.',
      '**68,27 · 95,45 · 99,73** a 1, 2 y 3 desvíos.',
      '**P(X < a) = P(X ≤ a)** porque es continua.',
    ],
    trap: 'Jamovi pide el **desvío**. Si te dan la varianza, primero la raíz. Y unificá unidades: 450 g son 0,45 kg.',
  },
  {
    id: 'p4z', module: 'u4', title: 'Estandarizar y calcular probabilidades',
    lead: ['**Z dice a cuántos desvíos de la media está un dato.** Sirve para calcular áreas y para comparar cosas medidas en escalas distintas.'],
    scenes: [bell('N(200; 20): ¿más de 230?', { area: [1.5, 4], marks: [{ x: 1.5, t: 'z = 1,5' }], lines: [
      ['X: tiempo de respuesta (ms)', 'El tiempo es normal con media 200 y desvío 20. Dibujá la campana y pintá lo que te piden: a la derecha de 230.'],
      ['z = (230 − 200)/20 = 1,5', '230 está un desvío y medio por encima de la media.'],
      ['P(X < 230) = 0,9332', 'El área acumulada hasta ahí es 0,9332.'],
      ['P(X > 230) = 0,0668', 'Como piden la derecha, es uno menos eso: 0,0668.'],
    ] })],
    points: [
      '**Z = (X − μ)/σ** ~ N(0; 1).',
      '**P(X > a) = 1 − P(X < a)**',
      '**P(a < X < b) = P(X < b) − P(X < a)**',
      '**Condicional:** P(X < b / X > a) = P(a < X < b)/P(X > a).',
    ],
    example: { title: 'comparar dos notas', body: ['85 con media 70 y desvío 6: z = 2,5. 92 con media 85 y desvío 5: z = 1,4. **Rinde mejor el 85**, en relación con su curso.'] },
    written: 'X: [variable] ~ N(μ = …; σ = …). P(X > a) = P(Z > (a − μ)/σ) = … El …% de [unidades] [supera] a [valor].',
    trap: 'Z negativo no es probabilidad negativa: es un valor por debajo de la media.',
  },
  {
    id: 'p4i', module: 'u4', title: 'Al revés: del porcentaje al valor',
    lead: ['Cuando el **dato es un porcentaje** y te piden un valor, es un **fractil** (percentil). Jamovi lo busca siempre con el área **de la izquierda**.'],
    scenes: [bell('N(200; 20): el 10 % más lento', { area: [1.28, 4], marks: [{ x: 1.28, t: 'P(90)' }], lines: [
      ['10 % a la derecha', 'Piden el tiempo mínimo del 10 % más lento: ese 10 % está en la cola derecha.'],
      ['90 % a la izquierda → P(90)', 'Se pasa a área izquierda: es el **percentil 90**.'],
      ['x = 200 + 1,2816 · 20 = 225,6 ms', 'El z de 0,90 es 1,2816. Media más z por desvío da 225,6.'],
      ['El 10 % más lento tarda 225,6 ms o más', 'Interpretalo en el problema: el 10 % de las respuestas tarda más de 225,6 milisegundos.'],
    ] })],
    points: ['**x = μ + z·σ**', '**Máximo del k % más bajo:** P(k).', '**Mínimo del k % más alto:** P(100 − k).', '**Superado solo por el k %:** P(100 − k).'],
    example: { title: 'cajas de cartón', body: ['N(16; 0,45). Resistencia mínima del 40 % más resistente: P(60) = **16,11 kg**.'] },
    written: 'Se busca P(k): P(X < x) = k/100. x = … El k % de [unidades] tiene [variable] inferior a … [unidades].',
    trap: '"Mínimo del 40 % mejor" es **P(60)**, no P(40).',
  },
];

export const U5_THEORY: TheoryBlock[] = [
  {
    id: 'p5', module: 'u5', title: 'Propiedades de la media y la varianza', videoNote: VIDEO_NOTE,
    lead: ['Si una variable se arma con otras (un total, una caja, un proyecto), su media y su desvío salen de propiedades. La clave: **las varianzas se suman siempre, los desvíos nunca**.'],
    scenes: [flow('W = 6X − 3Y + 5', [
      ['Datos', 'μx = 7, σx = 2 · μy = 8, σ²y = 5', 'X e Y son independientes. Ojo: de X te dan el desvío y de Y la varianza.'],
      ['Media', '6·7 − 3·8 + 5 = 23', 'La media respeta todo: coeficientes, signos y constante. Da 23.'],
      ['Varianza', '6²·4 + 3²·5 + 0 = 189', 'En la varianza los coeficientes van **al cuadrado**, se **suma aunque haya un menos** y la constante desaparece.'],
      ['Desvío', '√189 = 13,75', 'Recién al final la raíz: 13,75.'],
    ])],
    points: [
      '**E(a) = a** · **E(aX ± bY) = aE(X) ± bE(Y)**',
      '**E(XY) = E(X)E(Y)** si son independientes.',
      '**V(a) = 0** · **V(X ± a) = V(X)** · **V(aX) = a²V(X)**',
      '**V(aX ± bY) = a²V(X) + b²V(Y)**, solo si son independientes.',
      '**Σ(x − μ) = 0** y Σ(x − μ)² es mínima.',
    ],
    table: { head: ['', 'Media', 'Varianza'], rows: [['sumar constante', 'se suma', 'no cambia'], ['multiplicar por a', '·a', '·a²'], ['X − Y', 'se resta', 'se suma']] },
    written: 'E(W) = aE(X) ± bE(Y) + c = … Como X e Y son independientes, V(W) = a²V(X) + b²V(Y) = … σ(W) = √V(W) = …',
    trap: 'σ(2X − 5Y + 2) = √(4σx² + 25σy²). Con un menos adentro está mal.',
  },
  {
    id: 'p5t', module: 'u5', title: 'Teorema Central del Límite',
    lead: ['**Si sumás muchas variables independientes, el total se vuelve normal**, aunque cada una no lo sea. Es lo que te deja calcular con la campana y lo que sostiene toda la inferencia.'],
    scenes: [
      sc([
        head('Una sola / el promedio de muchas'),
        plot(30, 70, 250, 190, [0, 6], [0, 1], { ticks: false, fns: [{ f: 'exp(-x)', c: 'orange' }] }),
        txt(155, 305, 'una variable: cualquier forma', { fs: 16, b: true, c: 'orange', w: 250 }),
        plot(330, 70, 250, 190, [-3, 3], [0, 0.45], { s: 1, ticks: false, fns: [{ f: '0.399*exp(-x*x/2)', c: 'blue' }] }),
        txt(455, 305, 'suma de muchas: campana', { fs: 16, b: true, c: 'blue', w: 250, s: 1 }),
        txt(300, 365, 'Suma: media n·μ, desvío σ·√n', { fs: 18, b: true, c: 'yellow', s: 2 }),
        txt(300, 405, 'Promedio: media μ, desvío σ/√n', { fs: 18, b: true, c: 'yellow', s: 2 }),
      ], [
        'Una variable sola puede tener cualquier forma, por ejemplo muy asimétrica.',
        'Al **sumar muchas independientes con la misma distribución** y varianza finita, el resultado se aproxima a una normal. La cátedra usa 30 como referencia.',
        'La suma tiene media n por mu y desvío sigma por raíz de n. El **promedio** tiene media mu y desvío sigma sobre raíz de n.',
      ]),
      flow('Una caja con 36 equipos', [
        ['Variable', 'cada equipo: μ = 10 kg, σ = 3 kg', 'Cada equipo pesa en promedio 10 kilos con desvío 3. No sabemos su distribución.'],
        ['Total', 'W = suma de 36 + 20 de embalaje', 'W es la **suma de 36 variables** más una constante de 20.'],
        ['Parámetros', 'μ = 380  ·  σ = √(36·9) = 18', 'La media es 380. La varianza es 36 por 9, o sea 324, y el desvío 18. La constante no suma varianza.'],
        ['TCL', 'P(W > 398) = P(Z > 1) = 0,159', 'Por el teorema, W es aproximadamente normal. Más de 398 es más de un desvío: 0,159.'],
      ]),
    ],
    points: [
      '**Requisitos:** independientes, idéntica distribución, varianza finita, n grande.',
      '**Suma:** ≈ N(nμ; σ√n). **Media:** ≈ N(μ; σ/√n).',
      'Si ya son normales, la suma es normal con cualquier n.',
      '**n·X no es lo mismo que sumar n variables:** V(nX) = n²V(X), V(suma) = n·V(X).',
    ],
    example: { title: 'un proyecto de cuatro tareas normales', body: ['Medias 60, 95, 15, 15 y desvíos 12, 10, 8, 4: μ = 185, σ = √324 = **18**. P(más de 176 días) = **0,691**.'] },
    written: 'W = ΣXᵢ, con Xᵢ independientes e idénticamente distribuidas. μ(W) = nμ, σ(W) = √(nσ²). Como n es grande, por el TCL W es aproximadamente normal aunque no se conozca la distribución de X.',
    trap: '36 equipos distintos son una **suma**: desvío 3·√36 = 18, no 3·36.',
  },
];

const a = asker('u3');
export const U3_QUESTIONS: Question[] = [
  a.mcq('pye-u3-01', 'p3', 'E(X) = 1,3 y E(X²) = 2,5. La varianza es:', '0,81', ['1,2', '2,5', '0,9'], 'V = 2,5 − 1,3² = 0,81. El 0,9 es el desvío.'),
  a.mcq('pye-u3-02', 'p3b', 'En una binomial, "menos de 3" es:', 'P(X ≤ 2)', ['P(X ≤ 3)', 'P(X = 3)', '1 − P(X ≤ 2)'], 'Menos de 3 no incluye al 3.'),
  a.mcq('pye-u3-03', 'p3p', 'Llegan 8 pedidos cada 10 minutos. Para media hora λ es:', '24', ['8', '2,67', '80'], 'λ = tasa · extensión = (8/10) · 30 = 24 pedidos.'),
  a.mcq('pye-u3-04', 'p3e', '¿Cuántas de 20 cajas hay que reprocesar, si la resistencia es normal?', 'Binomial, con p calculada en la normal', ['Poisson con λ = 20', 'Solo normal', 't de Student'], 'La normal da p para una caja; contar cuántas de 20 es binomial.'),
];

const b = asker('u4');
export const U4_QUESTIONS: Question[] = [
  b.tf('pye-u4-01', 'p4', 'Si X es continua, P(X < 5) = P(X ≤ 5).', true, 'Un valor puntual tiene probabilidad cero en una continua.'),
  b.mcq('pye-u4-02', 'p4z', 'Ana: 85 (μ 70, σ 6). Juan: 92 (μ 85, σ 5). ¿Quién rindió mejor en términos relativos?', 'Ana, z = 2,5 contra 1,4', ['Juan, por la nota más alta', 'Juan, por el menor desvío', 'Iguales'], 'Se comparan los z: Ana quedó a 2,5 desvíos de su media y Juan a 1,4.'),
  b.mcq('pye-u4-03', 'p4i', 'Resolución mínima del 40 % de las fotos de mejor calidad:', 'P(60)', ['P(40)', 'P(80)', 'μ + 0,4σ'], 'Si el 40 % está arriba, el 60 % está abajo.'),
];

const c = asker('u5');
export const U5_QUESTIONS: Question[] = [
  c.mcq('pye-u5-01', 'p5', 'X e Y independientes: σx = 3, σy = 4. El desvío de X − Y es:', '5', ['7', '1', '25'], 'V = 9 + 16 = 25 y σ = 5.'),
  c.mcq('pye-u5-02', 'p5t', 'Suma de 50 mouses (σ = 6 g) más una caja constante de 200 g. Su desvío es:', '√(50 · 36) = 42,43 g', ['50 · 6 = 300 g', '42,43 + 200 g', '6/√50 g'], 'Se suman 50 varianzas. La constante no aporta.'),
  c.tf('pye-u5-03', 'p5t', 'El TCL exige que cada variable que se suma sea normal.', false, 'Justamente sirve sin conocer esa distribución, si hay muchas independientes con varianza finita.'),
];

export const U3_MAP: ConceptMap = {
  module: 'u3', root: 'Variables aleatorias discretas',
  branches: [
    { t: 'Tabla de probabilidad', d: 'E = ΣxP · V = E(X²) − E(X)²', topic: 'p3' },
    { t: 'Binomial', d: 'éxitos en n ensayos · np', topic: 'p3b' },
    { t: 'Poisson', d: 'ocurrencias en un continuo · λ', topic: 'p3p' },
    { t: 'Combinarlas', d: 'una da el p de la otra', topic: 'p3e' },
  ],
  links: ['La binomial con n grande se aproxima a la normal: de ahí sale la **Z de proporciones** (Unidad 6).'],
};
export const U4_MAP: ConceptMap = {
  module: 'u4', root: 'Distribución normal',
  branches: [
    { t: 'La campana', d: 'μ y σ · área = probabilidad', topic: 'p4' },
    { t: 'De valor a probabilidad', d: 'Z = (X − μ)/σ', topic: 'p4z' },
    { t: 'De probabilidad a valor', d: 'fractil: x = μ + zσ', topic: 'p4i' },
  ],
  links: ['Los fractiles son los **valores críticos** de los intervalos (Unidad 6).'],
};
export const U5_MAP: ConceptMap = {
  module: 'u5', root: 'Suma de variables y TCL',
  branches: [
    { t: 'Propiedades', d: 'medias con signo · varianzas siempre suman', topic: 'p5' },
    { t: 'TCL', d: 'muchas independientes → normal', topic: 'p5t' },
  ],
  links: ['**σ/√n** es el error estándar de toda la Unidad 6.'],
};
