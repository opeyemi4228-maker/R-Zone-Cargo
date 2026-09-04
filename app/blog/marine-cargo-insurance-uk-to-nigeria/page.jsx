// app/blog/marine-cargo-insurance-uk-to-nigeria/page.jsx
// Landing-structure blog post (light editorial hero). Server component, static
// HTML, self-canonical, UK English, no em/en dashes. ARTICLES entry provides the
// /blog listing card + count. Content follows established marine-insurance
// standards: Institute Cargo Clauses (A/B/C), Hague-Visby / Montreal / CMR
// liability limits, and the York-Antwerp General Average rules.

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  ShieldCheck, ShieldAlert, FileText, Anchor, Ship, Plane, Truck, PoundSterling,
  Scale, ClipboardList, Award, Globe, Check, ArrowRight, PhoneCall, MessageCircle,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/marine-cargo-insurance-uk-to-nigeria`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop";

const TITLE = "Marine Cargo & Transit Insurance for Shipping to Nigeria 2026 | R-Zone Enterprises";
const DESCRIPTION = "A complete guide to marine cargo and transit insurance for shipping from the UK to Nigeria: Institute Cargo Clauses A, B and C, carrier liability limits, General Average, how to value cover and how to claim.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: ["marine cargo insurance","transit insurance Nigeria","cargo insurance UK to Nigeria","shipping insurance to Nigeria","goods in transit insurance","institute cargo clauses","sea cargo insurance"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Cargo boxes protected by marine transit insurance for shipping from the UK to Nigeria" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  { q: "Do I need marine cargo insurance to ship to Nigeria?", a: "It is strongly recommended. A carrier's legal liability is capped very low, roughly 2 SDR per kg by sea under the Hague-Visby Rules (about £2 per kg), which rarely reflects your goods' real value. Marine cargo insurance covers the gap so you are reimbursed for the actual insured value if goods are lost or damaged in transit, regardless of whether the carrier was at fault." },
  { q: "What does transit insurance cover?", a: "A comprehensive 'all risks' policy (Institute Cargo Clauses A) covers accidental physical loss or damage from most external causes in transit, warehouse to warehouse. It excludes inadequate packing, inherent vice, ordinary wear, delay, and war or strikes unless those clauses are added. Clauses B and C are narrower, covering named perils only." },
  { q: "How much cover should I buy?", a: "The market standard is CIF plus 10 percent: the cost of the goods, plus insurance and freight, plus a 10 percent margin for incidental expenses and expected profit. So £2,000 of goods with £300 freight would be insured for about £2,530. Insuring the full value means a total loss leaves you no worse off." },
  { q: "How much does cargo insurance cost?", a: "Premiums are a small percentage of the insured value, commonly in the region of 0.3 percent to 1 percent or more depending on the goods, the route, the packing and the cover level. On £2,500 of cover that is often only £10 to £25. R-Zone can arrange cover and quote the exact premium for your shipment." },
  { q: "What is General Average and why does it matter?", a: "Under the York-Antwerp Rules, if the ship's crew sacrifices cargo or incurs extraordinary expense to save the whole voyage (for example jettisoning cargo or salvage after a fire), every cargo owner must contribute proportionally, even if their own goods were fine. Without insurance you must pay your share and post a bond before your cargo is released. A marine policy responds to General Average for you." },
  { q: "How do I make a claim?", a: "Note any visible damage on the delivery receipt, do not discard the packaging, photograph everything, and notify the insurer promptly (usually within a set number of days). Keep your commercial invoice, packing list and bill of lading, complete the claim form, and allow a survey if requested. R-Zone helps you gather the documents and file the claim." },
  { q: "Does R-Zone arrange the insurance for me?", a: "Yes. R-Zone can arrange marine transit insurance on your UK to Nigeria cargo when you book, so your shipment is covered from our warehouse to the recipient's door. Just declare the value of your goods and ask for cover on your quote." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: freshYear(TITLE), description: freshYear(DESCRIPTION), image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-09-05", dateModified: "2026-09-05", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "Marine Cargo and Transit Insurance for Shipping to Nigeria", item: PAGE_URL } ] },
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

const EXCLUSIONS = [
  ["Inadequate packing", "Loss caused by insufficient or unsuitable packing for the journey is excluded, which is why professional packing matters."],
  ["Inherent vice", "The natural behaviour of the goods themselves, such as perishables spoiling or metals rusting over time, is not covered."],
  ["Delay", "Loss of market or financial loss caused purely by delay is excluded, even if the delay itself was covered."],
  ["Ordinary wear and leakage", "Ordinary leakage, loss in weight or volume, and normal wear and tear are not insured events."],
  ["War and strikes", "War, strikes, riots and civil commotion are excluded unless the War and Strikes clauses are specifically added."],
  ["Wilful misconduct", "Loss deliberately caused by the insured, and shipping prohibited or illegal goods, are never covered."],
];

const CLAIM_STEPS = [
  ["Inspect on delivery", "Check the cargo before you sign. Note any visible damage or shortage on the delivery receipt or POD."],
  ["Preserve the evidence", "Do not throw away packaging. Photograph the damage, the packaging and the labels straight away."],
  ["Notify promptly", "Tell R-Zone and the insurer as soon as possible, within any time limit stated in the policy."],
  ["Submit and survey", "Provide the invoice, packing list and bill of lading, complete the claim form, and allow a survey if requested."],
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">Marine Cargo and Transit Insurance for Shipping to Nigeria: The Complete {CURRENT_YEAR} Guide</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">A carrier's liability barely covers a fraction of your cargo's value. Here is how marine cargo and transit insurance really works on a UK to Nigeria shipment: what it covers, the Institute Cargo Clauses, General Average, and how to claim.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Cargo boxes protected by marine transit insurance for shipping from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Written by</p><p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p></div>
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Published on</p><p className="text-white text-[14px] font-bold">5 September 2026</p></div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8"><ShareRow url={PAGE_URL} title={freshYear(TITLE)} /></div>
          </div>
        </div>
      </section>

      {/* WHY YOU NEED IT - carrier liability */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="why" eyebrow="The gap most people miss">Why the Carrier's Liability Is Not Enough</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Many shippers assume the carrier is fully responsible if something goes wrong. In reality, international conventions cap a carrier's liability at a fixed amount per kilogram, and only if the carrier is proven at fault. That cap is far below what most cargo is actually worth.</p>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead><tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]"><th className="p-4 font-bold">Mode</th><th className="p-4 font-bold">Convention</th><th className="p-4 font-bold">Liability cap</th><th className="p-4 font-bold">Roughly</th></tr></thead>
            <tbody className="text-[15px] text-gray-800">
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Ship size={17} className="text-[#0818A8]" aria-hidden="true" />Sea</span></td><td className="p-4">Hague-Visby Rules</td><td className="p-4 font-black text-[#0818A8]">2 SDR / kg</td><td className="p-4">about £2 / kg</td></tr>
              <tr className="bg-gray-50"><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Plane size={17} className="text-[#0818A8]" aria-hidden="true" />Air</span></td><td className="p-4">Montreal Convention</td><td className="p-4 font-black text-[#0818A8]">22 SDR / kg</td><td className="p-4">about £24 / kg</td></tr>
              <tr><td className="p-4 font-bold"><span className="inline-flex items-center gap-2.5"><Truck size={17} className="text-[#0818A8]" aria-hidden="true" />Road</span></td><td className="p-4">CMR Convention</td><td className="p-4 font-black text-[#0818A8]">8.33 SDR / kg</td><td className="p-4">about £9 / kg</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-[14.5px] leading-relaxed mt-5 max-w-3xl">An SDR (Special Drawing Right) is an IMF currency unit worth roughly £1.10. So a 20kg box of electronics worth £1,500, lost at sea, might attract carrier compensation of only about £40. Marine cargo insurance is what covers the other £1,460.</p>
      </section>

      {/* WHAT IT COVERS - ICC clauses */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="cover" eyebrow="The three levels of cover">The Institute Cargo Clauses: A, B and C</H2>
          <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Marine cover worldwide is standardised through the Institute Cargo Clauses, published by the London insurance market. There are three levels, from widest to narrowest.</p>
          <div className="overflow-x-auto border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead><tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]"><th className="p-4 font-bold">Clause</th><th className="p-4 font-bold">Cover</th><th className="p-4 font-bold">Typical use</th></tr></thead>
              <tbody className="text-[15px] text-gray-800">
                <tr><td className="p-4 font-black text-[#0818A8]">ICC (A)</td><td className="p-4">All risks: accidental loss or damage from any external cause, except the standard exclusions.</td><td className="p-4">Most cargo. The recommended, widest cover.</td></tr>
                <tr className="bg-gray-50"><td className="p-4 font-black text-[#0818A8]">ICC (B)</td><td className="p-4">Named perils including fire, sinking, collision, water damage, jettison and General Average.</td><td className="p-4">Lower-value or robust goods.</td></tr>
                <tr><td className="p-4 font-black text-[#0818A8]">ICC (C)</td><td className="p-4">Major casualties only: fire, vessel sinking or stranding, collision, jettison and General Average. No theft or water damage.</td><td className="p-4">Bulk, low-risk cargo. The most basic cover.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-[14.5px] leading-relaxed mt-5 max-w-3xl">For most personal and commercial shipments to Nigeria, an <strong className="text-gray-900">all risks (ICC A)</strong> policy gives the broadest protection and the fewest surprises at claim time.</p>
        </div>
      </section>

      {/* GENERAL AVERAGE */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="general-average" eyebrow="The risk nobody expects">General Average: When Everyone Pays</H2>
        <div className="grid gap-5 md:grid-cols-2 mt-2">
          <div className="border border-[#0818A8]/15 bg-[#0818A8]/[0.03] p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8] text-white mb-4"><Anchor size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">What it is</h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">Under the York-Antwerp Rules, if the crew sacrifices cargo or spends extraordinary sums to save the whole voyage, for example jettisoning containers or paying salvage after a fire, <strong>every cargo owner contributes proportionally</strong>, even if their own goods were untouched.</p>
          </div>
          <div className="border border-gray-200 p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Scale size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">Why insurance matters</h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">Without insurance, you must pay your General Average share and post a bond or deposit before your cargo is released, which can run into hundreds or thousands of pounds. A marine policy responds to General Average on your behalf, so your goods are freed without a surprise bill.</p>
          </div>
        </div>
      </section>

      {/* VALUING COVER */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="value" eyebrow="Insure the right amount">How Much Cover to Buy, and What It Costs</H2>
          <div className="grid gap-5 md:grid-cols-2 mt-2">
            <div className="bg-white border border-gray-200 p-7">
              <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><PoundSterling size={20} aria-hidden="true" /></span>
              <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">The CIF + 10% rule</h3>
              <p className="text-gray-700 text-[15px] leading-relaxed">Insure the <strong>Cost of the goods + Insurance + Freight, plus a 10 percent margin</strong> for incidental costs and expected profit. Example: £2,000 of goods with £300 freight is insured for about £2,530, so a total loss leaves you no worse off.</p>
            </div>
            <div className="bg-white border border-gray-200 p-7">
              <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><ShieldCheck size={20} aria-hidden="true" /></span>
              <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">What the premium costs</h3>
              <p className="text-gray-700 text-[15px] leading-relaxed">Premiums are a <strong>small percentage of the insured value</strong>, commonly around 0.3 percent to 1 percent depending on goods, route and packing. On £2,500 of cover that is often just £10 to £25, a fraction of what you would lose uninsured.</p>
            </div>
          </div>
          <div className="mt-6 max-w-3xl border-l-[4px] border-[#0818A8] bg-white p-5"><p className="text-gray-800 text-[14.5px] leading-relaxed"><strong className="text-gray-900">Cover runs warehouse to warehouse.</strong> A transit policy protects your goods from the moment they leave, through the sea or air leg and customs, until they reach the destination, subject to the policy's time limits after discharge.</p></div>
        </div>
      </section>

      {/* EXCLUSIONS */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="exclusions" eyebrow="Read the small print">What Cargo Insurance Does Not Cover</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Even an all risks policy has standard exclusions. Knowing them helps you avoid a rejected claim, and most are within your control.</p>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-2">
          {EXCLUSIONS.map(([t,d])=>(<li key={t} className="border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-amber-50 text-amber-600 mb-4"><ShieldAlert size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
        </ul>
      </section>

      {/* HOW TO CLAIM */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="claim" eyebrow="If the worst happens">How to Make a Cargo Insurance Claim</H2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
            {CLAIM_STEPS.map(([t,d],i)=>(<li key={t} className="relative bg-white border border-gray-200 p-6"><div className="font-black text-[#0818A8]/15 text-[46px] leading-none absolute top-3 right-4 select-none" aria-hidden="true">{i+1}</div><h3 className="font-bold text-gray-900 text-[15px] mb-2 relative">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed relative">{d}</p></li>))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3 max-w-3xl">
            {["Commercial invoice","Packing list","Bill of lading","Photos of damage","Completed claim form"].map((d)=>(<span key={d} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-[13.5px] font-semibold px-3.5 py-2"><ClipboardList size={14} className="text-[#0818A8]" aria-hidden="true" />{d}</span>))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="faq" eyebrow="Everything you need to know">Cargo Insurance FAQs</H2>
        <div className="space-y-3 mt-2">
          {FAQS.map((f)=>(<details key={f.q} className="group bg-white border border-gray-200 open:border-[#0818A8]/40 transition-colors"><summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none"><h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#0818A8] transition-colors">{f.q}</h3><span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-colors" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" /></svg></span></summary><p className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">{f.a}</p></details>))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Ship with peace of mind</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Insure your cargo to Nigeria with R-Zone</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">R-Zone can arrange marine transit insurance on your UK to Nigeria shipment, warehouse to door. Declare the value of your goods and add cover to your quote for a small premium. Get a free quote today.</p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/sea-freight-uk-to-nigeria" className="hover:text-white transition-colors">Sea Freight Guide</Link>
            <Link href="/blog/bulk-shipping-uk-to-nigeria" className="hover:text-white transition-colors">Bulk Shipping</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Shipping Guides</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
