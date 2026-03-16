"use client";

import { Montserrat } from "next/font/google";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Shield, ChevronRight, ArrowLeft, Phone,
  Mail, ExternalLink, Check, ChevronDown,
  ChevronUp, Lock, Eye, Database, Globe,
  Clock, AlertCircle, Users, FileText,
  ArrowRight, Menu, X,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Table of contents ────────────────────────────────────────────────────────
const TOC = [
  { id: "s1",  label: "Who We Are",                     num: "01" },
  { id: "s2",  label: "Data We Collect",                num: "02" },
  { id: "s3",  label: "How We Use Your Data",           num: "03" },
  { id: "s4",  label: "Legal Basis",                    num: "04" },
  { id: "s5",  label: "Data Sharing",                   num: "05" },
  { id: "s6",  label: "International Transfers",        num: "06" },
  { id: "s7",  label: "Retention",                      num: "07" },
  { id: "s8",  label: "Your Rights",                    num: "08" },
  { id: "s9",  label: "Cookies",                        num: "09" },
  { id: "s10", label: "Security",                       num: "10" },
  { id: "s11", label: "Children",                       num: "11" },
  { id: "s12", label: "Changes",                        num: "12" },
  { id: "s13", label: "Contact & DPO",                  num: "13" },
];

const RIGHTS = [
  { icon: Eye,      title: "Right of Access",          body: "Request a copy of all personal data we hold about you. We respond within one calendar month at no charge." },
  { icon: FileText, title: "Right to Rectification",   body: "Request correction of inaccurate or incomplete personal data. We correct verified inaccuracies promptly." },
  { icon: X,        title: "Right to Erasure",         body: "Request deletion of your data where it is no longer necessary, you withdraw consent, or it was unlawfully processed." },
  { icon: Lock,     title: "Right to Restrict",        body: "Request that we restrict processing your data while a complaint is being resolved or accuracy disputed." },
  { icon: Database, title: "Right to Portability",     body: "Receive your data in a structured, machine-readable format (JSON or CSV) where processing is based on consent or contract." },
  { icon: AlertCircle, title: "Right to Object",       body: "Object to processing based on legitimate interests at any time. Absolute right to object to direct marketing." },
  { icon: Users,    title: "No Automated Decisions",   body: "We do not make solely automated decisions with legal effect. All significant decisions involve human review." },
  { icon: Shield,   title: "Right to Complain",        body: "Lodge a complaint with the ICO at ico.org.uk or call 0303 123 1113 if you believe we've mishandled your data." },
];

const DATA_TABLE = [
  { purpose: "Processing & managing cargo shipments",   data: "Identity, Contact, Shipment",     basis: "Contract" },
  { purpose: "Processing payments & issuing invoices",  data: "Identity, Payment, Contact",      basis: "Contract" },
  { purpose: "UK & Nigeria customs clearance",          data: "Identity, Shipment",              basis: "Legal obligation" },
  { purpose: "Real-time shipment tracking",             data: "Shipment, Technical",             basis: "Contract" },
  { purpose: "Customer service communications",         data: "Identity, Contact, Communication",basis: "Contract / Legitimate interest" },
  { purpose: "Marketing communications",                data: "Identity, Contact",               basis: "Consent" },
  { purpose: "Fraud prevention & security",             data: "Identity, Technical, Usage",      basis: "Legitimate interest" },
  { purpose: "Website analytics",                       data: "Technical, Usage, Cookie",        basis: "Consent" },
  { purpose: "Legal & regulatory obligations",          data: "All categories as required",      basis: "Legal obligation" },
];

const RETENTION_TABLE = [
  { category: "Customer account data",           period: "6 years after last transaction", reason: "HMRC record-keeping" },
  { category: "Shipment & customs records",      period: "6 years from shipment date",     reason: "Legal obligation (CEMA 1979)" },
  { category: "Payment records",                 period: "6 years",                        reason: "Companies Act / HMRC" },
  { category: "Marketing consent records",       period: "3 years after withdrawal",       reason: "ICO guidance" },
  { category: "Customer service communications", period: "3 years",                        reason: "Dispute resolution" },
  { category: "Website analytics (anonymised)",  period: "26 months",                      reason: "Industry standard" },
  { category: "CCTV at premises",               period: "30 days",                        reason: "Security" },
];

