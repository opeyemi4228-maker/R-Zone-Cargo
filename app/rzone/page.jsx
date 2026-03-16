"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, useScroll, useTransform,
  AnimatePresence, useMotionValue, useSpring,
} from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Globe, MapPin,
  ChevronRight, Shield, TrendingUp, Users,
  Building2, Package, Home, Star, Calendar,
  Briefcase, Heart, Zap, Clock, CheckCircle,
  Phone, Mail, Instagram, ExternalLink,
  BarChart3, Layers, Target, Eye,
} from "lucide-react";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-mont",
  display: "swap",
});

// ─── Brand data ───────────────────────────────────────────────────────────────
const SUBSIDIARIES = [
  {
    id: "cargo",
    name: "R-Zone Cargo",
    category: "Freight & Logistics",
    tagline: "The UK–Nigeria cargo specialists.",
    description:
      "R-Zone Cargo is the group's flagship freight and logistics operation — connecting UK businesses and families to all 36 Nigerian states via air freight, weekly sea shipping, door-to-door delivery and specialist cargo handling since 2012. The highest-rated organically earned cargo company between the UK, Nigeria, and across Africa.",
    icon: Package,
    href: "https://r-zoneenterprises.com",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80",
    stats: [
      { val: "50K+", label: "Shipments" },
      { val: "12+",  label: "Years"     },
      { val: "107+", label: "Reviews"   },
    ],
    highlights: ["Air freight 5–10 days", "Weekly sea sailings", "All 36 Nigerian states", "Customs clearance"],
    color: "#0818A8",
    gradient: "from-[#0818A8] to-[#1F51FF]",
    live: true,
  },
  {
    id: "homes",
    name: "R-Zone Homes",
    category: "Real Estate",
    tagline: "Premium property in Nigeria's growth corridors.",
    description:
      "R-Zone Homes provides premium residential and commercial real estate services across Nigeria's fastest-growing cities. From off-plan investment to property management, we connect the diaspora with Nigeria's property market in Lagos and Abuja.",
    icon: Home,
    href: "#",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
    stats: [
      { val: "2024", label: "Founded"  },
      { val: "NG",   label: "Market"   },
      { val: "UK",   label: "Diaspora" },
    ],
    highlights: ["Off-plan properties", "Property management", "Diaspora investment", "Lagos & Abuja"],
    color: "#1a6b3c",
    gradient: "from-[#1a6b3c] to-[#2a9d5e]",
    live: false,
    badge: "Coming Soon",
  },
  {
    id: "shortlets",
    name: "R-Zone Shortlets",
    category: "Serviced Accommodation",
    tagline: "Premium short-stay apartments, Nigeria.",
    description:
      "R-Zone Shortlets operates a curated portfolio of fully-serviced short-term apartments in Lagos and Abuja — serving business travellers, the diaspora and premium leisure guests who demand quality without compromise.",
    icon: Building2,
    href: "#",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
    stats: [
      { val: "LOS", label: "Lagos" },
      { val: "ABJ", label: "Abuja" },
      { val: "24/7",label: "Support" },
    ],
    highlights: ["Fully furnished", "24/7 concierge", "Corporate rates", "Monthly stays available"],
    color: "#9c5700",
    gradient: "from-[#9c5700] to-[#d97706]",
    live: false,
    badge: "Coming Soon",
  },
];

const GROUP_STATS = [
  { val: "2012", label: "Founded",         icon: Calendar,  sub: "Over 12 years"          },
  { val: "3+",   label: "Business Lines",  icon: Layers,    sub: "Diversified portfolio"  },
  { val: "2",    label: "Countries",       icon: Globe,     sub: "UK & Nigeria"           },
  { val: "10K+", label: "Customers Served",icon: Users,     sub: "Families & businesses"  },
  { val: "£M+",  label: "Cargo Moved",     icon: BarChart3, sub: "Annually"               },
  { val: "107+", label: "5-Star Reviews",  icon: Star,      sub: "Google verified"        },
];

const VALUES = [
  {
    icon: Shield,
    title: "Integrity in Everything",
    body: "Every R-Zone brand operates with the same foundational commitment — transparent dealings, honest communication, and delivery on every promise made to every customer.",
    accent: "#0818A8",
  },
  {
    icon: Globe,
    title: "Built for the Diaspora",
    body: "R-Zone International was built by the diaspora, for the diaspora. Our businesses exist to bridge the gap between the UK and Nigeria — making commerce, property and daily life seamlessly connected.",
    accent: "#1F51FF",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Growth",
    body: "We build for decades, not quarters. Each R-Zone company is designed with sustainable growth in mind — creating lasting value for customers, partners and the communities we serve.",
    accent: "#0818A8",
  },
  {
    icon: Target,
    title: "Execution Over Talk",
    body: "The R-Zone name means something because we deliver. Across every brand, from logistics to real estate, operational excellence is non-negotiable.",
    accent: "#1F51FF",
  },
];

