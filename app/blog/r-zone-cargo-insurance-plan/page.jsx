// app/blog/r-zone-cargo-insurance-plan/page.jsx
// Landing-structure blog post (light editorial hero). Server component, static
// HTML, self-canonical, UK English, no em/en dashes.

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  ShieldCheck, ShieldAlert, PoundSterling, FileText, ClipboardList, Star,
  Award, Globe, Ship, Plane, Check, ArrowRight, PhoneCall, MessageCircle,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/r-zone-cargo-insurance-plan`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop";

const TITLE = "R-Zone Cargo Insurance Plan 2026: Protect Your Shipment to Nigeria | R-Zone Enterprises";
const DESCRIPTION = "R-Zone's cargo insurance plan protects your UK to Nigeria shipment warehouse to door. How cover works, what it protects, how to value your goods and how to add it to your booking. Free quote.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: ["R-Zone cargo insurance","cargo insurance plan Nigeria","insure cargo to Nigeria","shipping insurance UK to Nigeria","protect cargo to Nigeria","transit cover Nigeria"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Cargo protected under the R-Zone insurance plan for shipping to Nigeria" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  { q: "What does the R-Zone cargo insurance plan cover?", a: "R-Zone arranges marine transit cover that protects your shipment against accidental loss or damage in transit, warehouse to warehouse, on both air and sea freight. You declare the value of your goods and cover is arranged for that amount, so a loss is reimbursed at the insured value rather than the very low carrier liability cap." },
  { q: "How do I add insurance to my R-Zone booking?", a: "Just say so when you request your quote and declare the value of your goods. We add cover to your booking and confirm the exact premium on your quote before you pay, so there are no surprises." },
  { q: "How much does the insurance cost?", a: "The premium is a small percentage of the value you declare, and it is confirmed on your quote before you commit. Because it is calculated on your declared value, a modest shipment costs very little to cover compared with the loss you would carry uninsured." },
  { q: "How much should I declare my goods for?", a: "The market standard is CIF plus 10 percent: the cost of the goods, plus insurance and freight, plus a 10 percent margin for incidental costs. For example £2,000 of goods with £300 freight would be declared at about £2,530, so a total loss leaves you no worse off." },
  { q: "Is insurance included in my shipping price automatically?", a: "No. Shipping and insurance are separate. Your freight quote covers documentation, transit, Nigeria customs clearance and delivery. Insurance is an optional add-on that you request and declare a value for, which is why we always ask whether you want cover." },
  { q: "What is not covered?", a: "Standard marine exclusions apply: inadequate or unsuitable packing, inherent vice (the nature of the goods themselves), ordinary wear and leakage, loss caused purely by delay, and war or strikes unless those clauses are added. Prohibited or illegal goods are never covered." },
  { q: "What do I do if something is damaged?", a: "Note any visible damage on the delivery receipt before signing, keep all the packaging, photograph everything, and tell us as soon as possible. We help you gather the invoice, packing list and shipping documents and file the claim with the insurer." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: freshYear(TITLE), description: freshYear(DESCRIPTION), image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-09-12", dateModified: "2026-09-12", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "Service", "@id": `${PAGE_URL}#service`, serviceType: "Cargo transit insurance for UK to Nigeria shipments", name: "R-Zone Cargo Insurance Plan", description: freshYear(DESCRIPTION), provider: ORGANIZATION_SCHEMA, areaServed: [ { "@type": "Country", name: "United Kingdom" }, { "@type": "Country", name: "Nigeria" } ], availableChannel: { "@type": "ServiceChannel", serviceUrl: `${SITE_URL}/quote`, servicePhone: "+44-800-772-0864" } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "R-Zone Cargo Insurance Plan", item: PAGE_URL } ] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: freshYear(f.q), acceptedAnswer: { "@type": "Answer", text: freshYear(f.a) } })) },
  { "@context": "https://schema.org", ...ORGANIZATION_SCHEMA },
];

