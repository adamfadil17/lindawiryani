#!/usr/bin/env bash
#
# Security smoke test (Phases 0–1) — see docs/task.md tasks 0.7 / 7.1 / 8.9.
#
# Usage:
#   bash scripts/smoke-security.sh
#   BASE_URL=https://staging.example.com bash scripts/smoke-security.sh
#   ADMIN_EMAIL=... ADMIN_PASSWORD=... bash scripts/smoke-security.sh
#
# Requirements: the app must be running (`npm run dev` or a deployed build)
# and `curl` must be available.
#
# Rate-limit counters live in process memory. Each run uses a random
# X-Real-IP so reruns don't poison each other locally. Behind nginx the real
# client IP is used (nginx overwrites the header in task 8.4), so rerunning
# within 15 minutes can show 429 earlier than expected.

set -uo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
SMOKE_IP="${SMOKE_IP:-198.51.100.$(( (RANDOM % 200) + 1 ))}"
ADMIN_EMAIL="${ADMIN_EMAIL:-}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-}"
CURL_TIMEOUT="${CURL_TIMEOUT:-15}"

PASS=0
FAIL=0
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT
BODY="$TMP_DIR/body"

pass() {
  PASS=$((PASS + 1))
  printf '  \033[32mPASS\033[0m %s\n' "$1"
}

fail() {
  FAIL=$((FAIL + 1))
  printf '  \033[31mFAIL\033[0m %s\n' "$1"
  printf '       expected HTTP %s, got %s\n' "$2" "$3"
  if [ -s "$BODY" ]; then
    printf '       body: %s\n' "$(head -c 300 "$BODY")"
  fi
}

request() {
  # $1 = HTTP method, the rest is passed to curl
  local method="$1"
  shift
  curl --silent --show-error --max-time "$CURL_TIMEOUT" \
    -o "$BODY" -w '%{http_code}' \
    -X "$method" -H "X-Real-IP: $SMOKE_IP" "$@"
}

expect_status() {
  local name="$1" want="$2" got="$3"
  if [ "$got" = "$want" ]; then
    pass "$name"
  else
    fail "$name" "$want" "$got"
  fi
}

echo "Security smoke test (Phases 0–1)"
echo "  base URL  : $BASE_URL"
echo "  client IP : $SMOKE_IP (X-Real-IP; nginx overwrites this in production)"
echo

echo "[1] Public registration is closed"
expect_status "POST /api/auth/register without auth → 401" 401 \
  "$(request POST "$BASE_URL/api/auth/register" \
    -H 'Content-Type: application/json' \
    -d '{"name":"Smoke Test","email":"smoke-attacker@example.com","password":"Passw0rd123","role":"admin"}')"

echo "[2] PII and internal endpoints require auth"
for path in \
  /api/inquiries \
  /api/submissions \
  /api/dashboard \
  /api/inquiries/badge \
  /api/destinations/filters \
  /api/portfolios/filters \
  /api/venues/filters \
  /api/wedding-themes/filters \
  /api/submissions/filters \
  /api/auth/me; do
  expect_status "GET $path → 401" 401 "$(request GET "$BASE_URL$path")"
done

expect_status "GET /api/inquiries/<uuid> → 401" 401 \
  "$(request GET "$BASE_URL/api/inquiries/00000000-0000-0000-0000-000000000000")"
expect_status "GET /api/submissions/<uuid> → 401" 401 \
  "$(request GET "$BASE_URL/api/submissions/00000000-0000-0000-0000-000000000000")"

echo "[2b] Mutating admin routes require auth"
for spec in \
  "POST /api/users" \
  "PATCH /api/users/00000000-0000-0000-0000-000000000000" \
  "DELETE /api/users/00000000-0000-0000-0000-000000000000" \
  "POST /api/destinations" \
  "PATCH /api/destinations/00000000-0000-0000-0000-000000000000" \
  "POST /api/venues" \
  "PATCH /api/wedding-experiences/00000000-0000-0000-0000-000000000000" \
  "PATCH /api/articles/00000000-0000-0000-0000-000000000000" \
  "PATCH /api/inquiries/00000000-0000-0000-0000-000000000000"; do
  method="${spec%% *}"
  path="${spec#* }"
  expect_status "$method $path without auth → 401" 401 \
    "$(request "$method" "$BASE_URL$path" -H 'Content-Type: application/json' -d '{}')"
done

echo "[3] JWT algorithm confusion is rejected"
# header {"alg":"none","typ":"JWT"} + admin payload + empty signature
NONE_TOKEN="eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VySWQiOiJ4IiwiZW1haWwiOiJ4Iiwicm9sZSI6ImFkbWluIn0."
expect_status "GET /api/dashboard with alg=none token → 401" 401 \
  "$(request GET "$BASE_URL/api/dashboard" -H "Authorization: Bearer $NONE_TOKEN")"

