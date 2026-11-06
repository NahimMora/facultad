import { emptyContent, type SubjectContent } from './types';

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
