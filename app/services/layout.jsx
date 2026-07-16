// Server Component   owns the SEO metadata for /services.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead.
export const metadata = {
  title: "UK Nigeria Cargo Services | R-Zone Enterprises",
  description:
    "Air freight to Nigeria, sea freight to Nigeria from UK, door to door cargo Nigeria and customs clearance by R-Zone Enterprises. Weekly departures and UK-wide collection.",
  keywords: [
    "UK Nigeria cargo services",
    "air freight to Nigeria",
    "sea freight to Nigeria from UK",
    "door to door cargo Nigeria",
    "Nigeria customs clearance UK",
    "cargo to Nigeria from UK",
    "UK to Nigeria shipping",
    "Lagos cargo from UK",
    "Abuja cargo from UK",
  ],
  alternates: { canonical: "https://r-zoneenterprises.com/services" },
  openGraph: {
    title: "UK Nigeria Cargo Services | R-Zone Enterprises",
    description:
      "Air freight to Nigeria, sea freight to Nigeria from UK, door to door cargo Nigeria and customs clearance by R-Zone Enterprises. Weekly departures and UK-wide collection.",
    url: "https://r-zoneenterprises.com/services",
    siteName: "R-Zone Enterprises",
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
