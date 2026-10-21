"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { montserrat } from "../../lib/fonts";
import {
 Plane, Ship, Truck, Package, FileCheck,
 Warehouse, Anchor, ArrowRight, Check, ChevronRight,
 ChevronDown, Clock, Shield, Phone, MessageSquare,
 Star,
} from "lucide-react";

// SEO metadata for this route lives in ./layout.jsx (a Server Component),
// because a Client Component ("use client") cannot export `metadata`.

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
 {
 id: "air-freight",
 slug: "air-freight",
 nav: "Air Freight",
 icon: Plane,
 badge: "Fastest Option",
 badgeColor: "bg-blue-50 text-blue-700",
 title: "Air Freight to Nigeria",
 tagline: "Fast, reliable UK Nigeria air cargo. 5 to 10 working days.",
 description:
 "Our air freight service is the fastest way to send cargo from the United Kingdom to Nigeria. Whether you're shipping personal effects, commercial merchandise, or time-sensitive goods, R-Zone Enterprises connects you to all 36 Nigerian states via a network of trusted airline partners weekly departures from London Heathrow, Gatwick and Manchester.",
 highlights: [
 "5 to 10 working days transit",
 "All 36 Nigerian states covered",
 "Door collection across the UK",
 "Real-time tracking included",
 "IATA-certified cargo handling",
 "Foodstuffs & general cargo accepted",
 ],
 process: [
 { step: "01", label: "Book online, WhatsApp or call us", detail: "Free quote in minutes same-day response" },
 { step: "02", label: "Drop off or request collection", detail: "Upminster warehouse or UK-wide door pickup" },
 { step: "03", label: "Cargo consolidated & dispatched", detail: "Weekly air freight departures from UK" },
 { step: "04", label: "Delivered anywhere in Nigeria", detail: "Door delivery or Lagos warehouse pickup" },
 ],
 accent: "#000f89",
 dark: false,
 // Cargo aircraft being loaded
 img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80&auto=format&fit=crop",
 imgAlt: "Cargo aircraft being loaded at UK airport for Nigeria air freight service",
 faq: [
 { q: "How long does air freight to Nigeria take?", a: "Typically 5 to 10 working days from the UK to Lagos, Abuja, Port Harcourt and all major Nigerian cities. Weekly departures guarantee no long waits." },
 { q: "How much does air freight to Nigeria cost per kg?", a: <>Air freight from the UK to Nigeria starts from £5.50 per kg. <Link href="/schedulesprices#pricing" className="font-bold text-[#000f89] hover:underline">Price List</Link></> },
 { q: "What items can I send by air to Nigeria?", a: "We accept clothing, electronics, foodstuffs, documents, personal effects and most general cargo. Contact us for a full list of accepted and prohibited items." },
 ],
 },
 {
 id: "sea-shipping-to-nigeria",
 slug: "sea-shipping-to-nigeria",
 nav: "Sea Shipping",
 icon: Ship,
 badge: "Best Value",
 badgeColor: "bg-emerald-50 text-emerald-700",
 title: "Sea Freight to Nigeria",
 tagline: "Weekly sea freight sailings. The cheapest way to ship to Nigeria.",
 description:
 "Our weekly sea freight service is the most cost-effective solution for large, heavy, or high-volume shipments from the UK to Nigeria from just £3 per kg. Ideal for businesses and individuals moving significant quantities of goods, with fixed weekly sailings from UK ports to Apapa and Tin Can Island, Lagos.",
 highlights: [
 "Weekly fixed-schedule sailings",
 "From £3/kg cheapest option",
 "Full container (FCL) & shared (LCL)",
 "Vehicles & machinery accepted",
 "4 to 6 weeks transit time",
 "Customs clearance included",
 ],
 process: [
 { step: "01", label: "Request a sea freight quote", detail: "Volume-based pricing from £3/kg" },
 { step: "02", label: "Deliver to Upminster warehouse",detail: "UK-wide door collection also available" },
 { step: "03", label: "Weekly sailing departs", detail: "Fixed schedule, every week, UK to Lagos" },
 { step: "04", label: "Nigeria port clearance", detail: "Full customs handling at Apapa/Tin Can" },
 ],
 accent: "#0000CD",
 dark: true,
 // Container ship at sea
 img: "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1400&q=80&auto=format&fit=crop",
 imgAlt: "Container ship carrying sea freight from UK to Nigeria weekly sailings",
 faq: [
 { q: "How long does sea freight to Nigeria take?", a: "Sea freight from the UK to Nigeria typically takes 4 to 6 weeks. Sailing is weekly your cargo never waits more than a week to depart." },
 { q: "What is the cheapest way to ship to Nigeria from the UK?", a: <>Sea freight is the cheapest option starting from £3 per kg for consolidated (LCL) shipments. <Link href="/schedulesprices#pricing" className="font-bold text-[#0000CD] hover:underline">Price List</Link></> },
 { q: "Can I ship a car by sea to Nigeria?", a: "Yes. We specialise in vehicle shipping to Nigeria by sea. Contact us for RoRo (roll-on/roll-off) rates and the current sailing schedule." },
 ],
 },
 {
 id: "door-to-door-cargo",
 slug: "door-to-door-cargo",
 nav: "Door to Door",
 icon: Truck,
 badge: "Most Popular",
 badgeColor: "bg-amber-50 text-amber-700",
 title: "Door to Door Cargo Nigeria",
 tagline: "We collect from your UK address. We deliver to any Nigerian door.",
 description:
 "R-Zone's door-to-door cargo service removes all logistics complexity. We collect from your UK address, consolidate, clear customs at both ends, and deliver directly to the recipient's door anywhere in Nigeria by air or sea, your choice. One contact, zero handoffs, both customs handled.",
 highlights: [
 "UK-wide door collection",
 "Nigeria door delivery all 36 states",
 "Air or sea your choice",
 "Both UK & Nigeria customs handled",
 "Personal & commercial cargo accepted",
 "SMS & email tracking updates",
 ],
 process: [
 { step: "01", label: "Book your collection", detail: "Choose air or sea freight option" },
 { step: "02", label: "We collect from your door", detail: "Professional packing available on request"},
 { step: "03", label: "UK & Nigeria customs cleared", detail: "We handle all documentation & duties" },
 { step: "04", label: "Delivered to Nigeria address", detail: "Any address, Lagos · Abuja · all 36 states"},
 ],
 accent: "#0000FF",
 dark: false,
 // Delivery truck
 img: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=1400&q=80&auto=format&fit=crop",
 imgAlt: "R-Zone door to door cargo collection service UK to Nigeria",
 faq: [
 { q: "Do you collect from anywhere in the UK?", a: "Yes, we offer door collection across the entire UK from London, Manchester, Birmingham, Leeds and beyond. Collection fees may apply depending on your postcode." },
 { q: "How much does door-to-door cargo to Nigeria cost?", a: <>Door-to-door cargo from the UK to Nigeria starts from £6 per kg, including UK collection and Nigerian delivery. <Link href="/schedulesprices#pricing" className="font-bold text-[#4D4DFF] hover:underline">Price List</Link></> },
 { q: "Can you deliver to Abuja and rural Nigerian areas?",a: "Yes. We deliver door-to-door to all 36 Nigerian states including Lagos, Abuja, Port Harcourt, Kano, Enugu, Ibadan and all rural areas." },
 ],
 },
 {
 id: "importation",
 slug: "importation-from-nigeria",
 nav: "Importation",
 icon: Package,
 badge: "Nigeria → UK · Weekly",
 badgeColor: "bg-purple-50 text-purple-700",
 title: "Importation from Nigeria to UK",
 tagline: "Weekly air and sea imports from Nigeria to the United Kingdom.",
 description:
 "R-Zone Enterprises operates a fully managed importation service for individuals and businesses sending goods from Nigeria to the UK. From African foodstuffs, clothing and textiles to commercial merchandise we handle every step of the inbound logistics chain with weekly air and sea departures from Lagos.",
 highlights: [
 "Weekly air collections from Lagos",
 "Weekly sea freight from Apapa port",
 "African foodstuffs accepted",
 "Full UK customs clearance included",
 "Collection from all 36 Nigerian states",
 "Commercial & personal cargo",
 ],
 process: [
 { step: "01", label: "Enquire about your shipment", detail: "Tell us what you're importing to the UK" },
 { step: "02", label: "Our Lagos team collects", detail: "Pickup from anywhere in Nigeria" },
 { step: "03", label: "Air or sea transit to the UK", detail: "Weekly departures from Lagos" },
 { step: "04", label: "UK customs cleared & delivered", detail: "Direct to your UK door or warehouse" },
 ],
 accent: "#000f89",
 dark: true,
 // Nigerian goods / cargo at port
 img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1400&q=80&auto=format&fit=crop",
 imgAlt: "Nigerian goods prepared for importation to UK weekly air and sea services from Lagos",
 faq: [
 { q: "Can I import food and foodstuffs from Nigeria to the UK?", a: "Yes, we accept African foodstuffs and food products from Nigeria. Some items are subject to UK HMRC and DEFRA restrictions contact us for the full accepted items list." },
 { q: "How do I send goods from Nigeria to the UK?", a: "Contact our team or use our online quote form. We'll arrange collection from anywhere in Nigeria Lagos, Abuja, Port Harcourt and all 36 states." },
 { q: "How long does importation from Nigeria to the UK take?", a: "Air freight from Nigeria to the UK takes 5 to 8 working days. Sea freight takes 4 to 6 weeks. We operate weekly departures on both routes." },
 ],
 },
 {
 id: "customs-clearance",
 slug: "customs-clearance",
 nav: "Customs",
 icon: FileCheck,
 badge: "UK & Nigeria",
 badgeColor: "bg-slate-100 text-slate-700",
 title: "Customs Clearance UK & Nigeria",
 tagline: "Expert customs clearance no delays, no surprises.",
 description:
 "Navigating UK HMRC and Nigeria Customs Service (NCS) regulations requires specialist knowledge. R-Zone's experienced customs team handles all documentation, HS code classification, duty payment, and compliance checks so your cargo clears without delays, fines, or unexpected costs at either end.",
 highlights: [
 "UK import & export clearance (HMRC)",
 "Nigeria Customs Service (NCS) compliant",
 "Accurate HS code classification",
 "Duty & VAT calculation & payment",
 "Prohibited goods guidance",
 "Priority & urgent clearance available",
 ],
 process: [
 { step: "01", label: "Submit cargo documentation", detail: "Commercial invoice, packing list, AWB/BOL" },
 { step: "02", label: "HS code & duty assessment", detail: "Accurate tariff classification every time" },
 { step: "03", label: "Duty payment & official filing", detail: "On your behalf transparent costs" },
 { step: "04", label: "Cargo released & delivered", detail: "No delays, no surprises" },
 ],
 accent: "#0000CD",
 dark: false,
 // Customs / documentation
 img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=80&auto=format&fit=crop",
 imgAlt: "Customs clearance documentation R-Zone UK and Nigeria customs service",
 faq: [
 { q: "Do I need to be present for customs clearance?", a: "No R-Zone acts as your authorised customs agent. We handle all HMRC and NCS filings entirely on your behalf." },
 { q: "What documents are needed for Nigeria customs?", a: "Typically: commercial invoice, packing list, and bill of lading or air waybill. We will advise exactly what is needed based on your cargo type." },
 { q: "How do I avoid customs delays when shipping to Nigeria?", a: "Accurate documentation and correct HS codes are key. R-Zone's customs team checks everything before filing preventing delays before they happen." },
 ],
 },
 {
 id: "warehousing",
 slug: "warehousing",
 nav: "Warehousing",
 icon: Warehouse,
 badge: "Upminster UK · Lagos NG",
 badgeColor: "bg-sky-50 text-sky-700",
 title: "Warehousing UK & Nigeria",
 tagline: "Secure storage at our Upminster, Essex and Lagos facilities.",
 description:
 "R-Zone Enterprises operates secure, monitored warehousing in Upminster, Essex UK and Lagos, Nigeria. Whether you need short-term storage ahead of a consolidation shipment, or longer-term distribution warehousing, we provide flexible, 24/7 monitored solutions to keep your cargo safe and ready to move.",
 highlights: [
 "Upminster, Essex UK warehouse",
 "Lagos, Nigeria storage hub",
 "24/7 CCTV monitored & insured",
 "Flexible short & long-term terms",
 "Full inventory management system",
 "Pick, pack & same-day despatch",
 ],
 process: [
 { step: "01", label: "Discuss your storage needs", detail: "Flexible space short or long-term" },
 { step: "02", label: "Cargo received & inventoried", detail: "Full digital inventory tracking" },
 { step: "03", label: "Secure monitored storage", detail: "24/7 CCTV, access controlled facility" },
 { step: "04", label: "Released when you're ready", detail: "Pick, pack & ship on demand" },
 ],
 accent: "#0000FF",
 dark: true,
 // Warehouse interior
 img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80&auto=format&fit=crop",
 imgAlt: "R-Zone secure warehouse facility Upminster Essex UK and Lagos Nigeria storage",
 faq: [
 { q: "How long can I store goods in your UK warehouse?", a: "We offer both short-term (days) and long-term (months) storage at our Upminster, Essex facility. A 3-day free storage period applies to all incoming consignments before daily charges apply." },
 { q: "Is my cargo insured while in R-Zone storage?", a: "Yes all goods stored in our UK and Nigeria warehouses are covered by comprehensive cargo insurance throughout their stay." },
 { q: "Can I store goods in Nigeria before delivery?", a: "Yes. Our Lagos hub offers short and long-term storage before last-mile delivery to any of Nigeria's 36 states." },
 ],
 },
 {
 id: "cargo-handling",
 slug: "cargo-handling",
 nav: "Cargo Handling",
 icon: Anchor,
 badge: "Port Operations",
 badgeColor: "bg-rose-50 text-rose-700",
 title: "Port & Cargo Handling Nigeria",
 tagline: "Specialist port operations across all major Nigerian ports.",
 description:
 "R-Zone's cargo handling service covers port stevedoring, heavy lift, oversized and out-of-gauge cargo management at Apapa, Tin Can Island, Onne, and Calabar. From project cargo to IATA/IMDG-certified dangerous goods handling, our specialist teams ensure safe, efficient, fully compliant cargo movement at every major Nigerian port.",
 highlights: [
 "Port stevedoring all Nigerian ports",
 "Heavy lift & project cargo specialist",
 "Oversized & out-of-gauge (OOG) cargo",
 "IATA/IMDG dangerous goods certified",
 "Third-party independent cargo inspection",
 "NPA & Nigerian port authority compliant",
 ],
 process: [
 { step: "01", label: "Cargo specification review", detail: "Weight, dimensions, classification" },
 { step: "02", label: "Port & equipment planning", detail: "Cranes, specialist handling vehicles" },
 { step: "03", label: "Supervised port operations", detail: "Certified handling teams on site" },
 { step: "04", label: "Cargo cleared & onward moved", detail: "All documentation complete & filed" },
 ],
 accent: "#000f89",
 dark: false,
 // Port / cargo operations
 img: "https://images.unsplash.com/photo-1468818419799-3d02e0b85c1a?w=1400&q=80&auto=format&fit=crop",
 imgAlt: "Port cargo handling operations at Nigerian port R-Zone specialist stevedoring",
 faq: [
 { q: "Can R-Zone handle dangerous goods at Nigerian ports?", a: "Yes. We are IATA/IMDG certified for dangerous goods. Full specialist documentation, packaging and supervised handling is provided at all major Nigerian ports." },
 { q: "Which ports in Nigeria do you operate at?", a: "We operate at all major Nigerian ports Apapa, Tin Can Island, Onne (Port Harcourt) and Calabar." },
 { q: "Do you handle oversized or project cargo?", a: "Yes. We specialise in oversized, out-of-gauge (OOG) and heavy-lift project cargo. Contact us to discuss your specific requirements." },
 ],
 },
 {
 id: "vehicles",
 slug: "vehicles",
 nav: "Car & Vehicle Shipping",
 icon: Truck,
 badge: "Specialist Service",
 badgeColor: "bg-orange-50 text-orange-700",
 title: "Car & Vehicle Shipping UK to Nigeria",
 tagline: "Professional vehicle shipping with full protection, documentation & door-to-door delivery.",
 description:
 "R-Zone Enterprises specialises in safe, secure vehicle shipping from the UK to Nigeria. Whether you're relocating a personal car, sending vehicles for commercial use, or importing luxury vehicles, we provide complete end-to-end logistics with professional handling, full insurance cover, and comprehensive customs documentation. All vehicles are shipped via RoRo (roll-on/roll-off) on dedicated container vessels with departures every month.",
 highlights: [
 "RoRo (roll-on/roll-off) specialist shipping",
 "All vehicle types cars, trucks, motorcycles",
 "Full comprehensive insurance included",
 "Door collection in UK + door delivery in Nigeria",
 "Export & import documentation handled end-to-end",
 "4 to 6 weeks transit to all Nigerian ports",
 ],
 process: [
 { step: "01", label: "Vehicle specification & quote", detail: "Send photos, year, make, mileage, VIN" },
 { step: "02", label: "Collection & shipment logistics", detail: "Pick up from your UK location" },
 { step: "03", label: "Prepared for RoRo shipping", detail: "Professional handling & full insurance" },
 { step: "04", label: "Delivered to Nigeria address", detail: "All customs & duties cleared on arrival" },
 ],
 accent: "#D97706",
 dark: false,
 // Vehicle/car shipping
 img: "https://images.unsplash.com/photo-1604629209793-ba4f8a3ae0f2?w=1400&q=80&auto=format&fit=crop",
 imgAlt: "Car and vehicle shipping UK to Nigeria R-Zone professional RoRo container service",
 faq: [
 { q: "How much does it cost to ship a car from the UK to Nigeria?", a: <>Vehicle shipping costs range from £1,500 £4,500 depending on vehicle type, size, and specifications. <Link href="/schedulesprices#pricing" className="font-bold text-[#D97706] hover:underline">Price List</Link></> },
 { q: "What happens to my car during shipping?", a: "Your vehicle is loaded onto a dedicated RoRo vessel, secured, and transported in a sealed container. It's fully insured throughout at no extra cost. We provide real-time updates and door delivery to your Nigerian address." },
 { q: "How long does car shipping from the UK to Nigeria take?", a: "Typical transit time is 4 to 6 weeks depending on the Nigerian port (Lagos, Port Harcourt, or Calabar). We depart monthly with guaranteed safe arrival and full customs clearance on your behalf." },
 { q: "Can I ship a vehicle to Abuja or inland Nigeria?", a: "Yes. We deliver to all Nigerian cities Lagos, Abuja, Port Harcourt, Kano, and all 36 states. After port clearance, we arrange onward transport to your final destination." },
 { q: "What documents do I need to ship my car to Nigeria?", a: "Required: UK V5 Registration Document (car logbook), proof of ID, proof of ownership, and passport scan. Our customs team handles the rest Nigerian import permits, duty assessment, and full NCS clearance." },
 ],
 },
];

