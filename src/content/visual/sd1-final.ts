import type { WorkedExercise } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, box, grid, head, line, scene, table, txt } from './h';

const binary = (n: number, width: number) => n.toString(2).padStart(width, '0');
const inputs = Array.from({ length: 16 }, (_, n) => ({ n, D: (n >> 3) & 1, C: (n >> 2) & 1, B: (n >> 1) & 1, A: n & 1 }));
export const LOGIC_ROWS = inputs.map(({ n, D, C, B, A }) => {
  const U = Number(!C && A), V = Number(B && !D), X = U ^ V, N = 1 - X, O = Number(A || !C);
  return [binary(n, 4), U, V, X, N, O, N & O].map(String);
});
export const SOP_MINTERMS = inputs.filter(({ D, C, B, A }) => (!C && A && !B) || (!D && B) || C).map(({ n }) => n);
const kMinterms = [2, 3, 4, 5, 6, 7, 12, 13, 15];
const gray = [0, 1, 3, 2];
const kCells = gray.map((dc) => gray.map((ba) => kMinterms.includes(dc * 4 + ba) ? '1' : '0'));

// Instantes ordinales, sin atribuir unidades temporales que el modelo no da.
export const JK_SAMPLES = [[1, 1], [1, 0], [0, 1], [0, 0], [1, 0], [1, 0], [1, 1], [1, 0]];
export const JK_OUTPUT: number[] = [];
let q = 0;
for (const [j, k] of JK_SAMPLES) { q = j ? k ? 1 - q : 1 : k ? 0 : q; JK_OUTPUT.push(q); }

const wave = (values: number[], y: number, initial = 0): [number, number][] => {
  const pts: [number, number][] = [[100, y + (initial ? 0 : 35)]];
  let old = initial;
  values.forEach((v, i) => { const x = 100 + 60 * (i + 1); pts.push([x, y + (old ? 0 : 35)], [x, y + (v ? 0 : 35)]); old = v; });
  pts.push([610, y + (old ? 0 : 35)]);
  return pts;
};
const counterRows = Array.from({ length: 8 }, (_, n) => [binary(n, 3), binary((n + 1) % 8, 3), binary(n ^ ((n + 1) % 8), 3)]);

