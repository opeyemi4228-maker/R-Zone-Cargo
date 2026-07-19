// Server Component owns the SEO metadata for /importation.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "Importation From Nigeria to the UK | R-Zone Enterprises" },
  description:
    "R-Zone's importation service between Nigeria and the UK covering sourcing, freight, customs clearance and delivery. Air and sea freight for personal and commercial imports.",
  alternates: { canonical: "https://r-zoneenterprises.com/importation" },
  openGraph: {
    title: "Importation From Nigeria to the UK | R-Zone Enterprises",
    description:
      "R-Zone's importation service between Nigeria and the UK covering sourcing, freight, customs clearance and delivery. Air and sea freight for personal and commercial imports.",
    url: "https://r-zoneenterprises.com/importation",
    siteName: "R-Zone Enterprises",
  },
};

export default function ImportationLayout({ children }) {
  return children;
}