const STATS = [
 { value: "12+", label: "Years Experience", icon: Clock },
 { value: "50,000+", label: "Shipments Delivered", icon: Package },
 { value: "99%", label: "Delivery Success Rate", icon: Shield },
 { value: "120+", label: "5-Star Reviews", icon: Star },
];

const fadeUp = {
 hidden: { opacity: 0, y: 28 },
 visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};

// ─── Sticky service nav ───────────────────────────────────────────────────────
// Sits flush under the site header once it has slimmed down on scroll
// (73px on mobile, 65px on desktop).
function ServiceNav({ activeId }) {
 return (
 <div className="sticky top-[73px] lg:top-[65px] z-20 w-full bg-white/95 backdrop-blur border-b border-gray-200">
 <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
 <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
 {SERVICES.map(s => {
 const Icon = s.icon;
 const isActive = activeId === s.id;
 return (
 <a key={s.id} href={`#${s.id}`} aria-label={`Navigate to ${s.title}`}
 className={`relative flex items-center gap-2 px-3.5 py-4 whitespace-nowrap text-[14px] font-semibold transition-colors duration-150 flex-shrink-0 border-b-2 ${isActive ? "text-[#4D4DFF] border-[#0000FF]" : "text-gray-600 border-transparent hover:text-[#00112E]"}`}>
 <Icon size={15} aria-hidden="true" />{s.nav}
 </a>
 );
 })}
 </div>
 </div>
 </div>
 );
}