export const FINAL_SCENES: Record<string, VisScene[]> = {
  'sd1-final-e1': [
    scene([
      head('1 · Separá las operaciones'),
      box(20, 70, 260, 75, 'U = C′ · A', { id: 'u', fs: 29 }),
      box(360, 70, 260, 75, 'V = B · D′', { id: 'v', fs: 29, c: 'cyan' }),
      box(230, 225, 180, 70, 'XOR', { id: 'xor', s: 1, fs: 29, c: 'orange' }),
      arr('u', 'xor', { s: 1 }), arr('v', 'xor', { s: 1 }),
      box(90, 370, 200, 70, 'NOT → N', { id: 'not', s: 2, fs: 28, c: 'purple' }),
      arr('xor', 'not', { s: 2 }),
      box(350, 370, 270, 70, 'OR(A, C′) → O', { id: 'or', s: 2, fs: 25, c: 'yellow' }),
      box(230, 530, 190, 75, 'AND → F', { id: 'f', s: 3, fs: 28, c: 'green' }),
      arr('not', 'f', { s: 3 }), arr('or', 'f', { s: 3 }),
    ], [
      'Partí de las entradas y conservá los paréntesis. Invertí ce y de, y armá los dos productos con AND: u es ce negada por a; ve es be por de negada.',
      'La operación entre esos productos es XOR: vale uno cuando sus entradas son diferentes. No la reemplaces por OR. Rotular las salidas intermedias permite seguir el circuito y después construir columnas parciales.',
      'La negación exterior actúa sobre el resultado completo del XOR y genera ene. Por otra rama, el OR de a con ce negada genera o. Son dos señales diferentes que llegan a la etapa final.',
      'El AND final combina ene y o. Su salida es uno solo si ambas entradas valen uno. El esquema usa bloques de compuertas rotulados; las negaciones de las entradas quedan indicadas en los productos iniciales.',
    ], 640, 640),
    scene([
      head('1 · Tabla con resultados parciales'),
      table(15, 65, 610, ['DCBA', 'U', 'V', 'X', 'N', 'O', 'F'], LOGIC_ROWS, { fs: 24, rh: 40, cw: [2, 1, 1, 1, 1, 1, 1], rs: inputs.map(({ n }) => Math.floor(n / 4)) }),
      box(15, 785, 610, 70, 'F = Σm(0, 3, 5, 8, 10, 13, 15)', { s: 3, fs: 25, c: 'green' }),
    ], [
      'Usamos el orden de variables de, ce, be, a, desde el bit más significativo al menos significativo. Cada fila es una combinación y cada columna aplica una operación del circuito anterior.',
      'Calculá primero u y ve; después su XOR equis. Ene es la negación de equis y o es el OR de a con ce negada. No saltees columnas si todavía confundís los alcances de las negaciones.',
      'La última columna es el AND entre ene y o. Por ejemplo, la fila cero da uno: ambos productos valen cero, su XOR cero, su negación uno y o también vale uno.',
      'Los unos aparecen en los índices cero, tres, cinco, ocho, diez, trece y quince. Esta lista permite verificar la salida del circuito y deja explícita la convención de orden usada en toda la tabla.',
    ], 640, 880),
  ],
  'sd1-final-e2': [scene([
    head('2 · De expresión no estándar a SOP'),
    box(20, 65, 600, 75, 'F = C′AB′ + D′B + C', { fs: 30 }),
    box(20, 180, 600, 85, 'Cada término completo debe tener\nD, C, B y A una vez', { s: 1, fs: 27, c: 'yellow' }),
    box(20, 310, 600, 100, 'Variable ausente X:\nmultiplicá por (X + X′) = 1', { s: 2, fs: 28, c: 'orange' }),
    box(20, 455, 600, 110, 'Σm(1, 2, 3, 4, 5, 6, 7,\n9, 12, 13, 14, 15)', { s: 3, fs: 29, c: 'green' }),
    table(20, 610, 600, ['DCBA', 'F'], inputs.map(({ n }) => [binary(n, 4), SOP_MINTERMS.includes(n) ? '1' : '0']), { s: 3, fs: 24, rh: 34 }),
  ], [
    'La expresión tiene tres productos, pero no todos contienen las cuatro variables. Podés implementarla directamente con negaciones, AND para los productos y un OR final, aunque todavía no esté escrita en forma canónica.',
    'En la primera forma canónica, cada producto representa una fila completa de la tabla. Fijamos el orden de, ce, be, a. La forma de escribir un producto debe distinguir si cada variable está directa o negada.',
    'Para agregar una variable ausente, multiplicá por la suma de esa variable y su negada, que vale uno. Distribuí, repetí con las demás ausentes y quitá términos repetidos. Así la expansión conserva exactamente la función original.',
    'La tabla permite comprobar la expansión: los índices con salida uno son uno, dos, tres, cuatro, cinco, seis, siete, nueve, doce, trece, catorce y quince. Cada índice corresponde a un minterm completo; la sigma expresa su suma lógica.',
  ], 640, 1220)],
  'sd1-final-e3': [scene([
    head('3 · Karnaugh de cuatro variables'),
    grid(110, 90, 85, kCells, { fs: 28, top: ['00', '01', '11', '10'], left: ['00', '01', '11', '10'], corner: 'DC / BA', groups: [
      { r: 1, c: 0, h: 2, w: 2, col: 'blue', s: 1 },
      { r: 0, c: 2, h: 2, w: 2, col: 'orange', s: 2 },
      { r: 1, c: 1, h: 2, w: 2, col: 'green', s: 3 },
    ] }),
    box(20, 520, 600, 75, 'F = CB′ + BD′ + AC', { s: 3, fs: 31, c: 'purple' }),
    box(20, 635, 180, 70, 'AND(C,B′)', { s: 3, id: 'g1', fs: 23 }),
    box(230, 635, 180, 70, 'AND(B,D′)', { s: 3, id: 'g2', fs: 23, c: 'orange' }),
    box(440, 635, 180, 70, 'AND(A,C)', { s: 3, id: 'g3', fs: 23, c: 'green' }),
    box(230, 800, 180, 65, 'OR → F', { s: 3, id: 'sum', fs: 27, c: 'purple' }),
    arr('g1', 'sum', { s: 3 }), arr('g2', 'sum', { s: 3 }), arr('g3', 'sum', { s: 3 }),
  ], [
    'Los minterms de este punto son dos, tres, cuatro, cinco, seis, siete, doce, trece y quince. Ubicalos en el mapa con orden Gray: cero cero, cero uno, uno uno y uno cero, tanto en filas como en columnas.',
    'El primer grupo reúne cuatro celdas donde ce vale uno y be vale cero. De y a cambian, por eso se eliminan. El producto que queda es ce por be negada, y corresponde al grupo azul.',
    'El segundo grupo reúne cuatro celdas donde be vale uno y de vale cero. Ce y a cambian, así que desaparecen de ese producto. Queda be por de negada, representado con el grupo naranja.',
    'El grupo verde conserva a y ce en uno. La suma final es ce be negada, más be de negada, más a ce. Implementá tres AND y un OR, con las negaciones necesarias en be y de. Los solapamientos entre grupos están permitidos.',
  ], 640, 890)],
  'sd1-final-e5': [scene([
    head('5 · MUX 16:1 con MUX 4:1'),
    ...Array.from({ length: 4 }, (_, i) => [
      txt(85 + 155 * i, 75, `D${4 * i}…D${4 * i + 3}`, { fs: 25 }),
      box(20 + 155 * i, 115, 130, 90, 'MUX 4:1', { id: `mux${i}`, fs: 23 }),
    ]).flat(),
    txt(320, 250, 'S1 S0 seleccionan dentro de cada grupo', { s: 1, fs: 24, c: 'yellow' }),
    box(230, 355, 180, 90, 'MUX 4:1', { id: 'final', s: 2, fs: 28, c: 'green' }),
    ...Array.from({ length: 4 }, (_, i) => arr(`mux${i}`, 'final', { s: 2 })),
    txt(320, 490, 'S3 S2 seleccionan el grupo', { s: 2, fs: 26, c: 'green' }),
    box(20, 560, 600, 80, '5 multiplexores · 2 etapas', { s: 3, fs: 29, c: 'purple' }),
  ], [
    'Dividí las dieciséis entradas en cuatro grupos de cuatro. Cada grupo alimenta un multiplexor cuatro a uno en la primera etapa. Sus cuatro salidas todavía no son la salida única que pide el circuito completo.',
    'Los selectores menos significativos, ese uno y ese cero, se conectan a los cuatro multiplexores iniciales. Indican qué posición tomar dentro de cada grupo: la selección se aplica simultáneamente a todos los grupos.',
    'Las cuatro salidas iniciales alimentan un quinto multiplexor. Sus selectores son ese tres y ese dos, que eligen el grupo. Así los cuatro bits de selección identifican una única entrada original, desde de cero hasta de quince.',
    'Necesitás cinco multiplexores y dos etapas. Para comprobar la tabla de selección, interpretá ese tres, ese dos, ese uno, ese cero como un índice binario: la salida reproduce la entrada cuyo número coincide con ese índice.',
  ], 640, 670)],
  'sd1-final-e6': [scene([
    head('6 · JK: solo el flanco descendente'),
    txt(45, 105, 'CLK', { fs: 25, c: 'red' }),
    line(Array.from({ length: 17 }, (_, i) => i).flatMap((i) => {
      const x = 100 + 30 * i, v = i % 2;
      return i === 0 ? [[x, 125] as [number, number]] : [[x, v ? 125 : 90] as [number, number], [x, v ? 90 : 125] as [number, number]];
    }), { c: 'red', sw: 3 }),
    ...Array.from({ length: 8 }, (_, i) => line([[160 + 60 * i, 85], [160 + 60 * i, 285]], { c: 'gray', dash: true, s: 1 })),
    txt(45, 220, 'Q', { fs: 27, c: 'purple', s: 2 }),
    line(wave(JK_OUTPUT, 200), { c: 'purple', sw: 4, s: 2 }),
    box(20, 315, 600, 70, 'Q inicial = 0 · Q se mantiene entre flancos', { s: 3, fs: 25, c: 'green' }),
    table(20, 425, 600, ['Flanco', 'J', 'K', 'Q antes', 'Q después'], JK_SAMPLES.map(([j, k], i) => [String(i + 1), String(j), String(k), String(i ? JK_OUTPUT[i - 1] : 0), String(JK_OUTPUT[i])]), { s: 1, fs: 24, rh: 39, cw: [1.2, 0.6, 0.6, 1.3, 1.5] }),
  ], [
    'El flip-flop es JK de flanco descendente y arranca con salida cero. Marcá primero las bajadas del reloj. Los instantes se presentan en orden, sin asignar unidades de tiempo que el modelo no proporciona.',
    'Leé jota y ka en cada bajada. La tabla recoge los ocho pares: once, diez, cero uno, cero cero, diez, diez, once y diez. Los pulsos entre bajadas no cambian la salida por sí mismos.',
    'Aplicá la tabla JK: cero cero conserva; cero uno reinicia; diez pone uno; once conmuta. Desde cero, la secuencia de salidas después de las ocho bajadas es uno, uno, cero, cero, uno, uno, cero, uno.',
    'Dibujá cada cambio justo en su flanco activo y mantené la salida hasta la siguiente bajada. El reloj se normalizó visualmente para mostrar el orden de muestreo; la resolución depende de los valores leídos en esos flancos.',
  ], 640, 805)],
  'sd1-final-e7': [
    scene([
      head('7 · Contador ascendente con reinicio'),
      ...[[100, 100], [320, 100], [540, 100], [540, 300], [540, 500], [320, 500], [100, 500], [100, 300]].map(([x, y], n) => box(x - 55, y - 35, 110, 70, binary(n, 3), { shape: 'circle', id: `state${n}`, fs: 29, c: 'blue' })),
      ...Array.from({ length: 8 }, (_, n) => arr(`state${n}`, `state${(n + 1) % 8}`, { s: n === 7 ? 1 : 0, c: n === 7 ? 'green' : 'gray' })),
    ], ['La secuencia requerida recorre cero, uno, dos, tres, cuatro, cinco, seis y siete. Tres bits alcanzan para representar los ocho estados. Cada transición corresponde a un flanco descendente del reloj.', 'Después del estado siete vuelve a cero. El reinicio forma parte de la secuencia normal, sin un estado adicional. El diagrama distingue este contador de uno que se detiene al llegar al último valor.'], 640, 570),
    scene([
      head('7 · Diseño síncrono con FF T'),
      table(20, 65, 600, ['Q2 Q1 Q0', 'Siguiente', 'T2 T1 T0'], counterRows, { fs: 26, rh: 44 }),
      box(20, 520, 180, 130, 'FF T\nT0 = 1\nQ0', { s: 1, fs: 25, c: 'blue' }),
      box(230, 520, 180, 130, 'FF T\nT1 = Q0\nQ1', { s: 2, fs: 25, c: 'orange' }),
      box(440, 520, 180, 130, 'FF T\nT2 = Q0Q1\nQ2', { s: 3, fs: 25, c: 'green' }),
      line([[35, 720], [605, 720]], { s: 3, c: 'purple', sw: 3 }),
      ...[110, 320, 530].map((x) => arr([x, 720], [x, 655], { s: 3, c: 'purple' })),
      txt(320, 775, 'Un mismo CLK↓ para los tres flip-flops', { s: 3, fs: 25, c: 'purple' }),
    ], [
      'Usamos una implementación síncrona: los tres flip-flops reciben el mismo reloj. La tabla compara el estado presente y el siguiente. La entrada te de cada bit es su valor actual XOR su valor siguiente: uno significa conmutar.',
      'El bit menos significativo cambia en todas las transiciones, por eso te cero vale uno. Esta regla incluye el paso de siete a cero: también allí ese bit debe cambiar.',
      'El segundo bit cambia cuando el bit inferior estaba en uno antes del flanco. Por eso te uno es igual a cu cero. Usá el estado anterior al flanco; no un valor actualizado durante la transición.',
      'El tercer bit cambia cuando ambos bits inferiores estaban en uno: te dos es cu cero por cu uno. Implementá ese producto con AND. Con reloj común de flanco descendente, estas ecuaciones recorren exactamente los ocho estados y vuelven a cero.',
    ], 640, 810),
  ],
};

