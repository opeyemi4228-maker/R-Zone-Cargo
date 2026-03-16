import React from 'react';
import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BodyCleanup from "@/components/BodyCleanup";
import ToasterProvider from "@/components/ToasterProvider";

// ─── Font ─────────────────────────────────────────────────────────────────────
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",          // Prevents invisible text during font load (CLS)
  preload: true,
  variable: "--font-outfit",
});

// ─── Site-wide constants ──────────────────────────────────────────────────────
const SITE_URL  = "https://r-zoneenterprises.com";
const SITE_NAME = "R-Zone Enterprises";
const LOGO_URL  = `${SITE_URL}/wp-content/uploads/2022/09/Logo-colour-112.png`;

// ─── Root metadata — all real data from r-zoneenterprises.com ────────────────
export const metadata = {

  // ── Canonical base for all relative OG/Twitter image URLs ─────────────────
  metadataBase: new URL(SITE_URL),

  // ── Primary title & description ───────────────────────────────────────────
  title: {
    // Template is applied to every child page: "Page Name | R-Zone Enterprises"
    default:  "R-Zone Enterprises | Door to Door Cargo to Nigeria from UK",
    template: "%s | R-Zone Enterprises",
  },
  description:
    "R-Zone Enterprises offers door to door cargo to Nigeria from the UK, air freight to Nigeria, sea shipping, car shipping, and importation from Nigeria. Trusted by 107+ customers. Call: +44 800 772 0864.",

  // ── Keyword targeting — real services from the site ───────────────────────
  keywords: [
    // Core service terms
    "door to door cargo to Nigeria",
    "cargo to Nigeria from UK",
    "air freight to Nigeria",
    "sea shipping to Nigeria",
    "sea freight to Nigeria UK",
    "shipping to Nigeria from UK",
    "car shipping to Nigeria",
    "importation from Nigeria",
    "freight to Nigeria",
    "cargo from UK to Nigeria",
    // Location + brand terms
    "R-Zone Enterprises",
    "R-Zone Cargo",
    "RZE cargo",
    "shipping Nigeria Essex",
    "Nigeria cargo Essex",
    "Lagos cargo UK",
    "send parcel to Nigeria",
    "Nigeria shipping company UK",
    "cheap cargo to Nigeria",
    "door to door Nigeria delivery",
    // Long-tail
    "air cargo Lagos Abuja Port Harcourt",
    "Nigeria customs clearance UK",
    "vehicle shipping Nigeria",
    "African foodstuff import UK",
    "weekly air freight Nigeria",
    "monthly sea freight Nigeria",
  ],

  // ── Authorship & canonical ────────────────────────────────────────────────
  authors:   [{ name: "R-Zone Enterprises", url: SITE_URL }],
  creator:   "R-Zone Enterprises",
  publisher: "R-Zone Enterprises",
  generator: "Next.js",
  referrer:  "strict-origin-when-cross-origin",

  // ── Canonical URL ─────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-GB": SITE_URL,
      "en-NG": `${SITE_URL}/ng`,
    },
  },

  // ── Open Graph — social sharing ───────────────────────────────────────────
  openGraph: {
    type:        "website",
    url:          SITE_URL,
    siteName:     SITE_NAME,
    locale:      "en_GB",
    title:       "R-Zone Enterprises | Door to Door Cargo to Nigeria from UK",
    description:
      "Shipping services to Nigeria by air freight and sea freight. Door to door cargo, car shipping, and importation from Nigeria. Over 10 years experience. 107+ 5-star reviews.",
    images: [
      {
        url:    "/og-image.jpg",          // Place a 1200×630 image at /public/og-image.jpg
        width:  1200,
        height: 630,
        alt:    "R-Zone Enterprises — Door to Door Cargo to Nigeria from UK",
        type:   "image/jpeg",
      },
    ],
  },

  // ── Twitter / X card ──────────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    site:        "@rzoneenterprise",
    creator:     "@rzoneenterprise",
    title:       "R-Zone Enterprises | Cargo to Nigeria from UK",
    description:
      "Door to door cargo, air freight & sea shipping to Nigeria. Trusted UK-based shipping company serving all 36 Nigerian states.",
    images:      ["/og-image.jpg"],
  },

  // ── Verification placeholders — add real tokens when available ────────────
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
    // bing:   "REPLACE_WITH_BING_WEBMASTER_TOKEN",
    // yandex: "REPLACE_WITH_YANDEX_TOKEN",
  },

  // ── Robots — full indexing, no AI training ────────────────────────────────
  robots: {
    index:               true,
    follow:              true,
    nocache:             false,
    googleBot: {
      index:             true,
      follow:            true,
      "max-video-preview":  -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  // ── Icons — place files in /public ────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico",              sizes: "any" },
      { url: "/icon-16.png",  type: "image/png", sizes: "16x16" },
      { url: "/icon-32.png",  type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple:    [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut:  "/favicon.ico",
  },

  // ── PWA manifest ──────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Category ──────────────────────────────────────────────────────────────
  category: "logistics",

  // ── App-specific meta ─────────────────────────────────────────────────────
  applicationName: SITE_NAME,
  appleWebApp: {
    capable:         true,
    title:           SITE_NAME,
    statusBarStyle:  "black-translucent",
  },

  // ── Format detection — prevent iOS auto-linking phone numbers in meta ─────
  formatDetection: {
    telephone: false,
    email:     false,
    address:   false,
  },
};

// ─── Viewport — separate export required by Next.js 14+ ──────────────────────
export const viewport = {
  width:                "device-width",
  initialScale:          1,
  maximumScale:          5,         // Allow pinch-zoom (accessibility)
  userScalable:          true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0818A8" },
    { media: "(prefers-color-scheme: dark)",  color: "#00061a" },
  ],
  colorScheme: "light dark",
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"                     // Correct locale — company is UK-based
      dir="ltr"
      suppressHydrationWarning         // Suppress extension-injected attribute mismatches
    >
      <head>
        {React.Children.toArray([
          /* ── DNS prefetch & preconnect — speeds up third-party resources ── */
          <link key="preconnect-google" rel="preconnect" href="https://fonts.googleapis.com" />,
          <link key="preconnect-gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
          <link key="dns-google-analytics" rel="dns-prefetch" href="//www.google-analytics.com" />,
          <link key="dns-gtm" rel="dns-prefetch" href="//www.googletagmanager.com" />,
          <link key="dns-maps" rel="dns-prefetch" href="//maps.googleapis.com" />,
          <link key="dns-wa" rel="dns-prefetch" href="//wa.me" />,

          /* ── Geo meta — both offices ───────────────────────────────────── */
          <meta key="geo-region" name="geo.region" content="GB-ESS" />,
          <meta key="geo-placename" name="geo.placename" content="Essex, United Kingdom" />,
          <meta key="geo-position" name="geo.position" content="51.5078;0.2648" />,
          <meta key="icbm" name="ICBM" content="51.5078, 0.2648" />,

          /* ── Business contact meta ─────────────────────────────────────── */
          <meta key="contact" name="contact" content="info@r-zoneenterprises.com" />,
          <meta key="reply-to" name="reply-to" content="info@r-zoneenterprises.com" />,

          /* ── Security headers via meta (supplement next.config.js headers) */
          <meta key="x-content-type" httpEquiv="X-Content-Type-Options" content="nosniff" />,
          <meta key="x-frame-options" httpEquiv="X-Frame-Options" content="SAMEORIGIN" />,

          /* ── JSON-LD: LocalBusiness schema ─────────────────────────────── */
          <script
            key="json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [

                  // ── Primary: MovingCompany (most accurate for cargo/shipping)
                  {
                    "@type": ["MovingCompany", "LocalBusiness"],
                    "@id":    `${SITE_URL}/#organization`,
                    "name":   "R-Zone Enterprises",
                    "alternateName": ["R-Zone Cargo", "RZE", "R Zone Enterprises"],
                    "url":     SITE_URL,
                    "logo": {
                      "@type":  "ImageObject",
                      "url":     LOGO_URL,
                      "width":   300,
                      "height":  100,
                    },
                    "image":  LOGO_URL,
                    "description":
                      "R-Zone Enterprises provides door to door cargo to Nigeria from the UK, air freight, sea shipping, car shipping, and importation from Nigeria. Serving all 36 Nigerian states since 2012.",
                    "foundingDate": "2012",
                    "telephone":    "+448007720864",
                    "email":        "info@r-zoneenterprises.com",
                    "priceRange":   "££",
                    "currenciesAccepted": "GBP",
                    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
                    "openingHoursSpecification": [
                      {
                        "@type":      "OpeningHoursSpecification",
                        "dayOfWeek":  ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                        "opens":      "10:00",
                        "closes":     "18:00",
                      },
                      {
                        "@type":      "OpeningHoursSpecification",
                        "dayOfWeek":  "Saturday",
                        "opens":      "11:00",
                        "closes":     "14:00",
                      },
                    ],

                    // UK office — primary
                    "address": {
                      "@type":           "PostalAddress",
                      "streetAddress":   "Unit 10 Moorhen Yard, Elms Lane",
                      "addressLocality": "Upminster",
                      "addressRegion":   "Essex",
                      "postalCode":      "RM14 3TS",
                      "addressCountry":  "GB",
                    },

                    // Nigeria office — branch
                    "branchOf": {
                      "@id": `${SITE_URL}/#organization`,
                    },
                    "hasMap": "https://maps.app.goo.gl/QXnmYSxB8CeZ7hmv8",

                    // Real service areas
                    "areaServed": [
                      { "@type": "Country",   "name": "United Kingdom" },
                      { "@type": "Country",   "name": "Nigeria" },
                      { "@type": "Country",   "name": "Ghana" },
                      { "@type": "Country",   "name": "Uganda" },
                      { "@type": "Country",   "name": "South Africa" },
                      { "@type": "Country",   "name": "United States" },
                      { "@type": "Country",   "name": "Canada" },
                      { "@type": "Continent", "name": "Africa" },
                      { "@type": "Continent", "name": "Asia" },
                      { "@type": "Continent", "name": "Europe" },
                      { "@type": "Continent", "name": "North America" },
                      { "@type": "Continent", "name": "South America" },
                      { "@type": "Continent", "name": "Australasia" },
                    ],

                    // Real services from the site
                    "hasOfferCatalog": {
                      "@type": "OfferCatalog",
                      "name":  "R-Zone Cargo & Shipping Services",
                      "itemListElement": [
                        {
                          "@type": "Offer",
                          "itemOffered": {
                            "@type":       "Service",
                            "name":        "Air Freight to Nigeria from UK",
                            "description": "Cost-effective air freight from the UK to Lagos, Abuja, Port Harcourt, and all 36 Nigerian states. Door to door delivery available.",
                            "url":          `${SITE_URL}/air-freight/`,
                            "areaServed":  "Nigeria",
                          },
                        },
                        {
                          "@type": "Offer",
                          "itemOffered": {
                            "@type":       "Service",
                            "name":        "Door to Door Cargo to Nigeria",
                            "description": "Professional door to door cargo service to Nigeria using both air and sea freight. Collection from your address in the UK.",
                            "url":          `${SITE_URL}/door-to-door-cargo/`,
                            "areaServed":  "Nigeria",
                          },
                        },
                        {
                          "@type": "Offer",
                          "itemOffered": {
                            "@type":       "Service",
                            "name":        "Sea Shipping to Nigeria",
                            "description": "Monthly sea freight service from the UK to Nigeria. Ideal for heavy or bulk cargo shipments at affordable rates.",
                            "url":          `${SITE_URL}/sea-shipping-to-nigeria/`,
                            "areaServed":  "Nigeria",
                          },
                        },
                        {
                          "@type": "Offer",
                          "itemOffered": {
                            "@type":       "Service",
                            "name":        "Car Shipping to Nigeria",
                            "description": "Vehicle shipping from the UK to Nigeria and other African destinations. Full customs clearance assistance included.",
                            "url":          `${SITE_URL}/prices/`,
                            "areaServed":  ["Nigeria", "Africa"],
                          },
                        },
                        {
                          "@type": "Offer",
                          "itemOffered": {
                            "@type":       "Service",
                            "name":        "Importation from Nigeria to UK",
                            "description": "Weekly air freight and monthly sea freight for importing African foodstuffs and goods from Nigeria to the UK. Minimum 20kg.",
                            "url":          `${SITE_URL}/importation-from-nigeria/`,
                            "areaServed":  "United Kingdom",
                          },
                        },
                        {
                          "@type": "Offer",
                          "itemOffered": {
                            "@type":       "Service",
                            "name":        "Freight to Nigeria",
                            "description": "General freight and cargo shipping services to Nigeria from the UK. Competitive rates for all cargo types.",
                            "url":          `${SITE_URL}/naija-shipping/`,
                            "areaServed":  "Nigeria",
                          },
                        },
                      ],
                    },

                    // Real reviews
                    "aggregateRating": {
                      "@type":       "AggregateRating",
                      "ratingValue": "5",
                      "reviewCount": "107",
                      "bestRating":  "5",
                      "worstRating": "1",
                    },

                    "review": [
                      {
                        "@type":  "Review",
                        "author": { "@type": "Person", "name": "Oluwatobi Odewumi" },
                        "reviewBody":
                          "Best cargo service with rest assurance of safety delivery without any damage, have been using for over 6 years.",
                        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                      },
                      {
                        "@type":  "Review",
                        "author": { "@type": "Person", "name": "Duyiro Soba Felix" },
                        "reviewBody":
                          "All my shipment arrived safely. Door to door service is brilliant even to the NorthEast they delivered on time. They can deliver everywhere in Nigeria.",
                        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                      },
                      {
                        "@type":  "Review",
                        "author": { "@type": "Person", "name": "Liz" },
                        "reviewBody":
                          "The delivery was swift and intact. Nothing missing, nothing damaged. Very pleased with the service.",
                        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                      },
                    ],

                    "contactPoint": {
                      "@type":             "ContactPoint",
                      "telephone":         "+44-800-772-0864",
                      "contactType":       "customer service",
                      "areaServed":        ["GB", "NG"],
                      "availableLanguage": "English",
                      "hoursAvailable": {
                        "@type":     "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                        "opens":     "10:00",
                        "closes":    "18:00",
                      },
                    },

                    "sameAs": [
                      "https://www.instagram.com/rzoneenterprise",
                    ],
                  },

                  // ── WebSite schema — enables Google Sitelinks Search Box ──
                  {
                    "@type":   "WebSite",
                    "@id":     `${SITE_URL}/#website`,
                    "url":      SITE_URL,
                    "name":     SITE_NAME,
                    "description":
                      "Door to door cargo to Nigeria from the UK. Air freight, sea shipping, car shipping, and importation services.",
                    "publisher": { "@id": `${SITE_URL}/#organization` },
                    "inLanguage": "en-GB",
                    "potentialAction": {
                      "@type":       "SearchAction",
                      "target": {
                        "@type":  "EntryPoint",
                        "urlTemplate": `${SITE_URL}/search?q={search_term_string}`,
                      },
                      "query-input": "required name=search_term_string",
                    },
                  },

                ], // end @graph
              }),
            }}
          />,
        ]).filter(child => typeof child !== 'string' || child.trim())}
      </head>

      <body
        className={`${outfit.className} antialiased text-gray-700`}
        suppressHydrationWarning    // Prevent hydration mismatch from browser extensions
      >
        {/*
          BodyCleanup removes any attributes injected by browser extensions
          (e.g. Grammarly, LastPass, Bitwarden) that cause React hydration errors.
        */}
        <BodyCleanup />

        {/* Toast notifications — positioned top-right, non-intrusive */}
        <ToasterProvider />

        {/*
          Skip-to-content link — WCAG 2.1 AA accessibility requirement.
          Visually hidden until focused; lets keyboard users skip nav.
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#0818A8] focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-bold focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>

        {/* Site navigation */}
        <Navbar />

        {/*
          Main content wrapper.
          id="main-content" is the skip-link target.
          role="main" duplicates <main> semantics for older assistive tech.
        */}
        <AppContextProvider>
          <div id="main-content" role="main">
            {children}
          </div>
        </AppContextProvider>

        {/* Site footer */}
        <Footer />

      </body>
    </html>
  );
}

