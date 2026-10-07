// Server Component owns the SEO metadata for /priceguide.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "UK to Nigeria Shipping Prices 2026: Full Cost Guide" },
  description: "Air freight from £5.50/kg, sea from £3/kg, door to door from £6/kg. Transparent, all-inclusive UK to Nigeria rates with no hidden charges.",
  alternates: { canonical: "https://r-zoneenterprises.com/priceguide" },
  openGraph: {
    title: "UK to Nigeria Shipping Prices 2026: Full Cost Guide",
    description: "Air freight from £5.50/kg, sea from £3/kg, door to door from £6/kg. Transparent, all-inclusive UK to Nigeria rates with no hidden charges.",
    url: "https://r-zoneenterprises.com/priceguide",
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
 { "@type": "ListItem", position: 2, name: "Price Guide", item: "https://r-zoneenterprises.com/priceguide" },
 ],
};

export default function PriceGuideLayout({ children }) {
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