FINAL_SCENES['sd1-final-e2'].unshift(scene([
  head('2 · Circuito de la expresión inicial'),
  box(20, 70, 270, 75, 'AND(C′, A, B′)', { id: 'p1', fs: 27 }),
  box(20, 230, 270, 75, 'AND(D′, B)', { id: 'p2', s: 1, fs: 27, c: 'orange' }),
  box(20, 390, 270, 75, 'C directa', { id: 'p3', s: 1, fs: 27, c: 'green' }),
  box(430, 230, 180, 75, 'OR → F', { id: 'sopout', s: 2, fs: 29, c: 'purple' }),
  ...['p1', 'p2', 'p3'].map((id) => arr(id, 'sopout', { s: 2 })),
], [
  'En el circuito inicial, conservá la expresión tal como está. El primer producto requiere negar ce y be, y combinar esas señales con a mediante AND. Las entradas negadas se indican con prima.',
  'El segundo producto combina de negada con be mediante AND. El tercer término es ce directa: no necesita completar variables para implementar la función original. Completar variables es una operación de escritura canónica, no una condición para construir este circuito.',
  'El OR final reúne los tres términos. Ahora podés comparar su salida con la tabla y después con la expresión canónica. Son representaciones de la misma función, aunque una forma tenga muchos más productos que la otra.',
], 640, 510));

