// Server Component owns the SEO metadata for /compliance.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "Shipping Compliance | R-Zone Enterprises UK to Nigeria" },
  description:
    "R-Zone Enterprises shipping compliance: Nigeria Customs Service, NAFDAC and SON clearance for UK to Nigeria cargo. Ship compliantly with expert guidance on regulated goods.",
  alternates: { canonical: "https://r-zoneenterprises.com/compliance" },
  openGraph: {
    title: "Shipping Compliance | R-Zone Enterprises UK to Nigeria",
    description:
      "R-Zone Enterprises shipping compliance: Nigeria Customs Service, NAFDAC and SON clearance for UK to Nigeria cargo. Ship compliantly with expert guidance on regulated goods.",
    url: "https://r-zoneenterprises.com/compliance",
    siteName: "R-Zone Enterprises",
  },
};

export default function ComplianceLayout({ children }) {
  return children;
}
