// app/sitemap.js
// ─────────────────────────────────────────────────────────────────────────────
// Generates /sitemap.xml automatically at build time.
// Next.js App Router reads this file and serves it at /sitemap.xml
//
// Covers:
// • Core pages (homepage, blog index, quote, contact, services)
// • All articles (one URL per article slug)
//
// Submit the sitemap URL to Google Search Console:
// https://r-zoneenterprises.com/sitemap.xml
// ─────────────────────────────────────────────────────────────────────────────

import { ARTICLES, SITE_URL } from "../lib/articles";

export default function sitemap() {
 // ── Core static pages ──────────────────────────────────────────────────────
 const corePages = [
 {
 url: `${SITE_URL}/`,
 lastModified: new Date(),
 changeFrequency: "weekly",
 priority: 1.0,
 },
 {
 // Commercial landing page for the head term "cargo from UK to Nigeria".
 url: `${SITE_URL}/cargo-from-uk-to-nigeria`,
 lastModified: new Date(),
 changeFrequency: "weekly",
 priority: 1.0,
 },
 {
 url: `${SITE_URL}/blog`,
 lastModified: new Date(),
 changeFrequency: "daily", // new articles added frequently
 priority: 0.9,
 },
 {
 url: `${SITE_URL}/quote`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.9,
 },
 {
 url: `${SITE_URL}/services`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.8,
 },
 {
 url: `${SITE_URL}/priceguide`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.8,
 },
 {
 url: `${SITE_URL}/schedulesprices`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.8,
 },
 {
 url: `${SITE_URL}/importation`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.7,
 },
 {
 url: `${SITE_URL}/business-solutions`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.7,
 },
 {
 url: `${SITE_URL}/about`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.7,
 },
 {
 url: `${SITE_URL}/contact`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.7,
 },
 {
 // Real route is /track (the sitemap previously advertised /tracking,
 // which 404s and generated "not indexed" reports in Search Console).
 url: `${SITE_URL}/track`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.6,
 },
 {
 url: `${SITE_URL}/partners`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.6,
 },
 {
 url: `${SITE_URL}/support`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.6,
 },
 {
 url: `${SITE_URL}/careers`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.5,
 },
 {
 url: `${SITE_URL}/compliance`,
 lastModified: new Date(),
 changeFrequency: "yearly",
 priority: 0.4,
 },
 {
 url: `${SITE_URL}/terms`,
 lastModified: new Date(),
 changeFrequency: "yearly",
 priority: 0.3,
 },
 {
 url: `${SITE_URL}/privacy`,
 lastModified: new Date(),
 changeFrequency: "yearly",
 priority: 0.3,
 },
 {
 url: `${SITE_URL}/cookies`,
 lastModified: new Date(),
 changeFrequency: "yearly",
 priority: 0.3,
 },
 ];

 // ── Blog article pages ─────────────────────────────────────────────────────
 // One sitemap entry per article each with its own canonical URL,
 // last-modified date, and priority score defined in articles.js
 const articlePages = ARTICLES.map((article) => ({
 url: `${SITE_URL}/blog/${article.slug}`,
 lastModified: new Date(article.dateModified || article.datePublished),
 changeFrequency: "monthly",
 priority: article.priority || 0.7,
 }));

 return [...corePages, ...articlePages];
}