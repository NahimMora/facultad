import { POCKET } from '../cheatsheets';
import type { Question, SubjectContent, TheoryBlock, WorkedExercise } from '../types';
import { VIDEOS } from '../videos/ca';
import { EX_SCENES, SCENES } from '../visual/ca';
import { FINAL_EXERCISES, FINAL_QUESTIONS, FINAL_SCENES } from '../visual/ca-final';
import { REVIEW_LESSONS, REVIEW_QUESTIONS } from '../visual/ca-repaso';

/** CA · final. Redacción propia sobre los apuntes de la cátedra (Debian) y las preguntas de finales 2023 y 2025 (Drive). */
const F = 'preguntas de final 2023 y julio 2025 (Drive de estudiantes)';

const theory: TheoryBlock[] = [
  { id: 'c1', module: 'm1', title: 'Instalación, máquina virtual y estructura de directorios', points: [
    '**Máquina virtual**: software que emula una computadora completa sobre otra. El **hipervisor** puede ser tipo 1 (sobre el hardware) o tipo 2 (sobre un sistema operativo, como VirtualBox).',
    'Directorios clave: **/etc** configuración · **/home** usuarios · **/root** home del superusuario · **/var** datos variables (**/var/log** logs) · **/dev** dispositivos · **/proc** procesos (virtual) · **/boot** kernel y GRUB · **/tmp** temporales · **/bin**, **/sbin**, **/usr** programas · **/mnt**, **/media** montajes.',
  ], trap: 'El home de root es **/root**, no /home/root.' },
  { id: 'c2', module: 'm2', title: 'La terminal', points: [
    'Navegar: pwd, cd, ls -la (incluye ocultos y detalles). Archivos: cp, mv, rm (-r para carpetas), mkdir -p, touch, cat, less, head, tail.',
    'Buscar: **grep** (texto dentro de archivos), **find** (archivos por nombre, tipo, tamaño). Ayuda: **man** comando.',
    '**echo**: imprime texto y variables (echo "Hola $USER"); -n sin salto de línea, -e interpreta \\n y \\t.',
  ] },
  { id: 'c3', module: 'm3', title: 'Gestión de software y redirecciones', points: [
    '**dpkg**: instala paquetes .deb sueltos, **no** resuelve dependencias. **apt**: trabaja con repositorios y **resuelve dependencias** (apt update, apt install, apt remove, apt purge, apt upgrade).',
    'Repositorios en **/etc/apt/sources.list** (y sources.list.d).',
    '**>** redirige la salida y **sobrescribe** · **>>** **agrega** al final · **2>** redirige errores · **<** toma la entrada de un archivo · **|** (pipe) pasa la salida de un comando como entrada de otro.',
  ], trap: 'ls > lista.txt **pisa** el archivo; ls >> lista.txt **agrega** al final.' },
  { id: 'c4', module: 'm4', title: 'Redes', points: [
    'Configuración en **/etc/network**: el archivo principal es **interfaces** y los agregados van en la carpeta **interfaces.d**.',
    'IP estática: iface eth0 inet static + address, netmask, gateway. Aplicar: systemctl restart networking.',
    'Comandos: ip a (direcciones), ip route (rutas), ping. Nombre del equipo: /etc/hostname; resolución local: /etc/hosts.',
    '**DNS**: traduce nombres de dominio a direcciones IP. Los servidores DNS que usa el equipo están en **/etc/resolv.conf**.',
    '**SSH**: acceso remoto **cifrado** cliente-servidor (puerto **22**, servidor sshd). Autenticación con contraseña o con **par de claves** (pública en ~/.ssh/authorized_keys del servidor). Configuración del servidor: /etc/ssh/sshd_config.',
  ] },
  { id: 'c5', module: 'm5', title: 'Usuarios, seguridad y accesos', points: [
    'Tipos de usuario: **root** (UID 0, todos los permisos) · **usuarios de sistema o especiales** (UID 1–999: ejecutan servicios, como www-data o nobody, normalmente sin shell de login) · **usuarios normales** (UID ≥ 1000).',
    '**/etc/passwd**: usuario:x:UID:GID:comentario:home:shell · **/etc/shadow**: contraseñas cifradas (solo root) · **/etc/group**: grupos.',
    'Comandos: adduser / useradd, passwd, usermod -aG sudo usuario, userdel.',
    '**sudo**: ejecutar como root. El archivo **/etc/sudoers** se edita **siempre con visudo** (verifica la sintaxis y bloquea el archivo).',
    'Configuración global de usuarios (variables y entorno para todos): **/etc/profile** y /etc/bash.bashrc. Por usuario: ~/.bashrc y ~/.profile. Plantilla para usuarios nuevos: /etc/skel.',
  ], trap: 'Editar sudoers con un editor común puede dejar un error de sintaxis y **dejarte sin sudo**: por eso visudo.' },
  { id: 'c6', module: 'm6', title: 'Permisos de archivos', points: [
    'Tres grupos: **u** (dueño), **g** (grupo), **o** (otros). Permisos **r** (4), **w** (2), **x** (1).',
    'Simbólico: **chmod o+r archivo.txt** (agrega lectura a otros), g−w, u=rwx. Octal: chmod 755 = rwxr-xr-x · 644 = rw-r--r--.',
    'chown usuario:grupo archivo cambia el dueño. **umask** define los permisos por defecto de los archivos nuevos.',
    'Especiales: **SUID** (4: se ejecuta con los permisos del dueño, ej. passwd), **SGID** (2), **sticky bit** (1: en /tmp, solo el dueño borra sus archivos).',
  ] },
  { id: 'c7', module: 'm7', title: 'Sistema de archivos', points: [
    'El filesystem más usado en Linux es **ext4** (con journaling). Otros: xfs, btrfs; vfat/ntfs para compartir con Windows.',
    'Particionar: fdisk / parted. **Formatear**: **mkfs.ext4 /dev/sdb1**. Ver discos: lsblk, blkid (UUID), df -h (espacio), du -sh (tamaño de carpetas).',
    'Montar: mount /dev/sdb1 /mnt/datos. Montaje automático al iniciar: **/etc/fstab** con 6 campos: **dispositivo (UUID) · punto de montaje · tipo · opciones · dump · pass** (orden de fsck).',
    '**Hard link** (ln): otro nombre para el **mismo inodo**; sigue funcionando si se borra el original; no cruza filesystems ni apunta a carpetas. **Soft link** (ln -s): archivo que apunta a una **ruta**; cruza filesystems; se **rompe** si se borra el original.',
  ], table: { head: ['', 'Hard link', 'Soft link'], rows: [['Comando', 'ln a b', 'ln -s a b'], ['Apunta a', 'el inodo', 'la ruta'], ['Si borro el original', 'sigue andando', 'queda roto'], ['Otro filesystem', 'no', 'sí']] } },
  { id: 'c8', module: 'm8', title: 'Tareas y procesos', points: [
    'Ver procesos: ps aux, top / htop. Cada proceso tiene un **PID**.',
    '**kill PID** envía SIGTERM (15, pide terminar ordenadamente); **kill -9 PID** envía SIGKILL (forzado). killall nombre.',
    'Prioridad: valor **nice** de −20 (más prioridad) a 19 (menos). **nice -n 10 comando** al lanzar; **renice -n 5 -p PID** para uno que ya corre. Solo root puede **bajar** el nice (subir la prioridad).',
    'Segundo plano: comando &, jobs, fg, bg, Ctrl+Z. **cron**: tareas programadas con crontab -e (minuto hora día mes día_semana comando).',
  ] },
  { id: 'c9', module: 'm9', title: 'Inicio del sistema', points: [
    'Secuencia: BIOS/UEFI → **GRUB** (gestor de arranque) → kernel → **systemd** (PID 1) → servicios.',
    '**Tiempo de espera de GRUB**: editar **/etc/default/grub** (GRUB_TIMEOUT=5) y después ejecutar **update-grub**.',
    'Servicios: systemctl start | stop | restart | status | enable (arranca con el sistema) servicio. Logs: journalctl.',
  ], trap: 'Editar /boot/grub/grub.cfg a mano no sirve: se regenera. Se cambia /etc/default/grub y se corre update-grub.' },
  { id: 'c10', module: 'm10', title: 'Scripting en bash', points: [
    'Primera línea: **#!/bin/bash** (shebang). Ejecutar: **bash script.sh**, o darle permiso (chmod +x script.sh) y correr **./script.sh**.',
    '**Parámetros**: ./script.sh a b → **$1**, **$2** … · **$#** cantidad · **$@** todos · **$0** nombre del script · **$?** código de salida del último comando.',
    'Variables: nombre=valor (sin espacios) y se usan con $nombre. Variables de entorno del usuario: **$HOME, $USER, $PATH, $SHELL** (ver todas con env).',
    '**if**: if [ condición ]; then … elif …; else …; fi. Comparar números: -eq, -ne, -gt, -lt; archivos: -f (existe archivo), -d (carpeta).',
    'Bucles: for x in lista; do …; done · while [ cond ]; do …; done. Leer del teclado: read variable.',
  ], trap: 'En bash van **espacios** dentro de los corchetes ([ $a -gt 5 ]) y **no** van alrededor del = al asignar (a=5).' },
];

