// app/blog/r-zone-cargo-reviews-uk-nigeria-shipping/page.jsx
// URL: https://r-zoneenterprises.com/blog/r-zone-cargo-reviews-uk-nigeria-shipping
// REDIRECTS FROM: /blog/rzone-107-five-star-reviews-milestone

import ArticleReader from "../[slug]/ArticleReader";
import { SITE_URL, ORGANIZATION_SCHEMA, getArticleBySlug, getRelatedArticles } from "../../../lib/articles";

const article = getArticleBySlug("r-zone-cargo-reviews-uk-nigeria-shipping");
const related = getRelatedArticles(article.id, article.category, article.relatedSlugs, 3);

const schemas = [
 { "@context": "https://schema.org", "@type": "Article", "@id": `${article.canonicalUrl}#article`, headline: article.title, description: article.metaDesc, image: { "@type": "ImageObject", url: article.ogImage, width: 1200, height: 630 }, datePublished: article.datePublished, dateModified: article.dateModified, author: { "@type": "Organization", name: article.author, url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": article.canonicalUrl }, keywords: article.keywords.join(", "), wordCount: article.wordCount, inLanguage: "en-GB" },
 { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: article.title, item: article.canonicalUrl }] },
 { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: article.faqSchema.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
 { "@context": "https://schema.org", ...ORGANIZATION_SCHEMA },
];

export const metadata = {
 title: { absolute: article.metaTitle }, description: article.metaDesc, keywords: article.keywords,
 alternates: { canonical: article.canonicalUrl },
 openGraph: { type: "article", url: article.canonicalUrl, title: { absolute: article.metaTitle }, description: article.metaDesc, siteName: "R-Zone Enterprises", images: [{ url: article.ogImage, width: 1200, height: 630, alt: article.imgAlt }], publishedTime: article.datePublished, modifiedTime: article.dateModified, tags: article.tags },
 twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: article.metaTitle }, description: article.metaDesc, images: [article.ogImage] },
 robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function Page() {
 return (
 <>
 {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
 <ArticleReader article={article} related={related} />
 </>
 );
}
