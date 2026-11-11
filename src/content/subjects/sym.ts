import type { Question, SubjectContent, TheoryBlock } from '../types';
import { VIDEOS } from '../videos/sym';
import { SCENES } from '../visual/sym';
import { FINAL_EXERCISES, FINAL_EX_SCENES, FINAL_QUESTIONS } from '../visual/sym-final';

/** SyM · final. Redacción propia sobre los apuntes de la cátedra, las autoevaluaciones y finales 2023 (Drive). */
const A = 'autoevaluación de la cátedra';
const F = 'final 2023 (Drive de estudiantes)';

const theory: TheoryBlock[] = [
  { id: 'y1', module: 'm1', title: 'Tipos de organización', points: [
    '**Organización formal**: estructura creada **deliberadamente** (organigrama, normas). La informal surge de las relaciones espontáneas.',
    '**Departamentalización**: agrupar departamentos o gerencias por actividades similares (por función, producto, zona, cliente).',
    'Estructuras: lineal, funcional, divisional y **matricial** (mando múltiple: cada empleado depende de un gerente funcional **y** de uno de proyecto).',
    '**Eficacia**: hacer lo que se debe (lograr los objetivos correctos). **Eficiencia**: hacerlo con el mínimo de recursos.',
    '**Cinco fuerzas de Porter**: rivalidad entre competidores, amenaza de nuevos entrantes, de sustitutos, poder de negociación de proveedores y de clientes. (Los grupos reguladores **no** son una fuerza).',
  ] },
  { id: 'y2', module: 'm2', title: 'Puestos y equipos', points: [
    '**Puesto**: descripción formal y escrita (tareas, ubicación en el organigrama, objetivos y cómo se miden). **Rol**: además incluye los comportamientos que se esperan de quien lo ocupa.',
    '**Grupo de trabajo**: un gerente y sus empleados directos, parte del organigrama. **Equipo**: genera **sinergia** (más que la suma de los esfuerzos individuales).',
    '**Task force**: especialistas de distintas áreas reunidos para una tarea concreta y **temporal** (lanzar un producto en seis meses). **Comité**: existencia **duradera**, para temas estratégicos o recurrentes. Ambos comparten la composición **interdisciplinaria**.',
  ] },
  { id: 'y3', module: 'm3', title: 'Poder y autoridad', points: [
    '**Poder**: capacidad de cambiar actitudes o conductas. **Influencia**: el acto que produce ese cambio. **Autoridad**: poder formal que da el puesto.',
    'Bases del poder: **legítimo** (por el cargo), **de recompensa**, **coercitivo** (sanción), **experto** y **referente** (carisma). "Como su jefe les pido… si lo logran tendrán un bono" = legítimo + recompensa.',
    '**Autoridad lineal**: de los gerentes con responsabilidad directa en la cadena de mando. **Staff**: asesora. **Funcional**: un área de staff impone una norma de su especialidad a toda la empresa (TI obliga a todos a hacer una capacitación de seguridad).',
    '**Centralización**: grado en que las decisiones se concentran arriba. **Descentralización vertical**: delegar hacia abajo en la cadena de mando.',
  ] },
  { id: 'y4', module: 'm4', title: 'La dirección', points: [
    '**Motivación**: factores que ocasionan, canalizan y sostienen la conducta. **Maslow**: fisiológicas → seguridad → **sociales** (amistad, afecto) → estima → autorrealización.',
    '**Teoría del reforzamiento**: la conducta se modifica con sus consecuencias (refuerzos y castigos).',
    '**Rejilla administrativa**: 9.1 = dirección de **tareas** (resultados, poco interés en la gente) · 1.9 = club campestre · 9.9 = equipo.',
    'Decisión racional: identificar el problema → generar alternativas → **evaluarlas** → **elegir** → implementar → evaluar. Negociación: enfoque **duro** (posición rígida, desconfianza, ganar) vs blando vs por principios.',
  ] },
  { id: 'y5', module: 'm5', title: 'Planificación y control', points: [
    'Niveles: **estratégico** (largo plazo, alta dirección), **táctico** (decisiones programadas y no programadas de los mandos medios), **operativo**.',
    '**Metas**: enfocan esfuerzos, guían planes y sirven para evaluar. **Administración estratégica**: adaptar recursos y habilidades al entorno cambiante.',
    '**FODA**: fortalezas y debilidades (internas), oportunidades y **amenazas** (externas: la entrada de competidores más tecnificados es una amenaza).',
    '**Cadena de valor** (Porter): actividades **primarias** (logística, operaciones, **marketing y ventas**, servicio) y de apoyo. **Balanced scorecard**: perspectivas financiera, clientes, **procesos internos** y aprendizaje.',
    'Control: establecer estándares → **medir** → **evaluar** → corregir. El balance general es un control **financiero**.',
  ] },
  { id: 'y6', module: 'm6', title: 'El proceso administrativo', points: [
    'Sistema de operaciones: **insumos** (materias primas, RR. HH., equipos, información) → transformación → productos.',
    '**Manuales**: de **organización** (diseño funcional, estructura), de **procedimientos** (circuitos y procesos de las operaciones).',
    '**Flujogramas** de circuitos administrativos: el **rombo** es una decisión; sirven para detectar deficiencias y duplicidad de tareas.',
    '**Six Sigma**: máximo **3,4 defectos por millón** (99,9996 %); ciclo DMAIC: definir, medir, analizar, mejorar, controlar.',
  ] },
  { id: 'y7', module: 'm7', title: 'Teoría de sistemas', points: [
    '**Sistema**: conjunto de componentes que interactúan para lograr un objetivo común.',
    '**Homeostasis**: equilibrio dinámico logrado por **autorregulación**. Sistemas abiertos (intercambian con el entorno) y cerrados.',
    'Procesamiento **en línea o interactivo** (se actualiza al instante, como el stock de un e-commerce) vs **por lotes** (batch).',
    '**Desarrollo estructurado**: partió de la programación estructurada con análisis **top-down**.',
  ] },
  { id: 'y8', module: 'm8', title: 'Administración de proyectos', points: [
    '**Proyecto**: esfuerzo **temporal** (comienzo y fin definidos) con un resultado **único**. Nace de pedidos de clientes, cambios legales o el plan estratégico.',
    '**PMBOK**: guía de buenas prácticas publicada por el **PMI**. **Project charter**: autoriza formalmente el proyecto y nombra al gerente.',
    'Fases: inicio → **planificación** (plan detallado) → ejecución → control → cierre. **WBS**: descomposición jerárquica de entregables; el nivel más bajo es el **paquete de trabajo**.',
    '**Objetivos SMART**: específico, medible, alcanzable, relevante, con tiempo. "Mejorar la satisfacción del cliente" no es específico, ni medible, ni tiene plazo.',
    '**Esfuerzo** (horas-persona) ≠ duración: 24 h-persona con 2 personas de 8 h diarias = **1,5 días**. **Camino crítico**: cualquier atraso en sus tareas atrasa el proyecto. **Gantt**: barras de tiempo por tarea.',
    'Riesgos: evitar, transferir, mitigar o **anticipar** (tener un servidor de respaldo listo). Calidad: planificación, **aseguramiento (QA: auditar procesos)** y control (QC: revisar productos).',
  ] },
  { id: 'y9', module: 'm9', title: 'Sistemas de información', points: [
    '**Dato**: hecho en bruto. **Información**: datos procesados y organizados con significado.',
    '**Sistema de información**: recolecta, procesa, almacena y distribuye información para apoyar decisiones y control.',
    '**TPS** (transacciones: un punto de venta) → **MIS** (informes resumidos y de rutina para mandos medios, decisiones **estructuradas**) → **DSS** (modelos y simulaciones para decisiones **semiestructuradas**: "¿qué pasa si sube la tasa?") → ESS (alta dirección).',
  ], trap: 'MIS = informes **predefinidos**; DSS = permite **manipular** datos y modelos.' },
  { id: 'y10', module: 'm10', title: 'Análisis, diseño e implementación', points: [
    '**Modelo lógico**: la solución en forma conceptual, independiente de la tecnología. **Modelo físico**: archivos, bases de datos, estructuras y el hardware/software a usar.',
    'Relevamiento: entrevistas, **cuestionarios** (muchos usuarios o dispersos), observación, revisión de documentos.',
    'Pruebas: de **código** (lógica interna), de **almacenamiento** (capacidad de guardar la información), de volumen, de usuario.',
    'Entornos: desarrollo, prueba y **producción** (donde trabajan los usuarios reales). **Preimplementación**: capacitar a supervisores y operadores.',
  ] },
  { id: 'y11', module: 'm11', title: 'Proceso de desarrollo de sistemas', points: [
    'Estrategias de implementación: directa, en paralelo, **piloto** (una sola sucursal primero) y por fases.',
    '**Plan de contingencia**: asegurar la continuidad de las operaciones críticas ante fallas.',
    '**Evaluación posimplementación**: verificar objetivos y detectar necesidades de capacitación.',
  ] },
  { id: 'y12', module: 'm12', title: 'Comunicación oral y escrita', points: [
    'Proceso: emisor → mensaje → canal → **receptor** (quien recibe la información) → retroalimentación.',
    '**Oratoria**: hablar con elocuencia para **persuadir o convencer**. Primer paso del discurso: **elegir el tema**. **Concisión**: lo esencial con la menor cantidad de palabras. Exposición **objetiva**, sin emociones personales.',
    'Informes y actas = comunicaciones **formales internas**. Informe: bosquejo con frases clave que guían la búsqueda de información.',
  ] },
];

