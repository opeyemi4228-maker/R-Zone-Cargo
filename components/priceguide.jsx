"use client";

import { useRef } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { motion, useInView } from "framer-motion";
import {
 ArrowRight,
 Calculator,
 Package,
 Zap,
 TrendingUp,
 Clock,
} from "lucide-react";

// ─── Font ─────────────────────────────────────────────────────────────────────
const montserrat = Montserrat({
 subsets: ["latin"],
 weight: ["300", "400", "500", "600", "700", "800", "900"],
 variable: "--font-montserrat",
 display: "swap",
});

// ─── Data ────────────────────────────────────────────────────────────────────
const GUIDE_URL = "/priceguide";

const HIGHLIGHTS = [
 { icon: Calculator, label: "Free Calculator", desc: "Get an instant cost estimate by weight & dimensions" },
 { icon: Package, label: "Item Price List", desc: "iPhone, PS5, TV, generator, clothes bale & more" },
 { icon: Zap, label: "Air from £5.20/kg", desc: "3× weekly flights 5 10 working days to Lagos" },
 { icon: TrendingUp, label: "Sea from £2.00/kg", desc: "Weekly sailings cheapest way to ship bulk cargo" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function PriceGuidePromo() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-60px" });

 return (
 <section
 ref={ref}
 aria-labelledby="price-guide-heading"
 className={`${montserrat.className} relative overflow-hidden bg-[#00061a] py-16 md:py-20`}
 >
 {/* Grid texture */}
 <div
 className="pointer-events-none absolute inset-0 opacity-[0.025]"
 aria-hidden="true"
 style={{
 backgroundImage:
 "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
 backgroundSize: "64px 64px",
 }}
 />

 {/* Glow blobs */}
 <div className="pointer-events-none absolute inset-0" aria-hidden="true">
 <div className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-[#0818A8]/20 blur-[130px]" />
 <div className="absolute -bottom-24 right-1/4 h-[360px] w-[360px] rounded-full bg-[#1F51FF]/12 blur-[110px]" />
 </div>

 {/* Vertical accent lines */}
 {[8, 92].map((pct, i) => (
 <motion.div
 key={pct}
 aria-hidden="true"
 className="absolute inset-y-0 w-px"
 style={{
 left: `${pct}%`,
 background:
 "linear-gradient(to bottom, transparent 5%, rgba(31,81,255,0.25) 50%, transparent 95%)",
 }}
 initial={{ scaleY: 0 }}
 animate={inView ? { scaleY: 1 } : {}}
 transition={{ duration: 1.3, delay: 0.6 + i * 0.15 }}
 />
 ))}

 <div className="relative z-10 mx-auto max-w-[1380px] px-5 sm:px-8 xl:px-10">

 {/* ── Label pill ── */}
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.5 }}
 className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#1F51FF]/30 bg-[#0818A8]/14 px-4 py-1.5"
 >
 <motion.span
 className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1F51FF]"
 animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }}
 transition={{ duration: 2, repeat: Infinity }}
 aria-hidden="true"
 />
 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1F51FF]">
 Updated Monthly
 </span>
 </motion.div>

 {/* ── Main grid ── */}
 <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">

 {/* Left headline + highlights */}
 <div>
 <motion.h2
 id="price-guide-heading"
 className="mb-4 font-black uppercase leading-[0.88] tracking-[-0.035em] text-white"
 style={{ fontSize: "clamp(32px, 5.5vw, 62px)" }}
 initial={{ opacity: 0, y: 18 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.65, delay: 0.1 }}
 >
 UK Nigeria<br />
 <span className="text-[#1F51FF]">Shipping</span><br />
 Price Guide.
 </motion.h2>

 <motion.p
 className="mb-8 max-w-md text-[15px] font-light leading-relaxed text-white/65"
 initial={{ opacity: 0, y: 12 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6, delay: 0.2 }}
 >
 The only guide you need. Full cost breakdown by item type, a live
 calculator, state-by-state delivery rates and zero hidden fees.
 </motion.p>

 {/* Highlight pills */}
 <motion.div
 className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
 initial={{ opacity: 0, y: 12 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6, delay: 0.3 }}
 >
 {HIGHLIGHTS.map(({ icon: Icon, label, desc }, i) => (
 <motion.div
 key={label}
 className="flex items-start gap-3 border border-white/[0.07] bg-white/[0.04] p-4 transition-all duration-300 hover:border-[#1F51FF]/30 hover:bg-white/[0.07]"
 initial={{ opacity: 0, x: -12 }}
 animate={inView ? { opacity: 1, x: 0 } : {}}
 transition={{ duration: 0.45, delay: 0.35 + i * 0.07 }}
 >
 <div
 className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-[#0818A8]/30"
 aria-hidden="true"
 >
 <Icon size={15} className="text-[#1F51FF]" />
 </div>
 <div>
 <p className="text-[12.5px] font-black text-white">{label}</p>
 <p className="text-[11.5px] font-light leading-snug text-white/50">{desc}</p>
 </div>
 </motion.div>
 ))}
 </motion.div>

 {/* CTAs */}
 <motion.div
 className="flex flex-wrap gap-3"
 initial={{ opacity: 0, y: 10 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.55, delay: 0.55 }}
 >
 <Link
 href={GUIDE_URL}
 className="group inline-flex items-center gap-2 bg-[#0818A8] px-7 py-3.5 text-[12px] font-black uppercase tracking-[0.1em] text-white shadow-lg shadow-[#0818A8]/30 transition-all duration-200 hover:bg-[#0437F2]"
 >
 Read the Full Guide
 <ArrowRight
 size={12}
 className="transition-transform group-hover:translate-x-1"
 aria-hidden="true"
 />
 </Link>
 <Link
 href={GUIDE_URL + "#calculator"}
 className="inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:border-white/50"
 >
 <Calculator size={12} aria-hidden="true" />
 Use the Calculator
 </Link>
 </motion.div>
 </div>

 {/* Right feature card */}
 <motion.div
 initial={{ opacity: 0, x: 24 }}
 animate={inView ? { opacity: 1, x: 0 } : {}}
 transition={{ duration: 0.7, delay: 0.25 }}
 >
 <Link
 href={GUIDE_URL}
 className="group relative block overflow-hidden border border-white/[0.07] bg-white/[0.03] transition-all duration-500 hover:border-[#0818A8]/50"
 aria-label="Read: UK to Nigeria Shipping Price Guide 2026"
 >
 {/* Top accent bar */}
 <div className="h-[3px] w-0 bg-gradient-to-r from-[#0818A8] to-[#1F51FF] transition-all duration-500 group-hover:w-full" aria-hidden="true" />

 {/* Badge */}
 <div className="absolute left-5 top-5 z-10">
 <span className="inline-flex items-center gap-2 bg-[#0818A8] px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-white">
 <TrendingUp size={9} aria-hidden="true" /> Free Guide
 </span>
 </div>

 {/* Image */}
 <div className="relative h-[220px] overflow-hidden bg-[#0818A8]/20">
 <img
 src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80&auto=format&fit=crop"
 alt="UK to Nigeria shipping cargo"
 className="h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
 loading="lazy"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#00061a] via-[#00061a]/40 to-transparent" aria-hidden="true" />
 </div>

 {/* Card body */}
 <div className="p-6">
 <p className="mb-1 text-[9.5px] font-black uppercase tracking-[0.22em] text-[#1F51FF]">
 Shipping Guides · 14 min read
 </p>
 <h3 className="mb-3 font-black uppercase leading-[0.92] tracking-[-0.02em] text-white transition-colors group-hover:text-[#1F51FF]"
 style={{ fontSize: "clamp(16px, 2vw, 20px)" }}>
 UK to Nigeria Shipping Price Guide 2026 Full Cost Breakdown
 </h3>
 <p className="mb-5 text-[13px] font-light leading-relaxed text-white/55">
 Air from £5.20/kg · Sea from £2/kg · Item prices, calculator, 36-state delivery rates, hidden charge breakdown.
 </p>

 {/* Mini stats */}
 <div className="mb-5 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-5">
 {[
 { val: "10+", label: "Item Types" },
 { val: "36", label: "States Covered" },
 { val: "6", label: "FAQs Answered" },
 ].map(s => (
 <div key={s.label} className="text-center">
 <p className="font-black text-[20px] leading-none tracking-[-0.02em] text-white">{s.val}</p>
 <p className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white/40">{s.label}</p>
 </div>
 ))}
 </div>

 {/* Read more row */}
 <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
 <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/40">
 <Clock size={10} aria-hidden="true" />
 Updated May 2026
 </div>
 <span className="inline-flex items-center gap-1.5 text-[11.5px] font-black uppercase tracking-[0.08em] text-[#1F51FF] transition-colors group-hover:text-white">
 Read Guide
 <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
 </span>
 </div>
 </div>
 </Link>
 </motion.div>
 </div>
 </div>
 </section>
 );
}