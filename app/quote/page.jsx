"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * R-Zone Enterprises — Quote Page (SEO-Optimised)
 * /quote
 *
 * ON-PAGE SEO SUMMARY
 * ─────────────────────────────────────────────────────────────────────────────
 * • Primary keyword : "shipping quote UK to Nigeria"
 * • Secondary       : "cargo quote Nigeria UK", "air freight quote Nigeria",
 *                     "sea freight quote UK Nigeria", "cargo Abuja Lagos"
 * • H1  → "Get a Free UK–Nigeria Shipping Quote"
 * • H2s → Step headings + FAQ section + Stats section
 * • JSON-LD: BreadcrumbList + WebPage + Service + FAQPage
 * • Trust claim: "#1 Highest-Rated UK–Nigeria Cargo on Google · 100+ Reviews"
 * • Sea freight = 4–6 weeks (non-negotiable)
 * • Air freight = 5–10 working days
 * • Internal links: /services, /track, /contact, /about, /privacy
 * • WhatsApp CTA: embedded in sidebar + contact strip
 * • FAQ section: 6 questions (Google PAA / featured snippet eligible)
 * • Stats block: linkable asset for backlinks / press citations
 *
 * ADD TO /quote/layout.tsx (or page.tsx metadata export):
 * export const metadata = {
 *   title: "Free UK–Nigeria Shipping Quote | R-Zone Enterprises",
 *   description:
 *     "Get a free cargo shipping quote from the #1 highest-rated UK-to-Nigeria cargo company on Google. Air freight from £5/kg · Sea freight from £3/kg · Same-day response. 100+ five-star reviews.",
 *   keywords: [
 *     "shipping quote UK to Nigeria","cargo quote Nigeria UK",
 *     "air freight quote Nigeria","sea freight quote UK Nigeria",
 *     "cargo Abuja","cargo Lagos","UK Nigeria cargo company",
 *   ],
 *   alternates: { canonical: "https://r-zoneenterprises.com/quote" },
 *   openGraph: {
 *     title: "Free UK–Nigeria Shipping Quote | R-Zone Enterprises",
 *     description:
 *       "The #1 highest-rated UK-to-Nigeria cargo company on Google. Get your free quote in 4 steps. Same-day response.",
 *     url: "https://r-zoneenterprises.com/quote",
 *     siteName: "R-Zone Enterprises",
 *   },
 * };
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Montserrat, Outfit } from "next/font/google";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Plane, Ship, Truck, Package, ArrowRight,
  ArrowLeft, ChevronRight, CheckCircle, User,
  Mail, Phone, MapPin, Weight, Ruler,
  Clock, Shield, Star, Info, AlertCircle,
  Loader2, Send, Building2, Hash,
  ChevronDown, Zap, Calendar,
  FileCheck, Warehouse, BarChart3,
  MessageSquare, Globe, Award, TrendingUp,
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

// ─── Constants ────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Service",   short: "Service"  },
  { id: 2, label: "Shipment",  short: "Shipment" },
  { id: 3, label: "Route",     short: "Route"    },
  { id: 4, label: "Your Info", short: "Contact"  },
  { id: 5, label: "Review",    short: "Review"   },
];

const SERVICE_OPTIONS = [
  {
    id: "air",
    label: "Air Freight",
    icon: Plane,
    tagline: "5–10 working days · UK to Nigeria",
    rate: "from £5/kg",
    accent: "#0818A8",
    popular: false,
    seoDesc: "Fast air cargo from the UK to Nigeria. Ideal for time-sensitive shipments — documents, electronics, and commercial merchandise delivered in 5–10 working days.",
  },
  {
    id: "sea",
    label: "Sea Freight",
    icon: Ship,
    tagline: "4–6 weeks · Weekly sailings",
    rate: "from £3/kg",
    accent: "#1F51FF",
    popular: true,
    seoDesc: "Most cost-effective UK–Nigeria shipping for larger or heavier cargo. Weekly sailings, 4–6 weeks transit. Ideal for bulk goods, household items, and general cargo.",
  },
  {
    id: "door",
    label: "Door to Door",
    icon: Truck,
    tagline: "Collection & delivery to your address",
    rate: "from £6/kg",
    accent: "#0437F2",
    popular: false,
    seoDesc: "Full door-to-door cargo service from any UK address to any Nigerian state. We handle collection, customs clearance, and final-mile delivery.",
  },
  {
    id: "import",
    label: "Import from Nigeria",
    icon: Package,
    tagline: "Nigeria → UK · All 36 states",
    rate: "from £5/kg",
    accent: "#0818A8",
    popular: false,
    seoDesc: "Reliable cargo import service from Nigeria to the UK. We collect from all 36 Nigerian states and deliver to any UK address.",
  },
  {
    id: "customs",
    label: "Customs Clearance",
    icon: FileCheck,
    tagline: "UK & Nigerian customs handled for you",
    rate: "POA",
    accent: "#1F51FF",
    popular: false,
    seoDesc: "Expert customs clearance for UK–Nigeria shipments. IATA-certified team handles all documentation, duties, and clearance on both sides.",
  },
  {
    id: "warehouse",
    label: "Warehousing",
    icon: Warehouse,
    tagline: "Secure UK & Nigeria storage",
    rate: "POA",
    accent: "#0437F2",
    popular: false,
    seoDesc: "Secure short- and long-term warehousing available at our Upminster (UK) and Nigerian facilities. Ideal for businesses managing stock between both countries.",
  },
];

const DIRECTIONS = [
  { id: "uk-ng", label: "UK → Nigeria", from: "United Kingdom", to: "Nigeria",        icon: "🇬🇧→🇳🇬" },
  { id: "ng-uk", label: "Nigeria → UK", from: "Nigeria",        to: "United Kingdom", icon: "🇳🇬→🇬🇧" },
];

const UK_CITIES = [
  "London", "Manchester", "Birmingham", "Leeds", "Liverpool",
  "Sheffield", "Bristol", "Glasgow", "Leicester", "Edinburgh",
  "Cardiff", "Coventry", "Bradford", "Wolverhampton", "Nottingham",
  "Other UK location",
];

const NG_STATES = [
  "Lagos", "Abuja (FCT)", "Rivers", "Kano", "Oyo", "Delta",
  "Anambra", "Enugu", "Imo", "Edo", "Ogun", "Kwara", "Osun",
  "Ondo", "Ekiti", "Abia", "Cross River", "Akwa Ibom", "Bayelsa",
  "Benue", "Kaduna", "Katsina", "Kebbi", "Kogi", "Nasarawa",
  "Niger", "Plateau", "Sokoto", "Taraba", "Zamfara", "Adamawa",
  "Bauchi", "Borno", "Gombe", "Jigawa", "Yobe",
];

const CARGO_TYPES = [
  "General Cargo / Mixed", "Clothing & Textiles", "Electronics",
  "Foodstuffs / Perishables", "Household Goods", "Documents & Parcels",
  "Machinery & Equipment", "Vehicles & Spare Parts", "Building Materials",
  "Medical Supplies", "Personal Effects", "Commercial Merchandise",
];

const TRUST_ITEMS = [
  { icon: Award,        text: "#1 Ranked UK–Nigeria Cargo on Google" },
  { icon: Star,         text: "100+ organically earned five-star reviews" },
  { icon: CheckCircle,  text: "Free quote — no obligation, no pressure" },
  { icon: Clock,        text: "Same-day response Mon–Fri" },
  { icon: Shield,       text: "Fully insured cargo, every shipment" },
  { icon: Phone,        text: "UK-based human team — no call centres" },
  { icon: Globe,        text: "Delivery to all 36 Nigerian states" },
  { icon: TrendingUp,   text: "12+ years trusted by thousands of customers" },
];

