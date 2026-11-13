import { useState } from 'react';
import type { Question, Subject } from '../content/types';
import { allModules } from '../content/subjects';
import { Quiz } from './Quiz';

export function SelfAssessments({ subject, examId, items }: { subject: Subject; examId: string; items: Question[] }) {
  const [module, setModule] = useState('all');
  const modules = allModules(subject).filter(m => items.some(q => q.module === m.id));
  const selected = module === 'all' ? items : items.filter(q => q.module === module);
  return <section className="self-assessments">
    <h2>Solo autoevaluaciones</h2>
    <p>Practicá las {items.length} preguntas de las autoevaluaciones de la cátedra, adaptadas con palabras propias. Respondé y revisá la explicación antes de avanzar.</p>
    <p className="hint">Las respuestas se explican con los apuntes; no son una resolución oficial. Tu avance se guarda aparte de la práctica general.</p>
    <div className="exam-pick" role="group" aria-label="Filtrar autoevaluaciones por módulo">
      <button className={`pill ${module === 'all' ? 'on' : ''}`} aria-pressed={module === 'all'} onClick={() => setModule('all')}>Todas ({items.length})</button>
      {modules.map(m => <button key={m.id} className={`pill ${module === m.id ? 'on' : ''}`} aria-pressed={module === m.id} onClick={() => setModule(m.id)}>{m.label} ({items.filter(q => q.module === m.id).length})</button>)}
    </div>
    {module !== 'all' && <p className="hint">{modules.find(m => m.id === module)?.title}</p>}
    <Quiz key={`${examId}-${module}`} storageKey={`self-assessments-${subject.id}-${examId}`} items={selected} tagOf={q => modules.find(m => m.id === q.module)?.label} oneAtATime />
  </section>;
}
