/** localStorage con try/catch: en modo privado o sin almacenamiento la app sigue funcionando. */
const PREFIX = 'fac-';

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* sin almacenamiento */
  }
}

export const keys = {
  quiz: (subject: string, scope: string) => `quiz-${subject}-${scope}`,
  modules: (subject: string) => `mod-${subject}`,
  examDate: (subject: string, exam: string) => `date-${subject}-${exam}`,
};

/** Estado de estudio de un módulo: 0 sin ver, 1 visto, 2 dominado. */
export type ModState = 0 | 1 | 2;

export function moduleStates(subject: string): Record<string, ModState> {
  return load<Record<string, ModState>>(keys.modules(subject), {});
}
