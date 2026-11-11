/** BD · final · recorridos visuales propios. */
import type { VisScene } from '../../vis/types';
import { arr, bits, box, head, ico, scene, stack, table, txt } from './h';

const rel = (a: string, b: string, ea: string, eb: string, o: Record<string, unknown> = {}) => arr(a, b, { head: false, ea, eb, c: 'white', ...o });

export const SCENES: Record<string, VisScene[]> = {
  b1: [
    scene([
      head('Sistema de base de datos'),
      ico(90, 110, 'user', { t: 'usuarios', c: 'blue' }), ico(90, 235, 'user', { t: 'DBA', c: 'orange', s: 3 }),
      box(190, 80, 160, 70, 'Aplicaciones', { c: 'blue', fs: 19, id: 'app' }),
      box(400, 60, 220, 220, '', { c: 'purple', s: 1 }), txt(510, 85, 'SGBD (DBMS)', { b: true, fs: 20, c: 'purple', s: 1 }),
      box(420, 105, 180, 70, 'Procesador de consultas', { c: 'purple', fs: 16, s: 1, id: 'pc' }),
      box(420, 190, 180, 70, 'Gestor de almacenamiento', { c: 'purple', fs: 16, s: 1, id: 'ga' }),
      arr('app', 'pc', { c: 'blue', s: 1 }), txt(375, 160, 'SQL', { b: true, fs: 16, c: 'blue', s: 1 }), arr('pc', 'ga', { c: 'purple', s: 1 }),
      box(660, 120, 120, 150, 'BD', { shape: 'db', c: 'green', fs: 24, sub: 'datos + metadatos', s: 2, id: 'db' }),
      arr('ga', 'db', { c: 'green', s: 2 }),
      txt(150, 300, 'define esquemas, permisos y BACKUP', { fs: 16, b: true, c: 'orange', s: 3, anchor: 'start' }),
      stack(60, 330, 680, 105, [{ t: 'Externo', d: 'vistas de cada usuario', c: 'cyan' }, { t: 'Conceptual', d: 'qué datos y cómo se relacionan', c: 'blue' }, { t: 'Interno', d: 'cómo se guardan físicamente', c: 'gray' }], { s: 4, fs: 15 }),
    ], [
      'Un **sistema de base de datos** no es solo la base: incluye a los usuarios, las aplicaciones, el SGBD, el hardware y los datos.',
      'El **SGBD** es el software que administra todo. Su **procesador de consultas** traduce SQL a operaciones internas, y el **gestor de almacenamiento** se ocupa del acceso físico.',
      'La **base de datos** en sí son los **datos más los metadatos**: el catálogo, que describe la estructura.',
      'El **DBA** es el usuario principal: define los esquemas, los permisos y las **políticas de backup**.',
      'La **arquitectura ANSI-SPARC** separa tres niveles: externo, conceptual e interno. Así se logra **independencia lógica y física**: podés cambiar cómo se guarda sin romper las aplicaciones.',
    ]),
  ],

  b2: [
    scene([
      head('DER: cardinalidad y modalidad (pata de gallo)'),
      box(40, 70, 180, 70, 'Equipo', { c: 'blue', fs: 22, sub: 'cod_equipo*', id: 'eq' }),
      box(560, 70, 200, 70, 'Jugador', { c: 'green', fs: 22, sub: 'nro_jugador*', id: 'ju' }),
      rel('eq', 'ju', '||', '|<', { t: 'tiene (1:N)' }),
      box(40, 210, 180, 70, 'Comida', { c: 'orange', fs: 22, id: 'co', s: 1 }),
      box(560, 210, 200, 70, 'Ingrediente', { c: 'pink', fs: 22, id: 'in', s: 1 }),
      rel('co', 'in', '|<', 'o<', { t: 'N:M', s: 1, out: 2, dash: true }),
      box(300, 210, 180, 70, 'Receta', { c: 'yellow', fs: 22, sub: 'cod_comida* · cod_ingr*', id: 're', s: 2 }),
      rel('co', 're', '||', '|<', { s: 2 }), rel('in', 're', '||', 'o<', { s: 2 }),
      table(40, 320, 720, ['Símbolo', 'Significa'], [['||', 'uno y solo uno'], ['o<', 'cero o muchos (opcional)'], ['|<', 'uno o muchos (obligatorio)']], { rh: 34, fs: 17, s: 3, mono: true, cw: [1, 3] }),
    ], [
      'Un **DER** muestra **entidades**, sus **atributos** y cómo se relacionan. "Cada jugador pertenece a un solo equipo y un equipo tiene varios jugadores": del lado del equipo, uno y solo uno; del lado del jugador, muchos. Es **1 a N**.',
      '"Cada comida tiene varios ingredientes y cada ingrediente está en varias comidas": eso es **N a M**.',
      'Una N a M se resuelve con una **entidad intermedia**, Receta, cuya clave es la **combinación** de las dos claves. Así quedan dos relaciones 1 a N.',
      'En pata de gallo: la **cardinalidad** es el máximo, una rayita o la pata; la **modalidad** es el mínimo: el **círculo** es opcional, cero, y la **barra** es obligatoria, uno.',
    ]),
  ],

  b3: [
    scene([
      head('Modelado avanzado'),
      box(30, 60, 170, 64, 'Pedido', { c: 'blue', fs: 20, id: 'pe' }),
      box(30, 190, 170, 64, 'Línea', { c: 'blue', fs: 20, sub: 'débil', id: 'li', dash: true }),
      rel('pe', 'li', '||', '|<'), txt(115, 290, 'ENTIDAD DÉBIL', { b: true, fs: 17, c: 'blue' }),
      box(290, 120, 180, 64, 'Empleado', { c: 'green', fs: 20, id: 'em', s: 1 }),
      arr([470, 140], [470, 170], { bend: -120, c: 'green', s: 1, head: false, ea: 'o|', eb: 'o<' }),
      txt(380, 290, 'RECURSIVA: jefe de', { b: true, fs: 17, c: 'green', s: 1 }),
      box(600, 50, 170, 56, 'Persona', { c: 'purple', fs: 20, id: 'pp', s: 2 }),
      box(560, 180, 110, 56, 'Alumno', { c: 'purple', fs: 18, id: 'al', s: 2 }), box(680, 180, 110, 56, 'Docente', { c: 'purple', fs: 18, id: 'dc', s: 2 }),
      arr('al', 'pp', { c: 'purple', s: 2 }), arr('dc', 'pp', { c: 'purple', s: 2 }),
      txt(680, 290, 'GENERALIZACIÓN', { b: true, fs: 17, c: 'purple', s: 2 }),
      box(30, 330, 740, 100, 'Atributo de la relación: la FECHA de un paseo depende del guía Y de la ruta → va en la entidad intermedia Paseo_Guía', { c: 'yellow', fs: 18, s: 3 }),
    ], [
      'Una **entidad débil** no se identifica sola: necesita la clave de la fuerte. Una línea de pedido solo tiene sentido dentro de su pedido.',
      'Una **relación recursiva** une una entidad consigo misma: un empleado es jefe de otros empleados.',
      'La **generalización** pone los atributos comunes en un supertipo, Persona, y los específicos en los subtipos, Alumno y Docente.',
      'Y cuando un dato depende de **las dos** entidades de una N a M, como la **fecha** en que un guía da un paseo por una ruta, va en la **entidad intermedia**. En el final de 2024 la fecha además forma parte de la clave.',
    ]),
  ],

  b4: [
    scene([
      head('Del DER a tablas: ¿dónde va la FK?'),
      box(40, 70, 200, 70, 'Departamento', { c: 'blue', fs: 20, id: 'd' }),
      box(560, 70, 200, 70, 'Empleado', { c: 'green', fs: 20, id: 'e' }),
      rel('d', 'e', '||', '|<', { t: '1 : N' }),
      table(40, 180, 340, ['Departamento'], [['cod_depto* · nombre']], { rh: 40, fs: 17, s: 1 }),
      table(420, 180, 340, ['Empleado'], [['legajo* · nombre · cod_depto (FK)']], { rh: 40, fs: 17, s: 1, hi: [{ r: 0, s: 1, c: 'yellow' }] }),
      txt(400, 290, '1:N → la PK del lado 1 viaja como FK al lado N', { b: true, fs: 20, c: 'yellow', s: 1 }),
      box(40, 330, 720, 90, 'N:M → tabla intermedia con PK compuesta por las dos FK · PK única y no nula · FK = integridad referencial', { c: 'cyan', fs: 18, s: 2 }),
    ], [
      'Al pasar el DER a tablas, cada entidad es una tabla. En una relación **1 a N**, como departamento y empleados…',
      '…la **clave del lado 1 viaja como clave foránea al lado N**. Cada empleado apunta a su único departamento. Al revés no se podría: un departamento tendría que guardar muchos empleados en una celda.',
      'Las **N a M** generan una **tabla intermedia** con clave compuesta por las dos foráneas. La **PK** identifica cada fila, única y no nula; la **FK** garantiza la **integridad referencial**.',
    ]),
    scene([
      head('Normalización: 1FN, 2FN y 3FN'),
      box(30, 60, 230, 140, '1FN', { c: 'blue', fs: 30, sub: 'sin GRUPOS REPETITIVOS: cada celda, un valor' }),
      box(285, 60, 230, 140, '2FN', { c: 'orange', fs: 30, sub: 'sin dependencias PARCIALES de una clave compuesta', s: 1 }),
      box(540, 60, 230, 140, '3FN', { c: 'pink', fs: 30, sub: 'sin dependencias TRANSITIVAS (no primo → no primo)', s: 2 }),
      bits(60, 270, 680, [{ t: 'A*', c: 'yellow' }, { t: 'B*', c: 'yellow' }, { t: 'C' }, { t: 'D' }, { t: 'E' }], { h: 54, fs: 22, c: 'gray', s: 1, mono: true }),
      arr([264, 330], [536, 330], { c: 'orange', s: 1, bend: 40 }), txt(400, 382, 'B → D: parcial', { b: true, fs: 17, c: 'orange', s: 1 }),
      arr([546, 330], [672, 330], { c: 'pink', s: 2, bend: 30 }), txt(650, 400, 'D → E: transitiva', { b: true, fs: 17, c: 'pink', s: 2 }),
      txt(400, 440, 'PK simple → ya está en 2FN', { b: true, fs: 18, c: 'yellow', s: 3 }),
    ], [
      '**Primera forma normal**: sin **grupos repetitivos**. Cada celda tiene un solo valor. Si un veterinario atiende varias mascotas en la misma fila, se separan en otra estructura que lleva la clave como FK.',
      '**Segunda**: además, ningún atributo depende de **parte** de una clave compuesta. Si la clave es A y B, y D depende solo de B, es una **dependencia parcial**: D se va a otra tabla con B.',
      '**Tercera**: además, ningún atributo no primo depende de **otro no primo**. Si E depende de D, que no es clave, es **transitiva**: se separa D con E.',
      'Atajo: si la clave primaria es **simple**, no puede haber dependencias parciales, así que una tabla en 1FN ya está en 2FN.',
    ]),
  ],

  b5: [
    scene([
      head('Álgebra relacional: σ, π y ⨝'),
      table(30, 60, 330, ['legajo', 'nombre', 'año'], [['1', 'Ana', '2023'], ['2', 'Beto', '2024'], ['3', 'Caro', '2023']], { rh: 36, fs: 17, hi: [{ r: 0, s: 1, c: 'yellow', to: 2 }, { r: 2, s: 1, c: 'yellow', to: 2 }] }),
      txt(195, 225, 'σ año = 2023 → filas', { b: true, fs: 19, c: 'yellow', s: 1 }),
      box(118, 55, 120, 160, '', { c: 'cyan', s: 2, out: 3 }),
      txt(195, 255, 'π nombre → columnas', { b: true, fs: 19, c: 'cyan', s: 2 }),
      table(420, 60, 160, ['legajo', 'nombre'], [['1', 'Ana'], ['2', 'Beto']], { rh: 34, fs: 16, s: 3 }),
      table(600, 60, 180, ['legajo', 'nota'], [['1', '8'], ['2', '4']], { rh: 34, fs: 16, s: 3 }),
      table(470, 190, 260, ['legajo', 'nombre', 'nota'], [['1', 'Ana', '8'], ['2', 'Beto', '4']], { rh: 34, fs: 16, s: 3, c: 'green' }),
      txt(600, 310, '⨝ A.legajo = E.legajo', { b: true, fs: 19, c: 'green', s: 3 }),
      box(30, 340, 740, 90, '× producto: todas las combinaciones, sin requisitos · ∪ − ∩: exigen compatibilidad con la unión', { c: 'purple', fs: 18, s: 4 }),
    ], [
      'El álgebra relacional opera sobre tablas y devuelve tablas.',
      '**Selección, sigma**, filtra **filas** por una condición: los alumnos de 2023.',
      '**Proyección, pi**, elige **columnas**, y elimina duplicados.',
      '**Junta**, el join, combina dos tablas por una condición, como el mismo legajo: cada alumno con sus notas.',
      'El **producto cartesiano** combina todas las filas con todas, **sin requisitos**. En cambio la **unión, la diferencia y la intersección** exigen tablas **compatibles con la unión**: mismo grado y dominios.',
    ]),
    scene([
      head('"Y", "NO" y "único": intersección y diferencia'),
      box(60, 70, 300, 250, '', { shape: 'circle', c: 'blue' }), box(240, 70, 300, 250, '', { shape: 'circle', c: 'orange' }),
      txt(140, 195, 'Cursaron', { b: true, fs: 20, c: 'blue' }), txt(470, 195, 'Aprobaron', { b: true, fs: 20, c: 'orange' }),
      box(262, 140, 76, 110, '∩', { c: 'green', solid: true, fs: 30, s: 1 }),
      box(570, 70, 210, 110, '"cursaron Y aprobaron" → ∩', { c: 'green', fs: 17, s: 1 }),
      box(570, 195, 210, 110, '"los que NO…" → todos − los que sí', { c: 'red', fs: 17, s: 2 }),
      box(30, 350, 740, 80, '"Proveedores con un ÚNICO artículo" = todos con artículos − los que tienen 2 o más (junta de Artículo consigo misma)', { c: 'yellow', fs: 17, s: 3 }),
    ], [
      'Las consultas con palabras clave se traducen a conjuntos. Tenemos el conjunto de los que **cursaron** Análisis I y el de los que **aprobaron** su final.',
      '"Cursaron **y** aprobaron": se calculan los dos conjuntos y se **intersecan**. Así lo resolvió el final de 2024.',
      '"Los que **no**…": se calculan **todos** y se les **resta** los que sí.',
      'Un clásico: "proveedores con un **único** artículo". No es stock igual a uno: son todos los que tienen artículos, **menos** los que tienen dos o más, que se encuentran juntando Artículo consigo misma.',
    ]),
  ],

  b6: [
    scene([
      head('SQL: definir (DDL) y actualizar (DML)'),
      box(30, 55, 740, 150, '', { c: 'blue' }),
      txt(50, 80, 'CREATE TABLE Examen (', { anchor: 'start', mono: true, fs: 19, c: 'blue' }),
      txt(70, 108, 'legajo INT NOT NULL, materia INT, nota INT CHECK (nota BETWEEN 0 AND 10),', { anchor: 'start', mono: true, fs: 15 }),
      txt(70, 136, 'PRIMARY KEY (legajo, materia, fecha),', { anchor: 'start', mono: true, fs: 16, c: 'yellow', s: 1 }),
      txt(70, 164, 'FOREIGN KEY (legajo) REFERENCES Alumno(legajo) );', { anchor: 'start', mono: true, fs: 16, c: 'green', s: 1 }),
      txt(50, 240, "UPDATE Alumno SET estado = 'baja'", { anchor: 'start', mono: true, fs: 19, c: 'orange', s: 2 }),
      table(40, 260, 340, ['legajo', 'estado'], [['1', 'baja'], ['2', 'baja'], ['3', 'baja']], { rh: 34, fs: 16, s: 2, hi: [{ r: 0, s: 2, c: 'red' }, { r: 1, s: 2, c: 'red' }, { r: 2, s: 2, c: 'red' }] }),
      box(410, 250, 360, 90, 'Sin WHERE → afecta TODAS las filas', { c: 'red', fs: 20, s: 2 }),
      box(410, 355, 360, 80, 'Según otra tabla: WHERE legajo IN (SELECT …)', { c: 'cyan', fs: 17, s: 3 }),
    ], [
      'El **DDL** define la estructura: CREATE TABLE con tipos, NOT NULL, CHECK…',
      '…y las restricciones: **PRIMARY KEY** y **FOREIGN KEY** que referencia la clave de otra tabla.',
      'El **DML** modifica datos: INSERT, UPDATE y DELETE. Peligro: un UPDATE o un DELETE **sin WHERE** afecta **todas** las filas.',
      'Para actualizar según datos de otra tabla se usa una **subconsulta**: WHERE legajo IN, y adentro el SELECT de los legajos que cumplen.',
    ]),
  ],

  b7: [
    scene([
      head('Orden lógico de una consulta'),
      ...['FROM / JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY'].map((t, i) => box(20 + i * 128, 70, 116, 64, t, { c: (['blue', 'orange', 'purple', 'pink', 'green', 'gray'] as const)[i], fs: 17, s: i, id: 'q' + i })),
      ...[0, 1, 2, 3, 4].map((i) => arr('q' + i, 'q' + (i + 1), { c: 'white', s: i + 1 })),
      txt(78, 165, 'tablas', { fs: 15, c: 'gray', b: true }), txt(206, 165, 'filtra FILAS', { fs: 15, c: 'orange', b: true, s: 1 }),
      txt(334, 165, 'arma grupos', { fs: 15, c: 'purple', b: true, s: 2 }), txt(462, 165, 'filtra GRUPOS', { fs: 15, c: 'pink', b: true, s: 3 }),
      txt(590, 165, 'columnas', { fs: 15, c: 'green', b: true, s: 4 }), txt(718, 165, 'ordena', { fs: 15, c: 'gray', b: true, s: 5 }),
      box(30, 210, 360, 110, 'WHERE nota = 10 (no admite COUNT)', { c: 'orange', fs: 18, s: 6 }),
      box(410, 210, 360, 110, 'HAVING COUNT(*) > 1 (sobre grupos)', { c: 'pink', fs: 18, s: 6 }),
      box(30, 340, 740, 90, "LIKE 'LIB%' · IS NULL (nunca = NULL) · BETWEEN incluye extremos · NOT IN para 'nunca'", { c: 'cyan', fs: 18, s: 7 }),
    ], [
      'Aunque se escribe empezando por SELECT, una consulta se **ejecuta** en otro orden. Primero **FROM** y los JOIN: de qué tablas salen los datos.',
      'Después **WHERE**: filtra **filas**, una por una.',
      '**GROUP BY** arma grupos, por ejemplo por alumno.',
      '**HAVING** filtra **grupos**, después de agrupar.',
      '**SELECT** elige las columnas: con GROUP BY, solo columnas agrupadas o funciones de agregación.',
      'Y **ORDER BY** ordena el resultado.',
      'Por eso: "alumnos con **más de un 10**": WHERE nota igual a 10, agrupás por alumno, y HAVING COUNT mayor que 1. WHERE no puede usar COUNT, porque todavía no hay grupos.',
      'Otros detalles: LIKE con porcentaje; para nulos, **IS NULL**, nunca igual a NULL; BETWEEN incluye los extremos; y para "nunca aprobó", **NOT IN** con una subconsulta.',
    ]),
  ],
};

export { FINAL_SCENES as EX_SCENES } from './bd-final';
