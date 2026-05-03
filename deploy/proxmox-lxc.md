# Deploy to Proxmox LXC

A small unprivileged Debian 12 LXC is enough — this is a static SPA. Caddy
serves the built assets; no Node/Bun runtime is needed at runtime.

## 1. Create the container

From the Proxmox host:

```bash
pct create 200 local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst \
  --hostname frontend-showcase \
  --memory 256 \
  --cores 1 \
  --rootfs local-lvm:4 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --unprivileged 1 \
  --features nesting=1 \
  --start 1
```

Adjust storage names (`local-lvm`), bridge (`vmbr0`), and template path to
match your host.

## 2. Install build + serve dependencies

Inside the container (`pct enter 200`):

```bash
apt-get update && apt-get install -y curl unzip ca-certificates debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
apt-get update && apt-get install -y caddy

# Bun is only needed at build time. Install in /opt.
curl -fsSL https://bun.sh/install | BUN_INSTALL=/opt/bun bash
ln -s /opt/bun/bin/bun /usr/local/bin/bun
```

## 3. Build the SPA

```bash
git clone https://github.com/Logos-Flux/frontend-showcase.git /opt/frontend-showcase
cd /opt/frontend-showcase
bun install --frozen-lockfile
bun run build
```

The build output lands in `/opt/frontend-showcase/dist/`.

## 4. Wire Caddy to the build

```bash
install -m 644 /opt/frontend-showcase/Caddyfile /etc/caddy/Caddyfile
# Caddyfile expects the build at /srv — symlink so updates are atomic.
ln -sfn /opt/frontend-showcase/dist /srv
systemctl restart caddy
```

The default `Caddyfile` listens on `:8080`. To serve on `:80`/`:443` with
automatic HTTPS, replace the `:8080` block with your hostname:

```caddy
showcase.example.com {
    encode gzip
    root * /srv
    try_files {path} /index.html
    file_server
}
```

Open ports in the LXC firewall accordingly.

## 5. Updates

```bash
cd /opt/frontend-showcase
git pull
bun install --frozen-lockfile
bun run build
systemctl reload caddy   # symlink already points at dist/, no path change needed
```

## Resource notes

- **256 MB / 1 core / 4 GB disk** is enough for build + serve. Build peaks
  at ~400 MB transient — bump to 512 MB if you build inside the container
  with stricter memory pressure, or build elsewhere and `rsync` the
  `dist/` over.
- Static SPA → no outbound network at runtime. Egress can be locked down
  to apt/Cloudsmith repos at update time.