function CTAButtons({ light = false }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/quote" className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0a1fce] text-white text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3.5 transition-colors">Get a Quote with Cover<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" /></Link>
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

const COVERS = [
  [ShieldCheck, "Accidental loss or damage", "Physical loss or damage in transit from external causes, on both air and sea freight."],
  [Globe, "Warehouse to warehouse", "Cover runs from the moment your cargo leaves, through transit and customs, to arrival at destination."],
  [Ship, "General Average contributions", "If the vessel declares General Average, the policy responds so your cargo is not held for a bond."],
  [Plane, "Air and sea shipments", "The same plan protects express air freight and economical sea freight bookings alike."],
];

const NOT_COVERED = [
  "Inadequate or unsuitable packing",
  "Inherent vice (the nature of the goods)",
  "Ordinary wear, leakage or loss in weight",
  "Financial loss caused purely by delay",
  "War and strikes unless clauses are added",
  "Prohibited or illegal goods",
];

const STEPS = [
  ["Request your quote", "Tell us what you are sending and ask for insurance at the same time."],
  ["Declare your value", "Give us the value of the goods, ideally CIF plus 10 percent, so cover matches the real exposure."],
  ["We confirm the premium", "The exact premium appears on your quote before you pay. No surprises, no small print."],
  ["Ship with cover in place", "Your shipment travels protected warehouse to warehouse, on air or sea."],
];

const WHY = [
  [Star, "120+ five star reviews", "One of the highest rated UK to Nigeria cargo companies on Google."],
  [Award, "12+ years of experience", "Shipping the UK to Nigeria corridor since 2012, with 50,000+ shipments delivered."],
  [ShieldCheck, "Own teams in UK and Lagos", "We handle collection, customs and delivery ourselves, and help you file any claim."],
  [PoundSterling, "Transparent pricing", "All-inclusive freight quotes, with the insurance premium shown separately and clearly."],
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">The R-Zone Cargo Insurance Plan: Protect Your Shipment to Nigeria in {CURRENT_YEAR}</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">Peace of mind for a small percentage of your cargo&apos;s value. Here is how R-Zone&apos;s insurance plan works, what it protects, how to value your goods, and how to add cover when you book.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Cargo protected under the R-Zone insurance plan for shipping to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Written by</p><p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p></div>
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Published on</p><p className="text-white text-[14px] font-bold">12 September 2026</p></div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8"><ShareRow url={PAGE_URL} title={freshYear(TITLE)} /></div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="why" eyebrow="The gap you did not know about">Why Your Shipping Price Is Not Insurance</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">Your freight price covers moving the cargo: documentation, transit, Nigeria customs clearance and delivery. What it does not do is guarantee the value of your goods. International conventions cap a carrier&apos;s liability at a fixed amount per kilogram, and only where the carrier is at fault, which is usually a small fraction of what your cargo is really worth.</p>
        <div className="max-w-3xl border-l-[4px] border-[#0818A8] bg-[#0818A8]/[0.04] p-5">
          <p className="text-gray-800 text-[14.5px] leading-relaxed"><strong className="text-gray-900">In plain terms:</strong> a 20kg box of electronics worth £1,500 might attract carrier compensation of only around £40 if it were lost at sea. The R-Zone insurance plan is what covers the rest.</p>
        </div>
      </section>

      {/* WHAT IT COVERS */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="covers" eyebrow="What you get">What the Plan Protects</H2>
          <ul className="grid gap-5 sm:grid-cols-2 mt-2">
            {COVERS.map(([Icon,t,d])=>(<li key={t} className="bg-white border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
          </ul>
        </div>
      </section>

      {/* VALUE + EXCLUSIONS */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="value" eyebrow="Declare the right amount">How to Value Your Cargo, and What Is Excluded</H2>
        <div className="grid gap-5 md:grid-cols-2 mt-2">
          <div className="border border-[#0818A8]/15 bg-[#0818A8]/[0.03] p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8] text-white mb-4"><PoundSterling size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">The CIF + 10% rule</h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">Declare the <strong>cost of the goods, plus insurance and freight, plus 10 percent</strong>. Example: £2,000 of goods with £300 freight is declared at about £2,530, so a total loss leaves you no worse off. Under-declaring to save a little premium is the most common and most expensive mistake.</p>
          </div>
          <div className="border border-gray-200 p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-amber-50 text-amber-600 mb-4"><ShieldAlert size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">What is not covered</h3>
            <ul className="space-y-2">
              {NOT_COVERED.map((n)=>(<li key={n} className="flex items-start gap-2.5 text-gray-700 text-[14.5px] leading-snug"><span className="text-amber-600 font-black flex-shrink-0" aria-hidden="true">&middot;</span>{n}</li>))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW TO ADD */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="how" eyebrow="Takes one sentence">How to Add Cover to Your Booking</H2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
            {STEPS.map(([t,d],i)=>(<li key={t} className="relative bg-white border border-gray-200 p-6"><div className="font-black text-[#0818A8]/15 text-[46px] leading-none absolute top-3 right-4 select-none" aria-hidden="true">{i+1}</div><h3 className="font-bold text-gray-900 text-[15px] mb-2 relative">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed relative">{d}</p></li>))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Commercial invoice","Packing list","Photos of damage","Delivery receipt note"].map((d)=>(<span key={d} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-[13.5px] font-semibold px-3.5 py-2"><ClipboardList size={14} className="text-[#0818A8]" aria-hidden="true" />{d}</span>))}
          </div>
        </div>
      </section>

      {/* WHY R-ZONE */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="why-r-zone" eyebrow="Backed by a real track record">Why Insure Through R-Zone</H2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-2">
          {WHY.map(([Icon,t,d])=>(<li key={t} className="border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="faq" eyebrow="Everything you need to know">Cargo Insurance Plan FAQs</H2>
          <div className="mt-2 divide-y divide-gray-200 border-y border-gray-200">
            {FAQS.map((f)=>(<div key={f.q} className="py-7">
                  <h3 className="font-bold text-[17px] text-gray-900 mb-2.5 leading-snug">{freshYear(f.q)}</h3>
                  <p className="text-gray-700 text-[15.5px] leading-[1.8]">{freshYear(f.a)}</p>
                </div>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Ship protected</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Add cargo insurance to your next shipment</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">Declare your value and we will arrange transit cover warehouse to door, with the premium confirmed on your quote. Air from £5/kg, sea from £3/kg, door to door from £6/kg.</p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/marine-cargo-insurance-uk-to-nigeria" className="hover:text-white transition-colors">How Marine Insurance Works</Link>
            <Link href="/blog/most-trusted-uk-to-nigeria-cargo-company" className="hover:text-white transition-colors">Why R-Zone Is Trusted</Link>
            <Link href="/blog/uk-to-nigeria-cargo-faq" className="hover:text-white transition-colors">Cargo FAQs</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