const q: Question[] = [
  { id: 'ca-01', module: 'm4', type: 'mcq', prompt: 'Los archivos de configuración de red de Debian están en la carpeta:', options: ['/etc/network', '/var/network', '/etc/net', '/proc/network'], answer: 0, explain: '/etc/network, con el archivo **interfaces** y la carpeta **interfaces.d** para agregados.', source: F },
  { id: 'ca-02', module: 'm4', type: 'mcq', prompt: 'Dentro de /etc/network, los archivos para agregar o modificar configuraciones se crean en:', options: ['interfaces.d', 'interfaces', 'hosts', 'resolv.conf'], answer: 0, explain: 'interfaces es el archivo por defecto; los agregados van en la carpeta interfaces.d. En el final de 2023 se pedía **solo el nombre** (completar con exactitud).', source: F },
  { id: 'ca-03', module: 'm1', type: 'mcq', prompt: 'La carpeta home del superusuario es:', options: ['/root', '/home/root', '/', '/etc/root'], answer: 0, explain: 'root tiene su home separado de /home.', source: F },
  { id: 'ca-04', module: 'm8', type: 'mcq', prompt: '¿Cómo se baja la prioridad de un proceso que ya está corriendo?', options: ['renice -n 10 -p PID', 'nice -n 10 PID', 'kill -10 PID', 'chmod 10 PID'], answer: 0, explain: 'renice cambia el nice de un proceso existente. nice se usa al **lanzar** un comando.', source: F },
  { id: 'ca-05', module: 'm8', type: 'mcq', prompt: 'El valor nice que da **más** prioridad es:', options: ['−20', '19', '0', '100'], answer: 0, explain: 'Rango −20 (más prioridad) a 19 (menos). Solo root puede usar valores negativos.' },
  { id: 'ca-06', module: 'm8', type: 'mcq', prompt: 'kill PID sin opciones envía:', options: ['SIGTERM (15): pide terminar ordenadamente', 'SIGKILL (9): mata sin aviso', 'SIGSTOP', 'Nada'], answer: 0, explain: 'Para forzar: kill -9 PID.', source: F },
  { id: 'ca-07', module: 'm4', type: 'mcq', prompt: 'SSH sirve para:', options: ['Acceso remoto cifrado, cliente-servidor, por el puerto 22', 'Compartir archivos sin cifrar', 'Resolver nombres de dominio', 'Asignar IP automáticamente'], answer: 0, explain: 'El servidor es sshd; se autentica con contraseña o con par de claves (la pública va en ~/.ssh/authorized_keys).', source: F },
  { id: 'ca-08', module: 'm4', type: 'mcq', prompt: 'Un servicio DNS:', options: ['Traduce nombres de dominio a direcciones IP', 'Asigna IP automáticamente', 'Cifra la conexión', 'Filtra paquetes'], answer: 0, explain: 'Asignar IP es DHCP. Los DNS que usa el equipo están en /etc/resolv.conf.', source: F },
  { id: 'ca-09', module: 'm5', type: 'mcq', prompt: 'El archivo sudoers se debe editar con:', options: ['visudo', 'nano /etc/sudoers directamente', 'sudo vi /etc/passwd', 'chmod'], answer: 0, explain: 'visudo valida la sintaxis antes de guardar: un error podría dejarte sin sudo.', source: F },
  { id: 'ca-10', module: 'm5', type: 'mcq', prompt: 'Los usuarios "especiales" o de sistema:', options: ['Ejecutan servicios (UID 1–999) y normalmente no tienen shell de login', 'Son los administradores con UID 0', 'Son los usuarios con UID ≥ 1000', 'Son los invitados'], answer: 0, explain: 'root es UID 0; los usuarios normales, UID ≥ 1000. Ejemplos de especiales: www-data, nobody.', source: F },
  { id: 'ca-11', module: 'm5', type: 'mcq', prompt: 'En el esquema de cuentas locales estudiado, ¿dónde se guardan los hashes de contraseñas y los datos de caducidad?', options: ['/etc/shadow', '/etc/passwd', '/etc/group', '/home/usuario'], answer: 0, explain: '/etc/shadow guarda hashes, no contraseñas recuperables por descifrado. /etc/passwd conserva los datos públicos de la cuenta y normalmente una x en el campo correspondiente.' },
  { id: 'ca-12', module: 'm5', type: 'mcq', prompt: 'Las configuraciones globales (para todos los usuarios) del entorno se editan en:', options: ['/etc/profile', '~/.bashrc', '/etc/hostname', '/var/log'], answer: 0, explain: '/etc/profile (y /etc/bash.bashrc) aplica a todos; ~/.bashrc es de cada usuario.', source: F },
  { id: 'ca-13', module: 'm6', type: 'mcq', prompt: 'Agregar permiso de lectura a "otros" en archivo.txt, en forma simbólica:', options: ['chmod o+r archivo.txt', 'chmod 004 archivo.txt', 'chmod u+r archivo.txt', 'chown o+r archivo.txt'], answer: 0, explain: 'o = otros, + agrega, r = lectura. (004 sería octal y además quitaría los demás permisos).', source: F },
  { id: 'ca-14', module: 'm6', type: 'mcq', prompt: 'chmod 754 deja los permisos:', options: ['rwxr-xr--', 'rwxrwxr--', 'rw-r-xr--', 'rwxr--r-x'], answer: 0, explain: '7 = rwx (dueño), 5 = r-x (grupo), 4 = r-- (otros).' },
  { id: 'ca-15', module: 'm6', type: 'tf', prompt: 'El sticky bit en /tmp permite que cualquier usuario borre los archivos de otros.', answer: false, explain: 'Es al revés: con sticky bit, solo el **dueño** puede borrar sus archivos aunque la carpeta sea escribible por todos.' },
  { id: 'ca-16', module: 'm3', type: 'mcq', prompt: 'Diferencia entre ls > lista.txt y ls >> lista.txt:', options: ['> sobrescribe el archivo; >> agrega al final', '> agrega; >> sobrescribe', 'Son iguales', '>> redirige los errores'], answer: 0, explain: 'Los errores se redirigen con 2>.', source: F },
  { id: 'ca-17', module: 'm3', type: 'mcq', prompt: '¿Qué herramienta resuelve dependencias al instalar paquetes en Debian?', options: ['apt', 'dpkg', 'tar', 'mkfs'], answer: 0, explain: 'apt trabaja con repositorios y resuelve dependencias; dpkg instala .deb sueltos sin resolverlas.', source: F },
  { id: 'ca-18', module: 'm3', type: 'mcq', prompt: 'El operador | (pipe):', options: ['Pasa la salida de un comando como entrada del siguiente', 'Guarda la salida en un archivo', 'Ejecuta en segundo plano', 'Redirige errores'], answer: 0, explain: 'Ej.: ps aux | grep ssh.' },
  { id: 'ca-19', module: 'm7', type: 'mcq', prompt: '¿Cuál de estos sistemas de archivos corresponde al formato Linux trabajado en el ejemplo de la materia?', options: ['ext4', 'NTFS', 'FAT32', 'HFS+'], answer: 0, explain: 'El ejemplo trabaja ext4 y su journaling. Esto no afirma cuál es el sistema más usado actualmente ni impide que Linux acceda a otros formatos.', source: F },
  { id: 'ca-20', module: 'm7', type: 'mcq', prompt: 'Los campos de una línea de /etc/fstab, en orden:', options: ['dispositivo · punto de montaje · tipo · opciones · dump · pass', 'punto de montaje · dispositivo · tamaño · dueño', 'UUID · usuario · permisos · fecha', 'tipo · dispositivo · opciones'], answer: 0, explain: 'Ej.: UUID=… /mnt/datos ext4 defaults 0 2.', source: F },
  { id: 'ca-21', module: 'm7', type: 'mcq', prompt: 'Formatear la partición /dev/sdb1 con ext4:', options: ['mkfs.ext4 /dev/sdb1', 'format /dev/sdb1', 'fdisk ext4 /dev/sdb1', 'mount -t ext4 /dev/sdb1'], answer: 0, explain: 'fdisk crea particiones; mkfs las formatea; mount las monta.', source: F },
  { id: 'ca-22', module: 'm7', type: 'mcq', prompt: 'Si borro el archivo original, ¿qué link sigue funcionando?', options: ['El hard link', 'El soft link', 'Ninguno', 'Los dos'], answer: 0, explain: 'El hard link apunta al mismo inodo (los datos siguen ahí); el soft link apunta a la ruta y queda roto.', source: F },
  { id: 'ca-23', module: 'm7', type: 'tf', prompt: 'Un hard link puede apuntar a un archivo de otro sistema de archivos.', answer: false, explain: 'Los inodos son propios de cada filesystem: para cruzar se usa un soft link.' },
  { id: 'ca-24', module: 'm9', type: 'mcq', prompt: 'Para cambiar el tiempo de espera de GRUB:', options: ['Editar GRUB_TIMEOUT en /etc/default/grub y ejecutar update-grub', 'Editar /boot/grub/grub.cfg a mano', 'systemctl restart grub', 'Editar /etc/fstab'], answer: 0, explain: 'grub.cfg se regenera: los cambios se hacen en /etc/default/grub.', source: F },
  { id: 'ca-25', module: 'm9', type: 'mcq', prompt: 'Para que un servicio arranque automáticamente con el sistema:', options: ['systemctl enable servicio', 'systemctl start servicio', 'service servicio status', 'kill -HUP servicio'], answer: 0, explain: 'start lo arranca ahora; enable lo deja habilitado al iniciar.' },
  { id: 'ca-26', module: 'm10', type: 'mcq', prompt: '¿Cómo se ejecuta un script de bash?', options: ['bash script.sh, o chmod +x script.sh y luego ./script.sh', 'run script.sh', 'exec.sh script', 'open script.sh'], answer: 0, explain: 'Con ./ hace falta el permiso de ejecución y el shebang #!/bin/bash.', source: F },
  { id: 'ca-27', module: 'm10', type: 'mcq', prompt: 'En ./script.sh hola chau, ¿cómo se obtiene "chau" dentro del script?', options: ['$2', '$1', '$#', '$0'], answer: 0, explain: '$1 = hola, $2 = chau, $# = 2, $0 = nombre del script.', source: F },
  { id: 'ca-28', module: 'm10', type: 'mcq', prompt: 'La estructura correcta de un if en bash es:', options: ['if [ $a -gt 5 ]; then … fi', 'if ($a > 5) { … }', 'if [$a -gt 5] then … end', 'if $a -gt 5: … endif'], answer: 0, explain: 'Espacios dentro de los corchetes, then y cierre con fi.', source: F },
  { id: 'ca-29', module: 'm10', type: 'mcq', prompt: 'Para acceder al directorio personal del usuario dentro de un script:', options: ['$HOME', '$1', '$?', '$$'], answer: 0, explain: 'Variables de entorno: $HOME, $USER, $PATH, $SHELL. $? es el código de salida y $$ el PID del script.', source: F },
  { id: 'ca-30', module: 'm10', type: 'tf', prompt: 'En bash se asigna una variable con espacios alrededor del igual: nombre = valor.', answer: false, explain: 'Debe ser nombre=valor; con espacios, bash interpreta "nombre" como un comando.' },
  { id: 'ca-31', module: 'm1', type: 'mcq', prompt: 'Una máquina virtual es:', options: ['Software que emula una computadora completa sobre otra', 'Un contenedor que comparte el kernel', 'Un servidor en la nube', 'Una partición del disco'], answer: 0, explain: 'La administra un hipervisor (tipo 1 sobre el hardware, tipo 2 sobre un SO como VirtualBox).', source: F },
  { id: 'ca-32', module: 'm2', type: 'mcq', prompt: 'echo -e "a\\tb" :', options: ['Interpreta \\t como tabulación', 'Imprime literalmente \\t', 'No imprime nada', 'Da error'], answer: 0, explain: '-e habilita las secuencias de escape; -n quita el salto de línea final.', source: F },
];

