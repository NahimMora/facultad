/** Computación Aplicada · final · recorridos visuales propios. */
import type { VisScene } from '../../vis/types';
import { arr, bits, box, head, ico, scene, table, tree, txt } from './h';

const code = (x: number, y: number, lines: string[], o: Record<string, unknown> = {}) =>
  lines.map((l, i) => txt(x, y + i * 28, l, { anchor: 'start', mono: true, fs: 17, ...o }));

export const SCENES: Record<string, VisScene[]> = {
  c1: [
    scene([
      head('Estructura de directorios de Linux'),
      tree(20, 55, 760, 200, {
        t: '/', c: 'yellow', kids: [
          { t: 'etc', c: 'orange', s: 1 }, { t: 'home', c: 'blue', s: 1 }, { t: 'root', c: 'red', s: 2 }, { t: 'var', c: 'green', s: 3 },
          { t: 'dev', c: 'purple', s: 4 }, { t: 'proc', c: 'purple', s: 4 }, { t: 'boot', c: 'pink', s: 5 }, { t: 'tmp', c: 'gray', s: 5 }, { t: 'usr', c: 'cyan', s: 5 },
        ],
      }, { fs: 17 }),
      table(20, 280, 760, undefined, [['/etc: configuración', '/home: usuarios', '/root: home de ROOT'], ['/var/log: logs', '/dev y /proc: dispositivos y procesos', '/boot: kernel y GRUB']], { rh: 46, fs: 15, rs: [1, 3] }),
      box(20, 390, 760, 50, 'Máquina virtual: el hipervisor tipo 2 (VirtualBox) corre sobre un sistema operativo', { c: 'blue', fs: 16, s: 6 }),
    ], [
      'En Linux todo cuelga de una sola raíz, la barra. Veamos las carpetas que preguntan.',
      '**/etc** guarda la **configuración** del sistema y **/home**, las carpetas de los usuarios.',
      'Ojo: el home del superusuario es **/root**, no /home/root.',
      '**/var** tiene datos que cambian, como los **logs** en /var/log.',
      '**/dev** representa los dispositivos y **/proc** los procesos: es virtual.',
      '**/boot** tiene el kernel y GRUB, **/tmp** los temporales y **/usr** los programas.',
      'Y el entorno de la cursada es una **máquina virtual**: el hipervisor tipo 1 corre sobre el hardware; el tipo 2, como VirtualBox, sobre un sistema operativo.',
    ]),
  ],
  c2: [
    scene([
      head('La terminal: comandos básicos'),
      box(20, 55, 760, 140, '', { c: 'gray' }),
      ...code(40, 85, ['$ pwd            # dónde estoy', '$ ls -la          # listar, con ocultos y detalles', '$ cd /var/log     # cambiar de carpeta', '$ mkdir -p a/b/c   # crear carpetas anidadas']),
      box(20, 215, 370, 110, 'grep: busca TEXTO dentro de archivos', { c: 'green', fs: 18, sub: 'grep error /var/log/syslog', s: 1 }),
      box(410, 215, 370, 110, 'find: busca ARCHIVOS por nombre o tipo', { c: 'orange', fs: 18, sub: 'find /home -name "*.txt"', s: 1 }),
      box(20, 345, 370, 90, 'echo "Hola $USER" · -n sin salto · -e interpreta \\n', { c: 'blue', fs: 16, s: 2 }),
      box(410, 345, 370, 90, 'man comando: el manual', { c: 'purple', fs: 18, s: 2 }),
    ], [
      'Los comandos de navegación: **pwd** dice dónde estás, **ls -la** lista incluyendo ocultos, **cd** cambia de carpeta y **mkdir -p** crea carpetas anidadas.',
      'Para buscar: **grep** busca **texto dentro** de archivos y **find** busca **archivos** por nombre, tipo o tamaño.',
      '**echo** imprime texto y variables, y **man** muestra el manual de cualquier comando.',
    ]),
  ],
  c3: [
    scene([
      head('Paquetes y redirecciones'),
      box(20, 55, 370, 110, 'dpkg', { c: 'orange', fs: 26, sub: 'instala un .deb suelto · NO resuelve dependencias' }),
      box(410, 55, 370, 110, 'apt', { c: 'green', fs: 26, sub: 'usa repositorios · SÍ resuelve dependencias (/etc/apt/sources.list)', s: 1 }),
      ico(90, 290, 'gear', { t: 'ls', c: 'blue', id: 'cmd', s: 2 }),
      box(270, 200, 200, 56, 'lista.txt (PISA)', { c: 'red', fs: 17, id: 'f1', s: 2 }),
      box(270, 275, 200, 56, 'lista.txt (AGREGA)', { c: 'green', fs: 17, id: 'f2', s: 3 }),
      box(270, 350, 200, 56, 'errores.txt', { c: 'pink', fs: 17, id: 'f3', s: 4 }),
      arr('cmd', 'f1', { c: 'red', t: '>', s: 2, fs: 24 }), arr('cmd', 'f2', { c: 'green', t: '>>', s: 3, fs: 24 }), arr('cmd', 'f3', { c: 'pink', t: '2>', s: 4, fs: 22 }),
      box(510, 230, 270, 160, 'ps aux | grep apache · el pipe pasa la salida de uno como entrada del otro', { c: 'cyan', fs: 17, s: 5 }),
    ], [
      '**dpkg** instala un paquete .deb suelto, pero **no resuelve dependencias**.',
      '**apt** trabaja con los **repositorios**, que están en /etc/apt/sources.list, y **sí resuelve dependencias**.',
      'Redirecciones: **mayor** manda la salida a un archivo y lo **sobrescribe**.',
      '**Doble mayor** **agrega** al final, sin borrar lo anterior.',
      '**2 mayor** redirige solo los **errores**.',
      'Y el **pipe**, la barra vertical, pasa la salida de un comando como entrada de otro.',
    ]),
  ],
  c4: [
    scene([
      head('Redes en Debian'),
      box(20, 55, 400, 190, '', { c: 'blue' }), txt(40, 80, '/etc/network/interfaces', { anchor: 'start', b: true, fs: 17, c: 'blue' }),
      ...code(40, 115, ['auto eth0', 'iface eth0 inet static', '  address 192.168.1.50', '  netmask 255.255.255.0', '  gateway 192.168.1.1'], { fs: 16 }),
      box(440, 55, 340, 90, 'agregados en interfaces.d · aplicar: systemctl restart networking', { c: 'blue', fs: 15, s: 1 }),
      box(440, 160, 340, 85, '/etc/resolv.conf: servidores DNS', { c: 'yellow', fs: 17, s: 2 }),
      ico(90, 340, 'laptop', { t: 'cliente ssh', c: 'green', id: 'c', s: 3 }),
      ico(380, 340, 'server', { t: 'sshd · puerto 22', c: 'green', id: 's', s: 3 }),
      arr('c', 's', { c: 'green', t: 'cifrado', s: 3, two: true }),
      box(480, 270, 300, 165, 'Par de claves: la pública va en ~/.ssh/authorized_keys del servidor · config: /etc/ssh/sshd_config', { c: 'green', fs: 15, s: 4 }),
    ], [
      'En Debian, la red se configura en **/etc/network/interfaces**. Para una IP estática: iface eth0 inet static, con address, netmask y gateway.',
      'Los agregados van en la carpeta **interfaces.d**, y se aplica reiniciando el servicio networking.',
      'Los **servidores DNS** que usa el equipo están en **/etc/resolv.conf**. El DNS traduce nombres a IPs.',
      '**SSH** da acceso remoto **cifrado**, cliente servidor, en el puerto **22**.',
      'Se puede entrar con contraseña o con un **par de claves**: la pública se copia en authorized_keys del servidor.',
    ]),
  ],
  c5: [
    scene([
      head('Usuarios: /etc/passwd'),
      bits(20, 75, 760, [{ t: 'ana', c: 'blue', sub: 'usuario' }, { t: 'x', c: 'gray', sub: 'clave en shadow' }, { t: '1001', c: 'orange', sub: 'UID' }, { t: '1001', c: 'yellow', sub: 'GID' }, { t: 'Ana', c: 'gray', sub: 'comentario' }, { t: '/home/ana', n: 1.6, c: 'green', sub: 'home' }, { t: '/bin/bash', n: 1.4, c: 'purple', sub: 'shell' }], { h: 54, fs: 17, mono: true }),
      bits(20, 195, 760, [{ t: 'root · UID 0', c: 'red' }, { t: 'sistema · 1 a 999', c: 'gray' }, { t: 'normales · ≥ 1000', c: 'blue' }], { h: 54, fs: 18, s: 1, title: 'tipos de usuario' }),
      box(20, 275, 370, 75, '/etc/shadow: contraseñas cifradas (solo root)', { c: 'gray', fs: 16, s: 2 }),
      box(410, 275, 370, 75, 'sudoers: SIEMPRE con visudo (valida la sintaxis)', { c: 'red', fs: 16, s: 3 }),
      box(20, 365, 760, 70, 'Configuración global: /etc/profile · por usuario: ~/.bashrc · plantilla para nuevos: /etc/skel', { c: 'green', fs: 16, s: 4 }),
    ], [
      'Cada usuario es una línea de **/etc/passwd**, con campos separados por dos puntos: nombre, una x porque la clave está en shadow, **UID**, **GID**, comentario, **home** y **shell**.',
      'Tipos de usuario: **root**, con UID 0; **de sistema**, del 1 al 999, que ejecutan servicios como www-data; y **normales**, desde 1000.',
      'Las contraseñas cifradas están en **/etc/shadow**, que solo lee root.',
      'El archivo **sudoers** se edita **siempre con visudo**: valida la sintaxis, porque un error te puede dejar sin sudo.',
      'La configuración **global** del entorno está en **/etc/profile**; la de cada usuario en .bashrc; y /etc/skel es la plantilla que se copia a los usuarios nuevos.',
    ]),
  ],
  c6: [
    scene([
      head('Permisos: rwx en octal'),
      bits(80, 80, 640, [{ t: 'r', c: 'blue', sub: '4' }, { t: 'w', c: 'blue', sub: '2' }, { t: 'x', c: 'blue', sub: '1' }, { t: 'r', c: 'green', sub: '4' }, { t: '-', c: 'green', sub: '0' }, { t: 'x', c: 'green', sub: '1' }, { t: 'r', c: 'orange', sub: '4' }, { t: '-', c: 'orange', sub: '0' }, { t: 'x', c: 'orange', sub: '1' }], { h: 60, fs: 28, mono: true }),
      txt(187, 188, 'u (dueño) = 7', { b: true, fs: 18, c: 'blue', s: 1 }), txt(400, 188, 'g (grupo) = 5', { b: true, fs: 18, c: 'green', s: 1 }), txt(613, 188, 'o (otros) = 5', { b: true, fs: 18, c: 'orange', s: 1 }),
      box(200, 210, 400, 56, 'chmod 755 · 644 = rw-r--r--', { c: 'yellow', fs: 22, s: 2 }),
      box(20, 285, 370, 70, 'chmod o+r archivo.txt (simbólico)', { c: 'orange', fs: 17, s: 3 }),
      box(410, 285, 370, 70, 'chown usuario:grupo · umask: permisos por defecto', { c: 'purple', fs: 16, s: 3 }),
      box(20, 370, 760, 65, 'Especiales: SUID 4 (corre como el dueño: passwd) · SGID 2 · sticky 1 (en /tmp, solo el dueño borra)', { c: 'red', fs: 16, s: 4 }),
    ], [
      'Los permisos son tres grupos de tres bits: **lectura, escritura y ejecución**, que valen 4, 2 y 1.',
      'El primer grupo es el **dueño**, el segundo el **grupo** y el tercero los **otros**. Sumando: rwx es 7, r-x es 5.',
      'Así, **755** es rwxr-xr-x, y **644** es rw-r--r--.',
      'En modo simbólico: **chmod o+r** agrega lectura a los otros. Con chown se cambia el dueño, y umask fija los permisos de los archivos nuevos.',
      'Permisos especiales: **SUID**, que ejecuta con los permisos del dueño, como passwd; SGID; y **sticky bit**, en /tmp, donde cada uno solo borra lo suyo.',
    ]),
  ],
  c7: [
    scene([
      head('Disco nuevo: formatear, montar y fstab'),
      ico(80, 120, 'disk', { t: '/dev/sdb1', c: 'gray', id: 'd' }),
      box(200, 90, 200, 60, 'mkfs.ext4', { c: 'orange', fs: 20, id: 'f', s: 1 }),
      box(450, 90, 320, 60, 'mount /dev/sdb1 /mnt/datos', { c: 'green', fs: 16, id: 'm', s: 2 }),
      arr('d', 'f', { s: 1 }), arr('f', 'm', { s: 2 }),
      bits(20, 225, 760, [{ t: 'UUID=…', n: 1.5, c: 'blue', sub: 'dispositivo' }, { t: '/mnt/datos', n: 1.4, c: 'green', sub: 'punto de montaje' }, { t: 'ext4', c: 'orange', sub: 'tipo' }, { t: 'defaults', n: 1.2, c: 'purple', sub: 'opciones' }, { t: '0', n: 0.6, c: 'gray', sub: 'dump' }, { t: '2', n: 0.6, c: 'yellow', sub: 'pass (fsck)' }], { h: 54, fs: 17, mono: true, s: 3, title: '/etc/fstab: montaje automático (6 campos)' }),
      box(20, 330, 370, 105, 'HARD link (ln): otro nombre del MISMO inodo → si borrás el original, sigue andando', { c: 'blue', fs: 16, s: 4 }),
      box(410, 330, 370, 105, 'SOFT link (ln -s): apunta a la RUTA → si borrás el original, queda roto · cruza filesystems', { c: 'pink', fs: 16, s: 5 }),
    ], [
      'El filesystem más usado en Linux es **ext4**, con journaling. Para un disco nuevo: lo particionás con fdisk y lo **formateás** con mkfs.ext4.',
      'Lo **montás** en una carpeta con mount.',
      'Para que se monte solo al arrancar, va en **/etc/fstab**…',
      '…con **seis campos**: el dispositivo, mejor por UUID, el punto de montaje, el tipo, las opciones, dump y pass, que es el orden del chequeo con fsck.',
      'Un **hard link** es otro nombre para el **mismo inodo**: si borrás el original, el link sigue funcionando, pero no cruza filesystems.',
      'Un **soft link** apunta a la **ruta**: cruza filesystems, pero si borrás el original, queda **roto**.',
    ]),
  ],
  c8: [
    scene([
      head('Procesos y prioridad (nice)'),
      bits(40, 80, 720, Array.from({ length: 9 }, (_, i) => ({ t: String(-20 + i * 5 > 19 ? 19 : -20 + i * 5), c: i < 4 ? 'red' as const : i === 4 ? 'gray' as const : 'green' as const })), { h: 50, fs: 18, mono: true, title: 'nice: −20 (más prioridad) … 19 (menos)' }),
      txt(200, 160, '← más CPU · solo root baja el nice', { b: true, fs: 16, c: 'red', s: 1 }), txt(600, 160, 'más amable con el resto →', { b: true, fs: 16, c: 'green', s: 1 }),
      box(20, 190, 370, 70, 'nice -n 10 comando (al lanzar)', { c: 'blue', fs: 17, s: 1 }),
      box(410, 190, 370, 70, 'renice -n 5 -p PID (ya corriendo)', { c: 'purple', fs: 17, s: 1 }),
      box(20, 280, 370, 70, 'kill PID → SIGTERM (15): ordenado', { c: 'orange', fs: 17, s: 2 }),
      box(410, 280, 370, 70, 'kill -9 PID → SIGKILL: forzado', { c: 'red', fs: 17, s: 2 }),
      box(20, 370, 760, 65, 'cron: crontab -e → minuto hora día mes día_semana comando · & segundo plano · jobs, fg, bg', { c: 'cyan', fs: 16, s: 3 }),
    ], [
      'Cada proceso tiene un **PID** y una prioridad, el valor **nice**: de menos 20, máxima prioridad, a 19, mínima.',
      'Se fija al lanzar con **nice -n**, o se cambia en uno que ya corre con **renice**. Solo **root** puede bajar el nice, o sea darle más prioridad.',
      'Para terminar un proceso: **kill** manda SIGTERM, que le pide terminar ordenadamente; **kill -9** manda SIGKILL, forzado.',
      'Y **cron** programa tareas: con crontab -e, cinco campos de tiempo, minuto, hora, día, mes y día de la semana, y el comando.',
    ]),
  ],
  c9: [
    scene([
      head('Inicio del sistema'),
      ...['BIOS / UEFI', 'GRUB', 'kernel', 'systemd (PID 1)', 'servicios'].map((t, i) => box(15 + i * 157, 80, 140, 70, t, { c: (['gray', 'orange', 'blue', 'green', 'purple'] as const)[i], fs: 16, id: 'b' + i, s: i })),
      ...[0, 1, 2, 3].map((i) => arr('b' + i, 'b' + (i + 1), { s: i + 1 })),
      box(20, 200, 370, 120, 'Tiempo de espera de GRUB: /etc/default/grub (GRUB_TIMEOUT=5) + update-grub', { c: 'orange', fs: 17, s: 5 }),
      box(410, 200, 370, 120, 'NO editar /boot/grub/grub.cfg: se regenera', { c: 'red', fs: 18, s: 5 }),
      box(20, 340, 760, 90, 'systemctl start · stop · restart · status · ENABLE (arranca con el sistema) · logs: journalctl', { c: 'green', fs: 17, s: 6 }),
    ], [
      'Al encender: primero el **firmware**, BIOS o UEFI…',
      '…que carga **GRUB**, el gestor de arranque…',
      '…que carga el **kernel**…',
      '…que lanza **systemd**, el proceso número 1…',
      '…que arranca los **servicios**.',
      'Para cambiar el **tiempo de espera de GRUB** se edita **/etc/default/grub** y se ejecuta **update-grub**. El grub.cfg no se toca a mano, porque se regenera.',
      'Los servicios se manejan con **systemctl**: start, stop, restart, status y **enable** para que arranquen con el sistema.',
    ]),
  ],
  c10: [
    scene([
      head('Scripting en bash: parámetros'),
      box(20, 55, 760, 60, '$ ./copia.sh notas.txt backup', { c: 'gray', fs: 22 }),
      bits(20, 160, 760, [{ t: '$0 = ./copia.sh', c: 'gray' }, { t: '$1 = notas.txt', c: 'blue' }, { t: '$2 = backup', c: 'green' }], { h: 54, fs: 17, mono: true, s: 1 }),
      table(20, 240, 360, undefined, [['$# → cantidad (2)'], ['$@ → todos'], ['$? → código de salida']], { rh: 38, fs: 16, mono: true, s: 2 }),
      box(400, 240, 380, 115, 'if [ $# -ne 1 ]; then … fi · -eq -ne -gt -lt · -f archivo · -d carpeta', { c: 'orange', fs: 15, s: 3 }),
      box(20, 375, 760, 60, 'Espacios DENTRO de [ ] · SIN espacios en a=5 · #!/bin/bash · chmod +x', { c: 'red', fs: 17, s: 4 }),
    ], [
      'Un script de bash empieza con el **shebang**, numeral exclamación barra bin barra bash. Se ejecuta con bash script.sh, o con permiso de ejecución y punto barra.',
      'Los **parámetros** llegan numerados: **$1**, **$2**… y **$0** es el nombre del script.',
      '**$#** es la cantidad de parámetros, **$@** son todos y **$?** el código de salida del último comando. Las variables de entorno: HOME, USER, PATH.',
      'El **if** compara con corchetes: menos eq, ne, gt, lt para números; menos f si existe un archivo, menos d si es carpeta.',
      'Los dos errores clásicos: dentro de los corchetes **van espacios**, y al asignar una variable **no van** alrededor del igual.',
    ]),
  ],
};

