"use client";

import { Montserrat } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 55, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.floor(v)));
  }, [spring]);

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Data — sourced from r-zoneenterprises.com ────────────────────────────────
const STATS = [
  { value: 12,  suffix: "+", label: "Years Experience"  },
  { value: 6,   suffix: "",  label: "Continents Covered" },
  { value: 500, suffix: "+", label: "Tons Delivered"     },
  { value: 107, suffix: "+", label: "5‑Star Reviews"     },
];

// ─── Variants ─────────────────────────────────────────────────────────────────
const curtainReveal = {
  hidden: { y: "105%", opacity: 0 },
  visible: (d = 0) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: d },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (d = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: d },
  }),
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <>
      {/* ── JSON-LD: Full structured data from r-zoneenterprises.com ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MovingCompany",
            "name": "R-Zone Enterprises",
            "alternateName": ["R-Zone Cargo", "RZE Cargo"],
            "url": "https://r-zoneenterprises.com",
            "logo": "https://r-zoneenterprises.com/wp-content/uploads/2022/09/Logo-colour-112.png",
            "image": "https://r-zoneenterprises.com/wp-content/uploads/2022/09/Logo-colour-112.png",
            "description": "R-Zone Enterprises offers door to door cargo to Nigeria from UK, air freight to Nigeria, sea shipping to Nigeria, car shipping, and importation services. Over 10 years of trusted shipping experience across the UK and Africa.",
            "foundingDate": "2012",
            "telephone": "+448007720864",
            "email": "info@r-zoneenterprises.com",
            "priceRange": "££",
            "currenciesAccepted": "GBP",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
            "openingHours": ["Mo-Fr 10:00-18:00", "Sa 11:00-14:00"],
            "address": [
              {
                "@type": "PostalAddress",
                "streetAddress": "Unit 10 Moorhen Yard, Elms Lane",
                "addressLocality": "Essex",
                "postalCode": "RM14 3TS",
                "addressCountry": "GB",
                "name": "R-Zone UK Office"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "2 Esan Olusegun Close, Off Hotel Solus Bus Stop, Igando",
                "addressLocality": "Lagos",
                "addressCountry": "NG",
                "name": "R-Zone Nigeria Office"
              }
            ],
            "areaServed": [
              { "@type": "Country", "name": "United Kingdom" },
              { "@type": "Country", "name": "Nigeria" },
              { "@type": "Continent", "name": "Africa" }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "R-Zone Shipping Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Air Freight to Nigeria from UK" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Door to Door Cargo to Nigeria" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sea Shipping to Nigeria" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Shipping to Nigeria" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Importation from Nigeria to UK" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cargo to Nigeria" } }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "107",
              "bestRating": "5",
              "worstRating": "1"
            },
            "sameAs": ["https://www.instagram.com/rzoneenterprise"],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+44-800-772-0864",
              "contactType": "customer service",
              "availableLanguage": ["English"],
              "hoursAvailable": "Mo-Fr 10:00-18:00"
            }
          }),
        }}
      />

      <section
        className={`
          ${montserrat.variable}
          font-[family-name:var(--font-montserrat)]
          relative w-full overflow-hidden bg-[#00061a]
          h-[70vh] min-h-[540px]
          md:h-[70vh] md:min-h-[600px]
          lg:h-[70dvh] lg:min-h-[660px] lg:max-h-[920px]
        `}
        aria-label="R-Zone Enterprises — Fast, Reliable Shipping Between the UK and Nigeria"
        role="banner"
        itemScope
        itemType="https://schema.org/WPHeader"
      >

        {/* ══ BACKGROUND — CSS background-image (no <img> tag) ══════════════
            Security notes:
            • No <img> element in DOM → "Save Image As" not in right-click menu
            • onContextMenu preventDefault → blocks context menu on container
            • onDragStart preventDefault → blocks drag-to-desktop
            • WebkitTouchCallout none → blocks iOS long-press save
            • pointer-events none + userSelect none → no interaction layer
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 z-0 select-none overflow-hidden"
          aria-hidden="true"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&q=85')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              WebkitUserSelect: "none",
              userSelect: "none",
              WebkitTouchCallout: "none",
              pointerEvents: "none",
            }}
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* ── Gradient system — RESTORED from original ── */}
          {/* Left — deep dark so headline is always readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00061a] via-[#00061a]/80 to-transparent" />
          {/* Bottom — smooth fade to next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00061a] via-[#00061a]/55 to-transparent" />
          {/* Top — navbar blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00061a]/65 via-transparent to-transparent" />
          {/* Blue brand tint */}
          <div className="absolute inset-0 bg-[#0818A8]/8 mix-blend-screen pointer-events-none" />
        </div>

        {/* ── Grid overlay ── */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.022] pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: "68px 68px",
          }}
        />

        {/* ── Atmospheric glow — bottom left ── */}
        <div
          className="absolute -bottom-32 -left-20 w-[580px] h-[380px] bg-[#0818A8]/13 rounded-full blur-3xl z-[1] pointer-events-none"
          aria-hidden="true"
        />

        {/* ── Right accent line ── */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-px z-[2] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to bottom, transparent 10%, rgba(31,81,255,0.4) 50%, transparent 90%)",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 1.0 }}
        />

        {/* ── Bottom border ── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px z-[2] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
        />

        {/* ══ MAIN LAYOUT ════════════════════════════════════════════════════ */}
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 flex flex-col">

          {/* Navbar spacer */}
          <div className="h-[76px] sm:h-[84px] flex-shrink-0" />

          {/* ── CENTRE CONTENT ── */}
          <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-5">

            {/* Tag pill */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.2}>
              <div className="inline-flex items-center gap-2.5 border border-white/12 bg-white/[0.06] backdrop-blur-sm px-4 py-2 rounded-full w-fit">
                <motion.span
                  className="w-2 h-2 rounded-full bg-[#1F51FF] flex-shrink-0"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white/55 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase">
                  UK &amp; Africa Freight Specialists
                </span>
              </div>
            </motion.div>

            {/* Pre-rule */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-px bg-[#1F51FF]" />
              <span className="text-[#1F51FF] text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase">
                R-Zone Enterprises
              </span>
            </motion.div>

            {/* ── Headline — 3 curtain-reveal lines ── */}
            <div>
              <h1
                className="leading-[0.86] tracking-[-0.025em] uppercase"
                itemProp="headline"
              >
                {/* Line 1 — solid white */}
                <div className="overflow-hidden">
                  <motion.span
                    className="block font-black text-white"
                    style={{ fontSize: "clamp(42px, 6.5vw, 92px)" }}
                    variants={curtainReveal}
                    initial="hidden"
                    animate="visible"
                    custom={0.4}
                  >
                    Fast, Reliable
                  </motion.span>
                </div>

                {/* Line 2 — ghost outline */}
                <div className="overflow-hidden">
                  <motion.span
                    className="block font-black"
                    style={{
                      fontSize: "clamp(42px, 6.5vw, 92px)",
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(255,255,255,0.16)",
                    }}
                    variants={curtainReveal}
                    initial="hidden"
                    animate="visible"
                    custom={0.55}
                  >
                    Shipping
                  </motion.span>
                </div>

                {/* Line 3 — white + blue accent word */}
                <div className="overflow-hidden">
                  <motion.span
                    className="block font-black text-white"
                    style={{ fontSize: "clamp(42px, 6.5vw, 92px)" }}
                    variants={curtainReveal}
                    initial="hidden"
                    animate="visible"
                    custom={0.7}
                  >
                    UK &amp;{" "}
                    <span className="relative inline-block text-[#1F51FF]">
                      Nigeria
                      <motion.span
                        className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full"
                        aria-hidden="true"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.55, delay: 1.35 }}
                      />
                    </span>
                    .
                  </motion.span>
                </div>
              </h1>
            </div>

            {/* ── Subtext ── */}
            <motion.p
              className="text-white/50 font-light leading-[1.85] max-w-[520px]"
              style={{ fontSize: "clamp(13px, 1.2vw, 16px)" }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.92}
              itemProp="description"
            >
              Air freight, sea freight, and door-to-door logistics solutions
              connecting businesses and families across continents.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 1.0 },
                },
              }}
            >
              {/* Primary */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <Link
                  href="/quote"
                  aria-label="Get a shipping quote from R-Zone Enterprises"
                  className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white font-black tracking-[0.1em] uppercase rounded-sm transition-all duration-200 shadow-lg shadow-[#0818A8]/35 hover:shadow-[#0437F2]/40 text-[11px] sm:text-[12px] px-6 sm:px-7 py-3 sm:py-3.5"
                >
                  Get a Quote
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </motion.div>

              {/* Secondary */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <Link
                  href="/track"
                  aria-label="Track your R-Zone shipment in real time"
                  className="group inline-flex items-center gap-2.5 border border-white/22 hover:border-white/50 bg-white/[0.06] hover:bg-white/12 backdrop-blur-sm text-white font-bold tracking-[0.08em] uppercase rounded-sm transition-all duration-200 text-[11px] sm:text-[12px] px-6 sm:px-7 py-3 sm:py-3.5"
                >
                  Track Shipment
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </motion.div>

              {/* Watch reel */}
              <motion.button
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.4 } },
                }}
                className="hidden sm:inline-flex items-center gap-2.5 text-white/38 hover:text-white/68 transition-colors duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Watch R-Zone Enterprises overview"
              >
                <div className="w-9 h-9 rounded-full border border-white/18 hover:border-white/42 flex items-center justify-center transition-colors">
                  <Play size={11} className="ml-0.5 fill-current" aria-hidden="true" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase">
                  Watch Overview
                </span>
              </motion.button>
            </motion.div>

          </div>

          {/* ── BOTTOM BAR — stats LEFT, est + scroll RIGHT ── */}
          <div className="flex-shrink-0 flex items-end justify-between pb-4 sm:pb-5 md:pb-6 gap-6">

            {/* Stats — clean text, no cards, animated roll-in */}
            <motion.div
              className="flex items-end gap-5 sm:gap-7 md:gap-9"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.09, delayChildren: 1.25 },
                },
              }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col gap-0.5"
                  variants={{
                    hidden:   { opacity: 0, y: 16 },
                    visible:  { opacity: 1, y: 0, transition: { duration: 0.45 } },
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <span
                    className="text-white font-black leading-none tracking-[-0.02em] tabular-nums"
                    style={{ fontSize: "clamp(18px, 2.4vw, 34px)" }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span
                    className="text-white/32 font-medium tracking-[0.14em] uppercase"
                    style={{ fontSize: "clamp(7.5px, 0.62vw, 10px)" }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Est. + Scroll */}
            <motion.div
              className="flex flex-col items-end gap-1.5"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={1.85}
            >
              <span
                className="text-white/18 font-semibold tracking-[0.2em] uppercase"
                style={{ fontSize: "clamp(7px, 0.6vw, 10px)" }}
              >
                Est. 2012 · Essex, UK
              </span>
              <motion.button
                onClick={() =>
                  window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
                }
                className="flex items-center gap-1.5 text-white/28 hover:text-white/55 transition-colors duration-200"
                whileHover={{ y: 1 }}
                aria-label="Scroll down to explore our services"
              >
                <span
                  className="font-medium tracking-[0.18em] uppercase"
                  style={{ fontSize: "clamp(7px, 0.6vw, 10px)" }}
                >
                  Scroll
                </span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown size={11} aria-hidden="true" />
                </motion.div>
              </motion.button>
            </motion.div>

          </div>
        </div>

        {/* ── Vertical brand text — xl screens only ── */}
        <motion.div
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-3 pointer-events-none"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <div className="w-px h-14 bg-white/12" />
          <span
            className="text-white/16 font-bold tracking-[0.32em] uppercase"
            style={{
              fontSize: 9,
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            Cargo · UK to Nigeria · Since 2012
          </span>
          <div className="w-px h-14 bg-white/12" />
        </motion.div>

      </section>
    </>
  );
}