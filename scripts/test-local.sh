#!/usr/bin/env bash
# Smoke-test the app locally: install deps, set up the DB, boot `next dev`,
# and hit the key routes to make sure nothing is broken.
set -uo pipefail

cd "$(dirname "$0")/.."

PORT="${PORT:-3000}"
BASE_URL="http://localhost:${PORT}"
SERVER_LOG="$(mktemp -t hello-icons-dev.XXXXXX.log)"
SERVER_PID=""
FAILED=0

cleanup() {
  if [[ -n "$SERVER_PID" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null
    wait "$SERVER_PID" 2>/dev/null
  fi
}
trap cleanup EXIT

pass() { echo "  PASS  $1"; }
fail() { echo "  FAIL  $1"; FAILED=1; }

echo "== Setup =="

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "  created .env from .env.example"
fi

if [[ ! -d node_modules ]]; then
  echo "  installing dependencies..."
  npm install || { echo "npm install failed"; exit 1; }
fi

echo "  applying prisma migrations + seed..."
npx prisma migrate deploy >>"$SERVER_LOG" 2>&1 || { echo "prisma migrate deploy failed (see $SERVER_LOG)"; exit 1; }
npx prisma db seed >>"$SERVER_LOG" 2>&1 || { echo "prisma db seed failed (see $SERVER_LOG)"; exit 1; }

echo
echo "== Static checks =="

if npx tsc --noEmit; then pass "typecheck (tsc --noEmit)"; else fail "typecheck (tsc --noEmit)"; fi
if npm run lint --silent; then pass "lint"; else fail "lint"; fi

echo
echo "== Starting dev server =="

npm run dev -- --port "$PORT" >"$SERVER_LOG" 2>&1 &
SERVER_PID=$!

echo "  waiting for ${BASE_URL} (pid ${SERVER_PID})..."
READY=0
for _ in $(seq 1 60); do
  if curl -s -o /dev/null "$BASE_URL"; then
    READY=1
    break
  fi
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "server process died early, log:"
    cat "$SERVER_LOG"
    exit 1
  fi
  sleep 1
done

if [[ "$READY" -ne 1 ]]; then
  echo "server never became ready, log:"
  cat "$SERVER_LOG"
  exit 1
fi

echo
echo "== Route smoke tests =="

check_status() {
  local path="$1" expected="$2" desc="$3" extra_args=("${@:4}")
  local status
  status=$(curl -s -o /dev/null -w "%{http_code}" "${extra_args[@]+"${extra_args[@]}"}" "${BASE_URL}${path}")
  if [[ "$status" == "$expected" ]]; then
    pass "$desc -> $status"
  else
    fail "$desc -> got $status, expected $expected"
  fi
}

check_status "/" 200 "GET /"
check_status "/icons" 200 "GET /icons"
check_status "/categories" 200 "GET /categories"
check_status "/login" 200 "GET /login"
check_status "/admin" 307 "GET /admin (redirect to /login without session)" -A "curl-test" --max-redirs 0
check_status "/this-route-does-not-exist" 404 "GET /this-route-does-not-exist"

echo
if [[ "$FAILED" -eq 0 ]]; then
  echo "All checks passed."
else
  echo "Some checks failed. Full server log: $SERVER_LOG"
fi

exit "$FAILED"
