export const getParsedQueryGridNum = (value: unknown, fb = 0): number => {
  const n = Number(value);
  return (isNaN(n) && n < 1) ? fb : n;
}
