// app/cargo-from-uk-to-nigeria/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT — commercial landing page (money page) for the head term
// "cargo from UK to Nigeria". Fully static HTML (no client JS) = fastest render
// and best crawlability. Landing-page structure (prices, service cards, steps,
// why-us, destinations, FAQ) that competitors rank with, but the HERO matches
// the /blog post hero: faint image band + strong dark gradient + content pulled
// into the dark zone. Owns its own SEO metadata + JSON-LD.
// Heading hierarchy: one <h1>, section <h2>s, <h3> sub-headings. Self-canonical;
// title:{absolute} avoids brand-template double-branding. No em/en dashes.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Plane,
  Ship,
  Truck,
  PoundSterling,
  ShieldCheck,
  Star,
  MapPin,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Check,
  Award,
  Zap,
  Globe,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../lib/articles";
import ShareRow from "./ShareRow";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/cargo-from-uk-to-nigeria`;
const WHATSAPP = "447915647119";
const HERO_IMG =
  "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1600&q=80&auto=format&fit=crop";

const TITLE =
  "Cargo from UK to Nigeria 2026 | Door to Door, Air & Sea Freight from £3/kg";
const DESCRIPTION =
  "Send cargo from the UK to Nigeria from £3/kg. Door to door collection and delivery, air freight (5 to 10 days) and sea freight (4 to 6 weeks) to Lagos, Abuja, Port Harcourt and every state. Cheap all inclusive prices, weekly departures, 107+ five star reviews. Free same day quote.";

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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cargo from UK to Nigeria, R-Zone Enterprises" }],
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

const FAQS = [
  {
    q: "How much does it cost to send cargo from the UK to Nigeria?",
    a: "Cargo from the UK to Nigeria starts from £3/kg by sea and £5/kg by air with R-Zone; door to door starts from £6/kg. A 20kg box is roughly £60 to £90 by sea or £100 to £160 by air, all inclusive of documentation, transit, Nigeria customs clearance and delivery. There are no hidden fees. The price you are quoted is the price you pay.",
  },
  {
    q: "What is the cheapest way to send cargo to Nigeria from the UK?",
    a: "Sea freight from £3/kg is the cheapest way to send cargo to Nigeria, especially for large or heavy shipments. The saving over air grows with weight: a 100kg shipment is about £300 to £450 by sea versus £500 to £700 by air. The trade off is time, 4 to 6 weeks by sea versus 5 to 10 working days by air.",
  },
  {
    q: "How long does cargo take to reach Nigeria from the UK?",
    a: "Air freight takes 5 to 10 working days and sea freight takes 4 to 6 weeks, each including UK handling, transit to Lagos, Nigeria customs clearance and final delivery. R-Zone runs weekly air and sea departures, so your cargo joins the next available service.",
  },
  {
    q: "Do you offer door to door cargo to Nigeria?",
    a: "Yes. Door to door means we collect from your UK address and deliver to the recipient door anywhere in Nigeria, with no depot visits. It is available on both air and sea from £6/kg, including UK collection, customs clearance and final mile delivery.",
  },
  {
    q: "Which parts of Nigeria do you deliver to?",
    a: "R-Zone delivers to Lagos, Abuja, Port Harcourt, Ibadan, Kano, Benin City and every state in Nigeria. Delivery to the main cities is included in the standard quote; remote destinations may carry a small onward delivery charge confirmed upfront at booking.",
  },
  {
    q: "Do you handle Nigerian customs clearance?",
    a: "Yes. Every price includes Nigeria customs clearance through Nigeria Customs Service, plus NAFDAC and SON clearance where applicable, handled by our own team in Lagos. Import duty is a separate government charge that most personal use household goods attract little or none of.",
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
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sea freight UK to Nigeria" }, priceCurrency: "GBP", price: "3", description: "From £3/kg, 4 to 6 weeks" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Air freight UK to Nigeria" }, priceCurrency: "GBP", price: "5", description: "From £5/kg, 5 to 10 working days" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Door to door cargo UK to Nigeria" }, priceCurrency: "GBP", price: "6", description: "From £6/kg, UK collection plus Nigeria doorstep delivery" },
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
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] },
  },
  { "@context": "https://schema.org", ...ORGANIZATION_SCHEMA },
];

function CTAButtons({ light = false }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/quote"
        className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0a1fce] text-white text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3.5 transition-colors"
      >
        Get a Free Quote
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </Link>
      <a
        href="tel:+448007720864"
        className={`inline-flex items-center gap-2 border text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-colors ${
          light ? "border-white/30 hover:border-white text-white" : "border-gray-300 hover:border-[#0818A8] text-gray-800 hover:text-[#0818A8]"
        }`}
      >
        <PhoneCall size={13} aria-hidden="true" /> Call Us
      </a>
      <a
        href={`https://wa.me/${WHATSAPP}`}
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-colors"
      >
        <MessageCircle size={13} aria-hidden="true" /> WhatsApp
      </a>
    </div>
  );
}

