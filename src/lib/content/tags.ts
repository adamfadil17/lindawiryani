/** Single cache tag for all public content (single-instance Next cache on the VPS). */
export const CONTENT_TAG = "public-content";

/** Call from every admin content mutation after the DB write. */
export async function revalidatePublicContent(): Promise<void> {
  const { revalidateTag } = await import("next/cache");
  revalidateTag(CONTENT_TAG);
}
