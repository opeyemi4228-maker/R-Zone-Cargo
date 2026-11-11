// Server Component owns the SEO metadata for /business-solutions.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead.
export const metadata = {
 title: { absolute: "Business Cargo and Logistics: UK to Nigeria" },
 description: "Business shipping between the UK and Nigeria: air and sea freight, door to door delivery, customs clearance, warehousing and account terms.",
 keywords: [
 "UK Nigeria cargo company",
 "air freight Nigeria",
 "sea freight Nigeria UK",
 "door to door cargo Nigeria",
 "customs clearance Nigeria UK",
 "import from Nigeria to UK",
 "cargo Abuja",
 "cargo Lagos",
 "UK Nigeria shipping company",
 "freight forwarding Nigeria",
 ],
 alternates: { canonical: "https://r-zoneenterprises.com/business-solutions" },
 openGraph: {
 title: "Business Cargo and Logistics: UK to Nigeria",
 description: "Business shipping between the UK and Nigeria: air and sea freight, door to door delivery, customs clearance, warehousing and account terms.",
 url: "https://r-zoneenterprises.com/business-solutions",
 siteName: "R-Zone Enterprises",
 type: "website",
 locale: "en_GB",
 images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "R-Zone Cargo: UK to Nigeria shipping" }],
 },
 twitter: {
 card: "summary_large_image",
 title: "Business Cargo and Logistics: UK to Nigeria",
 description: "Business shipping between the UK and Nigeria: air and sea freight, door to door delivery, customs clearance, warehousing and account terms.",
 images: ["/images/og-default.jpg"],
 },
};

export default function BusinessSolutionsLayout({ children }) {
 return children;
}
