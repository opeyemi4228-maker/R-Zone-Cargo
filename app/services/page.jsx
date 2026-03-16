"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Plane, Ship, Truck, Package, FileCheck,
  Warehouse, Anchor, ArrowRight, Check,
  ChevronRight, MapPin, Clock, Shield,
  BarChart3, Phone, MessageSquare, Star,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "air-freight",
    slug: "air-freight",
    nav: "Air Freight",
    icon: Plane,
    badge: "Fastest Option",
    badgeColor: "bg-blue-50 text-blue-700",
    title: "Air Freight to Nigeria",
    tagline: "Fast, reliable UK–Nigeria air cargo in 5–10 working days.",
    description:
      "Our air freight service is the fastest way to send cargo from the United Kingdom to Nigeria. Whether you're shipping personal effects, commercial merchandise, or time-sensitive goods, R-Zone Enterprises connects you to all 36 Nigerian states via a network of trusted airline partners.",
    highlights: [
      "5–10 working days transit",
      "All 36 Nigerian states covered",
      "Door collection across the UK",
      "Real-time tracking included",
      "IATA-certified handling",
      "Foodstuffs & general cargo accepted",
    ],
    process: [
      { step: "01", label: "Book online or call us",              detail: "Get a free quote in minutes" },
      { step: "02", label: "Drop off or request collection",      detail: "Upminster warehouse or UK-wide pickup" },
      { step: "03", label: "Cargo consolidated & dispatched",     detail: "Weekly air freight departures" },
      { step: "04", label: "Delivered in Nigeria",                detail: "Door delivery or Lagos warehouse pickup" },
    ],
    accent: "#0818A8",
    dark: false,
    schema: "https://schema.org/DeliveryService",
    faq: [
      { q: "How long does air freight to Nigeria take?",  a: "Typically 5–10 working days from the UK to major Nigerian cities including Lagos, Abuja, and Port Harcourt." },
      { q: "What items can I send by air?",               a: "We accept clothing, electronics, foodstuffs, documents, personal effects, and most general cargo. Contact us for prohibited items." },
    ],
  },
  {
    id: "sea-shipping-to-nigeria",
    slug: "sea-shipping-to-nigeria",
    nav: "Sea Shipping",
    icon: Ship,
    badge: "Best Value",
    badgeColor: "bg-emerald-50 text-emerald-700",
    title: "Sea Shipping to Nigeria",
    tagline: "Affordable weekly sea freight for bulk and heavy cargo.",
    description:
      "Our weekly sea freight service is the most cost-effective solution for large, heavy, or high-volume shipments from the UK to Nigeria. Ideal for businesses and individuals who need to move significant quantities of goods — with weekly sailings every week.",
    highlights: [
      "Weekly sailings from UK ports",
      "Full container (FCL) & shared (LCL)",
      "Best rates for bulk cargo",
      "Vehicles & machinery accepted",
      "4–6 weeks transit time",
      "Customs clearance included",
    ],
    process: [
      { step: "01", label: "Request a sea freight quote",  detail: "Volume-based pricing available" },
      { step: "02", label: "Deliver to our UK warehouse",  detail: "Upminster consolidation hub" },
      { step: "03", label: "Weekly sailing departs",       detail: "Fixed schedule, every week" },
      { step: "04", label: "Nigeria port clearance",       detail: "Full customs handling included" },
    ],
    accent: "#0437F2",
    dark: true,
    schema: "https://schema.org/FreightService",
    faq: [
      { q: "How long does sea shipping to Nigeria take?", a: "Sea freight typically takes 4–6 weeks depending on the destination port in Nigeria." },
      { q: "Can I ship a car by sea?",                    a: "Yes, we specialise in vehicle shipping. Contact us for RoRo (roll-on/roll-off) rates and schedule." },
    ],
  },
  {
    id: "door-to-door-cargo",
    slug: "door-to-door-cargo",
    nav: "Door to Door",
    icon: Truck,
    badge: "Most Popular",
    badgeColor: "bg-amber-50 text-amber-700",
    title: "Door to Door Cargo",
    tagline: "We collect from your UK address and deliver to Nigeria — seamlessly.",
    description:
      "R-Zone's door-to-door cargo service removes all logistics complexity. We collect from your UK address, consolidate, clear customs at both ends, and deliver directly to the recipient's door anywhere in Nigeria — by air or sea, your choice.",
    highlights: [
      "UK-wide door collection",
      "Nigeria door delivery",
      "Air or sea — your choice",
      "Both customs handled",
      "Personal & commercial cargo",
      "SMS & email notifications",
    ],
    process: [
      { step: "01", label: "Book your collection",              detail: "Choose air or sea service" },
      { step: "02", label: "We collect from your door",        detail: "Professional packing available" },
      { step: "03", label: "UK & Nigeria customs cleared",     detail: "We handle all documentation" },
      { step: "04", label: "Delivered to Nigeria address",     detail: "Any address, all 36 states" },
    ],
    accent: "#1F51FF",
    dark: false,
    schema: "https://schema.org/MovingCompany",
    faq: [
      { q: "Do you collect from anywhere in the UK?",       a: "Yes, we offer door collection across the entire UK. Collection fees may apply depending on your location." },
      { q: "Can you deliver to rural areas in Nigeria?",    a: "We deliver to all 36 Nigerian states. Delivery times to rural areas may be slightly longer." },
    ],
  },
  {
    id: "importation-from-nigeria",
    slug: "importation-from-nigeria",
    nav: "Importation",
    icon: Package,
    badge: "Two-Way",
    badgeColor: "bg-purple-50 text-purple-700",
    title: "Importation from Nigeria",
    tagline: "Weekly air freight and sea imports from Nigeria to the UK.",
    description:
      "R-Zone Enterprises operates a fully managed importation service for individuals and businesses sending goods from Nigeria to the United Kingdom. From African foodstuffs and clothing to commercial merchandise, we handle every step of the inbound logistics chain with weekly departures.",
    highlights: [
      "Weekly air collections from Nigeria",
      "Weekly sea freight from Lagos",
      "African foodstuffs accepted",
      "UK customs clearance included",
      "Collection from all Nigerian states",
      "Commercial & personal cargo",
    ],
    process: [
      { step: "01", label: "Enquire about your shipment",        detail: "Tell us what you're importing" },
      { step: "02", label: "Our Nigeria team collects",          detail: "Lagos & nationwide pickup" },
      { step: "03", label: "Air or sea transit to UK",           detail: "Weekly departures" },
      { step: "04", label: "UK customs cleared & delivered",     detail: "To your UK address" },
    ],
    accent: "#0818A8",
    dark: true,
    schema: "https://schema.org/FreightService",
    faq: [
      { q: "Can I import food from Nigeria to the UK?",          a: "Yes, we accept African foodstuffs. Some items are subject to UK customs restrictions — contact us for a full list." },
      { q: "How do I send goods from Nigeria to the UK?",        a: "Contact our team or use our online quote form. We'll arrange collection from anywhere in Nigeria." },
    ],
  },
  {
    id: "customs-clearance",
    slug: "customs-clearance",
    nav: "Customs",
    icon: FileCheck,
    badge: "Expert Handling",
    badgeColor: "bg-slate-100 text-slate-700",
    title: "Customs Clearance",
    tagline: "Fast, hassle-free customs clearance — UK and Nigeria.",
    description:
      "Navigating customs requirements between the UK and Nigeria requires specialist knowledge of both regulatory frameworks. R-Zone's experienced customs team handles all documentation, tariff classification, duty payment, and compliance checks so your cargo moves without delays.",
    highlights: [
      "UK import & export clearance",
      "Nigeria Customs Service (NCS) compliant",
      "HS code classification",
      "Duty & VAT calculation",
      "Prohibited goods guidance",
      "Urgent clearance available",
    ],
    process: [
      { step: "01", label: "Submit cargo documentation",         detail: "Commercial invoice, packing list" },
      { step: "02", label: "HS code & duty assessment",          detail: "Accurate tariff classification" },
      { step: "03", label: "Duty payment & filing",              detail: "On your behalf, transparent costs" },
      { step: "04", label: "Cargo released & delivered",         detail: "No delays, no surprises" },
    ],
    accent: "#0437F2",
    dark: false,
    schema: "https://schema.org/GovernmentService",
    faq: [
      { q: "Do I need to be present for customs clearance?",      a: "No — we act as your customs agent and handle everything on your behalf with the relevant authorities." },
      { q: "What documents are needed for Nigeria customs?",      a: "Typically a commercial invoice, packing list, and bill of lading or air waybill. We'll advise based on your cargo." },
    ],
  },
  {
    id: "warehousing",
    slug: "warehousing",
    nav: "Warehousing",
    icon: Warehouse,
    badge: "UK & Nigeria",
    badgeColor: "bg-sky-50 text-sky-700",
    title: "Warehousing",
    tagline: "Secure UK and Nigeria storage solutions for your cargo.",
    description:
      "R-Zone Enterprises operates secure warehousing facilities in Upminster, Essex UK and Lagos, Nigeria. Whether you need short-term storage before a consolidation shipment or longer-term distribution warehousing, we provide flexible, monitored solutions to suit your business.",
    highlights: [
      "Upminster, Essex UK warehouse",
      "Lagos, Nigeria storage hub",
      "24/7 CCTV monitored",
      "Flexible short & long-term",
      "Inventory management",
      "Pick, pack & despatch",
    ],
    process: [
      { step: "01", label: "Discuss your storage needs",   detail: "Flexible space available" },
      { step: "02", label: "Cargo received & logged",      detail: "Full inventory tracking" },
      { step: "03", label: "Secure monitored storage",     detail: "CCTV, access controlled" },
      { step: "04", label: "Released when you're ready",   detail: "Pick, pack & ship on demand" },
    ],
    accent: "#1F51FF",
    dark: true,
    schema: "https://schema.org/Accommodation",
    faq: [
      { q: "How long can I store goods in your warehouse?", a: "We offer both short-term (days) and long-term (months) storage. Contact us for tailored pricing." },
      { q: "Is my cargo insured while in storage?",         a: "Yes, all goods stored in our warehouses are covered by comprehensive cargo insurance." },
    ],
  },
  {
    id: "cargo-handling",
    slug: "cargo-handling",
    nav: "Cargo Handling",
    icon: Anchor,
    badge: "Specialist",
    badgeColor: "bg-rose-50 text-rose-700",
    title: "Cargo Handling",
    tagline: "Port operations and specialist cargo handling across West Africa.",
    description:
      "R-Zone's cargo handling service covers port operations, stevedoring, heavy lift, and specialist freight management at all major Nigerian and West African ports. From oversized project cargo to hazardous materials, our certified teams ensure safe, efficient cargo movement.",
    highlights: [
      "Port stevedoring services",
      "Heavy lift & project cargo",
      "Oversized & out-of-gauge cargo",
      "IATA/IMDG dangerous goods",
      "Third-party cargo inspection",
      "Nigerian port authority compliant",
    ],
    process: [
      { step: "01", label: "Cargo specification review",    detail: "Weight, dimensions, class" },
      { step: "02", label: "Port & equipment planning",     detail: "Cranes, specialist vehicles" },
      { step: "03", label: "Supervised port operations",    detail: "Certified handling teams" },
      { step: "04", label: "Cargo cleared & onward moved",  detail: "Documentation complete" },
    ],
    accent: "#0818A8",
    dark: false,
    schema: "https://schema.org/Service",
    faq: [
      { q: "Can you handle dangerous goods?",   a: "Yes, we are certified for IATA/IMDG dangerous goods. Full documentation and specialist handling provided." },
      { q: "Which ports do you operate at?",    a: "We operate at all major Nigerian ports including Apapa, Tin Can Island, Onne, and Calabar, plus West African regional ports." },
    ],
  },
];

