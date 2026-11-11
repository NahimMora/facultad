import type { WorkedExercise } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, bars, box, head, line, plot, scene, table, txt } from './h';

export const SUGAR_SAMPLE = [20.1, 17.3, 19.5, 19.9, 18.6, 20.1, 18.3, 17.4];
export const SUGAR_P = 0.0159836461;
export const SUGAR_CI = [18.1196662, 19.6803338];

export const FINAL_SCENES: Record<string, VisScene[]> = {
  'pye-e1': [scene([
    head('1 · Dispersión, percentil y dos medias'),
    table(20, 60, 600, ['Sector', 'Media', 's', 'CV'], [['Adm.', '2590,3', '395,7', '15,28 %'], ['Com.', '2915,3', '668,5', '22,93 %']], { fs: 25, rh: 75, cw: [1, 1.2, 1, 1.2] }),
    box(20, 335, 600, 100, 'P75 administrativo = 2809,8 miles de pesos\nRemuneración ANUAL, según la tabla', { fs: 26, s: 1, c: 'purple' }),
    box(20, 485, 600, 90, 'H0: μCom ≤ μAdm · H1: μCom > μAdm', { fs: 27, s: 2, c: 'orange' }),
    box(20, 625, 600, 110, 'p = 0,041 < 0,05 → rechazá H0\nPosible error tipo I', { fs: 28, s: 3, c: 'green' }),
  ], [
    'Para comparar heterogeneidad relativa usá el coeficiente de variación, desvío sobre media. Administración da cero coma ciento cincuenta y tres aproximadamente, y Comercial cero coma doscientos veintinueve. Comercial tiene mayor dispersión relativa. No compares solamente los desvíos si también cambian las medias de los grupos.',
    'El percentil setenta y cinco de Administración es dos mil ochocientos nueve coma ocho, en miles de pesos anuales. Aproximadamente tres cuartas partes de las observaciones quedan hasta ese nivel. No significa promedio ni porcentaje del dinero total. La tabla dice anual; una respuesta que lo cambie a mensual altera la unidad.',
    'Son dos muestras independientes y una variable cuantitativa: comparás medias poblacionales. La alternativa afirma que Comercial tiene mayor media, por eso la prueba es unilateral derecha. La guía trabaja homogeneidad de varianzas para seleccionar la versión clásica; si no suponés igualdad, existe la versión de Welch. Acá se proporciona el p-valor de la prueba correspondiente.',
    'Compará el p-valor dado, cero coma cero cuarenta y uno, con alfa cero coma cero cinco. Rechazás la hipótesis nula: hay evidencia de una remuneración media mayor en Comercial. El error posible de esa decisión es tipo uno: afirmar esa diferencia cuando en la población no existe. El p-valor no es la probabilidad de que la hipótesis nula sea verdadera.',
  ], 640, 775)],
  'pye-final-e2': [scene([
    head('2 · Errores independientes'),
    box(20, 65, 260, 110, 'Respiración R\nP(R)=0,27', { id: 'r', fs: 28, c: 'blue' }),
    box(360, 65, 260, 110, 'Postura P\nP(P)=0,46', { id: 'p', fs: 28, c: 'orange' }),
    box(20, 270, 600, 100, 'P(R ∩ P) = 0,27 × 0,46 = 0,1242', { s: 1, fs: 29, c: 'green' }),
    arr('r', [180, 270], { s: 1 }), arr('p', [460, 270], { s: 1 }),
    box(20, 465, 600, 100, 'P(P | R) = P(P ∩ R) / P(R)\n= 0,1242 / 0,27 = 0,46', { s: 2, fs: 28, c: 'purple' }),
    box(20, 660, 600, 95, 'Independencia ≠ exclusión mutua\nLos dos errores pueden ocurrir juntos', { s: 3, fs: 27 }),
  ], [
    'Identificá los sucesos y la condición clave: el problema dice que son independientes. La probabilidad de error de respiración es cero coma veintisiete, y la de postura cero coma cuarenta y seis. No necesitás suponer independencia por intuición: acá es un dato explícito.',
    'Ambos errores corresponde a la intersección. Por independencia multiplicás cero coma veintisiete por cero coma cuarenta y seis y obtenés cero coma uno dos cuatro dos: doce coma cuarenta y dos por ciento. Sumar las probabilidades daría otra operación y además contaría dos veces la intersección.',
    'Para la probabilidad de postura sabiendo que hubo respiración, dividí la intersección por la probabilidad de respiración. El resultado vuelve a ser cero coma cuarenta y seis. Esa igualdad expresa independencia: conocer la ocurrencia de un error no modifica la probabilidad del otro.',
    'Independientes no significa incompatibles. En este ejercicio pueden aparecer juntos, con probabilidad positiva. Si dos sucesos de probabilidad positiva fueran mutuamente excluyentes, su intersección sería cero y no podría igualar al producto de sus probabilidades. Separá siempre ambas ideas al leer una pregunta de verdadero o falso.',
  ], 640, 795)],
  'pye-e2': [scene([
    head('3 · Interpretá la regresión sin invertir variables'),
    box(20, 65, 600, 110, 'ŷ = 5384,51 + 16,645 x\nx: millones de habitantes · y: CO₂ en ppm', { fs: 28 }),
    box(20, 230, 600, 100, 'r = 0,931 → R² = 0,866761\n86,68 % de la variación de y explicada', { s: 1, fs: 28, c: 'green' }),
    box(20, 395, 600, 110, 'Ordenada: ŷ con x=0\nPendiente: +16,645 ppm por millón adicional', { s: 2, fs: 27, c: 'orange' }),
    box(20, 565, 600, 110, 'Asociación no demuestra causalidad\nNo hay p-valor de pendiente informado', { s: 3, fs: 27, c: 'purple' }),
  ], [
    'Definí primero qué variable ocupa cada eje. El tamaño de población es equis, expresado en millones, y la concentración de dióxido de carbono es ye, en partes por millón. La ecuación estima concentración a partir de población; no permite intercambiar automáticamente las variables ni sus unidades.',
    'Cero coma novecientos treinta y uno es la correlación. Al elevarla al cuadrado obtenés cero coma ochocientos sesenta y seis mil setecientos sesenta y uno: aproximadamente ochenta y seis coma sesenta y ocho por ciento de la variación de la concentración queda explicada por el ajuste lineal. No es el porcentaje del dióxido de carbono total.',
    'La ordenada es la concentración estimada cuando la población vale cero, una extrapolación sin interpretación práctica útil en este contexto. La pendiente indica un aumento estimado de dieciséis coma seiscientos cuarenta y cinco partes por millón por cada millón adicional de habitantes, dentro del alcance razonable del modelo.',
    'Una relación lineal, incluso significativa, no demuestra causalidad. Tampoco podés declarar significativa la pendiente sin la prueba o información necesaria. El modelo no da aquí su p-valor. La afirmación correcta separa asociación observada, significación estadística y explicación causal; son conclusiones distintas.',
  ], 640, 715)],
  'pye-final-e4': [scene([
    head('4a · Media menor que 20: recalculá la prueba'),
    box(20, 65, 600, 90, 'H0: μ ≥ 20 · H1: μ < 20\nα = 0,04 · n = 8 · σ desconocido', { fs: 28 }),
    box(20, 210, 600, 100, 'x̄ = 18,9 · s ≈ 1,164965\nSE = s / √8 ≈ 0,411883', { s: 1, fs: 29, c: 'blue' }),
    box(20, 365, 600, 100, 't = (18,9 − 20) / 0,411883 ≈ −2,6707\ngl = 7 · p unilateral ≈ 0,01598', { s: 2, fs: 27, c: 'orange' }),
    plot(60, 535, 520, 200, [-4, 4], [0, 0.45], { fns: [{ f: '0.3849914508*pow(1+x*x/7,-4)', c: 'blue', area: [-4, -2.6707] }], vl: [{ x: -2.6707, t: 't', c: 'orange' }], s: 2, xl: 't', xt: 2, yt: 0.2 }),
    box(20, 805, 600, 110, '0,01598 < 0,04 → rechazá H0\nEvidencia de media menor que 20', { s: 3, fs: 29, c: 'green' }),
  ], [
    'El umbral del problema es veinte gramos por kilo. Para buscar evidencia de una media menor, la alternativa es mu menor que veinte y la nula incluye veinte y valores superiores. Con ocho observaciones y desvío poblacional desconocido, la prueba t requiere muestra aleatoria, observaciones independientes y una población aproximadamente normal, sin valores atípicos importantes.',
    'Sumá las ocho observaciones para obtener media dieciocho coma nueve. El desvío muestral, con divisor siete, es aproximadamente uno coma ciento sesenta y cinco. Dividilo por raíz de ocho: el error estándar es cero coma cuatrocientos doce. Usar el desvío directamente en el denominador cambiaría el estadístico.',
    'El estadístico es media menos veinte, dividido por el error estándar: aproximadamente menos dos coma seis siete cero siete. Usá siete grados de libertad y cola izquierda. El área acumulada correspondiente es cero coma cero quince noventa y ocho. El valor crítico para alfa cero coma cero cuatro es aproximadamente menos dos coma cero cuatro seis.',
    'El p-valor es menor que cero coma cero cuatro y el estadístico cae en la región de rechazo. Hay evidencia de media menor que veinte bajo los supuestos indicados. La respuesta adjunta al modelo informa otro p-valor; al recalcular estos datos la decisión cambia. Esto no garantiza que cada producto individual esté debajo del umbral.',
  ], 640, 955)],
  'pye-final-e5': [scene([
    head('4b · Intervalo del 90 % para la misma muestra'),
    box(20, 65, 600, 110, 'IC: x̄ ± t0,95;7 × s/√8\n18,9 ± 1,894579 × 0,411883', { fs: 29 }),
    line([[90, 330], [550, 330]], { s: 1, c: 'green', sw: 6 }),
    ...[90, 320, 550].map((x) => line([[x, 310], [x, 350]], { s: 1, c: 'green', sw: 4 })),
    txt(90, 390, '18,1197', { s: 1, fs: 26 }), txt(320, 390, '18,9', { s: 1, fs: 26 }), txt(550, 390, '19,6803', { s: 1, fs: 26 }),
    box(20, 470, 600, 110, 'Estima la media poblacional\nNo encierra al 90 % de los productos', { s: 2, fs: 28, c: 'purple' }),
    box(20, 640, 600, 120, 'El enunciado cambia de sustancia por error\nAcá usamos los datos de azúcar disponibles\nNo hay muestra de la otra sustancia', { s: 3, fs: 25, c: 'orange' }),
  ], [
    'Para un intervalo bilateral de noventa por ciento repartí diez por ciento entre las dos colas. El cuantil t de siete grados de libertad deja noventa y cinco por ciento a la izquierda y vale aproximadamente uno coma ochocientos noventa y cinco. Multiplicalo por el error estándar de la misma muestra.',
    'El margen es aproximadamente cero coma setecientos ochenta. Restalo y sumalo a la media dieciocho coma nueve: el intervalo queda entre dieciocho coma once noventa y siete y diecinueve coma sesenta y ocho cero tres gramos por kilo. Redondeado a dos decimales, dieciocho coma doce y diecinueve coma sesenta y ocho.',
    'Con noventa por ciento de confianza, el procedimiento estima la media poblacional dentro de ese intervalo. En repeticiones del muestreo, aproximadamente noventa por ciento de los intervalos construidos de esta manera cubrirían la media fija. No describe el porcentaje de unidades individuales ni cambia la media muestral, que ya conocés.',
    'El inciso original cambia por error el nombre de la sustancia sin dar una segunda muestra. No inventamos nuevos datos. Este intervalo usa la muestra de azúcar del inciso anterior y así lo dejamos aclarado. Estimar la media de la otra sustancia requeriría sus observaciones o confirmar formalmente la corrección del enunciado.',
  ], 640, 800)],
  'pye-final-e6': [scene([
    head('5a · Poisson: ajustá la tasa al volumen'),
    box(20, 65, 600, 100, '2 bacterias/mm³ × 2 mm³ → λ = 4\nX: cantidad en la muestra de 2 mm³', { fs: 28 }),
    bars(60, 230, 520, 250, [0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => ({ t: String(k), v: Math.round(1000 * Math.exp(-4) * Math.pow(4, k) / Array.from({ length: k }, (_, i) => i + 1).reduce((a, b) => a * b, 1)) / 1000, c: k >= 5 && k <= 7 ? 'green' : 'gray', s: 1 })), { max: 0.22, s: 1 }),
    box(20, 565, 600, 100, 'P(5≤X≤7) = P(X=5)+P(X=6)+P(X=7)\n≈ 0,156293 + 0,104196 + 0,059540', { s: 2, fs: 25, c: 'blue' }),
    box(20, 725, 600, 90, 'Resultado ≈ 0,320029 = 32,00 %', { s: 3, fs: 29, c: 'green' }),
  ], [
    'La tasa dada es dos bacterias por milímetro cúbico, pero la muestra tiene dos milímetros cúbicos. Bajo el modelo Poisson del ejercicio, el parámetro para esa muestra es cuatro. Identificá siempre la unidad del intervalo o volumen antes de aplicar una fórmula.',
    'La variable cuenta bacterias, por eso es discreta. Entre cinco y siete, incluyendo extremos, significa exactamente cinco, seis o siete. Las barras verdes muestran esos tres valores. No uses un intervalo continuo de la normal ni dejes el parámetro en dos, que correspondería a otro volumen.',
    'Para cada valor aplicá exponencial de menos cuatro por cuatro elevado al valor, dividido por su factorial. Sumá las tres probabilidades: aproximadamente cero coma ciento cincuenta y seis, cero coma ciento cuatro y cero coma cero sesenta. Son sucesos excluyentes, por eso la suma no requiere restar intersecciones.',
    'El resultado es aproximadamente cero coma treinta y dos, o treinta y dos por ciento. Con una función acumulada también podés calcular F de siete menos F de cuatro. Restar F de cinco quitaría además el caso de cinco bacterias, que sí forma parte del evento pedido.',
  ], 640, 855)],
  'pye-final-e7': [scene([
    head('5b · Percentil 80 de un gasto normal'),
    box(20, 65, 600, 95, 'G ~ Normal(μ=420, σ=80), en miles de pesos', { fs: 27 }),
    plot(60, 230, 520, 230, [-3, 3], [0, 0.45], { fns: [{ f: 'exp(-x*x/2)/sqrt(2*PI)', area: [-3, 0.841621], c: 'blue' }], vl: [{ x: 0.841621, t: 'z80', c: 'orange' }], s: 1, xl: 'z', xt: 1, yt: 0.2 }),
    box(20, 545, 600, 100, 'P(G≤g)=0,80 → z80 ≈ 0,841621\ng = 420 + 80 × 0,841621', { s: 2, fs: 28, c: 'orange' }),
    box(20, 705, 600, 100, 'g ≈ 487,33 miles de pesos\n20 % queda por encima', { s: 3, fs: 29, c: 'green' }),
  ], [
    'El gasto tiene una distribución normal con media cuatrocientos veinte y desvío ochenta, ambos en miles de pesos. Se busca el máximo que no se supera en ochenta por ciento de las ocasiones, es decir, el percentil ochenta. No se pide ochenta por ciento de la media ni un intervalo bilateral.',
    'Buscá el valor de z que deja cero coma ochenta de probabilidad a su izquierda. Es positivo porque ochenta por ciento está por encima de la mediana. El cuantil es aproximadamente cero coma ochocientos cuarenta y dos. La cola derecha conserva veinte por ciento, no ochenta.',
    'Deshacé la estandarización: gasto igual a media más desvío por cuantil. Cuatrocientos veinte más ochenta por cero coma ochocientos cuarenta y dos da aproximadamente cuatrocientos ochenta y siete coma treinta y tres, en miles de pesos. Recordá usar desvío y no varianza en esta cuenta.',
    'El umbral estimado es aproximadamente cuatrocientos ochenta y siete mil trescientos treinta pesos. Según el modelo, ochenta por ciento de los gastos queda hasta ese nivel y veinte por ciento lo supera. Es un percentil de observaciones individuales; no un intervalo de confianza para la media del mantenimiento.',
  ], 640, 845)],
};