FINAL_SCENES['sd1-final-e2'].push(scene([
  head('2 · Cada índice es un producto completo'),
  table(20, 70, 600, ['m', 'DCBA', 'Minterm'], SOP_MINTERMS.map((n) => {
    const b = binary(n, 4);
    return [String(n), b, ['D', 'C', 'B', 'A'].map((v, i) => v + (b[i] === '1' ? '' : '′')).join('')];
  }), { fs: 26, rh: 43, cw: [0.5, 1, 1.5], rs: SOP_MINTERMS.map((_, i) => i < 6 ? 0 : 1) }),
  box(20, 680, 600, 80, 'La SOP canónica es el OR\nde todos estos minterms', { s: 1, fs: 28, c: 'green' }),
], ['Cada índice se escribe como una combinación de cuatro bits en orden de, ce, be, a. Un bit uno produce la variable directa y un bit cero su negada. La tabla muestra los productos completos correspondientes a los unos de la función.', 'La primera forma canónica es el OR de todos estos productos. La notación sigma de minterms resume esa misma expresión usando sus índices; no es una función diferente ni una simplificación lógica.'], 640, 790));

FINAL_SCENES['sd1-final-e5'].push(scene([
  head('5 · Tabla de selección del MUX'),
  table(20, 65, 600, ['S3S2S1S0', 'Grupo', 'Salida'], inputs.map(({ n }) => [binary(n, 4), String(Math.floor(n / 4)), `D${n}`]), { fs: 26, rh: 39, cw: [1.5, 0.8, 1], rs: inputs.map(({ n }) => n < 8 ? 0 : 1) }),
], ['Los bits superiores identifican el grupo y los inferiores eligen su entrada. La tabla enumera las dieciséis combinaciones de selección, desde cero cero cero cero hasta uno uno uno uno, sin omitir casos.', 'Por ejemplo, selección uno cero uno uno corresponde al grupo dos y a su posición tres, que es la entrada de once. La salida copia el valor de esa entrada; no es un uno constante por haber seleccionado un índice distinto de cero.'], 640, 765));

