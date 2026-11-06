/** PyE · final · recorridos visuales propios. */
import type { VisScene } from '../../vis/types';
import { arr, bars, box, head, line, plot, scene, table, tree, txt } from './h';

const NORMAL = 'exp(-x*x/2)/sqrt(2*PI)';
const ci = [390, 420, 360, 405, 445, 380, 500, 410, 395, 430];

export const SCENES: Record<string, VisScene[]> = {
  p1: [
    scene([
      head('Forma de una distribución: Mo, Me y x̄'),
      plot(30, 50, 360, 270, [0, 8], [0, 0.42], { ticks: false, xl: 'x', fns: [{ f: 'x*exp(-x)', c: 'blue', area: [0, 8] }], vl: [{ x: 1, c: 'pink', s: 1 }, { x: 1.68, c: 'yellow', s: 2 }, { x: 2, c: 'green', s: 3 }] }),
      txt(66, 62, 'Mo', { fs: 16, b: true, c: 'pink', s: 1 }), txt(112, 84, 'Me', { fs: 16, b: true, c: 'yellow', s: 2 }), txt(134, 106, 'x̄', { fs: 18, b: true, c: 'green', s: 3 }),
      txt(210, 345, 'ASIMÉTRICA POSITIVA (cola a la derecha)', { b: true, fs: 17, c: 'blue', s: 4 }),
      txt(210, 375, 'Mo < Me < x̄', { b: true, fs: 24, c: 'yellow', s: 4 }),
      plot(420, 50, 360, 270, [0, 8], [0, 0.42], { ticks: false, s: 5, fns: [{ f: '(8-x)*exp(-(8-x))', c: 'orange', area: [0, 8] }], vl: [{ x: 7, c: 'pink' }, { x: 6.32, c: 'yellow' }, { x: 6, c: 'green' }] }),
      txt(748, 62, 'Mo', { fs: 16, b: true, c: 'pink', s: 5 }), txt(696, 84, 'Me', { fs: 16, b: true, c: 'yellow', s: 5 }), txt(676, 106, 'x̄', { fs: 18, b: true, c: 'green', s: 5 }),
      txt(600, 345, 'ASIMÉTRICA NEGATIVA (cola a la izquierda)', { b: true, fs: 17, c: 'orange', s: 5 }),
      txt(600, 375, 'x̄ < Me < Mo', { b: true, fs: 24, c: 'yellow', s: 5 }),
      txt(400, 425, 'Simétrica: media = mediana = moda', { b: true, fs: 19, c: 'gray', s: 6 }),
    ], [
      'La **forma** de una distribución se lee comparando tres medidas. Esta tiene muchos valores bajos y una **cola larga hacia la derecha**.',
      'La **moda**, el valor más frecuente, está donde la curva es más alta: bien a la izquierda.',
      'La **mediana** deja la mitad de los datos de cada lado: un poco más a la derecha.',
      'Y la **media** es la más arrastrada por la cola, porque los valores extremos la empujan.',
      'Moda menor que mediana menor que media: **asimétrica positiva**, o a derecha. Ojo: en un modelo de final circula una respuesta que llama "negativa" a este orden, y está mal.',
      'El espejo: cola a la izquierda, media menor que mediana menor que moda: **asimétrica negativa**.',
      'Y si es **simétrica**, las tres coinciden.',
    ]),
    scene([
      head('Comparar heterogeneidad: coeficiente de variación'),
      table(30, 55, 420, ['Sector', 'x̄', 's', 'CV = s / x̄'], [['Administración', '2590', '396', '0,153'], ['Comercial', '2915', '669', '0,229']], { rh: 46, fs: 18, cw: [1.6, 1, 1, 1.4], hi: [{ r: 1, s: 2, c: 'yellow' }] }),
      bars(480, 60, 300, 200, [{ t: 'Adm.', v: 0.153, c: 'blue' }, { t: 'Com.', v: 0.229, c: 'orange' }], { s: 1, max: 0.25 }),
      txt(250, 220, 'Mayor CV → más HETEROGÉNEO', { b: true, fs: 21, c: 'orange', s: 2 }),
      line([[40, 330], [760, 330]], { c: 'gray', sw: 3, s: 3 }),
      box(40, 310, 540, 40, '75 % de los datos', { c: 'blue', solid: true, fs: 18, s: 3 }),
      box(580, 310, 180, 40, '25 %', { c: 'gray', fs: 18, s: 3 }),
      txt(580, 380, 'P(75) = 2809,8', { b: true, fs: 21, c: 'yellow', s: 3 }),
      txt(400, 425, 'P(75): el 75 % de los datos está POR DEBAJO de ese valor', { b: true, fs: 18, c: 'cyan', s: 4 }),
    ], [
      'Pregunta de final: ¿en qué sector las remuneraciones son **más heterogéneas**? Como las medias son distintas, comparar solo los desvíos no alcanza.',
      'Se usa el **coeficiente de variación**: desvío dividido media. No tiene unidades, así que compara grupos distintos.',
      'Administración da 0,153 y comercial 0,229: **mayor CV, más heterogéneo**. Comercial.',
      'Otro clásico: el **percentil 75**. En administración vale 2809,8 miles de pesos.',
      'Se interpreta así: el **75 % de los empleados cobra menos** que eso. El percentil deja por debajo el porcentaje que indica.',
    ]),
  ],

  p2: [
    scene([
      head('Probabilidad: unión, intersección y condicional'),
      box(40, 60, 460, 300, '', { c: 'gray' }), txt(70, 85, 'Ω', { b: true, fs: 22, c: 'gray' }),
      box(80, 100, 230, 220, '', { shape: 'circle', c: 'blue' }), txt(140, 210, 'A', { b: true, fs: 30, c: 'blue' }),
      box(230, 100, 230, 220, '', { shape: 'circle', c: 'orange' }), txt(400, 210, 'B', { b: true, fs: 30, c: 'orange' }),
      box(240, 160, 60, 100, 'A∩B', { c: 'green', solid: true, fs: 16, s: 1 }),
      box(530, 60, 250, 80, 'P(A∪B) = P(A) + P(B) − P(A∩B)', { c: 'blue', fs: 16, s: 2 }),
      box(530, 155, 250, 80, 'P(A / B) = P(A∩B) / P(B)', { c: 'green', fs: 17, s: 3 }),
      box(530, 250, 250, 90, 'Independientes: P(A∩B) = P(A)·P(B) → P(A/B) = P(A)', { c: 'purple', fs: 16, s: 4 }),
      box(60, 380, 680, 56, 'Excluyentes: A∩B vacío. Si P > 0, entonces NO son independientes', { c: 'red', fs: 18, s: 5 }),
    ], [
      'Dibujamos el espacio muestral con dos sucesos, A y B.',
      'La zona común es la **intersección**: que ocurran los dos.',
      'Para la **unión** se suman las dos probabilidades y se **resta la intersección**, que si no quedaría contada dos veces.',
      'La **condicional**, A dado B: nos paramos solo dentro de B y miramos qué parte es también A. Intersección sobre P de B.',
      '**Independientes**: la intersección es el producto, y entonces saber que pasó B **no cambia** la probabilidad de A. Errores de respiración 0,27 y postura 0,46, independientes: ambos, 0,1242; y postura dado respiración sigue siendo 0,46.',
      'No confundir con **excluyentes**: no pueden ocurrir juntos. Si los dos tienen probabilidad positiva, son **dependientes**, porque que ocurra uno impide el otro.',
    ]),
  ],

  p3: [
    scene([
      head('Binomial (n = 10, p = 0,3): éxitos en n ensayos'),
      bars(40, 70, 720, 280, [2.8, 12.1, 23.3, 26.7, 20, 10.3, 3.7, 0.9, 0.1].map((v, k) => ({ t: `${k}`, v, c: k === 3 ? 'yellow' as const : 'blue' as const, s: 1 })), { unit: ' %', max: 28 }),
      txt(400, 395, 'X = cantidad de éxitos · ensayos independientes · p constante', { b: true, fs: 18, c: 'gray' }),
      txt(400, 430, 'E(X) = n·p = 3 · V(X) = n·p·(1 − p) = 2,1', { b: true, fs: 21, c: 'yellow', s: 2 }),
    ], [
      'La **binomial** cuenta **éxitos** en **n ensayos independientes**, cada uno con la **misma probabilidad de éxito** p. Por ejemplo, 10 llamadas donde cada una tiene 30 % de concretar una venta.',
      'Estas son las probabilidades de 0, 1, 2… éxitos. Lo más probable es alrededor de 3.',
      'La esperanza es **n por p**, 10 por 0,3: **3**. Y la varianza, **n p por uno menos p**: 2,1.',
    ]),
    scene([
      head('Poisson (λ = 2 por hora): ocurrencias en un intervalo'),
      bars(40, 70, 720, 270, [13.5, 27.1, 27.1, 18, 9, 3.6, 1.2].map((v, k) => ({ t: `${k}`, v, c: 'green' as const })), { unit: ' %', max: 28 }),
      txt(400, 385, 'llamadas por hora, autos por minuto, fallas por metro…', { b: true, fs: 18, c: 'gray' }),
      txt(400, 425, 'E(X) = V(X) = λ · media hora → λ = 1', { b: true, fs: 22, c: 'yellow', s: 1 }),
    ], [
      'La **Poisson** cuenta **ocurrencias en un intervalo** de tiempo o espacio con una tasa media **lambda**. Por ejemplo, llamadas por hora con promedio 2. A diferencia de la binomial, no hay un número fijo de ensayos.',
      'Su propiedad clave: **media igual a varianza igual a lambda**. Y si cambia el intervalo, lambda cambia en proporción: 2 por hora es 1 por media hora.',
    ]),
  ],

  p4: [
    scene([
      head('Normal estándar: regla 68 – 95 – 99,7'),
      plot(40, 50, 720, 300, [-4, 4], [0, 0.45], { xt: 1, fns: [
        { f: NORMAL, c: 'gray' },
        { f: NORMAL, c: 'purple', area: [-3, 3], s: 3 },
        { f: NORMAL, c: 'orange', area: [-2, 2], s: 2 },
        { f: NORMAL, c: 'blue', area: [-1, 1], s: 1 },
      ], xl: 'z' }),
      txt(400, 385, 'μ ± σ ≈ 68 %', { b: true, fs: 22, c: 'blue', s: 1 }),
      txt(180, 420, 'μ ± 2σ ≈ 95 %', { b: true, fs: 22, c: 'orange', s: 2 }),
      txt(620, 420, 'μ ± 3σ ≈ 99,7 %', { b: true, fs: 22, c: 'purple', s: 3 }),
    ], [
      'La **normal** es una campana **simétrica**: media, mediana y moda coinciden en el centro.',
      'Entre la media menos un desvío y la media más un desvío queda cerca del **68 %** de los datos.',
      'Con **dos desvíos**, cerca del **95 %**.',
      'Y con **tres desvíos**, el **99,7 %**: casi todo.',
    ]),
    scene([
      head('Estandarizar: Z = (x − μ) / σ'),
      plot(40, 50, 720, 260, [430, 570], [0, 1.1], { xt: 20, ticks: true, fns: [{ f: 'exp(-pow((x-500)/20,2)/2)', c: 'blue' }, { f: 'exp(-pow((x-500)/20,2)/2)', c: 'red', area: [530, 570], s: 2 }], vl: [{ x: 500, t: 'μ = 500', c: 'gray' }, { x: 530, t: 'x = 530', c: 'yellow', s: 1 }] }),
      txt(400, 345, 'X ~ N(μ = 500, σ = 20)', { b: true, fs: 20, c: 'gray' }),
      box(60, 355, 330, 60, 'Z = (530 − 500) / 20 = 1,5', { c: 'yellow', fs: 20, s: 1 }),
      box(410, 355, 330, 60, 'P(X > 530) = P(Z > 1,5) ≈ 0,067', { c: 'red', fs: 19, s: 2 }),
      txt(400, 434, 'Al revés (percentil): x = μ + z·σ', { b: true, fs: 18, c: 'cyan', s: 3 }),
    ], [
      'Cualquier normal se lleva a la **normal estándar**. Acá X tiene media 500 y desvío 20.',
      'Para x = 530: **Z = x menos mu, sobre sigma**: 30 sobre 20, **1,5**. O sea, 530 está a 1,5 desvíos por encima de la media.',
      'Con Z buscás en la tabla: la probabilidad de superar 530 es la cola derecha, cerca de **0,067**.',
      'Y al revés, para un **percentil**: x es mu más z por sigma. Para el percentil 80, z vale aproximadamente 0,84.',
    ]),
  ],

  p5: [
    scene([
      head('Teorema Central del Límite'),
      plot(30, 60, 340, 240, [0, 5], [0, 1.1], { ticks: false, xl: 'x', fns: [{ f: 'exp(-x)', c: 'orange', area: [0, 5] }] }),
      txt(200, 330, 'población: cualquier forma', { b: true, fs: 18, c: 'orange' }),
      arr([380, 180], [440, 180], { c: 'white', s: 1, t: 'n ≥ 30', sw: 4 }),
      plot(450, 60, 330, 240, [0, 2], [0, 1.1], { ticks: false, xl: 'x̄', s: 2, fns: [{ f: 'exp(-pow((x-1)/0.18,2)/2)', c: 'green', area: [0, 2] }] }),
      txt(615, 330, 'x̄ ≈ Normal(μ, σ/√n)', { b: true, fs: 20, c: 'green', s: 2 }),
      box(40, 365, 720, 70, 'Sumas: E(aX + bY) = aE(X) + bE(Y) · si son independientes V(aX + bY) = a²V(X) + b²V(Y)', { c: 'purple', fs: 17, s: 3 }),
    ], [
      'La población puede tener **cualquier forma**: esta es muy asimétrica.',
      'Pero si tomamos muestras de tamaño **n grande**, 30 o más, y calculamos la **media** de cada una…',
      '…las medias muestrales se distribuyen **aproximadamente normal**, centradas en mu y con desvío **sigma sobre raíz de n**: cada vez más angostas. Eso es el **Teorema Central del Límite**.',
      'Para sumas de variables: la esperanza siempre es lineal. Y si son independientes, las varianzas se suman con los coeficientes al cuadrado: por eso V de X menos Y es V de X **más** V de Y.',
    ]),
  ],

  p6: [
    scene([
      head('Intervalo de confianza: estima el PARÁMETRO'),
      line([[400, 55], [400, 400]], { c: 'yellow', sw: 3, dash: true }),
      txt(400, 420, 'μ real (desconocido)', { b: true, fs: 18, c: 'yellow' }),
      ...ci.map((c, i) => line([[c - 70, 75 + i * 32], [c + 70, 75 + i * 32]], { c: c - 70 > 400 || c + 70 < 400 ? 'red' : 'green', sw: 6, s: i < 3 ? 1 : 2 })),
      txt(660, 270, '← no lo contiene', { b: true, fs: 17, c: 'red', s: 2, anchor: 'start' }),
      box(520, 60, 260, 120, '"Con 95 % de confianza, la MEDIA poblacional está entre a y b"', { c: 'green', fs: 16, s: 3 }),
      box(20, 60, 230, 80, 'σ desconocido → t de Student', { c: 'purple', fs: 16, s: 4 }),
    ], [
      'La **media poblacional** mu es fija pero desconocida: la línea amarilla.',
      'Cada muestra da un intervalo distinto. La mayoría **contiene** a mu.',
      'Si construimos muchos intervalos al 95 %, alrededor del 95 % lo contiene y algunos, como el rojo, no.',
      'Por eso se interpreta sobre el **parámetro**: "con 95 % de confianza, la **media** poblacional está entre a y b". **No** es "el 95 % de las unidades está entre a y b": esa es la respuesta incorrecta típica.',
      'Si no conocés sigma y lo estimás con s, se usa la **t de Student** con n menos 1 grados de libertad.',
    ]),
    scene([
      head('Prueba de hipótesis unilateral derecha (α = 0,05)'),
      plot(40, 50, 720, 270, [-4, 4], [0, 0.45], { xt: 1, xl: 'z', fns: [{ f: NORMAL, c: 'blue' }, { f: NORMAL, c: 'red', area: [1.645, 4], s: 1 }], vl: [{ x: 1.645, t: 'α', c: 'red', s: 1 }, { x: 1.9, t: 'z = 1,9', c: 'yellow', s: 2, out: 3 }, { x: 1.2, t: 'z = 1,2', c: 'cyan', s: 3 }] }),
      box(40, 345, 340, 90, 'H0: μc = μa (lleva el =) · H1: μc > μa (lo que quiero probar)', { c: 'blue', fs: 16 }),
      box(410, 345, 350, 40, 'p-v = 0,029 < α → RECHAZO H0', { c: 'red', fs: 18, s: 2, out: 3 }),
      box(410, 345, 350, 40, 'p-v = 0,115 ≥ α → NO rechazo H0', { c: 'cyan', fs: 18, s: 3 }),
      txt(585, 415, 'Regla: p-valor < α → se rechaza H0', { b: true, fs: 18, c: 'yellow', s: 4 }),
    ], [
      'En una prueba de hipótesis, **H1** es lo que querés probar, sin igual, y define la cola: si es "mayor", la prueba es **unilateral derecha**. **H0** lleva el igual.',
      'Con alfa 0,05 queda una **zona de rechazo** del 5 % en la cola derecha.',
      'Si el estadístico cae ahí, el **p-valor**, la cola que queda a su derecha, es menor que alfa: **se rechaza H0**.',
      'Si cae fuera, el p-valor es mayor o igual que alfa y **no se rechaza H0**: no hay evidencia suficiente.',
      'La regla para recordar: **p-valor menor que alfa, se rechaza H0**. Y H1 nunca "se rechaza": siempre se decide sobre H0.',
    ]),
    scene([
      head('Errores tipo I y tipo II'),
      table(60, 70, 680, ['Decisión ↓ · Realidad →', 'H0 verdadera', 'H0 falsa'], [['No rechazo H0', '✔ correcto (1 − α)', '✘ Error TIPO II (β)'], ['Rechazo H0', '✘ Error TIPO I (α)', '✔ Potencia (1 − β)']], { rh: 64, fs: 19, cw: [1.4, 1.3, 1.3], hi: [{ r: 1, s: 1, c: 'red', to: 2 }, { r: 0, s: 2, c: 'orange', to: 3 }, { r: 1, s: 3, c: 'green' }] }),
      box(60, 300, 330, 120, 'Si RECHAZASTE, el error posible es el tipo I', { c: 'red', fs: 20, s: 4 }),
      box(410, 300, 330, 120, 'Si NO rechazaste, el error posible es el tipo II', { c: 'orange', fs: 20, s: 4 }),
    ], [
      'Toda decisión puede equivocarse. Cruzamos lo que **decidiste** con lo que **es verdad**.',
      '**Error tipo I**: rechazar H0 cuando era **verdadera**. Su probabilidad es **alfa**.',
      '**Error tipo II**: **no** rechazar H0 cuando era **falsa**. Su probabilidad es **beta**.',
      'Y la **potencia**, uno menos beta: rechazar H0 cuando efectivamente es falsa, es decir, detectar el efecto.',
      'En el final te preguntan qué error pudiste cometer: si **rechazaste**, solo el **tipo I**; si **no rechazaste**, solo el **tipo II**. Y hay que escribirlo **en términos del problema**.',
    ]),
  ],

  p7: [
    scene([
      head('¿Qué prueba uso para comparar dos poblaciones?'),
      tree(20, 55, 760, 300, {
        t: '¿Qué variable?', c: 'yellow', kids: [
          { t: 'Cuantitativa', c: 'blue', s: 1, kids: [
            { t: 'Grupos distintos → independientes', c: 'green', s: 2, e: '2 grupos' },
            { t: 'Mismos individuos → apareadas', c: 'orange', s: 3, e: 'antes/después' },
          ] },
          { t: 'Cualitativa', c: 'pink', s: 4, kids: [{ t: 'Diferencia de proporciones', c: 'pink', s: 4 }] },
        ],
      }, { fs: 16 }),
      box(40, 370, 720, 60, 'Independientes: antes se prueba homogeneidad de varianzas (H0: σ₁² = σ₂²)', { c: 'green', fs: 17, s: 2 }),
    ], [
      'Para elegir la prueba, primero mirá la **variable**.',
      'Si es **cuantitativa**, la pregunta es cómo son las muestras.',
      'Si son **dos grupos distintos de individuos**, como administrativos y comerciales, es **diferencia de medias con muestras independientes**. Antes se prueba la **homogeneidad de varianzas**.',
      'Si son **los mismos individuos medidos dos veces**, antes y después de una dieta, son **muestras apareadas**: se trabaja con las diferencias.',
      'Y si la variable es **cualitativa**, se compara con **diferencia de proporciones**.',
    ]),
  ],

  p8: [
    scene([
      head('Chi cuadrado: bondad de ajuste vs independencia'),
      box(30, 60, 360, 160, 'BONDAD DE AJUSTE', { c: 'blue', fs: 22, sub: '1 variable: ¿sigue una proporción teórica o histórica? · g.l. = k − 1' }),
      box(410, 60, 360, 160, 'INDEPENDENCIA', { c: 'orange', fs: 22, sub: '2 variables cualitativas en una tabla de contingencia · g.l. = (f − 1)(c − 1)', s: 1 }),
      plot(60, 250, 680, 150, [0, 12], [0, 0.26], { ticks: false, xl: 'χ²', s: 2, fns: [{ f: 'x*exp(-x/2)/4', c: 'purple' }, { f: 'x*exp(-x/2)/4', c: 'red', area: [7.8, 12] }] }),
      txt(400, 430, '4 categorías → 3 g.l. · p-v = 0,1031 > α = 0,08 → no se rechaza H0', { b: true, fs: 17, c: 'yellow', s: 3 }),
    ], [
      'El **Chi cuadrado de bondad de ajuste** trabaja con **una** variable cualitativa: ¿la distribución observada sigue una proporción teórica o histórica? Grados de libertad: **categorías menos uno**.',
      'El **Chi cuadrado de independencia** cruza **dos** variables cualitativas en una tabla de contingencia. Grados de libertad: **filas menos uno por columnas menos uno**.',
      'En los dos casos, cuanto más grande el Chi cuadrado, más lejos está lo observado de lo esperado, y se rechaza en la **cola derecha**.',
      'Ejemplo de final: tiempo de conexión en 4 categorías contra la proporción histórica, 3 grados de libertad, p-valor 0,1031 con alfa 0,08: **no se rechaza H0**, sigue la proporción histórica. Las pruebas **no paramétricas**, además, no suponen normalidad.',
    ]),
  ],

  p9: [
    scene([
      head('Regresión lineal: ŷ = a + b·x'),
      plot(40, 50, 480, 330, [0, 10], [0, 10], { xt: 2, yt: 2, xl: 'x', yl: 'y',
        dots: [[1, 2.6], [2, 3.9], [3, 4.0], [4, 5.4], [5, 5.6], [6, 7.2], [7, 7.3], [8, 8.4], [9, 9.6]].map(([x, y]) => ({ x, y, c: 'white' as const })),
        fns: [{ f: '2 + 0.8*x', c: 'blue', s: 1 }, { pts: [[5, 6], [6, 6], [6, 6.8]], c: 'yellow', s: 2 }],
      }),
      box(22, 296, 36, 36, '', { shape: 'circle', c: 'pink', dash: true, s: 3 }),
      box(550, 60, 230, 80, 'b = 0,8: por cada unidad de x, y sube 0,8', { c: 'yellow', fs: 16, s: 2 }),
      box(550, 155, 230, 80, 'a = 2: y cuando x = 0 (puede no tener sentido)', { c: 'pink', fs: 16, s: 3 }),
      box(550, 250, 230, 80, 'r = 0,931 → r² = 0,867 = 86,7 % explicado', { c: 'green', fs: 16, s: 4 }),
      box(550, 345, 230, 80, 'Asociación lineal, NUNCA causalidad', { c: 'red', fs: 17, s: 5 }),
    ], [
      'La **regresión lineal** ajusta una recta a una nube de puntos.',
      'La recta es y sombrero igual a **a más b por x**.',
      'La **pendiente b**: por cada unidad que aumenta x, y cambia **b** unidades en promedio. Cuidado con las unidades: 0,17 cientos de unidades por cada 100 pesos son **17 unidades**.',
      'La **ordenada a** es el valor de y cuando x vale 0. Muchas veces **no tiene sentido práctico**, como una ciudad con cero habitantes.',
      'La correlación **r** mide fuerza y sentido; **r cuadrado** es el **porcentaje de la variación de y explicada** por x. Si r es 0,931, r cuadrado es **0,867**: 86,7 %, no 93,1. Para la cátedra el modelo sirve para pronosticar si r cuadrado supera 0,5.',
      'Y la trampa más grande: que la pendiente sea significativa indica **asociación lineal**, **nunca causalidad**.',
    ]),
  ],
};

