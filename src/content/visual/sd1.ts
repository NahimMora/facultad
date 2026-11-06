/** SD I · final · recorridos visuales propios. */
import type { VisScene } from '../../vis/types';
import { arr, bits, box, grid, head, plot, scene, table, txt } from './h';

const B = (s: string, c: 'blue' | 'orange' | 'green' | 'pink' | 'yellow' | 'gray' | 'red' | 'purple' = 'blue', o: Record<string, unknown> = {}) =>
  s.split('').map((t) => ({ t, c, ...o }));

/** Onda cuadrada como pasos [x, y]. */
const wave = (vals: number[], y0: number) => vals.flatMap((v, i) => [[i, y0 + v * 0.8], [i + 1, y0 + v * 0.8]] as [number, number][]);

const ring = (n: number, cx: number, cy: number, r: number) => Array.from({ length: n }, (_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
});

export const SCENES: Record<string, VisScene[]> = {
  s1: [
    scene([
      head('Complemento a 2: cómo se escribe −5 con 4 bits'),
      txt(130, 92, '+5 =', { fs: 26, b: true, mono: true, anchor: 'end' }), bits(150, 70, 320, B('0101'), { h: 46, fs: 24, mono: true }),
      txt(130, 162, 'invertir', { fs: 18, b: true, anchor: 'end', s: 1 }), bits(150, 140, 320, B('1010', 'orange'), { h: 46, fs: 24, mono: true, s: 1 }),
      txt(130, 232, '+ 1 =', { fs: 22, b: true, anchor: 'end', s: 2, mono: true }), bits(150, 210, 320, [...B('1', 'red'), ...B('011', 'green')], { h: 46, fs: 24, mono: true, s: 2 }),
      txt(560, 232, '= −5', { fs: 30, b: true, c: 'green', s: 2 }),
      txt(150, 280, '↑ bit de signo (1 = negativo)', { fs: 16, b: true, c: 'red', anchor: 'start', s: 2 }),
      bits(40, 330, 720, ['−8', '−7', '−6', '−5', '−4', '−3', '−2', '−1', '0', '1', '2', '3', '4', '5', '6', '7'].map((t, i) => ({ t, c: i < 8 ? 'pink' as const : 'blue' as const })), { h: 40, fs: 14, s: 3, title: 'rango con 4 bits: −2ⁿ⁻¹ … 2ⁿ⁻¹ − 1' }),
      txt(400, 410, 'C1: dos ceros y el carry se SUMA · C2: un cero y el carry se DESCARTA', { b: true, fs: 16, c: 'yellow', s: 4 }),
      txt(400, 438, 'Overflow: + con + da − (o − con − da +) → V = Cₙ₋₁ ⊕ Cₙ', { b: true, fs: 16, c: 'red', s: 5 }),
    ], [
      'Para escribir números negativos se usa el **complemento a 2**. Partimos de más 5: 0101.',
      'Primero **invertimos** todos los bits: 1010. Eso es el complemento a 1.',
      'Y **sumamos 1**: 1011, que es **menos 5**. El bit más significativo es el **signo**: 1 significa negativo.',
      'Con n bits el rango va de menos 2 a la n menos 1 hasta 2 a la n menos 1, menos 1. Con 4 bits: de **menos 8 a 7**.',
      'Diferencias: el **complemento a 1** tiene **dos ceros** y el carry final se **suma** al resultado; el **complemento a 2** tiene **un solo cero** y el carry final se **descarta**. Restar es sumar el complemento a 2 del sustraendo.',
      'El error real es el **overflow**: sumar dos positivos y que dé negativo, o al revés. En el circuito se detecta con el XOR de los dos últimos carries.',
    ]),
  ],
  s2: [
    scene([
      head('Compuertas y De Morgan'),
      table(30, 55, 470, ['A', 'B', 'AND', 'OR', 'XOR', 'NAND', 'NOR'], [['0', '0', '0', '0', '0', '1', '1'], ['0', '1', '0', '1', '1', '1', '0'], ['1', '0', '0', '1', '1', '1', '0'], ['1', '1', '1', '1', '0', '0', '0']], { rh: 42, fs: 18, mono: true, hi: [{ r: 1, s: 1, c: 'yellow', to: 2 }, { r: 2, s: 1, c: 'yellow', to: 2 }] }),
      box(520, 55, 260, 100, 'XOR = A’B + AB’: vale 1 si son DISTINTAS', { c: 'yellow', fs: 17, s: 1 }),
      box(520, 170, 260, 90, 'NAND y NOR son UNIVERSALES', { c: 'purple', fs: 18, s: 2 }),
      box(30, 290, 360, 70, '(A · B)’ = A’ + B’', { c: 'green', fs: 26, s: 3 }),
      box(410, 290, 370, 70, '(A + B)’ = A’ · B’', { c: 'green', fs: 26, s: 3 }),
      box(30, 375, 750, 60, 'Absorción: A + A·B = A · A + A’·B = A + B · A + B·C = (A + B)(A + C)', { c: 'cyan', fs: 17, s: 4 }),
    ], [
      'La tabla de verdad de las compuertas básicas: **AND** da 1 solo si las dos son 1; **OR**, si al menos una es 1.',
      'El **XOR** da 1 cuando las entradas son **distintas**: A negada por B, más A por B negada.',
      '**NAND** y **NOR** son las negadas de AND y OR, y son **universales**: con una sola de ellas se arma cualquier circuito.',
      'Las leyes de **De Morgan**: la negación de un producto es la suma de las negaciones, y la negación de una suma es el producto de las negaciones. Trampa: la barra larga sobre A por B **no** es A negada por B negada.',
      'Y las simplificaciones de absorción que más se usan, incluida la distributiva "rara": A más B por C es igual a A más B, por A más C.',
    ]),
  ],
  s3: [
    scene([
      head('Formas canónicas desde la tabla de verdad'),
      table(30, 55, 340, ['m', 'A', 'B', 'C', 'F'], [['0', '0', '0', '0', '0'], ['1', '0', '0', '1', '1'], ['2', '0', '1', '0', '0'], ['3', '0', '1', '1', '1'], ['4', '1', '0', '0', '0'], ['5', '1', '0', '1', '0'], ['6', '1', '1', '0', '1'], ['7', '1', '1', '1', '0']], { rh: 40, fs: 17, mono: true, hi: [{ r: 1, s: 1, c: 'green', to: 2 }, { r: 3, s: 1, c: 'green', to: 2 }, { r: 6, s: 1, c: 'green', to: 2 }, { r: 0, s: 2, c: 'red', to: 3 }, { r: 2, s: 2, c: 'red', to: 3 }, { r: 4, s: 2, c: 'red', to: 3 }, { r: 5, s: 2, c: 'red', to: 3 }, { r: 7, s: 2, c: 'red', to: 3 }] }),
      box(400, 70, 380, 110, '1ª canónica (SOP): suma de MINITÉRMINOS (los 1) · F = Σm(1, 3, 6) = A’B’C + A’BC + ABC’', { c: 'green', fs: 16, s: 1 }),
      box(400, 200, 380, 110, '2ª canónica (POS): producto de MAXITÉRMINOS (los 0) · F = ΠM(0, 2, 4, 5, 7)', { c: 'red', fs: 16, s: 2 }),
      box(400, 330, 380, 100, 'Falta una variable X → multiplicar por (X + X’)', { c: 'yellow', fs: 17, s: 3 }),
    ], [
      'Una función lógica se define con su **tabla de verdad**. Cada fila tiene un número, el minitérmino.',
      'La **primera forma canónica** suma los **minitérminos** donde F vale **1**: en notación numérica, sigma de m de 1, 3 y 6. Cada término lleva **todas** las variables.',
      'La **segunda forma canónica** multiplica los **maxitérminos** donde F vale **0**: pi mayúscula de M de 0, 2, 4, 5 y 7.',
      'Para estandarizar un término al que le falta una variable, se lo multiplica por esa variable más su negada. En el final piden diagrama inicial, tabla con columnas parciales y diagrama final simplificado.',
    ]),
  ],
  s4: [
    scene([
      head('Karnaugh: agrupar 1 vecinos (código Gray)'),
      grid(60, 70, 90, [['1', '0', '0', '1'], ['0', '1', '1', '0']], { top: ['00', '01', '11', '10'], left: ['0', '1'], corner: 'A\\BC',
        groups: [{ r: 1, c: 1, h: 1, w: 2, col: 'green', s: 2 }, { r: 0, c: 0, h: 1, w: 1, col: 'orange', s: 3 }, { r: 0, c: 3, h: 1, w: 1, col: 'orange', s: 3 }] }),
      txt(285, 330, 'F = Σm(0, 2, 5, 7)', { b: true, fs: 20, mono: true }),
      box(520, 60, 260, 80, 'Columnas en Gray: 00, 01, 11, 10 (difieren en 1 bit)', { c: 'blue', fs: 16, s: 1 }),
      box(520, 155, 260, 70, 'AC: A = 1, C = 1 (B cambia)', { c: 'green', fs: 17, s: 2 }),
      box(520, 240, 260, 90, 'A’C’: los BORDES son vecinos', { c: 'orange', fs: 17, s: 3 }),
      box(60, 360, 720, 70, 'F = AC + A’C’ · grupos de 1, 2, 4, 8 o 16 · cada grupo de 2ᵏ elimina k variables · X: se usa si agranda', { c: 'yellow', fs: 16, s: 4 }),
    ], [
      'El **mapa de Karnaugh** ordena la tabla de verdad para ver simplificaciones. Acá, una función de 3 variables con unos en 0, 2, 5 y 7.',
      'Las columnas siguen el **código Gray**: 00, 01, 11, 10. Así, dos celdas vecinas difieren en un solo bit.',
      'Agrupamos los 1 vecinos en rectángulos de potencias de 2. El grupo verde tiene A igual a 1 y C igual a 1; B cambia, así que se elimina: queda **A por C**.',
      'Y los **bordes también son vecinos**: las celdas de las puntas forman un grupo con A en 0 y C en 0: **A negada por C negada**.',
      'Resultado: F igual a AC más A negada C negada. Grupos lo más grandes posible y la menor cantidad; las condiciones "no importa" se usan solo si agrandan un grupo.',
    ]),
  ],
  s5: [
    scene([
      head('Hardware digital: parámetros'),
      box(30, 55, 360, 90, 'TTL (bipolar) vs CMOS (bajo consumo estático)', { c: 'blue', fs: 18 }),
      box(410, 55, 120, 60, 'salida', { c: 'orange', fs: 17, id: 'o', s: 1 }),
      ...[0, 1, 2, 3].map((i) => box(640, 50 + i * 42, 140, 34, 'entrada', { c: 'gray', fs: 14, id: 'e' + i, s: 1 })),
      ...[0, 1, 2, 3].map((i) => arr('o', 'e' + i, { c: 'orange', s: 1 })),
      txt(530, 225, 'FAN-OUT: cuántas entradas maneja una salida', { b: true, fs: 16, c: 'orange', s: 1 }),
      plot(40, 240, 360, 165, [0, 10], [0, 5], { ticks: false, s: 2, yl: 'V', hlines: [{ y: 3.5, t: 'mín. para "1"', c: 'green' }, { y: 1.2, t: 'máx. para "0"', c: 'red' }], fns: [{ f: '4.3+0.3*sin(x*3)', c: 'green' }, { f: '0.4+0.3*sin(x*3+1)', c: 'red' }] }),
      txt(220, 432, 'MARGEN DE RUIDO', { b: true, fs: 16, c: 'yellow', s: 2 }),
      box(430, 260, 350, 80, 'Retardo de propagación: tiempo de entrada a salida', { c: 'purple', fs: 16, s: 3 }),
      box(430, 355, 350, 80, 'Tri-state: 0, 1 o ALTA IMPEDANCIA (buses) · colector abierto: pull-up', { c: 'cyan', fs: 15, s: 4 }),
    ], [
      'Dos familias lógicas: **TTL**, bipolar, y **CMOS**, de muy bajo consumo estático.',
      'El **fan-out** es cuántas entradas puede manejar una salida sin degradar los niveles.',
      'El **margen de ruido** es cuánto ruido tolera la señal sin cambiar de nivel lógico: la distancia entre lo que la salida garantiza y lo que la entrada necesita.',
      'El **retardo de propagación** es el tiempo que tarda un cambio en la entrada en verse en la salida.',
      'Y la salida **tri-state** tiene un tercer estado de **alta impedancia**, para compartir buses. La de **colector abierto** necesita una resistencia de pull-up.',
    ]),
  ],
  s6: [
    scene([
      head('Multiplexor 4:1'),
      ...['I0', 'I1', 'I2', 'I3'].map((t, i) => box(40, 70 + i * 70, 90, 50, t, { c: i === 2 ? 'yellow' : 'blue', fs: 20, id: 'i' + i })),
      box(240, 60, 150, 290, 'MUX\n4:1', { c: 'purple', fs: 24, id: 'mux' }),
      ...[0, 1, 2, 3].map((i) => arr('i' + i, 'mux', { c: i === 2 ? 'yellow' : 'gray', s: i === 2 ? 1 : 0 })),
      box(260, 380, 110, 50, 'S1 S0 = 10', { c: 'orange', fs: 17, id: 'sel', s: 1 }), arr('sel', 'mux', { c: 'orange', s: 1 }),
      box(460, 175, 80, 60, 'Y = I2', { c: 'yellow', fs: 17, id: 'y', s: 1 }), arr('mux', 'y', { c: 'yellow', s: 1 }),
      box(570, 60, 210, 120, 'MUX 16:1 con MUX 4:1 → 5 MUX (4 + 1)', { c: 'purple', fs: 17, s: 2 }),
      box(570, 195, 210, 110, 'Decodificador n → 2ⁿ: activa UNA salida', { c: 'green', fs: 17, s: 3 }),
      box(570, 320, 210, 110, 'Codificador / demux: lo inverso', { c: 'gray', fs: 17, s: 3 }),
    ], [
      'Un **multiplexor** 4 a 1 tiene cuatro entradas de datos y elige cuál pasa a la salida.',
      'La elección la hacen las **entradas de selección**: con S1 S0 igual a 10, en binario 2, pasa **I2**.',
      'Para armar un MUX de 16 a 1 con MUX de 4 a 1 hacen falta **5**: cuatro en el primer nivel, manejados por S1 S0, y uno en el segundo, por S3 S2. Otra opción: un decodificador que habilita uno de los cuatro.',
      'El **decodificador** de n a 2 a la n activa una sola salida según el código; el codificador y el demultiplexor hacen lo inverso.',
    ]),
    scene([
      head('Sumador completo y sumador/restador'),
      box(40, 60, 330, 130, 'Sumador completo', { c: 'blue', fs: 20, sub: 'S = A ⊕ B ⊕ Cin · Cout = A·B + Cin·(A ⊕ B)' }),
      box(40, 210, 330, 90, 'Semisumador: S = A ⊕ B, C = A·B', { c: 'gray', fs: 17, s: 1 }),
      ...[0, 1, 2, 3].map((i) => box(420 + i * 90, 60, 70, 50, `B${3 - i}`, { c: 'blue', fs: 18, id: 'b' + i, s: 2 })),
      ...[0, 1, 2, 3].map((i) => box(420 + i * 90, 160, 70, 50, 'XOR', { c: 'yellow', fs: 16, id: 'x' + i, s: 2 })),
      ...[0, 1, 2, 3].map((i) => arr('b' + i, 'x' + i, { c: 'blue', s: 2 })),
      box(420, 260, 340, 50, 'M (0 suma · 1 resta)', { c: 'orange', fs: 17, id: 'm', s: 2 }),
      ...[0, 1, 2, 3].map((i) => arr('m', 'x' + i, { c: 'orange', s: 2 })),
      box(420, 340, 340, 90, 'M = 1: el XOR invierte B (C1) y M entra como Cin = 1 → C2', { c: 'green', fs: 16, s: 3 }),
    ], [
      'El **sumador completo** suma tres bits: A, B y el carry de entrada. La suma es el XOR de los tres y el carry de salida es A por B, más el carry de entrada por A XOR B.',
      'El **semisumador** solo suma dos bits, sin carry de entrada.',
      'El **sumador/restador** pone un **XOR** en cada bit de B, controlado por una señal **M**.',
      'Con **M igual a 0**, los XOR dejan pasar B y suma. Con **M igual a 1**, los XOR **invierten** B, que es el complemento a 1, y M entra también como **carry de entrada**: ese 1 completa el **complemento a 2**. Así resta sin otro circuito.',
    ]),
  ],
  s7: [
    scene([
      head('Flip-flop D: cambia en el FLANCO del reloj'),
      plot(40, 55, 720, 280, [0, 10], [0, 3.2], { ticks: false, fns: [
        { pts: wave([0, 1, 0, 1, 0, 1, 0, 1, 0, 1], 2.2), c: 'gray' },
        { pts: wave([0, 0, 1, 1, 1, 0, 0, 0, 1, 1], 1.1), c: 'blue', s: 1 },
        { pts: wave([0, 0, 0, 1, 1, 1, 0, 0, 0, 1], 0), c: 'green', s: 2 },
      ] }),
      txt(60, 95, 'CLK', { b: true, fs: 16, c: 'gray', anchor: 'start' }), txt(60, 185, 'D', { b: true, fs: 16, c: 'blue', anchor: 'start', s: 1 }), txt(60, 275, 'Q', { b: true, fs: 16, c: 'green', anchor: 'start', s: 2 }),
      box(40, 355, 160, 80, 'D', { c: 'blue', fs: 20, sub: 'Q ← D', s: 3 }), box(215, 355, 160, 80, 'T', { c: 'orange', fs: 20, sub: '1 cambia · 0 mantiene', s: 3 }), box(390, 355, 210, 80, 'JK', { c: 'green', fs: 20, sub: '00 mantiene · 10 → 1 · 01 → 0 · 11 cambia', s: 3 }), box(615, 355, 145, 80, 'SR (latch)', { c: 'red', fs: 18, sub: 'S = R = 1 prohibido', s: 3 }),
    ], [
      'Un **flip-flop** cambia solo en el **flanco** del reloj; un **latch**, en cambio, mientras el enable está activo.',
      'En el flip-flop **D**, la entrada D puede cambiar en cualquier momento…',
      '…pero **Q copia a D solo en los flancos ascendentes** del reloj, y lo mantiene hasta el próximo flanco.',
      'Los otros: **T** cambia si T vale 1 y mantiene si vale 0. **JK**: 00 mantiene, 10 pone 1, 01 pone 0 y **11 cambia**. Y el latch **SR** con NOR tiene prohibida la combinación S y R en 1.',
    ]),
  ],
  s8: [
    scene([
      head('Contador ascendente 0–7 con flip-flops T'),
      ...ring(8, 220, 245, 160).map(([x, y], i) => box(x - 30, y - 30, 60, 60, String(i), { shape: 'circle', c: 'blue', fs: 22, id: 'q' + i })),
      ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => arr('q' + i, 'q' + ((i + 1) % 8), { c: 'gray', bend: 12 })),
      table(440, 60, 340, ['Q2 Q1 Q0', 'cambia'], [['0 1 1', 'Q2 (todos abajo en 1)'], ['0 0 1', 'Q1'], ['x x x', 'Q0 siempre']], { rh: 40, fs: 16, mono: true, s: 1 }),
      box(440, 235, 340, 70, 'T0 = 1 · T1 = Q0 · T2 = Q0·Q1', { c: 'green', fs: 20, s: 2 }),
      box(440, 320, 340, 110, 'Descendente: cambia si todos los de abajo están en 0 → T1 = Q0’, T2 = Q0’·Q1’', { c: 'orange', fs: 16, s: 3 }),
    ], [
      'Un **contador** es una máquina de estados: acá, de 0 a 7 y vuelta a 0. Se diseña con diagrama de estados, tabla de diseño, Karnaugh y esquema.',
      'Mirando el binario se ve la regla: un bit **cambia** cuando **todos los bits de abajo están en 1**. De 011 a 100 cambian los tres.',
      'Con flip-flops T: **T0 siempre 1**, **T1 igual a Q0**, **T2 igual a Q0 por Q1**.',
      'Para contar **hacia abajo**, un bit cambia cuando todos los de abajo están en **0**: T1 es Q0 negada y T2, Q0 negada por Q1 negada. Y recordá: en **Moore** la salida depende solo del estado; en **Mealy**, también de las entradas.',
    ]),
  ],
};