const definitions = [
  ['sd1-final-e1', 't2', 'Final · 1: circuito y tabla parcial', 'Analizá F = [(C′A) XOR (BD′)]′ · (A + C′). Separá compuertas y comprobá la salida con columnas parciales, usando orden DCBA.', 'Σm(0,3,5,8,10,13,15), con orden DCBA.'],
  ['sd1-final-e2', 't3', 'Final · 2: primera forma canónica', 'Convertí C′AB′ + D′B + C a SOP canónica. Usá orden DCBA y contrastá la lista de minterms con la tabla.', 'Σm(1,2,3,4,5,6,7,9,12,13,14,15).'],
  ['sd1-final-e3', 't4', 'Final · 3: Karnaugh e implementación', 'Simplificá Σm(2,3,4,5,6,7,12,13,15), en orden DCBA. Después representá la implementación obtenida.', 'F = CB′ + BD′ + AC.'],
  ['sd1-final-e5', 't6', 'Final · 5: multiplexor de dos etapas', 'Construí un MUX 16:1 utilizando únicamente MUX 4:1. Identificá qué selectores corresponden a cada etapa.', 'Cinco MUX 4:1. Primera etapa S1S0; última etapa S3S2; salida D[índice binario S3S2S1S0].'],
  ['sd1-final-e6', 't7', 'Final · 6: forma de onda JK', 'Recorré los ocho flancos descendentes del modelo, con Q inicial cero, y obtené Q según las muestras J/K de la tabla.', 'Después de los flancos: 1,1,0,0,1,1,0,1.'],
  ['sd1-final-e7', 't8', 'Final · 7: contador cíclico 0 a 7', 'Diseñá un contador ascendente de ocho estados con FF T de flanco descendente, que vuelva a cero después de siete.', 'Diseño síncrono: T0=1, T1=Q0, T2=Q0Q1.'],
];
export const FINAL_EXERCISES: WorkedExercise[] = definitions.map(([id, module, title, statement, result]) => ({
  id, module, title, statement, result,
  steps: FINAL_SCENES[id].flatMap((s) => s.say).map((body, i) => ({ title: `Paso ${i + 1}`, body })),
}));
