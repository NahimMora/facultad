/**
 * PyE · Unidad 9 (regresión y correlación), tema por tema.
 * Fuentes revisadas (privadas): análisis de regresión completo 25-2, modelos de 2º parcial y de evaluación oral.
 * Redacción y datos propios (Mate Cloud).
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { head, plot, txt } from './h';
import { asker, flow, sc, VIDEO_NOTE } from './kit';

const module = 'u9';
const ORAL = 'modelo de evaluación oral de la cátedra';

export const U9_THEORY: TheoryBlock[] = [
  {
    id: 'p9', module, title: 'La recta: qué significan a y b', videoNote: VIDEO_NOTE,
    lead: [
      'La regresión responde: **¿puedo estimar Y conociendo X?** Da una recta **ŷ = a + b·x**. Todo el puntaje está en decir qué significan a y b **con las palabras y las unidades del problema**.',
      'Regla para no cruzarlos: **b acompaña a la x**. En Jamovi, "Constante" es a y la fila con el nombre de la variable es b.',
    ],
    scenes: [sc([
      head('ŷ = 4 + 1,5x'),
      plot(60, 62, 500, 245, [0, 12], [0, 24], { xt: 2, yt: 4, xl: 'miles de registros', yl: 'minutos', fns: [{ f: '4+1.5*x', c: 'blue', s: 1 }], dots: [{ x: 2, y: 8 }, { x: 3, y: 7.5 }, { x: 5, y: 12.5 }, { x: 6, y: 12 }, { x: 8, y: 17 }, { x: 10, y: 18 }, { x: 0, y: 4, c: 'yellow', s: 3 }] }),
      txt(300, 355, 'b = 1,5 → por cada mil registros más, 1,5 minutos más', { fs: 17, b: true, c: 'green', s: 2, w: 570 }),
      txt(300, 405, 'a = 4 → tiempo medio estimado con x = 0', { fs: 17, b: true, c: 'yellow', s: 3, w: 570 }),
    ], [
      'Primero el **diagrama de dispersión**: cada punto es un entrenamiento. X es la cantidad de datos en miles e Y, el tiempo en minutos. La nube sube y parece recta.',
      'La recta de **mínimos cuadrados** es la que hace mínima la suma de los residuos al cuadrado.',
      'La **pendiente b**: por cada mil registros adicionales se espera que el tiempo medio **aumente 1,5 minutos**.',
      'La **ordenada a**: el tiempo medio estimado cuando x vale cero. Después decidís si tiene sentido y si es confiable; acá cero está fuera de los datos observados.',
    ])],
    points: [
      '**X:** independiente, regresora, la que uso para predecir. **Y:** dependiente, explicada, la que quiero estimar.',
      '**Modelo poblacional:** y = α + βx + ε. **Recta muestral:** ŷ = a + bx; a estima α y b estima β.',
      '**b:** cuánto varía **en promedio** y por cada unidad que aumenta x. Positivo, aumenta; negativo, disminuye.',
      '**a:** valor medio de y cuando x = 0. Puede **no tener sentido** (comprador de 0 años) o tener sentido y **no ser confiable** (x = 0 fuera del rango).',
    ],
    table: { head: ['¿x = 0 es posible?', '¿Está en el rango observado?', 'Qué respondés de a'], rows: [['no', '—', 'no tiene sentido'], ['sí', 'no', 'tiene sentido pero no es confiable'], ['sí', 'sí', 'tiene sentido y es interpretable']] },
    example: { title: 'salario y especialización (modelo de oral)', body: ['ŷ = 161,67 + 5,23x, salario en miles de pesos. **b:** por cada punto más de especialización el salario medio aumenta **$5.230**. **a:** con puntaje 0 el salario medio estimado es **$161.670**. Tiene sentido porque 0 está en la escala; es confiable solo si hubo observaciones cercanas a 0.'] },
    written: 'Interpretación de b: por cada [unidad de x] adicional de [variable x], se espera que [variable y] [aumente / disminuya] en promedio |b| [unidades de y]. Interpretación de a: cuando [x] es 0, el valor medio estimado de [y] es a [unidades]; [tiene / no tiene] sentido porque … y [es / no es] confiable porque …',
    trap: 'En tu parcial usaste la constante como pendiente. Y mirá las **unidades**: si x está en miles, "un aumento en 1" son **mil**.',
  },
  {
    id: 'p9x', module, title: 'Estimar, residuo y extrapolación',
    lead: ['Con la recta podés estimar reemplazando x, pero **solo dentro del rango con el que se construyó**. Afuera no hay datos que respalden que la relación siga igual.'],
    scenes: [flow('ŷ = 4 + 1,5x, con x entre 2 y 10', [
      ['Reemplazar', 'x = 8 → ŷ = 4 + 1,5 · 8 = 16', 'Para 8 mil registros reemplazás x: el tiempo **medio estimado** es 16 minutos.'],
      ['Residuo', 'e = y − ŷ = 17 − 16 = 1', 'El caso real tardó 17. El residuo es observado menos estimado: **1 minuto**.'],
      ['Leer el signo', 'positivo: la recta se quedó corta', 'Si es positivo, el punto está arriba de la recta y se **subestimó**. Si es negativo, se sobrestimó.'],
      ['Fuera de rango', 'x = 30: no corresponde estimar', 'Con 30 mil registros no se estima: está fuera del intervalo de 2 a 10. Sería **extrapolar**.'],
    ])],
    points: [
      '**ŷ** es el valor medio estimado; **y**, el observado.',
      '**Residuo e = y − ŷ**. e > 0: subestimó. e < 0: sobrestimó.',
      'Mínimos cuadrados minimiza **Σe²**; no sirve minimizar Σe porque siempre da 0.',
      '**Interpolar** es válido si el modelo es bueno; **extrapolar** no es confiable.',
    ],
    example: { title: 'errores de código', body: ['ŷ = 8,397 − 0,345x, con x entre 12 y 22 horas. Para x = 18: ŷ = 2,187. Se observaron 2, entonces e = −0,187: **se sobrestimó**. Para 30 horas no se estima.'] },
    written: 'ŷ = a + b·x₀ = … Se estima que cuando [x] es x₀, [y] media es … El residuo e = y − ŷ = … indica que el modelo [subestimó / sobrestimó]. No es válido estimar para x fuera de [mínimo ; máximo] porque se estaría extrapolando.',
    trap: 'El residuo es **y − ŷ**, en ese orden. Al revés te cambia la interpretación.',
  },
  {
    id: 'p9r', module, title: 'r y R²: qué tan bueno es el modelo',
    lead: ['Dos números que se confunden: **r dice fuerza y sentido**; **R² dice porcentaje explicado**. R² es r al cuadrado, por eso pierde el signo.'],
    scenes: [
      sc([
        head('El signo y la fuerza de r'),
        plot(25, 70, 165, 165, [0, 10], [0, 10], { ticks: false, dots: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => ({ x, y: x + (x % 2 ? 0.3 : -0.4) })) }),
        txt(107, 270, 'r cerca de 1', { fs: 17, b: true, c: 'green' }),
        plot(217, 70, 165, 165, [0, 10], [0, 10], { s: 1, ticks: false, dots: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => ({ x, y: 10 - x + (x % 2 ? 0.3 : -0.4) })) }),
        txt(300, 270, 'r cerca de −1', { fs: 17, b: true, c: 'orange', s: 1 }),
        plot(409, 70, 165, 165, [0, 10], [0, 10], { s: 2, ticks: false, dots: [5, 8, 2, 9, 4, 7, 1, 8, 4].map((y, i) => ({ x: i + 1, y })) }),
        txt(492, 270, 'r cerca de 0', { fs: 17, b: true, c: 'pink', s: 2 }),
        txt(300, 345, 'R² = r² = % de la variación de Y explicada por X', { fs: 17, b: true, c: 'blue', s: 3, w: 570 }),
        txt(300, 400, 'Bueno para pronosticar: |r| > 0,7 (R² > 0,5)', { fs: 17, b: true, c: 'yellow', s: 4, w: 570 }),
      ], [
        'Cerca de **1**: asociación lineal fuerte y **directa**. Los puntos suben pegados a la recta.',
        'Cerca de **menos 1**: igual de fuerte, pero **inversa**. El signo de r es siempre el de la pendiente.',
        'Cerca de **0**: no hay asociación lineal. Puede haber otra relación que no sea una recta.',
        '**R²** es el porcentaje de la variación de Y, la que predecís, que se explica por las variaciones de X.',
        'Criterio de la cátedra: el modelo sirve para pronosticar si el valor absoluto de r supera **0,7**, que equivale más o menos a R² mayor que **0,5**.',
      ]),
    ],
    points: [
      '**−1 ≤ r ≤ 1**. Tiene el **signo de b**. Si X e Y son independientes r = 0, pero r = 0 no prueba independencia.',
      '**0 ≤ R² ≤ 1**. R² = variación explicada / variación total (SCT = SCE + SCR, explicada más residual).',
      '**r = ±√R²**, con el signo de la pendiente.',
      '**Buen modelo:** |r| > 0,7. **Malo:** R² < 0,50 (criterios de la cátedra).',
    ],
    table: { head: ['', 'r', 'R²'], rows: [['Nombre', 'correlación', 'determinación'], ['Rango', 'de −1 a 1', 'de 0 a 1'], ['Dice', 'fuerza y sentido', '% de variación explicada'], ['Corte', '|r| > 0,7', 'R² > 0,5']] },
    example: { title: 'salario y especialización', body: ['R² = 0,36. **r = +√0,36 = 0,6** (positivo porque b = 5,23 > 0): asociación lineal directa moderada. El **36 % de las variaciones del salario** se explica por las variaciones del nivel de especialización. 0,6 < 0,7: **no es bueno para pronosticar**.'] },
    written: 'r = … indica una asociación lineal [fuerte / moderada / débil] y [directa / inversa] entre [x] e [y]. R² = …: el …% de las variaciones en [y, la que se predice] se explica por las variaciones en [x]. El modelo [es / no es] bueno para pronósticos porque |r| [> / <] 0,7.',
    trap: 'En el recu diste vuelta la frase. **Primero Y, la que se predice; después X.** Y "explica" no quiere decir "causa".',
  },
  {
    id: 'p9b', module, title: 'Prueba sobre la pendiente',
    lead: ['Una pendiente muestral distinta de 0 puede salir de casualidad. La prueba decide si en la **población** hay asociación lineal. Si β fuera 0 la recta sería horizontal y conocer x no ayudaría.'],
    scenes: [flow('¿Están linealmente asociadas?', [
      ['Hipótesis', 'H₀: β = 0 · H₁: β ≠ 0', 'La nula dice que la pendiente poblacional es cero, o sea que X no sirve para estimar Y linealmente. Es **bilateral**.'],
      ['Estadístico', 'tₘ = b / Sb, con ν = n − 2', 'El estadístico divide la pendiente por su error estándar. Los grados de libertad son **n menos 2**.'],
      ['Valor p', '2 · P(t > |tₘ|)', 'El valor p es de dos colas. En Jamovi está en la fila de la variable, no en la de la constante.'],
      ['Conclusión', 'p-v < α: asociación lineal', 'Si se rechaza, las variables están **linealmente asociadas** y la recta mejora la estimación. No se probó causalidad.'],
    ])],
    points: [
      '**H₀: β = 0** · **H₁: β ≠ 0**',
      '**tₘ = b/Sb**, **ν = n − 2**, **p-v = 2·P(t > |tₘ|)**.',
      'Rechazar: la recta es útil para estimar Y; las variables están linealmente asociadas.',
      'Significativa no es lo mismo que buena para pronosticar: eso lo dicen r y R².',
    ],
    example: { title: 'ingreso y gasto digital', body: ['n = 7, b = 0,008, Sb = 0,001415: tₘ = 5,65 con 5 gl y p-v = 0,0024 < 0,01. Se rechaza: el ingreso y el gasto en servicios digitales están linealmente asociados. (En la diapositiva el enunciado habla de 10 usuarios y de 6 %, pero se resuelve con 7 datos y 1 %.)'] },
    written: 'H₀: β = 0; H₁: β ≠ 0. tₘ = b/Sb = … con ν = n − 2 = … p-v = 2·P(t > |tₘ|) = … [< / ≥] α. Con un …% de significación [hay / no hay] evidencia de que [x] e [y] están linealmente asociadas.',
    trap: 'La β de regresión (pendiente poblacional) **no es** la β del error tipo II. Es la misma letra para dos cosas.',
  },
];

const { mcq, tf } = asker(module);

export const U9_QUESTIONS: Question[] = [
  mcq('pye-u9-01', 'p9', 'Compras anuales según la edad: ŷ = 73,5 − 1,17x. La pendiente dice que:', 'Por cada año más, las compras medias bajan 1,17', ['Por cada año más, las compras medias bajan 73,5', 'A los 0 años se hacen 1,17 compras', 'Por cada compra más, la edad baja 1,17 años'], 'b = −1,17 acompaña a la edad: cambio medio de Y por cada año.'),
  mcq('pye-u9-02', 'p9', 'Salario (miles de $): ŷ = 161,67 + 5,23x, con x el puntaje de especialización. Por cada punto más:', 'El salario medio sube $5.230', ['El salario medio sube $5,23', 'El salario medio sube $161.670', 'El salario medio sube 5,23 %'], 'El salario está en miles: 5,23 miles son $5.230.', ORAL),
  mcq('pye-u9-03', 'p9x', 'La recta se armó con x entre 12 y 22 horas. ¿Qué hacés si te piden estimar con 30?', 'No estimar: sería extrapolar', ['Reemplazar y listo', 'Usar solo la ordenada', 'Cambiar el signo de b'], 'Fuera del rango observado la estimación no es confiable.'),
  mcq('pye-u9-04', 'p9x', 'Observado 2 y estimado 2,187. El residuo indica que el modelo:', 'Sobrestimó en 0,187', ['Subestimó en 0,187', 'Acertó', 'No sirve para pronosticar'], 'e = 2 − 2,187 = −0,187: negativo, la recta dio de más.'),
  mcq('pye-u9-05', 'p9r', 'ŷ = 13,45 − 0,78x y R² = 0,82. El coeficiente r es:', '−0,906', ['0,906', '0,82', '−0,672'], 'r es la raíz de 0,82 con el signo de la pendiente.'),
  mcq('pye-u9-06', 'p9r', 'R² = 0,36 entre especialización (X) y salario (Y). Significa que:', 'El 36 % de las variaciones del salario se explica por las de la especialización', ['El 36 % de las variaciones de la especialización se explica por las del salario', 'El 36 % del salario es por la especialización', 'La correlación es 0,36'], 'Primero la variable que se predice (Y) y después la que explica (X).', ORAL),
  tf('pye-u9-07', 'p9r', 'Con r = 0,667 el modelo es bueno para pronósticos según la cátedra.', false, '0,667 < 0,7 y R² = 0,445 < 0,5: no es bueno para pronosticar.'),
  mcq('pye-u9-08', 'p9b', 'Los grados de libertad de la prueba sobre la pendiente con 12 observaciones son:', '10', ['11', '12', '24'], 'En regresión simple ν = n − 2 = 10.'),
  mcq('pye-u9-09', 'p9b', 'En esa prueba se rechaza H₀: β = 0. Podés concluir que:', 'Las variables están linealmente asociadas', ['X es la causa de Y', 'R² vale 1', 'Se cometió un error tipo II'], 'La prueba habla de asociación lineal. Si hay error, al rechazar sería tipo I.'),
];

export const U9_MAP: ConceptMap = {
  module, root: 'Regresión y correlación',
  branches: [
    { t: 'La recta ŷ = a + bx', d: 'b: cambio medio de Y por unidad de X · a: Y media con X = 0', topic: 'p9' },
    { t: 'Usarla', d: 'estimar en el rango · residuo y − ŷ · no extrapolar', topic: 'p9x' },
    { t: 'Evaluarla', d: 'r: fuerza y sentido · R²: % explicado', topic: 'p9r' },
    { t: '¿Vale para la población?', d: 'H₀: β = 0 · t = b/Sb con n − 2 gl', topic: 'p9b' },
  ],
  links: ['La prueba sobre β usa la **misma regla p-v < α** de la Unidad 6.', 'Asociación **no es causalidad**, igual que en chi cuadrado.'],
  oral: [
    { q: 'ŷ = 161,67 + 5,23x (salario en miles, especialización 0 a 10): interpretá los coeficientes.', a: 'Por cada punto adicional de especialización el salario medio aumenta $5.230. Con especialización 0 el salario medio estimado es $161.670; tiene sentido porque el 0 está en la escala, y es confiable si la muestra incluyó valores cercanos.' },
    { q: 'Con r² = 0,36, interpretá el coeficiente de correlación.', a: 'r = 0,6, positivo como la pendiente: asociación lineal directa y moderada entre especialización y salario. Como no supera 0,7, el modelo no es bueno para pronosticar.' },
    { q: 'Interpretá el coeficiente de determinación.', a: 'El 36 % de las variaciones del salario se explica por las variaciones del nivel de especialización. El 64 % restante queda sin explicar por el modelo.' },
  ],
};
