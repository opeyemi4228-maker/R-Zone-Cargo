"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion, useInView, useScroll, useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Plane, Ship, Truck, Package, FileCheck,
  Warehouse, Anchor, ArrowRight, Check,
  ChevronRight, Clock, Shield, Star,
  MapPin, BarChart3, Phone,
  AlertTriangle, XCircle, CheckCircle2,
  TrendingUp, Users, Zap, Globe,
  Building2, Briefcase, HeadphonesIcon,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Images ───────────────────────────────────────────────────────────────────
const IMGS = {
  hero:        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1800&q=80&auto=format&fit=crop",
  airFreight:  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80&auto=format&fit=crop",
  seaFreight:  "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1200&q=80&auto=format&fit=crop",
  doorToDoor:  "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=1200&q=80&auto=format&fit=crop",
  importation: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80&auto=format&fit=crop",
  customs:     "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&auto=format&fit=crop",
  warehousing: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop",
  cargo:       "https://images.unsplash.com/photo-1468818419799-3d02e0b85c1a?w=1200&q=80&auto=format&fit=crop",
  stats:       "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80&auto=format&fit=crop",
};

// ─── B2B Problem → Solution data ─────────────────────────────────────────────
const BUSINESS_PROBLEMS = [
  {
    id:       "customs-delays",
    problem:  "Cargo stuck at customs?",
    solve:    "We clear it — UK & Nigeria end-to-end.",
    icon:     AlertTriangle,
    color:    "#dc2626",
  },
  {
    id:       "supply-chain",
    problem:  "Supply chain breaking down?",
    solve:    "Weekly departures. Zero interruptions.",
    icon:     XCircle,
    color:    "#ea580c",
  },
  {
    id:       "expensive-shipping",
    problem:  "Air freight too expensive?",
    solve:    "Sea freight from £3/kg — weekly sailings.",
    icon:     TrendingUp,
    color:    "#0818A8",
  },
  {
    id:       "nigeria-collection",
    problem:  "Need goods collected from Nigeria?",
    solve:    "Our Lagos team picks up from all 36 states.",
    icon:     MapPin,
    color:    "#0818A8",
  },
  {
    id:       "no-tracking",
    problem:  "No visibility on your shipment?",
    solve:    "Real-time tracking from departure to door.",
    icon:     Globe,
    color:    "#1F51FF",
  },
];

