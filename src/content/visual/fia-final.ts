import type { Question, WorkedExercise } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, bits, box, head, ico, plot, scene, txt } from './h';

/** Figuras y resolución propias de ocho temas de un final anterior. */
export const FINAL_SCENES: Record<string, VisScene[]> = {
  'fia-final-e1': [scene([
    head('Shell: herramientas reutilizables'),
    box(20, 65, 480, 220, '', { c: 'gray' }), txt(260, 90, 'Shell del sistema experto', { fs: 25 }),
    box(55, 135, 410, 60, 'Motor de inferencia', { fs: 26, c: 'blue' }),
    box(55, 210, 410, 50, 'Interfaz y herramientas', { s: 1, fs: 25, c: 'cyan' }),
    box(20, 340, 480, 80, 'Conocimiento del dominio', { s: 2, fs: 27, c: 'yellow' }),
    arr([260, 335], [260, 290], { s: 2 }),
    box(20, 460, 480, 80, 'Validar reglas y compatibilidad', { s: 3, fs: 26, c: 'green' }),
  ], [
    'En sistemas expertos, un shell es un entorno reutilizable que aporta mecanismos para construir el sistema. El motor de inferencia permite aplicar reglas; no confundas este concepto con el intérprete de comandos de un sistema operativo.',
    'Las interfaces y herramientas pueden facilitar edición, ejecución y depuración. La ventaja principal es reutilizar esa infraestructura en lugar de programar cada componente desde cero, siempre que sus capacidades sean adecuadas para el problema.',
    'El conocimiento específico debe obtenerse y representarse para el dominio. Instalar un shell no convierte al sistema en experto automáticamente: todavía necesitás reglas pertinentes y datos con los que pueda trabajar el mecanismo de razonamiento.',
    'Evaluá compatibilidad, limitaciones, aprendizaje y condiciones de uso. Un shell puede reducir esfuerzo de implementación, pero no elimina la adquisición ni la validación del conocimiento. La conveniencia depende de los requisitos del sistema que querés desarrollar.',
  ], 520, 565)],
  'fia-final-e2': [scene([
    head('Pertenencia difusa y binaria'),
    plot(55, 65, 425, 280, [-1, 1], [-0.1, 1.1], { xl: 'valor', yl: 'pertenencia', fns: [
      { f: 'x<0?0:1', c: 'blue', t: 'Binaria', step: true },
      { f: 'max(0,min(1,(x+1)/2))', c: 'orange', t: 'Difusa ilustrativa', s: 1 },
    ] }),
    box(20, 385, 480, 75, 'Pertenencia gradual: 0 ≤ μ ≤ 1', { s: 2, fs: 26, c: 'yellow' }),
    box(20, 495, 480, 75, 'Grado de pertenencia ≠ probabilidad', { s: 3, fs: 25, c: 'green' }),
  ], [
    'En una clasificación binaria, un elemento pertenece o no pertenece al conjunto: los valores de pertenencia son cero y uno. El salto del gráfico representa ese corte tajante, sin estados intermedios de pertenencia.',
    'La curva difusa ilustrativa permite pertenencia gradual. Su forma depende de cómo se define el concepto y no es una función universal. Lo importante es que un elemento puede pertenecer a distintos conceptos con diferentes grados.',
    'La función de pertenencia toma valores entre cero y uno. Sirve para representar conceptos vagos, como una categoría lingüística cuyos límites no son tajantes. La graduación no significa que falten necesariamente datos sobre un hecho aleatorio.',
    'Separá pertenencia y probabilidad: una expresa cuánto encaja un valor en un concepto; la otra puede expresar incertidumbre sobre que ocurra un evento. Comparten un intervalo numérico posible, pero no tienen el mismo significado ni se interpretan igual.',
  ], 520, 595)],
  'fia-final-e3': [scene([
    head('La neurona artificial es un modelo'),
    box(20, 65, 480, 70, 'Neurona biológica: célula compleja', { fs: 25, c: 'green' }),
    box(20, 175, 180, 65, 'Entradas xi', { s: 1, fs: 25, id: 'input' }),
    box(300, 175, 200, 65, 'Pesos wi', { s: 1, fs: 25, c: 'yellow', id: 'weights' }),
    box(110, 300, 300, 70, 'z = Σ wi·xi + b', { s: 2, fs: 28, c: 'orange', id: 'sum' }),
    arr('input', 'sum', { s: 2 }), arr('weights', 'sum', { s: 2 }),
    box(110, 450, 300, 75, 'Salida = φ(z)', { s: 3, fs: 30, c: 'purple', id: 'output' }),
    arr('sum', 'output', { s: 3 }),
  ], [
    'La neurona biológica es una célula de un sistema nervioso y participa en procesos físicos y químicos complejos. La neurona artificial es una abstracción matemática inspirada en algunos aspectos de ese funcionamiento, sin reproducir toda su biología.',
    'En el modelo artificial, las entradas se multiplican por pesos. Esos pesos regulan la influencia de cada entrada y forman parte de los parámetros que un procedimiento de aprendizaje puede ajustar, según el tipo de red y entrenamiento.',
    'La suma ponderada y el sesgo producen un valor previo a la activación. El sesgo permite desplazar la respuesta. Esta operación es una descripción matemática del modelo, no una explicación completa de cómo funciona una célula real.',
    'La función de activación transforma el valor calculado en una salida. Distinguí suma y activación cuando elijas una opción: la suma combina entradas; la activación aplica la transformación final que define el comportamiento de esa neurona artificial.',
  ], 520, 555)],
  'fia-final-e4': [scene([
    head('Perceptrón y red multicapa'),
    box(20, 65, 480, 70, 'Una unidad: frontera lineal', { fs: 27, c: 'blue' }),
    ...[130, 300].map((y, i) => ico(70, y + 90, 'doc', { t: `x${i + 1}`, size: 50, s: 1, c: 'blue' })),
    box(200, 190, 130, 70, 'h1', { s: 1, id: 'h1', shape: 'circle', c: 'orange', fs: 26 }),
    box(200, 350, 130, 70, 'h2', { s: 1, id: 'h2', shape: 'circle', c: 'orange', fs: 26 }),
    ...[220, 390].flatMap((y) => [arr([100, y], 'h1', { s: 1 }), arr([100, y], 'h2', { s: 1 })]),
    box(390, 270, 100, 70, 'y', { s: 2, id: 'y', shape: 'circle', fs: 28, c: 'green' }),
    arr('h1', 'y', { s: 2 }), arr('h2', 'y', { s: 2 }),
    box(20, 470, 480, 80, 'La no linealidad cambia la capacidad', { s: 3, fs: 26, c: 'purple' }),
  ], [
    'Un perceptrón simple realiza una decisión basada en una combinación lineal de entradas. Su frontera es lineal, por lo que esa arquitectura no puede representar cualquier separación posible entre clases de datos.',
    'Una red multicapa introduce unidades intermedias que transforman las entradas. En el diagrama, las entradas alimentan las unidades de una capa oculta; los parámetros determinan qué transformación realiza cada unidad durante el procesamiento.',
    'La capa de salida combina las representaciones intermedias. Con activaciones no lineales, esta composición permite representar relaciones que una sola frontera lineal no alcanza. La mejora depende de la arquitectura y de cómo se entrena.',
    'Agregar muchas capas lineales sin activaciones no lineales sigue produciendo una transformación lineal. Por eso no alcanza con contar neuronas: mirá qué operaciones se componen. La mayor capacidad tampoco garantiza un aprendizaje correcto con cualquier conjunto de datos.',
  ], 520, 580)],
  'fia-final-e5': [scene([
    head('Algoritmo genético: operadores'),
    bits(20, 80, 480, [{ t: 'A1' }, { t: 'A2' }, { t: 'A3' }, { t: 'A4' }], { h: 55, fs: 25, title: 'Padre A · seleccionado' }),
    bits(20, 185, 480, [{ t: 'B1', c: 'green' }, { t: 'B2', c: 'green' }, { t: 'B3', c: 'green' }, { t: 'B4', c: 'green' }], { h: 55, fs: 25, title: 'Padre B · seleccionado' }),
    bits(20, 295, 480, [{ t: 'A1' }, { t: 'A2' }, { t: 'B3', c: 'green' }, { t: 'B4', c: 'green' }], { s: 1, h: 55, fs: 25, title: 'Cruce: combina material de los padres' }),
    bits(20, 405, 480, [{ t: 'A1' }, { t: 'A2' }, { t: 'C3', c: 'purple' }, { t: 'B4', c: 'green' }], { s: 2, h: 55, fs: 25, title: 'Mutación: cambia un componente' }),
    box(20, 505, 480, 75, 'Evaluar la calidad de la descendencia', { s: 3, fs: 25, c: 'orange' }),
  ], [
    'La selección elige candidatos que participan como padres, según el procedimiento del algoritmo y su evaluación. Las letras del dibujo son etiquetas de genes para mostrar los operadores; no representan un resultado de fitness calculado ni datos de un examen.',
    'El cruce combina material de los padres para producir descendencia. En el esquema, una parte proviene de cada uno. Que el hijo combine buenos padres no garantiza que resulte mejor: su calidad debe evaluarse con la función del problema.',
    'La mutación modifica componentes y puede introducir diversidad. Su probabilidad y su forma son parámetros o decisiones de diseño: no existe un porcentaje universal obligatorio. Distinguí cambiar un componente de combinar fragmentos de dos padres mediante cruce.',
    'Después se evalúan los descendientes y se decide cómo formar la siguiente población. Separá selección, cruce y mutación por su función. El algoritmo busca soluciones de calidad, pero cada operador aislado no garantiza alcanzar el óptimo.',
  ], 520, 605)],
  'fia-final-e6': [scene([
    head('Memético: explorar y refinar'),
    box(25, 65, 470, 80, 'Población: distintas soluciones', { fs: 27, c: 'blue' }),
    box(25, 195, 470, 80, 'Evolución: explorar alternativas', { s: 1, fs: 26, c: 'orange' }),
    arr([260, 145], [260, 189], { s: 1 }),
    box(25, 325, 470, 80, 'Búsqueda local: refinar candidatos', { s: 2, fs: 26, c: 'green' }),
    arr([260, 275], [260, 319], { s: 2 }),
    box(25, 455, 470, 90, 'Balancear calidad, diversidad\ny costo computacional', { s: 3, fs: 26, c: 'purple' }),
    arr([260, 405], [260, 449], { s: 3 }),
  ], [
    'Un algoritmo evolutivo trabaja con una población de soluciones y operadores que generan variación. La comparación con un memético debe centrarse en qué mecanismos incorpora; no confundas evolución con una búsqueda exhaustiva de todas las soluciones posibles.',
    'La exploración permite recorrer zonas diferentes del espacio de soluciones. Mantener diversidad puede ayudar a evitar que toda la población quede concentrada demasiado pronto en una región que no contiene la mejor solución del problema.',
    'El algoritmo memético agrega búsqueda local para refinar candidatos. Esa fase explota la vecindad de soluciones prometedoras y combina su mejora con el proceso evolutivo. Es la diferencia central frente al esquema evolutivo sin ese refinamiento local explícito.',
    'La hibridación puede mejorar resultados, pero agrega costo y decisiones de diseño. Refinar todo sin límite puede reducir diversidad o gastar demasiado tiempo. Evaluá el balance entre exploración y explotación; no afirmes una superioridad automática para todos los problemas.',
  ], 520, 575)],
  'fia-final-e7': [scene([
    head('Agente: percibir y actuar'),
    box(20, 65, 480, 65, 'Entorno', { id: 'env', fs: 28, c: 'gray' }),
    box(20, 195, 215, 75, 'Sensores', { id: 'sens', s: 1, fs: 27, c: 'cyan' }),
    box(285, 195, 215, 75, 'Actuadores', { id: 'act', s: 2, fs: 27, c: 'orange' }),
    arr('env', 'sens', { s: 1 }), arr('act', 'env', { s: 2 }),
    box(120, 365, 280, 80, 'Agente: decide', { id: 'agent', s: 1, fs: 28, c: 'green' }),
    arr('sens', 'agent', { s: 1 }), arr('agent', 'act', { s: 2 }),
    box(20, 490, 480, 90, 'La arquitectura depende\nde memoria, objetivos y aprendizaje', { s: 3, fs: 25, c: 'purple' }),
  ], [
    'Un agente interactúa con un entorno. Para analizar un ejemplo, identificá qué puede percibir y qué acciones puede producir. No alcanza con que un programa muestre una respuesta: necesitás describir su relación con el medio y la tarea.',
    'Los sensores aportan percepciones y el agente utiliza un mecanismo para decidir. Un agente reactivo simple puede responder a la percepción actual mediante reglas, mientras otras arquitecturas incorporan memoria o un modelo que representa aspectos del entorno.',
    'Los actuadores ejecutan acciones que afectan el entorno y generan nuevas percepciones. Así se forma un ciclo. Un agente de interfaz puede ayudar al usuario en tareas de interacción; el contexto determina qué entradas recibe y qué acciones están disponibles.',
    'Las clasificaciones resaltan propiedades diferentes: autonomía, colaboración, memoria, objetivos o aprendizaje. Evitá tratarlas como nombres necesariamente excluyentes. Justificá el tipo de agente con su mecanismo de decisión y la función que cumple en el ejemplo.',
  ], 520, 610)],
  'fia-final-e8': [scene([
    head('Robótica: la incertidumbre importa'),
    box(25, 65, 470, 80, 'Sensores: observaciones incompletas', { fs: 26, c: 'blue' }),
    box(25, 195, 470, 80, 'Modelo: puede fallar al generalizar', { s: 1, fs: 25, c: 'yellow' }),
    arr([260, 145], [260, 189], { s: 1 }),
    box(25, 325, 470, 80, 'Decisión: considerar consecuencias', { s: 2, fs: 25, c: 'orange' }),
    arr([260, 275], [260, 319], { s: 2 }),
    box(25, 455, 470, 90, 'Verificación y supervisión\nsegún el riesgo de la tarea', { s: 3, fs: 26, c: 'green' }),
    arr([260, 405], [260, 449], { s: 3 }),
  ], [
    'En robótica, las decisiones dependen de observaciones del mundo físico que pueden ser incompletas o ruidosas. Al analizar limitaciones, distinguí percepción, razonamiento y acción. Un error temprano puede propagarse y afectar una operación posterior del sistema.',
    'Un modelo entrenado bajo ciertas condiciones puede comportarse peor fuera de ellas. Esa dificultad de generalización exige evaluar escenarios relevantes, sin suponer que un buen resultado en un entorno controlado garantiza el mismo comportamiento en cualquier situación.',
    'Las acciones tienen consecuencias físicas y pueden afectar a personas u otros objetos. Por eso la calidad de una decisión incluye restricciones de la tarea y sus riesgos. Una respuesta plausible del modelo no demuestra que una acción sea apropiada.',
    'La evaluación, las restricciones operativas y la supervisión se eligen según el riesgo. Esta es una forma concreta de explicar desafíos de la robótica sin hacer afirmaciones absolutas sobre lo que todos los sistemas actuales pueden o no pueden hacer.',
  ], 520, 575)],
};

