"use client";

import { Montserrat, Outfit } from "next/font/google";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Plane, Ship, ChevronRight, ArrowRight,
  Calendar, Clock, MapPin, Package,
  CheckCircle, Phone, AlertCircle,
  ChevronDown, Anchor, Star, Shield,
  Info, Download, BarChart3, Truck,
  Zap, TrendingDown, Weight,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

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
  { range: "All weights", rate: "£5.20", per: "per kg", note: "Plus £20 handling fee" },
];

const SEA_RATES = [
  { range: "All weights", rate: "£2.00", per: "per kg", note: "Bags from £65 depending on size" },
];

const STATE_RATES = [
  { state: "Abia",        doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Abuja (FCT)", doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Adamawa",     doorToDoor: "7.00", collection: "7.00", minWeight: "30", minWeightNote: null,                    days: "10"  },
  { state: "Akwa Ibom",   doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Anambra",     doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Bauchi",      doorToDoor: null,   collection: "7.00", minWeight: "30", minWeightNote: null,                    days: "10"  },
  { state: "Bayelsa",     doorToDoor: "7.00", collection: "7.00", minWeight: "30", minWeightNote: null,                    days: "10"  },
  { state: "Borno",       doorToDoor: null,   collection: "7.50", minWeight: "20", minWeightNote: null,                    days: "15"  },
  { state: "Cross River", doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Delta",       doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Ebonyi",      doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Edo",         doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Ekiti",       doorToDoor: "6.00", collection: "6.00", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Enugu",       doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Gombe",       doorToDoor: null,   collection: "7.50", minWeight: "20", minWeightNote: null,                    days: "15"  },
  { state: "Imo",         doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Jigawa",      doorToDoor: null,   collection: "7.50", minWeight: "20", minWeightNote: null,                    days: "15"  },
  { state: "Kaduna",      doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Kano",        doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "12"  },
  { state: "Katsina",     doorToDoor: null,   collection: "7.00", minWeight: "20", minWeightNote: null,                    days: "15"  },
  { state: "Kebbi",       doorToDoor: null,   collection: "7.00", minWeight: "20", minWeightNote: null,                    days: "15"  },
  { state: "Kogi",        doorToDoor: "6.50", collection: "6.20", minWeight: "30", minWeightNote: null,                    days: "15"  },
  { state: "Kwara",       doorToDoor: "6.00", collection: "6.00", minWeight: "20", minWeightNote: null,                    days: "15"  },
  { state: "Lagos",       doorToDoor: "5.50", collection: "5.20", minWeight: "10", minWeightNote: "10kg Office · 20kg D2D", days: "5–7" },
  { state: "Nasarawa",    doorToDoor: "7.00", collection: "7.00", minWeight: "20", minWeightNote: null,                    days: "15"  },
  { state: "Niger",       doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "15"  },
  { state: "Ogun",        doorToDoor: "6.00", collection: "6.00", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Ondo",        doorToDoor: "6.00", collection: "6.00", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Osun",        doorToDoor: "6.00", collection: "6.00", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Oyo",         doorToDoor: "6.00", collection: "6.00", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Plateau",     doorToDoor: "6.50", collection: "6.20", minWeight: "30", minWeightNote: null,                    days: "15"  },
  { state: "Rivers",      doorToDoor: "6.50", collection: "6.20", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Sokoto",      doorToDoor: null,   collection: "7.50", minWeight: "20", minWeightNote: null,                    days: "10"  },
  { state: "Taraba",      doorToDoor: null,   collection: "7.50", minWeight: "20", minWeightNote: null,                    days: "15"  },
  { state: "Yobe",        doorToDoor: null,   collection: "7.50", minWeight: "20", minWeightNote: null,                    days: "15"  },
  { state: "Zamfara",     doorToDoor: null,   collection: "7.50", minWeight: "20", minWeightNote: null,                    days: "15"  },
];

const FIXED_ITEM_RATES = [
  { item: '19" TV',               price: 120  },
  { item: '24" TV',               price: 160  },
  { item: '32" TV',               price: 180  },
  { item: '37" TV',               price: 200  },
  { item: '40" TV',               price: 230  },
  { item: '42" TV',               price: 260  },
  { item: '46" TV',               price: 300  },
  { item: '50" TV',               price: 350  },
  { item: 'Laptop (15"–17")',     price: 50   },
  { item: "Computer & Desktop",   price: 150  },
  { item: "Mobile Phone (per unit)", price: 30 },
  { item: "iPad",                 price: 25   },
  { item: "Printer",              price: 50   },
];

const VEHICLE_RATES = [
  { type: "Saloon Car",          roro: "£840",       note: null           },
  { type: "4×4 / Jeep",         roro: "£1,130",     note: "Max 25 CBM"   },
  { type: "Van (Short)",         roro: "On Request", note: "Max 30 CBM"   },
  { type: "Van (Medium)",        roro: "On Request", note: null           },
  { type: "Van (Long)",          roro: "On Request", note: null           },
];

const CONTAINER_RATES = [
  { type: "20 FT",  price: "On Request" },
  { type: "40 FT",  price: "On Request" },
];

const DOOR_SURCHARGES = [
  { item: "UK Door Collection",    price: "From £25", note: "Varies by UK location"      },
  { item: "Nigeria Door Delivery", price: "From £20", note: "Lagos & surrounding states" },
  { item: "Out-of-State Delivery", price: "From £35", note: "All 36 states covered"      },
  { item: "Packing Service",       price: "From £15", note: "Per item packed"            },
  { item: "Customs Clearance",     price: "Included", note: "On all shipments"           },
  { item: "Cargo Insurance",       price: "From £10", note: "Recommended for all cargo"  },
];

const PRICING_TIERS = [
  {
    name: "Personal",   icon: Package,   tagline: "For individuals & families",
    accent: "#0818A8",  featured: false, airRate: "from £5.20/kg", seaRate: "from £2/kg",
    includes: ["Air & sea options", "UK door collection", "Nigeria door delivery", "Real-time tracking", "Customs clearance", "SMS & email notifications"],
    cta: "Get a Quote", href: "/quote",
  },
  {
    name: "Business",   icon: BarChart3, tagline: "For SMEs & commercial shippers",
    accent: "#0818A8",  featured: true,  airRate: "from £5.20/kg", seaRate: "from £2/kg",
    includes: ["Discounted bulk rates", "Dedicated account manager", "Priority customs handling", "Weekly reporting", "SLA guarantee", "Credit terms available", "Volume discount schedule"],
    cta: "Contact Sales", href: "/contact",
  },
  {
    name: "Enterprise", icon: Anchor,    tagline: "For importers, exporters & volume",
    accent: "#0437F2",  featured: false, airRate: "Custom", seaRate: "Custom",
    includes: ["Container rates (FCL/LCL)", "Full supply chain management", "Bespoke SLA & KPIs", "C-suite account access", "Port-to-port or D2D", "Multi-currency invoicing", "Priority boarding"],
    cta: "Talk to Us", href: "/contact",
  },
];

const INCLUDED_ALWAYS = [
  { icon: Shield,       label: "Cargo insurance available"       },
  { icon: CheckCircle,  label: "UK & Nigeria customs clearance"  },
  { icon: MapPin,       label: "Real-time shipment tracking"     },
  { icon: Phone,        label: "UK-based customer support"       },
];

const FAQS_PRICING = [
  {
    q: "How much does it cost to ship cargo from the UK to Nigeria?",
    a: "Sea freight from the UK to Nigeria starts from £2 per kg (4–6 weeks transit). Air freight starts from £5.20 per kg plus £25 handling fee (7 days — departs every Friday, arrives following Friday). Door-to-door cargo pricing varies by Nigerian state — from £4.80/kg collection rate to £6.80/kg door-to-door. Get a free quote from R-Zone.",
  },
  {
    q: "What is the cheapest way to ship from the UK to Nigeria?",
    a: "Sea freight is the cheapest option — from £2 per kg with weekly sailings from UK ports to Lagos Apapa and Tin Can Island. Transit time is 4–6 weeks. For time-sensitive cargo, air freight from £5.20/kg departs every Friday from LHR, arriving Lagos the following Friday.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. R-Zone's rates are fully transparent. The price you are quoted is the price you pay. Any optional extras — collection, delivery, insurance — are quoted upfront before you commit.",
  },
  {
    q: "How is cargo weight calculated?",
    a: "We charge on actual weight or volumetric weight — whichever is greater. Volumetric weight = (L × W × H in cm) ÷ 6,000 for air freight and ÷ 1,000 for sea freight.",
  },
  {
    q: "Do prices include VAT?",
    a: "Exported goods from the UK are generally not charged UK VAT. They are 'zero-rated' (0% VAT) because they are not consumed in the UK, provided specific conditions are met and official evidence of export is kept.",
  },
  {
    q: "Can I get a fixed price for regular UK–Nigeria shipments?",
    a: "Yes. Business and enterprise customers can negotiate fixed monthly rates. Contact our sales team to discuss a tailored contract with volume discount pricing.",
  },
  {
    q: "What payment methods does R-Zone accept?",
    a: "We accept bank transfer (BACS/Faster Payments), debit/credit card, and PayPal. Business accounts can apply for 14 or 30-day payment terms.",
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};

function TagPill({ label, dark = true }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-6 ${dark ? "border-[#1F51FF]/30 bg-[#0818A8]/14" : "border-[#0818A8]/20 bg-[#0818A8]/6"}`}>
      <motion.span className="w-1.5 h-1.5 rounded-full bg-[#1F51FF] flex-shrink-0"
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity }} aria-hidden="true" />
      <span className={`text-[13px] font-bold tracking-[0.28em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>{label}</span>
    </div>
  );
}

function SectionHeading({ line1, accent, dark = true, id }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <h2 id={id} ref={ref} className={`font-black text-[clamp(26px,4.5vw,52px)] leading-[0.92] tracking-[-0.028em] uppercase ${dark ? "text-white" : "text-[#0b0f1a]"}`}>
      {line1}{" "}
      <span className="relative inline-block text-[#1F51FF]">
        {accent}
        <motion.span className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#1F51FF]" aria-hidden="true"
          initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.5 }} />
      </span>
    </h2>
  );
}

const STATUS_CONFIG = {
  departed: { label: "Departed", bg: "bg-gray-100",   text: "text-gray-800",    dot: "bg-gray-400"    },
  open:     { label: "Open",     bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  upcoming: { label: "Upcoming", bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500"   },
  full:     { label: "Full",     bg: "bg-red-50",     text: "text-red-700",     dot: "bg-red-500"     },
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section className="relative bg-[#00061a] overflow-hidden hero-section"
      aria-labelledby="sp-hero-heading">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-15%] left-[10%] w-[700px] h-[500px] bg-[#0818A8]/16 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[400px] bg-[#1F51FF]/10 rounded-full blur-[120px]" />
      </div>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pt-[120px] pb-14 md:pb-16">
        <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
          <Link href="/" className="text-white/80 text-[13px] font-medium hover:text-white transition-colors">Home</Link>
          <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
          <span className="text-white text-[13px] font-medium" aria-current="page">Schedules &amp; Prices</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} custom={0}>
              {/* Authority pill */}
              <div className="inline-flex items-center gap-2 border border-amber-400/35 bg-amber-400/8 px-3.5 py-1.5 rounded-full mb-4">
                <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-amber-400 text-[11px] font-black tracking-[0.22em] uppercase">
                  #1 Ranked UK–Nigeria Cargo on Google
                </span>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={0.05}>
              <TagPill label={`${YEAR} Schedules & Rates — UK to Nigeria`} dark />
            </motion.div>
            <motion.h1 id="sp-hero-heading" variants={fadeUp} custom={0.1}
              className="text-white font-black text-[clamp(34px,6.5vw,76px)] leading-[0.88] tracking-[-0.035em] uppercase mb-6">
              UK–Nigeria Cargo<br />Schedules &amp;{" "}
              <span className="relative inline-block text-[#1F51FF]">
                Prices.
                <motion.span className="absolute -bottom-2 left-0 h-[4px] rounded-full bg-[#1F51FF]" aria-hidden="true"
                  initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.6, delay: 0.8 }} />
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={0.2} className="text-white/80 text-[15px] font-normal leading-relaxed max-w-xl mb-9">
              Full {YEAR} UK–Nigeria sailing and flight schedules alongside fully transparent
              pricing — no hidden fees, no surprises.{" "}
              <strong className="text-white font-semibold">Sea freight from £2/kg · Air freight from £5/kg.</strong>
              {" "}Weekly departures on both routes.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap gap-3">
              <a href="#schedules" className="group inline-flex items-center gap-2 border border-white/25 hover:border-[#0818A8] hover:bg-[#0818A8]/20 text-white text-[13px] font-bold tracking-[0.07em] uppercase px-5 py-2.5 transition-all duration-200"
                aria-label="View UK to Nigeria sailing and flight schedules">
                <Calendar size={12} aria-hidden="true" />View Schedules
              </a>
              <a href="#pricing" className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-5 py-2.5 transition-all duration-200 shadow-lg shadow-[#0818A8]/30"
                aria-label="View UK to Nigeria shipping prices">
                <BarChart3 size={12} aria-hidden="true" />View Prices
                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            {[
              { icon: Plane,        label: "Air Freight",      val1: "Every",   val2: "Friday",       sub: "Departs LHR weekly",   accent: "#0818A8" },
              { icon: Ship,         label: "Sea Freight",      val1: "Weekly",  val2: "sailings",     sub: "4–6 weeks transit",    accent: "#1F51FF" },
              { icon: Zap,          label: "Air Transit",      val1: "7",       val2: "days",         sub: "Friday to Friday",     accent: "#0437F2" },
              { icon: TrendingDown, label: "Sea From",         val1: "£2",      val2: "/kg",          sub: "Cheapest option",  accent: "#0818A8" },
            ].map(({ icon: Icon, label, val1, val2, sub, accent }, i) => (
              <motion.div key={label}
                className="group border border-white/[0.08] bg-white/[0.04] p-5 relative overflow-hidden hover:border-white/[0.2] hover:bg-white/[0.07] transition-all duration-300"
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.45 + i * 0.07 }}>
                <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500" style={{ backgroundColor: accent }} aria-hidden="true" />
                <div className="w-8 h-8 rounded-sm flex items-center justify-center mb-3" style={{ backgroundColor: `${accent}20` }} aria-hidden="true">
                  <Icon size={14} style={{ color: accent }} />
                </div>
                <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/80 mb-1">{label}</p>
                <p className="text-white font-black text-[22px] leading-none tracking-[-0.02em]">
                  {val1}<span className="text-white/80 text-[13px] font-normal ml-1">{val2}</span>
                </p>
                <p className="text-white/80 text-[13px] font-normal mt-1">{sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#00061a] to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}

// ─── SCHEDULES ────────────────────────────────────────────────────────────────
function SchedulesSection() {
  const ref        = useRef(null);
  const inView     = useInView(ref, { once: true, margin: "-60px" });
  const [activeTab, setActiveTab] = useState("sea");
  const tabs = [
    { id: "sea",  label: "Sea Freight UK to Nigeria", icon: Ship  },
    { id: "air",  label: "Air Freight UK to Nigeria", icon: Plane },
  ];

  return (
    <section id="schedules" ref={ref} className="relative bg-[#00061a] overflow-hidden scroll-mt-20"
      aria-labelledby="schedules-heading">
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/50 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
              <TagPill label={`${YEAR} UK–Nigeria Sailing & Flight Schedule`} dark />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
              <SectionHeading line1="UK–Nigeria Sailing &amp;" accent="Flight Schedules." dark id="schedules-heading" />
            </motion.div>
            <motion.p className="text-white/80 text-[14px] font-normal mt-4 max-w-xl"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
              All {YEAR} UK–Nigeria departure dates. Sea cargo has a strict weekly cut-off — book early to guarantee your space on the next sailing to Lagos.
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
            const Icon     = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} role="tab" aria-selected={isActive} aria-controls={`tab-panel-${tab.id}`} id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3.5 text-[13px] font-semibold tracking-[0.04em] whitespace-nowrap border-b-2 transition-all duration-200 flex-shrink-0 ${isActive ? "border-[#1F51FF] text-white" : "border-transparent text-white/80 hover:text-white hover:border-white/25"}`}>
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
              <div className="flex items-start gap-3 border border-[#1F51FF]/20 bg-[#0818A8]/12 px-5 py-3.5 mb-6">
                <Info size={14} className="text-[#1F51FF] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-white/80 text-[13px] font-normal leading-snug">
                  <strong className="text-white font-semibold">Cut-off date</strong> is the last day to drop off at our Upminster warehouse or arrange UK door collection.
                  The vessel sails 5 days after cut-off. ETA to Lagos is typically 4–6 weeks.
                </p>
              </div>
              {/* Desktop table */}
              <div className="hidden md:block overflow-hidden border border-white/[0.07]">
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
                      const s      = STATUS_CONFIG[row.status];
                      const isOpen = row.status === "open" || row.status === "upcoming";
                      return (
                        <motion.tr key={row.id}
                          className={`border-b border-white/[0.05] last:border-0 transition-colors duration-150 ${isOpen ? "bg-white/[0.025] hover:bg-white/[0.05]" : "hover:bg-white/[0.02]"}`}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
                          <td className="px-4 py-3.5"><span className={`font-bold text-[13px] ${isOpen ? "text-white" : "text-white/80"}`}>{row.month}</span></td>
                          <td className="px-4 py-3.5"><span className="text-[13px] font-medium text-white/80">{row.cutoff}</span></td>
                          <td className="px-4 py-3.5"><span className="text-[13px] font-medium text-white/80">{row.sailing}</span></td>
                          <td className="px-4 py-3.5"><span className={`text-[13px] font-medium ${isOpen ? "text-[#1F51FF]" : "text-white/80"}`}>{row.eta}</span></td>
                          <td className="px-4 py-3.5"><span className="text-[13px] font-normal text-white/80">{row.vessel}</span></td>
                          <td className="px-4 py-3.5"><span className="text-[13px] font-normal text-white/80">{row.port}</span></td>
                          <td className="px-4 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${s.bg} ${s.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} aria-hidden="true" />{s.label}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            {isOpen && (
                              <Link href="/quote" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#1F51FF] hover:text-white transition-colors"
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
                  const s      = STATUS_CONFIG[row.status];
                  const isOpen = row.status === "open" || row.status === "upcoming";
                  return (
                    <motion.div key={row.id}
                      className={`border p-4 ${isOpen ? "border-white/[0.12] bg-white/[0.04]" : "border-white/[0.05] bg-white/[0.015]"}`}
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
                        <div><span className="text-white/80 font-normal">ETA Lagos</span><br /><span className={isOpen ? "text-[#1F51FF] font-medium" : "text-white/80"}>{row.eta}</span></div>
                        <div><span className="text-white/80 font-normal">Port</span><br /><span className="text-white/80">{row.port}</span></div>
                      </div>
                      {isOpen && (
                        <Link href="/quote" className="mt-3 flex items-center gap-1.5 text-[13px] font-bold text-[#1F51FF] hover:text-white transition-colors"
                          aria-label={`Book ${row.month} sea freight to Nigeria`}>
                          Book this sailing <ArrowRight size={9} aria-hidden="true" />
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="inline-flex items-center gap-2.5 border border-white/25 hover:border-[#0818A8] hover:bg-[#0818A8]/15 text-white/80 hover:text-white text-[13px] font-bold tracking-[0.07em] uppercase px-5 py-2.5 transition-all duration-200"
                  aria-label="Download 2025 UK to Nigeria sea freight schedule PDF">
                  <Download size={12} aria-hidden="true" />Download {YEAR} Schedule PDF
                </button>
                <Link href="/quote" className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-5 py-2.5 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
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
              <div className="flex items-start gap-3 border border-[#1F51FF]/20 bg-[#0818A8]/12 px-5 py-3.5 mb-8">
                <Info size={14} className="text-[#1F51FF] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-white/80 text-[13px] font-normal leading-snug">
                  Air freight to Nigeria departs <strong className="text-white font-semibold">every Friday</strong> from London Heathrow (LHR) to Lagos (LOS).
                  Cargo must be received by <strong className="text-white font-semibold">12pm Friday</strong> for same-day dispatch — arrives Lagos the <strong className="text-white font-semibold">following Friday</strong>.
                </p>
              </div>
              <div className="flex justify-center mb-10">
                {AIR_SCHEDULES.map((sched, i) => (
                  <motion.div key={sched.day} className="w-full max-w-lg border border-white/[0.1] bg-white/[0.04] p-8 relative overflow-hidden group hover:border-[#0818A8]/50 hover:bg-[#0818A8]/10 transition-all duration-300"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] w-0 group-hover:w-full transition-all duration-500" aria-hidden="true" />
                    <div className="w-10 h-10 bg-[#0818A8]/20 rounded-sm flex items-center justify-center mb-4" aria-hidden="true">
                      <Plane size={16} className="text-[#1F51FF]" />
                    </div>
                    <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/80 mb-1">{sched.frequency} Departure</p>
                    <p className="text-white font-black text-[20px] leading-none tracking-[-0.01em] mb-1">{sched.day}</p>
                    <p className="text-white/80 text-[13px] font-normal mb-3">{sched.departure}</p>
                    <div className="flex items-center justify-between gap-6 border-t border-white/[0.07] pt-4">
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/80 mb-0.5">Transit</p>
                        <p className="text-[#1F51FF] font-bold text-[14px] whitespace-nowrap">{sched.transit}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/80 mb-0.5">Carrier</p>
                        <p className="text-white/80 text-[14px] font-normal">{sched.airline}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Journey steps */}
              <div className="border border-white/[0.08] bg-white/[0.03] p-7 md:p-9 mb-8">
                <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-white/80 mb-7">
                  Typical Air Freight Journey — UK to Nigeria
                </p>
                <div className="flex items-center gap-0 overflow-x-auto">
                  {[
                    { label: "Fri · Wk 1", title: "Book & Drop Off",     sub: "12pm cut-off deadline",  icon: Package     },
                    { label: "Fri · Wk 1", title: "Departs LHR",         sub: "Cargo loaded & airside", icon: Plane       },
                    { label: "Sat – Thu",  title: "In Transit",           sub: "UK → Lagos",             icon: Anchor      },
                    { label: "Thu · Wk 2", title: "Lagos Airport",        sub: "LOS customs clearance",  icon: MapPin      },
                    { label: "Fri · Wk 2", title: "Cleared & Delivered",  sub: "Door or Lagos pickup",   icon: CheckCircle },
                  ].map((step, si) => {
                    const Icon = step.icon;
                    return (
                      <div key={si} className="flex items-center flex-shrink-0">
                        <div className="text-center px-4">
                          <div className="w-10 h-10 rounded-full bg-[#0818A8]/25 border border-[#0818A8]/40 flex items-center justify-center mx-auto mb-2" aria-label={step.title}>
                            <Icon size={14} className="text-[#1F51FF]" aria-hidden="true" />
                          </div>
                          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#1F51FF] mb-0.5">{step.label}</p>
                          <p className="text-white/80 font-semibold text-[13px] leading-tight">{step.title}</p>
                          <p className="text-white/80 text-[12px] font-normal mt-0.5">{step.sub}</p>
                        </div>
                        {si < 4 && <div className="h-px w-8 bg-gradient-to-r from-[#0818A8]/50 to-[#1F51FF]/50 flex-shrink-0" aria-hidden="true" />}
                      </div>
                    );
                  })}
                </div>
              </div>
              <Link href="/quote" className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
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
function SectionDivider() {
  return (
    <div className="bg-[#0818A8] relative overflow-hidden" role="region" aria-label="R-Zone key shipping rates">
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          {[
            { val: "£2/kg",   label: "Sea freight from UK to Nigeria" },
            { val: "£5/kg",   label: "Air freight from UK to Nigeria" },
            { val: "0",       label: "Hidden fees"                    },
            { val: "Weekly",  label: "Sailings & departures"          },
          ].map(({ val, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="text-white font-black text-[20px] leading-none tracking-[-0.02em]">{val}</span>
              <span className="text-white/80 text-[13px] font-normal">{label}</span>
            </div>
          ))}
        </div>
        <Link href="/quote" className="inline-flex items-center gap-2 bg-white text-[#0818A8] text-[13px] font-black tracking-[0.08em] uppercase px-6 py-2.5 hover:bg-white/90 transition-colors flex-shrink-0"
          aria-label="Get a free UK to Nigeria cargo quote">
          Get Free Quote <ArrowRight size={11} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function PricingSection() {
  const ref            = useRef(null);
  const inView         = useInView(ref, { once: true, margin: "-60px" });
  const [activeRateTab, setActiveRateTab] = useState("air");
  const [openFaq,       setOpenFaq]       = useState(null);

  return (
    <section id="pricing" ref={ref} className="relative bg-white overflow-hidden scroll-mt-20"
      aria-labelledby="pricing-heading">
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">

        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="UK–Nigeria Cargo Rates — Transparent Pricing" dark={false} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionHeading line1="Clear, Fair" accent="Pricing." dark={false} id="pricing-heading" />
          </motion.div>
          <motion.p className="text-gray-800 text-[14px] font-normal mt-4 max-w-xl mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            No surprises. No hidden extras.{" "}
            <strong className="text-gray-900 font-semibold">Sea freight from £2/kg · Air freight from £5/kg.</strong>
            {" "}Volume discounts and business rates available on request.
          </motion.p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16" role="list">
          {PRICING_TIERS.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div key={tier.name} role="listitem"
                className={`relative border overflow-hidden flex flex-col ${tier.featured ? "border-[#0818A8] bg-[#00061a] shadow-2xl shadow-[#0818A8]/25 scale-[1.02]" : "border-gray-200 bg-white hover:border-[#0818A8]/40 hover:shadow-lg transition-all duration-300"}`}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: i * 0.1 }}>
                <div className={`h-[3px] ${tier.featured ? "bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" : "bg-gray-100"}`} aria-hidden="true" />
                {tier.featured && (
                  <div className="bg-[#0818A8] text-center py-1.5">
                    <span className="text-white text-[11px] font-bold tracking-[0.25em] uppercase">Most Popular</span>
                  </div>
                )}
                <div className="p-7 flex flex-col flex-1">
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center mb-5 ${tier.featured ? "bg-[#0818A8]/30" : "bg-[#0818A8]/8"}`} aria-hidden="true">
                    <Icon size={17} className={tier.featured ? "text-[#1F51FF]" : "text-[#0818A8]"} />
                  </div>
                  <p className={`text-[11px] font-bold tracking-[0.22em] uppercase mb-1 ${tier.featured ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>{tier.tagline}</p>
                  <h3 className={`font-black text-[24px] tracking-[-0.015em] mb-5 ${tier.featured ? "text-white" : "text-[#0b0f1a]"}`}>{tier.name}</h3>
                  <div className={`border p-4 mb-6 ${tier.featured ? "border-white/[0.1] bg-white/[0.04]" : "border-gray-100 bg-gray-50"}`}>
                    {[["Air", Plane, tier.airRate], ["Sea", Ship, tier.seaRate]].map(([label, IIcon, rate]) => (
                      <div key={label} className={`flex justify-between items-center ${label === "Air" ? "mb-2" : ""}`}>
                        <div className="flex items-center gap-1.5">
                          <IIcon size={11} className={tier.featured ? "text-[#1F51FF]" : "text-[#0818A8]"} aria-hidden="true" />
                          <span className={`text-[13px] font-medium ${tier.featured ? "text-white/80" : "text-gray-800"}`}>{label} to Nigeria</span>
                        </div>
                        <span className={`text-[13px] font-black ${tier.featured ? "text-white" : "text-[#0b0f1a]"}`}>{rate}</span>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-2.5 mb-7 flex-1" role="list" aria-label={`${tier.name} plan features`}>
                    {tier.includes.map(feat => (
                      <li key={feat} className="flex items-center gap-2.5">
                        <CheckCircle size={12} className={tier.featured ? "text-[#1F51FF]" : "text-[#0818A8]"} aria-hidden="true" />
                        <span className={`text-[13px] font-normal ${tier.featured ? "text-white/80" : "text-gray-800"}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={tier.href}
                    className={`w-full text-center text-[13px] font-black tracking-[0.09em] uppercase py-3.5 transition-all duration-200 ${tier.featured ? "bg-[#0818A8] hover:bg-[#0437F2] text-white shadow-lg shadow-[#0818A8]/30" : "border-2 border-[#0818A8]/25 text-[#0818A8] hover:bg-[#0818A8] hover:text-white hover:border-[#0818A8]"}`}
                    aria-label={`${tier.cta} — ${tier.name} UK to Nigeria cargo`}>{tier.cta}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rate tables */}
        <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h3 className="text-[#0b0f1a] font-black text-[20px] tracking-[-0.01em]">Rate Tables — UK to Nigeria</h3>
              <p className="text-gray-800 text-[13px] font-normal mt-1">Standard published rates. Heavier shipments attract lower per-kg rates.</p>
            </div>
            <div className="flex border border-gray-200 overflow-hidden" role="tablist" aria-label="Air or sea rate table">
              {[{ id: "air", label: "Air", icon: Plane }, { id: "sea", label: "Sea", icon: Ship }].map(t => {
                const Icon = t.icon;
                return (
                  <button key={t.id} role="tab" aria-selected={activeRateTab === t.id} onClick={() => setActiveRateTab(t.id)}
                    className={`flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-bold transition-all duration-150 ${activeRateTab === t.id ? "bg-[#0818A8] text-white" : "bg-white text-gray-800 hover:text-gray-900"}`}>
                    <Icon size={12} aria-hidden="true" /> {t.label}
                  </button>
                );
              })}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeRateTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div className="overflow-hidden border border-gray-200">
                <table className="w-full" aria-label={`${activeRateTab === "air" ? "Air freight" : "Sea freight"} rates UK to Nigeria per kg`}>
                  <thead>
                    <tr className="bg-[#0818A8]">
                      {["Weight Range","Rate Per Kg","Note",""].map(h => (
                        <th key={h} scope="col" className={`px-5 py-3 text-left text-[11px] font-bold tracking-[0.22em] uppercase text-white/80 ${h === "Note" ? "hidden sm:table-cell" : ""}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(activeRateTab === "air" ? AIR_RATES : SEA_RATES).map((row, i) => (
                      <tr key={row.range} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/70"} hover:bg-[#0818A8]/4 transition-colors`}>
                        <td className="px-5 py-3.5 text-[13px] font-semibold text-[#0b0f1a]">{row.range}</td>
                        <td className="px-5 py-3.5">
                          <span className="text-[#0818A8] font-black text-[16px]">{row.rate}</span>
                          {row.per && <span className="text-gray-800 text-[13px] ml-1 font-normal">{row.per}</span>}
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell text-gray-800 text-[13px] font-normal">{row.note}</td>
                        <td className="px-5 py-3.5 text-right">
                          <Link href="/quote" className="text-[13px] font-bold text-[#0818A8] hover:text-[#0437F2] transition-colors"
                            aria-label={`Get a quote for ${row.range} — ${activeRateTab === "air" ? "air" : "sea"} freight UK to Nigeria`}>Quote →</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-800 text-[13px] font-normal mt-3">
                * Rates are indicative and subject to fuel surcharge. Final price confirmed at booking.
                Volumetric weight applies where greater than actual weight: air freight L×W×H÷6,000 · sea freight L×W×H÷1,000.
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Surcharges */}
        <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}>
          <div className="mb-6">
            <h3 className="text-[#0b0f1a] font-black text-[20px] tracking-[-0.01em]">Additional Services</h3>
            <p className="text-gray-800 text-[13px] font-normal mt-1">Optional add-on charges all quoted transparently at booking, before you commit.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOOR_SURCHARGES.map((item, i) => (
              <motion.div key={item.item}
                className="flex items-start justify-between border border-gray-200 bg-gray-50 p-4 hover:border-[#0818A8]/30 hover:bg-[#0818A8]/3 transition-all duration-200 group"
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Truck size={11} className="text-[#0818A8] group-hover:text-[#0437F2] transition-colors" aria-hidden="true" />
                    <p className="text-[#0b0f1a] font-semibold text-[13px]">{item.item}</p>
                  </div>
                  <p className="text-gray-800 text-[13px] font-normal">{item.note}</p>
                </div>
                <span className="text-[#0818A8] font-black text-[14px] flex-shrink-0 ml-4">{item.price}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Always included */}
        <motion.div className="border border-[#0818A8]/15 bg-[#0818A8]/4 p-7 md:p-9 mb-14"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.55 }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#0818A8] mb-2">Always Included</p>
              <h3 className="text-[#0b0f1a] font-black text-[18px]">Every R-Zone UK–Nigeria shipment includes</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {INCLUDED_ALWAYS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon size={13} className="text-[#0818A8] flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-800 text-[13px] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* State-by-state rates */}
        <motion.div className="mb-14" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.55 }}>
          <div className="mb-6">
            <h3 className="text-[#0b0f1a] font-black text-[20px] tracking-[-0.01em]">State-by-State Cargo Rates — Nigeria</h3>
            <p className="text-gray-800 text-[13px] font-normal mt-1">Door-to-door and office collection rates to all Nigerian states. Rates are per kg.</p>
          </div>
          <div className="overflow-hidden border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]" aria-label="Cargo freight rates by Nigerian state">
                <thead>
                  <tr className="bg-[#0818A8]">
                    <th scope="col" className="px-5 py-3 text-left text-[11px] font-bold tracking-[0.22em] uppercase text-white/80">State</th>
                    <th scope="col" className="px-5 py-3 text-left text-[11px] font-bold tracking-[0.22em] uppercase text-white/80">Door-to-Door (£/kg)</th>
                    <th scope="col" className="px-5 py-3 text-left text-[11px] font-bold tracking-[0.22em] uppercase text-white/80">Office Collection (£/kg)</th>
                    <th scope="col" className="px-5 py-3 text-left text-[11px] font-bold tracking-[0.22em] uppercase text-white/80">Min Weight (kg)</th>
                    <th scope="col" className="px-5 py-3 text-left text-[11px] font-bold tracking-[0.22em] uppercase text-white/80">Delivery (Days)</th>
                  </tr>
                </thead>
                <tbody>
                  {STATE_RATES.map((row, i) => (
                    <tr key={row.state} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/70"} hover:bg-[#0818A8]/4 transition-colors`}>
                      <td className="px-5 py-3.5 text-[13px] font-semibold text-[#0b0f1a]">{row.state}</td>
                      <td className="px-5 py-3.5 text-[13px] font-bold">
                        {row.doorToDoor
                          ? <span className="text-[#0818A8]">£{row.doorToDoor}/kg</span>
                          : <span className="text-orange-600 font-semibold">Office Only</span>}
                      </td>
                      <td className="px-5 py-3.5 text-[13px] font-bold text-[#0818A8]">£{row.collection}/kg</td>
                      <td className="px-5 py-3.5 text-[13px] font-normal text-gray-800">
                        {row.minWeight}kg
                        {row.minWeightNote && <span className="ml-1 text-[11px] text-gray-600">({row.minWeightNote})</span>}
                      </td>
                      <td className="px-5 py-3.5 text-[13px] font-normal text-gray-800">{row.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-gray-800 text-[13px] font-normal mt-3">
            * All rates are per kg. Minimum weight requirements apply. "Office Only" states do not offer door-to-door delivery — office collection rate applies.
            All shipments subject to a £20 handling charge.
          </p>
        </motion.div>

        {/* Fixed item rates */}
        <motion.div className="mb-14" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.58 }}>
          <div className="mb-6">
            <h3 className="text-[#0b0f1a] font-black text-[20px] tracking-[-0.01em]">Fixed-Price Items — Door to Door (Lagos)</h3>
            <p className="text-gray-800 text-[13px] font-normal mt-1">
              Flat-rate door-to-door pricing for electronics to Lagos. Rates for other destinations vary — contact us for a quote.
            </p>
          </div>
          <div className="overflow-hidden border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]" aria-label="Fixed price door-to-door rates for electronics to Lagos Nigeria">
                <thead>
                  <tr className="bg-[#0818A8]">
                    <th scope="col" className="px-5 py-3 text-left text-[11px] font-bold tracking-[0.22em] uppercase text-white/80">Item Description</th>
                    <th scope="col" className="px-5 py-3 text-left text-[11px] font-bold tracking-[0.22em] uppercase text-white/80">Price (£)</th>
                    <th scope="col" className="px-5 py-3 text-right text-[11px] font-bold tracking-[0.22em] uppercase text-white/80"></th>
                  </tr>
                </thead>
                <tbody>
                  {FIXED_ITEM_RATES.map((row, i) => (
                    <tr key={row.item} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/70"} hover:bg-[#0818A8]/4 transition-colors`}>
                      <td className="px-5 py-3.5 text-[13px] font-semibold text-[#0b0f1a]">{row.item}</td>
                      <td className="px-5 py-3.5 text-[16px] font-black text-[#0818A8]">£{row.price}</td>
                      <td className="px-5 py-3.5 text-right">
                        <a href="/quote" className="text-[13px] font-bold text-[#0818A8] hover:text-[#0437F2] transition-colors">Book →</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-amber-200 bg-amber-50 px-5 py-3.5 mt-4">
            <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-amber-900 text-[13px] font-normal leading-snug">
              <strong className="font-semibold">Important:</strong> You are responsible for proper packaging of all items. R-Zone does not accept liability for improperly packed consignments.
              Rates above apply to Plasma and LCD TVs, computers and laptops to <strong className="font-semibold">Lagos only</strong>. For other destinations, contact us for a quote.
            </p>
          </div>
        </motion.div>

        {/* Vehicle & container rates */}
        <motion.div className="mb-14" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.61 }}>
          <div className="mb-6">
            <h3 className="text-[#0b0f1a] font-black text-[20px] tracking-[-0.01em]">Car & Container Shipping to Nigeria</h3>
            <p className="text-gray-800 text-[13px] font-normal mt-1">
              RORO (Roll-on/Roll-off) vehicle shipping and container rates to Tin Can Island / Apapa, Lagos.
              Prices are port-to-port only — loading, haulage and clearing costs are not included.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vehicle RORO */}
            <div className="overflow-hidden border border-gray-200 bg-white">
              <div className="px-5 py-3.5 bg-[#0818A8] flex items-center gap-2">
                <Truck size={13} className="text-white/80" aria-hidden="true" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/80">Vehicle RORO Shipping — Lagos</span>
              </div>
              <table className="w-full" aria-label="RORO vehicle shipping prices to Lagos Nigeria">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th scope="col" className="px-5 py-2.5 text-left text-[11px] font-bold tracking-[0.18em] uppercase text-gray-800">Vehicle Type</th>
                    <th scope="col" className="px-5 py-2.5 text-left text-[11px] font-bold tracking-[0.18em] uppercase text-gray-800">RORO Price</th>
                    <th scope="col" className="px-5 py-2.5 text-left text-[11px] font-bold tracking-[0.18em] uppercase text-gray-800">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {VEHICLE_RATES.map((row, i) => (
                    <tr key={row.type} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/70"} hover:bg-[#0818A8]/4 transition-colors`}>
                      <td className="px-5 py-3.5 text-[13px] font-semibold text-[#0b0f1a]">{row.type}</td>
                      <td className="px-5 py-3.5 text-[14px] font-black text-[#0818A8]">{row.roro}</td>
                      <td className="px-5 py-3.5 text-[13px] font-normal text-gray-800">{row.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Container */}
            <div className="overflow-hidden border border-gray-200 bg-white">
              <div className="px-5 py-3.5 bg-[#0818A8] flex items-center gap-2">
                <Anchor size={13} className="text-white/80" aria-hidden="true" />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/80">Container Shipping — Lagos</span>
              </div>
              <table className="w-full" aria-label="Container shipping prices to Lagos Nigeria">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th scope="col" className="px-5 py-2.5 text-left text-[11px] font-bold tracking-[0.18em] uppercase text-gray-800">Container Type</th>
                    <th scope="col" className="px-5 py-2.5 text-left text-[11px] font-bold tracking-[0.18em] uppercase text-gray-800">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTAINER_RATES.map((row, i) => (
                    <tr key={row.type} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/70"} hover:bg-[#0818A8]/4 transition-colors`}>
                      <td className="px-5 py-3.5 text-[13px] font-semibold text-[#0b0f1a]">{row.type}</td>
                      <td className="px-5 py-3.5 text-[14px] font-black text-[#0818A8]">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-4 border-t border-gray-100">
                <a href="/contact" className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-5 py-2.5 transition-all duration-200">
                  Request Container Quote <ArrowRight size={11} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <p className="text-gray-800 text-[13px] font-normal mt-4">
            * All vehicle and container prices are port-to-port (Tin Can Island / Apapa, Lagos) only. Loading, haulage and clearing charges are not included.
            Contact us to request a full door-to-door quote including all extras.
          </p>
        </motion.div>

        {/* Pricing FAQs — SEO high-value */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }}>
          <div className="mb-6">
            <h3 className="text-[#0b0f1a] font-black text-[20px] tracking-[-0.01em]">Shipping Costs — Frequently Asked Questions</h3>
            <p className="text-gray-800 text-[13px] font-normal mt-1">Common questions about UK–Nigeria cargo prices and shipping costs.</p>
          </div>
          <dl className="border border-gray-200 overflow-hidden">
            {FAQS_PRICING.map((item, i) => (
              <div key={i} className="border-b border-gray-100 last:border-0" itemScope itemType="https://schema.org/Question">
                <dt>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left group hover:bg-gray-50 transition-colors"
                    aria-expanded={openFaq === i} aria-controls={`pfaq-${i}`}>
                    <span className={`text-[13.5px] font-semibold transition-colors duration-150 ${openFaq === i ? "text-[#0818A8]" : "text-[#0b0f1a] group-hover:text-[#0818A8]"}`}
                      itemProp="name">{item.q}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-0.5" aria-hidden="true">
                      <ChevronDown size={15} className={openFaq === i ? "text-[#0818A8]" : "text-gray-800"} />
                    </motion.div>
                  </button>
                </dt>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.dd id={`pfaq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden"
                      itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                      <p className="text-gray-800 text-[13px] font-normal leading-relaxed px-6 pb-5 pr-12" itemProp="text">{item.a}</p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section ref={ref} className="relative bg-[#00061a] overflow-hidden"
      aria-label="Book UK to Nigeria sea or air freight — R-Zone Enterprises">
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.22) 0%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div className="border border-white/[0.1] bg-white/[0.04] p-8 relative overflow-hidden group hover:border-[#0818A8]/50 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] absolute top-0 left-0 w-0 group-hover:w-full transition-all duration-500" aria-hidden="true" />
            <Calendar size={22} className="text-[#1F51FF] mb-5" aria-hidden="true" />
            <h3 className="text-white font-black text-[20px] tracking-[-0.01em] mb-3">Book the Next Sailing to Nigeria</h3>
            <p className="text-white/80 text-[13px] font-normal leading-relaxed mb-6">
              March and April {YEAR} sailings are now open. Secure your cargo space — weekly cut-off dates apply.
              Sea freight to Lagos from £2/kg.
            </p>
            <Link href="/quote" className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
              aria-label="Book sea freight from UK to Nigeria">
              Book Sea Freight <ArrowRight size={11} aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.div className="border border-white/[0.1] bg-white/[0.04] p-8 relative overflow-hidden group hover:border-[#0818A8]/50 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.12 }}>
            <div className="h-[2px] bg-gradient-to-r from-[#1F51FF] to-[#0437F2] absolute top-0 left-0 w-0 group-hover:w-full transition-all duration-500" aria-hidden="true" />
            <BarChart3 size={22} className="text-[#1F51FF] mb-5" aria-hidden="true" />
            <h3 className="text-white font-black text-[20px] tracking-[-0.01em] mb-3">Get a Free Quote — UK to Nigeria</h3>
            <p className="text-white/80 text-[13px] font-normal leading-relaxed mb-6">
              Tell us about your cargo and we&apos;ll give you a precise price — air or sea, personal or commercial. Same-day response.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/40 text-white text-[13px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200"
                aria-label="Get a free UK to Nigeria cargo quote from R-Zone">
                Get Free Quote
              </Link>
              <a href="tel:+448007720864" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-[13px] font-bold tracking-[0.07em] uppercase px-4 py-3 transition-colors"
                aria-label="Call R-Zone UK: +44 800 772 0864">
                <Phone size={12} aria-hidden="true" />Call Us
              </a>
            </div>
          </motion.div>
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
        { "@type": "ListItem", "position": 1, "name": "Home",               "item": "https://r-zoneenterprises.com" },
        { "@type": "ListItem", "position": 2, "name": "Schedules & Prices", "item": "https://r-zoneenterprises.com/schedules-prices" },
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
      "name": "Sea Freight UK to Nigeria — Weekly Sailings",
      "provider": { "@type": "Organization", "name": "R-Zone Enterprises", "@id": "https://r-zoneenterprises.com/#organization" },
      "description": "Weekly sea freight sailings from UK ports to Lagos Apapa and Tin Can Island. 4–6 weeks transit. FCL and LCL available. The cheapest way to ship from the UK to Nigeria — from £2/kg.",
      "offers": { "@type": "Offer", "priceCurrency": "GBP", "price": "2.00", "unitCode": "KGM", "description": "Sea freight UK to Nigeria from £2 per kg" },
      "areaServed": ["United Kingdom", "Nigeria"],
      "serviceType": "Sea Freight",
    },
    {
      "@type": "Service",
      "name": "Air Freight UK to Nigeria — Weekly Departures",
      "provider": { "@type": "Organization", "name": "R-Zone Enterprises", "@id": "https://r-zoneenterprises.com/#organization" },
      "description": "Air freight from UK to Nigeria. Weekly Friday departures from London Heathrow (LHR) to Lagos (LOS). Cargo cut-off 12pm Friday — arrives Lagos the following Friday. 7 days transit.",
      "offers": { "@type": "Offer", "priceCurrency": "GBP", "price": "5.00", "unitCode": "KGM", "description": "Air freight UK to Nigeria from £5 per kg" },
      "areaServed": ["United Kingdom", "Nigeria"],
      "serviceType": "Air Freight",
    },
    {
      "@type": "WebPage",
      "url": "https://r-zoneenterprises.com/schedules-prices",
      "name": "UK to Nigeria Cargo Schedules & Prices — R-Zone Enterprises",
      "description": "Full 2025 UK to Nigeria sea freight sailing schedule and air freight departure dates. Transparent cargo rates — sea freight from £2/kg, air freight from £5/kg. No hidden fees.",
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
        <SchedulesSection />
        <SectionDivider />
        <PricingSection />
        <FinalCTA />
      </div>
    </>
  );
}