import type { VisScene } from '../../vis/types';
import { arr, box, head, ico, scene, seq, txt } from './h';

/** Diagramas propios: los nombres describen roles y procesos ficticios. */
function flow(title: string, labels: [string, string, string], say: [string, string, string]): VisScene[] {
  return [scene([
    head(title),
    ...labels.map((t, i) => box(30, 60 + i * 140, 460, 90, t, { fs: 27, s: i, c: (['blue', 'yellow', 'green'] as const)[i] })),
    arr([260, 150], [260, 194], { s: 1 }), arr([260, 290], [260, 334], { s: 2 }),
  ], say, 520, 465)];
}

function interaction(title: string, messages: [string, string, string], say: [string, string, string]): VisScene[] {
  return [scene([
    head(title),
    seq(15, 65, 610, 350, [{ t: 'Actor', c: 'blue', n: 'user' }, { t: 'Interfaz', c: 'cyan' }, { t: 'Control', c: 'orange' }, { t: 'Entidad', c: 'green', n: 'db' }], [
      { a: 0, b: 1, t: messages[0], s: 0 }, { a: 1, b: 2, t: messages[1], s: 1 }, { a: 2, b: 3, t: messages[2], s: 2 },
    ], { fs: 26, partFs: 24 }),
  ], say, 640, 450)];
}

