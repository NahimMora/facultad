import type { WorkedExercise } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, box, head, plot, scene, table } from './h';

/** Resoluciones propias de los incisos que completan un modelo de final. */
export const FINAL_SCENES: Record<string, VisScene[]> = {
  'am2-final-1': [scene([
    head('1a · Integrar por sustitución'),
    box(20, 60, 480, 65, '∫ 5 / [x(2 + ln x)] dx', { fs: 27 }),
    box(20, 165, 480, 70, 'u = 2 + ln x · du = dx/x', { fs: 25, s: 1, c: 'yellow' }),
    arr([260, 125], [260, 159], { s: 1 }),
    box(20, 270, 480, 65, '5∫ du/u = 5 ln|u| + C', { s: 2, fs: 25, c: 'green' }),
    arr([260, 235], [260, 264], { s: 2 }),
    box(20, 370, 480, 75, '5 ln|2 + ln x| + C', { s: 3, fs: 28, c: 'cyan' }),
    box(20, 475, 480, 70, 'x > 0 · x ≠ e⁻²', { s: 4, fs: 27, c: 'purple' }),
  ], [
    'Mirá la estructura del integrando: aparece un logaritmo dentro del denominador y, multiplicándolo, una equis. Buscá una sustitución cuya derivada también aparezca. No intentes integrar cada factor por separado: el producto del denominador exige reconocer una composición.',
    'Elegí u igual a dos más logaritmo natural de equis. Su diferencial es uno sobre equis por de equis. Ese factor está exactamente en la integral original, de modo que toda la dependencia de equis se reemplaza de manera consistente.',
    'La integral transformada es cinco por integral de uno sobre u. Su primitiva es cinco logaritmo del valor absoluto de u más constante. El valor absoluto permite expresar una primitiva real tanto donde u es positivo como donde es negativo.',
    'Volvé a la variable original: cinco logaritmo del valor absoluto de dos más logaritmo de equis, más constante. Podés verificar derivando: la regla de la cadena devuelve cinco dividido por equis y por dos más logaritmo de equis.',
    'Revisá el dominio del integrando: equis debe ser positiva por el logaritmo y dos más logaritmo de equis debe ser distinto de cero. Por eso excluimos equis igual a e elevado a menos dos. La primitiva se interpreta en intervalos que no atraviesen ese punto.',
  ], 520, 570)],
  'am2-final-2': [scene([
    head('2a · Dominio: cruzá condiciones'),
    plot(55, 55, 425, 310, [-2, 3], [0, 14], { xl: 'x', yl: 'y', fns: [
      { f: '2*x+8', c: 'blue', t: 'y = 2x + 8', s: 0 },
      { f: '2*pow(x,2)+4', c: 'orange', dash: true, t: 'y = 2x² + 4', s: 1 },
      { f: '2*x+8', between: '2*pow(x,2)+4', area: [-1, 2], c: 'green', s: 2 },
    ] }),
    box(20, 390, 480, 75, '2x² + 4 < y ≤ 2x + 8', { s: 3, fs: 26, c: 'green' }),
    box(20, 485, 480, 75, '−1 < x < 2\nLos puntos de corte no entran', { s: 4, fs: 26, c: 'purple' }),
  ], [
    'La raíz cuadrada del numerador exige que dos equis más ocho menos ye sea mayor o igual a cero. Despejando, ye queda por debajo o sobre la recta dos equis más ocho. Esa frontera puede incluirse, porque el numerador sí puede valer cero.',
    'La raíz cuarta del denominador exige una condición más fuerte: su radicando debe ser estrictamente positivo. No alcanza con que exista la raíz; además no puede anular el denominador. Así aparece ye estrictamente mayor que dos equis al cuadrado más cuatro.',
    'El dominio es la intersección de las dos condiciones. En el gráfico se ve la región entre la parábola inferior y la recta superior. No unas ambas condiciones con o: un punto debe cumplirlas simultáneamente para que la función esté definida.',
    'Escribí el dominio como dos equis al cuadrado más cuatro menor que ye, y ye menor o igual que dos equis más ocho. La parábola queda excluida y la parte admisible de la recta incluida. La desigualdad conserva esa diferencia que el dibujo marca con trazos distintos.',
    'Para que haya espacio entre las curvas, la parábola debe estar estrictamente debajo de la recta. Resolvé equis al cuadrado menos equis menos dos menor que cero: equis está entre menos uno y dos. Los extremos no entran, porque allí se anula también el denominador.',
  ], 520, 585)],
  'am2-final-3': [scene([
    head('3 · Un crítico con dos comportamientos'),
    box(20, 55, 480, 75, 'F = y² − 3xy − x²\nFx = −3y − 2x · Fy = 2y − 3x', { fs: 24 }),
    box(20, 155, 480, 65, 'Fx = Fy = 0 → (0, 0)', { s: 1, c: 'yellow', fs: 26 }),
    box(20, 245, 480, 65, 'D = (−2)(2) − (−3)² = −13', { s: 2, c: 'orange', fs: 25 }),
    plot(60, 345, 420, 220, [-2, 2], [-4.5, 4.5], { s: 3, xl: 't', fns: [{ f: '-pow(x,2)', c: 'blue', t: 'y=0: −t²' }, { f: 'pow(x,2)', c: 'green', t: 'x=0: t²' }] }),
    box(20, 600, 480, 65, 'Punto de ensilladura', { s: 4, c: 'purple', fs: 29 }),
  ], [
    'Derivá manteniendo fija la otra variable. Respecto de equis obtenés menos tres ye menos dos equis; respecto de ye, dos ye menos tres equis. Un punto crítico debe anular ambas derivadas parciales al mismo tiempo.',
    'Resolvé el sistema lineal. De la segunda ecuación, ye es tres medios de equis. Al sustituir en la primera, equis debe ser cero y entonces ye también es cero. Es el único punto crítico, pero todavía no sabés su clasificación.',
    'Las derivadas segundas son menos dos, dos y menos tres para la mixta. El determinante hessiano es menos cuatro menos nueve, igual a menos trece. Como es negativo, el criterio de segundo orden clasifica el crítico como ensilladura.',
    'El gráfico muestra dos cortes para entender el resultado. Sobre la recta ye igual a cero, la función vale menos equis al cuadrado y baja al alejarte del origen. Sobre equis igual a cero, vale ye al cuadrado y sube.',
    'Cerca del origen aparecen valores mayores y menores que cero. Por eso no es máximo ni mínimo: no domina el mismo comportamiento en todas las direcciones. El criterio hessiano y los dos cortes ofrecen justificaciones compatibles del punto de ensilladura.',
  ], 520, 690)],
  'am2-final-4': [scene([
    head('4a · La concavidad cambia de signo'),
    plot(55, 60, 425, 260, [-5, 5], [1, 4], { fns: [{ f: 'log(pow(x,2)+4)', c: 'blue' }], dots: [{ x: -2, y: Math.log(8), t: '−2', s: 1 }, { x: 2, y: Math.log(8), t: '2', s: 1 }] }),
    box(20, 350, 480, 70, 'f″ = 2(4 − x²)/(x² + 4)²', { s: 1, fs: 26, c: 'yellow' }),
    table(20, 450, 480, ['Intervalo', 'Signo de f″'], [['x < −2', '−'], ['−2 < x < 2', '+'], ['x > 2', '−']], { s: 2, fs: 25, rh: 46 }),
    box(20, 665, 480, 70, 'En (−∞, 2) el signo cambia', { s: 3, c: 'red', fs: 27 }),
  ], [
    'La afirmación sobre una concavidad uniforme en todo el intervalo debe comprobarse, no decidirse por el aspecto de una parte del dibujo. Para logaritmo de equis al cuadrado más cuatro, el dominio incluye todos los reales.',
    'Derivá una vez: dos equis dividido por equis al cuadrado más cuatro. Derivá de nuevo con cociente y simplificá. La segunda derivada queda dos por cuatro menos equis al cuadrado, dividido por equis al cuadrado más cuatro, todo al cuadrado.',
    'El denominador es siempre positivo, así que el signo depende de cuatro menos equis al cuadrado. Es positivo entre menos dos y dos, y negativo afuera. Los candidatos a inflexión son menos dos y dos, donde efectivamente cambia el signo.',
    'El intervalo desde menos infinito hasta dos contiene dos zonas con signos diferentes de la segunda derivada. Por eso la afirmación de una única concavidad en todo ese intervalo es falsa. Describí los signos y sus intervalos para evitar ambigüedad con la terminología de concavidad y convexidad.',
  ], 520, 760)],
  'am2-final-5': [scene([
    head('4b · El punto debe estar en la curva'),
    plot(55, 60, 425, 300, [-2.5, 2.5], [-0.1, 1.2], { fns: [{ f: 'exp(-pow(x,2))', c: 'blue' }], dots: [{ x: 0, y: 1, t: '(0,1)', s: 1 }, { x: 1, y: Math.exp(-1), t: '(1,1/e)', s: 2 }] }),
    box(20, 390, 480, 70, 'f′ = −2x·e^(−x²)\nÚnico crítico: x = 0', { s: 1, fs: 25, c: 'yellow' }),
    box(20, 485, 480, 65, 'f(1) = 1/e ≠ 0', { s: 2, fs: 28, c: 'orange' }),
    box(20, 580, 480, 70, 'Máximo en (0,1)\nNo hay mínimo alcanzado', { s: 3, fs: 26, c: 'green' }),
  ], [
    'Antes de clasificar un supuesto extremo, verificá que el punto pertenezca a la gráfica. En este ejemplo la función exponencial de menos equis al cuadrado es positiva para toda equis real. Un valor cero ya resulta incompatible con esa propiedad.',
    'La derivada es menos dos equis por la misma exponencial. Como la exponencial nunca se anula, el único punto crítico aparece cuando equis es cero. La derivada es positiva a la izquierda y negativa a la derecha: allí hay un máximo.',
    'En equis igual a uno, la función vale uno sobre e. Por eso el punto uno, cero no pertenece a la curva y no puede ser un mínimo suyo. Esta comprobación rápida ya alcanza para descartar la afirmación del modelo.',
    'Al alejarte del origen, los valores se acercan a cero sin alcanzarlo. Cero es un ínfimo, no un mínimo alcanzado en un punto real. El máximo vale uno y ocurre en el origen de la variable, es decir, en el punto cero, uno de la gráfica.',
  ], 520, 675)],
};

