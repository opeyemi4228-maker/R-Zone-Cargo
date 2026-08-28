// app/blog/fast-cargo-to-nigeria-from-uk/page.jsx
// Landing-structure blog post (light editorial hero). Server component, static
// HTML, self-canonical, UK English, no em/en dashes.

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Plane, Truck, Zap, Clock, ShieldCheck, Award, Globe, PoundSterling,
  Check, ArrowRight, PhoneCall, MessageCircle,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/fast-cargo-to-nigeria-from-uk`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80&auto=format&fit=crop";

const TITLE = "Fast Cargo to Nigeria from the UK 2026: Express Air Freight in 5 to 10 Days | R-Zone Enterprises";
const DESCRIPTION = "Need it there fast? Express air cargo to Nigeria from the UK in 5 to 10 working days from £5/kg, with weekly flights and our own Lagos clearing team. Free same-day quote from R-Zone.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: ["fast cargo to Nigeria","fast shipping to Nigeria from UK","express cargo to Nigeria","urgent cargo to Nigeria","quick delivery to Nigeria from UK","fastest way to ship to Nigeria"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Cargo aircraft for fast air freight from the UK to Nigeria" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  { q: "What is the fastest way to send cargo to Nigeria from the UK?", a: "The fastest way is express air freight, which arrives in 5 to 10 working days from £5/kg with R-Zone. It is ideal for urgent, high-value or time-sensitive cargo such as electronics, documents and medicine." },
  { q: "How fast can you deliver cargo to Nigeria?", a: "Air cargo to Nigeria is delivered in 5 to 10 working days, including UK collection, the flight to Lagos, Nigeria customs clearance and doorstep delivery. R-Zone runs weekly flights so your cargo joins the next departure." },
  { q: "How much does fast air cargo to Nigeria cost?", a: "Express air cargo starts from £5/kg, all inclusive. A 20kg box is roughly £100 to £160, or £120 to £180 with door to door collection and delivery. There are no hidden fees." },
  { q: "What can I send by fast air cargo?", a: "Air cargo suits compact, valuable and urgent items: electronics, phones, documents, medicine, fashion and gifts. Batteries, aerosols and liquids have specific air rules, so check with R-Zone if you are unsure." },
  { q: "How do you keep customs fast in Lagos?", a: "R-Zone has its own clearing team in Lagos that clears your cargo through Nigeria Customs on arrival, so it is not left waiting at the airport. That is a big part of what keeps the 5 to 10 day window reliable." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: freshYear(TITLE), description: freshYear(DESCRIPTION), image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-08-28", dateModified: "2026-08-28", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "Fast Cargo to Nigeria from the UK", item: PAGE_URL } ] },
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

const SENDS = [
  "Electronics and phones",
  "Documents and legal papers",
  "Medicine and supplements",
  "Fashion, shoes and gifts",
  "Urgent commercial stock",
  "Spare parts",
];

const WHY = [
  [Zap, "5 to 10 working days", "Express air freight is the fastest route to Nigeria, with weekly flights from Heathrow, Gatwick and Manchester."],
  [ShieldCheck, "Own clearing team in Lagos", "We clear customs on arrival so your cargo is not left waiting at the airport."],
  [Clock, "Same-day booking", "Tell us your deadline and we will route your cargo on the fastest available service."],
  [Award, "12+ years of experience", "50,000+ shipments delivered since 2012, with 107+ five-star reviews."],
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">Fast Cargo to Nigeria from the UK in {CURRENT_YEAR}: Express Air Freight in 5 to 10 Days</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">When it has to get there fast, express air cargo to Nigeria arrives in <strong className="font-semibold text-gray-700">5 to 10 working days</strong> from £5/kg, with weekly flights and our own Lagos clearing team to avoid port delays.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Cargo aircraft for fast air freight from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Written by</p><p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p></div>
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Published on</p><p className="text-white text-[14px] font-bold">28 August 2026</p></div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8"><ShareRow url={PAGE_URL} title={freshYear(TITLE)} /></div>
          </div>
        </div>
      </section>

      {/* SPEED TABLE */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="speed" eyebrow="How fast, how much">Fast Cargo to Nigeria: Speed and Price ({CURRENT_YEAR})</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Air freight is the fastest way to reach Nigeria. Both timelines include UK handling, the flight to Lagos, Nigeria customs clearance and delivery, with weekly departures so cargo never waits.</p>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead><tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]"><th className="p-4 font-bold">Service</th><th className="p-4 font-bold">Speed</th><th className="p-4 font-bold">From</th><th className="p-4 font-bold">Best for</th></tr></thead>
            <tbody className="text-[15px] text-gray-800">
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Plane size={17} className="text-[#0818A8]" aria-hidden="true" />Express air freight</span></td><td className="p-4 font-black text-[#0818A8]">5 to 10 working days</td><td className="p-4">£5/kg</td><td className="p-4">Urgent, high-value cargo</td></tr>
              <tr className="bg-gray-50"><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Truck size={17} className="text-[#0818A8]" aria-hidden="true" />Door to door by air</span></td><td className="p-4 font-black text-[#0818A8]">5 to 10 working days</td><td className="p-4">£6/kg</td><td className="p-4">Collected and delivered fast</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-[14.5px] leading-relaxed mt-5 max-w-3xl">A 20kg box is roughly £100 to £160 by air, or £120 to £180 door to door. <Link href="/blog/how-long-shipping-uk-to-nigeria-takes" className="text-[#0818A8] font-semibold underline">See full transit times</Link>.</p>
      </section>

      {/* WHAT SHIPS FAST */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="what-ships-fast" eyebrow="Perfect for air">What to Send by Fast Air Cargo</H2>
          <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-7 max-w-3xl">Air cargo is ideal for compact, valuable and time-sensitive items. Some goods such as batteries, aerosols and liquids have specific air rules, so ask us first if you are unsure.</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            {SENDS.map((s)=>(<li key={s} className="flex items-start gap-2.5 text-gray-700 text-[15px] leading-snug bg-white border border-gray-200 p-4"><Check size={17} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />{s}</li>))}
          </ul>
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="why-r-zone" eyebrow="Fast and reliable">Why R-Zone for Fast Cargo to Nigeria</H2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
          {WHY.map(([Icon,t,d])=>(<li key={t} className="border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="faq" eyebrow="Everything you need to know">Fast Cargo FAQs</H2>
          <div className="space-y-3 mt-2">
            {FAQS.map((f)=>(<details key={f.q} className="group bg-white border border-gray-200 open:border-[#0818A8]/40 transition-colors"><summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none"><h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#0818A8] transition-colors">{f.q}</h3><span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-colors" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" /></svg></span></summary><p className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">{f.a}</p></details>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">On the clock?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Get your fast cargo to Nigeria moving today</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">Express air from £5/kg, delivered in 5 to 10 working days. Weekly flights, own clearing team in Lagos, and same-day booking. Tell us your deadline and we will make it.</p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/air-freight-uk-to-nigeria" className="hover:text-white transition-colors">Air Freight Guide</Link>
            <Link href="/blog/how-long-shipping-uk-to-nigeria-takes" className="hover:text-white transition-colors">Transit Times</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Shipping Guides</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
