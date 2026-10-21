// Server Component owns the SEO metadata for /rzone.
// The page is a Client Component, so its metadata lives here. Without this
// file /rzone inherited the root title, the exact title of the homepage, and
// Google split brand searches ("rzone", "r-zone") between the two URLs. A
// distinct group-level title and a self-canonical give each page its own job:
// the homepage for cargo, /rzone for the R-Zone International group.
const TITLE = "R-Zone International: The Group Behind R-Zone Cargo";
const DESCRIPTION =
  "Meet R-Zone International, the Essex-based group behind R-Zone Cargo: UK to Nigeria freight since 2012, with R-Zone Homes and Shortlets coming soon.";
const URL = "https://r-zoneenterprises.com/rzone";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "R-Zone Enterprises",
    images: [{ url: "https://r-zoneenterprises.com/images/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default function RZoneLayout({ children }) {
  return children;
}
