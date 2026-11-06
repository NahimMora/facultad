import { useState } from 'react';
import { countdownLabel, daysUntil } from '../lib/dates';
import { keys, load, save } from '../lib/storage';

/** Fecha del examen cargada por el usuario (se guarda en este navegador) con cuenta regresiva. */
export function ExamDate({ subject, exam }: { subject: string; exam: string }) {
  const k = keys.examDate(subject, exam);
  const [date, setDate] = useState<string>(() => load(k, ''));
  const change = (v: string) => { setDate(v); save(k, v); };
  const d = date ? daysUntil(date) : null;
  return (
    <label className="examdate">
      <span>Fecha:</span>
      <input type="date" value={date} onChange={(e) => change(e.target.value)} />
      {d !== null ? <b className={d <= 3 && d >= 0 ? 'soon' : ''}>{countdownLabel(d)}</b> : <span className="hint">cargala cuando la sepas</span>}
    </label>
  );
}
