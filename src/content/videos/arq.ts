// Generado por scripts/videos_to_hub.py
import type { VideoItem } from '../types';

export const VIDEOS: VideoItem[] = [
 {
  "id": "arq-1-datos-memoria",
  "module": "u7",
  "title": "Final 1 · Datos, memorias, caché y memoria virtual",
  "src": "videos/arq/arq-1-datos-memoria.mp4",
  "poster": "videos/arq/arq-1-datos-memoria.jpg",
  "minutes": 2.0,
  "transcript": "Arquitectura de Computadores, preparación del final. El final es un cuestionario donde cada pregunta tiene varios ítems que se responden por escrito. Este primer video cubre la primera mitad: datos y memoria.\n\nLa pregunta uno del final de dos mil veintitrés: el overflow. Con signo, hay overflow seguro cuando dos números del mismo signo dan un resultado de signo opuesto. Nunca hay overflow si los signos son distintos. Sin signo, el desborde lo marca el carry. Y el underflow es un valor tan chico que no se puede representar.\n\nIEEE setecientos cincuenta y cuatro, precisión simple: un bit de signo, ocho de exponente con sesgo ciento veintisiete, y veintitrés de mantisa. Menos seis coma cinco es uno coma uno cero uno por dos a la dos: signo uno, exponente ciento veintinueve. En hexa, C cero D cero cero cero cero cero.\n\nMemorias. La SRAM usa flip flops, es rápida y va en la caché. La DRAM es un capacitor que se descarga, necesita refresco y es la memoria principal. La EPROM se borra con luz ultravioleta, la EEPROM eléctricamente celda por celda, y la flash por bloques.\n\nCaché. Funciona por localidad temporal y espacial. Y tiene tres funciones de correspondencia: directa, donde cada bloque tiene un solo renglón posible; asociativa, en cualquier renglón; y asociativa por conjuntos de N vías, el compromiso.\n\nEscritura. Con write through se escribe en caché y en memoria a la vez. Con write back, solo en caché, y el bloque queda sucio hasta que se lo desaloja.\n\nMemoria virtual: páginas lógicas y marcos físicos, una tabla de páginas, la MMU que traduce y la TLB que guarda las traducciones recientes. Si la página no está en memoria, hay un page fault y se trae del disco, que es mil veces más lento. Siguiente video: CPU y entrada salida."
 },
 {
  "id": "arq-2-cpu-es",
  "module": "t2",
  "title": "Final 2 · Ciclo de instrucción, paralelismo y E/S",
  "src": "videos/arq/arq-2-cpu-es.mp4",
  "poster": "videos/arq/arq-2-cpu-es.jpg",
  "minutes": 1.9,
  "transcript": "Video dos: la segunda mitad. Ciclo de instrucción, paralelismo, buses y entrada salida.\n\nLa pregunta cinco del final recorre el ciclo de instrucción. Búsqueda: se trae la instrucción apuntada por CS dos puntos IP. Y little endian quiere decir que el byte menos significativo va en la dirección más baja. Decodificación: cada instrucción es un microprograma en la memoria de control; cada microtarea lleva un ciclo de reloj, y cada uno o cero es una señal de control. Búsqueda de operandos: puede no hacer falta. Y ejecución, en la ALU, incluso desplazamientos y rotaciones.\n\nPipeline. Con k etapas, n instrucciones tardan k más n menos uno ciclos. Cinco etapas y diez instrucciones: catorce ciclos.\n\nRiesgos y procesadores. Riesgos estructurales, de datos y de control. Superescalar: varias unidades en paralelo, más de una instrucción por ciclo. Flynn: SIMD para las GPU, MIMD para los multinúcleo. Y RISC con control cableado contra CISC microprogramado.\n\nEntrada salida. Sondeo: la CPU pregunta todo el tiempo. Interrupciones: el dispositivo avisa con una IRQ, y la rutina de servicio se encuentra en el vector. La NMI no se puede enmascarar. Y DMA: un controlador transfiere bloques a memoria sin la CPU.\n\nY del ensamblador del ocho mil ochenta y seis: la dirección física es el segmento por dieciséis más el desplazamiento. CS mil hexa e IP veinte hexa dan diez mil veinte hexa.\n\nResumen: overflow por signos, IEEE con sesgo ciento veintisiete, DRAM con refresco, correspondencia de caché, page fault, el ciclo de instrucción y DMA. Respondé cada ítem con su letra, como pide el final. Éxitos."
 }
];
