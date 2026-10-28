"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { montserrat, outfit } from "../../lib/fonts";
import {
 ArrowRight, MapPin, Phone, Mail, Globe,
 ChevronRight, Shield, Users, Package, Clock,
 Star, CheckCircle, Quote, Plane, Ship,
 Truck, Building2,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
 { value: "2012", suffix: "", label: "Year Founded", icon: Clock, desc: "12+ years operating" },
 { value: "50", suffix: "K+", label: "Shipments Delivered", icon: Package, desc: "Safely moved, on time" },
 { value: "36", suffix: "", label: "Nigerian States Served", icon: MapPin, desc: "Complete national coverage" },
 { value: "120", suffix: "+", label: "Five-Star Reviews", icon: Star, desc: "Earned on Google" },
 { value: "99", suffix: "%", label: "Delivery Success Rate", icon: Shield, desc: "Industry-leading reliability" },
 { value: "2", suffix: "", label: "Warehouse Locations", icon: Globe, desc: "Upminster UK · Lagos Nigeria" },
];

const TIMELINE = [
 { year: "2012", title: "R-Zone is Born", highlight: "Company founded in Upminster, Essex, UK", body: "Founded in Essex with a single mission: to give Nigerian families and businesses in the UK a cargo service they could genuinely trust. One warehouse unit, one van, one unwavering commitment to reliability." },
 { year: "2014", title: "Sea Freight Launched", highlight: "Weekly sea container service begins", body: "In response to customer demand for affordable bulk shipping, R-Zone launched its weekly sea freight service opening the UK Nigeria corridor to businesses with larger consignments from just £3/kg." },
 { year: "2016", title: "Lagos Hub Opens", highlight: "Nigeria operations hub established Lagos", body: "We opened our Nigeria hub in Lagos, giving us direct oversight of last-mile delivery, port clearance, and on-the-ground customer service. Both ends of the corridor, managed by our own team." },
 { year: "2018", title: "IATA Certification", highlight: "IATA certified air freight operation", body: "R-Zone achieved full IATA certification, validating our air freight capabilities against international aviation standards. This opened access to a broader network of airline partners including British Airways, Emirates and Ethiopian Cargo." },
 { year: "2020", title: "Through the Pandemic", highlight: "Zero service interruptions during COVID-19", body: "While global supply chains collapsed, ours kept moving. R-Zone maintained uninterrupted UK Nigeria operations throughout 2020 keeping families connected and businesses supplied when it mattered most." },
 { year: "2022", title: "10 Years. 10,000+ Customers.", highlight: "10,000 customers milestone reached", body: "A decade of delivering. We celebrated our 10th anniversary having served over 10,000 unique customers families, SMEs, importers and exporters who chose R-Zone as their trusted UK Nigeria logistics partner." },
 { year: "2024", title: "Digital & Growth", highlight: "Real-time tracking & online systems live", body: "We launched real-time shipment tracking, an online quote system, and a fully digital customer portal making R-Zone the most technically advanced UK Nigeria cargo operator, while maintaining the personal service our customers rely on." },
];



const TESTIMONIALS = [
 { text: "I've been shipping with R-Zone for 6 years and they have never let me down. My goods always arrive on time and in perfect condition. Genuinely the best cargo company I've used.", author: "Vincent A.", location: "London → Lagos", stars: 5 },
 { text: "Professional, transparent with pricing, and they actually pick up the phone. R-Zone has completely changed how our business manages its UK Nigeria supply chain.", author: "Emmanuel K.", location: "Birmingham → Abuja", stars: 5 },
 { text: "Sent goods to my family in Abeokuta they arrived ahead of schedule. The tracking was accurate, communication excellent. Will not use anyone else.", author: "Oludotun O.", location: "Essex → Abeokuta", stars: 5 },
];

