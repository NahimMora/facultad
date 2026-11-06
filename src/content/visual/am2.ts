/** AM II · final · recorridos visuales propios (gráficos de funciones). */
import type { VisScene } from '../../vis/types';
import { box, head, line, plot, scene, table, txt } from './h';

export const SCENES: Record<string, VisScene[]> = {
  a1: [
    scene([
      head('f(x) = x³ − 3x: extremos y concavidad'),
      plot(40, 45, 470, 380, [-2.5, 2.5], [-4, 4], { xt: 1, yt: 1, xl: 'x', yl: 'y',
        fns: [
          { f: 'x*x*x-3*x', c: 'blue' },
          { pts: [[-1.8, 2], [-0.2, 2]], c: 'yellow', s: 1, dash: true },
          { pts: [[0.2, -2], [1.8, -2]], c: 'yellow', s: 1, dash: true },
        ],
        dots: [{ x: -1, y: 2, t: 'máx (−1, 2)', c: 'green', s: 2 }, { x: 1, y: -2, t: 'mín (1, −2)', c: 'pink', s: 2 }, { x: 0, y: 0, t: 'inflexión', c: 'yellow', s: 4 }],
      }),
      box(540, 50, 240, 80, "f'(x) = 3x² − 3 = 0 → x = ±1", { c: 'yellow', fs: 17, s: 1 }),
      box(540, 145, 240, 95, "f''(x) = 6x · f''(−1) = −6 < 0 → MÁX · f''(1) = 6 > 0 → MÍN", { c: 'green', fs: 15, s: 2 }),
      box(540, 255, 240, 80, "f'' < 0 en x < 0 → ∩ · f'' > 0 en x > 0 → ∪", { c: 'purple', fs: 16, s: 3 }),
      box(540, 350, 240, 80, "Inflexión: f'' CAMBIA de signo en x = 0", { c: 'orange', fs: 16, s: 4 }),
    ], [
      'Tomemos f de x igual a x al cubo menos 3x. Vamos a encontrar sus extremos y su concavidad.',
      'Los **puntos críticos** son donde la derivada se anula: 3x² menos 3 igual a cero, x igual a **más o menos 1**. Ahí la tangente es **horizontal**.',
      '**Criterio de la segunda derivada**: f segunda es 6x. En menos 1 vale menos 6, **negativa**: **máximo**. En 1 vale 6, **positiva**: **mínimo**.',
      'La **concavidad** la da el signo de f segunda: negativa para x menor que 0, la curva se abre hacia abajo; positiva para x mayor que 0, hacia arriba. Como los nombres cóncava y convexa cambian según el libro, en el final **justificá con el signo**.',
      'Un **punto de inflexión** es donde f segunda **cambia de signo**: acá en x igual a 0. Que f segunda valga 0 es necesario, pero no suficiente.',
    ]),
  ],

  a2: [
    scene([
      head('Estudio completo: f(x) = x / (x − 1)'),
      plot(40, 45, 480, 380, [-3, 5], [-4, 6], { xt: 1, yt: 1, xl: 'x', yl: 'y',
        fns: [{ f: 'x/(x-1)', c: 'blue', s: 3 }],
        vl: [{ x: 1, t: 'AV: x = 1', c: 'red', s: 1 }],
        hlines: [{ y: 1, t: 'AH: y = 1', c: 'orange', s: 2 }],
        dots: [{ x: 0, y: 0, t: '(0, 0)', c: 'yellow', s: 0 }],
      }),
      table(545, 50, 235, undefined, [['1. Dominio: x ≠ 1'], ['2. Corte: (0, 0)'], ['3. AV: x = 1'], ['4. AH: y = 1'], ["5. f' < 0: decrece"], ["6. f'': ∩ y ∪"], ['7. Gráfico']], { rh: 52, fs: 16, rs: [0, 0, 1, 2, 3, 3, 3] }),
    ], [
      'Un estudio completo sigue siempre el mismo orden. Dominio: x distinto de 1, porque anula el denominador. Intersección con los ejes: el origen.',
      '**Asíntota vertical**: el límite es infinito cuando x tiende a 1.',
      '**Asíntota horizontal**: cuando x tiende a más o menos infinito, el cociente tiende a 1.',
      'Después f prima, que acá es siempre negativa: la función **decrece** en cada tramo. Con f segunda, la concavidad. Y con todo eso, el gráfico. Para verificar un mínimo en un punto dado: primero que el punto **esté en la gráfica**, después f prima igual a 0 y f segunda positiva.',
    ]),
  ],

  a3: [
    scene([
      head("L'Hôpital: indeterminación 0/0"),
      plot(40, 45, 420, 300, [-6, 6], [-1.5, 6], { xt: 2, yt: 1, xl: 'x',
        fns: [{ f: 'sin(x)', c: 'blue', t: 'sen x → 0' }, { f: 'x', c: 'orange', t: 'x → 0' }, { f: 'sin(x)/x', c: 'green', t: 'sen x / x → 1', s: 2 }],
        dots: [{ x: 0, y: 1, t: '1', c: 'yellow', s: 2 }],
      }),
      box(490, 50, 290, 70, 'lim sen x / x → 0/0', { c: 'red', fs: 20, s: 1 }),
      box(490, 135, 290, 80, "derivo arriba y abajo POR SEPARADO: cos x / 1 → 1", { c: 'green', fs: 17, s: 2 }),
      box(40, 370, 360, 66, '0·∞ → reescribir como cociente', { c: 'purple', fs: 17, s: 3 }),
      box(420, 370, 360, 66, '1^∞, ∞⁰, 0⁰ → L = e^(lim ln …)', { c: 'yellow', fs: 17, s: 4 }),
      box(490, 230, 290, 110, 'Verificá ANTES que sea 0/0 o ∞/∞', { c: 'orange', fs: 18, s: 5 }),
    ], [
      'Cuando x tiende a 0, el seno tiende a 0 y x también.',
      'El cociente da **0 sobre 0**: indeterminado.',
      "La regla de **L'Hôpital** dice que el límite del cociente es el límite del cociente de las **derivadas**, derivando numerador y denominador **por separado**: coseno sobre 1, que da **1**. La curva verde confirma que se acerca a 1.",
      'Si aparece **cero por infinito**, primero lo reescribís como cociente.',
      'Y con potencias indeterminadas, **1 a la infinito, infinito a la 0, 0 a la 0**, tomás logaritmo: el límite es e elevado al límite del logaritmo.',
      'Siempre **verificá antes** que sea 0 sobre 0 o infinito sobre infinito: si no lo es, la regla da cualquier cosa.',
    ]),
  ],

  a4: [
    scene([
      head('Integración por sustitución'),
      box(20, 60, 360, 70, '∫ 5 / (x(2 + ln x)) dx', { c: 'blue', fs: 24 }),
      box(420, 60, 360, 70, 'u = 2 + ln x → du = dx / x', { c: 'yellow', fs: 22, s: 1 }),
      box(20, 160, 360, 70, '∫ 5 / u du', { c: 'green', fs: 26, s: 2 }),
      box(420, 160, 360, 70, '= 5 ln|u| + C = 5 ln|2 + ln x| + C', { c: 'green', fs: 19, s: 3 }),
      box(20, 260, 360, 80, 'Con raíces: t = √x → x = t², dx = 2t dt', { c: 'orange', fs: 18, s: 4 }),
      box(420, 260, 360, 80, 'Partes: ∫ u dv = u·v − ∫ v du', { c: 'purple', fs: 20, s: 5 }),
      box(20, 365, 760, 66, 'Fracciones simples: cociente de polinomios con denominador factorizable', { c: 'pink', fs: 18, s: 6 }),
    ], [
      'La **sustitución** busca dentro de la integral **una función y su derivada**.',
      'Acá, si u es 2 más logaritmo de x, su derivada es 1 sobre x, que ya está en la integral.',
      'Reemplazando, queda la integral de 5 sobre u: inmediata.',
      'Cinco logaritmo de u, y volvemos a x: cinco logaritmo de 2 más logaritmo de x, más C.',
      'Con raíces: t igual a raíz de x, x igual a t al cuadrado, y **dx igual a 2t dt**. Ese 2t es el error más común.',
      'Por **partes**: integral de u dv es u por v menos integral de v du. Sirve para polinomio por exponencial, logaritmo o arcotangente.',
      'Y **fracciones simples** para cocientes de polinomios cuyo denominador se factoriza.',
    ]),
  ],

  a5: [
    scene([
      head('Integral impropia: ¿converge o diverge?'),
      plot(40, 45, 470, 300, [0, 8], [0, 2], { xt: 1, yt: 0.5, xl: 'x',
        fns: [{ f: '1/(x*x)', c: 'green', area: [1, 8], t: '1/x²: área = 1 (converge)' }, { f: '1/x', c: 'red', area: [1, 8], t: '1/x: área → ∞ (diverge)', s: 1 }],
      }),
      box(540, 50, 240, 120, '∫₁^∞ 1/xᵖ converge si p > 1 y vale 1/(p − 1)', { c: 'green', fs: 17, s: 2 }),
      box(540, 185, 240, 110, '∫₀¹ 1/xᵖ converge si p < 1', { c: 'cyan', fs: 18, s: 2 }),
      box(40, 365, 740, 70, 'Trampa: ∫₀⁸ 5x/(3x² − 27): el denominador se anula en x = 3 DENTRO del intervalo → impropia, diverge', { c: 'red', fs: 16, s: 3 }),
      box(540, 310, 240, 40, 'Área: ∫ (arriba − abajo)', { c: 'blue', fs: 16, s: 4 }),
    ], [
      'Una integral **impropia** tiene un intervalo infinito o una función que se dispara dentro del intervalo. Se calcula como **límite**. El área bajo 1 sobre x² desde 1 hasta infinito es **finita**: vale 1. **Converge**.',
      'Pero bajo 1 sobre x, parecida, el área crece sin límite: **diverge**.',
      'La regla de las **p-integrales**: de 1 a infinito de 1 sobre x a la p converge si **p es mayor que 1**. De 0 a 1, converge si p es **menor** que 1.',
      'La trampa del final: 5x sobre 3x² menos 27, de 0 a 8, parece de sustitución, pero el denominador **se anula en x igual a 3**, adentro del intervalo. Es impropia y **diverge**. Ojo, porque hay resoluciones que circulan con un número.',
      'Y para áreas entre curvas: integral de la de **arriba menos la de abajo**, entre los puntos de corte.',
    ]),
  ],

  a6: [
    scene([
      head('Dominio en dos variables: región del plano'),
      plot(40, 45, 470, 380, [-8, 8], [-6.5, 6.5], { xt: 2, yt: 2, xl: 'x', yl: 'y',
        fns: [
          { f: '5*sqrt(1-x*x/36)', c: 'blue', area: [-6, 6], between: '-5*sqrt(1-x*x/36)', s: 1 },
          { f: '-5*sqrt(1-x*x/36)', c: 'blue', s: 1 },
        ],
      }),
      txt(275, 70, '25x² + 36y² ≤ 900', { b: true, fs: 18, c: 'blue', s: 1 }),
      table(530, 50, 250, ['Si aparece…', 'pedís'], [['√ (par)', '≥ 0'], ['√ en denominador', '> 0'], ['ln( )', '> 0'], ['denominador', '≠ 0']], { rh: 44, fs: 15, cw: [1.4, 0.8] }),
      box(530, 290, 250, 70, 'x²/36 + y²/25 ≤ 1: semiejes 6 y 5', { c: 'blue', fs: 16, s: 1 }),
      box(530, 375, 250, 60, 'borde LLENO si ≥ · PUNTEADO si >', { c: 'yellow', fs: 15, s: 2 }),
    ], [
      'El dominio de una función de dos variables es una **región del plano**. Cada operación impone una condición: raíz par, radicando mayor o igual a 0; raíz en el denominador, estrictamente mayor; logaritmo, argumento positivo; y denominador distinto de cero.',
      'Por ejemplo, 25x² más 36y² menor o igual a 900 es una **elipse**: dividiendo por 900, x² sobre 36 más y² sobre 25, con semiejes 6 y 5. El dominio es todo su interior.',
      'El borde se dibuja **lleno** si se incluye, con mayor o igual, y **punteado** si no. Si te piden el área del dominio, es un área entre curvas de una variable.',
    ]),
  ],

  a7: [
    scene([
      head('Límite doble: probar por distintos caminos'),
      plot(40, 45, 420, 380, [-3, 3], [-3, 3], { xt: 1, yt: 1, xl: 'x', yl: 'y',
        fns: [{ f: '0*x', c: 'blue', t: 'y = 0 → 0' }, { f: 'x', c: 'orange', t: 'y = x → 1/2', s: 1 }, { f: '-x', c: 'pink', t: 'y = −x → −1/2', s: 2 }],
        dots: [{ x: 0, y: 0, c: 'yellow' }],
      }),
      box(490, 50, 290, 70, 'f(x, y) = x·y / (x² + y²)', { c: 'white', fs: 20 }),
      box(490, 135, 290, 90, 'por y = m·x: m / (1 + m²) → depende de m', { c: 'orange', fs: 17, s: 1 }),
      box(490, 240, 290, 90, 'Dos caminos con límites distintos → NO EXISTE', { c: 'red', fs: 18, s: 2 }),
      box(490, 345, 290, 90, 'Si da igual por varios caminos, NO alcanza: hay que acotar', { c: 'yellow', fs: 16, s: 3 }),
    ], [
      'En dos variables hay **infinitos caminos** para llegar al origen. Por el eje x, con y igual a 0, esta función vale 0.',
      'Por la recta y igual a x, vale un medio. En general, por y igual a mx da **m sobre 1 más m²**: depende del camino.',
      'Con dos caminos que dan **límites distintos**, el límite doble **no existe**.',
      'Pero ojo con la inversa: que dé lo mismo por varios caminos **no prueba** que exista. Para eso hay que acotar, o pasar a polares.',
    ]),
  ],

  a8: [
    scene([
      head('Derivadas parciales, gradiente y derivada direccional'),
      ...[60, 120, 180].map((r, i) => box(240 - r, 240 - r, 2 * r, 2 * r, '', { shape: 'circle', c: 'blue', dash: true, s: 0, hl: i === 2 ? [] : [] })),
      txt(240, 50, 'curvas de nivel de F = x² + y²', { b: true, fs: 16, c: 'blue' }),
      line([[240, 240], [367, 113]], { c: 'green', sw: 4, arrow: true, s: 1 }),
      txt(395, 100, '∇F', { b: true, fs: 24, c: 'green', s: 1 }),
      line([[240, 240], [410, 240]], { c: 'orange', sw: 4, arrow: true, s: 2 }),
      txt(420, 270, 'u', { b: true, fs: 22, c: 'orange', s: 2 }),
      box(470, 50, 310, 90, 'Fₓ: derivo en x con y CONSTANTE', { c: 'white', fs: 18 }),
      box(470, 155, 310, 80, '∇F = (Fₓ, Fᵧ): perpendicular a las curvas de nivel', { c: 'green', fs: 16, s: 1 }),
      box(470, 250, 310, 80, 'D_u F = ∇F · u (u versor)', { c: 'orange', fs: 19, s: 2 }),
      box(470, 345, 310, 90, 'Máxima en la dirección de ∇F y vale |∇F|', { c: 'yellow', fs: 17, s: 3 }),
    ], [
      'Para la **derivada parcial** respecto de x, se deriva en x tratando a y como **constante**. Y al revés para y. Las cruzadas son iguales, por el teorema de Schwarz.',
      'El **gradiente** junta las parciales en un vector. Apunta hacia donde la función **crece más rápido** y es perpendicular a las curvas de nivel.',
      'La **derivada direccional** en la dirección de un **versor** u es el producto escalar del gradiente con u.',
      'Por eso es **máxima** en la dirección del gradiente, y ese máximo vale el **módulo** del gradiente.',
    ]),
  ],

  a9: [
    scene([
      head('Extremos en dos variables: el hessiano'),
      ...[45, 90, 135].map((r) => box(150 - r, 210 - r, 2 * r, 2 * r * 0.75, '', { shape: 'circle', c: 'green', dash: true })),
      txt(150, 210, 'máx o mín', { b: true, fs: 16, c: 'green' }),
      plot(310, 75, 270, 270, [-3, 3], [-3, 3], { ticks: false, s: 1, fns: [
        { f: 'sqrt(x*x+1)', c: 'red' }, { f: '-sqrt(x*x+1)', c: 'red' }, { f: 'sqrt(x*x+3)', c: 'red' }, { f: '-sqrt(x*x+3)', c: 'red' },
        { f: 'sqrt(max(x*x-1,0))*(abs(x)>=1?1:NaN)', c: 'orange' }, { f: '-sqrt(max(x*x-1,0))*(abs(x)>=1?1:NaN)', c: 'orange' },
      ] }),
      txt(445, 365, 'ensilladura', { b: true, fs: 16, c: 'red', s: 1 }),
      box(600, 55, 180, 70, 'Fₓ = 0 y Fᵧ = 0', { c: 'yellow', fs: 18 }),
      box(600, 140, 180, 70, 'H = Fₓₓ·Fᵧᵧ − Fₓᵧ²', { c: 'white', fs: 17, s: 2 }),
      table(30, 385, 750, undefined, [['H > 0 y Fₓₓ > 0 → MÍNIMO', 'H > 0 y Fₓₓ < 0 → MÁXIMO', 'H < 0 → ENSILLADURA', 'H = 0 → no decide']], { rh: 50, fs: 14, s: 3 }),
      box(600, 225, 180, 120, 'Con condición g = 0: Lagrange o despejar y sustituir', { c: 'purple', fs: 15, s: 4 }),
    ], [
      'Un **punto crítico** en dos variables anula las dos parciales a la vez. Cerca de un máximo o un mínimo, las curvas de nivel son **cerradas**, como óvalos.',
      'En un **punto de ensilladura**, las curvas de nivel son como hipérbolas: sube en una dirección y baja en otra.',
      'Para distinguirlos se calcula el **hessiano**: F x x por F y y, menos F x y al cuadrado.',
      'Hessiano **positivo** y F x x **positiva**: mínimo. Hessiano positivo y F x x **negativa**: máximo. Hessiano **negativo**: ensilladura. Y si da **cero**, el criterio no decide.',
      'Si los extremos son **ligados**, con una condición, se usan multiplicadores de Lagrange o se despeja y se sustituye.',
    ]),
  ],
};