// ─── FAQ data — Google PAA / featured snippet eligible ────────────────────────
const FAQ_ITEMS = [
  {
    q: "How long does sea freight from the UK to Nigeria take?",
    a: "Sea freight from the UK to Nigeria typically takes 4–6 weeks from the date of dispatch. R-Zone Enterprises operates weekly sailings, so your cargo joins the next available vessel. This is the most cost-effective method for large or heavy shipments.",
  },
  {
    q: "How long does air freight from the UK to Nigeria take?",
    a: "Air freight from the UK to Nigeria takes 5–10 working days depending on destination state and customs clearance speed. R-Zone's IATA-certified team handles all documentation to minimise delays.",
  },
  {
    q: "How much does it cost to ship cargo from the UK to Nigeria?",
    a: "Air freight starts from £5 per kg and sea freight from £3 per kg. The final price depends on your cargo weight (actual or volumetric, whichever is greater), collection location, and delivery state. Use our free quote form above for a same-day personalised price.",
  },
  {
    q: "Do you ship to all Nigerian states including Abuja and Lagos?",
    a: "Yes. R-Zone Enterprises delivers to all 36 Nigerian states plus the FCT (Abuja). Whether your cargo is destined for Lagos, Abuja, Rivers, Kano, or any other state, our network covers it.",
  },
  {
    q: "What items are prohibited on UK–Nigeria cargo shipments?",
    a: "Prohibited items include weapons, drugs, counterfeit goods, hazardous chemicals, and certain perishables without correct documentation. See our full restricted items list on our Terms & Conditions page, or ask our team during the quote process.",
  },
  {
    q: "Why is R-Zone the best cargo company for UK–Nigeria shipping?",
    a: "R-Zone Enterprises is the highest-rated UK-to-Nigeria cargo company on Google — with 100+ five-star reviews organically earned over 12+ years. We offer a UK-based human team, full customs clearance, real-time tracking, and door-to-door delivery across all Nigerian states.",
  },
];

// ─── Backlink-magnet stats ─────────────────────────────────────────────────────
const STATS = [
  { value: "100+",   label: "Five-Star Google Reviews",    note: "Highest-rated UK–Nigeria cargo company on Google" },
  { value: "12+",    label: "Years in Operation",          note: "Trusted since our founding" },
  { value: "36",     label: "Nigerian States Covered",     note: "Including Abuja FCT, Lagos, Rivers, Kano" },
  { value: "£3/kg",  label: "Sea Freight Starting Rate",   note: "Weekly sailings, 4–6 weeks transit" },
  { value: "5 days", label: "Fastest Air Freight",         note: "UK to Nigeria, subject to customs" },
  { value: "100%",   label: "Customs Clearance Handled",   note: "UK and Nigerian sides, fully managed" },
];

// ─── Rate estimate helper ─────────────────────────────────────────────────────
function estimateRate(service, weightKg) {
  const kg = parseFloat(weightKg) || 0;
  if (kg === 0) return null;
  const airRates = [
    { max: 10,       rate: 7.50 }, { max: 25,  rate: 6.80 },
    { max: 50,       rate: 6.20 }, { max: 100, rate: 5.80 },
    { max: 250,      rate: 5.40 }, { max: Infinity, rate: 5.00 },
  ];
  const seaRates = [
    { max: 50,       rate: 4.50 }, { max: 100,  rate: 4.00 },
    { max: 250,      rate: 3.60 }, { max: 500,  rate: 3.20 },
    { max: 1000,     rate: 3.00 }, { max: Infinity, rate: null },
  ];
  if (service === "air" || service === "door") {
    const band = airRates.find(b => kg <= b.max);
    return band ? { low: (kg * band.rate).toFixed(0), high: (kg * band.rate * 1.12).toFixed(0), unit: "£", note: "Air freight estimate" } : null;
  }
  if (service === "sea" || service === "import") {
    const band = seaRates.find(b => kg <= b.max);
    if (!band || !band.rate) return { poa: true };
    return { low: (kg * band.rate).toFixed(0), high: (kg * band.rate * 1.1).toFixed(0), unit: "£", note: "Sea freight estimate" };
  }
  return { poa: true };
}

// ─── Animations ───────────────────────────────────────────────────────────────
const stepVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -32 : 32, transition: { duration: 0.25 } }),
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};

// ─── Shared UI primitives ─────────────────────────────────────────────────────
const labelClass = "block text-[13px] font-bold tracking-[0.2em] uppercase text-white/80 mb-2";

const inputClass = (err) =>
  `w-full bg-white/[0.06] border text-white text-[13.5px] font-normal placeholder-white/60
   px-4 py-3.5 outline-none transition-all duration-200 rounded-sm
   focus:bg-white/[0.09] focus:border-[#1F51FF]/60 focus:ring-1 focus:ring-[#1F51FF]/20
   ${err ? "border-red-400/50 bg-red-400/5" : "border-white/[0.1] hover:border-white/[0.2]"}`;

const selectClass = (err) =>
  `w-full bg-[#0d0d22] border text-white text-[13.5px] font-normal
   px-4 py-3.5 outline-none transition-all duration-200 rounded-sm appearance-none cursor-pointer
   focus:border-[#1F51FF]/60 focus:ring-1 focus:ring-[#1F51FF]/20
   ${err ? "border-red-400/50" : "border-white/[0.1] hover:border-white/[0.2]"}`;

function FieldError({ msg, id }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-red-400 text-[13px] mt-1.5 font-normal">
      <AlertCircle size={10} aria-hidden="true" />{msg}
    </p>
  );
}

