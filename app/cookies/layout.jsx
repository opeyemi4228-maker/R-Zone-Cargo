// Server Component owns the SEO metadata for /cookies.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "Cookie Policy | R-Zone Enterprises" },
  description:
    "How R-Zone Enterprises uses cookies on its website to improve your experience and analyse site traffic.",
  alternates: { canonical: "https://r-zoneenterprises.com/cookies" },
  openGraph: {
    title: "Cookie Policy | R-Zone Enterprises",
    description:
      "How R-Zone Enterprises uses cookies on its website to improve your experience and analyse site traffic.",
    url: "https://r-zoneenterprises.com/cookies",
    siteName: "R-Zone Enterprises",
  },
};

// BreadcrumbList so Google can show the page's place in the site hierarchy
// in search results instead of a bare URL.
const BREADCRUMB = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: "Home", item: "https://r-zoneenterprises.com/" },
 { "@type": "ListItem", position: 2, name: "Cookie Policy", item: "https://r-zoneenterprises.com/cookies" },
 ],
};

export default function CookiesLayout({ children }) {
 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }}
 />
 {children}
 </>
 );
}
