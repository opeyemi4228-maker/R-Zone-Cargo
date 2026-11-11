// Server Component owns the SEO metadata for /schedulesprices.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
 title: { absolute: "UK to Nigeria Shipping Rates by State & Departure Dates" },
 description: "Air from £5.80/kg every Friday, sea from £3/kg weekly: rates, minimum weights and delivery times for all 36 states, plus this month's sailing dates.",
  alternates: { canonical: "https://r-zoneenterprises.com/schedulesprices" },
  openGraph: {
    title: "UK to Nigeria Shipping Rates by State & Departure Dates",
    description: "Air from £5.80/kg every Friday, sea from £3/kg weekly: rates, minimum weights and delivery times for all 36 states, plus this month's sailing dates.",
    url: "https://r-zoneenterprises.com/schedulesprices",
    siteName: "R-Zone Enterprises",
   type: "website",
   locale: "en_GB",
   images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "R-Zone Cargo: UK to Nigeria shipping" }],
  },
  twitter: {
   card: "summary_large_image",
   title: "UK to Nigeria Shipping Rates by State & Departure Dates",
   description: "Air from £5.80/kg every Friday, sea from £3/kg weekly: rates, minimum weights and delivery times for all 36 states, plus this month's sailing dates.",
   images: ["/images/og-default.jpg"],
  },
};

export default function SchedulesPricesLayout({ children }) {
  return children;
}
