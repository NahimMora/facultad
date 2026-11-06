/** Mezcla determinística por semilla: el orden de opciones es estable entre visitas. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function shuffledIndices(n: number, seed: string): number[] {
  const idx = Array.from({ length: n }, (_, i) => i);
  let x = hash(seed) || 1;
  for (let i = n - 1; i > 0; i--) {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5; x >>>= 0;
    const j = x % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}
