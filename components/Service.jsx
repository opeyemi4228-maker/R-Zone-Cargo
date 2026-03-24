"use client";

import { Montserrat } from "next/font/google";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURED = {
  tag: "Core Service",
  title: "Door-to-Door Delivery",
  desc: "Complete end-to-end freight management from origin pickup to final-mile delivery — across Africa and globally. One point of contact. Zero complexity.",
  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=85",
  href: "/services/door-to-door",
};

const GRID_SERVICES = [
  {
    tag: "Air Freight",
    title: "Express Air Cargo",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    href: "/services/air-freight",
  },
  {
    tag: "Ocean Freight",
    title: "Sea & Ocean Shipping",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80",
    href: "/services/sea-freight",
  },
  {
    tag: "Warehousing",
    title: "Storage & Distribution",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
    href: "/services/warehousing",
  },
  {
    tag: "Road Transport",
    title: "Land Freight Network",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
    href: "/services/road-transport",
  },
  {
    tag: "Customs Clearance",
    title: "Import & Export Clearance",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    href: "/services/customs-clearance",
  },
  {
    tag: "Cargo Handling",
    title: "Port & Terminal Handling",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    href: "/services/cargo-handling",
  },
  {
    tag: "Project Cargo",
    title: "Heavy Lift & Oversized",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    href: "/services/project-cargo",
  },
  {
    tag: "Cold Chain",
    title: "Temperature-Controlled",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80",
    href: "/services/cold-chain",
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

// ─── Grid Card ────────────────────────────────────────────────────────────────

function GridCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={service.href}
        className="group block relative border border-gray-200 hover:border-[#0818A8]/30 bg-white hover:shadow-lg hover:shadow-[#0818A8]/8 transition-all duration-300 overflow-hidden"
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Blue overlay */}
          <div className="absolute inset-0 bg-[#0818A8]/0 group-hover:bg-[#0818A8]/12 transition-all duration-300" />
        </div>

        {/* Text */}
        <div className="px-5 py-4">
          <p className="text-[#0818A8] text-[13px] font-bold tracking-[0.2em] uppercase mb-1.5">
            {service.tag}
          </p>
          <h3 className="text-gray-900 font-black text-[14.5px] leading-snug tracking-[-0.01em] mb-3 group-hover:text-[#0818A8] transition-colors duration-200">
            {service.title}
          </h3>
          {/* Blue underline accent — matches Emirates red line */}
          <div className="w-8 h-[2px] bg-[#0818A8] mb-3 group-hover:w-14 transition-all duration-300 rounded-full" />
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 group-hover:text-[#0818A8] transition-colors duration-200 tracking-[0.02em]">
            Learn more
            <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function OurServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className={`${montserrat.className} bg-[#f8f9fb] py-20 md:py-28 overflow-hidden`}
      aria-label="R-Zone Cargo — Our Services"
    >
      {/* ── Subtle dot pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #0818A8 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Tag pill */}
          <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 border border-[#0818A8]/20 bg-[#0818A8]/5 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8]" />
              <span className="text-[#0818A8] text-[13px] font-semibold tracking-[0.22em] uppercase">
                Our Services
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            custom={0.1}
            className="text-gray-900 font-black text-[clamp(28px,5vw,56px)] leading-tight tracking-[-0.02em] mb-3"
          >
            Make it an{" "}
            <span className="relative inline-block text-[#0818A8]">
              incredible journey
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              />
            </span>
            .
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="text-gray-500 text-[13px] font-normal tracking-[0.02em] leading-relaxed max-w-xl mx-auto"
          >
            Explore R-Zone Cargo's full suite of logistics solutions and plan
            the most efficient route for your freight — wherever in the world it
            needs to go.
          </motion.p>
        </motion.div>

        {/* ── MAIN GRID — mirrors Emirates layout exactly ── */}
        {/*
          Desktop: Featured card (tall, left, spans 2 rows) + 2×2 grid right
          Then second row: 4 equal cards
        */}

        {/* ROW 1: Featured (left) + 2×2 (right) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Featured card — spans 2 rows on md */}
          <motion.div
            className="md:row-span-2 md:col-span-1"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              href={FEATURED.href}
              className="group relative flex flex-col justify-end border border-gray-200 hover:border-[#0818A8]/40 bg-white overflow-hidden h-full min-h-[380px] md:min-h-[520px] hover:shadow-xl hover:shadow-[#0818A8]/10 transition-all duration-300"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={FEATURED.image}
                  alt={FEATURED.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#00061a]/90 via-[#00061a]/30 to-transparent" />
                {/* Blue hover tint */}
                <div className="absolute inset-0 bg-[#0818A8]/0 group-hover:bg-[#0818A8]/15 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-7">
                <p className="text-white/60 text-[13px] font-bold tracking-[0.22em] uppercase mb-2">
                  {FEATURED.tag}
                </p>
                <h3 className="text-white font-black text-[clamp(22px,3vw,32px)] leading-tight tracking-[-0.02em] mb-2">
                  {FEATURED.title}
                </h3>
                {/* Blue underline */}
                <div className="w-8 h-[2px] bg-[#1F51FF] mb-3 group-hover:w-16 transition-all duration-300 rounded-full" />
                <p className="text-white/65 text-[13px] font-normal leading-relaxed mb-4 max-w-xs">
                  {FEATURED.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-white text-[13px] font-semibold tracking-[0.04em] group-hover:text-[#1F51FF] transition-colors duration-200">
                  Learn more
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Right 2×2 grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GRID_SERVICES.slice(0, 4).map((service, i) => (
              <GridCard key={service.href} service={service} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ROW 2: 4 equal cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          {GRID_SERVICES.slice(4).map((service, i) => (
            <GridCard key={service.href} service={service} index={i + 4} />
          ))}
        </motion.div>

        {/* ── View all CTA ── */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 border border-[#0818A8] text-[#0818A8] hover:bg-[#0818A8] hover:text-white text-[13px] font-bold tracking-[0.1em] uppercase px-8 py-3.5 rounded transition-all duration-200"
          >
            View All Services
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}