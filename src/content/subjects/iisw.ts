import type { Question, SubjectContent, TheoryBlock, VideoItem, WorkedExercise } from '../types';
import port from '../banks/iisw-port.json';
import { VIDEOS } from '../videos/iisw';
import { EX_SCENES, SCENES } from '../visual/iisw';

/**
 * IISW · final. Módulos 1–7: redacción propia sobre los apuntes de la cátedra y los temas de finales viejos.
 * Módulos 8–12: contenido propio exportado del sitio del 2º parcial (iisw-parcial2).
 */
const SRC_F = 'finales anteriores (Drive de estudiantes)';

const theory: TheoryBlock[] = [
  { id: 'm1-def', module: 'm1', title: 'Ingeniería de software: origen y definiciones', points: [
    'Nace en **1968** (conferencia de la OTAN) junto con el término **crisis del software**: proyectos que se pasaban de costo y plazo, se cancelaban o salían con mantenimiento carísimo.',
    'Definición IEEE (1993): aplicación de métodos **sistemáticos, disciplinados y cuantificables** al desarrollo, operación y mantenimiento del software. Boehm: aplicación práctica del conocimiento científico al diseño y construcción de programas **y su documentación**.',
    '**Producto de software** no es solo el ejecutable: incluye documentación de requerimientos, diseño, código fuente, datos de prueba y manuales. **Proceso**: conjunto de actividades cuya meta es desarrollar o hacer evolucionar el software (Sommerville).',
    '**Sistema ≠ software:** un sistema basado en computadora combina software, hardware, gente, base de datos, documentación y procedimientos (procesos manuales y computarizados). El software es **solo la parte lógica**.',
    'Brooks ("No silver bullet"): dificultades **esenciales** (complejidad, conformidad, variabilidad, invisibilidad: no desaparecen con la tecnología) y **accidentales** (las del momento, que las herramientas sí reducen).',
  ], trap: 'Final: "un sistema son procesos computarizados **y** manuales; el software es solo computacional".' },
  { id: 'm1-cual', module: 'm1', title: 'Cualidades del software (Ghezzi)', points: [
    '**Internas** (relevantes para desarrolladores) vs **externas** (visibles para el usuario). Del **producto** o del **proceso**.',
    '**Correctitud:** se comporta según la especificación. **Confiabilidad:** probabilidad de operar como se espera en un intervalo de tiempo. **Robustez:** se comporta razonablemente ante situaciones no previstas.',
    '**Performance:** usa los recursos (tiempo, memoria) de forma económica. **Amigabilidad:** fácil de usar (y depende también de correctitud y performance).',
    '**Verificabilidad, mantenibilidad, reusabilidad, portabilidad, interoperabilidad** (coexistir y cooperar con otros sistemas; interfaces estándar).',
    'Del **proceso**: **productividad** (eficiencia en recursos), **oportunidad** (entregar **a tiempo**: buena estimación y metas claras) y **visibilidad** (pasos y estado documentados y accesibles). **Integridad:** controla accesos no autorizados.',
    'No todas se piden siempre: se eligen las relevantes para cada producto.',
  ], trap: 'Preguntas de final: "¿a qué se refiere la cualidad de **oportunidad**?" (entregar a tiempo) y "cualidad de **performance y productividad**" (producto vs proceso).' },
  { id: 'm1-princ', module: 'm1', title: 'Principios de la ingeniería de software', points: [
    'Se aplican **durante todo el proceso**, no en una fase: **rigor y formalidad**, **separación de incumbencias**, **modularidad**, **abstracción**, **anticipación al cambio**, **generalización** e **incrementalidad**.',
    '**Modularidad:** dividir un sistema complejo en módulos; reduce la complejidad y facilita cambios. Un buen diseño exige **alta cohesión** (relación interna del módulo) y **bajo acoplamiento** (dependencia entre módulos).',
    '**Anticipación al cambio:** prever evolución; se apoya en la administración de configuraciones (versiones).',
  ], trap: 'Final: la modularidad es importante porque separa un problema complejo en partes y debe hacerse con **alta cohesión y bajo acoplamiento** (no al revés).' },
  { id: 'm2-ciclos', module: 'm2', title: 'Modelos de ciclo de vida', points: [
    '**Cascada (clásico):** etapas secuenciales (requerimientos → diseño → codificación → pruebas → integración → operación y mantenimiento). Rígido; sirve cuando los requisitos están **completamente definidos y estables**. El cliente ve el producto recién al final; genera mucha documentación. Versión modificada: permite volver a etapas anteriores.',
    '**Espiral (Boehm, años 80):** incorpora el **análisis de riesgos**. Cuatro cuadrantes: planificación, análisis de riesgos, ingeniería y evaluación del cliente. El proyecto es una suma de mini-proyectos.',
    '**Incremental:** subsana la gran desventaja de cascada: entrega **subsistemas operativos** parciales, así el cliente ve avances. Variante "diseño por planificación": se entregan primero los requisitos más prioritarios.',
    '**Prototipos:** cuando el cliente no sabe describir lo que quiere. **Descartables** (se tiran) o **evolutivos** (se construyen sobre la arquitectura final). **Ligeros** (bocetos de pantallas) u **operativos** (módulos con funcionalidad parcial).',
    '**Evolutivo:** ciclos que entregan cada vez un sistema completo y operable; útil con requisitos desconocidos o entorno cambiante.',
    '**UP / RUP** (Jacobson, Booch, Rumbaugh; ligado a UML): **híbrido, iterativo e incremental**. 4 fases: **Inicio, Elaboración, Construcción, Transición**; cada fase en iteraciones que recorren los flujos de trabajo (requisitos, análisis, diseño, implementación, pruebas).',
  ], table: { head: ['Modelo', 'Clave', 'Cuándo'], rows: [['Cascada', 'secuencial, rígido', 'requisitos estables'], ['Espiral', 'análisis de RIESGOS', 'proyectos riesgosos'], ['Incremental', 'entregas operativas parciales', 'el cliente quiere ver avances'], ['Prototipos', 'simular para descubrir requisitos', 'cliente no sabe qué quiere'], ['UP', 'iterativo e incremental · 4 fases', 'híbrido, con UML']] },
    trap: 'Final: "Etapas de ciclos de vida, desventajas y **quién lo subsana**" → la desventaja de cascada (el cliente no ve avances) la subsana el **incremental**; la falta de gestión de riesgos, el **espiral**.' },
  { id: 'm3-agiles', module: 'm3', title: 'Metodologías ágiles: XP y Scrum', points: [
    '**Manifiesto ágil (2001).** Principios: participación del cliente, desarrollo incremental, **personas antes que procesos**, aceptar el cambio de requisitos, simplicidad.',
    '**XP (Kent Beck):** liberación limitada (entregas rápidas), semana de 40 h, **cliente en el sitio**, **programación en pares**; trabaja con **historias de usuario**.',
    '**Scrum:** ciclos llamados **sprints** de 1 a 4 semanas; el equipo toma requisitos de una lista priorizada (**product backlog**). Se centra en la **gestión**, no en la ingeniería.',
    'Roles de Scrum: **Product Owner** (una persona; administra el backlog y define prioridades), **Equipo** (multidisciplinario, autogestionado, sin jerarquías, 7 ± 2 personas) y **Scrum Master** (coach; quita impedimentos; **no es el jefe**). Product Owner y Scrum Master **nunca** son la misma persona.',
    'No hay un modelo mejor: se elige según estabilidad de requisitos, riesgos, criticidad de plazos, visibilidad para el cliente, etc. Se pueden combinar (espiral con cascada adentro).',
  ] },
  { id: 'm4-extraccion', module: 'm4', title: 'Técnicas de extracción de requerimientos', points: [
    '**Entrevista:** conversación dirigida con un propósito. Preguntas **abiertas** (se explaya; riesqueza pero puede perderse el control), **cerradas** (respuesta acotada; rápidas pero sin detalle) y **de sondeo** (¿por qué?, ¿un ejemplo?).',
    'Planificación: leer antecedentes, fijar 4 a 6 objetivos, elegir entrevistados de todos los niveles, avisar con anticipación (45 a 60 min máximo), definir tipo y estructura de preguntas.',
    'Estructuras: **pirámide** (inductiva: cerradas → abiertas; para entrevistados poco participativos), **embudo** (deductiva: abiertas → cerradas; para quien necesita expresarse) y **diamante** (cerradas → abiertas → cerradas).',
    '**Cuestionario:** para muchas personas o ubicaciones dispersas, estudios preliminares o sondear problemas. Vocabulario del destinatario, preguntas cortas; las controvertidas al final.',
    '**Observación directa:** ver cómo se trabaja realmente; detecta **procedimientos informales** no documentados.',
    'Errores a evitar: **preguntas tendenciosas** (muestran opinión) y **preguntas dobles** (dos en una).',
  ], trap: 'Final: "Estructura de una entrevista: cómo se conforma cada una y en qué situación se aplica" y "¿Qué es un cuestionario y cuándo se utiliza?".' },
  { id: 'm5-modelado', module: 'm5', title: 'Modelado del negocio: diagrama de actividad y BPMN', points: [
    'Un **modelo** representa una porción de la realidad con abstracción: no es la realidad, respeta una forma de construcción, permite predecir y es más económico que la realidad. Detecta errores temprano.',
    '**Modelo de negocio:** describe los procesos de la empresa; sirve para entender el negocio del cliente y recomendar qué informatizar.',
    '**Diagrama de actividad:** inicio (●), fin (◉), actividad (caja redondeada), transición con **condición de guarda** [entre corchetes], **decisión** (rombo, salidas mutuamente excluyentes), **barra de sincronización** (split y merge para paralelismo) y **carriles** (quién hace cada cosa). Su aporte: modela **paralelismo**; su debilidad: no muestra bien los vínculos acción-objeto (para eso, diagrama de secuencia).',
    '**BPM:** enfoque sistemático para identificar, documentar, diseñar, ejecutar, medir y controlar procesos manuales y automatizados alineados con la estrategia. **BPMN** es la notación: eventos (círculos de inicio, intermedio y fin), actividades, **compuertas** (rombos), flujos de secuencia y de mensaje, pools y lanes.',
  ], trap: 'En los finales hay un ejercicio de **marcar los 3 errores de un BPMN** (y las marcas incorrectas descuentan): falta de evento de inicio o fin, compuertas sin condición, flujo de secuencia cruzando pools (ahí va flujo de mensaje), actividades sin salida.' },
  { id: 'm6-ir', module: 'm6', title: 'Fundamentos de la ingeniería de requerimientos', points: [
    '**Requerimiento** (IEEE 610): condición o capacidad que necesita el usuario para resolver un problema, o que debe tener el sistema para cumplir un contrato o estándar.',
    '**Ingeniería de requerimientos:** **extracción → análisis → especificación → validación** (el cliente confirma que eso es lo que espera). Debe obtener una **descripción completa del comportamiento externo** y producir la **SRS**; **no** diseña estructuras de datos ni módulos.',
    'Por qué hacerla: los errores detectados tarde cuestan mucho más (un error de requerimientos encontrado en pruebas puede costar hasta **5000 veces** más), evita construir el producto incorrecto y la ambigüedad.',
    'Standish (2000): solo **28 %** de proyectos exitosos, 23 % cancelados, 49 % con demoras o sobrecosto. Causas: requisitos deficientes o cambiantes, estimaciones irreales, **poca participación del usuario**.',
    '**Límites del sistema:** qué está dentro y qué fuera; hay zonas grises que se negocian. **Dominio de la aplicación** (qué hay que hacer) vs **dominio del software** (cómo se construye).',
  ], trap: 'Final: "¿Cuáles son defectos de la ingeniería de requerimientos?" → requisitos **ambiguos** y cliente/usuario **poco involucrado**.' },
  { id: 'm7-srs', module: 'm7', title: 'Especificación de requerimientos (SRS)', points: [
    'La **SRS** describe el **comportamiento externo** completo del software, con requerimientos funcionales y no funcionales. Mejor si la hacen proveedor y cliente juntos.',
    'Debe incluir: **funcionalidad, interfaces externas, rendimiento, atributos** (portabilidad, seguridad…) y **restricciones de diseño**. **No** incluye costos, cronogramas, diseño ni planes de prueba o configuración.',
    'Atributos de una buena SRS (IEEE 830): **correcta, no ambigua, completa, consistente, clasificada por importancia, verificable, modificable y trazable**.',
    'El estándar **IEEE 830-1998** es una **guía** que las organizaciones adaptan.',
    '**Cuantificación:** además del "qué", el "cuánto": un mismo problema con distinto volumen lleva a soluciones distintas. Requisitos **estáticos** (terminales, usuarios simultáneos, cantidad de información) y **dinámicos** (transacciones por período). Tabla por entidad: volumen inicial, crecimiento, máximo, obsolescencia.',
    'Requerimientos **no funcionales**: restricciones del cliente y atributos de calidad; deben ser medibles (**SMART**) para poder verificarse.',
  ], trap: 'V/F de final: "al relevar hay que cuantificar, **aunque esto no afectará la solución**" → **Falso**: el volumen sí cambia la solución.' },
];

