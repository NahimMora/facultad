import { POCKET } from '../cheatsheets';
import type { Question, SubjectContent, TheoryBlock, WorkedExercise } from '../types';
import { VIDEOS } from '../videos/fia';
import { EX_SCENES, SCENES } from '../visual/fia';
import { FINAL_EXERCISES, FINAL_QUESTIONS, FINAL_SCENES } from '../visual/fia-final';
import { REVIEW_LESSONS, REVIEW_QUESTIONS } from '../visual/fia-repaso';

/** FIA · final (módulos 1 a 12). Redacción propia sobre los apuntes de la cátedra y los temas de finales 2023–2025. */
const F = 'finales anteriores (Drive de estudiantes)';

const theory: TheoryBlock[] = [
  { id: 'f1', module: 'm1', title: 'Qué es la IA y cómo evolucionó', points: [
    'IA: intenta **comprender** las entidades inteligentes y **construirlas**. Rich: hacer que una computadora realice tareas en las que, por ahora, el humano se desempeña mejor.',
    '**Leyes de la robótica de Asimov (1942):** no dañar a un humano (ni permitirlo por inacción); obedecer salvo conflicto con la 1ª; protegerse salvo conflicto con la 1ª o 2ª.',
    'Evolución: años 50, problemas concretos y fijos (juegos: ajedrez, damas) → años 80, **aprendizaje automático** (aprende del feedback del ambiente) → ~2010, **aprendizaje profundo**.',
    '**IA ⊃ Machine Learning ⊃ Deep Learning.** En ML el usuario define las características; en DL el algoritmo **aprende solo qué atributos importan** (redes neuronales multicapa).',
    'ML se divide en **supervisado, no supervisado y por refuerzo**.',
  ] },
  { id: 'f2', module: 'm2', title: 'Relación con otras ciencias', points: [
    'La IA toma de la **filosofía** (razonamiento, lógica), la **matemática** (lógica formal, probabilidad, computabilidad), la **psicología** y **neurociencia** (cómo piensa y aprende el cerebro), la **lingüística** (lenguaje natural) y la **ingeniería** (computadoras, control).',
    'Aplicaciones del apunte: deportes (análisis de rendimiento; Deep Blue venciendo a Kasparov), medicina, finanzas, industria.',
  ] },
  { id: 'f3', module: 'm3', title: 'Problemas, espacio de estados y búsqueda', points: [
    '**Problema:** una entidad **desea algo y no conoce la secuencia de acciones** para obtenerlo. Se define con estado inicial, operadores y estado meta.',
    'El **árbol de espacio de estados** contiene todas las posibilidades; cada método de búsqueda genera solo una porción (el **árbol de exploración**).',
    '**Búsqueda no informada (ciega, débil):** **profundidad** (baja por una rama hasta el fondo) y **amplitud** (recorre nivel por nivel).',
    '**Búsqueda informada (heurística, fuerte):** usa información adicional para ser más eficiente: **ascenso en colina**, **búsqueda en haz** y **primero el mejor**.',
    'Amplitud es **completa** y, con costos uniformes, **óptima** (encuentra el camino más corto) pero gasta mucha memoria. Profundidad gasta poca memoria pero **no es completa** (puede perderse en una rama infinita) **ni óptima**.',
    'Representación del conocimiento: **redes semánticas** (nodos y arcos rotulados), **guiones**, **marcos** (frames) y **reglas de producción** (IF-THEN).',
  ], table: { head: ['', 'Amplitud (BFS)', 'Profundidad (DFS)'], rows: [['Recorre', 'nivel por nivel', 'una rama hasta el fondo'], ['Completa', 'sí', 'no (ramas infinitas)'], ['Óptima (costos uniformes)', 'sí', 'no'], ['Memoria', 'mucha', 'poca']] }, trap: 'Pregunta de final dic-2025: contrastar BFS y DFS y decir cuál es completa y cuál óptima.' },
  { id: 'f4', module: 'm4', title: 'Programación lógica: Prolog', points: [
    'Un programa Prolog es un conjunto de **hechos** y **reglas** que representan el conocimiento de un dominio; se usa haciendo **consultas**.',
    '**Hecho:** afirmación incondicional (`padre(juan, ana).`). **Regla:** conclusión condicionada (`abuelo(X,Z) :- padre(X,Y), padre(Y,Z).`). Las **variables** empiezan con mayúscula.',
    'Mecanismos: **unificación** (hacer coincidir términos), **instanciación** (asignar temporalmente valores a variables) y **retroceso o backtracking** (si falla una unificación, vuelve atrás y prueba otra).',
    'Otro lenguaje del paradigma lógico/funcional: **Lisp**.',
  ] },
  { id: 'f5', module: 'm5', title: 'Sistemas basados en conocimiento y sistemas expertos', points: [
    '**Sistema experto:** software que **simula la conducta de un experto humano** resolviendo problemas de un dominio. Es un tipo de **sistema basado en conocimiento**.',
    'Arquitectura (4 componentes): **base de reglas** (conocimiento del dominio en reglas IF-THEN), **motor de inferencias** (razona), **memoria de trabajo** (hechos del caso actual) y **trazador de explicaciones** (responde cómo y por qué llegó a la conclusión).',
    '**Encadenamiento hacia adelante:** dirigido por los **datos**: dispara las reglas cuyos **antecedentes** son verdaderos. **Hacia atrás:** dirigido por el **objetivo**: verifica los **consecuentes**.',
    'Roles: **ingeniero del conocimiento** (sabe extraer el conocimiento y volcarlo), **experto humano**, **programadores** y **usuario final**.',
    'Metodología: **adquisición** del conocimiento → **conceptualización** (enunciación, parametrización y causalidad: árbol de causalidad) → **formalización** (el árbol se transforma en **reglas IF-THEN**) → **implementación** (con un **shell**) → **validación**.',
    '**Shell:** sistema experto ya codificado con la base de reglas vacía; facilita y abarata el desarrollo (herramientas, depuración, reutilización), pero tiene costo y curva de aprendizaje.',
  ], trap: 'Final dic-2025: "¿en qué etapa el conocimiento (árboles de causalidad) pasa a reglas IF-THEN?" → **formalización**.' },
  { id: 'f6', module: 'm6', title: 'Razonamiento aproximado: lógica difusa y probabilidad', points: [
    'Sirve para tratar la **incertidumbre**: el mundo real tiene grises, no solo verdadero o falso.',
    '**Lógica binaria (clásica):** dos valores. **Lógica difusa (borrosa):** el valor de verdad se gradúa en el intervalo **[0, 1]**.',
    '**Conjunto difuso:** se define con una **función de pertenencia** fA(x) ∈ [0, 1] (ej.: "alta" para la variable lingüística estatura).',
    'Proceso: **fuzzificación** (valor nítido → grados de pertenencia), **inferencia** con reglas difusas y **defuzzificación** (de un conjunto difuso a un valor nítido; por ejemplo, la media de los máximos, MOM).',
    'Probabilidad: **redes bayesianas** (grafo acíclico dirigido con variables y dependencias condicionales). También existieron los **factores de certeza**, hoy superados por las redes probabilísticas.',
  ], trap: 'Completar del final: "la graduación del valor de verdad se establece en el intervalo **[0, 1]**".' },
  { id: 'f7', module: 'm7', title: 'Redes neuronales artificiales', points: [
    'Analogía (inspiración, no copia): **dendritas → entradas**, **sinapsis → pesos**, núcleo → procesamiento, **axón → salida**.',
    'Cálculo: `Net = Σ xᵢ·wᵢ` (+ bias) → **función de activación** (no lineal: escalón, sigmoide…) → salida. Si alcanza el **umbral** se activa.',
    'Capas: **entrada y salida siempre**; **ocultas opcionales**. Topología = capas + neuronas por capa + conexiones. Conexiones **hacia adelante** o **recurrentes** (no confundir con backpropagation, que es un algoritmo de entrenamiento).',
    '**Aprendizaje = modificar los pesos.** **Supervisado** (hay respuesta deseada; corrección del error: perceptrón, Adaline, backpropagation; o por refuerzo: éxito/fracaso), **no supervisado** (se autoorganiza: Hopfield, ART) y **por refuerzo**.',
  ], trap: 'Final dic-2025: el proceso que toma la suma ponderada y le aplica una función no lineal es la **función de activación** (la suma sola es la función de suma).' },
  { id: 'f8', module: 'm8', title: 'Perceptrón', points: [
    'Neurona con entradas, pesos y una entrada fija en 1 con peso **bias**; salida escalón: clase 1 o clase 2.',
    'Aprendizaje supervisado por corrección del error: `w(nuevo) = w(viejo) + α · error · xᵢ`. Termina con una pasada sin ajustes.',
    'Encuentra una **función discriminante lineal**: solo **2 clases** y problemas **linealmente separables** (AND sí, **XOR no**).',
    'Datos: ~2/3 entrenamiento y 1/3 validación; luego fase de operación.',
    '**Perceptrón multicapa:** varias capas (con ocultas) → problemas **no linealmente separables** y **más de dos clases**.',
  ] },
  { id: 'f9', module: 'm9', title: 'Algoritmos evolutivos y genéticos', points: [
    'Inspirados en **Darwin**: selección natural y supervivencia del más apto. Son métodos de **búsqueda y optimización**.',
    'Componentes: **población** de individuos (soluciones), **cromosoma** (vector de **genes**) y **función de fitness** (aptitud).',
    'Operadores: **selección** (elige padres), **cruce/reproducción** (mezcla genes; los hijos pueden ser mejores, iguales o peores) y **mutación** (baja probabilidad; aporta **diversidad** y evita estancarse en óptimos locales; no garantiza mejora).',
    'Reemplazo **destructivo** (solo hijos) o **constructivo** (los mejores entre padres e hijos). Fin: fitness buscado o N generaciones; no garantiza el óptimo global.',
  ], trap: 'Completar del final: "el operador de **mutación** introduce diversidad y evita el estancamiento prematuro".' },
  { id: 'f10', module: 'm10', title: 'Algoritmos meméticos (híbridos)', points: [
    '**Meme** (Dawkins, 1976): unidad de información cultural. **Algoritmo memético = evolutivo + búsqueda local**.',
    'Búsca equilibrar **exploración** (global, la hace bien el evolutivo) y **explotación** (refinar buenas soluciones, la hace la búsqueda local).',
    '**Lamarck:** lo aprendido se hereda (el individuo se reemplaza por su mejor vecino). **Baldwin:** no se hereda el genotipo, solo el **fitness** del mejor vecino.',
    'Riesgo: **convergencia prematura** (la búsqueda local la agrava): hay que preservar diversidad.',
  ], trap: 'V/F del final: los meméticos se diferencian de los evolutivos puros por incorporar una fase de **búsqueda local** para la explotación → **V**.' },
  { id: 'f11', module: 'm11', title: 'Agentes inteligentes', points: [
    '**Agente:** percibe su ambiente con **sensores** y actúa con **efectores** (un programa que lo hace es un **softbot**).',
    '**Racional:** hace lo que maximiza su medida de rendimiento según lo que percibe y sabe (no es omnisciente). **Autónomo:** su accionar depende de su propia experiencia.',
    '**Reactivo:** responde directamente a estímulos. **Inteligente:** decide de forma autónoma y **razonada** con técnicas de IA (planifica).',
    '**Multiagente:** varios agentes que se comunican intencionalmente (informar, consultar, pedir, aceptar).',
  ] },
  { id: 'f12', module: 'm12', title: 'Robótica', points: [
    '**Automatización** es más amplia: procesos (o partes) que se ejecutan **sin intervención humana**, con aplicaciones y máquinas. La **robótica** es un caso más específico.',
    'Un **robot** es una máquina controlada por una aplicación informática: **hardware** (cuerpo, motores o actuadores, sensores) y **software** (el "cerebro").',
    'Clasificaciones: por **finalidad** (tarea específica o general), por generación o desarrollo tecnológico, por tipo de brazo (por ejemplo **SCARA**: varios grados de libertad casi en un plano, rápido, para recoger y colocar).',
  ], trap: 'V/F del final dic-2025: "la robótica es más específica que la automatización, ya que la automatización incluye planificación y programación de máquinas, mientras que la robótica solo se refiere a procesos sin intervención humana" → **F**: es al revés, la **automatización** es la que se define por procesos sin intervención humana.' },
];

