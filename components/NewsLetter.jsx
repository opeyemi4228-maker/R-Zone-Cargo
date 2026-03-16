"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ClipboardList, PackageCheck, Plane, MapPin,
  ArrowRight, ChevronRight, Check,
} from "lucide-react";

// ─── Font ─────────────────────────────────────────────────────────────────────
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Steps data ───────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Book Your Shipment",
    subtitle: "Online or by phone",
    description:
      "Request a quote online, via WhatsApp, or call our UK team directly. Tell us what you're sending, the destination, and your preferred service — air or sea.",
    bullets: [
      "Free instant quote",
      "Air or sea freight options",
      "Personal or commercial cargo",
    ],
    cta: { label: "Get a Quote", href: "/quote" },
    accentColor: "#1F51FF",
  },
  {
    number: "02",
    icon: PackageCheck,
    title: "Drop Off or Request Pickup",
    subtitle: "UK-wide collection available",
    description:
      "Drop your cargo at our Essex warehouse, or book a door collection from anywhere in the UK. We accept boxes, bags, household items, foodstuffs, and commercial freight.",
    bullets: [
      "Essex warehouse drop-off",
      "UK-wide door collection",
      "Packing advice included",
    ],
    cta: { label: "Our Location", href: "/contact" },
    accentColor: "#0818A8",
  },
  {
    number: "03",
    icon: Plane,
    title: "Cargo Transported UK → Nigeria",
    subtitle: "Air freight or monthly sea",
    description:
      "Your cargo is consolidated, customs-cleared, and dispatched via our partner airlines or monthly sea freight sailings. Track every milestone in real time.",
    bullets: [
      "Air: 5–10 working days",
      "Sea: 4–6 weeks",
      "Real-time tracking included",
    ],
    cta: { label: "Track a Shipment", href: "/track" },
    accentColor: "#1F51FF",
  },
  {
    number: "04",
    icon: MapPin,
    title: "Delivery or Warehouse Pickup",
    subtitle: "All 36 states covered",
    description:
      "Choose doorstep delivery across all 36 Nigerian states, or collect from our Lagos warehouse. We handle all local customs clearance and last-mile logistics.",
    bullets: [
      "Door delivery Nigeria-wide",
      "Lagos warehouse pickup",
      "Local customs handled",
    ],
    cta: { label: "Learn More", href: "/services" },
    accentColor: "#0818A8",
  },
];

