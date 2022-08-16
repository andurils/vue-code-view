export function ensureStartingSlash(path: string): string {
  return /^\//.test(path) ? path : `/${path}`;
}
