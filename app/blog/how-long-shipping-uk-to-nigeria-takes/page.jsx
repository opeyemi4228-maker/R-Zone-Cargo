// app/blog/how-long-shipping-uk-to-nigeria-takes/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Landing-structure blog post (light editorial hero, tables, cards, FAQ, CTA).
// Server component, static HTML, self-canonical, UK English, no em/en dashes.
// A matching ARTICLES entry provides the /blog listing card + count.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import {
  Plane, Ship, Truck, Clock, ShieldCheck, Award, Zap, Globe, Calendar,
  Check, ArrowRight, PhoneCall, MessageCircle, MapPin,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";
import { montserrat } from "../../../lib/fonts";

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/how-long-shipping-uk-to-nigeria-takes`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80&auto=format&fit=crop";

const TITLE = "How Long Does Shipping to Nigeria Take?";
const DESCRIPTION = "Air takes 5 to 10 working days and sea 4 to 6 weeks. A stage by stage breakdown of transit, customs clearance and final delivery times.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: ["how long does shipping to Nigeria take","shipping time UK to Nigeria","UK to Nigeria transit time","how long does cargo take to Nigeria","air freight time UK to Nigeria","sea freight time UK to Nigeria","shipping from UK to Nigeria duration"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Cargo aircraft representing air freight transit time from the UK to Nigeria" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  { q: "How long does shipping from the UK to Nigeria take?", a: "Air freight from the UK to Nigeria takes 5 to 10 working days, and sea freight takes 4 to 6 weeks. Both timelines include UK handling, transit to Lagos, Nigeria customs clearance and final delivery. R-Zone runs weekly air and sea departures so cargo joins the next available service." },
  { q: "What is the fastest way to ship to Nigeria from the UK?", a: "Air freight is the fastest way to ship to Nigeria, arriving in 5 to 10 working days from £5.80/kg. It is best for urgent, high-value or time-sensitive cargo such as electronics, documents and medicine." },
  { q: "Why does sea freight to Nigeria take longer?", a: "Sea freight takes 4 to 6 weeks because the vessel sails a much longer physical route to Lagos, and containers are consolidated and cleared on arrival. In exchange it is far cheaper per kilogram, from £3/kg, which is why it suits large or heavy cargo." },
  { q: "What can delay shipping to Nigeria?", a: "The main factors are the flight or sailing schedule, port and customs conditions in Lagos, seasonal peaks such as Christmas, and how complete your paperwork is. R-Zone clears customs with our own Lagos team to keep cargo moving and avoid port delays." },
  { q: "How do I track my cargo to Nigeria?", a: "Every R-Zone shipment gets a reference number at booking. You receive SMS and email updates at each stage: dispatched from the UK, departed, arrived in Lagos, customs cleared, out for delivery and delivered. For an update in between, WhatsApp our operations team on +44 7915 647 119 with your reference, or use the tracking page." },
  { q: "How long does Nigeria customs clearance take?", a: "With documents lodged electronically before arrival, air cargo usually clears Nigeria Customs in 1 to 2 working days (up to 3 if inspected), and sea cargo in 3 to 5 working days at Apapa or Tin Can Island. R-Zone's own Lagos team handles clearance, so cargo is not left waiting." },
  { q: "How can I make my cargo arrive faster?", a: "Choose air freight for speed, book early rather than at the last minute, provide a clear contents list to speed customs, and avoid the busiest seasonal peaks where possible. R-Zone's weekly departures mean your cargo never waits long for the next service." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: freshYear(TITLE), description: freshYear(DESCRIPTION), image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-08-22", dateModified: "2026-10-19", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "How Long Does Shipping from the UK to Nigeria Take", item: PAGE_URL } ] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: freshYear(f.q), acceptedAnswer: { "@type": "Answer", text: freshYear(f.a) } })) },
  { "@context": "https://schema.org", ...ORGANIZATION_SCHEMA },
];

function CTAButtons({ light = false }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/quote" className={`group inline-flex items-center gap-2 ${light ? "bg-white text-[#000f89] hover:bg-[#E8EEFF]" : "bg-[#000f89] hover:bg-[#000f89] text-white"} text-[14px] font-bold px-6 py-3.5 transition-colors rounded-full`}>Get a Free Quote<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" /></Link>
      <a href="tel:+448007720864" className={`inline-flex items-center gap-2 border text-[14px] font-bold px-6 py-3.5 transition-colors rounded-full ${light ? "border-white/30 hover:border-white text-white" : "border-gray-300 hover:border-[#000f89] text-gray-800 hover:text-[#000f89]"}`}><PhoneCall size={13} aria-hidden="true" /> Call Us</a>
      <a href={`https://wa.me/${WHATSAPP}`} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-bold px-6 py-3.5 transition-colors rounded-full"><MessageCircle size={13} aria-hidden="true" /> WhatsApp</a>
    </div>
  );
}

