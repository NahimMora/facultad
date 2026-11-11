import type { Lesson, Question, WorkedExercise } from '../types';
import type { VisScene } from '../../vis/types';
import { reviewBank, type ReviewItem } from './review';
import { arr, box, head, ico, line, scene, table, txt } from './h';

// Modelo anterior de siete puntos: se conserva el objetivo de cada punto,
// con enunciados propios y figuras nuevas. Las respuestas de estudiantes no
// se toman como una resolución oficial ni como formato del próximo final.
const cases: ReviewItem[] = [
  { module: 'm1', title: '1 · Software y sistema', prompt: 'Una organización combina aplicaciones, personas y procedimientos manuales. ¿Cómo distinguís sistema y software?', choices: ['El sistema reúne esos elementos; el software es su parte lógica computacional', 'El sistema solo puede contener actividades manuales', 'Software significa exclusivamente hardware', 'Ambos términos excluyen siempre a las personas'], explain: 'El sistema es más amplio que el software: también incluye personas, equipos, datos y procedimientos. Puede integrar procesos manuales y computarizados. El software aporta programas y otros elementos lógicos.', nodes: ['Personas, equipos y procedimientos', 'Software: componente lógico', 'Sistema: conjunto organizado'], say: [
    'Primero delimitá qué observás. Si una organización recibe solicitudes, registra información y entrega resultados, intervienen personas, reglas, datos y equipos. Algunas actividades pueden hacerse manualmente y otras con programas. El sistema estudiado abarca la cooperación de esos elementos para cumplir un propósito.',
    'Dentro de ese conjunto, el software es la parte lógica computacional. No incluye por sí solo a todas las personas ni a todo el equipamiento físico. Tampoco hace falta que cada actividad del sistema esté automatizada para poder analizarlo como un sistema.',
    'La relación correcta es parte y conjunto. Al responder, no reduzcas sistema a procedimiento manual ni lo identifiques únicamente con una aplicación. Justificá con el límite del caso: qué componentes participan y cómo se relacionan para producir el resultado esperado.',
  ] },
  { module: 'm2', title: '2 · UP, cascada y espiral', prompt: '¿Qué descripción distingue al Proceso Unificado frente a una cascada predominantemente secuencial y a una espiral guiada por riesgos?', choices: ['Organiza cuatro fases con iteraciones e incrementos, considerando arquitectura y riesgos', 'Consiste en una única entrega sin iteraciones', 'Su finalidad es agregar riesgos al proyecto', 'Elimina análisis, diseño y pruebas'], explain: 'UP es iterativo e incremental y distingue Inicio, Elaboración, Construcción y Transición. Las fases no equivalen a hacer una sola actividad cada una. Cascada destaca una secuencia predominante; espiral organiza ciclos alrededor de riesgos.', nodes: ['Cascada: secuencia predominante', 'Espiral: tratar riesgos por ciclos', 'UP: fases con iteraciones e incrementos'], say: [
    'Compará el criterio que organiza el trabajo. La cascada clásica propone una secuencia predominante de actividades. Si las necesidades cambian tarde, volver atrás puede resultar costoso. Evitá exagerar diciendo que todo proyecto llamado cascada prohíbe absolutamente cualquier revisión o corrección.',
    'En la espiral, cada vuelta considera objetivos, alternativas, riesgos, desarrollo y planificación del siguiente ciclo. El modelo busca identificar y reducir riesgos: no tiene como objetivo agregarlos. Esa palabra cambia por completo el sentido de una respuesta aunque el resto suene familiar.',
    'UP combina una organización por fases con desarrollo iterativo e incremental. En una iteración se pueden trabajar distintos flujos y obtener un incremento. Es dirigido por casos de uso, centrado en arquitectura y atento a riesgos; no es simplemente una lista de cuatro tareas aisladas.',
  ] },
  { module: 'm6', title: '3 · Defectos en requerimientos', prompt: '¿Qué conjunto señala problemas que necesitás tratar en ingeniería de requerimientos?', choices: ['Ambigüedad, poca participación de usuarios y cambios sin evaluar su impacto', 'Requisitos necesarios y criterios verificables', 'Participación de usuarios y trazabilidad', 'Todo cambio, incluso acordado y controlado, es un defecto inevitable'], explain: 'La ambigüedad permite interpretaciones distintas y la falta de participación dificulta descubrir necesidades. Los cambios requieren análisis, acuerdo y trazabilidad; cambiar no es intrínsecamente un defecto. El problema es hacerlo sin controlar impacto y consistencia.', nodes: ['Ambigüedad o usuarios ausentes', 'Relevar, aclarar y validar', 'Gestionar cambios y su impacto'], say: [
    'Leé las opciones como propiedades concretas del proceso. Si un requisito admite interpretaciones diferentes, cada persona puede imaginar una solución distinta. Si quienes conocen el trabajo no participan lo suficiente, podés especificar algo coherente en el papel que no resuelva la necesidad real.',
    'Para corregirlo necesitás extraer información, aclarar términos, acordar criterios y validar con los involucrados. Incluir requisitos necesarios no es un defecto por sí mismo. Tampoco lo es conseguir una descripción suficiente y verificable del comportamiento que se espera construir.',
    'Las necesidades pueden cambiar. La gestión de cambios evalúa consecuencias en otros requisitos, diseño, pruebas, esfuerzo y acuerdos. No marques que todo cambio es malo: distinguí evolución controlada de crecimiento sin análisis, sin participación o sin mantener la consistencia de la especificación.',
  ] },
  { module: 'm12', title: '4 · Reconocer métodos formales', prompt: '¿Qué conjunto reúne herramientas y conceptos vinculados con métodos formales?', choices: ['Lógica temporal, especificación matemática del comportamiento y redes de Petri', 'Solo colores de pantallas y opiniones informales', 'Únicamente cronogramas sin un modelo del sistema', 'Cualquier descripción ambigua por estar escrita'], explain: 'Los métodos formales utilizan modelos y lenguajes con fundamentos matemáticos. Lógica temporal y redes de Petri permiten expresar propiedades y comportamientos bajo sus respectivos modelos. Formal no significa automáticamente completo, correcto respecto del mundo real ni fácil de aplicar.', nodes: ['Modelo con semántica precisa', 'Expresar propiedades y comportamiento', 'Razonar bajo hipótesis explícitas'], say: [
    'Identificá qué hace formal a un método. No alcanza con escribir un documento prolijo ni con usar símbolos decorativos. Hace falta un lenguaje o modelo con significado preciso y fundamentos que permitan expresar propiedades y razonar sobre ellas de forma rigurosa.',
    'La lógica temporal permite describir propiedades relacionadas con la evolución de un sistema; las redes de Petri modelan aspectos de estados, eventos y concurrencia. También existen enfoques algebraicos. Por eso no concluyas que toda referencia al álgebra es ajena a los métodos formales.',
    'El razonamiento vale respecto del modelo y de sus supuestos. Si el modelo representa mal la necesidad, una demostración no arregla esa discrepancia. En el modelo viejo aparece un distractor con una denominación que no desarrolla el apunte: reconocé las herramientas estudiadas, sin inventarle una definición.',
  ] },
  { module: 'm8', title: '5 · Revisar casos de uso', prompt: 'En un esquema de préstamos, un objetivo no tiene vínculo con su actor, se dibuja «mensualmente» como actor y se agrega un include sin justificar dependencia. ¿Qué revisión corresponde?', choices: ['Relacionar roles con objetivos, tratar la periodicidad como condición y justificar o quitar include', 'Convertir toda fecha en un actor humano', 'Reemplazar las asociaciones por orden temporal entre casos', 'Usar include para cualquier relación que parezca útil'], explain: 'Un actor representa un rol externo que interactúa con el sistema; una periodicidad no es un rol. Las asociaciones vinculan actores y casos pertinentes. Include representa comportamiento incluido y su flecha va del caso que incluye al incluido; no se inventa solo para conectar objetivos independientes.', nodes: ['Roles externos y objetivos', 'Asociaciones según participación', 'Dependencias solo si están justificadas'], say: [
    'Separá tres preguntas al revisar un caso de uso: quién interactúa, qué objetivo persigue y qué comportamiento depende de otro. Si un caso está aislado del rol que debe usarlo, revisá la participación descrita en el relevamiento antes de dibujar una línea por intuición.',
    'Mensualmente expresa una periodicidad. No es una persona ni un sistema externo que intercambia mensajes. Un servicio externo de planificación podría ser un actor si el alcance y el relevamiento lo justificaran, pero no podés inventarlo porque el dibujo tenga un nombre de tiempo.',
    'La devolución y la consulta de novedades no se relacionan automáticamente por inclusión. Include exige que el comportamiento incluido forme parte del que lo invoca. Si no hay esa dependencia en el caso, presentá la devolución como objetivo propio y asociála al rol que corresponde.',
  ] },
  { module: 'm10', title: '6 · Encontrar objetos entidad', prompt: 'Un negocio registra clientes y pedidos de repuestos, consulta existencias y emite remito y factura. ¿Qué conjunto representa información persistente del caso?', choices: ['Cliente, Repuesto, Pedido, Remito y Factura', 'Teléfono, pantalla y botón de aceptar como únicas entidades', 'Solo el nombre de la empresa', 'Únicamente el departamento que despacha'], explain: 'Las entidades representan información relevante que persiste. Cliente, Repuesto, Pedido y comprobantes son candidatos justificados por el caso. El stock puede ser un atributo del repuesto; teléfono es un medio y expedición es un área. No conviertas automáticamente cada sustantivo en una clase.', nodes: ['Qué información queda registrada', 'Cliente · Repuesto · Pedido', 'Remito · Factura'], say: [
    'No empieces copiando todos los sustantivos del enunciado. Buscá información que se registra, consulta o mantiene más allá de una interacción. El caso conserva datos del cliente y necesita reconocer los repuestos para consultar existencias y construir los pedidos solicitados.',
    'El pedido merece una entidad porque reúne datos y un estado: puede cumplirse o quedar pendiente. Las existencias pueden representarse como atributo del repuesto en este nivel del modelo. Otra necesidad de historial de stock requeriría más información; no la agregues sin una regla que la justifique.',
    'Remito y factura son comprobantes que también se registran. En cambio, teléfono es el medio de solicitud y expedición es un área participante, no automáticamente una entidad de datos. La pantalla sería interfaz y la coordinación del trámite, control: distinguí esos tres tipos de objetos.',
  ] },
  { module: 'm5', title: '7 · Tres reparaciones de BPMN', prompt: 'En un nivel que ya usa eventos explícitos, revisás un alta sin inicio, una rama de rechazo con flecha hacia la decisión y un rechazo de préstamo sin continuación. ¿Qué reparación corresponde?', choices: ['Agregar inicio, orientar la salida de la decisión hacia el rechazo y completar el cierre del otro recorrido', 'Invertir todas las flechas del proceso', 'Quitar las decisiones para que nunca haya alternativas', 'Usar un evento de fin como origen de todo el proceso'], explain: 'En este nivel con eventos explícitos, completá el comienzo del alta, orientá la decisión hacia cada alternativa y llevá las ramas hasta su continuación o final. El rechazo de préstamo queda colgado. No extrapoles que todo recorte de BPMN necesita un inicio propio ni inventes nuevas reglas del negocio.', nodes: ['Inicio del recorrido de alta', 'Decisión → rechazo, no al revés', 'Cerrar el rechazo del préstamo'], say: [
    'Recorré el proceso siguiendo las flechas. En el primer trámite, la solicitud de alta aparece como primera tarea pero falta el evento que inicia el recorrido representado. Agregar un inicio aclara desde dónde se activa el proceso completo que estamos revisando.',
    'Después, la decisión debe separar alternativas. Si el rechazo apunta hacia la decisión, el flujo no expresa salir por esa rama. Corregí la orientación y dejá claras las condiciones de salida. No inventes una condición comercial concreta que no figure en el relevamiento.',
    'Por último, seguí el otro trámite: el rechazo del préstamo queda sin continuación. Si ese camino termina allí, representá su final. Diferenciá este defecto del rechazo de alta, que ya tenía cierre en el modelo: señalar un problema en el lugar equivocado no lo resuelve.',
  ] },
];