const OFFICES = [
 { country: "United Kingdom", flag: "🇬🇧", role: "Headquarters & Warehouse", address: "Unit 9 Moorhen Yard, Elms Lane, Bulphan, Upminster, RM14 3TS", phone: "+44 (0) 800 772 0864", phoneHref: "tel:+448007720864", email: "info@r-zoneenterprises.com", hours: "Mon to Fri 10AM to 6PM · Sat 11AM to 2PM", accent: "#000f89" },
 { country: "Nigeria", flag: "🇳🇬", role: "Operations Hub Lagos", address: "1-3 R-Zone Crescent, Queens Park Estate II, Shagam Interchange, Lagos. <strong>Collection Points:</strong> Egbeda, Surulele, Ajah, Ibadan", phone: "+234 906 680 6861", phoneHref: "tel:+2349066806861", email: "nigeria@r-zoneenterprises.com", hours: "Mon to Fri 9AM to 5PM WAT", accent: "#0000FF" },
];


// ─── Helpers ──────────────────────────────────────────────────────────────────
const fadeUp = {
 hidden: { opacity: 0, y: 32 },
 visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};

function Section({ children, className = "", id, label }) {
 return <section id={id} className={`relative overflow-hidden ${className}`} aria-label={label}>{children}</section>;
}

