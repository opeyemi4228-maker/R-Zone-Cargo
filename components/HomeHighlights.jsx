"use client";
// components/HomeHighlights.jsx
// ─────────────────────────────────────────────────────────────────────────────
// "At a glance" band that sits directly under the hero.
//
// The hero holds one idea; the track record and the three core services live
// here, once, with room to breathe: track record first, then what the service
// covers, then the three ways to ship with their real starting rates.
//
// Light section on purpose: it gives the dark hero a clean edge to land on.
// Visual language (shared across the homepage): pill buttons and labels,
// 20px-radius cards, sentence-case headings, navy #00112E, mist #F6FAFF.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plane, Ship, Truck } from "lucide-react";
import {
 motion,
 useInView,
 useMotionValue,
 useReducedMotion,
 useSpring,
} from "framer-motion";
import { montserrat } from "../lib/fonts";

// Counts up once the strip scrolls into view; static for reduced-motion users.
function Counter({ target, suffix = "" }) {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-80px 0px" });
 const shouldReduceMotion = useReducedMotion();
 const motionVal = useMotionValue(0);
 const spring = useSpring(motionVal, { stiffness: 55, damping: 18 });
 const [display, setDisplay] = useState(0);

 useEffect(() => {
 if (inView) motionVal.set(target);
 }, [inView, target, motionVal]);

 useEffect(() => spring.on("change", (v) => setDisplay(Math.floor(v))), [spring]);

 return (
 <span ref={ref}>
 {(shouldReduceMotion ? target : display).toLocaleString()}
 {suffix}
 </span>
 );
}

const STATS = [
 { value: 12, suffix: "+", label: "Years shipping UK ⇄ Nigeria", sub: "Trusted by families and businesses since 2012" },
 { value: 50000, suffix: "+", label: "Shipments delivered", sub: "Families and businesses" },
 { value: 2, suffix: "", label: "Own warehouses", sub: "Essex and Lagos" },
 { value: 36, suffix: "", label: "Nigerian states", sub: "Plus the FCT" },
];

const SERVICES = [
 {
 icon: Plane,
 name: "Air freight",
 from: "£5.50",
 transit: "5 to 10 working days",
 blurb:
 "The fast route for electronics, documents, fashion and anything urgent. Weekly departures from Heathrow, Gatwick and Manchester.",
 href: "/services#air-freight",
 },
 {
 icon: Ship,
 name: "Sea freight",
 from: "£3",
 transit: "4 to 6 weeks",
 blurb:
 "The cheapest way to move heavy or bulky loads: furniture, appliances, bulk food and full containers. Weekly sailings to Lagos.",
 href: "/services#sea-shipping-to-nigeria",
 },
 {
 icon: Truck,
 name: "Door to door",
 from: "£6",
 transit: "Collection to doorstep",
 blurb:
 "We collect from your UK address and deliver to the recipient's door in Nigeria. No depot visits and no customs queues.",
 href: "/services#door-to-door-cargo",
 },
];

const fadeUp = {
 hidden: { opacity: 0, y: 22 },
 visible: (delay = 0) => ({
 opacity: 1,
 y: 0,
 transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
 }),
};

