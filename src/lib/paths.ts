/** Public assets need the repository base path on GitHub Pages. */
export function assetPath(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