cases[0].scenes = [scene([
  head('Parte y conjunto: no son sinónimos'),
  box(20,80,600,520,'',{c:'blue'}),txt(320,125,'SISTEMA',{fs:32,b:true}),
  box(60,190,520,105,'Personas + procesos manuales',{fs:29}),
  box(60,340,520,105,'Software: parte lógica',{fs:30,c:'orange',s:1}),
  box(60,490,520,80,'Equipos + datos + reglas',{fs:28,c:'green',s:2}),
  box(20,670,600,110,'Elementos relacionados para un propósito',{fs:29,c:'green',s:2}),
],cases[0].say,640,825)];
cases[1].scenes = [scene([
  head('Compará la organización del desarrollo'),
  table(20,80,600,['Modelo','Eje del recorrido'],[['Cascada','Secuencia'],['Espiral','Riesgos'],['UP','Fases e iteraciones']],{fs:29,rh:110,cw:[.35,.65],rs:[0,1,2]}),
  box(20,610,600,115,'Fase no equivale a una única actividad',{fs:30,c:'green',s:2}),
],cases[1].say,640,770),scene([
  head('UP: fases con trabajo iterativo'),
  box(35,80,570,115,'Inicio\nAlcance y viabilidad',{fs:29,c:'blue'}),
  box(35,210,570,115,'Elaboración\nArquitectura y riesgos principales',{fs:29,c:'orange',s:1}),
  box(35,340,570,115,'Construcción\nDesarrollar incrementos',{fs:29,c:'green',s:2}),
  box(35,470,570,115,'Transición\nPreparar la entrega para el uso',{fs:29,c:'purple',s:2}),
  box(20,680,600,120,'Iteraciones con distintos flujos\nNo es una sola pasada',{fs:28,s:2,c:'green'}),
],[
  'Inicio define alcance y viabilidad. No significa programar todo ni especificar cada detalle antes de aprender algo. Se establece una base para continuar, considerando necesidades y restricciones.',
  'Elaboración trabaja arquitectura y riesgos principales. Puede incluir análisis, diseño, implementación y pruebas. Esos flujos también aparecen, con distinta intensidad, en las otras fases.',
  'Construcción desarrolla incrementos y transición prepara la entrega para el uso. El resultado se ajusta iterativamente. Al comparar modelos, explicá esta combinación de fases, iteraciones y entregas.',
],640,850)];
cases[4].scenes = [scene([
  head('Tres controles diferentes del modelo'),
  table(20,80,600,['Qué revisás','Criterio'],[['Caso aislado','Participación'],['Tiempo como actor','Rol externo'],['Include arbitrario','Dependencia']],{fs:28,rh:115,cw:[.53,.47],rs:[0,1,2]}),
  box(20,620,600,110,'No uses asociaciones para ordenar pasos',{fs:30,s:2,c:'green'}),
],cases[4].say,640,780),scene([
  head('Esquema propio: objetivos y roles'),
  box(200,75,410,635,'',{c:'gray'}),txt(405,115,'Gestión de préstamos',{fs:26}),
  ico(80,190,'user',{size:58,t:'Solicitante',fs:23}),
  box(230,155,345,105,'Dar de alta',{shape:'circle',fs:29,c:'blue'}),arr([115,200],[230,205],{head:false}),
  ico(80,450,'user',{size:58,t:'Socio',fs:26,s:1}),
  box(230,350,345,105,'Solicitar préstamo',{shape:'circle',fs:28,c:'orange',s:1}),arr([115,455],[230,405],{head:false,s:1}),
  box(230,545,345,105,'Devolver préstamo',{shape:'circle',fs:28,c:'green',s:2}),
  arr([115,455],[180,455],{head:false,s:2}),arr([180,455],[180,600],{head:false,s:2}),arr([180,600],[230,600],{head:false,s:2}),
  box(20,775,600,115,'Mensual: condición temporal\nUn tiempo no es un actor',{fs:29,c:'purple',s:2}),
],[
  'El solicitante participa del alta. Los casos están dentro del sistema y los roles afuera. La asociación indica interacción, no que se ejecute un caso después del otro.',
  'El socio participa en solicitar un préstamo. La línea repara el caso aislado. La participación surge del escenario, no de la cercanía entre una figura y un óvalo.',
  'La devolución es otro objetivo del socio. El caso no justifica incluir novedades. La periodicidad se documenta como condición o regla; un tiempo no es una persona ni un servicio externo.',
],640,935)];
cases[5].scenes = [scene([
  head('Información persistente del caso'),
  table(20,80,600,['Candidato','Qué conserva'],[['Cliente','Identificación'],['Repuesto','Datos y stock'],['Pedido','Detalle y estado'],['Remito','Entrega'],['Factura','Comprobante']],{fs:29,rh:95,rs:[0,0,1,2,2],cw:[.42,.58]}),
  box(20,710,600,115,'Teléfono: canal · pantalla: interfaz\nExpedición: área participante',{fs:28,s:2,c:'orange'}),
],cases[5].say,640,870)];
cases[6].scenes = [scene([
  head('Error 1: el alta completa necesita inicio'),
  box(150,245,340,115,'Solicitar alta',{fs:31}),
  box(290,85,60,60,'',{shape:'circle',c:'green',s:1}),arr([320,145],[320,245],{s:1,c:'green'}),
  box(35,545,570,125,'Agregá el evento inicial\nantes de la primera tarea',{fs:30,c:'green',s:2}),
], [
  cases[6].say[0],
  'En el fragmento redibujado aparece un evento de inicio antes de solicitar el alta. La flecha sale del evento y entra a la tarea. El inicio no reemplaza a la tarea: representa la activación del recorrido, mientras la tarea representa trabajo que se realiza.',
    'BPMN permite ciertos procesos sin eventos explícitos, pero este nivel ya usa inicios y finales. Completá el comienzo del alta sin repetir un inicio en cada tarea o carril.',
],640,720),scene([
  head('Error 2: orientación de la alternativa'),
  box(80,100,120,120,'X',{shape:'diamond',fs:32,c:'orange'}),txt(140,275,'Decisión',{fs:29}),
  box(350,100,260,120,'Rechazar alta',{fs:29,c:'red'}),
  arr([350,160],[200,160],{c:'red',out:1}),txt(320,335,'Antes: la flecha vuelve al gateway',{fs:27,c:'red',out:1}),
  arr([200,160],[350,160],{c:'green',s:1}),txt(320,335,'Después: la rama sale del gateway',{fs:27,c:'green',s:1}),
  box(25,540,590,125,'Expresá la condición de cada salida\nsegún la regla del caso',{fs:29,c:'green',s:2}),
],[
  cases[6].say[1],
  'La alternativa corregida parte de la decisión y conduce a rechazar el alta. Seguí la punta de la flecha para comprobarlo, sin guiarte solo por la proximidad entre figuras. Una conexión en sentido inverso expresa otro recorrido y no representa esta salida de la decisión.',
  'Las ramas necesitan condiciones comprensibles. Documentá la regla disponible y señalá lo que falte confirmar. Corregir la notación no te autoriza a inventar políticas del negocio.',
],640,720),scene([
  head('Error 3: cerrar el rechazo del préstamo'),
  box(100,110,440,110,'Rechazar préstamo',{fs:31,c:'orange'}),
  // Fin: un círculo de borde grueso, no el doble círculo de un evento intermedio.
  // Referencia: https://www.omg.org/spec/BPMN/2.0.2/PDF
  line(Array.from({length:65},(_,i)=>[320+30*Math.cos(i*Math.PI/32),410+30*Math.sin(i*Math.PI/32)] as [number,number]),{c:'red',sw:6,s:1}),arr([320,220],[320,380],{s:1}),
  box(25,580,590,125,'La rama termina de forma explícita\nNo queda una tarea colgada',{fs:30,c:'green',s:2}),
],[
  cases[6].say[2],
  'Si la alternativa elegida finaliza el trámite, conectá la tarea de rechazo con un evento de fin. El dibujo muestra un cierre de borde más marcado. No hagas salir de ese fin una nueva tarea como continuación del mismo recorrido, porque ya representa su terminación.',
  'Después recorré las otras ramas y comprobá que todas continúen o terminen coherentemente. La revisión combina símbolos, orientación y significado del negocio. No basta contar círculos o rombos: cada reparación tiene que explicar qué ejecución estaba mal expresada y cómo queda corregida.',
],640,750)];

