# Voloma Deploy Cheatsheet

## Quick deploy (just say to Qwen)
> "задеплой" / "deploy" / "обнови сайт"

## Manual steps
```powershell
# 1. Commit & push
git add -A && git commit -m "message" && git push

# 2. Build archive (no node_modules, .next, .git)
tar czf voloma-deploy.tar.gz --exclude=node_modules --exclude=.next --exclude=.git --exclude=voloma-deploy.tar.gz .

# 3. Upload to server
scp voloma-deploy.tar.gz matveyrl-1@192.168.28.90:~/voloma-deploy.tar.gz

# 4. Replace files + build Docker on server
ssh matveyrl-1@192.168.28.90 "cd ~/voloma-current && rm -rf src components config content data lib types public deploy-remote.sh Dockerfile .dockerignore next.config.ts next-env.d.ts tsconfig.json package.json package-lock.json eslint.config.mjs README.md && cd ~ && tar xzf voloma-deploy.tar.gz -C ~/voloma-current/ && cd ~/voloma-current && docker build -t voloma-site ."

# 5. Restart container
ssh matveyrl-1@192.168.28.90 "cd ~/voloma-current && bash deploy-remote.sh"
```

## Useful commands
```bash
# Check container status
ssh matveyrl-1@192.168.28.90 "docker ps --filter name=voloma"

# View logs
ssh matveyrl-1@192.168.28.90 "docker logs -f voloma-landing"

# Restart only (no rebuild)
ssh matveyrl-1@192.168.28.90 "docker restart voloma-landing"

# Shell into container
ssh matveyrl-1@192.168.28.90 "docker exec -it voloma-landing sh"
```

## Server info
- **SSH**: matveyrl-1@192.168.28.90
- **URL**: https://voloma.94.140.224.220.sslip.io
- **Sources**: ~/voloma-current/
- **Container**: voloma-landing (Next.js, port 3000)
- **Proxy**: Caddy (global-proxy container)
