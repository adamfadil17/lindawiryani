# Uploads on the Contabo VPS

Local disk storage replaces Cloudinary for new uploads. Existing content that
still points at `res.cloudinary.com` keeps working (Next.js `remotePatterns`
and the CSP still allow it).

## How it works

```
Admin browser
  │  multipart/form-data (file)
  ▼
POST /api/uploads                (session cookie + admin/editor role + CSRF)
  │  size check → magic-byte check → UUID filename → atomic write
  ▼
$UPLOAD_DIR/YYYY/MM/<uuid>.jpg  (outside the repo)
  │
  ├─ production: nginx `location /uploads/` alias  →  https://site/uploads/...
  └─ dev/fallback: src/app/uploads/[...path]/route.ts
```

The API returns `{ data: { url: "/uploads/2026/11/<uuid>.jpg", bytes, contentType } }`.
Forms store that URL in the existing `image` / `url` columns.

## Environment

```dotenv
# Local development
UPLOAD_DIR="./uploads"
UPLOAD_URL_BASE="/uploads"
MAX_UPLOAD_SIZE_MB="5"

# Production
UPLOAD_DIR="/var/lib/lindawiryani/uploads"
UPLOAD_URL_BASE="/uploads"
MAX_UPLOAD_SIZE_MB="5"
```

`UPLOAD_URL_BASE` is root-relative, so `img-src 'self'` in the CSP already
covers it. `UPLOAD_DIR` is resolved with `path.resolve()`, and it must be an
absolute path in production.

## Local development

Nothing to do: the API creates `./uploads/YYYY/MM/` on the first upload, the
`/uploads/...` route serves the file, and `uploads/` is git-ignored.

## One-time server setup (Ubuntu LTS, app user `lindawiryani`)

```bash
sudo install -d -m 755 -o lindawiryani -g lindawiryani /var/lib/lindawiryani/uploads
sudo -u lindawiryani test -w /var/lib/lindawiryani/uploads && echo "writable"
```

Files are written `0644` inside `0755` directories. nginx (`www-data`) only
needs read/traverse permissions, which this provides.

Keep the directory **outside** the release directory (e.g. `/var/www/app/current`)
so `deploy.sh` and rollbacks never remove user media.

## nginx

Add to the `server { ... }` block (or `http`/`server` as appropriate):

```nginx
# Allow 5 MB images + multipart overhead. Must be >= MAX_UPLOAD_SIZE_MB.
client_max_body_size 8m;

location /uploads/ {
    alias /var/lib/lindawiryani/uploads/;
    access_log off;
    autoindex off;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header X-Content-Type-Options nosniff always;
}
```

Notes:

- Do not add `try_files` to an `alias` location; nginx already returns 404 for
  missing files.
- Never configure nginx to execute anything under `/uploads`.
- If you later put a CDN/bucket in front, change `UPLOAD_URL_BASE` and the
  serving layer only; the app code stays the same.
- `src/app/uploads/[...path]/route.ts` remains as a fallback (useful for dev
  and for `next start` without nginx).

Reload nginx after editing:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Backups

Include the uploads directory in the nightly job and test a restore:

```bash
# nightly
tar -czf /var/backups/lindawiryani/uploads-$(date +%F).tar.gz \
  -C /var/lib/lindawiryani uploads

# restore test
mkdir -p /tmp/restore-test
tar -xzf /var/backups/lindawiryani/uploads-YYYY-MM-DD.tar.gz -C /tmp/restore-test
```

Copy the archive off the VPS (object storage or another host) together with the
`pg_dump`. Media and database backups must be kept in sync: a database row can
reference an image file, so restore both from the same point in time.

## Disk sizing

Worst case per image = `MAX_UPLOAD_SIZE_MB` (default 5 MB). A gallery-heavy
site with ~2,000 images is roughly 10 GB. Monitor `df -h` (task 8.8) and prune
orphaned files if needed (an admin-only delete endpoint can be added later).

## Security properties

- Admin/editor session required; the global CSRF Origin check also applies.
- 60 uploads/minute per IP.
- Real type verified from magic bytes (JPEG `FF D8 FF`, PNG signature,
  `RIFF....WEBP`); the client MIME type and filename are ignored.
- 5 MB cap enforced before and after reading the body.
- Filename is a server-generated UUID; no user-controlled path or extension.
- Served files are read-only, `nosniff`, and cached immutably.
- SVG/HTML/JS uploads are rejected, so `/uploads` cannot host executable
  content.

## Troubleshooting

| Symptom | Cause |
|---|---|
| `500` on upload | `UPLOAD_DIR` missing or not writable by the app user |
| `413` from nginx | `client_max_body_size` is smaller than the image |
| `404` on `/uploads/...` | nginx `alias` path wrong, or file was written to a different `UPLOAD_DIR` |
| Images disappear after deploy | `UPLOAD_DIR` is inside the release directory or was replaced by `deploy.sh` |
