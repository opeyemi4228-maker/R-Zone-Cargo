// app/rzone/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// R-Zone International: the group page. Server component, static HTML.
// Metadata (own title + self-canonical, so it never competes with the
// homepage for brand searches) lives in ./layout.jsx.
//
// Kept short on purpose: who the group is, its three companies, a brief
// story, what it stands for, and four FAQs. Contact details live in the
// site footer, so they are not repeated here.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package, Home, Building2, Handshake, Users, Sprout } from "lucide-react";
import { montserrat } from "../../lib/fonts";

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/rzone`;
const HERO_IMG = "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1400&q=80&auto=format&fit=crop";

const COMPANIES = [
  {
    icon: Package, name: "R-Zone Cargo", status: "Trading since 2012", live: true, href: "/",
    text: "Air freight, sea freight and door to door cargo between the UK and Nigeria, with customs handled by our own teams at both ends.",
    facts: ["50,000+ shipments", "All 36 states", "120+ five-star reviews"],
  },
  {
    icon: Home, name: "R-Zone Homes", status: "Coming soon", live: false,
    text: "Property in Nigeria for the UK diaspora, from buying in Lagos and Abuja to looking after it for you.",
    facts: [],
  },
  {
    icon: Building2, name: "R-Zone Shortlets", status: "Coming soon", live: false,
    text: "Serviced short-stay apartments in Lagos and Abuja for visiting family, business travel and longer stays.",
    facts: [],
  },
];

const STORY = [
  ["2012", "R-Zone founded in Upminster, Essex, shipping cargo to Nigeria."],
  ["2014", "Weekly sea freight sailings to Lagos begin."],
  ["2016", "Our own operations hub opens in Lagos."],
  ["2018", "IATA registration brings weekly air freight in-house."],
  ["2023", "R-Zone International formed as the group behind R-Zone Cargo."],
  ["2024", "R-Zone Homes and R-Zone Shortlets announced."],
];

const VALUES = [
  { icon: Handshake, title: "Do what we say", text: "Clear prices, honest timelines and a real answer when you call." },
  { icon: Users, title: "Built by the diaspora", text: "We started by serving Nigerians in the UK, and every business we add serves the same community." },
  { icon: Sprout, title: "Build for the long term", text: "We grow one business at a time and only launch what we can run properly." },
];

const FAQS = [
  { q: "What is R-Zone International?", a: "R-Zone International is the group behind R-Zone Cargo, founded in Upminster, Essex in 2012. It runs R-Zone Cargo today, with R-Zone Homes and R-Zone Shortlets in development." },
  { q: "Who owns R-Zone Cargo?", a: "R-Zone Cargo is owned and operated by R-Zone International, headquartered in Upminster, Essex, UK." },
  { q: "Are R-Zone Homes and R-Zone Shortlets open yet?", a: "Not yet. Both are in development. R-Zone Cargo is the group's trading business and serves customers today." },
  { q: "How do I contact the group?", a: "Call +44 (0) 800 772 0864, email info@r-zoneenterprises.com, or use the contact page. Our UK office is at Unit 9 Moorhen Yard, Elms Lane, Bulphan, Upminster, Essex RM14 3TS." },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "R-Zone International", item: PAGE_URL },
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

export default function RZoneInternationalPage() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#00112E] text-white" aria-labelledby="rzi-hero-heading">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 pb-20 pt-32 sm:px-8 md:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:px-10">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-white/50">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-white/80" aria-current="page">R-Zone International</span>
            </nav>
            <Eyebrow dark>R-Zone International</Eyebrow>
            <h1 id="rzi-hero-heading" className="font-extrabold leading-[1.02] tracking-[-0.035em] text-white" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              The group behind <span className="whitespace-nowrap">R-Zone Cargo.</span>
            </h1>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-white/70">
              Founded in Upminster, Essex in 2012. We started by moving cargo between
              the UK and Nigeria, and we are building businesses for the same community.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/" className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-white px-7 text-[15px] font-bold text-[#00112E] transition-colors hover:bg-[#E8EEFF]">
                Ship with R-Zone Cargo
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="inline-flex min-h-[52px] items-center rounded-full border border-white/25 px-7 text-[15px] font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/[0.06]">
                Contact the group
              </Link>
            </div>
          </div>
          <div className="relative hidden aspect-[5/4] overflow-hidden rounded-[28px] lg:block">
            <Image src={HERO_IMG} alt="Container ship at sea, representing R-Zone Cargo's UK to Nigeria freight" fill priority sizes="(min-width: 1024px) 45vw, 0px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* ── Companies ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-24 xl:px-10" aria-labelledby="companies-heading">
        <Eyebrow>Our companies</Eyebrow>
        <H2 id="companies-heading">One trading business, two on the way.</H2>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {COMPANIES.map(({ icon: Icon, name, status, live, href, text, facts }) => (
            <li key={name} className={`flex flex-col rounded-[20px] p-7 ring-1 md:p-8 ${live ? "bg-[#00112E] text-white ring-[#00112E]" : "bg-[#F6FAFF] ring-[#E3EAF7]"}`}>
              <div className="flex items-start justify-between gap-4">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${live ? "bg-white text-[#000f89]" : "bg-[#000f89]/[0.08] text-[#000f89]"}`} aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${live ? "bg-white/[0.1] text-[#A6A6FF]" : "bg-white text-slate-600 ring-1 ring-[#E3EAF7]"}`}>
                  {status}
                </span>
              </div>
              <h3 className={`mt-7 text-[21px] font-extrabold tracking-[-0.02em] ${live ? "text-white" : "text-[#00112E]"}`}>{name}</h3>
              <p className={`mt-3 flex-1 text-[15px] leading-relaxed ${live ? "text-white/70" : "text-slate-600"}`}>{text}</p>
              {facts.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {facts.map((f) => (
                    <li key={f} className="rounded-full bg-white/[0.08] px-3 py-1 text-[12.5px] font-semibold text-white/85">{f}</li>
                  ))}
                </ul>
              )}
              {live && (
                <Link href={href} className="group mt-7 inline-flex items-center gap-2 text-[14px] font-bold text-white">
                  Visit R-Zone Cargo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Story ────────────────────────────────────────────────────────── */}
      <section className="bg-[#F6FAFF]" aria-labelledby="story-heading">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-24 xl:px-10">
          <Eyebrow>Our story</Eyebrow>
          <H2 id="story-heading">From one warehouse unit in Essex.</H2>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STORY.map(([year, text]) => (
              <li key={year} className="rounded-[20px] bg-white p-7 ring-1 ring-[#E3EAF7]">
                <p className="text-[26px] font-extrabold tracking-[-0.03em] text-[#000f89]">{year}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-24 xl:px-10" aria-labelledby="values-heading">
        <Eyebrow>What we stand for</Eyebrow>
        <H2 id="values-heading">Three things we will not compromise on.</H2>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-[20px] p-7 ring-1 ring-[#E3EAF7]">
              <Icon size={22} className="text-[#000f89]" aria-hidden="true" />
              <h3 className="mt-5 text-[18px] font-extrabold tracking-[-0.02em] text-[#00112E]">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#F6FAFF]" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[860px] px-5 py-20 sm:px-8 md:py-24">
          <Eyebrow>Questions</Eyebrow>
          <H2 id="faq-heading">About R-Zone International.</H2>
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
