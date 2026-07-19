// Server Component owns the SEO metadata for /about.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "About R-Zone Enterprises | UK to Nigeria Cargo Since 2012" },
  description:
    "Learn about R-Zone Enterprises, a trusted UK to Nigeria cargo and shipping company since 2012 with 50,000+ shipments delivered and 107+ five-star reviews. Air, sea and door to door freight.",
  alternates: { canonical: "https://r-zoneenterprises.com/about" },
  openGraph: {
    title: "About R-Zone Enterprises | UK to Nigeria Cargo Since 2012",
    description:
      "Learn about R-Zone Enterprises, a trusted UK to Nigeria cargo and shipping company since 2012 with 50,000+ shipments delivered and 107+ five-star reviews. Air, sea and door to door freight.",
    url: "https://r-zoneenterprises.com/about",
    siteName: "R-Zone Enterprises",
  },
};

export default function AboutLayout({ children }) {
  return children;
}
