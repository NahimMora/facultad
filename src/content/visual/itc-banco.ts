import type { VisScene } from '../../vis/types';
import { bits, box, head, scene, table } from './h';

// Resoluciones propias. La exclusión de subred cero y última corresponde
// a la convención clásica del banco; CIDR permite esos bloques.
export const BANK_SCENES: Record<string, VisScene[]> = {
  'itcb-e1': [scene([
    head('2000 subredes · 15 hosts'),
    box(20, 55, 480, 65, '178 → clase B → /16', { fs: 27 }),
    box(20, 140, 480, 80, '10 bits: 1022 útiles ✗\n11 bits: 2046 útiles ✓', { s: 1, c: 'yellow', fs: 25 }),
    bits(20, 255, 480, [{ t: 'Red', n: 16, sub: '16 bits' }, { t: 'Subred', n: 11, sub: '11 bits', c: 'yellow' }, { t: 'Host', n: 5, sub: '5 bits', c: 'green' }], { s: 2, h: 70, fs: 23 }),
    box(20, 360, 480, 75, '/27 = 255.255.255.224', { s: 3, c: 'green', fs: 27 }),
    box(20, 455, 480, 75, '2046 subredes útiles\n30 hosts por subred', { s: 4, c: 'cyan', fs: 26 }),
  ], [
    'Arrancá por el primer octeto: 178 pertenece a clase B. Su máscara natural es barra 16. Eso deja otros dieciséis bits para repartir entre subred y host. Todavía no elijas una máscara: primero comprobá las dos necesidades del ejercicio.',
    'El banco usa la convención clásica: subredes útiles igual a dos elevado a los bits prestados, menos dos. Con diez bits conseguís 1022, que no alcanzan para 2000. Con once conseguís 2046. Elegí once. En CIDR moderno no se excluyen la subred cero y la última; acá seguimos la convención pedida.',
    'Ahora mirá el reparto completo: dieciséis bits originales de red, once de subred y cinco de host. Suman treinta y dos. Con cinco bits tenés treinta y dos direcciones por bloque. Restá la dirección de red y la de broadcast: quedan treinta hosts, suficientes para los quince pedidos.',
    'Sumá los bits de red y subred: dieciséis más once da veintisiete. La máscara adaptada es barra 27. Los tres primeros octetos son 255; el último tiene tres unos seguidos de cinco ceros, que dan 224. Queda 255.255.255.224.',
    'Comprobá ambos requisitos por separado: 2046 subredes útiles supera 2000 y treinta hosts por subred supera quince. No confundas 2048 subredes totales con 2046 útiles según esta convención; tampoco treinta y dos direcciones con treinta hosts asignables. Esa distinción explica todos los conteos.',
  ], 520, 555)],
  'itcb-e2': [scene([
    head('172.50.0.0 · bloques de 32'),
    box(20, 55, 480, 70, '28 hosts → 5 bits → /27', { fs: 26 }),
    table(20, 150, 480, ['Útil', 'Red', 'Broadcast'], [['1ª', '0.32', '0.63'], ['3ª', '0.96', '0.127'], ['5ª', '0.160', '0.191'], ['8ª', '1.0', '1.31'], ['9ª', '1.32', '1.63']], { fs: 24, rh: 48, rs: [1, 2, 3, 4, 4], cw: [0.7, 1, 1.1] }),
    box(20, 465, 480, 75, '5ª: hosts .161 a .190\nPrefijo común: 172.50.', { s: 5, fs: 25, c: 'green' }),
  ], [
    'Para veintiocho hosts necesitás cinco bits: dos a la quinta menos dos da treinta. Entonces la máscara es barra 27, con salto de treinta y dos en el cuarto octeto. La red original es clase B: tomaste once bits de subred de los dieciséis que estaban disponibles.',
    'Usando la convención clásica del banco, excluí el primer bloque, de cero a treinta y uno. La primera subred útil empieza en 172.50.0.32 y termina en 172.50.0.63. Ese último valor es el broadcast; los hosts van de treinta y tres a sesenta y dos.',
    'Seguí sumando treinta y dos al comienzo de cada bloque. La segunda red es punto sesenta y cuatro y la tercera punto noventa y seis. Para el broadcast de la tercera, tomá la siguiente red, punto ciento veintiocho, y restá uno: punto ciento veintisiete.',
    'La quinta subred útil empieza en punto ciento sesenta. Su bloque llega hasta punto ciento noventa y uno. No uses los extremos como hosts: el primero identifica la subred y el último es broadcast. Esta misma cuenta sirve para cualquier bloque del mismo tamaño.',
    'Prestá atención al cambio de octeto: después de 172.50.0.224, el siguiente comienzo es 172.50.1.0. Ese es el octavo bloque útil, porque excluimos solo el bloque cero de la red original. El noveno empieza en 172.50.1.32 y termina en 172.50.1.63. No vuelvas a excluir cada punto cero.',
    'Volvé a la quinta: red 172.50.0.160, broadcast 172.50.0.191. El primer host es red más uno y el último es broadcast menos uno: de 172.50.0.161 a 172.50.0.190. Contalos: ciento noventa menos ciento sesenta y uno más uno da treinta hosts.',
  ], 520, 565)],
  'itcb-e3': [scene([
    head('45 hosts · detectá el límite'),
    box(20, 55, 480, 70, '220 → clase C → /24', { fs: 26 }),
    box(20, 145, 480, 75, '6 bits host: 62 útiles\n2 bits subred: /26', { s: 1, fs: 25, c: 'yellow' }),
    table(20, 250, 480, ['Bloque', 'Convención clásica'], [['.0–.63', 'excluido'], ['.64–.127', '1ª útil'], ['.128–.191', '2ª útil'], ['.192–.255', 'excluido']], { fs: 24, rh: 46, s: 2 }),
    box(20, 500, 480, 80, '4ª, 11ª y 12ª útiles:\nNO EXISTEN', { s: 3, fs: 27, c: 'red' }),
  ], [
    'Antes de armar una tabla larguísima, mirá la capacidad de la red. El primer octeto es 220, clase C, máscara natural barra 24. Solo quedan ocho bits para repartir entre subred y host. No podés hacer aparecer subredes afuera de esa red original.',
    'Para cuarenta y cinco hosts, cinco bits no alcanzan porque dan treinta hosts útiles. Necesitás seis, que dan sesenta y dos. De los ocho disponibles, quedan dos para subred. La máscara es barra 26, o 255.255.255.192, y el salto es sesenta y cuatro.',
    'Los únicos cuatro bloques son de cero a sesenta y tres, de sesenta y cuatro a ciento veintisiete, de ciento veintiocho a ciento noventa y uno y de ciento noventa y dos a doscientos cincuenta y cinco. Con la convención clásica del banco, el primero y el último se excluyen: solo quedan dos útiles.',
    'Si te piden la cuarta, undécima o duodécima subred útil, respondé que no existen y justificá con dos a la segunda menos dos igual a dos. No inventes rangos. Incluso en CIDR moderno, que admite los cuatro bloques, nunca aparecerían una undécima ni una duodécima dentro de este barra 24.',
  ], 520, 605)],
  'itcb-e4': [scene([
    head('CIDR · cubrir solo las 13 redes'),
    box(20, 55, 480, 75, '10.2.4.0/24 a 10.2.16.0/24', { fs: 24 }),
    box(20, 150, 480, 90, '/19 cubriría 0 a 31\nIncluye redes ajenas', { s: 1, fs: 27, c: 'red' }),
    table(20, 270, 480, ['3er octeto', 'Ruta exacta'], [['4–7', '10.2.4.0/22'], ['8–15', '10.2.8.0/21'], ['16', '10.2.16.0/24']], { fs: 25, rh: 60, rs: [2, 3, 4], cw: [1, 1.7] }),
    box(20, 540, 480, 65, '4 + 8 + 1 = 13 redes /24', { s: 5, fs: 26, c: 'green' }),
  ], [
    'Queremos anunciar trece redes consecutivas, desde 10.2.4.0 hasta 10.2.16.0, todas barra 24. La pregunta clave es si la sumarización debe ser exacta. Para no anunciar redes ajenas, buscá bloques alineados de tamaño potencia de dos, que cubran únicamente el intervalo pedido.',
    'Compará cuatro y dieciséis en binario: cero cero cero cero cero uno cero cero frente a cero cero cero uno cero cero cero cero. Solo comparten los tres primeros bits de ese octeto. Un único prefijo sería barra 19 y cubriría del cero al treinta y uno: incluye redes de más.',
    'Empezá en cuatro. Podés agrupar cuatro redes: cuatro, cinco, seis y siete. En binario comparten cero cero cero cero cero uno y varían dos bits. Sumá los dieciséis bits de los dos primeros octetos y esos seis: barra 22. La ruta es 10.2.4.0 barra 22.',
    'El siguiente comienzo es ocho. Está alineado a un bloque de ocho redes y llega hasta quince. En el tercer octeto comparten cinco bits: cero cero cero cero uno. El prefijo es dieciséis más cinco, barra 21. Anunciá 10.2.8.0 barra 21.',
    'Queda la red dieciséis sola. Si la agrupás con diecisiete, ya estarías anunciando una red ajena al pedido. Por eso conservás 10.2.16.0 barra 24. No hay obligación de usar una sola ruta cuando la cobertura exacta necesita varias.',
    'Verificá: cuatro redes en el primer bloque, ocho en el segundo y una en el tercero suman trece. No hay huecos ni superposiciones. El resumen exacto usa tres rutas. El barra 19 solo sería aceptable si el problema autorizara explícitamente incluir todas las redes adicionales.',
  ], 520, 630)],
  'itcb-e5': [scene([
    head('VLSM · de mayor a menor'),
    box(20, 55, 480, 65, '80 → 20 → 20 → 2 → 2 → 2', { fs: 25 }),
    table(20, 150, 480, ['Grupo', 'Bloque', 'Hosts'], [['80', '.0/25', '.1–.126'], ['20', '.128/27', '.129–.158'], ['20', '.160/27', '.161–.190'], ['2', '.192/30', '.193–.194'], ['2', '.196/30', '.197–.198'], ['2', '.200/30', '.201–.202']], { fs: 23, rh: 53, rs: [1, 2, 3, 4, 4, 4], cw: [0.6, 1.1, 1.3] }),
    box(20, 550, 480, 80, 'Prefijo: 192.168.0.\nLibre desde .204 hasta .255', { s: 5, c: 'green', fs: 25 }),
  ], [
    'Ordená los pedidos antes de asignar direcciones: ochenta, veinte, veinte y tres enlaces de dos hosts. Trabajamos dentro de 192.168.0.0 barra 24. VLSM permite usar una máscara distinta por grupo: así evitás reservar un bloque enorme para cada enlace pequeño.',
    'Ochenta hosts necesitan siete bits, porque seis dan solo sesenta y dos. Siete dan ciento veintiséis hosts útiles. Reservá un barra 25, desde punto cero hasta punto ciento veintisiete. Los hosts van de punto uno a punto ciento veintiséis; punto ciento veintisiete es broadcast.',
    'El primer grupo de veinte necesita cinco bits de host: treinta útiles. Su bloque es barra 27, de treinta y dos direcciones. El siguiente comienzo libre es ciento veintiocho, que está alineado a treinta y dos. Hosts desde ciento veintinueve hasta ciento cincuenta y ocho; broadcast ciento cincuenta y nueve.',
    'El otro grupo de veinte recibe otro barra 27. Arrancá en ciento sesenta y terminá en ciento noventa y uno. Los hosts son ciento sesenta y uno a ciento noventa. Fijate que el bloque empieza exactamente después del anterior y tiene el mismo tamaño: no se pisan.',
    'Cada enlace de dos hosts usa un barra 30 en este ejercicio: cuatro direcciones, dos asignables. Reservá comienzos ciento noventa y dos, ciento noventa y seis y doscientos. Sus broadcasts son ciento noventa y cinco, ciento noventa y nueve y doscientos tres. Los pares de hosts están en la tabla.',
    'Sumá tamaños: ciento veintiocho más treinta y dos más treinta y dos más tres por cuatro da doscientas cuatro direcciones reservadas. Quedan cincuenta y dos, desde punto doscientos cuatro hasta punto doscientos cincuenta y cinco. Todos los comienzos están alineados al tamaño de su bloque y ninguno invade al siguiente.',
  ], 520, 655)],
};
