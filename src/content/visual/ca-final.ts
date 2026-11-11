import type { Question, WorkedExercise } from '../types';
import type { VisScene } from '../../vis/types';
import { arr, box, head, scene, seq, stack, table, txt } from './h';

interface Case {
  module: string; title: string; prompt: string; options: string[]; answer: number;
  labels: [string, string, string]; say: [string, string, string];
  visual?: VisScene[];
}
const flow = (c: Case): VisScene[] => [scene([
  head(c.title), ...c.labels.map((t, s) => box(20, 65 + s * 145, 480, 90, t, { s, fs: 27, c: (['blue', 'yellow', 'green'] as const)[s] })),
  arr([260, 155], [260, 204], { s: 1 }), arr([260, 300], [260, 349], { s: 2 }),
], c.say, 520, 480)];

// Se conservan únicamente los 22 temas recordados en el final anterior.
const cases: Case[] = [
  { module: 'm8', title: '1 · Prioridad de un proceso', prompt: 'Un proceso ya existe y querés cambiar su valor nice. ¿Qué comando corresponde?', options: ['renice', 'chmod', 'mkdir'], answer: 0,
    labels: ['Proceso existente identificado por PID', 'renice -n VALOR -p PID', 'Nice mayor → menos prioridad relativa'], say: [
      'Identificá primero si el proceso ya está en ejecución. Nice se usa al lanzar un comando con un ajuste de prioridad; renice permite modificar el valor de procesos que ya existen.',
      'En la forma mostrada, VALOR representa el nice solicitado y PID identifica el proceso. Son marcadores de la sintaxis, no datos de un examen. El cambio puede requerir permisos según la dirección del ajuste.',
      'Un nice numéricamente mayor representa menor prioridad relativa de planificación. No confundas prioridad con tiempo de ejecución garantizado ni con terminar el proceso. Cambiar permisos del archivo mediante chmod es otra operación.',
    ] },
  { module: 'm4', title: '2 · Acceso remoto con SSH', prompt: '¿Qué describe el funcionamiento básico de SSH?', options: ['Asignación automática de direcciones IP', 'Conexión cliente-servidor con autenticación y canal cifrado', 'Acceso remoto sin proteger el transporte'], answer: 1,
    labels: ['Cliente contacta al servidor', 'Negociación y autenticación', 'Canal remoto protegido'], say: [
      'El cliente contacta un servidor SSH y verifica su identidad mediante la información de clave del servidor. El servicio permite acceso remoto y otros usos sobre un transporte protegido.',
      'Durante el establecimiento se acuerdan mecanismos criptográficos y se autentica al usuario, por ejemplo mediante claves. La identidad del servidor y la del usuario son verificaciones relacionadas, pero distintas.',
      'Una vez establecido el canal, pueden intercambiarse órdenes y datos cifrados. DNS resuelve nombres y DHCP asigna configuración de red: ninguno reemplaza la función de autenticación y transporte protegido de SSH.',
    ] },
  { module: 'm5', title: '3 · Editar sudoers', prompt: '¿Qué herramienta conviene usar para editar las reglas de sudoers y comprobar su sintaxis?', options: ['echo sin validación', 'kill', 'visudo'], answer: 2,
    labels: ['Reglas de autorización de sudo', 'visudo: edición coordinada', 'Comprobar sintaxis antes de instalar'], say: [
      'Sudoers define autorizaciones para ejecutar comandos bajo otras identidades. Un error de configuración puede impedir el uso esperado de sudo, por lo que importa validar la edición y comprender la regla.',
      'Visudo coordina la edición y comprueba aspectos de validez y sintaxis. No es un editor visual específico: puede utilizar el editor configurado y agregar controles sobre el archivo que se está modificando.',
      'Usá esa herramienta para revisar los cambios y atender los errores que indique. Una comprobación sintáctica correcta no demuestra por sí sola que hayas otorgado exactamente los permisos que querías: también revisá el alcance de las reglas.',
    ] },
  { module: 'm5', title: '4 · Clases de usuarios', prompt: '¿Qué clasificación distingue una cuenta administrativa, una cuenta para servicios y una cuenta personal?', options: ['Root, cuentas de sistema y usuarios normales', 'Solo usuarios con interfaz gráfica', 'Únicamente cuentas con contraseña visible'], answer: 0,
    labels: ['Root: UID 0', 'Sistema: identidad de servicios', 'Normal: cuenta de una persona'], say: [
      'Root es la cuenta asociada al identificador cero y a privilegios administrativos amplios. El nombre y el identificador no deben confundirse: en los controles del sistema importa la identidad numérica.',
      'Las cuentas de sistema permiten que servicios tengan una identidad propia. Los rangos utilizados para crearlas dependen de la distribución y su configuración; no conviene tratar un rango de una instalación como una ley universal.',
      'Las cuentas normales se utilizan para el trabajo de personas con permisos asignados. Distinguir estos roles ayuda a interpretar propietarios, procesos y autorizaciones. Una cuenta normal puede recibir permisos administrativos mediante mecanismos configurados, sin convertirse por eso en la cuenta root.',
    ] },
  { module: 'm5', title: '5 · Cuentas especiales de servicio', prompt: '¿Para qué sirve una cuenta asociada a un servicio del sistema?', options: ['Para que todas las personas compartan root', 'Para dar identidad y permisos propios al proceso del servicio', 'Para eliminar los controles de acceso'], answer: 1,
    labels: ['Servicio con una función', 'Cuenta propia y permisos necesarios', 'Separación de responsabilidades'], say: [
      'Una cuenta de servicio permite identificar bajo qué usuario se ejecuta una tarea del sistema. No representa necesariamente a una persona que se conecta y trabaja en una sesión interactiva.',
      'Los archivos y procesos pueden asociarse a esa identidad y recibir los permisos que necesitan. Según la configuración, la cuenta puede tener restringido el inicio de sesión; no supongas una misma política para todas.',
      'La separación reduce la necesidad de ejecutar todos los servicios con una identidad privilegiada compartida. El punto del concepto es distinguir funciones e identidades, no afirmar que una cuenta de servicio carece de permisos o de archivos propios.',
    ] },
  { module: 'm7', title: '6 · Reconocer ext4', prompt: '¿Cuál es un sistema de archivos tratado en la materia para particiones Linux?', options: ['SSH', 'DNS', 'ext4'], answer: 2,
    labels: ['Dispositivo o partición', 'ext4: organización del sistema de archivos', 'Archivos y directorios accesibles al montar'], say: [
      'Ext4 es un sistema de archivos que organiza datos y metadatos en un dispositivo. No es un protocolo de acceso remoto ni un servicio de resolución de nombres de la red.',
      'El sistema de archivos define estructuras para conservar y localizar archivos. El mecanismo de registro ayuda en la recuperación de consistencia, pero no equivale a tener una copia de respaldo de todo el contenido.',
      'Para acceder al contenido dentro del árbol de directorios, el sistema de archivos se monta en un punto de montaje. Identificá ext4 como el ejemplo del curso, sin convertir una afirmación de uso frecuente en una medición universal actual.',
    ] },
  { module: 'm7', title: '7 · Campos de fstab', prompt: '¿Qué describe una entrada de /etc/fstab?', options: ['Dispositivo, montaje, tipo, opciones y campos de respaldo/comprobación', 'Solo usuario y contraseña', 'Únicamente la dirección de un DNS'], answer: 0,
    labels: ['Dispositivo y punto de montaje', 'Tipo y opciones', 'dump y pass: campos finales'], say: [
      'Una entrada de fstab vincula un dispositivo, que puede identificarse mediante UUID, con un punto del árbol de directorios. Son los primeros dos campos y no representan lo mismo: origen y ubicación de montaje.',
      'Los campos siguientes indican el tipo de sistema de archivos y sus opciones. La entrada describe cómo debe tratarse ese montaje; no crea por sí sola la partición ni el contenido del sistema de archivos.',
      'Los últimos campos corresponden a dump y a la comprobación con fsck. Para responder, enumerá los seis en su orden y explicá su función. No mezcles el archivo de montaje con archivos de cuentas o de configuración de DNS.',
    ] },
  { module: 'm10', title: '8 · Condición en Bash', prompt: 'En Bash, ¿qué estructura ejecuta una rama según el estado de salida de una condición?', options: ['for ... done exclusivamente', 'if ...; then ...; else ...; fi', 'case sin cierre ni patrón'], answer: 1,
    labels: ['Ejecutar el comando condición', 'Estado 0 → rama then', 'Otro estado → else, si existe'], say: [
      'If evalúa el estado de salida del comando usado como condición. En la convención del shell, cero significa éxito. No confundas esta regla con interpretar un número distinto de cero como verdadero en otros lenguajes.',
      'Si la condición termina con éxito, se ejecuta la rama then. Los corchetes que suelen verse son un comando de prueba y tienen su propia sintaxis; no son una decoración obligatoria de todas las condiciones.',
      'Una rama else permite tratar el otro caso y fi cierra la estructura. Prestá atención a separadores y espacios cuando leas un script. La decisión depende del estado del comando, no de que haya mostrado texto en pantalla.',
    ] },
  { module: 'm10', title: '9 · Ejecutar un script', prompt: 'Tenés un archivo de texto legible con instrucciones Bash. ¿Qué forma invoca explícitamente el intérprete para ejecutarlo?', options: ['chmod script.sh', 'cat script.sh', 'bash script.sh'], answer: 2,
    labels: ['Archivo script.sh legible', 'bash script.sh', 'Bash interpreta sus instrucciones'], say: [
      'Un script contiene instrucciones que debe interpretar un shell. Con bash script punto ese hache, estás indicando explícitamente qué programa va a leer y ejecutar ese archivo de texto.',
      'En esta forma, el archivo debe ser accesible para lectura; no es lo mismo que ejecutarlo directamente con punto barra. La ejecución directa requiere permisos y una selección apropiada del intérprete, normalmente mediante shebang.',
      'Cat muestra el contenido y chmod cambia permisos: ninguno sustituye esta invocación del intérprete. Para contestar, distinguí el archivo, el programa que lo interpreta y la forma en que lo estás llamando.',
    ] },
  { module: 'm10', title: '10 · Parámetros posicionales', prompt: 'Un script recibe dos argumentos. ¿Qué variable permite consultar el primero y cuál cuenta cuántos recibió?', options: ['$1 y $#', '$0 y $HOME', '$? y $PATH'], answer: 0,
    labels: ['bash script.sh UNO DOS', '$1 → UNO · $2 → DOS', '$# → cantidad · "$@" → argumentos'], say: [
      'Los argumentos escritos después del nombre del script se reciben como parámetros posicionales. El ejemplo usa dos palabras ilustrativas, uno y dos; no son datos de un enunciado ni identificadores reales de archivos.',
      'El primer argumento es dólar uno y el segundo dólar dos. Dólar cero identifica la invocación del script, no el primer argumento recibido. Mantener esa diferencia evita desplazar todas las posiciones al leer los datos.',
      'Dólar numeral informa la cantidad y dólar arroba entre comillas conserva cada argumento como una palabra separada. Las comillas importan cuando un argumento contiene espacios; expandir todo sin comillas puede alterar cómo se divide el contenido.',
    ] },
  { module: 'm1', title: '11 · Máquina virtual', prompt: '¿Qué caracteriza a una máquina virtual de sistema?', options: ['Es solo un acceso directo a una carpeta', 'Dispone de hardware virtual para ejecutar un sistema invitado', 'Siempre reemplaza físicamente la memoria del equipo'], answer: 1,
    labels: ['Recursos físicos del equipo', 'Capa de virtualización', 'Sistema operativo invitado'], say: [
      'Una máquina virtual presenta recursos de cómputo virtuales sobre los que puede ejecutarse un sistema operativo invitado. El entorno abstrae recursos del equipo físico; no es solamente una carpeta o una copia de un archivo.',
      'El hipervisor administra la virtualización y la asignación de recursos. Hay distintas arquitecturas de virtualización, por lo que no debés asumir que todas requieren la misma combinación de sistema anfitrión e hipervisor.',
      'El invitado utiliza sus recursos virtuales para ejecutar aplicaciones. La separación lógica es útil, pero no elimina límites de memoria, procesamiento o almacenamiento del equipo. Distinguí máquina virtual de una instalación directa y de un contenedor.',
    ] },
];

