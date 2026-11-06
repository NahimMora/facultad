/** Días desde hoy hasta una fecha ISO (yyyy-mm-dd), en hora local. Negativo si ya pasó. */
export function daysUntil(iso: string, today = new Date()): number {
  const [y, m, d] = iso.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  const base = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((target.getTime() - base.getTime()) / 86_400_000);
}

export function countdownLabel(days: number): string {
  if (days < 0) return 'ya pasó';
  if (days === 0) return '¡es hoy!';
  if (days === 1) return 'mañana';
  return `faltan ${days} días`;
}
