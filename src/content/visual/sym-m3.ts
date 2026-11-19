/**
 * SyM · Módulo 3 (Poder y autoridad), tema por tema.
 * Fuentes revisadas (privadas): apunte "Poder y autoridad en las organizaciones", presentación "Poder y autoridad",
 * "La organización: el poder y la autoridad", solución del caso "Presión en la sala de proyectos" y un final 2023.
 * Redacción y diagramas propios. Empresa ficticia: Yerbatera Ñandú.
 */
import type { ConceptMap, Question, TheoryBlock } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, box, head, scene, txt } from './h';

const sc = (items: Parameters<typeof scene>[0], say: string[]): VisScene => scene(items, say, 600, 440);
const AP = 'apunte del módulo 3';
const F23 = 'final 2023 (Drive de estudiantes)';

export const M3_THEORY: TheoryBlock[] = [
  {
    id: 'y3', module: 'm3', title: 'Poder, influencia y autoridad',
    lead: [
      'Son tres palabras que se usan como sinónimos, pero la materia las separa con precisión: el **poder** es una **capacidad**, la **influencia** es el **acto** que produce el cambio y la **autoridad** es el poder **legitimado por el cargo**.',
      'La diferencia práctica: el poder puede venir de cualquier lado (de un experto sin cargo, de alguien carismático); la autoridad, en cambio, baja por la **cadena de mando formal**.',
    ],
    scenes: [
      sc([
        head('De la capacidad al cambio'),
        box(15, 60, 175, 130, 'Poder', { c: 'blue', fs: 22, sub: 'capacidad de cambiar actitudes o conductas', id: 'p' }),
        box(212, 60, 175, 130, 'Influencia', { c: 'green', fs: 21, sub: 'el acto que produce el cambio', id: 'i', s: 1 }),
        box(410, 60, 175, 130, 'Cambio', { c: 'yellow', fs: 22, sub: 'el otro hace algo que no haría', id: 'c', s: 1 }),
        arr('p', 'i', { s: 1 }), arr('i', 'c', { s: 1 }),
        box(15, 240, 570, 90, 'Autoridad = poder legitimado por el cargo', { c: 'purple', fs: 19, sub: 'derecho a dar órdenes y esperar obediencia; baja por la cadena de mando', s: 2 }),
        box(15, 350, 570, 75, 'Experto sin cargo: tiene poder, pero no autoridad', { c: 'orange', fs: 17, s: 3 }),
      ], [
        'El **poder** es la capacidad potencial de cambiar las actitudes o la conducta de otros: la habilidad de A para que B haga algo que de otro modo no haría. Es como una herramienta en la caja: puede existir sin usarse.',
        'La **influencia** es el poder en acción: cualquier acto o conducta que efectivamente cambia la actitud o la conducta de otra persona o grupo.',
        'La **autoridad** es un tipo específico de poder: el que está **legitimado por la estructura formal**. Es el derecho a dar órdenes que confiere un cargo. Por eso fluye de arriba hacia abajo por la cadena de mando.',
        'Por eso alguien puede tener mucho poder sin autoridad: en Ñandú, el técnico que conoce la máquina secadora mejor que nadie cambia las decisiones del equipo sin ser jefe de nadie.',
      ]),
    ],
    points: [
      '**Poder**: capacidad para ejercer influencia; capacidad para cambiar las actitudes o la conducta de personas o grupos. No requiere cargo formal.',
      '**Influencia**: cualquier acto o conducta que ocasiona un cambio en la actitud o la conducta de otra persona o grupo.',
      '**Autoridad**: forma de poder; capacidad de ejercerlo como resultado de cualidades como el **cargo** o los conocimientos (Stoner). En sentido estricto, poder legitimado por la estructura formal: poder institucionalizado.',
      'El poder puede ser multidireccional; la autoridad es jerárquica y baja por la cadena de mando.',
    ],
    example: { title: 'Yerbatera Ñandú', body: [
      'La gerenta de Producción puede asignar turnos y aprobar vacaciones: **autoridad**, por el cargo. Cuando Raúl, el técnico más experimentado, explica que cambiar la temperatura del secado arruinaría la cosecha y el equipo cambia de plan, ejerció **influencia** gracias a su **poder** experto, sin tener autoridad.',
    ] },
    written: 'El **poder** es la capacidad de cambiar las actitudes o la conducta de personas o grupos. La **influencia** es el acto que efectivamente produce ese cambio. La **autoridad** es una forma de poder legitimada por el cargo dentro de la estructura formal: el derecho a dar órdenes y esperar que se cumplan.',
    trap: 'El final dio "capacidad para ejercer influencia; capacidad de cambiar actitudes o conductas" como definición de **autoridad**: era **falso**, porque esa es la definición de **poder**.',
  },
  {
    id: 'y3f', module: 'm3', title: 'Las cinco fuentes del poder',
    lead: [
      'French y Raven clasificaron **de dónde sale** el poder. Para identificarlo en un caso, preguntate: **¿por qué el otro obedece?** Por lo que va a ganar, por miedo, por el cargo, por lo que sabe o por quién es.',
      'Una misma frase puede combinar dos fuentes. Es la pregunta más típica de este módulo.',
    ],
    scenes: [
      sc([
        head('¿Por qué el otro obedece?'),
        box(200, 40, 200, 70, 'Poder', { c: 'gray', fs: 22, id: 'c' }),
        box(15, 150, 180, 110, 'Recompensa', { c: 'green', fs: 18, sub: '"…tendrán un bono"', id: 'r', s: 1 }),
        box(210, 150, 180, 110, 'Coercitivo', { c: 'red', fs: 18, sub: '"…o lo informo a la dirección"', id: 'co', s: 1 }),
        box(405, 150, 180, 110, 'Legítimo', { c: 'purple', fs: 18, sub: '"como su jefa, les pido…"', id: 'l', s: 2 }),
        box(15, 300, 280, 110, 'Experto', { c: 'blue', fs: 19, sub: '"hagámoslo así: lo hice cien veces"', id: 'e', s: 3 }),
        box(305, 300, 280, 110, 'Referente', { c: 'orange', fs: 19, sub: 'lo siguen porque lo admiran', id: 'rf', s: 4 }),
        arr('c', 'r', { s: 1 }), arr('c', 'co', { s: 1 }), arr('c', 'l', { s: 2 }),
      ], [
        'Cinco fuentes, cinco respuestas distintas a "¿por qué me hace caso?".',
        '**Recompensa**: puede dar algo que el otro valora (aumento, bono, ascenso, reconocimiento, un proyecto interesante). Su contracara es el **coercitivo**: puede aplicar castigos (sanción, despido, quitar el home office). El coercitivo funciona a corto plazo, pero genera resentimiento.',
        '**Legítimo**: viene de la posición formal en la jerarquía; los demás aceptan que ese cargo tiene derecho a pedir. Es **sinónimo de autoridad**.',
        '**Experto**: viene del conocimiento o la pericia. No depende del cargo: un programador junior puede tener más poder experto que su gerente en un lenguaje.',
        '**Referente**: viene de las cualidades personales (carisma, integridad, trato). Lo siguen porque lo admiran y confían en él. Está asociado al liderazgo y suele dar lugar a **líderes informales**.',
      ]),
    ],
    points: [
      '**Recompensa**: capacidad de distribuir recompensas valoradas, tangibles (sueldo, bono, ascenso) o intangibles (reconocimiento, elogios, proyectos).',
      '**Coercitivo**: capacidad de aplicar castigos (amenazas de despido, tareas desagradables, sanciones). Efectivo a corto plazo; su exceso genera resentimiento y un clima tóxico.',
      '**Legítimo**: deriva del cargo formal; sinónimo de autoridad.',
      '**Experto**: conocimientos, habilidades o pericia; no depende del cargo.',
      '**Referente**: cualidades personales que inspiran admiración, respeto o lealtad; ligado al liderazgo carismático.',
    ],
    table: { head: ['Fuente', 'El otro obedece porque…', 'Frase típica'], rows: [
      ['Recompensa', 'espera ganar algo', '"si llegan, hay bono"'],
      ['Coercitivo', 'teme un castigo', '"si no, te saco el home office"'],
      ['Legítimo', 'reconoce el cargo', '"como su jefe, les pido"'],
      ['Experto', 'confía en lo que sabe', '"créanme, esto falla así"'],
      ['Referente', 'admira a la persona', '(no hace falta decir nada)'],
    ] },
    example: { title: 'la reunión del lanzamiento en Ñandú', body: [
      'La gerenta comercial abre: "**Como directora del área**, necesito la campaña para el viernes" (legítimo). El jefe de ventas suma: "si llegamos, **hay dos días libres**" (recompensa). El de finanzas avisa: "si se pasan del presupuesto, **lo informo al directorio**" (coercitivo). Todos esperan la opinión de Clara, la diseñadora premiada (experto). Y el equipo se entusiasma cuando Tomás, al que todos aprecian, dice que se suma (referente).',
    ] },
    trap: '"Como su jefe les pido que terminen el viernes; si lo logran, tendrán un bono" combina **legítimo + recompensa** (pregunta de autoevaluación). Leé cada parte de la frase por separado.',
  },
  {
    id: 'y3a', module: 'm3', title: 'Autoridad lineal, staff y funcional',
    lead: [
      'La autoridad formal se distribuye de tres formas según el puesto donde se ejerce. La clave es preguntar **¿puede dar órdenes?, ¿a quién?, ¿sobre qué?**',
    ],
    scenes: [
      sc([
        head('Quién manda, quién asesora'),
        box(215, 40, 170, 55, 'Gerencia general', { c: 'purple', fs: 16, id: 'gg' }),
        box(60, 215, 190, 55, 'Producción', { c: 'blue', fs: 17, id: 'pr' }),
        box(350, 215, 190, 55, 'Comercial', { c: 'blue', fs: 17, id: 'co' }),
        box(60, 320, 190, 50, 'Supervisores', { c: 'blue', fs: 16, id: 'su' }),
        arr('gg', 'pr', { c: 'blue', sw: 3 }), arr('gg', 'co', { c: 'blue', sw: 3 }), arr('pr', 'su', { c: 'blue', sw: 3 }),
        box(430, 110, 155, 50, 'RR. HH. (staff)', { c: 'orange', fs: 14, id: 'st', dash: true, s: 1 }),
        arr('gg', 'st', { head: false, dash: true, s: 1 }),
        arr('st', 'co', { dash: true, c: 'orange', s: 1 }),
        txt(560, 195, 'aconseja', { fs: 14, b: true, c: 'orange', s: 1 }),
        box(15, 110, 155, 50, 'Sistemas (staff)', { c: 'red', fs: 14, id: 'ti', dash: true, s: 2 }),
        arr('gg', 'ti', { head: false, dash: true, s: 2 }),
        arr('ti', 'pr', { c: 'red', sw: 3, s: 2 }),
        txt(40, 195, 'impone', { fs: 14, b: true, c: 'red', s: 2 }),
        txt(300, 415, 'lineal: ordena · staff: asesora · funcional: impone su norma', { fs: 15, b: true, c: 'gray', s: 3 }),
      ], [
        '**Autoridad lineal**: la de los gerentes con responsabilidad directa en la **cadena de mando**. Dan órdenes directas para alcanzar los objetivos principales. Es la columna vertebral de la jerarquía.',
        '**Autoridad de staff**: la de las áreas que **asesoran y brindan servicios** a los gerentes de línea (RR. HH., Legales, I+D). Recomiendan, pero **no pueden ordenar**: RR. HH. aconseja a Producción sobre un conflicto laboral, pero no decide a quién contrata.',
        '**Autoridad funcional**: un área de staff recibe el derecho de **controlar una actividad específica en otros departamentos**, para que una política se cumpla en toda la empresa. Sistemas obliga a todas las áreas a hacer la capacitación de seguridad. Rompe la **unidad de mando** en ese tema puntual.',
        'Resumen para el examen: lineal ordena en su cadena, staff aconseja y funcional impone **su especialidad** a todos.',
      ]),
    ],
    points: [
      '**Lineal**: autoridad de los gerentes con responsabilidades directas a lo largo de la cadena de mando. Relación jefe-subordinado.',
      '**Staff**: autoridad de quienes ofrecen asesoría y servicios a los gerentes de línea; aconsejan y recomiendan, no ordenan. Buscan aumentar la eficacia de la línea.',
      '**Funcional**: autoridad de un departamento de staff para controlar actividades de otros departamentos, vinculadas con su especialidad. Garantiza uniformidad de políticas; en ese tema prevalece sobre el gerente de línea.',
      '**Delegación**: distribuir la autoridad. Los gerentes liberan tiempo y los empleados deciden más rápido. Para delegar bien hay que decidir qué y a quién, dar los recursos, intervenir si hace falta y dar feedback.',
    ],
    table: { head: ['Tipo', '¿Da órdenes?', 'Ejemplo en Ñandú'], rows: [
      ['Lineal', 'sí, en su cadena de mando', 'la gerenta de Producción a los supervisores'],
      ['Staff', 'no: asesora', 'Legales revisa un contrato y recomienda'],
      ['Funcional', 'sí, solo sobre su especialidad, a toda la empresa', 'Finanzas exige a todas las áreas el informe de gastos en su formato'],
    ] },
    written: 'La **autoridad lineal** es la de los gerentes con responsabilidad directa en la cadena de mando. La de **staff** es la de quienes asesoran y prestan servicios a los gerentes de línea, sin poder darles órdenes. La **funcional** es la de un departamento de staff para controlar actividades de otros departamentos relacionadas con su especialidad.',
    trap: 'Si un área de staff **obliga** a todos a algo de su especialidad, no es staff "asesora": es **autoridad funcional** (y si además es bajo amenaza de sanción, se suma poder coercitivo).',
  },
  {
    id: 'y3d', module: 'm3', title: 'Jerarquía, centralización y descentralización',
    lead: [
      'La **jerarquía** ordena a las personas en niveles. La pregunta siguiente es **en qué nivel se toman las decisiones**: si se concentran arriba hay **centralización**; si se transfieren hacia abajo o hacia especialistas, **descentralización**.',
      'Ninguna es mejor en abstracto: es un equilibrio entre **control** y **velocidad**.',
    ],
    scenes: [
      sc([
        head('¿Dónde se decide?'),
        box(15, 45, 280, 170, 'Centralizada', { c: 'purple', fs: 19, sub: 'la sede decide menú, precios y promociones de cada local', id: 'c' }),
        box(305, 45, 280, 170, 'Descentralizada', { c: 'green', fs: 19, sub: 'cada gerente de hotel decide precios, contrataciones y alianzas locales', id: 'd', s: 1 }),
        txt(155, 240, '✔ control y uniformidad', { fs: 14, c: 'green', b: true }), txt(155, 262, '✘ lenta, sobrecarga arriba', { fs: 14, c: 'red', b: true }),
        txt(445, 240, '✔ rápida y motivadora', { fs: 14, c: 'green', b: true, s: 1 }), txt(445, 262, '✘ riesgo de perder control', { fs: 14, c: 'red', b: true, s: 1 }),
        box(15, 295, 280, 130, 'Vertical', { c: 'blue', fs: 19, sub: 'se delega hacia abajo en la cadena de mando', s: 2 }),
        box(305, 295, 280, 130, 'Horizontal', { c: 'orange', fs: 19, sub: 'el poder pasa a analistas, staff o expertos fuera de la línea', s: 2 }),
      ], [
        '**Centralización**: grado en que las decisiones se concentran en los **niveles altos**. Da control estricto, uniformidad y una visión unificada; sirve en crisis. Pero es más lenta, sobrecarga a la dirección y desmotiva a quienes no deciden nada.',
        '**Descentralización**: transferir la autoridad de decisión a **niveles más bajos**. Agiliza, se adapta a lo local y motiva. El riesgo es perder control y que cada unidad vaya por su lado.',
        'Hay dos tipos. **Vertical**: se delega hacia abajo por la cadena de mando. **Horizontal**: el poder de decisión pasa a personas **fuera de la línea**, como analistas o especialistas de staff.',
      ]),
    ],
    points: [
      '**Jerarquía**: organización por categorías o grados de importancia; establece quién reporta a quién (ejemplos extremos: ejército, Iglesia).',
      '**Centralización**: grado en que la toma de decisiones se concentra en los altos niveles. La presentación menciona centralización del desempeño y departamental.',
      '**Descentralización**: transferencia de la autoridad de decisión a niveles más bajos. **Vertical** (hacia abajo en la cadena de mando) u **horizontal** (hacia analistas, staff o expertos).',
      'Ventajas y desventajas: centralizar da control y uniformidad pero lentitud; descentralizar da velocidad, adaptación y motivación pero riesgo de inconsistencia.',
    ],
    example: { title: 'Yerbatera Ñandú', body: [
      'Hasta ahora, cada descuento a un almacén lo aprobaba el dueño: **centralizado**, y los vendedores perdían ventas esperando la respuesta. Ahora cada vendedor zonal puede dar hasta un 5 % sin consultar: **descentralización vertical**. Y el analista de precios define la lista para todas las zonas: **descentralización horizontal**, hacia un especialista.',
    ] },
    trap: '"Delegar hacia abajo en la cadena de mando" = descentralización **vertical**. Si el poder va a un especialista que no está en la línea, es **horizontal**.',
  },
  {
    id: 'y3m', module: 'm3', title: 'Coordinación: los mecanismos de Mintzberg',
    lead: [
      'Cuanto más se divide y especializa el trabajo, más hace falta **coordinarlo**. La coordinación integra las actividades de partes independientes para alcanzar las metas. Mintzberg describe **cinco mecanismos**, y cada organización los combina.',
    ],
    scenes: [
      sc([
        head('Cinco formas de coordinar'),
        box(15, 45, 280, 95, 'Ajuste mutuo', { c: 'green', fs: 18, sub: 'comunicación informal: dos personas remando', s: 0 }),
        box(305, 45, 280, 95, 'Supervisión directa', { c: 'purple', fs: 18, sub: 'un jefe ordena y controla', s: 1 }),
        box(15, 160, 570, 80, 'Estandarización de procesos', { c: 'blue', fs: 18, sub: 'se fija CÓMO se hace: manuales, protocolos, línea de montaje', s: 2 }),
        box(15, 255, 570, 80, 'Estandarización de resultados', { c: 'orange', fs: 18, sub: 'se fija QUÉ lograr, no cómo: la cuota del vendedor', s: 3 }),
        box(15, 350, 570, 80, 'Estandarización de habilidades', { c: 'yellow', fs: 18, sub: 'se fija la FORMACIÓN: cirujano y anestesista se entienden sin hablar', s: 4 }),
      ], [
        '**Ajuste mutuo**: coordinarse conversando, de manera informal. Aparece en lo muy simple (dos personas en un bote) y en lo muy complejo (un equipo de científicos).',
        '**Supervisión directa**: una persona se hace responsable del trabajo de otras, da órdenes y controla. Es el mecanismo central de las estructuras jerárquicas.',
        '**Estandarización de procesos**: se especifica **cómo** hacer el trabajo, con manuales de procedimientos y protocolos. Se conecta con el Módulo 6.',
        '**Estandarización de resultados**: se especifica **qué** lograr y se deja libre el cómo. Al vendedor se le fija una cuota.',
        '**Estandarización de habilidades**: se especifica la **formación** de quien trabaja. Como todos aprendieron lo mismo, saben qué esperar del otro sin coordinarse a cada rato.',
      ]),
    ],
    points: [
      '**Coordinación**: proceso de integrar las actividades de partes independientes de una organización para alcanzar sus metas. A más diferenciación (división del trabajo), más necesidad de integración.',
      'Mecanismos (Mintzberg): **ajuste mutuo**, **supervisión directa**, estandarización de **procesos**, de **resultados** y de **habilidades**.',
    ],
    example: { title: 'Yerbatera Ñandú', body: [
      'En la planta, cada paso del envasado está en un manual (**procesos**). A los vendedores se les fija la cuota mensual y cada uno arma su recorrido (**resultados**). El laboratorio de calidad contrata solo bromatólogos recibidos (**habilidades**). Y cuando una máquina se traba, los operarios se acomodan hablando entre ellos (**ajuste mutuo**).',
    ] },
    trap: 'Procesos = **cómo**; resultados = **qué**; habilidades = **quién está formado para hacerlo**.',
  },
];