/*
════════════════════════════════════════════════════════════════════════════════
  REQUIRED: next.config.js Security Headers
  Copy the headers() block below into your next.config.js.
  Meta-tag equivalents above are fallbacks only — real protection needs these.
════════════════════════════════════════════════════════════════════════════════

/** @type {import('next').NextConfig} * /
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [

          // ── Clickjacking protection ──────────────────────────────────
          { key: "X-Frame-Options", value: "SAMEORIGIN" },

          // ── MIME-type sniffing protection ────────────────────────────
          { key: "X-Content-Type-Options", value: "nosniff" },

          // ── XSS filter (legacy browsers) ────────────────────────────
          { key: "X-XSS-Protection", value: "1; mode=block" },

          // ── Referrer policy ─────────────────────────────────────────
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // ── DNS prefetch control ─────────────────────────────────────
          { key: "X-DNS-Prefetch-Control", value: "on" },

          // ── Permissions policy — disable unused browser APIs ─────────
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=(self)",
              "payment=(self)",
              "usb=()",
              "magnetometer=()",
              "accelerometer=()",
            ].join(", "),
          },

          // ── Content Security Policy ──────────────────────────────────
          // Tighten these per your actual third-party dependencies.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://trustindex.io",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https: http:",
              "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://wa.me",
              "frame-src 'self' https://www.youtube.com https://maps.google.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },

          // ── HSTS — force HTTPS for 1 year ───────────────────────────
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },

          // ── Cross-origin policies ───────────────────────────────────
          { key: "Cross-Origin-Opener-Policy",   value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy",  value: "unsafe-none" },
          { key: "Cross-Origin-Resource-Policy",  value: "same-site" },
        ],
      },
    ];
  },

  // ── Image optimisation ─────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,   // 1 year
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "r-zoneenterprises.com" },
    ],
  },

  // ── Compiler ──────────────────────────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",  // Strip console.* in prod
  },

  // ── Power by header — hide Next.js fingerprint ────────────────────────────
  poweredByHeader: false,

  // ── Compression ───────────────────────────────────────────────────────────
  compress: true,

  // ── Strict mode ───────────────────────────────────────────────────────────
  reactStrictMode: true,
};

module.exports = nextConfig;
*/