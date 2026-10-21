"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { montserrat } from "../lib/fonts";
import {
 Shield, Award, CheckCircle, Users, Plane, Ship, ArrowRight,
} from "lucide-react";

// "Why R-Zone": four plain reasons, then proof (credentials, partners).
// Offices are not repeated here; the footer carries both addresses.

const REASONS = [
 {
 title: "Real people, not a call centre.",
 text: "Our UK team answers every query personally, by phone, WhatsApp or email. No bots and no ticket numbers.",
 },
 {
 title: "Customs handled at both ends.",
 text: "Our own teams clear your goods through UK export and Nigeria Customs, so nothing sits waiting at the port.",
 },
 {
 title: "Our own warehouses.",
 text: "Drop off in Essex, collect in Lagos, with collection points in Egbeda, Surulere, Ajah and Ibadan.",
 },
 {
 title: "Weekly departures.",
 text: "Air freight every week and weekly sailings to Lagos, so your cargo never waits long for a slot.",
 },
];

const CERTIFICATIONS = [
 { icon: Shield, label: "Fully insured" },
 { icon: Award, label: "IATA registered" },
 { icon: CheckCircle, label: "NCS compliant" },
 { icon: Users, label: "10,000+ customers" },
];

const PARTNERS = [
 { name: "Allied Air", mode: "air" },
 { name: "DHL", mode: "air" },
 { name: "Air Peace", mode: "air" },
 { name: "Grimaldi", mode: "sea" },
 { name: "MSC", mode: "sea" },
 { name: "Maersk Line", mode: "sea" },
 { name: "CMA CGM", mode: "sea" },
];

export default function TrustAuthority() {
 const headerRef = useRef(null);
 const inView = useInView(headerRef, { once: true, margin: "-80px" });

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "Organization",
 "@id": "https://r-zoneenterprises.com/#organization",
 "name": "R-Zone Enterprises",
 "url": "https://r-zoneenterprises.com",
 "foundingDate": "2012",
 "description": "Air freight, sea freight with weekly sailings, door-to-door delivery and customs clearance between the UK and Nigeria since 2012.",
 "areaServed": [
 { "@type": "Country", "name": "United Kingdom" },
 { "@type": "Country", "name": "Nigeria" },
 { "@type": "City", "name": "Lagos" },
 { "@type": "City", "name": "Abuja" },
 { "@type": "City", "name": "London" },
 ],
 "address": [
 { "@type": "PostalAddress", "streetAddress": "Unit 9 Moorhen Yard, Elms Lane, Bulphan", "addressLocality": "Upminster", "addressRegion": "Essex", "postalCode": "RM14 3TS", "addressCountry": "GB" },
 { "@type": "PostalAddress", "streetAddress": "1-3 R-Zone Crescent, Queens Park Estate II, Shagam Interchange", "addressLocality": "Lagos", "addressCountry": "NG", "description": "<strong>Collection Points:</strong> Egbeda, Surulere, Ajah, Ibadan" },
 ],
 }),
 }} />

 <section
 className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] relative w-full bg-[#00112E] overflow-hidden`}
 aria-labelledby="trust-heading"
 >
 <div className="pointer-events-none absolute -top-40 left-1/4 h-[520px] w-[720px] rounded-full bg-[#000f89]/25 blur-[150px]" aria-hidden="true" />

 <div ref={headerRef} className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-24 lg:py-28 xl:px-10">

 {/* Header */}
 <motion.div className="max-w-2xl"
 initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}>
 <p className="mb-5 inline-flex rounded-full bg-white/[0.08] px-3.5 py-1.5 text-[13px] font-semibold text-[#A6A6FF]">
 Why R-Zone
 </p>
 <h2 id="trust-heading" className="font-extrabold leading-[1.04] tracking-[-0.035em] text-white"
 style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}>
 Trusted by thousands since 2012.
 </h2>
 <p className="mt-4 max-w-xl text-[16px] font-normal leading-relaxed text-white/70">
 Families and businesses across the UK ship with us for one reason: their
 cargo arrives, and someone they can talk to is with it the whole way.
 </p>
 </motion.div>

 {/* Four reasons */}
 <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-14" role="list">
 {REASONS.map((reason, i) => (
 <motion.div key={reason.title} role="listitem"
 className="flex flex-col rounded-[20px] bg-white/[0.05] p-7 ring-1 ring-white/[0.08] transition-colors duration-300 hover:bg-white/[0.08]"
 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}>
 <span className="text-[13px] font-bold text-[#A6A6FF] tabular-nums" aria-hidden="true">
 {String(i + 1).padStart(2, "0")}
 </span>
 <h3 className="mt-6 text-[19px] font-extrabold leading-snug tracking-[-0.02em] text-white">
 {reason.title}
 </h3>
 <p className="mt-3 text-[14.5px] font-normal leading-relaxed text-white/65">
 {reason.text}
 </p>
 </motion.div>
 ))}
 </div>

 {/* Credentials + partners */}
 <div className="mt-14 grid gap-10 border-t border-white/[0.08] pt-10 lg:grid-cols-2 lg:gap-16 md:mt-16">
 <div>
 <p className="mb-4 text-[13px] font-semibold text-white/50">Credentials</p>
 <ul className="flex flex-wrap gap-2.5" aria-label="R-Zone certifications and credentials">
 {CERTIFICATIONS.map(({ icon: Icon, label }) => (
 <li key={label} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-[13.5px] font-semibold text-white/85 ring-1 ring-white/[0.08]">
 <Icon size={14} className="text-[#A6A6FF]" aria-hidden="true" />
 {label}
 </li>
 ))}
 </ul>
 </div>
 <div>
 <p className="mb-4 text-[13px] font-semibold text-white/50">Air and sea partners</p>
 <ul className="flex flex-wrap gap-2.5" aria-label="R-Zone airline and shipping line partners">
 {PARTNERS.map(({ name, mode }) => {
 const Icon = mode === "air" ? Plane : Ship;
 return (
 <li key={name} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-[13.5px] font-semibold text-white/85 ring-1 ring-white/[0.08]">
 <Icon size={13} className="text-[#A6A6FF]" aria-hidden="true" />
 {name}
 </li>
 );
 })}
 </ul>
 </div>
 </div>

 {/* One action */}
 <div className="mt-12 flex flex-wrap items-center gap-3">
 <Link href="/contact"
 className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-white px-7 text-[15px] font-bold text-[#00112E] transition-colors duration-200 hover:bg-[#E8EEFF]">
 Talk to our team
 <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
 </Link>
 <Link href="/quote"
 className="inline-flex min-h-[52px] items-center rounded-full px-5 text-[15px] font-semibold text-white/75 transition-colors duration-200 hover:text-white">
 Or get a quote
 </Link>
 </div>
 </div>
 </section>
 </>
 );
}
