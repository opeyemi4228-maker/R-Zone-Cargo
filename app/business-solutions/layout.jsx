// Server Component   owns the SEO metadata for /business-solutions.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead.
export const metadata = {
  title: "UK Nigeria Business Cargo & Logistics Solutions | R-Zone Enterprises",
  description:
    "The highest-rated UK-to-Nigeria cargo company on Google. Air freight from £5/kg, sea freight from £3/kg, door-to-door cargo to Nigeria from UK, customs clearance, warehousing and importation from Nigeria. 100+ five-star reviews. Weekly departures. Same-day response.",
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
    title: "UK Nigeria Business Cargo & Logistics Solutions | R-Zone Enterprises",
    description:
      "The highest-rated UK-to-Nigeria cargo company on Google. Air freight from £5/kg, sea freight from £3/kg, door-to-door cargo to Nigeria from UK, customs clearance, warehousing and importation from Nigeria. 100+ five-star reviews.",
    url: "https://r-zoneenterprises.com/business-solutions",
    siteName: "R-Zone Enterprises",
  },
};

export default function BusinessSolutionsLayout({ children }) {
  return children;
}
