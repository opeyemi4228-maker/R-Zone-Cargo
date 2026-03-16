"use client";

import { Montserrat } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Shield, Award, Globe, Clock, Package,
  CheckCircle, Warehouse, Plane, Star,
  TrendingUp, Users, MapPin, Phone, MessageSquare,
} from "lucide-react";

// ─── Font ─────────────────────────────────────────────────────────────────────
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", prefix = "" }) {
  const ref       = useRef(null);
  const inView    = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const spring    = useSpring(motionVal, { stiffness: 38, damping: 14 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.floor(v)));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} aria-label={`${prefix}${target}${suffix}`}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const METRICS = [
  {
    value: 12,
    suffix: "+",
    label: "Years Experience",
    sub: "Operating since 2012",
    icon: Clock,
    color: "#1F51FF",
  },
  {
    value: 50000,
    suffix: "+",
    label: "Shipments Delivered",
    sub: "Across 6 continents",
    icon: Package,
    color: "#0818A8",
  },
  {
    value: 2,
    suffix: "",
    label: "Warehouses",
    sub: "Upminster UK · Lagos NG",
    icon: Warehouse,
    color: "#1F51FF",
  },
  {
    value: 99,
    suffix: "%",
    label: "Success Rate",
    sub: "107+ verified reviews",
    icon: TrendingUp,
    color: "#0818A8",
  },
];

const CERTIFICATIONS = [
  { icon: Shield,      label: "Fully Insured",     sub: "End-to-end cargo cover" },
  { icon: Award,       label: "IATA Registered",   sub: "Certified air freight agent" },
  { icon: CheckCircle, label: "NCS Compliant",     sub: "Nigeria Customs Service" },
  { icon: Globe,       label: "6 Continents",      sub: "Worldwide freight reach" },
  { icon: Star,        label: "Highest Rated",     sub: "Organic · UK to Nigeria" },
  { icon: Users,       label: "10,000+ Customers", sub: "Families & businesses" },
];

const AIRLINE_PARTNERS = [
  { name: "British Airways Cargo", code: "BA" },
  { name: "Virgin Atlantic Cargo", code: "VS" },
  { name: "Emirates SkyCargo",     code: "EK" },
  { name: "Ethiopian Cargo",       code: "ET" },
  { name: "Air Peace",             code: "P4" },
  { name: "Qatar Airways Cargo",   code: "QR" },
  { name: "Kenya Airways",         code: "KQ" },
  { name: "Turkish Cargo",         code: "TK" },
  { name: "Lufthansa Cargo",       code: "LH" },
  { name: "DHL Aviation",          code: "DH" },
];