const questions: Question[] = [
  { id: 'fia-01', module: 'm3', type: 'mcq', prompt: 'En IA, un **problema** se define como una situación en la que una entidad:', options: ['Tiene un objetivo y no conoce de antemano la secuencia de acciones para alcanzarlo', 'Carece de sensores', 'Solo puede resolverse con lógica difusa', 'No dispone de una base de conocimiento completa'], answer: 0, explain: 'La definición del apunte: la entidad **desea algo y no sabe cómo obtenerlo** (no conoce los pasos).', source: F },
  { id: 'fia-02', module: 'm7', type: 'mcq', prompt: '¿Qué proceso toma la **suma ponderada** de las entradas y le aplica una **función no lineal** para obtener la salida de la neurona?', options: ['Función de activación', 'Función de suma', 'Búsqueda local', 'Sesgo (bias)'], answer: 0, explain: 'La suma ponderada (Net) es la función de suma; la **función de activación** transforma ese valor (escalón, sigmoide) en la salida.', source: F },
  { id: 'fia-03', module: 'm10', type: 'mcq', prompt: 'La hibridación que origina los **algoritmos meméticos** busca mejorar el balance entre:', options: ['Exploración del espacio de soluciones y explotación de las buenas soluciones', 'Razonamiento lógico y probabilístico', 'Agentes reactivos y basados en modelos', 'Hardware neuronal y software convencional'], answer: 0, explain: 'El evolutivo **explora** globalmente; la búsqueda local **explota** (refina) las buenas soluciones. El memético combina ambas.', source: F },
  { id: 'fia-04', module: 'm5', type: 'tf', prompt: 'El encadenamiento hacia adelante está dirigido por los datos: comprueba el cumplimiento de los antecedentes de las reglas IF-THEN.', answer: true, explain: 'Hacia adelante = **datos → conclusiones** (dispara reglas con antecedentes verdaderos). Hacia atrás parte del objetivo y verifica consecuentes.', source: F },
  { id: 'fia-05', module: 'm10', type: 'tf', prompt: 'La principal diferencia de los algoritmos meméticos con los evolutivos "puros" es que incorporan una fase de búsqueda local para refinar las soluciones prometedoras.', answer: true, explain: 'Memético = evolutivo + **búsqueda local** (explotación).', source: F },
  { id: 'fia-06', module: 'm5', type: 'mcq', prompt: '¿En qué etapa del desarrollo de un sistema experto se transforma el conocimiento (árboles de causalidad) en **reglas IF-THEN**?', options: ['Formalización', 'Adquisición', 'Conceptualización', 'Validación'], answer: 0, explain: 'Adquisición → conceptualización (árbol de causalidad) → **formalización** (reglas IF-THEN) → implementación (shell) → validación.', source: F },
  { id: 'fia-07', module: 'm5', type: 'mcq', prompt: 'El componente que contiene las reglas de producción del dominio, núcleo del conocimiento de un sistema experto, es:', options: ['La base de reglas (base de conocimiento)', 'El motor de inferencias', 'La memoria de trabajo', 'El trazador de explicaciones'], answer: 0, explain: 'La **base de reglas** guarda el conocimiento del experto; el motor razona, la memoria de trabajo tiene los hechos del caso y el trazador explica.', source: F },
  { id: 'fia-08', module: 'm5', type: 'mcq', prompt: 'Un **shell** de sistema experto es:', options: ['Un sistema experto ya codificado con la base de reglas vacía', 'El experto humano', 'La interfaz gráfica', 'Una red neuronal'], answer: 0, explain: 'Con un shell solo hay que cargar las reglas respetando su notación: abarata el desarrollo, aunque tiene costo y curva de aprendizaje.', source: F },
  { id: 'fia-09', module: 'm5', type: 'mcq', prompt: '¿Quién sabe adquirir el conocimiento del experto y volcarlo en un sistema experto?', options: ['El ingeniero del conocimiento', 'El usuario final', 'El programador del shell', 'El motor de inferencias'], answer: 0, explain: 'El **ingeniero del conocimiento** es el informático que extrae y estructura el conocimiento del experto humano.' },
  { id: 'fia-10', module: 'm3', type: 'mcq', prompt: 'Con costos uniformes, ¿qué búsqueda es **completa y óptima**?', options: ['Amplitud', 'Profundidad', 'Ascenso en colina', 'Búsqueda en haz'], answer: 0, explain: 'Amplitud recorre nivel por nivel: si hay solución la encuentra (completa) y la primera es la más corta (óptima). Profundidad puede perderse en ramas infinitas.', source: F },
  { id: 'fia-11', module: 'm3', type: 'mcq', prompt: '¿Cuál de estos métodos es de búsqueda **informada** (heurística)?', options: ['Primero el mejor', 'Amplitud', 'Profundidad', 'Ninguno: todos son ciegos'], answer: 0, explain: 'Informados según el apunte: ascenso en colina, búsqueda en haz y **primero el mejor**. Amplitud y profundidad son ciegos.' },
  { id: 'fia-12', module: 'm3', type: 'mcq', prompt: 'Técnica de representación del conocimiento con nodos y arcos rotulados:', options: ['Redes semánticas', 'Marcos', 'Guiones', 'Reglas de producción'], answer: 0, explain: 'Las **redes semánticas** son grafos rotulados; los marcos son estructuras con ranuras (slots); las reglas son IF-THEN.' },
  { id: 'fia-13', module: 'm4', type: 'mcq', prompt: 'En Prolog, cuando una unificación fracasa y el intérprete vuelve atrás para probar otra alternativa, se llama:', options: ['Retroceso (backtracking)', 'Instanciación', 'Unificación', 'Encadenamiento hacia adelante'], answer: 0, explain: 'El **retroceso** permite explorar alternativas. La instanciación asigna valores a variables y la unificación hace coincidir términos.' },
  { id: 'fia-14', module: 'm4', type: 'tf', prompt: 'En Prolog las variables se escriben comenzando con mayúscula.', answer: true, explain: 'Convención de Prolog: `X`, `Persona` son variables; `juan`, `ana` son átomos (constantes).' },
  { id: 'fia-15', module: 'm6', type: 'mcq', prompt: 'En lógica difusa, ¿en qué intervalo se gradúa el valor de verdad?', options: ['[0, 1]', '{0, 1}', '[−1, 1]', '[0, 100]'], answer: 0, explain: 'La lógica difusa admite cualquier grado en el intervalo **[0, 1]**; la clásica solo {0, 1}.', source: F },
  { id: 'fia-16', module: 'm6', type: 'mcq', prompt: 'La diferencia entre lógica difusa y binaria es que la difusa:', options: ['Permite trabajar con información imprecisa, con grados de verdad', 'Solo admite verdadero o falso', 'No usa reglas', 'Es más antigua'], answer: 0, explain: 'La binaria (aristotélica) admite dos valores; la difusa cuantifica la incertidumbre con grises.', source: F },
  { id: 'fia-17', module: 'm6', type: 'mcq', prompt: 'Obtener un valor nítido a partir de un conjunto difuso se llama:', options: ['Defuzzificación', 'Fuzzificación', 'Inferencia', 'Normalización'], answer: 0, explain: 'Fuzzificación: nítido → difuso. **Defuzzificación** (nitidificación): difuso → nítido, por ejemplo con la media de los máximos.' },
  { id: 'fia-18', module: 'm7', type: 'mcq', prompt: 'En la analogía con la neurona biológica, los **pesos** corresponden a:', options: ['Las sinapsis', 'Las dendritas', 'El axón', 'El núcleo'], answer: 0, explain: 'Dendritas → entradas, **sinapsis → pesos**, núcleo → procesamiento, axón → salida.' },
  { id: 'fia-19', module: 'm7', type: 'tf', prompt: 'En una red neuronal, las capas ocultas son obligatorias.', answer: false, explain: 'Entrada y salida siempre; las **ocultas son opcionales** (las necesita, por ejemplo, el perceptrón multicapa).' },
  { id: 'fia-20', module: 'm7', type: 'mcq', prompt: 'El aprendizaje en una red neuronal consiste en:', options: ['Modificar los pesos de las conexiones', 'Agregar entradas', 'Cambiar la función de activación en cada paso', 'Eliminar la capa de salida'], answer: 0, explain: 'Aprender = **ajustar pesos** (crear, modificar o eliminar conexiones; peso 0 = conexión destruida).' },
  { id: 'fia-21', module: 'm7', type: 'mcq', prompt: '¿Qué paradigma de aprendizaje **no** usa respuestas deseadas y deja que la red se autoorganice?', options: ['No supervisado', 'Supervisado', 'Por corrección del error', 'Perceptrón'], answer: 0, explain: 'El **no supervisado** encuentra estructura sola (clustering: Hopfield, ART). Supervisado tiene respuestas deseadas; refuerzo solo éxito o fracaso.' },
  { id: 'fia-22', module: 'm8', type: 'mcq', prompt: 'Un perceptrón simple **no** puede resolver XOR porque:', options: ['Solo encuentra fronteras lineales y XOR no es linealmente separable', 'Le faltan datos de entrenamiento', 'No tiene bias', 'Usa función sigmoide'], answer: 0, explain: 'Su salida es una **función discriminante lineal** (una recta): XOR necesita más de una. Lo resuelve un **perceptrón multicapa**.' },
  { id: 'fia-23', module: 'm8', type: 'mcq', prompt: 'La mejora de usar **múltiples perceptrones** en capas es que:', options: ['Pueden reconocer más de dos clases y problemas no linealmente separables', 'Entrenan más rápido siempre', 'No necesitan datos', 'Eliminan el bias'], answer: 0, explain: 'Un perceptrón divide el plano en dos; varios en capas reconocen **más zonas**.', source: F },
  { id: 'fia-24', module: 'm8', type: 'mcq', prompt: 'Regla de aprendizaje del perceptrón:', options: ['w(nuevo) = w(viejo) + α · error · x', 'w(nuevo) = w(viejo) · x', 'w(nuevo) = error / α', 'w(nuevo) = 0'], answer: 0, explain: 'Corrección del error: el peso se mueve en proporción al error, la tasa α y la entrada.' },
  { id: 'fia-25', module: 'm9', type: 'mcq', prompt: 'Los operadores de un algoritmo genético son:', options: ['Selección, cruce y mutación', 'Unificación, instanciación y retroceso', 'Fuzzificación e inferencia', 'Percepción y acción'], answer: 0, explain: '**Selección** elige padres, **cruce** mezcla sus genes y **mutación** introduce cambios al azar.', source: F },
  { id: 'fia-26', module: 'm9', type: 'mcq', prompt: 'El operador que introduce **diversidad** y evita el estancamiento prematuro en óptimos locales es:', options: ['Mutación', 'Selección', 'Cruce', 'Reemplazo'], answer: 0, explain: 'La **mutación** cambia genes con baja probabilidad: no garantiza mejora, pero mantiene diversidad.', source: F },
  { id: 'fia-27', module: 'm9', type: 'tf', prompt: 'La mutación siempre mejora el fitness del individuo.', answer: false, explain: 'Puede empeorarlo: su función es **aportar diversidad**, no mejorar.' },
  { id: 'fia-28', module: 'm9', type: 'mcq', prompt: 'En un algoritmo genético, la **función fitness**:', options: ['Mide la aptitud de cada individuo (qué tan buena es la solución)', 'Elige al azar el cromosoma', 'Mezcla genes', 'Define el número de generaciones'], answer: 0, explain: 'El fitness evalúa cada solución; la selección usa ese valor para elegir padres.' },
  { id: 'fia-29', module: 'm10', type: 'mcq', prompt: 'En el enfoque **baldwiniano** de los meméticos:', options: ['El individuo recibe el fitness del mejor vecino, pero no se modifica su genotipo', 'El individuo se reemplaza por su mejor vecino', 'No hay búsqueda local', 'Se eliminan las mutaciones'], answer: 0, explain: 'Baldwin: lo aprendido **no** se hereda (solo cambia el fitness). Lamarck: se hereda (el individuo se reemplaza por su mejor vecino).' },
  { id: 'fia-30', module: 'm11', type: 'tf', prompt: 'Un agente inteligente se define por su capacidad de razonar y planificar, a diferencia de un agente puramente reactivo que solo responde a estímulos directos.', answer: true, explain: 'El reactivo responde directamente; el **inteligente** decide de forma autónoma y razonada usando técnicas de IA.', source: F },
  { id: 'fia-31', module: 'm11', type: 'mcq', prompt: 'Un agente percibe su ambiente mediante ____ y actúa mediante ____.', options: ['sensores / efectores', 'efectores / sensores', 'pesos / bias', 'reglas / hechos'], answer: 0, explain: 'Definición de agente: **sensores** para percibir y **efectores** (actuadores) para actuar.' },
  { id: 'fia-32', module: 'm11', type: 'tf', prompt: 'Un agente racional nunca se equivoca.', answer: false, explain: 'Racional ≠ omnisciente: maximiza su rendimiento **con lo que percibe y sabe**, y puede equivocarse.' },
  { id: 'fia-33', module: 'm12', type: 'tf', prompt: 'La robótica es más amplia que la automatización.', answer: false, explain: 'Es al revés: la **automatización** es más amplia (procesos sin intervención humana); la robótica es un caso específico.', source: F },
  { id: 'fia-34', module: 'm12', type: 'mcq', prompt: 'Los componentes de un robot se agrupan en:', options: ['Hardware (cuerpo, motores, sensores) y software', 'Solo sensores', 'Base de reglas y motor de inferencias', 'Población y fitness'], answer: 0, explain: 'Un robot es una máquina controlada por una aplicación: **hardware** y **software** (el "cerebro").' },
  { id: 'fia-35', module: 'm1', type: 'mcq', prompt: '¿Qué relación hay entre IA, Machine Learning y Deep Learning?', options: ['IA ⊃ ML ⊃ DL', 'DL ⊃ ML ⊃ IA', 'Son tres áreas independientes', 'ML ⊃ IA ⊃ DL'], answer: 0, explain: 'La IA es lo más amplio; el aprendizaje automático es un subconjunto y el profundo, un subconjunto del automático.' },
  { id: 'fia-36', module: 'm1', type: 'mcq', prompt: 'A diferencia del Machine Learning clásico, en Deep Learning:', options: ['El algoritmo aprende solo qué atributos son importantes', 'El usuario define todas las características', 'No se usan redes neuronales', 'Solo hay aprendizaje supervisado'], answer: 0, explain: 'En DL la red multicapa **selecciona los atributos** por sí misma; en ML el usuario los define.' },
  { id: 'fia-37', module: 'm1', type: 'mcq', prompt: 'La primera ley de la robótica de Asimov dice que:', options: ['Un robot no puede dañar a un humano ni permitir por inacción que sufra daño', 'Un robot debe protegerse siempre', 'Un robot debe obedecer cualquier orden', 'Un robot no puede aprender'], answer: 0, explain: 'Orden de prioridad: 1) no dañar humanos, 2) obedecer, 3) protegerse.' },
];

