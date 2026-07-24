// app/cargo-from-uk-to-nigeria/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT — commercial landing page (money page) for the head term
// "cargo from UK to Nigeria". Fully static HTML (no client JS) = fastest render
// and best crawlability. Owns its own SEO metadata + JSON-LD directly.
//
// Heading hierarchy is deliberate for SEO: exactly ONE <h1>, section <h2>s,
// sub-points and FAQ questions as <h3>. Self-canonical (respects the July
// canonical fix); title uses { absolute } to avoid the layout brand template
// double-branding.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { Montserrat } from "next/font/google";
import { ORGANIZATION_SCHEMA } from "../../lib/articles";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/cargo-from-uk-to-nigeria`;
const PHONE = "+44 (0) 800 772 0864";
const WHATSAPP = "447915647119";

const TITLE =
  "Cargo from UK to Nigeria 2026 | Door to Door, Air & Sea Freight — From £3/kg";
const DESCRIPTION =
  "Send cargo from the UK to Nigeria from £3/kg. Door to door collection & delivery, air freight (5–10 days) and sea freight (4–6 weeks) to Lagos, Abuja, Port Harcourt & every state. Cheap all-inclusive prices, weekly departures, 107+ five-star reviews. Free same-day quote.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "cargo from UK to Nigeria",
    "cargo to Nigeria from UK",
    "door to door shipping from UK to Nigeria",
    "air freight from UK to Nigeria",
    "sea freight from UK to Nigeria",
    "cheap cargo to Nigeria",
    "cheapest cargo from UK to Nigeria",
    "shipping to Nigeria from UK",
    "send cargo to Nigeria",
    "cargo company UK to Nigeria",
    "cargo prices UK to Nigeria",
    "UK to Nigeria cargo",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "R-Zone Enterprises",
    locale: "en_GB",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cargo from UK to Nigeria — R-Zone Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@RZoneCargo",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

// ── FAQ (rendered visibly AND emitted as FAQPage schema) ─────────────────────
const FAQS = [
  {
    q: "How much does it cost to send cargo from the UK to Nigeria?",
    a: "Cargo from the UK to Nigeria starts from £3/kg by sea and £5/kg by air with R-Zone; door to door starts from £6/kg. A 20kg box is roughly £60–90 by sea or £100–160 by air, all-inclusive of documentation, transit, Nigeria customs clearance and delivery. There are no hidden fees — the price you are quoted is the price you pay.",
  },
  {
    q: "What is the cheapest way to send cargo to Nigeria from the UK?",
    a: "Sea freight from £3/kg is the cheapest way to send cargo to Nigeria, especially for large or heavy shipments. The saving over air grows with weight — a 100kg shipment is about £300–450 by sea versus £500–700 by air. The trade-off is time: 4–6 weeks by sea versus 5–10 working days by air.",
  },
  {
    q: "How long does cargo take to reach Nigeria from the UK?",
    a: "Air freight takes 5–10 working days and sea freight takes 4–6 weeks, each including UK handling, transit to Lagos, Nigeria customs clearance and final delivery. R-Zone runs weekly air and sea departures, so your cargo joins the next available service.",
  },
  {
    q: "Do you offer door to door cargo to Nigeria?",
    a: "Yes. Door to door means we collect from your UK address and deliver to the recipient's door anywhere in Nigeria — no depot visits. It is available on both air and sea from £6/kg, including UK collection, customs clearance and final-mile delivery.",
  },
  {
    q: "Which parts of Nigeria do you deliver to?",
    a: "R-Zone delivers to Lagos, Abuja, Port Harcourt, Ibadan, Kano, Benin City and every state in Nigeria. Delivery to the main cities is included in the standard quote; remote destinations may carry a small onward-delivery charge confirmed upfront at booking.",
  },
  {
    q: "Do you handle Nigerian customs clearance?",
    a: "Yes — every price includes Nigeria customs clearance through Nigeria Customs Service, plus NAFDAC and SON clearance where applicable, handled by our own team in Lagos. Import duty is a separate government charge that most personal-use household goods attract little or none of.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    serviceType: "Cargo shipping from the UK to Nigeria",
    name: "Cargo from UK to Nigeria",
    description: DESCRIPTION,
    provider: ORGANIZATION_SCHEMA,
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Nigeria" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/quote`,
      servicePhone: "+44-800-772-0864",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "UK to Nigeria cargo services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sea freight UK to Nigeria" }, priceCurrency: "GBP", price: "3", description: "From £3/kg, 4–6 weeks" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Air freight UK to Nigeria" }, priceCurrency: "GBP", price: "5", description: "From £5/kg, 5–10 working days" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Door to door cargo UK to Nigeria" }, priceCurrency: "GBP", price: "6", description: "From £6/kg, UK collection + Nigeria doorstep delivery" },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Cargo from UK to Nigeria", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] },
  },
  { "@context": "https://schema.org", ...ORGANIZATION_SCHEMA },
];

