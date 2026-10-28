"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { montserrat, outfit } from "../../lib/fonts";
import {
 Plane, Ship, ChevronRight, ArrowRight, Calendar, MapPin,
 Package, CheckCircle, Phone, AlertCircle, ChevronDown, Anchor,
 Shield, Info, Download, BarChart3, Truck, Search,
} from "lucide-react";

const YEAR = String(new Date().getFullYear());

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(d) {
 const day = `${d.getDate()}`.padStart(2, "0");
 const month = MONTH_NAMES[d.getMonth()];
 return `${day} ${month}`;
}

function getCurrentMonthSeaSchedules() {
 const today = new Date();
 const year = today.getFullYear();
 const month = today.getMonth();

 const firstDay = new Date(year, month, 1);
 const lastDay = new Date(year, month + 1, 0);

 // Find first Friday of the month
 let cutoff = new Date(firstDay);
 while (cutoff.getDay() !== 5) {
 cutoff.setDate(cutoff.getDate() + 1);
 }

 const schedules = [];
 let week = 1;
 while (cutoff <= lastDay) {
 const sailing = new Date(cutoff);
 sailing.setDate(cutoff.getDate() + 6); // next week Thursday

 const eta = new Date(sailing);
 eta.setDate(sailing.getDate() + 28); // 4 weeks after sailing

 const status = cutoff < new Date(today.getFullYear(), today.getMonth(), today.getDate()) ? "departed" : "open";

 schedules.push({
 id: `${MONTH_NAMES[month].toLowerCase()}-week${week}`,
 month: MONTH_NAMES[month],
 cutoff: formatDate(cutoff),
 sailing: formatDate(sailing),
 eta: formatDate(eta),
 status,
 vessel: "Grimaldi",
 port: "Lagos",
 });

 cutoff.setDate(cutoff.getDate() + 7);
 week += 1;
 }

 return schedules;
}

const SEA_SCHEDULES = getCurrentMonthSeaSchedules();

const AIR_SCHEDULES = [
 { day: "Friday", departure: "LHR", airline: "Multiple Carriers", transit: "7 days · Arrives next Friday", frequency: "Weekly" },
];

const AIR_RATES = [
 { range: "All weights", rate: "£5.80", per: "per kg", note: "Plus £20 handling fee" },
];

const SEA_RATES = [
 { range: "All weights", rate: "£3.00", per: "per kg", note: "Bags from £65 depending on size" },
];