const questions: Question[] = [
  { id: 'iswf-01', module: 'm1', type: 'mcq', prompt: 'Marque la diferencia correcta entre **sistema** y **software**:', options: ['Un sistema abarca procesos computarizados y manuales; el software es solo la parte computacional', 'El sistema es manual y el software es computacional', 'El sistema es puramente computacional y el software son procesos manuales', 'No hay diferencia'], answer: 0, explain: 'Un sistema basado en computadora combina software, hardware, personas, datos, documentación y **procedimientos** (incluye lo manual). El software es el componente **lógico**.', source: SRC_F },
  { id: 'iswf-02', module: 'm1', type: 'mcq', prompt: 'La cualidad de **oportunidad** se refiere a:', options: ['La habilidad de entregar el producto a tiempo', 'Que el software corra en distintas plataformas', 'Que el usuario pueda depender del software', 'Que se use eficientemente la memoria'], answer: 0, explain: 'Es una cualidad **del proceso**: entregar a tiempo, con buena estimación, planificación de recursos y metas claras. Las otras opciones son portabilidad, confiabilidad y performance.', source: SRC_F },
  { id: 'iswf-03', module: 'm1', type: 'mcq', prompt: 'Sobre la **modularidad**, ¿qué es correcto?', options: ['Separa un problema complejo en partes más chicas y debe lograr alta cohesión y bajo acoplamiento', 'Debe presentar baja cohesión y alto acoplamiento', 'Solo sirve en proyectos chicos', 'Aumenta la complejidad'], answer: 0, explain: 'Alta **cohesión** (cada módulo hace una cosa bien) y bajo **acoplamiento** (poca dependencia entre módulos) es la marca de un buen diseño modular.', source: SRC_F },
  { id: 'iswf-04', module: 'm1', type: 'mcq', prompt: 'Un producto es **robusto** si:', options: ['Se comporta razonablemente aun en situaciones no previstas en la especificación', 'Cumple exactamente la especificación', 'Usa poca memoria', 'Es fácil de usar'], answer: 0, explain: 'Correctitud = cumplir la especificación; **robustez** = no romperse ante lo no previsto (ej.: una tecla equivocada no produce un error irrecuperable).' },
  { id: 'iswf-05', module: 'm1', type: 'tf', prompt: 'Productividad, oportunidad y visibilidad son cualidades del proceso de desarrollo.', answer: true, explain: 'Las tres describen el **proceso**: eficiencia en recursos, entrega a tiempo y estado documentado y accesible.' },
  { id: 'iswf-06', module: 'm1', type: 'mcq', prompt: 'Según Brooks, la complejidad, la conformidad, la variabilidad y la invisibilidad son dificultades:', options: ['Esenciales', 'Accidentales', 'Temporales', 'Del hardware'], answer: 0, explain: 'Son **esenciales**: inherentes a la naturaleza del software y persisten pese al avance tecnológico. Las accidentales son las que las herramientas pueden reducir.' },
  { id: 'iswf-07', module: 'm2', type: 'mcq', prompt: '¿Qué modelo de ciclo de vida incorpora el **análisis de riesgos**?', options: ['Espiral', 'Cascada', 'Incremental', 'Prototipos'], answer: 0, explain: 'Boehm propuso el **espiral** con un cuadrante específico de análisis de riesgos; cada vuelta es un mini-proyecto centrado en riesgos.' },
  { id: 'iswf-08', module: 'm2', type: 'mcq', prompt: 'La principal desventaja de cascada (el cliente no ve avances hasta muy tarde) la subsana el modelo:', options: ['Incremental', 'Espiral', 'Clásico modificado', 'Formal'], answer: 0, explain: 'El **incremental** entrega subsistemas operativos parciales, así el cliente ve y usa avances desde temprano.', source: SRC_F },
  { id: 'iswf-09', module: 'm2', type: 'mcq', prompt: 'Las fases del **Proceso Unificado (UP)** son:', options: ['Inicio, Elaboración, Construcción y Transición', 'Análisis, Diseño, Codificación y Prueba', 'Planificación, Riesgos, Ingeniería y Evaluación', 'Sprint, Review, Retro y Planning'], answer: 0, explain: 'UP: **Inicio, Elaboración, Construcción, Transición**, cada una con iteraciones. Planificación-Riesgos-Ingeniería-Evaluación son los cuadrantes del **espiral**.', source: SRC_F },
  { id: 'iswf-10', module: 'm2', type: 'mcq', prompt: 'El UP es un modelo:', options: ['Iterativo e incremental (híbrido)', 'Estrictamente secuencial', 'Sin fases', 'Exclusivo de métodos formales'], answer: 0, explain: 'UP combina fases con iteraciones que recorren todos los flujos de trabajo: es **iterativo e incremental**, y se asocia a UML.' },
  { id: 'iswf-11', module: 'm2', type: 'mcq', prompt: 'El modelo de **prototipos** es especialmente útil cuando:', options: ['El cliente no puede describir claramente lo que quiere', 'Los requisitos están totalmente definidos y estables', 'El proyecto es crítico y requiere matemática formal', 'Hay que entregar sin ver al cliente'], answer: 0, explain: 'El prototipo simula el sistema para obtener **retroalimentación** y descubrir requisitos. Con requisitos estables conviene cascada.' },
  { id: 'iswf-12', module: 'm2', type: 'tf', prompt: 'El modelo en cascada es apropiado cuando los requisitos están completamente definidos al inicio y no se esperan cambios.', answer: true, explain: 'Por su rigidez, cascada solo encaja con requisitos **estables y completos** desde el principio.' },
  { id: 'iswf-13', module: 'm3', type: 'mcq', prompt: 'En Scrum, ¿quién administra el product backlog y define prioridades?', options: ['El Product Owner', 'El Scrum Master', 'El equipo', 'El cliente final directamente'], answer: 0, explain: 'El **Product Owner** (una sola persona) es dueño del backlog. El Scrum Master es coach y quita impedimentos; no es jefe.', source: SRC_F },
  { id: 'iswf-14', module: 'm3', type: 'tf', prompt: 'En Scrum, el Product Owner y el Scrum Master pueden ser la misma persona si el equipo es chico.', answer: false, explain: 'La cátedra lo marca: **nunca** pueden ser la misma persona, porque tienen responsabilidades en tensión (valor del producto vs proceso del equipo).' },
  { id: 'iswf-15', module: 'm3', type: 'mcq', prompt: '¿Cuál de estas es una práctica de **XP**?', options: ['Programación en pares y cliente en el sitio', 'Sprints con Scrum Master', 'Documentación exhaustiva antes de codificar', 'Análisis de riesgos por cuadrantes'], answer: 0, explain: 'XP: liberación limitada, semana de 40 h, **cliente en el sitio** y **programación en pares**, con historias de usuario.' },
  { id: 'iswf-16', module: 'm3', type: 'mcq', prompt: 'Duración típica de un **sprint**:', options: ['Entre 1 y 4 semanas', 'Un día', 'Entre 3 y 6 meses', 'Lo que dure el proyecto'], answer: 0, explain: 'Sprints de **1 a 4 semanas**, con equipo, calidad y alcance fijos durante el sprint.' },
  { id: 'iswf-17', module: 'm4', type: 'mcq', prompt: 'Una entrevista que empieza con preguntas **abiertas** y termina con **cerradas** tiene estructura:', options: ['Embudo', 'Pirámide', 'Diamante', 'Libre'], answer: 0, explain: '**Embudo** (deductiva): de lo general a lo específico; útil cuando el entrevistado necesita expresarse. Pirámide es al revés y diamante combina las dos.', source: SRC_F },
  { id: 'iswf-18', module: 'm4', type: 'mcq', prompt: 'La estructura **piramidal** se usa cuando:', options: ['El entrevistado no se muestra participativo: se arranca con cerradas para involucrarlo', 'El entrevistado necesita expresar sus sentimientos', 'Se quiere evitar preguntas cerradas', 'Hay muchas personas a la vez'], answer: 0, explain: 'Pirámide = inductiva: **cerradas → abiertas**, para ir "soltando" a alguien poco participativo.' },
  { id: 'iswf-19', module: 'm4', type: 'mcq', prompt: '¿Cuándo conviene usar un **cuestionario**?', options: ['Cuando hay muchas personas o están en ubicaciones dispersas', 'Para ver procedimientos informales en el puesto', 'Siempre antes que una entrevista', 'Solo con la gerencia'], answer: 0, explain: 'El cuestionario escala: muchas personas, filiales lejanas, estudios preliminares. Los procedimientos informales se detectan con **observación directa**.', source: SRC_F },
  { id: 'iswf-20', module: 'm4', type: 'mcq', prompt: '"¿Qué opina de este **obsoleto** modo de trabajo?" es un ejemplo de pregunta:', options: ['Tendenciosa', 'De sondeo', 'Cerrada', 'Doble'], answer: 0, explain: 'Muestra la opinión del entrevistador y condiciona la respuesta: es **tendenciosa**. Una pregunta doble mete dos preguntas en una.' },
  { id: 'iswf-21', module: 'm5', type: 'mcq', prompt: 'En un diagrama de actividad, la **barra de sincronización** sirve para:', options: ['Dividir en hilos paralelos (split) y unirlos (merge)', 'Tomar una decisión con condiciones', 'Marcar el fin del proceso', 'Indicar quién hace cada actividad'], answer: 0, explain: 'Split y merge modelan **paralelismo**. La decisión es el rombo, el fin es ◉ y los responsables van en carriles.' },
  { id: 'iswf-22', module: 'm5', type: 'mcq', prompt: 'El principal aporte del diagrama de actividad es:', options: ['Modelar comportamiento paralelo (workflows, multihilo)', 'Mostrar los mensajes entre objetos en el tiempo', 'Diseñar la base de datos', 'Reemplazar a los casos de uso'], answer: 0, explain: 'Su fuerte es el **paralelismo**; su debilidad, que no muestra bien la relación acción-objeto (eso lo hace el diagrama de secuencia).' },
  { id: 'iswf-23', module: 'm5', type: 'mcq', prompt: '¿Para qué sirve el **modelo de negocio**?', options: ['Para comprender los procesos del cliente y recomendar qué informatizar', 'Para programar la interfaz', 'Para estimar el costo del hardware', 'Para probar el sistema'], answer: 0, explain: 'Describe los procesos de la empresa: entenderlos permite proponer qué automatizar y cómo encajar lo nuevo con lo existente.', source: SRC_F },
  { id: 'iswf-24', module: 'm6', type: 'mcq', prompt: 'La ingeniería de requerimientos debe:', options: ['Obtener una descripción completa del comportamiento externo y generar la SRS', 'Incluir el diseño de las estructuras de datos', 'Detallar la estructura modular del sistema', 'Abstraerse de la extracción de requerimientos'], answer: 0, explain: 'Su resultado es la **SRS** con el comportamiento **externo**. Estructuras de datos y módulos son **diseño**, otra etapa.', source: SRC_F },
  { id: 'iswf-25', module: 'm6', type: 'mcq', prompt: '¿Cuál es un **defecto** típico de la ingeniería de requerimientos?', options: ['Requisitos ambiguos y usuarios poco involucrados', 'Requisitos necesarios y suficientes', 'Validación con el cliente', 'Documentar los límites del sistema'], answer: 0, explain: 'La ambigüedad genera interpretaciones distintas y la falta de participación del usuario es una de las principales causas de fracaso.', source: SRC_F },
  { id: 'iswf-26', module: 'm6', type: 'mcq', prompt: 'El orden de las etapas de la ingeniería de requerimientos es:', options: ['Extracción → análisis → especificación → validación', 'Diseño → extracción → prueba → validación', 'Especificación → extracción → análisis', 'Validación → análisis → extracción'], answer: 0, explain: 'Se relevan las necesidades, se analizan, se especifican en la SRS y el cliente **valida**.' },
  { id: 'iswf-27', module: 'm6', type: 'tf', prompt: 'Un error de requerimientos detectado en la etapa de pruebas cuesta lo mismo de corregir que si se detecta en requerimientos.', answer: false, explain: 'El costo crece con el avance del proyecto: en pruebas puede ser **miles de veces** mayor que en la etapa de requerimientos.' },
  { id: 'iswf-28', module: 'm7', type: 'mcq', prompt: '¿Qué **no** debe incluir la SRS?', options: ['Costos, cronogramas y diseño', 'Funcionalidad', 'Interfaces externas', 'Restricciones de diseño'], answer: 0, explain: 'La SRS describe **qué** hace el software. Costos, cronogramas, diseño y planes de prueba van en otros documentos.' },
  { id: 'iswf-29', module: 'm7', type: 'mcq', prompt: 'Tres atributos de una buena especificación de requerimientos son:', options: ['Correcta, no ambigua y verificable', 'Extensa, técnica y cerrada', 'Informal, rápida y oral', 'Ambigua, flexible y abierta'], answer: 0, explain: 'IEEE 830: **correcta, no ambigua, completa, consistente, clasificada por importancia, verificable, modificable y trazable**.', source: SRC_F },
  { id: 'iswf-30', module: 'm7', type: 'tf', prompt: 'Al relevar hay que cuantificar procesos y almacenamientos, aunque eso no afectará la solución a implementar.', answer: false, explain: 'Un mismo problema con distinto volumen lleva a **soluciones distintas** (20 autorizaciones por día no es lo mismo que 5000 por hora).', source: SRC_F },
  { id: 'iswf-31', module: 'm7', type: 'tf', prompt: 'El estándar IEEE 830 es una guía para especificar requerimientos que las organizaciones adaptan a su forma de trabajo.', answer: true, explain: 'No se aplica al pie de la letra: es una **guía** de referencia que cada organización adapta.', source: SRC_F },
  { id: 'iswf-32', module: 'm7', type: 'mcq', prompt: 'Los requerimientos de **capacidad** como número de terminales o usuarios simultáneos son requisitos:', options: ['Estáticos', 'Dinámicos', 'Funcionales', 'De diseño'], answer: 0, explain: '**Estáticos**: cantidades fijas (terminales, usuarios, volumen de información). **Dinámicos**: transacciones o datos por período de tiempo.' },
];