export const SECOND_SCENES: Record<string, VisScene[]> = {
  'ch1-t0': flow('Del relato al requisito', ['Relato del negocio', 'Función: registrar un préstamo', 'Restricción: tiempo de respuesta'], [
    'Leé el relato buscando objetivos y reglas del negocio. Separá lo que se necesita lograr de los detalles de una pantalla.',
    'Registrar un préstamo es una función: el sistema cambia información del negocio. Redactá el requisito con una acción y su objeto.',
    'El tiempo de respuesta restringe cómo se cumple esa función. Es un requisito no funcional y debe poder medirse para comprobarlo.',
  ]),
  'ch1-t1': flow('Un objetivo con valor', ['Actor con una necesidad', 'Caso de uso: devolver libro', 'Resultado: préstamo cerrado'], [
    'Empezá por una necesidad del actor. El caso de uso reúne interacciones para conseguir un objetivo observable, incluyendo sus posibles variantes.',
    'Nombralo con verbo en infinitivo y objeto: devolver libro. No lo reduzcas a un botón, una pantalla o una operación técnica.',
    'El resultado aporta valor al actor y al negocio. Si solo nombraste guardar una fila, todavía falta explicar el objetivo completo.',
  ]),
  'ch1-t2': [scene([
    head('Actor: un rol externo'),
    box(185, 60, 310, 330, '', { c: 'gray' }),
    txt(340, 90, 'Sistema de préstamos', { fs: 23 }),
    ico(75, 155, 'user', { t: 'Socio', c: 'blue', size: 65 }),
    box(225, 140, 230, 90, 'Solicitar libro', { shape: 'circle', s: 1, fs: 25 }),
    arr([110, 155], [220, 175], { s: 1 }),
    ico(75, 325, 'server', { t: 'Otro sistema', s: 2, c: 'green', size: 60 }),
    arr([110, 325], [180, 325], { s: 2 }),
  ], ['Un actor representa un rol que interactúa desde afuera de la frontera elegida. Una misma persona puede cumplir más de un rol.', 'La asociación muestra participación en un caso de uso. El actor queda afuera y la funcionalidad queda dentro del sistema modelado.', 'También puede ser actor otro sistema. Para decidirlo, preguntate qué intercambia y dónde ubicás la frontera; no alcanza con ser una persona.'], 520, 430)],
  'ch1-t3': flow('Modelá el negocio', ['Necesidad del socio', 'Participación de cada rol', 'Objetivo completo del proceso'], [
    'Reconstruí quién necesita el resultado. Modelar el negocio exige mirar el proceso completo, incluso cuando una persona utiliza la computadora por otra.',
    'Identificá los roles que piden, entregan o reciben información. La frontera elegida determina cuáles participan como actores externos en tu modelo.',
    'Usá nombres de procesos con valor para el negocio. Evitá reemplazarlos por pantallas o detalles internos que todavía no fueron diseñados.',
  ]),
  'ch1-t4': flow('Construí el diagrama', ['Definí la frontera', 'Actores afuera · casos adentro', 'Asociaciones según participación'], [
    'Dibujá el límite del sistema y escribí su nombre. Ese límite fija qué comportamiento estás describiendo y qué pertenece al entorno.',
    'Ubicá los actores por fuera y cada caso de uso como una elipse adentro. Las elipses llevan objetivos, no nombres de personas.',
    'Conectá cada actor solo con los casos en los que participa. Una asociación expresa interacción, no indica el orden temporal del proceso.',
  ]),
  'ch1-t5': flow('Del proceso al modelo', ['Separá alta, préstamo y devolución', 'Identificá roles participantes', 'Verificá requisitos ↔ casos'], [
    'En un ejemplo de biblioteca, separá procesos como alta, préstamo y devolución. No reproduzcas cada oración del relato como una elipse distinta.',
    'Para cada proceso anotá quién lo inicia y quién recibe resultados. Definí la frontera antes de decidir si un rol es externo.',
    'Revisá que cada requisito tenga comportamiento asociado y que cada caso provenga de una necesidad. Esta comparación detecta omisiones y funciones inventadas.',
  ]),
  'ch2-t0': flow('Describí el caso de uso', ['Id y nombre del diagrama', 'Interacciones actor ↔ sistema', 'Objetivo y resultado verificable'], [
    'Elegí una elipse del diagrama y conservá su identificador y nombre. El cuadro descriptivo desarrolla ese mismo caso, sin cambiar su alcance.',
    'Escribí las interacciones entre actores y sistema. Incluí el camino normal y las variantes relevantes, usando pasos claros y observables.',
    'Comprobá que el recorrido cumpla el objetivo y deje un resultado verificable. El dibujo ubica relaciones; la descripción explica cómo se alcanza el resultado.',
  ]),
  'ch2-t1': flow('Ficha del caso de uso', ['Actores y objetivo', 'Precondición → curso normal', 'Alternativas → postcondición'], [
    'La ficha identifica el caso, los actores y el objetivo. El actor primario inicia la interacción; los secundarios colaboran cuando corresponde.',
    'La precondición expresa lo que debe cumplirse antes de empezar. El curso normal enumera las acciones del actor y las respuestas del sistema.',
    'Agregá alternativas y postcondición. La postcondición describe el estado que queda al terminar; no es una repetición del requisito de entrada.',
  ]),
  'ch2-t2': interaction('Curso normal', ['Solicitar préstamo', 'Validar solicitud', 'Registrar préstamo'], [
    'El actor solicita la operación por la interfaz. Escribí un paso numerado y concreto, con los datos necesarios para entender la interacción.',
    'El sistema valida las condiciones del negocio. El camino normal sigue cuando se cumplen; las condiciones que lo desvían van como alternativas.',
    'Se registra el resultado y se informa al actor. Contrastá el estado final con la postcondición antes de dar por cerrado el caso.',
  ]),
  'ch2-t3': flow('Alternativa desde un paso', ['2. Validar habilitación', '2.1 No habilitado: informar', 'Cerrar o volver al paso indicado'], [
    'Revisá en qué paso del curso normal puede cambiar el comportamiento. La condición alternativa debe venir de una regla del negocio.',
    'Si ocurre en el paso dos, vinculá la alternativa con ese paso. Explicá qué detecta el sistema y qué comunica al actor.',
    'Indicá si el caso termina o retoma un paso concreto. Una alternativa puede ser una situación válida del negocio, sin un fallo técnico.',
  ]),
  'ch2-t4': [scene([
    head('Include y extend: direcciones'),
    box(20, 70, 220, 90, 'Prestar libro', { id: 'base', shape: 'circle', fs: 24 }),
    box(280, 70, 220, 90, 'Validar socio', { id: 'incl', shape: 'circle', fs: 24, s: 1, c: 'green' }),
    arr('base', 'incl', { t: '«include»', s: 1, dash: true }),
    box(20, 280, 220, 90, 'Cobrar multa', { id: 'ext', shape: 'circle', fs: 24, s: 2, c: 'orange' }),
    box(280, 280, 220, 90, 'Devolver libro', { id: 'base2', shape: 'circle', fs: 24, s: 2 }),
    arr('ext', 'base2', { t: '«extend»', s: 2, dash: true }),
  ], ['Las dos relaciones conectan casos de uso. Primero distinguí qué comportamiento es obligatorio y cuál se agrega solo bajo una condición.', 'Include va desde el caso que utiliza comportamiento hasta el caso incluido. En este ejemplo, prestar un libro incluye validar al socio.', 'Extend va desde el caso que agrega comportamiento hacia el caso base. El cobro amplía la devolución cuando corresponde una multa; no ocurre siempre.'], 520, 430)],
  'ch2-t5': flow('Revisá la descripción', ['Mismo Id, nombre y actores', 'Pedido → validación → registro', 'Resultado y alternativas completas'], [
    'Compará el cuadro con el diagrama: identificador, nombre y actores deben coincidir. Después escribí precondiciones y el objetivo de esa interacción.',
    'Recorré el camino normal como una conversación: pedido, validación, registro y respuesta. Evitá incluir código o decisiones de implementación no requeridas.',
    'Leé las reglas una por una y buscá dónde afectan el curso. Cerrá cada alternativa indicando continuación o fin y comprobá la postcondición.',
  ]),
  'ch3-t0': interaction('Secuencia: el tiempo baja', ['Pedido', 'Procesar pedido', 'Consultar estado'], [
    'Leé de arriba hacia abajo: los mensajes más altos ocurren antes. Cada participante tiene una línea de vida que representa su existencia.',
    'La flecha sale del emisor y llega al receptor. El nombre expresa la operación solicitada; no representa el movimiento físico de un objeto.',
    'El diagrama cuenta una interacción concreta entre objetos. Comparalo con el caso de uso para comprobar que realiza su comportamiento, sin saltos inexplicados.',
  ]),
  'ch3-t1': interaction('Interfaz · control · entidad', ['Ingresar datos', 'Coordinar operación', 'Consultar o actualizar'], [
    'La interfaz recibe la interacción del actor. Representa el punto de contacto con el sistema, no la información persistente del negocio.',
    'El control coordina las acciones del caso de uso y sus reglas. Separarlo evita que toda la lógica termine acumulada en una pantalla.',
    'La entidad representa información del dominio que debe conservarse. El control solicita consultas o cambios a las entidades necesarias para cumplir la operación.',
  ]),
  'ch3-t2': interaction('Elementos de una secuencia', ['Mensaje inicial', 'Invocación a control', 'Operación sobre entidad'], [
    'Las líneas verticales representan las vidas de los participantes. Un mensaje horizontal conecta un emisor con un receptor y lleva un nombre.',
    'La posición vertical ordena los mensajes en el tiempo. Si dibujás activaciones, muestran cuándo un participante está ejecutando una acción.',
    'Un retorno puede marcarse con línea discontinua cuando ayuda a entender la respuesta. Conservá consistencia entre las operaciones dibujadas y las responsabilidades asignadas.',
  ]),
  'ch3-t4': interaction('Ejemplo propio: préstamo', ['Solicitar ejemplar', 'Comprobar habilitación', 'Registrar préstamo'], [
    'El socio solicita un ejemplar mediante la interfaz. Identificá los datos que hacen falta y el estado que espera obtener al terminar.',
    'El control comprueba la habilitación del socio y la disponibilidad del ejemplar. Si una regla falla, representá la alternativa correspondiente del caso.',
    'Si todo se cumple, registrá el préstamo y actualizá la disponibilidad. La confirmación al actor debe reflejar el nuevo estado, sin perder la trazabilidad.',
  ]),
  'ch3-t5': flow('Participación secundaria', ['Actor primario → interfaz', 'Control coordina la solicitud', 'Otra interfaz → servicio externo'], [
    'El actor primario inicia el caso por su interfaz. Mantené visible quién pide el servicio y cuál es el objetivo de la operación.',
    'El control aplica las reglas y coordina consultas o registros. No confundas al servicio externo con una entidad interna solo porque guarda información.',
    'Una segunda interfaz permite comunicarse con el actor secundario. Incluí mensajes y respuestas según la descripción; la distribución horizontal ayuda a seguir la colaboración.',
  ]),
  'ch3-t6': flow('Dos vistas de la interacción', ['Mismos participantes y mensajes', 'Secuencia: orden temporal', 'Comunicación: vínculos y numeración'], [
    'Los diagramas de interacción permiten explicar cómo colaboran los participantes. Podés describir un mismo comportamiento con más de una vista complementaria.',
    'La secuencia destaca cuándo ocurre cada mensaje mediante su posición vertical. Es útil cuando el orden de la conversación resulta central.',
    'La comunicación destaca vínculos entre participantes y usa numeración para expresar el orden. Cambia el foco visual, manteniendo las responsabilidades y el comportamiento.',
  ]),
  'ch3-t7': interaction('Del caso a la secuencia', ['Paso del actor', 'Responsabilidad del control', 'Acción de la entidad'], [
    'Tomá la descripción como guion: cada paso debe tener una responsabilidad asignada. Empezá por el mensaje con el que el actor inicia el caso.',
    'Ubicá interfaz y control, y traducí las validaciones a mensajes comprensibles. El receptor de una operación debe poder cumplirla con su responsabilidad.',
    'Agregá las entidades que aportan o conservan datos. Revisá el orden completo y la respuesta final, comparando cada mensaje con el guion original.',
  ]),
  'ch4-t0': flow('Prototipá para aprender', ['Necesidad todavía ambigua', 'Maqueta e interacción de prueba', 'Feedback → requisito aclarado'], [
    'Un requisito ambiguo puede generar una solución equivocada. Elegí qué duda querés resolver con el usuario antes de construir una maqueta.',
    'El prototipo simula las partes necesarias de la interacción. No demuestra por sí mismo que la arquitectura o el rendimiento finales ya estén resueltos.',
    'Observá cómo se usa, recogé el feedback y corregí los requisitos. El valor del prototipo está en aprender temprano y reducir errores de comunicación.',
  ]),
  'ch4-t1': flow('Diseño centrado en el usuario', ['Persona, objetivo y contexto', 'Mockup: información y acciones', 'Evaluación → revisión del diseño'], [
    'Identificá quién va a usar el sistema, con qué objetivo y en qué contexto. Esas necesidades orientan las decisiones visibles de diseño.',
    'Mostrá la organización de información y acciones con un mockup. No lo confundas con una funcionalidad completa ni con una prueba del código.',
    'Contrastá la propuesta con usuarios y escenarios concretos. Lo observado permite revisar tanto la interfaz como los requisitos antes de desarrollar detalles costosos.',
  ]),
  'ch4-t2': flow('Historia de usuario', ['Como socio', 'Quiero consultar mis préstamos', 'Para organizar mis devoluciones'], [
    'La historia parte de un rol: como socio. Nombrá quién necesita la funcionalidad para que se entienda desde qué perspectiva la estás contando.',
    'Después expresá qué quiere lograr: consultar sus préstamos. Describí una capacidad útil, sin imponer una pantalla o una tecnología que nadie pidió.',
    'El para explica el beneficio: organizar las devoluciones. Conversá los detalles y agregá criterios verificables; una tarjeta breve no reemplaza toda la conversación.',
  ]),
  'ch5-t0': flow('Trazabilidad', ['Necesidad → requisito R1', 'R1 → diseño e implementación', 'R1 → prueba de aceptación'], [
    'Registrá de dónde sale cada requisito y asignale un identificador. Ese vínculo permite explicar por qué existe y quién necesita su resultado.',
    'Relacioná el requisito con los elementos que lo implementan. Ante un cambio, la traza ayuda a localizar qué partes pueden verse afectadas.',
    'Vinculalo también con pruebas. Así podés buscar requisitos sin verificar y pruebas sin necesidad asociada; tener enlaces no demuestra automáticamente que el requisito se cumpla.',
  ]),
  'ch5-t1': flow('Aceptación', ['Requisito y criterio observable', 'Usuario ejecuta un escenario', 'Resultado esperado ↔ obtenido'], [
    'Definí con el usuario criterios que permitan decidir si la necesidad está satisfecha. Una afirmación vaga como funciona bien no alcanza.',
    'Prepará entradas y condiciones de un escenario de aceptación. La evaluación se basa en el comportamiento externo especificado, por eso corresponde a caja negra.',
    'Compará el resultado obtenido con el esperado y registrá la decisión. Una prueba de aceptación aporta evidencia para ese escenario, no garantiza ausencia de defectos.',
  ]),
  'ch5-t3': flow('Estrategia de pruebas', ['Riesgos y requisitos', 'Niveles, técnicas y escenarios', 'Criterios de salida y evidencia'], [
    'La estrategia decide qué riesgos y objetivos guían las pruebas. Partí de requisitos funcionales y restricciones de calidad, según el sistema que evaluás.',
    'Elegí niveles y tipos de prueba: por ejemplo seguridad, rendimiento o recuperación. No son sinónimos; cada uno busca problemas y evidencia diferentes.',
    'Definí cómo se registran resultados y cuándo se considera suficiente la ejecución. Después de un cambio, la regresión busca daños en comportamientos previamente válidos.',
  ]),
  'ch5-t4': flow('Pruebas dentro de la iteración', ['Acordar comportamiento esperado', 'Diseñar pruebas junto al desarrollo', 'Ejecutar → feedback → ajustar'], [
    'En un enfoque ágil, el equipo conversa los criterios de aceptación al analizar el trabajo. La calidad se construye durante la iteración.',
    'Diseñar pruebas temprano aclara qué comportamiento se espera. El equipo comparte la responsabilidad; esto no significa que desaparezca la necesidad de probar.',
    'Ejecutá, observá resultados y usá el feedback para corregir. La regresión acompaña los cambios frecuentes y ayuda a sostener el comportamiento acordado.',
  ]),
  'ch6-t0': flow('Información para decidir', ['Datos de las operaciones', 'Procesar · almacenar · relacionar', 'Información útil para el negocio'], [
    'Un sistema reúne elementos relacionados que trabajan para un fin. En un sistema de información, los datos de las operaciones son una entrada central. Mirá el objetivo empresarial antes de reducir el sistema a una aplicación o a una base de datos.',
    'El procesamiento transforma esos datos y el almacenamiento permite conservarlos y relacionarlos. También intervienen personas y procedimientos. Por eso una falla del sistema de información puede venir de un proceso organizativo, aunque cada programa individual se ejecute sin errores.',
    'La salida debe ser información útil para operar o decidir. Verificá quién la recibe, qué necesita comprender y para qué la utiliza. Tener muchos reportes no demuestra que se haya alcanzado el objetivo: el resultado debe relacionarse con la necesidad del negocio.',
  ]),
  'ch6-t1': flow('Tiempo real: también importa cuándo', ['Evento del entorno', 'Procesamiento con plazo definido', 'Resultado correcto dentro del plazo'], [
    'En tiempo real, el sistema recibe eventos del entorno y tiene restricciones temporales para responder. No alcanza con decir que es rápido: necesitás conocer el plazo que debe cumplirse. La exigencia surge del problema y no de una preferencia estética de la interfaz.',
    'El procesamiento debe producir el resultado correcto y respetar el límite temporal. Pensá, por ejemplo, en una acción de control: entregar una orden correcta demasiado tarde puede hacer que el sistema ya no cumpla su función. El tiempo forma parte de la corrección requerida.',
    'Al evaluar el sistema, comprobá exactitud y momento de entrega. No confundas tiempo real con ejecución instantánea, ni supongas que todo sistema rápido lo es. La clave es una obligación temporal especificada y verificable en las condiciones previstas de funcionamiento.',
  ]),
  'ch6-t2': flow('Un sistema en varios nodos', ['Nodo A: recibe pedidos', 'Red: intercambio de mensajes', 'Nodo B: procesa o conserva datos'], [
    'En un sistema distribuido, el procesamiento se reparte entre computadoras conectadas. Cada nodo tiene recursos y ejecuta parte del trabajo, pero los participantes cooperan para ofrecer un servicio conjunto. Una computadora con varios programas no basta para identificar esta distribución entre máquinas.',
    'La red permite colaborar, y también introduce demoras y fallos de comunicación. No podés razonar como si cada llamada fuera local e instantánea. Para entender un escenario, identificá qué mensaje se envía, qué respuesta se espera y qué sucede cuando no llega.',
    'Un nodo puede fallar mientras otros siguen funcionando: eso es un fallo parcial. La tolerancia depende del diseño; distribuir no garantiza por sí mismo que el servicio continúe. Revisá replicación, dependencias y comportamiento ante pérdida de conexión antes de afirmar que existe disponibilidad garantizada.',
  ]),
  'ch6-t3': flow('Software dentro de un dispositivo', ['Sensor: entrada del entorno', 'Controlador: función específica', 'Actuador: acción física'], [
    'Un sistema embebido incorpora cómputo dentro de un dispositivo para cumplir funciones determinadas. Puede pasar desapercibido para el usuario, como ocurre con el control de un electrodoméstico. El objetivo no suele ser ofrecer una computadora de propósito general, sino controlar o apoyar ese producto.',
    'El controlador interpreta entradas y decide según las reglas previstas. Sensores y actuadores permiten reconocer la relación con el entorno físico. Los recursos de memoria, energía y procesamiento pueden estar restringidos, por lo que esas condiciones influyen en la solución y en su verificación.',
    'Muchos sistemas embebidos tienen exigencias de tiempo real, pero las dos clasificaciones describen propiedades diferentes. Embebido indica integración en un dispositivo; tiempo real indica plazos de respuesta. Para clasificar un ejemplo, justificá ambas propiedades por separado y evitá tratarlas como equivalentes automáticos.',
  ]),
  'ch7-t0': flow('El sistema sigue cambiando', ['Software ya entregado', 'Corrección o nueva necesidad', 'Cambio → prueba → nueva versión'], [
    'El mantenimiento modifica software después de su entrega. Puede corregir fallos, adaptarse al entorno o mejorar capacidades existentes. La vida del producto continúa mientras sea útil para la organización; terminar el desarrollo inicial no congela las necesidades ni elimina el trabajo técnico posterior.',
    'Cada pedido debe analizarse antes de implementar: qué cambia, qué partes dependen de él y qué riesgos introduce. Las modificaciones sucesivas pueden deteriorar la estructura y hacer más difícil comprenderla. La documentación y la trazabilidad ayudan a localizar impactos, pero también necesitan mantenerse actualizadas.',
    'Una versión nueva requiere comprobar el cambio y revisar comportamientos anteriores mediante regresión. Separá el objetivo del pedido de sus efectos secundarios. Que la función nueva parezca correcta no demuestra que las partes que ya se usaban sigan funcionando como antes.',
  ]),
  'ch7-t1': flow('Reingeniería del software', ['Sistema existente difícil de mantener', 'Comprender y reestructurar', 'Mismo servicio · estructura mejorada'], [
    'La reingeniería trabaja sobre un sistema existente para mejorar su comprensión y mantenibilidad. Primero necesitás reconocer qué hace y qué debe conservarse. El hecho de que un programa sea antiguo no dice por sí solo si necesita reemplazo total, mantenimiento puntual o una reestructuración.',
    'Las actividades pueden incluir redocumentar, reorganizar código, traducir lenguaje o revisar estructuras de datos. La ingeniería inversa ayuda a recuperar conocimiento desde la implementación. Entender el sistema es una parte del trabajo; transformar su estructura con criterios definidos es otra.',
    'Comprobá que se preserve el comportamiento que se quería conservar. La reingeniería no equivale automáticamente a incorporar funciones nuevas ni a rediseñar el negocio. Usá pruebas y comparación de resultados para sostener esa preservación mientras reducís dificultades estructurales del sistema existente.',
  ]),
  'ch7-t2': flow('Propiedades expresadas con precisión', ['Requisito: conservar el saldo', 'Modelo matemático e invariantes', 'Verificación respecto del modelo'], [
    'Los métodos formales usan fundamentos matemáticos para especificar y razonar sobre propiedades del software. Un enunciado informal puede tener ambigüedades; al formalizarlo debés definir estados, operaciones y condiciones con precisión. Eso obliga a descubrir decisiones que el lenguaje cotidiano puede dejar implícitas.',
    'Un invariante expresa una propiedad que se busca conservar en los estados permitidos. Por ejemplo, un modelo puede restringir qué valores son válidos y cómo una operación los transforma. El ejemplo necesita supuestos explícitos: una propiedad no tiene sentido aislada del sistema que describe.',
    'La verificación comprueba propiedades respecto de ese modelo y de sus supuestos. No demuestra por sí sola que elegiste las necesidades correctas del mundo real. Por eso formalización, validación con usuarios y pruebas pueden aportar evidencia complementaria, especialmente en sistemas con exigencias críticas.',
  ]),
  'ch7-t3': flow('Elegí qué propiedad modelar', ['Estados y operaciones', 'Secuencias de eventos', 'Propiedades y restricciones temporales'], [
    'Distintas aproximaciones formales resaltan aspectos diferentes. Si importa cómo cambia la información, definí estados y operaciones con sus condiciones. Las especificaciones basadas en modelos permiten razonar sobre esas transformaciones; primero identificá la propiedad que necesitás expresar y después elegí una notación apropiada.',
    'Cuando el interés está en la interacción o concurrencia, puede ser útil describir eventos y procesos. El orden de los eventos y las combinaciones permitidas pasan a ser centrales. No hace falta imponer una única representación a todos los problemas: elegí según el comportamiento relevante.',
    'Otras propiedades restringen lo que debe suceder a lo largo del tiempo, como que una solicitud reciba respuesta bajo determinados supuestos. La precisión facilita el análisis temprano, pero su utilidad depende del esfuerzo, las habilidades y la criticidad. Complementá la formalización con validación de las necesidades reales.',
  ]),
};