export default function HomeHighlights() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-80px 0px" });

 return (
 <section
 ref={ref}
 aria-labelledby="highlights-heading"
 className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white`}
 >
 {/* ── Track record: one rounded panel that overlaps the hero edge ──── */}
 <div className="relative z-10 mx-auto -mt-16 max-w-[1400px] px-5 sm:px-8 xl:px-10 md:-mt-20">
 <dl className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-[#DCE4F5] bg-white shadow-[0_30px_70px_-30px_rgba(0,17,46,0.45)] lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
 {STATS.map((stat, i) => {
 const featured = i === 0;
 return (
 <motion.div
 key={stat.label}
 className={
 featured
 ? "relative col-span-2 overflow-hidden bg-[#000f89] px-7 py-8 text-white md:px-10 md:py-10 lg:col-span-1"
 : `px-6 py-7 md:px-8 md:py-9 ${i === 3 ? "col-span-2 lg:col-span-1" : ""} ${i === 2 ? "border-l border-[#E8EEF9]" : ""} ${i >= 1 ? "border-t border-[#E8EEF9] lg:border-t-0" : ""} ${i >= 1 ? "lg:border-l" : ""}`
 }
 variants={fadeUp}
 initial="hidden"
 animate={inView ? "visible" : "hidden"}
 custom={0.05 * i}
 >
 {featured && (
 <span
 className="absolute inset-0 opacity-[0.08] pointer-events-none"
 style={{
 backgroundImage:
 "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
 backgroundSize: "32px 32px",
 }}
 aria-hidden="true"
 />
 )}
 <dd
 className={`relative font-extrabold leading-none tracking-[-0.04em] tabular-nums ${featured ? "text-white" : "text-[#00112E]"}`}
 style={{ fontSize: featured ? "clamp(52px, 6vw, 84px)" : "clamp(30px, 3.4vw, 46px)" }}
 >
 <Counter target={stat.value} suffix={stat.suffix} />
 </dd>
 <dt className={`relative mt-3 font-bold ${featured ? "text-[17px] text-white" : "text-[14px] text-[#000f89]"}`}>
 {stat.label}
 </dt>
 <p className={`relative mt-0.5 leading-snug ${featured ? "text-[14px] text-white/75" : "text-[13px] text-slate-500"}`}>
 {stat.sub}
 </p>
 </motion.div>
 );
 })}
 </dl>
 </div>

 {/* ── What we do + the three ways to ship ──────────────────────────── */}
 <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-24 lg:px-12 xl:px-16">
 <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
 <motion.div
 variants={fadeUp}
 initial="hidden"
 animate={inView ? "visible" : "hidden"}
 custom={0.1}
 >
 <p className="mb-5 inline-flex rounded-full bg-[#000f89]/[0.07] px-3.5 py-1.5 text-[13px] font-semibold text-[#000f89]">
 UK to Nigeria, both ways
 </p>
 <h2
 id="highlights-heading"
 className="font-extrabold leading-[1.04] tracking-[-0.035em] text-[#00112E]"
 style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}
 >
 Three ways to send your cargo.
 </h2>
 </motion.div>

 <motion.div
 variants={fadeUp}
 initial="hidden"
 animate={inView ? "visible" : "hidden"}
 custom={0.18}
 className="lg:pt-12"
 >
 <p className="text-[17px] font-normal leading-[1.8] text-slate-600">
 R-Zone moves cargo from the UK to Nigeria by air and by sea, and brings
 goods back the other way. Every price is all inclusive: UK export
 paperwork, transit, Nigeria customs clearance and delivery to the door,
 in Lagos, Abuja, Port Harcourt and all 36 states.
 </p>
 <p className="mt-4 text-[17px] font-normal leading-[1.8] text-slate-600">
 Not sure which service suits what you are sending?{" "}
 <Link
 href="/quote"
 className="font-semibold text-[#000f89] underline decoration-[#000f89]/30 underline-offset-4 hover:decoration-[#000f89]"
 >
 Tell us what is in the box
 </Link>{" "}
 and we will quote the cheapest way to move it, the same day.
 </p>
 </motion.div>
 </div>

 <ul className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
 {SERVICES.map((service, i) => {
 const Icon = service.icon;
 return (
 <motion.li
 key={service.name}
 variants={fadeUp}
 initial="hidden"
 animate={inView ? "visible" : "hidden"}
 custom={0.24 + i * 0.08}
 >
 <Link
 href={service.href}
 className="group flex h-full flex-col rounded-[20px] bg-[#F6FAFF] p-7 ring-1 ring-[#E3EAF7] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(0,15,137,0.35)] hover:ring-[#000f89]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000f89] md:p-8"
 >
 <span
 className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#000f89] text-white"
 aria-hidden="true"
 >
 <Icon size={20} />
 </span>

 <h3 className="text-[21px] font-extrabold tracking-[-0.02em] text-[#00112E]">
 {service.name}
 </h3>

 <p className="mt-2 flex items-baseline gap-1.5">
 <span className="text-[13px] font-medium text-slate-500">from</span>
 <span className="text-[28px] font-extrabold leading-none tracking-[-0.03em] text-[#000f89]">
 {service.from}
 </span>
 <span className="text-[13px] font-medium text-slate-500">per kg</span>
 </p>

 <p className="mt-2 inline-flex w-fit rounded-full bg-white px-3 py-1 text-[12.5px] font-semibold text-slate-600 ring-1 ring-[#E3EAF7] group-hover:bg-[#F6FAFF]">
 {service.transit}
 </p>

 <p className="mt-5 flex-1 text-[15px] font-normal leading-relaxed text-slate-600">
 {service.blurb}
 </p>

 <span className="mt-7 inline-flex items-center gap-2 text-[14px] font-bold text-[#000f89]">
 See how it works
 <ArrowRight
 size={15}
 className="transition-transform duration-200 group-hover:translate-x-1"
 aria-hidden="true"
 />
 </span>
 </Link>
 </motion.li>
 );
 })}
 </ul>
 </div>
 </section>
 );
}
