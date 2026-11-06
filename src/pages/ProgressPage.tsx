import { Link } from 'react-router-dom';
import { SUBJECTS, allModules } from '../content/subjects';
import { keys, load, moduleStates } from '../lib/storage';

function quizStats(subjectId: string, examIds: string[]) {
  let answered = 0;
  for (const e of examIds) answered += Object.keys(load<Record<string, unknown>>(keys.quiz(subjectId, e), {})).length;
  return answered;
}

export function ProgressPage() {
  return (
    <div className="page">
      <h1>Progreso</h1>
      <p className="hint">Se calcula con lo que marcás en cada materia. Se guarda en este navegador, en este dispositivo.</p>
      <div className="card tablewrap">
        <table className="prog">
          <thead><tr><th>Materia</th><th>Dominados</th><th>Vistos</th><th>Sin ver</th><th>Preguntas respondidas</th></tr></thead>
          <tbody>
            {SUBJECTS.map((s) => {
              const mods = allModules(s);
              const st = moduleStates(s.id);
              const dom = mods.filter((m) => st[m.id] === 2).length;
              const vis = mods.filter((m) => st[m.id] === 1).length;
              return (
                <tr key={s.id}>
                  <td><Link to={`/m/${s.id}`}>{s.icon} {s.short}</Link></td>
                  <td>{dom}</td><td>{vis}</td><td>{mods.length - dom - vis}</td>
                  <td>{quizStats(s.id, s.exams.map((e) => e.id))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