function H2({ id, eyebrow, children }) {
  return (
    <div className="mb-7">
      {eyebrow && <p className="mb-3 text-[13px] font-semibold inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-[#000f89]/[0.07] text-[#000f89]">{eyebrow}</p>}
      <h2 id={id} className="font-extrabold text-[clamp(26px,4.2vw,40px)] text-[#00112E] leading-[1.03] tracking-[-0.03em]">{children}</h2>
    </div>
  );
}

// Stage-by-stage timelines, folded in from the retired
// /blog/cargo-to-nigeria-from-uk guide (now redirects here).
const AIR_STAGES = [
  ["UK consolidation", "0 to 1 working day", "Drop off at our Upminster warehouse or we collect. We weigh, measure and prepare export documents."],
  ["Flight to Lagos", "6 to 8 hours", "Departures from Heathrow to Murtala Muhammed International Airport."],
  ["Airport handling", "1 working day", "Cargo is offloaded, manifested and moved to the Nigeria Customs inspection area."],
  ["Customs clearance", "1 to 3 working days", "Our Lagos team clears your cargo using documents lodged before arrival. Most shipments take 1 to 2 days."],
  ["Final delivery", "1 to 3 working days", "Lagos is usually same or next day; other states take 1 to 3 more working days."],
];
const SEA_STAGES = [
  ["UK consolidation and loading", "1 to 3 working days", "Cargo is consolidated at our warehouse and loaded for the weekly sailing. Arrive before the cut-off to make the vessel."],
  ["Ocean transit", "21 to 28 days", "Weekly sailings from UK ports to Apapa and Tin Can Island in Lagos."],
  ["Port arrival and handling", "2 to 3 working days", "The vessel discharges and cargo moves to the customs examination area."],
  ["Customs clearance", "3 to 6 working days", "Documents are pre-lodged electronically before arrival, so clearance starts the day the vessel docks."],
  ["Final delivery", "1 to 3 working days", "Lagos takes about a day; other states take 1 to 3 more working days."],
];

const FACTORS = [
  [Calendar, "The schedule", "How soon the next flight or sailing departs after your cargo is ready. Weekly departures keep this short."],
  [MapPin, "Lagos port and customs", "Congestion at Apapa can slow sea shipments, which is why our own Lagos clearing team matters."],
  [Clock, "Seasonal peaks", "Christmas and other busy periods tighten both demand and timelines, so book earlier."],
  [ShieldCheck, "Your paperwork", "A clear, accurate contents list speeds customs clearance and avoids hold-ups."],
];

const TIPS = [
  "Pick air for speed, sea for savings",
  "Book early, especially near Christmas",
  "Declare contents accurately to speed customs",
  "Use door to door to remove collection delays",
  "Plan around seasonal peaks",
];

