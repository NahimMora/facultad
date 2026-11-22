/**
 * PyE · Unidad 7 (comparación de dos poblaciones), tema por tema.
 * Fuentes revisadas (privadas): presentación de pruebas para dos poblaciones 2026-2, actividad de selección de
 * pruebas, repaso y modelos de 2º parcial, modelo de evaluación oral.
 * Redacción y datos propios (Mate Cloud). Cuentas verificadas con SciPy.
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { arr, box, head, txt } from './h';
import { asker, bell, flow, grow, sc, VIDEO_NOTE } from './kit';

const module = 'u7';
const ORAL = 'modelo de evaluación oral de la cátedra';
const ACT = 'actividad de selección de pruebas de la cátedra';

export const U7_THEORY: TheoryBlock[] = [
  {
    id: 'p7', module, title: 'Qué prueba va en cada caso', videoNote: VIDEO_NOTE,
    lead: [
      'En el recu perdiste 23 de 28 puntos en **nombrar la prueba**. Se resuelve con tres preguntas, siempre en este orden: **¿qué mido? ¿cuántos grupos? ¿son los mismos individuos?**',
      'Recién cuando tenés el nombre exacto escribís las hipótesis.',
    ],
    scenes: [sc([
      head('¿Qué mido?'),
      box(15, 52, 275, 62, 'Un promedio (número)', { c: 'blue', fs: 18, id: 'm' }),
      box(310, 52, 275, 62, 'Un porcentaje (sí / no)', { c: 'orange', fs: 18, id: 'q' }),
      box(15, 145, 275, 62, 't de una media', { c: 'blue', fs: 17, sub: 'un grupo contra un valor fijo', s: 1, id: 'm1' }),
      box(310, 145, 275, 62, 'Z de una proporción', { c: 'orange', fs: 17, sub: 'un grupo contra un valor fijo', s: 1, id: 'q1' }),
      box(15, 227, 275, 72, 't muestras independientes', { c: 'green', fs: 17, sub: 'dos grupos distintos · antes Levene', s: 2 }),
      box(310, 227, 275, 72, 'Z diferencia de proporciones', { c: 'green', fs: 17, sub: 'dos grupos distintos', s: 2 }),
      box(15, 319, 275, 72, 't muestras apareadas', { c: 'purple', fs: 17, sub: 'los mismos, medidos dos veces', s: 3 }),
      txt(447, 355, 'Los mismos dos veces: sin Levene', { fs: 16, c: 'purple', b: true, w: 260, s: 3 }),
      arr('m', 'm1', { s: 1 }), arr('q', 'q1', { s: 1 }),
    ], [
      'Primera pregunta: **qué mido**. Un número que se promedia lleva a medias. Un sí o no que se cuenta lleva a proporciones.',
      'Segunda: **cuántos grupos**. Si hay uno solo contra un valor fijo, estás en la Unidad 6: t para la media o Z para la proporción.',
      'Con **dos grupos de individuos distintos**: t para muestras independientes, con Levene antes, o Z para la diferencia de proporciones.',
      'Tercera: si son **los mismos individuos medidos dos veces**, es t para muestras apareadas. Se trabaja con una sola columna de diferencias y no va Levene.',
    ])],
    points: [
      '**Dos medias, grupos distintos:** t para muestras independientes (Student o Welch según Levene).',
      '**Dos medias, mismos individuos:** t para muestras apareadas.',
      '**Dos proporciones, grupos distintos:** Z para la diferencia de proporciones.',
      '**Categorías con más de dos niveles, o contra un patrón histórico:** chi cuadrado (Unidad 8).',
      '**¿Una variable numérica predice otra?** Regresión (Unidad 9).',
    ],
    table: { head: ['Frase del enunciado', 'Prueba'], rows: [['tiempo medio del equipo A y del B', 't independientes'], ['cada analista con las dos herramientas', 't apareadas'], ['antes y después, mismas plantas', 't apareadas'], ['porcentaje contenido a tiempo, A y B', 'Z diferencia de proporciones'], ['tiempo medio inferior a 20 min', 't de una media'], ['al menos 90 % atendidas', 'Z de una proporción']] },
    example: { title: 'los tres que fallaste en el recu', body: ['50 de Informática y 50 de otras áreas, **porcentaje** capacitado: **diferencia de proporciones**. 10 servidores medidos con **las dos** configuraciones: **apareadas**. Calificaciones **contra el patrón histórico**: **bondad de ajuste**.'] },
    written: 'Se aplica la prueba [nombre completo] porque se estudia la variable [nombre], de tipo [cuantitativa / categórica], en [una muestra / dos muestras de unidades distintas / las mismas unidades medidas dos veces].',
    trap: 'Que dos muestras tengan el **mismo tamaño** no las hace apareadas, y que los datos sean **normales** no las hace independientes. Lo decide el diseño.',
  },
  {
    id: 'p7i', module, title: 'Dos medias: muestras independientes',
    lead: ['Dos grupos **de individuos distintos** y un promedio en cada uno. La justificación que pide la cátedra tiene tres palabras que no pueden faltar: **variable dependiente, factor y niveles**.'],
    scenes: [
      flow('Justificar antes de calcular', [
        ['Dependiente', 'tiempo de respuesta (ms): lo que mido', 'La **variable dependiente** es lo que se mide en cada unidad. Tiene que ser cuantitativa: el tiempo de respuesta en milisegundos.'],
        ['Factor', 'tipo de caché: lo que separa los grupos', 'La **independiente o factor** es lo que separa los grupos: el tipo de caché. De ella depende el tiempo.'],
        ['Niveles', 'caché nueva y caché tradicional', 'Los **niveles** son los valores del factor. Son dos: caché nueva y caché tradicional.'],
        ['Diseño', 'servidores distintos en cada nivel', 'Como cada servidor está en un solo nivel, las muestras son **independientes**.'],
        ['Supuestos', 'normalidad + Levene', 'Faltan los supuestos: normalidad, dada o verificada, y homogeneidad de varianzas con Levene.'],
      ]),
      bell('H₁: μ nueva < μ tradicional', { df: 28, area: [-4, -2.1], marks: [{ x: -2.1, t: 'tₘ = −2,10' }], lines: [
        ['H₀: μN ≥ μT  ·  H₁: μN < μT', 'Se quiere probar que la caché nueva tiene **menor** tiempo medio: cola izquierda para nueva menos tradicional.'],
        ['tₘ = −2,10  ·  gl = 28', 'Hay 15 servidores por grupo. Levene no rechazó, se usó Student y Jamovi da t igual a menos 2,10 con 28 grados de libertad.'],
        ['p-v = P(t < −2,10) = 0,022', 'El valor p es la cola izquierda: 0,022.'],
        ['0,022 < 0,05 → rechazo H₀', 'Se rechaza H₀: con 5 % de significación hay evidencia de que la caché nueva reduce el tiempo medio de respuesta.'],
      ] }),
    ],
    points: [
      '**VD:** cuantitativa, lo que se observa. **Factor:** variable que arma los grupos. **Niveles:** sus dos categorías.',
      '**H₀: μ₁ = μ₂** (o ≥, ≤) y **H₁: μ₁ >, < o ≠ μ₂**.',
      '**Orden:** normalidad, si no está dada → Levene → Student o Welch → conclusión.',
      '**En Jamovi** el grupo 1 es el primero que se cargó: el signo de la hipótesis sigue ese orden.',
      '**gl:** con Student, n₁ + n₂ − 2. Con Welch los informa Jamovi y suelen ser decimales.',
    ],
    example: { title: 'turnos mañana y tarde (modelo de oral)', body: ['VD: puntaje en la evaluación. Factor: turno. Niveles: mañana y tarde. Operarios distintos → independientes. Pregunta por "diferencias" → **H₁: μM ≠ μT**. Y sí, va la prueba de homogeneidad de varianzas antes.'] },
    written: 'Se aplica prueba t para la diferencia de medias con muestras independientes, ya que se estudia la variable dependiente cuantitativa [VD] en función de la variable independiente o factor [factor], medida en dos niveles: [nivel 1] y [nivel 2], en unidades distintas. Previamente se verifica la homogeneidad de las varianzas con la prueba de Levene.',
    trap: 'La consigna de tu parcial avisaba: **sin VD, factor y niveles, el ítem vale 0**. Copiá la oración del modelo y completala.',
  },
  {
    id: 'p7l', module, title: 'Los supuestos: normalidad y Levene',
    lead: [
      'Antes de la prueba principal hay pruebas "de permiso". Tienen una particularidad: **acá te conviene no rechazar**, porque H₀ dice que el supuesto se cumple.',
      'La regla no cambia: p-v < α, rechazo.',
    ],
    scenes: [sc([
      head('El camino de dos medias independientes'),
      box(120, 50, 360, 60, 'Normalidad', { c: 'cyan', fs: 18, sub: 'H₀: la variable es normal', id: 'n' }),
      box(120, 140, 360, 70, 'Levene', { c: 'orange', fs: 18, sub: 'H₀: σ²₁ = σ²₂   ·   H₁: σ²₁ ≠ σ²₂', id: 'l', s: 1 }),
      box(15, 265, 270, 80, 't de Student', { c: 'green', fs: 19, sub: 'p-v ≥ α: varianzas iguales', id: 's', s: 2 }),
      box(315, 265, 270, 80, 't de Welch', { c: 'purple', fs: 19, sub: 'p-v < α: varianzas distintas', id: 'w', s: 3 }),
      arr('n', 'l', { s: 1 }), arr('l', 's', { s: 2 }), arr('l', 'w', { s: 3 }),
      txt(300, 395, 'Después, recién, la hipótesis sobre las medias', { fs: 17, b: true, c: 'yellow', s: 4 }),
    ], [
      '**Normalidad**: H₀ dice que la variable tiene distribución normal. Si el enunciado lo da por supuesto no se prueba; si no lo dice, se plantea.',
      '**Levene** prueba la homogeneidad de las varianzas. Es siempre bilateral: iguales contra distintas.',
      'Si Levene **no rechaza**, se suponen varianzas iguales y se usa **t de Student**.',
      'Si Levene **rechaza**, se suponen varianzas distintas y se usa **t de Welch**. No se abandona la comparación: cambia la fila de Jamovi.',
      'Recién ahí mirás el valor p de la prueba de medias. Son decisiones distintas, cada una con su conclusión.',
    ])],
    points: [
      '**Normalidad (Shapiro-Wilk):** H₀: la variable sigue una distribución normal; H₁: no la sigue.',
      '**Levene:** H₀: σ₁² = σ₂²; H₁: σ₁² ≠ σ₂².',
      '**No rechazo Levene → Student. Rechazo Levene → Welch.**',
      'En muestras apareadas la normalidad se mira sobre las **diferencias** y no va Levene.',
    ],
    table: { head: ['Levene', 'Significa', 'Fila de Jamovi'], rows: [['p-v = 0,344 con α = 0,05', 'no rechazo: iguales', 't de Student'], ['p-v = 0,018 con α = 0,05', 'rechazo: distintas', 't de Welch']] },
    example: { title: 'dos modelos de discos', body: ['Levene da p-v = 0,018 y α = 0,07: se rechaza y se usa **Welch**. La fila de Welch da p-v = 0,044 < 0,07, así que hay evidencia de que el modelo S dura más. Si leías la fila de Student (0,035) usabas una prueba que no correspondía.'] },
    written: 'Prueba de Levene: H₀: σ₁² = σ₂²; H₁: σ₁² ≠ σ₂². p-v = … [< / ≥] α, por lo tanto [se rechaza / no se rechaza] H₀: se suponen varianzas [distintas / iguales] y se utiliza t de [Welch / Student].',
    trap: 'La respuesta de uno de los modelos escribe H₀ de Levene con ≠: es una **errata**. La nula de Levene lleva **=**.',
  },
  {
    id: 'p7a', module, title: 'Dos medias: muestras apareadas',
    lead: ['Los **mismos** individuos medidos dos veces (antes y después, con A y con B). El truco es que deja de ser un problema de dos grupos: restás fila por fila y te queda **una sola muestra de diferencias D**, con una t de una media.'],
    scenes: [
      grow('D = antes − después (minutos)', ['Operario', 'Antes', 'Después', 'D'], [
        [['1', '30', '25', '5'], 'Cada fila es **el mismo operario** medido dos veces. Definí por escrito el orden de la resta: antes menos después. El primero da 5.'],
        [['2', '28', '27', '1'], 'El segundo bajó un minuto. La diferencia es 1.'],
        [['3', '33', '29', '4'], 'El tercero da 4. Si la capacitación sirvió, con este orden las diferencias son **positivas**.'],
        [['…', '…', '…', 'H₁: μD > 0'], 'Por eso la alternativa es **μD mayor que cero**. Si hubieras restado al revés, sería menor que cero.'],
      ]),
      bell('n = 10 diferencias', { df: 9, area: [2.37, 4], marks: [{ x: 2.37, t: 'tₘ = 2,37' }], lines: [
        ['H₀: μD ≤ 0  ·  H₁: μD > 0', 'Con 10 operarios, las diferencias tienen promedio 3 y desvío 4. Se prueba que la media de las diferencias es positiva.'],
        ['tₘ = 3/(4/√10) = 2,37  ·  gl = 9', 'Es una t de una media contra cero: 3 sobre 4 dividido raíz de 10. Los grados de libertad son **pares menos uno**.'],
        ['p-v = P(t₉ > 2,37) = 0,021', 'El valor p es la cola derecha con 9 grados de libertad: 0,021.'],
        ['0,021 < 0,05 → fue efectiva', 'Se rechaza H₀: hay evidencia de que la capacitación redujo el tiempo medio. El error posible es tipo I.'],
      ] }),
    ],
    points: [
      '**Cuándo:** variable cuantitativa medida dos veces sobre las mismas unidades (pre-post, dos jueces, dos herramientas).',
      '**D:** primera medición − segunda. Escribí el orden.',
      '**H₀: μD = 0** (o ≤, ≥) · **H₁: μD >, < o ≠ 0**.',
      '**tₘ = D̄/(s_D/√n)** con ν = n − 1, donde n es la cantidad de pares.',
      '**Supuesto:** normalidad de las diferencias. No va Levene.',
    ],
    table: { head: ['Quiero probar que…', 'D = antes − después'], rows: [['bajó', 'μD > 0'], ['subió', 'μD < 0'], ['cambió', 'μD ≠ 0']] },
    example: { title: 'un algoritmo que sube la satisfacción', body: ['Los mismos 9 usuarios califican antes y después. D = antes − después, H₁: μD < 0. tₘ = −2,29 y p-v = 0,026 < 0,04: se rechaza, **el algoritmo sí aumentó la satisfacción**. (La diapositiva de clase dice "no cumplió" después de rechazar: es una errata.)'] },
    written: 'Se aplica prueba t para la diferencia de medias con muestras apareadas, porque se observa una sola muestra de [unidades] y se mide la variable cuantitativa [variable] en dos condiciones: [1] y [2]. D = [1] − [2]. H₀: μD = 0; H₁: μD [> / < / ≠] 0. Supuesto: las diferencias siguen una distribución normal.',
    trap: 'El signo de H₁ depende de **cómo definiste D**. Sin esa definición escrita la hipótesis no se entiende.',
  },
  {
    id: 'p7p', module, title: 'Diferencia de proporciones',
    lead: ['Dos grupos distintos y en cada uno un **porcentaje de éxitos**. Con muestras grandes se usa **Z**. Como H₀ dice que las proporciones son iguales, para el error estándar se juntan los dos grupos.'],
    scenes: [flow('¿El plan A retiene más que el B?', [
      ['Datos', 'A: 120/200 = 0,60 · B: 100/200 = 0,50', 'Dos grupos distintos de 200 usuarios. Siguen activos 120 del plan A y 100 del B: 60 % contra 50 %.'],
      ['Hipótesis', 'H₀: pA − pB = 0 · H₁: pA − pB > 0', 'Se quiere probar que A retiene **más**: la diferencia de proporciones poblacionales es mayor que cero.'],
      ['Estadístico', 'zₘ = 2,01 (lo da Jamovi)', 'El estadístico es **Z**, que en Jamovi se tilda dentro de tablas de contingencia. Da 2,01.'],
      ['Valor p', 'P(z > 2,01) = 0,022', 'El valor p es la cola derecha de la normal: 0,022.'],
      ['Conclusión', '0,022 < 0,05: A retiene más', 'Se rechaza H₀: con 5 % de significación la proporción de usuarios retenidos es mayor con el plan A.'],
    ])],
    points: [
      '**H₀: p₁ − p₂ = 0** · **H₁: p₁ − p₂ >, < o ≠ 0**.',
      '**zₘ = (p̂₁ − p̂₂)/√(p̄(1−p̄)(1/n₁ + 1/n₂))**, con p̄ = (x₁ + x₂)/(n₁ + n₂). No está en la hoja de fórmulas: suelen darte zₘ o la salida.',
      '**Supuesto:** muestras independientes y grandes.',
      '**En Jamovi:** tablas de contingencia, prueba z para 2 proporciones, destildando χ² y comparando por filas.',
    ],
    example: { title: 'egresados con posgrado', body: ['Ingeniería 54 de 120 (45 %) y Económicas 108 de 200 (54 %). Pregunta si **difieren**: bilateral. Te dan P(z > 1,559) = 0,0595, entonces **p-v = 2 · 0,0595 = 0,119** > 0,08: no hay evidencia de diferencia.'] },
    written: 'Se aplica prueba Z para la diferencia de proporciones porque se compara el porcentaje de [éxito] entre dos muestras independientes: [grupo 1] y [grupo 2]. H₀: p₁ − p₂ = 0; H₁: p₁ − p₂ [> / < / ≠] 0. p-v = … Con un …% de significación [hay / no hay] evidencia de que la proporción de [éxito] en [grupo 1] es [mayor / menor / distinta].',
    trap: 'Dice **porcentaje** y hay **dos grupos**: es diferencia de proporciones. No es "chi cuadrado independiente", que fue lo que pusiste en el recu.',
  },
];

const { mcq, tf } = asker(module);

export const U7_QUESTIONS: Question[] = [
  mcq('pye-u7-01', 'p7', 'Cada analista usa las herramientas H1 y H2 y se mide su tiempo con cada una. Corresponde:', 't para muestras apareadas', ['t para muestras independientes', 'Z de diferencia de proporciones', 'Chi cuadrado de independencia'], 'Son los mismos analistas medidos dos veces sobre una variable cuantitativa.', ACT),
  mcq('pye-u7-02', 'p7', '¿El porcentaje de incidentes contenidos a tiempo es mayor en el equipo de Ana que en el de Bruno?', 'Z de diferencia de proporciones', ['t para muestras independientes', 't para muestras apareadas', 'Z de una proporción'], 'Es un porcentaje comparado entre dos grupos distintos.', ACT),
  mcq('pye-u7-03', 'p7', '¿En cuál de estas situaciones hay que hacer Levene?', 'Comparar el tiempo medio de dos equipos distintos', ['Comparar antes y después en los mismos analistas', 'Comparar porcentajes de dos equipos', 'Probar si una media es menor que 20'], 'Levene solo va con dos medias de muestras independientes.', ACT),
  mcq('pye-u7-04', 'p7i', 'Error de medición con calibración tradicional o automática. El factor es:', 'El método de calibración', ['El error de medición', 'La cantidad de sensores', 'La distribución normal'], 'El factor separa los grupos. El error es la variable dependiente; tradicional y automática son los niveles.'),
  mcq('pye-u7-05', 'p7i', '¿Hay diferencias entre los puntajes medios de los turnos mañana y tarde? H₁ es:', 'μM ≠ μT', ['μM > μT', 'x̄M ≠ x̄T', 'μD > 0'], '"Diferencias" sin dirección es bilateral, sobre parámetros.', ORAL),
  tf('pye-u7-06', 'p7i', 'Si los datos tienen distribución normal, las muestras son independientes.', false, 'La normalidad es un supuesto. La independencia sale del diseño: unidades distintas en cada grupo.'),
  mcq('pye-u7-07', 'p7l', 'En la prueba de homogeneidad de varianzas p-v < α. ¿Qué se concluye?', 'Varianzas distintas: se usa Welch', ['Varianzas iguales: se usa Student', 'Las medias son distintas', 'Los datos no son normales'], 'Se rechaza la igualdad de varianzas. Sobre las medias todavía no se dijo nada.', ORAL),
  mcq('pye-u7-08', 'p7l', 'Shapiro-Wilk da p-v = 0,49 y α = 0,05. Entonces:', 'Se sostiene el supuesto de normalidad', ['La variable no es normal', 'Hay que usar Welch', 'Las varianzas son iguales'], 'No se rechaza H₀, y en esta prueba H₀ dice que la distribución es normal.'),
  mcq('pye-u7-09', 'p7a', 'D = días de ausencia antes − después de un plan. El plan sirve si bajaron las ausencias. H₁:', 'μD > 0', ['μD < 0', 'μD ≠ 0', 'μD = 0'], 'Si bajaron, antes es mayor que después y la diferencia queda positiva.'),
  mcq('pye-u7-10', 'p7a', 'Se miden 8 plantas antes y después. Los grados de libertad son:', '7', ['14', '8', '15'], 'n es la cantidad de pares: 8 − 1 = 7.'),
  mcq('pye-u7-11', 'p7p', 'Prueba bilateral de proporciones: te dan P(z > 1,559) = 0,0595. El valor p es:', '0,119', ['0,0595', '0,9405', '1,559'], 'Bilateral: se duplica la cola, 2 · 0,0595 = 0,119.'),
  mcq('pye-u7-12', 'p7p', 'H₁: pA − pB > 0, p-v = 0,032 y α = 0,025. Se concluye que:', 'No hay evidencia suficiente de que pA sea mayor', ['pA es mayor que pB', 'pA y pB son iguales con certeza', 'pB es mayor que pA'], '0,032 no es menor que 0,025, no se rechaza. Eso no prueba que sean iguales.'),
];

export const U7_MAP: ConceptMap = {
  module, root: 'Comparar dos poblaciones',
  branches: [
    { t: 'Elegir la prueba', d: '¿qué mido? ¿cuántos grupos? ¿los mismos?', topic: 'p7' },
    { t: 'Dos promedios', kids: [
      { rel: 'individuos distintos', t: 't independientes', d: 'nombrar VD, factor y niveles', topic: 'p7i', kids: [
        { rel: 'antes se verifica', t: 'Normalidad y Levene', d: 'no rechazo → Student · rechazo → Welch', topic: 'p7l' },
      ] },
      { rel: 'mismos individuos', t: 't apareadas', d: 'D = primera − segunda; H₁ sobre μD', topic: 'p7a' },
    ] },
    { t: 'Dos porcentajes', d: 'Z de diferencia de proporciones', topic: 'p7p' },
  ],
  links: ['Apareadas es una **t de una media** (Unidad 6) aplicada a las diferencias.', 'Más de dos categorías lleva a **chi cuadrado** (Unidad 8).'],
  oral: [
    { q: 'Puntajes de turno mañana y tarde: ¿qué prueba y por qué?', a: 'Prueba t para la diferencia de medias con muestras independientes: la variable dependiente es el puntaje, cuantitativa; el factor es el turno, con niveles mañana y tarde, formados por operarios distintos.' },
    { q: 'En ese caso, ¿qué hipótesis planteás?', a: 'H₀: μM = μT, los puntajes medios no difieren. H₁: μM ≠ μT, difieren.' },
    { q: '¿Debe hacerse una prueba de homogeneidad de varianzas?', a: 'Sí, por ser medias de muestras independientes. H₀: σ²M = σ²T. H₁: σ²M ≠ σ²T.' },
    { q: 'Si en homogeneidad p-v < α, ¿qué concluís?', a: 'Se rechaza H₀: hay evidencia de que las varianzas son distintas, y las medias se comparan con t de Welch.' },
    { q: '¿Cómo distinguís apareadas de independientes?', a: 'Por el diseño. En apareadas las mismas unidades se miden dos veces; en independientes cada unidad pertenece a un solo grupo.' },
  ],
};
