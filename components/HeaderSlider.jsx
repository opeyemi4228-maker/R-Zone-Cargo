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
  useScroll,
  useTransform,
} from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }) {
  const ref       = useRef(null);
  const inView    = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring    = useSpring(motionVal, { stiffness: 55, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => { if (inView) motionVal.set(target); }, [inView, target, motionVal]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.floor(v))), [spring]);

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 12,  suffix: "+", label: "Years Experience"    },
  { value: 6,   suffix: "",  label: "Continents Covered"  },
  { value: 500, suffix: "+", label: "Tons Delivered"       },
  { value: 107, suffix: "+", label: "5\u2011Star Reviews"  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const curtainReveal = {
  hidden:  { y: "105%", opacity: 0 },
  visible: (d = 0) => ({
    y: "0%", opacity: 1,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: d },
  }),
};

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (d = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: d },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const { scrollY }    = useScroll();
  const imgParallax    = useTransform(scrollY, [0, 700], [0, 130]);
  const contentFadeOut = useTransform(scrollY, [0, 480], [1, 0.6]);

  return (
    <section className="hero-section">

      {/* ── JSON-LD ── */}
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
            "description": "R-Zone Enterprises — the highest-rated organically earned cargo and logistics company between the UK, Nigeria, and across Africa. Door-to-door cargo, air freight, sea freight with weekly sailings, car shipping, and importation services.",
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
                "streetAddress": "Unit 10 Moorhen Yard, Elms Lane, Bulphan",
                "addressLocality": "Upminster",
                "postalCode": "RM14 3TS",
                "addressCountry": "GB",
                "name": "R-Zone UK Office",
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "1-3 R-Zone Crescent, Queens Park Estate II, Shagam Interchange",
                "addressLocality": "Lagos",
                "addressCountry": "NG",
                "name": "R-Zone Nigeria Warehouse",
              },
            ],
            "areaServed": [
              { "@type": "Country",   "name": "United Kingdom" },
              { "@type": "Country",   "name": "Nigeria" },
              { "@type": "Continent", "name": "Africa" },
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "R-Zone Shipping Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Air Freight to Nigeria from UK" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Door to Door Cargo to Nigeria" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sea Shipping to Nigeria — Weekly Sailings" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Shipping to Nigeria" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Importation from Nigeria to UK" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cargo to Nigeria" } },
              ],
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "107",
              "bestRating": "5",
              "worstRating": "1",
            },
            "sameAs": [
              "https://www.instagram.com/rzoneenterprises",
              "https://www.facebook.com/share/1Gfw2SvFgY/?mibextid=wwXIfr",
            ],
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+44-800-772-0864",
                "contactType": "customer service",
                "areaServed": "GB",
                "availableLanguage": ["English"],
                "hoursAvailable": "Mo-Fr 10:00-18:00",
              },
              {
                "@type": "ContactPoint",
                "telephone": "+234-906-680-6861",
                "contactType": "customer service",
                "areaServed": "NG",
                "availableLanguage": ["English"],
              },
            ],
          }),
        }}
      />

      {/* ════════════════════════════════════════════════════════════════════
          HERO SHELL
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`
          ${montserrat.variable}
          font-[family-name:var(--font-montserrat)]
          relative w-full overflow-hidden bg-[#00040f]
          h-[70vh] min-h-[540px]
          md:h-[70vh] md:min-h-[600px]
          lg:h-[70dvh] lg:min-h-[660px] lg:max-h-[920px]
        `}
        aria-label="R-Zone Enterprises — The Highest-Rated Cargo Specialists Between the UK and Nigeria"
        role="banner"
        itemScope
        itemType="https://schema.org/WPHeader"
      >

        {/* ── Right-half parallax image panel ── */}
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[56%] overflow-hidden z-0"
          aria-hidden="true"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              y: imgParallax,
              backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&q=85')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              WebkitUserSelect: "none",
              userSelect: "none",
              WebkitTouchCallout: "none",
              pointerEvents: "none",
              willChange: "transform",
            }}
            initial={{ scale: 1.07, opacity: 0 }}
            animate={{ scale: 1.0, opacity: 1 }}
            transition={{ duration: 2.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Three-layer gradient blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00040f] via-[#00040f]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00040f] via-transparent to-[#00040f]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00040f]/80" />
        </div>

        {/* ── Grid texture ── */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.028] pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* ── Left atmospheric glow ── */}
        <div
          className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full blur-[160px] z-[1] pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(8,24,168,0.22) 0%, transparent 60%)" }}
        />

        {/* ── Bottom centre glow ── */}
        <div
          className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[120px] z-[1] pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(8,24,168,0.08) 0%, transparent 65%)" }}
        />

        {/* ── Accent vertical lines ── */}
        {[8, 28].map((pos, i) => (
          <motion.div
            key={pos}
            className="absolute top-0 bottom-0 w-px z-[2] pointer-events-none"
            aria-hidden="true"
            style={{
              left: `${pos}%`,
              background:
                "linear-gradient(to bottom, transparent 5%, rgba(31,81,255,0.32) 40%, transparent 95%)",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.9 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {/* ── Right-edge accent line ── */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-px z-[2] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to bottom, transparent 10%, rgba(31,81,255,0.38) 50%, transparent 90%)",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* ── Bottom rule ── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px z-[2] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.3, delay: 1.6 }}
        />

        {/* ── Animated route SVG — dashed arc UK → NG ── */}
        <div
          className="absolute bottom-[20%] left-0 right-0 pointer-events-none overflow-hidden z-[2]"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1400 80"
            className="w-full opacity-[0.065]"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 0 40 Q 350 10 700 40 Q 1050 70 1400 40"
              fill="none"
              stroke="#1F51FF"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.4, delay: 1.4, ease: "easeOut" }}
            />
          </svg>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            MAIN LAYOUT
        ════════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="relative z-10 h-full max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 flex flex-col"
          style={{ opacity: contentFadeOut }}
        >

          {/* Navbar spacer */}
          <div className="h-[76px] sm:h-[84px] flex-shrink-0" />

          {/* ── CENTRE CONTENT ── */}
          <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-5">

            {/* Tag pill */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.2}>
              <div className="inline-flex items-center gap-2.5 border border-[#1F51FF]/25 bg-[#0818A8]/12 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
                <motion.span
                  className="w-2 h-2 rounded-full bg-[#1F51FF] flex-shrink-0"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[#1F51FF] text-[10px] font-bold tracking-[0.28em] uppercase">
                  UK &amp; Africa Freight Specialists
                </span>
              </div>
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

                {/* Line 2 — ghost outline (decorative — opacity on stroke only, not text) */}
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
                        className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                        style={{ background: "linear-gradient(to right, #0818A8, #1F51FF)" }}
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
              className="text-white/80 font-light leading-[1.85] max-w-[520px]"
              style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.92}
              itemProp="description"
            >
              The highest-rated organically earned cargo &amp; logistics company
              between the UK, Nigeria, and across Africa. Air freight, sea freight
              with weekly sailings, and door-to-door delivery — precision you can trust.
            </motion.p>

            {/* ── CTAs ── */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden:  {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 1.0 } },
              }}
            >
              {/* Primary CTA */}
              <motion.div
                variants={{
                  hidden:  { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <Link
                  href="/quote"
                  aria-label="Get a shipping quote from R-Zone Enterprises"
                  className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white font-black tracking-[0.1em] uppercase rounded-sm transition-all duration-200 shadow-lg shadow-[#0818A8]/35 hover:shadow-[#0437F2]/40 text-[11px] sm:text-[12px] px-6 sm:px-7 py-3 sm:py-3.5"
                >
                  Get a Quote
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                variants={{
                  hidden:  { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <Link
                  href="/track"
                  aria-label="Track your R-Zone shipment in real time"
                  className="group inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/12 backdrop-blur-sm text-white font-bold tracking-[0.08em] uppercase rounded-sm transition-all duration-200 text-[11px] sm:text-[12px] px-6 sm:px-7 py-3 sm:py-3.5"
                >
                  Track Shipment
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </motion.div>

              {/* Watch overview */}
              <motion.button
                variants={{
                  hidden:  { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.4 } },
                }}
                className="hidden sm:inline-flex items-center gap-2.5 text-white/80 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Watch R-Zone Enterprises overview"
              >
                <div className="w-9 h-9 rounded-full border border-white/25 hover:border-white/50 flex items-center justify-center transition-colors">
                  <Play size={11} className="ml-0.5 fill-current" aria-hidden="true" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase">
                  Watch Overview
                </span>
              </motion.button>
            </motion.div>

          </div>

          {/* ── BOTTOM BAR — stats LEFT + est/scroll RIGHT ── */}
          <div className="flex-shrink-0 flex items-end justify-between pb-4 sm:pb-5 md:pb-6 gap-6">

            {/* Animated stats */}
            <motion.div
              className="flex items-end gap-5 sm:gap-7 md:gap-9"
              initial="hidden"
              animate="visible"
              variants={{
                hidden:  {},
                visible: { transition: { staggerChildren: 0.09, delayChildren: 1.25 } },
              }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col gap-0.5"
                  variants={{
                    hidden:  { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
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
                    className="text-white/80 font-medium tracking-[0.14em] uppercase"
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
                className="text-white/80 font-semibold tracking-[0.2em] uppercase"
                style={{ fontSize: "clamp(7px, 0.6vw, 10px)" }}
              >
                Est. 2012 · Essex, UK
              </span>
              <motion.button
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
                className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-200"
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
        </motion.div>

        {/* ── Vertical brand text — xl screens only ── */}
        <motion.div
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-3 pointer-events-none"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <div className="w-px h-14 bg-white/20" />
          <span
            className="text-white/80 font-bold tracking-[0.32em] uppercase"
            style={{ fontSize: 9, writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Cargo · UK to Nigeria · Since 2012
          </span>
          <div className="w-px h-14 bg-white/20" />
        </motion.div>

      </section>
    </section>
  );
}