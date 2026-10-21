"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ClipboardList, PackageCheck, Plane, MapPin, ArrowRight, ChevronRight, Check } from "lucide-react";
import { montserrat } from "../lib/fonts";

const STEPS = [
 {
 number: "01", icon: ClipboardList,
 title: "Book your shipment",
 subtitle: "Online, WhatsApp or phone",
 description: "Request a free quote online, via WhatsApp (+447915647119), or call our UK team. Tell us what you're shipping, the Nigerian destination, and your preferred service air or sea.",
 bullets: ["Free instant quote", "Air or sea freight options", "Same-day response"],
 cta: { label: "Get a free quote", href: "/quote" },
 accentColor: "#0000FF",
 },
 {
 number: "02", icon: PackageCheck,
 title: "Drop off or book a collection",
 subtitle: "UK-wide collection available",
 description: "Drop your cargo at our Upminster, Essex warehouse or book a door collection from anywhere in the UK. We accept boxes, bags, household goods, foodstuffs and commercial freight.",
 bullets: ["Upminster warehouse drop-off", "UK-wide door collection", "All cargo types accepted"],
 cta: { label: "Our location", href: "/contact" },
 accentColor: "#000f89",
 },
 {
 number: "03", icon: Plane,
 title: "Cargo dispatched to Nigeria",
 subtitle: "Weekly air freight & sea sailings",
 description: "Your cargo is consolidated, customs-cleared and dispatched via our partner airlines or weekly sea freight sailings to Lagos. Every milestone tracked in real time.",
 bullets: ["Air freight: 5 to 10 working days", "Sea freight: 4 to 6 weeks", "Real-time tracking included"],
 cta: { label: "Track a shipment", href: "/track" },
 accentColor: "#0000FF",
 },
 {
 number: "04", icon: MapPin,
 title: "Delivered in Nigeria",
 subtitle: "All 36 states covered",
 description: "Door delivery across all 36 Nigerian states Lagos, Abuja, Port Harcourt, Kano and beyond or collect from our Lagos hub. All Nigerian customs clearance handled by our in-house team.",
 bullets: ["Door delivery Nigeria-wide", "Lagos & Abuja covered", "Nigerian customs handled"],
 cta: { label: "Learn more", href: "/services" },
 accentColor: "#000f89",
 },
];

