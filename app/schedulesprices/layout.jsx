// Server Component owns the SEO metadata for /schedulesprices.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "UK to Nigeria Schedules and Prices: Rates by State" },
  description: "Weekly air and sea departures with per-state rates, minimum weights and delivery times for all 36 Nigerian states. Plan and price your shipment.",
  alternates: { canonical: "https://r-zoneenterprises.com/schedulesprices" },
  openGraph: {
    title: "UK to Nigeria Schedules and Prices: Rates by State",
    description: "Weekly air and sea departures with per-state rates, minimum weights and delivery times for all 36 Nigerian states. Plan and price your shipment.",
    url: "https://r-zoneenterprises.com/schedulesprices",
    siteName: "R-Zone Enterprises",
  },
};

export default function SchedulesPricesLayout({ children }) {
  return children;
}
