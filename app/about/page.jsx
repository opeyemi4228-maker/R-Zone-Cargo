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
  { value: "2012", suffix: "",   label: "Year Founded",           icon: Clock,   desc: "12+ years operating"           },
  { value: "50",   suffix: "K+", label: "Shipments Delivered",    icon: Package, desc: "Safely moved, on time"          },
  { value: "36",   suffix: "",   label: "Nigerian States Served", icon: MapPin,  desc: "Complete national coverage"     },
  { value: "100",  suffix: "+",  label: "Five-Star Reviews",      icon: Star,    desc: "#1 ranked UK–Nigeria on Google" },
  { value: "99",   suffix: "%",  label: "Delivery Success Rate",  icon: Shield,  desc: "Industry-leading reliability"   },
  { value: "2",    suffix: "",   label: "Warehouse Locations",    icon: Globe,   desc: "Upminster UK · Lagos Nigeria"   },
];

const TIMELINE = [
  { year: "2012", title: "R-Zone is Born",           highlight: "Company founded in Upminster, Essex, UK",   body: "Founded in Essex with a single mission: to give Nigerian families and businesses in the UK a cargo service they could genuinely trust. One warehouse unit, one van, one unwavering commitment to reliability." },
  { year: "2014", title: "Sea Freight Launched",     highlight: "Weekly sea container service begins",        body: "In response to customer demand for affordable bulk shipping, R-Zone launched its weekly sea freight service — opening the UK–Nigeria corridor to businesses with larger consignments from just £3/kg." },
  { year: "2016", title: "Lagos Hub Opens",          highlight: "Nigeria operations hub established — Lagos", body: "We opened our Nigeria hub in Lagos, giving us direct oversight of last-mile delivery, port clearance, and on-the-ground customer service. Both ends of the corridor, managed by our own team." },
  { year: "2018", title: "IATA Certification",       highlight: "IATA certified air freight operation",       body: "R-Zone achieved full IATA certification, validating our air freight capabilities against international aviation standards. This opened access to a broader network of airline partners including British Airways, Emirates and Ethiopian Cargo." },
  { year: "2020", title: "Through the Pandemic",     highlight: "Zero service interruptions during COVID-19",  body: "While global supply chains collapsed, ours kept moving. R-Zone maintained uninterrupted UK–Nigeria operations throughout 2020 — keeping families connected and businesses supplied when it mattered most." },
  { year: "2022", title: "10 Years. 10,000+ Customers.", highlight: "10,000 customers milestone reached",    body: "A decade of delivering. We celebrated our 10th anniversary having served over 10,000 unique customers — families, SMEs, importers and exporters who chose R-Zone as their trusted UK–Nigeria logistics partner." },
  { year: "2024", title: "Digital & Growth",         highlight: "Real-time tracking & online systems live",   body: "We launched real-time shipment tracking, an online quote system, and a fully digital customer portal — making R-Zone the most technically advanced UK–Nigeria cargo operator, while maintaining the personal service our customers rely on." },
];

const VALUES = [
  { icon: Shield,     title: "Reliability",              accent: "#0818A8", body: "Our 99% delivery success rate is not a claim — it's the result of disciplined operations and a culture that treats every shipment as personal." },
  { icon: Eye,        title: "Transparency",             accent: "#1F51FF", body: "No hidden fees. No vague timelines. We tell you exactly what shipping costs, when it departs, and where it is at every stage." },
  { icon: Heart,      title: "Care",                     accent: "#0437F2", body: "Most shipments contain items of deep personal significance. We understand that — and handle everything accordingly." },
  { icon: Zap,        title: "Speed",                    accent: "#0818A8", body: "From collection to customs to delivery, R-Zone operates with urgency. Weekly departures mean your cargo never waits." },
  { icon: Handshake,  title: "Partnership",              accent: "#1F51FF", body: "We don't want one-off customers — we want long-term relationships. Our returning customer rate reflects the trust we've built." },
  { icon: TrendingUp, title: "Continuous Improvement",   accent: "#0437F2", body: "Every year we invest in new routes, new technology, and new capabilities — to serve our customers better than the year before." },
];

