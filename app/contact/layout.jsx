// Server Component owns the SEO metadata for /contact.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "Contact R-Zone Enterprises | UK to Nigeria Cargo & Shipping" },
  description:
    "Contact R-Zone Enterprises for UK to Nigeria cargo and shipping. Call +44 (0) 800 772 0864, WhatsApp +44 7915 647 119, or request a free same-day quote.",
  alternates: { canonical: "https://r-zoneenterprises.com/contact" },
  openGraph: {
    title: "Contact R-Zone Enterprises | UK to Nigeria Cargo & Shipping",
    description:
      "Contact R-Zone Enterprises for UK to Nigeria cargo and shipping. Call +44 (0) 800 772 0864, WhatsApp +44 7915 647 119, or request a free same-day quote.",
    url: "https://r-zoneenterprises.com/contact",
    siteName: "R-Zone Enterprises",
  },
};

export default function ContactLayout({ children }) {
  return children;
}
