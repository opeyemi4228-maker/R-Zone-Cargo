// app/blog/[slug]/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT runs at build time (SSG) via generateStaticParams.
// Every article becomes a real, crawlable, indexable HTML page at:
// https://r-zoneenterprises.com/blog/{slug}
//
// SEO delivered by this file:
// ✅ Unique <title> per article
// ✅ Unique <meta description> per article
// ✅ Open Graph tags (WhatsApp, Facebook, LinkedIn previews)
// ✅ Twitter Card tags
// ✅ Canonical URL
// ✅ Article JSON-LD schema
// ✅ FAQ JSON-LD schema (Google "People Also Ask" + rich snippets)
// ✅ BreadcrumbList JSON-LD schema
// ✅ Organization JSON-LD schema
// ✅ HTTP 200 with real server-rendered HTML (not hash fragment)
// ✅ generateStaticParams pre-builds every article at deploy time
// ─────────────────────────────────────────────────────────────────────────────

import { notFound } from "next/navigation";
import {
 getArticleBySlug,
 getAllSlugs,
 getRelatedArticles,
 SITE_URL,
 SITE_NAME,
 ORGANIZATION_SCHEMA,
 DEFAULT_OG_IMAGE,
 TWITTER_HANDLE,
} from "../../../lib/articles";
import ArticleReader from "./ArticleReader";

// ─────────────────────────────────────────────────────────────────────────────
// generateStaticParams
// Pre-builds every article slug as a static HTML page at deploy time.
// Google gets real HTML not a JS-rendered hash fragment.
// ─────────────────────────────────────────────────────────────────────────────
export function generateStaticParams() {
 return getAllSlugs(); // returns [{ slug: "air-freight-vs-sea-freight-ultimate-guide" }, ...]
}

// ─────────────────────────────────────────────────────────────────────────────
// generateMetadata
// Each article gets its own unique <head> title, description, OG, Twitter.
// This is what Google, Facebook and WhatsApp read when they visit the URL.
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
 const article = getArticleBySlug(params.slug);

 // If slug doesn't exist, Next.js returns a 404 no orphan pages.
 if (!article) {
 return {
 title: "Article Not Found | R-Zone Cargo",
 description: "This article could not be found. Browse all UK Nigeria shipping guides on the R-Zone Cargo blog.",
 };
 }

 const ogImage = article.ogImage || DEFAULT_OG_IMAGE;

 return {
 // ── Primary SEO tags ────────────────────────────────────────────────────
 title: article.metaTitle,
 description: article.metaDesc,
 keywords: article.keywords,

 // ── Canonical URL ────────────────────────────────────────────────────────
 // Prevents duplicate content penalties if the page is ever linked
 // with query strings or trailing slashes.
 alternates: {
 canonical: article.canonicalUrl,
 },

 // ── Open Graph (Facebook, WhatsApp, LinkedIn) ────────────────────────────
 openGraph: {
 type: "article",
 url: article.canonicalUrl,
 title: article.metaTitle,
 description: article.metaDesc,
 siteName: SITE_NAME,
 images: [
 {
 url: ogImage,
 width: 1200,
 height: 630,
 alt: article.imgAlt,
 },
 ],
 publishedTime: article.datePublished,
 modifiedTime: article.dateModified,
 authors: [`${SITE_URL}/about`],
 tags: article.tags,
 },

 // ── Twitter Card ─────────────────────────────────────────────────────────
 twitter: {
 card: "summary_large_image",
 site: TWITTER_HANDLE,
 creator: TWITTER_HANDLE,
 title: article.metaTitle,
 description: article.metaDesc,
 images: [ogImage],
 },

 // ── Robots directive ─────────────────────────────────────────────────────
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

 // ── Additional meta ──────────────────────────────────────────────────────
 authors: [{ name: article.author, url: `${SITE_URL}/about` }],
 category: article.category,
 };
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD Schema Builder
// Injects structured data into <head> as application/ld+json scripts.
// Google reads these to display rich results FAQ boxes, breadcrumbs,
// article metadata, and "People Also Ask" entries.
// ─────────────────────────────────────────────────────────────────────────────
function buildSchemas(article) {
 const schemas = [];

 // ── 1. Article Schema ──────────────────────────────────────────────────────
 // Tells Google this is a credible, authored, dated article.
 // Enables article rich results in search.
 schemas.push({
 "@context": "https://schema.org",
 "@type": "Article",
 "@id": `${article.canonicalUrl}#article`,
 headline: article.title,
 description: article.metaDesc,
 image: {
 "@type": "ImageObject",
 url: article.ogImage || DEFAULT_OG_IMAGE,
 width: 1200,
 height: 630,
 },
 datePublished: article.datePublished,
 dateModified: article.dateModified || article.datePublished,
 author: {
 "@type": "Organization",
 name: article.author,
 url: `${SITE_URL}/about`,
 },
 publisher: ORGANIZATION_SCHEMA,
 mainEntityOfPage: {
 "@type": "WebPage",
 "@id": article.canonicalUrl,
 },
 keywords: article.keywords ? article.keywords.join(", ") : article.tags.join(", "),
 articleSection: article.category,
 inLanguage: "en-GB",
 url: article.canonicalUrl,
 });

 // ── 2. BreadcrumbList Schema ───────────────────────────────────────────────
 // Shows breadcrumb trail in Google search results:
 // R-Zone Cargo > Blog > [Article Title]
 schemas.push({
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
 {
 "@type": "ListItem",
 position: 3,
 name: article.title,
 item: article.canonicalUrl,
 },
 ],
 });

 // ── 3. FAQ Schema ──────────────────────────────────────────────────────────
 // The most powerful schema for ranking. Enables:
 // • Google "People Also Ask" boxes
 // • Expandable FAQ rich results directly in search
 // • Significantly higher click-through rate
 if (article.faqSchema && article.faqSchema.length > 0) {
 schemas.push({
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: article.faqSchema.map((faq) => ({
 "@type": "Question",
 name: faq.question,
 acceptedAnswer: {
 "@type": "Answer",
 text: faq.answer,
 },
 })),
 });
 }

 // ── 4. Organization Schema ─────────────────────────────────────────────────
 // Reinforces R-Zone's brand identity on every article page.
 // Helps Google associate articles with a trusted, verified business.
 schemas.push({
 "@context": "https://schema.org",
 ...ORGANIZATION_SCHEMA,
 });

 return schemas;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT (Server Component)