export const EX_SCENES: Record<string, VisScene[]> = {
  'am2-e1': [
    scene([
      head('Final: f(x) = 3x⁴ − 6x³ − 36'),
      plot(40, 45, 470, 380, [-1.5, 2.5], [-45, 2], { xt: 0.5, yt: 10, xl: 'x',
        fns: [{ f: '3*pow(x,4)-6*pow(x,3)-36', c: 'blue' }],
        dots: [{ x: 0, y: -36, t: '(0, −36)', c: 'yellow', s: 2 }, { x: 1, y: -39, t: '(1, −39)', c: 'yellow', s: 2 }],
        vl: [{ x: 0, c: 'gray', s: 1 }, { x: 1, c: 'gray', s: 1 }],
      }),
      box(530, 50, 250, 80, "f'' = 36x² − 36x = 36x(x − 1)", { c: 'white', fs: 16 }),
      table(530, 145, 250, ['intervalo', "f''", 'forma'], [['(−∞, 0)', '+', '∪'], ['(0, 1)', '−', '∩'], ['(1, +∞)', '+', '∪']], { rh: 38, fs: 16, s: 1 }),
      box(530, 315, 250, 120, "∫₁ᵉ f'''/x dx = ∫₁ᵉ (72 − 36/x) dx = 72e − 108 ≈ 87,7", { c: 'green', fs: 16, s: 3 }),
    ], [
      'Derivamos dos veces: f segunda es 36x² menos 36x, que factorizado es **36x por x menos 1**.',
      'El signo de f segunda: positivo antes de 0, negativo entre 0 y 1, positivo después de 1. Esa es la concavidad.',
      'Cambia de signo en x igual a 0 y en x igual a 1: los **puntos de inflexión** son (0, menos 36) y (1, menos 39). Se informan como puntos, con su imagen.',
      'Para la integral: f tercera es 72x menos 36; dividido x queda 72 menos 36 sobre x. Integrando de 1 a e: 72 por e menos 1, menos 36 por logaritmo de e: **72e menos 108**, cerca de 87,7.',
    ]),
  ],
  'am2-e2': [
    scene([
      head('Final: dominio de F y su área'),
      plot(40, 45, 470, 380, [-2, 3], [0, 16], { xt: 1, yt: 2, xl: 'x', yl: 'y',
        fns: [
          { f: '2*x+8', c: 'yellow', area: [-1, 2], between: '2*x*x+4', s: 3 },
          { f: '2*x+8', c: 'green', t: 'y = 2x + 8 (incluida)' },
          { f: '2*x*x+4', c: 'orange', dash: true, t: 'y = 2x² + 4 (excluida)', s: 1 },
        ],
        dots: [{ x: -1, y: 6, t: '(−1, 6)', c: 'white', s: 2 }, { x: 2, y: 12, t: '(2, 12)', c: 'white', s: 2 }],
      }),
      box(530, 50, 250, 80, 'numerador: y ≤ 2x + 8', { c: 'green', fs: 18 }),
      box(530, 145, 250, 80, 'raíz 4ª en el denominador: y > 2x² + 4', { c: 'orange', fs: 16, s: 1 }),
      box(530, 240, 250, 80, '2x² + 4 = 2x + 8 → x = −1, x = 2', { c: 'white', fs: 16, s: 2 }),
      box(530, 335, 250, 100, 'Área = ∫₋₁² (2x + 4 − 2x²) dx = 9', { c: 'yellow', fs: 19, s: 3 }),
    ], [
      'La raíz cuadrada del numerador pide radicando mayor o igual a cero: **y menor o igual a 2x más 8**. La recta va **llena**.',
      'La raíz cuarta del denominador pide radicando **estrictamente** positivo: **y mayor que 2x² más 4**. La parábola va **punteada**.',
      'La región queda entre la parábola, abajo, y la recta, arriba. Se cortan cuando 2x² más 4 es igual a 2x más 8: x igual a **menos 1** y x igual a **2**.',
      'El área: integral de menos 1 a 2 de la recta menos la parábola: **9**.',
    ]),
  ],
  'am2-e3': [
    scene([
      head('Final: F = (b + 1)x − x² − y²'),
      box(30, 60, 360, 80, 'Fₓ = b + 1 − 2x = 0 en x = 3 → b = 5', { c: 'yellow', fs: 18 }),
      box(410, 60, 360, 80, 'Fᵧ = −2y = 0 en y = 0 ✔', { c: 'yellow', fs: 18, s: 1 }),
      box(30, 165, 740, 70, 'Fₓₓ = −2 · Fᵧᵧ = −2 · Fₓᵧ = 0 → H = (−2)(−2) − 0 = 4', { c: 'white', fs: 19, s: 2 }),
      box(30, 260, 740, 70, 'H > 0 y Fₓₓ < 0 → MÁXIMO relativo', { c: 'green', fs: 22, s: 3 }),
      box(30, 355, 740, 70, 'F(3, 0) = 6·3 − 9 − 0 = 9 → máximo en (3, 0, 9)', { c: 'cyan', fs: 20, s: 4 }),
    ], [
      'Queremos un punto crítico en (3, 0). La parcial en x es b más 1 menos 2x; igualada a cero en x igual a 3, da **b igual a 5**.',
      'La parcial en y es menos 2y, que se anula en y igual a 0. Se cumple.',
      'Las segundas: F x x menos 2, F y y menos 2 y la cruzada 0. Hessiano: **4**.',
      'Hessiano positivo y F x x negativa: **máximo** relativo.',
      'El valor: F de (3, 0) con b igual a 5 es 18 menos 9, **9**.',
    ]),
  ],
  'am2-e4': [
    scene([
      head('Final: lim (2x + eˣ)^(1/x) con x → +∞'),
      box(30, 60, 740, 70, 'Es ∞⁰ → tomo logaritmo: ln L = lim ln(2x + eˣ) / x', { c: 'yellow', fs: 20 }),
      box(30, 155, 740, 70, "∞/∞ → L'Hôpital: (2 + eˣ) / (2x + eˣ)", { c: 'blue', fs: 20, s: 1 }),
      box(30, 250, 740, 70, "otra vez ∞/∞ → eˣ / (2 + eˣ) → 1", { c: 'green', fs: 20, s: 2 }),
      box(200, 345, 400, 80, 'ln L = 1 → L = e', { c: 'pink', fs: 30, s: 3 }),
    ], [
      'La base tiende a infinito y el exponente, 1 sobre x, a cero: **infinito a la cero**. Tomamos logaritmo: el exponente baja multiplicando.',
      'Queda logaritmo de 2x más e a la x, sobre x: infinito sobre infinito. Aplicamos **L’Hôpital**: derivada de arriba sobre derivada de abajo.',
      'Sigue infinito sobre infinito, y lo aplicamos otra vez: e a la x sobre 2 más e a la x, que tiende a **1**.',
      'Entonces el logaritmo de L es 1, y **L es e**. El truco: e a la x domina sobre 2x, así que el límite del logaritmo es el exponente de la e.',
    ]),
  ],
};