const OFFICES = [
  {
    flag: "🇬🇧",
    city: "Upminster, United Kingdom",
    address: "Unit 10 Moorhen Yard, Elms Lane, Bulphan, Upminster, RM14 3TS",
    role: "Primary Hub",
    phone: "+44 (0) 800 772 0864",
    phoneHref: "tel:+448007720864",
    email: "info@r-zoneenterprises.com",
    mapsUrl: "https://maps.app.goo.gl/QXnmYSxB8CeZ7hmv8",
    hours: "Mon–Fri 10AM–6PM · Sat 11AM–2PM",
  },
  {
    flag: "🇳🇬",
    city: "Lagos, Nigeria",
    address: "1-3 R-Zone Crescent, Queens Park Estate II, Shagam Interchange, Lagos",
    role: "West Africa Hub",
    phone: "+234 906 680 6861",
    phoneHref: "tel:+2349066806861",
    email: "nigeria@r-zoneenterprises.com",
    mapsUrl: "https://maps.google.com",
    hours: "Mon–Fri 9AM–5PM WAT",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TrustAuthority() {
  const headerRef = useRef(null);
  const inView    = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Organization schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "R-Zone Enterprises",
            "url": "https://r-zoneenterprises.com",
            "foundingDate": "2012",
            "description": "The highest-rated organically earned cargo and logistics company between the UK, Nigeria, and across Africa.",
            "areaServed": [
              { "@type": "Country",   "name": "United Kingdom" },
              { "@type": "Country",   "name": "Nigeria" },
              { "@type": "Continent", "name": "Africa" },
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "107",
              "bestRating": "5",
            },
            "award": [
              "IATA Registered Air Freight Agent",
              "NCS Compliant — Nigeria Customs Service",
              "Highest-Rated Organically Earned Cargo Company — UK to Nigeria",
              "Google Excellent Rating — 107+ Reviews",
            ],
            "address": [
              {
                "@type": "PostalAddress",
                "streetAddress": "Unit 10 Moorhen Yard, Elms Lane, Bulphan",
                "addressLocality": "Upminster",
                "postalCode": "RM14 3TS",
                "addressCountry": "GB",
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "1-3 R-Zone Crescent, Queens Park Estate II, Shagam Interchange",
                "addressLocality": "Lagos",
                "addressCountry": "NG",
              },
            ],
          }),
        }}
      />

      <section
        className={`
          ${montserrat.variable} font-[family-name:var(--font-montserrat)]
          relative w-full bg-[#00061a] overflow-hidden
        `}
        aria-label="R-Zone Enterprises — trust, authority and company metrics"
        itemScope
        itemType="https://schema.org/Organization"
      >

        {/* ══ BACKGROUNDS ══════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.022]"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute top-0 left-1/3 w-[800px] h-[600px] rounded-full bg-[#0818A8]/10 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[400px] rounded-full bg-[#1F51FF]/8 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        {/* ══ PART 1 — HEADER + METRICS ════════════════════════════════════ */}
        <div className="relative border-b border-white/[0.06]">
          <div
            ref={headerRef}
            className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-24 lg:py-28"
          >

            {/* Header row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20">

              {/* Left */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Tag pill */}
                <div className="inline-flex items-center gap-2.5 border border-[#1F51FF]/30 bg-[#0818A8]/12 px-4 py-1.5 rounded-full mb-5">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]"
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    aria-hidden="true"
                  />
                  <span className="text-[#1F51FF] text-[10px] font-bold tracking-[0.28em] uppercase">
                    Company Authority
                  </span>
                </div>

                <h2 className="text-white font-black text-[clamp(28px,5vw,58px)] leading-[0.92] tracking-[-0.025em] uppercase mb-4">
                  Trusted By{" "}
                  <span className="relative inline-block text-[#1F51FF]">
                    Thousands
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full"
                      aria-hidden="true"
                      initial={{ width: 0 }}
                      animate={inView ? { width: "100%" } : {}}
                      transition={{ duration: 0.55, delay: 0.55 }}
                    />
                  </span>
                  <br />Since 2012.
                </h2>

                <p className="text-white/80 text-[15px] font-light leading-relaxed tracking-wide max-w-lg">
                  The highest-rated organically earned cargo and logistics company
                  between the UK, Nigeria, and across Africa. From families sending
                  care packages to businesses shipping commercial cargo — R-Zone
                  Enterprises has been the trusted bridge for over a decade, with
                  weekly sailings and air departures every week.
                </p>
              </motion.div>

              {/* Right — trust badges */}
              <motion.div
                className="flex flex-wrap lg:flex-col gap-3 lg:items-end"
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {[
                  "IATA Registered Agent",
                  "NCS Customs Compliant",
                  "107+ Five-Star Reviews",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-white/80 text-[11px] font-semibold tracking-[0.08em] uppercase"
                  >
                    <CheckCircle
                      size={11}
                      className="text-[#1F51FF] flex-shrink-0"
                      aria-hidden="true"
                    />
                    {badge}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Metric cards */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              role="list"
              aria-label="R-Zone key performance metrics"
            >
              {METRICS.map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    role="listitem"
                    className="group relative overflow-hidden bg-white/[0.04] border border-white/[0.08] hover:border-[#0818A8]/50 hover:bg-[#0818A8]/10 transition-all duration-300 p-7"
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + i * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {/* Corner glow */}
                    <div
                      className="absolute top-0 left-0 w-14 h-14 opacity-25 group-hover:opacity-50 transition-opacity duration-300"
                      aria-hidden="true"
                      style={{
                        background: `radial-gradient(circle at top left, ${metric.color}55, transparent 70%)`,
                      }}
                    />
                    {/* Bottom accent */}
                    <div
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#0818A8] to-[#1F51FF] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      aria-hidden="true"
                    />

                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${metric.color}1A` }}
                      aria-hidden="true"
                    >
                      <Icon size={16} style={{ color: metric.color }} />
                    </div>

                    <p
                      className="text-white font-black leading-none tracking-[-0.03em] tabular-nums mb-2"
                      style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}
                    >
                      <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                    </p>

                    <p className="text-white font-bold text-[12px] tracking-[0.08em] uppercase leading-tight mb-1.5" itemProp="description">
                      {metric.label}
                    </p>
                    <p className="text-white/80 text-[12px] font-light tracking-wide">
                      {metric.sub}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

        {/* ══ PART 2 — CERTIFICATIONS ══════════════════════════════════════ */}
        <div className="relative border-b border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-12 md:py-14">

            <motion.p
              className="text-white/80 text-[10px] font-bold tracking-[0.32em] uppercase mb-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-5 h-px bg-white/30" aria-hidden="true" />
              Credentials &amp; Standards
            </motion.p>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-5"
              role="list"
              aria-label="R-Zone certifications and credentials"
            >
              {CERTIFICATIONS.map((cert, i) => {
                const Icon = cert.icon;
                return (
                  <motion.div
                    key={cert.label}
                    role="listitem"
                    className="group flex items-center gap-3"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                  >
                    <div
                      className="w-9 h-9 bg-[#0818A8]/15 border border-[#0818A8]/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0818A8] group-hover:border-[#0818A8] transition-all duration-200 rounded-sm"
                      aria-hidden="true"
                    >
                      <Icon
                        size={14}
                        className="text-[#1F51FF] group-hover:text-white transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <p className="text-white text-[11.5px] font-bold tracking-[0.04em] leading-none mb-0.5">
                        {cert.label}
                      </p>
                      <p className="text-white/80 text-[10px] font-light leading-none">
                        {cert.sub}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══ PART 3 — AIRLINE MARQUEE ═════════════════════════════════════ */}
        <div className="relative border-b border-white/[0.06] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pt-12 md:pt-14">
            <motion.p
              className="text-white/80 text-[10px] font-bold tracking-[0.32em] uppercase mb-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-5 h-px bg-white/30" aria-hidden="true" />
              Airline &amp; Logistics Partners
            </motion.p>
          </div>

          <div className="relative py-5 md:py-7" aria-label="Airline partners">
            {/* Fade masks */}
            <div
              className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#00061a] to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#00061a] to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />

            <motion.div
              className="flex items-center gap-4 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "loop" }}
            >
              {[...AIRLINE_PARTNERS, ...AIRLINE_PARTNERS].map((p, i) => (
                <div
                  key={`${p.code}-${i}`}
                  className="flex-shrink-0 flex items-center gap-3 border border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.07] px-5 py-3 transition-all duration-200 cursor-default"
                  aria-label={p.name}
                >
                  <span
                    className="font-black text-[11px] tracking-[0.14em] text-[#1F51FF] bg-[#0818A8]/22 px-2 py-0.5"
                    aria-hidden="true"
                  >
                    {p.code}
                  </span>
                  <span className="text-white/80 text-[12.5px] font-medium whitespace-nowrap">
                    {p.name}
                  </span>
                  <Plane size={10} className="text-white/80 flex-shrink-0" aria-hidden="true" />
                </div>
              ))}
            </motion.div>
          </div>
          <div className="pb-12" />
        </div>

        {/* ══ PART 4 — OFFICES ═════════════════════════════════════════════ */}
        <div className="relative">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-16">

            <motion.p
              className="text-white/80 text-[10px] font-bold tracking-[0.32em] uppercase mb-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-5 h-px bg-white/30" aria-hidden="true" />
              Our Offices
            </motion.p>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
              role="list"
              aria-label="R-Zone office locations"
            >
              {OFFICES.map((office, i) => (
                <motion.div
                  key={office.city}
                  role="listitem"
                  className="group relative bg-white/[0.04] border border-white/[0.08] hover:border-[#0818A8]/40 hover:bg-[#0818A8]/8 transition-all duration-300 p-6 md:p-7 overflow-hidden"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
                    aria-hidden="true"
                  />

                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 bg-[#0818A8]/18 border border-[#0818A8]/28 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0818A8] group-hover:border-[#0818A8] transition-all duration-200 rounded-sm"
                      aria-hidden="true"
                    >
                      <MapPin
                        size={16}
                        className="text-[#1F51FF] group-hover:text-white transition-colors duration-200"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1.5">
                        <span className="text-[15px] text-white/80" aria-hidden="true">
                          {office.flag}
                        </span>
                        <span className="text-white font-black text-[13px] tracking-[0.06em] uppercase">
                          {office.city}
                        </span>
                        <span className="text-[#1F51FF] text-[10px] font-bold tracking-[0.14em] uppercase bg-[#0818A8]/22 px-2 py-0.5">
                          {office.role}
                        </span>
                      </div>

                      <p
                        className="text-white/80 text-[13px] font-light leading-snug mb-3"
                        itemProp="streetAddress"
                      >
                        {office.address}
                      </p>

                      <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                        <a
                          href={office.phoneHref}
                          className="flex items-center gap-1.5 text-white/80 hover:text-white text-[12px] font-medium transition-colors duration-200"
                          aria-label={`Call ${office.city}: ${office.phone}`}
                        >
                          <Phone size={10} className="text-[#1F51FF] flex-shrink-0" aria-hidden="true" />
                          {office.phone}
                        </a>
                        <a
                          href={`mailto:${office.email}`}
                          className="flex items-center gap-1.5 text-white/80 hover:text-white text-[12px] font-medium transition-colors duration-200"
                          aria-label={`Email ${office.city}: ${office.email}`}
                        >
                          <MessageSquare size={10} className="text-[#1F51FF] flex-shrink-0" aria-hidden="true" />
                          {office.email}
                        </a>
                      </div>

                      <p className="text-white/80 text-[12px] font-light mt-2 tracking-wide">
                        {office.hours}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-white/80 text-[12.5px] font-light max-w-md leading-relaxed">
                Our UK-based team handles every query personally — no automated
                responses, no call centres. Just real people who care about your cargo.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 bg-white/[0.05] hover:bg-white/10 text-white text-[11.5px] font-bold tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200"
                  aria-label="Contact R-Zone Enterprises"
                >
                  Contact Us
                </Link>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.1em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
                  aria-label="Get a free shipping quote from R-Zone"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>

          </div>
        </div>

      </section>
    </>
  );
}