function TagPill({ label, dark = true }) {
 return (
 <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-6 ${dark ? "border-[#0000FF]/30 bg-[#000f89]/14" : "border-[#000f89]/20 bg-[#000f89]/6"}`}>
 <motion.span className="w-1.5 h-1.5 rounded-full bg-[#0000FF] flex-shrink-0"
 animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity }} aria-hidden="true" />
 <span className={`text-[13px] font-semibold ${dark ? "text-[#4D4DFF]" : "text-[#000f89]"}`}>{label}</span>
 </div>
 );
}

function SectionHeadline({ line1, accent, dark = true, id }) {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-60px" });
 return (
 <h2 id={id} ref={ref} className={`font-extrabold text-[clamp(26px,4.5vw,52px)] leading-[1.06] tracking-[-0.03em] ${dark ? "text-white" : "text-[#00112E]"}`}>
 {line1}{" "}
 <span className="relative inline-block" style={{ color: "#0000FF" }}>
 {accent}
 <motion.span className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#0000FF]" aria-hidden="true"
 initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.55 }} />
 </span>
 </h2>
 );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════
function Hero() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true });
 const { scrollY } = useScroll();
 const bgY = useTransform(scrollY, [0, 500], [0, 80]);

 return (
 <Section className="bg-[#00112E] min-h-[80vh] flex flex-col justify-end hero-section"
 label="About R-Zone Enterprises the UK to Nigeria cargo company">
 <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }} aria-hidden="true">
 <div className="absolute inset-0 opacity-[0.025]"
 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
 </motion.div>
 <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
 <div className="absolute top-[-10%] left-[20%] w-[700px] h-[500px] bg-[#000f89]/18 rounded-full blur-[140px]" />
 <div className="absolute top-[30%] right-[-5%] w-[500px] h-[400px] bg-[#0000FF]/10 rounded-full blur-[120px]" />
 </div>
 <div className="absolute top-0 right-0 w-px h-full opacity-[0.08] pointer-events-none"
 style={{ background: "linear-gradient(to bottom, transparent, #0000FF 40%, transparent)" }} aria-hidden="true" />

 <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 w-full pt-[120px] pb-16 md:pb-20">
 <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10 lg:mt-[3px] max-lg:-mt-[24px]"
 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
 <Link href="/" className="text-white/80 text-[13px] font-medium hover:text-white transition-colors">Home</Link>
 <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
 <span className="text-white text-[13px] font-medium" aria-current="page">About Us</span>
 </motion.nav>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
 <div className="lg:col-span-7">
 <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
 variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
 <motion.div variants={fadeUp} custom={0}>
 <TagPill label="UK to Nigeria Cargo · Est. 2012" dark />
 </motion.div>
 <motion.h1 variants={fadeUp} custom={0.1}
 className="text-white font-extrabold text-[clamp(36px,7vw,84px)] leading-[1.06] tracking-[-0.035em] mb-7">
 Built on{" "}
 <span className="relative inline-block">
 <span className="relative z-10 text-[#4D4DFF]">Trust.</span>
 <motion.span className="absolute -bottom-2 left-0 h-[4px] rounded-full bg-[#0000FF]" aria-hidden="true"
 initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.6, delay: 0.7 }} />
 </span>
 <br />Driven by Purpose.
 </motion.h1>
 <motion.p variants={fadeUp} custom={0.2}
 className="text-white/80 text-[15px] font-normal leading-relaxed max-w-xl mb-10">
 Founded in Essex in 2012 to give Nigerian families and businesses in the UK a
 cargo service they can rely on. Since then: <strong className="text-white font-semibold">50,000+ shipments</strong> and 120+ five-star Google reviews.
 </motion.p>
 <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap gap-3">
 <Link href="/quote"
 className="group inline-flex items-center gap-2.5 bg-[#0000CD] hover:bg-[#000f89] text-white text-[13px] font-bold px-7 py-3.5 transition-all duration-200 shadow-lg shadow-[#000f89]/30 rounded-full"
 aria-label="Get a free UK to Nigeria cargo quote from R-Zone">
 Get a Quote <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
 </Link>
 <Link href="/contact"
 className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.05] hover:bg-white/10 text-white text-[13px] font-bold px-7 py-3.5 transition-all duration-200 rounded-full"
 aria-label="Contact R-Zone Enterprises UK Nigeria cargo team">
 Get in Touch
 </Link>
 </motion.div>
 </motion.div>
 </div>

 <motion.div className="lg:col-span-5"
 initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
 transition={{ duration: 0.75, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
 <div className="border border-white/10 bg-white/[0.04] backdrop-blur-sm p-7 space-y-5 rounded-[20px]">
 <div className="h-[2px] bg-gradient-to-r from-[#000f89] to-[#0000FF] -mx-7 -mt-7 mb-7" aria-hidden="true" />
 <p className="text-white/80 mb-4 text-[13px] font-semibold">Quick Facts</p>
 {[
 { icon: MapPin, label: "UK Headquarters", val: "Upminster, Essex" },
 { icon: Globe, label: "Nigeria Hub", val: "Shagam Interchange, Lagos" },
 { icon: Clock, label: "Operating Since", val: "2012 12+ years" },
 { icon: Package, label: "Shipments Delivered", val: "50,000+" },
 { icon: Star, label: "Google Reviews", val: "120+ Five-Star" },
 { icon: Users, label: "Delivery Coverage", val: "All 36 states" },
 ].map(({ icon: Icon, label, val }) => (
 <div key={label} className="flex items-center justify-between border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
 <div className="flex items-center gap-2.5">
 <Icon size={12} className="text-[#4D4DFF] flex-shrink-0" aria-hidden="true" />
 <span className="text-white/80 text-[13px] font-normal">{label}</span>
 </div>
 <span className="text-white text-[13px] font-semibold">{val}</span>
 </div>
 ))}
 </div>
 </motion.div>
 </div>
 </div>
 <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#00112E] to-transparent pointer-events-none" aria-hidden="true" />
 </Section>
 );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATS BAND
// ═══════════════════════════════════════════════════════════════════════════════
function StatsBand() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-40px" });
 return (
 <div ref={ref} className="bg-[#000f89] relative overflow-hidden" role="region"
 aria-label="R-Zone Enterprises key statistics UK to Nigeria cargo">
 <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true"
 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
 <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-12 md:py-14">
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
 {STATS.map((s, i) => {
 const Icon = s.icon;
 return (
 <motion.div key={s.label} className="flex flex-col items-center text-center"
 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.55, delay: i * 0.08 }}>
 <div className="w-9 h-9 bg-white/20 flex items-center justify-center mb-3 rounded-full" aria-hidden="true">
 <Icon size={15} className="text-white" />
 </div>
 <p className="text-white font-black text-[28px] leading-none tracking-[-0.025em] mb-1">
 {s.value}<span className="text-white/80 text-[20px]">{s.suffix}</span>
 </p>
 <p className="text-white/80 font-semibold mb-1 text-[13px]">{s.label}</p>
 <p className="text-white/80 text-[11px] font-normal leading-snug">{s.desc}</p>
 </motion.div>
 );
 })}
 </div>
 </div>
 </div>
 );
}

// ═══════════════════════════════════════════════════════════════════════════════
// WHO WE ARE
// ═══════════════════════════════════════════════════════════════════════════════
function WhoWeAre() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-80px" });
 return (
 <Section className="bg-white" label="Who R-Zone Enterprises are UK to Nigeria cargo specialists" id="who-we-are">
 <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
 style={{ backgroundImage: "radial-gradient(circle, rgba(0,15,137,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
 <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
 <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
 variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
 <motion.div variants={fadeUp} custom={0}><TagPill label="Who We Are" dark={false} /></motion.div>
 <motion.div variants={fadeUp} custom={0.05}>
 <SectionHeadline line1="The Cargo Company" accent="Nigeria Trusts." dark={false} id="who-we-are-heading" />
 </motion.div>
 <motion.div variants={fadeUp} custom={0.2} className="mt-6 space-y-4">
 <p className="text-gray-700 text-[16px] font-normal leading-[1.75]">
 R-Zone Enterprises is a UK to Nigeria cargo company based in Upminster, Essex, shipping since 2012.
 We started with one aim: give families and businesses in the UK a cargo service that is fast, clear on price and reliable.
 </p>
 <p className="text-gray-700 text-[16px] font-normal leading-[1.75]">
 Air freight, weekly sea freight, door to door delivery and customs clearance, run by our own
 teams in both countries, to Lagos, Abuja, Port Harcourt and all 36 states.
 </p>
  </motion.div>
 <motion.div variants={fadeUp} custom={0.35} className="mt-8 grid grid-cols-2 gap-4">
 {[
 { icon: Plane, label: "Air Freight", sub: "5 to 10 working days" },
 { icon: Ship, label: "Sea Freight", sub: "Weekly sailings" },
 { icon: Truck, label: "Door to Door", sub: "UK-wide collection" },
 { icon: Globe, label: "Both Directions", sub: "UK ↔ Nigeria" },
 ].map(({ icon: Icon, label, sub }) => (
 <div key={label} className="flex items-center gap-3 border border-gray-100 bg-gray-50 p-3.5">
 <div className="w-9 h-9 bg-[#000f89]/8 flex items-center justify-center flex-shrink-0 rounded-full" aria-hidden="true">
 <Icon size={15} className="text-[#000f89]" />
 </div>
 <div>
 <p className="text-[13px] font-bold text-gray-800">{label}</p>
 <p className="text-[13px] text-gray-800 font-normal">{sub}</p>
 </div>
 </div>
 ))}
 </motion.div>
 </motion.div>

 <motion.div className="relative" initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
 transition={{ duration: 0.75, delay: 0.3 }}>
 <div className="bg-[#00112E] p-10 relative overflow-hidden">
 <div className="h-[2px] bg-gradient-to-r from-[#000f89] to-[#0000FF] absolute top-0 left-0 right-0" aria-hidden="true" />
 <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true"
 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
 <div className="relative z-10">
 <p className="text-white/80 mb-6 text-[13px] font-semibold">Our Freight Corridor</p>
 <div className="flex items-center gap-5 mb-8">
 <div className="text-center">
 <p className="text-3xl mb-1">🇬🇧</p>
 <p className="text-white font-bold text-[12px] tracking-wide">UNITED KINGDOM</p>
 <p className="text-white/80 text-[11px] font-normal">Essex · London · UK-Wide</p>
 </div>
 <div className="flex-1 relative">
 <div className="h-px bg-gradient-to-r from-[#000f89] to-[#0000FF]" aria-hidden="true" />
 <div className="absolute inset-0 flex items-center justify-center">
 <motion.div className="w-2.5 h-2.5 rounded-full bg-[#0000FF]"
 animate={{ x: [-20, 20, -20] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} aria-hidden="true" />
 </div>
 <div className="text-center mt-2">
 <p className="text-[#4D4DFF] text-[13px] font-semibold">Air · Sea · Road</p>
 </div>
 </div>
 <div className="text-center">
 <p className="text-3xl mb-1">🇳🇬</p>
 <p className="text-white font-bold text-[12px] tracking-wide">NIGERIA</p>
 <p className="text-white/80 text-[11px] font-normal">All 36 States</p>
 </div>
 </div>
 <div className="grid grid-cols-3 gap-3">
 {[
 { val: "5 to 10", unit: "days", label: "Air transit" },
 { val: "4 to 6", unit: "weeks", label: "Sea transit" },
 { val: "24/7", unit: "", label: "Tracking" },
 ].map(({ val, unit, label }) => (
 <div key={label} className="bg-white/[0.05] border border-white/[0.08] p-3 text-center">
 <p className="text-white font-black text-[18px] leading-none">{val}<span className="text-[12px] font-normal text-white/80 ml-0.5">{unit}</span></p>
 <p className="text-white/80 font-medium mt-1 text-[13px] font-semibold">{label}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 <motion.div className="absolute -bottom-5 -right-4 bg-[#000f89] px-5 py-3 shadow-xl shadow-[#000f89]/30"
 initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
 transition={{ duration: 0.5, delay: 0.7 }}>
 <p className="text-white font-black text-[20px] leading-none">120+</p>
 <p className="text-white/80 font-semibold text-[13px]">Five-star Google reviews</p>
 </motion.div>
 </motion.div>
 </div>
 </div>
 </Section>
 );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════════════════════════════════════════
function Timeline() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-60px" });
 const [active, setActive] = useState(0);
 return (
 <Section className="bg-white" label="R-Zone history UK Nigeria cargo company since 2012" id="history">
 <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
 style={{ backgroundImage: "radial-gradient(circle, rgba(0,15,137,0.035) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
 <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
 <div className="text-center mb-14">
 <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
 <TagPill label="Our Journey Since 2012" dark={false} />
 </motion.div>
 <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
 <SectionHeadline line1="12 Years of" accent="Milestones." dark={false} id="timeline-heading" />
 </motion.div>
 <motion.p className="text-gray-800 text-[14px] font-normal mt-4 max-w-lg mx-auto"
 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
 From a single warehouse unit in Essex to a UK to Nigeria cargo company trusted by thousands of families.
 </motion.p>
 </div>
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
 <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
 {TIMELINE.map((t, i) => (
 <button key={t.year} onClick={() => setActive(i)}
 className={`flex-shrink-0 lg:flex-shrink text-left px-4 py-3 border transition-all duration-200 rounded-full ${active === i ? "border-[#000f89] bg-[#000f89] text-white" : "border-gray-200 bg-white text-gray-800 hover:border-[#000f89]/40"}`}
 aria-label={`${t.year}: ${t.title}`} aria-pressed={active === i}>
 <span className={`block font-black text-[20px] leading-none tracking-[-0.02em] ${active === i ? "text-white" : "text-gray-800"}`}>{t.year}</span>
 <span className={`block text-[11px] font-semibold tracking-[0.05em] mt-0.5 truncate ${active === i ? "text-white/80" : "text-gray-800"}`}>{t.title}</span>
 </button>
 ))}
 </div>
 <div className="lg:col-span-9">
 <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4 }} className="border border-gray-200 bg-gray-50 p-8 md:p-12 relative overflow-hidden rounded-[20px]">
 <div className="absolute top-6 right-6 font-black text-[#000f89]/[0.04] leading-none pointer-events-none select-none"
 style={{ fontSize: "clamp(60px, 12vw, 140px)" }} aria-hidden="true">{TIMELINE[active].year}</div>
 <div className="relative z-10">
 <div className="inline-flex items-center gap-2 border border-[#000f89]/20 bg-[#000f89]/6 px-3.5 py-1.5 rounded-full mb-6">
 <span className="text-[#000f89] text-[13px] font-semibold">{TIMELINE[active].year}</span>
 </div>
 <h3 className="text-[#00112E] font-extrabold text-[clamp(20px,3.5vw,38px)] leading-[1.06] tracking-[-0.03em] mb-5">
 {TIMELINE[active].title}
 </h3>
 <p className="text-gray-800 text-[14px] font-normal leading-relaxed mb-7 max-w-2xl">{TIMELINE[active].body}</p>
 <div className="flex items-center gap-2.5">
 <div className="w-1.5 h-1.5 rounded-full bg-[#000f89] flex-shrink-0" aria-hidden="true" />
 <p className="text-[#000f89] text-[13px] font-semibold">{TIMELINE[active].highlight}</p>
 </div>
 <div className="flex gap-2 mt-8 pt-6 border-t border-gray-200">
 <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}
 className="px-5 py-2 border border-gray-300 text-gray-800 text-[13px] font-bold hover:border-[#000f89] hover:text-[#000f89] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 rounded-full"
 aria-label="Previous milestone">← Prev</button>
 <button onClick={() => setActive(Math.min(TIMELINE.length - 1, active + 1))} disabled={active === TIMELINE.length - 1}
 className="px-5 py-2 bg-[#000f89] text-white text-[13px] font-bold hover:bg-[#000f89] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 rounded-full"
 aria-label="Next milestone">Next →</button>
 <span className="ml-auto flex items-center text-[13px] text-gray-800 font-normal">{active + 1} / {TIMELINE.length}</span>
 </div>
 </div>
 </motion.div>
 </div>
 </div>
 </div>
 </Section>
 );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIALS real customer reviews
// ═══════════════════════════════════════════════════════════════════════════════
function Testimonials() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-60px" });
 return (
 <Section className="bg-white" label="Real customer reviews R-Zone UK to Nigeria cargo" id="testimonials">
 <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
 style={{ backgroundImage: "radial-gradient(circle, rgba(0,15,137,0.03) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
 <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
 <div className="text-center mb-14">
 <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
 <TagPill label="120+ Five-Star Reviews on Google" dark={false} />
 </motion.div>
 <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
 <SectionHeadline line1="Trusted by" accent="Thousands." dark={false} id="testimonials-heading" />
 </motion.div>
 <motion.p className="text-gray-800 text-[14px] font-normal mt-4 max-w-lg mx-auto"
 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
 120+ five-star Google reviews. Here is what our real customers say.
 </motion.p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {TESTIMONIALS.map((t, i) => (
 <motion.blockquote key={i}
 className={`relative border p-8 ${i === 1 ? "border-[#000f89] bg-[#000f89] shadow-2xl shadow-[#000f89]/20" : "border-gray-200 bg-gray-50"}`}
 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.65, delay: i * 0.12 }}
>
 <Quote size={28} className={`mb-5 ${i === 1 ? "text-white/40" : "text-[#000f89]/15"}`} aria-hidden="true" />
 <div className="flex gap-0.5 mb-4" aria-label={`${t.stars} stars`}
>
 {Array.from({ length: t.stars }).map((_, si) => (
 <Star key={si} size={12} className={i === 1 ? "text-white fill-white" : "text-[#000f89] fill-[#000f89]"} aria-hidden="true" />
 ))}
 </div>
 <p className={`text-[13.5px] font-normal leading-relaxed mb-6 ${i === 1 ? "text-white" : "text-gray-800"}`}
>&ldquo;{t.text}&rdquo;</p>
 <footer>
 <cite className="not-italic">
 <p className={`font-bold text-[13px] ${i === 1 ? "text-white" : "text-gray-800"}`}>{t.author}</p>
 <p className={`text-[11px] font-normal flex items-center gap-1.5 mt-0.5 ${i === 1 ? "text-white/80" : "text-gray-800"}`}>
 <MapPin size={10} aria-hidden="true" />{t.location}
 </p>
 </cite>
 </footer>
 </motion.blockquote>
 ))}
 </div>
 <motion.div className="text-center mt-10" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
 transition={{ duration: 0.5, delay: 0.5 }}>
 <a href="https://www.google.com/search?q=R-Zone+Enterprises+reviews" target="_blank" rel="noopener noreferrer"
 className="inline-flex items-center gap-2 text-[13px] font-bold text-[#000f89] hover:text-[#0000CD] transition-colors duration-200 border-b border-[#000f89]/30 hover:border-[#0000CD]/50 pb-0.5"
 aria-label="Read all 120+ five-star R-Zone reviews on Google (opens in new tab)">
 Read all 120+ reviews on Google <ArrowRight size={12} aria-hidden="true" />
 </a>
 </motion.div>
 </div>
 </Section>
 );
}

// ═══════════════════════════════════════════════════════════════════════════════
// OFFICES
// ═══════════════════════════════════════════════════════════════════════════════
function OurOffices() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-60px" });
 return (
 <Section className="bg-white" label="R-Zone office locations UK and Nigeria" id="offices">
 <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
 style={{ backgroundImage: "radial-gradient(circle, rgba(0,15,137,0.03) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
 <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
 <div className="text-center mb-14">
 <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
 <TagPill label="Where We Operate" dark={false} />
 </motion.div>
 <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
 <SectionHeadline line1="Two Countries." accent="One Team." dark={false} id="offices-heading" />
 </motion.div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {OFFICES.map((office, i) => (
 <motion.div key={office.country} className="group relative border border-gray-200 bg-gray-50 p-8 hover:border-[#000f89]/40 hover:shadow-lg transition-all duration-300 overflow-hidden rounded-[20px]"
 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.65, delay: i * 0.15 }}
>
 <div className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: office.accent }} aria-hidden="true" />
 <div className="flex items-start justify-between mb-6">
 <div>
 <p className="text-4xl mb-2" aria-hidden="true">{office.flag}</p>
 <h3 className="text-[#00112E] font-extrabold text-[20px] tracking-[-0.03em]">{office.country}</h3>
 <p className="mt-0.5 text-[13px] font-semibold" style={{ color: office.accent }}>{office.role}</p>
 </div>
 <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${office.accent}12` }} aria-hidden="true">
 <Building2 size={17} style={{ color: office.accent }} />
 </div>
 </div>
 <div className="space-y-3.5">
 <div className="flex items-start gap-3">
 <MapPin size={13} className="flex-shrink-0 mt-0.5 text-gray-800" aria-hidden="true" />
 <p className="text-gray-800 text-[13px] font-normal leading-snug" dangerouslySetInnerHTML={{ __html: office.address }}></p>
 </div>
 <div className="flex items-center gap-3">
 <Phone size={13} className="flex-shrink-0 text-gray-800" aria-hidden="true" />
 <a href={office.phoneHref} className="text-gray-800 text-[13px] font-medium hover:text-[#000f89] transition-colors"
 aria-label={`Call R-Zone ${office.country}: ${office.phone}`}>{office.phone}</a>
 </div>
 <div className="flex items-center gap-3">
 <Mail size={13} className="flex-shrink-0 text-gray-800" aria-hidden="true" />
 <a href={`mailto:${office.email}`} className="text-gray-800 text-[13px] font-medium hover:text-[#000f89] transition-colors"
 aria-label={`Email R-Zone ${office.country}: ${office.email}`}>{office.email}</a>
 </div>
 <div className="flex items-center gap-3">
 <Clock size={13} className="flex-shrink-0 text-gray-800" aria-hidden="true" />
 <p className="text-gray-800 text-[13px] font-normal">{office.hours}</p>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </Section>
 );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FINAL CTA
