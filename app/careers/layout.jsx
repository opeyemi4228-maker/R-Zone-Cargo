// Server Component owns the SEO metadata for /careers.
// The page itself is a Client Component ("use client"), which cannot export
// `metadata`, so it lives here instead. Unique title + description + a
// self-referential canonical prevent "Duplicate without user-selected
// canonical" in Google Search Console. title.absolute opts out of the root
// title template so the brand is not repeated.
export const metadata = {
 title: { absolute: "Careers at R-Zone: UK and Nigeria Cargo Jobs" },
 description: "Jobs at R-Zone Enterprises across our UK and Lagos operations teams. Help move cargo between Britain and Nigeria for families and businesses.",
  alternates: { canonical: "https://r-zoneenterprises.com/careers" },
  openGraph: {
    title: "Careers at R-Zone: UK and Nigeria Cargo Jobs",
    description: "Jobs at R-Zone Enterprises across our UK and Lagos operations teams. Help move cargo between Britain and Nigeria for families and businesses.",
    url: "https://r-zoneenterprises.com/careers",
    siteName: "R-Zone Enterprises",
   type: "website",
   locale: "en_GB",
   images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "R-Zone Cargo: UK to Nigeria shipping" }],
  },
  twitter: {
   card: "summary_large_image",
   title: "Careers at R-Zone: UK and Nigeria Cargo Jobs",
   description: "Jobs at R-Zone Enterprises across our UK and Lagos operations teams. Help move cargo between Britain and Nigeria for families and businesses.",
   images: ["/images/og-default.jpg"],
  },
};

export default function CareersLayout({ children }) {
  return children;
}
