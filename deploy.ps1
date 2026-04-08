# Deploy script for Voloma site
# Usage: .\deploy.ps1

$ErrorActionPreference = "Stop"

Write-Host "=== Voloma Site Deployment ===" -ForegroundColor Cyan

# 1. Build Docker image locally
Write-Host "`n[1/4] Building Docker image..." -ForegroundColor Yellow
docker build -t voloma-site .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker build failed!" -ForegroundColor Red
    exit 1
}

# 2. Create deploy archive
Write-Host "`n[2/4] Creating deploy archive..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$archiveName = "voloma-deploy-$timestamp.tar"
docker save voloma-site -o $archiveName

# 3. Transfer to server
Write-Host "`n[3/4] Transferring to server..." -ForegroundColor Yellow
scp $archiveName "matveyrl-1@192.168.28.90:~/voloma-deploy-latest.tar"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Transfer failed!" -ForegroundColor Red
    exit 1
}

# 4. Deploy on server
Write-Host "`n[4/4] Deploying on server..." -ForegroundColor Yellow
$deployScript = @"
# Load new image
docker load -i ~/voloma-deploy-latest.tar

# Tag with timestamp
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
docker tag voloma-site:latest voloma-landing:\$TIMESTAMP

# Stop old container
docker stop voloma-landing 2>/dev/null || true
docker rm voloma-landing 2>/dev/null || true

# Start new container
docker run -d \
  --name voloma-landing \
  --network web_proxy \
  --restart unless-stopped \
  voloma-landing:\$TIMESTAMP

# Reload Caddy
docker exec global-proxy caddy reload --config /etc/caddy/Caddyfile

# Cleanup
docker image prune -f --filter "label=voloma=true"
rm ~/voloma-deploy-latest.tar

echo "✅ Deployed as voloma-landing:\$TIMESTAMP"
"@

ssh matveyrl-1@192.168.28.90 $deployScript

# Cleanup local archive
Remove-Item $archiveName -Force

Write-Host "`n=== Deployment Complete! ===" -ForegroundColor Green
Write-Host "Check: https://voloma.94.140.224.220.sslip.io" -ForegroundColor Cyan
