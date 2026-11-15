# Deploying to a Linux server

Branch `main` goes to production and branch `beta-lindawiryani` goes to beta. Each push triggers
`.github/workflows/deploy.yml`. It runs tsc, lint and build on GitHub. If those pass, it sends the
source over SSH to the server, where `deploy.sh` runs `docker compose up -d --build`. If the build
or the health check (`/api/health`) fails, the previous release is restored.

## One-time server setup (Ubuntu/Debian, as root)

1. Install Docker (with the compose plugin), nginx, certbot and apache2-utils.
2. Create the folders and copy the scripts:
   ```
   mkdir -p /opt/lindawiryani/{bin,env,backups}
   scp deploy/bin/*.sh root@SERVER:/opt/lindawiryani/bin/ && chmod +x /opt/lindawiryani/bin/*.sh
   cp deploy/env/app.env /opt/lindawiryani/env/app.env   # fill in every value
   chmod 600 /opt/lindawiryani/env/app.env
   ```
3. Create a deploy key on your laptop (`ssh-keygen -t ed25519 -f lw_deploy`) and add the public key
   to `/root/.ssh/authorized_keys` as a forced command, so CI can only run `deploy main|beta`:
   ```
   command="/opt/lindawiryani/bin/deploy-gate.sh",no-pty,no-port-forwarding,no-agent-forwarding,no-X11-forwarding ssh-ed25519 AAAA... ci
   ```
4. In the GitHub repo, add these secrets (Settings -> Secrets -> Actions):
   - `DEPLOY_HOST`: `root@SERVER_IP`
   - `DEPLOY_SSH_KEY`: contents of the private key `lw_deploy`
   - `DEPLOY_KNOWN_HOSTS`: output of `ssh-keyscan -t ed25519 SERVER_IP`
5. nginx: copy `config-sites.conf` to `/etc/nginx/sites-available/lindawiryani-app`, 
   get the certificate (`mkdir -p /var/www/certbot && certbot certonly --webroot -w /var/www/certbot -d beta.lindawiryani.com`),
   create the beta password (`htpasswd -c /etc/nginx/.htpasswd-lindawiryani-beta team`), then
   `nginx -t && systemctl reload nginx`.
6. First deploy: set `SEED_ON_START=true` and `SEED_ADMIN_PASSWORD` in `app.env`, push to `main`,
   then remove both lines and run `/opt/lindawiryani/bin/apply-env.sh main`. Deploy beta after main.
7. Optional: install `systemd/*.service` (named `-main` and `-beta` because an older `app-lindawiryani` unit already runs the temp dashboard site) (start on boot), `bin/backup-db.sh` as
   `/etc/cron.daily/lindawiryani-db-backup`, and `bin/cron-cleanup.sh` in cron for the weekly
   orphaned-upload cleanup.

Data lives in docker volumes (`pgdata`, `uploads`), so deploys never touch it. Back up the
`lindawiryani_uploads` volume as well as the database dumps.

## Operations

- Roll back: `/opt/lindawiryani/bin/rollback.sh main [stamp]`
- Change a runtime variable: edit `app.env`, then `/opt/lindawiryani/bin/apply-env.sh`. The reCAPTCHA
  site key is compiled into the build, so changing it needs a real deploy.
- Logs: `docker logs -f lindawiryani-app`
