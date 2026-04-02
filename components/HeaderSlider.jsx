"use client";

import { Montserrat } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Star, MessageCircle } from "lucide-react";
import {
  motion, useInView, useMotionValue, useSpring, useScroll, useTransform,
} from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

function AnimatedCounter({ target, suffix = "" }) {
  const ref       = useRef(null);
  const inView    = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring    = useSpring(motionVal, { stiffness: 55, damping: 18 });
  const [display, setDisplay] = useState(0);
  useEffect(() => { if (inView) motionVal.set(target); }, [inView, target, motionVal]);
  useEffect(() => spring.on("change", v => setDisplay(Math.floor(v))), [spring]);
  return <span ref={ref} aria-label={`${target}${suffix}`}>{display.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { value: 12,    suffix: "+", label: "Years Operating"     },
  { value: 50000, suffix: "+", label: "Shipments Delivered" },
  { value: 100,   suffix: "+", label: "5-Star Reviews"      },
  { value: 36,    suffix: "",  label: "Nigerian States"     },
];

const LINKS = [
  { id: "air", label: "Air Freight UK–Nigeria",  href: "/services",  title: "Air freight UK to Nigeria — weekly departures"       },
  { id: "sea", label: "Sea Freight UK–Nigeria",  href: "/services",  title: "Sea freight UK to Nigeria — from £3/kg, 4–6 weeks"   },
  { id: "d2d", label: "Door-to-Door Cargo",      href: "/services",  title: "Door to door cargo UK to Nigeria"                    },
  { id: "abuja", label: "Cargo to Abuja",        href: "/services",  title: "Cargo shipping from UK to Abuja"                     },
  { id: "lagos", label: "Cargo to Lagos",        href: "/services",  title: "Cargo shipping from UK to Lagos"                     },
  { id: "import", label: "Import from Nigeria",  href: "/services",  title: "Import goods from Nigeria to UK — weekly services"   },
];

const curtainReveal = {
  hidden:  { y: "105%", opacity: 0 },
  visible: (d = 0) => ({ y: "0%", opacity: 1, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: d } }),
};
const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (d = 0) => ({ opacity: 1, transition: { duration: 0.7, ease: "easeOut", delay: d } }),
};