// ═══════════════════════════════════════════════════════════════════════════════
function FinalCTA() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-40px" });
 return (
 <Section className="bg-[#00112E]" label="Ship with R-Zone get a free UK to Nigeria cargo quote">
 <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
 <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
 style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,15,137,0.24) 0%, transparent 70%)" }} />
 <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#000f89]/40 to-transparent pointer-events-none" aria-hidden="true" />
 <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28 text-center">
 <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }}>
 <TagPill label="Start Shipping Today" dark />
 <h2 className="text-white font-extrabold text-[clamp(28px,5.5vw,60px)] leading-[1.06] tracking-[-0.03em] mb-5 mt-2">
 Ship from the UK to Nigeria<br />with <span className="text-[#4D4DFF]">R-Zone.</span>
 </h2>
 <p className="text-white/80 text-[14px] font-normal leading-relaxed max-w-xl mx-auto mb-10">
 Join over 10,000 customers who trust R-Zone for UK Nigeria cargo.
 Air freight from £5.80/kg · Sea freight from £3/kg · Weekly departures.
 Free quote in under 2 minutes.
 </p>
 <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
 <Link href="/quote"
 className="group inline-flex items-center gap-2.5 bg-[#0000CD] hover:bg-[#000f89] text-white text-[13px] font-bold px-8 py-4 transition-all duration-200 shadow-xl shadow-[#000f89]/30 rounded-full"
 aria-label="Get a free UK to Nigeria shipping quote from R-Zone">
 Get a Free Quote <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
 </Link>
 <Link href="/services"
 className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[13px] font-bold px-8 py-4 transition-all duration-200 rounded-full"
 aria-label="View all R-Zone UK Nigeria shipping services">
 View Services
 </Link>
 <a href="tel:+448007720864"
 className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[13px] font-bold px-8 py-4 transition-all duration-200 rounded-full"
 aria-label="Call R-Zone UK: +44 800 772 0864">
 <Phone size={13} aria-hidden="true" /> Call Us
 </a>
 </div>
 <div className="flex flex-wrap items-center justify-center gap-6">
 {["Free Quote", "No Obligation", "Same-Day Response", "UK-Based Team", "120+ Google Reviews"].map(t => (
 <span key={t} className="flex items-center gap-2 text-white/80 text-[13px] font-normal">
 <CheckCircle size={11} className="text-[#4D4DFF]" aria-hidden="true" />{t}
 </span>
 ))}
 </div>
 </motion.div>
 </div>
 </Section>
 );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function AboutPageClient() {
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": ["Organization", "LocalBusiness", "FreightForwarder"],
 "@id": "https://r-zoneenterprises.com/#organization",
 "name": "R-Zone Enterprises",
 "alternateName": ["R-Zone Cargo", "RZE Cargo"],
 "url": "https://r-zoneenterprises.com",
 "foundingDate": "2012",
 "description": "UK to Nigeria cargo company with 120+ five-star Google reviews., organically earned. R-Zone Enterprises offers air freight, sea freight with weekly sailings, door-to-door cargo, customs clearance, warehousing and importation between the UK and Nigeria since 2012.",
 "slogan": "UK to Nigeria cargo, door to door, since 2012",
 "telephone": "+448007720864",
 "email": "info@r-zoneenterprises.com",
 "sameAs": ["https://www.instagram.com/rzoneenterprises", "https://www.facebook.com/share/1Gfw2SvFgY/?mibextid=wwXIfr"],
 "address": [
 { "@type": "PostalAddress", "streetAddress": "Unit 9 Moorhen Yard, Elms Lane, Bulphan", "addressLocality": "Upminster", "addressRegion": "Essex", "postalCode": "RM14 3TS", "addressCountry": "GB" },
 { "@type": "PostalAddress", "streetAddress": "1-3 R-Zone Crescent, Queens Park Estate II, Shagam Interchange", "addressLocality": "Lagos", "addressCountry": "NG", "description": "<strong>Collection Points:</strong> Egbeda, Surulele, Ajah, Ibadan" },
 ],
 "areaServed": [
 { "@type": "Country", "name": "United Kingdom" },
 { "@type": "Country", "name": "Nigeria" },
 { "@type": "City", "name": "Lagos" },
 { "@type": "City", "name": "Abuja" },
 { "@type": "City", "name": "London" },
 ],
 "numberOfEmployees": { "@type": "QuantitativeValue", "value": "15" },
 "hasOfferCatalog": {
 "@type": "OfferCatalog",
 "name": "UK Nigeria Cargo & Shipping Services",
 "itemListElement": [
 { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Air Freight UK to Nigeria", "description": "Weekly air cargo from London to Lagos and Abuja. 5 to 10 working days." } },
 { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sea Freight UK to Nigeria Weekly Sailings", "description": "Weekly consolidated sea freight to Lagos. 4 to 6 weeks. From £3/kg." } },
 { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Door to Door Cargo UK to Nigeria", "description": "UK door collection to any of Nigeria's 36 states." } },
 { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Importation from Nigeria to UK", "description": "Weekly air and sea from Nigeria to UK. Full customs clearance included." } },
 { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Customs Clearance UK & Nigeria", "description": "HMRC authorised, NCS compliant customs brokerage." } },
 { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cargo Services Abuja & Lagos", "description": "Door-to-door cargo to Abuja, Lagos and all 36 Nigerian states." } },
 ],
 },
 },
 {
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://r-zoneenterprises.com" },
 { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://r-zoneenterprises.com/about" },
 ],
 },
 {
 "@type": "AboutPage",
 "url": "https://r-zoneenterprises.com/about",
 "name": "About R-Zone Enterprises UK to Nigeria Cargo Company Since 2012",
 "description": "Learn about R-Zone Enterprises the UK to Nigeria cargo company with 120+ five-star Google reviews. Founded in Essex in 2012. Air freight, sea freight and door-to-door cargo.",
 "publisher": { "@id": "https://r-zoneenterprises.com/#organization" },
 },
 ],
 })}} />

 <div className={`${montserrat.variable} ${outfit.variable} font-[family-name:var(--font-montserrat)] w-full`}>
 <Hero />
 <StatsBand />
 <WhoWeAre />
 <Timeline />
 <Testimonials />
 <OurOffices />
 <FinalCTA />
 </div>
 </>
 );
}