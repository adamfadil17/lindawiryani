/**
 * Returns a deep copy of `data` where every string value that has an exact
 * match in `dict` (English source string -> translation) is replaced.
 * Strings without an entry (ids, slugs, URLs, or not-yet-translated copy)
 * are left untouched, so untranslated content safely falls back to English.
 */
export function translateDeep<T>(data: T, dict: Record<string, string>): T {
  if (typeof data === "string") {
    return (Object.prototype.hasOwnProperty.call(dict, data)
      ? dict[data]
      : data) as unknown as T;
  }
  if (Array.isArray(data)) {
    return data.map((item) => translateDeep(item, dict)) as unknown as T;
  }
  if (data && typeof data === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      out[k] = translateDeep(v, dict);
    }
    return out as T;
  }
  return data;
}
