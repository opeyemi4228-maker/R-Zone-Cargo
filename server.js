// Production entry point for Hostinger's Node.js app runner (Passenger).
// Locked to production mode (dev: false) so the app can NEVER start in the
// heavy `next dev` / turbopack mode on shared hosting — that mode is the main
// cause of the resource-limit 503s on Cloud Startup.
//
// Hostinger sets PORT (and sometimes a unix socket path) in the environment;
// we honour it and fall back to 3000 for local testing.

const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "0.0.0.0";

// dev: false is the whole point of this file — production rendering only.
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, () => {
      console.log(`> R-Zone Cargo ready in production mode on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js server:", err);
    process.exit(1);
  });
