#!/bin/bash
set -e

TIMESTAMP=$(date +%Y%m%d-%H%M%S)

echo "🚀 Deploying voloma-landing:$TIMESTAMP..."

# Tag image
docker tag voloma-site:latest voloma-landing:$TIMESTAMP

# Stop and remove old container
echo "⏹️  Stopping old container..."
docker stop voloma-landing 2>/dev/null || true
docker rm voloma-landing 2>/dev/null || true

# Start new container
echo "▶️  Starting new container..."
docker run -d \
  --name voloma-landing \
  --network web_proxy \
  --restart unless-stopped \
  voloma-landing:$TIMESTAMP

# Reload Caddy
echo "🔄 Reloading Caddy..."
docker exec global-proxy caddy reload --config /etc/caddy/Caddyfile

echo "✅ Deployed as voloma-landing:$TIMESTAMP"
echo "🌐 Check: https://voloma.94.140.224.220.sslip.io"
