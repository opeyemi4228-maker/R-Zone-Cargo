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
  MapPin, BarChart3, Zap, TrendingDown,
  Phone, Mail, Users, Globe,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Unsplash image URLs ──────────────────────────────────────────────────────
const IMGS = {
  hero:         "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1800&q=80&auto=format&fit=crop",
  airFreight:   "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80&auto=format&fit=crop",
  seaFreight:   "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1200&q=80&auto=format&fit=crop",
  doorToDoor:   "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=1200&q=80&auto=format&fit=crop",
  importation:  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80&auto=format&fit=crop",
  customs:      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&auto=format&fit=crop",
  warehousing:  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop",
  cargo:        "https://images.unsplash.com/photo-1468818419799-3d02e0b85c1a?w=1200&q=80&auto=format&fit=crop",
  stats:        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80&auto=format&fit=crop",
};

// ─── Solutions data ───────────────────────────────────────────────────────────
const SOLUTIONS = [
  {
    id:      "air-freight",
    slug:    "/air-freight",
    icon:    Plane,
    label:   "Air Freight",
    badge:   "Fastest",
    title:   "Air Freight\nto Nigeria.",
    sub:     "5–10 working days",
    rate:    "from £5/kg",
    accent:  "#0818A8",
    img:     IMGS.airFreight,
    imgAlt:  "Cargo aircraft being loaded at London Heathrow",
    desc:    "Weekly departures from London Heathrow, Gatwick and Manchester direct to Lagos and Abuja. IATA-certified handling on every consignment — from a single parcel to a full pallet.",
    points: [
      "5–10 working days UK to Nigeria",
      "All 36 Nigerian states covered",
      "UK door collection available",
      "Real-time tracking included",
      "IATA-certified cargo handling",
      "Foodstuffs & general cargo accepted",
    ],
    airlines: ["British Airways", "Virgin Atlantic", "Emirates", "Ethiopian Airlines"],
    featured: false,
  },
  {
    id:      "sea-freight",
    slug:    "/sea-shipping-to-nigeria",
    icon:    Ship,
    label:   "Sea Freight",
    badge:   "Best Value",
    title:   "Sea Shipping\nto Nigeria.",
    sub:     "Monthly sailings",
    rate:    "from £3/kg",
    accent:  "#1F51FF",
    img:     IMGS.seaFreight,
    imgAlt:  "Container ship leaving UK port loaded with cargo",
    desc:    "Monthly consolidated sea freight from UK ports to Lagos — ideal for bulk, heavy, or high-volume consignments. The most cost-effective way to move significant quantities between the UK and Nigeria.",
    points: [
      "Monthly fixed-schedule sailings",
      "FCL (full) & LCL (shared) options",
      "Vehicles & machinery accepted",
      "Customs clearance included",
      "4–6 weeks transit time",
      "Essex consolidation warehouse",
    ],
    airlines: [],
    featured: true,
  },
  {
    id:      "door-to-door",
    slug:    "/door-to-door-cargo",
    icon:    Truck,
    label:   "Door to Door",
    badge:   "Most Popular",
    title:   "Door to Door\nCargo.",
    sub:     "UK collection · NG delivery",
    rate:    "from £6/kg",
    accent:  "#0437F2",
    img:     IMGS.doorToDoor,
    imgAlt:  "Courier delivering packages to a home address",
    desc:    "We collect from your UK address and deliver to any address in Nigeria. Both customs handled. Air or sea — your choice. The complete end-to-end solution for families and businesses.",
    points: [
      "UK-wide door collection",
      "Delivery to all 36 states",
      "Air or sea transit option",
      "UK & Nigeria customs handled",
      "SMS & email notifications",
      "Professional packing available",
    ],
    airlines: [],
    featured: false,
  },
  {
    id:      "importation",
    slug:    "/importation-from-nigeria",
    icon:    Package,
    label:   "Importation",
    badge:   "Two-Way",
    title:   "Import from\nNigeria.",
    sub:     "Weekly air · Monthly sea",
    rate:    "from £5/kg",
    accent:  "#0818A8",
    img:     IMGS.importation,
    imgAlt:  "Warehouse with goods imported from Nigeria",
    desc:    "Weekly air and monthly sea services bringing Nigerian goods to the UK. African foodstuffs, textiles, art, commercial merchandise — our Nigeria team handles collection from anywhere in the country.",
    points: [
      "Weekly air collections from Lagos",
      "Monthly sea from Apapa port",
      "African foodstuffs accepted",
      "UK customs clearance included",
      "Collection from all 36 states",
      "Commercial & personal cargo",
    ],
    airlines: [],
    featured: false,
  },
  {
    id:      "customs",
    slug:    "/customs-clearance",
    icon:    FileCheck,
    label:   "Customs",
    badge:   "Specialist",
    title:   "Customs\nClearance.",
    sub:     "UK & Nigeria",
    rate:    "Included",
    accent:  "#1F51FF",
    img:     IMGS.customs,
    imgAlt:  "Customs officer reviewing shipping documentation",
    desc:    "End-to-end customs brokerage by our in-house team — HS code classification, duty calculation, HMRC and NCS filings, and full compliance. No delays, no surprises, no guesswork.",
    points: [
      "UK import & export clearance",
      "Nigeria Customs Service compliant",
      "HS code classification",
      "Duty & VAT calculation",
      "Urgent clearance available",
      "HMRC authorised agent",
    ],
    airlines: [],
    featured: false,
  },
  {
    id:      "warehousing",
    slug:    "/warehousing",
    icon:    Warehouse,
    label:   "Warehousing",
    badge:   "UK & Nigeria",
    title:   "Secure\nWarehousing.",
    sub:     "Essex · Lagos",
    rate:    "from £25/wk",
    accent:  "#0437F2",
    img:     IMGS.warehousing,
    imgAlt:  "Modern secure warehouse facility for cargo storage",
    desc:    "Secure, monitored storage at our Essex, UK and Lagos, Nigeria facilities. Short-term pre-consolidation storage or longer-term distribution warehousing — flexible to your business cycle.",
    points: [
      "Essex, UK warehouse facility",
      "Lagos, Nigeria storage hub",
      "24/7 CCTV monitored",
      "Flexible short & long-term",
      "Full inventory management",
      "Pick, pack & despatch",
    ],
    airlines: [],
    featured: false,
  },
  {
    id:      "cargo-handling",
    slug:    "/services",
    icon:    Anchor,
    label:   "Cargo Handling",
    badge:   "Port Ops",
    title:   "Specialist\nCargo Handling.",
    sub:     "Port ops · Heavy lift",
    rate:    "POA",
    accent:  "#0818A8",
    img:     IMGS.cargo,
    imgAlt:  "Port operations with crane loading cargo containers",
    desc:    "Port stevedoring, heavy lift, oversized and out-of-gauge cargo management at all major Nigerian ports. Certified IATA/IMDG dangerous goods handling for specialist consignments.",
    points: [
      "Port stevedoring services",
      "Heavy lift & project cargo",
      "Oversized & OOG cargo",
      "IATA/IMDG dangerous goods",
      "Third-party cargo inspection",
      "All major Nigerian ports",
    ],
    airlines: [],
    featured: false,
  },
];