const exercises: WorkedExercise[] = [
  { id: 'fia-e1', module: 'm3', title: 'Amplitud vs profundidad sobre un árbol', statement: 'Árbol: A tiene hijos B y C; B tiene hijos D y E; C tiene hijos F y G (meta = F). ¿En qué orden expande los nodos cada búsqueda?', steps: [
    { title: 'Amplitud (nivel por nivel)', body: 'A → B → C → D → E → **F** ✔ (encuentra F tras 6 nodos; es el camino más corto A-C-F).' },
    { title: 'Profundidad (rama izquierda primero)', body: 'A → B → D → E → C → **F** ✔ (baja por B hasta el fondo antes de pasar a C).' },
    { title: 'Conclusión', body: 'Aquí ambos encuentran F, pero si la rama de B fuera infinita, profundidad **nunca** llegaría: por eso no es completa.' },
  ], result: 'BFS: A, B, C, D, E, F · DFS: A, B, D, E, C, F.' },
  { id: 'fia-e2', module: 'm8', title: 'Un paso de aprendizaje del perceptrón', statement: 'Pesos w1 = 0,5 y w2 = −0,2, bias = 0, umbral 0 (salida 1 si Net ≥ 0). Entrada (x1, x2) = (1, 1), salida deseada 0. Tasa α = 0,1. Actualizá los pesos.', steps: [
    { title: 'Net', body: 'Net = 0 + 0,5·1 + (−0,2)·1 = **0,3** ≥ 0 → salida **1**.' },
    { title: 'Error', body: 'error = deseada − obtenida = 0 − 1 = **−1**.' },
    { title: 'Ajuste w = w + α·error·x', body: 'w1 = 0,5 + 0,1·(−1)·1 = **0,4** · w2 = −0,2 + 0,1·(−1)·1 = **−0,3** · bias = 0 + 0,1·(−1)·1 = **−0,1**.' },
  ], result: 'Nuevos pesos: w1 = 0,4 · w2 = −0,3 · bias = −0,1. Se repite hasta una pasada sin errores.' },
];

