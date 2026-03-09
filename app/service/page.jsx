"use client";

import { Montserrat } from "next/font/google";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Plane, Ship, Truck, Warehouse, FileCheck, Anchor,
  ArrowRight, ChevronDown, CheckCircle, Clock, Shield,
  Globe, Award, MapPin, Phone, Mail, Package,
  Zap, BarChart3, Users, Star, TrendingUp,
  Container, Route, Layers, Lock,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "air",
    icon: Plane,
    color: "#0818A8",
    tag: "Air Freight",
    title: "Express Air Cargo",
    headline: "Speed Without Compromise.",
    tagline: "When time is the cargo.",
    description: "R-Zone's air freight network connects Nigeria and West Africa to global trade hubs across Europe, Asia, and the Americas. With priority handling, customs pre-clearance, and real-time tracking, your shipment moves at the speed of business.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85",
    stats: [
      { value: "24–72h", label: "Global Delivery" },
      { value: "50+",    label: "Destinations" },
      { value: "99.2%",  label: "On-Time Rate" },
    ],
    features: [
      { icon: Zap,        title: "Express & Priority",      desc: "Next-flight-out services for time-critical cargo across global routes." },
      { icon: Container,  title: "Charter Flights",          desc: "Full aircraft charters for oversized, urgent, or high-value shipments." },
      { icon: Layers,     title: "Consolidation (LCL Air)",  desc: "Groupage air solutions — pay only for the space your cargo occupies." },
      { icon: Lock,       title: "Secure Handling",          desc: "Tamper-evident packaging, bonded facilities, and chain-of-custody documentation." },
      { icon: Shield,     title: "Cold Chain Air",           desc: "GDP-compliant temperature-controlled air logistics for pharmaceuticals." },
      { icon: FileCheck,  title: "Pre-clearance",            desc: "Advance cargo declarations to eliminate customs delays at destination." },
    ],
    process: [
      { step: "01", title: "Booking & Documentation",  desc: "AWB generation, export permits, and dangerous goods declarations handled." },
      { step: "02", title: "Pickup & Consolidation",   desc: "Cargo collected, weighed, dimensioned, and packed for air transport." },
      { step: "03", title: "Airline Handover",         desc: "Manifested onto confirmed flight with live tracking activated." },
      { step: "04", title: "Destination Clearance",    desc: "Import customs cleared in advance — minimal dwell time." },
      { step: "05", title: "Final Delivery",           desc: "Last-mile delivery to your specified address or distribution point." },
    ],
    industries: ["Pharmaceuticals", "Electronics", "Automotive Parts", "Fashion & Retail", "Perishables", "Oil & Gas"],
  },
  {
    id: "sea",
    icon: Ship,
    color: "#0437F2",
    tag: "Sea Freight",
    title: "Ocean & Sea Freight",
    headline: "The World's Trade Lanes. Mastered.",
    tagline: "Volume. Range. Reliability.",
    description: "R-Zone operates across the world's major container shipping lanes, offering FCL, LCL, bulk, and project cargo ocean freight. Our port-to-port and door-to-door sea freight solutions cover all major global trade routes.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&q=85",
    stats: [
      { value: "FCL/LCL", label: "Container Options" },
      { value: "120+",    label: "Shipping Lanes" },
      { value: "48h",     label: "Quote Turnaround" },
    ],
    features: [
      { icon: Container,  title: "Full Container (FCL)",    desc: "20ft and 40ft container loads for large volume shipments worldwide." },
      { icon: Layers,     title: "Less Container (LCL)",    desc: "Cost-efficient groupage ocean freight — ideal for 1–15 CBM shipments." },
      { icon: BarChart3,  title: "Bulk Cargo",              desc: "Dry bulk, liquid bulk, and break-bulk commodity handling at major ports." },
      { icon: Route,      title: "RoRo Services",           desc: "Roll-on/roll-off for vehicles, machinery, and wheeled project cargo." },
      { icon: Shield,     title: "Reefer Containers",       desc: "Refrigerated container shipping for perishables and cold chain cargo." },
      { icon: Globe,      title: "Transshipment Routing",   desc: "Multi-port routing for regions without direct shipping line coverage." },
    ],
    process: [
      { step: "01", title: "Booking & Space Allocation",  desc: "Container booking confirmed with shipping line, slot secured." },
      { step: "02", title: "Cargo Receipt at Port",       desc: "Cargo received, stuffed, and sealed at origin CFS or CY." },
      { step: "03", title: "Vessel Departure",            desc: "Bill of Lading issued, vessel departs on confirmed sailing date." },
      { step: "04", title: "Port-of-Discharge Arrival",   desc: "Arrival notice issued, customs entry filed in advance." },
      { step: "05", title: "Delivery & Devanning",        desc: "Container stripped, cargo released and delivered to consignee." },
    ],
    industries: ["Manufacturing", "Construction", "Consumer Goods", "Agriculture", "Energy", "Mining"],
  },
  {
    id: "road",
    icon: Truck,
    color: "#0818A8",
    tag: "Road Transport",
    title: "Land Freight Network",
    headline: "Every Road. Every Border.",
    tagline: "Nigeria to West Africa and beyond.",
    description: "Our road freight network spans Nigeria's six geopolitical zones and extends across West African borders with full documentation support, customs brokerage, and GPS-tracked fleets operating 24/7.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=85",
    stats: [
      { value: "500+",  label: "Trucks in Network" },
      { value: "15+",   label: "Countries Covered" },
      { value: "24/7",  label: "Fleet Operations" },
    ],
    features: [
      { icon: Truck,      title: "Full Truck Load (FTL)",    desc: "Dedicated truck capacity with direct point-to-point routing." },
      { icon: Layers,     title: "Less Than Truck (LTL)",    desc: "Groupage road freight for cost-effective smaller loads." },
      { icon: Globe,      title: "Cross-Border Transport",   desc: "ECOWAS corridor expertise — Ghana, Benin, Togo, Côte d'Ivoire." },
      { icon: MapPin,     title: "Last-Mile Delivery",       desc: "Final-mile logistics to warehouses, distribution centres, and retail." },
      { icon: Zap,        title: "Dedicated Fleet",          desc: "Flat-bed, curtain-sider, refrigerated, and tanker options available." },
      { icon: Shield,     title: "GPS Tracking",             desc: "Real-time visibility on all road movements via our tracking portal." },
    ],
    process: [
      { step: "01", title: "Pickup Scheduling",       desc: "Collection time, address, and vehicle type confirmed." },
      { step: "02", title: "Loading & Manifesting",   desc: "Cargo loaded, sealed, and CMR waybill issued." },
      { step: "03", title: "In-Transit Monitoring",   desc: "GPS live tracking active — updates every 30 minutes." },
      { step: "04", title: "Border Crossing",         desc: "Cross-border documentation and transit permits handled." },
      { step: "05", title: "Proof of Delivery",       desc: "POD signed and uploaded within 2 hours of delivery." },
    ],
    industries: ["FMCG", "Construction Materials", "Retail", "Agriculture", "Banking", "Government"],
  },
  {
    id: "customs",
    icon: FileCheck,
    color: "#0437F2",
    tag: "Customs Clearance",
    title: "Import & Export Clearance",
    headline: "Zero Delays. Full Compliance.",
    tagline: "We speak the language of customs.",
    description: "R-Zone's licensed customs brokerage team manages all import and export documentation, tariff classification, duty management, and regulatory compliance across Nigerian ports and land borders.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=85",
    stats: [
      { value: "Licensed", label: "NCS Certified" },
      { value: "48h",      label: "Average Clearance" },
      { value: "100%",     label: "Compliance Rate" },
    ],
    features: [
      { icon: FileCheck,  title: "Import Declarations",     desc: "Form M, HS classification, valuation, and SGD filing at all ports." },
      { icon: Globe,      title: "Export Clearance",        desc: "NXP, export permits, and certificate of origin management." },
      { icon: BarChart3,  title: "Duty Management",         desc: "Duty drawback, deferment, and exemption processing." },
      { icon: Shield,     title: "Compliance Advisory",     desc: "Regulatory updates, restricted goods guidance, and NAFDAC clearance." },
      { icon: Lock,       title: "Bonded Warehousing",      desc: "Goods held under Customs bond pending duty payment or re-export." },
      { icon: Users,      title: "Scanning & Examination",  desc: "We manage NCS, SGS, and NAFDAC examination and release." },
    ],
    process: [
      { step: "01", title: "Document Collection",    desc: "BL, Invoice, Packing List, Form M, and supporting docs collated." },
      { step: "02", title: "Pre-Arrival Processing", desc: "HS code confirmed, duties calculated, SGD filed pre-arrival." },
      { step: "03", title: "Examination & Scanning", desc: "Physical or scanner examination coordinated with NCS officers." },
      { step: "04", title: "Duty Payment",           desc: "Duties assessed and paid — release order obtained." },
      { step: "05", title: "Delivery Order & Exit",  desc: "Exit note issued, cargo released and handed to transport team." },
    ],
    industries: ["Import/Export", "Manufacturing", "Oil & Gas", "Pharmaceuticals", "Electronics", "Food & Beverage"],
  },
  {
    id: "warehouse",
    icon: Warehouse,
    color: "#0818A8",
    tag: "Warehousing",
    title: "Storage & Distribution",
    headline: "Your Cargo. In Safe Hands.",
    tagline: "Secure. Bonded. Smart.",
    description: "R-Zone operates bonded and free-zone warehousing facilities across Lagos, Abuja, and Port Harcourt — with real-time WMS integration, 24/7 security, and distribution services to any point in Nigeria.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=85",
    stats: [
      { value: "50,000m²", label: "Total Storage" },
      { value: "3",        label: "Locations" },
      { value: "24/7",     label: "Monitored" },
    ],
    features: [
      { icon: Warehouse,  title: "Bonded Storage",          desc: "NCS-bonded warehouses for goods pending customs clearance." },
      { icon: Shield,     title: "Cold Storage",            desc: "Temperature-controlled facilities for pharma, food, and chemicals." },
      { icon: BarChart3,  title: "WMS Integration",         desc: "Real-time inventory tracking via our web-based Warehouse Management System." },
      { icon: Route,      title: "Distribution Services",   desc: "Pick-and-pack, kitting, cross-docking, and last-mile dispatch." },
      { icon: Lock,       title: "24/7 Security",           desc: "CCTV, biometric access, on-site security, and fire suppression." },
      { icon: Zap,        title: "Same-Day Dispatch",       desc: "Orders placed before 12pm dispatched same business day." },
    ],
    process: [
      { step: "01", title: "Inbound Receipt",        desc: "Cargo received, inspected, counted, and labelled on arrival." },
      { step: "02", title: "Putaway & Slotting",     desc: "Goods assigned to optimised storage locations in WMS." },
      { step: "03", title: "Stock Management",       desc: "Real-time inventory visibility via client portal — 24/7 access." },
      { step: "04", title: "Order Fulfilment",       desc: "Pick, pack, and despatch executed against purchase orders." },
      { step: "05", title: "Reporting & Audits",     desc: "Monthly stock reconciliation reports and annual physical count." },
    ],
    industries: ["E-commerce", "Retail", "Pharmaceuticals", "FMCG", "Electronics", "Manufacturing"],
  },
  {
    id: "cargo",
    icon: Anchor,
    color: "#0437F2",
    tag: "Cargo Handling",
    title: "Port & Terminal Handling",
    headline: "Stevedoring Excellence.",
    tagline: "From vessel to destination.",
    description: "Specialist port and terminal operations at Apapa, Tin Can, and Onne ports. R-Zone's cargo handling team manages container operations, heavy lift, break-bulk, and project cargo for Nigeria's most complex port moves.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
    stats: [
      { value: "3",     label: "Major Ports" },
      { value: "OOG",   label: "Certified Heavy Lift" },
      { value: "IMDG",  label: "DG Certified" },
    ],
    features: [
      { icon: Anchor,     title: "Stevedoring",             desc: "Ship loading/discharge operations with certified stevedore gangs." },
      { icon: Container,  title: "Container Operations",    desc: "FCL and LCL container stuffing, stripping, and weighing." },
      { icon: Layers,     title: "Break-Bulk Handling",     desc: "Bagged, palletised, and loose cargo receipt, storage, and dispatch." },
      { icon: TrendingUp, title: "Heavy Lift & OOG",        desc: "Out-of-gauge and oversized lifts up to 500 tonnes with specialist equipment." },
      { icon: Shield,     title: "Dangerous Goods (IMDG)", desc: "Certified handling and segregation of hazardous materials." },
      { icon: BarChart3,  title: "Pre-delivery Inspection", desc: "Independent cargo inspection and tallying before final release." },
    ],
    process: [
      { step: "01", title: "Pre-arrival Planning",   desc: "Vessel schedule, berth allocation, and equipment pre-positioned." },
      { step: "02", title: "Vessel Arrival",         desc: "Hatches opened, gang deployed, tallying commenced." },
      { step: "03", title: "Discharge Operations",   desc: "Cargo discharged to quay or direct to transport." },
      { step: "04", title: "Cargo Inspection",       desc: "Independent tally and condition survey completed." },
      { step: "05", title: "Storage or Dispatch",    desc: "Cargo stored in port CFS or loaded directly for inland delivery." },
    ],
    industries: ["Oil & Gas", "Mining", "Construction", "Power Generation", "Marine", "Defence"],
  },
];

