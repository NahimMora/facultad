import type { LessonMedia, Question } from '../content/types';
import { ShortVideo, Walkthrough } from './Walkthrough';

/** Las pistas de la resolución se revelan después de la corrección. */
export function QuestionWalkthrough({ q, short }: { q: Question; short?: LessonMedia['shorts'][string] }) {
  return <>
    {q.scenes?.map((scene, i) => <Walkthrough key={i} scene={scene} title={q.prompt} />)}
    {short && <ShortVideo {...short} label="Ver la explicación en video" />}
  </>;
}
