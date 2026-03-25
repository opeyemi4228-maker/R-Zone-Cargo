"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Plane, Ship, Truck, Package, FileCheck,
  Warehouse, Anchor, ArrowRight, Check,
  ChevronRight, MapPin, Clock, Shield,
  BarChart3, Phone, MessageSquare, Star,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

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
    tagline: "Fast, reliable UK–Nigeria air cargo. 5–10 working days.",
    description:
      "Our air freight service is the fastest way to send cargo from the United Kingdom to Nigeria. Whether you're shipping personal effects, commercial merchandise, or time-sensitive goods, R-Zone Enterprises connects you to all 36 Nigerian states via a network of trusted airline partners — weekly departures from London Heathrow, Gatwick and Manchester.",
    highlights: [
      "5–10 working days transit",
      "All 36 Nigerian states covered",
      "Door collection across the UK",
      "Real-time tracking included",
      "IATA-certified cargo handling",
      "Foodstuffs & general cargo accepted",
    ],
    process: [
      { step: "01", label: "Book online, WhatsApp or call us",  detail: "Free quote in minutes — same-day response"    },
      { step: "02", label: "Drop off or request collection",    detail: "Upminster warehouse or UK-wide door pickup"    },
      { step: "03", label: "Cargo consolidated & dispatched",   detail: "Weekly air freight departures from UK"         },
      { step: "04", label: "Delivered anywhere in Nigeria",     detail: "Door delivery or Lagos warehouse pickup"       },
    ],
    accent: "#0818A8",
    dark: false,
    // Cargo aircraft being loaded
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "Cargo aircraft being loaded at UK airport for Nigeria air freight service",
    faq: [
      { q: "How long does air freight to Nigeria take?",          a: "Typically 5–10 working days from the UK to Lagos, Abuja, Port Harcourt and all major Nigerian cities. Weekly departures guarantee no long waits." },
      { q: "How much does air freight to Nigeria cost per kg?",   a: "Air freight from the UK to Nigeria starts from £5 per kg. Contact R-Zone for a free, personalised quote based on your cargo weight and dimensions." },
      { q: "What items can I send by air to Nigeria?",            a: "We accept clothing, electronics, foodstuffs, documents, personal effects and most general cargo. Contact us for a full list of accepted and prohibited items." },
    ],
  },
  {
    id: "sea-shipping-to-nigeria",
    slug: "sea-shipping-to-nigeria",
    nav: "Sea Shipping",
    icon: Ship,
    badge: "Best Value — from <£5/kg depending on the State. Check Pricing",
    badgeColor: "bg-emerald-50 text-emerald-700",
    title: "Sea Freight to Nigeria",
    tagline: "Weekly sea freight sailings. The cheapest way to ship to Nigeria.",
    description:
      "Our weekly sea freight service is the most cost-effective solution for large, heavy, or high-volume shipments from the UK to Nigeria — from just £3 per kg. Ideal for businesses and individuals moving significant quantities of goods, with fixed weekly sailings from UK ports to Apapa and Tin Can Island, Lagos.",
    highlights: [
      "Weekly fixed-schedule sailings",
      "From £3/kg — cheapest option",
      "Full container (FCL) & shared (LCL)",
      "Vehicles & machinery accepted",
      "4–6 weeks transit time",
      "Customs clearance included",
    ],
    process: [
      { step: "01", label: "Request a sea freight quote",   detail: "Volume-based pricing — from £3/kg"         },
      { step: "02", label: "Deliver to Upminster warehouse",detail: "UK-wide door collection also available"     },
      { step: "03", label: "Weekly sailing departs",        detail: "Fixed schedule, every week, UK to Lagos"   },
      { step: "04", label: "Nigeria port clearance",        detail: "Full customs handling at Apapa/Tin Can"    },
    ],
    accent: "#0437F2",
    dark: true,
    // Container ship at sea
    img: "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "Container ship carrying sea freight from UK to Nigeria — weekly sailings",
    faq: [
      { q: "How long does sea freight to Nigeria take?",              a: "Sea freight from the UK to Nigeria typically takes 4–6 weeks. Sailing is weekly — your cargo never waits more than a week to depart." },
      { q: "What is the cheapest way to ship to Nigeria from the UK?", a: "Sea freight is the cheapest option — starting from £3 per kg for consolidated (LCL) shipments. R-Zone operates weekly sailings so you get the best price without long delays." },
      { q: "Can I ship a car by sea to Nigeria?",                     a: "Yes. We specialise in vehicle shipping to Nigeria by sea. Contact us for RoRo (roll-on/roll-off) rates and the current sailing schedule." },
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
      "R-Zone's door-to-door cargo service removes all logistics complexity. We collect from your UK address, consolidate, clear customs at both ends, and deliver directly to the recipient's door anywhere in Nigeria — by air or sea, your choice. One contact, zero handoffs, both customs handled.",
    highlights: [
      "UK-wide door collection",
      "Nigeria door delivery — all 36 states",
      "Air or sea — your choice",
      "Both UK & Nigeria customs handled",
      "Personal & commercial cargo accepted",
      "SMS & email tracking updates",
    ],
    process: [
      { step: "01", label: "Book your collection",           detail: "Choose air or sea freight option"         },
      { step: "02", label: "We collect from your door",      detail: "Professional packing available on request"},
      { step: "03", label: "UK & Nigeria customs cleared",   detail: "We handle all documentation & duties"     },
      { step: "04", label: "Delivered to Nigeria address",   detail: "Any address, Lagos · Abuja · all 36 states"},
    ],
    accent: "#1F51FF",
    dark: false,
    // Delivery truck
    img: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "R-Zone door to door cargo collection service UK to Nigeria",
    faq: [
      { q: "Do you collect from anywhere in the UK?",     a: "Yes, we offer door collection across the entire UK — from London, Manchester, Birmingham, Leeds and beyond. Collection fees may apply depending on your postcode." },
      { q: "How much does door-to-door cargo to Nigeria cost?", a: "Door-to-door cargo from the UK to Nigeria starts from £6 per kg, including UK collection and Nigerian delivery. Get a free quote for your specific shipment." },
      { q: "Can you deliver to Abuja and rural Nigerian areas?",a: "Yes. We deliver door-to-door to all 36 Nigerian states including Lagos, Abuja, Port Harcourt, Kano, Enugu, Ibadan and all rural areas." },
    ],
  },
  {
    id: "importation-from-nigeria",
    slug: "importation-from-nigeria",
    nav: "Importation",
    icon: Package,
    badge: "Nigeria → UK · Weekly",
    badgeColor: "bg-purple-50 text-purple-700",
    title: "Importation from Nigeria to UK",
    tagline: "Weekly air and sea imports from Nigeria to the United Kingdom.",
    description:
      "R-Zone Enterprises operates a fully managed importation service for individuals and businesses sending goods from Nigeria to the UK. From African foodstuffs, clothing and textiles to commercial merchandise — we handle every step of the inbound logistics chain with weekly air and sea departures from Lagos.",
    highlights: [
      "Weekly air collections from Lagos",
      "Weekly sea freight from Apapa port",
      "African foodstuffs accepted",
      "Full UK customs clearance included",
      "Collection from all 36 Nigerian states",
      "Commercial & personal cargo",
    ],
    process: [
      { step: "01", label: "Enquire about your shipment",       detail: "Tell us what you're importing to the UK"   },
      { step: "02", label: "Our Lagos team collects",           detail: "Pickup from anywhere in Nigeria"           },
      { step: "03", label: "Air or sea transit to the UK",      detail: "Weekly departures from Lagos"              },
      { step: "04", label: "UK customs cleared & delivered",    detail: "Direct to your UK door or warehouse"       },
    ],
    accent: "#0818A8",
    dark: true,
    // Nigerian goods / cargo at port
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "Nigerian goods prepared for importation to UK — weekly air and sea services from Lagos",
    faq: [
      { q: "Can I import food and foodstuffs from Nigeria to the UK?", a: "Yes, we accept African foodstuffs and food products from Nigeria. Some items are subject to UK HMRC and DEFRA restrictions — contact us for the full accepted items list." },
      { q: "How do I send goods from Nigeria to the UK?",              a: "Contact our team or use our online quote form. We'll arrange collection from anywhere in Nigeria — Lagos, Abuja, Port Harcourt and all 36 states." },
      { q: "How long does importation from Nigeria to the UK take?",   a: "Air freight from Nigeria to the UK takes 5–8 working days. Sea freight takes 4–6 weeks. We operate weekly departures on both routes." },
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
    tagline: "Expert customs clearance — no delays, no surprises.",
    description:
      "Navigating UK HMRC and Nigeria Customs Service (NCS) regulations requires specialist knowledge. R-Zone's experienced customs team handles all documentation, HS code classification, duty payment, and compliance checks — so your cargo clears without delays, fines, or unexpected costs at either end.",
    highlights: [
      "UK import & export clearance (HMRC)",
      "Nigeria Customs Service (NCS) compliant",
      "Accurate HS code classification",
      "Duty & VAT calculation & payment",
      "Prohibited goods guidance",
      "Priority & urgent clearance available",
    ],
    process: [
      { step: "01", label: "Submit cargo documentation",       detail: "Commercial invoice, packing list, AWB/BOL"  },
      { step: "02", label: "HS code & duty assessment",        detail: "Accurate tariff classification every time"  },
      { step: "03", label: "Duty payment & official filing",   detail: "On your behalf — transparent costs"         },
      { step: "04", label: "Cargo released & delivered",       detail: "No delays, no surprises"                   },
    ],
    accent: "#0437F2",
    dark: false,
    // Customs / documentation
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "Customs clearance documentation — R-Zone UK and Nigeria customs service",
    faq: [
      { q: "Do I need to be present for customs clearance?",     a: "No — R-Zone acts as your authorised customs agent. We handle all HMRC and NCS filings entirely on your behalf." },
      { q: "What documents are needed for Nigeria customs?",     a: "Typically: commercial invoice, packing list, and bill of lading or air waybill. We will advise exactly what is needed based on your cargo type." },
      { q: "How do I avoid customs delays when shipping to Nigeria?", a: "Accurate documentation and correct HS codes are key. R-Zone's customs team checks everything before filing — preventing delays before they happen." },
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
      { step: "01", label: "Discuss your storage needs",    detail: "Flexible space — short or long-term"       },
      { step: "02", label: "Cargo received & inventoried",  detail: "Full digital inventory tracking"           },
      { step: "03", label: "Secure monitored storage",      detail: "24/7 CCTV, access controlled facility"    },
      { step: "04", label: "Released when you're ready",    detail: "Pick, pack & ship on demand"              },
    ],
    accent: "#1F51FF",
    dark: true,
    // Warehouse interior
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "R-Zone secure warehouse facility — Upminster Essex UK and Lagos Nigeria storage",
    faq: [
      { q: "How long can I store goods in your UK warehouse?", a: "We offer both short-term (days) and long-term (months) storage at our Upminster, Essex facility. A 3-day free storage period applies to all incoming consignments before daily charges apply." },
      { q: "Is my cargo insured while in R-Zone storage?",     a: "Yes — all goods stored in our UK and Nigeria warehouses are covered by comprehensive cargo insurance throughout their stay." },
      { q: "Can I store goods in Nigeria before delivery?",    a: "Yes. Our Lagos hub offers short and long-term storage before last-mile delivery to any of Nigeria's 36 states." },
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
      "Port stevedoring — all Nigerian ports",
      "Heavy lift & project cargo specialist",
      "Oversized & out-of-gauge (OOG) cargo",
      "IATA/IMDG dangerous goods certified",
      "Third-party independent cargo inspection",
      "NPA & Nigerian port authority compliant",
    ],
    process: [
      { step: "01", label: "Cargo specification review",    detail: "Weight, dimensions, classification"        },
      { step: "02", label: "Port & equipment planning",     detail: "Cranes, specialist handling vehicles"      },
      { step: "03", label: "Supervised port operations",    detail: "Certified handling teams on site"          },
      { step: "04", label: "Cargo cleared & onward moved",  detail: "All documentation complete & filed"        },
    ],
    accent: "#0818A8",
    dark: false,
    // Port / cargo operations
    img: "https://images.unsplash.com/photo-1468818419799-3d02e0b85c1a?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "Port cargo handling operations at Nigerian port — R-Zone specialist stevedoring",
    faq: [
      { q: "Can R-Zone handle dangerous goods at Nigerian ports?", a: "Yes. We are IATA/IMDG certified for dangerous goods. Full specialist documentation, packaging and supervised handling is provided at all major Nigerian ports." },
      { q: "Which ports in Nigeria do you operate at?",            a: "We operate at all major Nigerian ports — Apapa, Tin Can Island, Onne (Port Harcourt), and Calabar — plus West African regional ports." },
      { q: "Do you handle oversized or project cargo?",            a: "Yes. We specialise in oversized, out-of-gauge (OOG) and heavy-lift project cargo. Contact us to discuss your specific requirements." },
    ],
  },
];

const STATS = [
  { value: "12+",     label: "Years Experience",       icon: Clock   },
  { value: "50,000+", label: "Shipments Delivered",    icon: Package },
  { value: "99%",     label: "Delivery Success Rate",  icon: Shield  },
  { value: "107+",    label: "5-Star Reviews",         icon: Star    },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};

// ─── Sticky service nav ───────────────────────────────────────────────────────
function ServiceNav({ activeId }) {
  return (
    <div className="sticky top-[100px] z-20 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
        <div className="flex items-center overflow-x-auto scrollbar-none">
          {SERVICES.map(s => {
            const Icon     = s.icon;
            const isActive = activeId === s.id;
            return (
              <a key={s.id} href={`#${s.id}`} aria-label={`Navigate to ${s.title}`}
                className={`relative flex items-center gap-2 px-4 py-3.5 whitespace-nowrap text-[13px] font-semibold tracking-[0.03em] transition-colors duration-150 flex-shrink-0 border-b-2 ${isActive ? "text-[#0818A8] border-[#0818A8]" : "text-gray-800 border-transparent hover:text-[#0818A8] hover:border-gray-300"}`}>
                <Icon size={13} aria-hidden="true" />{s.nav}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Service Section ──────────────────────────────────────────────────────────
function ServiceSection({ service, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon   = service.icon;
  const isDark = service.dark;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id={service.id} ref={ref}
      className={`relative overflow-hidden scroll-mt-[148px] ${isDark ? "bg-[#00061a]" : "bg-white"}`}
      aria-labelledby={`${service.id}-heading`}
      itemScope itemType="https://schema.org/Service">

      {/* Background */}
      {isDark ? (
        <>
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
          <div className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full pointer-events-none" aria-hidden="true"
            style={{ background: `radial-gradient(circle, ${service.accent}18 0%, transparent 65%)`, transform: "translate(-20%,-20%)" }} />
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.03) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      )}

      {/* Decorative number */}
      <div className={`absolute top-10 right-8 xl:right-16 font-black pointer-events-none select-none leading-none ${isDark ? "text-white/[0.04]" : "text-[#0818A8]/[0.05]"}`}
        style={{ fontSize: "clamp(80px, 14vw, 180px)" }} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-24 lg:py-28">

        {/* ── IMAGE BANNER — full width above content ── */}
        <motion.div className="relative w-full overflow-hidden mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <div className="relative w-full aspect-[21/7] overflow-hidden">
            <motion.div className="absolute inset-0" style={{ y: imgY }}>
              <Image src={service.img} alt={service.imgAlt} fill className="object-cover"
                sizes="(max-width:1400px) 100vw, 1400px" loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0} />
              {/* Overlay */}
              <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-r from-[#00061a]/50 to-transparent" : "bg-gradient-to-r from-white/20 to-transparent"}`} aria-hidden="true" />
            </motion.div>
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: `linear-gradient(to right, ${service.accent}, #1F51FF)` }} aria-hidden="true" />
            {/* Badge overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="flex items-center gap-2.5 border backdrop-blur-md px-4 py-2.5"
                style={{ borderColor: `${service.accent}50`, backgroundColor: isDark ? "rgba(0,6,26,0.82)" : "rgba(255,255,255,0.92)" }}>
                <Icon size={14} style={{ color: service.accent }} aria-hidden="true" />
                <span className="font-black text-[12px] tracking-[0.1em] uppercase" style={{ color: service.accent }}>{service.badge}</span>
              </div>
              {/* Schema hidden */}
              <meta itemProp="name" content={service.title} />
            </div>
            {/* Stats corner */}
            <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 border backdrop-blur-md px-3.5 py-2"
              style={{ borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(0,0,0,0.55)" }}>
              <Star size={10} className="text-amber-400 fill-amber-400" aria-hidden="true" />
              <span className="text-white text-[11px] font-black tracking-[0.1em]">#1 Ranked UK–Nigeria</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* LEFT — Content */}
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${service.accent}18` }} aria-hidden="true">
                <Icon size={19} style={{ color: service.accent }} />
              </div>
              <span className={`text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full ${service.badgeColor}`}>
                {service.badge}
              </span>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.05} className="flex items-center gap-3 mb-4">
              <motion.div className="h-[2px] rounded-full" style={{ backgroundColor: service.accent }}
                initial={{ width: 0 }} animate={inView ? { width: 28 } : {}} transition={{ duration: 0.45, delay: 0.3 }} aria-hidden="true" />
              <span className={`text-[11px] font-bold tracking-[0.26em] uppercase ${isDark ? "text-white/80" : "text-gray-800"}`}>
                R-Zone UK–Nigeria Services
              </span>
            </motion.div>

            <motion.h2 id={`${service.id}-heading`} variants={fadeUp} custom={0.1}
              className={`font-black text-[clamp(22px,4vw,44px)] leading-[0.95] tracking-[-0.025em] uppercase mb-4 ${isDark ? "text-white" : "text-[#0f1923]"}`}
              itemProp="name">
              {service.title.split(" ").map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="relative inline-block" style={{ color: service.accent }}>
                    {word}
                    <motion.span className="absolute -bottom-1 left-0 h-[3px] rounded-full" style={{ backgroundColor: service.accent }}
                      aria-hidden="true" initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.5, delay: 0.6 }} />
                  </span>
                ) : (<span key={i}>{word} </span>)
              )}
            </motion.h2>

            <motion.p variants={fadeUp} custom={0.15}
              className={`text-[15px] font-semibold leading-snug mb-3 ${isDark ? "text-white/80" : "text-gray-800"}`}>
              {service.tagline}
            </motion.p>

            <motion.p variants={fadeUp} custom={0.2}
              className={`text-[13.5px] font-normal leading-relaxed mb-8 ${isDark ? "text-white/80" : "text-gray-800"}`}
              itemProp="description">
              {service.description}
            </motion.p>

            <motion.ul variants={fadeUp} custom={0.25} className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-9"
              role="list" aria-label={`${service.title} features`}>
              {service.highlights.map(h => (
                <li key={h} className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${service.accent}18`, border: `1px solid ${service.accent}35` }} aria-hidden="true">
                    <Check size={9} style={{ color: service.accent }} />
                  </span>
                  <span className={`text-[13px] font-medium ${isDark ? "text-white/80" : "text-gray-800"}`}>{h}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap gap-3">
              <Link href="/quote"
                className="group inline-flex items-center gap-2 text-[13px] font-black tracking-[0.1em] uppercase px-7 py-3.5 text-white transition-all duration-200 rounded-sm"
                style={{ backgroundColor: service.accent, boxShadow: `0 8px 24px ${service.accent}30` }}
                aria-label={`Get a free quote for ${service.title} from R-Zone Enterprises`}>
                Get a Free Quote
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
              <a href="https://wa.me/447915647119" target="_blank" rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 border rounded-sm transition-all duration-200 ${isDark ? "border-white/25 text-white hover:border-white/50" : "border-gray-300 text-gray-800 hover:border-[#0818A8] hover:text-[#0818A8]"}`}
                aria-label={`WhatsApp R-Zone about ${service.title}`}>
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — Process + FAQ */}
          <motion.div className="flex flex-col gap-8" initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}>

            {/* Process */}
            <div className={`p-6 md:p-8 border ${isDark ? "bg-white/[0.04] border-white/[0.08]" : "bg-gray-50 border-gray-200"}`}>
              <p className={`text-[11px] font-bold tracking-[0.3em] uppercase mb-6 ${isDark ? "text-white/80" : "text-gray-800"}`}>
                How It Works
              </p>
              <div className="flex flex-col gap-0">
                {service.process.map((p, pi) => (
                  <div key={p.step} className="flex items-start gap-4 relative">
                    {pi < service.process.length - 1 && (
                      <div className={`absolute left-[15px] top-[30px] w-px h-[calc(100%-14px)] ${isDark ? "bg-white/10" : "bg-gray-200"}`} aria-hidden="true" />
                    )}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-black text-[11px] tracking-[0.05em] mt-0.5"
                      style={{ backgroundColor: `${service.accent}18`, color: service.accent, border: `1.5px solid ${service.accent}30` }}
                      aria-label={`Step ${p.step}`}>
                      {p.step}
                    </div>
                    <div className="pb-5">
                      <p className={`font-bold text-[13px] leading-tight mb-0.5 ${isDark ? "text-white/80" : "text-gray-800"}`}>{p.label}</p>
                      <p className={`text-[13px] font-normal ${isDark ? "text-white/80" : "text-gray-800"}`}>{p.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className={`p-6 md:p-7 border ${isDark ? "bg-white/[0.04] border-white/[0.08]" : "bg-white border-gray-200"}`}>
              <p className={`text-[11px] font-bold tracking-[0.3em] uppercase mb-5 ${isDark ? "text-white/80" : "text-gray-800"}`}>
                Frequently Asked
              </p>
              <div className="flex flex-col gap-5">
                {service.faq.map((item, fi) => (
                  <div key={fi} className={`pb-5 ${fi < service.faq.length - 1 ? `border-b ${isDark ? "border-white/[0.08]" : "border-gray-100"}` : ""}`}
                    itemScope itemType="https://schema.org/Question">
                    <p className={`font-bold text-[13px] mb-1.5 leading-snug ${isDark ? "text-white/80" : "text-gray-800"}`} itemProp="name">{item.q}</p>
                    <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                      <p className={`text-[13px] font-normal leading-relaxed ${isDark ? "text-white/80" : "text-gray-800"}`} itemProp="text">{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`mt-5 pt-5 border-t flex items-center justify-between ${isDark ? "border-white/[0.08]" : "border-gray-100"}`}>
                <p className={`text-[13px] font-normal ${isDark ? "text-white/80" : "text-gray-800"}`}>More questions?</p>
                <a href="tel:+448007720864" className="flex items-center gap-1.5 text-[13px] font-bold transition-colors duration-200"
                  style={{ color: service.accent }} aria-label="Call R-Zone UK: +44 800 772 0864">
                  <Phone size={11} aria-hidden="true" /> +44 800 772 0864
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? "bg-white/[0.05]" : "bg-gray-100"}`} aria-hidden="true" />
    </section>
  );
}

// ─── Stats band ───────────────────────────────────────────────────────────────
function StatsBand() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="bg-[#0818A8] relative overflow-hidden"
      aria-label="R-Zone key statistics — highest-rated UK to Nigeria cargo company">
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
                <div className="w-10 h-10 bg-white/20 rounded-sm flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-[22px] leading-none tracking-[-0.02em]">{stat.value}</p>
                  <p className="text-white/80 text-[11px] font-medium tracking-[0.06em] uppercase mt-0.5">{stat.label}</p>
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
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative bg-[#00061a] overflow-hidden hero-section pt-10"
      aria-labelledby="services-hero-heading">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div className="absolute top-0 left-1/3 w-[700px] h-[400px] bg-[#0818A8]/15 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#1F51FF]/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
        <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
          <Link href="/" className="text-white/80 text-[13px] font-medium hover:text-white transition-colors">Home</Link>
          <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
          <span className="text-white text-[13px] font-medium" aria-current="page">Services</span>
        </motion.nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 border border-amber-400/35 bg-amber-400/8 px-4 py-1.5 rounded-full mb-5">
              <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-amber-400 text-[11px] font-black tracking-[0.28em] uppercase">
                #1 Ranked UK–Nigeria Cargo · 107+ Five-Star Reviews
              </span>
            </div>
            <h1 id="services-hero-heading"
              className="text-white font-black text-[clamp(30px,6vw,68px)] leading-[0.9] tracking-[-0.03em] uppercase mb-5">
              UK–Nigeria Cargo{" "}
              <span className="relative inline-block text-[#1F51FF]">
                Services
                <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full" aria-hidden="true"
                  initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.55 }} />
              </span>
              <br />&amp; Logistics.
            </h1>
            <p className="text-white/80 text-[14px] font-normal leading-relaxed">
              The{" "}
              <strong className="text-white font-semibold">highest-rated and highest-ranked UK-to-Nigeria cargo company on Google</strong>
              {" "}— air freight, weekly sea sailings, door-to-door delivery, customs clearance, warehousing and port operations.
              All managed by our own teams in the UK and Nigeria.
            </p>
          </motion.div>

          <motion.div className="flex flex-wrap lg:flex-col gap-2 lg:items-end"
            initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}>
            {SERVICES.slice(0, 4).map(s => {
              const Icon = s.icon;
              return (
                <a key={s.id} href={`#${s.id}`}
                  className="inline-flex items-center gap-2 border border-white/20 bg-white/[0.04] hover:border-white/40 hover:bg-white/[0.08] text-white/80 hover:text-white text-[11px] font-semibold tracking-[0.07em] uppercase px-3.5 py-2 transition-all duration-200"
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
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section ref={ref} className="relative bg-[#00061a] overflow-hidden"
      aria-label="Get a free UK to Nigeria shipping quote from R-Zone">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.22) 0%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }}>
          <div className="inline-flex items-center gap-2.5 border border-[#1F51FF]/28 bg-[#0818A8]/12 px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]" aria-hidden="true" />
            <span className="text-[#1F51FF] text-[11px] font-bold tracking-[0.28em] uppercase">Start Shipping Today</span>
          </div>
          <h2 className="text-white font-black text-[clamp(26px,5vw,52px)] leading-[0.92] tracking-[-0.025em] uppercase mb-5">
            Ready to Ship from the UK to{" "}<span className="text-[#1F51FF]">Nigeria?</span>
          </h2>
          <p className="text-white/80 text-[14px] font-normal leading-relaxed max-w-xl mx-auto mb-10">
            Air freight from £5/kg · Sea freight from £3/kg · Weekly departures.
            Free quote in under 2 minutes — our UK team responds the same day.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link href="/quote"
              className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.1em] uppercase px-8 py-4 rounded-sm transition-all duration-200 shadow-xl shadow-[#0818A8]/30"
              aria-label="Get a free UK to Nigeria cargo shipping quote from R-Zone">
              Get a Free Quote
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
            <a href="tel:+448007720864"
              className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[13px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-sm transition-all duration-200"
              aria-label="Call R-Zone UK: +44 800 772 0864">
              <Phone size={13} aria-hidden="true" /> +44 800 772 0864
            </a>
            <a href="mailto:info@r-zoneenterprises.com"
              className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.06] hover:bg-white/10 text-white text-[13px] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-sm transition-all duration-200"
              aria-label="Email R-Zone: info@r-zoneenterprises.com">
              <MessageSquare size={13} aria-hidden="true" /> Email Us
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["Free Quote", "No Obligation", "Same-Day Response", "UK-Based Team", "#1 on Google"].map(t => (
              <span key={t} className="flex items-center gap-2 text-white/80 text-[13px] font-normal">
                <Check size={12} className="text-[#1F51FF]" aria-hidden="true" />{t}
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
          "name": "R-Zone Enterprises — UK to Nigeria Cargo & Shipping Services",
          "description": "The highest-rated and highest-ranked UK-to-Nigeria cargo company on Google. Air freight, sea freight with weekly sailings, door-to-door cargo, importation, customs clearance and warehousing.",
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

      {/* FAQPage schema — all service FAQs */}
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
            { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://r-zoneenterprises.com" },
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