const STATE_RATES = [
 { state: "Abia", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Abuja (FCT)", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Adamawa", doorToDoor: "7.30", collection: "7.30", minWeight: "30", minWeightNote: null, days: "10" },
 { state: "Akwa Ibom", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Anambra", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Bauchi", doorToDoor: null, collection: "7.30", minWeight: "30", minWeightNote: null, days: "10" },
 { state: "Bayelsa", doorToDoor: "7.30", collection: "7.30", minWeight: "30", minWeightNote: null, days: "10" },
 { state: "Borno", doorToDoor: null, collection: "7.80", minWeight: "20", minWeightNote: null, days: "15" },
 { state: "Cross River", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Delta", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Ebonyi", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Edo", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Ekiti", doorToDoor: "6.30", collection: "6.30", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Enugu", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Gombe", doorToDoor: null, collection: "7.80", minWeight: "20", minWeightNote: null, days: "15" },
 { state: "Imo", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Jigawa", doorToDoor: null, collection: "7.80", minWeight: "20", minWeightNote: null, days: "15" },
 { state: "Kaduna", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Kano", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "12" },
 { state: "Katsina", doorToDoor: null, collection: "7.30", minWeight: "20", minWeightNote: null, days: "15" },
 { state: "Kebbi", doorToDoor: null, collection: "7.30", minWeight: "20", minWeightNote: null, days: "15" },
 { state: "Kogi", doorToDoor: "6.80", collection: "6.50", minWeight: "30", minWeightNote: null, days: "15" },
 { state: "Kwara", doorToDoor: "6.30", collection: "6.30", minWeight: "20", minWeightNote: null, days: "15" },
 { state: "Lagos", doorToDoor: "6.00", collection: "5.80", minWeight: "10", minWeightNote: "10kg Office · 20kg D2D", days: "5 to 7" },
 { state: "Nasarawa", doorToDoor: "7.30", collection: "7.30", minWeight: "20", minWeightNote: null, days: "15" },
 { state: "Niger", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "15" },
 { state: "Ogun", doorToDoor: "6.30", collection: "6.30", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Ondo", doorToDoor: "6.30", collection: "6.30", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Osun", doorToDoor: "6.30", collection: "6.30", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Oyo", doorToDoor: "6.30", collection: "6.30", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Plateau", doorToDoor: "6.80", collection: "6.50", minWeight: "30", minWeightNote: null, days: "15" },
 { state: "Rivers", doorToDoor: "6.80", collection: "6.50", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Sokoto", doorToDoor: null, collection: "7.80", minWeight: "20", minWeightNote: null, days: "10" },
 { state: "Taraba", doorToDoor: null, collection: "7.80", minWeight: "20", minWeightNote: null, days: "15" },
 { state: "Yobe", doorToDoor: null, collection: "7.80", minWeight: "20", minWeightNote: null, days: "15" },
 { state: "Zamfara", doorToDoor: null, collection: "7.80", minWeight: "20", minWeightNote: null, days: "15" },
];

const FIXED_ITEM_RATES = [
 { item: '19" TV', price: 120 },
 { item: '24" TV', price: 160 },
 { item: '32" TV', price: 180 },
 { item: '37" TV', price: 200 },
 { item: '40" TV', price: 230 },
 { item: '42" TV', price: 260 },
 { item: '46" TV', price: 300 },
 { item: '50" TV', price: 350 },
 { item: 'Laptop (15" 17")', price: 50 },
 { item: "Computer & Desktop", price: 150 },
 { item: "Mobile Phone (per unit)", price: 30 },
 { item: "iPad", price: 25 },
 { item: "Printer", price: 50 },
];

const VEHICLE_RATES = [
 { type: "Saloon Car", roro: "£840", note: null },
 { type: "4×4 / Jeep", roro: "£1,130", note: "Max 25 CBM" },
 { type: "Van (Short)", roro: "On Request", note: "Max 30 CBM" },
 { type: "Van (Medium)", roro: "On Request", note: null },
 { type: "Van (Long)", roro: "On Request", note: null },
];

const CONTAINER_RATES = [
 { type: "20 FT", price: "On Request" },
 { type: "40 FT", price: "On Request" },
];

const DOOR_SURCHARGES = [
 { item: "UK Door Collection", price: "From £25", note: "Varies by UK location" },
 { item: "Nigeria Door Delivery", price: "From £20", note: "Lagos & surrounding states" },
 { item: "Out-of-State Delivery", price: "From £35", note: "All 36 states covered" },
 { item: "Packing Service", price: "From £15", note: "Per item packed" },
 { item: "Customs Clearance", price: "Included", note: "On all shipments" },
 { item: "Cargo Insurance", price: "From £10", note: "Recommended for all cargo" },
];

const PRICING_TIERS = [
 {
 name: "Personal", icon: Package, tagline: "For individuals & families",
 accent: "#000f89", featured: false, airRate: "from £5.80/kg", seaRate: "from £3/kg",
 includes: ["Air & sea options", "UK door collection", "Nigeria door delivery", "Real-time tracking", "Customs clearance", "SMS & email notifications"],
 cta: "Get a Quote", href: "/quote",
 },
 {
 name: "Business", icon: BarChart3, tagline: "For SMEs & commercial shippers",
 accent: "#000f89", featured: true, airRate: "from £5.80/kg", seaRate: "from £3/kg",
 includes: ["Discounted bulk rates", "Dedicated account manager", "Priority customs handling", "Weekly reporting", "SLA guarantee", "Credit terms available", "Volume discount schedule"],
 cta: "Contact Sales", href: "/contact",
 },
 {
 name: "Enterprise", icon: Anchor, tagline: "For importers, exporters & volume",
 accent: "#0000CD", featured: false, airRate: "Custom", seaRate: "Custom",
 includes: ["Container rates (FCL/LCL)", "Full supply chain management", "Bespoke SLA & KPIs", "C-suite account access", "Port-to-port or D2D", "Multi-currency invoicing", "Priority boarding"],
 cta: "Talk to Us", href: "/contact",
 },
];

const INCLUDED_ALWAYS = [
 { icon: Shield, label: "Cargo insurance available" },
 { icon: CheckCircle, label: "UK & Nigeria customs clearance" },
 { icon: MapPin, label: "Real-time shipment tracking" },
 { icon: Phone, label: "UK-based customer support" },
];

const FAQS_PRICING = [
 {
 q: "How much does it cost to ship cargo from the UK to Nigeria?",
 a: "Sea freight from the UK to Nigeria starts from £3 per kg (4 to 6 weeks transit). Air freight starts from £5.80 per kg plus a £20 handling fee per shipment, departing every Friday. Air rates vary by state, from £5.80/kg (Lagos, office collection) to £7.80/kg; see the state table on this page.",
 },
 {
 q: "What is the cheapest way to ship from the UK to Nigeria?",
 a: "Sea freight is the cheapest option from £3 per kg with weekly sailings from UK ports to Lagos Apapa and Tin Can Island. Transit time is 4 to 6 weeks. For time-sensitive cargo, air freight from £5.80/kg departs every Friday from LHR, arriving Lagos the following Friday.",
 },
 {
 q: "Are there any extra fees?",
 a: "Air shipments carry a £20 handling fee on top of the per-kg rate. Optional extras such as UK collection, out-of-state delivery, packing and insurance are listed on this page and shown on your quote before you pay. The price you are quoted is the price you pay.",
 },
 {
 q: "How is cargo weight calculated?",
 a: "We charge on actual weight or volumetric weight whichever is greater. Volumetric weight = (L × W × H in cm) ÷ 6,000 for air freight and ÷ 1,000 for sea freight.",
 },
 {
 q: "Do prices include VAT?",
 a: "Exported goods from the UK are generally not charged UK VAT. They are 'zero-rated' (0% VAT) because they are not consumed in the UK, provided specific conditions are met and official evidence of export is kept.",
 },
 {
 q: "Can I get a fixed price for regular UK Nigeria shipments?",
 a: "Yes. Business and enterprise customers can negotiate fixed monthly rates. Contact our sales team to discuss a tailored contract with volume discount pricing.",
 },
 {
 q: "What payment methods does R-Zone accept?",
 a: "We accept bank transfer (BACS/Faster Payments), debit and credit card, and PayPal. We do not accept cash.",
 },
];

const fadeUp = {
 hidden: { opacity: 0, y: 28 },
 visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};

function TagPill({ label, dark = true }) {
 return (
 <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-6 ${dark ? "border-[#0000FF]/30 bg-[#000f89]/14" : "border-[#000f89]/20 bg-[#000f89]/6"}`}>
 <motion.span className="w-1.5 h-1.5 rounded-full bg-[#0000FF] flex-shrink-0"
 animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity }} aria-hidden="true" />
 <span className={`text-[13px] font-semibold ${dark ? "text-[#4D4DFF]" : "text-[#000f89]"}`}>{label}</span>
 </div>
 );
}

function SectionHeading({ line1, accent, dark = true, id }) {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-60px" });
 return (
 <h2 id={id} ref={ref} className={`font-extrabold text-[clamp(26px,4.5vw,52px)] leading-[1.06] tracking-[-0.03em] ${dark ? "text-white" : "text-[#00112E]"}`}>
 {line1}{" "}
 <span className="relative inline-block text-[#4D4DFF]">
 {accent}
 <motion.span className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#0000FF]" aria-hidden="true"
 initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.5 }} />
 </span>
 </h2>
 );
}

const STATUS_CONFIG = {
 departed: { label: "Departed", bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-400" },
 open: { label: "Open", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
 upcoming: { label: "Upcoming", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
 full: { label: "Full", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
// Same composition as the homepage and importation heroes: headline left,
// intro and actions right, then one panel with the four facts people come for.
const HERO_FACTS = [
 { icon: Plane, val: "Every Friday", label: "Air departures" },
 { icon: Ship, val: "Weekly", label: "Sea sailings" },
 { icon: Plane, val: "£5.80/kg", label: "Air freight from" },
 { icon: Ship, val: "£3/kg", label: "Sea freight from" },
];

function Hero() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true });
 const rise = (d) => ({ initial: { opacity: 0, y: 18 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } });
 return (
 <section className="relative bg-[#00112E] overflow-hidden hero-section" aria-labelledby="sp-hero-heading">
 <div className="absolute inset-0 opacity-[0.035] pointer-events-none" aria-hidden="true"
 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
 <div className="absolute top-[-15%] left-[5%] w-[760px] h-[520px] bg-[#000f89]/25 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />

 <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pt-[120px] pb-16 md:pb-20">
 <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10 lg:mt-[4px] max-lg:-mt-[23px]"
 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
 <Link href="/" className="text-white/80 text-[13px] font-medium hover:text-white transition-colors">Home</Link>
 <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
 <span className="text-white text-[13px] font-medium" aria-current="page">Schedules &amp; Prices</span>
 </motion.nav>

 <motion.div {...rise(0.05)}>
 <TagPill label={`${YEAR} schedules and rates, UK to Nigeria`} dark />
 </motion.div>

 <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
 <motion.h1 id="sp-hero-heading" {...rise(0.12)}
 className="text-white font-extrabold text-[clamp(40px,5.6vw,80px)] leading-[0.98] tracking-[-0.045em] lg:col-span-7">
 UK Nigeria Cargo Schedules &amp;{" "}
 <span className="text-[#4D4DFF]">Prices.</span>
 </motion.h1>

 <motion.div {...rise(0.24)} className="lg:col-span-5 lg:pb-2">
 <p className="max-w-[46ch] text-[clamp(1.05rem,1.4vw,1.2rem)] font-medium leading-[1.6] text-white/75">
 Weekly air and sea departures, and per-kg prices for all 36 Nigerian states,
 so you can plan and price your shipment before you book.
 </p>
 <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
 <a href="#rates" className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#0000CD] px-7 text-[15.5px] font-bold text-white shadow-[0_14px_36px_-12px_rgba(0,0,205,0.85)] transition-colors hover:bg-[#000f89]"
 aria-label="See UK to Nigeria prices by state">
 See prices by state
 <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
 </a>
 <a href="#schedules" className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-7 text-[15.5px] font-bold text-white transition-colors hover:border-white/50 hover:bg-white/[0.12]"
 aria-label="See UK to Nigeria sailing and flight schedules">
 <Calendar size={16} aria-hidden="true" /> Sailing dates
 </a>
 </div>
 </motion.div>
 </div>

 <motion.dl {...rise(0.36)} className="mt-12 grid grid-cols-2 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] lg:grid-cols-4">
 {HERO_FACTS.map(({ icon: Icon, val, label }, i) => (
 <div key={label} className={`px-6 py-6 md:px-8 md:py-7 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
 <dt className="flex items-center gap-2 text-[13px] font-semibold text-white/60">
 <Icon size={14} className="text-[#8C8CFF]" aria-hidden="true" />{label}
 </dt>
 <dd className="mt-2 text-[clamp(22px,2.4vw,32px)] font-extrabold leading-none tracking-[-0.03em] text-white">{val}</dd>
 </div>
 ))}
 </motion.dl>
 </div>
 </section>
 );
}

