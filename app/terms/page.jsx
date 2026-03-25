"use client";

import { Montserrat } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FileText, ChevronRight, ArrowLeft, Phone, Mail,
  ArrowRight, ChevronDown, Check, AlertTriangle,
  Scale, Clock, Globe, Shield, CreditCard,
  Package, Truck, Info, Ban, Anchor,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const TOC = [
  { id: "t1",  label: "Definitions & Acceptance",   num: "01" },
  { id: "t2",  label: "Our Services",               num: "02" },
  { id: "t3",  label: "Booking & Confirmation",     num: "03" },
  { id: "t4",  label: "Cargo Restrictions",         num: "04" },
  { id: "t5",  label: "Packaging Requirements",     num: "05" },
  { id: "t6",  label: "Customs & Import Duties",    num: "06" },
  { id: "t7",  label: "Pricing & Payment",          num: "07" },
  { id: "t8",  label: "Storage & Demurrage",        num: "08" },
  { id: "t9",  label: "Liability & Claims",         num: "09" },
  { id: "t10", label: "Insurance",                  num: "10" },
  { id: "t11", label: "Transit Times",              num: "11" },
  { id: "t12", label: "Loss, Damage & Delay",       num: "12" },
  { id: "t13", label: "Cancellations & Refunds",    num: "13" },
  { id: "t14", label: "Customer Obligations",       num: "14" },
  { id: "t15", label: "Intellectual Property",      num: "15" },
  { id: "t16", label: "Termination",                num: "16" },
  { id: "t17", label: "Governing Law",              num: "17" },
  { id: "t18", label: "Contact",                    num: "18" },
];

const SERVICES_LIST = [
  { icon: "✈",  title: "Air Freight",         desc: "Weekly air cargo from LHR, LGW, MAN to Lagos (LOS) and Abuja (ABV). Transit typically 5–10 working days." },
  { icon: "🚢", title: "Sea Freight",          desc: "Weekly consolidated sea freight from UK ports to Apapa and Tin Can Island, Lagos. Transit 4–6 weeks." },
  { icon: "🚚", title: "Door-to-Door Cargo",  desc: "Collection from your UK address with delivery to any Nigerian address, via air or sea." },
  { icon: "📦", title: "Import from Nigeria",  desc: "Air and sea import services bringing goods from Nigeria to the United Kingdom." },
  { icon: "📋", title: "Customs Clearance",   desc: "End-to-end customs brokerage and clearance at UK and Nigerian ports. Included on all shipments." },
  { icon: "🏭", title: "Warehousing",          desc: "Short and long-term storage at our Upminster, Essex (UK) and Lagos, Nigeria facilities." },
];

const PROHIBITED = [
  "Illegal drugs, narcotics, or controlled substances",
  "Weapons, firearms, ammunition, or explosives",
  "Human remains or body parts",
  "Counterfeit or IP-infringing goods",
  "Currency, bearer bonds, or negotiable instruments",
  "Pornographic material",
  "Items prohibited by UK export law or Nigerian import law",
  "Radioactive or nuclear materials",
];

const RESTRICTED = [
  "Dangerous goods (IATA/IMDG class hazardous materials) — prior written approval required",
  "Perishable goods and foodstuffs — NAFDAC regulations apply upon arrival in Nigeria",
  "Electrical and electronic equipment — must be declared and properly packaged",
  "Vehicles and automotive parts — sea freight only, customs documentation required",
  "Pharmaceuticals and medical devices — subject to NAFDAC/MHRA clearance",
  "High-value items exceeding £5,000 declared value — cargo insurance mandatory",
];

const TRANSIT_TABLE = [
  { service: "Air Freight",              typical: "5–10 working days",  note: "LHR/LGW/MAN to LOS/ABV — excludes customs"     },
  { service: "Sea Freight",              typical: "4–6 weeks",           note: "UK ports to Apapa/Tin Can Island, Lagos"        },
  { service: "Door-to-Door (Air)",       typical: "7–14 working days",  note: "Includes UK collection and Nigeria delivery"    },
  { service: "Door-to-Door (Sea)",       typical: "5–8 weeks",           note: "Includes UK collection and Nigeria delivery"    },
  { service: "Importation (Air)",        typical: "5–8 working days",   note: "LOS/ABV to LHR — excludes customs"              },
  { service: "Importation (Sea)",        typical: "4–6 weeks",           note: "Apapa/Lagos to UK ports"                        },
];

