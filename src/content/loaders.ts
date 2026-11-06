import { emptyContent, type LessonMedia, type SubjectContent } from './types';

/**
 * Cada materia con contenido tiene su archivo src/content/subjects/<id>.ts con `export default` un SubjectContent.
 * Vite lo separa en un chunk propio: solo se descarga al abrir esa materia.
 */
const files = import.meta.glob<{ default: SubjectContent }>('./subjects/*.ts');

const pathFor = (id: string) => `./subjects/${id}.ts`;

export const hasContent = (id: string) => pathFor(id) in files;

export async function loadContent(id: string): Promise<SubjectContent> {
  const loader = files[pathFor(id)];
  if (!loader) return emptyContent(id);
  return (await loader()).default;
}

/** Videos de clase ya renderizados (src/content/lessons/<materia>-clase-<n>.json). */
const media = import.meta.glob<{ default: LessonMedia }>('./lessons/*.json');

export async function loadLessonMedia(subjectId: string): Promise<LessonMedia[]> {
  const ids = Object.keys(media).filter((k) => k.startsWith(`./lessons/${subjectId}-clase`)).sort();
  return Promise.all(ids.map(async (k) => (await media[k]()).default));
}
