// app/blog/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT the /blog listing page.
// Rendered server-side so Google can fully read and index it.
//
// SEO delivered by this file:
// ✅ Unique <title> + <meta description> for /blog
// ✅ Open Graph tags (WhatsApp, Facebook, LinkedIn previews)
// ✅ Twitter Card tags
// ✅ Canonical URL
// ✅ WebPage + Blog JSON-LD schema
// ✅ BreadcrumbList JSON-LD schema
// ✅ Organization JSON-LD schema
// ✅ Server-rendered article list (crawlable HTML for Googlebot)
// ✅ Internal links to every article page at /blog/{slug}
// ─────────────────────────────────────────────────────────────────────────────

import {
 getAllArticles,
 getFeaturedArticle,
 ARTICLES,
 CATEGORIES,
 SITE_URL,
 SITE_NAME,
 ORGANIZATION_SCHEMA,
 DEFAULT_OG_IMAGE,
 TWITTER_HANDLE,
} from "../../lib/articles";
import BlogList from "./BlogList";
import { freshYear } from "@/lib/year";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export const metadata = {
 // ── Primary SEO ────────────────────────────────────────────────────────────
 title: { absolute: freshYear("UK to Nigeria Shipping Blog 2026: Guides, Tips & News | R-Zone Cargo") },
 description:
 "Expert shipping guides, customs tips, industry news and logistics insights for UK Nigeria cargo. Air freight, sea freight, NAFDAC, Apapa port and more R-Zone Cargo blog.",
 keywords: [
 "UK to Nigeria shipping guide",
 "UK Nigeria cargo blog",
 "air freight Nigeria guides",
 "sea freight UK Nigeria tips",
 "Nigeria customs guide",
 "NAFDAC requirements UK",
 "Apapa port shipping",
 "R-Zone Cargo blog",
 "shipping from UK to Nigeria",
 "cargo company UK Nigeria",
 ],

 // ── Canonical ──────────────────────────────────────────────────────────────
 alternates: {
 canonical: `${SITE_URL}/blog`,
 },

 // ── Open Graph ─────────────────────────────────────────────────────────────
 openGraph: {
 type: "website",
 url: `${SITE_URL}/blog`,
 title: freshYear("UK to Nigeria Shipping Blog 2026 | R-Zone Cargo"),
 description:
 "Expert guides, customs tips and logistics news for UK Nigeria cargo shippers. Trusted by 10,000+ customers. R-Zone Cargo the UK's #1 Nigeria shipping company.",
 siteName: SITE_NAME,
 images: [
 {
 url: DEFAULT_OG_IMAGE,
 width: 1200,
 height: 630,
 alt: "R-Zone Cargo UK to Nigeria Shipping Blog",
 },
 ],
 },

 // ── Twitter Card ───────────────────────────────────────────────────────────
 twitter: {
 card: "summary_large_image",
 site: TWITTER_HANDLE,
 creator: TWITTER_HANDLE,
 title: freshYear("UK to Nigeria Shipping Blog 2026 | R-Zone Cargo"),
 description:
 "Expert guides, customs tips and logistics news for UK Nigeria shippers. R-Zone Cargo.",
 images: [DEFAULT_OG_IMAGE],
 },

 // ── Robots ─────────────────────────────────────────────────────────────────
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 "max-video-preview": -1,
 "max-image-preview": "large",
 "max-snippet": -1,
 },
 },
};

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD SCHEMAS FOR THE BLOG LISTING PAGE
// ─────────────────────────────────────────────────────────────────────────────
function buildBlogPageSchemas(articles) {
 return [
 // ── 1. WebPage Schema ────────────────────────────────────────────────────
 {
 "@context": "https://schema.org",
 "@type": "WebPage",
 "@id": `${SITE_URL}/blog#webpage`,
 url: `${SITE_URL}/blog`,
 name: freshYear("UK to Nigeria Shipping Blog 2026 | R-Zone Cargo"),
 description:
 "Expert shipping guides, customs tips and logistics insights for UK Nigeria cargo shippers.",
 isPartOf: {
 "@type": "WebSite",
 "@id": `${SITE_URL}/#website`,
 url: SITE_URL,
 name: SITE_NAME,
 publisher: ORGANIZATION_SCHEMA,
 },
 inLanguage: "en-GB",
 },

 // ── 2. Blog Schema ────────────────────────────────────────────────────────
 // Lists every article as a BlogPosting Google uses this to understand
 // the full scope of your content and indexes articles more aggressively.
 {
 "@context": "https://schema.org",
 "@type": "Blog",
 "@id": `${SITE_URL}/blog#blog`,
 name: "R-Zone Cargo Insights & News",
 url: `${SITE_URL}/blog`,
 description:
 "UK to Nigeria shipping guides, customs tips, industry news and logistics insights from R-Zone Cargo.",
 publisher: ORGANIZATION_SCHEMA,
 inLanguage: "en-GB",
 blogPost: articles.map((a) => ({
 "@type": "BlogPosting",
 "@id": `${SITE_URL}/blog/${a.slug}#article`,
 headline: a.title,
 description: a.metaDesc || a.excerpt,
 url: `${SITE_URL}/blog/${a.slug}`,
 datePublished: a.datePublished,
 dateModified: a.dateModified || a.datePublished,
 image: {
 "@type": "ImageObject",
 url: a.ogImage || a.img,
 width: 1200,
 height: 630,
 },
 author: {
 "@type": "Organization",
 name: a.author,
 url: `${SITE_URL}/about`,
 },
 publisher: ORGANIZATION_SCHEMA,
 keywords: a.keywords
 ? a.keywords.join(", ")
 : a.tags.join(", "),
 })),
 },

 // ── 3. BreadcrumbList Schema ──────────────────────────────────────────────
 // Displays breadcrumb trail in Google results: Home > Blog
 {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 {
 "@type": "ListItem",
 position: 1,
 name: "Home",
 item: `${SITE_URL}/`,
 },
 {
 "@type": "ListItem",
 position: 2,
 name: "Blog",
 item: `${SITE_URL}/blog`,
 },
 ],
 },

 // ── 4. Organization Schema ────────────────────────────────────────────────
 // Reinforces brand entity on every page builds Google's trust in
 // R-Zone as a legitimate, established business.
 {
 "@context": "https://schema.org",
 ...ORGANIZATION_SCHEMA,
 },

 // ── 5. ItemList Schema ────────────────────────────────────────────────────
 // Explicitly lists all article URLs as a structured list.
 // Signals to Google the full depth of your content.
 {
 "@context": "https://schema.org",
 "@type": "ItemList",
 name: "R-Zone Cargo Blog Articles",
 url: `${SITE_URL}/blog`,
 numberOfItems: articles.length,
 itemListElement: articles.map((a, i) => ({
 "@type": "ListItem",
 position: i + 1,
 url: `${SITE_URL}/blog/${a.slug}`,
 name: a.title,
 })),
 },
 ];
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT (Server Component)
// ─────────────────────────────────────────────────────────────────────────────
export default function BlogPage() {
 const articles = getAllArticles();
 const featured = getFeaturedArticle();
 const schemas = buildBlogPageSchemas(articles);

 return (
 <>
 {/* ── JSON-LD Schema Injection ────────────────────────────────────────── */}
 {schemas.map((schema, i) => (
 <script
 key={i}
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 />
 ))}

 {/* ── Interactive Blog UI (Client Component) ───────────────────────────── */}
 {/* BlogList handles all filtering, search, animations and navigation. */}
 {/* It receives pre-fetched data as props no client-side data fetching. */}
 <BlogList articles={articles} featured={featured} categories={CATEGORIES} />
 </>
 );
}