const WHY = [
  [Award, "12+ years of experience", "Running weekly UK to Nigeria departures since 2012, with 50,000+ shipments delivered."],
  [Zap, "Weekly air and sea services", "Your cargo joins the next departure, not a queue, so timelines stay tight."],
  [ShieldCheck, "Own clearing team in Lagos", "We clear customs ourselves at Apapa and Tin Can Island to avoid port delays."],
  [Globe, "Delivery to every state", "Lagos, Abuja, Port Harcourt, Ibadan, Kano and beyond."],
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-extrabold text-[clamp(30px,5.4vw,55px)] text-[#00112E] leading-[1.05] tracking-[-0.03em] mb-5">How Long Does Shipping from the UK to Nigeria Take in {CURRENT_YEAR}?</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">Air freight in <strong className="font-semibold text-gray-700">5 to 10 working days</strong>, sea freight in 4 to 6 weeks. Here are the real {CURRENT_YEAR} transit times, what affects them, and how to make sure your cargo arrives on time.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Cargo aircraft representing air freight transit time from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Written by</p><p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p></div>
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Updated on</p><p className="text-white text-[14px] font-bold">19 October 2026</p></div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8 hidden sm:block"><ShareRow url={PAGE_URL} title={TITLE} /></div>
          </div>
        </div>
      </section>

      {/* TRANSIT TABLE */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="transit-times" eyebrow="At a glance">UK to Nigeria Transit Times ({CURRENT_YEAR})</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">These windows include everything: UK handling, the journey to Lagos, Nigeria customs clearance and final delivery. R-Zone runs weekly departures, so cargo joins the next available service.</p>
        <div className="overflow-x-auto border border-gray-200 rounded-[20px]">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead><tr className="bg-[#000f89] text-white text-[12px] uppercase tracking-[0.06em]"><th className="p-4 font-bold">Service</th><th className="p-4 font-bold">Transit time</th><th className="p-4 font-bold">From</th><th className="p-4 font-bold">Best for</th></tr></thead>
            <tbody className="text-[15px] text-gray-800">
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Plane size={17} className="text-[#000f89]" aria-hidden="true" />Air freight</span></td><td className="p-4 font-black text-[#000f89]">5 to 10 working days</td><td className="p-4">£5.80/kg</td><td className="p-4">Urgent or high-value cargo</td></tr>
              <tr className="bg-gray-50"><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Ship size={17} className="text-[#000f89]" aria-hidden="true" />Sea freight</span></td><td className="p-4 font-black text-[#000f89]">4 to 6 weeks</td><td className="p-4">£3/kg</td><td className="p-4">Large or heavy cargo</td></tr>
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Truck size={17} className="text-[#000f89]" aria-hidden="true" />Door to door</span></td><td className="p-4 font-black text-[#000f89]">Same, air or sea</td><td className="p-4">£6/kg</td><td className="p-4">Collection plus doorstep delivery</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* STAGE BY STAGE */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 pb-16 md:pb-20">
        <H2 id="stage-by-stage" eyebrow="Where the days go">Transit Time, Stage by Stage</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Here is where the time goes on each route, from the moment your cargo reaches us to the recipient&apos;s door. Most shipments land in the middle of each range.</p>
        <div className="grid gap-6 lg:grid-cols-2">
          {[[Plane, "Air freight: 5 to 10 working days", AIR_STAGES], [Ship, "Sea freight: 4 to 6 weeks", SEA_STAGES]].map(([Icon, heading, stages]) => (
            <div key={heading} className="border border-gray-200 p-6 md:p-7 rounded-[20px]">
              <h3 className="flex items-center gap-2.5 font-bold text-gray-900 text-[17px] mb-5"><Icon size={18} className="text-[#000f89]" aria-hidden="true" />{heading}</h3>
              <ol className="space-y-4">
                {stages.map(([name, time, detail], i) => (
                  <li key={name} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#000f89]/8 text-[#000f89] text-[13px] font-bold flex items-center justify-center" aria-hidden="true">{i + 1}</span>
                    <div>
                      <p className="text-gray-900 text-[15px] font-semibold">{name} <span className="text-[#000f89]">· {time}</span></p>
                      <p className="text-gray-600 text-[14px] leading-relaxed mt-0.5">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-[14.5px] leading-relaxed mt-6 max-w-3xl">Every shipment gets a reference number with SMS and email updates at each stage. <Link href="/track" className="text-[#000f89] font-semibold underline">Track your shipment</Link>.</p>
      </section>

      {/* WHAT AFFECTS TRANSIT */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="factors" eyebrow="What moves the timeline">What Affects Your Transit Time</H2>
          <ul className="grid gap-5 sm:grid-cols-2 mt-2">
            {FACTORS.map(([Icon,t,d])=>(<li key={t} className="bg-white border border-gray-200 p-6 rounded-[20px]"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#000f89]/8 text-[#000f89] mb-4 rounded-full"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
          </ul>
        </div>
      </section>

      {/* HOW TO ARRIVE ON TIME */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="on-time" eyebrow="Arrive on schedule">How to Make Sure Your Cargo Arrives on Time</H2>
        <ul className="grid gap-3 sm:grid-cols-2 max-w-3xl mt-2">
          {TIPS.map((t)=>(<li key={t} className="flex items-start gap-2.5 text-gray-700 text-[15px] leading-snug border border-gray-200 p-4 rounded-[20px]"><Check size={17} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />{t}</li>))}
        </ul>
        <div className="mt-6 max-w-3xl border-l-[4px] border-[#000f89] bg-[#000f89]/[0.04] p-5">
          <p className="text-gray-800 text-[14.5px] leading-relaxed"><strong className="text-gray-900">Christmas deadlines:</strong> for delivery before Christmas, send sea freight by early November and air freight by mid-December. Demand rises as December approaches, so book early.</p>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="why-r-zone" eyebrow="Trusted by 100+ customers">Why Ship with R-Zone</H2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
            {WHY.map(([Icon,t,d])=>(<li key={t} className="bg-white border border-gray-200 p-6 rounded-[20px]"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#000f89]/8 text-[#000f89] mb-4 rounded-full"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="faq" eyebrow="Everything you need to know">Transit Time FAQs</H2>
        <div className="space-y-3 mt-2">
          {FAQS.map((f)=>(<details key={freshYear(f.q)} className="rounded-[16px] group bg-white border border-gray-200 open:border-[#000f89]/40 transition-colors"><summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none"><h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#000f89] transition-colors">{freshYear(f.q)}</h3><span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#000f89] group-open:bg-[#000f89] transition-colors" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" /></svg></span></summary><p className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">{freshYear(f.a)}</p></details>))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#000f89] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 mb-3 text-[13px] font-semibold">On a deadline?</p>
          <h2 className="font-extrabold text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.03em] mb-4 leading-[1.05] max-w-3xl">Ship to Nigeria on time with R-Zone</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">Air 5 to 10 working days from £5.80/kg. Sea 4 to 6 weeks from £3/kg. Door to door from £6/kg. Weekly departures. Tell us your deadline and we will recommend the best service to meet it.</p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/shipping-to-nigeria-from-uk-2026-guide" className="hover:text-white transition-colors">Complete Shipping Guide</Link>
            <Link href="/blog/air-freight-vs-sea-freight-nigeria" className="hover:text-white transition-colors">Air vs Sea Freight</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Shipping Guides</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