// ─── Solutions / Services ─────────────────────────────────────────────────────
const SOLUTIONS = [
  {
    id:      "air-freight",
    slug:    "/air-freight",
    icon:    Plane,
    label:   "Air Freight",
    badge:   "Fastest Option",
    // Problem framing
    problemTitle: "Need cargo in Nigeria fast?",
    problemBody:  "Delayed stock means lost revenue. Time-sensitive shipments can't wait weeks at sea — your business needs a reliable, fast air corridor with guaranteed departures.",
    solutionTitle: "Air Freight to Nigeria.",
    solutionBody:  "Weekly departures from London Heathrow, Gatwick and Manchester direct to Lagos and Abuja. IATA-certified handling on every consignment — from a single parcel to a full pallet.",
    sub:     "5–10 working days",
    rate:    "from £5/kg",
    accent:  "#0818A8",
    img:     IMGS.airFreight,
    imgAlt:  "Cargo aircraft being loaded at London Heathrow for Nigeria",
    points: [
      "5–10 working days UK to Nigeria",
      "Weekly departures — no delays",
      "All 36 Nigerian states covered",
      "UK door collection available",
      "Real-time tracking on every shipment",
      "IATA-certified cargo handling",
    ],
    metric: { val: "5–10", unit: "working days", label: "UK to Nigeria" },
    airlines: ["British Airways", "Virgin Atlantic", "Emirates", "Ethiopian Airlines"],
  },
  {
    id:      "sea-freight",
    slug:    "/sea-shipping-to-nigeria",
    icon:    Ship,
    label:   "Sea Freight",
    badge:   "Best Value",
    problemTitle: "High shipping costs eating your margins?",
    problemBody:  "Air freight at scale isn't viable for bulk goods, vehicles or machinery. You need an affordable, reliable sea corridor that won't surprise you with hidden charges.",
    solutionTitle: "Weekly Sea Freight to Nigeria.",
    solutionBody:  "Weekly consolidated sea freight from UK ports to Lagos — ideal for bulk, heavy, or high-volume consignments. The most cost-effective way to move significant quantities between the UK and Nigeria, every week.",
    sub:     "Weekly sailings",
    rate:    "from £3/kg",
    accent:  "#1F51FF",
    img:     IMGS.seaFreight,
    imgAlt:  "Container ship departing UK port loaded with Nigeria-bound cargo",
    points: [
      "Weekly fixed-schedule sailings",
      "FCL (full container) & LCL (shared)",
      "Vehicles & heavy machinery accepted",
      "Customs clearance included",
      "4–6 weeks transit time",
      "Essex consolidation warehouse",
    ],
    metric: { val: "£3", unit: "/kg", label: "from — best value" },
    airlines: [],
  },
  {
    id:      "door-to-door",
    slug:    "/door-to-door-cargo",
    icon:    Truck,
    label:   "Door to Door",
    badge:   "Most Popular",
    problemTitle: "Managing logistics from two countries?",
    problemBody:  "Coordinating UK collections, Nigeria customs, and last-mile delivery through multiple providers is a management nightmare. One mistake and your shipment stalls.",
    solutionTitle: "Complete Door-to-Door Cargo.",
    solutionBody:  "We collect from your UK address and deliver to any address in Nigeria. Both customs handled by our in-house team. Air or sea — your choice. One point of contact from start to finish.",
    sub:     "UK collection · NG delivery",
    rate:    "from £6/kg",
    accent:  "#0437F2",
    img:     IMGS.doorToDoor,
    imgAlt:  "R-Zone cargo collection from UK business address",
    points: [
      "Single point of contact end-to-end",
      "UK-wide door collection",
      "Delivery to all 36 Nigerian states",
      "Air or sea — you choose",
      "UK & Nigeria customs both handled",
      "SMS & email notifications throughout",
    ],
    metric: { val: "1", unit: "contact", label: "end-to-end management" },
    airlines: [],
  },
  {
    id:      "importation",
    slug:    "/importation-from-nigeria",
    icon:    Package,
    label:   "Importation",
    badge:   "Two-Way",
    problemTitle: "Sourcing goods from Nigeria to the UK?",
    problemBody:  "Getting goods out of Nigeria is complex — port clearance, NCS compliance, UK customs, VAT. Without the right partner your goods sit in Lagos for weeks.",
    solutionTitle: "Importation from Nigeria, Solved.",
    solutionBody:  "Weekly air and sea services bringing Nigerian goods to the UK. African foodstuffs, textiles, commercial merchandise — our Lagos team handles collection from anywhere in Nigeria and delivers to your UK door.",
    sub:     "Weekly air · Weekly sea",
    rate:    "from £5/kg",
    accent:  "#0818A8",
    img:     IMGS.importation,
    imgAlt:  "Nigerian goods and merchandise prepared for UK importation",
    points: [
      "Weekly air collections from Lagos",
      "Weekly sea from Apapa port",
      "African foodstuffs accepted",
      "Full UK customs clearance included",
      "Collection from all 36 Nigerian states",
      "Commercial & personal cargo",
    ],
    metric: { val: "Weekly", unit: "departures", label: "Nigeria to UK" },
    airlines: [],
  },
  {
    id:      "customs",
    slug:    "/customs-clearance",
    icon:    FileCheck,
    label:   "Customs Clearance",
    badge:   "Specialist",
    problemTitle: "Cargo held at customs — again?",
    problemBody:  "Incorrect documentation, wrong HS codes, missed compliance checks — customs errors cost businesses thousands in demurrage, fines, and delays. You need specialists who know both systems.",
    solutionTitle: "Expert Customs Clearance.",
    solutionBody:  "End-to-end customs brokerage by our in-house team. HS code classification, duty calculation, HMRC and NCS filings, full compliance checks. Your cargo moves — no delays, no surprises, no guesswork.",
    sub:     "UK & Nigeria",
    rate:    "Included",
    accent:  "#1F51FF",
    img:     IMGS.customs,
    imgAlt:  "Customs documentation being processed by R-Zone specialist team",
    points: [
      "UK import & export customs clearance",
      "Nigeria Customs Service (NCS) compliant",
      "Accurate HS code classification",
      "Duty & VAT calculation handled",
      "Urgent priority clearance available",
      "HMRC authorised agent",
    ],
    metric: { val: "0", unit: "surprises", label: "transparent customs" },
    airlines: [],
  },
  {
    id:      "warehousing",
    slug:    "/warehousing",
    icon:    Warehouse,
    label:   "Warehousing",
    badge:   "UK & Nigeria",
    problemTitle: "No storage solution in the UK or Nigeria?",
    problemBody:  "Without a trusted warehouse partner at both ends of the corridor, you're relying on third parties who don't understand your cargo. Stock sits untracked, uninsured, and at risk.",
    solutionTitle: "Secure Dual-Country Warehousing.",
    solutionBody:  "Monitored storage at our Upminster, Essex and Lagos facilities. Pre-consolidation, long-term distribution or just-in-time despatch. Your inventory managed by the same team that ships it.",
    sub:     "Upminster UK · Lagos NG",
    rate:    "from £25/wk",
    accent:  "#0437F2",
    img:     IMGS.warehousing,
    imgAlt:  "Secure R-Zone warehouse facility for UK and Nigeria cargo storage",
    points: [
      "Upminster, Essex UK warehouse",
      "Lagos, Nigeria storage hub",
      "24/7 CCTV monitored & insured",
      "Flexible short & long-term terms",
      "Full inventory management system",
      "Pick, pack & same-day despatch",
    ],
    metric: { val: "2", unit: "locations", label: "UK & Nigeria" },
    airlines: [],
  },
  {
    id:      "cargo-handling",
    slug:    "/services",
    icon:    Anchor,
    label:   "Cargo Handling",
    badge:   "Specialist",
    problemTitle: "Oversized, hazardous or heavy-lift cargo?",
    problemBody:  "Standard couriers won't touch it. Freight forwarders without specialist port experience create expensive mistakes. Your project cargo needs a team certified to handle every complexity.",
    solutionTitle: "Specialist Port & Cargo Handling.",
    solutionBody:  "Port stevedoring, heavy lift, oversized and out-of-gauge cargo at all major Nigerian ports. Certified IATA/IMDG dangerous goods handling. Full compliance from origin to final placement.",
    sub:     "Port ops · Heavy lift",
    rate:    "POA",
    accent:  "#0818A8",
    img:     IMGS.cargo,
    imgAlt:  "Port crane loading specialist cargo at Nigerian port facility",
    points: [
      "Port stevedoring at all Nigerian ports",
      "Heavy lift & project cargo expertise",
      "Oversized & out-of-gauge cargo (OOG)",
      "IATA/IMDG dangerous goods certified",
      "Third-party independent cargo inspection",
      "Apapa, Tin Can, Onne & Calabar ports",
    ],
    metric: { val: "IATA", unit: "certified", label: "specialist handling" },
    airlines: [],
  },
];

