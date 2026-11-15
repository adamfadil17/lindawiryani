# syntax=docker/dockerfile:1

# ── builder ───────────────────────────────────────────────────────────────────
FROM node:22-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
# postinstall runs `prisma generate`, but the schema is not copied yet: skip it here, run it below.
RUN npm ci --no-audit --no-fund --ignore-scripts

COPY . .
# prisma.config.ts reads DATABASE_URL, but `generate` never connects.
RUN DATABASE_URL=postgresql://build:build@localhost:5432/build npx prisma generate

# NEXT_PUBLIC_* values are inlined into the client bundle at build time, so they are build args.
# Real secrets are NOT passed here; the placeholders only let modules load while Next collects page data.
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY \
    NEXT_TELEMETRY_DISABLED=1 \
    DATABASE_URL=postgresql://build:build@localhost:5432/build \
    JWT_SECRET=build-only
RUN npm run build

# ── runner ────────────────────────────────────────────────────────────────────
# Keeps the full node_modules (not `output: "standalone"`): the entrypoint runs
# `prisma migrate deploy` and the seed, which need the prisma CLI and tsx.
FROM node:22-slim AS runner
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates wget && rm -rf /var/lib/apt/lists/*

# Runs as www-data (uid/gid 33). HOME points somewhere writable for npx/prisma caches.
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    UPLOADS_PATH=/data/uploads \
    HOME=/tmp

COPY --from=builder --chown=www-data:www-data /app/package.json /app/package-lock.json ./
COPY --from=builder --chown=www-data:www-data /app/node_modules ./node_modules
COPY --from=builder --chown=www-data:www-data /app/generated ./generated
COPY --from=builder --chown=www-data:www-data /app/.next ./.next
COPY --from=builder --chown=www-data:www-data /app/public ./public
COPY --from=builder --chown=www-data:www-data /app/prisma ./prisma
COPY --from=builder --chown=www-data:www-data /app/scripts ./scripts
COPY --from=builder --chown=www-data:www-data /app/prisma.config.ts /app/next.config.ts /app/tsconfig.json ./
# prisma/seed.ts imports from src/ via the `@/` alias, and next.config.ts points at src/i18n.
COPY --from=builder --chown=www-data:www-data /app/src ./src
COPY --chown=www-data:www-data docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && mkdir -p /data/uploads && chown -R www-data:www-data /data

USER www-data
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=5 CMD wget -qO- http://127.0.0.1:${PORT}/api/health >/dev/null || exit 1
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npx", "next", "start"]
