// app/blog/car-shipping-uk-to-nigeria/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Commercial landing page for "car shipping from the UK to Nigeria", published
// under /blog/ but using the same landing structure as /cargo-from-uk-to-nigeria
// (editorial hero, prices table, method cards, age-limit + duty, steps, why-us,
// FAQ, CTA). Server component: fully static HTML, owns its SEO metadata + JSON-LD.
// Heading hierarchy: one <h1>, section <h2>s, <h3> sub-headings. Self-canonical;
// title:{absolute} avoids brand-template double-branding. UK English, no em/en dashes.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Car,
  Ship,
  Package,
  Truck,
  ShieldCheck,
  Clock,
  Calendar,
  FileText,
  PoundSterling,
  MapPin,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Check,
  Award,
  Zap,
  Globe,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/car-shipping-uk-to-nigeria`;
const WHATSAPP = "447915647119";
const HERO_IMG =
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=80&auto=format&fit=crop";

const TITLE =
  "Car Shipping from the UK to Nigeria 2026 | RORO & Container Shipping";
const DESCRIPTION =
  "Ship your car from the UK to Nigeria by RORO or container. Indicative 2026 prices, the 15-year import age limit, Nigeria customs duty, transit times to Lagos and the full process explained. Free same-day quote from R-Zone.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "car shipping from UK to Nigeria",
    "car shipping UK to Nigeria",
    "ship a car to Nigeria from UK",
    "RORO car shipping Nigeria",
    "container car shipping Nigeria",
    "cost to ship a car to Nigeria",
    "Nigeria car import age limit",
    "Nigeria car import duty",
    "vehicle shipping UK to Nigeria",
    "send a car to Lagos from UK",
    "car export UK to Nigeria",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "R-Zone Enterprises",
    locale: "en_GB",
    images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Car being prepared for shipping from the UK to Nigeria" }],
  },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: TITLE, description: DESCRIPTION, images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  {
    q: "How much does it cost to ship a car from the UK to Nigeria?",
    a: "Car shipping from the UK to Nigeria starts from around £650 by RORO for a standard saloon and from around £1,300 for shared-container shipping. Larger vehicles such as 4x4s, SUVs and vans cost more. These are indicative 2026 prices; your exact cost depends on the car, the UK collection point, the destination port and the season, so ask R-Zone for a free quote.",
  },
  {
    q: "What is the maximum age of car I can import into Nigeria?",
    a: "Nigeria does not allow the import of cars older than 15 years from their year of manufacture. A car manufactured in 2011 or earlier generally cannot be imported in 2026. Enforcement and specific rules can change with ECOWAS and national policy, so confirm your car's eligibility with R-Zone before you book.",
  },
  {
    q: "Is RORO or container shipping better for my car?",
    a: "RORO (Roll-on Roll-off) is the cheapest option for a single running car; the car is driven on and off the vessel. Container shipping costs more but adds security, protects the car from the elements, suits non-running vehicles, and lets you ship some personal effects inside the car where customs rules allow.",
  },
  {
    q: "How much is import duty on a car in Nigeria?",
    a: "Nigeria customs duty on a used car is typically around 35% of the assessed value once duty and levy are combined, plus port and clearing charges, and is paid on arrival in Nigeria. The exact figure depends on the car's make, model, engine size and customs valuation. R-Zone's clearing team confirms the amount before your car sails.",
  },
  {
    q: "How long does it take to ship a car to Nigeria?",
    a: "Shipping a car from the UK to Nigeria takes about 4 to 6 weeks by RORO and 5 to 7 weeks by container, including the sailing to Lagos and Nigeria customs clearance. R-Zone runs regular sailings so your car joins the next available departure.",
  },
  {
    q: "What documents do I need to ship my car?",
    a: "You will need the V5C logbook (proof of ownership), photo ID, and the car keys. For clearance in Nigeria the recipient needs valid ID and their Tax Identification Number. R-Zone prepares the export and shipping documentation and guides you through the Nigerian requirements.",
  },
  {
    q: "Can I put belongings inside the car?",
    a: "Only with container shipping, and only within Nigeria customs rules; personal effects must be declared. RORO shipping does not allow loose items inside the car. Ask R-Zone what you can safely include before you pack the vehicle.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    serviceType: "Car shipping from the UK to Nigeria",
    name: "Car Shipping from UK to Nigeria",
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
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: "Car Shipping from UK to Nigeria", item: PAGE_URL },
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
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: TITLE,
    description: DESCRIPTION,
    image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 },
    datePublished: "2026-08-06",
    dateModified: "2026-08-06",
    author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` },
    publisher: ORGANIZATION_SCHEMA,
    mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
    inLanguage: "en-GB",
  },
  { "@context": "https://schema.org", ...ORGANIZATION_SCHEMA },
];