const TEAM = [
  { name: "Operations Director",      role: "UK Operations",         tenure: "Since 2012", initial: "O", detail: "Oversees all UK-side logistics, customer service, and warehouse operations at our Upminster, Essex facility." },
  { name: "Nigeria Country Manager",  role: "Nigeria Hub — Lagos",   tenure: "Since 2016", initial: "N", detail: "Leads our Lagos operations team, port clearance specialists, and last-mile delivery network across all 36 states." },
  { name: "Head of Air Freight",      role: "Air Cargo Division",    tenure: "Since 2018", initial: "A", detail: "Manages IATA-certified air freight operations and airline partner relationships including British Airways, Emirates and Ethiopian Cargo." },
  { name: "Customer Relations Lead",  role: "Client Services",       tenure: "Since 2019", initial: "C", detail: "Dedicated to ensuring every customer interaction is fast, personal and genuinely helpful — no call centres, no bots." },
];

const TESTIMONIALS = [
  { text: "I've been shipping with R-Zone for 6 years and they have never let me down. My goods always arrive on time and in perfect condition. Genuinely the best cargo company I've used.", author: "Vincent A.", location: "London → Lagos", stars: 5 },
  { text: "Professional, transparent with pricing, and they actually pick up the phone. R-Zone has completely changed how our business manages its UK–Nigeria supply chain.", author: "Emmanuel K.", location: "Birmingham → Abuja", stars: 5 },
  { text: "Sent goods to my family in Abeokuta — they arrived ahead of schedule. The tracking was accurate, communication excellent. Will not use anyone else.", author: "Oludotun O.", location: "Essex → Abeokuta", stars: 5 },
];

const OFFICES = [
  { country: "United Kingdom", flag: "🇬🇧", role: "Headquarters & Warehouse", address: "Unit 9 Moorhen Yard, Elms Lane, Bulphan, Upminster, RM14 3TS", phone: "+44 (0) 800 772 0864", phoneHref: "tel:+448007720864", email: "info@r-zoneenterprises.com", hours: "Mon–Fri 10AM–6PM · Sat 11AM–2PM", accent: "#0818A8" },
  { country: "Nigeria",        flag: "🇳🇬", role: "Operations Hub — Lagos",   address: "1-3 R-Zone Crescent, Queens Park Estate II, Shagam Interchange, Lagos. <strong>Collection Points:</strong> Egbeda, Surulele, Ajah, Ibadan", phone: "+234 906 680 6861", phoneHref: "tel:+2349066806861", email: "nigeria@r-zoneenterprises.com", hours: "Mon–Fri 9AM–5PM WAT", accent: "#1F51FF" },
];

const CERTIFICATIONS = [
  { label: "IATA Certified",  icon: Award,       desc: "International air cargo standards" },
  { label: "NCS Compliant",   icon: Shield,      desc: "Nigeria Customs Service registered" },
  { label: "Fully Insured",   icon: CheckCircle, desc: "Comprehensive cargo cover"          },
  { label: "HMRC Registered", icon: Building2,   desc: "UK customs authorised agent"        },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};

function Section({ children, className = "", id, label }) {
  return <section id={id} className={`relative overflow-hidden ${className}`} aria-label={label}>{children}</section>;
}

function TagPill({ label, dark = true }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-6 ${dark ? "border-[#1F51FF]/30 bg-[#0818A8]/14" : "border-[#0818A8]/20 bg-[#0818A8]/6"}`}>
      <motion.span className="w-1.5 h-1.5 rounded-full bg-[#1F51FF] flex-shrink-0"
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity }} aria-hidden="true" />
      <span className={`text-[13px] font-bold tracking-[0.28em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>{label}</span>
    </div>
  );
}

