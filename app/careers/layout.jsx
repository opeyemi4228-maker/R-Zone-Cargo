// Server Component owns the SEO metadata for /careers.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
  title: { absolute: "Careers at R-Zone Enterprises | UK Nigeria Cargo Jobs" },
  description:
    "Explore careers at R-Zone Enterprises, a leading UK to Nigeria cargo and shipping company. Join our UK and Lagos operations teams and help deliver for the diaspora.",
  alternates: { canonical: "https://r-zoneenterprises.com/careers" },
  openGraph: {
    title: "Careers at R-Zone Enterprises | UK Nigeria Cargo Jobs",
    description:
      "Explore careers at R-Zone Enterprises, a leading UK to Nigeria cargo and shipping company. Join our UK and Lagos operations teams and help deliver for the diaspora.",
    url: "https://r-zoneenterprises.com/careers",
    siteName: "R-Zone Enterprises",
  },
};

export default function CareersLayout({ children }) {
  return children;
}