// ─── Service Section ──────────────────────────────────────────────────────────
// One idea per section: what it is, why it suits you, and how to book.
// Text on one side, one photograph on the other, alternating. The process and
// FAQs sit in a closed disclosure: still on the page (the FAQPage schema above
// must match visible content), but no longer competing for attention.
function ServiceSection({ service, index }) {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-80px" });
 const Icon = service.icon;
 const isDark = service.dark;
 const flip = index % 2 === 1;

 const ink = isDark ? "text-white" : "text-[#00112E]";
 const body = isDark ? "text-white/70" : "text-gray-600";
 const rule = isDark ? "border-white/10" : "border-gray-200";

 return (
 <section id={service.id} ref={ref}
 className={`relative overflow-hidden scroll-mt-[140px] ${isDark ? "bg-[#00112E]" : index % 4 === 0 ? "bg-white" : "bg-[#F6F8FF]"}`}
 aria-labelledby={`${service.id}-heading`}
 itemScope itemType="https://schema.org/Service">

 {isDark && (
 <div className="absolute inset-0 pointer-events-none opacity-[0.035]" aria-hidden="true"
 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
 )}

 <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

 {/* Text */}
 <motion.div className={flip ? "lg:order-2" : ""}
 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
 <p className="mb-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#4D4DFF]">
 <Icon size={16} aria-hidden="true" />
 {service.nav}
 </p>

 <h2 id={`${service.id}-heading`} itemProp="name"
 className={`font-extrabold text-[clamp(30px,4.2vw,52px)] leading-[1.04] tracking-[-0.035em] ${ink}`}>
 {service.title}
 </h2>

 <p className={`mt-5 text-[18px] md:text-[19px] font-medium leading-[1.55] ${isDark ? "text-white/85" : "text-[#00112E]/85"}`}>
 {service.tagline}
 </p>

 <p className={`mt-4 text-[16px] leading-[1.75] max-w-[58ch] ${body}`} itemProp="description">
 {service.description}
 </p>

 <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3" aria-label={`${service.title} features`}>
 {service.highlights.slice(0, 4).map(h => (
 <li key={h} className={`flex items-start gap-2.5 text-[15px] font-medium ${ink}`}>
 <Check size={18} className="mt-0.5 flex-shrink-0 text-[#4D4DFF]" aria-hidden="true" />
 {h}
 </li>
 ))}
 </ul>

 <div className="mt-10 flex flex-wrap gap-3">
 <Link href="/quote"
 className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#0000CD] px-7 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#000f89]"
 aria-label={`Get a free quote for ${service.title} from R-Zone Enterprises`}>
 Get a free quote
 <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
 </Link>
 <a href="https://wa.me/447915647119" target="_blank" rel="noopener noreferrer"
 className={`inline-flex min-h-[52px] items-center gap-2 rounded-full border px-7 text-[15px] font-semibold transition-colors duration-200 ${isDark ? "border-white/25 text-white hover:border-white/60" : "border-gray-300 text-[#00112E] hover:border-[#00112E]"}`}
 aria-label={`WhatsApp R-Zone about ${service.title}`}>
 WhatsApp us
 </a>
 </div>

 {/* How it works + FAQs, one tap away */}
 <details className={`group mt-10 border-t ${rule}`}>
 <summary className={`flex cursor-pointer list-none items-center justify-between py-5 text-[15px] font-semibold ${ink} [&::-webkit-details-marker]:hidden`}>
 How it works &amp; common questions
 <ChevronDown size={18} className="transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
 </summary>
 <div className="pb-2">
 <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
 {service.process.map((p, pi) => (
 <li key={p.step} className="flex items-start gap-3">
 <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#0000FF]/10 text-[12px] font-bold text-[#4D4DFF]" aria-hidden="true">{pi + 1}</span>
 <span>
 <span className={`block text-[15px] font-semibold leading-snug ${ink}`}>{p.label}</span>
 <span className={`block text-[14px] leading-snug ${body}`}>{p.detail}</span>
 </span>
 </li>
 ))}
 </ol>
 <dl className={`mt-8 divide-y ${isDark ? "divide-white/10" : "divide-gray-200"}`}>
 {service.faq.map((item, fi) => (
 <div key={fi} className="py-4">
 <dt className={`text-[15px] font-semibold ${ink}`}>{item.q}</dt>
 <dd className={`mt-1.5 text-[15px] leading-relaxed ${body}`}>{item.a}</dd>
 </div>
 ))}
 </dl>
 </div>
 </details>
 </motion.div>

 {/* Photograph */}
 <motion.div className={`relative ${flip ? "lg:order-1" : ""}`}
 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
 <div className={`relative aspect-[4/3] overflow-hidden rounded-[24px] ${isDark ? "ring-1 ring-white/10" : ""}`}>
 <Image src={service.img} alt={service.imgAlt} fill className="object-cover"
 sizes="(max-width:1024px) 100vw, 640px" loading={index === 0 ? "eager" : "lazy"}
 priority={index === 0} />
 </div>
 <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#00112E] shadow-[0_6px_24px_rgba(0,0,0,0.14)]">
 <Icon size={14} className="text-[#4D4DFF]" aria-hidden="true" />
 {service.badge}
 </span>
 </motion.div>
 </div>
 </div>
 </section>
 );
}