const STATS = [
  { value: "12+",     label: "Years Experience",      icon: Clock },
  { value: "50,000+", label: "Shipments Delivered",   icon: Package },
  { value: "99%",     label: "Delivery Success Rate", icon: Shield },
  { value: "107+",    label: "Five-Star Reviews",     icon: Star },
];

// ─── Animation ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

// ─── Sticky service nav ───────────────────────────────────────────────────────
function ServiceNav({ activeId }) {
  return (
    <div className="sticky top-[100px] z-20 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
        <div className="flex items-center overflow-x-auto scrollbar-none">
          {SERVICES.map((s) => {
            const Icon     = s.icon;
            const isActive = activeId === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-label={`Navigate to ${s.title} section`}
                className={`
                  relative flex items-center gap-2 px-4 py-3.5 whitespace-nowrap
                  text-[12.5px] font-semibold tracking-[0.03em] transition-colors duration-150
                  flex-shrink-0 border-b-2
                  ${isActive
                    ? "text-[#0818A8] border-[#0818A8]"
                    : "text-gray-800 border-transparent hover:text-[#0818A8] hover:border-gray-300"
                  }
                `}
              >
                <Icon size={13} aria-hidden="true" />
                {s.nav}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Service Section ──────────────────────────────────────────────────────────
function ServiceSection({ service, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon   = service.icon;
  const isDark = service.dark;

  return (
    <section
      id={service.id}
      ref={ref}
      className={`relative overflow-hidden scroll-mt-[148px] ${isDark ? "bg-[#00061a]" : "bg-white"}`}
      aria-labelledby={`${service.id}-heading`}
      itemScope
      itemType={service.schema}
    >
      {/* Background texture */}
      {isDark ? (
        <>
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            aria-hidden="true"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />
          <div
            className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full pointer-events-none"
            aria-hidden="true"
            style={{
              background: `radial-gradient(circle, ${service.accent}18 0%, transparent 65%)`,
              transform: "translate(-20%, -20%)",
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.03) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      )}

      {/* Decorative section number */}
      <div
        className={`absolute top-10 right-8 xl:right-16 font-black pointer-events-none select-none leading-none ${
          isDark ? "text-white/[0.04]" : "text-[#0818A8]/[0.05]"
        }`}
        style={{ fontSize: "clamp(80px, 14vw, 180px)" }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── LEFT — Content ── */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Badge + icon */}
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${service.accent}18` }}
                aria-hidden="true"
              >
                <Icon size={19} style={{ color: service.accent }} />
              </div>
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full ${service.badgeColor}`}>
                {service.badge}
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.div variants={fadeUp} custom={0.05} className="flex items-center gap-3 mb-4">
              <motion.div
                className="h-[2px] rounded-full"
                style={{ backgroundColor: service.accent }}
                initial={{ width: 0 }}
                animate={inView ? { width: 28 } : {}}
                transition={{ duration: 0.45, delay: 0.3 }}
                aria-hidden="true"
              />
              <span className={`text-[10.5px] font-bold tracking-[0.26em] uppercase ${
                isDark ? "text-white/80" : "text-gray-800"
              }`}>
                R-Zone Services
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              id={`${service.id}-heading`}
              variants={fadeUp}
              custom={0.1}
              className={`font-black text-[clamp(22px,4vw,44px)] leading-[0.95] tracking-[-0.025em] uppercase mb-4 ${
                isDark ? "text-white" : "text-[#0f1923]"
              }`}
              itemProp="name"
            >
              {service.title.split(" ").map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="relative inline-block" style={{ color: service.accent }}>
                    {word}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                      style={{ backgroundColor: service.accent }}
                      aria-hidden="true"
                      initial={{ width: 0 }}
                      animate={inView ? { width: "100%" } : {}}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    />
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              custom={0.15}
              className={`text-[15px] font-semibold leading-snug mb-3 ${
                isDark ? "text-white/80" : "text-gray-800"
              }`}
            >
              {service.tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className={`text-[13.5px] font-light leading-relaxed mb-8 ${
                isDark ? "text-white/80" : "text-gray-800"
              }`}
              itemProp="description"
            >
              {service.description}
            </motion.p>

            {/* Highlights */}
            <motion.ul
              variants={fadeUp}
              custom={0.25}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-9"
              role="list"
              aria-label={`${service.title} features`}
            >
              {service.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${service.accent}18`, border: `1px solid ${service.accent}35` }}
                    aria-hidden="true"
                  >
                    <Check size={9} style={{ color: service.accent }} />
                  </span>
                  <span className={`text-[12.5px] font-medium ${isDark ? "text-white/80" : "text-gray-800"}`}>
                    {h}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 text-[11.5px] font-black tracking-[0.1em] uppercase px-7 py-3.5 text-white transition-all duration-200 rounded-sm"
                style={{ backgroundColor: service.accent, boxShadow: `0 8px 24px ${service.accent}30` }}
                aria-label={`Get a quote for ${service.title}`}
              >
                Get a Quote
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 text-[11.5px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 border rounded-sm transition-all duration-200 ${
                  isDark
                    ? "border-white/25 text-white hover:border-white/50 hover:bg-white/8"
                    : "border-gray-300 text-gray-800 hover:border-[#0818A8] hover:text-[#0818A8]"
                }`}
                aria-label={`Ask about ${service.title}`}
              >
                Ask Us
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Process + FAQ ── */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Process steps */}
            <div className={`p-6 md:p-8 border ${
              isDark ? "bg-white/[0.04] border-white/[0.08]" : "bg-gray-50 border-gray-200"
            }`}>
              <p className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-6 ${
                isDark ? "text-white/80" : "text-gray-800"
              }`}>
                How It Works
              </p>
              <div className="flex flex-col gap-0">
                {service.process.map((p, pi) => (
                  <div key={p.step} className="flex items-start gap-4 relative">
                    {pi < service.process.length - 1 && (
                      <div
                        className={`absolute left-[15px] top-[30px] w-px h-[calc(100%-14px)] ${
                          isDark ? "bg-white/10" : "bg-gray-200"
                        }`}
                        aria-hidden="true"
                      />
                    )}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-black text-[10px] tracking-[0.05em] mt-0.5"
                      style={{
                        backgroundColor: `${service.accent}18`,
                        color: service.accent,
                        border: `1.5px solid ${service.accent}30`,
                      }}
                      aria-label={`Step ${p.step}`}
                    >
                      {p.step}
                    </div>
                    <div className="pb-5">
                      <p className={`font-bold text-[13px] leading-tight mb-0.5 ${
                        isDark ? "text-white/80" : "text-gray-800"
                      }`}>
                        {p.label}
                      </p>
                      <p className={`text-[11.5px] font-light ${
                        isDark ? "text-white/80" : "text-gray-800"
                      }`}>
                        {p.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className={`p-6 md:p-7 border ${
              isDark ? "bg-white/[0.04] border-white/[0.08]" : "bg-white border-gray-200"
            }`}>
              <p className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-5 ${
                isDark ? "text-white/80" : "text-gray-800"
              }`}>
                Frequently Asked
              </p>
              <div className="flex flex-col gap-5">
                {service.faq.map((item, fi) => (
                  <div
                    key={fi}
                    className={`pb-5 ${fi < service.faq.length - 1
                      ? `border-b ${isDark ? "border-white/[0.08]" : "border-gray-100"}`
                      : ""
                    }`}
                  >
                    <p className={`font-bold text-[13px] mb-1.5 leading-snug ${
                      isDark ? "text-white/80" : "text-gray-800"
                    }`}>
                      {item.q}
                    </p>
                    <p className={`text-[12.5px] font-light leading-relaxed ${
                      isDark ? "text-white/80" : "text-gray-800"
                    }`}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mini CTA */}
              <div className={`mt-5 pt-5 border-t flex items-center justify-between ${
                isDark ? "border-white/[0.08]" : "border-gray-100"
              }`}>
                <p className={`text-[11.5px] font-light ${
                  isDark ? "text-white/80" : "text-gray-800"
                }`}>
                  More questions?
                </p>
                <a
                  href="tel:+448007720864"
                  className="flex items-center gap-1.5 text-[11.5px] font-bold transition-colors duration-200"
                  style={{ color: service.accent }}
                  aria-label="Call R-Zone: +44 800 772 0864"
                >
                  <Phone size={11} aria-hidden="true" />
                  +44 800 772 0864
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? "bg-white/[0.05]" : "bg-gray-100"}`}
        aria-hidden="true"
      />
    </section>
  );
}

// ─── Stats band ───────────────────────────────────────────────────────────────
function StatsBand() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="bg-[#0818A8] relative overflow-hidden" aria-label="R-Zone key statistics">
      <div
        className="absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-10 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" role="list">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                role="listitem"
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className="w-10 h-10 bg-white/20 rounded-sm flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <Icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-[22px] leading-none tracking-[-0.02em]">
                    {stat.value}
                  </p>
                  <p className="text-white/80 text-[11px] font-medium tracking-[0.06em] uppercase mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Page Hero ────────────────────────────────────────────────────────────────
function PageHero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="relative bg-[#00061a] overflow-hidden hero-section pt-10"
      aria-labelledby="services-hero-heading"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Glows */}
      <div
        className="absolute top-0 left-1/3 w-[700px] h-[400px] bg-[#0818A8]/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#1F51FF]/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">

        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="text-white/80 text-[11.5px] font-medium hover:text-white transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
          <span className="text-white text-[11.5px] font-medium" aria-current="page">
            Services
          </span>
        </motion.nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            {/* Tag pill */}
            <div className="inline-flex items-center gap-2.5 border border-[#1F51FF]/30 bg-[#0818A8]/14 px-4 py-1.5 rounded-full mb-5">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden="true"
              />
              <span className="text-[#1F51FF] text-[10px] font-bold tracking-[0.28em] uppercase">
                All Services
              </span>
            </div>

            <h1
              id="services-hero-heading"
              className="text-white font-black text-[clamp(30px,6vw,68px)] leading-[0.9] tracking-[-0.03em] uppercase mb-5"
            >
              Shipping{" "}
              <span className="relative inline-block text-[#1F51FF] mb-2">
                Services
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full"
                  aria-hidden="true"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 0.55, delay: 0.55 }}
                />
              </span>
              <br />&amp; Logistics.
            </h1>

            <p className="text-white/80 text-[14px] font-light leading-relaxed tracking-wide">
              Seven specialist services connecting the UK and Nigeria — from weekly
              air freight and sea sailings to customs clearance, warehousing,
              and specialist cargo handling.
            </p>
          </motion.div>

          {/* Quick-jump links */}
          <motion.div
            className="flex flex-wrap lg:flex-col gap-2 lg:items-end"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {SERVICES.slice(0, 4).map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 border border-white/20 bg-white/[0.04] hover:border-white/40 hover:bg-white/[0.08] text-white/80 hover:text-white text-[11px] font-semibold tracking-[0.07em] uppercase px-3.5 py-2 transition-all duration-200"
                  aria-label={`Jump to ${s.title}`}
                >
                  <Icon size={11} aria-hidden="true" />
                  {s.nav}
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#00061a] overflow-hidden"
      aria-label="Get started with R-Zone"
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.22) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className="inline-flex items-center gap-2.5 border border-[#1F51FF]/28 bg-[#0818A8]/12 px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]" aria-hidden="true" />
            <span className="text-[#1F51FF] text-[10px] font-bold tracking-[0.28em] uppercase">
              Get Started Today
            </span>
          </div>

          <h2 className="text-white font-black text-[clamp(26px,5vw,52px)] leading-[0.92] tracking-[-0.025em] uppercase mb-5">
            Ready to Ship to{" "}
            <span className="text-[#1F51FF]">Nigeria?</span>
          </h2>

          <p className="text-white/80 text-[14px] font-light leading-relaxed max-w-xl mx-auto mb-10">
            Get a free quote in under 2 minutes. Our UK-based team responds same day —
            no automated replies, no call centres.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12px] font-black tracking-[0.1em] uppercase px-8 py-4 rounded-sm transition-all duration-200 shadow-xl shadow-[#0818A8]/30"
              aria-label="Get a free shipping quote"
            >
              Get a Free Quote
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform duration-200"
                aria-hidden="true"
              />
            </Link>
            <a
              href="tel:+448007720864"
              className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[12px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-sm transition-all duration-200"
              aria-label="Call R-Zone: +44 800 772 0864"
            >
              <Phone size={13} aria-hidden="true" />
              +44 800 772 0864
            </a>
            <a
              href="mailto:info@r-zoneenterprises.com"
              className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[12px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-sm transition-all duration-200"
              aria-label="Email R-Zone: info@r-zoneenterprises.com"
            >
              <MessageSquare size={13} aria-hidden="true" />
              Email Us
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {["Free Quote", "No Obligation", "Same-Day Response", "UK-Based Team"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-white/80 text-[11.5px] font-light">
                <Check size={12} className="text-[#1F51FF]" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ServicesPageClient() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);

  useEffect(() => {
    const observers = [];

    SERVICES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(s.id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* ItemList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "R-Zone Enterprises — All Shipping Services",
            "description": "The highest-rated organically earned cargo and logistics company between the UK, Nigeria, and across Africa.",
            "url": "https://r-zoneenterprises.com/services",
            "numberOfItems": SERVICES.length,
            "itemListElement": SERVICES.map((s, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "Service",
                "name": s.title,
                "description": s.description,
                "url": `https://r-zoneenterprises.com/${s.slug}`,
                "provider": {
                  "@type": "Organization",
                  "name": "R-Zone Enterprises",
                  "url": "https://r-zoneenterprises.com",
                },
              },
            })),
          }),
        }}
      />

      {/* FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": SERVICES.flatMap((s) =>
              s.faq.map((item) => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": { "@type": "Answer", "text": item.a },
              }))
            ),
          }),
        }}
      />

      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] w-full`}>
        <PageHero />
        <StatsBand />
        <ServiceNav activeId={activeId} />

        <main id="main-content">
          {SERVICES.map((service, index) => (
            <ServiceSection key={service.id} service={service} index={index} />
          ))}
        </main>

        <FinalCTA />
      </div>
    </>
  );
}