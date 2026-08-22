// app/blog/how-door-to-door-cargo-to-nigeria-works/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Landing-structure blog post (same design as /cargo-from-uk-to-nigeria and the
// car-shipping page): editorial hero, 4-step process, prices, what-you-can-send,
// why-us, FAQ, CTA. Server component, static HTML, self-canonical, UK English,
// no em/en dashes. A matching ARTICLES entry provides the /blog listing card +
// count; this dedicated page.jsx wins the route.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Truck,
  Package,
  Plane,
  Ship,
  ShieldCheck,
  PoundSterling,
  Clock,
  MapPin,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Check,
  Boxes,
  Award,
  Zap,
  Globe,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/how-door-to-door-cargo-to-nigeria-works`;
const WHATSAPP = "447915647119";
const HERO_IMG =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80&auto=format&fit=crop";

const TITLE =
  "How Door to Door Cargo to Nigeria Works 2026: Collection to Delivery | R-Zone Enterprises";
const DESCRIPTION =
  "How does door to door cargo to Nigeria work? Step by step from UK collection to Nigerian doorstep delivery in 2026, with transit times, customs and prices from £6/kg. Free same-day quote from R-Zone.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: [
    "how door to door cargo to Nigeria works",
    "door to door cargo to Nigeria process",
    "door to door shipping UK to Nigeria",
    "how to send cargo door to door to Nigeria",
    "UK collection cargo to Nigeria",
    "send cargo to Nigeria from home",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: { absolute: freshYear(TITLE) },
    description: freshYear(DESCRIPTION),
    siteName: "R-Zone Enterprises",
    locale: "en_GB",
    images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Courier collecting a parcel for door to door shipping from the UK to Nigeria" }],
  },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  {
    q: "How does door to door cargo to Nigeria work?",
    a: "Door to door works in four steps. You get a quote and book, R-Zone collects the cargo from your UK address, we ship it by air or sea and clear Nigeria customs with our own Lagos team, then we deliver to the recipient's door anywhere in Nigeria. You never visit a depot and the recipient never queues to collect.",
  },
  {
    q: "Do you collect the cargo from my house in the UK?",
    a: "Yes. R-Zone collects door to door from any UK address, home or business, nationwide, on a day that suits you. There is no need to travel to a depot or drop-off point.",
  },
  {
    q: "How long does door to door cargo to Nigeria take?",
    a: "Door to door air freight takes 5 to 10 working days and door to door sea freight takes 4 to 6 weeks, each including UK collection, transit, Nigeria customs clearance and final delivery. R-Zone runs weekly air and sea departures.",
  },
  {
    q: "Which cities in Nigeria do you deliver door to door?",
    a: "R-Zone delivers door to door to Lagos, Abuja, Port Harcourt, Ibadan, Benin City, Kano and every state in Nigeria. Delivery to the main cities is included in the quote; remote destinations may carry a small onward-delivery charge confirmed upfront.",
  },
  {
    q: "How much does door to door cargo to Nigeria cost?",
    a: "Door to door cargo starts from £6/kg, including UK collection, transit, Nigeria customs clearance and doorstep delivery. A 20kg box is roughly £120 to £180 by air or £80 to £120 by sea, all inclusive with no hidden fees.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: freshYear(TITLE),
    description: freshYear(DESCRIPTION),
    image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 },
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` },
    publisher: ORGANIZATION_SCHEMA,
    mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
    inLanguage: "en-GB",
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to send door to door cargo from the UK to Nigeria",
    description: "Send cargo door to door from the UK to Nigeria in four steps: quote, UK collection, shipping and customs clearance, and doorstep delivery in Nigeria.",
    step: [
      { "@type": "HowToStep", position: 1, name: "Get a quote and book", text: "Tell R-Zone what you are sending, the weight and your UK and Nigeria locations for a same-day all-inclusive quote from £6/kg." },
      { "@type": "HowToStep", position: 2, name: "We collect from your UK address", text: "R-Zone collects your cargo from any UK address on a day that suits you, with no depot visit." },
      { "@type": "HowToStep", position: 3, name: "We ship and clear customs", text: "Air (5 to 10 working days) or sea (4 to 6 weeks) to Lagos, then Nigeria customs clearance by our own Lagos team." },
      { "@type": "HowToStep", position: 4, name: "Delivery to the door in Nigeria", text: "We deliver to the recipient's door in Lagos, Abuja, Port Harcourt or any Nigerian state." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: "How Door to Door Cargo to Nigeria Works", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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

const STEPS = [
  [PoundSterling, "Get a quote and book", "Tell us what you are sending, the rough weight, and your UK and Nigeria locations. We respond the same day with an all-inclusive price from £6/kg. Book when you are happy."],
  [Truck, "We collect from your UK address", "On the agreed day we collect from your address, home or business, anywhere in the UK. No depot visit. Have your boxes packed with a contents list, or ask about assisted packing."],
  [Plane, "We ship and clear customs", "Your cargo goes by air (5 to 10 working days) or sea (4 to 6 weeks) to Lagos. Our own Lagos team clears Nigeria customs, NAFDAC and SON where they apply, so nothing sits at the port."],
  [MapPin, "Delivery to the door in Nigeria", "We deliver to the recipient's door in Lagos, Abuja, Port Harcourt or any state. They simply receive it at home. No depot, no queue, no heavy lifting across town."],
];

const WHY = [
  [Award, "12+ years of experience", "Door to door UK to Nigeria cargo since 2012, with 50,000+ shipments delivered."],
  [ShieldCheck, "Own teams in UK and Lagos", "We control collection, customs clearance and delivery from end to end."],
  [PoundSterling, "Transparent pricing", "From £6/kg all inclusive, with no hidden fees. The price we quote is the price you pay."],
  [Zap, "Weekly departures", "Your cargo joins the next available air or sea service, with no long waits."],
  [Globe, "Every state in Nigeria", "Lagos, Abuja, Port Harcourt, Ibadan, Kano and beyond, delivered to the door."],
  [ShieldCheck, "107+ five-star reviews", "One of the highest rated UK to Nigeria cargo companies on Google."],
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">
            How Door to Door Cargo to Nigeria Works in {CURRENT_YEAR}: From Collection to Delivery
          </h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">
            No depot visits, no customs queues. Here is exactly how door to door cargo to Nigeria
            works in 2026, from the moment you book to the moment it reaches the recipient&apos;s door.
          </p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Courier collecting a cargo parcel for door to door shipping from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div>
                <p className="text-white/65 text-[11px] font-medium mb-1">Written by</p>
                <p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p>
              </div>
              <div>
                <p className="text-white/65 text-[11px] font-medium mb-1">Published on</p>
                <p className="text-white text-[14px] font-bold">17 August 2026</p>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8">
              <ShareRow url={PAGE_URL} title={TITLE} />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IT MEANS ─────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="what-it-means" eyebrow="The simple version">What Door to Door Cargo to Nigeria Means</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] max-w-3xl">
          Door to door is the simplest way to send cargo to Nigeria: you hand it over once, and the
          next time anyone touches it is the recipient at their door. R-Zone collects from your UK
          address, handles export paperwork, ships by air or sea, clears Nigeria customs with our
          own Lagos team, and delivers to the door. We have run door to door UK to Nigeria cargo
          since 2012, with 50,000+ shipments delivered and 107+ five-star reviews.
        </p>
      </section>

      {/* ── THE 4 STEPS ───────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="steps" eyebrow="Four simple steps">How Door to Door Works, Step by Step</H2>
          <div className="grid gap-5 md:grid-cols-2 mt-2">
            {STEPS.map(([Icon, title, body], i) => (
              <div key={title} className="relative bg-white border border-gray-200 p-7">
                <div className="font-black text-[#0818A8]/12 text-[64px] leading-none absolute top-3 right-5 select-none" aria-hidden="true">{i + 1}</div>
                <span className="inline-flex items-center justify-center w-12 h-12 bg-[#0818A8]/8 text-[#0818A8] mb-4 relative"><Icon size={22} aria-hidden="true" /></span>
                <h3 className="font-black text-[18px] text-gray-900 uppercase tracking-[-0.01em] mb-2 relative">{title}</h3>
                <p className="text-gray-600 text-[14.5px] leading-relaxed relative">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICES ────────────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="prices" eyebrow="All inclusive rates">What Door to Door Cargo to Nigeria Costs</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">
          Door to door cargo starts from <strong className="text-gray-900">£6/kg</strong>, including
          UK collection, transit, Nigeria customs clearance and doorstep delivery. There are no
          hidden fees. Here is what a typical 20kg box from London to Lagos costs.
        </p>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]">
                <th className="p-4 font-bold">Service</th>
                <th className="p-4 font-bold">Transit time</th>
                <th className="p-4 font-bold">20kg example</th>
              </tr>
            </thead>
            <tbody className="text-[15px] text-gray-800">
              <tr>
                <td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Plane size={17} className="text-[#0818A8]" aria-hidden="true" />Door to door by air</span></td>
                <td className="p-4">5 to 10 working days</td>
                <td className="p-4 font-black text-[#0818A8]">£120 to £180</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Ship size={17} className="text-[#0818A8]" aria-hidden="true" />Door to door by sea</span></td>
                <td className="p-4">4 to 6 weeks</td>
                <td className="p-4 font-black text-[#0818A8]">£80 to £120</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-[14.5px] leading-relaxed mt-5 max-w-3xl">
          You pay for actual or volumetric weight, whichever is greater, so packing densely keeps
          your price low.{" "}
          <Link href="/blog/how-much-does-cargo-cost-from-uk-to-nigeria" className="text-[#0818A8] font-semibold underline">See the full price breakdown</Link>.
        </p>
      </section>

      {/* ── WHAT YOU CAN SEND ─────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="what-to-send" eyebrow="Pack smart">What You Can Send and How to Pack</H2>
          <div className="grid gap-5 md:grid-cols-2 mt-2">
            <div className="bg-white border border-gray-200 p-7">
              <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Boxes size={20} aria-hidden="true" /></span>
              <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">What you can send</h3>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Clothing and shoes, electronics and phones, household goods and appliances, packaged
                and non-perishable food, cosmetics, baby items, books and documents. Some categories
                need NAFDAC or SON clearance, which we advise on before you ship so nothing is held
                at the border.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-7">
              <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Check size={20} aria-hidden="true" /></span>
              <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">How to pack</h3>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Use strong double-walled boxes, fill empty space, and pack densely, which matters
                most for sea freight. Vacuum-pack clothing to save volume, and label each box with a
                contents list to speed up customs. Prohibited items cannot be shipped, so ask us if
                you are unsure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY R-ZONE ────────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="why-r-zone" eyebrow="Trusted by 100+ customers">Why Send Door to Door with R-Zone</H2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-2">
          {WHY.map(([Icon, t, d], i) => (
            <li key={t + i} className="border border-gray-200 p-6">
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
          <H2 id="faq" eyebrow="Everything you need to know">Door to Door Cargo FAQs</H2>
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
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Ready to send?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Book door to door cargo to Nigeria today</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">
            Door to door from £6/kg. Air 5 to 10 working days, sea 4 to 6 weeks. Weekly departures
            and delivery to every state in Nigeria. Tell us what you are sending and we will handle
            the rest, from your door to theirs.
          </p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/door-to-door-shipping-uk-to-nigeria" className="hover:text-white transition-colors">Door to Door Guide</Link>
            <Link href="/blog/door-to-door-vs-drop-off-cargo-to-nigeria" className="hover:text-white transition-colors">Door to Door vs Drop-Off</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Shipping Guides</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