export const FINAL_EXERCISES: WorkedExercise[] = [
  { id: 'pye-e1', module: 'u1', title: 'Final · 1. Remuneraciones por sector', statement: 'Datos anuales, en miles de pesos. Administración: n=20, media 2590,3, s=395,7, P75=2809,8. Comercial: n=17, media 2915,3, s=668,5. Compará dispersión relativa, interpretá P75 y decidí si Comercial tiene mayor media, con p=0,041 y α=0,05.', steps: [{ title: 'CV', body: 'Administración ≈15,28 %; Comercial ≈22,93 %. Comercial es más heterogéneo.' }, { title: 'Percentil', body: 'Aproximadamente el 75 % de las remuneraciones administrativas queda hasta 2809,8 miles de pesos anuales.' }, { title: 'Prueba', body: 'Dos medias independientes. H0: μCom≤μAdm; H1: μCom>μAdm. p<α: rechazá H0; posible error I.' }], result: 'Dispersión relativa mayor en Comercial; evidencia de media mayor.' },
  { id: 'pye-final-e2', module: 'u2', title: 'Final · 2. Dos errores independientes', statement: 'P(error de respiración)=0,27 y P(error de postura)=0,46. Son independientes. Calculá ambos errores y postura dado que hubo respiración.', steps: [{ title: 'Intersección', body: '0,27×0,46=0,1242.' }, { title: 'Condicional', body: '0,1242/0,27=0,46.' }], result: '12,42 % para ambos; 46 % para postura condicionado a respiración.' },
  { id: 'pye-e2', module: 'u9', title: 'Final · 3. Regresión de población y CO₂', statement: 'ŷ=5384,51+16,645x, r=0,931. x se mide en millones de habitantes e y en ppm de CO₂. Interpretá variación explicada, ordenada y alcance causal. El modelo no informa p-valor de la pendiente.', steps: [{ title: 'R²', body: '0,931²=0,866761: 86,68 % de variación de y explicada por el ajuste.' }, { title: 'Coeficientes', body: 'Ordenada: y estimada con x=0; pendiente: +16,645 ppm por millón adicional, dentro del alcance del modelo.' }, { title: 'Alcance', body: 'Asociación no demuestra causalidad. Sin prueba adicional no declarés significativa la pendiente.' }], result: 'Separá correlación, determinación, significación y causalidad.' },
  { id: 'pye-final-e4', module: 'u6', title: 'Final · 4a. Prueba t con ocho observaciones', statement: 'Muestra de azúcar en g/kg: 20,1; 17,3; 19,5; 19,9; 18,6; 20,1; 18,3; 17,4. Evaluá μ<20 con α=0,04. La t requiere independencia y normalidad aproximada; el enunciado no aporta una comprobación de esta última.', steps: [{ title: 'Estadísticos', body: 'Media=18,9; s≈1,164965; SE≈0,411883.' }, { title: 't de Student', body: 't≈−2,6707, gl=7. p unilateral≈0,01598.' }, { title: 'Decisión recalculada', body: 'p<0,04: rechazá H0. La respuesta adjunta al modelo tiene otro p-valor; este resultado corresponde a los ocho datos publicados.' }], result: 'Bajo los supuestos, hay evidencia de media menor que 20; no garantiza cada unidad.' },
  { id: 'pye-final-e5', module: 'u6', title: 'Final · 4b. Intervalo del 90 %', statement: 'Estimá la media de la misma muestra con confianza del 90 %. El inciso original cambia el nombre de la sustancia sin dar otros datos: esta resolución usa explícitamente la muestra de azúcar disponible.', steps: [{ title: 'Cuantil', body: 't0,95;7≈1,894579.' }, { title: 'Intervalo', body: '18,9±1,894579×0,411883 → (18,1197;19,6803) g/kg.' }, { title: 'Interpretación', body: 'El procedimiento estima la media poblacional con 90 % de confianza; no el 90 % de los productos.' }], result: 'IC≈(18,12;19,68) g/kg para la media de azúcar.' },
  { id: 'pye-final-e6', module: 'u3', title: 'Final · 5a. Bacterias y Poisson', statement: 'Tasa de 2 bacterias por mm³. Bajo un modelo Poisson, calculá la probabilidad de encontrar entre 5 y 7, inclusive, en 2 mm³.', steps: [{ title: 'Parámetro', body: 'λ=2×2=4 para la muestra.' }, { title: 'Suma', body: 'Σ k=5..7 de exp(−4)×4^k/k! ≈0,320029.' }], result: 'Aproximadamente 32,00 %.' },
  { id: 'pye-final-e7', module: 'u4', title: 'Final · 5b. Gasto máximo del 80 %', statement: 'Gasto de mantenimiento normal con media 420 y desvío 80, en miles de pesos. Buscá el umbral que no se supera en el 80 % de las ocasiones.', steps: [{ title: 'Cuantil', body: 'z0,80≈0,841621.' }, { title: 'Volver a la unidad', body: '420+80×0,841621≈487,33 miles de pesos.' }], result: 'Percentil 80≈487,33 miles de pesos; 20 % queda por encima.' },
];
