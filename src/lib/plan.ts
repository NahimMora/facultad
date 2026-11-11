/** Fechas reales del calendario; nunca se completa una fecha desconocida. */
export function isISODate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1000 || month < 1 || month > 12 || day < 1 || day > 31) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function topicChecks(value: unknown): Record<string, boolean> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([, checked]) => typeof checked === 'boolean'));
}

/** Los empates conservan el orden original; las fechas inválidas quedan al final. */
export function byExamDate<T extends { id: string }>(subjects: readonly T[], dates: Record<string, string>): T[] {
  return [...subjects].sort((a, b) => {
    const x = isISODate(dates[a.id]) ? dates[a.id] : '';
    const y = isISODate(dates[b.id]) ? dates[b.id] : '';
    if (!x) return y ? 1 : 0;
    if (!y) return -1;
    return x.localeCompare(y);
  });
}

export function dateLabel(date: string) {
  return isISODate(date) ? `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}` : 'A confirmar';
}
