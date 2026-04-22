/**
 * MarketPulse Intelligence marketing site
 * Minimal Express static server for Railway deployment.
 */
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers (production-grade defaults).
// CSP is permissive enough for inline styles/scripts the site uses;
// tighten later once we audit every inline block.
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'"],
        "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
        "img-src": ["'self'", "data:", "https:"],
        "connect-src": ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(compression());

// Cache static assets aggressively, but always revalidate HTML
app.use(
  express.static(path.join(__dirname), {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  })
);

// Health check for Railway
app.get('/healthz', (_req, res) => res.status(200).send('ok'));

// SPA fallback — every unknown route serves index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MarketPulse marketing site listening on 0.0.0.0:${PORT}`);
});
