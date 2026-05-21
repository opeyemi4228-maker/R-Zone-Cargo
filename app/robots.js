// app/robots.js
// ─────────────────────────────────────────────────────────────────────────────
// Generates /robots.txt automatically at build time.
// Next.js App Router reads this file and serves it at /robots.txt
//
// Rules:
//   • Allow all legitimate crawlers to index everything
//   • Block all crawlers from private/utility paths
//   • Point to sitemap.xml so Google finds all pages immediately
// ─────────────────────────────────────────────────────────────────────────────

import { SITE_URL } from "../lib/articles";

export default function robots() {
  return {
    rules: [
      // ── Allow all well-behaved crawlers ──────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",          // API routes — not indexable content
          "/_next/",        // Next.js internal build files
          "/admin/",        // Admin panel if it exists
          "/dashboard/",    // Customer dashboard if it exists
          "/private/",      // Any private routes
          "/*.json$",       // Raw JSON data files
          "/cdn-cgi/",      // Cloudflare internals if applicable
        ],
      },

      // ── Block AI training crawlers specifically ───────────────────────────
      // These crawlers scrape content for AI model training, not for search.
      // Blocking them protects your original content.
      { userAgent: "GPTBot",          disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "CCBot",           disallow: "/" },
      { userAgent: "anthropic-ai",    disallow: "/" },
      { userAgent: "Claude-Web",      disallow: "/" },
      { userAgent: "Omgilibot",       disallow: "/" },
      { userAgent: "FacebookBot",     disallow: "/" },
    ],

    // ── Sitemap pointer ───────────────────────────────────────────────────────
    // Google reads this and immediately discovers all your indexed pages.
    sitemap: `${SITE_URL}/sitemap.xml`,

    // ── Crawl-delay hint (optional, ignored by Google but respected by others)
    // host: SITE_URL,
  };
}