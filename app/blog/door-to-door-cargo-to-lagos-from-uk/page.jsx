// app/blog/door-to-door-cargo-to-lagos-from-uk/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Landing-structure blog post (light editorial hero, tables, cards, FAQ, CTA).
// Server component, static HTML, self-canonical, UK English, no em/en dashes.
// A matching ARTICLES entry provides the /blog listing card + count.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Plane, Ship, Truck, PoundSterling, ShieldCheck, Award, Zap, Globe,
  Check, ArrowRight, PhoneCall, MessageCircle, MapPin,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/door-to-door-cargo-to-lagos-from-uk`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80&auto=format&fit=crop";

const TITLE = "Door to Door Cargo to Lagos from the UK 2026: Prices & Times | R-Zone Enterprises";
const DESCRIPTION = "Door to door cargo to Lagos from the UK from £6/kg. We collect from your UK address and deliver to any door in Lagos. Air 5 to 10 days, sea 4 to 6 weeks. Free same-day quote from R-Zone.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: ["door to door cargo to Lagos","door to door shipping to Lagos from UK","cargo to Lagos from UK","send cargo to Lagos door to door","UK to Lagos door to door delivery","shipping to Lagos from UK","Lagos cargo delivery UK"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Cargo delivered door to door in Lagos after shipping from the UK" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  { q: "How much is door to door cargo to Lagos from the UK?", a: "Door to door cargo to Lagos starts from £6/kg with R-Zone, including UK collection, transit, Nigeria customs clearance and doorstep delivery in Lagos. A 20kg box is roughly £120 to £180 by air or £80 to £120 by sea, all inclusive with no hidden fees." },
  { q: "How long does cargo take to reach Lagos from the UK?", a: "Door to door air freight to Lagos takes 5 to 10 working days and sea freight takes 4 to 6 weeks, including UK collection, transit, Nigeria customs clearance and final delivery. R-Zone runs weekly air and sea departures to Lagos." },
  { q: "Do you collect cargo from my UK address for Lagos delivery?", a: "Yes. With door to door we collect from any UK address, home or business, nationwide, and deliver to the recipient's door anywhere in Lagos. There is no need to visit a depot at either end." },
  { q: "Which areas of Lagos do you deliver to?", a: "R-Zone delivers door to door across Lagos, including the mainland and island, Ikeja, Lekki, Victoria Island, Surulere, Ikorodu and beyond. Standard Lagos delivery is included in the quote." },
  { q: "Do you handle customs clearance in Lagos?", a: "Yes. Our own team in Lagos clears your cargo through Nigeria Customs, and NAFDAC or SON where they apply, so your cargo is not held at Apapa or Tin Can Island. Customs clearance is included in the door to door price." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: freshYear(TITLE), description: freshYear(DESCRIPTION), image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-08-22", dateModified: "2026-08-22", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "Door to Door Cargo to Lagos from the UK", item: PAGE_URL } ] },
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

const STEPS = [
  ["Get a quote and book", "Tell us what you are sending, the rough weight and your UK location. We respond the same day with an all-inclusive price from £6/kg."],
  ["We collect in the UK", "We collect from your address, home or business, anywhere in the country. No depot visit."],
  ["We ship and clear customs", "Air or sea to Lagos, then customs clearance by our own Lagos team so nothing is held at the port."],
  ["We deliver to the door", "Your cargo reaches the recipient's door anywhere in Lagos, from the mainland to the island."],
];

const WHY = [
  [Award, "12+ years of experience", "Delivering to Lagos since 2012, with 50,000+ shipments and 107+ five-star reviews."],
  [ShieldCheck, "Own team in Lagos", "We clear customs at Apapa and Tin Can Island ourselves, so cargo keeps moving."],
  [PoundSterling, "Transparent pricing", "From £6/kg all inclusive, with no hidden fees. The price we quote is the price you pay."],
  [Zap, "Weekly departures", "Air and sea services to Lagos every week, so your cargo never waits long."],
  [Globe, "Across all of Lagos", "Mainland and island, from Ikeja and Yaba to Lekki and Victoria Island."],
  [Truck, "True door to door", "Collected from your UK address, delivered to the recipient's door in Lagos."],
];

const AREAS = ["Ikeja","Lekki","Victoria Island","Ikoyi","Surulere","Yaba","Apapa","Ikorodu","Ajah","Festac","Magodo","Every area"];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">Door to Door Cargo to Lagos from the UK in {CURRENT_YEAR}: Prices, Times and How It Works</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">Sending to Lagos? Door to door cargo from the UK from <strong className="font-semibold text-gray-700">£6/kg</strong>, collected from your address and delivered to any door in Lagos. Here are the prices, transit times and how it works.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Cargo delivered door to door in Lagos after shipping from the UK" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
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
        <H2 id="prices" eyebrow="All inclusive rates">Door to Door Prices to Lagos (2026)</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Door to door cargo to Lagos starts from <strong className="text-gray-900">£6/kg</strong>, all inclusive of UK collection, transit, Nigeria customs clearance and doorstep delivery. Here is what a 20kg box from the UK to a Lagos door costs.</p>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead><tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]"><th className="p-4 font-bold">Service</th><th className="p-4 font-bold">Transit time</th><th className="p-4 font-bold">20kg example</th></tr></thead>
            <tbody className="text-[15px] text-gray-800">
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Plane size={17} className="text-[#0818A8]" aria-hidden="true" />Door to door by air</span></td><td className="p-4">5 to 10 working days</td><td className="p-4 font-black text-[#0818A8]">£120 to £180</td></tr>
              <tr className="bg-gray-50"><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Ship size={17} className="text-[#0818A8]" aria-hidden="true" />Door to door by sea</span></td><td className="p-4">4 to 6 weeks</td><td className="p-4 font-black text-[#0818A8]">£80 to £120</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-[14.5px] leading-relaxed mt-5 max-w-3xl">You pay for actual or volumetric weight, whichever is greater, so packing densely keeps your price low. <Link href="/blog/how-much-does-cargo-cost-from-uk-to-nigeria" className="text-[#0818A8] font-semibold underline">See the full price breakdown</Link>.</p>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="how-it-works" eyebrow="Simple and stress free">How Door to Door to Lagos Works</H2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
            {STEPS.map(([t,d],i)=>(<li key={t} className="relative bg-white border border-gray-200 p-6"><div className="font-black text-[#0818A8]/15 text-[46px] leading-none absolute top-3 right-4 select-none" aria-hidden="true">{i+1}</div><h3 className="font-bold text-gray-900 text-[15px] mb-2 relative">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed relative">{d}</p></li>))}
          </ol>
        </div>
      </section>

      {/* AREAS */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="areas" eyebrow="Across the city">Door to Door Delivery Across Lagos</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-7 max-w-3xl">We deliver door to door right across Lagos, on both the mainland and the island. Standard Lagos delivery is included in your quote, and we can arrange onward delivery to other states from Lagos too.</p>
        <ul className="flex flex-wrap gap-2.5">{AREAS.map((a)=>(<li key={a} className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 text-[14px] font-semibold px-3.5 py-2"><MapPin size={13} className="text-[#0818A8]" aria-hidden="true" />{a}</li>))}</ul>
      </section>

      {/* WHY */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="why-r-zone" eyebrow="Trusted by 100+ customers">Why Send to Lagos with R-Zone</H2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-2">
            {WHY.map(([Icon,t,d])=>(<li key={t} className="bg-white border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="faq" eyebrow="Everything you need to know">Door to Door to Lagos FAQs</H2>
        <div className="space-y-3 mt-2">
          {FAQS.map((f)=>(<details key={f.q} className="group bg-white border border-gray-200 open:border-[#0818A8]/40 transition-colors"><summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none"><h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#0818A8] transition-colors">{f.q}</h3><span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-colors" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" /></svg></span></summary><p className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">{f.a}</p></details>))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Sending to Lagos?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Book door to door cargo to Lagos today</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">Door to door from £6/kg. Air 5 to 10 working days, sea 4 to 6 weeks. Weekly departures and delivery across Lagos. Tell us what you are sending and where in Lagos it is going.</p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/door-to-door-shipping-uk-to-nigeria" className="hover:text-white transition-colors">Door to Door Guide</Link>
            <Link href="/blog/shipping-from-uk-to-lagos-nigeria" className="hover:text-white transition-colors">Shipping to Lagos</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Shipping Guides</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
