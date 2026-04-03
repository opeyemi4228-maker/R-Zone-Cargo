"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Plane, Ship, Truck, Package, MapPin, Phone,
  ArrowRight, ChevronRight, Check, CheckCircle,
  AlertTriangle, Star, Clock, Shield, MessageCircle,
  Globe, Warehouse, X, ChevronDown, Info, Zap,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── WhatsApp SVG ─────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const RATES_A = [
  { state: "Lagos",        door: "5.20", col: "4.80", min: 20 },
  { state: "Ibadan",       door: "5.30", col: "5.00", min: 20 },
  { state: "Akure",        door: "5.30", col: "5.00", min: 20 },
  { state: "Abuja",        door: "6.30", col: "5.80", min: 30 },
  { state: "Anambra",      door: "6.30", col: "5.80", min: 30 },
  { state: "Abia",         door: "6.30", col: "5.80", min: 30 },
  { state: "Adamawa",      door: "6.80", col: "6.50", min: 30 },
  { state: "Akwa Ibom",    door: "6.30", col: "5.80", min: 30 },
  { state: "Bauchi",       door: "6.80", col: "6.50", min: 30 },
  { state: "Bayelsa",      door: "6.30", col: "5.80", min: 30 },
  { state: "Benue",        door: "6.30", col: "5.80", min: 30 },
  { state: "Borno",        door: "6.80", col: "6.50", min: 30 },
  { state: "Cross River",  door: "6.30", col: "5.80", min: 30 },
  { state: "Delta",        door: "6.30", col: "5.80", min: 30 },
  { state: "Ebonyi",       door: "6.30", col: "5.80", min: 30 },
  { state: "Edo",          door: "6.30", col: "5.80", min: 30 },
  { state: "Ekiti",        door: "6.30", col: "5.80", min: 30 },
  { state: "Enugu",        door: "6.30", col: "5.80", min: 30 },
  { state: "Gombe",        door: "6.80", col: "6.50", min: 30 },
  { state: "Imo",          door: "6.30", col: "5.80", min: 30 },
  { state: "Jigawa",       door: "6.80", col: "6.50", min: 30 },
  { state: "Kaduna",       door: "6.80", col: "6.50", min: 30 },
];

const RATES_B = [
  { state: "Kano",         door: "6.80", col: "6.50", min: 30 },
  { state: "Katsina",      door: "6.80", col: "6.50", min: 30 },
  { state: "Kebbi",        door: "6.80", col: "6.50", min: 30 },
  { state: "Kogi",         door: "6.30", col: "6.00", min: 30 },
  { state: "Kwara",        door: "6.30", col: "5.50", min: 30 },
  { state: "Nasarawa",     door: "6.80", col: "6.50", min: 30 },
  { state: "Niger",        door: "6.80", col: "6.50", min: 30 },
  { state: "Ogun",         door: "5.80", col: "5.50", min: 30 },
  { state: "Ondo",         door: "6.00", col: "5.50", min: 30 },
  { state: "Osun",         door: "6.00", col: "5.50", min: 30 },
  { state: "Oyo",          door: "6.00", col: "—",    min: 30 },
  { state: "Plateau",      door: "6.80", col: "6.50", min: 30 },
  { state: "Rivers",       door: "6.80", col: "6.50", min: 30 },
  { state: "Sokoto",       door: "6.80", col: "6.50", min: 30 },
  { state: "Taraba",       door: "6.80", col: "6.50", min: 30 },
  { state: "Yobe",         door: "6.80", col: "6.50", min: 30 },
  { state: "Zamfara",      door: "6.80", col: "6.50", min: 30 },
];

const ALL_RATES = [...RATES_A, ...RATES_B];

const FOODSTUFFS = [
  "Wheat", "Fufu", "Garri", "Palm oil", "Elubo", "Groundnut",
  "Plantain Chips", "Power Ogi", "Kuli Kuli",
  "Indomie (not chicken flavour)", "Ofada Rice", "Semolina",
  "Golden Morn", "Cerelac", "Maggi (not chicken flavour)",
  "Chin Chin", "Methylated cream",
  "Body creams (no bleaching creams)",
  "Spices — garlic, ginger, curry, thyme, tin tomatoes",
  "Beans without kokoro", "Pupuru",
  "Grounded melon, Ogbono, Pepper",
  "Crayfish (must be in sealed bottle)",
  "Orogbo", "Obi / Cola nut", "Herbs (no liquid forms)",
];