function H2({ id, eyebrow, children }) {
  return (
    <div className="mb-7">
      {eyebrow && (
        <p className="text-[12px] font-black tracking-[0.3em] uppercase text-[#0818A8] mb-3">{eyebrow}</p>
      )}
      <h2
        id={id}
        className="font-black text-[clamp(26px,4.2vw,40px)] text-[#0b0f1a] leading-[1.03] tracking-[-0.02em] uppercase"
      >
        {children}
      </h2>
    </div>
  );
}

const SERVICES = [
  { icon: Truck, name: "Door to Door Shipping", price: "From £6/kg", transit: "Air or sea", href: "/blog/door-to-door-shipping-uk-to-nigeria",
    points: ["We collect from any UK address", "Delivered to the recipient door in Nigeria", "No depot visits, no customs queues"] },
  { icon: Plane, name: "Air Freight", price: "From £5/kg", transit: "5 to 10 working days", href: "/blog/air-freight-uk-to-nigeria",
    points: ["Weekly flights to Lagos", "Ideal for urgent and high value goods", "Electronics, documents, fashion, medicine"] },
  { icon: Ship, name: "Sea Freight", price: "From £3/kg", transit: "4 to 6 weeks", href: "/blog/sea-freight-uk-to-nigeria",
    points: ["The cheapest option for heavy cargo", "Weekly sailings to Lagos", "Household goods, furniture, vehicles"] },
];

const STEPS = [
  ["Get a free quote", "Tell us what you are sending, the rough weight and your UK and Nigeria locations. Same day response."],
  ["We collect or you drop off", "We collect from your UK address for door to door, or you drop off at our depot."],
  ["We ship and clear customs", "Air or sea to Lagos, then Nigeria customs clearance by our own Lagos team."],
  ["Delivered in Nigeria", "Your cargo reaches the recipient door in Lagos, Abuja, Port Harcourt or any state."],
];

const WHY = [
  [Award, "12+ years of experience", "Shipping UK to Nigeria cargo since 2012, with 50,000+ shipments delivered."],
  [PoundSterling, "Transparent, cheap prices", "All inclusive rates from £3/kg. The price we quote is the price you pay, with no hidden fees."],
  [Zap, "Weekly air and sea departures", "Your cargo never waits. It joins the next available flight or sailing."],
  [ShieldCheck, "Own teams in UK and Lagos", "We control collection, customs clearance and delivery from end to end."],
  [Star, "107+ five star reviews", "One of the highest rated UK to Nigeria cargo companies on Google."],
  [Globe, "Every state in Nigeria", "Delivery to Lagos, Abuja, Port Harcourt, Ibadan, Kano and beyond."],
];