function StepCard({ step, index, isActive, onClick, inView }) {
 const Icon = step.icon;
 return (
 <motion.button onClick={() => onClick(index)}
 className={`relative flex h-full w-full flex-col rounded-[20px] p-7 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000f89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6FAFF] ${isActive ? "bg-white shadow-[0_24px_50px_-24px_rgba(0,15,137,0.35)] ring-1 ring-[#000f89]/25" : "bg-white/60 ring-1 ring-[#E3EAF7] hover:bg-white"}`}
 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6, delay: 0.25 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
 aria-expanded={isActive} aria-label={`Step ${step.number}: ${step.title}`}>
 <div className="flex items-start justify-between gap-3">
 <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isActive ? "bg-[#000f89] text-white" : "bg-[#000f89]/[0.07] text-[#000f89]"}`} aria-hidden="true">
 <Icon size={19} />
 </span>
 <span className={`text-[13px] font-bold tabular-nums transition-colors duration-300 ${isActive ? "text-[#000f89]" : "text-slate-400"}`}>
 Step {step.number}
 </span>
 </div>
 <h3 className="mt-6 text-[18px] font-extrabold leading-snug tracking-[-0.02em] text-[#00112E]">
 {step.title}
 </h3>
 <p className="mt-1 text-[14px] font-medium text-[#000f89]">
 {step.subtitle}
 </p>
 <AnimatePresence initial={false}>
 {isActive && (
 <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
 exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
 className="overflow-hidden">
 <p className="mt-4 text-[14.5px] font-normal leading-relaxed text-slate-600">{step.description}</p>
 <ul className="mt-4 flex flex-col gap-2" role="list">
 {step.bullets.map(bullet => (
 <li key={bullet} className="flex items-center gap-2.5">
 <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#000f89]/[0.08]" aria-hidden="true">
 <Check size={11} className="text-[#000f89]" />
 </span>
 <span className="text-[14px] font-normal text-slate-700">{bullet}</span>
 </li>
 ))}
 </ul>
 <Link href={step.cta.href}
 className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-[#000f89] hover:text-[#0000CD]"
 aria-label={`${step.cta.label}: R-Zone Enterprises UK to Nigeria cargo`}
 onClick={e => e.stopPropagation()}>
 {step.cta.label} <ArrowRight size={14} aria-hidden="true" />
 </Link>
 </motion.div>
 )}
 </AnimatePresence>
 {!isActive && (
 <span className="mt-auto pt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-slate-500">
 Show details <ChevronRight size={14} aria-hidden="true" />
 </span>
 )}
 </motion.button>
 );
}

function ProgressBar({ activeIndex, total }) {
 return (
 <div className="flex items-center gap-2" aria-hidden="true">
 {Array.from({ length: total }).map((_, i) => (
 <div key={i}
 className={`h-1.5 rounded-full transition-all duration-300 ${i <= activeIndex ? "bg-[#000f89]" : "bg-[#000f89]/15"} ${i === activeIndex ? "w-8" : "w-3"}`} />
 ))}
 <span className="ml-2 text-[13px] font-semibold text-slate-500 tabular-nums">{activeIndex + 1} / {total}</span>
 </div>
 );
}

export default function HowItWorks() {
 const [activeStep, setActiveStep] = useState(0);
 const sectionRef = useRef(null);
 const inView = useInView(sectionRef, { once: true, margin: "-80px" });

 return (
 <>
 {/* HowTo schema targets "how to ship from UK to Nigeria" featured snippets */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "HowTo",
 "name": "How to Ship Cargo from UK to Nigeria Step by Step",
 "description": "Simple 4-step process to ship air freight or sea cargo from the UK to Nigeria with R-Zone Enterprises.",
 "totalTime": "PT10D",
 "estimatedCost": { "@type": "MonetaryAmount", "currency": "GBP", "value": "From £3/kg" },
 "supply": [
 { "@type": "HowToSupply", "name": "Items to ship to Nigeria" },
 { "@type": "HowToSupply", "name": "UK address or Upminster drop-off location" },
 ],
 "tool": [
 { "@type": "HowToTool", "name": "R-Zone Enterprises air freight service" },
 { "@type": "HowToTool", "name": "R-Zone weekly sea freight sailings UK to Nigeria" },
 ],
 "step": STEPS.map((s, i) => ({
 "@type": "HowToStep",
 "position": i + 1,
 "name": s.title,
 "text": s.description,
 "url": `https://r-zoneenterprises.com${s.cta.href}`,
 })),
 }),
 }} />

 <section ref={sectionRef}
 className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] relative w-full bg-[#F6FAFF] overflow-hidden`}
 aria-labelledby="how-it-works-heading">

 <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-24 lg:py-28">

 {/* Header */}
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-12">
 <motion.div initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}>
 <p className="mb-5 inline-flex rounded-full bg-[#000f89]/[0.07] px-3.5 py-1.5 text-[13px] font-semibold text-[#000f89]">
 How to ship from the UK to Nigeria
 </p>
 <h2 id="how-it-works-heading" className="font-extrabold leading-[1.04] tracking-[-0.035em] text-[#00112E]"
 style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}>
 How shipping works.
 </h2>
 <p className="mt-4 max-w-lg text-[16px] font-normal leading-relaxed text-slate-600">
 Four steps from booking to doorstep delivery anywhere in Nigeria.
 Weekly air freight and sea sailings, and our team handles everything
 in between.
 </p>
 </motion.div>
 <motion.div className="hidden md:flex flex-col items-end gap-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
 transition={{ duration: 0.5, delay: 0.4 }}>
 <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] font-semibold text-[#00112E] ring-1 ring-[#E3EAF7]">
 <span aria-hidden="true">🇬🇧</span> United Kingdom
 <ArrowRight size={13} className="text-[#000f89]" aria-hidden="true" />
 <span aria-hidden="true">🇳🇬</span> Nigeria
 </p>
 <p className="text-[13px] font-medium text-slate-500">Air: 5 to 10 working days · Sea: 4 to 6 weeks</p>
 </motion.div>
 </div>

 {/* Step cards */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 items-start"
 role="list" aria-label="How to ship cargo from UK to Nigeria in 4 steps">
 {STEPS.map((step, index) => (
 <div key={step.number} role="listitem">
 <StepCard step={step} index={index} isActive={activeStep === index}
 onClick={setActiveStep} inView={inView} />
 </div>
 ))}
 </div>

 {/* Progress + mobile controls */}
 <motion.div className="flex items-center justify-between mt-8"
 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}>
 <ProgressBar activeIndex={activeStep} total={STEPS.length} />
 <div className="flex items-center gap-2">
 <button onClick={() => setActiveStep(p => Math.max(0, p - 1))} disabled={activeStep === 0}
 className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#000f89] ring-1 ring-[#E3EAF7] transition-colors duration-200 hover:bg-[#000f89] hover:text-white disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#000f89]"
 aria-label="Previous shipping step">
 <ArrowRight size={15} className="rotate-180" aria-hidden="true" />
 </button>
 <button onClick={() => setActiveStep(p => Math.min(STEPS.length - 1, p + 1))} disabled={activeStep === STEPS.length - 1}
 className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#000f89] ring-1 ring-[#E3EAF7] transition-colors duration-200 hover:bg-[#000f89] hover:text-white disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#000f89]"
 aria-label="Next shipping step">
 <ArrowRight size={15} aria-hidden="true" />
 </button>
 </div>
 </motion.div>


 </div>
 </section>
 </>
 );
}