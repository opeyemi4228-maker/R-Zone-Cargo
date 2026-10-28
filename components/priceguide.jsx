"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { montserrat } from "../lib/fonts";
import {
 ArrowRight,
 Calculator,
 Package,
 Zap,
 TrendingUp,
 Clock,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────
const GUIDE_URL = "/priceguide";

const HIGHLIGHTS = [
 { icon: Calculator, label: "Free calculator", desc: "Get an instant cost estimate by weight and dimensions" },
 { icon: Package, label: "Item price list", desc: "iPhone, PS5, TV, generator, clothes bale and more" },
 { icon: Zap, label: "Air from £5.80/kg", desc: "Every Friday from Heathrow, 5 to 10 working days to Lagos" },
 { icon: TrendingUp, label: "Sea from £3/kg", desc: "Weekly sailings, the cheapest way to ship bulk cargo" },
];

const fadeUp = {
 hidden: { opacity: 0, y: 18 },
 visible: (delay = 0) => ({
 opacity: 1,
 y: 0,
 transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
 }),
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function PriceGuidePromo() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-60px" });
 const state = inView ? "visible" : "hidden";

 return (
 <section
 ref={ref}
 aria-labelledby="price-guide-heading"
 className={`${montserrat.className} relative bg-white py-20 md:py-24 lg:py-28`}
 >
 <div className="mx-auto max-w-[1400px] px-5 sm:px-8 xl:px-10">
 <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

 {/* Left: headline, highlights, actions */}
 <div>
 <motion.p
 variants={fadeUp} initial="hidden" animate={state} custom={0}
 className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#000f89]/[0.07] px-3.5 py-1.5 text-[13px] font-semibold text-[#000f89]"
 >
 <span className="h-1.5 w-1.5 rounded-full bg-[#000f89]" aria-hidden="true" />
 Updated monthly
 </motion.p>

 <motion.h2
 id="price-guide-heading"
 variants={fadeUp} initial="hidden" animate={state} custom={0.08}
 className="font-extrabold leading-[1.04] tracking-[-0.035em] text-[#00112E]"
 style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}
 >
 UK to Nigeria shipping price guide.
 </motion.h2>

 <motion.p
 variants={fadeUp} initial="hidden" animate={state} custom={0.16}
 className="mt-4 max-w-md text-[16px] font-normal leading-relaxed text-slate-600"
 >
 The only guide you need. Full cost breakdown by item type, a live
 calculator, state-by-state delivery rates and zero hidden fees.
 </motion.p>

 <motion.ul
 variants={fadeUp} initial="hidden" animate={state} custom={0.24}
 className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
 >
 {HIGHLIGHTS.map(({ icon: Icon, label, desc }) => (
 <li
 key={label}
 className="flex items-start gap-3.5 rounded-[16px] bg-[#F6FAFF] p-4 ring-1 ring-[#E3EAF7]"
 >
 <span
 className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#000f89] ring-1 ring-[#E3EAF7]"
 aria-hidden="true"
 >
 <Icon size={15} />
 </span>
 <span>
 <span className="block text-[14px] font-bold text-[#00112E]">{label}</span>
 <span className="mt-0.5 block text-[13px] font-normal leading-snug text-slate-500">{desc}</span>
 </span>
 </li>
 ))}
 </motion.ul>

 <motion.div
 variants={fadeUp} initial="hidden" animate={state} custom={0.32}
 className="mt-8 flex flex-wrap gap-3"
 >
 <Link
 href={GUIDE_URL}
 className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-[#000f89] px-7 text-[15px] font-bold text-white shadow-lg shadow-[#000f89]/25 transition-colors duration-200 hover:bg-[#000f89]"
 >
 Read the full guide
 <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
 </Link>
 <Link
 href={GUIDE_URL + "#calculator"}
 className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full border border-[#000f89]/20 px-7 text-[15px] font-semibold text-[#000f89] transition-colors duration-200 hover:border-[#000f89] hover:bg-[#000f89]/[0.04]"
 >
 <Calculator size={15} aria-hidden="true" />
 Use the calculator
 </Link>
 </motion.div>
 </div>

 {/* Right: feature card */}
 <motion.div variants={fadeUp} initial="hidden" animate={state} custom={0.2}>
 <Link
 href={GUIDE_URL}
 className="group block overflow-hidden rounded-[28px] bg-[#00112E] transition-shadow duration-300 hover:shadow-[0_30px_70px_-30px_rgba(0,17,46,0.6)]"
 aria-label="Read: UK to Nigeria Shipping Price Guide 2026"
 >
 <div className="relative h-[240px] overflow-hidden">
 <img
 src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80&auto=format&fit=crop"
 alt="UK to Nigeria shipping cargo"
 className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
 loading="lazy"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#00112E] via-[#00112E]/30 to-transparent" aria-hidden="true" />
 <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-bold text-[#000f89]">
 <TrendingUp size={12} aria-hidden="true" /> Free guide
 </span>
 </div>

 <div className="p-7 md:p-8">
 <p className="text-[13px] font-semibold text-[#A6A6FF]">
 Shipping guides · 14 min read
 </p>
 <h3
 className="mt-2 font-extrabold leading-tight tracking-[-0.02em] text-white"
 style={{ fontSize: "clamp(19px, 2vw, 24px)" }}
 >
 UK to Nigeria Shipping Price Guide 2026: full cost breakdown
 </h3>
 <p className="mt-3 text-[14.5px] font-normal leading-relaxed text-white/65">
 Air from £5.80/kg · Sea from £3/kg · Item prices, calculator, 36-state delivery rates, hidden charge breakdown.
 </p>

 <div className="mt-6 grid grid-cols-3 gap-3 rounded-[16px] bg-white/[0.05] p-4">
 {[
 { val: "10+", label: "Item types" },
 { val: "36", label: "States covered" },
 { val: "6", label: "FAQs answered" },
 ].map((s) => (
 <div key={s.label} className="text-center">
 <p className="text-[22px] font-extrabold leading-none tracking-[-0.02em] text-white">{s.val}</p>
 <p className="mt-1.5 text-[12px] font-medium text-white/50">{s.label}</p>
 </div>
 ))}
 </div>

 <div className="mt-6 flex items-center justify-between">
 <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/50">
 <Clock size={13} aria-hidden="true" />
 Updated May 2026
 </span>
 <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-white">
 Read guide
 <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
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
