"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FileCheck, Anchor, Car, Warehouse, Package, User } from "lucide-react";
import { motion, useInView } from "framer-motion";
import FeaturedProduct from "@/components/FeaturedProduct";
import { montserrat } from "../lib/fonts";

// Air, sea and door to door are introduced once, with prices, in
// <HomeHighlights /> right above. This grid covers everything else we do, so
// no service is presented twice on the homepage.
const SERVICE_CARDS = [
 {
 id: "01", icon: FileCheck,
 title: "Customs clearance",
 href: "/services#customs-clearance",
 description: "Our own teams clear your goods through UK export and Nigeria Customs, with duties and paperwork handled before anything is held up.",
 tag: "Both ends",
 highlights: ["UK export docs", "Nigeria Customs", "Duty guidance"],
 },
 {
 id: "02", icon: Anchor,
 title: "Importation from Nigeria",
 href: "/importation",
 description: "Bring goods the other way: foodstuffs, fabrics and business stock shipped from Lagos to the UK by air or sea, every week.",
 tag: "Nigeria to UK",
 highlights: ["Weekly air & sea", "Lagos pickup", "UK delivery"],
 },
 {
 id: "03", icon: Car,
 title: "Car and vehicle shipping",
 href: "/services#vehicles",
 description: "Cars, vans and machinery shipped to Lagos with valuation, export paperwork and port clearance taken care of.",
 tag: "Vehicles",
 highlights: ["Cars & vans", "Machinery", "Port clearance"],
 },
 {
 id: "04", icon: Warehouse,
 title: "Warehousing",
 href: "/services#warehousing",
 description: "Secure storage at our Essex and Lagos warehouses. Drop items off over time and we consolidate them into one shipment.",
 tag: "Storage",
 highlights: ["Essex & Lagos", "Consolidation", "Drop-offs welcome"],
 },
 {
 id: "05", icon: Package,
 title: "Commercial cargo",
 href: "/services#cargo-handling",
 description: "Freight for businesses: pallets, equipment and high-volume merchandise, with rates that scale with your volume.",
 tag: "B2B",
 highlights: ["Pallets & equipment", "Volume rates", "Regular schedules"],
 },
 {
 id: "06", icon: User,
 title: "Personal and family cargo",
 href: "/services#door-to-door-cargo",
 description: "Household goods, clothing, food and gifts for family in Nigeria. African foodstuffs accepted.",
 tag: "Personal",
 highlights: ["Foodstuffs accepted", "Barrels & boxes", "Family parcels"],
 },
];

const ArrowDiag = ({ className = "", style }) => (
 <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor"
 strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M7 17L17 7M17 7H7M17 7v10" />
 </svg>
);

function SectionHeader({ eyebrow, title, subtitle, cta }) {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-60px" });
 return (
 <div ref={ref} className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12 md:mb-14">
 <motion.div initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
 <p className="mb-5 inline-flex rounded-full bg-[#000f89]/[0.07] px-3.5 py-1.5 text-[13px] font-semibold text-[#000f89]">
 {eyebrow}
 </p>
 <h2 id="services-heading" className="font-extrabold text-[#00112E] leading-[1.04] tracking-[-0.035em]"
 style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}>
 {title}
 </h2>
 {subtitle && (
 <p className="mt-4 text-slate-600 text-[16px] font-normal leading-relaxed max-w-xl">{subtitle}</p>
 )}
 </motion.div>
 {cta && (
 <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
 transition={{ duration: 0.6, delay: 0.3 }} className="self-start sm:self-end flex-shrink-0">
 <Link href={cta.href} aria-label={cta.ariaLabel}
 className="group inline-flex items-center gap-2.5 rounded-full border border-[#000f89]/20 bg-white px-6 py-3 text-[14px] font-bold text-[#000f89] transition-colors duration-300 hover:border-[#000f89] hover:bg-[#000f89] hover:text-white">
 {cta.label}
 <ArrowDiag className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
 </Link>
 </motion.div>
 )}
 </div>
 );
}

function ServiceCard({ service, index }) {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-40px" });
 const Icon = service.icon;
 return (
 <motion.article ref={ref}
 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
 itemScope itemType="https://schema.org/Service" className="h-full">
 <Link href={service.href}
 aria-label={`${service.title}: UK to Nigeria cargo service from R-Zone Enterprises`}
 className="group flex flex-col h-full rounded-[20px] bg-white p-7 md:p-8 ring-1 ring-[#E3EAF7] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(0,15,137,0.35)] hover:ring-[#000f89]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000f89]">
 <div className="flex items-start justify-between gap-4">
 <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#000f89]/[0.07] text-[#000f89] transition-colors duration-300 group-hover:bg-[#000f89] group-hover:text-white" aria-hidden="true">
 <Icon size={20} />
 </span>
 <span className="rounded-full bg-[#F6FAFF] px-3 py-1 text-[12px] font-semibold text-[#000f89] ring-1 ring-[#E3EAF7]">
 {service.tag}
 </span>
 </div>
 <h3 className="mt-7 text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-[#00112E]" itemProp="name">
 {service.title}
 </h3>
 <p className="mt-3 flex-1 text-[15px] font-normal leading-relaxed text-slate-600" itemProp="description">
 {service.description}
 </p>
 <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${service.title} highlights`}>
 {service.highlights.map(h => (
 <li key={h} className="rounded-full bg-[#F6FAFF] px-3 py-1 text-[12px] font-medium text-slate-600">{h}</li>
 ))}
 </ul>
 <span className="mt-7 inline-flex items-center gap-2 text-[14px] font-bold text-[#000f89]">
 Learn more
 <ArrowDiag className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
 </span>
 </Link>
 </motion.article>
 );
}

export default function OurServices() {
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "ItemList",
 "name": "R-Zone Enterprises Specialist Cargo Services",
 "description": "Specialist UK to Nigeria cargo services from R-Zone Enterprises: customs clearance, importation from Nigeria, vehicle shipping, warehousing, commercial and personal cargo.",
 "url": "https://r-zoneenterprises.com/services",
 "numberOfItems": SERVICE_CARDS.length,
 "itemListElement": SERVICE_CARDS.map((s, i) => ({
 "@type": "ListItem",
 "position": i + 1,
 "item": {
 "@type": "Service",
 "name": s.title,
 "url": `https://r-zoneenterprises.com${s.href}`,
 "description": s.description,
 "provider": {
 "@type": "Organization",
 "name": "R-Zone Enterprises",
 "url": "https://r-zoneenterprises.com",
 },
 },
 })),
 }),
 }} />

 <section
 className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] relative w-full bg-[#F6FAFF] overflow-hidden`}
 aria-labelledby="services-heading"
 itemScope itemType="https://schema.org/ItemList"
 >
 <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">

 {/* ── CARD GRID ── */}
 <div className="py-20 md:py-24 lg:py-28">
 <SectionHeader
 eyebrow="Beyond air and sea"
 title="Specialist services."
 subtitle="Customs, vehicles, storage, business freight and imports from Nigeria, all handled in-house by our Essex and Lagos teams."
 cta={{ label: "All services", href: "/services", ariaLabel: "View all UK to Nigeria shipping services from R-Zone Enterprises" }}
 />
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
 role="list" aria-label="R-Zone UK to Nigeria cargo services">
 {SERVICE_CARDS.map((service, index) => (
 <div key={service.id} role="listitem">
 <ServiceCard service={service} index={index} />
 </div>
 ))}
 </div>
 </div>

 </div>

 <FeaturedProduct />

 </section>
 </>
 );
}