function TagPill({ label }) {
  return (
    <div className="inline-flex items-center gap-2.5 border border-[#1F51FF]/30 bg-[#0818A8]/14 px-4 py-1.5 rounded-full mb-5">
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]"
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      />
      <span className="text-[#1F51FF] text-[13px] font-bold tracking-[0.28em] uppercase">{label}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP INDICATOR
// ═══════════════════════════════════════════════════════════════════════════════
function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-8" role="list" aria-label="Quote form progress">
      {STEPS.map((step, i) => {
        const done   = step.id < current;
        const active = step.id === current;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none" role="listitem">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-black border-2 transition-all duration-300 ${
                  done || active
                    ? "border-[#1F51FF] bg-[#0818A8]"
                    : "border-white/[0.12] bg-white/[0.04]"
                }`}
                animate={active ? { boxShadow: ["0 0 0 0 rgba(31,81,255,0)", "0 0 0 8px rgba(31,81,255,0.15)", "0 0 0 0 rgba(31,81,255,0)"] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                aria-current={active ? "step" : undefined}
              >
                {done
                  ? <CheckCircle size={14} className="text-white" aria-hidden="true" />
                  : <span className={active ? "text-white" : "text-white/80"}>{step.id}</span>
                }
              </motion.div>
              <span className={`text-[13px] font-semibold tracking-[0.08em] hidden sm:block whitespace-nowrap ${
                active ? "text-white" : done ? "text-white/80" : "text-white/80"
              }`}>
                {step.short}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 transition-all duration-500 ${done ? "bg-[#1F51FF]/50" : "bg-white/[0.08]"}`}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LIVE ESTIMATE SIDEBAR
// ═══════════════════════════════════════════════════════════════════════════════
function LiveEstimateSidebar({ form }) {
  const est             = estimateRate(form.service, form.weight);
  const selectedService = SERVICE_OPTIONS.find(s => s.id === form.service);

  return (
    <div className="sticky top-[108px] space-y-4">

      {/* Estimate card */}
      <div className="border border-white/[0.09] bg-white/[0.04] overflow-hidden">
        <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
        <div className="p-5">
          <p className="text-[13px] font-bold tracking-[0.28em] uppercase text-white/80 mb-4">Live Estimate</p>

          <AnimatePresence mode="wait">
            {!form.service && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-4">
                <div className="w-10 h-10 bg-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-2" aria-hidden="true">
                  <BarChart3 size={16} className="text-white/80" />
                </div>
                <p className="text-white/80 text-[13px] font-normal">Select a service to see an instant estimate</p>
              </motion.div>
            )}

            {form.service && !form.weight && (
              <motion.div key="no-weight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-4">
                <div className="w-10 h-10 bg-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-2" aria-hidden="true">
                  <Weight size={16} className="text-white/80" />
                </div>
                <p className="text-white/80 text-[13px] font-normal">Enter cargo weight for a price estimate</p>
              </motion.div>
            )}

            {form.service && form.weight && est && !est.poa && (
              <motion.div key="estimate" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="text-white/80 text-[13px] font-normal mb-1">{est.note}</p>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-[#1F51FF] font-black text-[28px] leading-none tracking-[-0.02em]">{est.unit}{est.low}</span>
                  <span className="text-white/80 text-[13px]">–</span>
                  <span className="text-white/80 font-bold text-[18px]">{est.unit}{est.high}</span>
                </div>
                <p className="text-white/80 text-[13px] font-normal">Based on {form.weight}kg · Final price confirmed at booking</p>
                <div className="mt-4 pt-4 border-t border-white/[0.07]">
                  <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-white/80 mb-2">Estimate includes</p>
                  {["Customs clearance (UK & Nigeria)", "Real-time shipment tracking", "UK-based support team"].map(item => (
                    <div key={item} className="flex items-center gap-2 mb-1.5">
                      <CheckCircle size={9} className="text-[#1F51FF]" aria-hidden="true" />
                      <span className="text-white/80 text-[13px] font-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {form.service && form.weight && est?.poa && (
              <motion.div key="poa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-2">
                <p className="text-white font-black text-[18px] mb-1">Price on Request</p>
                <p className="text-white/80 text-[13px] font-normal">Our team will provide a precise quote today</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Selected service summary */}
      {selectedService && (
        <motion.div
          key={selectedService.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-white/[0.08] bg-white/[0.03] p-5"
        >
          <p className="text-[13px] font-bold tracking-[0.25em] uppercase text-white/80 mb-3">Selected Service</p>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${selectedService.accent}20` }}
              aria-hidden="true"
            >
              <selectedService.icon size={13} style={{ color: selectedService.accent }} />
            </div>
            <div>
              <p className="text-white font-semibold text-[13px]">{selectedService.label}</p>
              <p className="text-white/80 text-[13px] font-normal">{selectedService.tagline}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/[0.07] pt-3">
            <span className="text-white/80 text-[13px] font-normal">Starting rate</span>
            <span className="text-[#1F51FF] font-black text-[14px]">{selectedService.rate}</span>
          </div>
        </motion.div>
      )}

      {/* Route summary */}
      {(form.fromCity || form.toState) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-white/[0.08] bg-white/[0.03] p-5"
        >
          <p className="text-[13px] font-bold tracking-[0.25em] uppercase text-white/80 mb-3">Your Route</p>
          <div className="flex items-center gap-2">
            <div className="text-center">
              <p className="text-[18px] leading-none mb-0.5" aria-hidden="true">🇬🇧</p>
              <p className="text-white/80 text-[13px] font-medium">{form.fromCity || "UK"}</p>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="h-px w-full bg-gradient-to-r from-[#0818A8]/40 to-[#1F51FF]/40 relative" aria-hidden="true">
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1F51FF]"
                  animate={{ x: ["-50%", "calc(100% + 50%)", "-50%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
              </div>
              <span className="text-[13px] text-white/80 font-normal mt-1">
                {form.service === "sea" ? "~4–6 weeks" : "~5–10 working days"}
              </span>
            </div>
            <div className="text-center">
              <p className="text-[18px] leading-none mb-0.5" aria-hidden="true">🇳🇬</p>
              <p className="text-white/80 text-[13px] font-medium">{form.toState || "Nigeria"}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/448007720864?text=Hello%2C%20I%27d%20like%20a%20shipping%20quote%20for%20UK%20to%20Nigeria%20cargo."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 border border-[#25D366]/30 bg-[#25D366]/08 hover:bg-[#25D366]/14 p-4 transition-all duration-200 group"
        aria-label="Chat with R-Zone on WhatsApp for a shipping quote"
      >
        <div className="w-8 h-8 bg-[#25D366]/20 rounded-sm flex items-center justify-center flex-shrink-0">
          <MessageSquare size={14} className="text-[#25D366]" aria-hidden="true" />
        </div>
        <div>
          <p className="text-white font-bold text-[13px] group-hover:text-[#25D366] transition-colors">Chat on WhatsApp</p>
          <p className="text-white/80 text-[13px] font-normal">Fastest way to get a quote</p>
        </div>
        <ChevronRight size={13} className="text-white/80 ml-auto group-hover:text-[#25D366] transition-colors" aria-hidden="true" />
      </a>

      {/* Trust block */}
      <div className="border border-white/[0.07] bg-white/[0.02] p-5">
        <p className="text-[13px] font-bold tracking-[0.25em] uppercase text-white/80 mb-3">Why R-Zone?</p>
        <div className="space-y-2">
          {TRUST_ITEMS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-2.5">
              <Icon size={11} className="text-[#1F51FF] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-white/80 text-[13px] font-normal leading-snug">{text}</span>
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-[#1F51FF] text-[13px] font-bold mt-4 hover:text-white transition-colors"
          aria-label="Learn more about R-Zone Enterprises"
        >
          About R-Zone <ChevronRight size={11} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 1 — SERVICE
// ═══════════════════════════════════════════════════════════════════════════════
function Step1({ form, setForm, errors }) {
  return (
    <div>
      <h2 className="text-white font-black text-[22px] tracking-[-0.015em] mb-2">
        What shipping service do you need?
      </h2>
      <p className="text-white/80 text-[13px] font-normal mb-7">
        Choose from air freight, sea freight, door-to-door, or import services between the UK and Nigeria.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3" role="radiogroup" aria-label="Select shipping service type" aria-required="true">
        {SERVICE_OPTIONS.map((opt) => {
          const Icon    = opt.icon;
          const checked = form.service === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={checked}
              aria-describedby={`svc-desc-${opt.id}`}
              onClick={() => setForm(f => ({ ...f, service: opt.id }))}
              className={`relative text-left border p-5 transition-all duration-200 group ${
                checked
                  ? "border-[#1F51FF]/60 bg-[#0818A8]/20"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {opt.popular && (
                <div className="absolute -top-px left-4 bg-[#0818A8] px-2.5 py-0.5 text-[13px] font-bold tracking-[0.18em] uppercase text-white">
                  Most Popular
                </div>
              )}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${checked ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
                style={{ background: `linear-gradient(to right, ${opt.accent}, #1F51FF)` }}
                aria-hidden="true"
              />
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center mb-3.5"
                style={{ backgroundColor: `${opt.accent}${checked ? "30" : "18"}` }}
                aria-hidden="true"
              >
                <Icon size={15} style={{ color: checked ? "#ffffff" : opt.accent }} />
              </div>
              <p className={`font-bold text-[14px] leading-tight mb-0.5 ${checked ? "text-white" : "text-white/80"}`}>
                {opt.label}
              </p>
              <p
                id={`svc-desc-${opt.id}`}
                className={`text-[13px] font-normal mb-3 ${checked ? "text-white/80" : "text-white/80"}`}
              >
                {opt.tagline}
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-[13px] font-bold ${checked ? "text-[#1F51FF]" : "text-white/80"}`}>
                  {opt.rate}
                </span>
                {checked && <CheckCircle size={14} className="text-[#1F51FF]" aria-hidden="true" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {errors.service && (
        <p role="alert" className="flex items-center gap-1.5 text-red-400 text-[13px] mt-3">
          <AlertCircle size={11} aria-hidden="true" />{errors.service}
        </p>
      )}

      {/* Internal link — authority signal */}
      <p className="text-white/80 text-[13px] font-normal mt-5">
        Not sure which service is right for you?{" "}
        <Link href="/services" className="text-[#1F51FF] hover:text-white underline underline-offset-2 font-semibold transition-colors">
          Compare all UK–Nigeria shipping services →
        </Link>
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 2 — SHIPMENT DETAILS
// ═══════════════════════════════════════════════════════════════════════════════
function Step2({ form, setForm, errors, touched, onBlur }) {
  return (
    <div>
      <h2 className="text-white font-black text-[22px] tracking-[-0.015em] mb-2">Tell us about your cargo</h2>
      <p className="text-white/80 text-[13px] font-normal mb-7">
        Approximate weight and dimensions let us generate the most accurate UK–Nigeria shipping estimate.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

        {/* Cargo type */}
        <div className="sm:col-span-2">
          <label htmlFor="cargo-type" className={labelClass}>Cargo Type *</label>
          <div className="relative">
            <Package size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none z-10" aria-hidden="true" />
            <ChevronDown size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <select
              id="cargo-type"
              value={form.cargoType}
              onChange={e => setForm(f => ({ ...f, cargoType: e.target.value }))}
              onBlur={() => onBlur("cargoType")}
              className={`${selectClass(errors.cargoType && touched.cargoType)} pl-9 pr-8`}
              aria-required="true"
              aria-invalid={!!(errors.cargoType && touched.cargoType)}
              aria-describedby={errors.cargoType && touched.cargoType ? "cargoType-err" : undefined}
            >
              <option value="" disabled style={{ backgroundColor: "#0d0d22" }}>Select cargo type…</option>
              {CARGO_TYPES.map(t => <option key={t} value={t} style={{ backgroundColor: "#0d0d22" }}>{t}</option>)}
            </select>
          </div>
          <FieldError msg={touched.cargoType && errors.cargoType} id="cargoType-err" />
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className={labelClass}>
            Estimated Weight (kg) *{" "}
            <span className="text-[13px] text-white/80 normal-case font-normal tracking-normal">— actual or volumetric</span>
          </label>
          <div className="relative">
            <Weight size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <input
              id="weight"
              type="number"
              min="0.1"
              step="0.1"
              placeholder="e.g. 25"
              value={form.weight}
              onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
              onBlur={() => onBlur("weight")}
              className={`${inputClass(errors.weight && touched.weight)} pl-9`}
              aria-required="true"
              aria-invalid={!!(errors.weight && touched.weight)}
              aria-describedby={errors.weight && touched.weight ? "weight-err" : undefined}
            />
          </div>
          <FieldError msg={touched.weight && errors.weight} id="weight-err" />
        </div>

        {/* Number of items */}
        <div>
          <label htmlFor="items" className={labelClass}>Number of Items / Boxes</label>
          <div className="relative">
            <Hash size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <input
              id="items"
              type="number"
              min="1"
              placeholder="e.g. 4"
              value={form.items}
              onChange={e => setForm(f => ({ ...f, items: e.target.value }))}
              className={`${inputClass(false)} pl-9`}
            />
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <label htmlFor="dims" className={labelClass}>
            Approximate Dimensions{" "}
            <span className="text-white/80 normal-case font-normal tracking-normal">(optional)</span>
          </label>
          <div className="relative">
            <Ruler size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <input
              id="dims"
              type="text"
              placeholder="L × W × H in cm"
              value={form.dimensions}
              onChange={e => setForm(f => ({ ...f, dimensions: e.target.value }))}
              className={`${inputClass(false)} pl-9`}
            />
          </div>
        </div>

        {/* Value */}
        <div>
          <label htmlFor="value" className={labelClass}>
            Declared Value (£){" "}
            <span className="text-white/80 normal-case font-normal tracking-normal">(optional — for cargo insurance)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 text-[13px] font-normal pointer-events-none">£</span>
            <input
              id="value"
              type="number"
              min="0"
              placeholder="e.g. 500"
              value={form.cargoValue}
              onChange={e => setForm(f => ({ ...f, cargoValue: e.target.value }))}
              className={`${inputClass(false)} pl-8`}
            />
          </div>
        </div>
      </div>

      {/* Special notes */}
      <div>
        <label htmlFor="notes" className={labelClass}>
          Special Requirements{" "}
          <span className="text-white/80 normal-case font-normal tracking-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Fragile items, hazardous goods, temperature-sensitive cargo, urgency, special packaging…"
          value={form.notes}
          onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
          className={`${inputClass(false)} resize-none`}
        />
      </div>

      {/* Volumetric note — informational, also useful for SEO content */}
      <div className="mt-4 flex items-start gap-2.5 border border-[#1F51FF]/15 bg-[#0818A8]/8 px-4 py-3">
        <Info size={12} className="text-[#1F51FF] flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-white/80 text-[13px] font-normal leading-snug">
          <strong className="text-white font-medium">Volumetric weight</strong> = (L×W×H cm) ÷ 5,000 for air freight / ÷ 1,000 for sea freight.
          We charge whichever is greater — actual or volumetric weight.
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 3 — ROUTE
// ═══════════════════════════════════════════════════════════════════════════════
function Step3({ form, setForm, errors, touched, onBlur }) {
  return (
    <div>
      <h2 className="text-white font-black text-[22px] tracking-[-0.015em] mb-2">
        Where is your cargo going?
      </h2>
      <p className="text-white/80 text-[13px] font-normal mb-7">
        We ship to all 36 Nigerian states — including Abuja (FCT), Lagos, Rivers, Kano, and more. Collection from across the UK.
      </p>

      {/* Direction */}
      <div className="mb-6">
        <label className={labelClass}>Shipping Direction *</label>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Shipping direction">
          {DIRECTIONS.map(d => {
            const checked = form.direction === d.id;
            return (
              <button
                key={d.id}
                type="button"
                role="radio"
                aria-checked={checked}
                onClick={() => setForm(f => ({ ...f, direction: d.id }))}
                className={`flex items-center gap-3 border p-4 transition-all duration-200 ${
                  checked
                    ? "border-[#1F51FF]/60 bg-[#0818A8]/20"
                    : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]"
                }`}
              >
                <span className="text-[24px] leading-none flex-shrink-0" aria-hidden="true">{d.icon}</span>
                <div className="text-left">
                  <p className={`font-bold text-[13.5px] ${checked ? "text-white" : "text-white/80"}`}>{d.label}</p>
                  <p className="text-white/80 text-[13px] font-normal">{d.from} → {d.to}</p>
                </div>
                {checked && <CheckCircle size={14} className="text-[#1F51FF] ml-auto flex-shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

        {/* From city */}
        <div>
          <label htmlFor="from-city" className={labelClass}>
            {form.direction === "ng-uk" ? "Nigeria State (Collection)" : "UK Collection City"} *
          </label>
          <div className="relative">
            <MapPin size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none z-10" aria-hidden="true" />
            <ChevronDown size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <select
              id="from-city"
              value={form.fromCity}
              onChange={e => setForm(f => ({ ...f, fromCity: e.target.value }))}
              onBlur={() => onBlur("fromCity")}
              className={`${selectClass(errors.fromCity && touched.fromCity)} pl-9 pr-8`}
              aria-required="true"
              aria-invalid={!!(errors.fromCity && touched.fromCity)}
              aria-describedby={errors.fromCity && touched.fromCity ? "fromCity-err" : undefined}
            >
              <option value="" disabled style={{ backgroundColor: "#0d0d22" }}>
                {form.direction === "ng-uk" ? "Select Nigerian state…" : "Select UK city…"}
              </option>
              {(form.direction === "ng-uk" ? NG_STATES : UK_CITIES).map(c => (
                <option key={c} value={c} style={{ backgroundColor: "#0d0d22" }}>{c}</option>
              ))}
            </select>
          </div>
          <FieldError msg={touched.fromCity && errors.fromCity} id="fromCity-err" />
        </div>

        {/* To state */}
        <div>
          <label htmlFor="to-state" className={labelClass}>
            {form.direction === "ng-uk" ? "UK Delivery City" : "Nigeria Delivery State"} *
          </label>
          <div className="relative">
            <MapPin size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none z-10" aria-hidden="true" />
            <ChevronDown size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <select
              id="to-state"
              value={form.toState}
              onChange={e => setForm(f => ({ ...f, toState: e.target.value }))}
              onBlur={() => onBlur("toState")}
              className={`${selectClass(errors.toState && touched.toState)} pl-9 pr-8`}
              aria-required="true"
              aria-invalid={!!(errors.toState && touched.toState)}
              aria-describedby={errors.toState && touched.toState ? "toState-err" : undefined}
            >
              <option value="" disabled style={{ backgroundColor: "#0d0d22" }}>
                {form.direction === "ng-uk" ? "Select UK city…" : "Select Nigerian state…"}
              </option>
              {(form.direction === "ng-uk" ? UK_CITIES : NG_STATES).map(s => (
                <option key={s} value={s} style={{ backgroundColor: "#0d0d22" }}>{s}</option>
              ))}
            </select>
          </div>
          <FieldError msg={touched.toState && errors.toState} id="toState-err" />
        </div>

        {/* Collection method */}
        <div>
          <label htmlFor="collection" className={labelClass}>Collection Method</label>
          <div className="relative">
            <Truck size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none z-10" aria-hidden="true" />
            <ChevronDown size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <select
              id="collection"
              value={form.collection}
              onChange={e => setForm(f => ({ ...f, collection: e.target.value }))}
              className={`${selectClass(false)} pl-9 pr-8`}
            >
              <option value="" style={{ backgroundColor: "#0d0d22" }}>Not sure yet</option>
              <option value="door"     style={{ backgroundColor: "#0d0d22" }}>Door collection — we come to you anywhere in the UK</option>
              <option value="drop-off" style={{ backgroundColor: "#0d0d22" }}>Drop-off at Upminster warehouse (Essex)</option>
              <option value="discuss"  style={{ backgroundColor: "#0d0d22" }}>Discuss with our team</option>
            </select>
          </div>
        </div>

        {/* Target date */}
        <div>
          <label htmlFor="target-date" className={labelClass}>
            Target Dispatch Date{" "}
            <span className="text-white/80 normal-case font-normal tracking-normal">(optional)</span>
          </label>
          <div className="relative">
            <Calendar size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <input
              id="target-date"
              type="date"
              value={form.targetDate}
              onChange={e => setForm(f => ({ ...f, targetDate: e.target.value }))}
              className={`${inputClass(false)} pl-9`}
              style={{ colorScheme: "dark" }}
            />
          </div>
        </div>
      </div>

      {/* Delivery address */}
      <div>
        <label htmlFor="delivery-address" className={labelClass}>
          Delivery Address{" "}
          <span className="text-white/80 normal-case font-normal tracking-normal">(optional — helps us finalise your quote)</span>
        </label>
        <textarea
          id="delivery-address"
          rows={2}
          placeholder="Full street address, area, city, state…"
          value={form.deliveryAddress}
          onChange={e => setForm(f => ({ ...f, deliveryAddress: e.target.value }))}
          className={`${inputClass(false)} resize-none`}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 4 — CONTACT INFO
// ═══════════════════════════════════════════════════════════════════════════════
function Step4({ form, setForm, errors, touched, onBlur }) {
  return (
    <div>
      <h2 className="text-white font-black text-[22px] tracking-[-0.015em] mb-2">Your contact details</h2>
      <p className="text-white/80 text-[13px] font-normal mb-7">
        We&apos;ll send your personalised UK–Nigeria cargo quote to the details below within the same business day.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

        {/* First name */}
        <div>
          <label htmlFor="fname" className={labelClass}>First Name *</label>
          <div className="relative">
            <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <input
              id="fname"
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              value={form.firstName}
              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
              onBlur={() => onBlur("firstName")}
              className={`${inputClass(errors.firstName && touched.firstName)} pl-9`}
              aria-required="true"
              aria-invalid={!!(errors.firstName && touched.firstName)}
              aria-describedby={errors.firstName && touched.firstName ? "fname-err" : undefined}
            />
          </div>
          <FieldError msg={touched.firstName && errors.firstName} id="fname-err" />
        </div>

        {/* Last name */}
        <div>
          <label htmlFor="lname" className={labelClass}>Last Name *</label>
          <div className="relative">
            <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <input
              id="lname"
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              value={form.lastName}
              onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
              onBlur={() => onBlur("lastName")}
              className={`${inputClass(errors.lastName && touched.lastName)} pl-9`}
              aria-required="true"
              aria-invalid={!!(errors.lastName && touched.lastName)}
              aria-describedby={errors.lastName && touched.lastName ? "lname-err" : undefined}
            />
          </div>
          <FieldError msg={touched.lastName && errors.lastName} id="lname-err" />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <div className="relative">
            <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              onBlur={() => onBlur("email")}
              className={`${inputClass(errors.email && touched.email)} pl-9`}
              aria-required="true"
              aria-invalid={!!(errors.email && touched.email)}
              aria-describedby={errors.email && touched.email ? "email-err" : undefined}
            />
          </div>
          <FieldError msg={touched.email && errors.email} id="email-err" />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number *</label>
          <div className="relative">
            <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+44 or +234…"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              onBlur={() => onBlur("phone")}
              className={`${inputClass(errors.phone && touched.phone)} pl-9`}
              aria-required="true"
              aria-invalid={!!(errors.phone && touched.phone)}
              aria-describedby={errors.phone && touched.phone ? "phone-err" : undefined}
            />
          </div>
          <FieldError msg={touched.phone && errors.phone} id="phone-err" />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className={labelClass}>
            Company Name{" "}
            <span className="text-white/80 normal-case font-normal tracking-normal">(optional)</span>
          </label>
          <div className="relative">
            <Building2 size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <input
              id="company"
              type="text"
              autoComplete="organization"
              placeholder="Company or trading name"
              value={form.company}
              onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
              className={`${inputClass(false)} pl-9`}
            />
          </div>
        </div>

        {/* How did you hear */}
        <div>
          <label htmlFor="source" className={labelClass}>
            How did you hear about us?{" "}
            <span className="text-white/80 normal-case font-normal tracking-normal">(optional)</span>
          </label>
          <div className="relative">
            <MessageSquare size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none z-10" aria-hidden="true" />
            <ChevronDown size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
            <select
              id="source"
              value={form.source}
              onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
              className={`${selectClass(false)} pl-9 pr-8`}
            >
              <option value="" style={{ backgroundColor: "#0d0d22" }}>Select…</option>
              {["Google Search", "Instagram", "Facebook", "Recommendation / Word of mouth", "Existing customer", "Other"].map(o => (
                <option key={o} value={o} style={{ backgroundColor: "#0d0d22" }}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <p className="text-white/80 text-[13px] font-normal leading-relaxed border-t border-white/[0.07] pt-5 mt-2">
        By submitting, you agree that R-Zone Enterprises may contact you about your shipment.
        We never share your personal data with third parties.
        See our{" "}
        <Link href="/privacy" className="text-white/80 hover:text-white underline underline-offset-2">
          Privacy Policy
        </Link>.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 5 — REVIEW
// ═══════════════════════════════════════════════════════════════════════════════
function Step5({ form, onEdit }) {
  const service = SERVICE_OPTIONS.find(s => s.id === form.service);
  const est     = estimateRate(form.service, form.weight);

  const rows = [
    { section: "Service", items: [
      { label: "Service Type", val: service?.label || "—" },
      { label: "Direction",    val: DIRECTIONS.find(d => d.id === form.direction)?.label || "—" },
    ]},
    { section: "Cargo", items: [
      { label: "Cargo Type",     val: form.cargoType  || "—" },
      { label: "Weight",         val: form.weight     ? `${form.weight} kg` : "—" },
      { label: "Items / Boxes",  val: form.items       || "—" },
      { label: "Dimensions",     val: form.dimensions || "—" },
      { label: "Declared Value", val: form.cargoValue ? `£${form.cargoValue}` : "—" },
    ]},
    { section: "Route", items: [
      { label: "Collection From", val: form.fromCity   || "—" },
      { label: "Delivery To",     val: form.toState    || "—" },
      { label: "Collection",      val: form.collection || "—" },
      { label: "Target Date",     val: form.targetDate || "—" },
    ]},
    { section: "Contact", items: [
      { label: "Name",    val: `${form.firstName} ${form.lastName}`.trim() || "—" },
      { label: "Email",   val: form.email   || "—" },
      { label: "Phone",   val: form.phone   || "—" },
      { label: "Company", val: form.company || "—" },
    ]},
  ];

  return (
    <div>
      <h2 className="text-white font-black text-[22px] tracking-[-0.015em] mb-2">Review your quote request</h2>
      <p className="text-white/80 text-[13px] font-normal mb-7">
        Check everything looks correct. Our team will send a personalised quote within the same business day.
      </p>

      {/* Estimate banner */}
      {est && !est.poa && (
        <motion.div
          className="border border-[#1F51FF]/30 bg-[#0818A8]/15 p-5 mb-6 flex items-center justify-between"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#1F51FF] mb-1">Estimated Cost</p>
            <p className="text-white font-black text-[24px] leading-none tracking-[-0.02em]">
              £{est.low}–£{est.high}
            </p>
            <p className="text-white/80 text-[13px] font-normal mt-1">
              Based on {form.weight}kg · Final price confirmed by our UK team
            </p>
          </div>
          <div className="text-right">
            <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-white/80 mb-1">Service</p>
            <p className="text-white/80 font-semibold text-[13px]">{service?.label}</p>
            <p className="text-white/80 text-[13px] font-normal">{service?.tagline}</p>
          </div>
        </motion.div>
      )}

      {/* Review rows */}
      <div className="space-y-4">
        {rows.map((section, si) => (
          <div key={section.section} className="border border-white/[0.08] bg-white/[0.03] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.03]">
              <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-white/80">{section.section}</p>
              <button
                type="button"
                onClick={() => onEdit(si + 1)}
                className="text-[13px] font-bold text-[#1F51FF] hover:text-white transition-colors tracking-[0.06em] uppercase"
                aria-label={`Edit ${section.section} details`}
              >
                Edit
              </button>
            </div>
            <div className="px-5 py-4 grid grid-cols-2 gap-x-8 gap-y-2">
              {section.items.filter(i => i.val !== "—").map(item => (
                <div key={item.label}>
                  <p className="text-white/80 text-[13px] font-normal">{item.label}</p>
                  <p className="text-white/80 text-[13px] font-medium leading-tight">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {form.notes && (
        <div className="mt-4 border border-white/[0.08] bg-white/[0.03] px-5 py-4">
          <p className="text-white/80 text-[13px] font-bold tracking-[0.2em] uppercase mb-1.5">Special Requirements</p>
          <p className="text-white/80 text-[13px] font-normal">{form.notes}</p>
        </div>
      )}

      <p className="text-white/80 text-[13px] font-normal leading-relaxed mt-6">
        By clicking &ldquo;Submit Quote Request&rdquo;, you agree that R-Zone Enterprises may contact you about your shipment.
        We never share your data. See our{" "}
        <Link href="/privacy" className="text-white/80 hover:text-white underline underline-offset-2">
          Privacy Policy
        </Link>.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUCCESS STATE
// ═══════════════════════════════════════════════════════════════════════════════
function SuccessState({ form }) {
  const service = SERVICE_OPTIONS.find(s => s.id === form.service);
  const est     = estimateRate(form.service, form.weight);

  return (
    <motion.div
      className="text-center py-10"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="relative w-20 h-20 mx-auto mb-7">
        <motion.div
          className="absolute inset-0 rounded-full bg-[#0818A8]/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          aria-hidden="true"
        />
        <motion.div
          className="w-20 h-20 bg-[#0818A8] rounded-full flex items-center justify-center relative z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        >
          <CheckCircle size={32} className="text-white" aria-hidden="true" />
        </motion.div>
      </div>

      <motion.h2
        className="text-white font-black text-[28px] tracking-[-0.02em] mb-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Quote Request Sent!
      </motion.h2>

      <motion.p
        className="text-white/80 text-[14px] font-normal leading-relaxed max-w-md mx-auto mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Thank you, <strong className="text-white font-medium">{form.firstName}</strong>. Our UK-based team has received
        your {service?.label} quote request and will respond to{" "}
        <strong className="text-white font-medium">{form.email}</strong> within the same business day — no automated replies, a real human.
      </motion.p>

      {est && !est.poa && (
        <motion.div
          className="inline-flex items-center gap-4 border border-[#1F51FF]/25 bg-[#0818A8]/14 px-6 py-4 mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div>
            <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#1F51FF] mb-0.5">Your Estimate</p>
            <p className="text-white font-black text-[22px] leading-none">£{est.low}–£{est.high}</p>
          </div>
          <div className="w-px h-10 bg-white/10" aria-hidden="true" />
          <div>
            <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-white/80 mb-0.5">Weight</p>
            <p className="text-white/80 font-semibold">{form.weight} kg</p>
          </div>
        </motion.div>
      )}

      {/* What happens next */}
      <motion.div
        className="border border-white/[0.08] bg-white/[0.03] p-6 text-left mb-8 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <p className="text-[13px] font-bold tracking-[0.28em] uppercase text-white/80 mb-5 text-center">
          What Happens Next
        </p>
        {[
          { n: "01", t: "Personalised quote from our UK team", d: "Within the same business day — Mon to Fri" },
          { n: "02", t: "Booking confirmed",                   d: "Simple, quick confirmation process"       },
          { n: "03", t: "Cargo collected or drop-off",        d: "Flexible around your schedule"            },
          { n: "04", t: "Real-time tracking starts",          d: "Track every step of your cargo's journey" },
        ].map((s, i) => (
          <div key={s.n} className="flex items-start gap-3 pb-3.5 last:pb-0 relative">
            {i < 3 && (
              <div className="absolute left-[11px] top-[26px] w-px h-[calc(100%-12px)] bg-white/[0.07]" aria-hidden="true" />
            )}
            <div className="w-6 h-6 rounded-full bg-[#0818A8]/30 border border-[#0818A8]/40 flex items-center justify-center flex-shrink-0 text-[13px] font-black text-[#1F51FF]">
              {s.n}
            </div>
            <div>
              <p className="text-white/80 text-[13px] font-semibold leading-tight">{s.t}</p>
              <p className="text-white/80 text-[13px] font-normal">{s.d}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        <Link
          href="/track"
          className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/30"
          aria-label="Track your shipment with R-Zone"
        >
          Track Shipment
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white text-[13px] font-bold px-6 py-3 transition-all duration-200"
          aria-label="View all UK–Nigeria shipping services"
        >
          View Services
        </Link>
        <a
          href="https://wa.me/448007720864"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#25D366]/30 hover:border-[#25D366]/60 text-white text-[13px] font-bold px-6 py-3 transition-all duration-200"
          aria-label="Chat with R-Zone on WhatsApp"
        >
          <MessageSquare size={12} aria-hidden="true" />
          WhatsApp Us
        </a>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ SECTION — Google PAA + Featured Snippet eligible
// ═══════════════════════════════════════════════════════════════════════════════
function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section
      aria-labelledby="faq-heading"
      className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pb-20 md:pb-28"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <TagPill label="Common Questions" />
          <h2
            id="faq-heading"
            className="text-white font-black text-[clamp(24px,4vw,40px)] leading-[1.05] tracking-[-0.025em] uppercase mb-4"
          >
            UK–Nigeria Shipping{" "}
            <span className="text-[#1F51FF]">FAQ</span>
          </h2>
          <p className="text-white/80 text-[14px] font-normal leading-relaxed">
            Everything you need to know about shipping cargo between the UK and Nigeria.
            Can&apos;t find your answer?{" "}
            <Link href="/contact" className="text-[#1F51FF] hover:text-white underline underline-offset-2 font-semibold transition-colors">
              Contact our team
            </Link>.
          </p>
        </div>

        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="border border-white/[0.09] bg-white/[0.03] overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-all duration-200"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span
                  className="text-white font-bold text-[14px] leading-snug"
                  itemProp="name"
                >
                  {item.q}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-[#1F51FF] flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-white/[0.06]">
                      <p
                        className="text-white/80 text-[13.5px] font-normal leading-relaxed"
                        itemProp="text"
                      >
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATS SECTION — backlink-magnet / press-citation asset
// ═══════════════════════════════════════════════════════════════════════════════
function StatsSection() {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      aria-labelledby="stats-heading"
      className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pb-12"
    >
      {/* Invisible H2 for SEO — visible heading in copy below */}
      <h2 id="stats-heading" className="sr-only">
        R-Zone Enterprises UK–Nigeria Cargo: Key Facts &amp; Statistics
      </h2>

      <div className="border border-white/[0.07] bg-white/[0.02] overflow-hidden">
        <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
        <div className="px-6 py-8 md:px-10">
          <p className="text-[13px] font-bold tracking-[0.28em] uppercase text-white/80 text-center mb-7">
            R-Zone by the Numbers — UK&apos;s #1 Nigeria Cargo Company
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="text-center"
              >
                <p className="text-[#1F51FF] font-black text-[26px] leading-none tracking-[-0.02em] mb-1">
                  {s.value}
                </p>
                <p className="text-white/80 text-[12px] font-bold tracking-[0.15em] uppercase mb-1 leading-tight">
                  {s.label}
                </p>
                <p className="text-white/80 text-[12px] font-normal leading-snug hidden lg:block">
                  {s.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════
const INITIAL_FORM = {
  service: "", cargoType: "", weight: "", items: "", dimensions: "",
  cargoValue: "", notes: "", direction: "uk-ng", fromCity: "", toState: "",
  collection: "", targetDate: "", deliveryAddress: "", firstName: "",
  lastName: "", email: "", phone: "", company: "", source: "",
};

function validateStep(step, form) {
  const e = {};
  if (step === 1) {
    if (!form.service) e.service = "Please select a shipping service to continue.";
  }
  if (step === 2) {
    if (!form.cargoType) e.cargoType = "Please select your cargo type.";
    if (!form.weight || isNaN(form.weight) || parseFloat(form.weight) <= 0) e.weight = "Please enter a valid weight in kg.";
  }
  if (step === 3) {
    if (!form.fromCity) e.fromCity = "Please select your collection city or state.";
    if (!form.toState)  e.toState  = "Please select your delivery destination.";
  }
  if (step === 4) {
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim())  e.lastName  = "Last name is required.";
    if (!form.email.trim())     e.email     = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.phone.trim())     e.phone     = "Phone number is required.";
  }
  return e;
}

export default function QuotePageClient() {
  const heroRef    = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const [step,    setStep]    = useState(1);
  const [dir,     setDir]     = useState(1);
  const [form,    setForm]    = useState(INITIAL_FORM);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [status,  setStatus]  = useState("idle");

  const onBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const e = validateStep(step, form);
    setErrors(prev => ({ ...prev, [field]: e[field] }));
  }, [step, form]);

  const goNext = useCallback(() => {
    const e = validateStep(step, form);
    const touchAll = {};
    Object.keys(e).forEach(k => { touchAll[k] = true; });
    setTouched(prev => ({ ...prev, ...touchAll }));
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setDir(1);
    setStep(s => Math.min(5, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, form]);

  const goPrev = useCallback(() => {
    setDir(-1);
    setStep(s => Math.max(1, s - 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goEdit = useCallback((targetStep) => {
    setDir(-1);
    setStep(targetStep);
  }, []);

  const handleSubmit = useCallback(async () => {
    setStatus("loading");
    await new Promise(r => setTimeout(r, 2000));
    setStatus("success");
    setStep(6);
  }, []);

  return (
    <>
      {/* ── STRUCTURED DATA ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              // BreadcrumbList
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home",        "item": "https://r-zoneenterprises.com" },
                  { "@type": "ListItem", "position": 2, "name": "Get a Quote", "item": "https://r-zoneenterprises.com/quote" },
                ],
              },
              // WebPage
              {
                "@type": "WebPage",
                "name": "Free UK–Nigeria Shipping Quote — R-Zone Enterprises",
                "url": "https://r-zoneenterprises.com/quote",
                "description": "Get a free UK-to-Nigeria cargo shipping quote from the highest-rated cargo company on Google. 100+ five-star reviews. Air freight from £5/kg, sea freight from £3/kg. Same-day response from our UK-based team.",
                "isPartOf": { "@type": "WebSite", "url": "https://r-zoneenterprises.com", "name": "R-Zone Enterprises" },
                "breadcrumb": { "@type": "BreadcrumbList" },
              },
              // LocalBusiness
              {
                "@type": "LocalBusiness",
                "@id": "https://r-zoneenterprises.com/#business",
                "name": "R-Zone Enterprises",
                "description": "The highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — 100+ five-star reviews organically earned. Air freight from £5/kg, sea freight from £3/kg. Delivering to all 36 Nigerian states for 12+ years.",
                "url": "https://r-zoneenterprises.com",
                "telephone": "+448007720864",
                "email": "info@r-zoneenterprises.com",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Upminster",
                  "addressRegion": "Essex",
                  "addressCountry": "GB",
                },
                "areaServed": ["United Kingdom", "Nigeria"],
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "reviewCount": "100",
                  "bestRating": "5",
                  "worstRating": "1",
                },
              },
              // Service — Air Freight
              {
                "@type": "Service",
                "name": "Air Freight UK to Nigeria",
                "provider": { "@id": "https://r-zoneenterprises.com/#business" },
                "description": "Fast air cargo shipping from any UK city to all 36 Nigerian states. 5–10 working days transit. IATA-certified customs clearance included.",
                "offers": {
                  "@type": "Offer",
                  "price": "5.00",
                  "priceCurrency": "GBP",
                  "description": "from £5 per kg",
                },
                "areaServed": ["United Kingdom", "Nigeria"],
                "serviceType": "Air Freight",
              },
              // Service — Sea Freight
              {
                "@type": "Service",
                "name": "Sea Freight UK to Nigeria",
                "provider": { "@id": "https://r-zoneenterprises.com/#business" },
                "description": "Cost-effective weekly sea freight from the UK to Nigeria. 4–6 weeks transit. Suitable for large, heavy, or bulk cargo shipments.",
                "offers": {
                  "@type": "Offer",
                  "price": "3.00",
                  "priceCurrency": "GBP",
                  "description": "from £3 per kg",
                },
                "areaServed": ["United Kingdom", "Nigeria"],
                "serviceType": "Sea Freight",
              },
              // FAQPage
              {
                "@type": "FAQPage",
                "mainEntity": FAQ_ITEMS.map(item => ({
                  "@type": "Question",
                  "name": item.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.a,
                  },
                })),
              },
            ],
          }),
        }}
      />

      <div className={`${montserrat.variable} ${outfit.variable} font-[family-name:var(--font-montserrat)] min-h-screen bg-[#00061a]`}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" aria-labelledby="quote-hero-heading">
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }}
          />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-[-20%] left-[5%] w-[700px] h-[500px] bg-[#0818A8]/15 rounded-full blur-[140px]" />
            <div className="absolute top-[20%] right-[-5%] w-[500px] h-[400px] bg-[#1F51FF]/8 rounded-full blur-[120px]" />
          </div>

          <div ref={heroRef} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pt-[120px] pb-12 md:pb-14">
            {/* Breadcrumb nav */}
            <motion.nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 mb-9"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              <Link href="/" className="text-white/80 text-[13px] font-medium hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
              <span className="text-white text-[13px] font-medium" aria-current="page">Get a Quote</span>
            </motion.nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {/* Trust badge — #1 claim */}
                <motion.div
                  variants={fadeUp}
                  custom={0}
                  className="inline-flex items-center gap-2 bg-[#0818A8]/20 border border-[#1F51FF]/25 px-4 py-2 rounded-full mb-4"
                >
                  <Award size={13} className="text-[#1F51FF]" aria-hidden="true" />
                  <span className="text-white text-[13px] font-bold">
                    Highest-Ranked UK–Nigeria Cargo on Google · 100+ Five-Star Reviews
                  </span>
                </motion.div>

                <motion.div variants={fadeUp} custom={0.05}><TagPill label="Free Quote · No Obligation · Same-Day Response" /></motion.div>

                <motion.h1
                  id="quote-hero-heading"
                  variants={fadeUp}
                  custom={0.1}
                  className="text-white font-black  text-[clamp(32px,6vw,72px)] leading-[0.88] tracking-[-0.035em] uppercase mb-4"
                >
                  Get Your Free<br />
                  <span className="relative inline-block text-[#1F51FF]">
                    UK–Nigeria
                    <motion.span
                      className="absolute -bottom-2 left-0 h-[4px] rounded-full bg-[#1F51FF]"
                      aria-hidden="true"
                      initial={{ width: 0 }}
                      animate={heroInView ? { width: "100%" } : {}}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    />
                  </span><br />
                  Shipping Quote.
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={0.2}
                  className="text-white/80 text-[15px] font-normal leading-relaxed max-w-xl"
                >
                  Answer 4 simple steps — our UK-based team responds with a personalised, no-obligation
                  cargo shipping quote within the same business day. No call centres. No automated replies.
                  Air freight, sea freight, door-to-door, and import services covering all 36 Nigerian states.
                </motion.p>
              </motion.div>

              {/* Rate highlights */}
              <motion.div
                className="flex flex-wrap gap-4 flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                {[
                  { icon: Plane, label: "Air Freight",   rate: "from £5/kg",   sub: "5–10 working days"  },
                  { icon: Ship,  label: "Sea Freight",   rate: "from £3/kg",   sub: "4–6 weeks · Weekly sailings" },
                  { icon: Zap,   label: "Quote Response", rate: "Same Day",    sub: "Mon–Fri, real humans" },
                ].map(({ icon: Icon, label, rate, sub }) => (
                  <div key={label} className="border border-white/[0.08] bg-white/[0.04] px-5 py-3 flex items-center gap-3">
                    <Icon size={16} className="text-[#1F51FF]" aria-hidden="true" />
                    <div>
                      <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-white/80">{label}</p>
                      <p className="text-white font-black text-[16px] leading-none">{rate}</p>
                      <p className="text-white/80 text-[13px] font-normal">{sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#00061a] to-transparent pointer-events-none" aria-hidden="true" />
        </section>

        {/* ── STATS BAR ── */}
        <StatsSection />

        {/* ── FORM AREA ── */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">

            {/* LEFT — form */}
            <div className="lg:col-span-8">
              <div className="border border-white/[0.09] bg-white/[0.03] overflow-hidden">
                <div className="h-[3px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />

                <div className="p-6 md:p-9">
                  {status !== "success" && <StepIndicator current={step} />}

                  <AnimatePresence mode="wait" custom={dir}>
                    {status === "success" || step === 6 ? (
                      <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <SuccessState form={form} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`step-${step}`}
                        custom={dir}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        {step === 1 && <Step1 form={form} setForm={setForm} errors={errors} />}
                        {step === 2 && <Step2 form={form} setForm={setForm} errors={errors} touched={touched} onBlur={onBlur} />}
                        {step === 3 && <Step3 form={form} setForm={setForm} errors={errors} touched={touched} onBlur={onBlur} />}
                        {step === 4 && <Step4 form={form} setForm={setForm} errors={errors} touched={touched} onBlur={onBlur} />}
                        {step === 5 && <Step5 form={form} onEdit={goEdit} />}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  {step <= 5 && status !== "success" && (
                    <motion.div
                      className="flex items-center justify-between mt-10 pt-6 border-t border-white/[0.07]"
                      layout
                    >
                      <div>
                        {step > 1 && (
                          <button
                            type="button"
                            onClick={goPrev}
                            className="inline-flex items-center gap-2 border border-white/[0.15] hover:border-white/35 text-white/80 hover:text-white text-[13px] font-bold tracking-[0.07em] uppercase px-5 py-2.5 transition-all duration-200"
                            aria-label="Go to previous step"
                          >
                            <ArrowLeft size={12} aria-hidden="true" />
                            Back
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-white/80 text-[13px] font-normal">
                          Step {step} of 5
                        </span>

                        {step < 5 ? (
                          <button
                            type="button"
                            onClick={goNext}
                            className="inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.09em] uppercase px-7 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/30"
                            aria-label="Continue to next step"
                          >
                            Continue
                            <ArrowRight size={12} aria-hidden="true" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={status === "loading"}
                            className="inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13px] font-black tracking-[0.09em] uppercase px-7 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/30"
                            aria-label="Submit your UK–Nigeria cargo quote request"
                            aria-busy={status === "loading"}
                          >
                            {status === "loading" ? (
                              <><Loader2 size={13} className="animate-spin" aria-hidden="true" /> Submitting…</>
                            ) : (
                              <>Submit Quote Request <Send size={12} aria-hidden="true" /></>
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Direct contact strip */}
              {step <= 5 && status !== "success" && (
                <div className="mt-4 border border-white/[0.06] bg-white/[0.02] px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-white/80 text-[13px] font-normal">Prefer to speak to someone right now?</p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="tel:+448007720864"
                      className="flex items-center gap-2 text-white/80 hover:text-white text-[13px] font-semibold transition-colors"
                      aria-label="Call R-Zone Enterprises: +44 800 772 0864"
                    >
                      <Phone size={12} className="text-[#1F51FF]" aria-hidden="true" />
                      +44 800 772 0864
                    </a>
                    <a
                      href="https://wa.me/448007720864?text=Hello%2C%20I%27d%20like%20a%20UK%20to%20Nigeria%20shipping%20quote."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/80 hover:text-white text-[13px] font-semibold transition-colors"
                      aria-label="WhatsApp R-Zone Enterprises for a shipping quote"
                    >
                      <MessageSquare size={12} className="text-[#25D366]" aria-hidden="true" />
                      WhatsApp Us
                    </a>
                    <a
                      href="mailto:info@r-zoneenterprises.com"
                      className="flex items-center gap-2 text-white/80 hover:text-white text-[13px] font-semibold transition-colors"
                      aria-label="Email R-Zone Enterprises"
                    >
                      <Mail size={12} className="text-[#1F51FF]" aria-hidden="true" />
                      info@r-zoneenterprises.com
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — sidebar */}
            <div className="lg:col-span-4 hidden lg:block">
              <LiveEstimateSidebar form={form} />
            </div>
          </div>
        </div>

        {/* ── FAQ SECTION ── */}
        <FAQSection />

      </div>
    </>
  );
}