echo "[4] Login rejects bad credentials and throttles brute force"
expect_status "POST /api/auth/login (wrong password) → 401" 401 \
  "$(request POST "$BASE_URL/api/auth/login" \
    -H 'Content-Type: application/json' \
    -d '{"email":"smoke-nobody@example.com","password":"definitely-wrong"}')"

brute_status=""
for _ in 1 2 3 4 5 6 7 8; do
  brute_status="$(request POST "$BASE_URL/api/auth/login" \
    -H 'Content-Type: application/json' \
    -d '{"email":"smoke-brute@example.com","password":"definitely-wrong"}')"
done
expect_status "8× failed logins on the same IP+email → 429" 429 "$brute_status"

echo "[5] Public forms require reCAPTCHA"
expect_status "POST /api/inquiries without token → 400" 400 \
  "$(request POST "$BASE_URL/api/inquiries" \
    -H 'Content-Type: application/json' -d '{}')"
expect_status "POST /api/submissions without token → 400" 400 \
  "$(request POST "$BASE_URL/api/submissions" \
    -H 'Content-Type: application/json' -d '{"type":"vendor"}')"
expect_status "POST /api/send-email/contact without token → 400" 400 \
  "$(request POST "$BASE_URL/api/send-email/contact" \
    -H 'Content-Type: application/json' -d '{}')"
expect_status "POST /api/uploads without auth → 401" 401 \
  "$(request POST "$BASE_URL/api/uploads")"
expect_status "GET /uploads/<missing>.jpg → 404" 404 \
  "$(request GET "$BASE_URL/uploads/does-not-exist.jpg")"

echo "[6] CSRF origin check"
expect_status "POST /api/auth/logout with cross-site Origin → 403" 403 \
  "$(request POST "$BASE_URL/api/auth/logout" -H 'Origin: https://evil.example')"
expect_status "POST /api/auth/login with cross-site Origin → 403" 403 \
  "$(request POST "$BASE_URL/api/auth/login" \
    -H 'Origin: https://evil.example' \
    -H 'Content-Type: application/json' \
    -d '{"email":"smoke@example.com","password":"whatever"}')"
expect_status "POST /api/auth/logout with same-origin Origin → 200" 200 \
  "$(request POST "$BASE_URL/api/auth/logout" -H "Origin: $BASE_URL")"

echo "[8] Public content endpoints"
for path in \
  /api/destinations \
  /api/destinations/filters \
  /api/destination-categories \
  /api/wedding-experiences \
  /api/venues \
  /api/wedding-themes \
  /api/portfolios \
  /api/articles \
  /api/open-positions; do
  case "$path" in
    */filters) expected=401 ;;
    *) expected=200 ;;
  esac
  expect_status "GET $path → $expected" "$expected" "$(request GET "$BASE_URL$path")"
done

echo "[9] Protected pages redirect to login"
expect_status "GET /dashboard → 307" 307 "$(request GET "$BASE_URL/dashboard")"

