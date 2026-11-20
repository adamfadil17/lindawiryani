/**
 * Server-side reCAPTCHA v2 verification.
 *
 * Fails closed: a missing secret or token, a network error, or a non-2xx
 * response all count as "not verified". Used by the public inquiry/submission
 * endpoints and the three email routes.
 */
export async function verifyRecaptcha(
  token: string | null | undefined,
): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("[recaptcha] RECAPTCHA_SECRET_KEY is not set");
    return false;
  }

  if (!token) return false;

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: secretKey, response: token }).toString(),
        signal: AbortSignal.timeout(5_000),
      },
    );

    if (!response.ok) {
      console.error("[recaptcha] siteverify returned HTTP", response.status);
      return false;
    }

    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("[recaptcha] verification error:", error);
    return false;
  }
}

/** Reads `recaptchaToken` out of an unknown JSON body safely. */
export function getRecaptchaToken(body: unknown): string | null {
  if (typeof body !== "object" || body === null) return null;
  const token = (body as Record<string, unknown>).recaptchaToken;
  return typeof token === "string" && token.length > 0 ? token : null;
}
