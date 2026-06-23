"use client";

import { Montserrat } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Plane,
  Ship,
  ShieldCheck,
  Star,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

function AnimatedCounter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 55, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    return spring.on("change", (value) => setDisplay(Math.floor(value)));
  }, [spring]);

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 12, suffix: "+", label: "Years Operating" },
  { value: 50000, suffix: "+", label: "Shipments Delivered" },
  { value: 100, suffix: "+", label: "5-Star Reviews" },
  { value: 36, suffix: "", label: "Nigerian States" },
];

const SERVICES = [
  { label: "Air Freight", icon: Plane, href: "/services#air-freight" },
  { label: "Sea Freight", icon: Ship, href: "/services#sea-freight" },
  { label: "Door-to-Door", icon: ShieldCheck, href: "/services#door-to-door" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  }),
};

const reveal = {
  hidden: { y: "105%", opacity: 0 },
  visible: (delay = 0) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["FreightForwarder", "LocalBusiness"],
      "@id": "https://r-zoneenterprises.com/#organization",
      name: "R-Zone Enterprises",
      alternateName: ["R-Zone Cargo", "RZE Cargo", "R-Zone Shipping"],
      url: "https://r-zoneenterprises.com",
      logo: "https://r-zoneenterprises.com/wp-content/uploads/2022/09/Logo-colour-112.png",
      description:
        "R-Zone Enterprises provides air freight, sea freight, customs clearance and door-to-door cargo services between the UK and Nigeria.",
      foundingDate: "2012",
      telephone: "+448007720864",
      email: "info@r-zoneenterprises.com",
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Nigeria" },
        { "@type": "City", name: "London" },
        { "@type": "City", name: "Lagos" },
        { "@type": "City", name: "Abuja" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "100",
        bestRating: "5",
        worstRating: "1",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+44-800-772-0864",
          contactType: "customer service",
          areaServed: "GB",
        },
        {
          "@type": "ContactPoint",
          telephone: "+234-906-680-6861",
          contactType: "customer service",
          areaServed: "NG",
        },
        {
          "@type": "ContactPoint",
          telephone: "+447915647119",
          contactType: "WhatsApp",
        },
      ],
    },
  ],
};

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const imgParallax = useTransform(
    scrollY,
    [0, 700],
    [0, shouldReduceMotion ? 0 : 80]
  );

  return (
    <section className="hero-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        aria-labelledby="hero-heading"
        role="banner"
        itemScope
        itemType="https://schema.org/WPHeader"
        className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] relative isolate w-full min-h-[100svh] overflow-hidden bg-[#00040f] text-white [--nav-height:80px] md:[--nav-height:50px] lg:[--nav-height:100px]`}
      >
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
          onContextMenu={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              y: imgParallax,
              backgroundImage:
                "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&q=85')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              pointerEvents: "none",
              userSelect: "none",
            }}
            initial={shouldReduceMotion ? false : { scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#00040f] via-[#00040f]/85 to-[#00040f]/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00040f] via-[#00040f]/20 to-[#00040f]/38" />
        </div>

        <div
          className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div
          className="absolute left-[-12%] top-[-18%] z-[1] h-[620px] w-[620px] rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle, rgba(8,24,168,0.24) 0%, transparent 64%)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-5 pt-[var(--nav-height)] sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-1 items-center py-8 sm:py-10 lg:py-12">
            <div className="w-full max-w-[920px]">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.1}
                className="mb-5"
              >
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-3.5 py-1.5 backdrop-blur-sm">
                  <Star
                    size={12}
                    className="shrink-0 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                  <span className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-amber-300 sm:text-[11px]">
                    #1 Ranked UK-Nigeria Cargo on Google
                  </span>
                </div>
              </motion.div>

              <h1
                id="hero-heading"
                itemProp="headline"
                className="max-w-[900px] uppercase leading-[0.9] tracking-[-0.02em]"
              >
                <span className="block overflow-hidden">
                  <motion.span
                    className="block font-black text-white"
                    style={{ fontSize: "clamp(44px, 7vw, 104px)" }}
                    variants={reveal}
                    initial="hidden"
                    animate="visible"
                    custom={0.24}
                  >
                    Cargo Shipping
                  </motion.span>
                </span>

                <span className="block overflow-hidden">
                  <motion.span
                    className="block font-black"
                    style={{
                      fontSize: "clamp(44px, 7vw, 104px)",
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(255,255,255,0.65)",
                    }}
                    variants={reveal}
                    initial="hidden"
                    animate="visible"
                    custom={0.38}
                  >
                    UK to Nigeria
                  </motion.span>
                </span>

                <span className="block overflow-hidden">
                  <motion.span
                    className="block font-black text-white"
                    style={{ fontSize: "clamp(44px, 7vw, 104px)" }}
                    variants={reveal}
                    initial="hidden"
                    animate="visible"
                    custom={0.52}
                  >
                    &amp; Back.
                  </motion.span>
                </span>
              </h1>

              <motion.p
                itemProp="description"
                className="mt-5 max-w-[700px] text-[18px] font-normal leading-7 text-white sm:text-[15px] md:text-[16px]"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.76}
              >
                Cargo to Nigeria from UK by air freight, weekly sea freight to Nigeria from UK,
                door to door cargo Nigeria, Nigeria customs clearance UK and door-to-door delivery across Lagos, Abuja
                and all 36 Nigerian states and back.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.92}
              >
                <Link
                  href="/quote"
                  aria-label="Get a free UK to Nigeria cargo quote"
                  className="group inline-flex min-h-12 items-center gap-2.5 rounded-sm bg-[#0818A8] px-6 py-3 text-[12px] font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-[#0818A8]/35 transition-all duration-200 hover:bg-[#0437F2] sm:px-7"
                >
                  Get a Free Quote
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>

                <a
                  href="https://wa.me/447915647119"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact R-Zone on WhatsApp"
                  className="group inline-flex min-h-12 items-center gap-2.5 rounded-sm border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-[12px] font-black uppercase tracking-[0.12em] text-emerald-300 transition-all duration-200 hover:border-emerald-400/70 hover:bg-emerald-500/16 sm:px-7"
                >
                  <FaWhatsapp size={15} aria-hidden="true" />
                  WhatsApp
                </a>

                <Link
                  href="/track"
                  aria-label="Track your shipment"
                  className="group inline-flex min-h-12 items-center gap-2.5 rounded-sm border border-white/20 bg-white/[0.055] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:border-white/45 hover:bg-white/10 sm:px-7"
                >
                  Track Shipment
                </Link>
              </motion.div>

              <motion.nav
                aria-label="Popular R-Zone services"
                className="mt-6 flex flex-wrap gap-2"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1.06}
              >
                {SERVICES.map((service) => {
                  const Icon = service.icon;

                  return (
                    <Link
                      key={service.label}
                      href={service.href}
                      className="inline-flex items-center gap-2 border border-white/[0.12] bg-white/[0.045] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/76 transition-all duration-200 hover:border-[#1F51FF]/55 hover:bg-[#0818A8]/20 hover:text-white"
                    >
                      <Icon size={13} aria-hidden="true" />
                      {service.label}
                    </Link>
                  );
                })}
              </motion.nav>
            </div>
          </div>

          <div className="flex shrink-0 items-end justify-between gap-6 pb-5 sm:pb-6 md:pb-8">
            <motion.div
              className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:items-end sm:gap-8 md:gap-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 1.18,
                  },
                },
              }}
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col gap-1"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45 },
                    },
                  }}
                >
                  <span
                    className="text-white font-black leading-none tracking-[-0.02em] tabular-nums"
                    style={{ fontSize: "clamp(20px, 2.45vw, 34px)" }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span
                    className="text-white/62 font-semibold uppercase tracking-[0.14em]"
                    style={{ fontSize: "clamp(8px, 0.68vw, 10px)" }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }
              className="hidden items-center gap-2 text-white/62 transition-colors duration-200 hover:text-white md:flex"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1.42}
              whileHover={{ y: 1 }}
              aria-label="Scroll down to explore cargo services"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Explore
              </span>
              <motion.span
                animate={shouldReduceMotion ? undefined : { y: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown size={14} aria-hidden="true" />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </section>
    </section>
  );
}