if [ -n "$ADMIN_EMAIL" ] && [ -n "$ADMIN_PASSWORD" ]; then
  echo "[8] Authenticated access (admin, HttpOnly cookie)"
  JAR="$TMP_DIR/cookies.txt"
  HEADERS="$TMP_DIR/login.headers"

  login_status="$(curl --silent --show-error --max-time "$CURL_TIMEOUT" \
    -o "$BODY" -D "$HEADERS" -w '%{http_code}' \
    -X POST -H "X-Real-IP: $SMOKE_IP" -H 'Content-Type: application/json' \
    -c "$JAR" \
    -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" \
    "$BASE_URL/api/auth/login")"

  if [ "$login_status" = "200" ]; then
    pass "POST /api/auth/login (admin) → 200"

    if grep -qi '^set-cookie: token=' "$HEADERS" && grep -qi 'httponly' "$HEADERS"; then
      pass "login sets an HttpOnly session cookie"
    else
      FAIL=$((FAIL + 1))
      printf '  \033[31mFAIL\033[0m login sets an HttpOnly session cookie\n'
      printf '       set-cookie: %s\n' "$(grep -i '^set-cookie:' "$HEADERS" | head -n 1)"
    fi

    if grep -q '"token"' "$BODY"; then
      FAIL=$((FAIL + 1))
      printf '  \033[31mFAIL\033[0m login response body contains no token\n'
    else
      pass "login response body contains no token"
    fi

    expect_status "GET /api/dashboard (cookie) → 200" 200 \
      "$(request GET "$BASE_URL/api/dashboard" -b "$JAR")"
    expect_status "GET /api/inquiries (cookie) → 200" 200 \
      "$(request GET "$BASE_URL/api/inquiries" -b "$JAR")"
    expect_status "GET /api/inquiries/badge (cookie) → 200" 200 \
      "$(request GET "$BASE_URL/api/inquiries/badge" -b "$JAR")"
    expect_status "GET /api/submissions (cookie) → 200" 200 \
      "$(request GET "$BASE_URL/api/submissions" -b "$JAR")"
    expect_status "GET /api/users (cookie) → 200" 200 \
      "$(request GET "$BASE_URL/api/users" -b "$JAR")"

    echo "[10] Role matrix"
    SUFFIX="$(date +%s)-$$"
    USER_EMAIL="smoke-user-$SUFFIX@example.invalid"
    EDITOR_EMAIL="smoke-editor-$SUFFIX@example.invalid"
    ROLE_PASSWORD="Smoke-Role-Pass-2026"

    create_user() {
      request POST "$BASE_URL/api/users" -b "$JAR" \
        -H 'Content-Type: application/json' \
        -d "{\"name\":\"$1\",\"email\":\"$2\",\"password\":\"$ROLE_PASSWORD\",\"role\":\"$3\"}"
    }

    USER_STATUS="$(create_user "Smoke User" "$USER_EMAIL" "user")"
    USER_ID="$(grep -o '"id":"[^"]*"' "$BODY" | head -n 1 | cut -d'"' -f4)"
    expect_status "admin creates a user account → 201" 201 "$USER_STATUS"

    EDITOR_STATUS="$(create_user "Smoke Editor" "$EDITOR_EMAIL" "editor")"
    EDITOR_ID="$(grep -o '"id":"[^"]*"' "$BODY" | head -n 1 | cut -d'"' -f4)"
    expect_status "admin creates an editor account → 201" 201 "$EDITOR_STATUS"

    USER_JAR="$TMP_DIR/user-cookies.txt"
    EDITOR_JAR="$TMP_DIR/editor-cookies.txt"

    login_as() {
      curl --silent --show-error --max-time "$CURL_TIMEOUT" \
        -o "$BODY" -w '%{http_code}' \
        -X POST -H "X-Real-IP: $SMOKE_IP" -H 'Content-Type: application/json' \
        -c "$1" -d "{\"email\":\"$2\",\"password\":\"$ROLE_PASSWORD\"}" \
        "$BASE_URL/api/auth/login"
    }

    expect_status "user login → 200" 200 "$(login_as "$USER_JAR" "$USER_EMAIL")"
    expect_status "user cannot read the dashboard API → 403" 403 \
      "$(request GET "$BASE_URL/api/dashboard" -b "$USER_JAR")"
    expect_status "user cannot mutate content → 403" 403 \
      "$(request POST "$BASE_URL/api/destinations" -b "$USER_JAR" \
        -H 'Content-Type: application/json' -d '{}')"
    expect_status "user dashboard page redirects → 307" 307 \
      "$(request GET "$BASE_URL/dashboard" -b "$USER_JAR")"

    expect_status "editor login → 200" 200 "$(login_as "$EDITOR_JAR" "$EDITOR_EMAIL")"
    expect_status "editor can read the dashboard API → 200" 200 \
      "$(request GET "$BASE_URL/api/dashboard" -b "$EDITOR_JAR")"
    expect_status "editor passes auth, validation rejects empty body → 422" 422 \
      "$(request POST "$BASE_URL/api/destinations" -b "$EDITOR_JAR" \
        -H 'Content-Type: application/json' -d '{}')"
    expect_status "editor cannot delete content (admin only) → 403" 403 \
      "$(request DELETE "$BASE_URL/api/destinations/00000000-0000-0000-0000-000000000000" -b "$EDITOR_JAR")"

    if [ -n "$USER_ID" ]; then
      expect_status "cleanup user account → 204" 204 \
        "$(request DELETE "$BASE_URL/api/users/$USER_ID" -b "$JAR")"
    fi
    if [ -n "$EDITOR_ID" ]; then
      expect_status "cleanup editor account → 204" 204 \
        "$(request DELETE "$BASE_URL/api/users/$EDITOR_ID" -b "$JAR")"
    fi

    expect_status "POST /api/auth/logout (cookie) → 200" 200 \
      "$(request POST "$BASE_URL/api/auth/logout" -b "$JAR" -c "$JAR")"
    expect_status "GET /api/dashboard after logout → 401" 401 \
      "$(request GET "$BASE_URL/api/dashboard" -b "$JAR")"
  else
    fail "POST /api/auth/login (admin) → 200" 200 "$login_status"
  fi
else
  echo "[8] Skipped authenticated checks — set ADMIN_EMAIL and ADMIN_PASSWORD to enable"
fi

echo
echo "Manual checks for this phase:"
echo "  - login sets an HttpOnly cookie and the browser no longer stores a token"
echo "  - JWT_SECRET is set and (in production) at least 32 characters"
echo "  - the users table has no unexpected accounts (register used to be public)"
echo "  - the admin password is no longer the seeded Admin@123"
echo
echo "Result: $PASS passed, $FAIL failed"

[ "$FAIL" -eq 0 ] || exit 1
