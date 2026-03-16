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
  { id: "t1",  label: "Acceptance of Terms",        num: "01" },
  { id: "t2",  label: "Our Services",               num: "02" },
  { id: "t3",  label: "Booking & Confirmation",     num: "03" },
  { id: "t4",  label: "Cargo Restrictions",         num: "04" },
  { id: "t5",  label: "Packaging Requirements",     num: "05" },
  { id: "t6",  label: "Customs & Import Duties",    num: "06" },
  { id: "t7",  label: "Pricing & Payment",          num: "07" },
  { id: "t8",  label: "Liability & Claims",         num: "08" },
  { id: "t9",  label: "Insurance",                  num: "09" },
  { id: "t10", label: "Transit Times",              num: "10" },
  { id: "t11", label: "Loss, Damage & Delay",       num: "11" },
  { id: "t12", label: "Cancellations & Refunds",    num: "12" },
  { id: "t13", label: "Customer Obligations",       num: "13" },
  { id: "t14", label: "Intellectual Property",      num: "14" },
  { id: "t15", label: "Termination",                num: "15" },
  { id: "t16", label: "Governing Law",              num: "16" },
  { id: "t17", label: "Contact",                    num: "17" },
];

const SERVICES_LIST = [
  { icon: "✈", title: "Air Freight",          desc: "Weekly air cargo from LHR, LGW, MAN to Lagos (LOS) and Abuja (ABV). Transit typically 5–10 working days." },
  { icon: "🚢", title: "Sea Freight",          desc: "Monthly consolidated sea freight from UK ports to Apapa and Tin Can Island, Lagos. Transit 4–6 weeks." },
  { icon: "🚚", title: "Door-to-Door Cargo",  desc: "Collection from your UK address with delivery to any Nigerian address, via air or sea." },
  { icon: "📦", title: "Import from Nigeria",  desc: "Air and sea import services bringing goods from Nigeria to the United Kingdom." },
  { icon: "📋", title: "Customs Clearance",   desc: "End-to-end customs brokerage and clearance at UK and Nigerian ports." },
  { icon: "🏭", title: "Warehousing",          desc: "Short and long-term storage at our Essex, UK and Lagos, Nigeria facilities." },
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
  "Dangerous goods (IATA/IMDG class hazardous materials)",
  "Perishable goods and foodstuffs (NAFDAC regulations apply)",
  "Electrical and electronic equipment",
  "Vehicles and automotive parts",
  "Pharmaceuticals and medical devices",
  "High-value items (exceeding £5,000 declared value)",
];

const TRANSIT_TABLE = [
  { service: "Air Freight",             typical: "5–10 working days",               note: "LHR to LOS/ABV, excl. customs" },
  { service: "Sea Freight",             typical: "4–6 weeks",                       note: "UK ports to Apapa/Tin Can" },
  { service: "Door-to-Door (Air)",      typical: "7–14 working days",               note: "Incl. collection and delivery" },
  { service: "Door-to-Door (Sea)",      typical: "5–8 weeks",                       note: "Incl. collection and delivery" },
  { service: "Importation (Air)",       typical: "5–8 working days",               note: "LOS to LHR" },
  { service: "Importation (Sea)",       typical: "4–6 weeks",                       note: "Lagos to UK ports" },
];

