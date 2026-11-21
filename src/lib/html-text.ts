const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

/**
 * Converts stored TipTap HTML into a single plain-text string for previews.
 * This is intentionally a small, dependency-free helper: cards should never
 * render rich HTML, only a truncated text summary.
 */
export function htmlToPlainText(value: string | null | undefined): string {
  if (!value) return "";

  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|div|li|h[1-6]|blockquote)\s*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => {
      try {
        return String.fromCodePoint(Number.parseInt(hex, 16));
      } catch {
        return " ";
      }
    })
    .replace(/&#(\d+);/g, (_, code: string) => {
      try {
        return String.fromCodePoint(Number.parseInt(code, 10));
      } catch {
        return " ";
      }
    })
    .replace(/&([a-z]+);/gi, (match, name: string) =>
      NAMED_ENTITIES[name.toLowerCase()] ?? match,
    )
    .replace(/\s+/g, " ")
    .trim();
}