export default function HeroSection() {
  const { scrollY }    = useScroll();
  const imgParallax    = useTransform(scrollY, [0, 700], [0, 130]);
  const contentFadeOut = useTransform(scrollY, [0, 480], [1, 0.6]);

  return (
    <section className="hero-section">

      {/* ── Schema ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["FreightForwarder", "LocalBusiness"],
            "@id": "https://r-zoneenterprises.com/#organization",
            "name": "R-Zone Enterprises",
            "alternateName": ["R-Zone Cargo", "RZE Cargo", "R-Zone Shipping"],
            "url": "https://r-zoneenterprises.com",
            "logo": "https://r-zoneenterprises.com/wp-content/uploads/2022/09/Logo-colour-112.png",
            "description": "R-Zone Enterprises is the highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — 100+ five-star reviews, organically earned. Air freight, sea freight with weekly sailings, door-to-door cargo and customs clearance between the UK and Nigeria since 2012.",
            "slogan": "The Highest-Rated & Highest-Ranked Cargo Company Between the UK and Nigeria",
            "foundingDate": "2012",
            "telephone": "+448007720864",
            "email": "info@r-zoneenterprises.com",
            "currenciesAccepted": "GBP, NGN",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
            "openingHours": ["Mo-Fr 10:00-18:00", "Sa 11:00-14:00"],
            "address": [
              { "@type": "PostalAddress", "streetAddress": "Unit 9 Moorhen Yard, Elms Lane, Bulphan", "addressLocality": "Upminster", "addressRegion": "Essex", "postalCode": "RM14 3TS", "addressCountry": "GB" },
              { "@type": "PostalAddress", "streetAddress": "1-3 R-Zone Crescent, Queens Park Estate II, Shagam Interchange", "addressLocality": "Lagos", "addressCountry": "NG", "description": "Collection Points: Egbeda, Surulele, Ajah, Ibadan" },
            ],
            "areaServed": [
              { "@type": "Country", "name": "United Kingdom" },
              { "@type": "Country", "name": "Nigeria" },
              { "@type": "City", "name": "London" },
              { "@type": "City", "name": "Lagos" },
              { "@type": "City", "name": "Abuja" },
              { "@type": "City", "name": "Manchester" },
              { "@type": "Continent", "name": "Africa" },
            ],
            "knowsAbout": [
              "Cargo shipping UK to Nigeria", "Air freight Nigeria to UK", "Sea freight UK to Nigeria",
              "Door to door cargo Nigeria", "Customs clearance Nigeria", "Freight forwarding Abuja",
              "Shipping company Lagos", "Cheapest way to ship from UK to Nigeria",
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "UK–Nigeria Cargo & Freight Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Air Freight UK to Nigeria", "description": "Weekly air cargo from London to Lagos and Abuja. 5–10 working days.", "offers": { "@type": "Offer", "priceCurrency": "GBP", "price": "5", "unitText": "per kg" } } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sea Freight UK to Nigeria — Weekly Sailings", "description": "Weekly consolidated sea freight to Lagos Apapa and Tin Can Island. 4–6 weeks. From £3/kg.", "offers": { "@type": "Offer", "priceCurrency": "GBP", "price": "3", "unitText": "per kg" } } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Door to Door Cargo UK to Nigeria", "description": "UK door collection to any of Nigeria's 36 states including Lagos, Abuja, Port Harcourt and Kano." } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Importation from Nigeria to UK", "description": "Weekly air and sea from Nigeria to UK. Full customs clearance included." } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cargo Services Abuja & Lagos", "description": "Door-to-door cargo to Abuja, Lagos and all 36 Nigerian states.", "areaServed": ["Abuja", "Lagos", "Nigeria"] } },
              ],
            },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "100", "bestRating": "5", "worstRating": "1", "description": "Highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — 100+ five-star reviews, organically earned." },
            "sameAs": ["https://www.instagram.com/rzoneenterprises", "https://www.facebook.com/share/1Gfw2SvFgY/?mibextid=wwXIfr"],
            "contactPoint": [
              { "@type": "ContactPoint", "telephone": "+44-800-772-0864", "contactType": "customer service", "areaServed": "GB", "hoursAvailable": "Mo-Fr 10:00-18:00", "contactOption": "TollFree" },
              { "@type": "ContactPoint", "telephone": "+234-906-680-6861", "contactType": "customer service", "areaServed": "NG" },
              { "@type": "ContactPoint", "telephone": "+447915647119",    "contactType": "customer service", "contactOption": "WhatsApp" },
            ],
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How long does shipping from UK to Nigeria take?", "acceptedAnswer": { "@type": "Answer", "text": "Air freight takes 5–10 working days. Sea freight takes 4–6 weeks. R-Zone operates weekly departures on both routes." } },
              { "@type": "Question", "name": "How much does cargo from UK to Nigeria cost per kg?", "acceptedAnswer": { "@type": "Answer", "text": "Sea freight from £3/kg (4–6 weeks). Air freight from £5/kg (5–10 working days). Door-to-door from £6/kg. Get a free quote from R-Zone." } },
              { "@type": "Question", "name": "What is the cheapest way to ship from UK to Nigeria?", "acceptedAnswer": { "@type": "Answer", "text": "Sea freight — from £3/kg, with weekly sailings from UK ports to Lagos Apapa and Tin Can Island. Transit 4–6 weeks." } },
              { "@type": "Question", "name": "Does R-Zone deliver to Abuja and all Nigerian states?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. R-Zone delivers door-to-door to all 36 Nigerian states including Lagos, Abuja, Port Harcourt, Kano, Ibadan and Enugu." } },
              { "@type": "Question", "name": "Is R-Zone the best cargo company from UK to Nigeria?", "acceptedAnswer": { "@type": "Answer", "text": "R-Zone is the highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — 100+ five-star reviews, organically earned. Operating since 2012 with in-house teams in Upminster, Essex and Lagos, Nigeria." } },
              { "@type": "Question", "name": "Can I ship goods from Nigeria to the UK?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. R-Zone runs weekly air and sea importation services from Nigeria to the UK, with full UK customs clearance included." } },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://r-zoneenterprises.com/#website",
            "url": "https://r-zoneenterprises.com",
            "name": "R-Zone Enterprises — #1 Ranked Cargo Shipping UK to Nigeria",
            "publisher": { "@id": "https://r-zoneenterprises.com/#organization" },
            "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://r-zoneenterprises.com/track?ref={search_term_string}" }, "query-input": "required name=search_term_string" },
          },
        ],
      })}} />

      {/* ── Hero Shell ── */}
      <section
        className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] relative w-full overflow-hidden bg-[#00040f] h-[70vh] min-h-[560px] md:h-[70vh] md:min-h-[620px] lg:h-[70dvh] lg:min-h-[680px] lg:max-h-[940px]`}
        aria-labelledby="hero-heading"
        role="banner"
        itemScope itemType="https://schema.org/WPHeader"
      >

        {/* Background image */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[56%] overflow-hidden z-0" aria-hidden="true"
          onContextMenu={e => e.preventDefault()} onDragStart={e => e.preventDefault()}>
          <motion.div className="absolute inset-0"
            style={{ y: imgParallax, backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&q=85')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", WebkitUserSelect: "none", userSelect: "none", pointerEvents: "none", willChange: "transform" }}
            initial={{ scale: 1.07, opacity: 0 }} animate={{ scale: 1.0, opacity: 1 }}
            transition={{ duration: 2.0, ease: [0.25, 0.46, 0.45, 0.94] }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00040f] via-[#00040f]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00040f] via-transparent to-[#00040f]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00040f]/80" />
        </div>

        {/* Grid texture */}
        <div className="absolute inset-0 z-[1] opacity-[0.028] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />

        {/* Glows */}
        <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full blur-[160px] z-[1] pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(8,24,168,0.22) 0%, transparent 60%)" }} />
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[120px] z-[1] pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(8,24,168,0.08) 0%, transparent 65%)" }} />

        {/* Accent lines */}
        {[8, 28].map((pos, i) => (
          <motion.div key={pos} className="absolute top-0 bottom-0 w-px z-[2] pointer-events-none" aria-hidden="true"
            style={{ left: `${pos}%`, background: "linear-gradient(to bottom, transparent 5%, rgba(31,81,255,0.32) 40%, transparent 95%)" }}
            initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.9 + i * 0.15, ease: [0.22, 1, 0.36, 1] }} />
        ))}
        <motion.div className="absolute right-0 top-0 bottom-0 w-px z-[2] pointer-events-none" aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, transparent 10%, rgba(31,81,255,0.38) 50%, transparent 90%)" }}
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 1.05, ease: [0.22, 1, 0.36, 1] }} />
        <motion.div className="absolute bottom-0 left-0 right-0 h-px z-[2] pointer-events-none" aria-hidden="true"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.3, delay: 1.6 }} />

        {/* Route arc */}
        <div className="absolute bottom-[20%] left-0 right-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
          <svg viewBox="0 0 1400 80" className="w-full opacity-[0.065]" preserveAspectRatio="none">
            <motion.path d="M 0 40 Q 350 10 700 40 Q 1050 70 1400 40" fill="none" stroke="#1F51FF"
              strokeWidth="1.5" strokeDasharray="8 6"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.4, delay: 1.4, ease: "easeOut" }} />
          </svg>
        </div>

        {/* ── Content ── */}
        <motion.div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 flex flex-col"
          style={{ opacity: contentFadeOut }}>

          <div className="h-[76px] sm:h-[84px] flex-shrink-0" />

          <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-5">

            {/* Authority pills */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.15}>
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 border border-amber-400/35 bg-amber-400/8 backdrop-blur-sm px-3.5 py-1.5 rounded-full" itemProp="award">
                  <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-amber-400 text-[11px] font-black tracking-[0.22em] uppercase">
                    #1 Ranked UK–Nigeria Cargo on Google · 100+ Five-Star Reviews
                  </span>
                </div>
                <div className="hidden lg:inline-flex items-center gap-2.5 border border-[#1F51FF]/25 bg-[#0818A8]/12 backdrop-blur-sm px-4 py-1.5 rounded-full">
                  <motion.span className="w-2 h-2 rounded-full bg-[#1F51FF] flex-shrink-0"
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} aria-hidden="true" />
                  <span className="text-[#1F51FF] text-[11px] font-bold tracking-[0.28em] uppercase">
                    UK &amp; Nigeria Freight Specialists · Est. 2012
                  </span>
                </div>
              </div>
            </motion.div>

            {/* H1 — target: "Cargo Shipping UK to Nigeria" */}
            <h1 id="hero-heading" className="leading-[0.86] tracking-[-0.025em] uppercase" itemProp="headline">
              <div className="overflow-hidden">
                <motion.span className="block font-black text-white" style={{ fontSize: "clamp(42px, 6.5vw, 92px)" }}
                  variants={curtainReveal} initial="hidden" animate="visible" custom={0.4}>
                  Cargo Shipping
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span className="block font-black" style={{ fontSize: "clamp(42px, 6.5vw, 92px)", color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}
                  variants={curtainReveal} initial="hidden" animate="visible" custom={0.55}>
                  UK to
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span className="block font-black text-white" style={{ fontSize: "clamp(42px, 6.5vw, 92px)" }}
                  variants={curtainReveal} initial="hidden" animate="visible" custom={0.7}>
                  <span className="relative inline-block text-[#1F51FF]">
                    Nigeria
                    <motion.span className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                      style={{ background: "linear-gradient(to right, #0818A8, #1F51FF)" }} aria-hidden="true"
                      initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.55, delay: 1.35 }} />
                  </span>
                  {" "}&amp; Back.
                </motion.span>
              </div>
            </h1>

            {/* Subtext — tight, keyword-rich, no filler */}
            <motion.p
              className="text-white/80 font-normal leading-relaxed max-w-[800px]"
              style={{ fontSize: "clamp(13px, 1.15vw, 15px)" }}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.92}
              itemProp="description"
            >
              The{" "}
              <strong className="text-white font-semibold">highest-rated, #1 ranked UK–Nigeria cargo company on Google</strong>
              {" "}— air freight, weekly sea sailings, and door-to-door delivery to{" "}
              <Link href="/services#air-freight" className="text-white/80 underline underline-offset-2 hover:text-white transition-colors" title="Cargo to Lagos from UK">Lagos</Link>
              ,{" "}
              <Link href="/services#air-freight" className="text-white/80 underline underline-offset-2 hover:text-white transition-colors" title="Cargo to Abuja from UK">Abuja</Link>
              {" "}and all 36 Nigerian states. Collected across the UK.
            </motion.p>

            {/* Service quick-links */}
            <motion.nav aria-label="R-Zone cargo services" className="flex flex-wrap gap-2"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.82}>
              {LINKS.map(item => (
                <Link key={item.id} href={item.href} title={item.title}
                  className="inline-flex items-center gap-1.5 border border-white/[0.12] bg-white/[0.04] hover:border-[#1F51FF]/50 hover:bg-[#0818A8]/15 text-white/80 hover:text-white text-[11px] font-semibold tracking-[0.06em] px-3 py-1.5 transition-all duration-200">
                  {item.label}
                  <ChevronDown size={9} className="rotate-[-90deg]" aria-hidden="true" />
                </Link>
              ))}
            </motion.nav>

            {/* CTAs */}
            <motion.div className="flex flex-wrap items-center gap-3" initial="hidden" animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 1.0 } } }}>
              <motion.div variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
                <Link href="/quote" aria-label="Get a free cargo shipping quote — R-Zone UK to Nigeria"
                  className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white font-black tracking-[0.1em] uppercase rounded-sm transition-all duration-200 shadow-lg shadow-[#0818A8]/35 text-[13px] px-6 sm:px-7 py-3 sm:py-3.5">
                  Get a Free Quote
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
                <a href="https://wa.me/447915647119" target="_blank" rel="noopener noreferrer"
                  aria-label="WhatsApp R-Zone — UK to Nigeria cargo enquiry"
                  className="group inline-flex items-center gap-2.5 border border-emerald-500/35 bg-emerald-500/8 hover:bg-emerald-500/15 hover:border-emerald-500/60 text-emerald-400 hover:text-emerald-300 font-bold tracking-[0.08em] uppercase rounded-sm transition-all duration-200 text-[13px] px-6 sm:px-7 py-3 sm:py-3.5">
                  <MessageCircle size={13} aria-hidden="true" />
                  WhatsApp Us
                </a>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
                <Link href="/track" aria-label="Track your UK to Nigeria shipment"
                  className="group inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/12 backdrop-blur-sm text-white font-bold tracking-[0.08em] uppercase rounded-sm transition-all duration-200 text-[13px] px-6 sm:px-7 py-3 sm:py-3.5">
                  Track Shipment
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>

          </div>

          {/* Bottom bar */}
          <div className="flex-shrink-0 flex items-end justify-between pb-4 sm:pb-5 md:pb-6 gap-6">
            <motion.div className="flex items-end gap-5 sm:gap-7 md:gap-9" initial="hidden" animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 1.25 } } }}>
              {STATS.map((stat, i) => (
                <motion.div key={i} className="flex flex-col gap-0.5"
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                  <span className="text-white font-black leading-none tracking-[-0.02em] tabular-nums"
                    style={{ fontSize: "clamp(18px, 2.4vw, 34px)" }}>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-white/80 font-medium tracking-[0.14em] uppercase"
                    style={{ fontSize: "clamp(7.5px, 0.62vw, 10px)" }}>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="flex flex-col items-end gap-1.5" variants={fadeIn} initial="hidden" animate="visible" custom={1.85}>
              <span className="text-white/80 font-semibold tracking-[0.16em] uppercase text-right"
                style={{ fontSize: "clamp(7px, 0.6vw, 10px)" }}>
                #1 on Google · Est. 2012 · Upminster, Essex
              </span>
              <motion.button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
                className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-200"
                whileHover={{ y: 1 }} aria-label="Scroll down to explore cargo services">
                <span className="font-medium tracking-[0.18em] uppercase" style={{ fontSize: "clamp(7px, 0.6vw, 10px)" }}>
                  Explore Services
                </span>
                <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                  <ChevronDown size={11} aria-hidden="true" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Vertical brand text */}
        <motion.div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-3 pointer-events-none"
          aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2.0 }}>
          <div className="w-px h-14 bg-white/20" />
          <span className="text-white/80 font-bold tracking-[0.32em] uppercase"
            style={{ fontSize: 9, writingMode: "vertical-rl", textOrientation: "mixed" }}>
            #1 UK–Nigeria Cargo · Air &amp; Sea Freight · Est. 2012
          </span>
          <div className="w-px h-14 bg-white/20" />
        </motion.div>

      </section>
    </section>
  );
}