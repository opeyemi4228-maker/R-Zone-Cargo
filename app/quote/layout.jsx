// Server Component owns the SEO metadata for /quote.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead.
export const metadata = {
 title: { absolute: "Free UK to Nigeria Cargo Quote: Air, Sea, Door to Door" },
 description: "Get a free UK to Nigeria cargo quote: air from £5.50/kg, sea from £3/kg, door to door from £6/kg. Same-day reply, customs clearance included.",
 keywords: [
 "shipping quote UK to Nigeria",
 "cargo quote Nigeria UK",
 "air freight quote Nigeria",
 "sea freight quote UK Nigeria",
 "cargo Abuja",
 "cargo Lagos",
 "UK Nigeria cargo company",
 ],
 alternates: { canonical: "https://r-zoneenterprises.com/quote" },
 openGraph: {
 title: "Free UK to Nigeria Cargo Quote: Air, Sea, Door to Door",
 description: "Get a free UK to Nigeria cargo quote: air from £5.50/kg, sea from £3/kg, door to door from £6/kg. Same-day reply, customs clearance included.",
 url: "https://r-zoneenterprises.com/quote",
 siteName: "R-Zone Enterprises",
 },
};

export default function QuoteLayout({ children }) {
 return children;
}
