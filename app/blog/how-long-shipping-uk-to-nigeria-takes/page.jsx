// app/blog/how-long-shipping-uk-to-nigeria-takes/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Landing-structure blog post (light editorial hero, tables, cards, FAQ, CTA).
// Server component, static HTML, self-canonical, UK English, no em/en dashes.
// A matching ARTICLES entry provides the /blog listing card + count.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Plane, Ship, Truck, Clock, ShieldCheck, Award, Zap, Globe, Calendar,
  Check, ArrowRight, PhoneCall, MessageCircle, MapPin,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/how-long-shipping-uk-to-nigeria-takes`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80&auto=format&fit=crop";

const TITLE = "How Long Does Shipping from the UK to Nigeria Take? 2026 Transit Times | R-Zone Enterprises";
const DESCRIPTION = "How long does shipping from the UK to Nigeria take in 2026? Air freight 5 to 10 working days, sea freight 4 to 6 weeks, plus what affects transit time and how to send faster. Free quote from R-Zone.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["how long does shipping to Nigeria take","shipping time UK to Nigeria","UK to Nigeria transit time","how long does cargo take to Nigeria","air freight time UK to Nigeria","sea freight time UK to Nigeria","shipping from UK to Nigeria duration"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: TITLE }, description: DESCRIPTION, siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Cargo aircraft representing air freight transit time from the UK to Nigeria" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: TITLE }, description: DESCRIPTION, images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  { q: "How long does shipping from the UK to Nigeria take?", a: "Air freight from the UK to Nigeria takes 5 to 10 working days, and sea freight takes 4 to 6 weeks. Both timelines include UK handling, transit to Lagos, Nigeria customs clearance and final delivery. R-Zone runs weekly air and sea departures so cargo joins the next available service." },
  { q: "What is the fastest way to ship to Nigeria from the UK?", a: "Air freight is the fastest way to ship to Nigeria, arriving in 5 to 10 working days from £5/kg. It is best for urgent, high-value or time-sensitive cargo such as electronics, documents and medicine." },
  { q: "Why does sea freight to Nigeria take longer?", a: "Sea freight takes 4 to 6 weeks because the vessel sails a much longer physical route to Lagos, and containers are consolidated and cleared on arrival. In exchange it is far cheaper per kilogram, from £3/kg, which is why it suits large or heavy cargo." },
  { q: "What can delay shipping to Nigeria?", a: "The main factors are the flight or sailing schedule, port and customs conditions in Lagos, seasonal peaks such as Christmas, and how complete your paperwork is. R-Zone clears customs with our own Lagos team to keep cargo moving and avoid port delays." },
  { q: "How can I make my cargo arrive faster?", a: "Choose air freight for speed, book early rather than at the last minute, provide a clear contents list to speed customs, and avoid the busiest seasonal peaks where possible. R-Zone's weekly departures mean your cargo never waits long for the next service." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: TITLE, description: DESCRIPTION, image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-08-22", dateModified: "2026-08-22", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "How Long Does Shipping from the UK to Nigeria Take", item: PAGE_URL } ] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  { "@context": "https://schema.org", ...ORGANIZATION_SCHEMA },
];

function CTAButtons({ light = false }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/quote" className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0a1fce] text-white text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3.5 transition-colors">Get a Free Quote<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" /></Link>
      <a href="tel:+448007720864" className={`inline-flex items-center gap-2 border text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-colors ${light ? "border-white/30 hover:border-white text-white" : "border-gray-300 hover:border-[#0818A8] text-gray-800 hover:text-[#0818A8]"}`}><PhoneCall size={13} aria-hidden="true" /> Call Us</a>
      <a href={`https://wa.me/${WHATSAPP}`} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-colors"><MessageCircle size={13} aria-hidden="true" /> WhatsApp</a>
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
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">How Long Does Shipping from the UK to Nigeria Take in 2026?</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">Air freight in <strong className="font-semibold text-gray-700">5 to 10 working days</strong>, sea freight in 4 to 6 weeks. Here are the real 2026 transit times, what affects them, and how to make sure your cargo arrives on time.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Cargo aircraft representing air freight transit time from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Written by</p><p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p></div>
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Published on</p><p className="text-white text-[14px] font-bold">22 August 2026</p></div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8"><ShareRow url={PAGE_URL} title={TITLE} /></div>
          </div>
        </div>
      </section>

      {/* TRANSIT TABLE */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="transit-times" eyebrow="At a glance">UK to Nigeria Transit Times (2026)</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">These windows include everything: UK handling, the journey to Lagos, Nigeria customs clearance and final delivery. R-Zone runs weekly departures, so cargo joins the next available service.</p>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead><tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]"><th className="p-4 font-bold">Service</th><th className="p-4 font-bold">Transit time</th><th className="p-4 font-bold">From</th><th className="p-4 font-bold">Best for</th></tr></thead>
            <tbody className="text-[15px] text-gray-800">
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Plane size={17} className="text-[#0818A8]" aria-hidden="true" />Air freight</span></td><td className="p-4 font-black text-[#0818A8]">5 to 10 working days</td><td className="p-4">£5/kg</td><td className="p-4">Urgent or high-value cargo</td></tr>
              <tr className="bg-gray-50"><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Ship size={17} className="text-[#0818A8]" aria-hidden="true" />Sea freight</span></td><td className="p-4 font-black text-[#0818A8]">4 to 6 weeks</td><td className="p-4">£3/kg</td><td className="p-4">Large or heavy cargo</td></tr>
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Truck size={17} className="text-[#0818A8]" aria-hidden="true" />Door to door</span></td><td className="p-4 font-black text-[#0818A8]">Same, air or sea</td><td className="p-4">£6/kg</td><td className="p-4">Collection plus doorstep delivery</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* WHAT AFFECTS TRANSIT */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="factors" eyebrow="What moves the timeline">What Affects Your Transit Time</H2>
          <ul className="grid gap-5 sm:grid-cols-2 mt-2">
            {FACTORS.map(([Icon,t,d])=>(<li key={t} className="bg-white border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
          </ul>
        </div>
      </section>

      {/* HOW TO ARRIVE ON TIME */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="on-time" eyebrow="Arrive on schedule">How to Make Sure Your Cargo Arrives on Time</H2>
        <ul className="grid gap-3 sm:grid-cols-2 max-w-3xl mt-2">
          {TIPS.map((t)=>(<li key={t} className="flex items-start gap-2.5 text-gray-700 text-[15px] leading-snug border border-gray-200 p-4"><Check size={17} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />{t}</li>))}
        </ul>
        <div className="mt-6 max-w-3xl border-l-[4px] border-[#0818A8] bg-[#0818A8]/[0.04] p-5">
          <p className="text-gray-800 text-[14.5px] leading-relaxed"><strong className="text-gray-900">Christmas deadlines:</strong> for delivery before Christmas, send sea freight by early November and air freight by mid-December. Demand rises as December approaches, so book early.</p>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="why-r-zone" eyebrow="Trusted by 100+ customers">Why Ship with R-Zone</H2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
            {WHY.map(([Icon,t,d])=>(<li key={t} className="bg-white border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="faq" eyebrow="Everything you need to know">Transit Time FAQs</H2>
        <div className="space-y-3 mt-2">
          {FAQS.map((f)=>(<details key={f.q} className="group bg-white border border-gray-200 open:border-[#0818A8]/40 transition-colors"><summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none"><h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#0818A8] transition-colors">{f.q}</h3><span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-colors" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" /></svg></span></summary><p className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">{f.a}</p></details>))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">On a deadline?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Ship to Nigeria on time with R-Zone</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">Air 5 to 10 working days from £5/kg. Sea 4 to 6 weeks from £3/kg. Door to door from £6/kg. Weekly departures. Tell us your deadline and we will recommend the best service to meet it.</p>
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