const exercises: WorkedExercise[] = [
  { id: 'iswf-e1', module: 'm10', title: 'Final · objetos entidad del caso "Motores"', statement: 'Una empresa vende repuestos. Los pedidos se hacen por teléfono, solo para clientes (el alta es personal: datos y número de cliente). Al pedir, se consultan las existencias; si se puede cumplir se confecciona un **remito** para Expedición, que envía con la **factura** (se paga contra entrega). Si no se puede, el pedido queda **pendiente**. Definí los objetos **entidad** mínimos para el diagrama de secuencia.', steps: [
    { title: 'Buscar lo que se guarda en el tiempo', body: 'Entidad = información que **persiste** más allá del caso de uso. Subrayá sustantivos que se registran.' },
    { title: 'Candidatos', body: '**Cliente** (datos + número) · **Repuesto** (con su existencia/stock) · **Pedido** (con estado: cumplido o pendiente) · **Remito** · **Factura**.' },
    { title: 'Descartar', body: 'Teléfono (medio, no dato), Expedición (actor o área externa, no entidad del sistema), "existencias" (atributo del repuesto).' },
  ], result: 'Entidades: **Cliente, Repuesto, Pedido, Remito, Factura**. Interfaz: pantalla de pedidos; control: control de pedidos.' },
];

