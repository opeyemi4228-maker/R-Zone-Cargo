// app/blog/sea-cargo-to-nigeria-from-uk/page.jsx
// Landing-structure blog post (light editorial hero). Server component, static
// HTML, self-canonical, UK English, no em/en dashes.

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Ship, Package, Boxes, PoundSterling, ShieldCheck, Award, Zap, Globe, Truck,
  Check, ArrowRight, PhoneCall, MessageCircle,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/sea-cargo-to-nigeria-from-uk`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1600&q=80&auto=format&fit=crop";

const TITLE = "Sea Cargo to Nigeria from the UK 2026: Cheapest Way to Ship Big Loads | R-Zone Enterprises";
const DESCRIPTION = "Sea cargo to Nigeria from the UK from £3/kg, the cheapest way to ship large or heavy loads. Weekly sailings to Lagos, LCL and full-container options, 4 to 6 week transit. Free quote from R-Zone.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: ["sea cargo to Nigeria","sea freight to Nigeria from UK","sea shipping to Nigeria","container shipping to Nigeria","LCL shipping to Nigeria","cheapest sea cargo Nigeria"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Container ship carrying sea cargo from the UK to Nigeria" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  { q: "How much is sea cargo to Nigeria from the UK?", a: "Sea cargo to Nigeria from the UK starts from £3/kg with R-Zone, all inclusive of documentation, transit, Nigeria customs clearance and delivery. A 20kg box is roughly £60 to £90; larger loads and full containers are quoted on request." },
  { q: "How long does sea cargo to Nigeria take?", a: "Sea cargo to Nigeria takes 4 to 6 weeks, including the sailing to Lagos (Apapa and Tin Can Island) and Nigeria customs clearance. R-Zone runs weekly sailings so your cargo joins the next departure." },
  { q: "What is the difference between LCL and full container?", a: "LCL (Less than Container Load) means your cargo shares a container and you pay only for the space you use, ideal for roughly 50kg to 2,000kg. FCL (Full Container Load) means you book a whole 20ft or 40ft container, ideal for relocations, vehicles and high-volume cargo." },
  { q: "What can I ship by sea to Nigeria?", a: "Sea cargo suits large, heavy and bulky goods: household goods and appliances, furniture, bulk and packaged food, clothing in quantity, building materials, car parts, vehicles and commercial merchandise." },
  { q: "Why is sea cargo cheaper than air?", a: "Sea cargo is cheaper because a vessel carries far more weight and volume per journey than a plane. From £3/kg versus £5/kg by air, and the saving grows with weight, which is why sea is the go-to for big loads." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: freshYear(TITLE), description: freshYear(DESCRIPTION), image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-08-28", dateModified: "2026-08-28", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "Sea Cargo to Nigeria from the UK", item: PAGE_URL } ] },
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
  "Household goods and appliances",
  "Furniture",
  "Bulk and packaged food",
  "Clothing and shoes in quantity",
  "Car parts and vehicles",
  "Commercial merchandise",
];

const WHY = [
  [PoundSterling, "Cheapest for big loads", "From £3/kg, sea is the most economical way to move large or heavy cargo to Nigeria."],
  [ShieldCheck, "Own team in Lagos", "We clear customs at Apapa and Tin Can Island ourselves, so your container is not stuck at the port."],
  [Zap, "Weekly sailings", "Your cargo joins the next sailing, not a queue, so it never waits long to depart."],
  [Award, "12+ years of experience", "50,000+ shipments delivered since 2012, with 107+ five-star reviews."],
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">Sea Cargo to Nigeria from the UK in {CURRENT_YEAR}: The Cheapest Way to Ship Big Loads</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">Sea cargo from <strong className="font-semibold text-gray-700">£3/kg</strong> is the cheapest way to send large or heavy loads to Nigeria. Weekly sailings to Lagos, LCL and full-container options, and a 4 to 6 week transit, explained.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Container ship carrying sea cargo from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Written by</p><p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p></div>
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Published on</p><p className="text-white text-[14px] font-bold">28 August 2026</p></div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8"><ShareRow url={PAGE_URL} title={freshYear(TITLE)} /></div>
          </div>
        </div>
      </section>

      {/* OPTIONS TABLE */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="options" eyebrow="LCL and full container">Sea Cargo Options and Prices ({CURRENT_YEAR})</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Ship as little as a single box or a whole container. Every rate is all inclusive of documentation, transit to Lagos, Nigeria customs clearance and delivery.</p>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead><tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]"><th className="p-4 font-bold">Option</th><th className="p-4 font-bold">From</th><th className="p-4 font-bold">Transit</th><th className="p-4 font-bold">Best for</th></tr></thead>
            <tbody className="text-[15px] text-gray-800">
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Boxes size={17} className="text-[#0818A8]" aria-hidden="true" />LCL (shared container)</span></td><td className="p-4 font-black text-[#0818A8]">£3 / kg</td><td className="p-4">4 to 6 weeks</td><td className="p-4">Boxes and part loads, 50kg to 2,000kg</td></tr>
              <tr className="bg-gray-50"><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Package size={17} className="text-[#0818A8]" aria-hidden="true" />20ft container (FCL)</span></td><td className="p-4 font-black text-[#0818A8]">On request</td><td className="p-4">4 to 6 weeks</td><td className="p-4">Relocations and high-volume cargo</td></tr>
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Package size={17} className="text-[#0818A8]" aria-hidden="true" />40ft container (FCL)</span></td><td className="p-4 font-black text-[#0818A8]">On request</td><td className="p-4">4 to 6 weeks</td><td className="p-4">Very large or commercial loads</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-[14.5px] leading-relaxed mt-5 max-w-3xl">A 20kg box by sea is roughly £60 to £90. Pack densely, because sea freight uses a volumetric divisor of 1,000. <Link href="/blog/what-is-volumetric-weight-freight-nigeria" className="text-[#0818A8] font-semibold underline">How volumetric weight works</Link>.</p>
      </section>

      {/* WHAT SHIPS BY SEA */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="what-ships" eyebrow="Made for sea">What to Send by Sea Cargo</H2>
          <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-7 max-w-3xl">Sea cargo is built for the big and the heavy. Some food and cosmetics need NAFDAC clearance and regulated goods fall under SON; we advise before you ship so nothing is held at the border.</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            {SENDS.map((s)=>(<li key={s} className="flex items-start gap-2.5 text-gray-700 text-[15px] leading-snug bg-white border border-gray-200 p-4"><Check size={17} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />{s}</li>))}
          </ul>
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="why-r-zone" eyebrow="The sea freight specialists">Why R-Zone for Sea Cargo to Nigeria</H2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
          {WHY.map(([Icon,t,d])=>(<li key={t} className="border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="faq" eyebrow="Everything you need to know">Sea Cargo to Nigeria FAQs</H2>
          <div className="space-y-3 mt-2">
            {FAQS.map((f)=>(<details key={f.q} className="group bg-white border border-gray-200 open:border-[#0818A8]/40 transition-colors"><summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none"><h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#0818A8] transition-colors">{f.q}</h3><span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-colors" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" /></svg></span></summary><p className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">{f.a}</p></details>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Shipping something big?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Get your sea cargo quote today</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">Sea cargo from £3/kg, LCL and full containers, weekly sailings to Lagos and delivery to every state. Tell us what you are shipping and we will quote the cheapest way to move it.</p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/sea-freight-uk-to-nigeria" className="hover:text-white transition-colors">Sea Freight Guide</Link>
            <Link href="/blog/cheap-cargo-rates-uk-to-nigeria" className="hover:text-white transition-colors">Cheap Cargo Rates</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Shipping Guides</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
