# AGENTS.md (hub)

Las instrucciones completas para agentes están en `../AGENTS.md` (carpeta `Facultad/`, fuera del repo). **Leelo antes de empezar.**
Ese archivo reemplaza al `Downloads/AGENTS.md` de la barbería, que no aplica acá.

Lo mínimo:
- **El repo es público.** No subir PDFs, diapositivas ni figuras de la cátedra, grabaciones, transcripciones, nombres de estudiantes ni credenciales. El material original vive en `../private/`.
- **Contenido visual primero.** Cada tema lleva escenas en `src/content/visual/<id>.ts` y entra en una clase en video. Las preguntas son solo choice o V/F, con explicación. Mobile first. Español con voseo.
- **Antes de pushear:** `npm run lint && npm run typecheck && npm test && npm run build && npm run e2e`.
