// Server Component owns the SEO metadata for /support.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
 title: { absolute: "Customer Support: UK to Nigeria Cargo Help" },
 description: "Help with bookings, tracking, customs and delivery for UK to Nigeria cargo. Call, WhatsApp or email R-Zone support for a same-day reply.",
  alternates: { canonical: "https://r-zoneenterprises.com/support" },
  openGraph: {
    title: "Customer Support: UK to Nigeria Cargo Help",
    description: "Help with bookings, tracking, customs and delivery for UK to Nigeria cargo. Call, WhatsApp or email R-Zone support for a same-day reply.",
    url: "https://r-zoneenterprises.com/support",
    siteName: "R-Zone Enterprises",
   type: "website",
   locale: "en_GB",
   images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "R-Zone Cargo: UK to Nigeria shipping" }],
  },
  twitter: {
   card: "summary_large_image",
   title: "Customer Support: UK to Nigeria Cargo Help",
   description: "Help with bookings, tracking, customs and delivery for UK to Nigeria cargo. Call, WhatsApp or email R-Zone support for a same-day reply.",
   images: ["/images/og-default.jpg"],
  },
};

export default function SupportLayout({ children }) {
  return children;
}
