import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV === "development";

/**
 * Task 1.6 — security headers.
 *
 * CSP notes:
 * - `'unsafe-inline'` is required for Next.js hydration bootstrap and Tailwind
 *   style injection; switching to nonces requires threading a nonce through
 *   middleware and every script tag.
 * - `'unsafe-eval'` is only added in development (React Fast Refresh).
 * - reCAPTCHA v2 needs scripts/frames from google.com/gstatic.com; Cloudinary
 *   serves images/video. Exchange rates are proxied by /api/exchange-rate, so
 *   the browser never calls the third-party rate API directly.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${
    isDev ? " 'unsafe-eval'" : ""
  } https://www.google.com https://www.gstatic.com https://www.recaptcha.net`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://res.cloudinary.com https://placehold.net https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws:" : ""} https://www.google.com https://www.recaptcha.net https://res.cloudinary.com`,
  "media-src 'self' blob: https://res.cloudinary.com",
  "frame-src https://www.google.com https://www.recaptcha.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // HSTS is only meaningful over HTTPS; harmless in local HTTP development.
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ]),
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "placehold.net",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