const q: Question[] = [
  { id: 'sym-01', module: 'm1', type: 'mcq', prompt: 'Herramienta estratégica para analizar las fuerzas competitivas de una empresa:', options: ['Porter (cinco fuerzas)', 'FODA', 'PERT', 'Taylor'], answer: 0, explain: 'FODA analiza fortalezas, debilidades, oportunidades y amenazas; PERT es para proyectos.', source: F },
  { id: 'sym-02', module: 'm1', type: 'mcq', prompt: '¿Qué estructura tiene mando múltiple (gerente funcional + gerente de proyecto)?', options: ['Matricial', 'Lineal', 'Funcional', 'Divisional'], answer: 0, explain: 'La matricial combina la estructura funcional con la de proyectos.', source: A },
  { id: 'sym-03', module: 'm1', type: 'mcq', prompt: '"Hacer lo que se debe hacer" (determinar los objetivos apropiados) es:', options: ['Eficacia', 'Eficiencia', 'Productividad', 'Calidad'], answer: 0, explain: 'Eficiencia es usar los recursos mínimos.', source: A },
  { id: 'sym-04', module: 'm1', type: 'mcq', prompt: '¿Cuál **no** es una de las cinco fuerzas de Porter?', options: ['Los grupos reguladores', 'La amenaza de sustitutos', 'El poder de los proveedores', 'La rivalidad entre competidores'], answer: 0, explain: 'Las cinco: rivalidad, nuevos entrantes, sustitutos, proveedores y clientes.', source: A },
  { id: 'sym-05', module: 'm2', type: 'mcq', prompt: 'Se reúne a especialistas de varias áreas para lanzar un producto en seis meses. Es un:', options: ['Task force', 'Comité', 'Grupo de trabajo', 'Departamento'], answer: 0, explain: 'Tarea concreta y temporal → task force. El comité es duradero.', source: A },
  { id: 'sym-06', module: 'm2', type: 'mcq', prompt: 'La diferencia entre equipo y grupo es que el equipo:', options: ['Genera sinergia: más que la suma de los esfuerzos individuales', 'Tiene más personas', 'Tiene un jefe', 'Es permanente'], answer: 0, explain: 'El grupo suma esfuerzos; el equipo los potencia.', source: A },
  { id: 'sym-07', module: 'm2', type: 'tf', prompt: 'El puesto y el rol son lo mismo.', answer: false, explain: 'El puesto es la descripción formal escrita; el rol suma los comportamientos esperados.', source: A },
  { id: 'sym-08', module: 'm3', type: 'mcq', prompt: '"Como su jefe, les pido que terminen para el viernes; si lo logran tendrán un bono." Usa poder:', options: ['Legítimo y de recompensa', 'Coercitivo', 'Experto', 'Referente'], answer: 0, explain: '"Como su jefe" = legítimo; "bono" = recompensa.', source: A },
  { id: 'sym-09', module: 'm3', type: 'mcq', prompt: 'El director de TI (staff) obliga a toda la empresa a hacer un curso de seguridad. Es autoridad:', options: ['Funcional', 'Lineal', 'De staff asesora', 'Informal'], answer: 0, explain: 'Un área staff impone una norma de su especialidad a todos (y además usa poder coercitivo si es obligatorio).', source: A },
  { id: 'sym-10', module: 'm3', type: 'mcq', prompt: 'La autoridad lineal es la de:', options: ['Los gerentes con responsabilidad directa en la cadena de mando', 'Los asesores', 'Los especialistas externos', 'Los comités'], answer: 0, explain: 'Staff asesora; lineal manda en la cadena.', source: A },
  { id: 'sym-11', module: 'm4', type: 'mcq', prompt: 'En la pirámide de Maslow, la amistad y el afecto son necesidades:', options: ['Sociales', 'De estima', 'De seguridad', 'Fisiológicas'], answer: 0, explain: 'Orden: fisiológicas, seguridad, sociales, estima, autorrealización.', source: A },
  { id: 'sym-12', module: 'm4', type: 'mcq', prompt: 'En la rejilla administrativa, el estilo enfocado en resultados con poco interés por la gente es:', options: ['Dirección de tareas (9.1)', 'Club campestre (1.9)', 'Equipo (9.9)', 'Empobrecido (1.1)'], answer: 0, explain: '9 en producción, 1 en personas.', source: A },
  { id: 'sym-13', module: 'm4', type: 'mcq', prompt: 'En la toma racional de decisiones, después de evaluar las alternativas se debe:', options: ['Elegir la alternativa', 'Identificar el problema', 'Generar alternativas', 'Controlar'], answer: 0, explain: 'Generar → evaluar → elegir → implementar.', source: A },
  { id: 'sym-14', module: 'm4', type: 'mcq', prompt: 'Enfoque de negociación con posición rígida, desconfianza y el objetivo de ganar:', options: ['Duro', 'Blando', 'Por principios', 'Colaborativo'], answer: 0, explain: 'El blando prioriza la relación; el de principios, los intereses.', source: A },
  { id: 'sym-15', module: 'm5', type: 'mcq', prompt: 'En un FODA, "la entrada al mercado de empresas más tecnificadas" es:', options: ['Amenaza', 'Debilidad', 'Oportunidad', 'Fortaleza'], answer: 0, explain: 'Es externa (amenaza/oportunidad) y perjudica → amenaza.', source: A },
  { id: 'sym-16', module: 'm5', type: 'mcq', prompt: 'En la cadena de valor, es una actividad **primaria**:', options: ['Marketing y ventas', 'Gestión de RR. HH.', 'Infraestructura', 'Desarrollo tecnológico'], answer: 0, explain: 'Las otras son actividades de apoyo.', source: A },
  { id: 'sym-17', module: 'm5', type: 'mcq', prompt: 'En el balanced scorecard, "¿en qué procesos debemos sobresalir para satisfacer a los clientes?" es la perspectiva de:', options: ['Procesos internos', 'Clientes', 'Financiera', 'Aprendizaje'], answer: 0, explain: 'Pregunta por procesos → procesos internos del negocio.', source: A },
  { id: 'sym-18', module: 'm5', type: 'mcq', prompt: 'En el proceso de control, después de medir los resultados se:', options: ['Evalúan los resultados', 'Fijan los estándares', 'Planifica', 'Contrata'], answer: 0, explain: 'Estándares → medir → evaluar → corregir.', source: A },
  { id: 'sym-19', module: 'm6', type: 'mcq', prompt: 'El manual que refleja el diseño funcional de la empresa es el de:', options: ['Organización', 'Procedimientos', 'Calidad', 'Usuario'], answer: 0, explain: 'El de procedimientos refleja los circuitos y procesos.', source: A },
  { id: 'sym-20', module: 'm6', type: 'mcq', prompt: 'La meta de Six Sigma es:', options: ['3,4 defectos por millón de oportunidades', '1 defecto por cada mil', 'Cero defectos absolutos', '6 % de defectos'], answer: 0, explain: 'Equivale a 99,9996 % de eficiencia; ciclo DMAIC.', source: A },
  { id: 'sym-21', module: 'm6', type: 'tf', prompt: 'En un flujograma, el rombo representa una decisión.', answer: true, explain: 'Y sirven para detectar deficiencias y tareas duplicadas.', source: A },
  { id: 'sym-22', module: 'm7', type: 'mcq', prompt: 'El equilibrio dinámico logrado mediante la autorregulación se llama:', options: ['Homeostasis', 'Entropía', 'Sinergia', 'Equifinalidad'], answer: 0, explain: 'La entropía es la tendencia al desorden.', source: A },
  { id: 'sym-23', module: 'm7', type: 'mcq', prompt: 'Un e-commerce actualiza el stock apenas se hace una compra. Es procesamiento:', options: ['En línea (interactivo)', 'Por lotes', 'Manual', 'Diferido'], answer: 0, explain: 'Por lotes acumula y procesa después.', source: A },
  { id: 'sym-24', module: 'm8', type: 'mcq', prompt: '24 horas-persona de esfuerzo con 2 programadores de 8 h diarias llevan:', options: ['1,5 días laborales', '3 días', '24 días', '12 días'], answer: 0, explain: '2 × 8 = 16 h de trabajo por día → 24 / 16 = 1,5.', source: A },
  { id: 'sym-25', module: 'm8', type: 'mcq', prompt: 'La función del Project charter es:', options: ['Autorizar formalmente el proyecto y nombrar al gerente', 'Detallar el cronograma', 'Listar los riesgos', 'Cerrar el proyecto'], answer: 0, explain: 'El plan detallado se hace después, en la planificación.', source: A },
  { id: 'sym-26', module: 'm8', type: 'mcq', prompt: 'El camino crítico se caracteriza porque:', options: ['Cualquier atraso en sus tareas atrasa el fin del proyecto', 'Es el camino más corto', 'Tiene las tareas más caras', 'Tiene holgura'], answer: 0, explain: 'Es el camino más largo, sin holgura.', source: A },
  { id: 'sym-27', module: 'm8', type: 'mcq', prompt: 'El nivel más bajo de la WBS es:', options: ['El paquete de trabajo', 'El entregable final', 'El hito', 'El proyecto'], answer: 0, explain: 'La WBS descompone jerárquicamente los entregables.', source: A },
  { id: 'sym-28', module: 'm8', type: 'mcq', prompt: 'Tener un servidor de respaldo listo por si falla el principal en el lanzamiento es:', options: ['Anticipar el riesgo', 'Evitarlo', 'Transferirlo', 'Aceptarlo'], answer: 0, explain: 'Se prepara una respuesta antes de que ocurra.', source: A },
  { id: 'sym-29', module: 'm8', type: 'mcq', prompt: 'Auditar los procesos para asegurar que se cumplan los estándares de calidad es:', options: ['Aseguramiento de la calidad (QA)', 'Control de calidad (QC)', 'Planificación de la calidad', 'Testing'], answer: 0, explain: 'QC revisa los productos; QA, los procesos.', source: A },
  { id: 'sym-30', module: 'm9', type: 'mcq', prompt: 'Un punto de venta que registra cada venta y actualiza el stock es un:', options: ['TPS', 'MIS', 'DSS', 'ESS'], answer: 0, explain: 'Procesa transacciones del día a día.', source: A },
  { id: 'sym-31', module: 'm9', type: 'mcq', prompt: 'Un gerente simula el efecto de distintas tasas de interés en la rentabilidad. Usa un:', options: ['DSS', 'MIS', 'TPS', 'CRM'], answer: 0, explain: 'Manipular datos y modelos ("¿qué pasa si…?") es propio del DSS.', source: A },
  { id: 'sym-32', module: 'm9', type: 'tf', prompt: 'Un sistema de información recolecta, procesa, almacena y distribuye información para apoyar las decisiones.', answer: true, explain: 'Es la definición de la cátedra.', source: F },
  { id: 'sym-33', module: 'm10', type: 'mcq', prompt: 'El modelo físico define:', options: ['Archivos, bases de datos, estructuras y el hardware/software a usar', 'La solución conceptual sin tecnología', 'Los objetivos del negocio', 'El organigrama'], answer: 0, explain: 'La versión conceptual es el modelo lógico.', source: A },
  { id: 'sym-34', module: 'm10', type: 'mcq', prompt: 'Los cuestionarios conviene usarlos cuando:', options: ['Hay muchos usuarios o están dispersos', 'Hay un solo usuario clave', 'Se necesita ver el trabajo real', 'No hay tiempo'], answer: 0, explain: 'Para observar el trabajo real se usa la observación.', source: A },
  { id: 'sym-35', module: 'm11', type: 'mcq', prompt: 'Poner el sistema nuevo en una sola sucursal antes de extenderlo es la estrategia:', options: ['Piloto', 'Directa', 'En paralelo', 'Por fases'], answer: 0, explain: 'En paralelo corren el viejo y el nuevo a la vez.', source: A },
  { id: 'sym-36', module: 'm12', type: 'mcq', prompt: 'Los informes y las actas de reuniones son comunicaciones:', options: ['Formales internas', 'Informales', 'Formales externas', 'Orales'], answer: 0, explain: 'Son documentos oficiales que circulan dentro de la organización.', source: A },
  { id: 'sym-37', module: 'm12', type: 'mcq', prompt: 'La concisión en la oratoria es:', options: ['Expresar lo esencial con la menor cantidad de palabras', 'Hablar rápido', 'Usar términos técnicos', 'Repetir las ideas'], answer: 0, explain: 'Primer paso del discurso: elegir el tema.', source: A },
];

