// app/blog/bulk-shipping-uk-to-nigeria/page.jsx
// Landing-structure blog post (light editorial hero). Server component, static
// HTML, self-canonical, UK English, no em/en dashes. ARTICLES entry provides the
// /blog listing card + count.

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Boxes, Package, Container, Ship, Layers, PoundSterling, FileText, ShieldCheck, Building2,
  Truck, Warehouse, Globe, Check, ArrowRight, PhoneCall, MessageCircle,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/bulk-shipping-uk-to-nigeria`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1600&q=80&auto=format&fit=crop";

const TITLE = "Bulk Shipping from the UK to Nigeria 2026: LCL, FCL & Pallets | R-Zone Enterprises";
const DESCRIPTION = "The complete guide to bulk shipping from the UK to Nigeria: LCL vs full container (FCL), 20ft and 40ft capacities, pallet loads, cost per kg, packaging, customs and compliance for commercial cargo. Free quote.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: ["bulk shipping to Nigeria","bulk cargo UK to Nigeria","LCL shipping Nigeria","FCL container to Nigeria","commercial shipping to Nigeria","pallet shipping to Nigeria","container shipping UK Nigeria"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Containers and pallets ready for bulk shipping from the UK to Nigeria" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  { q: "What is bulk shipping to Nigeria?", a: "Bulk shipping means moving large volumes of cargo, either sharing a container (LCL, Less than Container Load) or booking a whole 20ft or 40ft container (FCL, Full Container Load). It suits commercial importers, big household moves and anyone sending pallet loads or high quantities, because the cost per kilogram falls as volume rises." },
  { q: "Is LCL or FCL cheaper for bulk cargo?", a: "For part loads, roughly 50kg to a few thousand kg, LCL is cheaper because you pay only for the space you use. Once your cargo would fill most of a container, a full 20ft or 40ft FCL becomes cheaper per unit and gives you the whole box to yourself. R-Zone prices both so you can compare." },
  { q: "How much can a container hold?", a: "A 20ft container holds around 28 cubic metres of usable space and up to about 28 tonnes; a 40ft container holds around 58 cubic metres and a similar maximum weight, so it is the choice when your cargo is bulky rather than dense. As a rough guide, a 20ft fits the contents of a small house and a 40ft a larger one." },
  { q: "How much does bulk shipping to Nigeria cost?", a: "Bulk sea freight starts from £3/kg for LCL, and full 20ft and 40ft container rates are quoted on application. The more you ship, the lower your effective cost per kilogram, which is the main reason businesses and large movers ship in bulk. R-Zone gives you a firm rate for your volume." },
  { q: "Do you handle customs for commercial bulk imports?", a: "Yes. R-Zone's Lagos team handles Nigeria customs clearance, including duty under the ECOWAS Common External Tariff, 7.5 percent VAT, and SON or NAFDAC requirements for regulated goods. For formal commercial imports we also guide you through Form M and the PAAR process." },
  { q: "Can I ship pallets to Nigeria?", a: "Yes. Palletised cargo ships well by LCL or FCL, protects your goods and speeds handling. R-Zone can advise on palletising and shrink-wrapping, or collect loose cartons and consolidate them for you." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: freshYear(TITLE), description: freshYear(DESCRIPTION), image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-09-05", dateModified: "2026-09-05", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "Bulk Shipping from the UK to Nigeria", item: PAGE_URL } ] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  { "@context": "https://schema.org", ...ORGANIZATION_SCHEMA },
];

function CTAButtons({ light = false }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/quote" className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0a1fce] text-white text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3.5 transition-colors">Get a Bulk Quote<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" /></Link>
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

const OPTIONS = [
  { icon: Boxes, name: "LCL (shared container)", price: "From £3/kg", href: "/quote", points: ["Pay only for the space you use", "Ideal for 50kg to a few thousand kg", "Consolidated with other shipments", "Great for regular top-up stock"] },
  { icon: Package, name: "FCL 20ft container", price: "On request", href: "/quote", points: ["Around 28 CBM, up to ~28 tonnes", "The whole container to yourself", "Best when you nearly fill it", "Fits a small house move"] },
  { icon: Container, name: "FCL 40ft container", price: "On request", href: "/quote", points: ["Around 58 CBM of space", "Best for bulky, high-volume loads", "Lowest cost per unit at scale", "Fits a large house or big order"] },
];

const PACKING = [
  [Layers, "Palletise where you can", "Pallets protect goods, speed loading and make counting easy. Shrink-wrap and strap each pallet securely."],
  [Package, "Use strong, uniform cartons", "Consistent, double-walled boxes stack safely and use container space efficiently, lowering your volumetric cost."],
  [FileText, "Label and list everything", "Clear labels and an accurate packing list per pallet or carton speed customs clearance in Lagos."],
  [ShieldCheck, "Insure high-value loads", "Bulk loads carry bulk value. Marine transit insurance covers loss or damage for a small premium."],
];

const WHO = [
  [Building2, "Importers and retailers", "Regular commercial stock, from fashion and cosmetics to electronics and household goods."],
  [Warehouse, "Wholesalers and distributors", "High-volume merchandise consolidated and shipped on a schedule that suits your supply chain."],
  [Truck, "Large household moves", "Relocations and big family shipments that fill a container or a large part of one."],
  [Globe, "Businesses building supply lines", "Anyone setting up a steady UK to Nigeria trade route who needs reliable, repeatable bulk logistics."],
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">Bulk Shipping from the UK to Nigeria in {CURRENT_YEAR}: LCL, FCL, Pallets and Costs</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">Shipping in volume changes the economics. Here is the complete guide to bulk shipping from the UK to Nigeria: LCL vs full container, 20ft and 40ft capacities, pallets, cost per kg, packaging and commercial customs.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Containers and pallets ready for bulk shipping from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Written by</p><p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p></div>
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Published on</p><p className="text-white text-[14px] font-bold">5 September 2026</p></div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8"><ShareRow url={PAGE_URL} title={freshYear(TITLE)} /></div>
          </div>
        </div>
      </section>

      {/* WHAT IS BULK SHIPPING + OPTIONS */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="options" eyebrow="Three ways to ship in volume">LCL, 20ft and 40ft Explained</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Bulk shipping means moving large volumes by sea. You either share a container and pay for the space you use (LCL), or take a whole 20ft or 40ft container to yourself (FCL). The right choice depends on how much you are sending.</p>
        <div className="grid gap-5 md:grid-cols-3 mt-2">
          {OPTIONS.map(({ icon: Icon, name, price, href, points }) => (
            <div key={name} className="group bg-white border border-gray-200 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/5 transition-all duration-300 flex flex-col">
              <div className="p-6 pb-5 border-b border-gray-100">
                <span className="inline-flex items-center justify-center w-12 h-12 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={22} aria-hidden="true" /></span>
                <h3 className="font-black text-[17px] text-gray-900 uppercase tracking-[-0.01em] mb-1">{name}</h3>
                <p className="text-[#0818A8] font-black text-[16px]">{price}</p>
              </div>
              <ul className="p-6 pt-5 space-y-2.5 flex-1">
                {points.map((pt) => (<li key={pt} className="flex items-start gap-2.5 text-gray-700 text-[14.5px] leading-snug"><Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />{pt}</li>))}
              </ul>
              <Link href={href} className="flex items-center gap-1.5 px-6 py-4 border-t border-gray-100 text-[#0818A8] text-[12px] font-black tracking-[0.06em] uppercase group-hover:bg-[#0818A8] group-hover:text-white transition-colors">Get a quote<ArrowRight size={13} aria-hidden="true" /></Link>
            </div>
          ))}
        </div>
      </section>

      {/* CONTAINER CAPACITIES TABLE */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="capacities" eyebrow="How much fits">Container Sizes and Capacities</H2>
          <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Containers are limited by both volume and weight. Dense cargo hits the weight limit first; bulky, light cargo fills the space first. Use this as a planning guide, then let us confirm for your exact load.</p>
          <div className="overflow-x-auto border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead><tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]"><th className="p-4 font-bold">Option</th><th className="p-4 font-bold">Usable volume</th><th className="p-4 font-bold">Max payload</th><th className="p-4 font-bold">Rough guide</th></tr></thead>
              <tbody className="text-[15px] text-gray-800">
                <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Boxes size={17} className="text-[#0818A8]" aria-hidden="true" />LCL part load</span></td><td className="p-4">You pay per CBM</td><td className="p-4">50kg and up</td><td className="p-4">A few boxes to a few pallets</td></tr>
                <tr className="bg-gray-50"><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Package size={17} className="text-[#0818A8]" aria-hidden="true" />20ft container</span></td><td className="p-4 font-black text-[#0818A8]">~28 CBM</td><td className="p-4">up to ~28 tonnes</td><td className="p-4">Small house move, ~10 pallets</td></tr>
                <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Container size={17} className="text-[#0818A8]" aria-hidden="true" />40ft container</span></td><td className="p-4 font-black text-[#0818A8]">~58 CBM</td><td className="p-4">up to ~28 tonnes</td><td className="p-4">Large house move, ~20 pallets</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-[14.5px] leading-relaxed mt-5 max-w-3xl">CBM means cubic metres. Because a 40ft holds roughly double the volume but a similar weight limit, it is the smart choice for bulky, lower-density goods.</p>
        </div>
      </section>

      {/* COST ADVANTAGE */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="cost" eyebrow="Economies of scale">Why Bulk Shipping Costs Less Per Unit</H2>
        <div className="grid gap-5 md:grid-cols-2 mt-2">
          <div className="border border-[#0818A8]/15 bg-[#0818A8]/[0.03] p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8] text-white mb-4"><PoundSterling size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">The more you ship, the less it costs</h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">Bulk sea freight starts from <strong>£3/kg</strong> for LCL, and your effective cost per kilogram keeps falling as your volume rises toward a full container. Fixed costs like documentation and clearance are spread across far more cargo.</p>
          </div>
          <div className="border border-gray-200 p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Ship size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">Pack dense to pay less</h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">Sea freight charges on actual or volumetric weight, whichever is greater, using a divisor of 1,000. Filling every carton and palletising tightly means you pay for goods, not for shipping air.</p>
          </div>
        </div>
      </section>

      {/* PACKAGING */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="packing" eyebrow="Ship it safely">How to Pack a Bulk Load</H2>
          <ul className="grid gap-5 sm:grid-cols-2 mt-2">
            {PACKING.map(([Icon,t,d])=>(<li key={t} className="bg-white border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
          </ul>
        </div>
      </section>

      {/* CUSTOMS & COMPLIANCE */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="customs" eyebrow="For commercial cargo">Customs and Compliance for Bulk Imports</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Commercial bulk imports into Nigeria have extra requirements beyond a personal box. R-Zone's Lagos team handles clearance and guides you through the paperwork so your container is not held.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-2">
          {[
            ["Import duty (ECOWAS CET)", "Commercial goods are dutiable under the ECOWAS Common External Tariff, at rates that vary by product category."],
            ["7.5% VAT", "Nigeria applies 7.5 percent VAT on most imports, calculated on the assessed value plus duty."],
            ["SON / SONCAP", "Regulated products need a SONCAP certificate from the Standards Organisation of Nigeria before clearance."],
            ["NAFDAC", "Food, drugs, cosmetics and similar goods require NAFDAC registration and clearance."],
            ["Form M and PAAR", "Formal commercial imports use a Form M declaration and a Pre-Arrival Assessment Report. We guide you through both."],
            ["Documentation", "A commercial invoice and detailed packing list are essential for smooth, accurate clearance."],
          ].map(([t,d])=>(<div key={t} className="border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><FileText size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></div>))}
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="who" eyebrow="Who ships in bulk">Who Bulk Shipping Is For</H2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
            {WHO.map(([Icon,t,d])=>(<li key={t} className="bg-white border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="faq" eyebrow="Everything you need to know">Bulk Shipping FAQs</H2>
        <div className="space-y-3 mt-2">
          {FAQS.map((f)=>(<details key={f.q} className="group bg-white border border-gray-200 open:border-[#0818A8]/40 transition-colors"><summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none"><h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#0818A8] transition-colors">{f.q}</h3><span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-colors" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" /></svg></span></summary><p className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">{f.a}</p></details>))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Shipping in volume?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Get a bulk shipping rate for Nigeria</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">LCL from £3/kg, full 20ft and 40ft container rates on application, pallets, consolidation and full commercial customs clearance. Tell us your volume and we will quote the most economical way to move it.</p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/sea-cargo-to-nigeria-from-uk" className="hover:text-white transition-colors">Sea Cargo to Nigeria</Link>
            <Link href="/blog/marine-cargo-insurance-uk-to-nigeria" className="hover:text-white transition-colors">Cargo Insurance</Link>
            <Link href="/blog/uk-to-nigeria-import-export-business-guide" className="hover:text-white transition-colors">Import & Export Guide</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