const TIMELINE = [
  { year: "2012", event: "R-Zone Enterprises founded in Essex, UK",              type: "founding"  },
  { year: "2014", event: "Sea freight corridor opened, weekly sailings begin",   type: "expansion" },
  { year: "2016", event: "Lagos operations hub established",                     type: "expansion" },
  { year: "2018", event: "IATA certification — air cargo capability confirmed",  type: "milestone" },
  { year: "2020", event: "Zero service interruptions throughout the pandemic",   type: "milestone" },
  { year: "2022", event: "10,000+ customers served milestone",                   type: "milestone" },
  { year: "2023", event: "R-Zone International Group formally constituted",      type: "founding"  },
  { year: "2024", event: "R-Zone Homes & Shortlets divisions launched",          type: "expansion" },
  { year: "2025", event: "New venture lines entering development phase",         type: "expansion" },
];

const TYPE_COLORS = {
  founding:  { bg: "bg-[#0818A8]", text: "text-white",     dot: "bg-[#1F51FF]" },
  expansion: { bg: "bg-white",     text: "text-[#0818A8]", dot: "bg-[#0818A8]" },
  milestone: { bg: "bg-[#f0f4ff]", text: "text-[#0437F2]", dot: "bg-[#0437F2]" },
};

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

// ─── Cursor glow ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const x  = useMotionValue(0);
  const y  = useMotionValue(0);
  const sX = useSpring(x, { stiffness: 120, damping: 28 });
  const sY = useSpring(y, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 hidden lg:block"
      style={{
        x: sX, y: sY,
        translateX: "-50%", translateY: "-50%",
        background: "radial-gradient(circle, rgba(8,24,168,0.06) 0%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}

// ─── Tag ──────────────────────────────────────────────────────────────────────
function Tag({ label, dark = true }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-5 ${
      dark ? "border-[#1F51FF]/28 bg-[#0818A8]/12" : "border-[#0818A8]/18 bg-[#0818A8]/5"
    }`}>
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]"
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      />
      <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>
        {label}
      </span>
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function Heading({ serif, sans, dark = true, id }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <h2 ref={ref} id={id} className="leading-[0.9] tracking-[-0.02em]">
      <span className={`block font-[family-name:var(--font-mont)] font-light text-[clamp(18px,3vw,32px)] mb-1 ${
        dark ? "text-white/80" : "text-gray-800"
      }`}>{serif}</span>
      <span className={`block font-[family-name:var(--font-mont)] font-black text-[clamp(30px,5.5vw,62px)] uppercase tracking-[-0.03em] ${
        dark ? "text-white" : "text-[#0b0f1a]"
      }`}>
        {sans.split(" ").map((word, i, arr) =>
          i === arr.length - 1 ? (
            <span key={i} className="relative inline-block text-[#1F51FF]">
              {word}
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full"
                aria-hidden="true"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════════════════
function GroupNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      animate={{
        backgroundColor: scrolled ? "rgba(0,4,18,0.96)" : "rgba(0,4,18,0)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
      }}
      transition={{ duration: 0.35 }}
      role="banner"
    >
      <div className={`border-b transition-all duration-300 ${scrolled ? "border-white/[0.07]" : "border-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 h-[68px] flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3 group" aria-label="R-Zone International — home">
            <div
              className="w-9 h-9 bg-gradient-to-br from-[#0818A8] to-[#1F51FF] rounded-sm flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <span className="text-white font-black text-[14px] tracking-[0.05em]">RZ</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-white font-black text-[16px] tracking-[0.06em] uppercase leading-none">R-ZONE</span>
              <span className="text-white/80 font-light text-[16px] tracking-wide uppercase leading-none">International</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7" aria-label="R-Zone International navigation">
            {[
              { label: "Our Companies",  href: "#companies" },
              { label: "About the Group",href: "#about"     },
              { label: "Values",         href: "#values"    },
              { label: "Contact",        href: "#contact"   },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-white text-[12.5px] font-medium tracking-[0.03em] transition-colors duration-200"
                aria-label={link.label}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Link
            href="https://r-zoneenterprises.com/quote"
            className="hidden sm:inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.08em] uppercase px-5 py-2.5 rounded-sm transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
            aria-label="Ship with R-Zone Cargo"
          >
            Ship with Cargo
            <ArrowRight size={10} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════
function Hero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const bgY    = useTransform(scrollY, [0, 600], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section
      className="hero-section relative min-h-[100svh] pt-[10px] md:pt-[30px] flex flex-col justify-center overflow-hidden bg-[#000410]"
      aria-labelledby="rzi-hero-heading"
    >
      {/* Parallax grid */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }} aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Atmospheric layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-15%] left-[-5%] w-[900px] h-[700px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(8,24,168,0.22) 0%, transparent 65%)" }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[600px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(31,81,255,0.12) 0%, transparent 65%)" }} />
        <div className="absolute top-[40%] left-[35%] w-[400px] h-[300px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(4,55,242,0.08) 0%, transparent 65%)" }} />
      </div>

      {/* Accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[15, 35, 65, 82].map(pos => (
          <div key={pos} className="absolute top-0 bottom-0 w-px opacity-[0.04]"
            style={{ left: `${pos}%`, background: "linear-gradient(to bottom, transparent, rgba(31,81,255,1) 40%, transparent)" }} />
        ))}
      </div>

      {/* Rotating emblem */}
      <div className="absolute top-24 right-[8%] hidden xl:block pointer-events-none" aria-hidden="true">
        <motion.div
          className="w-52 h-52 border border-white/[0.06] rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0">
            <path id="circle-text" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none" />
            <text style={{ fontSize: 10.5, fontFamily: "var(--font-mont)", fontWeight: 500, letterSpacing: "0.2em", fill: "rgba(255,255,255,0.6)" }}>
              <textPath href="#circle-text">R-ZONE INTERNATIONAL · FOUNDED 2012 · UK–NIGERIA · </textPath>
            </text>
          </svg>
          <div className="w-16 h-16 bg-gradient-to-br from-[#0818A8] to-[#1F51FF] rounded-full flex items-center justify-center">
            <span className="text-white font-black text-[16px]">RZ</span>
          </div>
        </motion.div>
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pt-[100px] pb-20 w-full">
        <motion.div style={{ opacity }}>

          {/* Group label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-[#1F51FF]/50" aria-hidden="true" />
            <span className="text-[#1F51FF] text-[10px] font-bold tracking-[0.4em] uppercase">
              R-Zone International Group
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-[#1F51FF]/50" aria-hidden="true" />
          </motion.div>

          {/* Headline */}
          <div className="mb-8">
            <motion.p
              className="font-[family-name:var(--font-mont)] font-light text-white/80 text-[clamp(22px,3.5vw,44px)] leading-none mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Building the future of
            </motion.p>

            <motion.h1
              id="rzi-hero-heading"
              className="font-[family-name:var(--font-mont)] font-black text-[clamp(48px,9vw,120px)] leading-[0.85] tracking-[-0.04em] uppercase"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white block">UK–Nigeria</span>
              <span className="relative inline-block">
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #1F51FF 0%, #0818A8 50%, #ffffff 100%)" }}
                >
                  Commerce.
                </span>
                <motion.span
                  className="absolute -bottom-3 left-0 h-1 rounded-full"
                  style={{ background: "linear-gradient(to right, #0818A8, #1F51FF)" }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: "70%" } : {}}
                  transition={{ duration: 0.7, delay: 0.9 }}
                  aria-hidden="true"
                />
              </span>
            </motion.h1>
          </div>

          <motion.p
            className="text-white/80 text-[15px] font-[family-name:var(--font-mont)] font-light leading-relaxed max-w-xl mb-10 tracking-wide"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.35 }}
          >
            R-Zone International is the parent group behind R-Zone Cargo, R-Zone Homes,
            and R-Zone Shortlets — a growing portfolio of businesses built for the
            UK–Nigeria corridor and the African diaspora economy.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-14"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <a
              href="#companies"
              className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12px] font-black tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-200 shadow-2xl shadow-[#0818A8]/35"
              aria-label="Explore our companies"
            >
              Explore Our Companies
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 text-white/80 hover:text-white text-[12px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-200"
              aria-label="About R-Zone International"
            >
              About the Group
            </a>
          </motion.div>

          {/* Companies strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <p className="text-white/80 text-[12px] font-bold tracking-[0.3em] uppercase mb-4">Our Companies</p>
            <div className="flex flex-wrap gap-3">
              {SUBSIDIARIES.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-2.5 border border-white/[0.08] bg-white/[0.04] px-4 py-2 hover:border-white/[0.18] transition-all duration-200"
                  >
                    <Icon size={13} style={{ color: s.color }} aria-hidden="true" />
                    <span className="text-white text-[12px] font-semibold">{s.name}</span>
                    {s.live && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-label="Live" />}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GROUP STATS
// ═══════════════════════════════════════════════════════════════════════════════
function GroupStats() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="bg-[#0818A8] relative overflow-hidden"
      role="region"
      aria-label="R-Zone International group statistics"
    >
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {GROUP_STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className="w-9 h-9 bg-white/20 rounded-sm flex items-center justify-center mb-3" aria-hidden="true">
                  <Icon size={15} className="text-white" />
                </div>
                <p className="text-white font-black text-[26px] leading-none tracking-[-0.025em] mb-0.5">{s.val}</p>
                <p className="text-white/80 text-[12px] font-semibold tracking-[0.08em] uppercase">{s.label}</p>
                <p className="text-white/80 text-[11px] font-light mt-0.5">{s.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPANIES
// ═══════════════════════════════════════════════════════════════════════════════
function Companies() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="companies"
      ref={ref}
      className="relative bg-[#000410] overflow-hidden scroll-mt-20"
      aria-labelledby="companies-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <Tag label="The Portfolio" dark />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <Heading serif="under one roof" sans="Our Companies." dark id="companies-heading" />
          </motion.div>
          <motion.p
            className="text-white/80 text-[14px] font-light mt-5 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Each R-Zone company is independently operated, sector-focused, and unified
            by the same group standards of quality, reliability and service excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-6">
          {SUBSIDIARIES.map((sub, i) => {
            const Icon = sub.icon;
            return (
              <motion.div
                key={sub.id}
                className="group relative border border-white/[0.07] bg-white/[0.025] overflow-hidden"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                itemScope
                itemType="https://schema.org/Organization"
              >
                {/* Top accent gradient border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${sub.gradient}`}
                  aria-hidden="true"
                />

                {/* Hero image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={sub.image}
                    alt={`${sub.name} — ${sub.category}`}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000410] via-[#000410]/50 to-transparent" aria-hidden="true" />

                  {/* Category + badge positioned over image */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center"
                        style={{ backgroundColor: `${sub.color}30`, border: `1px solid ${sub.color}40` }}
                        aria-hidden="true"
                      >
                        <Icon size={17} style={{ color: sub.color }} />
                      </div>
                      <span className="text-[9px] font-bold tracking-[0.24em] uppercase text-white/80">
                        {sub.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {sub.badge && (
                        <span
                          className="text-[8.5px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 border rounded-full"
                          style={{ borderColor: `${sub.color}50`, color: sub.color, backgroundColor: `${sub.color}18` }}
                        >
                          {sub.badge}
                        </span>
                      )}
                      {sub.live && (
                        <span className="flex items-center gap-1 text-[8.5px] font-bold tracking-[0.15em] uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                          Live
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 80% 20%, ${sub.color}10 0%, transparent 60%)` }}
                  aria-hidden="true"
                />

                {/* Large decorative number */}
                <div
                  className="absolute bottom-4 right-6 font-black text-white/[0.03] leading-none pointer-events-none select-none"
                  style={{ fontSize: "clamp(60px, 10vw, 120px)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10 p-7 md:p-8">
                  {/* Title + link */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-black text-[21px] tracking-[-0.015em]" itemProp="name">
                        {sub.name}
                      </h3>
                      <p className="font-[family-name:var(--font-mont)] text-white/80 text-[14.5px] mt-1 leading-snug">
                        {sub.tagline}
                      </p>
                    </div>
                    {sub.href !== "#" && (
                      <a
                        href={sub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 border border-white/[0.12] hover:border-white/30 hover:bg-white/[0.08] flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-4"
                        aria-label={`Visit ${sub.name} website`}
                      >
                        <ArrowUpRight size={14} className="text-white/80" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  <p
                    className="text-white/80 text-[13px] font-[family-name:var(--font-mont)] font-light leading-relaxed mb-6"
                    itemProp="description"
                  >
                    {sub.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex gap-6 mb-5 border-t border-white/[0.06] pt-5">
                    {sub.stats.map(stat => (
                      <div key={stat.label}>
                        <p className="text-white font-black text-[18px] leading-none tracking-[-0.02em]">{stat.val}</p>
                        <p className="text-white/80 text-[9.5px] font-medium tracking-[0.12em] uppercase mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="grid grid-cols-2 gap-2 mb-6" role="list">
                    {sub.highlights.map(h => (
                      <li key={h} className="flex items-center gap-2">
                        <CheckCircle size={10} style={{ color: sub.color }} aria-hidden="true" />
                        <span className="text-white/80 text-[12px] font-light">{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {sub.live ? (
                    <a
                      href={sub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex items-center gap-2 text-[11px] font-black tracking-[0.1em] uppercase transition-all duration-200"
                      style={{ color: sub.color }}
                      aria-label={`Visit ${sub.name}`}
                    >
                      Visit {sub.name}
                      <ArrowRight size={10} className="group-hover/cta:translate-x-1 transition-transform" aria-hidden="true" />
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-white/80 hover:text-white transition-colors"
                      aria-label={`Register interest in ${sub.name}`}
                    >
                      Register Interest
                      <ArrowRight size={10} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT THE GROUP
// ═══════════════════════════════════════════════════════════════════════════════
function AboutGroup() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-white overflow-hidden scroll-mt-20"
      aria-labelledby="about-group-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#0818A8]/[0.025] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

          {/* LEFT */}
          <motion.div
            className="lg:col-span-5"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp} custom={0}><Tag label="The Group Story" dark={false} /></motion.div>
            <motion.div variants={fadeUp} custom={0.05}>
              <Heading serif="who we are" sans="Built in Essex. Built for Nigeria." dark={false} id="about-group-heading" />
            </motion.div>

            <motion.div variants={fadeUp} custom={0.15} className="mt-7 space-y-4">
              <p className="text-gray-900 text-[14px] font-[family-name:var(--font-mont)] font-normal leading-relaxed">
                R-Zone International began as a single idea in Essex, UK in 2012: that the
                Nigerian diaspora deserved world-class services — not just adequate ones.
                Starting with cargo logistics, we proved that a company built by and for the
                community could outperform established competitors on every metric that matters.
              </p>
              <p className="text-gray-800 text-[14px] font-[family-name:var(--font-mont)] font-normal leading-relaxed">
                A decade on, that conviction has grown into a multi-company group. R-Zone
                International now operates across freight, real estate, and short-stay
                accommodation — with new verticals in active development. Each business
                shares the same DNA: deep understanding of the UK–Nigeria corridor,
                operational excellence, and an obsession with customer experience.
              </p>
              <p className="text-gray-800 text-[14px] font-[family-name:var(--font-mont)] font-normal leading-relaxed">
                Our ambition is to become the most trusted commercial infrastructure company
                connecting Britain and Nigeria — the group that ambitious Nigerians in the UK
                and Nigeria turn to, across every aspect of their lives and businesses.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.3} className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://r-zoneenterprises.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.09em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
                aria-label="Learn more about R-Zone Cargo"
              >
                R-Zone Cargo Story
                <ArrowRight size={11} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-[#0818A8]/25 text-[#0818A8] hover:bg-[#0818A8] hover:text-white text-[11.5px] font-bold tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200"
                aria-label="Contact R-Zone International"
              >
                Contact the Group
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.3 }}
          >
            {/* Group structure card */}
            <div className="bg-[#000410] p-8 md:p-10 relative overflow-hidden mb-6">
              <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] absolute top-0 left-0 right-0" aria-hidden="true" />
              <div
                className="absolute inset-0 opacity-[0.025]"
                aria-hidden="true"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative z-10">
                <p className="text-[9.5px] font-bold tracking-[0.3em] uppercase text-white/80 mb-7">
                  Group Structure
                </p>

                {/* Parent */}
                <div className="flex justify-center mb-4">
                  <div className="border border-[#1F51FF]/35 bg-[#0818A8]/20 px-6 py-3 text-center">
                    <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#1F51FF] mb-0.5">Parent Company</p>
                    <p className="text-white font-black text-[15px] tracking-[-0.01em]">R-Zone International</p>
                  </div>
                </div>

                <div className="flex justify-center mb-4" aria-hidden="true">
                  <div className="w-px h-6 bg-gradient-to-b from-[#1F51FF]/40 to-[#1F51FF]/10" />
                </div>
                <div className="flex justify-center mb-4" aria-hidden="true">
                  <div className="h-px w-[80%] bg-gradient-to-r from-transparent via-[#1F51FF]/30 to-transparent" />
                </div>

                {/* Children — 3 companies only */}
                <div className="grid grid-cols-3 gap-3">
                  {SUBSIDIARIES.map(sub => {
                    const Icon = sub.icon;
                    return (
                      <div key={sub.id} className="flex flex-col items-center">
                        <div className="w-px h-4 bg-[#1F51FF]/20 mb-2" aria-hidden="true" />
                        <div className="border border-white/[0.08] bg-white/[0.04] p-3 text-center w-full">
                          <Icon size={13} style={{ color: sub.color }} className="mx-auto mb-1.5" aria-hidden="true" />
                          <p className="text-white/80 text-[10.5px] font-bold leading-tight">
                            {sub.name.replace("R-Zone ", "")}
                          </p>
                          <p className="text-white/80 text-[9px] font-light mt-0.5">
                            {sub.live ? "Live" : "Upcoming"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { flag: "🇬🇧", country: "United Kingdom", role: "Group HQ",   address: "Upminster, Essex UK", accent: "#0818A8" },
                { flag: "🇳🇬", country: "Nigeria",        role: "Operations", address: "Lagos & Abuja",        accent: "#1F51FF" },
              ].map(loc => (
                <div
                  key={loc.country}
                  className="border border-gray-200 bg-gray-50 p-5 hover:border-[#0818A8]/30 transition-colors duration-200"
                >
                  <p className="text-3xl mb-2" aria-hidden="true">{loc.flag}</p>
                  <p className="text-[#0b0f1a] font-black text-[15px]">{loc.country}</p>
                  <p className="text-[10.5px] font-bold tracking-[0.18em] uppercase mt-0.5" style={{ color: loc.accent }}>
                    {loc.role}
                  </p>
                  <p className="text-gray-800 text-[12px] font-light mt-1.5 flex items-center gap-1.5">
                    <MapPin size={10} aria-hidden="true" />{loc.address}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════════════════════════════════════════
function GroupTimeline() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#000410] overflow-hidden"
      aria-labelledby="timeline-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#0818A8]/20 to-transparent pointer-events-none hidden lg:block"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <Tag label="Group History" dark />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <Heading serif="the journey" sans="From One to Many." dark id="timeline-heading" />
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#0818A8]/30 to-transparent lg:hidden" aria-hidden="true" />

          <div className="space-y-0">
            {TIMELINE.map((item, i) => {
              const isRight    = i % 2 === 1;
              const typeStyle  = TYPE_COLORS[item.type];
              return (
                <motion.div
                  key={item.year}
                  className="relative flex items-start gap-6 pl-12 lg:pl-0"
                  initial={{ opacity: 0, x: isRight ? 20 : -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                >
                  {/* Mobile dot */}
                  <div
                    className="absolute left-0 top-4 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#0818A8]/40 bg-[#0818A8]/20 lg:hidden"
                    aria-hidden="true"
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${typeStyle.dot}`} />
                  </div>

                  {/* Desktop layout */}
                  <div className={`hidden lg:flex w-full items-center gap-0 ${isRight ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-[calc(50%-28px)] ${isRight ? "pl-8" : "pr-8 text-right"}`}>
                      <div className={`inline-block border px-5 py-4 border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-200 group ${isRight ? "text-left" : "text-right"}`}>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase mb-2 ${typeStyle.bg} ${typeStyle.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${typeStyle.dot}`} aria-hidden="true" />
                          {item.type}
                        </span>
                        <p className="text-[#1F51FF] font-black text-[20px] leading-none tracking-[-0.02em] mb-1">{item.year}</p>
                        <p className="text-white/80 text-[13px] font-medium leading-snug">{item.event}</p>
                      </div>
                    </div>

                    {/* Centre dot */}
                    <div className="w-14 flex-shrink-0 flex justify-center" aria-hidden="true">
                      <div className="w-5 h-5 rounded-full border-2 border-[#0818A8] bg-[#000410] flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${typeStyle.dot}`} />
                      </div>
                    </div>
                    <div className="w-[calc(50%-28px)]" />
                  </div>

                  {/* Mobile content */}
                  <div className="lg:hidden pb-6">
                    <p className="text-[#1F51FF] font-black text-[18px] leading-none tracking-[-0.01em] mb-1">{item.year}</p>
                    <p className="text-white/80 text-[13px] font-medium leading-snug">{item.event}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VALUES
// ═══════════════════════════════════════════════════════════════════════════════
function GroupValues() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="values"
      ref={ref}
      className="relative bg-white overflow-hidden scroll-mt-20"
      aria-labelledby="values-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left — sticky heading */}
          <motion.div
            className="lg:sticky lg:top-28"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} custom={0}><Tag label="What Drives Us" dark={false} /></motion.div>
            <motion.div variants={fadeUp} custom={0.05}>
              <Heading serif="across every brand" sans="Our Group Values." dark={false} id="values-heading" />
            </motion.div>
            <motion.p
              variants={fadeUp}
              custom={0.15}
              className="text-gray-800 text-[14px] font-[family-name:var(--font-mont)] font-normal leading-relaxed mt-5 max-w-sm"
            >
              These principles aren&apos;t aspirations — they&apos;re operational standards enforced
              across every R-Zone company, every team, every interaction.
            </motion.p>

            <motion.blockquote variants={fadeUp} custom={0.3} className="mt-10 border-l-4 border-[#0818A8] pl-6">
              <p className="font-[family-name:var(--font-mont)] text-[#0b0f1a] text-[20px] leading-snug mb-2">
                &ldquo;We exist to make the UK–Nigeria opportunity real — not just possible.&rdquo;
              </p>
              <footer className="text-gray-800 text-[11.5px] font-normal">
                — R-Zone International, Mandate
              </footer>
            </motion.blockquote>
          </motion.div>

          {/* Right — values */}
          <div className="space-y-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  className="group border border-gray-200 bg-gray-50/80 p-7 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/8 transition-all duration-300 relative overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div
                    className="absolute top-0 left-0 w-0 h-[3px] group-hover:w-full transition-all duration-500"
                    style={{ backgroundColor: v.accent }}
                    aria-hidden="true"
                  />
                  <div className="flex items-start gap-5">
                    <div
                      className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${v.accent}10` }}
                      aria-hidden="true"
                    >
                      <Icon size={18} style={{ color: v.accent }} />
                    </div>
                    <div>
                      <h3 className="text-[#0b0f1a] font-black text-[16px] tracking-[-0.01em] mb-2">{v.title}</h3>
                      <p className="text-gray-800 text-[13px] font-[family-name:var(--font-mont)] font-normal leading-relaxed">
                        {v.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════════════════════════
function GroupContact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-[#000410] overflow-hidden scroll-mt-20"
      aria-labelledby="contact-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.22) 0%, transparent 70%)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} custom={0}><Tag label="Get in Touch" dark /></motion.div>
            <motion.div variants={fadeUp} custom={0.05}>
              <Heading serif="work with us" sans="Contact the Group." dark id="contact-heading" />
            </motion.div>
            <motion.p
              variants={fadeUp}
              custom={0.15}
              className="text-white/80 text-[14px] font-[family-name:var(--font-mont)] font-light leading-relaxed mt-5 mb-8 max-w-md"
            >
              Whether you&apos;re a customer, investor, business partner, or journalist —
              we&apos;d love to hear from you. Reach out via R-Zone Cargo for logistics
              enquiries or contact the group directly below.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.25} className="space-y-4 mb-8">
              {[
                { icon: Phone,     label: "Phone",     val: "+44 (0) 800 772 0864",       href: "tel:+448007720864",                     desc: "R-Zone Cargo / Group enquiries"   },
                { icon: Mail,      label: "Email",     val: "info@r-zoneenterprises.com", href: "mailto:info@r-zoneenterprises.com",     desc: "Responses within 1 business day"  },
                { icon: MapPin,    label: "HQ",        val: "Upminster, Essex UK",        href: "#",                                     desc: "Unit 10 Moorhen Yard, RM14 3TS"   },
                { icon: Instagram, label: "Instagram", val: "@rzoneenterprises",          href: "https://instagram.com/rzoneenterprises",desc: "Follow for group updates"          },
              ].map(c => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 group"
                    aria-label={`${c.label}: ${c.val}`}
                  >
                    <div
                      className="w-9 h-9 bg-[#0818A8]/20 group-hover:bg-[#0818A8]/40 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors"
                      aria-hidden="true"
                    >
                      <Icon size={14} className="text-[#1F51FF]" />
                    </div>
                    <div>
                      <p className="text-white/80 text-[9.5px] font-bold tracking-[0.2em] uppercase">{c.label}</p>
                      <p className="text-white/80 group-hover:text-white text-[13.5px] font-semibold transition-colors leading-tight">{c.val}</p>
                      <p className="text-white/80 text-[11px] font-light">{c.desc}</p>
                    </div>
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right — brand links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-[9.5px] font-bold tracking-[0.3em] uppercase text-white/80 mb-5">
              Visit a Brand
            </p>
            <div className="grid grid-cols-1 gap-3 mb-7">
              {SUBSIDIARIES.map(sub => {
                const Icon = sub.icon;
                return (
                  <div
                    key={sub.id}
                    className="group flex items-center justify-between border border-white/[0.07] bg-white/[0.03] p-5 hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-200 relative overflow-hidden"
                  >
                    <div
                      className="h-[2px] absolute top-0 left-0 w-0 group-hover:w-full transition-all duration-500"
                      style={{ background: `linear-gradient(to right, ${sub.color}, ${sub.color}88)` }}
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-4">
                      <div
                        className="w-9 h-9 rounded-sm flex items-center justify-center"
                        style={{ backgroundColor: `${sub.color}20` }}
                        aria-hidden="true"
                      >
                        <Icon size={14} style={{ color: sub.color }} />
                      </div>
                      <div>
                        <p className="text-white/80 font-bold text-[14px]">{sub.name}</p>
                        <p className="text-white/80 text-[11px] font-light">{sub.category}</p>
                      </div>
                    </div>
                    {sub.live ? (
                      <a
                        href={sub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10.5px] font-bold transition-colors"
                        style={{ color: sub.color }}
                        aria-label={`Visit ${sub.name}`}
                      >
                        Visit <ExternalLink size={9} aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="text-white/80 text-[10px] font-bold tracking-[0.12em] uppercase">
                        {sub.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Big CTA */}
            <div className="border border-[#0818A8]/25 bg-[#0818A8]/10 p-6">
              <p className="text-[9.5px] font-bold tracking-[0.28em] uppercase text-[#1F51FF] mb-2">
                Ready to Ship Today?
              </p>
              <p className="text-white/80 text-[13px] font-light leading-relaxed mb-5">
                R-Zone Cargo is live now — get a free UK–Nigeria shipping quote in under 2 minutes.
              </p>
              <a
                href="https://r-zoneenterprises.com/quote"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.09em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/30 w-full justify-center"
                aria-label="Get a free shipping quote from R-Zone Cargo"
              >
                Get a Free Quote
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════════
function GroupFooter() {
  return (
    <footer className="bg-[#00020e] border-t border-white/[0.06]" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 bg-gradient-to-br from-[#0818A8] to-[#1F51FF] rounded-sm flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="text-white font-black text-[13px]">RZ</span>
              </div>
              <div>
                <span className="text-white font-black text-[15px] tracking-[0.06em] uppercase">R-ZONE </span>
                <span className="text-white/80 font-light text-[15px] uppercase">International</span>
              </div>
            </div>
            <p className="text-white/80 text-[12.5px] font-light leading-relaxed max-w-xs">
              A diversified UK–Nigeria enterprise group. Freight, real estate, and accommodation.
              Founded 2012. Upminster, Essex, United Kingdom.
            </p>
          </div>

          {/* Companies */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/80 mb-4">Our Companies</p>
            <div className="space-y-2">
              {SUBSIDIARIES.map(s => (
                <div key={s.id}>
                  {s.live ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white text-[12.5px] font-light transition-colors flex items-center gap-1.5"
                      aria-label={s.name}
                    >
                      {s.name} <ExternalLink size={9} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-white/80 text-[12.5px] font-light">
                      {s.name}{" "}
                      <span className="text-[10px] ml-1 opacity-70">({s.badge})</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/80 mb-4">Contact</p>
            <div className="space-y-2.5">
              <a
                href="tel:+448007720864"
                className="text-white/80 hover:text-white text-[12.5px] font-light transition-colors flex items-center gap-2"
                aria-label="Call: +44 800 772 0864"
              >
                <Phone size={10} className="text-white/80 flex-shrink-0" aria-hidden="true" />
                +44 (0) 800 772 0864
              </a>
              <a
                href="mailto:info@r-zoneenterprises.com"
                className="text-white/80 hover:text-white text-[12.5px] font-light transition-colors flex items-center gap-2 break-all"
                aria-label="Email: info@r-zoneenterprises.com"
              >
                <Mail size={10} className="text-white/80 flex-shrink-0" aria-hidden="true" />
                info@r-zoneenterprises.com
              </a>
              <a
                href="https://instagram.com/rzoneenterprises"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white text-[12.5px] font-light transition-colors flex items-center gap-2"
                aria-label="Instagram: @rzoneenterprises"
              >
                <Instagram size={10} className="text-white/80 flex-shrink-0" aria-hidden="true" />
                @rzoneenterprises
              </a>
              <p className="text-white/80 text-[12px] font-light flex items-center gap-2">
                <MapPin size={10} aria-hidden="true" />
                Upminster, Essex UK · Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/80 text-[11px] font-light">
            © {new Date().getFullYear()} R-Zone International. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-white/80 hover:text-white text-[11px] font-light transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/80 hover:text-white text-[11px] font-light transition-colors">
              Terms
            </Link>
            <Link href="https://r-zoneenterprises.com" className="text-white/80 hover:text-white text-[11px] font-light transition-colors">
              R-Zone Cargo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCHEMA
// ═══════════════════════════════════════════════════════════════════════════════
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://r-zoneinternational.com/#org",
      "name": "R-Zone International",
      "alternateName": "R-Zone Group",
      "url": "https://r-zoneinternational.com",
      "description": "R-Zone International is a diversified UK–Nigeria enterprise group. Parent company of R-Zone Cargo (logistics), R-Zone Homes (real estate), and R-Zone Shortlets (serviced accommodation).",
      "foundingDate": "2012",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Unit 10 Moorhen Yard, Elms Lane, Bulphan",
        "addressLocality": "Upminster",
        "addressRegion": "Essex",
        "postalCode": "RM14 3TS",
        "addressCountry": "GB",
      },
      "telephone": "+448007720864",
      "email": "info@r-zoneenterprises.com",
      "sameAs": [
        "https://www.instagram.com/rzoneenterprises",
        "https://www.facebook.com/share/1Gfw2SvFgY/?mibextid=wwXIfr",
        "https://r-zoneenterprises.com",
      ],
      "areaServed": [
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Nigeria" },
      ],
      "subOrganization": [
        { "@type": "Organization", "name": "R-Zone Cargo",     "url": "https://r-zoneenterprises.com", "description": "UK–Nigeria freight and logistics — weekly air & sea departures" },
        { "@type": "Organization", "name": "R-Zone Homes",     "description": "Nigerian real estate services for diaspora — Lagos & Abuja" },
        { "@type": "Organization", "name": "R-Zone Shortlets", "description": "Premium serviced apartments in Lagos and Abuja" },
      ],
    },
    {
      "@type": "WebSite",
      "url": "https://r-zoneinternational.com",
      "name": "R-Zone International",
      "publisher": { "@id": "https://r-zoneinternational.com/#org" },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "R-Zone International", "item": "https://r-zoneinternational.com" },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function RZoneInternationalClient() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className={`${montserrat.variable} font-[family-name:var(--font-mont)] w-full`}>
        <CursorGlow />

        <main>
          <Hero />
          <GroupStats />
          <Companies />
          <AboutGroup />
          <GroupTimeline />
          <GroupValues />
          <GroupContact />
        </main>
      </div>
    </>
  );
}