const q = (id: string, topic: string, prompt: string, options: string[], answer: number, explain: string, why: (string | null)[], source = AP): Question =>
  ({ id, module: 'm3', topic, type: 'mcq', prompt, options, answer, explain, why, source });
const tf = (id: string, topic: string, prompt: string, answer: boolean, explain: string, source = AP): Question =>
  ({ id, module: 'm3', topic, type: 'tf', prompt, answer, explain, source });

export const M3_QUESTIONS: Question[] = [
  tf('sym-m3-01', 'y3', 'Definición de autoridad: capacidad para ejercer influencia; capacidad para cambiar las actitudes o la conducta de las personas o grupos.', false,
    'Esa es la definición de **poder**. La autoridad es la forma de poder que surge del cargo (poder legitimado por la estructura formal). Este V/F apareció en un final.', F23),
  q('sym-m3-02', 'y3', 'Una analista sin personal a cargo convence al equipo de cambiar de proveedor gracias a sus datos, y el equipo efectivamente lo cambia. ¿Qué ejerció?', ['Influencia, basada en poder sin autoridad formal', 'Autoridad lineal', 'Autoridad funcional', 'Poder coercitivo'], 0,
    'Produjo un cambio real (influencia) a partir de una capacidad (poder experto), sin tener un cargo que le dé autoridad.',
    [null, 'No tiene cargo con gente a cargo.', 'No es un área de staff imponiendo una norma de su especialidad.', 'No hubo amenaza ni castigo.']),
  q('sym-m3-03', 'y3f', 'Un supervisor amenaza con quitarle a un empleado el trabajo desde casa si no cumple un plazo. ¿Qué poder usa?', ['Coercitivo', 'De recompensa', 'Referente', 'Experto'], 0,
    'Se basa en aplicar una consecuencia negativa: poder coercitivo.',
    [null, 'Sería de recompensa si ofreciera un beneficio por cumplir.', 'El referente se apoya en la admiración, no en amenazas.', 'No apela a ningún conocimiento.']),
  q('sym-m3-04', 'y3f', 'En una crisis de ciberseguridad, todos, incluido el CEO, siguen las indicaciones de un técnico junior. ¿Qué poder tiene el técnico?', ['Experto', 'Legítimo', 'Coercitivo', 'De recompensa'], 0,
    'Su influencia viene de su conocimiento, no de su cargo.',
    [null, 'El legítimo viene del cargo, y el técnico es junior.', 'No amenaza a nadie.', 'No ofrece nada a cambio.']),
  q('sym-m3-06', 'y3f', 'Un compañero sin cargo, respetado por su ética y su buena onda, propone quedarse una hora más y todo el equipo lo acompaña. ¿Qué poder ejerce?', ['Referente', 'Legítimo', 'De recompensa', 'Coercitivo'], 0,
    'Lo siguen por sus cualidades personales: poder referente. Es típico de los líderes informales.',
    [null, 'No tiene cargo.', 'No ofrece nada a cambio.', 'No hay amenaza.']),
  q('sym-m3-08', 'y3a', 'Legales revisa un contrato de Compras y recomienda cambiar una cláusula, pero la decisión final es del gerente de Compras. ¿Qué autoridad ejerce Legales?', ['De staff', 'Lineal', 'Funcional', 'Coercitiva'], 0,
    'Asesora y recomienda sin poder ordenar: autoridad de staff.',
    [null, 'No está en la cadena de mando de Compras.', 'No impone una norma obligatoria a todos.', 'No es un tipo de autoridad, y no hay amenaza.']),
  q('sym-m3-10', 'y3d', 'Una cadena hotelera permite que cada gerente de hotel decida precios y contrataciones locales. ¿Qué describe?', ['Descentralización vertical', 'Centralización', 'Descentralización horizontal', 'Autoridad de staff'], 0,
    'La decisión baja por la cadena de mando hasta el gerente de cada hotel: descentralización vertical.',
    [null, 'Centralizar sería que decida la sede.', 'Horizontal sería pasar la decisión a un especialista fuera de la línea.', 'Los gerentes de hotel son línea, no staff.']),
  q('sym-m3-11', 'y3d', 'Una empresa le da al analista de riesgos (staff) la decisión sobre qué clientes reciben crédito, en lugar de los gerentes comerciales. Es:', ['Descentralización horizontal', 'Descentralización vertical', 'Centralización', 'Supervisión directa'], 0,
    'El poder de decisión pasa a un especialista fuera de la línea de mando: horizontal.',
    [null, 'No baja por la cadena de mando.', 'No se concentra en la cima.', 'Es un mecanismo de coordinación, no una forma de distribuir decisiones.']),
  q('sym-m3-12', 'y3d', '¿Cuál es una desventaja típica de la centralización?', ['Decisiones más lentas y sobrecarga de la dirección', 'Pérdida de control sobre las unidades', 'Decisiones inconsistentes entre sucursales', 'Exceso de autonomía de los empleados'], 0,
    'Si todo se decide arriba, la cima se satura y las respuestas tardan. Las otras opciones son riesgos de descentralizar.',
    [null, 'Es un riesgo de descentralizar.', 'Es un riesgo de descentralizar.', 'Es lo opuesto a centralizar.']),
  q('sym-m3-13', 'y3m', 'A los vendedores se les fija una cuota mensual y cada uno decide cómo alcanzarla. ¿Qué mecanismo de coordinación es?', ['Estandarización de resultados', 'Estandarización de procesos', 'Supervisión directa', 'Ajuste mutuo'], 0,
    'Se fija el qué, no el cómo: resultados.',
    [null, 'Procesos fijaría cómo vender, paso a paso.', 'Nadie ordena cada acción.', 'No se coordinan conversando entre ellos.']),
  q('sym-m3-14', 'y3m', 'En un quirófano, cirujano y anestesista trabajan coordinados casi sin hablar porque los dos recibieron la misma formación. ¿Qué mecanismo es?', ['Estandarización de habilidades', 'Estandarización de resultados', 'Supervisión directa', 'Estandarización de procesos'], 0,
    'Lo estandarizado es la formación de quienes trabajan.',
    [null, 'No se fija una meta numérica.', 'Ninguno ordena al otro.', 'La clave del caso es la formación compartida, no un manual.']),
];