const TESTIMONIALS = [
  { name: "Emeka Okafor",   company: "Dangote Industries",      text: "R-Zone's air freight team reduced our import cycle from 7 days to 36 hours. Transformational.",     avatar: "EO", service: "Air Freight" },
  { name: "Fatima Al-Hassan", company: "TotalEnergies Nigeria", text: "Their port handling expertise at Onne is unmatched. Complex lifts executed with zero incidents.",      avatar: "FA", service: "Cargo Handling" },
  { name: "Chidi Nwosu",    company: "Lagos Export Group",      text: "The customs clearance team cleared 14 containers in 48 hours. It usually takes us 2 weeks.",           avatar: "CN", service: "Customs Clearance" },
];

const STATS = [
  { value: "15+",    label: "Years Experience",   icon: Award },
  { value: "50+",    label: "Global Destinations", icon: Globe },
  { value: "10,000+",label: "Shipments Delivered", icon: Package },
  { value: "98%",    label: "On-Time Delivery",    icon: Clock },
  { value: "500+",   label: "Active Clients",      icon: Users },
  { value: "24/7",   label: "Operations Centre",   icon: Shield },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTag({ children }) {
  return (
    <div className="inline-flex items-center gap-2 border border-[#0818A8]/20 bg-[#0818A8]/5 px-4 py-1.5 rounded-full mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8]" />
      <span className="text-[#0818A8] text-[10px] font-semibold tracking-[0.22em] uppercase">{children}</span>
    </div>
  );
}

function SectionHeadline({ children, accent, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <h2
      ref={ref}
      className="text-gray-900 font-black text-[clamp(26px,4.5vw,52px)] leading-tight tracking-[-0.02em] mb-4"
    >
      {children}{" "}
      {accent && (
        <span className="relative inline-block text-[#0818A8]">
          {accent}
          <motion.span
            className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        </span>
      )}
      {suffix}
    </h2>
  );
}

// ─── Service Nav Tabs ─────────────────────────────────────────────────────────

function ServiceTabs({ activeId, onChange }) {
  return (
    <div className="sticky top-[104px] z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
        <div className="flex overflow-x-auto scrollbar-none">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const active = activeId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onChange(s.id)}
                className={`relative flex items-center gap-2 px-5 py-4 whitespace-nowrap text-[13px] transition-colors duration-200 flex-shrink-0 ${
                  active
                    ? "text-[#0818A8] font-semibold"
                    : "text-gray-500 hover:text-gray-800 font-normal"
                }`}
              >
                <Icon size={14} strokeWidth={1.75} className={active ? "text-[#0818A8]" : "text-gray-400"} />
                {s.tag}
                {active && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0818A8]"
                    layoutId="service-tab"
                    transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Service Detail Panel ─────────────────────────────────────────────────────

function ServicePanel({ service }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openFaq, setOpenFaq] = useState(null);
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      key={service.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >

      {/* ── HERO BAND ── */}
      <div className="relative overflow-hidden bg-[#00061a] mb-0">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00061a]/98 via-[#00061a]/75 to-[#00061a]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00061a]/80 to-transparent" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
          >
            {/* Tag */}
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <div className="inline-flex items-center gap-2 border border-white/15 bg-white/8 backdrop-blur-sm px-3.5 py-1.5 rounded-full">
                <Icon size={12} className="text-[#1F51FF]" />
                <span className="text-white/60 text-[10px] font-semibold tracking-[0.22em] uppercase">{service.tag}</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={fadeUp} custom={0.05} className="text-[#1F51FF] text-[11px] font-semibold tracking-[0.18em] uppercase mb-2">
              {service.tagline}
            </motion.p>

            {/* Headline */}
            <motion.h1 variants={fadeUp} custom={0.1} className="text-white font-black text-[clamp(28px,5vw,60px)] leading-tight tracking-[-0.02em] mb-4 max-w-2xl">
              {service.headline}
            </motion.h1>

            {/* Description */}
            <motion.p variants={fadeUp} custom={0.2} className="text-white/55 text-[14px] font-light leading-relaxed max-w-xl mb-8">
              {service.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap gap-3 mb-10">
              <Link href="/quote" className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3 transition-colors duration-200 shadow-lg shadow-[#0818A8]/30">
                Get a Quote
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link href="/contact" className="group inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200 hover:bg-white/8">
                Speak to an Expert
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} custom={0.4} className="flex flex-wrap gap-8">
              {service.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-white font-black text-[clamp(20px,2.5vw,30px)] leading-none tracking-tight">{stat.value}</span>
                  <span className="text-white/40 text-[10.5px] font-medium tracking-[0.12em] uppercase mt-1">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/60 to-transparent" />
      </div>

      {/* ── FEATURES GRID ── */}
      <div className="bg-white py-16 md:py-20 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionTag>What's Included</SectionTag>
            <SectionHeadline accent="Capabilities" suffix=".">Full Service</SectionHeadline>
            <p className="text-gray-500 text-[13px] font-light tracking-[0.02em] max-w-lg">
              Every aspect of your {service.tag.toLowerCase()} operation covered under one roof.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.features.map((f, i) => {
              const FIcon = f.icon;
              return (
                <motion.div
                  key={i}
                  className="group flex gap-4 p-5 border border-gray-100 hover:border-[#0818A8]/25 hover:shadow-md hover:shadow-[#0818A8]/6 bg-white transition-all duration-300 rounded-sm"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                >
                  <div className="w-10 h-10 bg-[#0818A8]/8 border border-[#0818A8]/15 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-[#0818A8] group-hover:border-[#0818A8] transition-all duration-300">
                    <FIcon size={16} className="text-[#0818A8] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-black text-[13.5px] mb-1 tracking-[-0.01em] group-hover:text-[#0818A8] transition-colors duration-200">
                      {f.title}
                    </h3>
                    <p className="text-gray-500 text-[12px] font-light leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── PROCESS STEPS ── */}
      <div className="bg-[#f0f4ff] py-16 md:py-20 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center"><SectionTag>How It Works</SectionTag></div>
            <SectionHeadline accent="Process" suffix=" — Step by Step.">Our</SectionHeadline>
            <p className="text-gray-500 text-[13px] font-light max-w-md mx-auto">
              Transparent, structured, and accountable — from booking to delivery.
            </p>
          </motion.div>

          {/* Steps — horizontal timeline */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-9 left-[calc(10%)] right-[calc(10%)] h-px bg-[#0818A8]/15 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {service.process.map((step, i) => (
                <motion.div
                  key={i}
                  className="relative z-10 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  {/* Step circle */}
                  <div className="w-[72px] h-[72px] bg-white border-2 border-[#0818A8]/20 rounded-full flex flex-col items-center justify-center mb-4 shadow-sm group-hover:border-[#0818A8]">
                    <span className="text-[#0818A8]/30 text-[9px] font-black tracking-[0.12em] uppercase leading-none">{step.step}</span>
                    <span className="text-[#0818A8] font-black text-[18px] leading-none">{i + 1}</span>
                  </div>
                  <h3 className="text-gray-900 font-black text-[13px] tracking-[-0.01em] mb-1.5 leading-snug">{step.title}</h3>
                  <p className="text-gray-500 text-[11.5px] font-light leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── INDUSTRIES SERVED + CTA SPLIT ── */}
      <div className="bg-white py-16 md:py-20 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Industries */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <SectionTag>Industries Served</SectionTag>
              <SectionHeadline accent="Industries" suffix=" We Serve.">Key</SectionHeadline>
              <p className="text-gray-500 text-[13px] font-light leading-relaxed mb-7">
                Our {service.tag.toLowerCase()} solutions are trusted across Nigeria's most demanding industries — each with its own cargo requirements, compliance standards, and delivery SLAs.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {service.industries.map((ind, i) => (
                  <motion.span
                    key={i}
                    className="inline-flex items-center gap-1.5 border border-[#0818A8]/20 bg-[#0818A8]/5 text-[#0818A8] text-[12px] font-semibold px-4 py-2 rounded-full tracking-[0.02em]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <CheckCircle size={11} />
                    {ind}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              className="bg-[#0818A8] p-8 md:p-10 relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/15 rounded flex items-center justify-center mb-5">
                  <Icon size={22} className="text-white" strokeWidth={1.75} />
                </div>
                <p className="text-white/60 text-[10px] font-bold tracking-[0.22em] uppercase mb-2">Ready to Ship?</p>
                <h3 className="text-white font-black text-[clamp(18px,2.5vw,28px)] tracking-[-0.01em] leading-tight mb-3">
                  Get a tailored {service.tag} quote in 4 hours.
                </h3>
                <p className="text-white/60 text-[12.5px] font-light leading-relaxed mb-6">
                  Tell us your cargo details and our logistics specialists will respond with a fully itemised quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/quote" className="group inline-flex items-center justify-center gap-2 bg-white text-[#0818A8] hover:bg-gray-100 text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-colors duration-200">
                    Request Quote
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200">
                    <Phone size={12} />
                    Call Us
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [activeService, setActiveService] = useState("air");
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-60px" });

  const currentService = SERVICES.find((s) => s.id === activeService);

  const scrollToTabs = (id) => {
    setActiveService(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={`${montserrat.className} bg-white`}>

      {/* ══ PAGE HERO ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative bg-[#00061a] overflow-hidden pt-[104px] pb-16 md:pb-20"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80"
            alt=""
            aria-hidden
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00061a]/98 via-[#00061a]/85 to-[#00061a]/60" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }}
          />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#0818A8]/12 blur-3xl rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-1.5 rounded-full">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white/55 text-[10px] font-semibold tracking-[0.22em] uppercase">Full Service Logistics</span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="text-white font-black text-[clamp(32px,6vw,72px)] leading-tight tracking-[-0.02em] mb-4 max-w-3xl"
            >
              Every service your{" "}
              <span className="relative inline-block">
                cargo needs
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                />
              </span>
              .
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-white/50 text-[14px] font-light leading-relaxed max-w-xl mb-8"
            >
              Air freight, sea freight, road transport, customs clearance,
              warehousing, and cargo handling — all under one roof, with one
              point of contact and global operational reach.
            </motion.p>

            {/* Service quick-links */}
            <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap gap-2.5">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                const active = activeService === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToTabs(s.id)}
                    className={`inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.04em] px-4 py-2 border transition-all duration-200 ${
                      active
                        ? "bg-[#0818A8] border-[#0818A8] text-white shadow-lg shadow-[#0818A8]/25"
                        : "border-white/20 text-white/60 hover:border-white/45 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    <Icon size={12} strokeWidth={1.75} />
                    {s.tag}
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ SERVICE TABS ════════════════════════════════════════════════════ */}
      <ServiceTabs activeId={activeService} onChange={setActiveService} />

      {/* ══ SERVICE PANELS ══════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {currentService && <ServicePanel key={activeService} service={currentService} />}
      </AnimatePresence>

      {/* ══ GLOBAL STATS BAND ═══════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        className="bg-[#0818A8] py-14 md:py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center"
                  variants={fadeUp}
                  custom={i * 0.06}
                >
                  <div className="w-10 h-10 bg-white/12 rounded flex items-center justify-center mb-3">
                    <Icon size={16} className="text-white" />
                  </div>
                  <span className="text-white font-black text-[clamp(20px,2.5vw,32px)] leading-none tracking-tight mb-1">{stat.value}</span>
                  <span className="text-white/50 text-[10.5px] font-medium tracking-[0.12em] uppercase">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════════════════════ */}
      <section ref={testimonialsRef} className="bg-white py-16 md:py-20 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center"><SectionTag>Client Feedback</SectionTag></div>
            <SectionHeadline accent="Our Clients" suffix=" Say.">What</SectionHeadline>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                className="flex flex-col justify-between p-6 border border-gray-200 hover:border-[#0818A8]/30 hover:shadow-lg hover:shadow-[#0818A8]/6 bg-white transition-all duration-300 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -3 }}
              >
                <div>
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={11} className="fill-[#0818A8] text-[#0818A8]" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-[13px] font-light leading-relaxed mb-5">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 bg-[#0818A8] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[11px] font-black">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-[12.5px]">{t.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-400 text-[11px]">{t.company}</p>
                      <span className="text-gray-200">·</span>
                      <span className="text-[#0818A8] text-[10px] font-semibold">{t.service}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══════════════════════════════════════════════════════ */}
      <section className="bg-[#f0f4ff] py-14 md:py-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#0818A8] text-[10px] font-bold tracking-[0.22em] uppercase mb-2">Start Shipping Today</p>
            <h2 className="text-gray-900 font-black text-[clamp(20px,3.5vw,36px)] tracking-[-0.02em] leading-tight">
              Ready to move your cargo?<br />
              <span className="text-[#0818A8]">We're ready when you are.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link href="/quote" className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 transition-colors duration-200 shadow-lg shadow-[#0818A8]/20">
              Request a Quote
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-2 border border-[#0818A8] text-[#0818A8] hover:bg-[#0818A8] hover:text-white text-[12px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-200">
              <Phone size={13} />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}