export const EX_SCENES: Record<string, VisScene[]> = {
  'ca-e1': [
    scene([
      head('Script: ¿existe el archivo?'),
      box(20, 55, 760, 250, '', { c: 'gray' }),
      ...code(40, 85, ['#!/bin/bash', 'if [ $# -ne 1 ]; then', '  echo "Uso: $0 archivo"; exit 1', 'fi', 'if [ -f "$1" ]; then', '  echo "$1 existe"', 'else', '  echo "$1 no existe"', 'fi'], { fs: 17 }),
      box(500, 90, 270, 60, 'valida la cantidad de parámetros', { c: 'orange', fs: 15, s: 1 }),
      box(500, 200, 270, 60, '-f: ¿existe y es archivo?', { c: 'green', fs: 16, s: 2 }),
      box(20, 330, 760, 100, '$ chmod +x existe.sh · $ ./existe.sh notas.txt → notas.txt existe', { c: 'blue', fs: 18, s: 3 }),
    ], [
      'El script empieza con el shebang.',
      'Primero valida que llegue **exactamente un** parámetro: si $# es distinto de 1, muestra el uso y sale con error.',
      'Después, con **-f** verifica si el archivo existe y avisa.',
      'Para ejecutarlo: le das permiso con chmod más x, y lo corrés con el nombre del archivo como parámetro.',
    ]),
  ],
  'ca-e2': [
    scene([
      head('Disco nuevo montado al iniciar'),
      ...['fdisk /dev/sdb', 'mkfs.ext4 /dev/sdb1', 'mkdir -p /mnt/datos', 'mount /dev/sdb1 /mnt/datos', 'blkid /dev/sdb1'].map((t, i) => box(20, 55 + i * 62, 440, 50, t, { c: 'blue', fs: 18, s: i < 2 ? 0 : i < 4 ? 1 : 2 })),
      box(490, 55, 290, 300, '1. particionar y formatear · 2. crear el punto y montar · 3. copiar el UUID', { c: 'gray', fs: 17 }),
      box(20, 375, 760, 60, 'fstab: UUID=… /mnt/datos ext4 defaults 0 2', { c: 'green', fs: 22, s: 3 }),
    ], [
      'Con fdisk se crea la partición sdb1 y con **mkfs.ext4** se formatea.',
      'Se crea la carpeta y se **monta** para probar.',
      'Con **blkid** se obtiene el UUID de la partición.',
      'Y se agrega la línea en **fstab** con los seis campos, así se monta en cada arranque.',
    ]),
  ],
  'ca-e3': [
    scene([
      head('IP estática en Debian'),
      box(20, 55, 480, 220, '', { c: 'blue' }),
      ...code(40, 90, ['auto eth0', 'iface eth0 inet static', '  address 192.168.1.50', '  netmask 255.255.255.0', '  gateway 192.168.1.1'], { fs: 18 }),
      box(520, 55, 260, 220, '/etc/network/interfaces (o un archivo en interfaces.d)', { c: 'gray', fs: 17 }),
      ...code(40, 320, ['systemctl restart networking', 'ip a        # verificar la IP', 'ping 192.168.1.1'], { fs: 18, s: 1 }),
    ], [
      'En /etc/network/interfaces se declara eth0 como **estática** con su dirección, máscara y gateway.',
      'Se aplica reiniciando networking y se verifica con ip a y un ping al gateway.',
    ]),
  ],
};