// ─── Stats band ───────────────────────────────────────────────────────────────
function StatsBand() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-40px" });
 return (
 <div ref={ref} className="bg-[#000f89] relative overflow-hidden"
 aria-label="R-Zone key statistics UK to Nigeria cargo company">
 <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true"
 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
 <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-10 md:py-12">
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" role="list">
 {STATS.map((stat, i) => {
 const Icon = stat.icon;
 return (
 <motion.div key={stat.label} role="listitem" className="flex items-center gap-3"
 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.5, delay: i * 0.1 }}>
 <div className="w-10 h-10 bg-white/20 flex items-center justify-center flex-shrink-0 rounded-full" aria-hidden="true">
 <Icon size={16} className="text-white" />
 </div>
 <div>
 <p className="text-white font-black text-[22px] leading-none tracking-[-0.02em]">{stat.value}</p>
 <p className="text-white/80 font-medium mt-0.5 text-[13px] font-semibold">{stat.label}</p>
 </div>
 </motion.div>
 );
 })}
 </div>
 </div>
 </div>
 );
}

// ─── Page Hero ────────────────────────────────────────────────────────────────
function PageHero() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true });

 return (
 <div ref={ref} className="relative bg-[#00112E] overflow-hidden hero-section pt-10"
 aria-labelledby="services-hero-heading">
 <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
 <div className="absolute top-0 left-1/3 w-[700px] h-[400px] bg-[#000f89]/15 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
 <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#0000FF]/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

 <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
 <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8 lg:mt-[11px]"
 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
 <Link href="/" className="text-white/80 text-[13px] font-medium hover:text-white transition-colors">Home</Link>
 <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
 <span className="text-white text-[13px] font-medium" aria-current="page">Services</span>
 </motion.nav>

 <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
 <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} className="max-w-2xl">
 <h1 id="services-hero-heading"
 className="text-white font-extrabold text-[clamp(30px,6vw,68px)] leading-[1.06] tracking-[-0.03em] mb-5">
 UK Nigeria Cargo{" "}
 <span className="relative inline-block text-[#4D4DFF]">
 Services
 <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#0000FF] rounded-full" aria-hidden="true"
 initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.55 }} />
 </span>
 <br />&amp; Logistics.
 </h1>
 <p className="text-white/70 text-[16px] sm:text-[17px] font-normal leading-[1.7] max-w-[560px]">
  Air freight, weekly sea freight, door to door delivery and customs clearance
 between the UK and Nigeria, handled by our own teams at both ends.
 </p>
 </motion.div>

 <motion.div className="flex flex-wrap lg:flex-col gap-2 lg:items-end"
 initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
 transition={{ duration: 0.6, delay: 0.3 }}>
 {SERVICES.slice(0, 4).map(s => {
 const Icon = s.icon;
 return (
 <a key={s.id} href={`#${s.id}`}
 className="inline-flex items-center gap-2 border border-white/20 bg-white/[0.04] hover:border-white/40 hover:bg-white/[0.08] text-white/80 hover:text-white text-[14px] font-semibold px-3.5 py-2 transition-all duration-200 rounded-full"
 aria-label={`Jump to ${s.title}`}>
 <Icon size={11} aria-hidden="true" />{s.nav}
 </a>
 );
 })}
 </motion.div>
 </div>
 </div>
 </div>
 );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-40px" });
 return (
 <section ref={ref} className="relative bg-[#00112E] overflow-hidden"
 aria-label="Get a free UK to Nigeria shipping quote from R-Zone">
 <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true"
 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
 <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
 style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,15,137,0.22) 0%, transparent 70%)" }} />
 <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#000f89]/40 to-transparent" aria-hidden="true" />

 <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-24 text-center">
 <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }}>
 <div className="inline-flex items-center gap-2.5 border border-[#0000FF]/28 bg-[#000f89]/12 px-4 py-1.5 rounded-full mb-6">
 <span className="w-1.5 h-1.5 rounded-full bg-[#0000FF]" aria-hidden="true" />
 <span className="text-[#4D4DFF] text-[13px] font-semibold">Start Shipping Today</span>
 </div>
 <h2 className="text-white font-extrabold text-[clamp(26px,5vw,52px)] leading-[1.06] tracking-[-0.03em] mb-5">
 Ready to Ship from the UK to{" "}<span className="text-[#4D4DFF]">Nigeria?</span>
 </h2>
 <p className="text-white/80 text-[14px] font-normal leading-relaxed max-w-xl mx-auto mb-10">
 Air freight from £5.50/kg · Sea freight from £3/kg · Weekly departures.
 Free quote in under 2 minutes our UK team responds the same day.
 </p>
 <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
 <Link href="/quote"
 className="group inline-flex items-center gap-2.5 bg-[#0000CD] hover:bg-[#000f89] text-white text-[13px] font-bold px-8 py-4 transition-all duration-200 shadow-xl shadow-[#000f89]/30 rounded-full"
 aria-label="Get a free UK to Nigeria cargo shipping quote from R-Zone">
 Get a Free Quote
 <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
 </Link>
 <a href="tel:+448007720864"
 className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[13px] font-bold px-8 py-4 transition-all duration-200 rounded-full"
 aria-label="Call R-Zone UK: +44 800 772 0864">
 <Phone size={13} aria-hidden="true" /> +44 800 772 0864
 </a>
 <a href="mailto:info@r-zoneenterprises.com"
 className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[13px] font-bold px-8 py-4 transition-all duration-200 rounded-full"
 aria-label="Email R-Zone: info@r-zoneenterprises.com">
 <MessageSquare size={13} aria-hidden="true" /> Email Us
 </a>
 </div>
 <div className="flex flex-wrap items-center justify-center gap-6">
 {["Free Quote", "No Obligation", "Same-Day Response", "UK-Based Team", "120+ Google Reviews"].map(t => (
 <span key={t} className="flex items-center gap-2 text-white/80 text-[13px] font-normal">
 <Check size={12} className="text-[#4D4DFF]" aria-hidden="true" />{t}
 </span>
 ))}
 </div>
 </motion.div>
 </div>
 </section>
 );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function ServicesPageClient() {
 const [activeId, setActiveId] = useState(SERVICES[0].id);

 useEffect(() => {
 const observers = [];
 SERVICES.forEach(s => {
 const el = document.getElementById(s.id);
 if (!el) return;
 const obs = new IntersectionObserver(
 ([entry]) => { if (entry.isIntersecting) setActiveId(s.id); },
 { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
 );
 obs.observe(el);
 observers.push(obs);
 });
 return () => observers.forEach(o => o.disconnect());
 }, []);

 return (
 <>
 {/* ItemList schema */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "ItemList",
 "name": "R-Zone Enterprises UK to Nigeria Cargo & Shipping Services",
 "description": "The UK to Nigeria cargo company with 120+ five-star Google reviews. Air freight, sea freight with weekly sailings, door-to-door cargo, importation, customs clearance and warehousing.",
 "url": "https://r-zoneenterprises.com/services",
 "numberOfItems": SERVICES.length,
 "itemListElement": SERVICES.map((s, i) => ({
 "@type": "ListItem",
 "position": i + 1,
 "item": {
 "@type": "Service",
 "name": s.title,
 "description": s.description,
 "url": `https://r-zoneenterprises.com/${s.slug}`,
 "image": s.img,
 "provider": {
 "@type": "Organization",
 "name": "R-Zone Enterprises",
 "@id": "https://r-zoneenterprises.com/#organization",
 },
 "offers": {
 "@type": "Offer",
 "priceCurrency": "GBP",
 "areaServed": ["United Kingdom", "Nigeria"],
 },
 },
 })),
 }),
 }} />

 {/* FAQPage schema all service FAQs */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "FAQPage",
 "mainEntity": SERVICES.flatMap(s =>
 s.faq.map(item => ({
 "@type": "Question",
 "name": item.q,
 "acceptedAnswer": { "@type": "Answer", "text": item.a },
 }))
 ),
 }),
 }} />

 {/* BreadcrumbList */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://r-zoneenterprises.com" },
 { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://r-zoneenterprises.com/services" },
 ],
 }),
 }} />

 <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] w-full`}>
 <PageHero />
 <StatsBand />
 <ServiceNav activeId={activeId} />
 <main id="main-content">
 {SERVICES.map((service, index) => (
 <ServiceSection key={service.id} service={service} index={index} />
 ))}
 </main>
 <FinalCTA />
 </div>
 </>
 );
}