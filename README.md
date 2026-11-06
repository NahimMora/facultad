# Mi carrera · plataforma de estudio

Web central con todas las materias: las que están en curso (para el 2º parcial) y las regularizadas (para el final).

- **Sitio:** https://nahimmora.github.io/facultad/
- Stack: Vite + React + TypeScript, HashRouter, GitHub Pages (deploy automático con Actions).
- Progreso, fechas de examen y respuestas se guardan en el navegador (`localStorage`, con try/catch).

## Estructura

```
src/content/subjects.ts        registro de las 11 materias: módulos, exámenes, material, qué falta
src/content/subjects/<id>.ts   contenido de estudio de una materia (teoría, preguntas, ejercicios, videos, machete)
src/content/types.ts           modelo de datos
src/content/loaders.ts         carga a demanda (import.meta.glob → un chunk por materia)
```

### Agregar una materia nueva al contenido

1. Crear `src/content/subjects/<id>.ts` con `export default` un `SubjectContent` (ver `aid.ts` o `itc.ts`).
2. Listo: la materia pasa a "Contenido listo" y aparecen sus pestañas. Los tests validan que todo apunte a módulos existentes.

## Reglas

- **Nunca** se publican PDFs, presentaciones, grabaciones ni transcripciones de la cátedra, ni datos de estudiantes.
  Todo el contenido es redacción propia. `.gitignore` bloquea `private/`, `*.pdf`, `*.vtt`, `*.pptx` y `*.docx`.
- El material original vive en la carpeta privada local `Facultad/private/` (fuera del repo).

## Comandos

```
npm run dev        # desarrollo
npm run lint
npm run typecheck
npm test           # vitest (registro + contenido)
npm run build
npm run e2e        # Playwright (Chrome escritorio + Edge móvil)
```
