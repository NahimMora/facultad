/**
 * PyE · Unidades 1 (descriptiva) y 2 (probabilidad), tema por tema.
 * Fuentes revisadas (privadas): presentaciones de descriptiva, cálculo de probabilidades, total y Bayes, y modelos
 * de 1er parcial con respuestas. Redacción y datos propios (Mate Cloud).
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { box, head, plot, tree, txt } from './h';
import { asker, cards, flow, grow, list, sc, VIDEO_NOTE } from './kit';

export const U1_THEORY: TheoryBlock[] = [
  {
    id: 'p1', module: 'u1', title: 'Población, muestra y tipo de estudio', videoNote: VIDEO_NOTE,
    lead: ['Toda la materia parte de acá: **de quiénes querés hablar** (población), **a quiénes mediste** (muestra) y **qué mediste** (variable). La descriptiva resume lo medido; la inferencial saca conclusiones sobre la población.'],
    scenes: [list('¿Cuánto tardan los servidores?', [
      ['Población', 'todos los servidores de Mate Cloud', 'La **población** es el conjunto completo sobre el que querés concluir: todos los servidores.'],
      ['Muestra', '50 elegidos al azar', 'La **muestra** es el subconjunto que observás. Tiene que ser representativa.'],
      ['Unidad', 'cada servidor', 'La **unidad elemental o de análisis** es cada objeto o sujeto observado.'],
      ['Variable', 'tiempo de respuesta en ms', 'La **variable** es la característica que observás en cada unidad.'],
      ['Estudio', 'solo miro: observacional', 'Si solo observás es **observacional**. Si aplicás un tratamiento y analizás la respuesta es **experimental**.'],
    ])],
    points: [
      '**Descriptiva:** recopila, presenta y resume. **Inferencial:** estima o decide sobre la población con una muestra.',
      '**Censo:** observa a todos. **Muestreo:** a un grupo.',
      '**Muestreo probabilístico:** simple, sistemático, estratificado, por conglomerados; permite medir el error e inferir. **No probabilístico:** accidental, voluntarios, expertos.',
      '**Según el objetivo:** exploratorio, confirmatorio, de correlación, explicativo.',
      '**Según la intervención:** observacional o experimental. **Según el momento:** longitudinal (mismo grupo en el tiempo) o transversal (un momento, distintos grupos).',
      '**Proceso de investigación:** hipótesis → variables → población y muestra → tamaño y método → instrumento y selección → tabular → resumir → informe.',
    ],
    table: { head: ['Pista', 'Tipo de estudio'], rows: [['se registró, se encuestó', 'observacional'], ['se aplicó un tratamiento', 'experimental'], ['seguimiento durante 10 años', 'longitudinal'], ['encuesta de este mes a distintos grupos', 'transversal']] },
    written: 'Variable: [qué se mide] de cada [unidad]. Población: [todos]. Muestra: [los observados]. El estudio es [observacional / experimental] porque [solo se observa / se interviene].',
    trap: 'La variable se nombra completa: "tiempo que tarda el equipo en bloquear un ataque", no "el equipo" ni "los ataques".',
  },
  {
    id: 'p1v', module: 'u1', title: 'Variables y escalas de medición',
    lead: ['El tipo de variable define **todo lo que podés hacer después**: qué gráfico, qué medida y qué prueba. Preguntate: ¿es una palabra o un número? Si es número, ¿lo conté o lo medí?'],
    scenes: [cards('¿Palabra o número?', [
      ['Cualitativa nominal', 'sistema operativo, sector', '**Nominal**: categorías sin orden, como el sistema operativo.'],
      ['Cualitativa ordinal', 'satisfacción: baja, media, alta', '**Ordinal**: categorías con un orden natural, como el nivel de satisfacción.'],
      ['Cuantitativa discreta', 'cantidad de errores: se cuenta', '**Discreta**: se cuenta. Entre dos valores seguidos no hay otros posibles.'],
      ['Cuantitativa continua', 'tiempo, peso: se mide', '**Continua**: se mide y puede tomar cualquier valor dentro de un intervalo.'],
    ])],
    points: [
      '**Cualitativas:** nominal (sin orden) u ordinal (con orden).',
      '**Cuantitativas:** discreta (conteo) o continua (medición).',
      '**Escala de intervalos:** hay distancias pero el cero es arbitrario (temperatura en °C).',
      '**Escala de razón:** el cero significa ausencia (antigüedad, peso, tiempo).',
    ],
    example: { title: 'clasificar completo', body: ['Vida útil de un disco: **cuantitativa continua, escala de razón**. Errores en un código: **cuantitativa discreta, razón**. Máximo nivel educativo: **cualitativa ordinal**.'] },
    written: 'La variable aleatoria [nombre completo] es [cualitativa nominal / ordinal | cuantitativa discreta / continua], en escala [nominal / ordinal / de intervalos / de razón].',
    trap: '"Cantidad de…" es discreta aunque el promedio dé con decimales.',
  },
  {
    id: 'p1t', module: 'u1', title: 'Tablas de frecuencias y gráficos',
    lead: ['Una tabla de frecuencias ordena los datos y responde cuatro preguntas por renglón: **cuántos, qué parte, cuántos hasta acá y qué parte hasta acá**.'],
    scenes: [grow('Notas: 2; 4; 4; 4; 5; 5; 7; 9', ['x', 'FA', 'FAA', 'FR', 'FRA'], [
      [['2', '1', '1', '0,125', '0,125'], 'La **absoluta** cuenta repeticiones. La **relativa** es esa cuenta sobre n, que es 8.'],
      [['4', '3', '4', '0,375', '0,500'], 'Las **acumuladas** suman renglón por renglón: hasta el 4 hay 4 datos, el 50 %.'],
      [['5', '2', '6', '0,250', '0,750'], 'Este renglón se lee: 2 notas fueron 5, el 25 %; y 6 notas, el 75 %, fueron 5 o menos.'],
      [['7', '1', '7', '0,125', '0,875'], 'Se sigue igual con el 7.'],
      [['9', '1', '8', '0,125', '1'], 'La última acumulada absoluta es **n** y la última relativa es **1**. Sirve para controlar.'],
    ])],
    points: [
      '**FR = FA/n**. FAA y FRA acumulan.',
      '**Intervalos de clase:** incluyen el límite inferior y no el superior: 2–4 va de 2 a 3,999…',
      '**Serie simple:** discretas. **Intervalos:** continuas. **Doble entrada:** dos variables.',
      '**Una tabla lleva:** título (qué, cómo, dónde, cuándo), encabezado, columna matriz, cuerpo, notas y fuente.',
    ],
    table: { head: ['Gráfico', 'Para'], rows: [['Barras', 'cualitativas o discretas'], ['Bastones', 'discretas'], ['Histograma', 'continuas en intervalos'], ['Circular', 'partes de un total, pocas categorías'], ['Pictograma', 'sobre todo cualitativas']] },
    example: { title: 'interpretar FR', body: ['FR = 0,12 en el intervalo 20–24 minutos: **el 12 % de las simulaciones se detectaron entre 20 y menos de 24 minutos**.'] },
    trap: 'Un dato que vale justo 4 va en el intervalo 4–6, no en el 2–4.',
  },
  {
    id: 'p1c', module: 'u1', title: 'Media, mediana, moda y percentiles',
    lead: ['Son medidas de **posición**: dicen dónde están los datos. Lo que te preguntan es leerlas en una frase, sobre todo los percentiles.'],
    scenes: [sc([
      head('Datos ordenados'),
      ...[2, 4, 4, 4, 5, 5, 7, 9].map((v, i) => box(20 + i * 71, 65, 62, 62, String(v), { c: 'gray', fs: 22, hl: i >= 1 && i <= 3 ? [2] : undefined })),
      txt(300, 180, 'Media = 40/8 = 5', { fs: 19, b: true, c: 'blue', s: 0 }),
      txt(300, 235, 'Mediana = (4 + 5)/2 = 4,5', { fs: 19, b: true, c: 'green', s: 1 }),
      txt(300, 290, 'Moda = 4', { fs: 19, b: true, c: 'orange', s: 2 }),
      txt(300, 350, 'P(k): el k % está por debajo', { fs: 19, b: true, c: 'purple', s: 3 }),
    ], [
      'La **media** suma todo y divide por n: 40 sobre 8 da 5. Se deja arrastrar por los valores extremos.',
      'La **mediana** es el valor central de los datos ordenados. Como son 8, promediás los dos del medio: 4,5.',
      'La **moda** es el que más se repite: 4. Puede haber más de una.',
      'El **percentil k** deja por debajo al k por ciento. El percentil 50 es la mediana.',
    ])],
    points: [
      '**Media** (μ o x̄): suma sobre cantidad.',
      '**Mediana:** 50 % a cada lado, con los datos ordenados.',
      '**Moda:** el valor más frecuente.',
      '**Cuartiles, deciles, percentiles:** dividen en 4, 10 y 100 partes. P(25) = Q1, P(50) = Me.',
    ],
    table: { head: ['El enunciado dice', 'Buscás'], rows: [['la mitad tarda más de…', 'mediana'], ['lo más frecuente', 'moda'], ['como máximo el 20 % más rápido', 'P(20)'], ['como mínimo el 15 % que más tarda', 'P(85)'], ['solo el 10 % supera…', 'P(90)']] },
    written: 'P(k) = v significa que el k % de [las unidades] tiene [variable] menor o igual a v [unidades], y el (100 − k) % la supera.',
    trap: '"Solo el 15 % tarda más de…" es **P(85)**, no P(15).',
  },
  {
    id: 'p1d', module: 'u1', title: 'Varianza, desvío y coeficiente de variación',
    lead: ['Dos grupos pueden tener el mismo promedio y ser muy distintos. La **dispersión** lo mide. Y para saber si el promedio **representa** al grupo está el CV, con el corte de 20 % de la cátedra.'],
    scenes: [flow('De los desvíos al CV', [
      ['Desvíos', 'x − x̄: siempre suman 0', 'La distancia a la media no se puede promediar tal cual: positivos y negativos se compensan y **suman cero**.'],
      ['Varianza', 's²: desvíos al cuadrado', 'Por eso se elevan al cuadrado. La **varianza** queda en unidades al cuadrado.'],
      ['Desvío', 's = √s²', 'El **desvío estándar** es la raíz y vuelve a la unidad original.'],
      ['CV', 's/x̄ · 100', 'El **coeficiente de variación** divide por la media: no tiene unidad y permite comparar grupos distintos.'],
      ['Decidir', 'CV < 20 %: homogéneo', 'Menos de 20 %: datos homogéneos y media representativa. Más de 20 %: heterogéneos y media no representativa.'],
    ])],
    points: [
      '**σ², s²:** varianza. **σ, s:** desvío estándar.',
      '**s² = Σ(x − x̄)²/(n − 1)** en una muestra.',
      '**CV = s/x̄ · 100**.',
      '**CV < 20 %:** homogéneo, media representativa. **CV > 20 %:** heterogéneo.',
      'Entre dos grupos, **más CV = más heterogéneo**, aunque tenga menos desvío.',
    ],
    example: { title: 'dos sectores', body: ['Administración: 396/2590 = 15,3 %. Comercial: 669/2915 = 22,9 %. **Comercial es más heterogéneo** y su media no es representativa; la de Administración sí.'] },
    written: 'CV = s/x̄ · 100 = …/… · 100 = …%. Como es [menor / mayor] al 20 %, la distribución es [homogénea / heterogénea] y la media [es / no es] representativa.',
    trap: '"¿La media es representativa?" se contesta **con el CV calculado**, nunca comparando media y mediana.',
  },
  {
    id: 'p1a', module: 'u1', title: 'Forma: asimetría',
    lead: ['La **media persigue a la cola**. Si hay unos pocos valores muy altos, la media se va hacia la derecha y queda mayor que la mediana: asimetría positiva.'],
    scenes: [sc([
      head('La media sigue a la cola'),
      plot(30, 65, 260, 180, [0, 10], [0, 0.45], { ticks: false, fns: [{ f: 'x*exp(-x/2)/2', c: 'blue' }] }),
      txt(160, 285, 'Positiva', { fs: 19, b: true, c: 'blue' }),
      txt(160, 325, 'Mo < Me < x̄', { fs: 19, b: true }),
      plot(325, 65, 260, 180, [0, 10], [0, 0.45], { s: 1, ticks: false, fns: [{ f: '(10-x)*exp(-(10-x)/2)/2', c: 'orange' }] }),
      txt(455, 285, 'Negativa', { fs: 19, b: true, c: 'orange', s: 1 }),
      txt(455, 325, 'Mo > Me > x̄', { fs: 19, b: true, s: 1 }),
      txt(300, 385, 'AS = (x̄ − Mo)/s', { fs: 19, b: true, c: 'yellow', s: 2 }),
    ], [
      '**Asimétrica positiva**: cola larga a la derecha, como los ingresos. La media es la mayor de las tres.',
      '**Asimétrica negativa**: cola larga a la izquierda, como la vida útil de una batería. La media es la menor.',
      'El **coeficiente de asimetría** es media menos moda sobre el desvío. Su signo es el de la asimetría. Cerca de cero, es simétrica.',
    ])],
    points: ['**AS = (x̄ − Mo)/s**', '**AS > 0:** positiva, Mo < Me < x̄.', '**AS < 0:** negativa, Mo > Me > x̄.', '**AS ≈ 0:** simétrica, las tres casi iguales.'],
    example: { title: 'descarga de paquetes', body: ['Mo = 22,63, x̄ = 24,17 y s = 2,88: AS = 1,54/2,88 = **0,53**. Asimétrica positiva: hay algunas descargas bastante más lentas.'] },
    written: 'Como Mo < Me < x̄ (AS > 0), la distribución es asimétrica positiva: predominan los valores bajos de [variable] y hay pocos valores altos.',
    trap: 'El nombre lo da **la cola**, no el montón.',
  },
];

export const U2_THEORY: TheoryBlock[] = [
  {
    id: 'p2', module: 'u2', title: 'Sucesos y definiciones de probabilidad', videoNote: VIDEO_NOTE,
    lead: ['Una probabilidad es un número **entre 0 y 1** que mide qué tan posible es un suceso. Para calcularla bien, primero **nombrá los sucesos con letras**.'],
    scenes: [list('Un técnico al azar: ¿de qué sector es?', [
      ['Espacio muestral', 'todos los resultados posibles', 'El **espacio muestral** junta todos los resultados posibles del experimento aleatorio.'],
      ['Suceso', 'A: es de Redes', 'Un **suceso** es cualquier subconjunto. Se define con una letra.'],
      ['Excluyentes', 'Redes y Datos: no a la vez', '**Excluyentes**: no pueden ocurrir juntos, su intersección es vacía.'],
      ['Exhaustivos', 'todos los sectores juntos', '**Exhaustivos**: entre todos cubren todo el espacio muestral.'],
      ['Complementarios', 'Redes y no Redes', '**Complementarios**: excluyentes y exhaustivos a la vez. Por eso P(no A) es 1 menos P(A).'],
    ])],
    points: [
      '**Clásica (Laplace):** favorables / posibles. Exige resultados equiprobables.',
      '**Frecuencista (Von Mises):** valor al que tiende la frecuencia relativa al repetir muchas veces (ley de los grandes números).',
      '**Axiomática (Kolmogórov):** P(A) ≥ 0, P(E) = 1 y, si son excluyentes, P(A∪B) = P(A) + P(B).',
      '**Complemento:** P(Ā) = 1 − P(A).',
    ],
    written: 'Sean los sucesos A: [descripción] y B: [descripción]. Datos: P(A) = …, P(B) = …',
    trap: 'Excluyentes no alcanza para ser complementarios: además tienen que cubrir todo.',
  },
  {
    id: 'p2u', module: 'u2', title: 'Unión, intersección y tabla de doble entrada',
    lead: ['**"Y"** es intersección; **"o", "al menos uno"** es unión. La forma más segura de no contar dos veces es armar la tabla de doble entrada.'],
    scenes: [grow('100 reclamos', ['', 'Urgente', 'No urgente', 'Total'], [
      [['Web', '18', '42', '60'], 'En la tabla cada celda interna es una **intersección**: 18 reclamos son web y urgentes.'],
      [['App', '22', '18', '40'], 'Los márgenes son las probabilidades simples: 40 de 100 son de la app.'],
      [['Total', '40', '60', '100'], 'Web **o** urgente: 60 más 40 menos los 18 contados dos veces, sobre 100. Da **0,82**.'],
    ])],
    points: [
      '**P(A∪B) = P(A) + P(B) − P(A∩B)**',
      '**Excluyentes:** P(A∩B) = 0.',
      '**Solo A:** P(A) − P(A∩B).',
      '**Exactamente uno:** P(solo A) + P(solo B).',
      '**Al menos uno:** la unión, o 1 − P(ninguno).',
    ],
    table: { head: ['Dice', 'Es'], rows: [['ambos', 'P(A∩B)'], ['al menos uno', 'P(A∪B)'], ['solo A', 'P(A∩B̄)'], ['ninguno', '1 − P(A∪B)']] },
    example: { title: 'dos contratos', body: ['P(A) = 0,72, P(B) = 0,81, solo B = 0,16. **Ambos** = 0,81 − 0,16 = 0,65. **Al menos uno** = 0,72 + 0,81 − 0,65 = 0,88. **Solo uno** = 0,07 + 0,16 = 0,23. **Ninguno** = 0,12.'] },
    trap: '"Solo B" **no es** P(B).',
  },
  {
    id: 'p2c', module: 'u2', title: 'Condicional e independencia',
    lead: ['"**De los que**…", "**sabiendo que**…", "**si**…" achican el universo: ya no dividís por el total sino por los que cumplen la condición.'],
    scenes: [flow('¿P(urgente / web)?', [
      ['Condición', 'miro solo los 60 de web', 'Lo que va después de la barra es lo que ya sabés: el universo pasa a ser los 60 reclamos web.'],
      ['Cuenta', '18/60 = 0,30', 'De esos, 18 son urgentes: 0,30. Es la intersección sobre la probabilidad de la condición.'],
      ['Comparar', 'P(urgente) = 0,40', 'Sin saber nada, la probabilidad de urgente era 0,40.'],
      ['Concluir', '0,30 ≠ 0,40: no son independientes', 'Saber que es web **cambió** la probabilidad: los sucesos están condicionados.'],
    ])],
    points: [
      '**P(A/B) = P(A∩B)/P(B)**',
      '**Producto:** P(A∩B) = P(A/B)·P(B) = P(B/A)·P(A).',
      '**Independientes:** P(A/B) = P(A), P(B/A) = P(B), P(A∩B) = P(A)·P(B).',
      '**Sin reposición** no hay independencia: cambia el total en la segunda extracción.',
    ],
    example: { title: 'heladeras con fallas', body: ['Mecánica 0,03 y eléctrica 0,04, independientes. Ambas: 0,0012. Alguna: 0,03 + 0,04 − 0,0012 = 0,0688. Eléctrica sabiendo que tiene mecánica: 0,0012/0,03 = **0,04**, igual a P(E).'] },
    written: 'P(A/B) = P(A∩B)/P(B) = … Como P(A/B) [= / ≠] P(A), los sucesos [son / no son] independientes.',
    trap: '**Excluyentes ≠ independientes.** Si no pueden ocurrir juntos y tienen probabilidad positiva, son dependientes.',
  },
  {
    id: 'p2b', module: 'u2', title: 'Probabilidad total y Bayes',
    lead: ['Lo reconocés porque te dan **grupos con su peso** y **una tasa dentro de cada grupo**. Total: ¿cuánto pasa en general? Bayes: ya pasó, ¿de qué grupo vino?'],
    scenes: [sc([
      head('Servidores y fallas'),
      tree(15, 55, 570, 190, { t: 'Servidor', kids: [
        { t: 'A · 0,50', c: 'blue', kids: [{ t: 'Falla 0,010', e: '0,02', c: 'blue', s: 1 }] },
        { t: 'B · 0,30', c: 'green', kids: [{ t: 'Falla 0,009', e: '0,03', c: 'green', s: 1 }] },
        { t: 'C · 0,20', c: 'orange', kids: [{ t: 'Falla 0,010', e: '0,05', c: 'orange', s: 1 }] },
      ] }, { fs: 17 }),
      txt(300, 300, 'Total: 0,010 + 0,009 + 0,010 = 0,029', { fs: 18, b: true, c: 'yellow', s: 2 }),
      txt(300, 360, 'Bayes: P(C / falla) = 0,010/0,029 = 0,345', { fs: 18, b: true, c: 'purple', s: 3 }),
    ], [
      'La primera rama tiene el **peso de cada proveedor**: 50, 30 y 20 %. Son excluyentes y exhaustivos.',
      'La segunda tiene la **condicional**. Multiplicás sobre la rama para la intersección: 0,50 por 0,02 da 0,010.',
      '**Probabilidad total**: sumás todas las ramas que terminan en falla. Da 0,029.',
      '**Bayes**: la rama que te preguntan sobre el total. Si falló, viene de C con probabilidad 0,345, aunque C sea solo el 20 %.',
    ])],
    points: [
      '**Total:** P(B) = Σ P(B/Aᵢ)·P(Aᵢ).',
      '**Bayes:** P(Aₖ/B) = P(B/Aₖ)·P(Aₖ) / P(B).',
      '**Las ramas que salen de un nodo suman 1.** Las segundas son siempre condicionales.',
      'Si preguntan por "no B", usá los complementos 1 − P(B/Aᵢ).',
    ],
    example: { title: 'aseguradora', body: ['A 30 % (15 % accidentes), M 45 % (8 %), B 25 % (2 %). Sin accidente: 0,255 + 0,414 + 0,245 = **0,914**. Riesgo medio sabiendo que no tuvo: 0,414/0,914 = **0,453**.'] },
    written: 'Por probabilidad total: P(B) = ΣP(B/Aᵢ)·P(Aᵢ) = … Por Bayes: P(Aₖ/B) = P(Aₖ∩B)/P(B) = …',
    trap: 'P(falla/C) = 0,05 y P(C/falla) = 0,345. **No son lo mismo.**',
  },
];

const a = asker('u1');
export const U1_QUESTIONS: Question[] = [
  a.mcq('pye-u1-01', 'p1', 'Se sigue a 6.200 personas durante diez años sin intervenir. El estudio es:', 'Observacional y longitudinal', ['Experimental y transversal', 'Observacional y transversal', 'Experimental y longitudinal'], 'No se interviene (observacional) y se sigue al grupo en el tiempo (longitudinal).'),
  a.mcq('pye-u1-02', 'p1v', 'La cantidad de errores en un código es una variable:', 'Cuantitativa discreta', ['Cuantitativa continua', 'Cualitativa ordinal', 'Cualitativa nominal'], 'Surge de contar: entre dos valores seguidos no hay otros posibles.'),
  a.mcq('pye-u1-03', 'p1v', 'La temperatura en °C se mide en escala:', 'De intervalos', ['De razón', 'Ordinal', 'Nominal'], 'El cero es arbitrario: 0 °C no es ausencia de temperatura.'),
  a.mcq('pye-u1-04', 'p1t', 'Con intervalos 2–4, 4–6 y 6–8, el dato 4 va en:', '4–6', ['2–4', 'En los dos', '6–8'], 'Se incluye el límite inferior y no el superior.'),
  a.mcq('pye-u1-05', 'p1c', 'P(15) = 2,78 h y P(85) = 4,02 h. Solo el 15 % de los ataques tarda más de:', '4,02 horas', ['2,78 horas', '1,24 horas', '3,40 horas'], 'Si el 15 % lo supera, el 85 % queda por debajo: P(85).'),
  a.mcq('pye-u1-06', 'p1d', 'Media 19,7 y desvío 9,7. La media:', 'No es representativa: CV = 49,2 %', ['Es representativa: el desvío es menor que la media', 'Es representativa: CV = 9,7 %', 'No se puede saber sin la moda'], 'CV = 9,7/19,7 = 49,2 %, mayor al 20 %.'),
  a.mcq('pye-u1-07', 'p1a', 'Mo = 8, Me = 7 y media = 6,5. La distribución es:', 'Asimétrica negativa', ['Asimétrica positiva', 'Simétrica', 'Bimodal'], 'Mo > Me > media: la cola va a la izquierda.'),
];

const b = asker('u2');
export const U2_QUESTIONS: Question[] = [
  b.mcq('pye-u2-01', 'p2', '"Es de Compras" y "no es de Compras" son sucesos:', 'Complementarios', ['Independientes', 'Excluyentes pero no exhaustivos', 'Exhaustivos pero no excluyentes'], 'No se superponen y cubren todo el espacio muestral.'),
  b.mcq('pye-u2-02', 'p2u', 'P(A) = 0,72, P(B) = 0,81 y P(solo B) = 0,16. P(al menos uno) es:', '0,88', ['1,53', '0,65', '0,23'], 'Ambos = 0,65. Unión = 0,72 + 0,81 − 0,65 = 0,88.'),
  b.mcq('pye-u2-03', 'p2c', '18 % ve el programa, 12 % lee la columna y 10 % ambas. De los que ven, ¿qué parte lee?', '0,556', ['0,833', '0,10', '0,12'], 'P(L/TV) = 0,10/0,18. La condición va en el denominador.'),
  b.mcq('pye-u2-04', 'p2b', 'Grupo X: 60 % de las visitas, contacta el 17 %. Las visitas que contactan son 18,7 % del total. P(X / contacto):', '0,545', ['0,17', '0,60', '0,102'], 'Bayes: 0,60 · 0,17 / 0,187 = 0,545.'),
];

export const U1_MAP: ConceptMap = {
  module: 'u1', root: 'Estadística descriptiva',
  branches: [
    { t: 'De quién y qué', kids: [
      { t: 'Población, muestra y estudio', d: 'observacional o experimental · longitudinal o transversal', topic: 'p1' },
      { t: 'Variables', d: 'nominal, ordinal · discreta, continua', topic: 'p1v' },
    ] },
    { t: 'Presentar', d: 'FA, FR, acumuladas · gráficos', topic: 'p1t' },
    { t: 'Resumir', kids: [
      { t: 'Posición', d: 'media, mediana, moda, percentiles', topic: 'p1c' },
      { t: 'Dispersión', d: 's², s, CV (corte 20 %)', topic: 'p1d' },
      { t: 'Forma', d: 'AS = (x̄ − Mo)/s', topic: 'p1a' },
    ] },
  ],
  links: ['El tipo de variable decide la prueba en las Unidades 6 a 8.', 'La frecuencia relativa se vuelve probabilidad en la Unidad 2.'],
};

export const U2_MAP: ConceptMap = {
  module: 'u2', root: 'Cálculo de probabilidades',
  branches: [
    { t: 'Sucesos', d: 'excluyentes, exhaustivos, complementarios', topic: 'p2' },
    { t: 'Y / o', d: 'P(A∪B) = P(A) + P(B) − P(A∩B)', topic: 'p2u' },
    { t: 'Sabiendo que…', d: 'P(A/B) = P(A∩B)/P(B) · independencia', topic: 'p2c' },
    { t: 'Grupos con tasas', d: 'árbol: total y Bayes', topic: 'p2b' },
  ],
  links: ['α y β son **probabilidades condicionales** (Unidad 6).', 'La independencia arma las esperadas de chi cuadrado (Unidad 8).'],
};
