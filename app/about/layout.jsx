// Server Component owns the SEO metadata for /about.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "About R-Zone: UK to Nigeria Cargo Since 2012" },
  description: "R-Zone has shipped between the UK and Nigeria since 2012: 50,000+ shipments, 120+ five-star reviews, and our own teams in Britain and Lagos.",
  alternates: { canonical: "https://r-zoneenterprises.com/about" },
  openGraph: {
    title: "About R-Zone: UK to Nigeria Cargo Since 2012",
    description: "R-Zone has shipped between the UK and Nigeria since 2012: 50,000+ shipments, 120+ five-star reviews, and our own teams in Britain and Lagos.",
    url: "https://r-zoneenterprises.com/about",
    siteName: "R-Zone Enterprises",
  },
};

export default function AboutLayout({ children }) {
  return children;
}
