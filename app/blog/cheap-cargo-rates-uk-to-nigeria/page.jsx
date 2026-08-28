// app/blog/cheap-cargo-rates-uk-to-nigeria/page.jsx
// Landing-structure blog post (light editorial hero). Server component, static
// HTML, self-canonical, UK English, no em/en dashes. ARTICLES entry provides the
// /blog listing card + count.

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Ship, Plane, Truck, PoundSterling, ShieldCheck, Award, Zap, Globe, Package,
  Check, ArrowRight, PhoneCall, MessageCircle,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/cheap-cargo-rates-uk-to-nigeria`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=80&auto=format&fit=crop";

const TITLE = "Cheap Cargo Rates to Nigeria from the UK 2026: Lowest Prices | R-Zone Enterprises";
const DESCRIPTION = "The cheapest cargo rates to Nigeria from the UK in 2026: sea from £3/kg, air from £5/kg, door to door from £6/kg, all inclusive with no hidden fees. Plus how to pay even less. Free quote.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: ["cheap cargo to Nigeria","cheapest cargo rates UK to Nigeria","cheap shipping to Nigeria from UK","low cost cargo Nigeria","affordable cargo to Nigeria","cheapest way to send cargo to Nigeria"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Cargo boxes priced for cheap shipping from the UK to Nigeria" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  { q: "What are the cheapest cargo rates to Nigeria from the UK?", a: "The cheapest cargo rates to Nigeria from the UK are R-Zone's sea freight from £3/kg, air freight from £5/kg and door to door from £6/kg, all inclusive of documentation, transit, Nigeria customs clearance and delivery, with no hidden fees." },
  { q: "What is the cheapest way to send cargo to Nigeria?", a: "Sea freight from £3/kg is the cheapest way, especially for large or heavy loads. The saving over air grows with weight, so a 100kg shipment is about £300 to £450 by sea versus £500 to £700 by air. The trade off is time, 4 to 6 weeks by sea versus 5 to 10 working days by air." },
  { q: "How can I make my cargo to Nigeria even cheaper?", a: "Ship by sea for large or heavy loads, pack densely so you are not paying for empty space, consolidate small boxes into fewer large ones, and book ahead rather than at the last minute. R-Zone prices every option so you can pick the cheapest." },
  { q: "Are there any hidden fees?", a: "No. R-Zone's rates are all inclusive of UK documentation, transit, Nigeria customs clearance and delivery, with no fuel surcharges or surprise charges. The price we quote is the price you pay." },
  { q: "Do cheap rates still include customs clearance?", a: "Yes. Every rate includes Nigeria customs clearance through Nigeria Customs Service, handled by our own team in Lagos, plus NAFDAC and SON where they apply. Import duty on most personal-use goods is minimal." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: freshYear(TITLE), description: freshYear(DESCRIPTION), image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-08-28", dateModified: "2026-08-28", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "Cheap Cargo Rates to Nigeria from the UK", item: PAGE_URL } ] },
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

const TIPS = [
  [Ship, "Ship by sea for big loads", "Sea freight from £3/kg is the cheapest option for anything large or heavy. The saving over air grows with every kilogram."],
  [Package, "Pack densely", "You pay for actual or volumetric weight, whichever is greater. Fill every box and vacuum-pack clothing so you are not paying for air."],
  [Truck, "Consolidate your boxes", "Combine several small parcels into fewer large, well-packed boxes and ship them together in one go."],
  [PoundSterling, "Book ahead, not last minute", "Planned shipments let you use the most economical departure instead of paying for speed you do not need."],
];

const WHY = [
  [PoundSterling, "Transparent, all-inclusive", "No hidden handling fees, fuel surcharges or surprise charges. The price we quote is the price you pay."],
  [Award, "12+ years of experience", "Shipping UK to Nigeria cargo since 2012, with 50,000+ shipments and 107+ five-star reviews."],
  [ShieldCheck, "Own team in Lagos", "We clear customs ourselves, so cheap rates still mean your cargo is not stuck at the port."],
  [Zap, "Weekly departures", "Air and sea services every week, so your cargo never waits long for the next service."],
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">Cheap Cargo Rates to Nigeria from the UK in {CURRENT_YEAR}: The Lowest All-Inclusive Prices</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">Sea from <strong className="font-semibold text-gray-700">£3/kg</strong>, air from £5/kg, door to door from £6/kg, all inclusive with no hidden fees. Here are R-Zone's cheap cargo rates to Nigeria, and how to pay even less.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Cargo boxes priced for cheap shipping from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Written by</p><p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p></div>
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Published on</p><p className="text-white text-[14px] font-bold">28 August 2026</p></div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8"><ShareRow url={PAGE_URL} title={freshYear(TITLE)} /></div>
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="rates" eyebrow="Lowest all-inclusive rates">Cheap Cargo Rates to Nigeria ({CURRENT_YEAR})</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Every rate below includes UK export documentation, transit, Nigeria customs clearance and delivery. No hidden handling fees, no fuel surcharges, no surprises.</p>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead><tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]"><th className="p-4 font-bold">Service</th><th className="p-4 font-bold">From</th><th className="p-4 font-bold">20kg example</th><th className="p-4 font-bold">Best for</th></tr></thead>
            <tbody className="text-[15px] text-gray-800">
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Ship size={17} className="text-[#0818A8]" aria-hidden="true" />Sea freight</span></td><td className="p-4 font-black text-[#0818A8]">£3 / kg</td><td className="p-4">£60 to £90</td><td className="p-4">Cheapest for large or heavy loads</td></tr>
              <tr className="bg-gray-50"><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Plane size={17} className="text-[#0818A8]" aria-hidden="true" />Air freight</span></td><td className="p-4 font-black text-[#0818A8]">£5 / kg</td><td className="p-4">£100 to £160</td><td className="p-4">Faster, urgent items</td></tr>
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Truck size={17} className="text-[#0818A8]" aria-hidden="true" />Door to door</span></td><td className="p-4 font-black text-[#0818A8]">£6 / kg</td><td className="p-4">£80 to £180</td><td className="p-4">Collection plus doorstep delivery</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-[14.5px] leading-relaxed mt-5 max-w-3xl"><Link href="/blog/how-much-does-cargo-cost-from-uk-to-nigeria" className="text-[#0818A8] font-semibold underline">See the full price breakdown</Link>, or <Link href="/quote" className="text-[#0818A8] font-semibold underline">get a free quote</Link>.</p>
      </section>

      {/* HOW TO PAY LESS */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="save" eyebrow="Pay even less">4 Ways to Cut Your Cargo Cost</H2>
          <ul className="grid gap-5 sm:grid-cols-2 mt-2">
            {TIPS.map(([Icon,t,d])=>(<li key={t} className="bg-white border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
          </ul>
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="why-r-zone" eyebrow="Cheap, not cheap quality">Why R-Zone for Cheap Cargo to Nigeria</H2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
          {WHY.map(([Icon,t,d])=>(<li key={t} className="border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="faq" eyebrow="Everything you need to know">Cheap Cargo Rates FAQs</H2>
          <div className="space-y-3 mt-2">
            {FAQS.map((f)=>(<details key={f.q} className="group bg-white border border-gray-200 open:border-[#0818A8]/40 transition-colors"><summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none"><h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#0818A8] transition-colors">{f.q}</h3><span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-colors" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" /></svg></span></summary><p className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">{f.a}</p></details>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Want the cheapest rate?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Get your cheapest cargo quote today</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">Sea from £3/kg, air from £5/kg, door to door from £6/kg. Weekly departures, delivery to every state, and no hidden fees. Tell us what you are sending and we will price the cheapest way.</p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/how-much-does-cargo-cost-from-uk-to-nigeria" className="hover:text-white transition-colors">Full Price Guide</Link>
            <Link href="/blog/sea-cargo-to-nigeria-from-uk" className="hover:text-white transition-colors">Sea Cargo to Nigeria</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Shipping Guides</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
