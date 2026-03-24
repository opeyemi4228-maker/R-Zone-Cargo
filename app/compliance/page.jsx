"use client";

import { Montserrat } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CheckSquare, ChevronRight, ArrowLeft, Phone, Mail, ArrowRight,
  ChevronDown, Check, Award, Shield, Building2, Globe,
  FileCheck, Lock, Users, AlertTriangle, Clock,
  FileText, TrendingUp, Zap, Scale,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"], weight: ["300","400","500","600","700","800","900"],
  variable: "--font-montserrat", display: "swap",
});

const TOC = [
  { id: "co1",  label: "Overview",                  num: "01" },
  { id: "co2",  label: "Certifications",             num: "02" },
  { id: "co3",  label: "Customs Compliance",         num: "03" },
  { id: "co4",  label: "Data Protection",            num: "04" },
  { id: "co5",  label: "Anti-Money Laundering",      num: "05" },
  { id: "co6",  label: "Trade & Export Controls",    num: "06" },
  { id: "co7",  label: "Cargo & Aviation Security",  num: "07" },
  { id: "co8",  label: "Consumer Protection",        num: "08" },
  { id: "co9",  label: "Environment",                num: "09" },
  { id: "co10", label: "Whistleblowing",             num: "10" },
  { id: "co11", label: "Contact",                    num: "11" },
];

const CERTIFICATIONS = [
  {
    icon: Award,
    title: "IATA Cargo Agent",
    authority: "IATA — Geneva",
    status: "Active",
    desc: "R-Zone Enterprises holds IATA (International Air Transport Association) cargo agent accreditation, authorising us to book air cargo space on behalf of customers on IATA member airlines worldwide. Our IATA registration is subject to annual audit and renewal.",
    highlights: ["Annual audit compliance", "Access to IATA airline network", "IATA DGR certified staff", "Air waybill issuance authorised"],
  },
  {
    icon: Building2,
    title: "HMRC Authorised Customs Agent",
    authority: "HMRC — United Kingdom",
    status: "Active",
    desc: "We are registered with HM Revenue & Customs as an authorised customs agent, enabling us to submit import and export declarations through the UK's Customs Declaration Service (CDS) and CHIEF systems on behalf of our customers.",
    highlights: ["CDS & CHIEF access", "Import/export declarations", "UK tariff classification", "Duty calculation & payment"],
  },
  {
    icon: Globe,
    title: "Nigeria Customs Service Registration",
    authority: "NCS — Abuja, Nigeria",
    status: "Active",
    desc: "R-Zone Enterprises is registered with the Nigeria Customs Service (NCS) as a licensed freight forwarder, authorising our Lagos team to handle customs clearance at all major Nigerian ports including Apapa and Tin Can Island.",
    highlights: ["All major Nigerian ports", "NAFDAC liaison capability", "SON compliance guidance", "DPR regulated commodities"],
  },
  {
    icon: Shield,
    title: "ICO Registration — Data Protection",
    authority: "ICO — United Kingdom",
    status: "Active",
    desc: "R-Zone Enterprises Ltd is registered with the UK Information Commissioner's Office (ICO) as required under the Data Protection Act 2018. Our registration is renewed annually. We are fully compliant with UK GDPR.",
    highlights: ["UK GDPR compliant", "Annual ICO renewal", "Data breach protocol active", "DPO designated"],
  },
  {
    icon: FileCheck,
    title: "Companies House — England & Wales",
    authority: "Companies House — Cardiff",
    status: "Active",
    desc: "R-Zone Enterprises Ltd is incorporated and registered in England and Wales. Our company registration, directors, confirmation statements, and annual accounts are filed on time and publicly accessible at Companies House.",
    highlights: ["Registered in England & Wales", "Annual accounts filed", "Confirmation statements current", "Directors' details public"],
  },
  {
    icon: Lock,
    title: "Professional Indemnity Insurance",
    authority: "UK-authorised insurer",
    status: "Active",
    desc: "We hold professional indemnity and cargo liability insurance appropriate to the scale of our freight forwarding operations. Our cover is maintained in accordance with IATA accreditation requirements and BIFA membership obligations.",
    highlights: ["Cargo liability cover", "Professional indemnity", "Warehouse keepers cover", "Annual review & renewal"],
  },
];