const cases = [
  ['m5', 'Shell de un sistema experto', '¿Qué aporta un shell para desarrollar un sistema experto?', ['Infraestructura reutilizable, a la que se incorpora conocimiento del dominio', 'Conocimiento completo de cualquier especialidad', 'Garantía de que las reglas sean correctas'], 0],
  ['m6', 'Lógica difusa y binaria', 'Compará pertenencia binaria y difusa. ¿Qué afirmación distingue correctamente sus significados?', ['La pertenencia difusa es siempre la probabilidad de un evento', 'La difusa admite grados de pertenencia; la binaria usa pertenencia o no pertenencia', 'La binaria admite todos los grados intermedios'], 1],
  ['m7', 'Neurona artificial y biológica', '¿Cómo interpretás una neurona artificial frente a una biológica?', ['Es una célula real instalada en una computadora', 'Reproduce toda la complejidad biológica de la célula', 'Es un modelo matemático simplificado con entradas, pesos y activación'], 2],
  ['m8', 'Capacidad de una red multicapa', '¿Qué permite superar la limitación de una única frontera lineal?', ['Componer capas con activaciones no lineales', 'Agregar capas exclusivamente lineales', 'Eliminar todas las entradas'], 0],
  ['m9', 'Operadores genéticos', '¿Qué relación entre operador y función es correcta?', ['Mutación: elegir siempre los padres de mayor fitness', 'Cruce: combinar material de padres; mutación: introducir cambios en componentes', 'Selección: garantizar una descendencia mejor'], 1],
  ['m10', 'Memético frente a evolutivo', '¿Cuál es la diferencia principal que introduce un algoritmo memético?', ['Elimina toda exploración', 'Busca exhaustivamente todas las soluciones', 'Combina evolución con refinamiento mediante búsqueda local'], 2],
  ['m11', 'Tipos de agentes', '¿Qué secuencia describe la interacción básica de un agente con su entorno?', ['Percepción, decisión y acción mediante actuadores', 'Acción sin percepción ni tarea', 'Almacenamiento sin ninguna interacción'], 0],
  ['m12', 'Desafíos de la robótica', 'Un robot funciona en un escenario controlado. ¿Qué conclusión corresponde al evaluarlo en un entorno diferente?', ['Ya está garantizado su rendimiento', 'Hay que evaluar generalización, percepción y riesgos de sus acciones', 'La evaluación deja de ser necesaria'], 1],
] as const;

export const FINAL_EXERCISES: WorkedExercise[] = cases.map(([module, title, prompt, options, answer], i) => ({
  id: `fia-final-e${i + 1}`, module, title: `Final resuelto · ${i + 1}: ${title}`,
  statement: `${prompt}\n${options.map((o, j) => `${String.fromCharCode(65 + j)}) ${o}`).join('\n')}`,
  steps: FINAL_SCENES[`fia-final-e${i + 1}`][0].say.map((body, k) => ({ title: `Paso ${k + 1}`, body })), result: `Correcta: ${options[answer]}.`,
}));
export const FINAL_QUESTIONS: Question[] = cases.map(([module, , prompt, options, answer], i) => ({
  id: `fia-final-q${i + 1}`, module, type: 'mcq', prompt, options: [...options], answer,
  explain: FINAL_SCENES[`fia-final-e${i + 1}`][0].say.join(' '), vis: FINAL_SCENES[`fia-final-e${i + 1}`][0].v,
  source: 'final anterior, adaptación y resolución propias',
}));
