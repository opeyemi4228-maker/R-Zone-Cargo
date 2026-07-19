// Server Component owns the SEO metadata for /priceguide.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "UK to Nigeria Shipping Price Guide 2026 | R-Zone Enterprises" },
  description:
    "R-Zone's UK to Nigeria shipping price guide: air freight from £5/kg, sea freight from £3/kg, door to door from £6/kg. Transparent, all-inclusive 2026 cargo rates with no hidden fees.",
  alternates: { canonical: "https://r-zoneenterprises.com/priceguide" },
  openGraph: {
    title: "UK to Nigeria Shipping Price Guide 2026 | R-Zone Enterprises",
    description:
      "R-Zone's UK to Nigeria shipping price guide: air freight from £5/kg, sea freight from £3/kg, door to door from £6/kg. Transparent, all-inclusive 2026 cargo rates with no hidden fees.",
    url: "https://r-zoneenterprises.com/priceguide",
    siteName: "R-Zone Enterprises",
  },
};

export default function PriceGuideLayout({ children }) {
  return children;
}