export const EX_SCENES: Record<string, VisScene[]> = {
  'pye-e3': [
    scene([
      head('Probabilidad total y Bayes con un árbol'),
      tree(20, 50, 520, 260, {
        t: 'llamada', c: 'gray', kids: [
          { t: 'Zona A', c: 'blue', e: '0,3', s: 0, kids: [{ t: 'reclama', c: 'red', e: '0,12', s: 1 }, { t: 'no', c: 'gray', e: '0,88', s: 1 }] },
          { t: 'Zona B', c: 'orange', e: '0,7', s: 0, kids: [{ t: 'reclama', c: 'red', e: '0,16', s: 1 }, { t: 'no', c: 'gray', e: '0,84', s: 1 }] },
        ],
      }, { fs: 17 }),
      box(560, 60, 220, 70, 'A y R: 0,3 · 0,12 = 0,036', { c: 'blue', fs: 17, s: 2 }),
      box(560, 145, 220, 70, 'B y R: 0,7 · 0,16 = 0,112', { c: 'orange', fs: 17, s: 2 }),
      box(560, 230, 220, 70, 'P(R) = 0,148', { c: 'red', fs: 22, s: 3 }),
      box(100, 340, 600, 80, 'Bayes: P(A / R) = 0,036 / 0,148 ≈ 0,243', { c: 'yellow', fs: 22, s: 4 }),
    ], [
      'El 30 % de las llamadas viene de la zona A y el 70 % de la B.',
      'Reclama el 12 % de A y el 16 % de B. Esas son probabilidades **condicionales**.',
      'Multiplicamos a lo largo de cada rama que termina en reclamo: 0,3 por 0,12 da 0,036, y 0,7 por 0,16 da 0,112.',
      '**Probabilidad total**: se suman las ramas, **0,148**.',
      '**Bayes** da vuelta la pregunta: si hubo reclamo, ¿qué probabilidad hay de que sea de A? La rama de A sobre el total: 0,036 sobre 0,148, cerca de **0,24**.',
    ]),
  ],
  'pye-e1': [
    scene([
      head('Final: remuneraciones por sector'),
      bars(40, 60, 300, 200, [{ t: 'CV Adm.', v: 0.153, c: 'blue' }, { t: 'CV Com.', v: 0.229, c: 'orange' }], { max: 0.25 }),
      txt(190, 300, 'a) más heterogéneo: Comercial', { b: true, fs: 18, c: 'orange' }),
      box(380, 60, 400, 70, 'c) Dos sectores distintos → diferencia de medias, muestras independientes', { c: 'green', fs: 16, s: 1 }),
      box(380, 145, 400, 60, 'H0: μc = μa · H1: μc > μa (derecha)', { c: 'blue', fs: 18, s: 2 }),
      box(380, 220, 400, 60, 'p-v = 0,041 < 0,05 → RECHAZO H0', { c: 'red', fs: 19, s: 3 }),
      box(40, 340, 740, 90, 'Error posible: TIPO I → concluir que los comerciales cobran más cuando en realidad no es así', { c: 'yellow', fs: 18, s: 4 }),
    ], [
      'Primero: ¿qué sector es más heterogéneo? Coeficiente de variación: administración 0,153, comercial 0,229. **Comercial**.',
      '¿Qué prueba? La remuneración es **cuantitativa** y son **dos grupos distintos** de empleados: diferencia de medias con **muestras independientes**, con la prueba previa de homogeneidad de varianzas.',
      'Se quiere probar que comercial cobra **más**: eso va en H1. **Unilateral derecha**.',
      'El p-valor 0,041 es menor que 0,05: **se rechaza H0**. Los comerciales cobran significativamente más.',
      'Como se rechazó, el error posible es el **tipo I**, dicho en términos del problema: concluir que los comerciales cobran más cuando en realidad no es así.',
    ]),
  ],
  'pye-e2': [
    scene([
      head('Final 2025: corregir 3 afirmaciones de regresión'),
      box(30, 55, 740, 100, '', { c: 'red', dash: true }),
      txt(50, 85, '✘ "el 93,1 % del CO₂ se explica por la población"', { anchor: 'start', fs: 18, c: 'red', b: true }),
      txt(50, 125, '✔ r² = 0,931² = 0,867 → el 86,7 % de la VARIACIÓN del CO₂', { anchor: 'start', fs: 18, c: 'green', b: true, s: 1 }),
      box(30, 170, 740, 100, '', { c: 'red', dash: true, s: 2 }),
      txt(50, 200, '✘ "en ciudades sin CO₂ hay 5384,51 millones de habitantes"', { anchor: 'start', fs: 18, c: 'red', b: true, s: 2 }),
      txt(50, 240, '✔ 5384,51 es el CO₂ estimado con 0 habitantes (sin sentido)', { anchor: 'start', fs: 18, c: 'green', b: true, s: 3 }),
      box(30, 285, 740, 100, '', { c: 'red', dash: true, s: 4 }),
      txt(50, 315, '✘ "el CO₂ es causa de la población"', { anchor: 'start', fs: 18, c: 'red', b: true, s: 4 }),
      txt(50, 355, '✔ solo hay ASOCIACIÓN LINEAL entre CO₂ y población', { anchor: 'start', fs: 18, c: 'green', b: true, s: 5 }),
    ], [
      'Primera afirmación falsa: confunde **r con r cuadrado**.',
      'Lo correcto: r cuadrado es 0,931 al cuadrado, **0,867**. El 86,7 % de la **variación** del CO₂ se explica por la variación de la población.',
      'Segunda: interpreta mal la **ordenada**, invirtiendo las variables.',
      'La ordenada es el valor de **y**, el CO₂, cuando **x**, la población, vale cero. Y en este contexto no tiene sentido práctico.',
      'Tercera: habla de **causa**.',
      'La prueba de la pendiente solo permite concluir que las variables están **linealmente asociadas**. Regresión nunca prueba causalidad.',
    ]),
  ],
};