// ── Small presentational helpers (server-safe, no client JS) ─────────────────
function CTAButtons({ light = false }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/quote"
        className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0a1fce] text-white text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3.5 transition-colors"
      >
        Get a Free Quote
      </Link>
      <a
        href="tel:+448007720864"
        className={`inline-flex items-center gap-2 border text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-colors ${
          light
            ? "border-white/30 hover:border-white text-white"
            : "border-gray-300 hover:border-[#0818A8] text-gray-800 hover:text-[#0818A8]"
        }`}
      >
        Call {PHONE}
      </a>
      <a
        href={`https://wa.me/${WHATSAPP}`}
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-colors"
      >
        WhatsApp Us
      </a>
    </div>
  );
}

function H2({ id, children }) {
  return (
    <h2
      id={id}
      className="font-black text-[clamp(20px,3.2vw,30px)] text-[#0b0f1a] leading-tight tracking-[-0.02em] uppercase mb-5 pl-4 border-l-[4px] border-[#0818A8]"
    >
      {children}
    </h2>
  );
}

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#000208] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[#0818A8]/20 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6 text-[11px] font-medium text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">Cargo from UK to Nigeria</span>
          </nav>

          <h1 className="font-black text-[clamp(30px,6vw,62px)] leading-[0.95] tracking-[-0.03em] uppercase mb-6 max-w-4xl">
            Cargo from the UK to Nigeria
          </h1>
          <p className="text-white/70 text-[16px] md:text-[18px] font-light leading-relaxed mb-4 max-w-2xl">
            Door to door, air freight and sea freight to Nigeria — from{" "}
            <strong className="font-bold text-white">£3/kg</strong>. All-inclusive prices,
            weekly departures, and delivery to every state in Nigeria. Trusted by 100+ customers
            since 2012.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-white/60 text-[13px] font-medium mb-8">
            <li>Sea from £3/kg</li>
            <li>Air from £5/kg</li>
            <li>Door to door from £6/kg</li>
            <li>107+ five-star reviews</li>
          </ul>
          <CTAButtons light />
        </div>
      </section>

      {/* ── PRICES (cheap prices — the headline commercial hook) ──────────── */}
      <section className="max-w-[1080px] mx-auto px-5 sm:px-8 py-14 md:py-20">
        <H2 id="prices">Cheap Cargo Prices from UK to Nigeria (2026)</H2>
        <p className="text-gray-700 text-[15px] leading-[1.85] mb-8 max-w-3xl">
          R-Zone offers some of the cheapest all-inclusive cargo prices from the UK to Nigeria —
          with no hidden handling fees, fuel surcharges or surprise charges. Every rate below
          includes UK export documentation, transit, Nigeria customs clearance and delivery.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]">
                <th className="p-4 font-bold">Service</th>
                <th className="p-4 font-bold">From</th>
                <th className="p-4 font-bold">Transit time</th>
                <th className="p-4 font-bold">Best for</th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-gray-800">
              <tr className="border-b border-gray-200">
                <td className="p-4 font-bold">Sea freight</td>
                <td className="p-4 font-black text-[#0818A8]">£3 / kg</td>
                <td className="p-4">4–6 weeks</td>
                <td className="p-4">Large, heavy or bulky cargo</td>
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-4 font-bold">Air freight</td>
                <td className="p-4 font-black text-[#0818A8]">£5 / kg</td>
                <td className="p-4">5–10 working days</td>
                <td className="p-4">Urgent or high-value items</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 font-bold">Door to door</td>
                <td className="p-4 font-black text-[#0818A8]">£6 / kg</td>
                <td className="p-4">Air or sea</td>
                <td className="p-4">UK collection + Nigeria doorstep delivery</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-[13.5px] leading-relaxed mt-5 max-w-3xl">
          <strong className="text-gray-900">Example (20kg box, London → Lagos):</strong>{" "}
          sea £60–90 · air £100–160 · door to door £120–180. You pay for actual or volumetric
          weight, whichever is greater — so packing densely keeps your price low.{" "}
          <Link href="/blog/how-much-does-cargo-cost-from-uk-to-nigeria" className="text-[#0818A8] font-semibold underline">
            See the full price breakdown
          </Link>.
        </p>
      </section>

      {/* ── SERVICES: door-to-door, air, sea ─────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-14 md:py-20 space-y-14">
          {/* Door to door */}
          <div>
            <H2 id="door-to-door">Door to Door Shipping from UK to Nigeria</H2>
            <div className="text-gray-700 text-[15px] leading-[1.85] space-y-4 max-w-3xl">
              <p>
                Our <strong>door to door cargo</strong> is the most convenient way to send to
                Nigeria. We collect from your UK address — home or business, anywhere in the
                country — and deliver directly to the recipient&apos;s door in Nigeria. No depot
                visits, no customs queues. From <strong>£6/kg</strong>, all-inclusive.
              </p>
              <h3 className="font-bold text-gray-900 text-[15px] pt-1">What&apos;s included</h3>
              <p>
                UK collection, export documentation, air or sea transit, Nigeria customs clearance
                (NCS, and NAFDAC/SON where applicable) and final-mile delivery to the door — all
                managed by R-Zone with our own teams in the UK and Lagos.
              </p>
              <p>
                <Link href="/blog/door-to-door-shipping-uk-to-nigeria" className="text-[#0818A8] font-semibold underline">
                  Read our complete door to door guide
                </Link>.
              </p>
            </div>
          </div>

          {/* Air freight */}
          <div>
            <H2 id="air-freight">Air Freight from UK to Nigeria</H2>
            <div className="text-gray-700 text-[15px] leading-[1.85] space-y-4 max-w-3xl">
              <p>
                When speed matters, <strong>air freight to Nigeria</strong> delivers in{" "}
                <strong>5–10 working days</strong> from <strong>£5/kg</strong>, with weekly
                departures from Heathrow, Gatwick and Manchester to Lagos. Ideal for electronics,
                phones, documents, medicine, fashion and gifts.
              </p>
              <h3 className="font-bold text-gray-900 text-[15px] pt-1">How air freight is priced</h3>
              <p>
                You pay for actual weight or volumetric weight (L × W × H in cm ÷ 6,000), whichever
                is greater — so a compact, densely packed box always costs less.{" "}
                <Link href="/blog/air-freight-uk-to-nigeria" className="text-[#0818A8] font-semibold underline">
                  Read our air freight guide
                </Link>.
              </p>
            </div>
          </div>

          {/* Sea freight */}
          <div>
            <H2 id="sea-freight">Sea Freight from UK to Nigeria</H2>
            <div className="text-gray-700 text-[15px] leading-[1.85] space-y-4 max-w-3xl">
              <p>
                <strong>Sea freight to Nigeria</strong> is the cheapest option for large or heavy
                cargo — from <strong>£3/kg</strong>, with weekly sailings to Lagos (Apapa and Tin
                Can Island) and a <strong>4–6 week</strong> transit. Perfect for household goods,
                furniture, bulk food, vehicles and commercial shipments.
              </p>
              <h3 className="font-bold text-gray-900 text-[15px] pt-1">LCL and full-container options</h3>
              <p>
                Ship as little-as-a-box (LCL, sharing a container) or book a full 20ft/40ft
                container (FCL) for relocations and high-volume cargo.{" "}
                <Link href="/blog/sea-freight-uk-to-nigeria" className="text-[#0818A8] font-semibold underline">
                  Read our sea freight guide
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="max-w-[1080px] mx-auto px-5 sm:px-8 py-14 md:py-20">
        <H2 id="how-it-works">How to Send Cargo to Nigeria in 4 Steps</H2>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
          {[
            ["1", "Get a free quote", "Tell us what you're sending, the rough weight and your UK & Nigeria locations. Same-day response."],
            ["2", "We collect or you drop off", "We collect from your UK address for door to door, or you drop off at our depot."],
            ["3", "We ship & clear customs", "Air or sea to Lagos, then Nigeria customs clearance by our own Lagos team."],
            ["4", "Delivered in Nigeria", "Your cargo reaches the recipient's door — Lagos, Abuja, Port Harcourt or any state."],
          ].map(([n, t, d]) => (
            <li key={n} className="border border-gray-200 p-6">
              <div className="font-black text-[#0818A8] text-[28px] leading-none mb-3">{n}</div>
              <h3 className="font-bold text-gray-900 text-[14px] mb-2">{t}</h3>
              <p className="text-gray-600 text-[13px] leading-relaxed">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── WHY R-ZONE + DESTINATIONS ────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-14 md:py-20">
          <H2 id="why-r-zone">Why Send Your Cargo to Nigeria with R-Zone</H2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-2 mb-12">
            {[
              ["12+ years of experience", "Shipping UK–Nigeria cargo since 2012, with 50,000+ shipments delivered."],
              ["Transparent, cheap prices", "All-inclusive rates from £3/kg. The price we quote is the price you pay — no hidden fees."],
              ["Weekly air & sea departures", "Your cargo never waits — it joins the next available flight or sailing."],
              ["Own teams in UK & Lagos", "We control collection, customs clearance and delivery end to end."],
              ["107+ five-star reviews", "One of the highest-rated UK-to-Nigeria cargo companies on Google."],
              ["Every state in Nigeria", "Delivery to Lagos, Abuja, Port Harcourt, Ibadan, Kano and beyond."],
            ].map(([t, d]) => (
              <li key={t} className="bg-white border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 text-[14px] mb-2">{t}</h3>
                <p className="text-gray-600 text-[13px] leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>

          <h3 className="font-bold text-gray-900 text-[15px] mb-3">Cargo delivery across Nigeria</h3>
          <p className="text-gray-700 text-[14px] leading-[1.85] max-w-3xl">
            We deliver cargo from the UK to <strong>Lagos, Abuja, Port Harcourt, Ibadan, Benin
            City, Kano, Enugu, Kaduna, Owerri, Warri</strong> and every other state in Nigeria.
            Delivery to the major cities is included in your quote; remote destinations carry a
            small onward-delivery charge that we confirm before you book.
          </p>
        </div>
      </section>

      {/* ── FAQ (visible + FAQPage schema above) ─────────────────────────── */}
      <section className="max-w-[1080px] mx-auto px-5 sm:px-8 py-14 md:py-20">
        <H2 id="faq">Cargo from UK to Nigeria — FAQs</H2>
        <div className="divide-y divide-gray-200 border-y border-gray-200 max-w-3xl">
          {FAQS.map((f) => (
            <div key={f.q} className="py-6">
              <h3 className="font-bold text-gray-900 text-[15px] mb-2">{f.q}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#0818A8] text-white">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-14 md:py-16">
          <h2 className="font-black text-[clamp(22px,3.5vw,32px)] tracking-[-0.02em] mb-3 leading-tight">
            Get your free UK–Nigeria cargo quote today
          </h2>
          <p className="text-white/75 text-[14px] mb-8 max-w-2xl leading-relaxed">
            Sea from £3/kg · Air from £5/kg · Door to door from £6/kg · Weekly departures ·
            Same-day response · 107+ five-star reviews. Tell us what you&apos;re sending and we&apos;ll
            give you the cheapest way to get it to Nigeria.
          </p>
          <CTAButtons light />

          {/* Internal links — spread authority to related pages */}
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/services" className="hover:text-white transition-colors">Our Shipping Services</Link>
            <Link href="/schedulesprices" className="hover:text-white transition-colors">Schedules &amp; Prices</Link>
            <Link href="/track" className="hover:text-white transition-colors">Track a Shipment</Link>
            <Link href="/blog/shipping-to-nigeria-from-uk-2026-guide" className="hover:text-white transition-colors">Complete Shipping Guide</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Shipping Guides</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