// ─── FAQ accordion item ───────────────────────────────────────────────────────
function FAQ({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className={`text-[14px] font-semibold leading-snug transition-colors duration-150 ${open ? "text-[#0818A8]" : "text-gray-800 group-hover:text-[#0818A8]"}`}>
          {q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-0.5" aria-hidden="true">
          <ChevronDown size={16} className={open ? "text-[#0818A8]" : "text-gray-400"} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="text-gray-700 text-[13.5px] font-light leading-relaxed pb-5 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ id, num, title, children }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      className="scroll-mt-[80px] py-10 border-b border-gray-100 last:border-0"
      aria-labelledby={`${id}-heading`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Section header */}
      <div className="flex items-start gap-5 mb-7">
        <div className="flex-shrink-0 w-10 h-10 bg-[#0818A8] flex items-center justify-center" aria-hidden="true">
          <span className="text-white font-black text-[11px] tracking-[0.06em]">{num}</span>
        </div>
        <h2
          id={`${id}-heading`}
          className="font-black text-[clamp(18px,2.8vw,26px)] text-gray-900 leading-tight tracking-[-0.02em] pt-1.5"
        >
          {title}
        </h2>
      </div>
      <div className="pl-[60px]">
        {children}
      </div>
    </motion.section>
  );
}

// ─── Inline callout ───────────────────────────────────────────────────────────
function Callout({ type = "blue", children }) {
  const styles = {
    blue:  "border-l-[3px] border-[#0818A8] bg-[#0818A8]/4 text-gray-800",
    amber: "border-l-[3px] border-amber-500 bg-amber-50 text-amber-900",
    green: "border-l-[3px] border-emerald-600 bg-emerald-50 text-emerald-900",
  };
  return (
    <div className={`px-5 py-4 my-6 text-[13px] font-light leading-relaxed ${styles[type]}`}>
      {children}
    </div>
  );
}

// ─── Body text ────────────────────────────────────────────────────────────────
function P({ children, className = "" }) {
  return <p className={`text-gray-700 text-[14px] font-light leading-relaxed mb-4 ${className}`}>{children}</p>;
}

function H3({ children }) {
  return <h3 className="text-gray-900 font-bold text-[13px] tracking-[0.08em] uppercase mb-3 mt-6">{children}</h3>;
}

function UL({ children }) {
  return <ul className="space-y-2.5 mb-5">{children}</ul>;
}

function LI({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8] flex-shrink-0 mt-[0.45em]" aria-hidden="true" />
      <span className="text-gray-700 text-[13.5px] font-light leading-relaxed">{children}</span>
    </li>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PrivacyPage() {
  const [activeId,   setActiveId]   = useState("s1");
  const [tocMobile,  setTocMobile]  = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Active section tracker
  useEffect(() => {
    const observers = [];
    TOC.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(item.id); },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white min-h-screen`}>

      {/* ── SEO schema ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy — R-Zone Enterprises",
        "url": "https://r-zoneenterprises.com/privacy",
        "description": "R-Zone Enterprises Privacy Policy under UK GDPR and the Data Protection Act 2018.",
        "dateModified": "2025-01-15",
        "publisher": { "@type": "Organization", "name": "R-Zone Enterprises", "url": "https://r-zoneenterprises.com" },
      })}} />

      {/* ── TOP UTILITY BAR ── */}
      <div className="bg-[#0818A8]" role="complementary" aria-label="Contact bar">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 h-9 flex items-center justify-between">
          <p className="text-white/80 text-[11px] font-medium tracking-[0.02em]">
            R-Zone Enterprises — Legal &amp; Compliance
          </p>
          <div className="hidden sm:flex items-center gap-6">
            <a href="tel:+448007720864" className="flex items-center gap-1.5 text-white/75 hover:text-white text-[11px] font-medium transition-colors" aria-label="Call R-Zone: +44 800 772 0864">
              <Phone size={10} aria-hidden="true" /> +44 800 772 0864
            </a>
            <a href="mailto:privacy@r-zoneenterprises.com" className="flex items-center gap-1.5 text-white/75 hover:text-white text-[11px] font-medium transition-colors" aria-label="Email privacy team">
              <Mail size={10} aria-hidden="true" /> privacy@r-zoneenterprises.com
            </a>
          </div>
        </div>
      </div>

      
      {/* ── PAGE HERO ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-16">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-gray-500 text-[11.5px] font-medium hover:text-gray-800 transition-colors">Home</Link>
            <ChevronRight size={11} className="text-gray-300" aria-hidden="true" />
            <span className="text-gray-800 text-[11.5px] font-medium" aria-current="page">Privacy Policy</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#0818A8] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Shield size={20} className="text-white" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[#0818A8]/30 to-transparent" aria-hidden="true" />
              </div>
              <h1 className="font-black text-[clamp(32px,6vw,64px)] text-gray-900 leading-[0.88] tracking-[-0.035em] uppercase mb-5">
                Privacy
                <br />
                <span className="text-[#0818A8]">Policy.</span>
              </h1>
              <p className="text-gray-600 text-[15px] font-light leading-relaxed max-w-lg">
                We believe privacy is a right, not a checkbox. This policy explains exactly what personal data R-Zone Enterprises collects, how we use it, and the rights you hold over it — in plain language.
              </p>
            </div>

            {/* Right — meta card */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Last Updated",    val: "15 January 2025",          icon: Clock    },
                { label: "Version",         val: "v3.0 — 2025",              icon: FileText },
                { label: "Jurisdiction",    val: "England & Wales",          icon: Globe    },
                { label: "Framework",       val: "UK GDPR · DPA 2018",       icon: Shield   },
              ].map(({ label, val, icon: Icon }) => (
                <div key={label} className="border border-gray-200 bg-gray-50 p-4 hover:border-[#0818A8]/25 transition-colors">
                  <Icon size={13} className="text-[#0818A8] mb-2" aria-hidden="true" />
                  <p className="text-[9.5px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-0.5">{label}</p>
                  <p className="text-gray-800 font-semibold text-[12.5px] leading-snug">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile TOC toggle */}
          <div className="mt-8 lg:hidden">
            <button
              onClick={() => setTocMobile(o => !o)}
              className="w-full flex items-center justify-between border border-gray-200 bg-gray-50 hover:bg-gray-100 px-5 py-3.5 transition-colors"
              aria-expanded={tocMobile}
            >
              <span className="text-[13px] font-bold text-gray-800">Table of Contents</span>
              <ChevronDown size={15} className={`text-gray-500 transition-transform ${tocMobile ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {tocMobile && (
                <motion.nav
                  initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden border border-t-0 border-gray-200"
                  aria-label="Page table of contents"
                >
                  <div className="grid grid-cols-2 gap-0">
                    {TOC.map(item => (
                      <a key={item.id} href={`#${item.id}`}
                        onClick={() => setTocMobile(false)}
                        className={`flex items-center gap-2.5 px-4 py-3 border-b border-r border-gray-100 text-[12px] transition-colors odd:border-r even:border-r-0 ${
                          activeId === item.id ? "bg-[#0818A8]/5 text-[#0818A8] font-semibold" : "text-gray-700 hover:bg-gray-50"
                        }`}>
                        <span className="text-[9px] font-black text-gray-400 font-[family-name:var(--font-montserrat)]">{item.num}</span>
                        {item.label}
                      </a>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">

          {/* ── STICKY SIDEBAR TOC ── */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2" aria-label="Table of contents">
            <div className="sticky top-[74px]">
              <p className="text-[9px] font-black tracking-[0.35em] uppercase text-gray-400 mb-4 px-1">Contents</p>
              <nav aria-label="Section navigation">
                {TOC.map(item => (
                  <a key={item.id} href={`#${item.id}`}
                    className={`group flex items-center gap-3 px-3 py-2.5 text-[12px] border-l-2 transition-all duration-150 ${
                      activeId === item.id
                        ? "border-[#0818A8] text-[#0818A8] font-semibold bg-[#0818A8]/4"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    aria-current={activeId === item.id ? "true" : undefined}
                  >
                    <span className={`text-[9px] font-black flex-shrink-0 ${activeId === item.id ? "text-[#0818A8]" : "text-gray-400"}`}>
                      {item.num}
                    </span>
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Contact card */}
              <div className="mt-6 border border-[#0818A8]/15 bg-[#0818A8]/4 p-4">
                <Shield size={14} className="text-[#0818A8] mb-2" aria-hidden="true" />
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0818A8] mb-2">DPO Contact</p>
                <a href="mailto:privacy@r-zoneenterprises.com"
                  className="text-[11.5px] font-semibold text-gray-800 hover:text-[#0818A8] transition-colors block leading-snug break-all"
                  aria-label="Email privacy team">
                  privacy@r-zoneenterprises.com
                </a>
                <p className="text-gray-600 text-[11px] font-light mt-1">Responds within 1 business day</p>
              </div>
            </div>
          </aside>

          {/* ── DOCUMENT CONTENT ── */}
          <main className="lg:col-span-9 xl:col-span-10 min-w-0" id="main-content">

            {/* ─── S1 — WHO WE ARE ─── */}
            <Section id="s1" num="01" title="Who We Are">
              <P>
                R-Zone Enterprises ("<strong className="text-gray-900 font-semibold">we</strong>", "<strong className="text-gray-900 font-semibold">us</strong>", "<strong className="text-gray-900 font-semibold">our</strong>") is a UK-based freight and logistics company. We operate as <strong className="text-gray-900 font-semibold">R-Zone Enterprises Ltd</strong>, registered in England and Wales, with our registered office at:
              </P>
              <div className="border border-gray-200 bg-gray-50 px-5 py-4 mb-5 inline-block">
                <p className="text-gray-800 text-[13.5px] font-medium leading-relaxed">
                  Unit 10 Moorhen Yard, Elms Lane<br />
                  Upminster, Essex RM14 3TS<br />
                  United Kingdom
                </p>
              </div>
              <P>
                We are the <strong className="text-gray-900 font-semibold">data controller</strong> for personal data collected through our website at <a href="https://r-zoneenterprises.com" target="_blank" rel="noopener noreferrer" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">r-zoneenterprises.com</a>, our mobile applications, and through our cargo and logistics services.
              </P>
              <P>
                This Privacy Policy explains how we handle personal data in accordance with the <strong className="text-gray-900 font-semibold">UK General Data Protection Regulation (UK GDPR)</strong>, the <strong className="text-gray-900 font-semibold">Data Protection Act 2018</strong>, and all applicable data protection legislation.
              </P>
              <Callout type="blue">
                <strong className="font-semibold">In plain terms:</strong> We are R-Zone Enterprises Ltd, based in Essex, UK. We're the company responsible for your personal data. This policy is written to be clear — not to hide anything. If you have questions after reading it, we'd love to hear from you.
              </Callout>
            </Section>

            {/* ─── S2 — DATA WE COLLECT ─── */}
            <Section id="s2" num="02" title="Data We Collect">
              <P>We collect personal data in three ways: directly from you, automatically, and from third parties.</P>

              <H3>2.1 — Data You Provide Directly</H3>
              <UL>
                <LI><strong className="text-gray-900 font-semibold">Identity data:</strong> full name, date of birth, passport or ID number (where required for customs)</LI>
                <LI><strong className="text-gray-900 font-semibold">Contact data:</strong> email address, phone number, UK and Nigeria addresses</LI>
                <LI><strong className="text-gray-900 font-semibold">Shipment data:</strong> cargo description, weight, dimensions, declared value, origin, destination</LI>
                <LI><strong className="text-gray-900 font-semibold">Payment data:</strong> billing address and payment method — we do not store full card details, which are handled by PCI-DSS compliant processors</LI>
                <LI><strong className="text-gray-900 font-semibold">Communication data:</strong> records of your correspondence with us by phone, email, or contact forms</LI>
                <LI><strong className="text-gray-900 font-semibold">Account data:</strong> username, hashed password, booking history, preferences</LI>
              </UL>

              <H3>2.2 — Data Collected Automatically</H3>
              <UL>
                <LI><strong className="text-gray-900 font-semibold">Technical data:</strong> IP address, browser type and version, device identifiers, time zone</LI>
                <LI><strong className="text-gray-900 font-semibold">Usage data:</strong> pages visited, time on page, links clicked, referral source</LI>
                <LI><strong className="text-gray-900 font-semibold">Cookie data:</strong> see our <a href="/cookies" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">Cookie Policy</a> for full details</LI>
              </UL>

              <H3>2.3 — Data From Third Parties</H3>
              <UL>
                <LI>Business partners and referral sources who confirm your data may be shared</LI>
                <LI>HMRC and Nigeria Customs Service for import/export compliance</LI>
                <LI>Credit reference and fraud prevention agencies</LI>
                <LI>Publicly available sources such as Companies House</LI>
              </UL>

              <Callout type="blue">
                <strong className="font-semibold">Special categories:</strong> We do not intentionally collect sensitive personal data (health, religion, biometrics) unless specifically required by customs regulations. Where required, we apply heightened security and only process with your explicit consent or as required by law.
              </Callout>
            </Section>

            {/* ─── S3 — HOW WE USE ─── */}
            <Section id="s3" num="03" title="How We Use Your Data">
              <P>We use your personal data only for legitimate business purposes. The table below sets out every use alongside the legal basis we rely on.</P>

              <div className="overflow-x-auto mb-6 border border-gray-200">
                <table className="w-full" style={{ minWidth: "520px" }} aria-label="Data processing purposes and legal bases">
                  <thead>
                    <tr className="bg-[#0818A8]">
                      <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.18em] uppercase text-white">Purpose</th>
                      <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.18em] uppercase text-white hidden sm:table-cell">Data Used</th>
                      <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.18em] uppercase text-white whitespace-nowrap">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DATA_TABLE.map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-[#0818A8]/3 transition-colors`}>
                        <td className="px-5 py-3 text-[13px] text-gray-700 font-light leading-snug">{row.purpose}</td>
                        <td className="px-5 py-3 text-[12px] text-gray-600 font-light hidden sm:table-cell">{row.data}</td>
                        <td className="px-5 py-3">
                          <span className="inline-block text-[10.5px] font-semibold text-[#0818A8] bg-[#0818A8]/8 px-2.5 py-1 whitespace-nowrap">{row.basis}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <H3>3.1 — Marketing Communications</H3>
              <P>
                We only send marketing emails or SMS if you have given us <strong className="text-gray-900 font-semibold">explicit consent</strong>. You can withdraw consent at any time — click "unsubscribe" in any email, text STOP to any SMS, or email <a href="mailto:privacy@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">privacy@r-zoneenterprises.com</a>. We will never sell or share your contact details for others' marketing purposes.
              </P>
            </Section>

            {/* ─── S4 — LEGAL BASIS ─── */}
            <Section id="s4" num="04" title="Legal Basis for Processing">
              <P>Under UK GDPR, every act of data processing must have a lawful basis. Here are the bases we rely on:</P>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { basis: "Contract Performance", article: "Art. 6(1)(b)", desc: "Processing necessary to fulfil your shipping contract — booking, dispatch, delivery, invoicing.", color: "#0818A8" },
                  { basis: "Legal Obligation",     article: "Art. 6(1)(c)", desc: "Where we are legally required to process data — customs declarations, HMRC reporting, AML checks.", color: "#1F51FF" },
                  { basis: "Legitimate Interests", article: "Art. 6(1)(f)", desc: "Fraud detection, network security, and business communications where our interests don't override yours.", color: "#0437F2" },
                  { basis: "Consent",              article: "Art. 6(1)(a)", desc: "Marketing communications and non-essential cookies — you may withdraw consent at any time.", color: "#0818A8" },
                ].map(item => (
                  <div key={item.basis} className="border border-gray-200 bg-white p-4 hover:border-[#0818A8]/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-900 font-bold text-[13px]">{item.basis}</p>
                      <span className="text-[10px] font-bold text-[#0818A8] bg-[#0818A8]/8 px-2 py-0.5">{item.article}</span>
                    </div>
                    <p className="text-gray-600 text-[12.5px] font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Callout type="blue">
                <strong className="font-semibold">Right to object:</strong> Where we rely on legitimate interests, you have the right to object to our processing. We will stop unless we can demonstrate compelling legitimate grounds that override your interests. See Section 8.
              </Callout>
            </Section>

            {/* ─── S5 — DATA SHARING ─── */}
            <Section id="s5" num="05" title="Data Sharing">
              <P>We share your personal data only where necessary. We never sell it.</P>

              <H3>5.1 — Service Providers (Processors)</H3>
              <UL>
                <LI><strong className="text-gray-900 font-semibold">Airlines & carriers:</strong> British Airways, Virgin Atlantic, Emirates, Ethiopian Airlines — for booking cargo space and issuing air waybills</LI>
                <LI><strong className="text-gray-900 font-semibold">Customs agents:</strong> In Nigeria and the UK, to handle port clearance and regulatory filings</LI>
                <LI><strong className="text-gray-900 font-semibold">Payment processors:</strong> Stripe and PayPal — PCI-DSS Level 1 compliant</LI>
                <LI><strong className="text-gray-900 font-semibold">IT service providers:</strong> Cloud hosting, email delivery, CRM — all subject to data processing agreements</LI>
                <LI><strong className="text-gray-900 font-semibold">Analytics:</strong> Google Analytics — anonymised and only with your cookie consent</LI>
              </UL>

              <H3>5.2 — Regulatory & Government Bodies</H3>
              <UL>
                <LI>HM Revenue & Customs (HMRC) — UK import/export compliance</LI>
                <LI>Nigeria Customs Service (NCS) — Nigerian import/export declarations</LI>
                <LI>UK Border Force — where required for customs inspections</LI>
                <LI>Law enforcement agencies — where required by law or court order</LI>
              </UL>

              <div className="border border-gray-200 bg-gray-50 p-5 mb-5">
                <p className="text-[9.5px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-3">Our Three Absolute Rules</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    "We never sell your personal data to any third party",
                    "We never share your data with advertisers or data brokers",
                    "We never allow third parties to use your data for their marketing",
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 bg-[#0818A8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                        <Check size={10} className="text-white" />
                      </div>
                      <p className="text-gray-700 text-[12.5px] font-light leading-snug">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Callout type="blue">
                <strong className="font-semibold">Processor agreements:</strong> All third-party processors are bound by written data processing agreements compliant with UK GDPR Article 28, ensuring your data is processed only on our instructions with adequate security.
              </Callout>
            </Section>

            {/* ─── S6 — INTERNATIONAL TRANSFERS ─── */}
            <Section id="s6" num="06" title="International Transfers">
              <P>
                Our operations span the UK and Nigeria. As part of our service, your personal data will be transferred to Nigeria — specifically to our Lagos operations hub — to facilitate customs clearance and last-mile delivery.
              </P>
              <P>
                Nigeria is not currently recognised by the UK as providing an adequate level of data protection under UK GDPR. Where data is transferred to Nigeria, we rely on the following safeguards:
              </P>
              <UL>
                <LI><strong className="text-gray-900 font-semibold">UK International Data Transfer Agreements (IDTAs):</strong> We use IDTAs with our Nigerian partners as required by the ICO</LI>
                <LI><strong className="text-gray-900 font-semibold">Contractual necessity:</strong> Where transfers are strictly necessary for performance of your shipping contract</LI>
                <LI><strong className="text-gray-900 font-semibold">Explicit consent:</strong> For any other transfers where you have been informed and agreed</LI>
              </UL>
              <P>
                To receive a copy of the safeguards we apply, contact <a href="mailto:privacy@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">privacy@r-zoneenterprises.com</a>.
              </P>
            </Section>

            {/* ─── S7 — RETENTION ─── */}
            <Section id="s7" num="07" title="Data Retention">
              <P>We keep personal data only for as long as necessary. Here is our retention schedule:</P>

              <div className="overflow-x-auto mb-5 border border-gray-200">
                <table className="w-full" style={{ minWidth: "480px" }} aria-label="Data retention periods">
                  <thead>
                    <tr className="bg-[#0818A8]">
                      <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.18em] uppercase text-white">Data Category</th>
                      <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.18em] uppercase text-white whitespace-nowrap">Retention Period</th>
                      <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.18em] uppercase text-white hidden sm:table-cell">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RETENTION_TABLE.map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-[#0818A8]/3 transition-colors`}>
                        <td className="px-5 py-3 text-[13px] text-gray-700 font-light">{row.category}</td>
                        <td className="px-5 py-3 text-[13px] text-gray-800 font-semibold whitespace-nowrap">{row.period}</td>
                        <td className="px-5 py-3 text-[12px] text-gray-600 font-light hidden sm:table-cell">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <P>When data is no longer required, we securely delete or irreversibly anonymise it. We periodically review all data we hold to ensure it remains accurate and necessary.</P>
            </Section>

            {/* ─── S8 — YOUR RIGHTS ─── */}
            <Section id="s8" num="08" title="Your Rights">
              <P>Under UK GDPR, you have eight rights over your personal data. Here they are — plainly.</P>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
                {RIGHTS.map((right) => {
                  const Icon = right.icon;
                  return (
                    <div key={right.title}
                      className="group border border-gray-200 bg-white p-5 hover:border-[#0818A8]/40 hover:shadow-md hover:shadow-[#0818A8]/8 transition-all duration-200 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-[#0818A8]" aria-hidden="true" />
                      <div className="flex items-start gap-3.5">
                        <div className="w-8 h-8 bg-[#0818A8]/8 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                          <Icon size={14} className="text-[#0818A8]" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold text-[13px] mb-1.5">{right.title}</p>
                          <p className="text-gray-600 text-[12.5px] font-light leading-relaxed">{right.body}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <H3>How to Exercise Your Rights</H3>
              <P>Email <a href="mailto:privacy@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">privacy@r-zoneenterprises.com</a> or write to our registered address. We respond within <strong className="text-gray-900 font-semibold">one calendar month</strong>. Complex requests may be extended by a further two months — we will notify you.</P>

              <div className="border border-gray-200 bg-gray-50 p-5">
                <p className="text-[9.5px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-3">Right to Complain — ICO</p>
                <p className="text-gray-700 text-[13.5px] font-light leading-relaxed mb-3">
                  If you're not satisfied with how we've handled your data, you can complain to the Information Commissioner's Office.
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#0818A8] text-[12.5px] font-semibold hover:text-[#0437F2] transition-colors" aria-label="Visit ICO website">
                    ico.org.uk <ExternalLink size={10} aria-hidden="true" />
                  </a>
                  <span className="text-gray-700 text-[12.5px] font-light">0303 123 1113</span>
                  <span className="text-gray-700 text-[12.5px] font-light">Wycliffe House, Wilmslow, SK9 5AF</span>
                </div>
              </div>
            </Section>

            {/* ─── S9 — COOKIES ─── */}
            <Section id="s9" num="09" title="Cookies">
              <P>
                We use cookies and similar tracking technologies on our website. Non-essential cookies (analytics, marketing) are only placed on your device with your prior consent, obtained through our cookie banner.
              </P>
              <P>
                For full details of every cookie we use, how long they last, and how to manage your preferences, read our dedicated <a href="/cookies" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">Cookie Policy</a>.
              </P>
            </Section>

            {/* ─── S10 — SECURITY ─── */}
            <Section id="s10" num="10" title="Security">
              <P>We implement appropriate technical and organisational measures to protect your personal data. Our security programme includes:</P>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {[
                  "TLS/HTTPS encryption for all data in transit",
                  "AES-256 encryption for sensitive data at rest",
                  "Multi-factor authentication for staff systems",
                  "Role-based access controls — staff see only what they need",
                  "Regular security audits and penetration testing",
                  "Annual mandatory data protection training for all staff",
                  "Incident response plan for data breaches",
                  "Physical access controls at our warehouse facilities",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 border border-gray-100 bg-gray-50 px-4 py-3">
                    <div className="w-5 h-5 bg-[#0818A8] rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Check size={9} className="text-white" />
                    </div>
                    <p className="text-gray-700 text-[12.5px] font-light leading-tight">{item}</p>
                  </div>
                ))}
              </div>

              <Callout type="green">
                <strong className="font-semibold">Data breach notification:</strong> In the event of a personal data breach likely to risk your rights and freedoms, we will notify the ICO within 72 hours and inform you without undue delay — as required by UK GDPR Articles 33 and 34.
              </Callout>
            </Section>

            {/* ─── S11 — CHILDREN ─── */}
            <Section id="s11" num="11" title="Children's Privacy">
              <P>
                Our services are intended for individuals aged 18 and over. We do not knowingly collect personal data from children under 18. If you believe your child has provided us with personal data without your consent, please email <a href="mailto:privacy@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">privacy@r-zoneenterprises.com</a> immediately. We will delete the data promptly and without charge.
              </P>
            </Section>

            {/* ─── S12 — CHANGES ─── */}
            <Section id="s12" num="12" title="Changes to This Policy">
              <P>
                We review this Privacy Policy regularly. We will notify you of material changes by email (where we hold your address) and by posting a notice on our website. The "Last Updated" date at the top of this policy will reflect any revision.
              </P>
              <P>
                Continued use of our services after notification of a change constitutes your acceptance of the revised policy. If you disagree with any change, please stop using our services and contact us to close your account and request data deletion.
              </P>
            </Section>

            {/* ─── S13 — CONTACT & DPO ─── */}
            <Section id="s13" num="13" title="Contact & DPO">
              <P>For any questions, requests, or concerns about this Privacy Policy or your personal data:</P>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
                {[
                  { label: "Data Protection",   val: "privacy@r-zoneenterprises.com",  href: "mailto:privacy@r-zoneenterprises.com",  icon: Shield   },
                  { label: "General Enquiries", val: "info@r-zoneenterprises.com",      href: "mailto:info@r-zoneenterprises.com",      icon: Mail     },
                  { label: "Phone",             val: "+44 800 772 0864",                href: "tel:+448007720864",                      icon: Phone    },
                  { label: "Post",              val: "Unit 10 Moorhen Yard, Elms Lane, Upminster, Essex RM14 3TS", href: null, icon: Globe },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="border border-gray-200 bg-gray-50 p-5 hover:border-[#0818A8]/25 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={13} className="text-[#0818A8]" aria-hidden="true" />
                        <p className="text-[9.5px] font-bold tracking-[0.2em] uppercase text-gray-500">{item.label}</p>
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-gray-800 font-semibold text-[13px] hover:text-[#0818A8] transition-colors break-all">
                          {item.val}
                        </a>
                      ) : (
                        <p className="text-gray-800 font-light text-[13px] leading-snug">{item.val}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Common questions */}
              <H3>Common Questions</H3>
              <div className="border border-gray-200 divide-y divide-gray-100">
                {[
                  { q: "How do I request a copy of my data?",       a: "Email privacy@r-zoneenterprises.com with the subject line 'Subject Access Request'. Include your name and the email address associated with your account. We respond within one calendar month at no charge." },
                  { q: "How do I delete my account and data?",       a: "Email privacy@r-zoneenterprises.com with the subject 'Erasure Request'. Note: we are legally required to retain certain records (shipment, payment) for six years under HMRC rules — we will explain what can be deleted immediately and what must be retained." },
                  { q: "How do I opt out of marketing emails?",       a: "Click 'unsubscribe' in any marketing email, or email privacy@r-zoneenterprises.com. We will process your request within 5 working days." },
                  { q: "Who do I contact if I think there's been a breach?", a: "Email privacy@r-zoneenterprises.com immediately with details of your concern. We take breach reports extremely seriously and investigate all within 24 hours." },
                  { q: "Is my data shared with airlines?",           a: "Yes — your shipment data (name, address, cargo details) is shared with the carrier transporting your goods, as required to complete the service. This is covered under our contract performance legal basis." },
                ].map((item, i) => (
                  <FAQ key={i} q={item.q} a={item.a} index={i} />
                ))}
              </div>
            </Section>

            {/* ── FOOTER CTA ── */}
            <div className="mt-12 border border-[#0818A8]/20 bg-[#0818A8]/4 p-7 md:p-9">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-[9.5px] font-bold tracking-[0.28em] uppercase text-[#0818A8] mb-1">Still Have Questions?</p>
                  <h3 className="text-gray-900 font-black text-[20px] tracking-[-0.01em]">We're Here to Help.</h3>
                  <p className="text-gray-600 text-[13.5px] font-light mt-1">Our team responds to privacy enquiries within one business day.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:privacy@r-zoneenterprises.com"
                    className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
                    aria-label="Email privacy team">
                    <Mail size={12} aria-hidden="true" /> Email Privacy Team
                  </a>
                  <Link href="/"
                    className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:border-[#0818A8] hover:text-[#0818A8] text-[11.5px] font-bold tracking-[0.06em] uppercase px-6 py-3 transition-all duration-200"
                    aria-label="Back to R-Zone Enterprises">
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