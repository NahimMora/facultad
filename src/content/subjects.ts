import type { Subject } from './types';

/**
 * Registro central de materias. Fuente de cada dato:
 * - Módulos: hoja de ruta / programa cuando existe; si no, títulos de apuntes y autoevaluaciones.
 *   Lo que no está confirmado lleva "(a confirmar)".
 * - Material: conteo de la carpeta privada (private/materiales/<id>); los archivos NO se publican.
 */

const FINAL_FORMAT_MISSING = 'Modalidad del final (escrito u oral, teórico o práctico, sincrónico o asincrónico, qué se puede usar)';
const FINAL_MODELS_MISSING = 'Finales viejos o modelos de final (fotos o PDF)';

export const SUBJECTS: Subject[] = [
  /* ===================== CURSANDO ===================== */
  {
    id: 'aid',
    name: 'Análisis de la Información y la Decisión',
    short: 'AID',
    term: '2º cuatrimestre 2026',
    status: 'cursando',
    hue: 268,
    icon: '📊',
    units: [
      { title: 'Unidad 1 · Introducción al Data Warehouse', modules: [
        { id: 'm1', label: 'Módulo 1', title: 'Inteligencia comercial', topics: ['Inteligencia comercial (BI)', 'Data Warehouse', 'Sistemas OLTP y OLAP'] },
        { id: 'm2', label: 'Módulo 2', title: 'El modelo multidimensional', topics: ['Hechos, medidas y dimensiones', 'Esquema de una solución BI'] },
      ] },
      { title: 'Unidad 2 · Conceptos avanzados de Data Warehouse', modules: [
        { id: 'm3', label: 'Módulo 3', title: 'Conceptos avanzados de Data Warehouse' },
        { id: 'm4', label: 'Módulo 4', title: 'Slowly Changing Dimensions (SCD)' },
      ] },
      { title: 'Unidad 3 · La arquitectura física del Data Warehouse', modules: [
        { id: 'm5', label: 'Módulo 5', title: 'La arquitectura física del Data Warehouse', topics: ['Elección de una arquitectura (MOLAP, ROLAP, HOLAP, DOLAP)'] },
        { id: 'm6', label: 'Módulo 6', title: 'Situación actual', topics: ['Webhousing'] },
        { id: 'm7', label: 'Módulo 7', title: 'Modelos columnares' },
      ] },
      { title: 'Unidad 4 · Minería de datos', modules: [
        { id: 'm8', label: 'Módulo 8', title: 'Introducción al Data Mining y técnicas de medición', topics: ['Definiciones de Data Mining', 'Modos de aplicación', 'Casos de ejemplo'] },
      ] },
      { title: 'Unidad 5 · Algoritmos de Data Mining', modules: [
        { id: 'm9', label: 'Módulo 9', title: 'Árboles de decisión y detección de clusters' },
        { id: 'm10', label: 'Módulo 10', title: 'Canasta de mercado y razonamiento basado en memoria (MBR)' },
      ] },
      { title: 'Unidad 6 · Text Mining y Web Mining', modules: [
        { id: 'm11', label: 'Módulo 11', title: 'Metodología CRISP-DM' },
        { id: 'm12', label: 'Módulo 12', title: 'Text Mining y Web Mining' },
      ] },
    ],
    exams: [
      { id: 'p1', name: '1er parcial', kind: 'parcial', state: 'rendido', modules: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'], when: 'semana 8' },
      { id: 'tp-dw', name: 'TP Data Warehouse (PPT + video)', kind: 'tp', state: 'entregado', modules: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'], when: 'semana 8' },
      {
        id: 'p2', name: '2º parcial', kind: 'parcial', state: 'proximo', modules: ['m8', 'm9', 'm10', 'm11', 'm12'], when: 'semana 14 (asincrónico)',
        format: [
          { text: 'Asincrónico.', source: 'hoja de ruta', sure: true },
          { text: 'Entra la segunda mitad: módulos 8 a 12 (Data Mining, algoritmos, CRISP-DM, Text y Web Mining).', source: 'hoja de ruta', sure: true },
          { text: 'El 1er parcial tuvo opción múltiple de 5 opciones (con "todas correctas" y "todas incorrectas"), verdadero o falso, 2 preguntas a desarrollar y un ejercicio práctico. Es probable que el 2º siga la misma estructura.', source: 'parcial viejo del 1er parcial', sure: false },
        ],
      },
      { id: 'tp-dm', name: 'TP Data Mining (PPT + video)', kind: 'tp', state: 'pendiente', modules: ['m8', 'm9', 'm10', 'm11', 'm12'], when: 'semana 14' },
      { id: 'final', name: 'Final', kind: 'final', state: 'pendiente', modules: [] },
    ],
    focus: { examId: 'p2', note: 'Preparar el 2º parcial: Data Mining (módulos 8 a 12).' },
    material: { apuntes: 27, parciales: 3, practica: 4, clases: 1, nota: 'Presentaciones de los 12 módulos (Blackboard), instructivos de Weka para el TP y 51 preguntas de autoevaluaciones del 1er parcial.' },
    missing: [
      'Video del profesor del módulo 8 y grabaciones de Zoom posteriores al 1er parcial (para sumar lo que se dijo en clase)',
      'Modelo de 2º parcial o parciales viejos del 2º parcial',
      'Fecha exacta del 2º parcial',
    ],
  },
  {
    id: 'itc',
    name: 'Introducción a las Comunicaciones',
    short: 'ITc',
    term: '2º cuatrimestre 2026',
    status: 'cursando',
    hue: 196,
    icon: '📡',
    units: [
      { title: 'Unidad 1 · Principios de teoría de la comunicación', modules: [
        { id: 'm1', label: 'Módulo 1', title: 'Definiciones y conceptos generales', topics: ['Componentes de un sistema de comunicación', 'Evolución de las redes', 'Estándares (IEEE, IETF, ISO)'] },
      ] },
      { title: 'Unidad 2 · Arquitecturas de redes de datos', modules: [
        { id: 'm2', label: 'Módulo 2', title: 'Arquitecturas de redes de datos', topics: ['PAN, LAN, MAN, WAN', 'Topologías y medios', 'Control de acceso al medio, LLC'] },
        { id: 'm3', label: 'Módulo 3', title: 'Arquitectura de protocolos', topics: ['Capas, interfaces y primitivas', 'Modelo OSI', 'Encapsulamiento'] },
      ] },
      { title: 'Unidad 3 · Tecnologías de LAN y WAN', modules: [
        { id: 'm4', label: 'Módulo 4', title: 'Conmutación de circuitos y de paquetes' },
        { id: 'm5', label: 'Módulo 5', title: 'Técnicas de transmisión de datos', topics: ['Control de flujo: Stop & Wait, ventana deslizante', 'Paridad, CRC, FEC, ARQ'] },
      ] },
      { title: 'Unidad 4 · LAN', modules: [
        { id: 'm6', label: 'Módulo 6', title: 'Aplicaciones de redes LAN', topics: ['ALOHA, CSMA, CSMA/CD, Token Ring', 'Ethernet IEEE 802.3: MAC y trama', 'Wi-Fi IEEE 802.11'] },
        { id: 'm7', label: 'Módulo 7', title: 'Interconexión de redes', topics: ['Hub, bridge, switch', 'Bridge 802.1D y árbol de expansión', 'Conmutación capa 2 y capa 3', 'Modelo jerárquico de 3 capas'] },
      ] },
      { title: 'Unidad 5 · Capa de red: protocolo IP', modules: [
        { id: 'm8', label: 'Módulo 8', title: 'Direccionamiento IP', topics: ['Encabezado IPv4', 'Clases, direcciones especiales y privadas', 'NAT', 'Subredes y máscaras', 'IPv6'] },
        { id: 'm9', label: 'Módulo 9', title: 'Protocolos de enrutamiento (parte 1)', topics: ['Dijkstra y Bellman-Ford', 'Subnetting', 'Tablas de ruteo'] },
        { id: 'm10', label: 'Módulo 10', title: 'Protocolos de enrutamiento (parte 2)', topics: ['VLSM y CIDR', 'ARP', 'ICMP'] },
      ] },
      { title: 'Unidad 6 · Capa de transporte: TCP y UDP', modules: [
        { id: 'm11', label: 'Módulo 11', title: 'Capa de transporte (parte 1)', topics: ['UDP: datagrama y encabezado', 'TCP: segmento, encabezado, conexión, estados', 'Puertos'] },
        { id: 'm12', label: 'Módulo 12', title: 'Capa de transporte (parte 2)', topics: ['Fragmentación', 'NAT/PAT', 'Control de flujo y de congestión en TCP'] },
      ] },
      { title: 'Unidad 7 · Aplicaciones, protocolos y servicios', modules: [
        { id: 'm13', label: 'Módulo 13', title: 'Capa de aplicación', topics: ['DHCP', 'DNS', 'Correo: SMTP, MIME, POP, IMAP', 'HTTP', 'FTP'] },
      ] },
    ],
    exams: [
      { id: 'p1', name: '1er parcial', kind: 'parcial', state: 'rendido', modules: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'], when: 'martes 13/10' },
      {
        id: 'p2', name: '2º parcial', kind: 'parcial', state: 'proximo', modules: ['m8', 'm9', 'm10', 'm11', 'm12', 'm13'], when: 'se abre el martes 10/11, disponible hasta el viernes 13/11 a las 14 h',
        format: [
          { text: 'Entran las unidades 5, 6 y 7: capa de red e IP, transporte (TCP/UDP) y aplicación. Ethernet (unidad 4) ya entró en el 1er parcial.', source: 'el profesor en la clase del 27/10 y del 20/10', sure: true },
          { text: 'Se abre el martes y queda disponible hasta el viernes a las 14 h. El 1er parcial duraba 2 horas y se podía tener el material a mano.', source: 'clases del 03/11 y del 06/10', sure: true },
          { text: 'Ejercicios típicos: clase de una IPv4, parte de red y de host, máscara por defecto y **al menos 2 de subnetting** como los de la guía 5.2 (210.100.56.0 con 6 subredes; 118.0.0.0 con 126 subredes).', source: 'clase del 03/11 (guía 5.2 en Blackboard)', sure: true },
          { text: 'Remarcó entender bien **control de congestión vs. control de flujo** y que **IP es no orientado a conexión**.', source: 'clases del 03/11 y del 20/10', sure: true },
          { text: 'El 1er parcial combinó consignas de desarrollo y cálculo con alguna de opción múltiple; el 2º probablemente siga ese formato.', source: '1er parcial del 13/10', sure: false },
        ],
      },
      { id: 'final', name: 'Final (oral, entran todos los temas)', kind: 'final', state: 'pendiente', modules: [] },
    ],
    focus: { examId: 'p2', note: 'Preparar el 2º parcial (martes 10/11): IP y subnetting, transporte y aplicación (unidades 5 a 7).' },
    material: { apuntes: 12, parciales: 3, practica: 2, clases: 10, nota: 'Presentaciones de las unidades 1 a 7, guía 5.2, el 1er parcial con sus consignas y transcripciones de todas las clases (incluidas las del 06/10 al 03/11 bajadas de Zoom).' },
    missing: [
      'Resolución oficial de la guía 5.2 (el profesor dijo que la iba a subir)',
      'Modelo de 2º parcial, si lo comparte',
    ],
  },

  /* ===================== REGULARIZADAS → FINAL ===================== */
  {
    id: 'iisw',
    name: 'Introducción a la Ingeniería de Software',
    short: 'IISW',
    term: '2º cuatrimestre 2026',
    status: 'regular',
    hue: 220,
    icon: '🧩',
    units: [
      { title: 'Unidad 1 · Ingeniería del software', modules: [{ id: 'm1', label: 'Módulo 1', title: 'Conceptos de ingeniería del software' }] },
      { title: 'Unidad 2 · Ciclos de vida', modules: [
        { id: 'm2', label: 'Módulo 2', title: 'Modelos de ciclo de vida' },
        { id: 'm3', label: 'Módulo 3', title: 'Metodologías ágiles' },
      ] },
      { title: 'Unidad 3 · Requerimientos y modelado', modules: [
        { id: 'm4', label: 'Módulo 4', title: 'Extracción de requerimientos e introducción al modelado' },
        { id: 'm5', label: 'Módulo 5', title: 'Modelado de procesos de negocio (BPMN)' },
      ] },
      { title: 'Unidades 4 y 5 · Ingeniería de requerimientos', modules: [
        { id: 'm6', label: 'Módulo 6', title: 'Importancia de la ingeniería de requerimientos' },
        { id: 'm7', label: 'Módulo 7', title: 'Especificación de requerimientos' },
      ] },
      { title: 'Unidad 6 · Modelos de requerimientos', modules: [
        { id: 'm8', label: 'Módulo 8', title: 'Modelo de requerimientos: casos de uso e historias de usuario' },
        { id: 'm9', label: 'Módulo 9', title: 'Pruebas de los requerimientos' },
        { id: 'm10', label: 'Módulo 10', title: 'Diagramas de secuencia' },
      ] },
      { title: 'Unidad 7 · Sistemas, reingeniería, métodos formales', modules: [
        { id: 'm11', label: 'Módulo 11', title: 'Tipos de sistemas' },
        { id: 'm12', label: 'Módulo 12', title: 'Reingeniería y métodos formales' },
      ] },
    ],
    exams: [
      { id: 'p1', name: '1er parcial', kind: 'parcial', state: 'rendido', modules: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'] },
      { id: 'p2', name: '2º parcial', kind: 'parcial', state: 'rendido', modules: ['m8', 'm9', 'm10', 'm11', 'm12'] },
      { id: 'final', name: 'Final', kind: 'final', state: 'pendiente', modules: [] },
    ],
    focus: { examId: 'final', note: 'Regularizada. El 2º parcial ya tiene plataforma propia con videos; falta integrar la primera mitad para el final.' },
    material: { apuntes: 7, parciales: 4, practica: 9, clases: 3, nota: 'Incluye teoría, práctica, autoevaluación y parciales viejos ya procesados.' },
    missing: [FINAL_FORMAT_MISSING, FINAL_MODELS_MISSING, 'Apuntes de los módulos 1 a 7 en PDF (para la primera mitad)'],
    links: [{ label: 'Plataforma del 2º parcial (videos, práctica y modo urgente)', url: 'https://nahimmora.github.io/iisw-parcial2/' }],
  },
  {
    id: 'fia',
    name: 'Fundamentos de la Inteligencia Artificial',
    short: 'FIA',
    term: '2º cuatrimestre 2026',
    status: 'regular',
    hue: 330,
    icon: '🧠',
    units: [
      { title: 'Unidad 1 · Introducción a la IA', modules: [
        { id: 'm1', label: 'Módulo 1', title: 'Definiciones e historia' },
        { id: 'm2', label: 'Módulo 2', title: 'Relación con otras ciencias' },
        { id: 'm3', label: 'Módulo 3', title: 'Resolución de problemas en IA' },
      ] },
      { title: 'Unidad 2 · Programación lógica', modules: [{ id: 'm4', label: 'Módulo 4', title: 'Introducción a Prolog' }] },
      { title: 'Unidad 3 · Sistemas basados en conocimiento', modules: [{ id: 'm5', label: 'Módulo 5', title: 'Sistemas basados en conocimiento' }] },
      { title: 'Unidad 4 · Razonamiento aproximado', modules: [
        { id: 'm6', label: 'Módulo 6', title: 'Introducción al razonamiento aproximado' },
        { id: 'm7', label: 'Módulo 7', title: 'Sistemas artificiales conexionistas' },
      ] },
      { title: 'Unidad 5 · Redes neuronales', modules: [{ id: 'm8', label: 'Módulo 8', title: 'Perceptrones' }] },
      { title: 'Unidades 6 y 7 · Computación evolutiva e híbridos', modules: [
        { id: 'm9', label: 'Módulo 9', title: 'Algoritmos evolutivos' },
        { id: 'm10', label: 'Módulo 10', title: 'Sistemas artificiales híbridos' },
      ] },
      { title: 'Unidades 8 y 9 · Agentes y robótica', modules: [
        { id: 'm11', label: 'Módulo 11', title: 'Introducción a los agentes inteligentes' },
        { id: 'm12', label: 'Módulo 12', title: 'Introducción a la robótica' },
      ] },
    ],
    exams: [
      { id: 'p1', name: '1er parcial (asincrónico)', kind: 'parcial', state: 'rendido', modules: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'] },
      { id: 'p2', name: '2º parcial (asincrónico)', kind: 'parcial', state: 'rendido', modules: ['m8', 'm9', 'm10', 'm11', 'm12'] },
      { id: 'final', name: 'Final', kind: 'final', state: 'pendiente', modules: [] },
    ],
    focus: { examId: 'final', note: 'Regularizada. Hay un video de 30 minutos del 2º parcial hecho localmente para reutilizar.' },
    material: { apuntes: 13, parciales: 2, practica: 3, clases: 2, nota: 'Incluye hoja de ruta, syllabus y la carpeta de trabajo del video del 2º parcial.' },
    missing: [FINAL_FORMAT_MISSING, FINAL_MODELS_MISSING, 'Enunciado del 2º parcial (si lo tenés)', 'Apuntes de algoritmos evolutivos, híbridos, agentes y robótica (módulos 9 a 12)'],
  },
  {
    id: 'arq',
    name: 'Arquitectura de Computadores',
    short: 'Arq',
    term: '2º cuatrimestre 2026',
    status: 'regular',
    hue: 24,
    icon: '🖥️',
    units: [
      { title: 'Primera mitad (1er parcial)', modules: [
        { id: 't1', label: 'Tema', title: 'Organización del computador y memoria (a confirmar)', topics: ['Jerarquía de memoria', 'Caché', 'Memoria virtual'] },
      ] },
      { title: 'Segunda mitad (2º parcial)', modules: [
        { id: 't2', label: 'Tema', title: 'Unidad de control y ciclo de instrucción', topics: ['UC cableada, microprogramada e híbrida', 'IF → ID → OF → EX', 'Modos de direccionamiento'] },
        { id: 't3', label: 'Tema', title: 'Paralelismo y procesadores', topics: ['Pipeline, IPC, riesgos', 'Superescalar y superpipeline', 'Front-end / back-end, ROB', 'Flynn, CISC/RISC, SMP'] },
        { id: 't4', label: 'Tema', title: 'Buses' },
        { id: 't5', label: 'Tema', title: 'Entrada/salida e interrupciones', topics: ['Sondeo, interrupciones, DMA', 'IRQ, ISR, vector, NMI'] },
        { id: 't6', label: 'Tema', title: 'Ensamblador (debug)' },
        { id: 't7', label: 'Tema', title: 'Nuevas tecnologías', topics: ['SoC, CPU/GPU, nube'] },
      ] },
    ],
    exams: [
      { id: 'p1', name: '1er parcial', kind: 'parcial', state: 'rendido', modules: ['t1'] },
      { id: 'p2', name: '2º parcial', kind: 'parcial', state: 'rendido', modules: ['t2', 't3', 't4', 't5', 't6', 't7'] },
      { id: 'final', name: 'Final', kind: 'final', state: 'pendiente', modules: [] },
    ],
    focus: { examId: 'final', note: 'Regularizada. La segunda mitad ya está analizada (plan pedagógico local); falta material de la primera.' },
    material: { apuntes: 1, parciales: 1, practica: 1, clases: 6, nota: 'Teoría del 2º parcial (142 páginas) y 6 clases grabadas.' },
    missing: [FINAL_FORMAT_MISSING, FINAL_MODELS_MISSING, 'Apuntes de la primera mitad (organización, memoria, caché, memoria virtual)', 'Programa u hoja de ruta de la materia'],
  },
  {
    id: 'pye',
    name: 'Probabilidad y Estadística',
    short: 'PyE',
    term: '2º cuatrimestre 2026',
    status: 'regular',
    hue: 152,
    icon: '🎲',
    units: [
      { title: 'Primera parte', modules: [
        { id: 'u1', label: 'Unidad', title: 'Estadística descriptiva', topics: ['Presentación de datos', 'Medidas resumen'] },
        { id: 'u2', label: 'Unidad', title: 'Cálculo de probabilidades' },
        { id: 'u3', label: 'Unidad', title: 'Variables aleatorias discretas', topics: ['Binomial', 'Poisson'] },
        { id: 'u4', label: 'Unidad', title: 'Variables continuas: distribución normal' },
        { id: 'u5', label: 'Unidad', title: 'Suma de variables y Teorema Central del Límite' },
      ] },
      { title: 'Segunda parte (inferencia)', modules: [
        { id: 'u6', label: 'Unidad', title: 'Inferencia para una población', topics: ['Intervalos de confianza', 'Test de hipótesis', 'Proporciones'] },
        { id: 'u7', label: 'Unidad', title: 'Comparación de dos poblaciones' },
        { id: 'u8', label: 'Unidad', title: 'Datos categóricos y pruebas no paramétricas' },
        { id: 'u9', label: 'Unidad', title: 'Regresión y correlación' },
      ] },
    ],
    exams: [
      { id: 'p1', name: '1er parcial', kind: 'parcial', state: 'rendido', modules: ['u1', 'u2', 'u3', 'u4', 'u5'] },
      { id: 'p2', name: '2º parcial', kind: 'parcial', state: 'rendido', modules: ['u6', 'u7', 'u8', 'u9'] },
      { id: 'final', name: 'Final', kind: 'final', state: 'pendiente', modules: [] },
    ],
    focus: { examId: 'final', note: 'Regularizada. Hay teórico y práctico completos de la cátedra, modelos de 2º parcial con respuestas y 10 clases grabadas.' },
    material: { apuntes: 7, parciales: 8, practica: 3, clases: 11 },
    missing: [FINAL_FORMAT_MISSING, FINAL_MODELS_MISSING, 'Tabla o fórmulas permitidas en el final (si dan una)'],
  },
  {
    id: 'bd',
    name: 'Base de Datos',
    short: 'BD',
    term: '1er cuatrimestre 2026',
    status: 'regular',
    hue: 40,
    icon: '🗄️',
    units: [
      { title: 'Modelado', modules: [
        { id: 't1', label: 'Tema', title: 'Sistemas de bases de datos' },
        { id: 't2', label: 'Tema', title: 'Modelado de datos: DER' },
        { id: 't3', label: 'Tema', title: 'Modelado avanzado' },
        { id: 't4', label: 'Tema', title: 'Transformación DER → modelo relacional' },
      ] },
      { title: 'Lenguajes', modules: [
        { id: 't5', label: 'Tema', title: 'Álgebra relacional' },
        { id: 't6', label: 'Tema', title: 'SQL: definición de datos y restricciones de integridad' },
        { id: 't7', label: 'Tema', title: 'SQL: consultas y consultas avanzadas' },
      ] },
    ],
    exams: [
      { id: 'p1', name: '1er parcial (+ recuperatorio)', kind: 'parcial', state: 'rendido', modules: ['t1', 't2', 't3', 't4', 't5'] },
      { id: 'p2', name: '2º parcial', kind: 'parcial', state: 'rendido', modules: ['t6', 't7'] },
      { id: 'final', name: 'Final', kind: 'final', state: 'pendiente', modules: [] },
    ],
    focus: { examId: 'final', note: 'Regularizada. Hay apuntes, parciales, recuperatorio y 7 clases de SQL y álgebra grabadas.' },
    material: { apuntes: 11, parciales: 5, practica: 9, clases: 7 },
    missing: [FINAL_FORMAT_MISSING, FINAL_MODELS_MISSING, 'Programa u hoja de ruta (para confirmar el orden de los módulos)'],
  },
  {
    id: 'sym',
    name: 'Sistemas y Métodos',
    short: 'SyM',
    term: '1er cuatrimestre 2026',
    status: 'regular',
    hue: 0,
    icon: '🏢',
    units: [
      { title: 'La organización y las personas', modules: [
        { id: 'm1', label: 'Módulo 1', title: 'La organización (a confirmar)' },
        { id: 'm2', label: 'Módulo 2', title: 'Descripción de puestos y tipos de equipos' },
        { id: 'm3', label: 'Módulo 3', title: 'Poder y autoridad' },
        { id: 'm4', label: 'Módulo 4', title: 'La dirección' },
      ] },
      { title: 'Administración y sistemas', modules: [
        { id: 'm5', label: 'Módulo 5', title: 'La planificación y el control' },
        { id: 'm6', label: 'Módulo 6', title: 'El proceso administrativo' },
        { id: 'm7', label: 'Módulo 7', title: 'Teoría de sistemas' },
        { id: 'm8', label: 'Módulo 8', title: 'Proceso administrativo y optimización de operaciones (a confirmar)' },
      ] },
      { title: 'Sistemas de información', modules: [
        { id: 'm9', label: 'Módulo 9', title: 'Los sistemas de información en las empresas (a confirmar)' },
        { id: 'm10', label: 'Módulo 10', title: 'Sistemas de información (parte 2)' },
        { id: 'm11', label: 'Módulo 11', title: 'El proceso de desarrollo de sistemas de información' },
        { id: 'm12', label: 'Módulo 12', title: 'Comunicación oral y escrita' },
      ] },
    ],
    exams: [
      { id: 'p1', name: '1er parcial', kind: 'parcial', state: 'rendido', modules: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'] },
      { id: 'p2', name: '2º parcial', kind: 'parcial', state: 'rendido', modules: ['m7', 'm8', 'm9', 'm10', 'm11', 'm12'] },
      { id: 'final', name: 'Final', kind: 'final', state: 'pendiente', modules: [] },
    ],
    focus: { examId: 'final', note: 'Regularizada. Hay módulos 1 a 7, apuntes de sistemas de información, casos de estudio y resúmenes del 2º parcial.' },
    material: { apuntes: 22, parciales: 3, practica: 3, clases: 0 },
    missing: [FINAL_FORMAT_MISSING, FINAL_MODELS_MISSING, 'Hoja de ruta (para confirmar los módulos 1, 8 y 9)', 'Parciales que rendiste (enunciados)'],
  },
  {
    id: 'sd1',
    name: 'Sistemas Digitales I',
    short: 'SD I',
    term: '1er cuatrimestre 2026',
    status: 'regular',
    hue: 110,
    icon: '🔌',
    units: [
      { title: 'Lógica combinacional', modules: [
        { id: 't1', label: 'Tema', title: 'Sistemas de numeración y aritmética binaria' },
        { id: 't2', label: 'Tema', title: 'Compuertas lógicas y álgebra de Boole' },
        { id: 't3', label: 'Tema', title: 'Funciones lógicas con álgebra de Boole' },
        { id: 't4', label: 'Tema', title: 'Mapas de Karnaugh' },
        { id: 't5', label: 'Tema', title: 'Hardware digital' },
        { id: 't6', label: 'Tema', title: 'Circuitos combinatorios: decodificadores, multiplexores, sumadores y restadores' },
      ] },
      { title: 'Lógica secuencial', modules: [
        { id: 't7', label: 'Tema', title: 'Circuitos realimentados: biestables' },
        { id: 't8', label: 'Tema', title: 'Máquinas de estado' },
      ] },
    ],
    exams: [
      { id: 'p1', name: '1er parcial', kind: 'parcial', state: 'rendido', modules: ['t1', 't2', 't3', 't4', 't5'] },
      { id: 'tpi', name: 'TP integrador', kind: 'tp', state: 'entregado', modules: [] },
      { id: 'final', name: 'Final', kind: 'final', state: 'pendiente', modules: [] },
    ],
    focus: { examId: 'final', note: 'Regularizada. Hay apuntes de casi todos los temas, guías, TP de ejercitación y TP integrador.' },
    material: { apuntes: 10, parciales: 1, practica: 13, clases: 1 },
    missing: [FINAL_FORMAT_MISSING, FINAL_MODELS_MISSING, 'Hoja de ruta', 'Enunciado del 2º parcial (si hubo)', 'Apunte de máquinas de estado'],
  },
  {
    id: 'ca',
    name: 'Computación Aplicada',
    short: 'CA',
    term: '1er cuatrimestre 2026',
    status: 'regular',
    hue: 290,
    icon: '🐧',
    units: [
      { title: 'GNU/Linux (Debian)', modules: [
        { id: 'm1', label: 'Módulo 1', title: 'Instalación de Debian e inicio' },
        { id: 'm2', label: 'Módulo 2', title: 'Introducción a la terminal' },
        { id: 'm3', label: 'Módulo 3', title: 'Gestión del software y redirecciones' },
        { id: 'm4', label: 'Módulo 4', title: 'Redes' },
        { id: 'm5', label: 'Módulo 5', title: 'Seguridad y accesos' },
        { id: 'm6', label: 'Módulo 6', title: 'Permisos de archivos' },
        { id: 'm7', label: 'Módulo 7', title: 'Sistema de archivos (filesystem)' },
        { id: 'm8', label: 'Tema', title: 'Scripting y cron (a confirmar)' },
      ] },
    ],
    exams: [
      { id: 'tpi', name: 'TP integrador (VM Debian)', kind: 'tp', state: 'entregado', modules: [] },
      { id: 'final', name: 'Final', kind: 'final', state: 'pendiente', modules: [] },
    ],
    focus: { examId: 'final', note: 'Regularizada. Hay apuntes de los módulos 1 a 7, clases grabadas de los módulos 3 a 7 y el TP integrador.' },
    material: { apuntes: 7, parciales: 0, practica: 2, clases: 5 },
    missing: [FINAL_FORMAT_MISSING, FINAL_MODELS_MISSING, 'Parciales que rendiste (no hay ninguno)', 'Apunte de scripting (si es un módulo aparte)', 'Hoja de ruta'],
  },
  {
    id: 'am2',
    name: 'Análisis Matemático II',
    short: 'AM II',
    term: '1er cuatrimestre 2026',
    status: 'regular',
    hue: 60,
    icon: '∫',
    units: [
      { title: 'Funciones de una variable', modules: [
        { id: 'm1', label: 'Módulo 1', title: 'Aplicación de las derivadas: extremos relativos, concavidad' },
        { id: 'm2', label: 'Módulo 2', title: 'Estudio completo de funciones' },
        { id: 'm4', label: 'Módulo 4', title: 'Métodos de integración (integrales indefinidas)' },
        { id: 't-int', label: 'Tema', title: 'Integrales definidas e impropias' },
      ] },
      { title: 'Funciones de dos variables', modules: [
        { id: 'm7', label: 'Módulo 7', title: 'Funciones de dos variables (campos escalares, dominio)' },
        { id: 'm8', label: 'Módulo 8', title: 'Límite doble' },
        { id: 't-der', label: 'Tema', title: 'Derivadas parciales y direccionales' },
        { id: 't-ext', label: 'Tema', title: 'Extremos libres y ligados de funciones de dos variables' },
      ] },
    ],
    exams: [
      { id: 'p1', name: '1er parcial', kind: 'parcial', state: 'rendido', modules: ['m1', 'm2', 'm4', 't-int'] },
      { id: 'p2', name: '2º parcial', kind: 'parcial', state: 'rendido', modules: ['m7', 'm8', 't-der', 't-ext'] },
      { id: 'final', name: 'Final', kind: 'final', state: 'pendiente', modules: [] },
    ],
    focus: { examId: 'final', note: 'Regularizada. Hay apuntes, guías, los dos parciales y una ejercitación de repaso.' },
    material: { apuntes: 10, parciales: 5, practica: 7, clases: 1 },
    missing: [FINAL_FORMAT_MISSING, FINAL_MODELS_MISSING, 'Hoja de ruta (para confirmar módulos 3, 5, 6, 9 y 10)', 'Respuestas de las guías de los módulos 2 a 8'],
  },
];

export const subjectById = (id: string) => SUBJECTS.find((s) => s.id === id);

export const allModules = (s: Subject) => s.units.flatMap((u) => u.modules);

export const examModules = (s: Subject, examId: string) => {
  const ex = s.exams.find((e) => e.id === examId);
  if (!ex) return [];
  const mods = allModules(s);
  return ex.modules.length ? mods.filter((m) => ex.modules.includes(m.id)) : mods;
};
