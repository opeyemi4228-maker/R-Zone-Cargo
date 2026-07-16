// app/blog/how-to-start-uk-to-nigeria-dropshipping-business/page.jsx
// URL: https://r-zoneenterprises.com/blog/how-to-start-uk-to-nigeria-dropshipping-business
// DATE PUBLISHED: 28 May 2026
// TARGET KEYWORDS: how to start dropshipping Nigeria UK, mini importation business Nigeria,
// UK dropshipping Nigeria 2026, how to buy from UK and sell in Nigeria

import ArticleReader from "../[slug]/ArticleReader";
import { SITE_URL, ORGANIZATION_SCHEMA, getArticleBySlug, getRelatedArticles } from "../../../lib/articles";

const article = getArticleBySlug("how-to-start-uk-to-nigeria-dropshipping-business");
const related = getRelatedArticles(article.id, article.category, article.relatedSlugs, 3);

const schemas = [
 {
 "@context": "https://schema.org",
 "@type": "Article",
 "@id": `${article.canonicalUrl}#article`,
 headline: article.title,
 description: article.metaDesc,
 image: { "@type": "ImageObject", url: article.ogImage, width: 1200, height: 630 },
 datePublished: article.datePublished,
 dateModified: article.dateModified,
 author: { "@type": "Organization", name: article.author, url: `${SITE_URL}/about` },
 publisher: ORGANIZATION_SCHEMA,
 mainEntityOfPage: { "@type": "WebPage", "@id": article.canonicalUrl },
 keywords: article.keywords.join(", "),
 wordCount: article.wordCount,
 inLanguage: "en-GB",
 },
 {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
 { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
 { "@type": "ListItem", position: 3, name: article.title, item: article.canonicalUrl },
 ],
 },
 {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: article.faqSchema.map((f) => ({
 "@type": "Question",
 name: f.question,
 acceptedAnswer: { "@type": "Answer", text: f.answer },
 })),
 },
 // HowTo Schema boosts eligibility for Google step-by-step rich results
 {
 "@context": "https://schema.org",
 "@type": "HowTo",
 name: "How to Start a UK-to-Nigeria Dropshipping Business",
 description: "Step-by-step guide to starting a UK-to-Nigeria mini importation and dropshipping business in 2026.",
 step: [
 { "@type": "HowToStep", position: 1, name: "Choose Your Product", text: "Research profitable product categories with a strong UK Nigeria price gap. Verify your margin after shipping costs before ordering." },
 { "@type": "HowToStep", position: 2, name: "Source Products from the UK", text: "Order from UK retailers (Amazon UK, ASOS, Boots, Holland & Barrett) or wholesale suppliers. Have products delivered to R-Zone's Upminster warehouse." },
 { "@type": "HowToStep", position: 3, name: "Ship with R-Zone Cargo", text: "Book air freight (from £5/kg, 5 10 days) or sea freight (from £3/kg, 4 6 weeks) with R-Zone. All customs clearance included." },
 { "@type": "HowToStep", position: 4, name: "Sell in Nigeria", text: "Sell through WhatsApp Business, Instagram Shopping, Jumia, Jiji or TikTok Shop. WhatsApp is the highest-converting channel for most import businesses." },
 { "@type": "HowToStep", position: 5, name: "Scale with Bulk Shipments", text: "Once validated, move to sea freight for bulk orders. Consolidate multiple product categories. Build a regular monthly shipping schedule with R-Zone." },
 ],
 },
 { "@context": "https://schema.org", ...ORGANIZATION_SCHEMA },
];

export const metadata = {
 title: article.metaTitle,
 description: article.metaDesc,
 keywords: article.keywords,
 alternates: { canonical: article.canonicalUrl },
 openGraph: {
 type: "article",
 url: article.canonicalUrl,
 title: article.metaTitle,
 description: article.metaDesc,
 siteName: "R-Zone Cargo",
 images: [{ url: article.ogImage, width: 1200, height: 630, alt: article.imgAlt }],
 publishedTime: article.datePublished,
 modifiedTime: article.dateModified,
 tags: article.tags,
 },
 twitter: {
 card: "summary_large_image",
 site: "@RZoneCargo",
 title: article.metaTitle,
 description: article.metaDesc,
 images: [article.ogImage],
 },
 robots: {
 index: true,
 follow: true,
 googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
 },
};

export default function Page() {
 return (
 <>
 {schemas.map((s, i) => (
 <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
 ))}

 {/* Server-rendered SEO content visible to Googlebot, hidden visually */}
 <div
 aria-hidden="true"
 style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}
 >
 <h1>{article.title}</h1>
 <p>{article.excerpt}</p>
 {article.content.map((s, i) => (
 <div key={i}>
 <h2>{s.h}</h2>
 <p>{s.body.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
 </div>
 ))}
 <h2>Frequently Asked Questions</h2>
 {article.faqSchema.map((f, i) => (
 <div key={i}><h3>{f.question}</h3><p>{f.answer}</p></div>
 ))}
 <nav>
 <a href={`${SITE_URL}/blog`}>All UK Nigeria shipping and business guides</a>
 <a href={`${SITE_URL}/quote`}>Get a free UK to Nigeria cargo quote</a>
 <a href={`${SITE_URL}/services`}>Our UK to Nigeria cargo services</a>
 <a href={`${SITE_URL}/contact`}>Contact R-Zone Cargo UK team</a>
 </nav>
 {related.map((r) => (
 <a key={r.id} href={`${SITE_URL}/blog/${r.slug}`}>{r.title}</a>
 ))}
 </div>

 {/* Interactive article UI */}
 <ArticleReader article={article} related={related} />
 </>
 );
}