const WHY_RZONE = [
  {
    icon: Shield,
    title: "Fully Insured & Compliant",
    body: "Every R-Zone shipment is covered by comprehensive cargo insurance. IATA-certified, NCS-compliant, and HMRC-registered — we operate to international standards at every stage.",
    accent: "#0818A8",
  },
  {
    icon: Users,
    title: "Real People. No Bots.",
    body: "Our UK-based team answers your calls and responds to your emails — same day, every day. You'll never be routed to a call centre or an automated system.",
    accent: "#1F51FF",
  },
  {
    icon: Globe,
    title: "Both Ends Managed In-House",
    body: "Unlike brokers who outsource Nigeria-side operations, R-Zone runs its own Lagos hub. That means seamless customs clearance, port handling, and last-mile delivery — no handoff failures.",
    accent: "#0818A8",
  },
  {
    icon: Zap,
    title: "Weekly Departures — No Waiting",
    body: "Air freight departs weekly. Sea freight sails weekly. You're never waiting 3–4 weeks for a vessel. Your cargo moves when your business needs it to.",
    accent: "#1F51FF",
  },
  {
    icon: Star,
    title: "Highest-Rated UK–Nigeria Cargo Company",
    body: "107+ five-star Google reviews — organically earned, never incentivised. The most trusted cargo and logistics company operating between the UK, Nigeria, and across Africa.",
    accent: "#0818A8",
  },
  {
    icon: TrendingUp,
    title: "Transparent Pricing. Zero Surprises.",
    body: "R-Zone quotes include customs, handling, and all fees upfront. What you're quoted is what you pay. We've built our reputation on transparency.",
    accent: "#1F51FF",
  },
];

const TRUST_STATS = [
  { val: "50,000+", label: "Shipments Delivered",   icon: Package,   sub: "Safely, on time"        },
  { val: "12+",     label: "Years Operating",        icon: Clock,     sub: "Since 2012"             },
  { val: "107+",    label: "5-Star Reviews",         icon: Star,      sub: "Organically earned"     },
  { val: "99%",     label: "Delivery Success Rate",  icon: Shield,    sub: "Industry leading"       },
  { val: "36",      label: "Nigerian States Served", icon: MapPin,    sub: "Full national coverage" },
  { val: "2",       label: "Warehouse Locations",    icon: Warehouse, sub: "UK & Nigeria"           },
];

const PROCESS = [
  {
    num:   "01",
    title: "Tell Us Your Challenge",
    body:  "Share your cargo details, business requirement, and destination. Air, sea, import or export — we'll identify the right solution in under 2 minutes.",
    icon:  Briefcase,
    label: "Free consultation",
  },
  {
    num:   "02",
    title: "We Build Your Solution",
    body:  "Our team produces a transparent, itemised quote — no hidden charges, no guesswork. You'll know exactly what you're paying and when your cargo moves.",
    icon:  BarChart3,
    label: "Itemised quote",
  },
  {
    num:   "03",
    title: "R-Zone Handles Everything",
    body:  "Collection, packing, manifests, customs at both ends, airline or vessel booking — your dedicated handler manages every step so you focus on your business.",
    icon:  Shield,
    label: "End-to-end managed",
  },
  {
    num:   "04",
    title: "Tracked to the Door",
    body:  "Real-time updates from UK departure to Nigeria delivery. Your team is notified at every milestone — no chasing, no guessing, no calls to a call centre.",
    icon:  MapPin,
    label: "Live tracking",
  },
];

// ─── Animation presets ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