const CITIES = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Benin City", "Kano", "Enugu", "Kaduna", "Owerri", "Warri", "Uyo", "Every state"];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── HERO (editorial: headline + subtitle on white, then image with ── */}
      {/*    author/date overlaid bottom-left and share buttons bottom-right) ── */}
      <section className="bg-white">
        {/* pt clears the fixed Navbar (taller on mobile: ~130px, ~100px on desktop) */}
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[120px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">
            Cargo from the UK to Nigeria: Door to Door, Air, Sea &amp; Cheap Prices
          </h1>

          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">
            Door to door, air freight and sea freight to Nigeria from{" "}
            <strong className="font-semibold text-gray-700">£3 per kg</strong>. All inclusive
            prices, weekly departures, and delivery to every state in Nigeria.
          </p>

          {/* Feature image with overlaid meta + share */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image
              src={HERO_IMG}
              alt="Container ship loaded with cargo bound from the UK to Nigeria"
              fill
              priority
              sizes="(max-width: 940px) 100vw, 940px"
              className="object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />

            {/* Meta — bottom left */}
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div>
                <p className="text-white/65 text-[11px] font-medium mb-1">Written by</p>
                <p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p>
              </div>
              <div>
                <p className="text-white/65 text-[11px] font-medium mb-1">Published on</p>
                <p className="text-white text-[14px] font-bold">24 July 2026</p>
              </div>
            </div>

            {/* Share — bottom right */}
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8">
              <ShareRow url={PAGE_URL} title={TITLE} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICES ────────────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="prices" eyebrow="Cheap, all inclusive rates">Cargo Prices from UK to Nigeria (2026)</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">
          R-Zone offers some of the cheapest all inclusive cargo prices from the UK to Nigeria,
          with no hidden handling fees, fuel surcharges or surprise charges. Every rate below
          includes UK export documentation, transit, Nigeria customs clearance and delivery.
        </p>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]">
                <th className="p-4 font-bold">Service</th>
                <th className="p-4 font-bold">From</th>
                <th className="p-4 font-bold">Transit time</th>
                <th className="p-4 font-bold">Best for</th>
              </tr>
            </thead>
            <tbody className="text-[15px] text-gray-800">
              {[
                [Ship, "Sea freight", "£3 / kg", "4 to 6 weeks", "Large, heavy or bulky cargo"],
                [Plane, "Air freight", "£5 / kg", "5 to 10 working days", "Urgent or high value items"],
                [Truck, "Door to door", "£6 / kg", "Air or sea", "UK collection plus Nigeria delivery"],
              ].map(([Icon, name, price, transit, best], i) => (
                <tr key={name} className={i % 2 ? "bg-gray-50" : ""}>
                  <td className="p-4 font-bold">
                    <span className="inline-flex items-center gap-2.5">
                      <Icon size={17} className="text-[#0818A8]" aria-hidden="true" />
                      {name}
                    </span>
                  </td>
                  <td className="p-4 font-black text-[#0818A8]">{price}</td>
                  <td className="p-4">{transit}</td>
                  <td className="p-4">{best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-[14.5px] leading-relaxed mt-5 max-w-3xl">
          <strong className="text-gray-900">Example (20kg box, London to Lagos):</strong>{" "}
          sea £60 to £90, air £100 to £160, door to door £120 to £180. You pay for actual or
          volumetric weight, whichever is greater, so packing densely keeps your price low.{" "}
          <Link href="/blog/how-much-does-cargo-cost-from-uk-to-nigeria" className="text-[#0818A8] font-semibold underline">
            See the full price breakdown
          </Link>.
        </p>
      </section>

      {/* ── SERVICE CARDS ─────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="services" eyebrow="Three ways to ship">Door to Door, Air Freight and Sea Freight</H2>
          <div className="grid gap-5 md:grid-cols-3 mt-2">
            {SERVICES.map(({ icon: Icon, name, price, transit, href, points }) => (
              <div key={name} className="group bg-white border border-gray-200 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/5 transition-all duration-300 flex flex-col">
                <div className="p-6 pb-5 border-b border-gray-100">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-[#0818A8]/8 text-[#0818A8] mb-4">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="font-black text-[18.5px] text-gray-900 uppercase tracking-[-0.01em] mb-1">{name}</h3>
                  <p className="text-[#0818A8] font-black text-[16px]">{price}</p>
                  <p className="text-gray-500 text-[12.5px] font-medium mt-0.5">{transit}</p>
                </div>
                <ul className="p-6 pt-5 space-y-2.5 flex-1">
                  {points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-gray-700 text-[14.5px] leading-snug">
                      <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link href={href} className="flex items-center gap-1.5 px-6 py-4 border-t border-gray-100 text-[#0818A8] text-[12px] font-black tracking-[0.06em] uppercase group-hover:bg-[#0818A8] group-hover:text-white transition-colors">
                  Read the guide
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="how-it-works" eyebrow="Simple and stress free">How to Send Cargo to Nigeria in 4 Steps</H2>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="relative border border-gray-200 p-6">
              <div className="font-black text-[#0818A8]/15 text-[46px] leading-none absolute top-3 right-4 select-none" aria-hidden="true">
                {i + 1}
              </div>
              <h3 className="font-bold text-gray-900 text-[15px] mb-2 relative">{t}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed relative">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── WHY R-ZONE ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="why-r-zone" eyebrow="Trusted by 100+ customers">Why Send Your Cargo to Nigeria with R-Zone</H2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-2">
            {WHY.map(([Icon, t, d]) => (
              <li key={t} className="bg-white border border-gray-200 p-6">
                <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3>
                <p className="text-gray-600 text-[14px] leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── DESTINATIONS ──────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="destinations" eyebrow="Nationwide coverage">Cargo Delivery Across Nigeria</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-7 max-w-3xl">
          We deliver cargo from the UK to every state in Nigeria. Delivery to the major cities is
          included in your quote; remote destinations carry a small onward delivery charge that we
          confirm before you book.
        </p>
        <ul className="flex flex-wrap gap-2.5">
          {CITIES.map((c) => (
            <li key={c} className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 text-[14px] font-semibold px-3.5 py-2">
              <MapPin size={13} className="text-[#0818A8]" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ (native accordion, no client JS) ──────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="faq" eyebrow="Everything you need to know">Cargo from UK to Nigeria FAQs</H2>
          <div className="space-y-3 mt-2">
            {FAQS.map((f) => (
              <details key={f.q} className="group bg-white border border-gray-200 open:border-[#0818A8]/40 transition-colors">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none">
                  <h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#0818A8] transition-colors">{f.q}</h3>
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-colors" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Ready to ship?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">
            Get your free UK to Nigeria cargo quote today
          </h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">
            Sea from £3/kg, air from £5/kg, door to door from £6/kg. Weekly departures, same day
            response and 107+ five star reviews. Tell us what you are sending and we will give you
            the cheapest way to get it to Nigeria.
          </p>
          <CTAButtons light />

          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/services" className="hover:text-white transition-colors">Our Shipping Services</Link>
            <Link href="/schedulesprices" className="hover:text-white transition-colors">Schedules and Prices</Link>
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