const TRUST_STATS = [
  { val: "50,000+", label: "Shipments Delivered",  icon: Package, sub: "Safely, on time"         },
  { val: "12+",     label: "Years Operating",       icon: Clock,   sub: "Since 2012"              },
  { val: "107+",    label: "5-Star Reviews",        icon: Star,    sub: "Google verified"         },
  { val: "99%",     label: "Delivery Success",      icon: Shield,  sub: "Industry leading"        },
  { val: "36",      label: "Nigerian States",       icon: MapPin,  sub: "Full national coverage"  },
  { val: "2",       label: "Warehouse Locations",   icon: Warehouse,sub: "UK & Nigeria"           },
];

const PROCESS = [
  { num: "01", title: "Get a Free Quote",    body: "Tell us your cargo details online in under 2 minutes — weight, destination, and service type.", icon: BarChart3  },
  { num: "02", title: "Book & Drop Off",     body: "Confirm your booking. Drop cargo at our Essex warehouse or request UK-wide door collection.",    icon: Truck      },
  { num: "03", title: "We Handle the Rest", body: "Customs, manifests, airline or vessel booking — our team manages every step end-to-end.",        icon: Shield     },
  { num: "04", title: "Tracked Delivery",   body: "Real-time tracking from departure to delivery. Your recipient is notified at every key milestone.", icon: MapPin    },
];