// ─── Tag pill ─────────────────────────────────────────────────────────────────
function TagPill({ label, dark = false }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-6 ${
      dark
        ? "border-[#1F51FF]/30 bg-[#0818A8]/14"
        : "border-[#0818A8]/20 bg-[#0818A8]/6"
    }`}>
      <motion.span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dark ? "bg-[#1F51FF]" : "bg-[#0818A8]"}`}
        animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      />
      <span className={`text-[10px] font-bold tracking-[0.32em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>
        {label}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO — "Your problem. Our solution."
// ═══════════════════════════════════════════════════════════════════════════════
function Hero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const imgParallax  = useTransform(scrollY, [0, 700], [0, 130]);
  const [activeProblem, setActiveProblem] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveProblem(p => (p + 1) % BUSINESS_PROBLEMS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] bg-[#00040f] overflow-hidden hero-section"
      aria-labelledby="biz-hero-heading"
    >
      {/* Right half image */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] overflow-hidden" aria-hidden="true">
        <motion.div className="absolute inset-0 scale-110" style={{ y: imgParallax }}>
          <Image
            src={IMGS.hero}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width:1024px) 100vw, 55vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00040f] via-[#00040f]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00040f] via-transparent to-[#00040f]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00040f]/80" />
      </div>

      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.028]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(8,24,168,0.22) 0%, transparent 60%)" }} />
        {[8, 28].map(p => (
          <div key={p} className="absolute top-0 bottom-0 w-px opacity-[0.06]"
            style={{ left: `${p}%`, background: "linear-gradient(to bottom, transparent 5%, #1F51FF 40%, transparent 95%)" }} />
        ))}
      </div>

      {/* Animated route arc */}
      <div className="absolute bottom-32 left-0 right-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1400 80" className="w-full opacity-[0.07]" preserveAspectRatio="none">
          <motion.path
            d="M 0 40 Q 350 10 700 40 Q 1050 70 1400 40"
            fill="none" stroke="#1F51FF" strokeWidth="1.5" strokeDasharray="8 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2.2, delay: 1.0, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        ref={ref}
        className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pt-[110px] pb-16 md:pb-20 min-h-[100svh] flex flex-col justify-center"
      >
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: -8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-white/80 text-[11.5px] font-medium hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
          <span className="text-white text-[11.5px] font-medium" aria-current="page">Business Solutions</span>
        </motion.nav>

        <div className="max-w-[700px]">

          {/* Live problem ticker */}
          <motion.div
            className="mb-3 h-[40px] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            aria-live="polite"
            aria-label="Common cargo problems R-Zone solves"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProblem}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1F51FF]" aria-hidden="true" />
                <span className="text-[13.5px] tracking-wide">
                  <span className="text-white font-semibold">{BUSINESS_PROBLEMS[activeProblem].problem}</span>
                  {" "}
                  <span className="text-[#1F51FF] font-semibold">{BUSINESS_PROBLEMS[activeProblem].solve}</span>
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Tag pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <TagPill label="UK–Nigeria Business Logistics Solutions" dark />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            id="biz-hero-heading"
            className="font-black uppercase leading-[0.86] tracking-[-0.04em] mb-6"
            style={{ fontSize: "clamp(44px, 8vw, 92px)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <motion.span
              className="block text-white"
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Your Cargo.
            </motion.span>
            <motion.span
              className="block"
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative inline-block">
                <span className="text-[#1F51FF]">Our Solution.</span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-[4px] rounded-full"
                  style={{ background: "linear-gradient(to right, #0818A8, #1F51FF)" }}
                  aria-hidden="true"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 0.65, delay: 1.1 }}
                />
              </span>
            </motion.span>
            <motion.span
              className="block text-white/80"
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
            >
              Guaranteed.
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-white/80 text-[15.5px] font-light leading-relaxed max-w-[560px] mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Cargo delayed at customs. Supply chains stalled. No visibility on your shipment.
            Stock sitting in Lagos. R-Zone Enterprises solves every UK–Nigeria logistics
            challenge — with our own teams on both sides of the corridor.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-14"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.72 }}
          >
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12.5px] font-black tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200 shadow-2xl shadow-[#0818A8]/40"
              aria-label="Get a free business shipping quote"
            >
              Solve My Logistics Problem
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <a
              href="#solutions"
              className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-[12.5px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-200"
              aria-label="See all business logistics solutions"
            >
              See All Solutions
            </a>
          </motion.div>

          {/* Problem chips */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <p className="text-white/80 text-[10px] font-bold tracking-[0.25em] uppercase w-full mb-1">
              Problems We Solve
            </p>
            {BUSINESS_PROBLEMS.map((bp) => {
              const Icon = bp.icon;
              return (
                <div
                  key={bp.id}
                  className="flex items-center gap-2 border border-white/[0.1] bg-white/[0.04] px-3.5 py-2"
                >
                  <Icon size={11} className="text-[#1F51FF] flex-shrink-0" aria-hidden="true" />
                  <span className="text-white/80 text-[11px] font-medium">{bp.problem}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Right side nav chips — desktop */}
        <motion.div
          className="hidden xl:flex flex-col gap-2 absolute right-8 top-1/2 -translate-y-1/2 z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          aria-hidden="true"
        >
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-2.5 border border-white/[0.1] bg-white/[0.05] backdrop-blur-sm px-4 py-2.5 hover:border-[#1F51FF]/50 hover:bg-[#0818A8]/20 transition-all duration-200"
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 1.0 + i * 0.07 }}
              >
                <Icon size={12} style={{ color: s.accent }} aria-hidden="true" />
                <span className="text-white/80 text-[11px] font-semibold group-hover:text-white transition-colors">{s.label}</span>
                <ArrowRight size={9} className="text-white/80 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
          aria-hidden="true"
        >
          <span className="text-white/80 text-[9px] font-bold tracking-[0.35em] uppercase">Solutions Below</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-[#1F51FF]/50 to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STICKY NAV
// ═══════════════════════════════════════════════════════════════════════════════
function SolutionNav() {
  const [active, setActive] = useState(SOLUTIONS[0].id);

  useEffect(() => {
    const obs = [];
    SOLUTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(s.id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <div
      className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
      role="navigation"
      aria-label="Business solutions navigation"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {SOLUTIONS.map(s => {
            const Icon    = s.icon;
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-label={`Go to ${s.label} solution`}
                className={`flex items-center gap-2 px-4 py-3.5 text-[12px] font-semibold tracking-[0.03em] whitespace-nowrap flex-shrink-0 border-b-2 transition-all duration-150 ${
                  isActive
                    ? "border-[#0818A8] text-[#0818A8]"
                    : "border-transparent text-gray-800 hover:text-[#0818A8] hover:border-gray-300"
                }`}
              >
                <Icon size={13} aria-hidden="true" />
                {s.label}
              </a>
            );
          })}
          <div className="ml-auto flex-shrink-0 pl-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-1.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11px] font-black tracking-[0.08em] uppercase px-5 py-2 transition-all duration-200 my-2"
              aria-label="Get a free business quote"
            >
              Get a Quote <ArrowRight size={10} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SOLUTION SECTION — Problem → Solution layout
// ═══════════════════════════════════════════════════════════════════════════════
function SolutionSection({ sol, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon   = sol.icon;
  const isDark = index % 2 === 1;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id={sol.id}
      ref={ref}
      className={`relative overflow-hidden scroll-mt-[56px] ${isDark ? "bg-[#00061a]" : "bg-white"}`}
      aria-labelledby={`${sol.id}-heading`}
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Background */}
      {isDark ? (
        <>
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
          <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${sol.accent}15 0%, transparent 65%)`, transform: "translate(20%,-20%)" }} aria-hidden="true" />
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      )}

      {/* Section number */}
      <div
        className={`absolute top-10 ${index % 2 === 0 ? "right-6 lg:right-16" : "left-6 lg:left-16"} font-black pointer-events-none select-none leading-none ${isDark ? "text-white/[0.04]" : "text-[#0818A8]/[0.05]"}`}
        style={{ fontSize: "clamp(70px, 12vw, 160px)" }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28 lg:py-32">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>

          {/* Content */}
          <motion.div
            className={index % 2 === 1 ? "lg:col-start-2" : ""}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Icon + badge */}
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${sol.accent}18` }}
                aria-hidden="true"
              >
                <Icon size={21} style={{ color: sol.accent }} />
              </div>
              <span className={`text-[10px] font-bold tracking-[0.22em] uppercase px-3 py-1.5 border ${
                isDark
                  ? "border-white/15 text-white/80 bg-white/5"
                  : "border-[#0818A8]/20 text-[#0818A8] bg-[#0818A8]/5"
              }`}>
                {sol.badge}
              </span>
            </motion.div>

            {/* ── PROBLEM BLOCK ── */}
            <motion.div
              variants={fadeUp}
              custom={0.08}
              className={`mb-7 p-5 border-l-4 ${isDark ? "bg-red-500/5 border-red-500/40" : "bg-red-50 border-red-400"}`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={14}
                  className={`flex-shrink-0 mt-0.5 ${isDark ? "text-red-400" : "text-red-500"}`}
                  aria-hidden="true"
                />
                <div>
                  <p className={`font-bold text-[13px] mb-1 ${isDark ? "text-red-400" : "text-red-600"}`}>
                    The Problem
                  </p>
                  <p className={`font-black text-[16px] leading-tight mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {sol.problemTitle}
                  </p>
                  <p className={`text-[13px] font-light leading-relaxed ${isDark ? "text-white/80" : "text-gray-800"}`}>
                    {sol.problemBody}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── SOLUTION HEADLINE ── */}
            <motion.div variants={fadeUp} custom={0.05} className="flex items-center gap-3 mb-3">
              <motion.div
                className="h-[2px] rounded-full"
                style={{ backgroundColor: sol.accent }}
                initial={{ width: 0 }}
                animate={inView ? { width: 28 } : {}}
                transition={{ duration: 0.45, delay: 0.35 }}
                aria-hidden="true"
              />
              <span className={`text-[10px] font-bold tracking-[0.28em] uppercase ${isDark ? "text-white/80" : "text-gray-800"}`}>
                R-Zone Solution
              </span>
            </motion.div>

            <motion.h2
              id={`${sol.id}-heading`}
              variants={fadeUp}
              custom={0.1}
              className={`font-black text-[clamp(26px,4.5vw,48px)] leading-[0.92] tracking-[-0.03em] uppercase mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
              itemProp="name"
            >
              <span className="relative inline-block" style={{ color: sol.accent }}>
                {sol.solutionTitle}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                  style={{ backgroundColor: sol.accent }}
                  aria-hidden="true"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 0.55, delay: 0.7 }}
                />
              </span>
            </motion.h2>

            {/* Sub + rate */}
            <motion.div variants={fadeUp} custom={0.15} className="flex items-center gap-4 mb-4">
              <span className={`text-[13px] font-semibold ${isDark ? "text-white/80" : "text-gray-800"}`}>
                {sol.sub}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden="true" />
              <span className="text-[13px] font-black" style={{ color: sol.accent }}>{sol.rate}</span>
            </motion.div>

            {/* Solution body */}
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className={`text-[14px] font-light leading-relaxed mb-8 ${isDark ? "text-white/80" : "text-gray-800"}`}
              itemProp="description"
            >
              {sol.solutionBody}
            </motion.p>

            {/* Feature grid */}
            <motion.ul
              variants={fadeUp}
              custom={0.25}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8"
              role="list"
              aria-label={`${sol.label} solution features`}
            >
              {sol.points.map(p => (
                <li key={p} className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-full"
                    style={{ backgroundColor: `${sol.accent}18`, border: `1.5px solid ${sol.accent}30` }}
                    aria-hidden="true"
                  >
                    <Check size={9} style={{ color: sol.accent }} />
                  </span>
                  <span className={`text-[13px] font-medium ${isDark ? "text-white/80" : "text-gray-800"}`}>
                    {p}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Airline partners */}
            {sol.airlines.length > 0 && (
              <motion.div
                variants={fadeUp}
                custom={0.3}
                className={`flex flex-wrap gap-2 mb-8 pb-8 border-b ${isDark ? "border-white/[0.08]" : "border-gray-100"}`}
              >
                <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mr-1 flex-shrink-0 self-center ${isDark ? "text-white/80" : "text-gray-800"}`}>
                  Airline Partners
                </span>
                {sol.airlines.map(a => (
                  <span key={a} className={`text-[11px] font-semibold px-3 py-1.5 border ${
                    isDark ? "border-white/15 text-white/80 bg-white/5" : "border-gray-200 text-gray-800 bg-gray-50"
                  }`}>{a}</span>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={0.35} className="flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 text-[12px] font-black tracking-[0.1em] uppercase px-7 py-3.5 text-white transition-all duration-200"
                style={{ backgroundColor: sol.accent, boxShadow: `0 8px 28px ${sol.accent}30` }}
                aria-label={`Get a quote for ${sol.label}`}
              >
                Solve This Problem
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                href={sol.slug}
                className={`inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 border transition-all duration-200 ${
                  isDark
                    ? "border-white/25 text-white/80 hover:border-white/50 hover:text-white"
                    : "border-gray-300 text-gray-800 hover:border-[#0818A8] hover:text-[#0818A8]"
                }`}
                aria-label={`Learn more about ${sol.label}`}
              >
                Full Details
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className={`relative ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden aspect-[16/11]">
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image
                  src={sol.img}
                  alt={sol.imgAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-[#00061a]/20 to-transparent" : "bg-gradient-to-br from-white/10 to-transparent"}`}
                  aria-hidden="true"
                />
              </motion.div>

              {/* Metric badge */}
              <motion.div
                className="absolute bottom-4 left-4 border backdrop-blur-md"
                style={{ borderColor: `${sol.accent}40`, backgroundColor: isDark ? "rgba(0,6,26,0.88)" : "rgba(255,255,255,0.94)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="px-5 py-3">
                  <p className="font-black text-[24px] leading-none tracking-[-0.02em]" style={{ color: sol.accent }}>
                    {sol.metric.val}
                    <span className="text-[14px] font-semibold ml-0.5">{sol.metric.unit}</span>
                  </p>
                  <p className={`text-[10px] font-bold tracking-[0.15em] uppercase mt-0.5 ${isDark ? "text-white/80" : "text-gray-800"}`}>
                    {sol.metric.label}
                  </p>
                </div>
              </motion.div>

              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(to right, ${sol.accent}, #1F51FF)` }}
                aria-hidden="true"
              />

              {/* Problem solved badge */}
              <motion.div
                className="absolute top-4 right-4 flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/10 backdrop-blur-sm px-3 py-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.0 }}
              >
                <CheckCircle2 size={11} className="text-emerald-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-emerald-400 text-[10px] font-bold tracking-[0.12em] uppercase">
                  Problem Solved
                </span>
              </motion.div>
            </div>

            {/* Decorative shadow */}
            <div
              className="absolute -bottom-3 -right-3 left-3 h-[80%] -z-10"
              style={{ backgroundColor: `${sol.accent}18` }}
              aria-hidden="true"
            />
          </motion.div>

        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? "bg-white/[0.05]" : "bg-gray-100"}`} aria-hidden="true" />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// WHY R-ZONE — Business trust section
// ═══════════════════════════════════════════════════════════════════════════════
function WhyRZone() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#00061a] overflow-hidden"
      aria-labelledby="why-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#0818A8]/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="Why Businesses Choose R-Zone" dark />
          </motion.div>
          <motion.h2
            id="why-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black text-[clamp(26px,4.5vw,52px)] text-white leading-[0.92] tracking-[-0.028em] uppercase"
          >
            Why R-Zone Wins{" "}
            <span className="relative inline-block text-[#1F51FF]">
              Every Time.
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full"
                aria-hidden="true"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ duration: 0.55, delay: 0.55 }}
              />
            </span>
          </motion.h2>
          <motion.p
            className="text-white/80 text-[14px] font-light mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Other freight providers route your cargo through third-party networks and hope for the best.
            R-Zone owns both ends of the corridor — and that changes everything.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_RZONE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="group relative border border-white/[0.07] bg-white/[0.03] p-7 hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.09 }}
              >
                <div
                  className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: item.accent }}
                  aria-hidden="true"
                />
                <div
                  className="w-11 h-11 rounded-sm flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${item.accent}18` }}
                  aria-hidden="true"
                >
                  <Icon size={18} style={{ color: item.accent }} />
                </div>
                <h3 className="text-white font-black text-[15px] tracking-[-0.01em] mb-3">{item.title}</h3>
                <p className="text-white/80 text-[13px] font-light leading-relaxed">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRUST STATS
// ═══════════════════════════════════════════════════════════════════════════════
function TrustStats() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="relative overflow-hidden bg-[#0818A8]"
      aria-labelledby="trust-heading"
      ref={ref}
    >
      <div className="absolute inset-0">
        <Image src={IMGS.stats} alt="" fill className="object-cover opacity-10" aria-hidden="true" sizes="100vw" />
        <div className="absolute inset-0 bg-[#0818A8]/80" aria-hidden="true" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2.5 border border-white/25 bg-white/10 px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80" aria-hidden="true" />
              <span className="text-white/80 text-[10px] font-bold tracking-[0.3em] uppercase">R-Zone By the Numbers</span>
            </div>
          </motion.div>
          <motion.h2
            id="trust-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black text-[clamp(26px,4.5vw,50px)] text-white leading-[0.92] tracking-[-0.03em] uppercase"
          >
            Trusted by Over{" "}
            <span className="text-white/80">10,000 Businesses &amp; Families.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {TRUST_STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                className="flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07 }}
              >
                <div
                  className="w-11 h-11 bg-white/20 group-hover:bg-white/30 flex items-center justify-center mb-4 transition-colors"
                  aria-hidden="true"
                >
                  <Icon size={17} className="text-white" />
                </div>
                <p className="text-white font-black text-[28px] leading-none tracking-[-0.025em] mb-1">{s.val}</p>
                <p className="text-white/80 text-[10.5px] font-bold tracking-[0.1em] uppercase">{s.label}</p>
                <p className="text-white/80 text-[10px] font-light mt-0.5">{s.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOW R-ZONE WORKS — "How we handle your problem"
// ═══════════════════════════════════════════════════════════════════════════════
function HowRZoneWorks() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative bg-white overflow-hidden" aria-labelledby="how-heading">
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="The R-Zone Process" />
          </motion.div>
          <motion.h2
            id="how-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black text-[clamp(26px,4.5vw,52px)] text-gray-900 leading-[0.92] tracking-[-0.028em] uppercase"
          >
            How R-Zone{" "}
            <span className="relative inline-block text-[#0818A8]">
              Solves Your Problem.
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full"
                aria-hidden="true"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ duration: 0.55, delay: 0.55 }}
              />
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-800 text-[14px] font-light mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Four steps. One team. Zero handoffs. Your freight challenge becomes our managed solution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="relative border border-gray-200 bg-gray-50 p-7 hover:border-[#0818A8]/40 hover:shadow-xl hover:shadow-[#0818A8]/10 transition-all duration-300 group overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]"
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="font-black text-[52px] text-[#0818A8]/8 leading-none tracking-[-0.02em]"
                    aria-hidden="true"
                  >
                    {step.num}
                  </span>
                  <div
                    className="w-11 h-11 bg-[#0818A8]/8 group-hover:bg-[#0818A8]/15 flex items-center justify-center transition-colors"
                    aria-hidden="true"
                  >
                    <Icon size={18} className="text-[#0818A8]" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#0818A8]/8 px-2.5 py-1 mb-4">
                  <span className="text-[#0818A8] text-[9.5px] font-bold tracking-[0.18em] uppercase">{step.label}</span>
                </div>
                <h3 className="text-gray-900 font-black text-[15.5px] tracking-[-0.01em] mb-3">{step.title}</h3>
                <p className="text-gray-800 text-[13px] font-light leading-relaxed">{step.body}</p>

                {i < PROCESS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-4 z-10 w-8 h-px bg-gradient-to-r from-gray-300 to-gray-200"
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CTA — Business-focused
// ═══════════════════════════════════════════════════════════════════════════════
function BusinessCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#00061a] overflow-hidden"
      aria-label="Contact R-Zone Business Solutions team"
    >
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.28) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/50 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <TagPill label="Speak to Our Business Team" dark />
            <h2 className="font-black text-[clamp(30px,5.5vw,60px)] text-white leading-[0.9] tracking-[-0.03em] uppercase mb-5">
              Ready to Solve<br />
              <span className="text-[#1F51FF]">Your Logistics Problem?</span>
            </h2>
            <p className="text-white/80 text-[15px] font-light leading-relaxed max-w-lg mb-8">
              Our UK-based business team responds the same day. No call centres,
              no automated replies. Real logistics experts who understand the
              UK–Nigeria corridor.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12.5px] font-black tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200 shadow-2xl shadow-[#0818A8]/40"
                aria-label="Get a free business shipping quote"
              >
                Get a Free Business Quote
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a
                href="tel:+448007720864"
                className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 text-white/80 hover:text-white text-[12.5px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-200"
                aria-label="Call R-Zone Business Team: +44 800 772 0864"
              >
                <Phone size={13} aria-hidden="true" />
                +44 800 772 0864
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              {["Free Consultation", "Same-Day Response", "No Hidden Fees", "IATA Certified", "Weekly Departures"].map(t => (
                <span key={t} className="flex items-center gap-2 text-white/80 text-[12px] font-light">
                  <Check size={12} className="text-[#1F51FF]" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — solution quick-links */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {SOLUTIONS.map((sol, i) => {
              const Icon = sol.icon;
              return (
                <motion.a
                  key={sol.id}
                  href={`#${sol.id}`}
                  className="group border border-white/[0.07] bg-white/[0.04] p-5 hover:border-white/[0.18] hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.4 + i * 0.06 }}
                  aria-label={`View ${sol.label} solution`}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-400"
                    style={{ backgroundColor: sol.accent }}
                    aria-hidden="true"
                  />
                  <Icon size={16} style={{ color: sol.accent }} className="mb-3" aria-hidden="true" />
                  <p className="text-white font-bold text-[13px] mb-0.5">{sol.label}</p>
                  <p className="text-white/80 text-[11px] font-light">{sol.rate}</p>
                  <ArrowRight size={12} className="text-white/80 group-hover:text-white mt-3 transition-colors" aria-hidden="true" />
                </motion.a>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function BusinessSolutionsClient() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home",               "item": "https://r-zoneenterprises.com" },
                  { "@type": "ListItem", "position": 2, "name": "Business Solutions", "item": "https://r-zoneenterprises.com/business-solutions" },
                ],
              },
              {
                "@type": "ItemList",
                "name": "R-Zone Cargo — UK–Nigeria Business Logistics Solutions",
                "description": "How R-Zone Cargo solves UK–Nigeria freight, customs, warehousing, and cargo challenges for businesses.",
                "url": "https://r-zoneenterprises.com/business-solutions",
                "numberOfItems": SOLUTIONS.length,
                "itemListElement": SOLUTIONS.map((s, i) => ({
                  "@type": "ListItem",
                  "position": i + 1,
                  "item": {
                    "@type": "Service",
                    "name": s.label,
                    "description": s.solutionBody,
                    "url": `https://r-zoneenterprises.com${s.slug}`,
                    "provider": { "@type": "Organization", "name": "R-Zone Enterprises" },
                    "offers": { "@type": "Offer", "priceCurrency": "GBP", "description": s.rate },
                  },
                })),
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How does R-Zone handle customs clearance between the UK and Nigeria?",
                    "acceptedAnswer": { "@type": "Answer", "text": "R-Zone's in-house customs team handles all UK HMRC and Nigeria Customs Service (NCS) documentation, HS code classification, duty calculation and filing — included in all shipments." },
                  },
                  {
                    "@type": "Question",
                    "name": "Does R-Zone offer weekly sea freight to Nigeria?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes — R-Zone operates weekly sea freight sailings from UK ports to Lagos, Nigeria. LCL (shared container) and FCL (full container) options are available." },
                  },
                  {
                    "@type": "Question",
                    "name": "Can R-Zone collect cargo from anywhere in the UK?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes — R-Zone offers UK-wide door collection for both air and sea freight. Cargo can also be dropped off at our Upminster, Essex warehouse." },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] w-full`}>
        <Hero />
        <SolutionNav />
        <main id="solutions">
          {SOLUTIONS.map((sol, i) => (
            <SolutionSection key={sol.id} sol={sol} index={i} />
          ))}
        </main>
        <WhyRZone />
        <TrustStats />
        <HowRZoneWorks />
        <BusinessCTA />
      </div>
    </>
  );
}