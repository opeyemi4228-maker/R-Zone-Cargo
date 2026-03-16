"use client";

import { Montserrat, Outfit } from "next/font/google";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, MapPin, Phone, Mail, Globe,
  ChevronRight, Shield, Award, Users, Package,
  Clock, Star, TrendingUp, Heart, Zap,
  CheckCircle, Quote, Plane, Ship, Truck,
  Building2, Target, Eye, Handshake,
} from "lucide-react";

// ─── Fonts ────────────────────────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "2012",    suffix: "",  label: "Year Founded",          icon: Clock,     desc: "Over 12 years in operation" },
  { value: "50",     suffix: "K+", label: "Shipments Delivered",   icon: Package,   desc: "Safely moved, on time" },
  { value: "36",     suffix: "",   label: "Nigerian States Served", icon: MapPin,    desc: "Complete national coverage" },
  { value: "107",    suffix: "+",  label: "Five-Star Reviews",      icon: Star,      desc: "Google verified reviews" },
  { value: "99",     suffix: "%",  label: "Delivery Success Rate",  icon: Shield,    desc: "Industry-leading reliability" },
  { value: "6",      suffix: "",   label: "Continents Reached",     icon: Globe,     desc: "Global reach, local expertise" },
];

const TIMELINE = [
  {
    year: "2012",
    title: "R-Zone is Born",
    body: "Founded in Essex, UK, R-Zone Enterprises began as a small parcel forwarding service connecting Nigerian families in the UK with home. A single van, a warehouse unit, and an unwavering commitment to reliability.",
    highlight: "Company founded in Essex, UK",
  },
  {
    year: "2014",
    title: "Sea Freight Launched",
    body: "Responding to customer demand for more affordable bulk shipping options, R-Zone launched its monthly sea freight service — opening the UK–Nigeria corridor to businesses and individuals with larger consignments.",
    highlight: "Monthly sea container service begins",
  },
  {
    year: "2016",
    title: "Lagos Hub Opens",
    body: "We established our Nigeria operations hub in Lagos, giving us direct oversight of last-mile delivery, port clearance, and customer service on the ground. Both ends of the journey, managed by our own team.",
    highlight: "Nigeria operations hub — Lagos",
  },
  {
    year: "2018",
    title: "IATA Certification",
    body: "R-Zone achieved IATA certification, validating our air freight capabilities against international aviation standards. This milestone opened access to a broader network of airline partners and specialist cargo routes.",
    highlight: "IATA certified air freight operation",
  },
  {
    year: "2020",
    title: "Through the Pandemic",
    body: "While the world stood still, supply chains broke down everywhere — except ours. R-Zone maintained continuous UK–Nigeria operations throughout 2020, keeping families connected and businesses supplied.",
    highlight: "Zero service interruptions during COVID-19",
  },
  {
    year: "2022",
    title: "10 Years. 10,000+ Customers.",
    body: "A decade of delivering. We celebrated our 10th anniversary having served over 10,000 unique customers — families, SMEs, importers and exporters who made R-Zone their logistics partner of choice.",
    highlight: "10,000 customers milestone reached",
  },
  {
    year: "2024",
    title: "Digital Transformation",
    body: "We launched real-time shipment tracking, an online quote system, and a fully digital customer portal — making R-Zone the most tech-forward UK–Nigeria cargo operator in the market.",
    highlight: "Real-time tracking & digital portal live",
  },
];

const VALUES = [
  {
    icon: Shield,
    title: "Reliability",
    body: "Every commitment we make is a promise we keep. Our 99% delivery success rate isn't a marketing claim — it's the result of disciplined operations and a culture that treats every shipment as personal.",
    accent: "#0818A8",
  },
  {
    icon: Eye,
    title: "Transparency",
    body: "No hidden fees. No vague timelines. No runaround. We tell you exactly what shipping costs, exactly when it departs, and exactly where it is — at every stage of the journey.",
    accent: "#1F51FF",
  },
  {
    icon: Heart,
    title: "Care",
    body: "Most of our shipments contain items of deep personal significance gifts for parents, supplies for businesses built from scratch. We understand that and handle everything accordingly.",
    accent: "#0437F2",
  },
  {
    icon: Zap,
    title: "Speed",
    body: "We've engineered our processes to eliminate delays at every point. From collection to customs to delivery, R-Zone operates with urgency — because your cargo shouldn't wait.",
    accent: "#0818A8",
  },
  {
    icon: Handshake,
    title: "Partnership",
    body: "We don't want one-off customers — we want long-term relationships. Our returning customer rate speaks to something deeper: we become the logistics partner our clients rely on, year after year.",
    accent: "#1F51FF",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    body: "The freight industry never stands still, and neither do we. Every year we invest in new routes, new technology, and new capabilities to serve our customers better than the year before.",
    accent: "#0437F2",
  },
];

