/**
 * PyE · Unidad 8 (datos categóricos), tema por tema.
 * Fuentes revisadas (privadas): presentación de datos categóricos 2026, modelos de 2º parcial y de evaluación oral.
 * Redacción y datos propios (Mate Cloud). Cuentas verificadas con SciPy.
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { plot, head, txt } from './h';
import { asker, flow, grow, list, sc, VIDEO_NOTE } from './kit';

const module = 'u8';
const ORAL = 'modelo de evaluación oral de la cátedra';

export const U8_THEORY: TheoryBlock[] = [
  {
    id: 'p8', module, title: 'Chi cuadrado: la idea y sus tres pruebas', videoNote: VIDEO_NOTE,
    lead: [
      'Cuando los datos son **conteos por categoría** no hay promedio que comparar. Se compara lo que **observaste** con lo que **esperarías si H₀ fuera cierta**. Si están muy lejos, rechazás.',
      'La cuenta es la misma en las tres pruebas. Cambia **la pregunta**, y por eso cambian las hipótesis y los grados de libertad.',
    ],
    scenes: [
      sc([
        head('Siempre cola derecha'),
        plot(40, 60, 520, 200, [0, 16], [0, 0.2], { ticks: false, fns: [{ f: 'x*exp(-x/2)/4', c: 'blue', area: [9.49, 16] }], vl: [{ x: 9.49, t: 'crítico', c: 'yellow', s: 1 }] }),
        txt(300, 300, 'χ² = Σ (observado − esperado)² / esperado', { fs: 18, b: true, c: 'blue' }),
        txt(300, 345, 'lejos de H₀ → χ² grande', { fs: 18, b: true, c: 'yellow', s: 1 }),
        txt(300, 390, 'p-v = P(χ² > χ²ₘ)', { fs: 18, b: true, c: 'green', s: 2 }),
      ], [
        'El estadístico suma, categoría por categoría, la diferencia al cuadrado entre observado y esperado, dividida por lo esperado. Por eso **nunca es negativo**.',
        'Cuanto más lejos esté lo observado de lo esperado, más grande es el estadístico. Solo los valores grandes hacen rechazar: la prueba es **unilateral derecha**.',
        'El valor p es **siempre la probabilidad a la derecha** del valor muestral. No se multiplica por dos.',
      ]),
      list('¿Cuál de las tres?', [
        ['Bondad de ajuste', '1 variable contra proporciones dadas', '**Bondad de ajuste**: una sola variable y un patrón teórico o histórico. La palabra clave es si cambió la distribución.'],
        ['Independencia', '1 muestra, 2 variables: ¿están asociadas?', '**Independencia**: una sola muestra clasificada por dos variables. La palabra clave es si existe relación.'],
        ['Homogeneidad', '2 o más muestras, 1 variable: ¿se reparte igual?', '**Homogeneidad**: varias poblaciones y una variable. La palabra clave es si difiere según el grupo.'],
      ]),
    ],
    points: [
      '**χ²ₘ = Σ (o − e)²/e**. **CR: p-v < α**, con **p-v = P(χ² > χ²ₘ)**.',
      '**La distribución:** depende solo de ν, toma valores desde 0, es sesgada a la derecha y se acerca a la normal al crecer ν. E = ν, V = 2ν, moda ν − 2 (si ν ≥ 2).',
      '**Frecuencias esperadas de 5 o más**; si no, se agrupan categorías.',
      'Son **pruebas no paramétricas**: no plantean hipótesis sobre μ ni piden población normal.',
      'Con σ², la variable (n−1)s²/σ² también sigue una chi cuadrado con n − 1 gl si la población es normal.',
    ],
    table: { head: ['Prueba', 'H₀', 'gl'], rows: [['Bondad de ajuste', 'sigue la distribución dada', 'c − 1'], ['Independencia', 'las variables son independientes', '(f−1)(c−1)'], ['Homogeneidad', 'la distribución es igual en los grupos', '(f−1)(c−1)']] },
    written: 'Se utiliza la distribución chi cuadrado, prueba de [bondad de ajuste / independencia / homogeneidad], porque se trabaja con frecuencias de una variable categórica y se desea [comparar con proporciones dadas / determinar si está asociada a otra / comparar su distribución entre poblaciones].',
    trap: 'Escribí el **apellido** de la prueba. "Chi cuadrado" solo, o "homogénea" donde iba bondad de ajuste, se marca mal.',
  },
  {
    id: 'p8b', module, title: 'Bondad de ajuste',
    lead: ['Hay **una variable** y te dan porcentajes "de antes", "históricos" o "teóricos". Calculás cuántos casos esperabas con esos porcentajes y los comparás con los que hubo.'],
    scenes: [
      grow('¿Cambió el 50 / 30 / 20? n = 200', ['Plan', 'p histórica', 'Esperado', 'Observado', 'Aporte'], [
        [['Básico', '0,50', '100', '88', '1,44'], 'Esperado es **n por la proporción**: 200 por 0,50 da 100. Hubo 88: el aporte es 12 al cuadrado sobre 100, o sea 1,44.'],
        [['Pro', '0,30', '60', '66', '0,60'], 'En el plan Pro se esperaban 60 y hubo 66: 6 al cuadrado sobre 60 aporta 0,60.'],
        [['Empresa', '0,20', '40', '46', '0,90'], 'En Empresa se esperaban 40 y hubo 46: aporta 0,90.'],
        [['Total', '1', '200', '200', '2,94'], 'El estadístico es la suma: **2,94**, con 3 menos 1, o sea **2 grados de libertad**. El valor p es 0,23: con 5 % no hay evidencia de cambio.'],
      ], [1.3, 1.2, 1.1, 1.2, 1]),
    ],
    points: [
      '**H₀:** la variable sigue la distribución teórica o histórica. **H₁:** no la sigue.',
      '**eᵢ = n · pᵢ**',
      '**gl = categorías − 1**. Si una categoría es "el resto", también cuenta.',
      'Las proporciones esperadas suman 1 y las esperadas suman n.',
    ],
    example: { title: 'navegadores del modelo de parcial', body: ['Histórico: 58 % Chrome, 15 % Firefox, 7 % Edge y el resto otros. Son **4 categorías**, gl = 3. Mínimo nivel de significación 0,009 < 0,05: hay evidencia de que la distribución de uso **cambió**.'] },
    written: 'Prueba chi cuadrado de bondad de ajuste. H₀: la distribución de [variable] sigue las proporciones históricas. H₁: la distribución de [variable] no sigue las proporciones históricas. ν = categorías − 1 = … p-v = P(χ² > χ²ₘ) = … Con un …% de significación [hay / no hay] evidencia de que la distribución de [variable] se modificó.',
    trap: 'No te olvides de "el resto" al contar categorías.',
  },
  {
    id: 'p8i', module, title: 'Independencia',
    lead: ['**Una muestra**, a cada individuo le preguntás **dos cosas** y querés saber si tienen relación. En las hipótesis van las dos variables con su nombre completo: en tu parcial ese punto quedó en 2/10.'],
    scenes: [
      grow('Experiencia y voto: observado (esperado)', ['Experiencia', 'A favor', 'En contra', 'Total'], [
        [['Junior', '30 (20)', '30 (40)', '60'], 'Cada esperado es **total de fila por total de columna, sobre n**. Para junior a favor: 60 por 50 sobre 150 da 20. Se observaron 30.'],
        [['Senior', '20 (30)', '70 (60)', '90'], 'Igual para senior: 90 por 50 sobre 150 da 30, y se observaron 20. En cada celda la distancia es 10.'],
        [['Total', '50', '100', '150'], 'Los totales no cambian. Los grados de libertad son filas menos uno por columnas menos uno: **1 por 1 igual 1**. Los totales no cuentan.'],
      ]),
      flow('Cerrar el ejercicio', [
        ['H₀', 'el voto es independiente de la experiencia', 'La nula es siempre la **independencia**, con las dos variables nombradas.'],
        ['H₁', 'el voto está asociado a la experiencia', 'La alternativa es que **están asociadas**. No dice cuánto ni cuál causa cuál.'],
        ['Estadístico', '5 + 2,5 + 3,33 + 1,67 = 12,5', 'Los cuatro aportes suman 12,5. En el examen casi siempre te lo dan.'],
        ['Conclusión', 'p-v = 0,0004 < 0,05: hay asociación', 'El valor p es 0,0004. Se rechaza H₀: hay evidencia de que el voto está asociado a la experiencia.'],
      ]),
    ],
    points: [
      '**H₀:** [variable 1] es independiente de [variable 2]. **H₁:** están asociadas (no son independientes).',
      '**eᵢⱼ = total fila i · total columna j / n** (sale de P(A∩B) = P(A)·P(B)).',
      '**gl = (filas − 1)·(columnas − 1)**, sin contar totales.',
      'Dice **si hay** relación. No dice el grado, el tipo ni la causa.',
    ],
    example: { title: 'salón y tipo de evento (modelo de oral)', body: ['4 eventos y 3 salones. H₀: el salón contratado es independiente del tipo de evento. H₁: el salón contratado está asociado al tipo de evento. gl = (4−1)(3−1) = 6. Si rechazás: hay evidencia de que **el salón contratado está relacionado con el tipo de evento**.'] },
    written: 'Prueba chi cuadrado de independencia. H₀: [variable 1 completa] es independiente de [variable 2 completa]. H₁: [variable 1 completa] está asociada a [variable 2 completa]. ν = (f − 1)(c − 1) = … p-v = P(χ² > χ²ₘ) = … Como p-v [< / ≥] α, con un …% de significación [hay / no hay] evidencia de que [variable 1] está relacionada con [variable 2].',
    trap: '"Hay relación entre frecuencia e interacción" no alcanzó. Era "**la frecuencia con que los usuarios publican** está asociada al **tipo de interacción con publicaciones ajenas**". Y siempre concluí.',
  },
  {
    id: 'p8h', module, title: 'Homogeneidad',
    lead: ['La tabla se ve igual que la de independencia. La diferencia está en **cómo se armó**: acá sacaste una muestra **de cada población** y mirás si una misma variable se reparte igual en todas.'],
    scenes: [flow('¿Los defectos difieren según la línea?', [
      ['Diseño', 'una muestra de cada línea de producción', 'Se toman cajas de **cada línea por separado** y se observa una sola variable: el tipo de defecto.'],
      ['H₀', 'el tipo de defecto se distribuye igual', 'La nula dice que hay **homogeneidad**: las proporciones de cada defecto son iguales en todas las líneas.'],
      ['H₁', 'difiere en alguna línea', 'La alternativa dice que **al menos una igualdad no se cumple**.'],
      ['gl', '(3 − 1)(3 − 1) = 4', 'Tres líneas por tres defectos: 4 grados de libertad, con la misma cuenta que independencia.'],
      ['Conclusión', 'p-v = 0,932: no se rechaza', 'Con un valor p de 0,932 no se rechaza: no hay evidencia de que el tipo de defecto difiera según la línea.'],
    ])],
    points: [
      '**H₀:** la distribución de la variable es la misma en las k poblaciones. **H₁:** difiere en alguna.',
      'Esperadas, estadístico y gl: **igual que en independencia**.',
      'No afirma cuánto valen las proporciones: solo si son iguales entre grupos.',
    ],
    table: { head: ['', 'Independencia', 'Homogeneidad'], rows: [['Muestras', 'una', 'una por población'], ['Variables', 'dos', 'una, en varios grupos'], ['Pregunta', '¿están relacionadas?', '¿se distribuye igual?'], ['Palabra típica', 'relación, depende', 'difiere según, similares']] },
    example: { title: 'envases de perfume', body: ['"¿Las preferencias de envase son similares según la edad?" con 3 diseños y 4 grupos de edad: **homogeneidad**, χ² con (3−1)(4−1) = **6 gl**. H₀: la preferencia de envase no difiere según la edad.'] },
    written: 'Prueba chi cuadrado de homogeneidad. H₀: la distribución de [variable] no difiere según [grupos]. H₁: difiere en al menos uno de los [grupos]. ν = (f − 1)(c − 1) = …',
    trap: 'En la respuesta de ese modelo H₀ aparece como "no hay preferencias": entendelo como "no hay **diferencias** de preferencia según la edad".',
  },
];

const { mcq, tf } = asker(module);

export const U8_QUESTIONS: Question[] = [
  mcq('pye-u8-01', 'p8', 'En cualquier prueba chi cuadrado, el valor p es:', 'P(χ² > χ²ₘ)', ['P(χ² < χ²ₘ)', '2 · P(χ² > χ²ₘ)', 'P(z > χ²ₘ)'], 'Solo los valores grandes contradicen H₀: cola derecha, sin duplicar.'),
  mcq('pye-u8-02', 'p8', '¿Cambió la distribución de calificaciones de una app respecto del patrón histórico?', 'Bondad de ajuste', ['Homogeneidad', 'Independencia', 'Diferencia de proporciones'], 'Una variable contra proporciones dadas es bondad de ajuste.'),
  mcq('pye-u8-03', 'p8b', 'Histórico: 58 % Chrome, 15 % Firefox, 7 % Edge y el resto otros. Los grados de libertad son:', '3', ['2', '4', '199'], 'Son 4 categorías contando "otros": 4 − 1 = 3.'),
  mcq('pye-u8-04', 'p8b', 'n = 300 y la proporción histórica de soporte técnico es 0,28. La frecuencia esperada es:', '84', ['28', '216', '75'], 'e = n · p = 300 · 0,28 = 84.'),
  mcq('pye-u8-05', 'p8i', 'Total de fila 95, total de columna 100, n = 250. La frecuencia esperada es:', '38', ['95', '32', '47,5'], 'e = 95 · 100 / 250 = 38.'),
  mcq('pye-u8-06', 'p8i', 'Evento (4 tipos) y salón (3 opciones). Se rechaza H₀. Se concluye que:', 'El salón contratado está asociado al tipo de evento', ['El tipo de evento causa la elección del salón', 'El salón es independiente del evento', 'Todos los salones tienen igual demanda'], 'Se rechaza la independencia: hay asociación, sin afirmar causalidad.', ORAL),
  tf('pye-u8-07', 'p8i', 'Con 4 niveles de formación y 3 de rendimiento, una prueba de independencia tiene 6 gl y es bilateral.', false, 'Los gl están bien, (4−1)(3−1) = 6, pero chi cuadrado es unilateral derecha.'),
  mcq('pye-u8-08', 'p8h', 'Se toma una muestra de cada una de tres sucursales y se compara el medio de pago usado. Es:', 'Homogeneidad', ['Bondad de ajuste', 't independientes', 'Regresión'], 'Varias poblaciones y una variable categórica.'),
  mcq('pye-u8-09', 'p8h', 'H₀ en una prueba de homogeneidad dice que:', 'La variable se distribuye igual en todas las poblaciones', ['Las varianzas son iguales', 'La variable es normal', 'Las medias son iguales'], 'No confundir con homogeneidad de varianzas (Levene), que es otra prueba.'),
];

export const U8_MAP: ConceptMap = {
  module, root: 'Datos categóricos',
  branches: [
    { t: 'Chi cuadrado', d: 'observado contra esperado; siempre cola derecha', topic: 'p8' },
    { t: 'Bondad de ajuste', d: 'una variable contra un patrón · gl = c − 1', topic: 'p8b' },
    { t: 'Independencia', d: 'una muestra, dos variables · gl = (f−1)(c−1)', topic: 'p8i' },
    { t: 'Homogeneidad', d: 'varias muestras, una variable · gl = (f−1)(c−1)', topic: 'p8h' },
  ],
  links: ['Con solo dos grupos y éxito/fracaso, la cátedra usa la **Z de proporciones** (Unidad 7).', 'La fórmula de esperadas sale de **P(A∩B) = P(A)·P(B)** (Unidad 2).'],
  oral: [
    { q: 'Salón y tipo de evento: ¿cuáles son las hipótesis?', a: 'H₀: el salón contratado es independiente del tipo de evento. H₁: el salón contratado está asociado al tipo de evento.' },
    { q: 'En ese caso, ¿qué concluís si rechazás H₀?', a: 'Que hay evidencia suficiente, con el nivel de significación fijado, de que el salón contratado está relacionado con el tipo de evento. No puedo afirmar causalidad ni cuánto influye.' },
    { q: '¿Qué distribución y qué condición de rechazo usás?', a: 'Chi cuadrado con (filas − 1)(columnas − 1) grados de libertad, 6 en ese caso. Es unilateral derecha: p-v = P(χ² > χ²ₘ) y se rechaza si p-v < α.' },
  ],
};
