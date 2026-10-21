"use client";
// components/HeaderSlider.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Homepage hero.
//
// Modelled on two openings that work: Labour's (one short, confident line,
// solid colour blocks, two clear buttons) and BitLayerX's (a very large
// left-aligned headline on white, the supporting line and actions beside it,
// then one photograph shown big as the stage).
//
// Rules this hero keeps:
//  • The photograph (a container ship) is the ground: near-solid blue-black
//    behind the copy, opening up on the right so the ship clearly reads.
//  • Site navy #00112E, accent #0000FF, faint 64px grid, as on /services.
//  • Reads top to bottom with no dead space: eyebrow, a full-width
//    extra-bold headline (one accent: the blue full stop), then one band
//    under a hairline rule with the intro left and the actions right.
//  • Track record ("12+ years" etc.) lives in <HomeHighlights />, whose
//    panel overlaps this hero's bottom edge; nothing here repeats it.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { montserrat } from "../lib/fonts";
import { motion, useReducedMotion } from "framer-motion";

const HERO_IMAGE =
 "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=2400&q=80&auto=format&fit=crop";

const fadeUp = {
 hidden: { opacity: 0, y: 18 },
 visible: (delay = 0) => ({
 opacity: 1,
 y: 0,
 transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
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
 logo: "https://r-zoneenterprises.com/images/rzone-logo.png",
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

const GRID = {
 backgroundImage:
 "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
 backgroundSize: "64px 64px",
};

export default function HeroSection() {
 const reduce = useReducedMotion();
 const motionProps = (delay) =>
 reduce
 ? {}
 : { variants: fadeUp, initial: "hidden", animate: "visible", custom: delay };

 return (
 <section
 aria-labelledby="hero-heading"
 className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] hero-section relative isolate flex items-center overflow-hidden lg:min-h-[86svh] bg-[#00112E] text-white [--nav-height:73px] lg:[--nav-height:101px]`}
 >
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 />

 {/* ── Photograph as the ground, almost lost under a blue-black shade ── */}
 <div className="absolute inset-0 -z-10" aria-hidden="true">
 <Image
 src={HERO_IMAGE}
 alt=""
 fill
 priority
 sizes="100vw"
 className="object-cover object-[62%_55%] lg:object-[75%_50%]"
 />
 {/* Very dark everywhere; the photo only reads faintly on the right */}
 {/* Phones and tablets: copy spans the width, so shade top to bottom */}
 <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,8,20,0.9)_0%,rgba(0,8,20,0.82)_45%,rgba(0,12,34,0.7)_75%,#00112E_100%)] lg:hidden" />
 {/* Desktop: near-solid behind the copy, opening up so the ship reads on the right */}
 <div className="absolute inset-0 hidden bg-[linear-gradient(100deg,#000814_0%,rgba(0,8,20,0.95)_32%,rgba(0,10,28,0.72)_55%,rgba(0,15,40,0.38)_78%,rgba(0,17,46,0.3)_100%)] lg:block" />
 <div className="absolute inset-0 hidden bg-[linear-gradient(to_bottom,rgba(0,8,20,0.55)_0%,transparent_25%,transparent_65%,#00112E_100%)] lg:block" />
 <div className="absolute inset-0 opacity-[0.035]" style={GRID} />
 <div className="absolute -left-40 top-1/3 h-[520px] w-[760px] rounded-full bg-[#000f89]/20 blur-[150px]" />
 </div>

 <div className="mx-auto w-full max-w-[1400px] px-5 pt-[calc(var(--nav-height)+clamp(2.5rem,6vw,5.5rem))] pb-[clamp(7rem,12vw,10rem)] sm:px-8 xl:px-10">
 {/* ── Eyebrow ─────────────────────────────────────────────────── */}
 <motion.p
 {...motionProps(0.05)}
 className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[13.5px] font-semibold text-[#A6A6FF] backdrop-blur-sm"
 >
 <span className="h-1.5 w-1.5 rounded-full bg-[#4D4DFF]" aria-hidden="true" />
 R-Zone Cargo · UK ⇄ Nigeria since 2012
 </motion.p>

 {/* ── Headline: full width, heavy, one accent (the full stop) ─────── */}
 <motion.h1
 id="hero-heading"
 {...motionProps(0.12)}
 className="mt-7 max-w-[13ch] text-[clamp(3.1rem,8vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.05em] text-white"
 >
 UK to Nigeria cargo, delivered<span className="text-[#4D4DFF]">.</span>
 </motion.h1>

 {/* ── Supporting band: intro left, actions right, on one rule ──────── */}
 <motion.div
 {...motionProps(0.26)}
 className="mt-10 grid gap-8 border-t border-white/[0.12] pt-8 md:mt-14 md:pt-10 lg:grid-cols-12 lg:items-center lg:gap-12"
 >
 <p className="max-w-[46ch] text-[clamp(1.1rem,1.5vw,1.3rem)] font-medium leading-[1.6] text-white/80 lg:col-span-6">
 Air and sea freight with customs clearance and door to door delivery
 included, to Lagos, Abuja and every Nigerian state.{" "}
 <span className="text-white">And back again.</span>
 </p>

 <div className="lg:col-span-6 lg:justify-self-end">
 <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center">
 <Link
 href="/quote"
 aria-label="Get a free UK to Nigeria cargo quote"
 className="group inline-flex min-h-[58px] items-center justify-center gap-2.5 rounded-full bg-[#0000CD] px-8 text-[16.5px] font-bold text-white shadow-[0_16px_40px_-12px_rgba(0,0,255,0.85)] transition-colors duration-200 hover:bg-[#000f89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#000814]"
 >
 Get a free quote
 <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
 </Link>
 <a
 href="https://wa.me/447915647119"
 target="_blank"
 rel="noopener noreferrer"
 aria-label="Contact R-Zone on WhatsApp"
 className="inline-flex min-h-[58px] items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/[0.06] px-8 text-[16.5px] font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/50 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#000814]"
 >
 <FaWhatsapp size={19} className="text-[#25D366]" aria-hidden="true" />
 WhatsApp us
 </a>
 </div>

 {/* Quiet proof: verifiable, not a ranking claim */}
 <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14.5px] font-medium text-white/70">
 <span className="inline-flex items-center gap-2">
 <span className="flex gap-0.5" aria-hidden="true">
 {Array.from({ length: 5 }).map((_, i) => (
 <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
 ))}
 </span>
 <span><strong className="font-bold text-white">120+</strong> five-star Google reviews</span>
 </span>
 <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden="true" />
 <Link href="/track" className="group inline-flex items-center gap-1 font-bold text-white transition-colors hover:text-[#A6A6FF]">
 Track a shipment
 <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
 </Link>
 </div>
 </div>
 </motion.div>
 </div>
 </section>
 );
}