const P = port as { theory: TheoryBlock[]; questions: Question[]; videos: VideoItem[] };

const content: SubjectContent = {
  subjectId: 'iisw',
  theory: [...theory, ...P.theory],
  questions: [...questions, ...P.questions],
  exercises,
  videos: [...VIDEOS, ...P.videos],
  cheatsheet: [
    { t: 'Sistema vs software', d: 'Sistema = software + hardware + gente + datos + documentación + procedimientos (manual y computarizado). Software = parte lógica.' },
    { t: 'Cualidades', d: 'Producto: correctitud, confiabilidad, robustez, performance, amigabilidad, verificabilidad, mantenibilidad, reusabilidad, portabilidad, interoperabilidad. Proceso: productividad, **oportunidad** (a tiempo), visibilidad.' },
    { t: 'Principios', d: 'Rigor/formalidad · separación de incumbencias · **modularidad (alta cohesión, bajo acoplamiento)** · abstracción · anticipación al cambio · generalización · incrementalidad.' },
    { t: 'Ciclos de vida', d: 'Cascada (estable) · Espiral (RIESGOS) · Incremental (entregas operativas) · Prototipos (cliente no sabe) · Evolutivo · UP (Inicio, Elaboración, Construcción, Transición; iterativo e incremental).' },
    { t: 'Scrum', d: 'Sprints 1–4 semanas · Product Owner (backlog) · Equipo autogestionado 7±2 · Scrum Master (coach, no jefe) · PO ≠ SM.' },
    { t: 'Entrevista', d: 'Abiertas / cerradas / sondeo · Pirámide (cerradas→abiertas) · Embudo (abiertas→cerradas) · Diamante. Evitar tendenciosas y dobles.' },
    { t: 'Ingeniería de requerimientos', d: 'Extracción → análisis → especificación (SRS) → validación. Comportamiento EXTERNO; no diseño.' },
    { t: 'SRS (IEEE 830)', d: 'Correcta, no ambigua, completa, consistente, clasificada, verificable, modificable, trazable. Sin costos ni cronogramas ni diseño. Cuantificar sí cambia la solución.' },
    { t: '2ª mitad', d: 'CU (actores externos), descripción, secuencia (interfaz → control → entidad), pruebas, tipos de sistemas, reingeniería y métodos formales: ver los módulos 8 a 12.' },
  ],
};

