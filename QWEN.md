## Qwen Added Memories
- Voloma site deployment procedure:
- Server: SSH matveyrl-1@192.168.28.90, public URL https://voloma.94.140.224.220.sslip.io
- Container: voloma-landing (port 3000) on Docker network web_proxy, proxied by global-proxy (Caddy)
- Source on server: ~/voloma-current/
- Deploy steps: 1) git add -A && git commit && git push  2) tar czf voloma-deploy.tar.gz --exclude=node_modules --exclude=.next --exclude=.git --exclude=voloma-deploy.tar.gz .  3) scp voloma-deploy.tar.gz matveyrl-1@192.168.28.90:~/voloma-deploy.tar.gz  4) ssh matveyrl-1@192.168.28.90 "cd ~/voloma-current && rm -rf src components config content data lib types public deploy-remote.sh Dockerfile .dockerignore next.config.ts next-env.d.ts tsconfig.json package.json package-lock.json eslint.config.mjs README.md && cd ~ && tar xzf voloma-deploy.tar.gz -C ~/voloma-current/ && cd ~/voloma-current && docker build -t voloma-site ."  5) ssh matveyrl-1@192.168.28.90 "cd ~/voloma-current && bash deploy-remote.sh"
- Deploy script on server: ~/voloma-current/deploy-remote.sh (tags image, restarts container, reloads Caddy)
- Dockerfile uses Next.js standalone output (node:22-alpine, multi-stage build)
- Local machine (win32) has no Docker, rsync — deploy always done via SSH to server
- When user adds photos for узкие (narrow-S, narrow-M, narrow-L) variants, I need to: 1) Place originals in the appropriate originals/ folders, 2) Run node scripts/convert-gallery.js to generate WebP, 3) Add new product variants to src/data/product-variants.ts with getGalleryImages calls for each narrow size/finish combination (similar to how square and rect were done).
