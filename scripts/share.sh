#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-4173}"

echo "Building production bundle..."
npm run build

echo "Starting preview server on http://127.0.0.1:${PORT} ..."
npm run preview -- --host 127.0.0.1 --port "${PORT}" --strictPort &
PREVIEW_PID=$!

cleanup() {
  kill "${PREVIEW_PID}" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

for _ in {1..40}; do
  if curl -s "http://127.0.0.1:${PORT}" >/dev/null 2>&1; then
    break
  fi
  sleep 0.25
done

if ! curl -s "http://127.0.0.1:${PORT}" >/dev/null 2>&1; then
  echo "Preview server did not become ready on port ${PORT}."
  echo "Close any process using that port and run: npm run share -- ${PORT}"
  exit 1
fi

echo "Starting ngrok tunnel..."
echo "Use Ctrl+C to stop both ngrok and preview."
npx ngrok http "${PORT}"