const CANCELLATION_TABLE = [
  { timing: "More than 5 working days before sailing/dispatch", refund: "Full refund minus £25 administration fee" },
  { timing: "2–5 working days before sailing/dispatch",         refund: "50% refund"                               },
  { timing: "Less than 2 working days / cargo received",        refund: "No refund"                                },
  { timing: "After customs declaration filed",                  refund: "No refund — customs costs remain payable" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function P({ children }) {
  return <p className="text-gray-800 text-[14px] font-normal leading-relaxed mb-4">{children}</p>;
}
function H3({ children }) {
  return <h3 className="text-gray-900 font-bold text-[13px] tracking-[0.1em] uppercase mb-3 mt-6 first:mt-0">{children}</h3>;
}
function UL({ children }) { return <ul className="space-y-2.5 mb-5">{children}</ul>; }
function LI({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8] flex-shrink-0 mt-[0.48em]" aria-hidden="true" />
      <span className="text-gray-800 text-[13.5px] font-normal leading-relaxed">{children}</span>
    </li>
  );
}
function Callout({ type = "blue", children }) {
  const s = {
    blue:  "border-l-[3px] border-[#0818A8] bg-[#0818A8]/4 text-gray-800",
    amber: "border-l-[3px] border-amber-500 bg-amber-50 text-amber-900",
    green: "border-l-[3px] border-emerald-600 bg-emerald-50 text-emerald-900",
    red:   "border-l-[3px] border-red-500 bg-red-50 text-red-900",
  };
  return <div className={`px-5 py-4 my-6 text-[13px] font-normal leading-relaxed ${s[type]}`}>{children}</div>;
}
function BlueTable({ headers, rows, minWidth = 500 }) {
  return (
    <div className="overflow-x-auto mb-6 border border-gray-200">
      <table className="w-full" style={{ minWidth }} aria-label="Data table">
        <thead>
          <tr className="bg-[#0818A8]">
            {headers.map(h => (
              <th key={h} className="px-5 py-3 text-left text-[13px] font-bold tracking-[0.18em] uppercase text-white/80">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-[#0818A8]/3 transition-colors`}>
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3 text-[13px] text-gray-800 font-normal leading-snug">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ id, num, title, children }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      className="scroll-mt-[80px] py-10 border-b border-gray-100 last:border-0"
      aria-labelledby={`${id}-h`}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-start gap-5 mb-7">
        <div className="w-10 h-10 bg-[#0818A8] flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <span className="text-white font-black text-[13px] tracking-[0.06em]">{num}</span>
        </div>
        <h2 id={`${id}-h`} className="font-black text-[clamp(18px,2.8vw,25px)] text-gray-900 leading-tight tracking-[-0.02em] pt-1.5">{title}</h2>
      </div>
      <div className="pl-[60px]">{children}</div>
    </motion.section>
  );
}

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
        aria-expanded={open}
      >
        <span className={`text-[13.5px] font-semibold leading-snug transition-colors ${open ? "text-[#0818A8]" : "text-gray-800 group-hover:text-[#0818A8]"}`}>
          {q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-0.5" aria-hidden="true">
          <ChevronDown size={15} className={open ? "text-[#0818A8]" : "text-gray-800"} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="text-gray-800 text-[13.5px] font-normal leading-relaxed pb-5 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function TermsPage() {
  const [activeId, setActiveId]     = useState("t1");
  const [tocMobile, setTocMobile]   = useState(false);

  useEffect(() => {
    const obs = [];
    TOC.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveId(item.id); },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white min-h-screen`}>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service — R-Zone Enterprises",
            "url": "https://r-zoneenterprises.com/terms",
            "description": "R-Zone Enterprises Terms of Service governing use of UK–Nigeria cargo, freight and logistics services.",
            "dateModified": "2025-01-15",
            "publisher": { "@type": "Organization", "name": "R-Zone Enterprises", "url": "https://r-zoneenterprises.com" },
          }),
        }}
      />

      {/* ── Top bar ── */}
      <div className="bg-[#0818A8]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 h-9 flex items-center justify-between">
          <p className="text-white/80 text-[13px] font-medium">R-Zone Enterprises — Legal &amp; Compliance</p>
          <div className="hidden sm:flex items-center gap-6">
            <a href="tel:+448007720864" className="flex items-center gap-1.5 text-white/80 hover:text-white text-[13px] font-medium transition-colors" aria-label="Call R-Zone">
              <Phone size={10} aria-hidden="true" /> +44 (0) 800 772 0864
            </a>
            <a href="mailto:legal@r-zoneenterprises.com" className="flex items-center gap-1.5 text-white/80 hover:text-white text-[13px] font-medium transition-colors" aria-label="Email legal team">
              <Mail size={10} aria-hidden="true" /> legal@r-zoneenterprises.com
            </a>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-gray-800 text-[13px] font-medium hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight size={11} className="text-gray-800" aria-hidden="true" />
            <span className="text-gray-900 text-[13px] font-medium" aria-current="page">Terms of Service</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#0818A8] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Scale size={20} className="text-white" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[#0818A8]/30 to-transparent" aria-hidden="true" />
              </div>
              <h1 className="font-black text-[clamp(32px,6vw,64px)] text-gray-900 leading-[0.88] tracking-[-0.035em] uppercase mb-5">
                Terms of<br /><span className="text-[#0818A8]">Service.</span>
              </h1>
              <p className="text-gray-800 text-[15px] font-normal leading-relaxed max-w-lg">
                The legal agreement between you and R-Zone Enterprises Ltd governing use of our UK–Nigeria freight and logistics services. Written clearly — no legal jargon without plain-English explanation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Last Updated", val: "15 January 2025",   icon: Clock    },
                { label: "Version",      val: "v3.0 — 2025",       icon: FileText },
                { label: "Jurisdiction", val: "England & Wales",   icon: Globe    },
                { label: "Governed By",  val: "English Law",       icon: Scale    },
              ].map(({ label, val, icon: Icon }) => (
                <div key={label} className="border border-gray-200 bg-gray-50 p-4 hover:border-[#0818A8]/25 transition-colors">
                  <Icon size={13} className="text-[#0818A8] mb-2" aria-hidden="true" />
                  <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-gray-800 mb-0.5">{label}</p>
                  <p className="text-gray-800 font-semibold text-[13px] leading-snug">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important notice */}
          <div className="mt-8 border border-amber-200 bg-amber-50 px-5 py-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-amber-900 text-[13px] font-normal leading-relaxed">
              <strong className="font-semibold">Important:</strong> By booking a shipment, dropping off cargo, or using our website, you agree to these Terms in their entirety. Please read them carefully. If you do not agree, please do not use our services.
            </p>
          </div>

          {/* Mobile TOC */}
          <div className="mt-8 lg:hidden">
            <button
              onClick={() => setTocMobile(o => !o)}
              className="w-full flex items-center justify-between border border-gray-200 bg-gray-50 hover:bg-gray-100 px-5 py-3.5 transition-colors"
              aria-expanded={tocMobile}
            >
              <span className="text-[13px] font-bold text-gray-800">Table of Contents</span>
              <ChevronDown size={15} className={`text-gray-800 transition-transform ${tocMobile ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {tocMobile && (
                <motion.nav
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden border border-t-0 border-gray-200"
                  aria-label="Table of contents"
                >
                  <div className="grid grid-cols-2 gap-0">
                    {TOC.map(item => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setTocMobile(false)}
                        className={`flex items-center gap-2.5 px-4 py-3 border-b border-r border-gray-100 text-[13px] transition-colors odd:border-r even:border-r-0 ${
                          activeId === item.id ? "bg-[#0818A8]/5 text-[#0818A8] font-semibold" : "text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-[13px] font-black text-gray-800">{item.num}</span>
                        <span className="leading-snug">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2" aria-label="Table of contents">
            <div className="sticky top-[74px]">
              <p className="text-[13px] font-black tracking-[0.35em] uppercase text-gray-800 mb-4 px-1">Contents</p>
              <nav aria-label="Section navigation">
                {TOC.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`group flex items-center gap-3 px-3 py-2.5 text-[13px] border-l-2 transition-all duration-150 ${
                      activeId === item.id
                        ? "border-[#0818A8] text-[#0818A8] font-semibold bg-[#0818A8]/4"
                        : "border-transparent text-gray-800 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`text-[13px] font-black flex-shrink-0 ${activeId === item.id ? "text-[#0818A8]" : "text-gray-800"}`}>
                      {item.num}
                    </span>
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 border border-[#0818A8]/15 bg-[#0818A8]/4 p-4">
                <Scale size={14} className="text-[#0818A8] mb-2" aria-hidden="true" />
                <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-[#0818A8] mb-2">Legal Enquiries</p>
                <a href="mailto:legal@r-zoneenterprises.com" className="text-[13px] font-semibold text-gray-800 hover:text-[#0818A8] transition-colors block leading-snug break-all">
                  legal@r-zoneenterprises.com
                </a>
                <p className="text-gray-800 text-[13px] font-normal mt-1">Responds within 1 business day</p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9 xl:col-span-10 min-w-0" id="main-content">

            {/* ── 01 ── */}
            <Section id="t1" num="01" title="Definitions & Acceptance of Terms">
              <H3>1.1 — Key Definitions</H3>
              <UL>
                <LI><strong className="text-gray-900 font-semibold">"RZE" / "R-Zone"</strong> — R-Zone Enterprises Ltd, also operating as R-Zone Cargo and Shipping Services, registered in England and Wales. Registered office: Unit 9 Moorhen Yard, Elms Lane, Bulphan, Upminster, Essex RM14 3TS.</LI>
                <LI><strong className="text-gray-900 font-semibold">"Customer"</strong> — the sender of a consignment making payment in advance to RZE or via an approved payment method.</LI>
                <LI><strong className="text-gray-900 font-semibold">"Consignment / Cargo"</strong> — any one or more parcels sent at one time by the Customer to an agreed destination.</LI>
                <LI><strong className="text-gray-900 font-semibold">"Dangerous Goods"</strong> — items specified as dangerous, hazardous, prohibited, or restricted by regulatory bodies or legislation governing transport by road, rail, sea, or air.</LI>
                <LI><strong className="text-gray-900 font-semibold">"Despatch"</strong> — the time when the Customer hands a consignment to a representative or agent of RZE for delivery.</LI>
                <LI><strong className="text-gray-900 font-semibold">"Working Day"</strong> — any day other than a Saturday, Sunday, Bank or Public Holiday, Good Friday, or Christmas Day.</LI>
                <LI><strong className="text-gray-900 font-semibold">"UK"</strong> — England, Scotland, Wales, and Northern Ireland.</LI>
                <LI><strong className="text-gray-900 font-semibold">"Nigeria"</strong> — the Federal Republic of Nigeria and its current 36 states of the Federation.</LI>
                <LI><strong className="text-gray-900 font-semibold">"Demurrage / Storage Charges"</strong> — charges for storage of goods in our warehouse or agent&apos;s warehouse, accruing after the free storage period expires.</LI>
                <LI><strong className="text-gray-900 font-semibold">"Antique"</strong> — an object over 100 years of age. <strong className="text-gray-900 font-semibold">"Collectable"</strong> — an item that has appreciated in value due to scarcity or being no longer in production.</LI>
              </UL>
              <H3>1.2 — Acceptance</H3>
              <P>These Terms of Service constitute a legally binding agreement between you and R-Zone Enterprises Ltd. By accessing our website, submitting a booking, dropping off cargo, or using any of our freight and logistics services, you confirm that you have read, understood, and agree to these Terms in their entirety. These Terms apply to all customers — individuals and businesses alike.</P>
              <P>We reserve the right to update these Terms at any time. Material changes will be communicated by email and posted on our website. Continued use of our services after notification constitutes acceptance of the revised Terms.</P>
              <Callout type="blue">These conditions constitute the entire agreement between RZE and the Customer. Each party acknowledges that in entering into these conditions it is not relying on any representation or undertaking, whether oral or in writing, save as expressly incorporated herein.</Callout>
            </Section>

            {/* ── 02 ── */}
            <Section id="t2" num="02" title="Our Services">
              <P>R-Zone Enterprises provides the following freight and logistics services between the United Kingdom and Nigeria:</P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {SERVICES_LIST.map(s => (
                  <div key={s.title} className="border border-gray-200 bg-gray-50 p-4 hover:border-[#0818A8]/30 transition-colors">
                    <p className="text-gray-900 font-bold text-[13.5px] mb-1">{s.icon} {s.title}</p>
                    <p className="text-gray-800 text-[13px] font-normal leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
              <P>We act as a freight forwarder and customs agent. RZE may engage agents and/or sub-contractors to perform all or any part of the services. Where we sub-contract to carriers, we remain responsible to you for ensuring those carriers perform in accordance with these Terms.</P>
              <Callout type="blue">Nothing in these conditions shall confer on any third party any benefit, nor the right to enforce any of these conditions, that such person would not have had but for the Contracts (Rights of Third Parties) Act 1999.</Callout>
            </Section>

            {/* ── 03 ── */}
            <Section id="t3" num="03" title="Booking & Confirmation">
              <H3>3.1 — How to Book</H3>
              <P>Bookings may be made via our website, by telephone (+44 800 772 0864), by email (info@r-zoneenterprises.com), or in person at our Upminster, Essex warehouse. A booking is not confirmed until you receive written confirmation from us including a booking reference number.</P>
              <H3>3.2 — Accuracy of Information</H3>
              <P>You are responsible for providing accurate and complete information at booking — including cargo description, weight, dimensions, declared value, collection address, and delivery address. The Customer must provide a full inventory of items in each package, and a copy handed to the despatch driver/team. Inaccuracies may result in additional charges, delays, customs seizure, or rejection of your cargo.</P>
              <H3>3.3 — Cut-Off Times</H3>
              <P>Sea freight shipments must be received at our warehouse by the cut-off date on our published sailing schedule — typically 5 working days before the vessel departure date. Air freight has a same-day cut-off of 12:00 noon on the departure day. Consignments dispatched after 5:30pm on a Working Day will be deemed received on the next Working Day. We cannot guarantee inclusion if cargo arrives after the stated cut-off.</P>
              <H3>3.4 — Amendments</H3>
              <P>Amendments to confirmed bookings (including changes to delivery address) may incur additional administrative charges. Amendments to filed customs declarations are subject to customs authority approval and cannot be guaranteed. Address changes before customs filing are straightforward; after filing, an additional administrative fee applies.</P>
              <H3>3.5 — Door-to-Door Delivery</H3>
              <P>In a door-to-door delivery, RZE undertakes to deliver to the address specified in the despatch documentation — not to a specific person. If delivery is to a specific named person, this must be arranged and clearly stated at the time of booking. Where roads are not accessible by vehicle, cargo will be dropped at the nearest motorable local terminal as agreed.</P>
              <P>RZE will request the person accepting delivery to sign an acknowledgement/delivery receipt. Copies of such receipts shall be available for up to four weeks from the date of delivery, subject to payment of applicable charges.</P>
            </Section>

            {/* ── 04 ── */}
            <Section id="t4" num="04" title="Cargo Restrictions">
              <H3>4.1 — Prohibited Items (Absolute — No Exceptions)</H3>
              <div className="border border-red-100 bg-red-50/60 p-5 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Ban size={14} className="text-red-600" aria-hidden="true" />
                  <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-red-600">We will not carry these under any circumstances</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PROHIBITED.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-[0.48em]" aria-hidden="true" />
                      <span className="text-red-800 text-[13px] font-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Callout type="red">
                <strong className="font-semibold">Criminal notice:</strong> All firearms, ammunition, prohibited drugs and controlled substances are strictly prohibited on any RZE freight, shipping, storage, or distribution service. RZE will report any suspicious items to law enforcement agencies. Customers deliberately attempting to transport or store any controlled substance using our services are liable to criminal prosecution under the law.
              </Callout>
              <H3>4.2 — Restricted Items (Prior Approval Required)</H3>
              <UL>{RESTRICTED.map((r, i) => <LI key={i}>{r}</LI>)}</UL>
              <P>RZE may add or delete items from the prohibited/restricted list without notice but will endeavour to make any changes available on our website at www.r-zoneenterprises.com.</P>
              <Callout type="amber">
                <strong className="font-semibold">Customs liability:</strong> The Customer is solely responsible for ascertaining whether cargo contents are dangerous, prohibited, or subject to restrictions. You shall be responsible to RZE, its sub-contractors, and agents for all loss, damage, or injury arising from the carriage of dangerous or prohibited goods, whether declared as such or not. We accept no liability for goods confiscated or detained by customs authorities due to your non-compliance. For a full list of Nigerian import prohibitions, see <a href="https://customs.gov.ng/?page_id=3075" target="_blank" rel="noopener noreferrer" className="underline">customs.gov.ng</a>.
              </Callout>
            </Section>

            {/* ── 05 ── */}
            <Section id="t5" num="05" title="Packaging Requirements">
              <P>The sender is ultimately responsible for packaging all consignments sent through RZE. All cargo must be packaged to withstand the normal rigours of international freight handling — including stacking, vibration, and changes in temperature and humidity. RZE will not be liable for damage resulting from poor packaging by the Customer.</P>
              <UL>
                <LI>Each item/box must be clearly labelled with full sender name, recipient name, and destination postal address including postcode</LI>
                <LI>Fragile items must be marked, packed with appropriate protective material, and where possible placed in see-through plastic</LI>
                <LI>Liquids must be in sealed, leak-proof containers placed in secondary sealed bags</LI>
                <LI>Sharp objects must be wrapped to prevent damage to other cargo</LI>
                <LI><strong className="text-gray-900 font-semibold">Maximum single item weight for collection: 30kg per bag/box.</strong> Items over 30kg per unit may be refused. If accepted, an additional surcharge of £20 per item applies. The despatch driver must be informed at time of collection.</LI>
                <LI>Each consignment must be accompanied at despatch by fully completed despatch documentation, including service indicators and invoice numbers as supplied by RZE</LI>
              </UL>
              <P>RZE offers a professional packing service at an additional charge, agreed at the time of despatch. We accept no liability for damage to inadequately packaged goods.</P>
            </Section>

            {/* ── 06 ── */}
            <Section id="t6" num="06" title="Customs & Import Duties">
              <H3>6.1 — Customer Responsibility</H3>
              <P>By accepting these Terms, you confirm all customs declaration information provided is true, accurate, and complete to the best of your knowledge. The Customer shall ensure that addressing and documentation requirements are fully met, including the full postal address, postcode, and any required customs or commercial invoices.</P>
              <H3>6.2 — Duties and Taxes</H3>
              <P>Import duties, taxes, and customs charges levied by the Nigeria Customs Service (NCS) or HMRC are payable by the recipient/customer and are not included in our quoted rates unless explicitly stated in writing. Where we pay duties on your behalf, we will invoice them directly to you and they shall be payable immediately.</P>
              <H3>6.3 — Delays and Seizure</H3>
              <P>We cannot be held responsible for delays caused by customs inspection, detention, examination, or clearance procedures — including NAFDAC and all security organisation examinations. Transit time estimates exclude customs processing time. If customs seize or detain your cargo due to prohibited content, misdeclaration, or any reason attributable to the Customer, you accept full liability for all resulting costs including demurrage and storage charges.</P>
              <H3>6.4 — Customs Damage</H3>
              <P>In the event that customs authorities re-examine cargo and damage occurs in the process, RZE will, as a goodwill gesture, refund up to <strong className="text-gray-900 font-semibold">10% of the invoice value</strong> of the affected goods, or arrange repair through our designated contractors to a state of perfection.</P>
              <Callout type="amber">
                <strong className="font-semibold">Misdeclaration warning:</strong> Providing false information to customs is a criminal offence in both the UK and Nigeria. R-Zone Enterprises will not assist in customs fraud and will cooperate fully with any investigation. RZE will not file inaccurate customs declarations under any circumstances.
              </Callout>
            </Section>

            {/* ── 07 ── */}
            <Section id="t7" num="07" title="Pricing & Payment">
              <H3>7.1 — Quotations</H3>
              <P>All quotes are valid for 7 calendar days from the date of issue. Rates may change due to fuel surcharges, currency fluctuations, or carrier tariff changes. We will notify you of any changes before confirming. RZE reserves the right to implement corresponding price increases where taxes or transport costs change significantly for reasons outside our control.</P>
              <H3>7.2 — Volumetric Weight</H3>
              <div className="border border-gray-200 bg-gray-50 p-5 mb-5">
                <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-gray-800 mb-3">Volumetric Weight Formula (per RZE Tariff)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 bg-[#0818A8] flex items-center justify-center" aria-hidden="true">
                        <span className="text-white text-[13px]">✈</span>
                      </div>
                      <p className="text-gray-900 font-bold text-[13px]">Air Freight</p>
                    </div>
                    <p className="text-gray-800 text-[13px] font-normal">L × W × H (cm) ÷ <strong className="text-gray-900 font-semibold">6,000</strong></p>
                  </div>
                  <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 bg-[#0818A8] flex items-center justify-center" aria-hidden="true">
                        <span className="text-white text-[13px]">🚢</span>
                      </div>
                      <p className="text-gray-900 font-bold text-[13px]">Sea Freight</p>
                    </div>
                    <p className="text-gray-800 text-[13px] font-normal">L × W × H (cm) ÷ <strong className="text-gray-900 font-semibold">1,000</strong></p>
                  </div>
                </div>
                <p className="text-gray-800 text-[13px] font-normal mt-3">We charge whichever is greater — actual weight or volumetric weight. Charges may be assessed at time of despatch or at any time prior to delivery.</p>
              </div>
              <H3>7.3 — Payment Terms</H3>
              <UL>
                <LI><strong className="text-gray-900 font-semibold">Individual customers:</strong> Full payment required before cargo is accepted. Consignments will not be shipped if full payment has not been received.</LI>
                <LI><strong className="text-gray-900 font-semibold">Business accounts:</strong> Net 14 or 30-day payment terms may be agreed in writing by RZE.</LI>
                <LI><strong className="text-gray-900 font-semibold">Accepted methods:</strong> Bank transfer (BACS/Faster Payments), debit/credit card, PayPal. Cash is not accepted.</LI>
              </UL>
              <H3>7.4 — Uncollected / Unshipped Consignments</H3>
              <P>Any unshipped consignment left in our warehouse and not collected by the customer after request by RZE will attract a daily storage charge of <strong className="text-gray-900 font-semibold">£0.50 per kilogram, or a minimum of £5 per day</strong> for consignments under 20kg. All outstanding charges must be paid in full before consignment can be released.</P>
              <P>RZE will endeavour to contact the customer to arrange collection. RZE reserves the right to treat all unshipped and unclaimed consignments as abandoned after <strong className="text-gray-900 font-semibold">21 days</strong> and will deal with such consignments as it deems reasonably fit.</P>
              <H3>7.5 — Late Payment</H3>
              <P>Interest on overdue invoices is charged at 8% per annum above the Bank of England base rate, in accordance with the Late Payment of Commercial Debts (Interest) Act 1998. RZE shall take all reasonable and legal means necessary to recover any associated costs for its services and all third-party services provided.</P>
            </Section>

            {/* ── 08 ── */}
            <Section id="t8" num="08" title="Storage & Demurrage">
              <P>Storage charges (demurrage) apply when cargo is held in RZE&apos;s warehouse or a third-party storage facility beyond the stated free storage period.</P>
              <BlueTable
                headers={["Location", "Free Storage Period", "Charge After Free Period", "Abandoned After"]}
                rows={[
                  ["UK — Upminster Warehouse",   "3 days from receipt",        "£2 per day (or £0.50/kg/day for unshipped cargo)",  "30 days"],
                  ["Nigeria — Lagos Facility",   "21 days from delivery attempt", "₦5,000 per day",                                "30 days from delivery attempt"],
                  ["Third-Party Storage (UK/NG)","As per provider terms",     "As per provider — invoiced to customer",           "30 days"],
                ]}
                minWidth={600}
              />
              <UL>
                <LI>Where RZE is directed to hold a consignment pending further instructions, delivery is deemed to have taken place at the earliest time the consignment is made available for collection.</LI>
                <LI>All outstanding charges due to RZE and its third-party storage providers shall be paid in full by the Customer before cargo can be released.</LI>
                <LI>Customers are strongly advised to ensure their consignments are collected or a final dispatch instruction is given within the free storage period.</LI>
                <LI>All goods left in storage for more than 30 days without contact from the Customer will be treated as abandoned. RZE shall treat such goods as it deems fit and cannot be held liable for any loss or damage of goods left abandoned for more than 7 days.</LI>
              </UL>
              <Callout type="amber">
                <strong className="font-semibold">Non-collection charges:</strong> If an undelivered consignment in Nigeria is not claimed within 10 working days of attempted delivery, RZE will attempt to contact the Customer. If no contact is made, the consignment will be returned to our warehouse and held free of charge for 21 days (including weekends), after which daily charges of ₦5,000 (Nigeria) or £10 (UK) will apply.
              </Callout>
            </Section>

            {/* ── 09 ── */}
            <Section id="t9" num="09" title="Liability & Claims">
              <H3>9.1 — Air Freight Liability</H3>
              <P>For air freight, our liability is governed by the Warsaw Convention (as amended by the Montreal Protocol) or the Montreal Convention 1999, whichever applies. Liability is limited to <strong className="text-gray-900 font-semibold">19 SDR per kilogram</strong> of cargo lost or damaged.</P>
              <H3>9.2 — Sea Freight Liability</H3>
              <P>For sea freight, liability is limited under the Hague-Visby Rules to <strong className="text-gray-900 font-semibold">666.67 SDR per package or 2 SDR per kilogram</strong>, whichever is higher.</P>
              <H3>9.3 — General Compensation Cap</H3>
              <P>In the event of any compensation, our liability as a freight forwarder is limited to a maximum of <strong className="text-gray-900 font-semibold">10% of the declared invoice value</strong> of the consignment. Customers are advised to submit a full packing list and take out independent cargo insurance for goods of high value. See Section 10.</P>
              <H3>9.4 — Liability Exclusions</H3>
              <P>RZE shall not be liable to pay compensation or refunds in respect of:</P>
              <UL>
                <LI>Loss or damage from inadequate packaging by the Customer</LI>
                <LI>Latent or inherent defects, vice, or natural deterioration of items</LI>
                <LI>Damage in the course of transport or handling by the shipping line or airline</LI>
                <LI>Acts of God, adverse weather, natural disasters, force majeure, traffic congestion, mechanical breakdown, or obstruction of highways</LI>
                <LI>Delay caused by customs, NAFDAC, or any security authority examination or operation</LI>
                <LI>Industrial action of any kind</LI>
                <LI>Confiscation or seizure of prohibited or restricted goods</LI>
                <LI>Goods misdeclared, incorrectly addressed, or accompanied by incomplete documentation</LI>
                <LI>Any fraudulent or dishonest act by the Customer or any person misrepresenting authority to receive</LI>
                <LI>Consequential losses, loss of profit, or indirect losses of any kind</LI>
              </UL>
              <H3>9.5 — Claims Procedure</H3>
              <P>Submit all claims in writing to <a href="mailto:claims@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">claims@r-zoneenterprises.com</a> within <strong className="text-gray-900 font-semibold">7 days of delivery</strong> (damage) or <strong className="text-gray-900 font-semibold">14 days of expected delivery date</strong> (loss). Include: booking reference, description of goods, photographs, packing list, and estimated value. RZE will respond within 2 working days and complete its investigation within 10–14 working days.</P>
              <Callout type="blue">
                <strong className="font-semibold">Recommendation:</strong> Our carrier liability limits may be significantly lower than the actual value of your goods. We strongly recommend taking out cargo insurance on all shipments — especially high-value cargo. See Section 10.
              </Callout>
            </Section>

            {/* ── 10 ── */}
            <Section id="t10" num="10" title="Insurance">
              <P>Customers are ultimately responsible for insuring any consignment being sent on any of our services (Air or Sea). <strong className="text-gray-900 font-semibold">RZE does not provide cargo insurance</strong> and neither RZE nor any of its agents provide insurance for items being shipped or air freighted.</P>
              <P>RZE offers optional cargo insurance through our approved insurance partner. Premiums are calculated as a percentage of declared cargo value and must be arranged at the time of booking — insurance cannot be added after despatch or after an incident has occurred.</P>
              <P>Where you choose not to purchase insurance, your claim in the event of loss or damage is limited to the carrier liability caps in Section 9, which may be substantially lower than the actual value of your goods.</P>
              <Callout type="amber">
                <strong className="font-semibold">Important:</strong> For all consignments of significant value, we strongly recommend arranging independent cargo insurance. Please speak to our team at the time of booking.
              </Callout>
            </Section>

            {/* ── 11 ── */}
            <Section id="t11" num="11" title="Transit Times">
              <P>All transit times are estimates only — not guarantees. They represent typical performance under normal operating conditions and <strong className="text-gray-900 font-semibold">exclude customs processing time</strong>. Only Working Days count for exported air freight (typically 7 working days) whilst imported air freight can take up to 10 working days.</P>
              <BlueTable
                headers={["Service", "Typical Transit", "Notes"]}
                rows={TRANSIT_TABLE.map(r => [r.service, r.typical, r.note])}
              />
              <P>Consignments will only be delivered on Working Days unless special arrangements have been agreed in writing by RZE and applicable charges paid. We will not be liable for any loss arising from delays, however caused, unless due to our gross negligence or wilful default. Time is not of the essence in any contract with R-Zone Enterprises.</P>
            </Section>

            {/* ── 12 ── */}
            <Section id="t12" num="12" title="Loss, Damage & Delay">
              <P>In the event your cargo is lost, damaged, or significantly delayed, contact us immediately at <a href="tel:+448007720864" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">+44 800 772 0864</a> or <a href="mailto:info@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">info@r-zoneenterprises.com</a>.</P>
              <P>We investigate all reported incidents thoroughly. Our internal investigation typically completes within 10–14 working days. Where cargo cannot be located within <strong className="text-gray-900 font-semibold">30 days</strong> of the expected delivery date, it will be treated as lost and any valid claim processed per Section 9.</P>
              <P>RZE shall not be liable in respect of any consignment where any person has been fraudulent or dishonest in any way, or misrepresents authority to receive a consignment on the addressee&apos;s or Customer&apos;s behalf.</P>
              <Callout type="amber">
                <strong className="font-semibold">Non-delivery process:</strong> RZE will attempt to deliver once. After an unsuccessful delivery attempt, the addressee may request redelivery, redirection, or collection — subject to additional charges. If unclaimed after 10 working days of attempted delivery notification, the consignment will be returned to our warehouse. Free storage applies for 21 days, after which daily charges apply.
              </Callout>
            </Section>

            {/* ── 13 ── */}
            <Section id="t13" num="13" title="Cancellations & Refunds">
              <BlueTable
                headers={["Timing of Cancellation", "Refund Policy"]}
                rows={CANCELLATION_TABLE.map(r => [r.timing, r.refund])}
                minWidth={400}
              />
              <H3>13.2 — Cancellation by Us</H3>
              <P>If we cancel or significantly delay a sailing or flight departure, we will offer a full refund or transfer to the next available departure at no additional cost to you.</P>
              <H3>13.3 — Consumer Rights</H3>
              <P>Online bookings may carry a 14-day right to cancel under the Consumer Contracts Regulations 2013. This right does not apply once we have commenced performance of the service at your request.</P>
              <H3>13.4 — Storage After Cancellation</H3>
              <P>Where a booking is cancelled but cargo is already held at our warehouse, daily storage charges will apply after the 3-day free period. The Customer must arrange collection promptly or a delivery address change which will incur additional charges as agreed by RZE.</P>
            </Section>

            {/* ── 14 ── */}
            <Section id="t14" num="14" title="Customer Obligations">
              <P>By using our services you agree to:</P>
              <UL>
                <LI>Provide accurate, complete, and truthful information at all times — including a full inventory of package contents and correct recipient contact details including a valid Nigerian phone number</LI>
                <LI>Comply with all applicable UK and Nigerian laws, regulations, and customs requirements</LI>
                <LI>Not tender prohibited or restricted goods without prior written approval from RZE</LI>
                <LI>Package all goods adequately for international freight handling — the Customer takes full responsibility for packing</LI>
                <LI>Ensure the recipient is available to receive delivery, or arrange a suitable alternative in advance</LI>
                <LI>Retain all Customer copies of despatch documentation, as these will be required to support any claim</LI>
                <LI>Pay all amounts due to RZE in accordance with our payment terms</LI>
                <LI>Indemnify RZE against all costs, claims, demands, or liabilities arising from your failure to comply with these Terms</LI>
              </UL>
            </Section>

            {/* ── 15 ── */}
            <Section id="t15" num="15" title="Intellectual Property">
              <P>All content on our website — including text, graphics, logos, images, and software — is the property of R-Zone Enterprises Ltd and is protected by UK and international intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</P>
              <P>By using our website you agree to our Website Terms. RZE may personalise the site based on usage, activity, and preferences. Our website contents, including prices and service descriptions, may change at any time without notice. Your continued use of the website constitutes acceptance of any changes.</P>
            </Section>

            {/* ── 16 ── */}
            <Section id="t16" num="16" title="Termination">
              <P>We reserve the right to refuse service, suspend or terminate your account, and/or cancel any pending bookings if you breach these Terms, provide fraudulent or false information, or where we reasonably suspect illegal activity — including any attempt to transport controlled substances. In such cases, no refund will be due and you remain liable for any outstanding amounts and costs incurred by RZE.</P>
              <P>RZE&apos;s compensation and other conditions are subject to revision from time to time, and services may be added or deleted. RZE reserves the right to pass on any further costs that arise prior to release/delivery of a consignment, regardless of the initial agreed price.</P>
            </Section>

            {/* ── 17 ── */}
            <Section id="t17" num="17" title="Governing Law">
              <P>These Terms are governed by and construed in accordance with the laws of <strong className="text-gray-900 font-semibold">England and Wales</strong>. Each party irrevocably agrees to submit to the exclusive jurisdiction of the courts of England and Wales over any claim or matter arising under or in connection with this agreement.</P>
              <P>Before commencing legal proceedings, we encourage resolution through our complaints process: <a href="mailto:complaints@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">complaints@r-zoneenterprises.com</a>. We aim to resolve all complaints within <strong className="text-gray-900 font-semibold">14 working days</strong>.</P>
              <H3>17.1 — Severability</H3>
              <P>If any provision of these Terms is found by any court or administrative body of competent jurisdiction to be invalid or unenforceable, such invalidity shall not affect the remaining provisions, which shall remain in full force and effect.</P>
              <H3>17.2 — VAT</H3>
              <P>At this time, most services provided by RZE are exempt from VAT. Should this change, VAT at the appropriate rate shall be added to the prices payable by the Customer. For UK VAT-registered business customers, VAT is charged at the standard rate on UK-origin services where applicable.</P>
            </Section>

            {/* ── 18 ── */}
            <Section id="t18" num="18" title="Contact">
              <P>For questions about these Terms of Service or to raise a formal complaint:</P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
                {[
                  { label: "Legal & Compliance",  val: "legal@r-zoneenterprises.com",      href: "mailto:legal@r-zoneenterprises.com",       icon: Scale   },
                  { label: "Claims",              val: "claims@r-zoneenterprises.com",     href: "mailto:claims@r-zoneenterprises.com",      icon: Shield  },
                  { label: "Complaints",          val: "complaints@r-zoneenterprises.com", href: "mailto:complaints@r-zoneenterprises.com",  icon: Info    },
                  { label: "UK Phone",            val: "+44 (0) 800 772 0864",             href: "tel:+448007720864",                        icon: Phone   },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="border border-gray-200 bg-gray-50 p-5 hover:border-[#0818A8]/25 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={13} className="text-[#0818A8]" aria-hidden="true" />
                        <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-gray-800">{item.label}</p>
                      </div>
                      <a href={item.href} className="text-gray-800 font-semibold text-[13px] hover:text-[#0818A8] transition-colors break-all">
                        {item.val}
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Registered address */}
              <div className="border border-gray-200 bg-gray-50 p-5 mb-7">
                <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-gray-800 mb-2">Registered Office</p>
                <p className="text-gray-800 text-[13px] font-semibold">R-Zone Enterprises Ltd</p>
                <p className="text-gray-800 text-[13px] font-normal">Unit 9 Moorhen Yard, Elms Lane, Bulphan, Upminster, Essex RM14 3TS, United Kingdom</p>
                <p className="text-gray-800 text-[13px] font-normal mt-1">Registered in England and Wales</p>
              </div>

              <div className="border border-gray-200 divide-y divide-gray-100">
                {[
                  {
                    q: "Can I ship personal items from the UK to Nigeria?",
                    a: "Yes, we accept personal effects including clothing, food items, and household goods. Some items require NAFDAC compliance for entry into Nigeria. Contact us if you're unsure about a specific item.",
                  },
                  {
                    q: "What happens if my cargo is delayed at customs?",
                    a: "Customs delays are outside our control and do not constitute a breach of contract. We will notify you as soon as we become aware. You remain responsible for any customs duties or demurrage charges that accrue during the delay. If you purchased cargo insurance, delays may be covered under your policy.",
                  },
                  {
                    q: "How do I make a claim for lost cargo?",
                    a: "Email claims@r-zoneenterprises.com within 14 days of the expected delivery date with your booking reference, full description and packing list of goods, and declared value. We will respond within 2 working days and complete our investigation within 10–14 working days.",
                  },
                  {
                    q: "What is the maximum weight per bag or box?",
                    a: "The maximum weight for individual bags or boxes for collection is 30kg. Items exceeding this may be refused or will attract an additional surcharge of £20 per item. Please inform the despatch driver at the time of collection if any item exceeds this limit.",
                  },
                  {
                    q: "Do you offer credit terms for businesses?",
                    a: "Yes, businesses that trade regularly with us can apply for 14 or 30-day credit terms. Contact our accounts team to discuss eligibility.",
                  },
                ].map((item, i) => <FAQ key={i} q={item.q} a={item.a} />)}
              </div>
            </Section>

            {/* Footer CTA */}
            <div className="mt-12 border border-[#0818A8]/20 bg-[#0818A8]/4 p-7 md:p-9">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-[13px] font-bold tracking-[0.28em] uppercase text-[#0818A8] mb-1">Ready to Ship?</p>
                  <h3 className="text-gray-900 font-black text-[20px] tracking-[-0.01em]">Get a Free Quote Today.</h3>
                  <p className="text-gray-800 text-[13.5px] font-normal mt-1">Same-day response from our UK-based team.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
                    aria-label="Get a free shipping quote"
                  >
                    <Package size={12} aria-hidden="true" /> Get a Quote
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 border border-gray-300 text-gray-800 hover:border-[#0818A8] hover:text-[#0818A8] text-[13px] font-bold tracking-[0.06em] uppercase px-6 py-3 transition-all duration-200"
                    aria-label="Back to R-Zone Enterprises"
                  >
                    <ArrowLeft size={11} aria-hidden="true" /> Back to Site
                  </Link>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}