function CTAButtons({ light = false }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/quote" className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0a1fce] text-white text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3.5 transition-colors">
        Get a Free Quote
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </Link>
      <a href="tel:+448007720864" className={`inline-flex items-center gap-2 border text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-colors ${light ? "border-white/30 hover:border-white text-white" : "border-gray-300 hover:border-[#0818A8] text-gray-800 hover:text-[#0818A8]"}`}>
        <PhoneCall size={13} aria-hidden="true" /> Call Us
      </a>
      <a href={`https://wa.me/${WHATSAPP}`} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-colors">
        <MessageCircle size={13} aria-hidden="true" /> WhatsApp
      </a>
    </div>
  );
}

function H2({ id, eyebrow, children }) {
  return (
    <div className="mb-7">
      {eyebrow && <p className="text-[12px] font-black tracking-[0.3em] uppercase text-[#0818A8] mb-3">{eyebrow}</p>}
      <h2 id={id} className="font-black text-[clamp(26px,4.2vw,40px)] text-[#0b0f1a] leading-[1.03] tracking-[-0.02em] uppercase">{children}</h2>
    </div>
  );
}

const METHODS = [
  { icon: Ship, name: "RORO Shipping", price: "From £650", transit: "4 to 6 weeks", href: "/quote",
    points: ["Cheapest way to ship a running car", "Car is driven on and off the vessel", "Ideal for a single saloon or hatchback"] },
  { icon: Package, name: "Container Shipping", price: "From £1,300", transit: "5 to 7 weeks", href: "/quote",
    points: ["Extra security and weather protection", "Suits non-running or high-value cars", "Ship personal effects inside (customs rules apply)"] },
  { icon: Truck, name: "Door to Door Add-on", price: "On request", transit: "Air or sea", href: "/quote",
    points: ["We collect the car from your UK address", "Delivery to the recipient in Nigeria", "Full customs clearance handled for you"] },
];

const STEPS = [
  ["Get a free quote", "Send us the car make, model, year and your UK location. We confirm eligibility and an indicative price the same day."],
  ["Deliver or we collect", "Drive the car to our UK yard, or we arrange collection from your address anywhere in the UK."],
  ["We ship and clear customs", "RORO or container to Lagos, then Nigeria customs clearance and duty handled by our own Lagos team."],
  ["Delivered in Nigeria", "The recipient collects the car, or we deliver it to the door in Lagos, Abuja, Port Harcourt or any state."],
];