export const FINAL_QUESTIONS: Question[] = reviewBank('iisw',1,cases).map((q,i)=>({ ...q,id:`iisw-final-q${i+1}`,source:'modelo anterior de final, adaptación y resolución propias' }));
export const FINAL_SCENES: Record<string,VisScene[]> = Object.fromEntries(FINAL_QUESTIONS.map((q,i)=>[`iisw-final-e${i+1}`,q.scenes!]));
export const FINAL_EXERCISES: WorkedExercise[] = FINAL_QUESTIONS.map((q,i)=>{
  if(q.type!=='mcq') throw new Error('El modelo usa choice');
  return {id:`iisw-final-e${i+1}`,module:q.module,title:`Final resuelto · ${cases[i].title}`,statement:`${q.prompt}\n${q.options.map((o,j)=>`${String.fromCharCode(65+j)}) ${o}`).join('\n')}`,steps:q.scenes!.flatMap(s=>s.say).map((body,j)=>({title:`Paso ${j+1}`,body})),result:`Correcta: ${q.options[q.answer]}.`};
});
export const FINAL_LESSON: Lesson = {
  id:'iisw-clase-4',examId:'final',title:'Final resuelto paso a paso · siete puntos del modelo anterior',
  summary:'Sistema y software, UP, defectos de requerimientos, métodos formales, errores de casos de uso, entidades y tres reparaciones de BPMN. Figuras propias y correcciones fundamentadas.',
  intro:['Resolvemos siete puntos de un final anterior, con redacción y figuras propias. Elegí antes de escuchar la corrección. Las opciones de práctica no anuncian el formato del próximo examen.','El registro incluye respuestas de estudiantes. Vamos a justificar las correcciones con los conceptos y los diagramas, sin tratarlas como una resolución oficial.'],
  parts:FINAL_EXERCISES.map(e=>'ex:'+e.id),
  outro:['Repasá sistema y software, fases e iteraciones de UP, calidad de requerimientos y fundamentos de los métodos formales.','En los diagramas revisá roles, objetivos, información persistente y recorridos. Volvé a los siete ejercicios y respondé sus choice sin mirar la corrección.'],
};