const ex: WorkedExercise[] = [
  { id: 'ca-e1', module: 'm10', title: 'Script con parámetros e if', statement: 'Escribir un script que reciba un nombre de archivo y diga si existe.', steps: [
    { title: 'Código', body: '#!/bin/bash · if [ $# -ne 1 ]; then echo "Uso: $0 archivo"; exit 1; fi · if [ -f "$1" ]; then echo "$1 existe"; else echo "$1 no existe"; fi' },
    { title: 'Ejecutar', body: 'chmod +x existe.sh · ./existe.sh notas.txt' },
  ] },
  { id: 'ca-e2', module: 'm7', title: 'Disco nuevo montado al iniciar', statement: 'Se agregó un disco /dev/sdb a la VM. Dejarlo formateado en ext4 y montado en /mnt/datos al arrancar.', steps: [
    { title: 'Particionar y formatear', body: 'fdisk /dev/sdb (crear sdb1) · mkfs.ext4 /dev/sdb1' },
    { title: 'Montar', body: 'mkdir -p /mnt/datos · mount /dev/sdb1 /mnt/datos · blkid /dev/sdb1 (copiar el UUID)' },
    { title: 'fstab', body: 'UUID=… /mnt/datos ext4 defaults 0 2' },
  ] },
  { id: 'ca-e3', module: 'm4', title: 'IP estática en Debian', statement: 'Configurar eth0 con 192.168.1.50/24 y gateway 192.168.1.1.', steps: [
    { title: 'Archivo', body: '/etc/network/interfaces (o un archivo en interfaces.d): auto eth0 · iface eth0 inet static · address 192.168.1.50 · netmask 255.255.255.0 · gateway 192.168.1.1' },
    { title: 'Aplicar y verificar', body: 'systemctl restart networking · ip a · ping 192.168.1.1' },
  ] },
];

