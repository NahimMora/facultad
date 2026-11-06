// Generado por scripts/videos_to_hub.py
import type { VideoItem } from '../types';

export const VIDEOS: VideoItem[] = [
 {
  "id": "ca-1-sistema-usuarios",
  "module": "m4",
  "title": "Final 1 · Rutas, red, usuarios y permisos",
  "src": "videos/ca/ca-1-sistema-usuarios.mp4",
  "poster": "videos/ca/ca-1-sistema-usuarios.jpg",
  "minutes": 1.7,
  "transcript": "Computación Aplicada, preparación del final. El final pregunta rutas, comandos y conceptos de Debian, y en algunas ediciones hay que completar con el texto exacto. Este primer video: rutas, red, usuarios y permisos.\n\nLas rutas que más preguntan. La red: barra etc barra network, con el archivo interfaces y la carpeta interfaces punto d para los agregados. Los DNS: resolv punto conf. El home de root: barra root. Y sudoers, que se edita siempre con visudo.\n\nSSH: acceso remoto cifrado, cliente servidor, por el puerto veintidós. Se autentica con contraseña o con un par de claves: la pública queda en el servidor. Y DNS traduce nombres de dominio a direcciones IP.\n\nTipos de usuario. Root, con UID cero. Los usuarios de sistema o especiales, del uno al novecientos noventa y nueve, que corren servicios y no tienen shell de login. Y los normales, desde mil. Las contraseñas cifradas están en barra etc barra shadow.\n\nPermisos. Dueño, grupo y otros; lectura vale cuatro, escritura dos y ejecución uno. Para agregar lectura a otros en forma simbólica: chmod o más r archivo punto txt.\n\nSoftware y redirecciones. apt usa repositorios y resuelve dependencias; dpkg instala paquetes sueltos. Mayor sobrescribe el archivo. Doble mayor agrega al final. Y dos mayor redirige los errores.\n\nSiguiente video: discos, procesos, arranque y scripting."
 },
 {
  "id": "ca-2-discos-procesos-bash",
  "module": "m7",
  "title": "Final 2 · Discos, procesos, arranque y bash",
  "src": "videos/ca/ca-2-discos-procesos-bash.mp4",
  "poster": "videos/ca/ca-2-discos-procesos-bash.jpg",
  "minutes": 1.8,
  "transcript": "Video dos: discos, procesos, arranque y scripting en bash.\n\nDiscos. El filesystem más usado es ext cuatro. Se particiona con fdisk, se formatea con mkfs punto ext cuatro, se monta con mount, y para que se monte solo al iniciar, va en fstab.\n\nLa estructura de fstab tiene seis campos: dispositivo, normalmente con su UUID; punto de montaje; tipo; opciones; dump; y pass, el orden del chequeo de disco.\n\nHard link contra soft link. El hard link apunta al mismo inodo; el soft link, a la ruta. Si borrás el original, el hard sigue andando y el soft queda roto. Y solo el soft puede cruzar sistemas de archivos.\n\nProcesos. kill con el PID pide terminar ordenadamente; kill menos nueve fuerza. La prioridad va de menos veinte, la más alta, a diecinueve. Para un proceso que ya corre: renice menos n, el valor, menos p, el PID.\n\nLa pregunta que más se sufrió en el final de julio: cambiar el tiempo de espera de GRUB. Se edita GRUB TIMEOUT en barra etc barra default barra grub, y después se corre update grub.\n\nBash. Primera línea, el shebang. Se ejecuta con bash script, o con permiso de ejecución y punto barra. Los parámetros llegan como pesos uno, pesos dos; pesos numeral es la cantidad. El if lleva espacios dentro de los corchetes, then, y se cierra con fi. Y las variables del usuario: HOME, USER y PATH.\n\nResumen: interfaces e interfaces punto d, visudo, chmod o más r, mayor contra doble mayor, ext cuatro y fstab, links, renice y GRUB. Practicá con el banco de preguntas. Éxitos."
 }
];