// ─── JUMP NAV ─────────────────────────────────────────────────────────────────
// A long page with six distinct answers; let people go straight to theirs.
const JUMPS = [
 { href: "#schedules", label: "Schedules", icon: Calendar },
 { href: "#rates", label: "Rates by state", icon: MapPin },
 { href: "#electronics", label: "Electronics", icon: Package },
 { href: "#vehicles", label: "Cars & containers", icon: Truck },
 { href: "#extras", label: "Extras", icon: CheckCircle },
 { href: "#faq", label: "FAQs", icon: Info },
];

function JumpNav() {
 return (
 <nav aria-label="On this page" className="sticky top-[73px] lg:top-[65px] z-20 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
 <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
 <ul className="flex items-center gap-1 overflow-x-auto no-scrollbar">
 {JUMPS.map(({ href, label, icon: Icon }) => (
 <li key={href} className="flex-shrink-0">
 <a href={href} className="flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2.5 my-1.5 text-[14px] font-semibold text-gray-700 transition-colors hover:bg-[#F2F4FA] hover:text-[#00112E]">
 <Icon size={15} className="text-[#0000CD]" aria-hidden="true" />{label}
 </a>
 </li>
 ))}
 </ul>
 </div>
 </nav>
 );
}

// ─── SCHEDULES ────────────────────────────────────────────────────────────────
function SchedulesSection() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-60px" });
 const [activeTab, setActiveTab] = useState("sea");
 const tabs = [
 { id: "sea", label: "Sea Freight UK to Nigeria", icon: Ship },
 { id: "air", label: "Air Freight UK to Nigeria", icon: Plane },
 ];

 return (
 <section id="schedules" ref={ref} className="relative bg-[#00112E] overflow-hidden scroll-mt-20"
 aria-labelledby="schedules-heading">
 <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
 <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#000f89]/50 to-transparent pointer-events-none" aria-hidden="true" />

 <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
 <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
 <div>
 <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
 <TagPill label={`${YEAR} UK Nigeria Sailing & Flight Schedule`} dark />
 </motion.div>
 <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
 <SectionHeading line1="UK Nigeria Sailing &amp;" accent="Flight Schedules." dark id="schedules-heading" />
 </motion.div>
 <motion.p className="text-white/80 text-[14px] font-normal mt-4 max-w-xl"
 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
 All {YEAR} UK Nigeria departure dates. Sea cargo has a strict weekly cut-off book early to guarantee your space on the next sailing to Lagos.
 </motion.p>
 </div>
 <motion.div className="flex flex-wrap gap-3 flex-shrink-0"
 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
 {Object.entries(STATUS_CONFIG).map(([key, val]) => (
 <div key={key} className="flex items-center gap-2 border border-white/[0.08] bg-white/[0.04] px-3 py-1.5">
 <span className={`w-2 h-2 rounded-full flex-shrink-0 ${val.dot}`} aria-hidden="true" />
 <span className="text-white/80 text-[13px] font-medium">{val.label}</span>
 </div>
 ))}
 </motion.div>
 </div>

 {/* Tabs */}
 <motion.div className="flex gap-0 border-b border-white/[0.08] mb-8 overflow-x-auto" role="tablist" aria-label="UK Nigeria shipping schedule type"
 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.25 }}>
 {tabs.map(tab => {
 const Icon = tab.icon;
 const isActive = activeTab === tab.id;
 return (
 <button key={tab.id} role="tab" aria-selected={isActive} aria-controls={`tab-panel-${tab.id}`} id={`tab-${tab.id}`}
 onClick={() => setActiveTab(tab.id)}
 className={`flex items-center gap-2 px-6 py-3.5 text-[13px] font-semibold whitespace-nowrap border-b-2 transition-all duration-200 flex-shrink-0 rounded-full ${isActive ? "border-[#0000FF] text-white" : "border-transparent text-white/80 hover:text-white hover:border-white/25"}`}>
 <Icon size={13} aria-hidden="true" />{tab.label}
 </button>
 );
 })}
 </motion.div>

 <AnimatePresence mode="wait">
 {/* SEA */}
 {activeTab === "sea" && (
 <motion.div key="sea" id="tab-panel-sea" role="tabpanel" aria-labelledby="tab-sea"
 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
 <div className="flex items-start gap-3 border border-[#0000FF]/20 bg-[#000f89]/12 px-5 py-3.5 mb-6 rounded-[20px]">
 <Info size={14} className="text-[#4D4DFF] flex-shrink-0 mt-0.5" aria-hidden="true" />
 <p className="text-white/80 text-[13px] font-normal leading-snug">
 <strong className="text-white font-semibold">Cut-off date</strong> is the last day to drop off at our Upminster warehouse or arrange UK door collection.
 The vessel sails 5 days after cut-off. ETA to Lagos is typically 4 to 6 weeks.
 </p>
 </div>
 {/* Desktop table */}
 <div className="hidden md:block overflow-hidden border border-white/[0.07] rounded-[20px]">
 <table className="w-full" aria-label="Sea freight sailing schedule UK to Nigeria 2025">
 <thead>
 <tr className="border-b border-white/[0.08] bg-white/[0.04]">
 {["Month","Cargo Cut-Off","Sailing Date","ETA Lagos","Vessel","Port","Status",""].map(h => (
 <th key={h} scope="col" className="px-4 py-3 text-left text-[11px] font-bold tracking-[0.22em] uppercase text-white/80">{h}</th>
 ))}
 </tr>
 </thead>
 <tbody>
 {SEA_SCHEDULES.map((row, i) => {
 const s = STATUS_CONFIG[row.status];
 const isOpen = row.status === "open" || row.status === "upcoming";
 return (
 <motion.tr key={row.id}
 className={`border-b border-white/[0.05] last:border-0 transition-colors duration-150 ${isOpen ? "bg-white/[0.025] hover:bg-white/[0.05]" : "hover:bg-white/[0.02]"}`}
 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
 <td className="px-4 py-3.5"><span className={`font-bold text-[13px] ${isOpen ? "text-white" : "text-white/80"}`}>{row.month}</span></td>
 <td className="px-4 py-3.5"><span className="text-[13px] font-medium text-white/80">{row.cutoff}</span></td>
 <td className="px-4 py-3.5"><span className="text-[13px] font-medium text-white/80">{row.sailing}</span></td>
 <td className="px-4 py-3.5"><span className={`text-[13px] font-medium ${isOpen ? "text-[#4D4DFF]" : "text-white/80"}`}>{row.eta}</span></td>
 <td className="px-4 py-3.5"><span className="text-[13px] font-normal text-white/80">{row.vessel}</span></td>
 <td className="px-4 py-3.5"><span className="text-[13px] font-normal text-white/80">{row.port}</span></td>
 <td className="px-4 py-3.5">
 <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${s.bg} ${s.text}`}>
 <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} aria-hidden="true" />{s.label}
 </span>
 </td>
 <td className="px-4 py-3.5">
 {isOpen && (
 <Link href="/quote" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#4D4DFF] hover:text-white transition-colors"
 aria-label={`Book ${row.month} sea freight sailing to Nigeria`}>
 Book <ArrowRight size={9} aria-hidden="true" />
 </Link>
 )}
 </td>
 </motion.tr>
 );
 })}
 </tbody>
 </table>
 </div>
 {/* Mobile */}
 <div className="md:hidden space-y-3">
 {SEA_SCHEDULES.map((row, i) => {
 const s = STATUS_CONFIG[row.status];
 const isOpen = row.status === "open" || row.status === "upcoming";
 return (
 <motion.div key={row.id}
 className={`border p-4 rounded-[20px] ${isOpen ? "border-white/[0.12] bg-white/[0.04]" : "border-white/[0.05] bg-white/[0.015]"}`}
 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
 <div className="flex items-center justify-between mb-3">
 <span className={`font-black text-[16px] ${isOpen ? "text-white" : "text-white/80"}`}>{row.month} {YEAR}</span>
 <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${s.bg} ${s.text}`}>
 <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} aria-hidden="true" />{s.label}
 </span>
 </div>
 <div className="grid grid-cols-2 gap-2 text-[13px]">
 <div><span className="text-white/80 font-normal">Cut-off</span><br /><span className="text-white/80 font-medium">{row.cutoff}</span></div>
 <div><span className="text-white/80 font-normal">Sailing</span><br /><span className="text-white/80 font-medium">{row.sailing}</span></div>
 <div><span className="text-white/80 font-normal">ETA Lagos</span><br /><span className={isOpen ? "text-[#4D4DFF] font-medium" : "text-white/80"}>{row.eta}</span></div>
 <div><span className="text-white/80 font-normal">Port</span><br /><span className="text-white/80">{row.port}</span></div>
 </div>
 {isOpen && (
 <Link href="/quote" className="mt-3 flex items-center gap-1.5 text-[13px] font-bold text-[#4D4DFF] hover:text-white transition-colors"
 aria-label={`Book ${row.month} sea freight to Nigeria`}>
 Book this sailing <ArrowRight size={9} aria-hidden="true" />
 </Link>
 )}
 </motion.div>
 );
 })}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
 <button className="inline-flex items-center gap-2.5 border border-white/25 hover:border-[#000f89] hover:bg-[#000f89]/15 text-white/80 hover:text-white text-[13px] font-bold px-5 py-2.5 transition-all duration-200 rounded-full"
 aria-label="Download 2025 UK to Nigeria sea freight schedule PDF">
 <Download size={12} aria-hidden="true" />Download {YEAR} Schedule PDF
 </button>
 <Link href="/quote" className="inline-flex items-center gap-2 bg-[#0000CD] hover:bg-[#000f89] text-white text-[13px] font-bold px-5 py-2.5 transition-all duration-200 shadow-lg shadow-[#000f89]/25 rounded-full"
 aria-label="Book sea freight from UK to Nigeria">
 Book Sea Freight <ArrowRight size={11} aria-hidden="true" />
 </Link>
 </div>
 </motion.div>
 )}

 {/* AIR */}
 {activeTab === "air" && (
 <motion.div key="air" id="tab-panel-air" role="tabpanel" aria-labelledby="tab-air"
 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
 <div className="flex items-start gap-3 border border-[#0000FF]/20 bg-[#000f89]/12 px-5 py-3.5 mb-8 rounded-[20px]">
 <Info size={14} className="text-[#4D4DFF] flex-shrink-0 mt-0.5" aria-hidden="true" />
 <p className="text-white/80 text-[13px] font-normal leading-snug">
 Air freight to Nigeria departs <strong className="text-white font-semibold">every Friday</strong> from London Heathrow (LHR) to Lagos (LOS).
 Cargo must be received by <strong className="text-white font-semibold">12pm Friday</strong> for same-day dispatch arrives Lagos the <strong className="text-white font-semibold">following Friday</strong>.
 </p>
 </div>
 <div className="flex justify-center mb-10">
 {AIR_SCHEDULES.map((sched, i) => (
 <motion.div key={sched.day} className="w-full max-w-lg border border-white/[0.1] bg-white/[0.04] p-8 relative overflow-hidden group hover:border-[#000f89]/50 hover:bg-[#000f89]/10 transition-all duration-300 rounded-[20px]"
 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
 <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#000f89] to-[#0000FF] w-0 group-hover:w-full transition-all duration-500" aria-hidden="true" />
 <div className="w-10 h-10 bg-[#000f89]/20 flex items-center justify-center mb-4 rounded-full" aria-hidden="true">
 <Plane size={16} className="text-[#4D4DFF]" />
 </div>
 <p className="text-white/80 mb-1 text-[13px] font-semibold">{sched.frequency} Departure</p>
 <p className="text-white font-black text-[20px] leading-none tracking-[-0.01em] mb-1">{sched.day}</p>
 <p className="text-white/80 text-[13px] font-normal mb-3">{sched.departure}</p>
 <div className="flex items-center justify-between gap-6 border-t border-white/[0.07] pt-4">
 <div className="min-w-0">
 <p className="text-white/80 mb-0.5 text-[13px] font-semibold">Transit</p>
 <p className="text-[#4D4DFF] font-bold text-[14px] whitespace-nowrap">{sched.transit}</p>
 </div>
 <div className="text-right shrink-0">
 <p className="text-white/80 mb-0.5 text-[13px] font-semibold">Carrier</p>
 <p className="text-white/80 text-[14px] font-normal">{sched.airline}</p>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 {/* Journey steps */}
 <div className="border border-white/[0.08] bg-white/[0.03] p-7 md:p-9 mb-8 rounded-[20px]">
 <p className="text-white/80 mb-7 text-[13px] font-semibold">
 Typical Air Freight Journey UK to Nigeria
 </p>
 <div className="flex items-center gap-0 overflow-x-auto">
 {[
 { label: "Fri · Wk 1", title: "Book & Drop Off", sub: "12pm cut-off deadline", icon: Package },
 { label: "Fri · Wk 1", title: "Departs LHR", sub: "Cargo loaded & airside", icon: Plane },
 { label: "Sat Thu", title: "In Transit", sub: "UK → Lagos", icon: Anchor },
 { label: "Thu · Wk 2", title: "Lagos Airport", sub: "LOS customs clearance", icon: MapPin },
 { label: "Fri · Wk 2", title: "Cleared & Delivered", sub: "Door or Lagos pickup", icon: CheckCircle },
 ].map((step, si) => {
 const Icon = step.icon;
 return (
 <div key={si} className="flex items-center flex-shrink-0">
 <div className="text-center px-4">
 <div className="w-10 h-10 rounded-full bg-[#000f89]/25 border border-[#000f89]/40 flex items-center justify-center mx-auto mb-2" aria-label={step.title}>
 <Icon size={14} className="text-[#4D4DFF]" aria-hidden="true" />
 </div>
 <p className="mb-0.5 text-[13px] font-semibold inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white/[0.08] text-[#A6A6FF]">{step.label}</p>
 <p className="text-white/80 font-semibold text-[13px] leading-tight">{step.title}</p>
 <p className="text-white/80 text-[12px] font-normal mt-0.5">{step.sub}</p>
 </div>
 {si < 4 && <div className="h-px w-8 bg-gradient-to-r from-[#000f89]/50 to-[#0000FF]/50 flex-shrink-0" aria-hidden="true" />}
 </div>
 );
 })}
 </div>
 </div>
 <Link href="/quote" className="inline-flex items-center gap-2 bg-[#0000CD] hover:bg-[#000f89] text-white text-[13px] font-bold px-6 py-3 transition-all duration-200 shadow-lg shadow-[#000f89]/25 rounded-full"
 aria-label="Book air freight from UK to Nigeria">
 Book Air Freight <ArrowRight size={11} aria-hidden="true" />
 </Link>
 </motion.div>
 )}

 </AnimatePresence>
 </div>
 </section>
 );
}

// ─── DIVIDER ──────────────────────────────────────────────────────────────────

// ─── PRICING ──────────────────────────────────────────────────────────────────
// One idea per block, in the order people ask: what does it cost, what does it
// cost to my state, fixed prices for electronics, vehicles, extras, questions.
const SUMMARY = [
 { icon: Plane, name: "Air freight", price: "£5.80", unit: "/kg", from: true, lines: ["Departs every Friday", "Plus £20 handling per shipment"] },
 { icon: Ship, name: "Sea freight", price: "£3", unit: "/kg", from: true, lines: ["Weekly sailings to Lagos", "4 to 6 weeks transit"] },
 { icon: Truck, name: "Door to door, Lagos", price: "£5.80", unit: "/kg", from: false, lines: ["Air, delivered to your door", "Other states in the table below"] },
];

function BlockHeading({ id, eyebrow, title, intro }) {
 return (
 <div className="mb-8 max-w-3xl">
 {eyebrow && <p className="mb-3 inline-flex rounded-full bg-[#000f89]/[0.07] px-3.5 py-1.5 text-[13px] font-semibold text-[#000f89]">{eyebrow}</p>}
 <h3 id={id} className="text-[#00112E] font-extrabold text-[clamp(24px,3vw,34px)] leading-[1.1] tracking-[-0.03em]">{title}</h3>
 {intro && <p className="mt-3 text-[16px] leading-[1.7] text-gray-600">{intro}</p>}
 </div>
 );
}

function PricingSection() {
 const [query, setQuery] = useState("");
 const q = query.trim().toLowerCase();
 const rows = q ? STATE_RATES.filter((r) => r.state.toLowerCase().includes(q)) : STATE_RATES;

 return (
 <section id="pricing" className="relative bg-white scroll-mt-32" aria-labelledby="pricing-heading">
 <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">

 {/* Headline prices */}
 <div className="mb-10 max-w-4xl">
 <TagPill label="Prices" dark={false} />
 <h2 id="pricing-heading" className="text-[#00112E] font-extrabold text-[clamp(32px,4.6vw,56px)] leading-[1.04] tracking-[-0.035em]">
 Clear prices, <span className="text-[#0000CD]">before you book.</span>
 </h2>
 <p className="mt-4 text-[17px] leading-[1.7] text-gray-600">
 Rates are per kilo. You pay on actual or volumetric weight, whichever is greater,
 and customs clearance is included.
 </p>
 </div>

 <div className="grid gap-5 md:grid-cols-3">
 {SUMMARY.map(({ icon: Icon, name, price, unit, from, lines }, i) => (
 <div key={name} className={`relative overflow-hidden rounded-[24px] p-7 md:p-8 ${i === 0 ? "bg-[#000f89] text-white" : "bg-[#F6FAFF] ring-1 ring-[#E3EAF7]"}`}>
 {i === 0 && <span className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />}
 <p className={`relative flex items-center gap-2 text-[15px] font-bold ${i === 0 ? "text-white" : "text-[#00112E]"}`}>
 <span className={`flex h-9 w-9 items-center justify-center rounded-full ${i === 0 ? "bg-white/15" : "bg-[#0000CD]/10"}`} aria-hidden="true">
 <Icon size={16} className={i === 0 ? "text-white" : "text-[#0000CD]"} />
 </span>
 {name}
 </p>
 <p className="relative mt-6 leading-none">
 {from && <span className={`mr-1.5 text-[14px] font-semibold ${i === 0 ? "text-white/70" : "text-gray-500"}`}>from</span>}
 <span className={`text-[clamp(40px,4.4vw,56px)] font-extrabold tracking-[-0.04em] ${i === 0 ? "text-white" : "text-[#00112E]"}`}>{price}</span>
 <span className={`ml-1 text-[16px] font-semibold ${i === 0 ? "text-white/70" : "text-gray-500"}`}>{unit}</span>
 </p>
 <ul className="relative mt-6 space-y-2">
 {lines.map((l) => (
 <li key={l} className={`flex items-center gap-2 text-[15px] ${i === 0 ? "text-white/85" : "text-gray-700"}`}>
 <CheckCircle size={15} className={i === 0 ? "text-white/70" : "text-[#0000CD]"} aria-hidden="true" />{l}
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 <p className="mt-4 text-[14px] text-gray-500">
 Volumetric weight: air L×W×H (cm) ÷ 6,000, sea ÷ 1,000. Rates are indicative and confirmed on your quote.
 </p>

 {/* Rates by state */}
 <div id="rates" className="mt-20 scroll-mt-36">
 <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
 <BlockHeading eyebrow="All 36 states and the FCT" title="Air rates by state"
 intro="Door to door delivery or office collection, per kilo. Office only means collection from our office in that state." />
 <label className="relative mb-8 block w-full lg:w-[320px]">
 <span className="sr-only">Find your state</span>
 <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
 <input value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Find your state, e.g. Rivers"
 className="h-[52px] w-full rounded-full border border-gray-300 bg-white pl-11 pr-4 text-[15px] text-[#00112E] placeholder:text-gray-400 focus:border-[#0000CD] focus:outline-none focus:ring-2 focus:ring-[#0000CD]/20" />
 </label>
 </div>

 <div className="overflow-hidden rounded-[24px] ring-1 ring-[#E3EAF7]">
 <div className="max-h-[640px] overflow-auto">
 <table className="w-full min-w-[640px] text-left" aria-label="Air cargo rates by Nigerian state">
 <thead className="sticky top-0 z-10 bg-[#00112E] text-white">
 <tr>
 {["State", "Door to door", "Office collection", "Min. weight", "Delivery"].map((h) => (
 <th key={h} scope="col" className="px-5 py-4 text-[13px] font-semibold">{h}</th>
 ))}
 </tr>
 </thead>
 <tbody className="text-[15px]">
 {rows.map((row) => {
 const lagos = row.state === "Lagos";
 return (
 <tr key={row.state} className={`border-t border-[#EEF2F9] ${lagos ? "bg-[#0000CD]/[0.05]" : "hover:bg-[#F6FAFF]"}`}>
 <th scope="row" className="px-5 py-3.5 font-semibold text-[#00112E]">
 {row.state}
 {lagos && <span className="ml-2 rounded-full bg-[#0000CD] px-2 py-0.5 text-[11px] font-bold text-white">Lowest</span>}
 </th>
 <td className="px-5 py-3.5">
 {row.doorToDoor
 ? <span className="font-bold text-[#00112E]">£{row.doorToDoor}<span className="font-normal text-gray-500">/kg</span></span>
 : <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[13px] font-semibold text-amber-700">Office only</span>}
 </td>
 <td className="px-5 py-3.5 font-bold text-[#00112E]">£{row.collection}<span className="font-normal text-gray-500">/kg</span></td>
 <td className="px-5 py-3.5 text-gray-600">
 {row.minWeight}kg
 {row.minWeightNote && <span className="block text-[12.5px] text-gray-500">{row.minWeightNote}</span>}
 </td>
 <td className="px-5 py-3.5 text-gray-600">{row.days} days</td>
 </tr>
 );
 })}
 {rows.length === 0 && (
 <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-500">No state matches “{query}”.</td></tr>
 )}
 </tbody>
 </table>
 </div>
 </div>
 <p className="mt-4 text-[14px] text-gray-500">Every air shipment carries a £20 handling fee. Minimum weights apply per shipment.</p>
 </div>

 {/* Electronics */}
 <div id="electronics" className="mt-20 scroll-mt-36">
 <BlockHeading eyebrow="Fixed prices, door to door in Lagos" title="TVs, laptops and phones"
 intro="One flat price per item, delivered to a Lagos address. For other states, ask for a quote." />
 <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
 {FIXED_ITEM_RATES.map((row) => (
 <li key={row.item} className="flex flex-col justify-between rounded-[18px] bg-[#F6FAFF] p-5 ring-1 ring-[#E3EAF7]">
 <span className="text-[14.5px] font-semibold text-gray-700">{row.item}</span>
 <span className="mt-3 text-[26px] font-extrabold tracking-[-0.03em] text-[#00112E]">£{row.price}</span>
 </li>
 ))}
 </ul>
 <p className="mt-4 flex items-start gap-2 text-[14px] text-gray-600">
 <AlertCircle size={16} className="mt-0.5 flex-shrink-0 text-amber-600" aria-hidden="true" />
 Items must be properly packed; we cannot accept liability for poorly packed goods.
 </p>
 </div>

 {/* Cars and containers */}
 <div id="vehicles" className="mt-20 scroll-mt-36">
 <BlockHeading eyebrow="Port to port, Tin Can Island or Apapa" title="Cars and containers"
 intro="Prices cover the sea passage only. Loading, haulage and clearing are quoted separately." />
 <div className="grid gap-5 lg:grid-cols-2">
 <div className="rounded-[24px] p-7 ring-1 ring-[#E3EAF7]">
 <p className="flex items-center gap-2 text-[16px] font-bold text-[#00112E]"><Truck size={18} className="text-[#0000CD]" aria-hidden="true" />Vehicles (RoRo)</p>
 <dl className="mt-5 divide-y divide-[#EEF2F9]">
 {VEHICLE_RATES.map((row) => (
 <div key={row.type} className="flex items-baseline justify-between gap-4 py-3.5">
 <dt className="text-[15px] text-gray-700">{row.type}{row.note && <span className="ml-2 text-[13px] text-gray-500">{row.note}</span>}</dt>
 <dd className={`text-[16px] font-bold ${row.roro.startsWith("£") ? "text-[#00112E]" : "text-gray-500"}`}>{row.roro}</dd>
 </div>
 ))}
 </dl>
 </div>
 <div className="flex flex-col rounded-[24px] p-7 ring-1 ring-[#E3EAF7]">
 <p className="flex items-center gap-2 text-[16px] font-bold text-[#00112E]"><Anchor size={18} className="text-[#0000CD]" aria-hidden="true" />Containers</p>
 <dl className="mt-5 divide-y divide-[#EEF2F9]">
 {CONTAINER_RATES.map((row) => (
 <div key={row.type} className="flex items-baseline justify-between gap-4 py-3.5">
 <dt className="text-[15px] text-gray-700">{row.type} container</dt>
 <dd className="text-[16px] font-bold text-gray-500">{row.price}</dd>
 </div>
 ))}
 </dl>
 <Link href="/contact" className="group mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#0000CD] px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#000f89]">
 Request a container quote <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
 </Link>
 </div>
 </div>
 </div>

 {/* Extras */}
 <div id="extras" className="mt-20 scroll-mt-36">
 <BlockHeading eyebrow="Optional, shown on your quote" title="Extras, and what is always included" />
 <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
 <dl className="divide-y divide-[#EEF2F9] rounded-[24px] px-7 py-2 ring-1 ring-[#E3EAF7]">
 {DOOR_SURCHARGES.map((item) => (
 <div key={item.item} className="flex items-baseline justify-between gap-4 py-4">
 <dt>
 <span className="block text-[15.5px] font-semibold text-[#00112E]">{item.item}</span>
 <span className="block text-[14px] text-gray-500">{item.note}</span>
 </dt>
 <dd className="whitespace-nowrap text-[16px] font-bold text-[#00112E]">{item.price}</dd>
 </div>
 ))}
 </dl>
 <div className="rounded-[24px] bg-[#00112E] p-7 text-white">
 <p className="text-[16px] font-bold text-white">Included with every shipment</p>
 <ul className="mt-5 space-y-3.5">
 {INCLUDED_ALWAYS.map(({ icon: Icon, label }) => (
 <li key={label} className="flex items-center gap-3 text-[15px] text-white/85">
 <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10" aria-hidden="true"><Icon size={15} className="text-[#A6A6FF]" /></span>
 {label}
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>

 {/* FAQs: answers are always in the page (FAQPage schema must match visible content) */}
 <div id="faq" className="mt-20 scroll-mt-36 max-w-4xl">
 <BlockHeading eyebrow="Prices and payment" title="Common questions" />
 <div className="space-y-3">
 {FAQS_PRICING.map((item) => (
 <details key={item.q} className="group rounded-[18px] bg-white ring-1 ring-[#E3EAF7] open:ring-[#0000CD]/30">
 <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[16px] font-semibold text-[#00112E] [&::-webkit-details-marker]:hidden">
 {item.q}
 <ChevronDown size={18} className="flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" aria-hidden="true" />
 </summary>
 <p className="px-6 pb-6 text-[15.5px] leading-[1.75] text-gray-600">{item.a}</p>
 </details>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}

// ─── Schema ───────────────────────────────────────────────────────────────────
const SCHEMA_LD = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://r-zoneenterprises.com" },
 { "@type": "ListItem", "position": 2, "name": "Schedules & Prices", "item": "https://r-zoneenterprises.com/schedulesprices" },
 ],
 },
 {
 "@type": "FAQPage",
 "mainEntity": FAQS_PRICING.map(f => ({
 "@type": "Question",
 "name": f.q,
 "acceptedAnswer": { "@type": "Answer", "text": f.a },
 })),
 },
 {
 "@type": "Service",
 "name": "Sea Freight UK to Nigeria Weekly Sailings",
 "provider": { "@type": "Organization", "name": "R-Zone Enterprises", "@id": "https://r-zoneenterprises.com/#organization" },
 "description": "Weekly sea freight sailings from UK ports to Lagos Apapa and Tin Can Island. 4 to 6 weeks transit. FCL and LCL available. The cheapest way to ship from the UK to Nigeria from £3/kg.",
 "offers": { "@type": "Offer", "priceCurrency": "GBP", "price": "3.00", "unitCode": "KGM", "description": "Sea freight UK to Nigeria from £3 per kg" },
 "areaServed": ["United Kingdom", "Nigeria"],
 "serviceType": "Sea Freight",
 },
 {
 "@type": "Service",
 "name": "Air Freight UK to Nigeria Weekly Departures",
 "provider": { "@type": "Organization", "name": "R-Zone Enterprises", "@id": "https://r-zoneenterprises.com/#organization" },
 "description": "Air freight from UK to Nigeria. Weekly Friday departures from London Heathrow (LHR) to Lagos (LOS). Cargo cut-off 12pm Friday arrives Lagos the following Friday. 7 days transit.",
 "offers": { "@type": "Offer", "priceCurrency": "GBP", "price": "5.80", "unitCode": "KGM", "description": "Air freight UK to Nigeria from £5.80 per kg, plus a £20 handling fee per shipment" },
 "areaServed": ["United Kingdom", "Nigeria"],
 "serviceType": "Air Freight",
 },
 {
 "@type": "WebPage",
 "url": "https://r-zoneenterprises.com/schedulesprices",
 "name": "UK to Nigeria Cargo Schedules & Prices R-Zone Enterprises",
 "description": "Weekly UK to Nigeria sea sailings and Friday air departures, with per-kg rates for all 36 states. Sea freight from £3/kg, air freight from £5.80/kg.",
 "publisher": { "@id": "https://r-zoneenterprises.com/#organization" },
 },
 ],
};

export default function SchedulesPricesClient() {
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_LD) }} />
 <div className={`${montserrat.variable} ${outfit.variable} font-[family-name:var(--font-montserrat)] w-full`}>
 <Hero />
 <JumpNav />
 <SchedulesSection />
 <PricingSection />
 </div>
 </>
 );
}