// Server Component owns the SEO metadata for /privacy.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "Privacy Policy | R-Zone Enterprises" },
  description:
    "How R-Zone Enterprises collects, uses and protects your personal data when you use our UK to Nigeria cargo and shipping services.",
  alternates: { canonical: "https://r-zoneenterprises.com/privacy" },
  openGraph: {
    title: "Privacy Policy | R-Zone Enterprises",
    description:
      "How R-Zone Enterprises collects, uses and protects your personal data when you use our UK to Nigeria cargo and shipping services.",
    url: "https://r-zoneenterprises.com/privacy",
    siteName: "R-Zone Enterprises",
  },
};

export default function PrivacyLayout({ children }) {
  return children;
}