const TEAM = [
  {
    name: "Operations Director",
    role: "UK Operations",
    tenure: "Since 2012",
    detail: "Oversees all UK-side logistics, customer service, and warehouse operations at our Essex facility.",
    initial: "O",
  },
  {
    name: "Nigeria Country Manager",
    role: "Nigeria Hub — Lagos",
    tenure: "Since 2016",
    detail: "Leads our Lagos operations team, port clearance specialists, and last-mile delivery network.",
    initial: "N",
  },
  {
    name: "Head of Air Freight",
    role: "Air Cargo Division",
    tenure: "Since 2018",
    detail: "Manages IATA-certified air freight operations and airline partner relationships.",
    initial: "A",
  },
  {
    name: "Customer Relations Lead",
    role: "Client Services",
    tenure: "Since 2019",
    detail: "Dedicated to making every customer interaction fast, helpful, and genuinely personal.",
    initial: "C",
  },
];

const TESTIMONIALS = [
  {
    text: "I've been shipping with R-Zone for 6 years and they've never let me down. My goods always arrive on time and in perfect condition. Genuinely the best cargo company I've used.",
    author: "Adaeze O.",
    location: "London → Lagos",
    stars: 5,
  },
  {
    text: "Professional, transparent with pricing, and actually pick up the phone when you call. R-Zone has completely changed how our business manages UK–Nigeria supply chain.",
    author: "Emmanuel K.",
    location: "Birmingham → Abuja",
    stars: 5,
  },
  {
    text: "Sent Christmas gifts to my family in Enugu — they arrived three days early. The tracking was accurate, the communication was excellent. Will not use anyone else.",
    author: "Chisom A.",
    location: "Manchester → Enugu",
    stars: 5,
  },
];

const OFFICES = [
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    role: "Headquarters & Warehouse",
    address: "Unit 10 Moorhen Yard, Elms Lane, Essex RM14 3TS",
    phone: "+44 800 772 0864",
    email: "info@r-zoneenterprises.com",
    hours: "Mon–Fri 9am–6pm · Sat 10am–2pm",
    accent: "#0818A8",
  },
  {
    country: "Nigeria",
    flag: "🇳🇬",
    role: "Operations Hub",
    address: "2 Esan Olusegun Close, Igando, Lagos State",
    phone: "+234 (0) 800 RZONE",
    email: "nigeria@r-zoneenterprises.com",
    hours: "Mon–Fri 8am–5pm WAT",
    accent: "#1F51FF",
  },
];

const CERTIFICATIONS = [
  { label: "IATA Certified", icon: Award,    desc: "International air cargo standards" },
  { label: "NCS Compliant",  icon: Shield,   desc: "Nigeria Customs Service registered" },
  { label: "Fully Insured",  icon: CheckCircle, desc: "Comprehensive cargo cover" },
  { label: "HMRC Registered", icon: Building2, desc: "UK customs authorised agent" },
];

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (d = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: d },
  }),
};

// ─── Section wrapper ─────────────────────────────────────────────────────────
function Section({ children, className = "", id, label }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${className}`}
      aria-label={label}
    >
      {children}
    </section>
  );
}

// ─── Tag pill ─────────────────────────────────────────────────────────────────
function TagPill({ label, dark = true }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-6 ${
      dark
        ? "border-[#1F51FF]/30 bg-[#0818A8]/14"
        : "border-[#0818A8]/20 bg-[#0818A8]/6"
    }`}>
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-[#1F51FF] flex-shrink-0"
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        aria-hidden="true"
      />
      <span className={`text-[10px] font-bold tracking-[0.28em] uppercase ${
        dark ? "text-[#1F51FF]" : "text-[#0818A8]"
      }`}>
        {label}
      </span>
    </div>
  );
}