export const EX_SCENES: Record<string, VisScene[]> = {
  'sd1-e1': [
    scene([
      head('Final: Σm(2, 3, 4, 5, 6, 7, 12, 13, 15)'),
      grid(40, 55, 80, [['0', '0', '1', '1'], ['1', '1', '1', '1'], ['1', '1', '1', '0'], ['0', '0', '0', '0']], { top: ['00', '01', '11', '10'], left: ['00', '01', '11', '10'], corner: 'DC\\BA',
        groups: [{ r: 0, c: 2, h: 2, w: 2, col: 'green', s: 1 }, { r: 1, c: 0, h: 2, w: 2, col: 'orange', s: 2 }, { r: 1, c: 1, h: 2, w: 2, col: 'pink', s: 3 }] }),
      box(470, 60, 310, 70, "D'B → 2, 3, 6, 7", { c: 'green', fs: 20, s: 1 }),
      box(470, 145, 310, 70, "CB' → 4, 5, 12, 13", { c: 'orange', fs: 20, s: 2 }),
      box(470, 230, 310, 70, 'CA → 5, 7, 13, 15', { c: 'pink', fs: 20, s: 3 }),
      box(470, 330, 310, 90, "F = D'B + CB' + CA", { c: 'yellow', fs: 26, s: 4 }),
    ], [
      'Pasamos la función a minitérminos con pesos D 8, C 4, B 2, A 1, y la volcamos al mapa de 4 variables.',
      'Primer grupo de 4: D en 0 y B en 1: **D negada por B**.',
      'Segundo: C en 1 y B en 0: **C por B negada**.',
      'Tercero, superpuesto, cubre el 15: C en 1 y A en 1: **C por A**.',
      'Resultado: **F igual a D negada B, más C B negada, más C A**: tres AND de dos entradas y un OR de tres.',
    ]),
  ],
  'sd1-e2': [
    scene([
      head('Final: 3 − 5 con el sumador/restador (M = 1)'),
      txt(120, 92, 'A =', { fs: 24, b: true, anchor: 'end', mono: true }), bits(140, 70, 360, B('0011'), { h: 46, fs: 24, mono: true }),
      txt(120, 152, 'B =', { fs: 24, b: true, anchor: 'end', mono: true }), bits(140, 130, 360, B('0101', 'gray'), { h: 46, fs: 24, mono: true }),
      txt(120, 212, "B' =", { fs: 24, b: true, anchor: 'end', mono: true, s: 1 }), bits(140, 190, 360, B('1010', 'orange'), { h: 46, fs: 24, mono: true, s: 1 }),
      txt(560, 213, '+ Cin = 1', { fs: 22, b: true, c: 'orange', s: 1 }),
      txt(120, 292, 'S =', { fs: 24, b: true, anchor: 'end', mono: true, s: 2 }), bits(140, 270, 360, B('1110', 'green'), { h: 50, fs: 26, mono: true, s: 2 }),
      box(530, 260, 250, 70, 'C4 = 0 · V = C3 ⊕ C4 = 0', { c: 'gray', fs: 18, s: 3 }),
      box(140, 360, 640, 70, 'Signo 1 → negativo: C2 de 1110 = 0010 → −2 ✔', { c: 'yellow', fs: 22, s: 4 }),
    ], [
      'Con el sumador/restador en modo resta, M igual a 1. A vale 0011, que es 3, y B vale 0101, que es 5.',
      'Los XOR invierten B: 1010. Y M entra como carry de entrada, 1.',
      'Sumamos bit a bit con los carries: el resultado es **1110**.',
      'El carry final es 0 y el overflow, XOR de los dos últimos carries, también es 0: el resultado es válido.',
      'El bit de signo es 1: negativo. Su complemento a 2 es 0010, o sea 2. Entonces 3 menos 5 da **menos 2**, como esperábamos.',
    ]),
  ],
  'sd1-e3': [
    scene([
      head('Final: contador 7 → 0 que se detiene en 0'),
      ...ring(8, 210, 245, 160).map(([x, y], i) => box(x - 30, y - 30, 60, 60, String(7 - i), { shape: 'circle', c: i === 7 ? 'red' : 'blue', fs: 22, id: 'q' + i })),
      ...[0, 1, 2, 3, 4, 5, 6].map((i) => arr('q' + i, 'q' + (i + 1), { c: 'gray', bend: 12 })),
      txt(20, 92, 'se queda en 0', { b: true, fs: 15, c: 'red', s: 1, anchor: 'start' }),
      box(430, 60, 350, 90, "Bajando: T0 = 1 · T1 = Q0' · T2 = Q0'·Q1'", { c: 'orange', fs: 18, s: 2 }),
      box(430, 170, 350, 90, 'Para frenar en 0: × (Q2 + Q1 + Q0)', { c: 'red', fs: 19, s: 3 }),
      box(430, 280, 350, 150, "T0 = Q2 + Q1 + Q0 · T1 = Q0'(Q2 + Q1) · T2 = Q2·Q1'·Q0'", { c: 'green', fs: 18, s: 4 }),
    ], [
      'Contador descendente de 7 a 0 con flip-flops T.',
      'Al llegar a **0** tiene que **quedarse** en 0.',
      'Contando hacia abajo, un bit cambia cuando todos los de abajo están en 0: T0 igual a 1, T1 igual a Q0 negada, T2 igual a Q0 negada por Q1 negada.',
      'Para que se detenga, cada T se multiplica por Q2 más Q1 más Q0, que vale 0 solo en el estado 0.',
      'Simplificando: T0 es Q2 más Q1 más Q0, T1 es Q0 negada por Q2 más Q1, y T2 es Q2 por Q1 negada por Q0 negada.',
    ]),
  ],
};
