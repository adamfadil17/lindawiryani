#!/bin/bash
# Install at /opt/lindawiryani/bin/cron-cleanup.sh (chmod 755) and schedule it, e.g. weekly:
#   0 4 * * 0 /opt/lindawiryani/bin/cron-cleanup.sh >> /var/log/lindawiryani-cleanup.log 2>&1
#
# Deletes uploaded images no database row references (uploads picked but never saved, or replaced
# later). Files younger than 24h are never touched. Both sites share one database and one uploads
# volume, so this runs once, inside the main container.
set -euo pipefail
docker exec lindawiryani-app npx tsx scripts/cleanup-uploads.ts --apply --min-age-hours=24