const definitions = [
  ['am2-final-1', 'm4', 'Final · 1a: sustitución logarítmica', 'Obtené una primitiva de 5/[x(2 + ln x)] y revisá dónde es válida.', '5 ln|2 + ln x| + C, en intervalos con x > 0 y x ≠ e⁻².'],
  ['am2-final-2', 'm7', 'Final · 2a: dominio con dos raíces', 'Estudiá dónde existe √(2x + 8 − y) / ⁴√(−2x² − 4 + y), diferenciando las dos fronteras.', '−1 < x < 2 y 2x² + 4 < y ≤ 2x + 8.'],
  ['am2-final-3', 't-ext', 'Final · 3: crítico y ensilladura', 'Clasificá los puntos críticos de F(x,y) = y² − 3xy − x², y comprobá la clasificación con dos cortes.', 'Único crítico (0,0): ensilladura, D = −13.'],
  ['am2-final-4', 'm1', 'Final · 4a: V/F sobre concavidad', 'V/F: ln(x² + 4) conserva la misma concavidad en todo (−∞,2). Justificá mediante f″.', 'Falso: f″ cambia de negativa a positiva al pasar por −2.'],
  ['am2-final-5', 'm1', 'Final · 4b: V/F sobre un mínimo', 'V/F: la gráfica de e^(−x²) tiene un mínimo en (1,0). Verificá el punto antes de usar derivadas.', 'Falso: f(1) = 1/e; el máximo es (0,1), y no hay mínimo alcanzado.'],
];
export const FINAL_EXERCISES: WorkedExercise[] = definitions.map(([id, module, title, statement, result]) => ({
  id, module, title, statement, result,
  steps: FINAL_SCENES[id][0].say.map((body, i) => ({ title: `Paso ${i + 1}`, body })),
}));