const PRINCIPLES = [
  { label: "Lawfulness, fairness & transparency", desc: "Lawful basis for all processing; transparent about data use" },
  { label: "Purpose limitation",                  desc: "Data collected for specified purposes only" },
  { label: "Data minimisation",                   desc: "Only what's necessary for our stated purposes" },
  { label: "Accuracy",                            desc: "Reasonable steps to keep data accurate" },
  { label: "Storage limitation",                  desc: "Kept no longer than necessary" },
  { label: "Integrity & confidentiality",         desc: "Appropriate technical and organisational security" },
];

function P({ children }) { return <p className="text-gray-700 text-[14px] font-normal leading-relaxed mb-4">{children}</p>; }
function H3({ children }) { return <h3 className="text-gray-900 font-bold text-[13px] tracking-[0.1em] uppercase mb-3 mt-6 first:mt-0">{children}</h3>; }
function UL({ children }) { return <ul className="space-y-2.5 mb-5">{children}</ul>; }
function LI({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8] flex-shrink-0 mt-[0.48em]" aria-hidden="true" />
      <span className="text-gray-700 text-[13.5px] font-normal leading-relaxed">{children}</span>
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

function Section({ id, num, title, children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section id={id} ref={ref} className="scroll-mt-[80px] py-10 border-b border-gray-100 last:border-0"
      aria-labelledby={`${id}-h`}
      initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
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

export default function CompliancePage() {
  const [activeId, setActiveId] = useState("co1");
  const [navScrolled, setNavScrolled] = useState(false);
  const [tocMobile, setTocMobile] = useState(false);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true }); fn();
    return () => window.removeEventListener("scroll", fn);
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
        "name": "Compliance — R-Zone Enterprises",
        "url": "https://r-zoneenterprises.com/compliance",
        "description": "R-Zone Enterprises regulatory compliance — IATA certification, HMRC customs agent, NCS registration, UK GDPR, AML, trade controls and consumer protection.",
        "dateModified": "2025-01-15",
        "publisher": { "@type": "Organization", "name": "R-Zone Enterprises", "url": "https://r-zoneenterprises.com" },
      })}} />

      {/* Top bar */}
      <div className="bg-[#0818A8]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 h-9 flex items-center justify-between">
          <p className="text-white/80 text-[13px] font-medium">R-Zone Enterprises — Legal &amp; Compliance</p>
          <div className="hidden sm:flex items-center gap-6">
            <a href="tel:+448007720864" className="flex items-center gap-1.5 text-white/75 hover:text-white text-[13px] font-medium transition-colors" aria-label="Call R-Zone"><Phone size={10} aria-hidden="true" /> +44 800 772 0864</a>
            <a href="mailto:compliance@r-zoneenterprises.com" className="flex items-center gap-1.5 text-white/75 hover:text-white text-[13px] font-medium transition-colors" aria-label="Email compliance"><Mail size={10} aria-hidden="true" /> compliance@r-zoneenterprises.com</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-gray-500 text-[13px] font-medium hover:text-gray-800 transition-colors">Home</Link>
            <ChevronRight size={11} className="text-gray-300" aria-hidden="true" />
            <span className="text-gray-800 text-[13px] font-medium" aria-current="page">Compliance</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#0818A8] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <CheckSquare size={20} className="text-white" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[#0818A8]/30 to-transparent" aria-hidden="true" />
              </div>
              <h1 className="font-black text-[clamp(32px,6vw,64px)] text-gray-900 leading-[0.88] tracking-[-0.035em] uppercase mb-5">
                Regulatory<br /><span className="text-[#0818A8]">Compliance.</span>
              </h1>
              <p className="text-gray-600 text-[15px] font-normal leading-relaxed max-w-lg">
                R-Zone Enterprises operates in a highly regulated industry spanning UK and Nigerian customs law, international aviation regulations, data protection legislation, and financial crime prevention. This page sets out our certifications, registrations, and compliance obligations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Last Updated", val: "15 January 2025",    icon: Clock      },
                { label: "Version",      val: "v3.0 — 2025",        icon: FileText   },
                { label: "Frameworks",   val: "UK, Nigeria & Intl.", icon: Globe      },
                { label: "Oversight",    val: "Board-level review",  icon: TrendingUp },
              ].map(({ label, val, icon: Icon }) => (
                <div key={label} className="border border-gray-200 bg-gray-50 p-4 hover:border-[#0818A8]/25 transition-colors">
                  <Icon size={13} className="text-[#0818A8] mb-2" aria-hidden="true" />
                  <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-0.5">{label}</p>
                  <p className="text-gray-800 font-semibold text-[13px] leading-snug">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certification status strip */}
          <div className="mt-10 border border-gray-200 bg-gray-50 p-5">
            <p className="text-[13px] font-bold tracking-[0.25em] uppercase text-gray-500 mb-4">Certification Status — All Current</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {CERTIFICATIONS.map(cert => {
                const Icon = cert.icon;
                return (
                  <div key={cert.title} className="flex flex-col items-center text-center gap-2">
                    <div className="w-9 h-9 bg-[#0818A8]/8 flex items-center justify-center" aria-hidden="true">
                      <Icon size={15} className="text-[#0818A8]" />
                    </div>
                    <p className="text-gray-800 font-semibold text-[13px] leading-tight">{cert.title}</p>
                    <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5">✓ {cert.status}</span>
                  </div>
                );
              })}
            </div>
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
                        className={`flex items-center gap-2.5 px-4 py-3 border-b border-r border-gray-100 text-[13px] transition-colors odd:border-r even:border-r-0 ${activeId === item.id ? "bg-[#0818A8]/5 text-[#0818A8] font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
                        <span className="text-[13px] font-black text-gray-400">{item.num}</span>
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
              <p className="text-[13px] font-black tracking-[0.35em] uppercase text-gray-400 mb-4 px-1">Contents</p>
              <nav aria-label="Section navigation">
                {TOC.map(item => (
                  <a key={item.id} href={`#${item.id}`}
                    className={`group flex items-center gap-3 px-3 py-2.5 text-[13px] border-l-2 transition-all duration-150 ${activeId === item.id ? "border-[#0818A8] text-[#0818A8] font-semibold bg-[#0818A8]/4" : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50"}`}>
                    <span className={`text-[13px] font-black flex-shrink-0 ${activeId === item.id ? "text-[#0818A8]" : "text-gray-400"}`}>{item.num}</span>
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 border border-[#0818A8]/15 bg-[#0818A8]/4 p-4">
                <CheckSquare size={14} className="text-[#0818A8] mb-2" aria-hidden="true" />
                <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-[#0818A8] mb-2">Compliance Contact</p>
                <a href="mailto:compliance@r-zoneenterprises.com" className="text-[13px] font-semibold text-gray-800 hover:text-[#0818A8] transition-colors block leading-snug break-all">compliance@r-zoneenterprises.com</a>
                <p className="text-gray-600 text-[13px] font-normal mt-1">All enquiries handled promptly</p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9 xl:col-span-10 min-w-0" id="main-content">

            <Section id="co1" num="01" title="Compliance Overview">
              <P>R-Zone Enterprises Ltd operates in a highly regulated industry. International freight forwarding spans UK and Nigerian customs law, international aviation regulations, data protection legislation, and financial crime prevention. We take our compliance obligations seriously and invest in systems, training, and governance to meet them consistently.</P>
              <P>Our compliance programme is overseen by our Operations Director and reviewed annually by the company's board of directors. Our compliance policies are available to customers, regulators, and business partners on request.</P>
              <div className="border border-gray-200 bg-gray-50 p-5 mb-5">
                <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-gray-500 mb-4">Our Compliance Commitment</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Shield,    title: "Full Compliance",         desc: "With all applicable UK and Nigerian laws and regulations"       },
                    { icon: Zap,       title: "Proactive Updates",       desc: "We update our practices promptly when regulations change"       },
                    { icon: Users,     title: "Staff Training",          desc: "All staff receive mandatory annual compliance training"         },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#0818A8]/8 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                          <Icon size={14} className="text-[#0818A8]" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold text-[13px]">{item.title}</p>
                          <p className="text-gray-600 text-[13px] font-normal leading-snug mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Section>

            <Section id="co2" num="02" title="Certifications & Registrations">
              <P>R-Zone Enterprises holds the following active certifications, registrations, and memberships. For verification of any certification, contact <a href="mailto:compliance@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">compliance@r-zoneenterprises.com</a>.</P>
              <div className="space-y-4 mb-5">
                {CERTIFICATIONS.map(cert => {
                  const Icon = cert.icon;
                  return (
                    <div key={cert.title}
                      className="border border-gray-200 bg-white hover:border-[#0818A8]/30 hover:shadow-md hover:shadow-[#0818A8]/8 transition-all duration-200 overflow-hidden group">
                      <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] w-0 group-hover:w-full transition-all duration-500" aria-hidden="true" />
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-[#0818A8]/8 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                              <Icon size={17} className="text-[#0818A8]" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="text-gray-900 font-black text-[15px] tracking-[-0.01em]" style={{ textTransform: "none", letterSpacing: "normal" }}>{cert.title}</h3>
                                <span className="text-[13px] font-bold tracking-[0.15em] uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1">✓ {cert.status}</span>
                              </div>
                              <p className="text-[13px] font-semibold text-gray-500 mt-0.5">{cert.authority}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-[13.5px] font-normal leading-relaxed mb-4">{cert.desc}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {cert.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8] flex-shrink-0" aria-hidden="true" />
                              <span className="text-gray-600 text-[13px] font-normal">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section id="co3" num="03" title="Customs Compliance">
              <H3>3.1 — UK Customs</H3>
              <P>We operate as an authorised customs agent under UK law. All UK import and export declarations are filed electronically through HMRC's Customs Declaration Service (CDS). We maintain accurate records of all customs entries for a minimum of six years as required by law.</P>
              <P>Our customs team is trained in UK tariff classification (Commodity Codes), Rules of Origin, and import duty calculation. We hold letters of authority from customers authorising us to act on their behalf in all customs matters.</P>
              <H3>3.2 — Nigeria Customs</H3>
              <P>Our Lagos operations team is registered with the Nigeria Customs Service (NCS) and complies fully with the Nigeria Customs and Excise Management Act. All Nigerian import declarations are filed in accordance with NCS procedures, including payment of applicable import duties and levies.</P>
              <P>We comply with NAFDAC requirements for regulated imports including foodstuffs, cosmetics, and pharmaceuticals, and with SON (Standards Organisation of Nigeria) requirements for regulated products.</P>
              <H3>3.3 — Customs Accuracy</H3>
              <P>We always file customs declarations accurately based on information provided by our customers. Customers who provide incorrect or incomplete cargo information are solely responsible for any penalties, delays, or seizures arising.</P>
              <Callout type="red"><strong className="font-semibold">Criminal offence:</strong> Misdeclaration of goods to customs authorities is a criminal offence in both the UK and Nigeria. R-Zone Enterprises will not assist in customs fraud and will cooperate fully with any investigation by customs authorities.</Callout>
            </Section>

            <Section id="co4" num="04" title="Data Protection Compliance">
              <H3>4.1 — UK GDPR & Data Protection Act 2018</H3>
              <P>R-Zone Enterprises Ltd is registered with the Information Commissioner's Office (ICO) as required by the Data Protection Act 2018. We process personal data in accordance with the six data protection principles:</P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {PRINCIPLES.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 border border-gray-100 bg-gray-50 p-4">
                    <div className="w-5 h-5 bg-[#0818A8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                      <Check size={9} className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-[13px]">{p.label}</p>
                      <p className="text-gray-600 text-[13px] font-normal mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <H3>4.2 — Privacy by Design</H3>
              <P>We embed data protection principles into our systems and processes from the outset. Privacy impact assessments are conducted for new processing activities that may present risk to individuals' rights.</P>
              <P>For full details of our data protection practices, see our <a href="/privacy" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">Privacy Policy</a>.</P>
            </Section>

            <Section id="co5" num="05" title="Anti-Money Laundering">
              <P>R-Zone Enterprises complies with the UK Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 and the Proceeds of Crime Act 2002.</P>
              <H3>5.1 — Customer Due Diligence</H3>
              <P>We apply Customer Due Diligence (CDD) procedures to our business customers and, where applicable, high-value individual customers — including identity verification, source of funds checks, and assessment of the business relationship.</P>
              <H3>5.2 — Suspicious Activity Reporting</H3>
              <P>We have a legal obligation to report suspicious activity to the National Crime Agency (NCA) via a Suspicious Activity Report (SAR) where we know, suspect, or have reasonable grounds to suspect money laundering or terrorist financing. We cannot inform the subject of any such report (tipping off is a criminal offence).</P>
              <H3>5.3 — Sanctions Screening</H3>
              <P>We screen all parties against UK Government sanctions lists (OFSI) and UN Security Council sanctions lists. We will not provide services to sanctioned individuals or entities.</P>
              <H3>5.4 — Bribery & Corruption</H3>
              <P>R-Zone Enterprises has a zero-tolerance policy for bribery and corruption in accordance with the Bribery Act 2010. We do not offer, give, request, or accept bribes in any form. All staff are trained on our anti-bribery policy.</P>
              <Callout type="amber"><strong className="font-semibold">Reporting:</strong> If you have concerns about financial crime involving R-Zone Enterprises, please report them to <a href="mailto:aml@r-zoneenterprises.com" className="font-semibold underline underline-offset-2">aml@r-zoneenterprises.com</a>. All reports are treated confidentially.</Callout>
            </Section>

            <Section id="co6" num="06" title="Trade & Export Controls">
              <P>We comply with UK Strategic Export Controls administered by the Export Control Joint Unit (ECJU) of the Department for Business and Trade. We do not ship controlled goods — military equipment, dual-use items, or items on the UK Military List — without appropriate export licences.</P>
              <P>Our staff are trained to identify potentially controlled goods and refer such matters to our compliance team before acceptance. Where in doubt, we will not ship.</P>
              <P>We comply with Nigeria's import prohibition list and all applicable trade embargoes. We do not circumvent or assist customers in circumventing trade restrictions.</P>
            </Section>

            <Section id="co7" num="07" title="Cargo & Aviation Security">
              <H3>7.1 — Aviation Security</H3>
              <P>Where we provide air freight services, we operate in accordance with EC Regulation 300/2008 and its implementing regulations, as retained in UK law. We apply appropriate security controls to cargo before acceptance, including:</P>
              <UL>
                <LI>Identity verification of consignors</LI>
                <LI>Physical inspection and X-ray screening of cargo where required</LI>
                <LI>Secure, access-controlled storage of cargo awaiting dispatch</LI>
                <LI>Chain of custody documentation for all air cargo</LI>
              </UL>
              <H3>7.2 — Dangerous Goods</H3>
              <P>We comply with IATA Dangerous Goods Regulations (DGR) for hazardous materials by air, and with the International Maritime Dangerous Goods (IMDG) Code for sea freight. Staff handling dangerous goods hold current IATA DGR certification.</P>
              <H3>7.3 — Warehouse Security</H3>
              <P>Our Essex warehouse operates 24/7 CCTV monitoring, access-controlled entry, and alarm systems. Access is restricted to authorised staff and pre-approved visitors. All visitors sign in and are accompanied by a staff member.</P>
            </Section>

            <Section id="co8" num="08" title="Consumer Protection">
              <P>Where our customers are consumers (individuals contracting outside a business capacity), we comply with:</P>
              <UL>
                <LI><strong className="text-gray-900 font-semibold">Consumer Rights Act 2015:</strong> Services must be performed with reasonable care and skill, within a reasonable time, at a reasonable price</LI>
                <LI><strong className="text-gray-900 font-semibold">Consumer Contracts Regulations 2013:</strong> Right to cancel distance contracts, including online bookings (where applicable)</LI>
                <LI><strong className="text-gray-900 font-semibold">Consumer Protection from Unfair Trading Regulations 2008:</strong> Prohibition on unfair practices, misleading actions, and aggressive selling</LI>
                <LI><strong className="text-gray-900 font-semibold">Pricing Practices Guide:</strong> Transparent and accurate pricing without hidden fees</LI>
              </UL>
              <H3>8.1 — Complaints</H3>
              <P>We operate a formal complaints procedure. Submit complaints to <a href="mailto:complaints@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">complaints@r-zoneenterprises.com</a>. We acknowledge within 2 working days and resolve within 14 working days. If unsatisfied, you may refer to our ADR body — details provided on escalation.</P>
            </Section>

            <Section id="co9" num="09" title="Environmental Responsibility">
              <P>R-Zone Enterprises is committed to reducing the environmental impact of our operations. Our environmental commitments include:</P>
              <UL>
                <LI>Consolidating shipments to reduce the number of flights and vessel sailings required</LI>
                <LI>Minimising single-use plastic packaging materials at our warehouse</LI>
                <LI>Responsible disposal and recycling of packaging waste</LI>
                <LI>Working with airline and shipping partners who have published emissions reduction targets</LI>
                <LI>Offering customers the option to purchase carbon offset credits for their shipments where available</LI>
                <LI>Annual review of our environmental impact and setting of year-on-year improvement targets</LI>
              </UL>
            </Section>

            <Section id="co10" num="10" title="Compliance Reporting & Whistleblowing">
              <P>R-Zone Enterprises takes compliance failures seriously. If you are a staff member, customer, or third party who becomes aware of a potential compliance failure — suspected fraud, data breach, regulatory violation, or illegal activity — please report it promptly.</P>
              <P>Reports may be made to our compliance team at <a href="mailto:compliance@r-zoneenterprises.com" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">compliance@r-zoneenterprises.com</a>. All reports are treated confidentially and investigated promptly. We do not tolerate retaliation against anyone raising a concern in good faith.</P>
              <P>Staff have rights under the Public Interest Disclosure Act 1998 (PIDA) to report certain concerns directly to a relevant regulatory body.</P>
              <Callout type="blue"><strong className="font-semibold">Data breaches:</strong> In the event of a personal data breach, we notify the ICO within 72 hours where required, and inform affected individuals without undue delay — as required by UK GDPR Articles 33 and 34.</Callout>
            </Section>

            <Section id="co11" num="11" title="Contact Compliance Team">
              <P>For compliance enquiries, certification verification, regulatory questions, or to report a concern:</P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
                {[
                  { label: "Compliance & Legal",  val: "compliance@r-zoneenterprises.com", href: "mailto:compliance@r-zoneenterprises.com", icon: CheckSquare },
                  { label: "Data Protection",     val: "privacy@r-zoneenterprises.com",    href: "mailto:privacy@r-zoneenterprises.com",    icon: Shield      },
                  { label: "AML & Sanctions",     val: "aml@r-zoneenterprises.com",        href: "mailto:aml@r-zoneenterprises.com",        icon: Scale       },
                  { label: "Claims & Complaints", val: "complaints@r-zoneenterprises.com", href: "mailto:complaints@r-zoneenterprises.com", icon: FileCheck   },
                  { label: "Phone",               val: "+44 800 772 0864",                 href: "tel:+448007720864",                       icon: Phone       },
                  { label: "Post",                val: "Unit 10 Moorhen Yard, Elms Lane, Upminster, Essex RM14 3TS", href: null,            icon: Globe       },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="border border-gray-200 bg-gray-50 p-5 hover:border-[#0818A8]/25 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={13} className="text-[#0818A8]" aria-hidden="true" />
                        <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-gray-500">{item.label}</p>
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-gray-800 font-semibold text-[13px] hover:text-[#0818A8] transition-colors break-all">{item.val}</a>
                      ) : (
                        <p className="text-gray-800 font-normal text-[13px] leading-snug">{item.val}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Footer CTA */}
            <div className="mt-12 border border-[#0818A8]/20 bg-[#0818A8]/4 p-7 md:p-9">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-[13px] font-bold tracking-[0.28em] uppercase text-[#0818A8] mb-1">Need Verification?</p>
                  <h3 className="text-gray-900 font-black text-[20px] tracking-[-0.01em]">Contact Our Compliance Team.</h3>
                  <p className="text-gray-600 text-[13.5px] font-normal mt-1">Certification verification and regulatory queries handled promptly.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:compliance@r-zoneenterprises.com" className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25" aria-label="Email compliance team">
                    <Mail size={12} aria-hidden="true" /> Email Compliance
                  </a>
                  <Link href="/" className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:border-[#0818A8] hover:text-[#0818A8] text-[13px] font-bold tracking-[0.06em] uppercase px-6 py-3 transition-all duration-200" aria-label="Back to site">
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