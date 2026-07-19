// Server Component owns the SEO metadata for /partners.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "Partner With R-Zone Enterprises | UK Nigeria Logistics" },
  description:
    "Partner with R-Zone Enterprises for UK to Nigeria cargo and logistics. Agent, reseller and commercial shipping partnerships with a trusted freight forwarder operating since 2012.",
  alternates: { canonical: "https://r-zoneenterprises.com/partners" },
  openGraph: {
    title: "Partner With R-Zone Enterprises | UK Nigeria Logistics",
    description:
      "Partner with R-Zone Enterprises for UK to Nigeria cargo and logistics. Agent, reseller and commercial shipping partnerships with a trusted freight forwarder operating since 2012.",
    url: "https://r-zoneenterprises.com/partners",
    siteName: "R-Zone Enterprises",
  },
};

export default function PartnersLayout({ children }) {
  return children;
}
