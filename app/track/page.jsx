"use client";

import { Montserrat } from "next/font/google";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Search, Package, MapPin, Clock, CheckCircle,
  Circle, Truck, Plane, Ship, Warehouse,
  ArrowRight, Phone, Mail, AlertCircle,
  ChevronDown, RefreshCw, Download, Share2,
  Navigation, Calendar, Weight, FileText,
  Shield, Globe, Zap, BarChart3,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_SHIPMENTS = {
  "RZC-2024-00847": {
    id: "RZC-2024-00847",
    status: "in_transit",
    statusLabel: "In Transit",
    service: "Air Freight",
    serviceIcon: Plane,
    origin: { city: "Lagos", country: "Nigeria", code: "LOS", port: "Murtala Muhammed Airport" },
    destination: { city: "London", country: "United Kingdom", code: "LHR", port: "Heathrow Airport" },
    shipper: "R-Zone Enterprises Ltd",
    consignee: "Acme Global Imports UK",
    pieces: 14,
    weight: "842 kg",
    volume: "3.2 CBM",
    description: "Electronic Components — Non-Hazardous",
    mawb: "MS-0847-2024-LOS",
    eta: "Mar 07, 2026",
    bookedDate: "Mar 01, 2026",
    progress: 65,
    currentLocation: "Dubai International Airport, UAE",
    nextMilestone: "Arrival at London Heathrow",
    events: [
      { date: "Mar 01, 2026", time: "09:14", status: "done",   title: "Shipment Booked",             location: "Lagos, Nigeria",            detail: "Booking confirmed. AWB generated: MS-0847-2024-LOS" },
      { date: "Mar 02, 2026", time: "11:30", status: "done",   title: "Cargo Picked Up",              location: "Ikeja, Lagos",              detail: "Cargo collected from shipper premises. 14 pieces, 842kg verified." },
      { date: "Mar 02, 2026", time: "18:45", status: "done",   title: "Accepted at Origin",           location: "Lagos Airport Cargo, LOS",  detail: "Cargo accepted at airline cargo terminal. Security screening passed." },
      { date: "Mar 03, 2026", time: "08:20", status: "done",   title: "Departed Origin",              location: "Lagos — Flight MS447",       detail: "Cargo departed Lagos on connecting flight MS447." },
      { date: "Mar 03, 2026", time: "23:55", status: "done",   title: "Arrived Transit Hub",          location: "Dubai, UAE — DXB",          detail: "Cargo arrived at Dubai transit facility. Held for connecting flight." },
      { date: "Mar 04, 2026", time: "14:20", status: "active", title: "In Transit — Dubai Hub",       location: "Dubai International, UAE",  detail: "Cargo processing at transit hub. On schedule for connecting flight to London." },
      { date: "Mar 06, 2026", time: "06:00", status: "pending",title: "Departs for Destination",      location: "Dubai — Flight EK003",       detail: "Scheduled departure on EK003 to London Heathrow." },
      { date: "Mar 07, 2026", time: "07:30", status: "pending", title: "Arrives London Heathrow",      location: "London, UK — LHR",          detail: "Estimated arrival. Customs pre-clearance filed." },
      { date: "Mar 07, 2026", time: "14:00", status: "pending", title: "Customs Clearance",            location: "HMRC — Heathrow",           detail: "UK import clearance. Duties pre-paid via DDP incoterm." },
      { date: "Mar 07, 2026", time: "18:00", status: "pending", title: "Out for Delivery",             location: "London, UK",                detail: "Last-mile delivery to consignee address." },
    ],
  },
  "RZC-2024-00612": {
    id: "RZC-2024-00612",
    status: "delivered",
    statusLabel: "Delivered",
    service: "Sea Freight",
    serviceIcon: Ship,
    origin: { city: "Shanghai", country: "China", code: "SHA", port: "Port of Shanghai" },
    destination: { city: "Lagos", country: "Nigeria", code: "LOS", port: "Apapa Port" },
    shipper: "Sino Export Holdings",
    consignee: "Lagos Wholesale Group",
    pieces: 1,
    weight: "18,500 kg",
    volume: "26.5 CBM",
    description: "Industrial Machinery — FCL 20ft",
    mawb: "BL-0612-2024-SHA",
    eta: "Feb 28, 2026",
    bookedDate: "Jan 15, 2026",
    progress: 100,
    currentLocation: "Delivered — Apapa, Lagos",
    nextMilestone: "Shipment Complete",
    events: [
      { date: "Jan 15, 2026", time: "10:00", status: "done",   title: "Booking Confirmed",         location: "Shanghai, China",         detail: "FCL booking confirmed. Container allocated: TCKU3456781." },
      { date: "Jan 22, 2026", time: "14:00", status: "done",   title: "Cargo Stuffed & Sealed",    location: "Shanghai CY",             detail: "Container stuffed, sealed, and gate-in confirmed at port." },
      { date: "Jan 25, 2026", time: "08:00", status: "done",   title: "Vessel Departed",           location: "Port of Shanghai",        detail: "Vessel MSC ARIA departed Shanghai. ETD confirmed." },
      { date: "Feb 18, 2026", time: "16:30", status: "done",   title: "Arrived Transhipment Port", location: "Tanger Med, Morocco",     detail: "Container arrived transhipment hub. Transferred to feeder vessel." },
      { date: "Feb 24, 2026", time: "11:15", status: "done",   title: "Arrived Destination Port",  location: "Apapa Port, Lagos",       detail: "Vessel berthed. Discharge operations commenced." },
      { date: "Feb 25, 2026", time: "09:00", status: "done",   title: "Customs Cleared",           location: "NCS — Apapa",             detail: "Import examination complete. Duty paid. Release order obtained." },
      { date: "Feb 28, 2026", time: "13:40", status: "done",   title: "Delivered",                 location: "Amuwo-Odofin, Lagos",     detail: "Container delivered and devanned at consignee warehouse. POD signed." },
    ],
  },
  "RZC-2024-00991": {
    id: "RZC-2024-00991",
    status: "customs",
    statusLabel: "Customs Clearance",
    service: "Air Freight",
    serviceIcon: Plane,
    origin: { city: "Frankfurt", country: "Germany", code: "FRA", port: "Frankfurt Airport" },
    destination: { city: "Abuja", country: "Nigeria", code: "ABV", port: "Nnamdi Azikiwe Airport" },
    shipper: "Deutsche Pharma GmbH",
    consignee: "National Hospital Abuja",
    pieces: 6,
    weight: "124 kg",
    volume: "0.8 CBM",
    description: "Pharmaceutical Supplies — Temperature Sensitive",
    mawb: "LH-0991-2024-FRA",
    eta: "Mar 06, 2026",
    bookedDate: "Mar 03, 2026",
    progress: 82,
    currentLocation: "NAFDAC Inspection — Abuja Airport",
    nextMilestone: "Release & Delivery",
    events: [
      { date: "Mar 03, 2026", time: "08:00", status: "done",   title: "Shipment Booked",         location: "Frankfurt, Germany",         detail: "Booking confirmed for temperature-controlled air freight." },
      { date: "Mar 03, 2026", time: "16:30", status: "done",   title: "Departed Frankfurt",      location: "Frankfurt Airport, FRA",     detail: "Departed on LH568 in cold chain container. Temp log active." },
      { date: "Mar 04, 2026", time: "05:15", status: "done",   title: "Arrived Abuja",           location: "Nnamdi Azikiwe Airport, ABV",detail: "Arrived on schedule. Temperature integrity maintained: 2–8°C." },
      { date: "Mar 04, 2026", time: "09:00", status: "done",   title: "Lodged with Customs",     location: "NCS — Abuja Airport",        detail: "Import entry filed. NAFDAC examination initiated." },
      { date: "Mar 06, 2026", time: "10:30", status: "active", title: "NAFDAC Inspection",       location: "NAFDAC Unit — Abuja Airport",detail: "Physical inspection by NAFDAC officers in progress." },
      { date: "Mar 06, 2026", time: "16:00", status: "pending",title: "Release Order Expected",  location: "NCS — Abuja",                detail: "Pending NAFDAC clearance certificate and duty payment." },
      { date: "Mar 06, 2026", time: "18:00", status: "pending",title: "Out for Delivery",        location: "Abuja, Nigeria",             detail: "Temperature-controlled last-mile delivery to hospital." },
    ],
  },
};

