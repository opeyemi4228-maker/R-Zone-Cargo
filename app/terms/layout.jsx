// Server Component owns the SEO metadata for /terms.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "Terms & Conditions | R-Zone Enterprises" },
  description:
    "Read the terms and conditions for using R-Zone Enterprises UK to Nigeria cargo and shipping services.",
  alternates: { canonical: "https://r-zoneenterprises.com/terms" },
  openGraph: {
    title: "Terms & Conditions | R-Zone Enterprises",
    description:
      "Read the terms and conditions for using R-Zone Enterprises UK to Nigeria cargo and shipping services.",
    url: "https://r-zoneenterprises.com/terms",
    siteName: "R-Zone Enterprises",
  },
};

export default function TermsLayout({ children }) {
  return children;
}
