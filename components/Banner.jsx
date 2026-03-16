"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    name: "Emeka Okafor",
    role: "Head of Supply Chain",
    company: "Dangote Industries",
    avatar: "EO",
    stars: 5,
    short: "Unmatched precision and reliability.",
    text: "R-Zone Cargo transformed our entire supply chain. Their air freight team handled our time-sensitive pharmaceutical imports with absolute precision — on time, every single shipment. We've reduced delays by 80% since partnering with them. No other logistics provider comes close.",
  },
  {
    id: 2,
    name: "Amara Diallo",
    role: "Operations Director",
    company: "West Africa Trade Hub",
    avatar: "AD",
    stars: 5,
    short: "They handle complexity like no one else.",
    text: "Managing cross-border shipments across 12 African countries was a nightmare before R-Zone. Their customs clearance team is exceptional — they know every regulation, anticipate every issue, and communicate proactively. Our cargo never sits idle.",
  },
  {
    id: 3,
    name: "Chidi Nwosu",
    role: "CEO",
    company: "Lagos Export Group",
    avatar: "CN",
    stars: 5,
    short: "The gold standard in African freight.",
    text: "We've worked with logistics companies across three continents. R-Zone Cargo stands in a category of its own. Their sea freight coordination for our bulk exports is flawless — documentation, port handling, last-mile delivery. Everything tracked in real time.",
  },
  {
    id: 4,
    name: "Fatima Al-Hassan",
    role: "Procurement Manager",
    company: "TotalEnergies Nigeria",
    avatar: "FA",
    stars: 5,
    short: "Trusted partner for critical cargo.",
    text: "In the energy sector, delays cost millions. R-Zone has never let us down — not once in three years. Their road transport network across Nigeria is unmatched, and their warehousing facilities in Lagos are state-of-the-art. Reliability isn't optional for us — it's everything.",
  },
  {
    id: 5,
    name: "Marcus Henriksen",
    role: "Global Logistics Lead",
    company: "Maersk Partner — Nigeria",
    avatar: "MH",
    stars: 5,
    short: "International standard, local execution.",
    text: "As a global logistics professional, I apply international benchmarks to every partner we evaluate. R-Zone Cargo meets — and in many areas exceeds — those standards. Their documentation accuracy and client communication rival the best operators I've seen in Europe and Asia.",
  },
  {
    id: 6,
    name: "Ngozi Adeyemi",
    role: "VP Operations",
    company: "Access Bank Plc",
    avatar: "NA",
    stars: 5,
    short: "Absolute professionals, every time.",
    text: "We engaged R-Zone for secure cargo transport for our banking infrastructure deployment across West Africa. The professionalism, discretion, and operational precision they demonstrated was extraordinary. Every milestone was hit. Every asset arrived intact.",
  },
  {
    id: 7,
    name: "David Mensah",
    role: "Director of Imports",
    company: "Accra Industrial Group",
    avatar: "DM",
    stars: 5,
    short: "Seamless from origin to destination.",
    text: "R-Zone managed our end-to-end import operations from China and Europe. Their customs clearance expertise saved us weeks of delays and significant costs. The team is responsive 24/7 — I've had calls resolved at 2am. That level of commitment is rare and deeply valued.",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

// ─── Testimonial Card ─────────────────────────────────────────────────────────
function TestimonialCard({ t, featured = false }) {
  return (
    <motion.div
      className={`relative flex flex-col justify-between rounded-xl border transition-all duration-300 cursor-default
        ${featured
          ? "bg-[#0818A8] border-[#0818A8] shadow-2xl shadow-[#0818A8]/20 p-7 md:p-8"
          : "bg-white border-gray-200 hover:border-[#0818A8]/30 hover:shadow-lg hover:shadow-[#0818A8]/8 p-6"
        }
      `}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* Watermark quote */}
      <div className={`absolute top-5 right-5 ${featured ? "opacity-20" : "opacity-[0.08]"}`} aria-hidden="true">
        <Quote size={28} className={featured ? "text-white" : "text-[#0818A8]"} />
      </div>

      {/* Stars */}
      <div className="mb-4">
        <div className="flex items-center gap-0.5" aria-label={`${t.stars} out of 5 stars`}>
          {Array.from({ length: t.stars }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={featured ? "fill-white text-white" : "fill-[#0818A8] text-[#0818A8]"}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Pull quote */}
      <p
        className={`font-bold leading-snug mb-3 tracking-[-0.01em]
          ${featured
            ? "text-white text-[16px] md:text-[17px]"
            : "text-gray-900 text-[13.5px] md:text-[14px]"
          }`}
      >
        &ldquo;{t.short}&rdquo;
      </p>

      {/* Full text */}
      <p
        className={`font-light leading-relaxed flex-1 mb-6 text-[12px] md:text-[12.5px]
          ${featured ? "text-white/80" : "text-gray-800"}`}
      >
        {t.text}
      </p>

      {/* Author */}
      <div
        className={`flex items-center gap-3 pt-4 border-t
          ${featured ? "border-white/20" : "border-gray-100"}`}
      >
        {/* Avatar */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-black
            ${featured ? "bg-white/20 text-white" : "bg-[#0818A8] text-white"}`}
          aria-hidden="true"
        >
          {t.avatar}
        </div>
        <div>
          <p
            className={`font-semibold text-[12px] tracking-[0.02em]
              ${featured ? "text-white" : "text-gray-900"}`}
          >
            {t.name}
          </p>
          <p
            className={`text-[10.5px] font-normal tracking-[0.02em]
              ${featured ? "text-white/80" : "text-gray-800"}`}
          >
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const total = TESTIMONIALS.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  return (
    <section
      ref={ref}
      className={`
        ${montserrat.variable} font-[family-name:var(--font-montserrat)]
        relative bg-white overflow-hidden py-20 md:py-28
      `}
      aria-label="Client testimonials — R-Zone Enterprises"
    >

      {/* ── Dot pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, #0818A8 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Top accent line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/30 to-transparent"
        aria-hidden="true"
      />

      {/* ── Soft blue glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#0818A8]/5 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Tag pill */}
          <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 border border-[#0818A8]/20 bg-[#0818A8]/5 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8]" aria-hidden="true" />
              <span className="text-[#0818A8] text-[10px] font-semibold tracking-[0.22em] uppercase">
                Testimonials
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            custom={0.1}
            className="text-gray-900 font-black text-[clamp(28px,5vw,56px)] leading-tight tracking-[-0.02em] mb-3"
          >
            Don&apos;t Take Our{" "}
            <span className="relative inline-block text-[#0818A8]">
              Word For It
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                aria-hidden="true"
              />
            </span>
            .
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="text-gray-800 text-[13px] font-light tracking-[0.02em] max-w-md mx-auto"
          >
            The highest-rated organically earned cargo company between the UK,
            Nigeria, and across Africa — here&apos;s what our clients say.
          </motion.p>
        </motion.div>

        {/* ── DESKTOP GRID ── */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">

          {/* Col 1 — offset down */}
          <motion.div
            className="flex flex-col gap-5 pt-8"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
            }}
          >
            {[TESTIMONIALS[0], TESTIMONIALS[3]].map((t) => (
              <motion.div key={t.id} variants={fadeUp}>
                <TestimonialCard t={t} />
              </motion.div>
            ))}
          </motion.div>

          {/* Col 2 — center featured */}
          <motion.div
            className="flex flex-col gap-5"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
          >
            {[TESTIMONIALS[1], TESTIMONIALS[4]].map((t, i) => (
              <motion.div key={t.id} variants={fadeUp}>
                <TestimonialCard t={t} featured={i === 0} />
              </motion.div>
            ))}
          </motion.div>

          {/* Col 3 — offset down more */}
          <motion.div
            className="flex flex-col gap-5 pt-14"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.45 } },
            }}
          >
            {[TESTIMONIALS[2], TESTIMONIALS[5]].map((t) => (
              <motion.div key={t.id} variants={fadeUp}>
                <TestimonialCard t={t} />
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* ── MOBILE CAROUSEL ── */}
        <div className="md:hidden">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <TestimonialCard t={TESTIMONIALS[active]} featured={active === 1} />
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dot indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`View testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-200 ${
                    i === active
                      ? "w-5 h-1.5 bg-[#0818A8]"
                      : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-800"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded border border-gray-200 flex items-center justify-center text-gray-800 hover:text-[#0818A8] hover:border-[#0818A8]/40 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={15} aria-hidden="true" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded border border-gray-200 flex items-center justify-center text-gray-800 hover:text-[#0818A8] hover:border-[#0818A8]/40 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom stat bar ── */}
        <motion.div
          className="mt-14 md:mt-16 pt-8 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          role="list"
          aria-label="R-Zone key statistics"
        >
          {[
            { value: "500+",  label: "Satisfied Clients" },
            { value: "98%",   label: "Client Retention Rate" },
            { value: "4.9",   label: "Average Rating" },
            { value: "10K+",  label: "Shipments Completed" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-1 text-center md:text-left" role="listitem">
              <span className="text-[#0818A8] font-black text-[clamp(24px,3vw,36px)] leading-none tracking-tight">
                {s.value}
              </span>
              <span className="text-gray-800 text-[11px] font-medium tracking-[0.12em] uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── Bottom accent line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/20 to-transparent"
        aria-hidden="true"
      />

    </section>
  );
}