export const M3_MAP: ConceptMap = {
  module: 'm3', root: 'Poder y autoridad',
  branches: [
    { t: 'Poder', d: 'capacidad de cambiar actitudes o conductas de otros. No requiere cargo', topic: 'y3', kids: [
      { rel: 'en acción se llama', t: 'Influencia', d: 'el acto que efectivamente produce el cambio' },
      { rel: 'si lo legitima el cargo es', t: 'Autoridad', d: 'derecho a dar órdenes; baja por la cadena de mando' },
    ] },
    { t: 'Fuentes del poder (French y Raven)', d: '¿por qué el otro obedece?', topic: 'y3f', kids: [
      { t: 'Recompensa', d: 'puede dar algo valorado: bono, ascenso, reconocimiento' },
      { t: 'Coercitivo', d: 'puede castigar: sanción, despido. Sirve a corto plazo, genera resentimiento' },
      { t: 'Legítimo', d: 'por el cargo. **Sinónimo de autoridad**' },
      { t: 'Experto', d: 'por el conocimiento. No depende del cargo' },
      { t: 'Referente', d: 'por las cualidades personales (carisma). Típico del líder informal' },
    ] },
    { t: 'Tipos de autoridad', d: '¿puede ordenar?, ¿a quién?, ¿sobre qué?', topic: 'y3a', kids: [
      { t: 'Lineal', d: 'gerentes de la cadena de mando: ordenan a sus subordinados' },
      { t: 'Staff', d: 'asesora y presta servicios a la línea (RR. HH., Legales). **No ordena**' },
      { t: 'Funcional', d: 'un staff controla **su especialidad** en todas las áreas (Sistemas obliga a todos a un curso)' },
      { rel: 'se distribuye mediante', t: 'Delegación', d: 'qué y a quién delegar, dar recursos, intervenir si hace falta, dar feedback' },
    ] },
    { t: '¿Dónde se decide?', topic: 'y3d', kids: [
      { t: 'Jerarquía', d: 'niveles: quién reporta a quién' },
      { t: 'Centralización', d: 'decisiones arriba · ✔ control, uniformidad · ✘ lenta, sobrecarga, desmotiva' },
      { t: 'Descentralización', d: 'decisiones hacia abajo · ✔ rápida, adaptable, motiva · ✘ pérdida de control', kids: [
        { t: 'Vertical', d: 'se delega bajando por la cadena de mando' },
        { t: 'Horizontal', d: 'pasa a analistas, staff o expertos fuera de la línea' },
      ] },
    ] },
    { t: 'Coordinación (Mintzberg)', d: 'integrar partes independientes; más división → más coordinación', topic: 'y3m', kids: [
      { t: 'Ajuste mutuo', d: 'comunicación informal' },
      { t: 'Supervisión directa', d: 'un jefe ordena y controla' },
      { t: 'Estandarizar procesos · resultados · habilidades', d: '**cómo** se hace (manuales) · **qué** lograr (cuota) · **formación** de quien lo hace' },
    ] },
  ],
  links: [
    'V/F del final: la definición de **poder** presentada como si fuera de **autoridad** → **falso**.',
    '"Como su jefe… si lo logran, bono" = **legítimo + recompensa**. Leé cada parte de la frase.',
    'La autoridad **funcional** rompe la unidad de mando en un tema, como la estructura **matricial** (Módulo 1).',
    'El poder **referente** explica a los **líderes informales** (Módulo 1). La estandarización de procesos se apoya en los **manuales** (Módulo 6).',
  ],
};
