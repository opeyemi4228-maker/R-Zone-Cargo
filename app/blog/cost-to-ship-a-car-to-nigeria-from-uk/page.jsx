// app/blog/cost-to-ship-a-car-to-nigeria-from-uk/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Landing-structure blog post (light editorial hero, tables, cards, FAQ, CTA),
// matching /cargo-from-uk-to-nigeria and the car-shipping page. Server component,
// static HTML, self-canonical, UK English, no em/en dashes. A matching ARTICLES
// entry provides the /blog listing card + count; this page wins the route.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Ship, Package, Truck, Calendar, PoundSterling, ShieldCheck, Award, Zap, Globe,
  Check, ArrowRight, PhoneCall, MessageCircle, MapPin,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/cost-to-ship-a-car-to-nigeria-from-uk`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=80&auto=format&fit=crop";

const TITLE = "How Much to Ship a Car to Nigeria from the UK? 2026 Prices | R-Zone Enterprises";
const DESCRIPTION = "How much does it cost to ship a car to Nigeria from the UK in 2026? RORO from £960, container from £1,800, plus customs duty, the 15-year age limit and MOT rule explained. Free quote from R-Zone.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: ["cost to ship a car to Nigeria","how much to ship a car to Nigeria from UK","car shipping cost UK to Nigeria","RORO car shipping price Nigeria","container car shipping cost Nigeria","ship a car to Lagos cost","Nigeria car import duty cost"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "A car being prepared for shipping from the UK to Nigeria" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  { q: "How much does it cost to ship a car to Nigeria from the UK?", a: "Car shipping from the UK to Nigeria starts from around £960 by RORO for a standard saloon, £1,280 for a 4x4 or SUV, and £1,800 for shared-container shipping. These are indicative 2026 shipping prices and do not include Nigeria customs duty, which is paid on arrival. Get a free quote from R-Zone for a firm figure." },
  { q: "How much is customs duty on a car in Nigeria?", a: "Nigeria customs duty on a used car is typically around 35% of the assessed value once duty and levy are combined, plus port and clearing charges, paid on arrival. The exact figure depends on the make, model, engine size and customs valuation. R-Zone confirms the amount before your car sails." },
  { q: "Is RORO or container cheaper to ship a car to Nigeria?", a: "RORO is cheaper, from around £960 for a saloon, because the car is simply driven on and off the vessel. Container shipping costs more, from around £1,800 shared, but adds security, protects the car and lets you include personal effects where customs rules allow." },
  { q: "Do I need an MOT to ship my car to Nigeria?", a: "Yes. All vehicles shipped to Nigeria must now have a valid roadworthiness certificate, which for a UK car means a current MOT, at the point of shipment. R-Zone cannot load a car without one, so make sure the MOT is in date before your collection or drop-off." },
  { q: "What is the age limit for importing a car into Nigeria?", a: "Nigeria does not allow the import of cars older than 15 years from their year of manufacture, so in 2026 that generally means cars made in 2011 or earlier cannot be imported. R-Zone confirms your car's eligibility before you book." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: freshYear(TITLE), description: freshYear(DESCRIPTION), image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-08-22", dateModified: "2026-08-22", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "Cost to Ship a Car to Nigeria from the UK", item: PAGE_URL } ] },
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
  [Ship, "Choose RORO for a running car", "RORO is the cheapest method by a clear margin for a single running car, from around £960."],
  [Calendar, "Meet the age limit", "Only ship a car comfortably within Nigeria's 15-year rule so it is never rejected at the port."],
  [PoundSterling, "Confirm duty upfront", "Get the Nigeria customs duty confirmed before the car sails so it does not blow your budget on arrival."],
  [ShieldCheck, "Have paperwork ready", "MOT, V5C, ID and keys ready means no delays or storage charges at either end."],
];

const WHY = [
  [Award, "12+ years of experience", "Shipping cars and cargo from the UK to Nigeria since 2012, with 50,000+ shipments delivered."],
  [ShieldCheck, "Own clearing team in Lagos", "We handle Nigeria customs, duty and port charges end to end, so your car is not stuck at the port."],
  [Zap, "Regular sailings", "Your car joins the next available RORO or container departure, with no long waits."],
  [Globe, "Delivery across Nigeria", "Lagos, Abuja, Port Harcourt, Ibadan, Kano and every state."],
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">How Much Does It Cost to Ship a Car to Nigeria from the UK in {CURRENT_YEAR}?</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">RORO from <strong className="font-semibold text-gray-700">£960</strong>, container from £1,800, plus customs duty on arrival. Here is the full 2026 cost of shipping a car to Nigeria, including the age limit and the new MOT rule.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="A car being prepared for shipping from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Written by</p><p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p></div>
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Published on</p><p className="text-white text-[14px] font-bold">22 August 2026</p></div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8"><ShareRow url={PAGE_URL} title={TITLE} /></div>
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="prices" eyebrow="Indicative 2026 rates">Car Shipping Prices from the UK to Nigeria</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">The cost has two parts: the shipping price you pay in the UK, and the customs duty paid on arrival in Nigeria. Here are R-Zone's indicative 2026 shipping prices; duty is covered below.</p>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead><tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]"><th className="p-4 font-bold">Method</th><th className="p-4 font-bold">From</th><th className="p-4 font-bold">Transit</th><th className="p-4 font-bold">Best for</th></tr></thead>
            <tbody className="text-[15px] text-gray-800">
              {[[Ship,"RORO (saloon / hatchback)","£960","4 to 6 weeks","Cheapest for a single running car"],[Ship,"RORO (4x4 / SUV / van)","£1,280","4 to 6 weeks","Larger running vehicles"],[Package,"Shared container","£1,800","5 to 7 weeks","Extra security plus personal effects"],[Package,"Sole-use container","On request","5 to 7 weeks","Multiple cars or high-value vehicles"]].map(([Icon,name,price,transit,best],i)=>(
                <tr key={name} className={i % 2 ? "bg-gray-50" : ""}><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Icon size={17} className="text-[#0818A8]" aria-hidden="true" />{name}</span></td><td className="p-4 font-black text-[#0818A8]">{price}</td><td className="p-4">{transit}</td><td className="p-4">{best}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-[14.5px] leading-relaxed mt-5 max-w-3xl"><strong className="text-gray-900">Please note:</strong> these prices do not include Nigeria customs duty, paid on arrival. Your exact price depends on the car, UK collection point, destination port and season. <Link href="/quote" className="text-[#0818A8] font-semibold underline">Get a free quote</Link> for a firm figure.</p>
      </section>

      {/* DUTY + AGE + MOT */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="duty-rules" eyebrow="Budget accurately">Duty, Age Limit and the MOT Rule</H2>
          <div className="grid gap-5 md:grid-cols-2 mt-2">
            <div className="bg-white border border-gray-200 p-7"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><PoundSterling size={20} aria-hidden="true" /></span><h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">Customs duty</h3><p className="text-gray-700 text-[15px] leading-relaxed">Typically around <strong>35% of the assessed value</strong> once duty and levy are combined, plus port and clearing charges, paid on arrival. The figure depends on the make, model and engine size. Our Lagos team confirms it before your car sails.</p></div>
            <div className="bg-white border border-[#0818A8]/15 p-7"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8] text-white mb-4"><Calendar size={20} aria-hidden="true" /></span><h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">The 15-year age limit</h3><p className="text-gray-700 text-[15px] leading-relaxed">Nigeria does not allow the import of cars older than <strong>15 years from their year of manufacture</strong>. In 2026 that generally means cars made in 2011 or earlier cannot be imported. We confirm eligibility before you book.</p></div>
          </div>
          <div className="mt-6 max-w-3xl border-l-[4px] border-[#0818A8] bg-white p-5"><p className="text-gray-800 text-[14.5px] leading-relaxed"><strong className="text-gray-900">New MOT requirement:</strong> all vehicles shipped to Nigeria must now have a valid roadworthiness certificate (a current <strong className="text-gray-900">MOT</strong>) at the point of shipment. We cannot load a car without one. You also need the V5C logbook, photo ID and the keys.</p></div>
        </div>
      </section>

      {/* HOW TO KEEP COST DOWN */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="save" eyebrow="Spend less">How to Keep Your Car Shipping Cost Down</H2>
        <ul className="grid gap-5 sm:grid-cols-2 mt-2">
          {TIPS.map(([Icon,t,d])=>(<li key={t} className="border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
        </ul>
      </section>

      {/* WHY */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="why-r-zone" eyebrow="Trusted by 100+ customers">Why Ship Your Car with R-Zone</H2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
            {WHY.map(([Icon,t,d])=>(<li key={t} className="bg-white border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="faq" eyebrow="Everything you need to know">Car Shipping Cost FAQs</H2>
        <div className="space-y-3 mt-2">
          {FAQS.map((f)=>(<details key={f.q} className="group bg-white border border-gray-200 open:border-[#0818A8]/40 transition-colors"><summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none"><h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#0818A8] transition-colors">{f.q}</h3><span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-colors" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" /></svg></span></summary><p className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">{f.a}</p></details>))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Ready to ship your car?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Get a firm car shipping quote today</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">RORO from £960, container from £1,800, own clearing team in Lagos. Tell us the make, model and year and we will confirm eligibility, price and duty the same day.</p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/car-shipping-uk-to-nigeria" className="hover:text-white transition-colors">Car Shipping Guide</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Shipping Guides</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
