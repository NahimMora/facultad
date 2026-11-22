/**
 * PyE · Unidad 6 (inferencia para una población), tema por tema.
 * Fuentes revisadas (privadas): teórico 2025-2, presentaciones de inferencia y de prueba de hipótesis, fórmulas
 * permitidas, modelos de 2º parcial con respuestas y modelo de evaluación oral.
 * Redacción y datos propios (empresa ficticia: Mate Cloud). Cuentas verificadas con SciPy.
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import { asker, bell, cards, flow, grow, list, VIDEO_NOTE } from './kit';

const module = 'u6';
const ORAL = 'modelo de evaluación oral de la cátedra';
const PARCIAL = 'modelo de 2º parcial de la cátedra';

export const U6_THEORY: TheoryBlock[] = [
  {
    id: 'p6', module, title: 'De la muestra a la población', videoNote: VIDEO_NOTE,
    lead: [
      'Inferir es **sacar una conclusión sobre toda una población mirando solo una muestra**. Por eso hay dos juegos de símbolos: los de la población (fijos y desconocidos) y los de la muestra (los que calculás).',
      'Antes de cualquier cuenta preguntate: ¿me hablan de un **promedio** (μ) o de un **porcentaje** (p)? ¿Me piden **estimarlo** (intervalo) o **decidir** algo sobre él (prueba de hipótesis)?',
    ],
    scenes: [flow('Cómo se hace una inferencia', [
      ['Población', 'parámetros μ, σ, p: fijos y desconocidos', 'En la **población** viven los parámetros: la media μ, el desvío σ y la proporción p. Son números fijos, pero no los conocés.'],
      ['Muestra', 'estadísticos x̄, s, p̂: cambian con la muestra', 'De una **muestra aleatoria** calculás estadísticos: x̄, s y p̂. Si sacás otra muestra dan distinto, o sea que son variables aleatorias.'],
      ['Estimar', '¿cuánto vale? → intervalo de confianza', 'Si la pregunta es **cuánto vale** el parámetro, construís un intervalo de confianza alrededor del estadístico.'],
      ['Decidir', '¿es mayor, menor, distinto? → prueba', 'Si la pregunta es **si alcanza la evidencia** para afirmar algo del parámetro, hacés una prueba de hipótesis.'],
    ])],
    points: [
      '**Parámetro:** describe a la población (μ, σ, p). Es constante.',
      '**Estadístico:** se calcula con la muestra (x̄, s, p̂). Es una variable aleatoria.',
      '**Estimador:** estadístico que se usa para estimar un parámetro. La estimación **puntual** da un número, sin decir cuánta incertidumbre tiene; la de **intervalo** agrega un nivel de confianza.',
      '**Propiedades de un buen estimador:** consistente (se acerca al parámetro al crecer n), eficiente (poca varianza), suficiente (aprovecha la información de los datos) e insesgado (su esperanza es el parámetro).',
      'Por el TCL, x̄ tiene media μ y desvío σ/√n: con más datos varía menos.',
    ],
    table: { head: ['Medida', 'Población', 'Muestra'], rows: [['Media', 'μ', 'x̄'], ['Desvío', 'σ', 's'], ['Proporción', 'p', 'p̂ = x/n']] },
    example: { title: 'Mate Cloud', body: ['Querés saber cuánto tarda **en promedio** una copia de seguridad en todos los servidores: μ. Medís 16 servidores y te da 52 minutos: x̄ = 52. El 52 **nunca** se escribe como μ.'] },
    written: 'El parámetro es una medida de la población, constante y generalmente desconocida (μ, σ, p). El estadístico es una medida de la muestra (x̄, s, p̂), variable aleatoria porque depende de la muestra. Un buen estimador es consistente, eficiente, suficiente e insesgado.',
    trap: 'Escribir "μ₁ = 5,9" con el promedio de la muestra te costó puntos en el parcial y en el recu. En una población hay **un solo μ**.',
  },
  {
    id: 'p6i', module, title: 'Intervalo de confianza para la media',
    lead: [
      'El intervalo se arma parándote en **x̄** y abriéndote lo mismo hacia cada lado. Ese "lo mismo" es el **error muestral (EM)**.',
      'Como no conocés σ y usás s, la distribución no es normal sino **t de Student con n − 1 grados de libertad**: más achatada, porque hay más incertidumbre.',
    ],
    scenes: [
      bell('IC del 95 % con t de 15 gl', { df: 15, area: [-2.13, 2.13], marks: [{ x: -2.13, t: '−2,131' }, { x: 2.13, t: '2,131' }], lines: [
        ['n = 16 · x̄ = 52 min · s = 8 min', 'Datos: 16 copias de seguridad tardaron en promedio 52 minutos, con un desvío muestral de 8. La variable se supone normal.'],
        ['t(0,975 ; 15) = 2,131', 'Con 95 % en el centro quedan 2,5 % en cada cola. Por eso el fractil se busca en **1 − α/2 = 0,975**, con 15 grados de libertad.'],
        ['EM = 2,131 · 8/√16 = 4,26', 'El error muestral es el valor crítico por el error estándar: 2,131 por 8 sobre raíz de 16. Da 4,26 minutos.'],
        ['IC = (47,74 ; 56,26) minutos', 'Restás y sumás el error a la media muestral. Con 95 % de confianza, el tiempo **medio** de copia está entre 47,74 y 56,26 minutos.'],
      ] }),
    ],
    points: [
      '**EM = t(1−α/2 ; n−1) · s/√n**',
      '**Lᵢ = x̄ − EM** y **Lₛ = x̄ + EM**.',
      'Al revés: **x̄ = (Lᵢ + Lₛ)/2**, **amplitud A = Lₛ − Lᵢ**, **EM = A/2**.',
      '**Supuesto:** la variable es aproximadamente normal (hace falta sobre todo con n chico).',
      '**Nivel de confianza 1 − α:** de cada 100 intervalos armados con muestras de tamaño n, alrededor de (1 − α)·100 contienen a μ.',
      'En Jamovi: prueba t de una muestra con intervalo de confianza y la hipótesis **siempre en ≠**.',
    ],
    example: { title: 'leer un intervalo ya hecho', body: ['Te dan que el tiempo medio está entre 36 y 42 horas. **x̄ = (36 + 42)/2 = 39** horas, **A = 42 − 36 = 6** y **EM = 6/2 = 3** horas. Escribí las tres cuentas.'] },
    written: 'EM = t(1−α/2 ; n−1) · s/√n = [sustitución] = [resultado]. IC = (x̄ − EM ; x̄ + EM) = (… ; …). Con una confianza del …% se estima que **la media poblacional de [variable]** se encuentra entre … y … [unidades].',
    trap: 'El intervalo **no** dice que el 95 % de los servidores tarda entre esos valores: habla del **promedio** poblacional. Y el fractil va en 1 − α/2, no en 1 − α.',
  },
  {
    id: 'p6p', module, title: 'Intervalo de confianza para una proporción',
    lead: ['Si te preguntan por un **porcentaje** de casos que cumplen algo, el parámetro es p. La idea es la misma (centro ± error), pero el centro es **p̂** y la distribución es la **normal Z**, porque la muestra es grande.'],
    scenes: [flow('150 de 200 clientes usan 2FA', [
      ['Estimador', 'p̂ = x/n = 150/200 = 0,75', 'Primero el valor muestral: 150 éxitos sobre 200 casos es **0,75**. Escribí la división, aunque sea obvia.'],
      ['Valor crítico', 'z(0,975) = 1,96', 'Para 95 % de confianza buscás en la normal el fractil 0,975, que vale **1,96**. Acá no hay grados de libertad.'],
      ['Error muestral', 'EM = 1,96 · √(0,75 · 0,25/200) = 0,06', 'El error es 1,96 por la raíz de p̂ por su complemento sobre n. Da **0,06**, o sea 6 puntos porcentuales.'],
      ['Intervalo', '(0,69 ; 0,81)', 'Con 95 % de confianza, la proporción **real** de clientes que usan doble factor está entre 69 % y 81 %.'],
    ])],
    points: [
      '**p̂ = x/n**',
      '**EM = z(1−α/2) · √(p̂(1 − p̂)/n)**',
      '**IC = p̂ ± EM**. Al revés: p̂ es el punto medio y EM es la mitad de la amplitud.',
      'Vale con muestra grande (la cátedra usa n > 30; conviene que haya además suficientes éxitos y fracasos).',
    ],
    table: { head: ['Confianza', 'α', '1 − α/2', 'z'], rows: [['90 %', '0,10', '0,95', '1,645'], ['92 %', '0,08', '0,96', '1,751'], ['95 %', '0,05', '0,975', '1,960'], ['96 %', '0,04', '0,98', '2,054'], ['99 %', '0,01', '0,995', '2,576']] },
    example: { title: 'te dan la amplitud y un límite', body: ['A = 0,08 y Lₛ = 0,41. Entonces **EM = A/2 = 0,08/2 = 0,04**, **p̂ = Lₛ − EM = 0,41 − 0,04 = 0,37** y **Lᵢ = p̂ − EM = 0,37 − 0,04 = 0,33**. Tres renglones, tres cuentas.'] },
    written: 'p̂ = x/n = … EM = z(1−α/2)·√(p̂(1−p̂)/n) = … IC = (… ; …). Con una confianza del …% se estima que la proporción real de [población] que [característica] está entre …% y …%.',
    trap: 'Es el punto que valió **0/20 en tu recu**: números sin la cuenta al lado y un EM que no coincidía con la amplitud. Siempre EM = A/2 escrito.',
  },
  {
    id: 'p6e', module, title: 'Precisión, confianza y tamaño de muestra',
    lead: [
      '**Preciso quiere decir angosto**: poco error muestral. **Confiable quiere decir que es más probable que le pegue al parámetro.** Con la misma muestra, una cosa se paga con la otra.',
      'Es la pregunta número uno del modelo de oral, y se responde siempre con la misma cadena.',
    ],
    scenes: [grow('¿Qué le pasa al intervalo?', ['Si cambio…', 'EM', 'Precisión'], [
      [['confianza sube (α baja)', 'sube', 'baja'], 'Más confianza es **menos riesgo α**. El valor crítico crece, entonces el error crece y el intervalo queda más ancho: menos preciso.'],
      [['confianza baja (α sube)', 'baja', 'sube'], 'Al aceptar más riesgo, el valor crítico se achica. El intervalo es más angosto y más preciso, pero menos confiable.'],
      [['n sube', 'baja', 'sube'], 'Con más datos se divide por una raíz más grande. Es la forma de ganar precisión **sin perder confianza**.'],
      [['n baja', 'sube', 'baja'], 'Con menos datos el error crece y se pierde precisión.'],
      [['más dispersión (s)', 'sube', 'baja'], 'Si los datos son más dispersos, el error estándar crece. Esto no lo elegís: viene con la población.'],
    ], [2.2, 1, 1])],
    points: [
      '**α ↓ → confianza ↑ → valor crítico ↑ → EM ↑ → amplitud ↑ → precisión ↓**',
      '**n ↑ → √n ↑ → EM ↓ → precisión ↑**',
      'Para reducir el EM hay dos acciones: **aumentar n** o **bajar la confianza** (subir α).',
      'Para dividir el EM por 2 hay que multiplicar n por 4, si lo demás no cambia (con t es aproximado).',
    ],
    table: { head: ['Te dicen que se mantiene…', 'Para más precisión…'], rows: [['el tamaño de muestra', 'bajar la confianza (subir α)'], ['la confianza', 'aumentar n']] },
    example: { title: 'la afirmación del parcial', body: ['"Para ganar precisión se bajó el riesgo manteniendo n." **Falso:** al bajar α sube la confianza, sube el valor crítico, sube el EM y la precisión **baja**. Había que subir α o, para no perder confianza, aumentar n.'] },
    written: 'Manteniendo n, si disminuye el nivel de significación α aumenta la confianza 1 − α, por lo que aumenta el valor crítico y con él el error muestral: el intervalo es más amplio y menos preciso. Para ganar precisión sin modificar la confianza hay que aumentar el tamaño de la muestra.',
    trap: '"Nivel de significación" y "riesgo" son α. "Nivel de confianza" es 1 − α. Se mueven **al revés**.',
  },
  {
    id: 'p6h', module, title: 'Plantear las hipótesis',
    lead: [
      'Una prueba funciona como un juicio: **H₀ es "no pasa nada"** y se mantiene salvo que haya evidencia fuerte en contra. **H₁ es lo que querés demostrar**, lo que te haría actuar.',
      'Primero escribí con palabras "si pasa tal cosa, hago tal acción". Esa "tal cosa" es H₁.',
    ],
    scenes: [flow('"Compro si supera los 500 MB/s"', [
      ['Investigación', 'si la velocidad media supera 500, compro', 'Pasá el problema a una frase **si… entonces…**: si la velocidad media supera los 500, la empresa compra.'],
      ['H₁', 'μ > 500', 'Lo que se quiere demostrar va en la **alternativa**: μ mayor que 500. H₁ nunca lleva el igual.'],
      ['H₀', 'μ ≤ 500', 'La **nula** es el complemento y siempre lleva la igualdad: μ menor o igual que 500. La cátedra también acepta escribirla con igual.'],
      ['Cola', '> derecha · < izquierda · ≠ dos colas', 'El signo de H₁ decide la cola: mayor es derecha, menor es izquierda y distinto es bilateral.'],
      ['Rechazar H₀', 'significa comprar', 'Cerrá diciendo **qué significa rechazar H₀** en el problema. Acá, aconsejar la compra.'],
    ])],
    points: [
      '**Hipótesis de investigación:** explicación tentativa, en palabras ("si…, entonces…").',
      '**Hipótesis estadísticas:** enunciados sobre **parámetros** (μ, σ², p), sobre asociación o sobre una distribución. Nunca sobre x̄ ni p̂.',
      '**H₀:** ausencia de efecto; lleva =, ≤ o ≥. **H₁:** lo que se quiere probar; lleva >, < o ≠.',
      'Se decide siempre sobre H₀: **se rechaza o no se rechaza**. No se dice "se acepta H₀" ni "se rechaza H₁".',
    ],
    table: { head: ['Dice el enunciado', 'H₁', 'Cola'], rows: [['supera, aumentó, es más de', 'μ > μ₀', 'derecha'], ['es inferior, se redujo', 'μ < μ₀', 'izquierda'], ['cambió, difiere', 'μ ≠ μ₀', 'bilateral'], ['"al menos 90 %" y querés ver si es menos', 'p < 0,90', 'izquierda']] },
    example: { title: 'el valor de la muestra no entra', body: ['De 100 comercios, 50 tuvieron pérdidas y se sospecha que son más del 45 %. **H₁: p > 0,45**. Escribir p > 0,50 está mal: 0,50 es p̂, el valor muestral.'] },
    written: 'Hipótesis de investigación: si [condición], entonces [acción]. H₀: μ ≤ μ₀ ([variable] media no supera μ₀). H₁: μ > μ₀ ([variable] media supera μ₀). Rechazar H₀ implica [acción].',
    trap: 'El número que va en las hipótesis es el **de referencia del enunciado** (μ₀ o p₀), nunca el que salió de la muestra.',
  },
  {
    id: 'p6a', module, title: 'Errores tipo I y II, α, β y potencia',
    lead: [
      'Como decidís con una muestra, te podés equivocar de dos maneras: **actuar cuando no correspondía** (tipo I) o **no actuar cuando sí correspondía** (tipo II).',
      'En el examen siempre hay que decirlo **con las palabras del problema**.',
    ],
    scenes: [cards('H₁: el tiempo bajó → implementar', [
      ['Error tipo I · α', 'implemento y en realidad no bajó', '**Error tipo I**: rechazar H₀ siendo verdadera. Implementás y el tiempo no había bajado. Su probabilidad es α y se considera el más grave.'],
      ['Correcto · 1 − β', 'implemento y sí bajó: potencia', 'Rechazar H₀ siendo falsa es acertar. Esa probabilidad, **1 − β**, es la potencia: detectar la mejora cuando existe.'],
      ['Correcto · 1 − α', 'no implemento y no había bajado', 'No rechazar H₀ siendo verdadera también es acertar: no implementás algo que no servía.'],
      ['Error tipo II · β', 'no implemento y sí había bajado', '**Error tipo II**: no rechazar H₀ siendo falsa. Te perdés una mejora que existía. Su probabilidad es β.'],
    ])],
    points: [
      '**Tipo I:** rechazar H₀ verdadera. **α = P(RH₀ / H₀ V)**, nivel de significación.',
      '**Tipo II:** no rechazar H₀ falsa. **β = P(no RH₀ / H₀ F)**.',
      '**Potencia = 1 − β = P(RH₀ / H₀ F)**. Es una decisión correcta.',
      '**Después de decidir:** si rechazaste, el único error posible es tipo I; si no rechazaste, tipo II.',
      'Con n fijo, bajar α hace subir β. El α chico le conviene a quien más sufre el error tipo I.',
    ],
    table: { head: ['Decisión', 'H₀ verdadera', 'H₀ falsa'], rows: [['Rechazo H₀', 'Error I (α)', 'Correcto (1 − β)'], ['No rechazo H₀', 'Correcto (1 − α)', 'Error II (β)']] },
    example: { title: 'la empresa de micros del modelo de oral', body: [
      'Compra micros si el promedio supera los 300 pasajeros. Probabilidad 0,03 de comprar equivocadamente y 92 % de comprar cuando el promedio es 330.',
      'H₀: μ ≤ 300, H₁: μ > 300. **α = 0,03**. **Potencia = 0,92**, entonces **β = 0,08**. Comprar cuando el promedio es 300 es un **error tipo I**. La potencia es la probabilidad de comprar cuando el promedio realmente es 330.',
    ] },
    written: 'Error tipo I: concluir que [H₁] y [tomar la acción] cuando en realidad [H₀]. Error tipo II: concluir que no hay evidencia de [H₁] y [no actuar] cuando en realidad [H₁]. Potencia: probabilidad de [actuar] cuando efectivamente [H₁].',
    trap: 'Cuando el enunciado da dos probabilidades mirá **qué decisión** y **cuál es la verdad**: "no hacerlo cuando μ = 18,7" (siendo H₁: μ > 18) es β, no α.',
  },
  {
    id: 'p6t', module, title: 'Prueba t para una media',
    lead: [
      'Es el punto de desarrollo típico: un promedio contra un número fijo. Medís **a cuántos errores estándar** quedó x̄ de μ₀ y te fijás qué tan raro es eso si H₀ fuera verdad.',
      'Esa rareza es el **valor p**. Si es menor que α, rechazás.',
    ],
    scenes: [
      bell('H₁: μ > 50 · t con 15 gl', { df: 15, area: [2, 4], marks: [{ x: 2, t: 'tₘ = 2' }], lines: [
        ['H₀: μ ≤ 50  ·  H₁: μ > 50', 'Se quiere saber si la copia tarda en promedio **más de 50 minutos**. Un solo parámetro, con la igualdad en H₀ y cola derecha.'],
        ['tₘ = (54 − 50)/(8/√16) = 2', 'Con n = 16, x̄ = 54 y s = 8, el estadístico es media muestral menos 50, sobre 8 dividido raíz de 16. Da **2**.'],
        ['p-v = P(t₁₅ > 2) = 0,032', 'El valor p es el **área a la derecha de 2** en una t con 15 grados de libertad. Es la zona pintada: 0,032.'],
        ['0,032 < 0,05 → rechazo H₀', 'Como p es menor que alfa, se rechaza H₀: hay evidencia de que el tiempo medio supera los 50 minutos. El error posible es tipo I.'],
      ] }),
      list('Qué fila de Jamovi elegir', [
        ['Grados de libertad', 'n − 1, nunca n', 'En la salida de probabilidades descartá primero las que tengan mal los grados de libertad: son **n menos 1**.'],
        ['H₁ con >', 'P(t > tₘ)', 'Si la alternativa es mayor, sirve la probabilidad **a la derecha** del estadístico, con su signo.'],
        ['H₁ con <', 'P(t < tₘ)', 'Si la alternativa es menor, sirve la probabilidad **a la izquierda**.'],
        ['H₁ con ≠', '2 · P(t > |tₘ|)', 'Si es bilateral, tomás una cola con el valor absoluto y la **multiplicás por dos**.'],
      ]),
    ],
    points: [
      '**Cuándo:** una población, variable cuantitativa, σ desconocido y distribución aproximadamente normal.',
      '**tₘ = (x̄ − μ₀)/(s/√n)** con **ν = n − 1**.',
      '**Valor p:** probabilidad, suponiendo H₀ verdadera, de un estadístico tan extremo o más que el observado. También es el **mínimo nivel de significación** con el que se rechazaría H₀.',
      '**CR: p-v < α.** Si se cumple, se rechaza H₀.',
      '**CR con valor crítico** (cola derecha): x̄ > μ₀ + t(1−α ; n−1)·s/√n.',
      '**Seis renglones:** hipótesis, estadístico con la cuenta, gl, p-v como probabilidad, comparación con α, conclusión en el problema.',
    ],
    example: { title: 'si te dan |tₘ|', body: ['Se quiere probar que el tiempo **bajó** de 40 minutos, con n = 6 y |tₘ| = 1,523 (la muestra dio menos de 40). H₁: μ < 40, así que tₘ = −1,523 y p-v = P(t₅ < −1,523) = 0,094. Con α = 0,07: 0,094 no es menor, **no se rechaza**.'] },
    written: 'H₀: μ ≤ μ₀; H₁: μ > μ₀. tₘ = (x̄ − μ₀)/(s/√n) = … con ν = n − 1 = … p-v = P(t > tₘ) = … Como p-v [< / ≥] α, [se rechaza / no se rechaza] H₀. Con un nivel de significación del …%, los datos [muestran / no muestran] evidencia suficiente para concluir que [H₁ en palabras]. Puede cometerse un error tipo [I / II]: [en palabras].',
    trap: 'En tu parcial te preguntaron "¿qué probabilidad representa el p-v? ¿cuánto vale tₘ?". No alcanza con 0,0832: escribí **P(t₉ < −1,5058) = 0,0832**.',
  },
  {
    id: 'p6z', module, title: 'Prueba Z para una proporción',
    lead: ['Mismo procedimiento, para un **porcentaje contra un valor fijo**. Hay un detalle que cambia respecto del intervalo: en la raíz va **p₀**, el de la hipótesis, porque calculás suponiendo que H₀ es verdadera.'],
    scenes: [
      bell('H₁: p < 0,30', { area: [-4, -2.18], marks: [{ x: -2.18, t: 'zₘ = −2,18' }], lines: [
        ['H₀: p ≥ 0,30  ·  H₁: p < 0,30', 'Fallaba el 30 % de los servidores y se quiere probar que una actualización **bajó** esa proporción. Cola izquierda.'],
        ['p̂ = 100/400 = 0,25', 'En la muestra fallaron 100 de 400: el estimador es 0,25. Ese número no entra en las hipótesis.'],
        ['zₘ = (0,25 − 0,30)/√(0,30 · 0,70/400) = −2,18', 'El estadístico usa **p₀ en la raíz**: 0,30 por 0,70 sobre 400. Da menos 2,18.'],
        ['p-v = P(z < −2,18) = 0,0145 < 0,05', 'El valor p es el área izquierda, 0,0145. Es menor que 0,05: se rechaza y se concluye que la proporción de fallas bajó.'],
      ] }),
    ],
    points: [
      '**Cuándo:** una población, variable de éxito o fracaso, muestra grande.',
      '**zₘ = (p̂ − p₀)/√(p₀(1 − p₀)/n)**. Sin grados de libertad.',
      '**p-v:** P(z > zₘ), P(z < zₘ) o 2·P(z > |zₘ|), según H₁.',
    ],
    table: { head: ['', 'Media', 'Proporción'], rows: [['Parámetro', 'μ', 'p'], ['Distribución', 't con n − 1 gl', 'Z normal'], ['Error estándar en el IC', 's/√n', '√(p̂(1−p̂)/n)'], ['Error estándar en la prueba', 's/√n', '√(p₀(1−p₀)/n)']] },
    example: { title: 'cuando no alcanza', body: ['p₀ = 0,65, n = 300, fallaron 183: p̂ = 0,61, zₘ = −1,4525 y p-v = 0,0732. Con α = 0,02 **no se rechaza**. Error posible tipo II: concluir que no hay evidencia de que bajaron las fallas cuando en realidad bajaron.'] },
    written: 'H₀: p ≥ p₀; H₁: p < p₀. p̂ = x/n = … zₘ = (p̂ − p₀)/√(p₀(1−p₀)/n) = … p-v = P(z < zₘ) = … [comparar con α]. Con un …% de significación, [hay / no hay] evidencia suficiente para concluir que la proporción de [característica] es inferior a …%.',
    trap: '**Intervalo: p̂ en la raíz. Prueba: p₀ en la raíz.** Las dos están en la hoja de fórmulas y se confunden fácil.',
  },
];

const { mcq, tf } = asker(module);

export const U6_QUESTIONS: Question[] = [
  mcq('pye-u6-01', 'p6', 'Se midieron 25 tareas y tardaron en promedio 8,2 segundos. El 8,2 es:', 'Un estadístico, x̄', ['El parámetro μ', 'El valor de referencia μ₀', 'El error muestral'], 'Salió de una muestra, así que es un estadístico: x̄. μ sigue siendo desconocido.'),
  mcq('pye-u6-02', 'p6', 'Que la esperanza del estimador coincida con el parámetro significa que es:', 'Insesgado', ['Consistente', 'Eficiente', 'Suficiente'], 'Insesgado: E(estimador) = parámetro. Consistente es acercarse al crecer n; eficiente, tener poca varianza.'),
  mcq('pye-u6-03', 'p6i', 'n = 16 y confianza del 90 %. ¿Qué fractil va en el intervalo para la media?', 't(0,95 ; 15)', ['t(0,90 ; 15)', 't(0,95 ; 16)', 'z(0,90)'], 'α = 0,10, entonces 1 − α/2 = 0,95, y los grados de libertad son n − 1 = 15.'),
  mcq('pye-u6-04', 'p6i', 'Un IC para la media es (36 ; 42) horas. El error muestral vale:', '3 horas', ['6 horas', '39 horas', '1,96 horas'], 'La amplitud es 42 − 36 = 6 y el error es la mitad: 3 horas.', PARCIAL),
  mcq('pye-u6-05', 'p6p', 'Un IC para una proporción tiene amplitud 0,06 y valor muestral 0,45. Los límites son:', '0,42 y 0,48', ['0,39 y 0,51', '0,45 y 0,51', '0,435 y 0,465'], 'EM = 0,06/2 = 0,03, entonces 0,45 ± 0,03.', PARCIAL),
  mcq('pye-u6-06', 'p6p', 'La proporción de cuentas con doble factor está entre 76 % y 84 %. El valor muestral es:', '0,80', ['0,04', '0,08', '0,84'], 'p̂ es el punto medio: (0,76 + 0,84)/2 = 0,80.'),
  mcq('pye-u6-07', 'p6e', 'Sin cambiar la confianza necesitás un intervalo más preciso. ¿Qué hacés?', 'Aumentar el tamaño de muestra', ['Disminuir el tamaño de muestra', 'Disminuir α', 'Aumentar el error muestral'], 'Con la confianza fija solo queda agrandar n: baja el EM.', ORAL),
  mcq('pye-u6-08', 'p6e', 'Con n fijo se aumenta el nivel de significación. La amplitud del intervalo:', 'Se reduce', ['Aumenta', 'No cambia', 'Se duplica'], 'α sube, la confianza baja, el valor crítico baja y el intervalo se angosta.', PARCIAL),
  tf('pye-u6-09', 'p6e', 'Un intervalo del 80 % tiene menor error muestral que uno del 90 % hecho con la misma muestra.', true, 'Con menos confianza el valor crítico es menor y por lo tanto el EM también.', PARCIAL),
  mcq('pye-u6-10', 'p6h', 'De 100 comercios, 50 tuvieron pérdidas. Se sospecha que el porcentaje real supera el 45 %. H₁ es:', 'p > 0,45', ['p > 0,50', 'p̂ > 0,45', 'p ≤ 0,45'], '0,50 es el valor muestral. La hipótesis habla del parámetro p y del valor de referencia.', PARCIAL),
  mcq('pye-u6-11', 'p6h', 'Se quiere comprobar que el tiempo medio de respuesta es inferior a 20 minutos. Las hipótesis son:', 'H₀: μ ≥ 20 · H₁: μ < 20', ['H₀: μ < 20 · H₁: μ ≥ 20', 'H₀: x̄ ≥ 20 · H₁: x̄ < 20', 'H₀: μ = 20 · H₁: μ ≠ 20'], 'Lo que se quiere demostrar va en H₁ y las hipótesis se escriben con parámetros.'),
  mcq('pye-u6-12', 'p6a', 'Se compran micros solo si el promedio supera los 300 pasajeros. Comprarlos cuando el promedio es 300 es:', 'Error tipo I', ['Error tipo II', 'La potencia', 'Una decisión correcta'], 'Se rechazó H₀ (compró) siendo verdadera (no superaba 300).', ORAL),
  mcq('pye-u6-13', 'p6a', 'H₁: μ > 18 para abrir una maestría. "0,10 de no abrirla cuando μ = 18,7" es:', 'β', ['α', 'La potencia', 'El valor p'], 'No actuar cuando H₁ es verdadera es el error tipo II, de probabilidad β.', PARCIAL),
  tf('pye-u6-14', 'p6a', 'La probabilidad de rechazar H₀ siendo falsa es el error tipo I.', false, 'Rechazar una H₀ falsa es una decisión correcta: su probabilidad es la potencia, 1 − β.', PARCIAL),
  mcq('pye-u6-15', 'p6t', 'n = 9, x̄ = 53, s = 6 y μ₀ = 50. El estadístico vale:', '1,5', ['0,5', '4,5', '0,17'], 'tₘ = (53 − 50)/(6/√9) = 3/2 = 1,5.'),
  mcq('pye-u6-16', 'p6t', 'H₁: μ < 45, n = 7 y tₘ = −1,824. ¿Qué probabilidad es el valor p?', 'P(t < −1,824) con 6 gl', ['P(t > −1,824) con 6 gl', 'P(t < −1,824) con 7 gl', '2 · P(t < −1,824) con 6 gl'], 'Cola izquierda por el signo de H₁ y n − 1 = 6 grados de libertad.'),
  mcq('pye-u6-17', 'p6t', 'El mínimo nivel de significación es 0,07 y α = 0,05. Se concluye:', 'No se rechaza H₀', ['Se rechaza H₀', 'H₀ es verdadera', 'Se rechaza H₁'], 'El mínimo nivel de significación es el valor p: 0,07 no es menor que 0,05. No rechazar no demuestra que H₀ sea cierta.'),
  mcq('pye-u6-18', 'p6z', 'En la prueba Z para una proporción, dentro de la raíz va:', 'p₀(1 − p₀)/n', ['p̂(1 − p̂)/n', 's/n', 'p₀/n'], 'Se calcula bajo H₀, por eso se usa p₀. El p̂ en la raíz es del intervalo.'),
];

export const U6_MAP: ConceptMap = {
  module, root: 'Inferencia para una población',
  branches: [
    { t: 'Muestra → población', d: 'parámetro (μ, σ, p) fijo · estadístico (x̄, s, p̂) aleatorio', topic: 'p6' },
    { t: 'Estimar', d: '¿cuánto vale? centro ± EM', kids: [
      { rel: 'un promedio', t: 'IC para μ', d: 'x̄ ± t(1−α/2 ; n−1)·s/√n', topic: 'p6i' },
      { rel: 'un porcentaje', t: 'IC para p', d: 'p̂ ± z(1−α/2)·√(p̂(1−p̂)/n)', topic: 'p6p' },
      { rel: 'su ancho depende de', t: 'Confianza y n', d: 'α ↓ → EM ↑ · n ↑ → EM ↓', topic: 'p6e' },
    ] },
    { t: 'Decidir', d: '¿alcanza la evidencia?', kids: [
      { rel: 'empieza por', t: 'H₀ y H₁', d: 'H₁ es lo que quiero probar; H₀ lleva la igualdad', topic: 'p6h' },
      { rel: 'puede fallar con', t: 'Errores I y II', d: 'α: rechazo H₀ V · β: no rechazo H₀ F · potencia 1 − β', topic: 'p6a' },
      { rel: 'un promedio', t: 'Prueba t', d: '(x̄ − μ₀)/(s/√n), ν = n − 1', topic: 'p6t' },
      { rel: 'un porcentaje', t: 'Prueba Z', d: '(p̂ − p₀)/√(p₀(1−p₀)/n)', topic: 'p6z' },
    ] },
  ],
  links: ['El TCL (Unidad 5) justifica usar Z con muestras grandes.', 'La regla **p-v < α → rechazo H₀** vale igual en las Unidades 7, 8 y 9.'],
  oral: [
    { q: 'Con el mismo n, ¿cómo conseguís un intervalo más preciso?', a: 'Bajando el nivel de confianza, o sea subiendo α. El valor crítico disminuye, baja el error muestral y el intervalo se angosta, aunque queda menos confiable.' },
    { q: 'Con la misma confianza, ¿cómo conseguís un intervalo más preciso?', a: 'Aumentando el tamaño de la muestra: como n divide dentro de la raíz, el error muestral disminuye.' },
    { q: '¿Qué acciones reducen el error muestral?', a: 'Aumentar el tamaño de muestra o disminuir la confianza, es decir aumentar el riesgo α.' },
    { q: 'Si cambiás solo el tamaño de muestra, ¿qué pasa con el EM?', a: 'Se mueven al revés: si n aumenta el EM disminuye, y si n disminuye el EM aumenta.' },
    { q: 'Si cambiás solo la confianza, ¿qué pasa con el EM?', a: 'Se mueven igual: más confianza, más EM. Con el riesgo α es al revés: más α, menos EM.' },
    { q: 'Empresa de micros (¿más de 300 pasajeros?): planteá las hipótesis.', a: 'H₀: μ ≤ 300, la cantidad media no aumentó. H₁: μ > 300, aumentó. Rechazar H₀ implica comprar más micros.' },
    { q: 'En ese caso, ¿qué es la potencia?', a: 'La probabilidad de decidir comprar cuando el promedio realmente aumentó a 330: 0,92. Es 1 − β.' },
    { q: 'En ese caso, si p-v > α, ¿qué concluís?', a: 'No se rechaza H₀: con 3 % de significación no hay evidencia suficiente de que el promedio de pasajeros supere los 300, por lo que no se aconseja comprar. Se puede cometer un error tipo II.' },
    { q: '¿Qué es la condición de rechazo?', a: 'Es la condición que, si se verifica, lleva a rechazar H₀: p-v < α, o que el estadístico caiga en la zona de rechazo delimitada por el valor crítico.' },
  ],
};