cases.push(
  { module: 'm6', title: '12 · Agregar un permiso', prompt: 'Querés sumar permiso de lectura a otros, conservando los demás bits. ¿Qué forma simbólica corresponde?', options: ['chmod o+r archivo.txt', 'chmod o-r archivo.txt', 'chmod u+x archivo.txt'], answer: 0,
    labels: ['o: clase otros', '+r: agregar lectura', 'Los demás bits se conservan'], say: [
      'En la notación simbólica, u representa al propietario, ge al grupo y o a otros. Primero identificá a qué clase de permisos querés aplicar el cambio para no afectar al destinatario equivocado.',
      'El signo más agrega y la letra erre indica lectura. Por eso o más erre expresa agregar lectura a otros. No hace falta conocer el modo inicial completo para describir ese cambio puntual.',
      'La operación conserva los demás bits: no concede escritura ni ejecución a otros y no modifica los permisos de propietario y grupo. Un signo menos quitaría el permiso, y u más equis actuaría sobre otra clase y otra capacidad.',
    ] },
  { module: 'm3', title: '13 · Reemplazar o anexar salida', prompt: '¿Qué diferencia hay entre redirigir con > y con >> hacia un archivo existente?', options: ['Ambos siempre conservan el contenido anterior', '> reemplaza el contenido; >> anexa al final', '>> siempre borra el archivo'], answer: 1,
    labels: ['Salida estándar del comando', '> archivo: truncar y escribir', '>> archivo: agregar al final'], say: [
      'La redirección decide adónde se envía la salida estándar. Es una operación del shell y puede afectar el archivo de destino antes de que el comando produzca su salida. Separala de lo que hace el programa.',
      'El símbolo mayor abre el destino para escribir y, si corresponde a un archivo existente, lo trunca en el comportamiento usual. La salida nueva sustituye el contenido anterior, salvo condiciones de configuración que impidan esa operación.',
      'Dos símbolos mayor abren en modo de anexado: lo nuevo se agrega al final. Ambos pueden crear un destino que no existía si hay permisos. La diferencia central de la pregunta es reemplazar frente a conservar y agregar.',
    ] },
  { module: 'm3', title: '14 · Paquetes en Debian', prompt: 'En un sistema Debian, ¿qué herramienta de alto nivel permite instalar paquetes desde repositorios y resolver dependencias?', options: ['chmod', 'renice', 'apt'], answer: 2,
    labels: ['Repositorios y catálogo de paquetes', 'apt update actualiza los índices', 'apt install solicita instalar y resolver'], say: [
      'En Debian, apt trabaja con paquetes y repositorios configurados. La pregunta fija esa distribución: no supongas que todos los sistemas Linux utilizan el mismo gestor ni los mismos nombres de comandos.',
      'Apt update actualiza los índices de paquetes disponibles. Eso renueva información del catálogo; no significa que todos los paquetes instalados se hayan actualizado automáticamente a nuevas versiones durante esa misma operación.',
      'Apt install solicita la instalación y permite resolver dependencias según el estado y los repositorios. Dpkg es una herramienta de nivel inferior para paquetes Debian, y no reemplaza por sí sola todo el trabajo de resolución desde repositorios.',
    ] },
  { module: 'm4', title: '15 · Servicio DNS', prompt: '¿Qué función cumple DNS al consultar un nombre de dominio para contactar un servidor?', options: ['Permite obtener registros, como las direcciones asociadas al nombre', 'Asigna obligatoriamente la IP local por DHCP', 'Cifra por sí solo la sesión remota'], answer: 0,
    labels: ['Nombre consultado', 'Resolución mediante DNS', 'Registros asociados, por ejemplo A/AAAA'], say: [
      'DNS organiza nombres de dominio y registros asociados. Una consulta frecuente busca direcciones para un nombre, pero el servicio también maneja otros tipos de registros y no se limita a una tabla plana de nombres e IP.',
      'El cliente consulta a un resolvedor, que puede responder usando información disponible o conseguir la respuesta mediante otras consultas. La aplicación utiliza el resultado según el tipo de registro que necesitaba para continuar su tarea.',
      'Asignar la configuración de red de un equipo corresponde a otras funciones, como DHCP. Proteger una sesión remota es una función de protocolos como SSH. Reconocer estas diferencias evita elegir un servicio solo porque todos participan de una comunicación de red.',
    ] },
  { module: 'm9', title: '16 · Tiempo del menú GRUB', prompt: 'En el esquema de configuración de GRUB usado en Debian, ¿qué ajuste participa del tiempo de espera del menú?', options: ['/etc/passwd como temporizador', 'GRUB_TIMEOUT en /etc/default/grub, seguido de regenerar la configuración', 'chmod o+r como opción de arranque'], answer: 1,
    labels: ['/etc/default/grub', 'GRUB_TIMEOUT y estilo del menú', 'Regenerar configuración: update-grub'], say: [
      'En este esquema, el archivo de configuración para el generador incluye la variable ge rub timeout. El valor expresa un ajuste del tiempo de espera, cuyo comportamiento también se relaciona con el estilo del menú.',
      'No confundas ese archivo de entrada con el archivo generado que GRUB utiliza para arrancar. Modificar el generado directamente puede perderse cuando otra operación regenere la configuración del cargador de arranque.',
      'En Debian, update grub ejecuta la regeneración correspondiente. El ejemplo explica el procedimiento sin elegir un tiempo que el enunciado no da. Para comprobar el resultado, revisá tanto el valor como el comportamiento del menú configurado.',
    ] },
  { module: 'm10', title: '17 · Variables del entorno', prompt: '¿Qué expansión permite consultar el directorio personal indicado por el entorno del usuario?', options: ['$?', '$#', '$HOME'], answer: 2,
    labels: ['HOME: directorio personal', 'USER: nombre de usuario del entorno', 'PATH: búsqueda de comandos'], say: [
      'Las variables del entorno se consultan mediante expansión del shell. Home suele indicar el directorio personal de la cuenta. El nombre de una variable y el contenido que tiene en una sesión son cosas diferentes.',
      'User suele contener el nombre del usuario y path indica una lista de directorios para buscar comandos. No necesitás inventar los valores concretos de una computadora para explicar para qué sirve cada variable.',
      'Entre comillas dobles, una expansión como dólar home mantiene su contenido como una palabra. Dólar interrogación informa un estado de salida y dólar numeral cuenta argumentos: no son variables para localizar el directorio personal.',
    ] },
  { module: 'm7', title: '18 · Crear un sistema de archivos', prompt: '¿Qué operación crea estructuras de un sistema de archivos ext4 sobre una partición elegida?', options: ['mkfs.ext4 sobre el dispositivo correspondiente', 'mount como sustituto del formato', 'ln -s como creador de particiones'], answer: 0,
    labels: ['Partición correctamente identificada', 'mkfs.ext4 /dev/PARTICION', 'Sistema de archivos nuevo → montar'], say: [
      'Distingí particionar de crear un sistema de archivos. La partición es una región del dispositivo; mkfs establece estructuras para organizar los archivos dentro de la región que se eligió.',
      'La sintaxis muestra una ruta de dispositivo como marcador, no una partición real seleccionada para ejecutar. Formatear puede destruir el contenido previo, por lo que la identificación del destino forma parte del significado práctico de la operación.',
      'Después se puede montar ese sistema de archivos para acceder a él dentro del árbol de directorios. Mount no equivale a formatear, y crear un enlace simbólico tampoco crea particiones ni inicializa sus estructuras internas.',
    ] },
  { module: 'm7', title: '19 · Hard link y enlace simbólico', prompt: '¿Qué diferencia fundamental hay entre un enlace duro a un archivo y un enlace simbólico?', options: ['Los dos son siempre copias independientes de los datos', 'El duro referencia el mismo inodo; el simbólico conserva una ruta al destino', 'El simbólico comparte obligatoriamente el inodo del destino'], answer: 1,
    labels: ['Dos nombres → mismo inodo', 'Enlace simbólico → ruta del destino', 'La ruta puede dejar de resolver'], say: [
      'Un enlace duro agrega otro nombre para el mismo archivo dentro de las condiciones permitidas por el sistema de archivos. Los nombres se relacionan con el mismo inodo; no se crean dos copias independientes del contenido.',
      'Un enlace simbólico es un objeto distinto cuyo contenido referencia una ruta. Al seguirlo, el sistema intenta resolver esa ruta, que puede apuntar a un archivo o directorio y puede incluso no existir.',
      'Si la ruta deja de resolver, el enlace simbólico puede quedar colgando. Un enlace duro al mismo archivo no depende de que se conserve otro nombre concreto para acceder a los datos. Esa diferencia explica muchos resultados al mover o quitar nombres.',
    ] },
  { module: 'm8', title: '20 · Enviar una señal con kill', prompt: '¿Qué hace kill PID sin indicar una señal diferente?', options: ['Cambia nice', 'Siempre envía SIGKILL', 'Envía SIGTERM, que solicita terminar'], answer: 2,
    labels: ['Proceso identificado por PID', 'kill PID → SIGTERM', 'El proceso puede tratar la señal'], say: [
      'Kill envía una señal a un destino identificado, por ejemplo, mediante un PID. El nombre del comando no significa que cualquier señal provoque siempre una terminación inmediata: distintas señales tienen distintos significados.',
      'Sin indicar otra señal, se solicita sigterm. Esa señal puede ser tratada por el proceso para finalizar de manera ordenada, aunque el programa también puede bloquearla o ignorarla según su comportamiento.',
      'Sigkill es diferente: no puede ser capturada ni ignorada por el proceso. Distinguí una solicitud de terminación de una terminación forzada, y no confundas el envío de señales con cambiar prioridades o permisos de archivos.',
    ] },
  { module: 'm10', title: '21 · Configuración global de login', prompt: 'Para el inicio de una sesión Bash de login, ¿qué archivo participa de la configuración global antes de los archivos personales?', options: ['/etc/profile', 'Únicamente ~/.bashrc en cualquier contexto', '/etc/fstab como script de login'], answer: 0,
    labels: ['Bash iniciado como shell de login', '/etc/profile: configuración global', 'Después: archivos personales según reglas'], say: [
      'El archivo que se lee depende de cómo se inicia Bash. La pregunta especifica una sesión de login, porque no todas las sesiones interactivas o no interactivas siguen exactamente la misma secuencia de archivos de inicio.',
      'En el contexto de login, barra etc barra profile participa de la configuración global. Los archivos personales tienen sus propias reglas y prioridades. No es correcto tratar bashrc y profile como archivos intercambiables para cualquier situación.',
      'Fstab describe montajes y no reemplaza la configuración de inicio del shell. Para explicar una variable que aparece al ingresar, identificá primero el tipo de sesión y después el archivo global o personal que corresponde a ese contexto.',
    ] },
  { module: 'm10', title: '22 · Mostrar una expansión', prompt: 'En un script Bash, ¿qué forma muestra el contenido de una variable conservándolo como un argumento?', options: ['chmod VARIABLE', 'echo "$VARIABLE"', 'kill VARIABLE'], answer: 1,
    labels: ['Variable con contenido', 'Expansión dentro de comillas dobles', 'echo recibe un argumento y lo muestra'], say: [
      'Echo permite mostrar argumentos en la salida estándar. Si querés mostrar el contenido de una variable, primero ocurre la expansión del shell y luego el comando recibe el resultado de esa expansión.',
      'Las comillas dobles permiten expandir la variable y conservar el resultado como un argumento. Así evitás que espacios del contenido produzcan una separación de palabras no deseada al preparar la llamada al comando.',
      'El ejemplo usa un nombre de variable genérico, sin suponer un valor real del entorno. Para formatos más controlados se utiliza printf. Cambiar permisos y enviar señales son tareas diferentes de producir una salida de texto.',
    ] },
);

