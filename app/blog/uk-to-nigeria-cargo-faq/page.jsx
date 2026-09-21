// app/blog/uk-to-nigeria-cargo-faq/page.jsx
// Landing-structure FAQ hub (light editorial hero). Server component, static
// HTML, self-canonical, UK English, no em/en dashes. Every question is emitted
// in a single FAQPage schema for rich-result eligibility.

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  PoundSterling, Clock, Truck, FileText, Package, ShieldCheck, Car, Search,
  ArrowRight, PhoneCall, MessageCircle, Star,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import { freshYear, CURRENT_YEAR } from "../../../lib/year";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], display: "swap" });

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/uk-to-nigeria-cargo-faq`;
const WHATSAPP = "447915647119";
const HERO_IMG = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80&auto=format&fit=crop";

const TITLE = "UK to Nigeria Cargo FAQs 2026: 34 Questions Answered | R-Zone Enterprises";
const DESCRIPTION = "Every question about sending cargo from the UK to Nigeria answered: prices, transit times, door to door, customs and duty, packing, prohibited items, insurance, cars and tracking. Free quote.";

export const metadata = {
  title: { absolute: freshYear(TITLE) },
  description: freshYear(DESCRIPTION),
  keywords: ["UK to Nigeria cargo FAQ","shipping to Nigeria questions","cargo to Nigeria help","how to send cargo to Nigeria","Nigeria customs questions","cargo to Nigeria answers"],
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", url: PAGE_URL, title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), siteName: "R-Zone Enterprises", locale: "en_GB", images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Warehouse of packed cargo boxes ready for shipping from the UK to Nigeria" }] },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: freshYear(TITLE) }, description: freshYear(DESCRIPTION), images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const GROUPS = [
  { id: "pricing", icon: PoundSterling, eyebrow: "Money", title: "Prices and Payment", items: [
    { q: "How much does it cost to send cargo from the UK to Nigeria?", a: "Sea freight starts from £3/kg, air freight from £5/kg and door to door from £6/kg, all inclusive of documentation, transit, Nigeria customs clearance and delivery. A 20kg box is roughly £60 to £90 by sea or £100 to £160 by air." },
    { q: "What is the cheapest way to send cargo to Nigeria?", a: "Sea freight from £3/kg, especially for large or heavy loads. The saving over air grows with weight: a 100kg shipment is about £300 to £450 by sea versus £500 to £700 by air. The trade off is time, 4 to 6 weeks by sea versus 5 to 10 working days by air." },
    { q: "Are there any hidden fees?", a: "No. R-Zone quotes are all inclusive of UK documentation, transit, Nigeria customs clearance and delivery, with no fuel surcharges or arrival surprises. Import duty is a separate government charge and we tell you about it upfront." },
    { q: "How is my cargo priced, by weight or size?", a: "You pay for actual weight or volumetric weight, whichever is greater. Air uses length x width x height in cm divided by 6,000; sea uses a divisor of 1,000. This is why packing densely saves real money, particularly on sea freight." },
    { q: "Do I pay before or after shipping?", a: "Payment is arranged when you book, and your quote is confirmed in writing first. Ask us about the current payment options when you request your quote." },
  ]},
  { id: "times", icon: Clock, eyebrow: "Speed", title: "Transit Times", items: [
    { q: "How long does cargo take to reach Nigeria?", a: "Air freight takes 5 to 10 working days and sea freight takes 4 to 6 weeks, each including UK handling, transit to Lagos, Nigeria customs clearance and final delivery." },
    { q: "What is the fastest way to ship to Nigeria?", a: "Express air freight, arriving in 5 to 10 working days from £5/kg. It suits urgent, high-value or time-sensitive cargo such as electronics, documents and medicine." },
    { q: "How often do you ship?", a: "R-Zone runs weekly air and sea departures, so your cargo joins the next available service rather than waiting for a full load." },
    { q: "What can delay my shipment?", a: "The flight or sailing schedule, port and customs conditions in Lagos, seasonal peaks such as Christmas, and incomplete paperwork. An accurate contents list is the simplest way to avoid customs hold-ups." },
    { q: "When should I ship for Christmas?", a: "Send sea freight by early November and air freight by mid-December. Demand and timelines both tighten as December approaches, so booking early is the safest way to arrive on time." },
  ]},
  { id: "door", icon: Truck, eyebrow: "Convenience", title: "Door to Door", items: [
    { q: "What does door to door mean?", a: "We collect from your UK address and deliver to the recipient's door in Nigeria, handling export paperwork, transit and customs clearance in between. No depot visits at either end." },
    { q: "Do you collect from my house in the UK?", a: "Yes, from any UK address, home or business, nationwide, on a day that suits you." },
    { q: "Which parts of Nigeria do you deliver to?", a: "Lagos, Abuja, Port Harcourt, Ibadan, Benin City, Kano and every state. Delivery to the main cities is included in the quote; remote destinations may carry a small onward-delivery charge confirmed upfront." },
    { q: "Is door to door worth the extra cost?", a: "For most senders, yes. The premium over drop-off is typically only about £20 to £30 on a 20kg box, and it removes both the UK depot run and the recipient having to travel and collect in Nigeria." },
  ]},
  { id: "customs", icon: FileText, eyebrow: "Compliance", title: "Customs and Duty", items: [
    { q: "Do you handle Nigerian customs clearance?", a: "Yes. Every price includes clearance through Nigeria Customs Service, plus NAFDAC and SON where applicable, handled by our own team in Lagos." },
    { q: "Will I have to pay import duty?", a: "Import duty is a separate government charge based on the CIF value. Most personal-use household goods attract little or none. Commercial goods are dutiable under the ECOWAS Common External Tariff, plus 7.5 percent VAT." },
    { q: "What is NAFDAC and does it affect me?", a: "NAFDAC regulates food, drugs, cosmetics and similar products in Nigeria. If you are sending packaged food, supplements or cosmetics, tell us and we will confirm what clearance is needed before you ship." },
    { q: "What paperwork do I need?", a: "A clear contents list for each box is essential. Commercial shipments also need a commercial invoice and packing list, and formal imports use a Form M and PAAR, which we guide you through." },
  ]},
  { id: "packing", icon: Package, eyebrow: "Preparation", title: "Packing and Prohibited Items", items: [
    { q: "How should I pack my cargo?", a: "Use strong double-walled boxes, fill empty space so nothing shifts, pack densely, vacuum-pack clothing to save volume, wrap fragile items individually, and label each box with a contents list." },
    { q: "What can I send to Nigeria?", a: "Clothing and shoes, electronics and phones, household goods and appliances, packaged and non-perishable food, cosmetics, baby items, car parts, books and documents, and commercial merchandise." },
    { q: "What cannot be shipped?", a: "Weapons, drugs, counterfeit goods and certain restricted foodstuffs cannot be shipped. Batteries, aerosols and liquids have specific air rules. If you are unsure about an item, ask us before you pack it." },
    { q: "Can you pack for me?", a: "Ask about assisted packing at collection. Good packing protects your goods and lowers your bill, because you are not paying to ship empty space." },
  ]},
  { id: "insurance", icon: ShieldCheck, eyebrow: "Protection", title: "Insurance", items: [
    { q: "Is my cargo insured automatically?", a: "No. Freight and insurance are separate. A carrier's liability is capped very low by international convention, so we always ask whether you want transit cover added to your booking." },
    { q: "How much should I insure my goods for?", a: "The market standard is CIF plus 10 percent: the cost of the goods, plus insurance and freight, plus a 10 percent margin. Under-declaring to save premium is the most expensive mistake you can make." },
    { q: "What does cargo insurance cost?", a: "The premium is a small percentage of the value you declare, confirmed on your quote before you pay." },
    { q: "What if my goods arrive damaged?", a: "Note the damage on the delivery receipt before signing, keep the packaging, photograph everything and tell us straight away. We help you gather the documents and file the claim." },
  ]},
  { id: "cars", icon: Car, eyebrow: "Vehicles", title: "Car Shipping", items: [
    { q: "Can I ship a car to Nigeria?", a: "Yes, by RORO from around £960 for a saloon, £1,280 for a 4x4 or SUV, or from £1,800 in a shared container. Transit is 4 to 6 weeks by RORO and 5 to 7 weeks by container." },
    { q: "Is there an age limit for importing cars?", a: `Yes. Nigeria does not allow the import of cars older than 15 years from their year of manufacture, so in ${CURRENT_YEAR} that generally means cars made in ${CURRENT_YEAR - 15} or earlier cannot be imported.` },
    { q: "Do I need an MOT to ship my car?", a: "Yes. All vehicles shipped to Nigeria must now have a valid roadworthiness certificate, which for a UK car means a current MOT, at the point of shipment. We cannot load a car without one." },
    { q: "How much is duty on a car?", a: "Nigeria customs duty on a used car is typically around 35 percent of the assessed value once duty and levy are combined, plus port and clearing charges, paid on arrival. We confirm the figure before your car sails." },
  ]},
  { id: "booking", icon: Search, eyebrow: "Getting started", title: "Booking and Tracking", items: [
    { q: "How do I get a quote?", a: "Tell us what you are sending, the approximate weight, and your UK and Nigeria locations. Call +44 (0) 800 772 0864, WhatsApp +44 7915 647 119, or use the online quote form. We respond the same day." },
    { q: "Can I track my shipment?", a: "Yes. Use the tracking page on our site, or call or WhatsApp us at any point for a status update. Because we run our own Lagos team, we can tell you exactly where your cargo is." },
    { q: "How do I know R-Zone is legitimate?", a: "R-Zone has shipped the UK to Nigeria corridor since 2012, with 50,000+ shipments delivered and 120+ five star Google reviews, a real UK address and landline, and our own clearing team in Lagos." },
    { q: "Do you ship commercial and bulk loads?", a: "Yes. We handle LCL part loads from £3/kg and full 20ft and 40ft containers on application, including commercial customs clearance, Form M and PAAR guidance." },
  ]},
];

const ALL = GROUPS.flatMap((g) => g.items);

const schemas = [
  { "@context": "https://schema.org", "@type": "Article", "@id": `${PAGE_URL}#article`, headline: freshYear(TITLE), description: freshYear(DESCRIPTION), image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 }, datePublished: "2026-09-12", dateModified: "2026-09-12", author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` }, publisher: ORGANIZATION_SCHEMA, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, inLanguage: "en-GB" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` }, { "@type": "ListItem", position: 3, name: "UK to Nigeria Cargo FAQs", item: PAGE_URL } ] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: ALL.map((f) => ({ "@type": "Question", name: freshYear(f.q), acceptedAnswer: { "@type": "Answer", text: freshYear(f.a) } })) },
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

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />))}

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">UK to Nigeria Cargo FAQs: {ALL.length} Questions Answered in {CURRENT_YEAR}</h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">Prices, transit times, door to door, customs and duty, packing, prohibited items, insurance, cars and tracking. Every common question about shipping cargo from the UK to Nigeria, answered by a team that has done it since 2012.</p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Warehouse of packed cargo boxes ready for shipping from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Written by</p><p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p></div>
              <div><p className="text-white/65 text-[11px] font-medium mb-1">Published on</p><p className="text-white text-[14px] font-bold">12 September 2026</p></div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8"><ShareRow url={PAGE_URL} title={freshYear(TITLE)} /></div>
          </div>
        </div>
      </section>

      {/* JUMP LINKS */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 pt-14 md:pt-16">
        <p className="text-[12px] font-black tracking-[0.3em] uppercase text-[#0818A8] mb-4">Jump to a topic</p>
        <ul className="flex flex-wrap gap-2.5">
          {GROUPS.map(({ id, icon: Icon, title }) => (
            <li key={id}><a href={`#${id}`} className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#0818A8] hover:text-[#0818A8] text-gray-700 text-[14px] font-semibold px-3.5 py-2 transition-colors"><Icon size={14} className="text-[#0818A8]" aria-hidden="true" />{title}</a></li>
          ))}
        </ul>
      </section>

      {/* FAQ GROUPS */}
      {GROUPS.map(({ id, icon: Icon, eyebrow, title, items }, gi) => (
        <section key={id} className={gi % 2 === 1 ? "bg-gray-50 border-y border-gray-100 mt-14 md:mt-16" : "mt-14 md:mt-16"}>
          <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-12 md:py-16">
            <div className="mb-7">
              <p className="text-[12px] font-black tracking-[0.3em] uppercase text-[#0818A8] mb-3">{eyebrow}</p>
              <h2 id={id} className="font-black text-[clamp(24px,3.8vw,34px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] uppercase flex items-center gap-3 scroll-mt-[150px]">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-[#0818A8]/8 text-[#0818A8] flex-shrink-0"><Icon size={19} aria-hidden="true" /></span>
                {title}
              </h2>
            </div>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {items.map((f) => (
                <div key={f.q} className="py-7">
                  <h3 className="font-bold text-[17px] text-gray-900 mb-2.5 leading-snug">{freshYear(f.q)}</h3>
                  <p className="text-gray-700 text-[15.5px] leading-[1.8]">{freshYear(f.a)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* TRUST STRIP */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[["120+","Five star Google reviews"],["12+","Years of experience"],["50,000+","Shipments delivered"],["Weekly","Air and sea departures"]].map(([v,l])=>(
            <div key={l} className="border border-gray-200 p-6"><dt className="font-black text-[30px] md:text-[38px] text-[#0818A8] leading-none mb-2">{v}</dt><dd className="text-gray-600 text-[14px] font-medium leading-snug">{l}</dd></div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Still have a question?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Ask us anything, we answer the same day</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">Sea from £3/kg, air from £5/kg, door to door from £6/kg. Call, WhatsApp or use the quote form and a real person from our team will answer, usually within hours.</p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/most-trusted-uk-to-nigeria-cargo-company" className="hover:text-white transition-colors">Why R-Zone Is Trusted</Link>
            <Link href="/blog/r-zone-cargo-insurance-plan" className="hover:text-white transition-colors">Insurance Plan</Link>
            <Link href="/blog/how-much-does-cargo-cost-from-uk-to-nigeria" className="hover:text-white transition-colors">Full Price Guide</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