content.theory = content.theory.map((b) => {
  // los temas de la 2ª mitad vienen del sitio anterior: se les asocia el video de su capítulo (ch1-t3 → ch1-v1)
  const v = P.videos.find((x) => x.id === `${b.id.split('-')[0]}-v1`);
  return { ...b, scenes: SCENES[b.id] ?? b.scenes, video: v ? { src: v.src, poster: v.poster, minutes: v.minutes } : undefined };
});
content.exercises = content.exercises.map((e) => ({ ...e, scenes: EX_SCENES[e.id] }));
content.lessons = [
  {
    id: 'iisw-clase-1', examId: 'final', title: 'Final · primera mitad: módulos 1 a 7',
    summary: 'Definiciones, cualidades y principios; ciclos de vida; Scrum; técnicas de extracción; diagrama de actividad y BPMN; ingeniería de requerimientos y SRS.',
    intro: [
      'Esta clase cubre la primera mitad de Introducción a la Ingeniería de Software para el final: los módulos 1 a 7. La segunda mitad, casos de uso y secuencia, ya tiene sus videos.',
      'Vamos a ver qué es la ingeniería de software, cualidades y principios, ciclos de vida, Scrum, cómo se extraen requerimientos, el modelado de procesos y la especificación.',
    ],
    parts: ['m1-def', 'm1-cual', 'm1-princ', 'm2-ciclos', 'm3-agiles', 'm4-extraccion', 'm5-modelado', 'm6-ir', 'm7-srs', 'ex:iswf-e1'],
    outro: [
      'Sistema = software + hardware + gente + procedimientos manuales. Oportunidad = entregar a tiempo. Alta cohesión y bajo acoplamiento.',
      'Cascada: el cliente ve todo al final (lo subsana el incremental). Espiral = riesgos. UP: inicio, elaboración, construcción, transición.',
      'Pirámide: cerradas → abiertas; embudo: al revés. SRS: comportamiento externo, sin costos ni cronogramas; cuantificar sí cambia la solución.',
    ],
  },
];

export default content;
