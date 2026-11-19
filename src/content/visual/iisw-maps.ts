/** IISW · mapas conceptuales de los módulos 1 a 4. Redacción propia sobre los apuntes de la cátedra (m01–m04). */
import type { ConceptMap } from '../types';

export const IISW_MAPS: ConceptMap[] = [
  {
    module: 'm1', root: 'Conceptos de ingeniería del software',
    branches: [
      { t: 'Ingeniería del software', d: 'nace en 1968 (conferencia de la OTAN) junto con la **crisis del software**: proyectos fuera de costo y plazo, cancelados o con mantenimiento carísimo', topic: 'm1-def', kids: [
        { rel: 'definiciones', t: 'Bauer · IEEE · Boehm', d: 'Bauer: principios de ingeniería para software económico y eficiente. IEEE (1993): métodos **sistemáticos, disciplinados y cuantificables** para desarrollar, operar y mantener. Boehm: conocimiento científico aplicado a programas **y su documentación**' },
        { rel: 'resultado', t: 'Producto de software', d: 'no solo el ejecutable: también requerimientos, diseño, código fuente, datos de prueba y manuales' },
        { rel: 'se obtiene mediante el', t: 'Proceso de software', d: 'Sommerville: conjunto de actividades cuya meta es el desarrollo o la evolución del software' },
        { rel: 'es parte de un', t: 'Sistema', d: 'componentes organizados para cumplir funciones: software, hardware, gente, base de datos, documentación y procedimientos. El software es el componente **lógico**' },
        { rel: 'lo lleva adelante el', t: 'Ingeniero de software', d: 'programa, traduce pedidos vagos en requerimientos claros, cambia de vocabulario y de nivel de abstracción, modela y se comunica' },
      ] },
      { t: 'Calidad', d: 'IEEE: buena combinación de atributos deseados + el cliente percibe que cumple sus expectativas', topic: 'm1-cual', kids: [
        { rel: 'depende de quién mira', t: 'Vistas', d: 'usuario: confiable, eficiente, fácil de usar · desarrollador: verificable, mantenible · administrador: productividad del proceso' },
        { rel: 'la calidad del proceso influye en la del', t: 'Producto', d: 'en software la relación es más compleja (no se fabrica: es creativo), pero un buen proceso reduce defectos' },
        { rel: 'se describe con', t: 'Cualidades (Ghezzi)', d: '**internas** (para desarrolladores) o **externas** (visibles al usuario); del **producto** o del **proceso**', kids: [
          { t: 'Del producto', d: 'correctitud (cumple la especificación) · confiabilidad · robustez (ante lo no previsto) · performance · amigabilidad · verificabilidad · mantenibilidad · reusabilidad · portabilidad · interoperabilidad · integridad' },
          { t: 'Del proceso', d: 'productividad (eficiencia del proceso) · oportunidad (entregar a tiempo) · visibilidad (pasos y estado documentados)' },
        ] },
      ] },
      { t: 'Principios', d: 'guían todo el proceso, no una sola fase', topic: 'm1-princ', kids: [
        { t: 'Rigor y formalidad', d: 'trabajo preciso; la formalidad es el rigor llevado al máximo (matemático)' },
        { t: 'Separación de incumbencias', d: 'tratar por separado los distintos aspectos del problema' },
        { t: 'Modularidad', d: 'dividir en módulos con **alta cohesión** y **bajo acoplamiento**' },
        { t: 'Abstracción', d: 'quedarse con lo relevante e ignorar el detalle' },
        { t: 'Anticipación al cambio', d: 'prever la evolución (administración de configuraciones)' },
        { t: 'Generalización · incrementalidad', d: 'resolver el problema más general · avanzar por pasos sucesivos' },
      ] },
    ],
    links: [
      'La **maleabilidad** (se modifica fácil) hace al software distinto de otros productos: por eso importan mantenibilidad y anticipación al cambio.',
      '**Correcto ≠ confiable ≠ robusto**: cumple la especificación · funciona como se espera en el tiempo · se comporta razonablemente ante lo no previsto.',
      'La **incrementalidad** reaparece en los modelos incremental, evolutivo, UP y ágiles (Módulos 2 y 3).',
    ],
  },
  {
    module: 'm2', root: 'Modelos de ciclo de vida',
    branches: [
      { t: 'Ciclo de vida', d: 'actividades desde que surge la necesidad hasta que el sistema sale de uso. Elegir bien el modelo mejora productividad, calidad y riesgo', topic: 'm2-ciclos', kids: [
        { t: 'Clásico (cascada o lineal)', d: 'requerimientos (**qué**) → diseño (**cómo**) → codificación → pruebas → integración → operación y mantenimiento. Secuencial y **rígido**; cada etapa cierra con su documentación. Sirve si los requisitos están **completos y estables**. El cliente ve el producto recién al final. La versión modificada permite volver a etapas anteriores' },
        { t: 'Espiral (Boehm, años 80)', d: 'incorpora el **análisis de riesgos**. Ciclos por 4 cuadrantes: planificación → análisis de riesgos → ingeniería → evaluación del cliente. El proyecto es una suma de miniproyectos' },
        { t: 'Incremental', d: 'divide el sistema en partes y entrega **subsistemas operativos** de a uno. El cliente ve avances; los requisitos se pueden completar en el camino. Variante: diseño por planificación (primero lo prioritario)' },
        { t: 'Prototipos', d: 'simulan el sistema cuando el cliente **no sabe explicar** lo que quiere. **Descartable** o **evolutivo**; **ligeros** (bocetos de pantallas) u **operativos** (módulos reales). Objetivo: feedback para definir requisitos' },
        { t: 'Evolutivo', d: 'versiones completas que se refinan con el uso: especificación, desarrollo y validación enlazados. Útil si se desconocen las necesidades, hay urgencia o un entorno cambiante' },
        { t: 'UP / RUP', d: 'híbrido, iterativo e incremental, asociado a **UML** (Jacobson, Booch, Rumbaugh). Fases: **inicio · elaboración · construcción · transición**; cada una con iteraciones y flujos de trabajo (requisitos, análisis, diseño, implementación, pruebas)' },
      ] },
    ],
    links: [
      'Pista para elegir: requisitos claros y estables → cascada · riesgo alto → espiral · entregas tempranas → incremental · el cliente no sabe qué quiere → prototipos · necesidades desconocidas o entorno cambiante → evolutivo.',
      'Incremental ≠ evolutivo: el incremental parte de una especificación y agrega **partes**; el evolutivo entrega **sistemas completos** que se van refinando.',
      'Los modelos se pueden **combinar**: dentro del cuadrante de ingeniería del espiral se puede aplicar cascada.',
    ],
  },
  {
    module: 'm3', root: 'Metodologías ágiles',
    branches: [
      { t: 'Por qué surgen', d: 'los modelos rígidos no servían en proyectos chicos ni en entornos cambiantes: se tardaba más en planificar que en programar. Años 90: enfoques iterativos centrados en software funcional rápido', topic: 'm3-agiles', kids: [
        { rel: '2001', t: 'Manifiesto Ágil', d: 'principios: **participación del cliente** · desarrollo **incremental** · **personas** antes que procesos · **aceptar el cambio** de requerimientos · **simplicidad**' },
      ] },
      { t: 'XP (Kent Beck)', d: 'el cliente describe **escenarios / historias de usuario** y las prioriza', topic: 'm3-agiles', kids: [
        { rel: 'cuatro prácticas básicas', t: 'Liberación limitada · semana de 40 h · cliente en el sitio · programación en pares' },
        { rel: 'ciclo', t: 'seleccionar historias → dividir en tareas → planificar → desarrollar, integrar y probar → entregar → el cliente evalúa' },
      ] },
      { t: 'Scrum', d: 'agregar valor al negocio en el menor tiempo; iterativo e incremental. Se centra en la **gestión**', topic: 'm3-agiles', kids: [
        { rel: 'avanza por', t: 'Sprints', d: '1 a 4 semanas; el equipo toma requisitos de una lista priorizada (product backlog) y se compromete a terminarlos' },
        { rel: 'roles', t: 'Product Owner · Equipo · Scrum Master', d: 'PO: una sola persona, administra y prioriza el backlog · Equipo: multidisciplinario, autogestionado, sin jefe, 7 ± 2 · SM: coach, quita impedimentos, no es jefe. **PO y SM nunca son la misma persona**' },
      ] },
      { t: 'Elegir el modelo', d: 'ningún modelo es mejor en abstracto: depende del proyecto, y se pueden combinar', topic: 'm3-agiles' },
    ],
    links: [
      'Las **historias de usuario** de XP se desarrollan en el Módulo 8.',
      'Ágil también es **iterativo e incremental**, como UP, pero con menos documentación previa y el cliente involucrado todo el tiempo.',
    ],
  },
  {
    module: 'm4', root: 'Extracción de requerimientos',
    branches: [
      { t: 'Técnicas', d: 'para relevar qué necesita la organización', topic: 'm4-extraccion', kids: [
        { t: 'Entrevista', d: 'conversación dirigida con un propósito específico' },
        { t: 'Cuestionario', d: 'preguntas escritas: sirve para mucha gente o personas en lugares separados' },
        { t: 'Observación directa', d: 'visitar y ver cómo se hace realmente el trabajo' },
      ] },
      { t: 'Tipos de preguntas', topic: 'm4-extraccion', kids: [
        { t: 'Abiertas', d: 'el entrevistado se explaya: "¿podría explicarme cómo es la reposición?"' },
        { t: 'Cerradas', d: 'acotan la respuesta: "¿piden presupuesto a los proveedores?"' },
        { t: 'De sondeo', d: 'profundizan: "¿por qué?", "¿me da un ejemplo?"' },
      ] },
      { t: 'Preparar la entrevista', topic: 'm4-extraccion', kids: [
        { rel: 'pasos', t: 'Leer antecedentes → fijar objetivos → elegir a quién → avisarle al entrevistado → definir tipo y estructura de preguntas' },
        { rel: 'estructuras', t: 'Pirámide · embudo · diamante', d: '**pirámide** (inductiva): de cerradas a abiertas, para involucrar a alguien poco participativo · **embudo** (deductiva): de abiertas a cerradas · **diamante**: combina las dos' },
        { rel: 'evitar', t: 'Preguntas tendenciosas y dobles', d: 'no mostrar opinión ("este obsoleto modo de trabajo") ni juntar dos preguntas en una' },
      ] },
    ],
    links: [
      'Pirámide **empieza cerrada** y abre; embudo **empieza abierto** y cierra. Diamante: cerrar, abrir, cerrar.',
      'Lo relevado se modela con BPMN (Módulo 5) y se especifica como requerimientos (Módulos 6 y 7).',
    ],
  },
];