const content: SubjectContent = {
  subjectId: 'fia',
  theory, questions: [...questions, ...FINAL_QUESTIONS, ...REVIEW_QUESTIONS], exercises: [...exercises, ...FINAL_EXERCISES], videos: VIDEOS,
  cheatsheet: POCKET['fia'],
};

content.theory = content.theory.map((b) => ({ ...b, scenes: SCENES[b.id] }));
content.exercises = content.exercises.map((e) => ({ ...e, scenes: EX_SCENES[e.id] ?? FINAL_SCENES[e.id] }));
content.lessons = [
  {
    id: 'fia-clase-2', examId: 'final', title: 'Final resuelto paso a paso · ocho puntos',
    summary: 'Shells, lógica difusa, neuronas y redes multicapa, operadores genéticos, algoritmos meméticos, agentes y robótica.',
    intro: ['Vamos a resolver ocho temas de un final anterior de Fundamentos de la Inteligencia Artificial. Reformulamos cada punto como una elección razonada y construimos su diagrama paso a paso.', 'No confundas una respuesta escrita por otro estudiante con una resolución oficial. Vamos a distinguir los conceptos y sus condiciones: qué aporta un shell, qué significa pertenencia difusa y cómo se combinan aprendizaje, búsqueda y acción.'],
    parts: FINAL_EXERCISES.map((e) => `ex:${e.id}`),
    outro: ['Un shell aporta infraestructura; el conocimiento del dominio debe adquirirse y validarse. La pertenencia difusa no es una probabilidad. Una neurona artificial es un modelo matemático y la activación se distingue de la suma ponderada.', 'El cruce combina y la mutación introduce cambios. El algoritmo memético agrega búsqueda local al proceso evolutivo. En agentes y robótica, conectá siempre percepción, decisión, acción y condiciones del entorno.', 'Volvé a los ejercicios de la web y elegí una opción antes de recorrer la explicación. Después probá el simulacro para revisar las distinciones que todavía confundís.'],
  },
  {
    id: 'fia-clase-1', examId: 'final', title: 'Final completo: los 12 módulos',
    summary: 'IA, ML y DL; búsqueda en amplitud y profundidad; Prolog; sistemas expertos; lógica difusa; neuronas y perceptrón; genéticos y meméticos; agentes y robótica.',
    intro: [
      'Esta es la clase completa para el final de Fundamentos de la Inteligencia Artificial: los doce módulos, con lo que tomaron en los finales de 2023 a 2025.',
      'Vamos a ir en orden: qué es la IA, búsqueda, Prolog, sistemas expertos, lógica difusa, redes neuronales y perceptrón, algoritmos genéticos y meméticos, agentes y robótica.',
    ],
    parts: ['f1', 'f2', 'f3', 'ex:fia-e1', 'f4', 'f5', 'f6', 'f7', 'f8', 'ex:fia-e2', 'f9', 'f10', 'f11', 'f12'],
    outro: [
      'Amplitud: completa y óptima, mucha memoria. Profundidad: poca memoria, ni completa ni óptima. Formalización = árbol de causalidad → reglas IF-THEN.',
      'Difusa: verdad en [0, 1]. Activación = lo no lineal sobre la suma ponderada. Perceptrón: solo separable (XOR no). Mutación = diversidad.',
      'Meméticos = evolutivo + búsqueda local. La automatización (sin intervención humana) incluye a la robótica.',
    ],
  },
];

content.lessons.push(...REVIEW_LESSONS);
export default content;
