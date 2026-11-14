# Entrenador de recuperatorio PyE

Acceso: `#/m/pye/recuperatorio`, también desde la materia. La ruta y su CSS se cargan bajo demanda. El PDF corregido y el contexto maestro se leen localmente y no se publican; las consignas se reconstruyen con redacción propia y diagramas originales, sin nombres personales.

## Recorrido

1. «Mi examen corregido»: cinco consignas reconstruidas, síntesis de la respuesta presentada, fragmentos literales de la corrección y modelos matemáticos. Los comentarios del PDF se distinguen de las recomendaciones.
2. «Aprender»: reconocimiento, diagrama narrado, controles escritos de comprensión, resolución guiada y videos ya existentes. Los controles de reflexión no reciben nota automática.
3. «Practicar»: cuatro variantes por habilidad, campos por inciso, notación simple, pistas opcionales y entrega con rúbrica. Los subítems vacíos y los requisitos indispensables omitidos valen cero.
4. «Simulacro»: cinco variantes, 24+24+10+24+18=100 puntos, sin pistas hasta entregar. Duración configurable; sin configurar, se usa cronómetro. El vencimiento entrega el borrador. No se atribuye una duración al examen real.
5. «Historial»: respuestas, notas estimadas, omisiones y recurrencia de criterios no detectados. Dos simulacros nuevos consecutivos de al menos 80, sin omisiones ni fallos críticos detectados, acreditan la meta orientativa del entrenador.

El catálogo tiene 20 variantes; una vez usadas se identifican como repeticiones y no acreditan un simulacro nuevo. La lista de consignas usadas se conserva aunque se roten los últimos 60 intentos detallados. Todo se guarda en la clave local `fac-pye-recovery-v1`. Sin almacenamiento la práctica funciona en memoria y se informa el fallo de guardado.

## Corrección y límites

Los pesos de las cinco preguntas proceden del examen. El reparto por criterio dentro de cada pregunta es pedagógico: el PDF no publica una rúbrica completa. Se verifican números, desigualdades, estructura de hipótesis, probabilidades y sustituciones aritméticas sin ejecutar código ingresado. Las expresiones aceptan coma decimal, `sqrt`, `raiz`, `mu`, `xbar`, `<=`, `>=`, `!=` y sus símbolos habituales.

El texto se contrasta con reglas explícitas de contenido y redacción, sin LLM ni servidor nuevo. No es un corrector semántico general: puede no reconocer una formulación equivalente y una coincidencia de términos no garantiza una argumentación válida. La nota siempre es estimativa. Los criterios y los modelos quedan visibles al entregar; no se afirma reproducir exactamente una calificación docente ni se promete aprobación.

El original no informa confianza numérica para el intervalo; no se inventa. La diferencia entre alfa=4% del encabezado y 5% del inciso de una media se explica, comprobando ambos. Normalidad no implica independencia; no rechazo de H0 no prueba su verdad; asociación no demuestra causalidad. Levene antes de Student/Welch se presenta como el recorrido solicitado por el curso, no como la única metodología posible.

## Cálculos y verificación

- `src/lib/statistics.ts`: t mediante beta incompleta y fracción continua; Student agrupada, Welch, Levene sobre muestras sintéticas reproducibles y explorador de intervalos. Las probabilidades de las tablas, incluidos los distractores, se calculan; los datos sintéticos conservan sus medias y desvíos declarados. Referencias: [prueba t de una media](https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm), [dos medias](https://www.itl.nist.gov/div898/handbook/eda/section3/eda353.htm), [intervalos y confianza](https://www.itl.nist.gov/div898/handbook/prc/section1/prc14.htm).
- `src/lib/arithmetic.ts`: analizador numérico cerrado, sin `eval` ni `Function`.
- `src/content/recovery/`: 25 consignas, cinco recorridos visuales, diagnóstico y modelos propios.
- `src/lib/recoveryGrading.ts` y `recoveryState.ts`: corrección, validación de persistencia y condición de dominio.
- `tests/unit/pye-recovery.test.ts`: referencias numéricas independientes obtenidas con SciPy, distribución de Cauchy para t con un grado de libertad, errores reales, modelos, omisiones y dominio.
- `tests/e2e/pye-recovery.spec.ts`: navegación, desarrollo, recarga, devolución, historial, temporizador, ausencia de pistas en examen y almacenamiento no disponible, en escritorio y 390 px.

Validación del proyecto: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run e2e`.
