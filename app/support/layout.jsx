// Server Component owns the SEO metadata for /support.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "Customer Support | R-Zone Enterprises UK to Nigeria Cargo" },
  description:
    "R-Zone Enterprises customer support for UK to Nigeria cargo and shipping. Track shipments, get help with bookings, customs and delivery. Same-day response, every day.",
  alternates: { canonical: "https://r-zoneenterprises.com/support" },
  openGraph: {
    title: "Customer Support | R-Zone Enterprises UK to Nigeria Cargo",
    description:
      "R-Zone Enterprises customer support for UK to Nigeria cargo and shipping. Track shipments, get help with bookings, customs and delivery. Same-day response, every day.",
    url: "https://r-zoneenterprises.com/support",
    siteName: "R-Zone Enterprises",
  },
};

export default function SupportLayout({ children }) {
  return children;
}
