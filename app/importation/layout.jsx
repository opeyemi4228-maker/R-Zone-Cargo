// Server Component owns the SEO metadata for /importation.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "Importation from Nigeria to the UK: Air and Sea Freight" },
  description: "Import from Nigeria to the UK with R-Zone: sourcing, air and sea freight, customs clearance and delivery for personal and commercial goods.",
  alternates: { canonical: "https://r-zoneenterprises.com/importation" },
  openGraph: {
    title: "Importation from Nigeria to the UK: Air and Sea Freight",
    description: "Import from Nigeria to the UK with R-Zone: sourcing, air and sea freight, customs clearance and delivery for personal and commercial goods.",
    url: "https://r-zoneenterprises.com/importation",
    siteName: "R-Zone Enterprises",
  },
};

export default function ImportationLayout({ children }) {
  return children;
}
