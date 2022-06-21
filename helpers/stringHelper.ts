export function uniqueStr(s: string, isPlain = true) {
  const now = new Date().getTime();
  return isPlain ? `${s}${now}` : `${s} (${now})`;
}

export function uniqueEmail(s: string) {
  const now = new Date().getTime();
  return  `${s}${now}@example.com`;
}

export function getCurrentDate() {
  var now = new Date();
    return now.toISOString().slice(0, 10)
}