const WHY = [
  [Award, "12+ years of experience", "Shipping cars and cargo from the UK to Nigeria since 2012, with 50,000+ shipments delivered."],
  [ShieldCheck, "Own clearing team in Lagos", "We handle Nigeria customs, duty and port charges end to end, so your car is not stuck at the port."],
  [PoundSterling, "Transparent pricing", "A clear all-in quote with no hidden fees. We confirm duty before your car sails."],
  [Calendar, "Age-limit checked upfront", "We confirm your car meets Nigeria's 15-year import rule before you book, so nothing is turned away."],
  [Zap, "Regular sailings", "Your car joins the next available RORO or container departure, with no long waits."],
  [Globe, "Delivery across Nigeria", "Lagos, Abuja, Port Harcourt, Ibadan, Kano and every state."],
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── HERO (editorial) ──────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">
            Car Shipping from the UK to Nigeria: RORO, Container, Age Limit &amp; Duty
          </h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">
            Ship your car from the UK to Nigeria by RORO or container from around{" "}
            <strong className="font-semibold text-gray-700">£650</strong>. Indicative prices, the
            15-year import age limit, customs duty and the full process, explained.
          </p>

          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Car being prepared for shipping from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div>
                <p className="text-white/65 text-[11px] font-medium mb-1">Written by</p>
                <p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p>
              </div>
              <div>
                <p className="text-white/65 text-[11px] font-medium mb-1">Published on</p>
                <p className="text-white text-[14px] font-bold">6 August 2026</p>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8">
              <ShareRow url={PAGE_URL} title={TITLE} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICES ────────────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="prices" eyebrow="Indicative 2026 rates">Car Shipping Prices from the UK to Nigeria</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">
          The cost of shipping a car from the UK to Nigeria depends on the method, the size of the
          car and the destination port. RORO is the most affordable option for a single running
          car; container shipping costs more but adds security and lets you include personal effects.
        </p>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]">
                <th className="p-4 font-bold">Method</th>
                <th className="p-4 font-bold">From</th>
                <th className="p-4 font-bold">Transit time</th>
                <th className="p-4 font-bold">Best for</th>
              </tr>
            </thead>
            <tbody className="text-[15px] text-gray-800">
              {[
                [Ship, "RORO (saloon / hatchback)", "£650", "4 to 6 weeks", "Cheapest for a single running car"],
                [Ship, "RORO (4x4 / SUV / van)", "£900", "4 to 6 weeks", "Larger running vehicles"],
                [Package, "Shared container", "£1,300", "5 to 7 weeks", "Extra security plus personal effects"],
                [Package, "Sole-use container", "On request", "5 to 7 weeks", "Multiple cars or high-value vehicles"],
              ].map(([Icon, name, price, transit, best], i) => (
                <tr key={name} className={i % 2 ? "bg-gray-50" : ""}>
                  <td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Icon size={17} className="text-[#0818A8]" aria-hidden="true" />{name}</span></td>
                  <td className="p-4 font-black text-[#0818A8]">{price}</td>
                  <td className="p-4">{transit}</td>
                  <td className="p-4">{best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-[14.5px] leading-relaxed mt-5 max-w-3xl">
          <strong className="text-gray-900">Please note:</strong> these are indicative 2026 shipping
          prices and do not include Nigeria customs duty, which is paid on arrival. Your exact price
          depends on the car, the UK collection point, the destination port and the season.{" "}
          <Link href="/quote" className="text-[#0818A8] font-semibold underline">Get a free quote</Link> for a firm figure.
        </p>
      </section>

      {/* ── METHOD CARDS ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="methods" eyebrow="How your car travels">RORO, Container and Door to Door</H2>
          <div className="grid gap-5 md:grid-cols-3 mt-2">
            {METHODS.map(({ icon: Icon, name, price, transit, href, points }) => (
              <div key={name} className="group bg-white border border-gray-200 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/5 transition-all duration-300 flex flex-col">
                <div className="p-6 pb-5 border-b border-gray-100">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={22} aria-hidden="true" /></span>
                  <h3 className="font-black text-[18.5px] text-gray-900 uppercase tracking-[-0.01em] mb-1">{name}</h3>
                  <p className="text-[#0818A8] font-black text-[16px]">{price}</p>
                  <p className="text-gray-500 text-[12.5px] font-medium mt-0.5">{transit}</p>
                </div>
                <ul className="p-6 pt-5 space-y-2.5 flex-1">
                  {points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-gray-700 text-[14.5px] leading-snug"><Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />{pt}</li>
                  ))}
                </ul>
                <Link href={href} className="flex items-center gap-1.5 px-6 py-4 border-t border-gray-100 text-[#0818A8] text-[12px] font-black tracking-[0.06em] uppercase group-hover:bg-[#0818A8] group-hover:text-white transition-colors">Get a quote<ArrowRight size={13} aria-hidden="true" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGE LIMIT & DUTY ──────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="age-limit-duty" eyebrow="Know before you ship">Nigeria Car Import Age Limit and Duty</H2>
        <div className="grid gap-5 md:grid-cols-2 mt-2">
          <div className="border border-[#0818A8]/15 bg-[#0818A8]/[0.03] p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8] text-white mb-4"><Calendar size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">The 15-Year Age Limit</h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">
              Nigeria does not allow the import of cars older than <strong>15 years from their year
              of manufacture</strong>. In 2026 that generally means cars made in 2011 or earlier
              cannot be imported. Rules can shift with ECOWAS and national policy, so we confirm
              your car&apos;s eligibility before you book, and never ship a car that would be turned
              away at the port.
            </p>
          </div>
          <div className="border border-gray-200 p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><PoundSterling size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">Import Duty in Nigeria</h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">
              Nigeria customs duty on a used car is typically around <strong>35% of the assessed
              value</strong> once duty and levy are combined, plus port and clearing charges, and is
              paid on arrival. The exact figure depends on the make, model, engine size and customs
              valuation. Our Lagos clearing team confirms the amount before your car sails, so there
              are no surprises.
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-[14px] leading-relaxed mt-6 max-w-3xl">
          You will need the <strong className="text-gray-900">V5C logbook</strong>, photo ID and the
          car keys to ship. R-Zone prepares the export and shipping paperwork and guides the
          recipient through the Nigerian clearance requirements.
        </p>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="how-it-works" eyebrow="Simple and stress free">How to Ship Your Car to Nigeria in 4 Steps</H2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="relative bg-white border border-gray-200 p-6">
                <div className="font-black text-[#0818A8]/15 text-[46px] leading-none absolute top-3 right-4 select-none" aria-hidden="true">{i + 1}</div>
                <h3 className="font-bold text-gray-900 text-[15px] mb-2 relative">{t}</h3>
                <p className="text-gray-600 text-[14px] leading-relaxed relative">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── WHY R-ZONE ────────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="why-r-zone" eyebrow="Trusted by 100+ customers">Why Ship Your Car with R-Zone</H2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-2">
          {WHY.map(([Icon, t, d]) => (
            <li key={t} className="border border-gray-200 p-6">
              <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span>
              <h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="faq" eyebrow="Everything you need to know">Car Shipping to Nigeria FAQs</H2>
          <div className="space-y-3 mt-2">
            {FAQS.map((f) => (
              <details key={f.q} className="group bg-white border border-gray-200 open:border-[#0818A8]/40 transition-colors">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none">
                  <h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#0818A8] transition-colors">{f.q}</h3>
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-colors" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" /></svg>
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
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Ready to ship your car?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Get your free UK to Nigeria car shipping quote</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">
            RORO from £650, container from £1,300, regular sailings and our own clearing team in
            Lagos. Send us your car&apos;s make, model and year and we will confirm eligibility and a
            firm price the same day.
          </p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/services" className="hover:text-white transition-colors">Our Shipping Services</Link>
            <Link href="/schedulesprices" className="hover:text-white transition-colors">Schedules and Prices</Link>
            <Link href="/track" className="hover:text-white transition-colors">Track a Shipment</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Shipping Guides</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