const content: SubjectContent = {
  subjectId: 'sym', theory, questions: [...q, ...FINAL_QUESTIONS], exercises: FINAL_EXERCISES, videos: VIDEOS,
  cheatsheet: [
    { t: 'Organización', d: 'formal = deliberada · matricial = mando múltiple · eficacia = lo correcto, eficiencia = pocos recursos · Porter: 5 fuerzas (sin reguladores).' },
    { t: 'Equipos', d: 'task force temporal · comité duradero · equipo = sinergia · puesto formal vs rol.' },
    { t: 'Poder', d: 'legítimo · recompensa · coercitivo · experto · referente · autoridad lineal / staff / funcional.' },
    { t: 'Dirección', d: 'Maslow: fisiológicas, seguridad, sociales, estima, autorrealización · rejilla 9.1 tareas · negociación dura.' },
    { t: 'Planificación', d: 'FODA (O y A externas) · cadena de valor (marketing y ventas = primaria) · BSC: financiera, clientes, procesos, aprendizaje.' },
    { t: 'Proyectos', d: 'temporal y único · charter autoriza · WBS → paquete de trabajo · camino crítico sin holgura · esfuerzo ≠ duración · QA procesos, QC productos.' },
    { t: 'SI', d: 'TPS transacciones · MIS informes rutinarios · DSS modelos "qué pasa si" · lógico (conceptual) vs físico (tecnología) · piloto = una sucursal.' },
  ],
};