const CANCELLATION_TABLE = [
  { timing: "More than 5 working days before sailing/dispatch", refund: "Full refund minus £25 admin fee" },
  { timing: "2–5 working days before sailing/dispatch",         refund: "50% refund" },
  { timing: "Less than 2 working days / cargo received",        refund: "No refund" },
  { timing: "After customs declaration filed",                  refund: "No refund; customs costs payable" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function P({ children }) {
  return <p className="text-gray-700 text-[14px] font-light leading-relaxed mb-4">{children}</p>;
}
function H3({ children }) {
  return <h3 className="text-gray-900 font-bold text-[12px] tracking-[0.1em] uppercase mb-3 mt-6 first:mt-0">{children}</h3>;
}
function UL({ children }) { return <ul className="space-y-2.5 mb-5">{children}</ul>; }
function LI({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8] flex-shrink-0 mt-[0.48em]" aria-hidden="true" />
      <span className="text-gray-700 text-[13.5px] font-light leading-relaxed">{children}</span>
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
  return <div className={`px-5 py-4 my-6 text-[13px] font-light leading-relaxed ${s[type]}`}>{children}</div>;
}
function BlueTable({ headers, rows, minWidth = 500 }) {
  return (
    <div className="overflow-x-auto mb-6 border border-gray-200">
      <table className="w-full" style={{ minWidth }} aria-label="Data table">
        <thead>
          <tr className="bg-[#0818A8]">
            {headers.map(h => (
              <th key={h} className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.18em] uppercase text-white">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-[#0818A8]/3 transition-colors`}>
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3 text-[13px] text-gray-700 font-light leading-snug">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ id, num, title, icon: Icon, children }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id} ref={ref}
      className="scroll-mt-[80px] py-10 border-b border-gray-100 last:border-0"
      aria-labelledby={`${id}-h`}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-start gap-5 mb-7">
        <div className="w-10 h-10 bg-[#0818A8] flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <span className="text-white font-black text-[11px] tracking-[0.06em]">{num}</span>
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
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 py-4.5 text-left group py-4"
        aria-expanded={open}>
        <span className={`text-[13.5px] font-semibold leading-snug transition-colors ${open ? "text-[#0818A8]" : "text-gray-800 group-hover:text-[#0818A8]"}`}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-0.5">
          <ChevronDown size={15} className={open ? "text-[#0818A8]" : "text-gray-400"} aria-hidden="true" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <p className="text-gray-700 text-[13.5px] font-light leading-relaxed pb-5 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TermsPage() {
  const [activeId, setActiveId] = useState("t1");
  const [navScrolled, setNavScrolled] = useState(false);
  const [tocMobile, setTocMobile] = useState(false);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    fn(); return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = [];
    TOC.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveId(item.id); }, { rootMargin: "-20% 0px -70% 0px" });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white min-h-screen`}>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebPage",
        "name": "Terms of Service — R-Zone Enterprises",
        "url": "https://r-zoneenterprises.com/terms",
        "description": "R-Zone Enterprises Terms of Service governing use of UK–Nigeria cargo, freight and logistics services.",
        "dateModified": "2025-01-15",
        "publisher": { "@type": "Organization", "name": "R-Zone Enterprises", "url": "https://r-zoneenterprises.com" },
      })}} />

      {/* Top bar */}
      <div className="bg-[#0818A8]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 h-9 flex items-center justify-between">
          <p className="text-white/80 text-[11px] font-medium">R-Zone Enterprises — Legal &amp; Compliance</p>
          <div className="hidden sm:flex items-center gap-6">
            <a href="tel:+448007720864" className="flex items-center gap-1.5 text-white/75 hover:text-white text-[11px] font-medium transition-colors" aria-label="Call R-Zone">
              <Phone size={10} aria-hidden="true" /> +44 800 772 0864
            </a>
            <a href="mailto:legal@r-zoneenterprises.com" className="flex items-center gap-1.5 text-white/75 hover:text-white text-[11px] font-medium transition-colors" aria-label="Email legal team">
              <Mail size={10} aria-hidden="true" /> legal@r-zoneenterprises.com
            </a>
          </div>
        </div>
      </div>

    

      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-gray-500 text-[11.5px] font-medium hover:text-gray-800 transition-colors">Home</Link>
            <ChevronRight size={11} className="text-gray-300" aria-hidden="true" />
            <span className="text-gray-800 text-[11.5px] font-medium" aria-current="page">Terms of Service</span>
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
              <p className="text-gray-600 text-[15px] font-light leading-relaxed max-w-lg">
                The legal agreement between you and R-Zone Enterprises governing use of our UK–Nigeria freight and logistics services. Written clearly — no legal jargon without plain-English explanation.
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
                  <p className="text-[9.5px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-0.5">{label}</p>
                  <p className="text-gray-800 font-semibold text-[12.5px] leading-snug">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important notice banner */}
          <div className="mt-8 border border-amber-200 bg-amber-50 px-5 py-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-amber-900 text-[13px] font-light leading-relaxed">
              <strong className="font-semibold">Important:</strong> By booking a shipment or using our website, you agree to these Terms. Please read them carefully before using our services. If you don't agree, please don't use our services.
            </p>
          </div>

          {/* Mobile TOC */}
          <div className="mt-8 lg:hidden">
            <button onClick={() => setTocMobile(o => !o)}
              className="w-full flex items-center justify-between border border-gray-200 bg-gray-50 hover:bg-gray-100 px-5 py-3.5 transition-colors" aria-expanded={tocMobile}>
              <span className="text-[13px] font-bold text-gray-800">Table of Contents</span>
              <ChevronDown size={15} className={`text-gray-500 transition-transform ${tocMobile ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {tocMobile && (
                <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.22 }}
                  className="overflow-hidden border border-t-0 border-gray-200" aria-label="Table of contents">
                  <div className="grid grid-cols-2 gap-0">
                    {TOC.map(item => (
                      <a key={item.id} href={`#${item.id}`} onClick={() => setTocMobile(false)}
                        className={`flex items-center gap-2.5 px-4 py-3 border-b border-r border-gray-100 text-[12px] transition-colors odd:border-r even:border-r-0 ${activeId === item.id ? "bg-[#0818A8]/5 text-[#0818A8] font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
                        <span className="text-[9px] font-black text-gray-400">{item.num}</span>
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

      {/* Body */}
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2" aria-label="Table of contents">
            <div className="sticky top-[74px]">
              <p className="text-[9px] font-black tracking-[0.35em] uppercase text-gray-400 mb-4 px-1">Contents</p>
              <nav aria-label="Section navigation">
                {TOC.map(item => (
                  <a key={item.id} href={`#${item.id}`}
                    className={`group flex items-center gap-3 px-3 py-2.5 text-[12px] border-l-2 transition-all duration-150 ${activeId === item.id ? "border-[#0818A8] text-[#0818A8] font-semibold bg-[#0818A8]/4" : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50"}`}>
                    <span className={`text-[9px] font-black flex-shrink-0 ${activeId === item.id ? "text-[#0818A8]" : "text-gray-400"}`}>{item.num}</span>
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 border border-[#0818A8]/15 bg-[#0818A8]/4 p-4">
                <Scale size={14} className="text-[#0818A8] mb-2" aria-hidden="true" />
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0818A8] mb-2">Legal Enquiries</p>
                <a href="mailto:legal@r-zoneenterprises.com" className="text-[11.5px] font-semibold text-gray-800 hover:text-[#0818A8] transition-colors block leading-snug break-all">legal@r-zoneenterprises.com</a>
                <p className="text-gray-600 text-[11px] font-light mt-1">Responds within 1 business day</p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9 xl:col-span-10 min-w-0" id="main-content">

            <Section id="t1" num="01" title="Acceptance of Terms">
              <P>These Terms of Service ("<strong className="text-gray-900 font-semibold">Terms</strong>") constitute a legally binding agreement between you ("<strong className="text-gray-900 font-semibold">Customer</strong>", "<strong className="text-gray-900 font-semibold">you</strong>") and <strong className="text-gray-900 font-semibold">R-Zone Enterprises Ltd</strong>, a company registered in England and Wales with its registered office at Unit 10 Moorhen Yard, Elms Lane, Upminster, Essex RM14 3TS.</P>
              <P>By accessing our website, submitting a booking, or using any of our freight and logistics services, you confirm that you have read, understood, and agree to these Terms in their entirety. These Terms apply to all customers — individuals and businesses alike.</P>
              <P>We reserve the right to update these Terms at any time. Material changes will be communicated by email and posted on our website. Continued use of our services after notification constitutes acceptance of the revised Terms.</P>
            </Section>

            <Section id="t2" num="02" title="Our Services">
              <P>R-Zone Enterprises provides the following freight and logistics services between the United Kingdom and Nigeria:</P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {SERVICES_LIST.map(s => (
                  <div key={s.title} className="border border-gray-200 bg-gray-50 p-4 hover:border-[#0818A8]/30 transition-colors">
                    <p className="text-gray-900 font-bold text-[13.5px] mb-1">{s.icon} {s.title}</p>
                    <p className="text-gray-600 text-[12.5px] font-light leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
              <P>We act as a freight forwarder and customs agent. Where we sub-contract to carriers, we remain responsible to you for ensuring those carriers perform in accordance with these Terms.</P>
            </Section>

            <Section id="t3" num="03" title="Booking & Confirmation">
              <H3>3.1 — How to Book</H3>
              <P>Bookings may be made via our website, by telephone (+44 800 772 0864), by email, or in person at our Essex warehouse. A booking is not confirmed until you receive written confirmation from us including a booking reference number.</P>
              <H3>3.2 — Accuracy of Information</H3>
              <P>You are responsible for providing accurate and complete information at booking, including cargo description, weight, dimensions, declared value, collection address, and delivery address. Inaccuracies may result in additional charges, delays, or rejection of your cargo.</P>
              <H3>3.3 — Cut-Off Times</H3>
              <P>Sea freight shipments must be received by the cut-off date on our published sailing schedule. Air freight has a same-day cut-off of 12:00 noon on the departure day. We cannot guarantee inclusion if cargo arrives after the stated cut-off.</P>
              <H3>3.4 — Amendments</H3>
              <P>Amendments to confirmed bookings may incur additional charges. We will notify you of costs before making changes. Amendments to filed customs declarations are subject to customs authority approval.</P>
            </Section>

            <Section id="t4" num="04" title="Cargo Restrictions">
              <H3>4.1 — Prohibited Items (No Exceptions)</H3>
              <div className="border border-red-100 bg-red-50/60 p-5 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Ban size={14} className="text-red-600" aria-hidden="true" />
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-600">We will not carry these under any circumstances</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PROHIBITED.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-[0.48em]" aria-hidden="true" />
                      <span className="text-red-800 text-[12.5px] font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <H3>4.2 — Restricted Items (Prior Approval Required)</H3>
              <UL>{RESTRICTED.map((r, i) => <LI key={i}>{r}</LI>)}</UL>
              <Callout type="amber"><strong className="font-semibold">Customs liability:</strong> You are solely responsible for ensuring your cargo complies with all applicable UK export and Nigerian import regulations. We accept no liability for goods confiscated or detained by customs authorities due to your non-compliance.</Callout>
            </Section>

            <Section id="t5" num="05" title="Packaging Requirements">
              <P>All cargo must be packaged to withstand the normal rigours of international freight handling — including stacking, vibration, and changes in temperature and humidity.</P>
              <UL>
                <LI>Each item/box must be clearly labelled with sender name, recipient name, and destination address</LI>
                <LI>Fragile items must be marked and packed with appropriate protective material</LI>
                <LI>Liquids must be in sealed, leak-proof containers placed in secondary sealed bags</LI>
                <LI>Sharp objects must be wrapped to prevent damage to other cargo</LI>
                <LI>Maximum single item weight: 70kg (air freight), 500kg (sea freight)</LI>
              </UL>
              <P>R-Zone offers professional packing at an additional charge. We accept no liability for damage to inadequately packaged goods.</P>
            </Section>

            <Section id="t6" num="06" title="Customs & Import Duties">
              <H3>6.1 — Customer Responsibility</H3>
              <P>By accepting these Terms, you confirm all customs declaration information provided is true and complete to the best of your knowledge.</P>
              <H3>6.2 — Duties and Taxes</H3>
              <P>Import duties, taxes, and customs charges levied by the Nigeria Customs Service (NCS) or HMRC are payable by the recipient/you and are not included in our quoted rates unless explicitly stated. Where we pay duties on your behalf, we will invoice them directly to you.</P>
              <H3>6.3 — Delays and Seizure</H3>
              <P>We cannot be held responsible for delays caused by customs inspection, detention, or clearance procedures. Transit time estimates exclude customs processing time. If customs seize your cargo due to prohibited content or misdeclaration, you accept full liability for all resulting costs.</P>
              <Callout type="amber"><strong className="font-semibold">Misdeclaration warning:</strong> Providing false information to customs is a criminal offence in both the UK and Nigeria. R-Zone Enterprises will not assist in customs fraud and will cooperate fully with any investigation.</Callout>
            </Section>

            <Section id="t7" num="07" title="Pricing & Payment">
              <H3>7.1 — Quotations</H3>
              <P>All quotes are valid for 7 calendar days from the date of issue. Rates may change due to fuel surcharges, currency fluctuations, or carrier tariff changes. We notify you of changes before confirming.</P>
              <H3>7.2 — Volumetric Weight</H3>
              <div className="border border-gray-200 bg-gray-50 p-5 mb-5">
                <p className="text-[9.5px] font-bold tracking-[0.22em] uppercase text-gray-500 mb-3">Volumetric Weight Formula</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 bg-[#0818A8] flex items-center justify-center" aria-hidden="true">
                        <span className="text-white text-[10px]">✈</span>
                      </div>
                      <p className="text-gray-900 font-bold text-[12px]">Air Freight</p>
                    </div>
                    <p className="text-gray-700 text-[13px] font-light">L × W × H (cm) ÷ <strong className="text-gray-900 font-semibold">5,000</strong></p>
                  </div>
                  <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 bg-[#0818A8] flex items-center justify-center" aria-hidden="true">
                        <span className="text-white text-[10px]">🚢</span>
                      </div>
                      <p className="text-gray-900 font-bold text-[12px]">Sea Freight</p>
                    </div>
                    <p className="text-gray-700 text-[13px] font-light">L × W × H (cm) ÷ <strong className="text-gray-900 font-semibold">1,000</strong></p>
                  </div>
                </div>
                <p className="text-gray-600 text-[12px] font-light mt-3">We charge whichever is greater — actual weight or volumetric weight.</p>
              </div>
              <H3>7.3 — Payment Terms</H3>
              <UL>
                <LI><strong className="text-gray-900 font-semibold">Individual customers:</strong> Full payment required before cargo is accepted</LI>
                <LI><strong className="text-gray-900 font-semibold">Business accounts:</strong> Net 14 or 30-day payment terms may be agreed in writing</LI>
                <LI><strong className="text-gray-900 font-semibold">Accepted methods:</strong> Bank transfer (BACS/Faster Payments), debit/credit card, PayPal</LI>
              </UL>
              <H3>7.4 — Late Payment</H3>
              <P>Interest on overdue invoices is charged at 8% per annum above the Bank of England base rate, in accordance with the Late Payment of Commercial Debts (Interest) Act 1998.</P>
            </Section>

            <Section id="t8" num="08" title="Liability & Claims">
              <H3>8.1 — Air Freight Liability</H3>
              <P>For air freight, our liability is governed by the Warsaw Convention (as amended by Montreal Protocol) or the Montreal Convention 1999, whichever applies. Liability is limited to <strong className="text-gray-900 font-semibold">19 SDR per kilogram</strong> of cargo lost or damaged.</P>
              <H3>8.2 — Sea Freight Liability</H3>
              <P>For sea freight, liability is limited under the Hague-Visby Rules to <strong className="text-gray-900 font-semibold">666.67 SDR per package or 2 SDR per kilogram</strong>, whichever is higher.</P>
              <H3>8.3 — Exclusions</H3>
              <UL>
                <LI>Loss or damage from inadequate packaging by the customer</LI>
                <LI>Inherent defects or the natural nature of the goods</LI>
                <LI>Acts of God, force majeure, or circumstances beyond our reasonable control</LI>
                <LI>Delay caused by customs or regulatory authorities</LI>
                <LI>Confiscation of prohibited or restricted goods</LI>
                <LI>Consequential losses, loss of profit, or indirect losses of any kind</LI>
              </UL>
              <H3>8.4 — Claims Procedure</H3>
              <P>Submit all claims in writing to <a href="mailto:claims@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">claims@r-zoneenterprises.com</a> within <strong className="text-gray-900 font-semibold">7 days of delivery</strong> (damage) or <strong className="text-gray-900 font-semibold">14 days of expected delivery</strong> (loss). Include: booking reference, description, photographs, and estimated value.</P>
              <Callout type="blue"><strong className="font-semibold">Recommendation:</strong> Our carrier liability limits may be significantly lower than the value of your goods. We strongly recommend taking out cargo insurance on all shipments. See Section 9.</Callout>
            </Section>

            <Section id="t9" num="09" title="Insurance">
              <P>R-Zone Enterprises offers optional cargo insurance through our approved insurance partner. Premiums are calculated as a percentage of declared cargo value and must be arranged at the time of booking — not after.</P>
              <P>Where you choose not to purchase insurance, your claim in the event of loss or damage is limited to the carrier liability caps in Section 8, which may be substantially lower than the actual value of your goods.</P>
            </Section>

            <Section id="t10" num="10" title="Transit Times">
              <P>All transit times are estimates only — not guarantees. They represent typical performance under normal conditions and exclude customs processing time.</P>
              <BlueTable
                headers={["Service", "Typical Transit", "Notes"]}
                rows={TRANSIT_TABLE.map(r => [r.service, r.typical, r.note])}
              />
              <P>We will not be liable for any loss arising from delays, however caused, unless due to our gross negligence or wilful default. Time is not of the essence in any contract with R-Zone Enterprises.</P>
            </Section>

            <Section id="t11" num="11" title="Loss, Damage & Delay">
              <P>In the event your cargo is lost, damaged, or significantly delayed, contact us immediately at <a href="tel:+448007720864" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">+44 800 772 0864</a> or <a href="mailto:info@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">info@r-zoneenterprises.com</a>.</P>
              <P>We investigate all reported incidents thoroughly. Our internal investigation typically completes within 10–14 working days. Where cargo cannot be located within 30 days of the expected delivery date, it will be treated as lost and any valid claim processed per Section 8.</P>
            </Section>

            <Section id="t12" num="12" title="Cancellations & Refunds">
              <BlueTable
                headers={["Timing of Cancellation", "Refund Policy"]}
                rows={CANCELLATION_TABLE.map(r => [r.timing, r.refund])}
                minWidth={400}
              />
              <H3>12.2 — Cancellation by Us</H3>
              <P>If we cancel or significantly delay a sailing or flight departure, we'll offer a full refund or transfer to the next available departure at no additional cost.</P>
              <H3>12.3 — Consumer Rights</H3>
              <P>Online bookings may carry a 14-day right to cancel under the Consumer Contracts Regulations 2013. This right does not apply once we have commenced performance at your request.</P>
            </Section>

            <Section id="t13" num="13" title="Customer Obligations">
              <P>By using our services you agree to:</P>
              <UL>
                <LI>Provide accurate and complete information at all times</LI>
                <LI>Comply with all applicable UK and Nigerian laws, regulations, and customs requirements</LI>
                <LI>Not tender prohibited or restricted goods without prior written approval</LI>
                <LI>Package goods adequately for international freight</LI>
                <LI>Provide correct recipient contact details including a valid Nigerian phone number</LI>
                <LI>Ensure the recipient is available to receive delivery or arrange an alternative</LI>
                <LI>Pay all amounts due in accordance with our payment terms</LI>
                <LI>Indemnify R-Zone against costs, claims, or liabilities arising from your failure to comply</LI>
              </UL>
            </Section>

            <Section id="t14" num="14" title="Intellectual Property">
              <P>All content on our website — including text, graphics, logos, images, and software — is the property of R-Zone Enterprises Ltd and is protected by UK and international intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</P>
            </Section>

            <Section id="t15" num="15" title="Termination">
              <P>We reserve the right to refuse service, suspend or terminate your account, and/or cancel any pending bookings if you breach these Terms, provide fraudulent information, or where we reasonably suspect illegal activity. In such cases, no refund will be due and you remain liable for any outstanding amounts.</P>
            </Section>

            <Section id="t16" num="16" title="Governing Law">
              <P>These Terms are governed by and construed in accordance with the laws of <strong className="text-gray-900 font-semibold">England and Wales</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</P>
              <P>Before commencing legal proceedings, we encourage resolution through our complaints process: <a href="mailto:complaints@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">complaints@r-zoneenterprises.com</a>. We aim to resolve all complaints within 14 working days.</P>
              <H3>16.1 — Severability</H3>
              <P>If any provision of these Terms is found unenforceable, that provision shall be limited to the minimum extent necessary so that the Terms otherwise remain in full force and effect.</P>
            </Section>

            <Section id="t17" num="17" title="Contact">
              <P>For questions about these Terms of Service:</P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
                {[
                  { label: "Legal & Compliance", val: "legal@r-zoneenterprises.com",      href: "mailto:legal@r-zoneenterprises.com",      icon: Scale   },
                  { label: "Claims",             val: "claims@r-zoneenterprises.com",     href: "mailto:claims@r-zoneenterprises.com",     icon: Shield  },
                  { label: "Complaints",         val: "complaints@r-zoneenterprises.com", href: "mailto:complaints@r-zoneenterprises.com", icon: Info    },
                  { label: "Phone",              val: "+44 800 772 0864",                 href: "tel:+448007720864",                       icon: Phone   },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="border border-gray-200 bg-gray-50 p-5 hover:border-[#0818A8]/25 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={13} className="text-[#0818A8]" aria-hidden="true" />
                        <p className="text-[9.5px] font-bold tracking-[0.2em] uppercase text-gray-500">{item.label}</p>
                      </div>
                      <a href={item.href} className="text-gray-800 font-semibold text-[13px] hover:text-[#0818A8] transition-colors break-all">{item.val}</a>
                    </div>
                  );
                })}
              </div>

              <div className="border border-gray-200 divide-y divide-gray-100">
                {[
                  { q: "Can I ship personal items from the UK to Nigeria?", a: "Yes, we accept personal effects including clothing, food items, and household goods. Some items require NAFDAC compliance for entry into Nigeria. Contact us if you're unsure about a specific item." },
                  { q: "What happens if my cargo is delayed?", a: "We will notify you of any delays as soon as we become aware. Transit delays caused by customs, weather, or carrier issues are outside our control and don't constitute a breach of contract. If you purchased cargo insurance, delays may be covered under your policy." },
                  { q: "How do I make a claim for lost cargo?", a: "Email claims@r-zoneenterprises.com within 14 days of the expected delivery date with your booking reference, description of the goods, and declared value. We will investigate and respond within 10–14 working days." },
                  { q: "Do you offer credit terms for businesses?", a: "Yes, businesses that trade regularly with us can apply for 14 or 30-day credit terms. Contact our accounts team to discuss eligibility." },
                ].map((item, i) => <FAQ key={i} q={item.q} a={item.a} />)}
              </div>
            </Section>

            {/* Footer CTA */}
            <div className="mt-12 border border-[#0818A8]/20 bg-[#0818A8]/4 p-7 md:p-9">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-[9.5px] font-bold tracking-[0.28em] uppercase text-[#0818A8] mb-1">Ready to Ship?</p>
                  <h3 className="text-gray-900 font-black text-[20px] tracking-[-0.01em]">Get a Free Quote Today.</h3>
                  <p className="text-gray-600 text-[13.5px] font-light mt-1">Same-day response from our UK-based team.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/quote" className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25" aria-label="Get a free shipping quote">
                    <Package size={12} aria-hidden="true" /> Get a Quote
                  </Link>
                  <Link href="/" className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:border-[#0818A8] hover:text-[#0818A8] text-[11.5px] font-bold tracking-[0.06em] uppercase px-6 py-3 transition-all duration-200" aria-label="Back to R-Zone Enterprises">
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