"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Plane, Ship, Truck, Package, ShoppingBag, User } from "lucide-react";
import { motion, useInView } from "framer-motion";
import FeaturedProduct from "@/components/FeaturedProduct";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const SERVICE_CARDS = [
  {
    id: "01", icon: Plane,
    title: "Air Freight to Nigeria",
    href: "/air-freight",
    description: "Fast air cargo from the UK to Lagos, Abuja and all 36 Nigerian states. 5–10 working days. Door collection available.",
    tag: "Fastest", tagColor: "bg-[#0818A8]/10 text-[#0818A8]", accentColor: "#0818A8",
    highlights: ["5–10 working days", "All 36 states", "Door collection"],
  },
  {
    id: "02", icon: Ship,
    title: "Sea Freight to Nigeria",
    href: "/sea-shipping-to-nigeria",
    description: "Weekly consolidated sea freight from UK ports to Lagos. Best value for bulk, heavy or high-volume cargo. From £3/kg.",
    tag: "Best Value", tagColor: "bg-emerald-50 text-emerald-700", accentColor: "#0437F2",
    highlights: ["Weekly sailings", "From £3/kg", "4–6 weeks transit"],
  },
  {
    id: "03", icon: Truck,
    title: "Door to Door Cargo",
    href: "/door-to-door-cargo",
    description: "We collect from your UK address and deliver to any Nigerian address — air or sea, both customs handled.",
    tag: "Most Popular", tagColor: "bg-amber-50 text-amber-700", accentColor: "#1F51FF",
    highlights: ["UK-wide collection", "Any Nigerian address", "Both customs handled"],
  },
  {
    id: "04", icon: ShoppingBag,
    title: "E-commerce Fulfilment",
    href: "/services",
    description: "End-to-end fulfilment for online retailers shipping between the UK and Nigeria. Customs, last-mile, and returns handled.",
    tag: "For Retailers", tagColor: "bg-purple-50 text-purple-700", accentColor: "#0818A8",
    highlights: ["Last-mile delivery", "Customs included", "Returns handling"],
  },
  {
    id: "05", icon: Package,
    title: "Commercial Cargo",
    href: "/services",
    description: "Full freight for businesses — vehicles, machinery, industrial equipment and high-volume merchandise to Nigeria.",
    tag: "B2B", tagColor: "bg-slate-100 text-slate-700", accentColor: "#0437F2",
    highlights: ["Vehicles & machinery", "High-volume rates", "Nigeria & Africa"],
  },
  {
    id: "06", icon: User,
    title: "Personal Cargo Shipping",
    href: "/door-to-door-cargo",
    description: "Send household goods, food, clothing and personal effects to family in Nigeria. African foodstuffs accepted.",
    tag: "Personal", tagColor: "bg-rose-50 text-rose-700", accentColor: "#1F51FF",
    highlights: ["Foodstuffs accepted", "Weekly air", "Family parcels"],
  },
];

const LIST_SERVICES = [
  { id: "01", title: "Air Freight to Nigeria",      subtitle: "Weekly departures · 5–10 working days",                href: "/air-freight"              },
  { id: "02", title: "Sea Freight to Nigeria",      subtitle: "Weekly sailings · from £3/kg · 4–6 weeks",            href: "/sea-shipping-to-nigeria"  },
  { id: "03", title: "Door to Door Delivery",       subtitle: "UK collection to any Nigerian address",                href: "/door-to-door-cargo"       },
  { id: "04", title: "Customs Clearance",           subtitle: "UK & Nigeria — fully managed, zero stress",           href: "/services#customs-clearance"},
  { id: "05", title: "Importation from Nigeria",    subtitle: "Weekly air & sea · Nigeria to UK",                    href: "/importation-from-nigeria" },
  { id: "06", title: "Car & Vehicle Shipping",      subtitle: "Specialist vehicle transport to Nigeria & Africa",    href: "/prices"                   },
];

const ArrowDiag = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

