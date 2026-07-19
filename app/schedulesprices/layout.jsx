// Server Component owns the SEO metadata for /schedulesprices.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "UK to Nigeria Shipping Schedules & Prices 2026 | R-Zone Enterprises" },
  description:
    "Weekly UK to Nigeria air and sea freight schedules and 2026 prices from R-Zone Enterprises. Plan your shipment with departure times and all-inclusive rates to Lagos, Abuja and beyond.",
  alternates: { canonical: "https://r-zoneenterprises.com/schedulesprices" },
  openGraph: {
    title: "UK to Nigeria Shipping Schedules & Prices 2026 | R-Zone Enterprises",
    description:
      "Weekly UK to Nigeria air and sea freight schedules and 2026 prices from R-Zone Enterprises. Plan your shipment with departure times and all-inclusive rates to Lagos, Abuja and beyond.",
    url: "https://r-zoneenterprises.com/schedulesprices",
    siteName: "R-Zone Enterprises",
  },
};

export default function SchedulesPricesLayout({ children }) {
  return children;
}
