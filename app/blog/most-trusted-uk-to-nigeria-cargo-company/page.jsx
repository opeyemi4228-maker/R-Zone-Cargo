// app/blog/most-trusted-uk-to-nigeria-cargo-company/page.jsx
// Landing-structure blog post (light editorial hero). Server component, static
// HTML, self-canonical, UK English, no em/en dashes.
// NOTE: review counts are stated in visible copy only. No AggregateRating
// schema is emitted, because rating markup without on-page reviews risks a
// Google structured-data manual action.

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Star, Award, ShieldCheck, PoundSterling, Globe, Zap, Users, Clock,
  Check, ArrowRight, PhoneCall, MessageCircle, MapPin,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/most-trusted-uk-to-nigeria-cargo-company`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80&auto=format&fit=crop";

const TITLE = "The Most Trusted UK to Nigeria Cargo Company 2026: 120+ Reviews, 12+ Years | R-Zone Enterprises";
const DESCRIPTION = "Why R-Zone is the most trusted name in UK to Nigeria cargo: 120+ five star Google reviews, 12+ years of experience, 50,000+ shipments delivered, and our own teams in the UK and Lagos.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: ["most trusted cargo company UK to Nigeria","best cargo company to Nigeria","reliable cargo company Nigeria","trusted UK Nigeria shipping","top rated cargo company Nigeria","R-Zone reviews"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "R-Zone team handling UK to Nigeria cargo with over 12 years of experience" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  { q: "Why is R-Zone the most trusted UK to Nigeria cargo company?", a: "R-Zone has shipped the UK to Nigeria corridor since 2012, with 50,000+ shipments delivered and 120+ five star Google reviews. We run our own teams in both the UK and Lagos, clear Nigeria customs ourselves, and quote all-inclusive prices with no hidden fees, which is what customers consistently say they value most." },
  { q: "How many Google reviews does R-Zone have?", a: "R-Zone has over 120 five star reviews on Google from UK to Nigeria cargo customers, built steadily over 12+ years of trading rather than in a short burst. You can read them on our Google Business Profile." },
  { q: "How long has R-Zone been shipping to Nigeria?", a: "Since 2012, which is over 12 years in the UK to Nigeria corridor specifically. That length of time in one lane matters, because it is how a company builds real customs expertise, reliable sailing and flight relationships, and a team on the ground in Lagos." },
  { q: "How do I know a cargo company to Nigeria is legitimate?", a: "Check for a real UK address and landline, a verifiable Google Business Profile with a long review history, all-inclusive written quotes, a clear customs process, and a named contact you can reach. Be wary of companies that only take cash, have no traceable reviews, or cannot explain how clearance works." },
  { q: "Does R-Zone handle customs clearance itself?", a: "Yes. Our own team in Lagos clears cargo through Nigeria Customs Service, plus NAFDAC and SON where they apply. Using our own team rather than a third party is a large part of why our cargo is not left sitting at Apapa or Tin Can Island." },
  { q: "What does all-inclusive pricing actually mean?", a: "It means the price we quote includes UK export documentation, transit, Nigeria customs clearance and delivery, with no fuel surcharges, handling add-ons or surprise charges on arrival. Import duty is a separate government charge, and we tell you about it upfront rather than after the fact." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: freshYear(TITLE), description: freshYear(DESCRIPTION), image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-09-12", dateModified: "2026-09-12", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "The Most Trusted UK to Nigeria Cargo Company", item: PAGE_URL } ] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: freshYear(f.q), acceptedAnswer: { "@type": "Answer", text: freshYear(f.a) } })) },
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

const STATS = [
  ["120+", "Five star Google reviews"],
  ["12+", "Years in the UK to Nigeria lane"],
  ["50,000+", "Shipments delivered"],
  ["2", "Own teams, UK and Lagos"],
];

const PILLARS = [
  [Users, "Our own teams at both ends", "We do not hand your cargo to a stranger. R-Zone staff handle UK collection and Lagos customs clearance, so one company is accountable from your door to theirs."],
  [ShieldCheck, "Customs expertise, not guesswork", "Over a decade clearing Nigeria Customs, NAFDAC and SON means we know what each category needs before your cargo sails, not after it is held."],
  [PoundSterling, "All-inclusive, written pricing", "Documentation, transit, clearance and delivery in one number. No fuel surcharges, no arrival surprises. The price we quote is the price you pay."],
  [Zap, "Weekly air and sea departures", "Your cargo joins the next available service rather than waiting for a full load, which is how we keep transit times honest."],
  [Globe, "Every state in Nigeria", "Lagos, Abuja, Port Harcourt, Ibadan, Kano and beyond, with delivery to the main cities included in the quote."],
  [Star, "A review record built over years", "120+ five star reviews accumulated shipment by shipment since 2012, not bought in a burst."],
];

const CHECKLIST = [
  "A real UK address and landline you can call",
  "A Google Business Profile with a long review history",
  "All-inclusive quotes given in writing",
  "A clear explanation of how customs clearance works",
  "A named contact who answers after you have paid",
  "Honesty about import duty being a separate charge",
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">The Most Trusted UK to Nigeria Cargo Company: 120+ Reviews and 12+ Years of Experience</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">Trust is earned shipment by shipment. Here is the record behind R-Zone: <strong className="font-semibold text-gray-700">120+ five star Google reviews</strong>, 12+ years in the UK to Nigeria corridor, 50,000+ shipments delivered, and our own teams at both ends.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="R-Zone team handling UK to Nigeria cargo with over 12 years of experience" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Written by</p><p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p></div>
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Published on</p><p className="text-white text-[14px] font-bold">12 September 2026</p></div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8"><ShareRow url={PAGE_URL} title={freshYear(TITLE)} /></div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="record" eyebrow="The numbers behind the name">Our Record in One Glance</H2>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
          {STATS.map(([v,l])=>(<div key={l} className="border border-gray-200 p-6"><dt className="font-black text-[34px] md:text-[42px] text-[#0818A8] leading-none mb-2">{v}</dt><dd className="text-gray-600 text-[14px] font-medium leading-snug">{l}</dd></div>))}
        </dl>
        <p className="text-gray-600 text-[14.5px] leading-relaxed mt-6 max-w-3xl">Those reviews were not bought in a burst. They accumulated one delivered shipment at a time since 2012, which is exactly what makes them worth reading. You can see them on our Google Business Profile.</p>
      </section>

      {/* PILLARS */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="pillars" eyebrow="What trust actually looks like">Six Reasons Customers Stay With Us</H2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-2">
            {PILLARS.map(([Icon,t,d])=>(<li key={t} className="bg-white border border-gray-200 p-6"><span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span><h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3><p className="text-gray-600 text-[14px] leading-relaxed">{d}</p></li>))}
          </ul>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="experience" eyebrow="Why a decade in one lane matters">Specialists, Not Generalists</H2>
        <div className="grid gap-5 md:grid-cols-2 mt-2">
          <div className="border border-[#0818A8]/15 bg-[#0818A8]/[0.03] p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8] text-white mb-4"><Clock size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">One corridor since 2012</h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">R-Zone does not ship everywhere. We ship the <strong>UK to Nigeria corridor</strong>, and have done since 2012. That focus is why we know which goods need NAFDAC, how Apapa behaves in peak season, and what actually gets cargo cleared quickly.</p>
          </div>
          <div className="border border-gray-200 p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><MapPin size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">Feet on the ground in Lagos</h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">Plenty of companies sell UK to Nigeria freight. Far fewer have <strong>their own team in Lagos</strong> clearing it. When something needs chasing at the port, we are chasing it ourselves rather than emailing an agent and hoping.</p>
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="checklist" eyebrow="Shop around with confidence">How to Judge Any Cargo Company</H2>
          <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-7 max-w-3xl">We would rather you chose carefully than chose blindly. Whoever you ship with, hold them to this list. We are happy to be measured by it.</p>
          <ul className="grid gap-3 sm:grid-cols-2 max-w-4xl">
            {CHECKLIST.map((c)=>(<li key={c} className="flex items-start gap-2.5 text-gray-700 text-[15px] leading-snug bg-white border border-gray-200 p-4"><Check size={17} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />{c}</li>))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="faq" eyebrow="Everything you need to know">Trust and Experience FAQs</H2>
        <div className="mt-2 divide-y divide-gray-200 border-y border-gray-200">
          {FAQS.map((f)=>(<div key={f.q} className="py-7">
                  <h3 className="font-bold text-[17px] text-gray-900 mb-2.5 leading-snug">{freshYear(f.q)}</h3>
                  <p className="text-gray-700 text-[15.5px] leading-[1.8]">{freshYear(f.a)}</p>
                </div>))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Join 120+ happy customers</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Ship with the team that has done this since 2012</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">Sea from £3/kg, air from £5/kg, door to door from £6/kg. All-inclusive pricing, weekly departures, our own clearing team in Lagos, and 120+ five star reviews behind us.</p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/r-zone-cargo-reviews-uk-nigeria-shipping" className="hover:text-white transition-colors">Customer Reviews</Link>
            <Link href="/blog/uk-to-nigeria-cargo-faq" className="hover:text-white transition-colors">Cargo FAQs</Link>
            <Link href="/blog/r-zone-cargo-insurance-plan" className="hover:text-white transition-colors">Insurance Plan</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
