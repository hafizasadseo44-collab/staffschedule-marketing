const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// CRITICAL: Force production mode. Dev mode causes 3-5x more CPU/RAM usage.
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOSTNAME || '0.0.0.0';

if (dev) {
  console.warn('[WARN] Running in DEVELOPMENT mode — switch to production for Hostinger!');
}

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port} [${process.env.NODE_ENV}]`);
  });
}).catch((ex) => {
  console.error('[FATAL] Server failed to start:', ex.stack);
  process.exit(1);
});