cases[1].visual = [scene([head(cases[1].title), seq(15, 70, 490, 350, [{ t: 'Cliente', c: 'blue' }, { t: 'Servidor', c: 'green' }], [
  { a: 0, b: 1, t: 'Iniciar conexión', s: 0 }, { a: 1, b: 0, t: 'Identidad y negociación', s: 1 }, { a: 0, b: 1, t: 'Autenticación y canal', s: 2 },
], { fs: 25, partFs: 24 })], cases[1].say, 520, 460)];
cases[6].visual = [scene([head(cases[6].title), table(20, 70, 480, ['Campo', 'Función'], [
  ['1 · dispositivo', 'Dispositivo o UUID'], ['2 · montaje', 'Punto del árbol'], ['3 · tipo', 'Sistema de archivos'], ['4 · opciones', 'Opciones de montaje'], ['5 · dump', 'Campo de respaldo'], ['6 · pass', 'Orden fsck'],
], { fs: 24, rh: 65, cw: [1.3, 1.7], rs: [0, 0, 1, 1, 2, 2] })], cases[6].say, 520, 555)];
cases[10].visual = [scene([head(cases[10].title), stack(25, 65, 470, 350, [
  { t: 'Invitado: SO y aplicaciones', c: 'green', s: 2 }, { t: 'Virtualización: hipervisor', c: 'orange', s: 1 }, { t: 'Hardware físico', c: 'blue' },
], { fs: 26 })], cases[10].say, 520, 450)];

