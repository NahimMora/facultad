// Generado por scripts/videos_to_hub.py
import type { VideoItem } from '../types';

export const VIDEOS: VideoItem[] = [
 {
  "id": "sd1-1-combinacional",
  "module": "t4",
  "title": "Final 1 · Numeración, Boole y Karnaugh",
  "src": "videos/sd1/sd1-1-combinacional.mp4",
  "poster": "videos/sd1/sd1-1-combinacional.jpg",
  "minutes": 2.3,
  "transcript": "Sistemas Digitales Uno, preparación del final. El final tiene siete ejercicios: expresión con compuertas y tabla de verdad, forma canónica, Karnaugh, sumador restador, multiplexores, un flip flop y un contador. Este video cubre la parte combinacional.\n\nComplementos. Complemento a uno: invertís todos los bits; tiene dos ceros y el carry final se suma al resultado. Complemento a dos: invertís y sumás uno; un solo cero y el carry final se descarta. Con cuatro bits, el rango es de menos ocho a siete.\n\nDe la autoevaluación: en complemento a dos, cien ciento once más cero cero mil ciento uno. El primero es menos veinticinco y el segundo trece: da menos doce.\n\nÁlgebra de Boole. De Morgan: negar un producto es sumar las negaciones. Absorción: A más A negado B es A más B. Y la distributiva rara: A más B C es A más B, por A más C. Lo que no vale: A B más C no es A B más A C.\n\nFormas canónicas. La primera, SOP, es la suma de los minitérminos donde la función vale uno; cada término con todas las variables. Para estandarizar, al término al que le falta una variable lo multiplicás por esa variable más su negada. Ojo con el caso del final: A negada más B negada A más C negada B A es todo menos el siete.\n\nKarnaugh. Filas y columnas en código Gray: cero cero, cero uno, uno uno, uno cero. Agrupás unos en rectángulos de una, dos, cuatro u ocho celdas, lo más grandes posible. Los bordes son vecinos. Y cada grupo de dos a la k celdas elimina k variables.\n\nEl ejercicio del final da nueve minitérminos: dos, tres, cuatro, cinco, seis, siete, doce, trece y quince. D negada B cubre dos, tres, seis y siete. C B negada cubre cuatro, cinco, doce y trece. Y C A agarra el quince. Resultado: tres términos de dos variables.\n\nY en el final piden tres cosas: diagrama inicial con la expresión tal cual, tabla de verdad con columnas parciales, y diagrama final después de simplificar. Siguiente video: circuitos aritméticos y secuenciales."
 },
 {
  "id": "sd1-2-aritmeticos-secuenciales",
  "module": "t6",
  "title": "Final 2 · Sumador/restador, MUX, flip-flops y contadores",
  "src": "videos/sd1/sd1-2-aritmeticos-secuenciales.mp4",
  "poster": "videos/sd1/sd1-2-aritmeticos-secuenciales.jpg",
  "minutes": 2.0,
  "transcript": "Video dos: los ejercicios cuatro a siete del final.\n\nEl sumador restador. Tiene una entrada de control M. Cada bit de B pasa por un XOR con M. Y M entra también como carry de entrada. Con M igual a cero suma. Con M igual a uno, el XOR invierte B y el carry suma uno: es el complemento a dos, y el circuito resta.\n\nTres menos cinco. A es cero cero uno uno, B invertido es uno cero uno cero, más el carry uno. Da uno uno uno cero, que es menos dos. El carry final es cero, y el overflow, que es el XOR de los dos últimos carries, también: no hay desborde.\n\nMultiplexores. Un multiplexor de dieciséis entradas con multiplexores de cuatro: cuatro en el primer nivel, manejados por S uno y S cero, y uno más en el segundo nivel, manejado por S tres y S dos. Cinco en total. La otra versión usa cuatro multiplexores con enable y un decodificador de dos a cuatro.\n\nFlip flops. D: en el flanco, Q copia D. T: con uno cambia, con cero mantiene. JK: cero cero mantiene, uno cero pone uno, cero uno pone cero, y uno uno cambia. Flanco descendente quiere decir que actúa cuando el reloj pasa de uno a cero; entre flancos, Q no se mueve.\n\nContadores con flip flops T. Ascendente: un bit cambia cuando todos los de abajo están en uno. T cero es uno, T uno es Q cero, T dos es Q cero por Q uno. Descendente: cuando todos los de abajo están en cero. Y para que se detenga en cero, multiplicás cada T por Q dos más Q uno más Q cero.\n\nY lo que pide el enunciado: diagrama de estados, tabla de diseño y esquema. Resumen: complemento a dos con carry descartado, Karnaugh en código Gray, XOR con M en el restador, y la regla de los bits de abajo para los contadores. Éxitos."
 }
];