// ─── Animation presets ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d } }),
};

const fadeIn = (d = 0) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay: d } },
});

// ─── Shared tag pill ──────────────────────────────────────────────────────────
function TagPill({ label, dark = false }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-6 ${
      dark ? "border-[#1F51FF]/30 bg-[#0818A8]/14" : "border-[#0818A8]/20 bg-[#0818A8]/6"
    }`}>
      <motion.span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dark ? "bg-[#1F51FF]" : "bg-[#0818A8]"}`}
        animate={{ scale: [1, 1.8, 1], opacity: [1, 0.25, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      />
      <span className={`text-[10px] font-bold tracking-[0.32em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>{label}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO — Problem-solution framing, split layout, immersive
// ═══════════════════════════════════════════════════════════════════════════════
const PROBLEMS = [
  { problem: "Cargo stuck at customs?",        solve: "We clear it — UK & Nigeria."     },
  { problem: "Stock trapped in a warehouse?",  solve: "We move it, door to door."       },
  { problem: "Need goods from Lagos fast?",    solve: "Weekly air, 5–8 days."           },
  { problem: "Too expensive to ship by air?",  solve: "Sea freight from £3/kg."         },
  { problem: "Supplier in Abuja, you're in London?", solve: "We bridge the gap."       },
];

function Hero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const imgParallax  = useTransform(scrollY, [0, 700], [0, 130]);
  const [activeProblem, setActiveProblem] = useState(0);

  // Cycle through problems
  useEffect(() => {
    const id = setInterval(() => setActiveProblem(p => (p + 1) % PROBLEMS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] bg-[#00040f] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── RIGHT HALF — Full-bleed image ── */}
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
        {/* Gradients blending image into dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00040f] via-[#00040f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00040f] via-transparent to-[#00040f]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00040f]/80" />
      </div>

      {/* ── Background textures & atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.028]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        {/* Blue atmospheric glow — left side */}
        <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(8,24,168,0.22) 0%, transparent 60%)" }} />
        {/* Accent vertical lines */}
        {[8, 28].map(p => (
          <div key={p} className="absolute top-0 bottom-0 w-px opacity-[0.06]"
            style={{ left: `${p}%`, background: "linear-gradient(to bottom, transparent 5%, #1F51FF 40%, transparent 95%)" }} />
        ))}
      </div>

      {/* ── Animated route line — UK to NG ── */}
      <div className="absolute bottom-32 left-0 right-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1400 80" className="w-full opacity-[0.07]" preserveAspectRatio="none">
          <motion.path
            d="M 0 40 Q 350 10 700 40 Q 1050 70 1400 40"
            fill="none" stroke="#1F51FF" strokeWidth="1.5"
            strokeDasharray="8 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2.2, delay: 1.0, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* ── CONTENT ── */}
      <motion.div
        ref={ref}
        className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 pt-[110px] pb-16 md:pb-20 min-h-[100svh] flex flex-col justify-center"
      >
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-5"
          initial={{ opacity: 0, y: -8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-white/60 text-[11.5px] font-medium hover:text-white transition-colors">Home</Link>
          <ChevronRight size={11} className="text-white/25" aria-hidden="true" />
          <span className="text-white/75 text-[11.5px] font-medium" aria-current="page">Solutions</span>
        </motion.nav>

        <div className="max-w-[680px]">

          {/* ── PROBLEM TICKER ── */}
          <motion.div
            className="mb-1 h-[38px] overflow-hidden"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
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
                <span className="text-[13.5px] font-light text-white/60 tracking-wide">
                  <span className="text-white/80 font-semibold">{PROBLEMS[activeProblem].problem}</span>
                  {" "}
                  <span className="text-[#1F51FF] font-semibold">{PROBLEMS[activeProblem].solve}</span>
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── TAG PILL ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.2 }}
          >
            <TagPill label="UK–Nigeria Import & Export Solutions" dark />
          </motion.div>

          {/* ── MAIN HEADLINE ── */}
          <motion.h1
            id="hero-heading"
            className="font-black uppercase leading-[0.86] tracking-[-0.04em] mb-6"
            style={{ fontSize: "clamp(46px, 8.5vw, 96px)" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.25 }}
          >
            {/* Line 1 */}
            <motion.span
              className="block text-white"
              initial={{ x: -30, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              No More
            </motion.span>

            {/* Line 2 — accent */}
            <motion.span
              className="block relative"
              initial={{ x: -30, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative inline-block">
                <span className="text-[#1F51FF]">Logistics</span>
                {/* Underline sweep */}
                <motion.span
                  className="absolute -bottom-2 left-0 h-[4px] rounded-full"
                  style={{ background: "linear-gradient(to right, #0818A8, #1F51FF)" }}
                  aria-hidden="true"
                  initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.65, delay: 1.1 }}
                />
              </span>
            </motion.span>

            {/* Line 3 */}
            <motion.span
              className="block text-white/80 mt-[8]"
              initial={{ x: -30, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
            >
              Headaches.
            </motion.span>
          </motion.h1>

          {/* ── SUBTEXT ── */}
          <motion.p
            className="text-white/65 text-[15.5px] font-light leading-relaxed max-w-[540px] mb-10"
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
          >
            Importing from Nigeria. Exporting to Lagos. Stuck in customs. Cargo too heavy to fly.
            Whatever your UK–Nigeria freight challenge — R-Zone has a proven solution, managed
            end-to-end by our own team in both countries.
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.72 }}
          >
            <Link href="/quote"
              className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12.5px] font-black tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200 shadow-2xl shadow-[#0818A8]/40"
              aria-label="Get a free shipping quote">
              Solve My Problem
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <a href="#solutions"
              className="inline-flex items-center gap-2.5 border border-white/22 hover:border-white/50 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-[12.5px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-200"
              aria-label="See all shipping solutions">
              See All Solutions
            </a>
          </motion.div>

          {/* ── ANIMATED UK → NIGERIA ROUTE ── */}
          <motion.div
            className="flex items-center gap-0"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.85 }}
            aria-label="UK to Nigeria shipping route"
          >
            {/* UK */}
            <div className="flex flex-col items-center">
              <span className="text-[28px] leading-none mb-1.5" aria-hidden="true">🇬🇧</span>
              <p className="text-white/80 font-black text-[11px] tracking-[0.12em] uppercase">United Kingdom</p>
              <p className="text-white/40 text-[10px] font-light">Essex · London</p>
            </div>

            {/* Animated connector */}
            <div className="flex-1 flex flex-col items-center px-4 relative">
              {/* Line */}
              <div className="w-full h-px bg-white/[0.08] relative mb-2">
                <motion.div
                  className="absolute left-0 top-0 h-full"
                  style={{ background: "linear-gradient(to right, #0818A8, #1F51FF)" }}
                  initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
                  aria-hidden="true"
                />
                {/* Moving plane dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1F51FF] rounded-full shadow-lg shadow-[#1F51FF]/50"
                  animate={{ x: ["0%", "calc(100% - 12px)", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                  aria-hidden="true"
                />
              </div>
              {/* Mode labels */}
              <div className="flex gap-4">
                <span className="flex items-center gap-1 text-[9.5px] font-bold tracking-[0.15em] uppercase text-white/40">
                  <Plane size={9} className="text-[#1F51FF]" aria-hidden="true" /> Air 5–10d
                </span>
                <span className="text-white/20 text-[9px]">·</span>
                <span className="flex items-center gap-1 text-[9.5px] font-bold tracking-[0.15em] uppercase text-white/40">
                  <Ship size={9} className="text-[#1F51FF]" aria-hidden="true" /> Sea 4–6w
                </span>
              </div>
            </div>

            {/* Nigeria */}
            <div className="flex flex-col items-center">
              <span className="text-[28px] leading-none mb-1.5" aria-hidden="true">🇳🇬</span>
              <p className="text-white/80 font-black text-[11px] tracking-[0.12em] uppercase">Nigeria</p>
              <p className="text-white/40 text-[10px] font-light">All 36 States</p>
            </div>
          </motion.div>
        </div>

        {/* ── SOLUTION CHIPS ── right side of screen on desktop ── */}
        <motion.div
          className="hidden xl:flex flex-col gap-2 absolute right-8 top-1/2 -translate-y-1/2 z-20"
          initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.9 }}
          aria-hidden="true"
        >
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-2.5 border border-white/[0.1] bg-white/[0.05] backdrop-blur-sm px-4 py-2.5 hover:border-[#1F51FF]/50 hover:bg-[#0818A8]/20 transition-all duration-200"
                initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 1.0 + i * 0.07 }}
              >
                <Icon size={12} style={{ color: s.accent }} aria-hidden="true" />
                <span className="text-white/70 text-[11px] font-semibold group-hover:text-white transition-colors">{s.label}</span>
                <ArrowRight size={9} className="text-white/25 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.6 }}
          aria-hidden="true"
        >
          <span className="text-white/25 text-[9px] font-bold tracking-[0.35em] uppercase">Explore</span>
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
// SOLUTIONS GRID — Sticky nav + scrolling sections
// ═══════════════════════════════════════════════════════════════════════════════
function SolutionSection({ sol, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon   = sol.icon;
  const isDark = index % 2 === 1;

  // Image parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id={sol.id}
      ref={ref}
      className={`relative overflow-hidden scroll-mt-[60px] ${isDark ? "bg-[#00061a]" : "bg-white"}`}
      aria-labelledby={`${sol.id}-heading`}
      itemScope itemType="https://schema.org/Service"
    >
      {/* Background texture */}
      {isDark ? (
        <>
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
          <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${sol.accent}15 0%, transparent 65%)`, transform: "translate(20%, -20%)" }} aria-hidden="true" />
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      )}

      {/* Decorative section number */}
      <div className={`absolute top-10 ${index % 2 === 0 ? "right-6 lg:right-16" : "left-6 lg:left-16"} font-black pointer-events-none select-none leading-none ${isDark ? "text-white/[0.04]" : "text-[#0818A8]/[0.05]"}`}
        style={{ fontSize: "clamp(70px, 12vw, 160px)" }} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28 lg:py-32">

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>

          {/* Content */}
          <motion.div
            className={index % 2 === 1 ? "lg:col-start-2" : ""}
            initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Badge + icon */}
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${sol.accent}18` }} aria-hidden="true">
                <Icon size={21} style={{ color: sol.accent }} />
              </div>
              <span className={`text-[10px] font-bold tracking-[0.22em] uppercase px-3 py-1.5 border ${
                isDark
                  ? "border-white/15 text-white/70 bg-white/5"
                  : "border-[#0818A8]/20 text-[#0818A8] bg-[#0818A8]/5"
              }`}>
                {sol.badge}
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.div variants={fadeUp} custom={0.05} className="flex items-center gap-3 mb-4">
              <motion.div className="h-[2px] rounded-full" style={{ backgroundColor: sol.accent }}
                initial={{ width: 0 }} animate={inView ? { width: 28 } : {}} transition={{ duration: 0.45, delay: 0.35 }} aria-hidden="true" />
              <span className={`text-[10px] font-bold tracking-[0.28em] uppercase ${isDark ? "text-white/50" : "text-gray-500"}`}>
                R-Zone Solutions
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2 id={`${sol.id}-heading`} variants={fadeUp} custom={0.1}
              className={`font-black text-[clamp(28px,5vw,52px)] leading-[0.9] tracking-[-0.03em] uppercase mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
              itemProp="name">
              {sol.title.split("\n").map((line, li, arr) => (
                <span key={li} className="block">
                  {li === arr.length - 1
                    ? <span className="relative inline-block" style={{ color: sol.accent }}>
                        {line}
                        <motion.span className="absolute -bottom-1 left-0 h-[3px] rounded-full" style={{ backgroundColor: sol.accent }}
                          aria-hidden="true" initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.7 }} />
                      </span>
                    : line
                  }
                </span>
              ))}
            </motion.h2>

            {/* Sub + rate */}
            <motion.div variants={fadeUp} custom={0.15} className="flex items-center gap-4 mb-4">
              <span className={`text-[13px] font-semibold ${isDark ? "text-white/70" : "text-gray-600"}`}>{sol.sub}</span>
              <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden="true" />
              <span className="text-[13px] font-black" style={{ color: sol.accent }}>{sol.rate}</span>
            </motion.div>

            {/* Description */}
            <motion.p variants={fadeUp} custom={0.2}
              className={`text-[14.5px] font-light leading-relaxed mb-8 ${isDark ? "text-white/65" : "text-gray-600"}`}
              itemProp="description">
              {sol.desc}
            </motion.p>

            {/* Feature grid */}
            <motion.ul variants={fadeUp} custom={0.25} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-9" role="list" aria-label={`${sol.label} features`}>
              {sol.points.map(p => (
                <li key={p} className="flex items-center gap-3">
                  <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-full"
                    style={{ backgroundColor: `${sol.accent}18`, border: `1.5px solid ${sol.accent}30` }} aria-hidden="true">
                    <Check size={9} style={{ color: sol.accent }} />
                  </span>
                  <span className={`text-[13px] font-medium ${isDark ? "text-white/75" : "text-gray-700"}`}>{p}</span>
                </li>
              ))}
            </motion.ul>

            {/* Airlines strip if air freight */}
            {sol.airlines.length > 0 && (
              <motion.div variants={fadeUp} custom={0.3} className={`flex flex-wrap gap-2 mb-8 pb-8 border-b ${isDark ? "border-white/[0.08]" : "border-gray-100"}`}>
                <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mr-1 flex-shrink-0 self-center ${isDark ? "text-white/40" : "text-gray-400"}`}>Partners</span>
                {sol.airlines.map(a => (
                  <span key={a} className={`text-[11px] font-semibold px-3 py-1.5 border ${isDark ? "border-white/15 text-white/65 bg-white/5" : "border-gray-200 text-gray-600 bg-gray-50"}`}>{a}</span>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={0.35} className="flex flex-wrap gap-3">
              <Link href="/quote"
                className="group inline-flex items-center gap-2 text-[12px] font-black tracking-[0.1em] uppercase px-7 py-3.5 text-white transition-all duration-200 shadow-lg"
                style={{ backgroundColor: sol.accent, boxShadow: `0 8px 28px ${sol.accent}30` }}
                aria-label={`Get a quote for ${sol.label}`}>
                Get a Quote
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link href={sol.slug}
                className={`inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 border transition-all duration-200 ${
                  isDark
                    ? "border-white/22 text-white/80 hover:border-white/50 hover:text-white"
                    : "border-gray-300 text-gray-700 hover:border-[#0818A8] hover:text-[#0818A8]"
                }`}
                aria-label={`Learn more about ${sol.label}`}>
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className={`relative ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
            initial={{ opacity: 0, scale: 0.96 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>

            {/* Main image */}
            <div className={`relative overflow-hidden ${sol.featured ? "aspect-[4/3]" : "aspect-[16/11]"}`}>
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image
                  src={sol.img}
                  alt={sol.imgAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-[#00061a]/20 to-transparent" : "bg-gradient-to-br from-white/10 to-transparent"}`} aria-hidden="true" />
              </motion.div>

              {/* Floating stat badge */}
              <motion.div
                className="absolute bottom-4 left-4 border backdrop-blur-md"
                style={{ borderColor: `${sol.accent}40`, backgroundColor: isDark ? "rgba(0,6,26,0.85)" : "rgba(255,255,255,0.92)" }}
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.8 }}>
                <div className="px-4 py-3">
                  <p className="font-black text-[22px] leading-none tracking-[-0.02em]" style={{ color: sol.accent }}>{sol.rate}</p>
                  <p className={`text-[10px] font-bold tracking-[0.15em] uppercase mt-0.5 ${isDark ? "text-white/60" : "text-gray-500"}`}>{sol.sub}</p>
                </div>
              </motion.div>

              {/* Corner accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(to right, ${sol.accent}, #1F51FF)` }} aria-hidden="true" />
            </div>

            {/* Decorative shadow */}
            <div className="absolute -bottom-3 -right-3 left-3 h-[80%] -z-10"
              style={{ backgroundColor: `${sol.accent}18` }} aria-hidden="true" />
          </motion.div>

        </div>
      </div>

      {/* Divider */}
      <div className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? "bg-white/[0.05]" : "bg-gray-100"}`} aria-hidden="true" />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STICKY SOLUTION NAV
// ═══════════════════════════════════════════════════════════════════════════════
function SolutionNav() {
  const [active, setActive] = useState(SOLUTIONS[0].id);

  // Track active section
  useEffect(() => {
    const obs = [];
    SOLUTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(s.id); }, { rootMargin: "-30% 0px -60% 0px" });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm" role="navigation" aria-label="Solution sections">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {SOLUTIONS.map(s => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <a key={s.id} href={`#${s.id}`} aria-label={`Go to ${s.label} section`}
                className={`flex items-center gap-2 px-4 py-3.5 text-[12px] font-semibold tracking-[0.03em] whitespace-nowrap flex-shrink-0 border-b-2 transition-all duration-150 ${
                  isActive ? "border-[#0818A8] text-[#0818A8]" : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                }`}>
                <Icon size={13} aria-hidden="true" />
                {s.label}
              </a>
            );
          })}
          <div className="ml-auto flex-shrink-0 pl-4">
            <Link href="/quote"
              className="inline-flex items-center gap-1.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11px] font-black tracking-[0.08em] uppercase px-5 py-2 transition-all duration-200 my-2"
              aria-label="Get a free quote">
              Get a Quote <ArrowRight size={10} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRUST / STATS SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function TrustSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden bg-[#0818A8]" aria-labelledby="trust-heading" ref={ref}>

      {/* Background image */}
      <div className="absolute inset-0">
        <Image src={IMGS.stats} alt="" fill className="object-cover opacity-10" aria-hidden="true" sizes="100vw" />
        <div className="absolute inset-0 bg-[#0818A8]/80" aria-hidden="true" />
      </div>
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

      <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">

        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2.5 border border-white/25 bg-white/10 px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80" aria-hidden="true" />
              <span className="text-white/80 text-[10px] font-bold tracking-[0.3em] uppercase">By the Numbers</span>
            </div>
          </motion.div>
          <motion.h2 id="trust-heading" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black text-[clamp(28px,5vw,52px)] text-white leading-[0.92] tracking-[-0.03em] uppercase">
            Trusted by Over{" "}
            <span className="text-white/60">10,000 Customers.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {TRUST_STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} className="flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.07 }}>
                <div className="w-11 h-11 bg-white/12 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors" aria-hidden="true">
                  <Icon size={17} className="text-white" />
                </div>
                <p className="text-white font-black text-[28px] leading-none tracking-[-0.025em] mb-1">{s.val}</p>
                <p className="text-white/70 text-[10.5px] font-bold tracking-[0.1em] uppercase">{s.label}</p>
                <p className="text-white/40 text-[10px] font-light mt-0.5">{s.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOW IT WORKS
// ═══════════════════════════════════════════════════════════════════════════════
function HowItWorks() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative bg-white overflow-hidden" aria-labelledby="how-heading">
      <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

      <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">

        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="The Process" />
          </motion.div>
          <motion.h2 id="how-heading" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black text-[clamp(26px,4.5vw,52px)] text-gray-900 leading-[0.92] tracking-[-0.028em] uppercase">
            From Booking to{" "}
            <span className="relative inline-block text-[#0818A8]">
              Delivery.
              <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full"
                aria-hidden="true" initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.55 }} />
            </span>
          </motion.h2>
          <motion.p className="text-gray-600 text-[14px] font-light mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            Four simple steps. End-to-end managed by our team. Nothing complicated.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.num}
                className="relative border border-gray-200 bg-gray-50 p-7 hover:border-[#0818A8]/40 hover:shadow-xl hover:shadow-[#0818A8]/10 transition-all duration-300 group overflow-hidden"
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />

                <div className="flex items-center justify-between mb-6">
                  <span className="font-black text-[52px] text-[#0818A8]/8 leading-none tracking-[-0.02em]" aria-hidden="true">{step.num}</span>
                  <div className="w-11 h-11 bg-[#0818A8]/8 group-hover:bg-[#0818A8]/15 flex items-center justify-center transition-colors" aria-hidden="true">
                    <Icon size={18} className="text-[#0818A8]" />
                  </div>
                </div>

                <h3 className="text-gray-900 font-black text-[16px] tracking-[-0.01em] mb-3">{step.title}</h3>
                <p className="text-gray-600 text-[13px] font-light leading-relaxed">{step.body}</p>

                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 z-10 w-8 h-px bg-gradient-to-r from-gray-300 to-gray-200" aria-hidden="true" />
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
// CTA SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function CTASection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="relative bg-[#00061a] overflow-hidden" aria-label="Get a quote — R-Zone Cargo">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.28) 0%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/50 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }}>
            <TagPill label="Start Today" dark />
            <h2 className="font-black text-[clamp(30px,5.5vw,60px)] text-white leading-[0.9] tracking-[-0.03em] uppercase mb-5">
              Ready to Ship<br />
              <span className="text-[#1F51FF]">to Nigeria?</span>
            </h2>
            <p className="text-white/65 text-[15px] font-light leading-relaxed max-w-lg mb-8">
              Get your free quote in under 2 minutes. Our UK-based team responds the same business day — no call centres, no automated replies.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/quote"
                className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12.5px] font-black tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200 shadow-2xl shadow-[#0818A8]/40"
                aria-label="Get a free quote">
                Get a Free Quote
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a href="tel:+448007720864"
                className="inline-flex items-center gap-2.5 border border-white/22 hover:border-white/50 text-white/80 hover:text-white text-[12.5px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-200"
                aria-label="Call R-Zone: +44 800 772 0864">
                <Phone size={13} aria-hidden="true" /> +44 800 772 0864
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              {["Free Quote", "Same-Day Response", "No Hidden Fees", "IATA Certified"].map(t => (
                <span key={t} className="flex items-center gap-2 text-white/60 text-[12px] font-light">
                  <Check size={12} className="text-[#1F51FF]" aria-hidden="true" /> {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — quick links */}
          <motion.div className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            {SOLUTIONS.map((sol, i) => {
              const Icon = sol.icon;
              return (
                <motion.div key={sol.id}
                  className="group border border-white/[0.07] bg-white/[0.04] p-5 hover:border-white/[0.18] hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: 0.4 + i * 0.06 }}
                  onClick={() => window.location.href = sol.slug}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-400"
                    style={{ backgroundColor: sol.accent }} aria-hidden="true" />
                  <Icon size={16} style={{ color: sol.accent }} className="mb-3" aria-hidden="true" />
                  <p className="text-white/85 font-bold text-[13px] mb-0.5">{sol.label}</p>
                  <p className="text-white/45 text-[11px] font-light">{sol.rate}</p>
                  <ArrowRight size={12} className="text-white/30 group-hover:text-white/70 mt-3 transition-colors" aria-hidden="true" />
                </motion.div>
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
export default function SolutionsClient() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home",      "item": "https://r-zoneenterprises.com" },
              { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://r-zoneenterprises.com/solutions" },
            ],
          },
          {
            "@type": "ItemList",
            "name": "R-Zone Cargo — UK–Nigeria Shipping Solutions",
            "url": "https://r-zoneenterprises.com/solutions",
            "numberOfItems": SOLUTIONS.length,
            "itemListElement": SOLUTIONS.map((s, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "Service",
                "name": s.label,
                "description": s.desc,
                "url": `https://r-zoneenterprises.com${s.slug}`,
                "provider": { "@type": "Organization", "name": "R-Zone Enterprises" },
                "offers": { "@type": "Offer", "priceCurrency": "GBP", "description": s.rate },
              },
            })),
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How long does air freight to Nigeria take?", "acceptedAnswer": { "@type": "Answer", "text": "R-Zone air freight to Nigeria typically takes 5–10 working days from UK departure airports including LHR, LGW and MAN." } },
              { "@type": "Question", "name": "What is the cheapest way to ship to Nigeria from the UK?", "acceptedAnswer": { "@type": "Answer", "text": "Sea freight is the most cost-effective option, from £3/kg on a monthly consolidated sailing from UK ports to Lagos." } },
              { "@type": "Question", "name": "Does R-Zone offer door-to-door delivery to Nigeria?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — R-Zone's door-to-door service collects from your UK address and delivers to any address in Nigeria, with all customs handled." } },
            ],
          },
        ],
      })}} />

      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] w-full`}>
        <Hero />
        <SolutionNav />
        <main id="solutions">
          {SOLUTIONS.map((sol, i) => (
            <SolutionSection key={sol.id} sol={sol} index={i} />
          ))}
        </main>
        <TrustSection />
        <HowItWorks />
        <CTASection />
      </div>
    </>
  );
}