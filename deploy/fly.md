# Deploy to Fly.io

The repo ships with a `Dockerfile`, `Caddyfile`, and `fly.toml.example`.

## 1. Install flyctl

```bash
curl -L https://fly.io/install.sh | sh
fly auth login
```

## 2. Create the app + config

```bash
cp fly.toml.example fly.toml
# Replace <your-app-name> with the slug you want (must be globally unique on Fly).
sed -i 's/<your-app-name>/my-showcase/' fly.toml

flyctl apps create my-showcase --org personal
```

## 3. Deploy

```bash
flyctl deploy
```

The first deploy provisions a machine in `iad` (Ashburn) on a 256 MB shared
CPU. Auto-stop is on, so the machine sleeps after a period of no traffic
and cold-starts on the next request.

## 4. Custom domain (optional)

```bash
flyctl certs add showcase.example.com
# Add a CNAME at your DNS provider:
#   showcase.example.com  CNAME  my-showcase.fly.dev
flyctl certs show showcase.example.com   # poll until status: Issued
```

If your DNS sits behind Cloudflare, the cert must be issued with the record
set to **DNS-only (gray cloud)** so Fly's TLS-ALPN-01 challenge can reach
the origin. Flip back to Proxied once issuance is `Issued`. Renewal works
through Cloudflare proxying.

## 5. Updates

```bash
flyctl deploy
```

Auto-deploy from GitHub Actions: add `FLY_API_TOKEN` to repo secrets and
use `superfly/flyctl-actions/setup-flyctl@master` + `flyctl deploy
--remote-only` in your workflow.

## Costs

A scale-to-zero static SPA on a 256 MB shared CPU costs effectively
nothing on Fly's free allowance for low-traffic sites. Bandwidth and
machine-second pricing apply above the included tier — see
<https://fly.io/docs/about/pricing/>.