const SAMPLE_IDS = ["RZC-2024-00847", "RZC-2024-00612", "RZC-2024-00991"];

const STATUS_CONFIG = {
  in_transit: { color: "#0818A8", bg: "bg-blue-50",   border: "border-blue-200",   text: "text-[#0818A8]",  dot: "bg-[#0818A8]"  },
  delivered:  { color: "#16a34a", bg: "bg-green-50",  border: "border-green-200",  text: "text-green-700",  dot: "bg-green-500"  },
  customs:    { color: "#d97706", bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-700",  dot: "bg-amber-500"  },
  booked:     { color: "#6366f1", bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", dot: "bg-indigo-500" },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ value, status }) {
  const color = STATUS_CONFIG[status]?.color || "#0818A8";
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
      />
    </div>
  );
}

// ─── Timeline Event ───────────────────────────────────────────────────────────

function TimelineEvent({ event, index, isLast }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="relative flex gap-4"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      {/* Spine */}
      <div className="flex flex-col items-center flex-shrink-0 w-8">
        {/* Dot */}
        <div className={`relative z-10 flex-shrink-0 ${
          event.status === "done"
            ? "w-7 h-7 bg-[#0818A8] rounded-full flex items-center justify-center shadow-md shadow-[#0818A8]/25"
            : event.status === "active"
            ? "w-7 h-7 bg-white border-2 border-[#0818A8] rounded-full flex items-center justify-center"
            : "w-7 h-7 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center"
        }`}>
          {event.status === "done" ? (
            <CheckCircle size={13} className="text-white" />
          ) : event.status === "active" ? (
            <motion.div
              className="w-3 h-3 bg-[#0818A8] rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          ) : (
            <Circle size={10} className="text-gray-300" />
          )}
        </div>
        {/* Connector line */}
        {!isLast && (
          <div className={`flex-1 w-px mt-1 ${
            event.status === "done" ? "bg-[#0818A8]/30" : "bg-gray-150"
          }`} style={{ minHeight: 28 }} />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-5 ${isLast ? "" : ""}`}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className={`text-[13px] font-bold tracking-[-0.01em] ${
                  event.status === "pending" ? "text-gray-400" : "text-gray-900"
                }`}>
                  {event.title}
                </span>
                {event.status === "active" && (
                  <span className="inline-flex items-center gap-1 bg-[#0818A8]/8 border border-[#0818A8]/20 text-[#0818A8] text-[9.5px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full">
                    <motion.span
                      className="w-1 h-1 rounded-full bg-[#0818A8]"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    Live
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-[11.5px] text-gray-400 font-light">
                <span className="flex items-center gap-1">
                  <MapPin size={10} />
                  {event.location}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end flex-shrink-0 gap-0.5">
              <span className={`text-[11.5px] font-semibold ${event.status === "pending" ? "text-gray-300" : "text-gray-600"}`}>
                {event.date}
              </span>
              <span className={`text-[11px] ${event.status === "pending" ? "text-gray-300" : "text-gray-400"}`}>
                {event.time}
              </span>
            </div>
          </div>
        </button>

        <AnimatePresence>
          {(event.status !== "pending") && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mt-2 text-[11.5px] text-gray-500 font-light leading-relaxed bg-gray-50 border border-gray-100 px-3 py-2 rounded-sm">
                {event.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function TrackingResult({ shipment }) {
  const cfg = STATUS_CONFIG[shipment.status];
  const ServiceIcon = shipment.serviceIcon;
  const completedSteps = shipment.events.filter(e => e.status === "done").length;
  const totalSteps = shipment.events.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-6"
    >

      {/* ── Top bar ── */}
      <div className={`${cfg.bg} ${cfg.border} border rounded-t-sm px-5 sm:px-7 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
            shipment.status === "delivered" ? "bg-green-500" :
            shipment.status === "customs"   ? "bg-amber-500" : "bg-[#0818A8]"
          }`}>
            {shipment.status === "delivered"
              ? <CheckCircle size={16} className="text-white" />
              : <motion.div
                  animate={{ rotate: shipment.status === "in_transit" ? [0, 360] : 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Navigation size={15} className="text-white" />
                </motion.div>
            }
          </div>
          <div>
            <p className={`text-[13px] font-black tracking-[-0.01em] ${cfg.text}`}>{shipment.statusLabel}</p>
            <p className="text-[11.5px] text-gray-500 font-light">{shipment.currentLocation}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-[11.5px] text-gray-500 hover:text-gray-800 font-medium border border-gray-200 bg-white px-3 py-1.5 rounded transition-colors">
            <Download size={12} />
            Export
          </button>
          <button className="flex items-center gap-1.5 text-[11.5px] text-gray-500 hover:text-gray-800 font-medium border border-gray-200 bg-white px-3 py-1.5 rounded transition-colors">
            <Share2 size={12} />
            Share
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="border border-t-0 border-gray-200 rounded-b-sm overflow-hidden bg-white">

        {/* ── Header info ── */}
        <div className="px-5 sm:px-7 py-5 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-7 h-7 bg-[#0818A8]/8 border border-[#0818A8]/15 rounded flex items-center justify-center">
                  <ServiceIcon size={14} className="text-[#0818A8]" strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-bold text-[#0818A8] tracking-[0.12em] uppercase">{shipment.service}</span>
              </div>
              <h2 className="text-gray-900 font-black text-[20px] sm:text-[24px] tracking-[-0.02em]">{shipment.id}</h2>
              <p className="text-gray-400 text-[12px] font-light mt-0.5">{shipment.description}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-gray-400" />
                <span className="text-[12px] text-gray-500 font-light">Booked: <span className="font-semibold text-gray-700">{shipment.bookedDate}</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-gray-400" />
                <span className="text-[12px] text-gray-500 font-light">ETA: <span className="font-semibold text-gray-700">{shipment.eta}</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText size={12} className="text-gray-400" />
                <span className="text-[12px] text-gray-500 font-light">AWB: <span className="font-semibold text-gray-700">{shipment.mawb}</span></span>
              </div>
            </div>
          </div>

          {/* Route visual */}
          <div className="flex items-center gap-3 mb-5 p-4 bg-gray-50 border border-gray-100 rounded-sm">
            <div className="flex flex-col items-center min-w-[80px]">
              <span className="text-[#0818A8] font-black text-[18px] leading-none">{shipment.origin.code}</span>
              <span className="text-gray-700 font-semibold text-[12px] mt-0.5">{shipment.origin.city}</span>
              <span className="text-gray-400 text-[10.5px]">{shipment.origin.country}</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <div className="flex items-center w-full gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-0.5 rounded-full transition-colors ${
                      i < Math.floor(shipment.progress / 10) ? "bg-[#0818A8]" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <ServiceIcon size={13} className="text-[#0818A8]" strokeWidth={1.75} />
                <span className="text-[10.5px] text-gray-400 font-medium">{shipment.progress}% complete</span>
              </div>
            </div>
            <div className="flex flex-col items-center min-w-[80px]">
              <span className="text-[#0818A8] font-black text-[18px] leading-none">{shipment.destination.code}</span>
              <span className="text-gray-700 font-semibold text-[12px] mt-0.5">{shipment.destination.city}</span>
              <span className="text-gray-400 text-[10.5px]">{shipment.destination.country}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11.5px] text-gray-500 font-medium">{completedSteps} of {totalSteps} milestones completed</span>
              <span className="text-[11.5px] font-black text-[#0818A8]">{shipment.progress}%</span>
            </div>
            <ProgressBar value={shipment.progress} status={shipment.status} />
          </div>
        </div>

        {/* ── Details grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-100">
          {[
            { label: "Shipper",     value: shipment.shipper,   icon: Package },
            { label: "Consignee",   value: shipment.consignee, icon: MapPin },
            { label: "Pieces",      value: shipment.pieces,    icon: BarChart3 },
            { label: "Weight",      value: shipment.weight,    icon: Weight },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`px-5 py-4 ${i < 3 ? "border-r border-gray-100" : ""}`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={11} className="text-gray-400" />
                  <span className="text-[10.5px] font-bold text-gray-400 tracking-[0.1em] uppercase">{item.label}</span>
                </div>
                <p className="text-gray-800 font-semibold text-[12.5px] leading-snug">{item.value}</p>
              </div>
            );
          })}
        </div>

        {/* ── Timeline ── */}
        <div className="px-5 sm:px-7 py-6">
          <h3 className="text-gray-900 font-black text-[14px] tracking-[-0.01em] mb-5 flex items-center gap-2">
            <Clock size={14} className="text-[#0818A8]" />
            Shipment Timeline
          </h3>
          <div>
            {shipment.events.map((event, i) => (
              <TimelineEvent
                key={i}
                event={event}
                index={i}
                isLast={i === shipment.events.length - 1}
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-60px" });

  const handleTrack = async (id) => {
    const searchId = (id || query).trim().toUpperCase();
    if (!searchId) return;
    setLoading(true);
    setError(null);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1000));
    const found = MOCK_SHIPMENTS[searchId];
    if (found) {
      setResult(found);
    } else {
      setError(searchId);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleTrack();
  };

  return (
    <main className={`${montserrat.className} bg-white min-h-screen`}>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative bg-[#00061a] overflow-hidden pt-[104px] pb-14 md:pb-16"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80"
            alt=""
            aria-hidden
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00061a]/98 via-[#00061a]/85 to-[#00061a]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00061a] via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, backgroundSize: "56px 56px" }}
          />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[300px] bg-[#0818A8]/12 blur-3xl rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-8 xl:px-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Breadcrumb */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center justify-center gap-1.5 text-[11.5px] text-white/30 font-medium mb-6"
            >
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/50">Track Shipment</span>
            </motion.div>

            {/* Tag */}
            <motion.div variants={fadeUp} custom={0.05} className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white/55 text-[10px] font-semibold tracking-[0.22em] uppercase">Real-Time Tracking</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="text-white font-black text-[clamp(30px,5.5vw,60px)] leading-tight tracking-[-0.02em] mb-3"
            >
              Track Your{" "}
              <span className="relative inline-block text-[#1F51FF]">
                Shipment
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
              className="text-white/50 text-[13.5px] font-light leading-relaxed max-w-md mx-auto mb-9"
            >
              Enter your R-Zone tracking number, AWB, or Bill of Lading reference to get live shipment status and full timeline.
            </motion.p>

            {/* ── SEARCH BAR ── */}
            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="max-w-[680px] mx-auto"
            >
              <div className="flex items-stretch shadow-2xl shadow-black/30">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Enter tracking number e.g. RZC-2024-00847"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKey}
                    className="w-full h-[54px] pl-11 pr-4 bg-white text-gray-900 text-[14px] font-normal placeholder-gray-400 focus:outline-none border-0 rounded-l-sm"
                  />
                </div>
                <motion.button
                  onClick={() => handleTrack()}
                  disabled={loading}
                  className="h-[54px] px-7 bg-[#0818A8] hover:bg-[#0437F2] disabled:opacity-70 text-white text-[13px] font-bold tracking-[0.08em] uppercase transition-colors duration-200 flex items-center gap-2 flex-shrink-0 rounded-r-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <Search size={15} />
                  )}
                  {loading ? "Tracking..." : "Track Now"}
                </motion.button>
              </div>

              {/* Sample IDs */}
              <motion.div
                variants={fadeUp}
                custom={0.4}
                className="flex flex-wrap items-center justify-center gap-2 mt-4"
              >
                <span className="text-white/30 text-[11px] font-medium">Try a sample:</span>
                {SAMPLE_IDS.map((id) => (
                  <button
                    key={id}
                    onClick={() => { setQuery(id); handleTrack(id); }}
                    className="text-white/45 hover:text-white text-[11px] font-mono border border-white/15 hover:border-white/35 px-2.5 py-1 rounded transition-all duration-200"
                  >
                    {id}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent" />
      </section>

      {/* ══ RESULTS ═════════════════════════════════════════════════════════ */}
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 xl:px-10 pb-16">

        {/* Error state */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mt-6 flex items-start gap-3 bg-red-50 border border-red-200 px-5 py-4 rounded-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-bold text-[13.5px] mb-1">No shipment found for <span className="font-mono">{error}</span></p>
                <p className="text-red-600 text-[12.5px] font-light">
                  Please check your tracking number and try again. For help,{" "}
                  <Link href="/contact" className="underline hover:text-red-800 transition-colors">contact our team</Link>.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading skeleton */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="mt-6 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[80, 60, 90, 70].map((w, i) => (
                <div key={i} className="h-5 bg-gray-100 rounded animate-pulse" style={{ width: `${w}%` }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && !loading && <TrackingResult key={result.id} shipment={result} />}
        </AnimatePresence>
      </div>

      {/* ══ FEATURES ════════════════════════════════════════════════════════ */}
      <section
        ref={featuresRef}
        className="bg-[#f0f4ff] border-t border-gray-200 py-16 md:py-20"
      >
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 xl:px-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 border border-[#0818A8]/20 bg-[#0818A8]/5 px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8]" />
                <span className="text-[#0818A8] text-[10px] font-semibold tracking-[0.22em] uppercase">Why Track with R-Zone</span>
              </div>
            </div>
            <h2 className="text-gray-900 font-black text-[clamp(24px,4vw,44px)] tracking-[-0.02em] mb-3">
              Full visibility.{" "}
              <span className="relative inline-block text-[#0818A8]">
                Zero surprises.
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full"
                  initial={{ width: 0 }}
                  animate={featuresInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
              </span>
            </h2>
            <p className="text-gray-500 text-[13px] font-light max-w-md mx-auto">
              R-Zone's tracking platform gives you live status, milestone alerts, and complete documentation access — anytime, anywhere.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Zap,       title: "Live Status Updates",     desc: "Real-time milestone tracking from booking to proof of delivery." },
              { icon: Shield,    title: "Secure Access",           desc: "Tracking data encrypted and accessible only with your reference number." },
              { icon: Globe,     title: "Global Network",          desc: "Track shipments across air, sea, and road on every continent." },
              { icon: FileText,  title: "Document Access",         desc: "Download AWBs, packing lists, and PODs directly from tracking results." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-white border border-gray-200 hover:border-[#0818A8]/30 hover:shadow-md hover:shadow-[#0818A8]/6 p-5 rounded-sm transition-all duration-300 group"
                  initial={{ opacity: 0, y: 16 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="w-10 h-10 bg-[#0818A8]/8 border border-[#0818A8]/15 rounded flex items-center justify-center mb-4 group-hover:bg-[#0818A8] group-hover:border-[#0818A8] transition-all duration-300">
                    <Icon size={16} className="text-[#0818A8] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-gray-900 font-black text-[13.5px] mb-1.5 tracking-[-0.01em]">{f.title}</h3>
                  <p className="text-gray-500 text-[12px] font-light leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ HELP STRIP ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0818A8] py-12 md:py-14">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 xl:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/55 text-[10px] font-bold tracking-[0.22em] uppercase mb-1">Need Help?</p>
            <h3 className="text-white font-black text-[20px] md:text-[24px] tracking-[-0.01em]">
              Can't find your shipment?
            </h3>
            <p className="text-white/55 text-[12.5px] font-light mt-1">
              Our operations team is available 24/7 to assist with tracking queries.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a
              href="tel:+2340000000000"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[12.5px] font-semibold px-5 py-2.5 rounded transition-all duration-200"
            >
              <Phone size={13} />
              +234 000 000 0000
            </a>
            <a
              href="mailto:tracking@r-zoneenterprises.com"
              className="flex items-center gap-2 bg-white text-[#0818A8] hover:bg-gray-100 text-[12.5px] font-bold px-5 py-2.5 rounded transition-all duration-200"
            >
              <Mail size={13} />
              Email Support
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}