// Renders server-side HTML that Google can fully read and index.
// ArticleReader handles all interactive UI (client-side) as a child.
// ─────────────────────────────────────────────────────────────────────────────
export default function ArticlePage({ params }) {
 const article = getArticleBySlug(params.slug);

 // Hard 404 if slug doesn't match any article
 if (!article) {
 notFound();
 }

 const related = getRelatedArticles(article.id, article.category, 3);
 const schemas = buildSchemas(article);

 return (
 <>
 {/* ── JSON-LD Schema Injection ──────────────────────────────────────── */}
 {/* Each schema is its own <script> tag for maximum Google compatibility */}
 {schemas.map((schema, i) => (
 <script
 key={i}
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 />
 ))}

 {/* ── Server-Rendered SEO Content ───────────────────────────────────── */}
 {/* This block is ONLY for search engine crawlers. */}
 {/* It renders the full article as plain HTML that Googlebot can read */}
 {/* even if JavaScript is disabled. Hidden visually shown to crawlers. */}
 <div
 aria-hidden="true"
 style={{
 position: "absolute",
 width: "1px",
 height: "1px",
 overflow: "hidden",
 clip: "rect(0,0,0,0)",
 whiteSpace: "nowrap",
 }}
 >
 {/* H1 most important on-page SEO signal */}
 <h1>{article.title}</h1>

 {/* Article meta for crawlers */}
 <p>
 By {article.author} · Published {article.datePublished} ·{" "}
 {article.readTime}
 </p>

 {/* Excerpt as intro paragraph */}
 <p>{article.excerpt}</p>

 {/* Full article content rendered as real HTML headings + paragraphs */}
 {article.content.map((section, i) => (
 <div key={i}>
 <h2>{section.h}</h2>
 {section.body.split("\n\n").map((para, pi) => (
 <p key={pi}>{para.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
 ))}
 </div>
 ))}

 {/* FAQ content as plain text for crawlers */}
 {article.faqSchema && article.faqSchema.length > 0 && (
 <div>
 <h2>Frequently Asked Questions</h2>
 {article.faqSchema.map((faq, i) => (
 <div key={i}>
 <h3>{faq.question}</h3>
 <p>{faq.answer}</p>
 </div>
 ))}
 </div>
 )}

 {/* Tags as plain text */}
 <p>Topics: {article.tags.join(", ")}</p>

 {/* Internal links distributes SEO authority across the site */}
 <nav>
 <a href={`${SITE_URL}/blog`}>Back to all shipping guides</a>
 <a href={`${SITE_URL}/quote`}>Get a free UK to Nigeria shipping quote</a>
 <a href={`${SITE_URL}/contact`}>Contact R-Zone Cargo</a>
 <a href={`${SITE_URL}/services`}>Our UK to Nigeria shipping services</a>
 </nav>

 {/* Related articles internal linking for crawl depth */}
 {related.length > 0 && (
 <nav>
 <p>Related articles:</p>
 {related.map((r) => (
 <a key={r.id} href={`${SITE_URL}/blog/${r.slug}`}>
 {r.title}
 </a>
 ))}
 </nav>
 )}
 </div>

 {/* ── Interactive UI (Client Component) ────────────────────────────── */}
 {/* ArticleReader handles all animations, share panel, back button etc. */}
 {/* It receives article + related as plain props no data fetching */}
 <ArticleReader article={article} related={related} />
 </>
 );
}