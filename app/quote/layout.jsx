// Server Component   owns the SEO metadata for /quote.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead.
export const metadata = {
  title: "Free UK Nigeria Shipping Quote | R-Zone Enterprises",
  description:
    "Get a free cargo shipping quote from the #1 highest-rated UK-to-Nigeria cargo company on Google. Cargo to Nigeria from UK by air freight from £5/kg or sea freight from £3/kg. Same-day response. 100+ five-star reviews.",
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
    title: "Free UK Nigeria Shipping Quote | R-Zone Enterprises",
    description:
      "The #1 highest-rated UK-to-Nigeria cargo company on Google. Get your free quote in 4 steps. Same-day response.",
    url: "https://r-zoneenterprises.com/quote",
    siteName: "R-Zone Enterprises",
  },
};

export default function QuoteLayout({ children }) {
  return children;
}