const FAQS = [
  {
    q: "How do I send goods from Nigeria to the UK with R-Zone?",
    a: "Contact our Lagos team or the UK office with your cargo details — weight, Nigerian state, and type of goods. Drop off at our Egbeda, Lagos office or arrange collection. We dispatch via weekly air freight (min 20kg) or monthly sea freight (min 2 bags).",
  },
  {
    q: "What is the minimum weight for importation from Nigeria to the UK?",
    a: "Air freight minimum is 20kg per shipment. Sea freight minimum is 2 bags. The minimum varies by state — Lagos, Ibadan and Akure have a 20kg minimum; all other states require a minimum of 30kg.",
  },
  {
    q: "How long does shipping from Nigeria to the UK take?",
    a: "Air freight from Nigeria to the UK typically takes 5–8 working days. Sea freight takes 4–6 weeks. We operate weekly air departures and monthly sea sailings from Lagos.",
  },
  {
    q: "Can I send African foodstuffs from Nigeria to the UK?",
    a: "Yes. R-Zone accepts a wide range of Nigerian and African foodstuffs on our approved items list. Items must be well packed before arriving at our Lagos warehouse. Bleaching creams, chicken-flavoured Indomie or Maggi, and liquid herbs are not permitted.",
  },
  {
    q: "Why do rates vary by Nigerian state?",
    a: "Rates reflect the cost of collection or delivery within Nigeria. States closer to Lagos (our hub) attract lower rates. Northern and eastern states attract higher per-kg rates due to additional transit. Final pricing may also vary with daily Naira exchange rate fluctuations.",
  },
  {
    q: "Does R-Zone handle UK customs clearance for Nigeria imports?",
    a: "Yes. UK customs clearance (HMRC) is handled by our Upminster, Essex team and is included in all shipments. You do not need to deal with UK customs separately.",
  },
  {
    q: "What items are NOT allowed in importation from Nigeria to the UK?",
    a: "Prohibited items include: firearms, controlled drugs, bleaching creams, chicken-flavoured Indomie or Maggi, liquid herbs, live animals, and any item on the UK import prohibition list. R-Zone will not carry prohibited goods under any circumstances.",
  },
];

