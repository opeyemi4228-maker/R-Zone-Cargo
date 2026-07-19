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

export default function CookiesLayout({ children }) {
  return children;
}