function SectionHeadline({ line1, accent, dark = true, id }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <h2 id={id} ref={ref} className={`font-black text-[clamp(26px,4.5vw,52px)] leading-[0.92] tracking-[-0.028em] uppercase ${dark ? "text-white" : "text-[#0b0f1a]"}`}>
      {line1}{" "}
      <span className="relative inline-block" style={{ color: "#1F51FF" }}>
        {accent}
        <motion.span className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#1F51FF]" aria-hidden="true"
          initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.55 }} />
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
    <Section className="bg-[#00061a] min-h-[80vh] flex flex-col justify-end hero-section"
      label="About R-Zone Enterprises — the highest-rated UK to Nigeria cargo company">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }} aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[500px] bg-[#0818A8]/18 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[-5%] w-[500px] h-[400px] bg-[#1F51FF]/10 rounded-full blur-[120px]" />
      </div>
      <div className="absolute top-0 right-0 w-px h-full opacity-[0.08] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1F51FF 40%, transparent)" }} aria-hidden="true" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 w-full pt-[120px] pb-16 md:pb-20">
        <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10 -mt-2.5"
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
                <TagPill label="The #1 Ranked UK–Nigeria Cargo Company · Est. 2012" dark />
              </motion.div>
              <motion.h1 variants={fadeUp} custom={0.1}
                className="text-white font-black text-[clamp(36px,7vw,84px)] leading-[0.88] tracking-[-0.035em] uppercase mb-7">
                Built on{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#1F51FF]">Trust.</span>
                  <motion.span className="absolute -bottom-2 left-0 h-[4px] rounded-full bg-[#1F51FF]" aria-hidden="true"
                    initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.6, delay: 0.7 }} />
                </span>
                <br />Driven by{" "}<span className="text-white/80">Purpose.</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={0.2}
                className="text-white/80 text-[15px] font-normal leading-relaxed max-w-xl mb-10">
                R-Zone Enterprises was founded in Essex in 2012 with one mission: to give Nigerian families
                and businesses in the UK a cargo service they could genuinely rely on. The{" "}
                <strong className="text-white font-semibold">highest-rated and highest-ranked UK-to-Nigeria cargo company on Google</strong>
                {" "}— 100+ five-star reviews, organically earned, and 50,000+ shipments delivered since 2012.
              </motion.p>
              <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap gap-3">
                <Link href="/quote"
                  className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.1em] uppercase px-7 py-3.5 rounded-sm transition-all duration-200 shadow-lg shadow-[#0818A8]/30"
                  aria-label="Get a free UK to Nigeria cargo quote from R-Zone">
                  Get a Quote <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.05] hover:bg-white/10 text-white text-[13px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-sm transition-all duration-200"
                  aria-label="Contact R-Zone Enterprises UK Nigeria cargo team">
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div className="lg:col-span-5"
            initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div className="border border-white/10 bg-white/[0.04] backdrop-blur-sm p-7 space-y-5">
              <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] -mx-7 -mt-7 mb-7" aria-hidden="true" />
              <p className="text-[13px] font-bold tracking-[0.3em] uppercase text-white/80 mb-4">Quick Facts</p>
              {[
                { icon: MapPin,  label: "UK Headquarters",     val: "Upminster, Essex"           },
                { icon: Globe,   label: "Nigeria Hub",          val: "Shagam Interchange, Lagos"  },
                { icon: Clock,   label: "Operating Since",      val: "2012 — 12+ years"           },
                { icon: Package, label: "Shipments Delivered",  val: "50,000+"                    },
                { icon: Star,    label: "Google Reviews",       val: "100 × Five-Star"            },
                { icon: Users,   label: "Google Ranking",       val: "#1 UK–Nigeria Cargo"        },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-center justify-between border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2.5">
                    <Icon size={12} className="text-[#1F51FF] flex-shrink-0" aria-hidden="true" />
                    <span className="text-white/80 text-[13px] font-normal">{label}</span>
                  </div>
                  <span className="text-white text-[13px] font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
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
    <div ref={ref} className="bg-[#0818A8] relative overflow-hidden" role="region"
      aria-label="R-Zone Enterprises key statistics — UK to Nigeria cargo">
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
                <div className="w-9 h-9 bg-white/20 rounded-sm flex items-center justify-center mb-3" aria-hidden="true">
                  <Icon size={15} className="text-white" />
                </div>
                <p className="text-white font-black text-[28px] leading-none tracking-[-0.025em] mb-1">
                  {s.value}<span className="text-white/80 text-[20px]">{s.suffix}</span>
                </p>
                <p className="text-white/80 text-[11px] font-semibold tracking-[0.08em] uppercase mb-1">{s.label}</p>
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
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <Section className="bg-white" label="Who R-Zone Enterprises are — UK to Nigeria cargo specialists" id="who-we-are">
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} custom={0}><TagPill label="Who We Are" dark={false} /></motion.div>
            <motion.div variants={fadeUp} custom={0.05}>
              <SectionHeadline line1="The Cargo Company" accent="Nigeria Trusts." dark={false} id="who-we-are-heading" />
            </motion.div>
            <motion.div variants={fadeUp} custom={0.2} className="mt-6 space-y-4">
              <p className="text-gray-800 text-[14px] font-normal leading-relaxed">
                R-Zone Enterprises is a specialist UK–Nigeria cargo company based in Upminster, Essex, operating since 2012.
                We are the{" "}
                <strong className="text-gray-900 font-semibold">highest-rated and highest-ranked UK-to-Nigeria cargo company on Google</strong>
                {" "}— built to solve a real problem: businesses and families in the UK deserved a cargo service that was fast, transparent, and genuinely reliable.
              </p>
              <p className="text-gray-800 text-[14px] font-normal leading-relaxed">
                We offer the full spectrum of UK–Nigeria logistics — air freight (5–10 working days),
                weekly sea freight sailings (4–6 weeks, from £3/kg), door-to-door cargo, importation,
                customs clearance, warehousing — all managed by our own teams in both countries.
              </p>
              <p className="text-gray-800 text-[14px] font-normal leading-relaxed">
                We serve families sending goods home to Lagos, Abuja, Port Harcourt and all 36 Nigerian states.
                We serve businesses managing cross-border supply chains. Whatever the shipment — R-Zone delivers.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} custom={0.35} className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Plane, label: "Air Freight",     sub: "5–10 working days"  },
                { icon: Ship,  label: "Sea Freight",     sub: "Weekly sailings"    },
                { icon: Truck, label: "Door to Door",    sub: "UK-wide collection" },
                { icon: Globe, label: "Both Directions", sub: "UK ↔ Nigeria"       },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 border border-gray-100 bg-gray-50 p-3.5">
                  <div className="w-9 h-9 bg-[#0818A8]/8 rounded-sm flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Icon size={15} className="text-[#0818A8]" />
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
            <div className="bg-[#00061a] p-10 relative overflow-hidden">
              <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] absolute top-0 left-0 right-0" aria-hidden="true" />
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
              <div className="relative z-10">
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/80 mb-6">Our Freight Corridor</p>
                <div className="flex items-center gap-5 mb-8">
                  <div className="text-center">
                    <p className="text-3xl mb-1">🇬🇧</p>
                    <p className="text-white font-bold text-[12px] tracking-wide">UNITED KINGDOM</p>
                    <p className="text-white/80 text-[11px] font-normal">Essex · London · UK-Wide</p>
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-px bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div className="w-2.5 h-2.5 rounded-full bg-[#1F51FF]"
                        animate={{ x: [-20, 20, -20] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} aria-hidden="true" />
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-[#1F51FF] text-[11px] font-bold tracking-[0.2em] uppercase">Air · Sea · Road</p>
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
                    { val: "5–10", unit: "days",  label: "Air transit"  },
                    { val: "4–6",  unit: "weeks", label: "Sea transit"  },
                    { val: "24/7", unit: "",      label: "Tracking"     },
                  ].map(({ val, unit, label }) => (
                    <div key={label} className="bg-white/[0.05] border border-white/[0.08] p-3 text-center">
                      <p className="text-white font-black text-[18px] leading-none">{val}<span className="text-[12px] font-normal text-white/80 ml-0.5">{unit}</span></p>
                      <p className="text-white/80 text-[11px] font-medium tracking-[0.1em] uppercase mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div className="absolute -bottom-5 -right-4 bg-[#0818A8] px-5 py-3 shadow-xl shadow-[#0818A8]/30"
              initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}>
              <p className="text-white font-black text-[20px] leading-none">100+</p>
              <p className="text-white/80 text-[11px] font-semibold tracking-[0.15em] uppercase">#1 on Google</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MISSION VISION
// ═══════════════════════════════════════════════════════════════════════════════
function MissionVision() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cards  = [
    { icon: Target,    label: "Our Mission", accent: "#0818A8", title: "Deliver without compromise.", body: "Fast, transparent, reliable UK–Nigeria cargo — for families and businesses, every shipment, every time." },
    { icon: Eye,       label: "Our Vision",  accent: "#1F51FF", title: "The definitive UK–Nigeria logistics partner.", body: "To be the most trusted name in UK–Nigeria freight — recognised for excellence, technology, and a customer-first culture." },
    { icon: Handshake, label: "Our Promise", accent: "#0437F2", title: "We treat your cargo like our own.", body: "Every shipment through R-Zone is handled with the same care we'd give our own belongings. Your trust is not taken lightly." },
  ];
  return (
    <Section className="bg-[#00061a]" label="R-Zone mission, vision and promise" id="mission">
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
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
              <motion.div key={card.label} className="relative border border-white/[0.08] bg-white/[0.03] p-8 group hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
                initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: i * 0.12 }}>
                <div className="h-[2px] absolute top-0 left-0 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(to right, ${card.accent}, #1F51FF)` }} aria-hidden="true" />
                <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-6" style={{ backgroundColor: `${card.accent}18` }} aria-hidden="true">
                  <Icon size={19} style={{ color: card.accent }} />
                </div>
                <p className="text-[11px] font-bold tracking-[0.28em] uppercase mb-3" style={{ color: card.accent }}>{card.label}</p>
                <h3 className="text-white font-black text-[17px] leading-tight tracking-[-0.01em] mb-4">{card.title}</h3>
                <p className="text-white/80 text-[13px] font-normal leading-relaxed">{card.body}</p>
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
    <Section className="bg-white" label="R-Zone history — UK Nigeria cargo company since 2012" id="history">
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.035) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
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
            From a single warehouse unit in Essex to the UK&apos;s #1 ranked UK–Nigeria cargo company.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {TIMELINE.map((t, i) => (
              <button key={t.year} onClick={() => setActive(i)}
                className={`flex-shrink-0 lg:flex-shrink text-left px-4 py-3 border transition-all duration-200 ${active === i ? "border-[#0818A8] bg-[#0818A8] text-white" : "border-gray-200 bg-white text-gray-800 hover:border-[#0818A8]/40"}`}
                aria-label={`${t.year}: ${t.title}`} aria-pressed={active === i}>
                <span className={`block font-black text-[20px] leading-none tracking-[-0.02em] ${active === i ? "text-white" : "text-gray-800"}`}>{t.year}</span>
                <span className={`block text-[11px] font-semibold tracking-[0.05em] mt-0.5 truncate ${active === i ? "text-white/80" : "text-gray-800"}`}>{t.title}</span>
              </button>
            ))}
          </div>
          <div className="lg:col-span-9">
            <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }} className="border border-gray-200 bg-gray-50 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-6 right-6 font-black text-[#0818A8]/[0.04] leading-none pointer-events-none select-none"
                style={{ fontSize: "clamp(60px, 12vw, 140px)" }} aria-hidden="true">{TIMELINE[active].year}</div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 border border-[#0818A8]/20 bg-[#0818A8]/6 px-3.5 py-1.5 rounded-full mb-6">
                  <span className="text-[#0818A8] text-[11px] font-bold tracking-[0.22em] uppercase">{TIMELINE[active].year}</span>
                </div>
                <h3 className="text-[#0b0f1a] font-black text-[clamp(20px,3.5vw,38px)] leading-[0.95] tracking-[-0.02em] uppercase mb-5">
                  {TIMELINE[active].title}
                </h3>
                <p className="text-gray-800 text-[14px] font-normal leading-relaxed mb-7 max-w-2xl">{TIMELINE[active].body}</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0818A8] flex-shrink-0" aria-hidden="true" />
                  <p className="text-[#0818A8] text-[13px] font-semibold">{TIMELINE[active].highlight}</p>
                </div>
                <div className="flex gap-2 mt-8 pt-6 border-t border-gray-200">
                  <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}
                    className="px-5 py-2 border border-gray-300 text-gray-800 text-[13px] font-bold hover:border-[#0818A8] hover:text-[#0818A8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-label="Previous milestone">← Prev</button>
                  <button onClick={() => setActive(Math.min(TIMELINE.length - 1, active + 1))} disabled={active === TIMELINE.length - 1}
                    className="px-5 py-2 bg-[#0818A8] text-white text-[13px] font-bold hover:bg-[#0437F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
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
// VALUES
// ═══════════════════════════════════════════════════════════════════════════════
function OurValues() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <Section className="bg-[#00061a]" label="R-Zone core values" id="values">
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
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
              <motion.div key={v.title} className="group relative border border-white/[0.07] bg-white/[0.03] p-7 hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500" style={{ backgroundColor: v.accent }} aria-hidden="true" />
                <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-5" style={{ backgroundColor: `${v.accent}18` }} aria-hidden="true">
                  <Icon size={17} style={{ color: v.accent }} />
                </div>
                <h3 className="text-white font-black text-[16px] tracking-[-0.01em] mb-3">{v.title}</h3>
                <p className="text-white/80 text-[13px] font-normal leading-relaxed">{v.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIALS — real customer reviews
// ═══════════════════════════════════════════════════════════════════════════════
function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <Section className="bg-white" label="Real customer reviews — R-Zone UK to Nigeria cargo" id="testimonials">
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.03) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="100+ Five-Star Reviews · #1 Ranked UK–Nigeria Cargo" dark={false} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionHeadline line1="Trusted by" accent="Thousands." dark={false} id="testimonials-heading" />
          </motion.div>
          <motion.p className="text-gray-800 text-[14px] font-normal mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            The highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — here&apos;s what our real customers say.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote key={i}
              className={`relative border p-8 ${i === 1 ? "border-[#0818A8] bg-[#0818A8] shadow-2xl shadow-[#0818A8]/20" : "border-gray-200 bg-gray-50"}`}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              itemScope itemType="https://schema.org/Review">
              <Quote size={28} className={`mb-5 ${i === 1 ? "text-white/40" : "text-[#0818A8]/15"}`} aria-hidden="true" />
              <div className="flex gap-0.5 mb-4" aria-label={`${t.stars} stars`}
                itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                <meta itemProp="ratingValue" content={t.stars} />
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} size={12} className={i === 1 ? "text-white fill-white" : "text-[#0818A8] fill-[#0818A8]"} aria-hidden="true" />
                ))}
              </div>
              <p className={`text-[13.5px] font-normal leading-relaxed mb-6 ${i === 1 ? "text-white" : "text-gray-800"}`}
                itemProp="reviewBody">&ldquo;{t.text}&rdquo;</p>
              <footer>
                <cite className="not-italic" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <p className={`font-bold text-[13px] ${i === 1 ? "text-white" : "text-gray-800"}`} itemProp="name">{t.author}</p>
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
            className="inline-flex items-center gap-2 text-[13px] font-bold text-[#0818A8] hover:text-[#0437F2] transition-colors duration-200 border-b border-[#0818A8]/30 hover:border-[#0437F2]/50 pb-0.5"
            aria-label="Read all 100 five-star R-Zone reviews on Google (opens in new tab)">
            Read all 100+ reviews on Google <ArrowRight size={12} aria-hidden="true" />
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
    <div ref={ref} className="bg-[#0818A8] relative overflow-hidden" role="region"
      aria-label="R-Zone certifications — IATA, NCS, HMRC, fully insured">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-10 md:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
          <p className="text-white/80 text-[11px] font-bold tracking-[0.3em] uppercase flex-shrink-0">Accreditations</p>
          <div className="h-px bg-white/25 flex-1 hidden sm:block" aria-hidden="true" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full sm:w-auto">
            {CERTIFICATIONS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.label} className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.08 }}>
                  <div className="w-9 h-9 bg-white/20 rounded-sm flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Icon size={15} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-[13px]">{c.label}</p>
                    <p className="text-white/80 text-[11px] font-normal">{c.desc}</p>
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
    <Section className="bg-[#00061a]" label="R-Zone team — UK and Nigeria logistics specialists" id="team">
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="The People Behind R-Zone" dark />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionHeadline line1="Our" accent="Team." dark id="team-heading" />
          </motion.div>
          <motion.p className="text-white/80 text-[14px] font-normal mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            The specialists who make 50,000+ successful shipments possible — across the UK and Nigeria, every day.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, i) => (
            <motion.div key={member.role} className="group border border-white/[0.08] bg-white/[0.03] p-6 hover:border-white/[0.18] hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] absolute top-0 left-0 w-0 group-hover:w-full transition-all duration-500" aria-hidden="true" />
              <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-[#0818A8] to-[#1F51FF] flex items-center justify-center mb-5" aria-hidden="true">
                <span className="text-white font-black text-[22px] leading-none">{member.initial}</span>
              </div>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#1F51FF] mb-1">{member.tenure}</p>
              <h3 className="text-white font-black text-[15px] leading-tight mb-1">{member.name}</h3>
              <p className="text-white/80 text-[13px] font-semibold mb-4">{member.role}</p>
              <p className="text-white/80 text-[13px] font-normal leading-relaxed">{member.detail}</p>
            </motion.div>
          ))}
        </div>
        <motion.p className="text-center text-white/80 text-[13px] font-normal mt-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.6 }}>
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
    <Section className="bg-white" label="R-Zone office locations — UK and Nigeria" id="offices">
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.03) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
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
            <motion.div key={office.country} className="group relative border border-gray-200 bg-gray-50 p-8 hover:border-[#0818A8]/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              itemScope itemType="https://schema.org/LocalBusiness">
              <div className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: office.accent }} aria-hidden="true" />
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-4xl mb-2" aria-hidden="true">{office.flag}</p>
                  <h3 className="text-[#0b0f1a] font-black text-[20px] tracking-[-0.01em]" itemProp="addressCountry">{office.country}</h3>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase mt-0.5" style={{ color: office.accent }}>{office.role}</p>
                </div>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${office.accent}12` }} aria-hidden="true">
                  <Building2 size={17} style={{ color: office.accent }} />
                </div>
              </div>
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <MapPin size={13} className="flex-shrink-0 mt-0.5 text-gray-800" aria-hidden="true" />
                  <p className="text-gray-800 text-[13px] font-normal leading-snug" itemProp="address" dangerouslySetInnerHTML={{ __html: office.address }}></p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={13} className="flex-shrink-0 text-gray-800" aria-hidden="true" />
                  <a href={office.phoneHref} className="text-gray-800 text-[13px] font-medium hover:text-[#0818A8] transition-colors"
                    itemProp="telephone" aria-label={`Call R-Zone ${office.country}: ${office.phone}`}>{office.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={13} className="flex-shrink-0 text-gray-800" aria-hidden="true" />
                  <a href={`mailto:${office.email}`} className="text-gray-800 text-[13px] font-medium hover:text-[#0818A8] transition-colors"
                    itemProp="email" aria-label={`Email R-Zone ${office.country}: ${office.email}`}>{office.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={13} className="flex-shrink-0 text-gray-800" aria-hidden="true" />
                  <p className="text-gray-800 text-[13px] font-normal" itemProp="openingHours">{office.hours}</p>
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
    <Section className="bg-[#00061a]" label="Ship with R-Zone — get a free UK to Nigeria cargo quote">
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.24) 0%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }}>
          <TagPill label="Start Shipping Today" dark />
          <h2 className="text-white font-black text-[clamp(28px,5.5vw,60px)] leading-[0.9] tracking-[-0.03em] uppercase mb-5 mt-2">
            Ship from the UK to Nigeria<br />with <span className="text-[#1F51FF]">R-Zone.</span>
          </h2>
          <p className="text-white/80 text-[14px] font-normal leading-relaxed max-w-xl mx-auto mb-10">
            Join over 10,000 customers who trust R-Zone for UK–Nigeria cargo.
            Air freight from £5/kg · Sea freight from £3/kg · Weekly departures.
            Free quote in under 2 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link href="/quote"
              className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.1em] uppercase px-8 py-4 rounded-sm transition-all duration-200 shadow-xl shadow-[#0818A8]/30"
              aria-label="Get a free UK to Nigeria shipping quote from R-Zone">
              Get a Free Quote <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <Link href="/services"
              className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[13px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-sm transition-all duration-200"
              aria-label="View all R-Zone UK Nigeria shipping services">
              View Services
            </Link>
            <a href="tel:+448007720864"
              className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[13px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-sm transition-all duration-200"
              aria-label="Call R-Zone UK: +44 800 772 0864">
              <Phone size={13} aria-hidden="true" /> Call Us
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["Free Quote", "No Obligation", "Same-Day Response", "UK-Based Team", "#1 on Google"].map(t => (
              <span key={t} className="flex items-center gap-2 text-white/80 text-[13px] font-normal">
                <CheckCircle size={11} className="text-[#1F51FF]" aria-hidden="true" />{t}
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
            "description": "The highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — 100+ five-star reviews, organically earned. R-Zone Enterprises offers air freight, sea freight with weekly sailings, door-to-door cargo, customs clearance, warehousing and importation between the UK and Nigeria since 2012.",
            "slogan": "The Highest-Rated & Highest-Ranked Cargo Company Between the UK and Nigeria",
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
              { "@type": "City",    "name": "Lagos"  },
              { "@type": "City",    "name": "Abuja"  },
              { "@type": "City",    "name": "London" },
              { "@type": "Continent", "name": "Africa" },
            ],
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "100", "bestRating": "5", "worstRating": "1", "description": "Highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — 100+ five-star reviews, organically earned." },
            "award": ["#1 Ranked UK-to-Nigeria Cargo Company on Google", "100+ Five-Star Google Reviews — Organically Earned", "IATA Certified Air Freight Agent", "NCS Compliant Freight Operator", "HMRC Registered UK Customs Agent"],
            "numberOfEmployees": { "@type": "QuantitativeValue", "value": "15" },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "UK–Nigeria Cargo & Shipping Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Air Freight UK to Nigeria", "description": "Weekly air cargo from London to Lagos and Abuja. 5–10 working days." } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sea Freight UK to Nigeria — Weekly Sailings", "description": "Weekly consolidated sea freight to Lagos. 4–6 weeks. From £3/kg." } },
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
              { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://r-zoneenterprises.com" },
              { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://r-zoneenterprises.com/about" },
            ],
          },
          {
            "@type": "AboutPage",
            "url": "https://r-zoneenterprises.com/about",
            "name": "About R-Zone Enterprises — UK to Nigeria Cargo Company Since 2012",
            "description": "Learn about R-Zone Enterprises — the highest-rated and highest-ranked UK-to-Nigeria cargo company on Google. Founded in Essex in 2012. 100+ five-star reviews. Air freight, sea freight and door-to-door cargo.",
            "publisher": { "@id": "https://r-zoneenterprises.com/#organization" },
          },
        ],
      })}} />

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