content.theory = content.theory.map((b) => ({ ...b, scenes: SCENES[b.id] }));
content.exercises = content.exercises.map((e) => ({ ...e, scenes: FINAL_EX_SCENES[e.id] }));
content.lessons = [
  {
    id: 'sym-clase-2', examId: 'final', title: 'Final resuelto paso a paso · catorce puntos',
    summary: 'Un final anterior reformulado: circuitos, liderazgo, equipos, estructura, control, estrategia, sistemas, poder y autoridad.',
    intro: ['Vamos a resolver los catorce puntos de un final anterior de Sistemas y Métodos. Los enunciados están reformulados y convertidos en opción múltiple, con diagramas y una justificación de cada respuesta.', 'No tomes las respuestas marcadas por otro estudiante como una solución oficial. En este recorrido razonamos cada concepto: primero identificamos la propiedad relevante, después la comparamos con las opciones y recién entonces elegimos.'],
    parts: FINAL_EXERCISES.map((e) => `ex:${e.id}`),
    outro: ['Las distinciones clave del final son procedimiento frente a estructura, división frente a agrupación del trabajo, origen formal frente a vínculos espontáneos, y poder frente a autoridad.', 'Para repasar, volvé a los ejercicios visuales e intentá elegir la opción antes de recorrer la explicación. El simulacro te deja combinar estos puntos con el resto del banco y revisar tus errores al terminar.'],
  },
  {
    id: 'sym-clase-1', examId: 'final', title: 'Final completo: organización, gestión y sistemas',
    summary: 'Estructuras y Porter, puestos y equipos, poder, dirección, planificación y control, procesos, teoría de sistemas, proyectos, tipos de SI, desarrollo e implementación, comunicación.',
    intro: [
      'Esta es la clase completa para el final de Sistemas y Métodos: los doce módulos con los conceptos que aparecen en los cuestionarios de Blackboard.',
      'Vamos de la organización a los sistemas: estructuras, equipos, poder, dirección, planificación, procesos, teoría de sistemas, proyectos, sistemas de información, implementación y comunicación.',
    ],
    parts: ['y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'y10', 'y11', 'y12'],
    outro: [
      'Matricial = mando múltiple · Porter: 5 fuerzas (no reguladores) · task force temporal, comité duradero · autoridad funcional = staff que impone su norma.',
      'Maslow: fisiológicas, seguridad, sociales, estima, autorrealización · 9.1 = tareas · FODA: amenazas externas · Six Sigma: 3,4 por millón.',
      'Proyecto: temporal y único · 24 h-persona con 2 personas de 8 h = 1,5 días · MIS informes predefinidos, DSS modelos · piloto = una sucursal.',
    ],
  },
];

export default content;
