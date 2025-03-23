export const toNumberSafe = (value: unknown, fallback = 0): number => {
  const n = Number(value);
  return isNaN(n) ? fallback : n;
}
