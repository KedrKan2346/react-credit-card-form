// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumber(value: any): boolean {
  if (value === null || typeof value === 'undefined') {
    return false;
  }

  // isFinite is used to exclude `Infinity`, `-Infinity`, and `NaN`, which are classified as numbers
  return !isNaN(parseFloat(value)) && isFinite(value);
}
