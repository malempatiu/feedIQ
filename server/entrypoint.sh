#!/bin/sh

# Try to make the script executable if the host mount removed +x
chmod +x "$0" 2>/dev/null || true

set -e

DB_HOST=${POSTGRES_HOST:-db}
DB_PORT=${POSTGRES_PORT:-5432}
RETRIES=${DB_RETRIES:-30}
SLEEP=${DB_SLEEP:-2}

wait_for_db() {
  printf "Waiting for DB %s:%s (max %s retries)...\n" "$DB_HOST" "$DB_PORT" "$RETRIES"
  i=0
  while [ "$i" -lt "$RETRIES" ]; do
    # use python socket to test TCP connectivity (works in this image)
    python - <<PY
import socket, sys
h = "$DB_HOST"
p = int("$DB_PORT")
s = socket.socket()
s.settimeout(1.0)
try:
    s.connect((h, p))
    s.close()
    sys.exit(0)
except Exception:
    sys.exit(1)
PY
    if [ $? -eq 0 ]; then
      printf "Database is available\n"
      return 0
    fi
    i=$((i+1))
    printf "DB not available, retry %s/%s; sleeping %s seconds...\n" "$i" "$RETRIES" "$SLEEP"
    sleep "$SLEEP"
  done
  printf "Database did not become available after %s retries\n" "$RETRIES" >&2
  return 1
}

wait_for_db || exit 1

printf "Running alembic migrations...\n"
alembic upgrade head

printf "Migrations complete, starting application...\n"

exec fastapi run src/main.py --port 8000 --reload
