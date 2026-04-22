# MarketPulse Intelligence — Marketing Website

Public-facing marketing site for MarketPulse Intelligence. Deploys to Railway from GitHub with zero configuration. Live at **marketpulseintelligence.io**.

## Stack

- Static HTML, CSS, and JS (no build step)
- Express static server with compression, helmet, and health check
- Railway-ready via `nixpacks.toml`

## Local Development

```bash
npm install
npm start
```

Then open <http://localhost:3000>.

## Deployment

Railway reads `nixpacks.toml`, installs dependencies, and runs `node server.js`. The server listens on `process.env.PORT` (Railway sets this automatically).

### Health check

`GET /healthz` returns `200 ok` — used by Railway uptime monitoring.

## Custom domain

Bound to `marketpulseintelligence.io` via Cloudflare. DNS: CNAME at root (via CNAME flattening) → Railway CNAME target. SSL mode: Full (strict).

## Structure

```
index.html        # Landing page
styles.css        # Compiled styles
script.js         # Page interactions
server.js         # Express static server
nixpacks.toml     # Railway build config
package.json      # Dependencies
```
