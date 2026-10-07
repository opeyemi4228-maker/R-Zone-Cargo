// Server Component owns the SEO metadata for /track.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead.
export const metadata = {
 title: { absolute: "Track Your UK to Nigeria Cargo Shipment" },
 description: "Track your UK to Nigeria shipment in real time. Enter your R-Zone booking reference, Air Waybill or Bill of Lading for live status and milestones.",
 keywords: [
 "track your UK Nigeria shipment",
 "UK Nigeria cargo tracking",
 "cargo tracking Nigeria UK",
 "shipment tracking Nigeria",
 "UK to Nigeria cargo status",
 ],
 alternates: { canonical: "https://r-zoneenterprises.com/track" },
 openGraph: {
 title: "Track Your UK to Nigeria Cargo Shipment",
 description: "Track your UK to Nigeria shipment in real time. Enter your R-Zone booking reference, Air Waybill or Bill of Lading for live status and milestones.",
 url: "https://r-zoneenterprises.com/track",
 siteName: "R-Zone Enterprises",
 },
};

// BreadcrumbList so Google can show the page's place in the site hierarchy
// in search results instead of a bare URL.
const BREADCRUMB = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: "Home", item: "https://r-zoneenterprises.com/" },
 { "@type": "ListItem", position: 2, name: "Track Shipment", item: "https://r-zoneenterprises.com/track" },
 ],
};

export default function TrackLayout({ children }) {
 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }}
 />
 {children}
 </>
 );
}