const PROCESS_STEPS = [
  {
    n: "01", icon: Phone, title: "Get a Quote",
    sub: "Call, WhatsApp or email us",
    body: "Contact our Lagos team or UK office with your cargo details — weight, state, and type of goods. We provide a transparent per-kg rate same day.",
  },
  {
    n: "02", icon: Warehouse, title: "Drop Off in Lagos",
    sub: "Egbeda, Lagos — our collection office",
    body: "Bring cargo to 150 Idimu Egbeda Road, by Seliat BRT Bus Stop, Egbeda, Lagos. Our team assesses, weighs and repacks where necessary.",
  },
  {
    n: "03", icon: Plane, title: "Air or Sea Dispatch",
    sub: "Weekly air · Monthly sea",
    body: "Dispatched via our weekly air freight (min 20kg, 5–8 working days) or monthly sea freight (min 2 bags, 4–6 weeks). You choose what suits your budget and timeline.",
  },
  {
    n: "04", icon: MapPin, title: "Delivered to the UK",
    sub: "Door delivery anywhere in the UK",
    body: "Your cargo clears UK customs (HMRC) at our Upminster, Essex hub and is delivered to your UK address. End-to-end managed by our own teams.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

function TagPill({ label, dark = true }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-6 ${
      dark ? "border-[#1F51FF]/30 bg-[#0818A8]/14" : "border-[#0818A8]/20 bg-[#0818A8]/6"
    }`}>
      <motion.span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dark ? "bg-[#1F51FF]" : "bg-[#0818A8]"}`}
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        aria-hidden="true"
      />
      <span className={`text-[13px] font-bold tracking-[0.28em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>
        {label}
      </span>
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

  return (
    <section
      className="relative bg-[#00061a] min-h-[80vh] flex flex-col justify-end overflow-hidden hero-section"
      aria-labelledby="importation-hero-h1"
    >
      {/* Grid texture — identical to ServicesPageClient hero */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Atmospheric blue glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/3 w-[700px] h-[400px] bg-[#0818A8]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#1F51FF]/10 rounded-full blur-[100px]" />
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[500px] bg-[#0818A8]/12 rounded-full blur-[140px]" />
      </div>

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-0 w-px h-full opacity-[0.08] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1F51FF 40%, transparent)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 w-full pt-[130px] pb-16 md:pb-24">

        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="text-white/80 text-[13px] font-medium hover:text-white transition-colors">Home</Link>
          <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
          <Link href="/services" className="text-white/80 text-[13px] font-medium hover:text-white transition-colors">Services</Link>
          <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
          <span className="text-white text-[13px] font-medium" aria-current="page">Importation from Nigeria</span>
        </motion.nav>

        <div className="max-w-[820px]">
          {/* Authority badge */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 border border-amber-400/35 bg-amber-400/8 px-3.5 py-1.5 rounded-full mb-4">
              <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-amber-400 text-[11px] font-black tracking-[0.22em] uppercase">
                #1 Ranked UK–Nigeria Cargo on Google · 100+ Five-Star Reviews
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <TagPill label="Shipping Services from Nigeria to UK" dark />
          </motion.div>

          {/* Stacked animated headline */}
          <h1
            id="importation-hero-h1"
            className="font-black text-[clamp(44px,8vw,96px)] leading-[0.83] tracking-[-0.04em] uppercase mb-8"
          >
            {[
              { word: "Nigeria",    delay: 0.25, color: "text-white" },
              { word: "UK Cargo.",  delay: 0.38, color: "text-[#1F51FF]", underline: true },
            ].map(({ word, delay, color, outline, underline }) => (
              <motion.span
                key={word}
                className={`block ${color} ${outline ? "[-webkit-text-stroke:1.5px_rgba(255,255,255,0.18)]" : ""}`}
                style={outline ? { WebkitTextFillColor: "transparent" } : {}}
                initial={{ x: -80, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
              >
                {underline ? (
                  <span className="relative inline-block">
                    {word}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[5px] rounded-full"
                      style={{ background: "linear-gradient(to right, #0818A8, #1F51FF)" }}
                      aria-hidden="true"
                      initial={{ width: 0 }}
                      animate={inView ? { width: "100%" } : {}}
                      transition={{ duration: 0.7, delay: 1.3 }}
                    />
                  </span>
                ) : word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-white/80 text-[15px] font-normal leading-relaxed max-w-[580px] mb-10"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.7 }}
          >
            R-Zone Enterprises presently offers cargo services from{" "}
            <strong className="text-white font-semibold">Lagos to London</strong> and other UK cities —
            a remarkably affordable option to import from Nigeria to the UK.
            Weekly air freight and monthly sea freight services with state-by-state transparent pricing.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 mb-12"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.82 }}
          >
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200 shadow-2xl shadow-[#0818A8]/50"
              aria-label="Get a free Nigeria to UK importation quote"
            >
              Get a Free Quote
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
            <a
              href="https://wa.me/447915647119"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-emerald-500/35 bg-emerald-500/8 hover:bg-emerald-500/15 text-emerald-400 hover:text-emerald-300 text-[13px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-200"
              aria-label="WhatsApp R-Zone about importing from Nigeria"
            >
              <WhatsAppIcon size={14} /> WhatsApp Us
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="flex flex-wrap gap-x-10 gap-y-3 pt-8 border-t border-white/[0.07]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            {[
              { val: "Weekly",  label: "Air departures from Lagos" },
              { val: "5–8",     label: "Working days (air)"        },
              { val: "4–6 wks", label: "Sea freight transit"       },
              { val: "36",      label: "Nigerian states covered"   },
            ].map(({ val, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="text-white font-black text-[clamp(18px,2.2vw,24px)] leading-none tracking-[-0.02em]">{val}</span>
                <span className="text-white/80 text-[11px] font-medium tracking-[0.12em] uppercase">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#00061a] to-transparent pointer-events-none z-10" aria-hidden="true" />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE OVERVIEW
// ═══════════════════════════════════════════════════════════════════════════════
function ServiceOverview() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-white overflow-hidden"
      aria-labelledby="overview-h2"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <TagPill label="Import from Nigeria to UK — R-Zone Enterprises" dark={false} />
            </motion.div>

            <motion.h2
              id="overview-h2"
              variants={fadeUp}
              custom={0.05}
              className="font-black text-[clamp(26px,4.5vw,52px)] text-[#0b0f1a] leading-[0.92] tracking-[-0.028em] uppercase mb-5"
            >
              Shipping Services<br />
              <span className="relative inline-block text-[#0818A8]">
                from Nigeria to London.
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#0818A8]"
                  aria-hidden="true"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 0.55, delay: 0.55 }}
                />
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={0.15} className="text-gray-800 text-[14px] font-normal leading-relaxed mb-4">
              R-Zone Enterprises presently offers cargo services from Lagos to London and other cities,
              providing a remarkably affordable option to transport items to import from Nigeria to the UK.
              If this service has piqued your interest, feel free to contact us for a quote.
            </motion.p>
            <motion.p variants={fadeUp} custom={0.2} className="text-gray-800 text-[14px] font-normal leading-relaxed mb-8">
              While the price list below provides an idea of our standard rates, the final rate may vary
              due to daily exchange rate fluctuations. Please note that the Naira rate may also be subject to change.
            </motion.p>

            {/* Service option tiles */}
            <motion.div variants={fadeUp} custom={0.25} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9">
              {[
                {
                  icon: Plane, title: "Weekly Air Freight",
                  sub: "Lagos → London",
                  points: ["Minimum 20kg per shipment", "5–8 working days transit", "Door collection from Nigeria", "African foodstuffs accepted"],
                  accent: "#0818A8",
                },
                {
                  icon: Ship, title: "Monthly Sea Freight",
                  sub: "Lagos → UK Ports",
                  points: ["Minimum 2 bags per shipment", "4–6 weeks transit time", "Bulk & heavy cargo accepted", "Best value for large volumes"],
                  accent: "#1F51FF",
                },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="border border-gray-200 bg-gray-50 p-5 hover:border-[#0818A8]/40 hover:bg-white hover:shadow-md transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-400" style={{ background: `linear-gradient(to right, ${s.accent}, #1F51FF)` }} aria-hidden="true" />
                    <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ backgroundColor: `${s.accent}12` }} aria-hidden="true">
                      <Icon size={18} style={{ color: s.accent }} />
                    </div>
                    <p className="font-black text-[14px] text-gray-900 mb-0.5">{s.title}</p>
                    <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: s.accent }}>{s.sub}</p>
                    <ul className="space-y-1.5">
                      {s.points.map(p => (
                        <li key={p} className="flex items-center gap-2">
                          <Check size={9} style={{ color: s.accent }} aria-hidden="true" />
                          <span className="text-gray-800 text-[13px] font-normal">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={fadeUp} custom={0.32} className="flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
                aria-label="Get a free importation from Nigeria to UK quote"
              >
                Get a Free Quote
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a
                href="tel:+448007720864"
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-800 hover:border-[#0818A8] hover:text-[#0818A8] text-[13px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-200"
                aria-label="Call R-Zone UK: +44 800 772 0864"
              >
                <Phone size={13} aria-hidden="true" /> +44 800 772 0864
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — Lagos office card + image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.3 }}
          >
            <div className="relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop"
                alt="Cargo warehouse — R-Zone Nigeria to UK importation service"
                width={700}
                height={460}
                className="object-cover w-full aspect-[4/3]"
              />
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
              {/* Overlay badge */}
              <div className="absolute top-4 right-4 border border-white/20 bg-[#00061a]/85 backdrop-blur-md px-3.5 py-2">
                <p className="text-[11px] font-black tracking-[0.22em] uppercase text-[#1F51FF]">Nigeria → UK</p>
                <p className="text-white font-bold text-[13px]">Weekly Departures</p>
              </div>
            </div>

            {/* Lagos office info card */}
            <div className="border border-gray-200 bg-white p-6 relative overflow-hidden group hover:border-[#0818A8]/40 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#0818A8]/8 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <MapPin size={18} className="text-[#0818A8]" />
                </div>
                <div>
                  <p className="text-[11px] font-black tracking-[0.28em] uppercase text-[#0818A8] mb-1">Our Lagos Collection Office</p>
                  <p className="text-gray-900 font-semibold text-[14px] leading-snug mb-1">
                    150 Idimu Egbeda Road, by Seliat BRT Bus Stop,
                    Egbeda, Lagos, Nigeria
                  </p>
                  <p className="text-gray-800 text-[13px] font-normal">
                    Drop off your cargo directly — our team assesses, weighs and repacks for safe transit.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust line */}
            <div className="bg-[#0818A8] px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star size={11} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                <span className="text-white text-[13px] font-semibold">#1 Ranked UK–Nigeria Cargo on Google</span>
              </div>
              <span className="text-white/80 text-[11px] font-normal">100+ Five-Star Reviews</span>
            </div>
          </motion.div>
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
    <section
      ref={ref}
      className="relative bg-[#00061a] overflow-hidden"
      aria-labelledby="process-h2"
    >
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#0818A8]/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="How to Import from Nigeria to UK" dark />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionHeadline line1="How It" accent="Works." dark id="process-h2" />
          </motion.div>
          <motion.p
            className="text-white/80 text-[14px] font-normal mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          >
            Four steps from Lagos drop-off to UK doorstep delivery.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                className="relative border border-white/[0.07] bg-white/[0.03] p-7 group hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                <div className="flex items-start justify-between mb-5">
                  <span className="font-black leading-none text-white/[0.06] select-none" style={{ fontSize: "clamp(48px,6vw,72px)" }} aria-hidden="true">{step.n}</span>
                  <div className="w-11 h-11 bg-[#0818A8]/20 group-hover:bg-[#0818A8]/30 flex items-center justify-center flex-shrink-0 transition-colors" aria-hidden="true">
                    <Icon size={18} className="text-[#1F51FF]" />
                  </div>
                </div>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1F51FF] mb-2">{step.sub}</p>
                <h3 className="text-white font-black text-[15px] tracking-[-0.01em] mb-3">{step.title}</h3>
                <p className="text-white/80 text-[13px] font-normal leading-relaxed">{step.body}</p>
                {/* Connector line (desktop only) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute -right-[10px] top-1/2 -translate-y-1/2 z-20 w-5 h-px bg-gradient-to-r from-[#0818A8]/40 to-transparent" aria-hidden="true" />
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
// RATES TABLE
// ═══════════════════════════════════════════════════════════════════════════════
function RatesSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [search, setSearch] = useState("");

  const filtered = ALL_RATES.filter(r =>
    r.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      id="rates"
      ref={ref}
      className="relative bg-white overflow-hidden scroll-mt-20"
      aria-labelledby="rates-h2"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="Nigeria to UK Cargo Rates — All 36 States" dark={false} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionHeadline line1="Rate From Nigeria" accent="to UK." dark={false} id="rates-h2" />
          </motion.div>
          <motion.p
            className="text-gray-800 text-[14px] font-normal mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          >
            State-by-state door-to-door and collection rates per kg. While the list below provides an idea of our standard rates,
            the final rate may vary due to daily exchange rate fluctuations. The Naira rate is also subject to change.
          </motion.p>
        </div>

        {/* Exchange rate notice */}
        <motion.div
          className="flex items-start gap-3 border border-amber-200 bg-amber-50 px-5 py-4 mb-8"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Info size={14} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-amber-900 text-[13px] font-normal leading-relaxed">
            <strong className="font-semibold">Rate notice:</strong>{" "}
            All rates are per kg. Minimum weight: 20kg for Lagos, Ibadan and Akure; 30kg for all other states.
            Prices are indicative — the final confirmed rate may vary due to daily Naira exchange rate fluctuations.
            Contact us for an exact quote before booking.
          </p>
        </motion.div>

        {/* Search filter */}
        <motion.div
          className="relative max-w-sm mb-6"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Filter by state name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-300 focus:border-[#0818A8] text-gray-900 text-[13px] pl-4 pr-4 py-2.5 outline-none transition-all duration-200 bg-white"
            aria-label="Search Nigerian states"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Clear filter"
            >
              <X size={13} />
            </button>
          )}
        </motion.div>

        {/* DESKTOP TABLE */}
        <motion.div
          className="hidden md:block overflow-hidden border border-gray-200 mb-5"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }}
        >
          <table className="w-full" aria-label="Nigeria to UK importation rates by Nigerian state">
            <thead>
              <tr className="bg-[#0818A8]">
                {["Nigerian State", "Door-to-Door Rate (£/kg)", "Collection Rate (£/kg)", "Min. Weight"].map(h => (
                  <th key={h} scope="col" className="px-5 py-3.5 text-left text-[11px] font-bold tracking-[0.2em] uppercase text-white/80">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-gray-800 text-[13px] font-normal">
                    No states match &ldquo;{search}&rdquo;
                  </td>
                </tr>
              ) : filtered.map((row, i) => (
                <tr
                  key={row.state}
                  className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/70"} hover:bg-[#0818A8]/4 transition-colors`}
                >
                  <td className="px-5 py-3.5 font-semibold text-[13px] text-[#0b0f1a]">{row.state}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[#0818A8] font-black text-[16px]">£{row.door}</span>
                    <span className="text-gray-800 text-[12px] ml-1 font-normal">/kg</span>
                  </td>
                  <td className="px-5 py-3.5">
                    {row.col === "—" ? (
                      <span className="text-gray-400 font-normal text-[13px]">—</span>
                    ) : (
                      <>
                        <span className="font-bold text-[15px] text-gray-800">£{row.col}</span>
                        <span className="text-gray-800 text-[12px] ml-1 font-normal">/kg</span>
                      </>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 border border-gray-200 bg-gray-50 px-2.5 py-1 text-[12px] font-semibold text-gray-800">
                      {row.min}kg min
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-3 mb-5">
          {filtered.map((row, i) => (
            <motion.div
              key={row.state}
              className="border border-gray-200 bg-white p-4"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.5) }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-[16px] text-gray-900">{row.state}</span>
                <span className="inline-flex items-center border border-gray-200 bg-gray-50 px-2.5 py-1 text-[12px] font-semibold text-gray-800">{row.min}kg min</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-800 mb-0.5">Door-to-Door</p>
                  <p className="text-[#0818A8] font-black text-[18px]">£{row.door}<span className="text-gray-800 text-[12px] font-normal ml-0.5">/kg</span></p>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-800 mb-0.5">Collection Rate</p>
                  {row.col === "—" ? (
                    <p className="text-gray-400 font-normal text-[16px]">—</p>
                  ) : (
                    <p className="font-bold text-[17px] text-gray-800">£{row.col}<span className="text-[12px] font-normal ml-0.5">/kg</span></p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-800 text-[13px] font-normal text-center mb-10">
          * Rates are indicative. Final price confirmed at booking. Rates subject to change with Naira exchange rate fluctuations.
        </p>

        {/* CTA below table */}
        <motion.div
          className="border border-[#0818A8]/15 bg-[#0818A8]/4 p-6 md:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#0818A8] mb-1">Get a Confirmed Quote</p>
            <h3 className="text-gray-900 font-black text-[20px] tracking-[-0.01em] mb-1">Know your exact cost before shipping.</h3>
            <p className="text-gray-800 text-[13px] font-normal">Tell us your Nigerian state, weight and cargo type — we respond the same day.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
              aria-label="Get a Nigeria to UK importation quote"
            >
              Get a Quote <ArrowRight size={12} aria-hidden="true" />
            </Link>
            <a
              href="https://wa.me/447915647119"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-300 hover:border-emerald-500 text-gray-800 hover:text-emerald-600 text-[13px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-200"
              aria-label="WhatsApp R-Zone for a quote"
            >
              <WhatsAppIcon size={13} /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOODSTUFFS SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function FoodstuffsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="foodstuffs"
      ref={ref}
      className="relative bg-[#00061a] overflow-hidden scroll-mt-20"
      aria-labelledby="food-h2"
    >
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(31,81,255,0.1) 0%, transparent 65%)", transform: "translate(25%,-20%)" }} aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT — intro + warnings */}
          <div className="lg:col-span-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <TagPill label="African Foodstuffs — Accepted Items" dark />
              <h2
                id="food-h2"
                className="font-black text-[clamp(24px,4vw,44px)] text-white leading-[0.92] tracking-[-0.028em] uppercase mb-5"
              >
                What Can You{" "}
                <span className="relative inline-block text-[#1F51FF]">
                  Import?
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#1F51FF]"
                    aria-hidden="true"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : {}}
                    transition={{ duration: 0.55, delay: 0.5 }}
                  />
                </span>
              </h2>

              <p className="text-white/80 text-[14px] font-normal leading-relaxed mb-6">
                African foodstuffs are allowed into the UK either by our{" "}
                <strong className="text-white font-semibold">weekly air freight from Nigeria (minimum 20kg)</strong>{" "}
                or our{" "}
                <strong className="text-white font-semibold">monthly sea freight service from Nigeria (minimum 2 bags)</strong>.
              </p>

              {/* Service tiles */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: Plane, label: "Weekly Air Freight",  detail: "Lagos → London · Min 20kg · 5–8 working days", accent: "#1F51FF" },
                  { icon: Ship,  label: "Monthly Sea Freight", detail: "Lagos → UK Ports · Min 2 bags · 4–6 weeks",    accent: "#0818A8" },
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center gap-3 border border-white/[0.08] bg-white/[0.04] px-4 py-3.5">
                      <Icon size={14} style={{ color: s.accent }} aria-hidden="true" />
                      <div>
                        <p className="text-white font-semibold text-[13px]">{s.label}</p>
                        <p className="text-white/80 text-[12px] font-normal">{s.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Packing advisory */}
              <div className="border border-amber-400/30 bg-amber-400/8 p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-amber-400 font-black text-[11px] tracking-[0.2em] uppercase mb-2">Important Advisory</p>
                    <p className="text-white/80 text-[13px] font-normal leading-relaxed">
                      We strongly advise that items are{" "}
                      <strong className="text-white font-semibold">well packed before getting to our warehouse</strong>{" "}
                      for assessment and repacking. Clients are advised to follow recommended products as listed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Not permitted */}
              <div className="border border-red-500/20 bg-red-500/5 p-5">
                <div className="flex items-start gap-3">
                  <X size={14} className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-red-400 font-black text-[11px] tracking-[0.2em] uppercase mb-2">Not Permitted</p>
                    <ul className="space-y-1">
                      {[
                        "Bleaching creams",
                        "Chicken-flavoured Indomie",
                        "Chicken-flavoured Maggi",
                        "Liquid herbs",
                        "Firearms & controlled substances",
                        "UK-prohibited imports",
                      ].map(item => (
                        <li key={item} className="flex items-center gap-2">
                          <X size={8} className="text-red-400 flex-shrink-0" aria-hidden="true" />
                          <span className="text-white/80 text-[13px] font-normal">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — approved items grid */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <div className="border border-white/[0.08] bg-white/[0.03] overflow-hidden">
                <div className="h-[3px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                <div className="p-6 md:p-8">
                  <p className="text-[11px] font-black tracking-[0.35em] uppercase text-white/80 mb-7">
                    Approved Foodstuffs — Nigeria to UK Import List
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FOODSTUFFS.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 border border-white/[0.05] bg-white/[0.025] px-4 py-3 group hover:border-[#0818A8]/40 hover:bg-[#0818A8]/8 transition-all duration-200"
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.025 }}
                      >
                        <span
                          className="w-4 h-4 rounded-full bg-[#0818A8]/25 border border-[#0818A8]/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0818A8]/40 transition-colors"
                          aria-hidden="true"
                        >
                          <Check size={8} className="text-[#1F51FF]" />
                        </span>
                        <span className="text-white/80 text-[13px] font-normal leading-snug group-hover:text-white transition-colors">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Advisory banner */}
                  <motion.div
                    className="mt-8 border border-[#0818A8]/30 bg-[#0818A8]/15 px-5 py-4"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <div className="flex items-start gap-3">
                      <Shield size={14} className="text-[#1F51FF] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-white/80 text-[13px] font-normal leading-relaxed">
                        <strong className="text-white font-semibold uppercase tracking-[0.05em]">
                          We strongly advise that items are well packed before getting to our warehouse for assessment and repacking.
                          Clients are advised to follow recommended products as listed above.
                        </strong>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════════════════════
function FAQSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState(null);

  return (
    <section
      ref={ref}
      className="relative bg-white overflow-hidden"
      aria-labelledby="faq-h2"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left */}
          <div className="lg:col-span-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <TagPill label="Importation FAQs — Nigeria to UK" dark={false} />
              <h2
                id="faq-h2"
                className="font-black text-[clamp(24px,4vw,44px)] text-[#0b0f1a] leading-[0.92] tracking-[-0.028em] uppercase mb-4"
              >
                Common{" "}
                <span className="relative inline-block text-[#0818A8]">
                  Questions.
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#0818A8]"
                    aria-hidden="true"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : {}}
                    transition={{ duration: 0.55, delay: 0.5 }}
                  />
                </span>
              </h2>
              <p className="text-gray-800 text-[14px] font-normal leading-relaxed mb-6">
                Everything you need to know about importing goods from Nigeria to the UK with R-Zone Enterprises.
              </p>

              <div className="border border-[#0818A8]/15 bg-[#0818A8]/4 p-6">
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#0818A8] mb-3">Still need help?</p>
                <p className="text-gray-800 text-[13px] font-normal leading-relaxed mb-5">
                  Our UK team responds the same day. No bots, no call centres.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+448007720864"
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-[#0818A8] hover:text-[#0437F2] transition-colors"
                    aria-label="Call R-Zone UK"
                  >
                    <Phone size={12} aria-hidden="true" /> +44 (0) 800 772 0864
                  </a>
                  <a
                    href="https://wa.me/447915647119"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                    aria-label="WhatsApp R-Zone"
                  >
                    <WhatsAppIcon size={12} /> WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              <div className="border border-gray-200 overflow-hidden">
                <div className="h-[3px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                <dl>
                  {FAQS.map((item, i) => (
                    <div
                      key={i}
                      className="border-b border-gray-100 last:border-0"
                      itemScope
                      itemType="https://schema.org/Question"
                    >
                      <dt>
                        <button
                          onClick={() => setOpen(open === i ? null : i)}
                          className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left group hover:bg-gray-50 transition-colors"
                          aria-expanded={open === i}
                        >
                          <span
                            className={`text-[13.5px] font-semibold leading-snug transition-colors duration-150 ${
                              open === i ? "text-[#0818A8]" : "text-gray-800 group-hover:text-[#0818A8]"
                            }`}
                            itemProp="name"
                          >
                            {item.q}
                          </span>
                          <motion.div
                            animate={{ rotate: open === i ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          >
                            <ChevronDown size={15} className={open === i ? "text-[#0818A8]" : "text-gray-800"} />
                          </motion.div>
                        </button>
                      </dt>
                      <AnimatePresence>
                        {open === i && (
                          <motion.dd
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden border-t border-gray-100"
                            itemProp="acceptedAnswer"
                            itemScope
                            itemType="https://schema.org/Answer"
                          >
                            <p
                              className="text-gray-800 text-[13.5px] font-normal leading-relaxed px-6 py-4 pr-12"
                              itemProp="text"
                            >
                              {item.a}
                            </p>
                          </motion.dd>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FINAL CTA
// ═══════════════════════════════════════════════════════════════════════════════
function FinalCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#00061a] overflow-hidden"
      aria-label="Start importing from Nigeria to UK — get a free R-Zone Enterprises quote"
    >
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.28) 0%, transparent 70%)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <TagPill label="Start Importing from Nigeria to UK" dark />
            <h2 className="font-black text-[clamp(30px,5.5vw,62px)] text-white leading-[0.88] tracking-[-0.03em] uppercase mb-6">
              Ready to Import<br />
              <span className="text-[#1F51FF]">from Nigeria?</span>
            </h2>
            <p className="text-white/80 text-[15px] font-normal leading-relaxed max-w-lg mb-9">
              Weekly air freight and monthly sea freight from Lagos to London and across the UK.
              Transparent state-by-state pricing. The{" "}
              <strong className="text-white font-semibold">#1 ranked UK–Nigeria cargo company on Google</strong>.
              Same-day response, no hidden fees.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200 shadow-2xl shadow-[#0818A8]/40"
                aria-label="Get a free Nigeria to UK importation quote from R-Zone"
              >
                Get a Free Quote
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a
                href="tel:+448007720864"
                className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 text-white/80 hover:text-white text-[13px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-200"
                aria-label="Call R-Zone UK: +44 800 772 0864"
              >
                <Phone size={13} aria-hidden="true" /> +44 800 772 0864
              </a>
            </div>
            <div className="flex flex-wrap gap-5">
              {["Free Quote", "Same-Day Response", "All 36 Nigerian States", "Weekly Air Service", "#1 on Google"].map(t => (
                <span key={t} className="flex items-center gap-2 text-white/80 text-[13px] font-normal">
                  <CheckCircle size={11} className="text-[#1F51FF]" aria-hidden="true" />{t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — quick link grid */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {[
              { icon: Plane,     title: "Weekly Air",          detail: "5–8 working days",    href: "#",              accent: "#1F51FF" },
              { icon: Ship,      title: "Monthly Sea",         detail: "4–6 weeks transit",   href: "#",              accent: "#0818A8" },
              { icon: MapPin,    title: "Lagos Collection",    detail: "Egbeda office",        href: "/contact",       accent: "#1F51FF" },
              { icon: Package,   title: "Foodstuffs",          detail: "View approved items",  href: "#foodstuffs",    accent: "#0818A8" },
              { icon: Globe,     title: "All 36 States",       detail: "State-by-state rates", href: "#rates",         accent: "#1F51FF" },
              { icon: Shield,    title: "Customs Included",    detail: "HMRC UK clearance",   href: "/services",      accent: "#0818A8" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  className="group border border-white/[0.07] bg-white/[0.04] p-5 hover:border-white/[0.18] hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.4 + i * 0.07 }}
                  aria-label={item.title}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-400" style={{ backgroundColor: item.accent }} aria-hidden="true" />
                  <Icon size={16} style={{ color: item.accent }} className="mb-3" aria-hidden="true" />
                  <p className="text-white font-bold text-[13px] mb-0.5">{item.title}</p>
                  <p className="text-white/80 text-[12px] font-normal">{item.detail}</p>
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
export default function ImportationPageClient() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home",                     "item": "https://r-zoneenterprises.com"                         },
                  { "@type": "ListItem", "position": 2, "name": "Services",                 "item": "https://r-zoneenterprises.com/services"                 },
                  { "@type": "ListItem", "position": 3, "name": "Importation from Nigeria", "item": "https://r-zoneenterprises.com/importation-from-nigeria" },
                ],
              },
              {
                "@type": "Service",
                "name": "Importation from Nigeria to UK — Cargo Services Lagos to London",
                "description": "R-Zone Enterprises offers weekly air freight and monthly sea freight cargo services from Lagos, Nigeria to London and all UK cities. Affordable state-by-state rates from £4.80/kg. African foodstuffs accepted. Door-to-door service from all 36 Nigerian states. The highest-rated UK-to-Nigeria cargo company on Google.",
                "provider": {
                  "@type": "Organization",
                  "name": "R-Zone Enterprises",
                  "@id": "https://r-zoneenterprises.com/#organization",
                },
                "serviceType": "Import Freight — Nigeria to UK",
                "areaServed": [
                  { "@type": "Country", "name": "Nigeria" },
                  { "@type": "Country", "name": "United Kingdom" },
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Nigeria to UK Import Rates",
                  "itemListElement": [
                    { "@type": "Offer", "name": "Lagos to UK Air Freight",     "price": "4.80", "priceCurrency": "GBP", "unitText": "KGM", "description": "Weekly air freight Lagos to London. Min 20kg. 5–8 working days." },
                    { "@type": "Offer", "name": "Nigeria to UK Sea Freight",   "price": "3.00", "priceCurrency": "GBP", "unitText": "KGM", "description": "Monthly sea freight Lagos to UK. Min 2 bags. 4–6 weeks." },
                  ],
                },
              },
              {
                "@type": "FAQPage",
                "mainEntity": FAQS.map(f => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": { "@type": "Answer", "text": f.a },
                })),
              },
              {
                "@type": "HowTo",
                "name": "How to Import Goods from Nigeria to the UK — R-Zone Enterprises",
                "description": "Step-by-step guide to importing cargo from Nigeria to the UK using R-Zone Enterprises. Air freight and sea freight options from Lagos.",
                "step": PROCESS_STEPS.map((s, i) => ({
                  "@type": "HowToStep",
                  "position": i + 1,
                  "name": s.title,
                  "text": s.body,
                })),
              },
              {
                "@type": "WebPage",
                "url": "https://r-zoneenterprises.com/importation-from-nigeria",
                "name": "Import from Nigeria to UK — Cargo Services Lagos to London | R-Zone Enterprises",
                "description": "R-Zone Enterprises offers weekly air freight and monthly sea freight from Nigeria (Lagos) to London and all UK cities. Rates from £4.80/kg. African foodstuffs accepted. All 36 Nigerian states. The highest-rated UK–Nigeria cargo company on Google — 100+ five-star reviews.",
                "publisher": { "@id": "https://r-zoneenterprises.com/#organization" },
              },
            ],
          }),
        }}
      />

      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] w-full`}>
        <Hero />
        <ServiceOverview />
        <HowItWorks />
        <FoodstuffsSection />
        <FAQSection />
        <FinalCTA />
      </div>
    </>
  );
}