const CHECKS: Record<string, [string, string]> = {
  'ch6-t0': ['¿Qué decisión permite tomar?', 'Al clasificar un sistema de información, seguí la transformación de datos hasta una decisión concreta del negocio. Eso permite justificar la finalidad sin confundirla con la tecnología utilizada.'],
  'ch6-t1': ['¿Cuál es el plazo obligatorio?', 'Para reconocer tiempo real, identificá la obligación temporal del caso y qué consecuencia tiene incumplirla. No asignes un número que el problema no proporciona: primero necesitás esa especificación.'],
  'ch6-t2': ['¿Qué ocurre si falla un nodo?', 'Probá mentalmente qué sucede al perder un nodo o un mensaje. Si no conocés las dependencias y redundancias, todavía no podés afirmar que el sistema tolera ese fallo.'],
  'ch6-t3': ['¿Dónde está integrado el cómputo?', 'Reconocé el dispositivo y la función específica del controlador. Después evaluá si además hay plazos obligatorios. Así distinguís dos propiedades compatibles sin convertirlas en una sola clasificación.'],
  'ch7-t0': ['¿Qué comportamiento puede romperse?', 'Ante una modificación, buscá qué funciones anteriores dependen de lo que tocaste. Esa pregunta orienta las pruebas de regresión y evita revisar solamente el nuevo comportamiento visible.'],
  'ch7-t1': ['¿Qué servicio debe preservarse?', 'Definí el comportamiento que querés conservar antes de reestructurar. Después compará resultados con esa referencia. Una estructura más clara ayuda a mantener, pero requiere evidencia de preservación funcional.'],
  'ch7-t2': ['¿Bajo qué supuestos es válido?', 'Al interpretar una verificación formal, enumerá los supuestos del modelo. Una demostración puede ser correcta para ese modelo y no describir un entorno real que incumple esos supuestos.'],
  'ch7-t3': ['¿Qué propiedad necesitás expresar?', 'Elegí la representación a partir de la propiedad: estados, interacciones o restricciones temporales. La notación es un medio para razonar con precisión, y debe acompañarse de una interpretación del problema.'],
};
for (const [id, [label, explanation]] of Object.entries(CHECKS)) {
  const sc = SECOND_SCENES[id][0];
  sc.v.items.push(box(30, 455, 460, 75, label, { s: 3, fs: 26, c: 'purple' }));
  sc.v.h = 555;
  sc.say.push(explanation);
}