cases[3].visual = [scene([head(cases[3].title), table(20, 70, 480, ['Clase', 'Función'], [['Root · UID 0', 'Administración'], ['Sistema', 'Servicios'], ['Normal', 'Trabajo personal']], { fs: 25, rh: 100, rs: [0, 1, 2], cw: [1.2, 1.6] })], cases[3].say, 520, 510)];
cases[7].visual = [scene([
  head(cases[7].title), box(220, 65, 200, 135, 'Estado = 0', { id: 'condition', shape: 'diamond', fs: 25 }),
  box(20, 310, 260, 75, 'then', { id: 'yes', s: 1, fs: 30, c: 'green' }),
  box(360, 310, 260, 75, 'else, si existe', { id: 'no', s: 2, fs: 27, c: 'orange' }),
  arr('condition', 'yes', { s: 1, t: 'sí' }), arr('condition', 'no', { s: 2, t: 'no' }),
  box(230, 510, 180, 65, 'fi', { id: 'end', s: 2, fs: 30, c: 'purple' }),
  arr('yes', 'end', { s: 2 }), arr('no', 'end', { s: 2 }),
], cases[7].say, 640, 610)];
cases[12].visual = [scene([
  head(cases[12].title), box(160, 70, 320, 70, 'Salida del comando', { id: 'stdout', fs: 28 }),
  box(20, 290, 260, 100, '> archivo\nReemplazar', { id: 'replace', s: 1, fs: 27, c: 'orange' }),
  box(360, 290, 260, 100, '>> archivo\nAnexar al final', { id: 'append', s: 2, fs: 27, c: 'green' }),
  arr('stdout', 'replace', { s: 1 }), arr('stdout', 'append', { s: 2 }),
], cases[12].say, 640, 450)];
cases[16].visual = [scene([head(cases[16].title), table(20, 70, 480, ['Variable', 'Significado'], [['HOME', 'Directorio personal'], ['USER', 'Usuario del entorno'], ['PATH', 'Búsqueda de comandos']], { fs: 25, rh: 95, rs: [0, 1, 2], cw: [1, 1.8] })], cases[16].say, 520, 485)];
cases[18].visual = [scene([
  head(cases[18].title), box(20, 70, 200, 70, 'Nombre A', { id: 'a', fs: 28 }),
  box(20, 230, 200, 70, 'Nombre B', { id: 'b', fs: 28 }),
  box(340, 150, 270, 85, 'Mismo inodo\ny contenido', { id: 'inode', fs: 27, c: 'green' }),
  arr('a', 'inode'), arr('b', 'inode'),
  box(20, 440, 260, 85, 'Enlace simbólico', { id: 'soft', s: 1, fs: 26, c: 'orange' }),
  box(360, 440, 250, 85, 'Ruta de destino', { id: 'path', s: 1, fs: 27, c: 'yellow' }),
  arr('soft', 'path', { s: 1 }),
  txt(320, 590, 'Una ruta inexistente deja un enlace colgando', { s: 2, fs: 24, c: 'purple' }),
], cases[18].say, 640, 630)];

export const FINAL_SCENES: Record<string, VisScene[]> = Object.fromEntries(cases.map((c, i) => [`ca-final-e${i + 1}`, c.visual ?? flow(c)]));
export const FINAL_EXERCISES: WorkedExercise[] = cases.map((c, i) => ({
  id: `ca-final-e${i + 1}`, module: c.module, title: `Final resuelto · ${c.title}`,
  statement: `${c.prompt}\n${c.options.map((o, j) => `${String.fromCharCode(65 + j)}) ${o}`).join('\n')}`,
  steps: c.say.map((body, j) => ({ title: c.labels[j], body })), result: `Correcta: ${c.options[c.answer]}.`,
}));
export const FINAL_QUESTIONS: Question[] = cases.map((c, i) => ({
  id: `ca-final-q${i + 1}`, module: c.module, type: 'mcq', prompt: c.prompt, options: c.options, answer: c.answer,
  explain: c.say.join(' '), vis: FINAL_SCENES[`ca-final-e${i + 1}`][0].v, source: 'final anterior y apuntes; resolución propia contrastada con manuales oficiales',
}));