function SectionHeader({ eyebrow, title, accentWord, subtitle, cta }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14 md:mb-16">
      <motion.div initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
        <div className="flex items-center gap-3 mb-5">
          <motion.span className="block h-[2px] bg-[#0818A8] rounded-full"
            initial={{ width: 0 }} animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }} aria-hidden="true" />
          <span className="text-[13px] font-bold tracking-[0.32em] uppercase text-[#0818A8]">{eyebrow}</span>
        </div>
        <h2 className="font-black text-[#0f1923] leading-[0.95] tracking-[-0.025em] uppercase"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
          {title}{" "}
          <span className="relative inline-block text-[#0818A8]">
            {accentWord}
            <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full"
              aria-hidden="true" initial={{ width: 0 }}
              animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.5, delay: 0.55 }} />
          </span>
        </h2>
        {subtitle && (
          <p className="mt-4 text-gray-800 text-[15px] font-normal leading-relaxed max-w-lg">{subtitle}</p>
        )}
      </motion.div>
      {cta && (
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }} className="self-start sm:self-end">
          <Link href={cta.href} aria-label={cta.ariaLabel}
            className="group inline-flex items-center gap-3 text-[13px] tracking-[0.28em] uppercase font-bold text-[#0818A8] hover:text-[#0437F2] transition-colors duration-300">
            {cta.label}
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-[#0818A8]/30 group-hover:bg-[#0818A8] group-hover:border-[#0818A8] transition-all duration-300">
              <ArrowDiag className="w-4 h-4 text-[#0818A8] group-hover:text-white transition-colors duration-300" />
            </span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon   = service.icon;
  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      itemScope itemType="https://schema.org/Service" className="relative group">
      <Link href={service.href}
        aria-label={`${service.title} — UK to Nigeria cargo service from R-Zone Enterprises`}
        title={`${service.title} — R-Zone Enterprises`}
        className="flex flex-col h-full bg-white border border-gray-200/80 hover:border-[#0818A8]/30 hover:shadow-xl hover:shadow-[#0818A8]/7 transition-all duration-300 overflow-hidden rounded-sm">
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] origin-left transition-transform duration-500"
          style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }} aria-hidden="true" />
        <div className="p-6 md:p-7 flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold tracking-[0.2em] text-gray-800 uppercase">{service.id}</span>
            <span className={`text-[11px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full ${service.tagColor}`}>{service.tag}</span>
          </div>
          <div className="w-12 h-12 rounded-sm flex items-center justify-center transition-all duration-300 flex-shrink-0"
            style={{ backgroundColor: hovered ? service.accentColor : `${service.accentColor}12` }} aria-hidden="true">
            <Icon size={20} className="transition-colors duration-300" style={{ color: hovered ? "#ffffff" : service.accentColor }} />
          </div>
          <h3 className="font-black text-[#0f1923] leading-tight tracking-[-0.015em] uppercase transition-colors duration-300 group-hover:text-[#0818A8]"
            style={{ fontSize: "clamp(14px, 1.4vw, 16px)" }} itemProp="name">
            {service.title}
          </h3>
          <p className="text-gray-800 text-[14px] font-normal leading-relaxed flex-1" itemProp="description">
            {service.description}
          </p>
          <ul className="flex flex-wrap gap-1.5" aria-label={`${service.title} highlights`}>
            {service.highlights.map(h => (
              <li key={h} className="text-[11px] font-medium text-gray-800 border border-gray-200 px-2.5 py-0.5 rounded-full">{h}</li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <span className="text-[13px] font-black tracking-[0.1em] uppercase transition-colors duration-200"
              style={{ color: hovered ? service.accentColor : "#374151" }}>Learn More</span>
            <motion.div animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }} transition={{ duration: 0.2 }}
              className="w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
              style={{ borderColor: hovered ? service.accentColor : "#d1d5db", backgroundColor: hovered ? service.accentColor : "transparent" }}
              aria-hidden="true">
              <ArrowDiag className="w-3 h-3 transition-colors duration-300" style={{ color: hovered ? "#ffffff" : "#374151" }} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function ServiceRow({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      itemScope itemType="https://schema.org/Service">
      <Link href={service.href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        aria-label={`${service.title} — ${service.subtitle}`}
        title={`${service.title} — R-Zone Enterprises UK to Nigeria`}
        className="relative flex items-center w-full py-6 md:py-7 border-b border-black/[0.06] overflow-hidden group">
        <span className="pointer-events-none absolute inset-0 bg-[#0818A8] origin-left"
          style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.52s cubic-bezier(0.76, 0, 0.24, 1)" }}
          aria-hidden="true" />
        <span className="relative z-10 w-10 md:w-14 shrink-0 font-bold text-[13px] tracking-[0.22em] transition-colors duration-200"
          style={{ color: hovered ? "rgba(255,255,255,0.80)" : "rgba(0,0,0,0.70)" }}>
          {service.id}
        </span>
        <div className="relative z-10 flex-1 min-w-0 px-4 md:px-8">
          <span className="block font-black leading-tight tracking-[-0.02em] uppercase transition-colors duration-200"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.65rem)", color: hovered ? "#ffffff" : "#0f1923" }}
            itemProp="name">
            {service.title}
          </span>
          <span className="block text-[13px] md:text-[14px] font-normal mt-1 transition-colors duration-200"
            style={{ color: hovered ? "rgba(255,255,255,0.80)" : "rgba(0,0,0,0.70)" }}
            itemProp="description">
            {service.subtitle}
          </span>
        </div>
        <span className="relative z-10 shrink-0 flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full border transition-all duration-300"
          style={{ borderColor: hovered ? "rgba(255,255,255,0.40)" : "rgba(8,24,168,0.30)", color: hovered ? "#ffffff" : "#0818A8", transform: hovered ? "rotate(0deg)" : "rotate(-45deg)" }}
          aria-hidden="true">
          <ArrowDiag className="w-4 h-4" />
        </span>
      </Link>
    </motion.div>
  );
}

export default function OurServices() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "R-Zone Enterprises — UK to Nigeria Cargo & Shipping Services",
          "description": "The highest-rated and highest-ranked UK-to-Nigeria cargo company on Google. Air freight, sea freight with weekly sailings, door-to-door delivery, customs clearance and importation from Nigeria.",
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
        className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] relative w-full bg-white overflow-hidden`}
        aria-labelledby="services-heading"
        itemScope itemType="https://schema.org/ItemList"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.038) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full" aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(8,24,168,0.06) 0%, transparent 65%)", transform: "translate(30%, -30%)" }} />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full" aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(31,81,255,0.05) 0%, transparent 65%)", transform: "translate(-30%, 30%)" }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">

          {/* ── CARD GRID ── */}
          <div className="py-20 md:py-28 lg:py-32">
            <SectionHeader
              eyebrow="UK–Nigeria Cargo Services"
              title="Shipping Services"
              accentWord="That Deliver"
              subtitle="Air freight, sea freight with weekly sailings, and door-to-door cargo — from the UK's #1 ranked Nigeria cargo company, operating since 2012."
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

          <div className="border-t border-black/[0.06]" aria-hidden="true" />
        </div>

        <FeaturedProduct />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">

          {/* ── LIST ROWS ── */}
          <div className="py-20 md:py-28 lg:py-32">
            <SectionHeader
              eyebrow="Every Route We Cover"
              title="Our Shipping"
              accentWord="Routes"
              subtitle="Every UK–Nigeria route handled in-house — air, sea and road — by our Essex and Lagos teams."
            />
            <div className="border-t border-black/[0.06]" aria-hidden="true" />
            <div role="list" aria-label="R-Zone UK to Nigeria shipping routes">
              {LIST_SERVICES.map((service, index) => (
                <div key={service.id} role="listitem">
                  <ServiceRow service={service} index={index} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}