// ─── Section headline ─────────────────────────────────────────────────────────
function SectionHeadline({ line1, accent, dark = true, id }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <h2
      id={id}
      ref={ref}
      className={`font-black text-[clamp(26px,4.5vw,52px)] leading-[0.92] tracking-[-0.028em] uppercase ${
        dark ? "text-white" : "text-[#0b0f1a]"
      }`}
    >
      {line1}{" "}
      <span className="relative inline-block" style={{ color: "#1F51FF" }}>
        {accent}
        <motion.span
          className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#1F51FF]"
          aria-hidden="true"
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : {}}
          transition={{ duration: 0.55, delay: 0.55 }}
        />
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════
function Hero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <Section
      className="bg-[#00061a] min-h-[80vh] flex flex-col justify-end hero-section"
      label="About R-Zone Enterprises hero"
    >
      {/* Parallax grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </motion.div>

      {/* Atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[500px] bg-[#0818A8]/18 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[-5%] w-[500px] h-[400px] bg-[#1F51FF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[300px] bg-[#0437F2]/12 rounded-full blur-[100px]" />
      </div>

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-0 w-px h-full opacity-[0.08] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1F51FF 40%, transparent)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 w-full pt-[120px] pb-16 md:pb-20">

        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-10 mt-[-10]"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="text-white/40 text-[11.5px] font-medium hover:text-white transition-colors">Home</Link>
          <ChevronRight size={11} className="text-white/40" aria-hidden="true" />
          <span className="text-white/55 text-[11.5px] font-medium" aria-current="page">About Us</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">

          {/* LEFT — Main content */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp} custom={0}>
                <TagPill label="Our Story Since 2012" dark />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={0.1}
                className="text-white font-black text-[clamp(36px,7vw,84px)] leading-[0.88] tracking-[-0.035em] uppercase mb-7"
              >
                Built on{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#1F51FF]">Trust.</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[4px] rounded-full bg-[#1F51FF]"
                    aria-hidden="true"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  />
                </span>
                <br />
                Driven by{" "}
                <span className="text-white/40">Purpose.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="text-white/52 text-[15px] font-light leading-relaxed tracking-wide max-w-xl mb-10"
              >
                R-Zone Enterprises was founded in Essex in 2012 with a simple mission: to give
                Nigerian families and businesses in the UK a cargo service they could genuinely
                rely on. More than 50,000 shipments later, that mission hasn't changed.
              </motion.p>

              <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12px] font-black tracking-[0.1em] uppercase px-7 py-3.5 rounded-sm transition-all duration-200 shadow-lg shadow-[#0818A8]/30"
                  aria-label="Get a shipping quote"
                >
                  Get a Quote
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 border border-white/22 hover:border-white/45 bg-white/[0.05] hover:bg-white/10 text-white text-[12px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-sm transition-all duration-200"
                  aria-label="Contact R-Zone Enterprises"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — Quick facts card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="border border-white/10 bg-white/[0.04] backdrop-blur-sm p-7 space-y-5">
              <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] -mx-7 -mt-7 mb-7" aria-hidden="true" />

              <p className="text-[9.5px] font-bold tracking-[0.3em] uppercase text-white/40 mb-4">Quick Facts</p>

              {[
                { icon: MapPin,    label: "Headquartered in",   val: "Essex, UK" },
                { icon: Globe,     label: "Nigeria hub",         val: "Igando, Lagos" },
                { icon: Clock,     label: "Operating since",     val: "2012 — 12+ years" },
                { icon: Package,   label: "Shipments delivered", val: "50,000+" },
                { icon: Users,     label: "Customers served",    val: "10,000+" },
                { icon: Star,      label: "Google reviews",      val: "107 × 5-star" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-center justify-between border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2.5">
                    <Icon size={12} className="text-[#1F51FF] flex-shrink-0" aria-hidden="true" />
                    <span className="text-white/42 text-[12px] font-light">{label}</span>
                  </div>
                  <span className="text-white text-[12px] font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#00061a] to-transparent pointer-events-none" aria-hidden="true" />
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATS BAND
// ═══════════════════════════════════════════════════════════════════════════════
function StatsBand() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="bg-[#0818A8] relative overflow-hidden"
      aria-label="R-Zone key statistics"
      role="region"
    >
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <div className="w-9 h-9 bg-white/12 rounded-sm flex items-center justify-center mb-3" aria-hidden="true">
                  <Icon size={15} className="text-white" />
                </div>
                <p className="text-white font-black text-[28px] leading-none tracking-[-0.025em] mb-1">
                  {s.value}<span className="text-white/70 text-[20px]">{s.suffix}</span>
                </p>
                <p className="text-white/62 text-[10.5px] font-semibold tracking-[0.08em] uppercase mb-1">{s.label}</p>
                <p className="text-white/40 text-[10px] font-light leading-snug">{s.desc}</p>
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
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-white" label="Who we are" id="who-we-are">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <TagPill label="Who We Are" dark={false} />
            </motion.div>
            <motion.div variants={fadeUp} custom={0.05}>
              <SectionHeadline line1="The Cargo Company" accent="Nigeria Trusts." dark={false} id="who-we-are-heading" />
            </motion.div>

            <motion.div variants={fadeUp} custom={0.2} className="mt-6 space-y-4">
              <p className="text-gray-600 text-[14px] font-light leading-relaxed">
                R-Zone Enterprises is a specialist UK–Nigeria cargo and freight company, based in
                Essex and operating since 2012. We were founded to solve a real problem: the UK's
                Nigerian community deserved a cargo service that was fast, transparent, and
                genuinely reliable — not one that kept them guessing.
              </p>
              <p className="text-gray-600 text-[14px] font-light leading-relaxed">
                Today we offer the full spectrum of logistics solutions — air freight, sea shipping,
                door-to-door cargo, importation, customs clearance, warehousing and specialist cargo
                handling — all under one roof, all managed by our own dedicated teams in both
                countries.
              </p>
              <p className="text-gray-600 text-[14px] font-light leading-relaxed">
                We serve families sending goods home. We serve businesses managing cross-border supply
                chains. We serve entrepreneurs importing African goods into the UK market. Whatever
                the shipment, whoever the customer — R-Zone delivers.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.35} className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Plane,  label: "Air Freight",    sub: "5–10 day express" },
                { icon: Ship,   label: "Sea Freight",    sub: "Monthly sailings" },
                { icon: Truck,  label: "Door to Door",   sub: "UK-wide collection" },
                { icon: Globe,  label: "Both Directions",sub: "UK ↔ Nigeria" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 border border-gray-100 bg-gray-50 p-3.5">
                  <div className="w-9 h-9 bg-[#0818A8]/8 rounded-sm flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Icon size={15} className="text-[#0818A8]" />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-bold text-gray-800">{label}</p>
                    <p className="text-[11px] text-gray-400 font-light">{sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Visual card stack */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.3 }}
          >
            {/* Main card */}
            <div className="bg-[#00061a] p-10 relative overflow-hidden">
              <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] absolute top-0 left-0 right-0" aria-hidden="true" />
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative z-10">
                <p className="text-[9.5px] font-bold tracking-[0.3em] uppercase text-white/40 mb-6">Our Route</p>
                <div className="flex items-center gap-5 mb-8">
                  <div className="text-center">
                    <p className="text-3xl mb-1">🇬🇧</p>
                    <p className="text-white font-bold text-[12px] tracking-wide">UNITED KINGDOM</p>
                    <p className="text-white/40 text-[10px] font-light">Essex · London · UK-Wide</p>
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-px bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full bg-[#1F51FF]"
                        animate={{ x: [-20, 20, -20] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-[#1F51FF] text-[9px] font-bold tracking-[0.2em] uppercase">Air · Sea · Road</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl mb-1">🇳🇬</p>
                    <p className="text-white font-bold text-[12px] tracking-wide">NIGERIA</p>
                    <p className="text-white/40 text-[10px] font-light">All 36 States</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: "5–10",   unit: "days",  label: "Air transit" },
                    { val: "4–6",    unit: "weeks", label: "Sea transit" },
                    { val: "24/7",   unit: "",      label: "Tracking" },
                  ].map(({ val, unit, label }) => (
                    <div key={label} className="bg-white/[0.05] border border-white/[0.08] p-3 text-center">
                      <p className="text-white font-black text-[18px] leading-none">
                        {val}<span className="text-[11px] font-light text-white/50 ml-0.5">{unit}</span>
                      </p>
                      <p className="text-white/40 text-[9.5px] font-medium tracking-[0.1em] uppercase mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-5 -right-4 bg-[#0818A8] px-5 py-3 shadow-xl shadow-[#0818A8]/30"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <p className="text-white font-black text-[20px] leading-none">107+</p>
              <p className="text-white/62 text-[9.5px] font-semibold tracking-[0.15em] uppercase">5-Star Reviews</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MISSION, VISION, PROMISE
// ═══════════════════════════════════════════════════════════════════════════════
function MissionVision() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const cards = [
    {
      icon: Target,
      label: "Our Mission",
      title: "Deliver without compromise.",
      body: "To provide fast, transparent, and reliable UK–Nigeria cargo services that businesses and families can depend on — every shipment, every time, without exception.",
      accent: "#0818A8",
    },
    {
      icon: Eye,
      label: "Our Vision",
      title: "The definitive UK–Nigeria logistics partner.",
      body: "To become the most trusted name in UK–Nigeria freight — recognised for operational excellence, technological innovation, and a customer-first culture that sets the industry standard.",
      accent: "#1F51FF",
    },
    {
      icon: Handshake,
      label: "Our Promise",
      title: "We treat your cargo like our own.",
      body: "Every box, every pallet, every shipment that passes through R-Zone is handled with the same care we'd give our own belongings. Your trust is not taken lightly.",
      accent: "#0437F2",
    },
  ];

  return (
    <Section className="bg-[#00061a]" label="Mission, Vision and Promise" id="mission">
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="What Drives Us" dark />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionHeadline line1="Mission · Vision ·" accent="Promise." dark id="mvp-heading" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                className="relative border border-white/[0.08] bg-white/[0.03] p-8 group hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.12 }}
              >
                <div className="h-[2px] absolute top-0 left-0 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(to right, ${card.accent}, #1F51FF)` }}
                  aria-hidden="true"
                />
                <div
                  className="w-11 h-11 rounded-sm flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${card.accent}18` }}
                  aria-hidden="true"
                >
                  <Icon size={19} style={{ color: card.accent }} />
                </div>
                <p className="text-[9.5px] font-bold tracking-[0.28em] uppercase mb-3" style={{ color: card.accent }}>
                  {card.label}
                </p>
                <h3 className="text-white font-black text-[17px] leading-tight tracking-[-0.01em] mb-4">
                  {card.title}
                </h3>
                <p className="text-white/45 text-[13px] font-light leading-relaxed">
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════════════════════════════════════════
function Timeline() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  return (
    <Section className="bg-white" label="R-Zone history and milestones" id="history">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="Our Journey" dark={false} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionHeadline line1="12 Years of" accent="Milestones." dark={false} id="timeline-heading" />
          </motion.div>
          <motion.p
            className="text-gray-500 text-[14px] font-light mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          >
            From a single warehouse unit to a UK–Nigeria logistics operation trusted by thousands.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Year selector */}
          <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {TIMELINE.map((t, i) => (
              <button
                key={t.year}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 lg:flex-shrink text-left px-4 py-3 border transition-all duration-200 ${
                  active === i
                    ? "border-[#0818A8] bg-[#0818A8] text-white"
                    : "border-gray-200 bg-white text-gray-500 hover:border-[#0818A8]/40 hover:text-gray-800"
                }`}
                aria-label={`View ${t.year} milestone: ${t.title}`}
                aria-pressed={active === i}
              >
                <span className={`block font-black text-[20px] leading-none tracking-[-0.02em] ${
                  active === i ? "text-white" : "text-gray-800"
                }`}>{t.year}</span>
                <span className={`block text-[10.5px] font-semibold tracking-[0.05em] mt-0.5 truncate ${
                  active === i ? "text-white/75" : "text-gray-400"
                }`}>{t.title}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-9">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border border-gray-200 bg-gray-50 p-8 md:p-12 relative overflow-hidden"
            >
              {/* Large year bg */}
              <div
                className="absolute top-6 right-6 font-black text-[#0818A8]/[0.04] leading-none pointer-events-none select-none"
                style={{ fontSize: "clamp(60px, 12vw, 140px)" }}
                aria-hidden="true"
              >
                {TIMELINE[active].year}
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 border border-[#0818A8]/20 bg-[#0818A8]/6 px-3.5 py-1.5 rounded-full mb-6">
                  <span className="text-[#0818A8] text-[10px] font-bold tracking-[0.22em] uppercase">
                    {TIMELINE[active].year}
                  </span>
                </div>

                <h3 className="text-[#0b0f1a] font-black text-[clamp(20px,3.5vw,38px)] leading-[0.95] tracking-[-0.02em] uppercase mb-5">
                  {TIMELINE[active].title}
                </h3>

                <p className="text-gray-600 text-[14.5px] font-light leading-relaxed mb-7 max-w-2xl">
                  {TIMELINE[active].body}
                </p>

                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0818A8] flex-shrink-0" aria-hidden="true" />
                  <p className="text-[#0818A8] text-[12px] font-semibold">{TIMELINE[active].highlight}</p>
                </div>

                {/* Nav arrows */}
                <div className="flex gap-2 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setActive(Math.max(0, active - 1))}
                    disabled={active === 0}
                    className="px-5 py-2 border border-gray-300 text-gray-600 text-[11.5px] font-bold hover:border-[#0818A8] hover:text-[#0818A8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-label="Previous milestone"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setActive(Math.min(TIMELINE.length - 1, active + 1))}
                    disabled={active === TIMELINE.length - 1}
                    className="px-5 py-2 bg-[#0818A8] text-white text-[11.5px] font-bold hover:bg-[#0437F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-label="Next milestone"
                  >
                    Next →
                  </button>
                  <span className="ml-auto flex items-center text-[11px] text-gray-400 font-light">
                    {active + 1} / {TIMELINE.length}
                  </span>
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
// VALUES
// ═══════════════════════════════════════════════════════════════════════════════
function OurValues() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section className="bg-[#00061a]" label="R-Zone core values" id="values">
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#0818A8]/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="What We Stand For" dark />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionHeadline line1="Our Core" accent="Values." dark id="values-heading" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                className="group relative border border-white/[0.07] bg-white/[0.03] p-7 hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: v.accent }}
                  aria-hidden="true"
                />
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${v.accent}18` }}
                  aria-hidden="true"
                >
                  <Icon size={17} style={{ color: v.accent }} />
                </div>
                <h3 className="text-white font-black text-[16px] tracking-[-0.01em] mb-3">{v.title}</h3>
                <p className="text-white/42 text-[13px] font-light leading-relaxed">{v.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════════════
function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section className="bg-white" label="Customer testimonials" id="testimonials">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.03) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="Customer Stories" dark={false} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionHeadline line1="Trusted by" accent="Thousands." dark={false} id="testimonials-heading" />
          </motion.div>
          <motion.p
            className="text-gray-500 text-[14px] font-light mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          >
            107+ five-star reviews on Google — here's what our customers say.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={i}
              className={`relative border p-8 ${
                i === 1
                  ? "border-[#0818A8] bg-[#0818A8] shadow-2xl shadow-[#0818A8]/20"
                  : "border-gray-200 bg-gray-50"
              }`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12 }}
            >
              <Quote
                size={28}
                className={`mb-5 ${i === 1 ? "text-white/40" : "text-[#0818A8]/15"}`}
                aria-hidden="true"
              />
              <div className="flex gap-0.5 mb-4" aria-label={`${t.stars} stars`}>
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star
                    key={si}
                    size={12}
                    className={i === 1 ? "text-white fill-white" : "text-[#0818A8] fill-[#0818A8]"}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className={`text-[13.5px] font-light leading-relaxed mb-6 ${i === 1 ? "text-white/85" : "text-gray-700"}`}>
                "{t.text}"
              </p>
              <footer>
                <cite className="not-italic">
                  <p className={`font-bold text-[13px] ${i === 1 ? "text-white" : "text-gray-800"}`}>{t.author}</p>
                  <p className={`text-[11px] font-light flex items-center gap-1.5 mt-0.5 ${i === 1 ? "text-white/55" : "text-gray-400"}`}>
                    <MapPin size={10} aria-hidden="true" />
                    {t.location}
                  </p>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="https://www.google.com/search?q=R-Zone+Enterprises+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12px] font-bold text-[#0818A8] hover:text-[#0437F2] transition-colors duration-200 border-b border-[#0818A8]/30 hover:border-[#0437F2]/50 pb-0.5"
            aria-label="Read all R-Zone reviews on Google (opens in new tab)"
          >
            Read all 107 reviews on Google
            <ArrowRight size={12} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CERTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════════
function Certifications() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="bg-[#0818A8] relative overflow-hidden"
      role="region"
      aria-label="R-Zone certifications and accreditations"
    >
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-10 md:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
          <p className="text-white/55 text-[10px] font-bold tracking-[0.3em] uppercase flex-shrink-0">
            Accreditations
          </p>
          <div className="h-px bg-white/18 flex-1 hidden sm:block" aria-hidden="true" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full sm:w-auto">
            {CERTIFICATIONS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <div className="w-9 h-9 bg-white/14 rounded-sm flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Icon size={15} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-[12px]">{c.label}</p>
                    <p className="text-white/48 text-[10px] font-light">{c.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEAM
// ═══════════════════════════════════════════════════════════════════════════════
function OurTeam() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section className="bg-[#00061a]" label="R-Zone leadership team" id="team">
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="The People Behind R-Zone" dark />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionHeadline line1="Our" accent="Team." dark id="team-heading" />
          </motion.div>
          <motion.p
            className="text-white/42 text-[14px] font-light mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          >
            The specialists who make 50,000+ successful shipments possible — across two countries, every day.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.role}
              className="group border border-white/[0.08] bg-white/[0.03] p-6 hover:border-white/[0.18] hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] absolute top-0 left-0 w-0 group-hover:w-full transition-all duration-500" aria-hidden="true" />

              {/* Avatar */}
              <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-[#0818A8] to-[#1F51FF] flex items-center justify-center mb-5" aria-hidden="true">
                <span className="text-white font-black text-[22px] leading-none">{member.initial}</span>
              </div>

              <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#1F51FF] mb-1">{member.tenure}</p>
              <h3 className="text-white font-black text-[15px] leading-tight mb-1">{member.name}</h3>
              <p className="text-white/45 text-[11.5px] font-semibold mb-4">{member.role}</p>
              <p className="text-white/40 text-[12px] font-light leading-relaxed">{member.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-white/40 text-[12.5px] font-light mt-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.6 }}
        >
          Plus 15+ logistics professionals across our UK and Nigeria operations teams.
        </motion.p>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// OFFICES
// ═══════════════════════════════════════════════════════════════════════════════
function OurOffices() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section className="bg-white" label="R-Zone office locations" id="offices">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.03) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

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
            <motion.div
              key={office.country}
              className="group relative border border-gray-200 bg-gray-50 p-8 hover:border-[#0818A8]/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: office.accent }}
                aria-hidden="true"
              />

              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-4xl mb-2" aria-hidden="true">{office.flag}</p>
                  <h3 className="text-[#0b0f1a] font-black text-[20px] tracking-[-0.01em]" itemProp="addressCountry">
                    {office.country}
                  </h3>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase mt-0.5" style={{ color: office.accent }}>
                    {office.role}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center"
                  style={{ backgroundColor: `${office.accent}12` }}
                  aria-hidden="true"
                >
                  <Building2 size={17} style={{ color: office.accent }} />
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <MapPin size={13} className="flex-shrink-0 mt-0.5 text-gray-400" aria-hidden="true" />
                  <p className="text-gray-600 text-[13px] font-light leading-snug" itemProp="address">{office.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={13} className="flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <a
                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                    className="text-gray-700 text-[13px] font-medium hover:text-[#0818A8] transition-colors"
                    itemProp="telephone"
                    aria-label={`Call ${office.country} office: ${office.phone}`}
                  >
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={13} className="flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <a
                    href={`mailto:${office.email}`}
                    className="text-gray-700 text-[13px] font-medium hover:text-[#0818A8] transition-colors"
                    itemProp="email"
                    aria-label={`Email ${office.country} office: ${office.email}`}
                  >
                    {office.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={13} className="flex-shrink-0 text-gray-400" aria-hidden="true" />
                  <p className="text-gray-500 text-[12.5px] font-light" itemProp="openingHours">{office.hours}</p>
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
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <Section className="bg-[#00061a]" label="Ship with R-Zone — get started">
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.24) 0%, transparent 70%)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <TagPill label="Start Shipping Today" dark />

          <h2 className="text-white font-black text-[clamp(28px,5.5vw,60px)] leading-[0.9] tracking-[-0.03em] uppercase mb-5 mt-2">
            Ready to Ship with{" "}
            <span className="text-[#1F51FF]">R-Zone?</span>
          </h2>

          <p className="text-white/48 text-[14px] font-light leading-relaxed max-w-xl mx-auto mb-10">
            Join over 10,000 customers who've trusted R-Zone Enterprises with their UK–Nigeria
            cargo. Get a free quote in under 2 minutes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12px] font-black tracking-[0.1em] uppercase px-8 py-4 rounded-sm transition-all duration-200 shadow-xl shadow-[#0818A8]/30"
              aria-label="Get a free shipping quote from R-Zone"
            >
              Get a Free Quote
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 border border-white/22 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[12px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-sm transition-all duration-200"
              aria-label="View all R-Zone shipping services"
            >
              View Services
            </Link>
            <a
              href="tel:+448007720864"
              className="inline-flex items-center gap-2.5 border border-white/22 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[12px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-sm transition-all duration-200"
              aria-label="Call R-Zone: +44 800 772 0864"
            >
              <Phone size={13} aria-hidden="true" />
              Call Us
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {["Free Quote", "No Obligation", "Same-Day Response", "UK-Based Team", "12+ Years Experience"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-white/40 text-[11.5px] font-light">
                <CheckCircle size={11} className="text-[#1F51FF]" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function AboutPageClient() {
  return (
    <>
      {/* ── Organisation JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness", "MovingCompany"],
            "name": "R-Zone Enterprises",
            "alternateName": "R-Zone Cargo",
            "url": "https://r-zoneenterprises.com",
            "logo": "https://r-zoneenterprises.com/logo.png",
            "foundingDate": "2012",
            "description":
              "R-Zone Enterprises is a UK–Nigeria cargo and freight company based in Essex, UK. We offer air freight, sea shipping, door-to-door cargo, customs clearance, warehousing and specialist cargo handling between the UK and all 36 Nigerian states.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Unit 10 Moorhen Yard, Elms Lane",
              "addressLocality": "Upminster",
              "addressRegion": "Essex",
              "postalCode": "RM14 3TS",
              "addressCountry": "GB",
            },
            "telephone": "+448007720864",
            "email": "info@r-zoneenterprises.com",
            "sameAs": [
              "https://www.instagram.com/rzoneenterprise",
              "https://www.google.com/maps?cid=r-zoneenterprises",
            ],
            "areaServed": [
              { "@type": "Country", "name": "United Kingdom" },
              { "@type": "Country", "name": "Nigeria" },
            ],
            "numberOfEmployees": { "@type": "QuantitativeValue", "value": "15" },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "107",
              "bestRating": "5",
              "worstRating": "1",
            },
            "award": ["IATA Certified Cargo Agent", "NCS Compliant Freight Operator"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "UK–Nigeria Shipping Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Air Freight to Nigeria" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sea Shipping to Nigeria" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Door to Door Cargo" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Importation from Nigeria" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Customs Clearance" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Warehousing" } },
              ],
            },
          }),
        }}
      />

      {/* ── BreadcrumbList JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://r-zoneenterprises.com" },
              { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://r-zoneenterprises.com/about" },
            ],
          }),
        }}
      />

      <div className={`${montserrat.variable} ${outfit.variable} font-[family-name:var(--font-montserrat)] w-full`}>
        <Hero />
        <StatsBand />
        <WhoWeAre />
        <MissionVision />
        <Timeline />
        <OurValues />
        <Testimonials />
        <Certifications />
        <OurTeam />
        <OurOffices />
        <FinalCTA />
      </div>
    </>
  );
}