const content: SubjectContent = {
  subjectId: 'ca', theory, questions: [...q, ...FINAL_QUESTIONS, ...REVIEW_QUESTIONS], exercises: [...ex, ...FINAL_EXERCISES], videos: VIDEOS,
  cheatsheet: POCKET['ca'],
};

content.theory = content.theory.map((b) => ({ ...b, scenes: SCENES[b.id] }));
content.exercises = content.exercises.map((e) => ({ ...e, scenes: EX_SCENES[e.id] ?? FINAL_SCENES[e.id] }));
content.lessons = [
  {
    id: 'ca-clase-2', examId: 'final', title: 'Final resuelto · procesos, accesos, discos y Bash',
    summary: 'Primera mitad de los 22 temas conocidos: renice, SSH, sudoers, usuarios, ext4, fstab, condiciones, scripts, argumentos y máquinas virtuales.',
    intro: ['Vamos a resolver la primera mitad de los temas recordados de un final anterior de Computación Aplicada. Las consignas están reformuladas y las respuestas se contrastan con los apuntes y manuales oficiales.', 'El registro disponible conserva veintidós temas de un final de veinticinco. Los tres que no están documentados quedan pendientes: no vamos a completar esa información con suposiciones. Empezamos por procesos, acceso remoto, usuarios y scripting.'],
    parts: FINAL_EXERCISES.slice(0, 11).map((e) => `ex:${e.id}`),
    outro: ['Renice modifica un proceso existente. SSH combina autenticación y transporte protegido. Visudo ayuda a editar y validar reglas de sudo. Separá las identidades de personas y de servicios.', 'En discos, distinguí dispositivo, sistema de archivos y montaje. En Bash, diferenciá el intérprete, el archivo y los argumentos. La segunda clase resuelta continúa con permisos, redirecciones, paquetes, arranque y enlaces.'],
  },
  {
    id: 'ca-clase-3', examId: 'final', title: 'Final resuelto · permisos, red, arranque y archivos',
    summary: 'Segunda mitad: chmod, redirecciones, apt, DNS, GRUB, variables, formato, enlaces, kill, profile y salida de un script.',
    intro: ['Continuamos el final resuelto de Computación Aplicada con los once temas restantes que conserva el registro. En cada punto, identificá primero qué recurso cambia y qué comando o archivo cumple esa función.', 'Prestá atención al contexto: los ejemplos de paquetes y regeneración de GRUB corresponden a Debian. Los archivos de inicio de Bash dependen del tipo de sesión, y los nombres de dispositivos se muestran como marcadores sin elegir una partición real.'],
    parts: FINAL_EXERCISES.slice(11).map((e) => `ex:${e.id}`),
    outro: ['Un permiso, una redirección y una señal modifican cosas diferentes. Agregar lectura con chmod no equivale a ejecutar; anexar salida no equivale a truncar; sigterm no equivale a sigkill.', 'Conservá las distinciones entre un enlace duro y uno simbólico, entre formatear y montar, y entre configuración de entrada y archivo generado de GRUB. Para profile y bashrc, especificá el tipo de inicio del shell.', 'Ahora probá los ejercicios en la web y el simulacro. Si errás una respuesta, volvé al diagrama y explicá por qué el comando alternativo cumple otra función.'],
  },
  {
    id: 'ca-clase-1', examId: 'final', title: 'Final completo: administrar Linux',
    summary: 'Directorios, terminal, apt y redirecciones, redes y SSH, usuarios y sudoers, permisos, discos y fstab, links, procesos, arranque y scripting.',
    intro: [
      'Esta es la clase completa para el final de Computación Aplicada: administración de Linux de punta a punta, con los archivos y comandos que preguntan.',
      'Vamos a ver la estructura de directorios, la terminal, paquetes y redirecciones, redes, usuarios, permisos, discos, procesos, el arranque y scripting en bash.',
    ],
    parts: ['c1', 'c2', 'c3', 'c4', 'ex:ca-e3', 'c5', 'c6', 'c7', 'ex:ca-e2', 'c8', 'c9', 'c10', 'ex:ca-e1'],
    outro: [
      '/root es el home de root · apt resuelve dependencias, dpkg no · > pisa, >> agrega · DNS en /etc/resolv.conf · SSH puerto 22.',
      'passwd: usuario:x:UID:GID:comentario:home:shell · sudoers con visudo · 755 = rwxr-xr-x · fstab: 6 campos.',
      'Hard link = mismo inodo; soft link = ruta · nice −20 a 19 · GRUB: /etc/default/grub + update-grub · $1, $#, $@, $?.',
    ],
  },
];

content.lessons.push(...REVIEW_LESSONS);
export default content;