// ─── Step card (horizontal desktop, vertical mobile) ─────────────────────────
function StepCard({ step, index, isActive, onClick, inView }) {
  const Icon = step.icon;
  const isLast = index === STEPS.length - 1;

  return (
    <div className="flex-1 flex flex-col relative min-w-0">

      {/* Connector line — between cards */}
      {!isLast && (
        <div className="absolute top-[34px] left-[calc(50%+28px)] right-0 h-px hidden lg:block z-0" aria-hidden="true">
          <motion.div
            className="h-full bg-gradient-to-r from-[#0818A8]/60 to-[#0818A8]/20"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.18 }}
            style={{ transformOrigin: "left" }}
          />
          {/* Arrow head */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent border-l-[#0818A8]/40" />
        </div>
      )}

      {/* Card */}
      <motion.button
        onClick={() => onClick(index)}
        className={`
          relative flex flex-col h-full text-left
          border transition-all duration-350 overflow-hidden
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F51FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#00061a]
          ${isActive
            ? "bg-[#0818A8]/18 border-[#0818A8]/60"
            : "bg-white/[0.03] border-white/[0.07] hover:border-[#0818A8]/35 hover:bg-[#0818A8]/8"
          }
        `}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: 0.25 + index * 0.12,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        aria-expanded={isActive}
        aria-label={`Step ${step.number}: ${step.title}`}
      >
        {/* Active top accent line */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Card body */}
        <div className="p-6 md:p-7 flex flex-col gap-4 h-full">

          {/* Top row: number + icon */}
          <div className="flex items-start justify-between gap-3">
            <span
              className={`text-[11px] font-black tracking-[0.2em] uppercase transition-colors duration-250 ${
                isActive ? "text-[#1F51FF]" : "text-white/80"
              }`}
            >
              {step.number}
            </span>

            <div
              className={`
                w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0 transition-all duration-300
                ${isActive
                  ? "bg-[#0818A8] shadow-lg shadow-[#0818A8]/35"
                  : "bg-white/[0.06] border border-white/[0.1]"
                }
              `}
              aria-hidden="true"
            >
              <Icon
                size={19}
                className={`transition-colors duration-250 ${isActive ? "text-white" : "text-white/40"}`}
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <h3
              className={`font-black text-[14.5px] leading-tight tracking-[-0.01em] uppercase mb-1 transition-colors duration-250 ${
                isActive ? "text-white" : "text-white/65"
              }`}
            >
              {step.title}
            </h3>
            <p className={`text-[11px] font-medium tracking-wide transition-colors duration-250 ${
              isActive ? "text-[#1F51FF]" : "text-white/40"
            }`}>
              {step.subtitle}
            </p>
          </div>

          {/* Expanded content — only on active */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <p className="text-white/55 text-[12.5px] font-light leading-relaxed mb-4 tracking-wide">
                  {step.description}
                </p>

                {/* Bullet points */}
                <ul className="flex flex-col gap-1.5 mb-5" role="list">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full bg-[#0818A8]/30 border border-[#0818A8]/50 flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <Check size={8} className="text-[#1F51FF]" />
                      </span>
                      <span className="text-white/60 text-[11.5px] font-light tracking-wide">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={step.cta.href}
                  className="inline-flex items-center gap-2 text-[10.5px] font-black tracking-[0.1em] uppercase text-[#1F51FF] hover:text-white transition-colors duration-200"
                  aria-label={step.cta.label}
                  onClick={(e) => e.stopPropagation()}
                >
                  {step.cta.label}
                  <ArrowRight size={11} aria-hidden="true" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inactive — show chevron indicator */}
          {!isActive && (
            <div className="mt-auto">
              <ChevronRight size={13} className="text-white/40" aria-hidden="true" />
            </div>
          )}

        </div>
      </motion.button>
    </div>
  );
}

// ─── Progress indicator ───────────────────────────────────────────────────────
function ProgressBar({ activeIndex, total, inView }) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Shipping process steps">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          role="presentation"
          className={`h-[2px] transition-all duration-400 rounded-full ${
            i <= activeIndex
              ? "bg-[#0818A8]"
              : "bg-white/12"
          } ${i === activeIndex ? "w-8" : "w-4"}`}
          aria-hidden="true"
        />
      ))}
      <span className="text-white/50 text-[10.5px] font-medium ml-2 tabular-nums">
        {activeIndex + 1} / {total}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── How-To schema — tells Google this is a step-by-step guide ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Ship Cargo from UK to Nigeria with R-Zone Enterprises",
            "description":
              "A simple 4-step process to ship air freight or sea cargo from the UK to Nigeria with R-Zone Enterprises.",
            "totalTime": "PT10D",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "GBP",
              "value": "From £3/kg",
            },
            "supply": [
              { "@type": "HowToSupply", "name": "Items to ship" },
              { "@type": "HowToSupply", "name": "UK pickup address or Essex drop-off" },
            ],
            "step": STEPS.map((s, i) => ({
              "@type": "HowToStep",
              "position": i + 1,
              "name": s.title,
              "text": s.description,
              "url": `https://r-zoneenterprises.com${s.cta.href}`,
            })),
          }),
        }}
      />

      <section
        ref={sectionRef}
        className={`
          ${montserrat.variable} font-[family-name:var(--font-montserrat)]
          relative w-full bg-[#00061a] overflow-hidden
        `}
        aria-label="How shipping with R-Zone Enterprises works — 4-step process"
      >

        {/* ══ BACKGROUNDS ══════════════════════════════════════════════════ */}
        {/* Grid */}
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
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#0818A8]/8 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#1F51FF]/6 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-24 lg:py-28">

          {/* ── Section header ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Tag pill */}
              <div className="inline-flex items-center gap-2.5 border border-[#1F51FF]/28 bg-[#0818A8]/12 px-4 py-1.5 rounded-full mb-5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                />
                <span className="text-[#1F51FF] text-[10px] font-bold tracking-[0.28em] uppercase">
                  Simple Process
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-white font-black text-[clamp(28px,5vw,58px)] leading-[0.92] tracking-[-0.025em] uppercase mb-4">
                How{" "}
                <span className="relative inline-block text-[#1F51FF]">
                  Shipping
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full"
                    aria-hidden="true"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : {}}
                    transition={{ duration: 0.55, delay: 0.55 }}
                  />
                </span>{" "}
                Works.
              </h2>

              <p className="text-white/60 text-[14px] font-light leading-relaxed tracking-wide max-w-lg">
                Four simple steps from booking to doorstep delivery anywhere
                in Nigeria. Air freight or monthly sea, we handle everything in between.
              </p>
            </motion.div>

            {/* Progress bar — desktop */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ProgressBar activeIndex={activeStep} total={STEPS.length} inView={inView} />
            </motion.div>
          </div>

          {/* ── UK → Nigeria route label ── */}
          <motion.div
            className="flex items-center gap-4 mb-10 md:mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-white/50s" aria-hidden="true">🇬🇧</span>
              <span className="text-white/60 text-[11.5px] font-bold tracking-[0.1em] uppercase">United Kingdom</span>
            </div>
            <div className="flex items-center gap-1 flex-1 max-w-[120px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 h-px bg-[#0818A8]/50 rounded-full"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                  style={{ transformOrigin: "left" }}
                  aria-hidden="true"
                />
              ))}
              <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-t-transparent border-b-transparent border-l-[#0818A8]/50 flex-shrink-0" aria-hidden="true" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[13px text-white/50]" aria-hidden="true">🇳🇬</span>
              <span className="text-white/60 text-[11.5px] font-bold tracking-[0.1em] uppercase">Nigeria</span>
            </div>
            <div className="hidden sm:block h-px w-12 bg-white/8" aria-hidden="true" />
            <span className="hidden sm:block text-white/70 text-[13px] font-medium tracking-wide">
              Air: 5–10 days · Sea: 4–6 weeks
            </span>
          </motion.div>

          {/* ── 4-column card grid ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            role="list"
            aria-label="Shipping process steps"
          >
            {STEPS.map((step, index) => (
              <div key={step.number} role="listitem">
                <StepCard
                  step={step}
                  index={index}
                  isActive={activeStep === index}
                  onClick={setActiveStep}
                  inView={inView}
                />
              </div>
            ))}
          </div>

          {/* ── Mobile progress bar ── */}
          <motion.div
            className="flex md:hidden items-center justify-between mt-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ProgressBar activeIndex={activeStep} total={STEPS.length} inView={inView} />

            {/* Prev/Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                disabled={activeStep === 0}
                className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/35 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Previous step"
              >
                <ArrowRight size={13} className="rotate-180" aria-hidden="true" />
              </button>
              <button
                onClick={() => setActiveStep((p) => Math.min(STEPS.length - 1, p + 1))}
                disabled={activeStep === STEPS.length - 1}
                className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/35 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Next step"
              >
                <ArrowRight size={13} aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          {/* ── Bottom strip ── */}
          <motion.div
            className="mt-14 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div>
              <p className="text-white font-black text-[16px] tracking-[-0.01em] uppercase mb-1">
                Ready to get started?
              </p>
              <p className="text-white/60 text-[14px] font-light max-w-sm leading-relaxed">
                Get a free quote in under 2 minutes our UK team responds same day.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
                aria-label="Get a free shipping quote"
              >
                Get a Quote
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/45 bg-white/[0.05] hover:bg-white/10 text-white text-[11.5px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-200"
                aria-label="Contact R-Zone Enterprises"
              >
                Speak to Us
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}