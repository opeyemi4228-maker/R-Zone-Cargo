// app/business-solutions/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Business shipping, UK ↔ Nigeria. Server component: static HTML, no client JS.
// Metadata (title, description, canonical) lives in ./layout.jsx.
//
// Deliberately short: one hero, the six services once, four reasons, four
// steps, five FAQs. The footer already carries the closing call to action, so
// the page does not repeat one. Prices and claims match the rest of the site.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import {
  Plane, Ship, Truck, Package, FileCheck, Warehouse,
  ArrowRight, Users, CalendarClock, Receipt, ShieldCheck,
} from "lucide-react";
import { montserrat } from "../../lib/fonts";

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/business-solutions`;
const HERO_IMG = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80&auto=format&fit=crop";

const SERVICES = [
  { icon: Plane, name: "Air freight", fact: "From £5.50/kg · 5 to 10 working days", text: "Weekly flights from Heathrow, Gatwick and Manchester for urgent or high-value stock.", href: "/blog/air-freight-uk-to-nigeria" },
  { icon: Ship, name: "Sea freight", fact: "From £3/kg · 4 to 6 weeks", text: "Weekly sailings to Lagos. Share a container (LCL) or book your own (FCL).", href: "/blog/sea-freight-uk-to-nigeria" },
  { icon: Truck, name: "Door to door", fact: "From £6/kg · UK collection", text: "We collect anywhere in the UK and deliver to any address in all 36 states.", href: "/blog/door-to-door-shipping-uk-to-nigeria" },
  { icon: Package, name: "Import from Nigeria", fact: "Weekly air · monthly sea", text: "Our Lagos team collects your goods and delivers them to your UK door, customs cleared.", href: "/importation" },
  { icon: FileCheck, name: "Customs clearance", fact: "Included in every quote", text: "UK export paperwork and Nigeria Customs, plus NAFDAC and SON where they apply.", href: "/blog/nigeria-customs-duty-guide" },
  { icon: Warehouse, name: "Warehousing", fact: "Essex and Lagos", text: "Store stock with us and consolidate it into fewer, cheaper shipments.", href: "/services#warehousing" },
];

const REASONS = [
  { icon: ShieldCheck, title: "Both ends, one team", text: "Our own staff handle UK collection, Nigeria customs and final delivery. No hand-offs to third parties." },
  { icon: CalendarClock, title: "Weekly departures", text: "Air and sea leave every week, so your stock never waits long for the next slot." },
  { icon: Receipt, title: "Itemised quotes", text: "You see every charge before you pay, including the £20 handling fee on air shipments." },
  { icon: Users, title: "A person, not a ticket", text: "Call, email or WhatsApp our UK team and get an answer the same day." },
];

const STEPS = [
  ["Tell us what you ship", "Goods, volumes, destination and timeline."],
  ["Get an itemised quote", "The cheapest route, the same business day."],
  ["We move it", "Collection, both customs and delivery, managed by us."],
  ["Track every milestone", "Updates by SMS and email until it is delivered."],
];

const FAQS = [
  { q: "Do you offer payment terms for businesses?", a: "Yes. Business accounts can agree 14 or 30 day payment terms in writing. Individual customers pay before cargo is shipped. We accept bank transfer, debit and credit card, and PayPal." },
  { q: "Can you collect from our premises anywhere in the UK?", a: "Yes. We collect from any address in England, Scotland, Wales and Northern Ireland, or you can drop off at our warehouse in Upminster, Essex." },
  { q: "Do you handle customs at both ends?", a: "Yes. Our team prepares the UK export paperwork and clears your cargo through Nigeria Customs with our own Lagos staff, including NAFDAC and SON where they apply. Clearance is included in your quote." },
  { q: "Can you ship full containers and pallets?", a: "Yes. Sea freight is available as a shared container (LCL) for part loads or a full 20ft or 40ft container (FCL) for large or regular consignments." },
  { q: "Which parts of Nigeria do you deliver to?", a: "All 36 states and the FCT, including Lagos, Abuja, Port Harcourt, Kano and Ibadan. Delivery to the main cities is included; remote areas carry a small onward charge confirmed upfront." },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Business Solutions", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

function Eyebrow({ children, dark = false }) {
  return (
    <p className={`mb-5 inline-flex rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${dark ? "bg-white/[0.08] text-[#A6A6FF]" : "bg-[#000f89]/[0.07] text-[#000f89]"}`}>
      {children}
    </p>
  );
}

function H2({ id, children }) {
  return (
    <h2 id={id} className="font-extrabold leading-[1.04] tracking-[-0.035em] text-[#00112E]" style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}>
      {children}
    </h2>
  );
}

export default function BusinessSolutionsPage() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#00112E] text-white" aria-labelledby="biz-hero-heading">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 pb-20 pt-32 sm:px-8 md:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:px-10">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-white/50">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-white/80" aria-current="page">Business Solutions</span>
            </nav>
            <Eyebrow dark>For businesses</Eyebrow>
            <h1 id="biz-hero-heading" className="font-extrabold leading-[1.02] tracking-[-0.035em] text-white" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Business cargo between the UK and Nigeria.
            </h1>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-white/70">
              One team for collection, customs at both ends and delivery to all 36 states.
              Weekly air and sea, itemised quotes and account terms.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/quote" className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-white px-7 text-[15px] font-bold text-[#00112E] transition-colors hover:bg-[#E8EEFF]">
                Get a business quote
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="inline-flex min-h-[52px] items-center rounded-full border border-white/25 px-7 text-[15px] font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/[0.06]">
                Talk to our team
              </Link>
            </div>
            <p className="mt-10 text-[14px] font-medium text-white/55">
              Since 2012 · 50,000+ shipments · 120+ five-star Google reviews
            </p>
          </div>
          <div className="relative hidden aspect-[5/4] overflow-hidden rounded-[28px] lg:block">
            <Image src={HERO_IMG} alt="Warehouse shelving with business cargo ready for shipping to Nigeria" fill priority sizes="(min-width: 1024px) 45vw, 0px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-24 xl:px-10" aria-labelledby="services-heading">
        <Eyebrow>What we handle</Eyebrow>
        <H2 id="services-heading">Everything your shipments need.</H2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, name, fact, text, href }) => (
            <li key={name}>
              <Link href={href} className="group flex h-full flex-col rounded-[20px] bg-[#F6FAFF] p-7 ring-1 ring-[#E3EAF7] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(0,15,137,0.35)] hover:ring-[#000f89]/25">
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#000f89] text-white" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3 className="text-[20px] font-extrabold tracking-[-0.02em] text-[#00112E]">{name}</h3>
                <p className="mt-1 text-[13.5px] font-semibold text-[#000f89]">{fact}</p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">{text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-[#000f89]">
                  Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Why ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#F6FAFF]" aria-labelledby="why-heading">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-24 xl:px-10">
          <Eyebrow>Why businesses choose us</Eyebrow>
          <H2 id="why-heading">Fewer moving parts.</H2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-[20px] bg-white p-7 ring-1 ring-[#E3EAF7]">
                <Icon size={22} className="text-[#000f89]" aria-hidden="true" />
                <h3 className="mt-5 text-[18px] font-extrabold tracking-[-0.02em] text-[#00112E]">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-24 xl:px-10" aria-labelledby="how-heading">
        <Eyebrow>How it works</Eyebrow>
        <H2 id="how-heading">Four steps, one point of contact.</H2>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="rounded-[20px] p-7 ring-1 ring-[#E3EAF7]">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#000f89] text-[14px] font-bold text-white" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-5 text-[18px] font-extrabold tracking-[-0.02em] text-[#00112E]">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#F6FAFF]" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[860px] px-5 py-20 sm:px-8 md:py-24">
          <Eyebrow>Questions</Eyebrow>
          <H2 id="faq-heading">Business shipping FAQs.</H2>
          <div className="mt-10 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-[16px] bg-white ring-1 ring-[#E3EAF7] open:ring-[#000f89]/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[15.5px] font-bold text-[#00112E]">
                  {f.q}
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-[#E3EAF7] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
