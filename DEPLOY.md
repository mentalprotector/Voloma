# Voloma Site - Deployment Guide

## Server Info
- **Host**: `192.168.28.90` (SSH: `matveyrl-1@192.168.28.90`)
- **Public IP**: `94.140.224.220`
- **URL**: https://voloma.94.140.224.220.sslip.io

## Architecture
```
Internet
  ↓
Caddy (global-proxy container)
  ↓ reverse proxy
voloma-landing:3000 (Docker container on web_proxy network)
```

## Quick Deploy (PowerShell)
```powershell
.\deploy.ps1
```

This will:
1. Build Docker image locally
2. Save and transfer to server
3. Replace old container
4. Reload Caddy

## Manual Deploy
```powershell
# 1. Build
docker build -t voloma-site .

# 2. Transfer
docker save voloma-site | ssh matveyrl-1@192.168.28.90 docker load

# 3. SSH to server
ssh matveyrl-1@192.168.28.90

# 4. Deploy
docker stop voloma-landing && docker rm voloma-landing
docker run -d --name voloma-landing --network web_proxy --restart unless-stopped voloma-site:latest
docker exec global-proxy caddy reload --config /etc/caddy/Caddyfile
```

## Caddy Config
Located on server: `~/fitnessapp/docker/conf.d/voloma.caddy`
```
voloma.94.140.224.220.sslip.io {
    reverse_proxy voloma-landing:3000
}
```

## Useful Commands
```bash
# Check logs
ssh matveyrl-1@192.168.28.90 "docker logs -f voloma-landing"

# Check status
ssh matveyrl-1@192.168.28.90 "docker ps | grep voloma"

# Restart
ssh matveyrl-1@192.168.28.90 "docker restart voloma-landing"

# Shell into container
ssh matveyrl-1@192.168.28.90 "docker exec -it voloma-landing sh"
```
