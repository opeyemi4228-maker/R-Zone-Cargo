// Server Component owns the SEO metadata for /track.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead.
export const metadata = {
 title: { absolute: "Track Your UK Nigeria Shipment | R-Zone Enterprises" },
 description:
 "Track your UK to Nigeria cargo shipment in real time, including air freight to Nigeria and sea freight to Nigeria from UK. Enter your R-Zone booking reference for live status, milestones, and estimated delivery. #1 rated UK Nigeria cargo company on Google.",
 keywords: [
 "track your UK Nigeria shipment",
 "UK Nigeria cargo tracking",
 "cargo tracking Nigeria UK",
 "shipment tracking Nigeria",
 "UK to Nigeria cargo status",
 ],
 alternates: { canonical: "https://r-zoneenterprises.com/track" },
 openGraph: {
 title: "Track Your UK Nigeria Shipment | R-Zone Enterprises",
 description:
 "Track your UK to Nigeria cargo shipment in real time. Enter your R-Zone booking reference for live status, milestones, and estimated delivery.",
 url: "https://r-zoneenterprises.com/track",
 siteName: "R-Zone Enterprises",
 },
};

export default function TrackLayout({ children }) {
 return children;
}
