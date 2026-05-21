"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * R-Zone Enterprises — Track Shipment Page (Redesigned)
 * /track
 *
 * Design: Mission Control — dark navy operational terminal aesthetic.
 * Matches R-Zone brand palette (#00061a base, #0818A8 / #1F51FF accents).
 *
 * ADD TO /track/layout.tsx:
 * export const metadata = {
 *   title: "Track Your UK–Nigeria Shipment | R-Zone Enterprises",
 *   description:
 *     "Track your UK to Nigeria cargo shipment in real time. Enter your R-Zone booking reference for live status, milestones, and estimated delivery. #1 rated UK–Nigeria cargo company on Google.",
 *   alternates: { canonical: "https://r-zoneenterprises.com/track" },
 * };
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Montserrat } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Search, Package, MapPin, Clock, CheckCircle,
  Circle, Truck, Plane, Ship, Warehouse,
  ArrowRight, Phone, Mail, AlertCircle,
  ChevronRight, RefreshCw, Download, Share2,
  Navigation, Calendar, Weight, FileText,
  Shield, Globe, Zap, BarChart3, Award,
  MessageSquare, ChevronDown, Loader2,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-mont",
  display: "swap",
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
      { date:"Mar 01, 2026", time:"09:14", status:"done",    title:"Shipment Booked",       location:"Lagos, Nigeria",            detail:"Booking confirmed. AWB generated: MS-0847-2024-LOS" },
      { date:"Mar 02, 2026", time:"11:30", status:"done",    title:"Cargo Picked Up",       location:"Ikeja, Lagos",              detail:"Cargo collected from shipper premises. 14 pieces, 842kg verified." },
      { date:"Mar 02, 2026", time:"18:45", status:"done",    title:"Accepted at Origin",    location:"Lagos Airport Cargo, LOS",  detail:"Cargo accepted at airline cargo terminal. Security screening passed." },
      { date:"Mar 03, 2026", time:"08:20", status:"done",    title:"Departed Origin",       location:"Lagos — Flight MS447",      detail:"Cargo departed Lagos on connecting flight MS447." },
      { date:"Mar 03, 2026", time:"23:55", status:"done",    title:"Arrived Transit Hub",   location:"Dubai, UAE — DXB",         detail:"Cargo arrived at Dubai transit facility. Held for connecting flight." },
      { date:"Mar 04, 2026", time:"14:20", status:"active",  title:"In Transit — Dubai Hub",location:"Dubai International, UAE", detail:"Cargo processing at transit hub. On schedule for connecting flight to London." },
      { date:"Mar 06, 2026", time:"06:00", status:"pending", title:"Departs for Destination",location:"Dubai — Flight EK003",    detail:"Scheduled departure on EK003 to London Heathrow." },
      { date:"Mar 07, 2026", time:"07:30", status:"pending", title:"Arrives London Heathrow",location:"London, UK — LHR",        detail:"Estimated arrival. Customs pre-clearance filed." },
      { date:"Mar 07, 2026", time:"14:00", status:"pending", title:"Customs Clearance",     location:"HMRC — Heathrow",          detail:"UK import clearance. Duties pre-paid via DDP incoterm." },
      { date:"Mar 07, 2026", time:"18:00", status:"pending", title:"Out for Delivery",      location:"London, UK",               detail:"Last-mile delivery to consignee address." },
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
      { date:"Jan 15, 2026", time:"10:00", status:"done", title:"Booking Confirmed",        location:"Shanghai, China",      detail:"FCL booking confirmed. Container allocated: TCKU3456781." },
      { date:"Jan 22, 2026", time:"14:00", status:"done", title:"Cargo Stuffed & Sealed",   location:"Shanghai CY",          detail:"Container stuffed, sealed, and gate-in confirmed at port." },
      { date:"Jan 25, 2026", time:"08:00", status:"done", title:"Vessel Departed",          location:"Port of Shanghai",     detail:"Vessel MSC ARIA departed Shanghai. ETD confirmed." },
      { date:"Feb 18, 2026", time:"16:30", status:"done", title:"Arrived Transhipment Port",location:"Tanger Med, Morocco",  detail:"Container arrived transhipment hub. Transferred to feeder vessel." },
      { date:"Feb 24, 2026", time:"11:15", status:"done", title:"Arrived Destination Port", location:"Apapa Port, Lagos",    detail:"Vessel berthed. Discharge operations commenced." },
      { date:"Feb 25, 2026", time:"09:00", status:"done", title:"Customs Cleared",          location:"NCS — Apapa",          detail:"Import examination complete. Duty paid. Release order obtained." },
      { date:"Feb 28, 2026", time:"13:40", status:"done", title:"Delivered",                location:"Amuwo-Odofin, Lagos",  detail:"Container delivered and devanned at consignee warehouse. POD signed." },
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
      { date:"Mar 03, 2026", time:"08:00", status:"done",    title:"Shipment Booked",       location:"Frankfurt, Germany",          detail:"Booking confirmed for temperature-controlled air freight." },
      { date:"Mar 03, 2026", time:"16:30", status:"done",    title:"Departed Frankfurt",    location:"Frankfurt Airport, FRA",      detail:"Departed on LH568 in cold chain container. Temp log active." },
      { date:"Mar 04, 2026", time:"05:15", status:"done",    title:"Arrived Abuja",         location:"Nnamdi Azikiwe Airport, ABV", detail:"Arrived on schedule. Temperature integrity maintained: 2–8°C." },
      { date:"Mar 04, 2026", time:"09:00", status:"done",    title:"Lodged with Customs",   location:"NCS — Abuja Airport",         detail:"Import entry filed. NAFDAC examination initiated." },
      { date:"Mar 06, 2026", time:"10:30", status:"active",  title:"NAFDAC Inspection",     location:"NAFDAC Unit — Abuja Airport", detail:"Physical inspection by NAFDAC officers in progress." },
      { date:"Mar 06, 2026", time:"16:00", status:"pending", title:"Release Order Expected",location:"NCS — Abuja",                 detail:"Pending NAFDAC clearance certificate and duty payment." },
      { date:"Mar 06, 2026", time:"18:00", status:"pending", title:"Out for Delivery",      location:"Abuja, Nigeria",              detail:"Temperature-controlled last-mile delivery to hospital." },
    ],
  },
};

const SAMPLE_IDS = ["RZC-2024-00847", "RZC-2024-00612", "RZC-2024-00991"];

const STATUS_CONFIG = {
  in_transit: { color:"#1F51FF", label:"In Transit",        dotClass:"bg-[#1F51FF]",    chipClass:"border-[#1F51FF]/30 bg-[#1F51FF]/10 text-[#1F51FF]",    pulse:true  },
  delivered:  { color:"#22c55e", label:"Delivered",         dotClass:"bg-emerald-400",  chipClass:"border-emerald-400/30 bg-emerald-400/10 text-emerald-400", pulse:false },
  customs:    { color:"#f59e0b", label:"Customs Clearance", dotClass:"bg-amber-400",    chipClass:"border-amber-400/30 bg-amber-400/10 text-amber-400",       pulse:true  },
  booked:     { color:"#a78bfa", label:"Booked",            dotClass:"bg-violet-400",   chipClass:"border-violet-400/30 bg-violet-400/10 text-violet-400",    pulse:false },
};

// ─── Animated scanning ring ───────────────────────────────────────────────────
function ScanRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {[1,2,3].map(i=>(
        <motion.div key={i} className="absolute rounded-full border border-[#1F51FF]/20"
          animate={{ scale:[1,2.5], opacity:[0.6,0] }}
          transition={{ duration:2.5, repeat:Infinity, delay:i*0.8, ease:"easeOut" }}
          style={{ width:40, height:40 }}/>
      ))}
    </div>
  );
}

// ─── Animated route visualiser ────────────────────────────────────────────────
function RouteVisualiser({ shipment }) {
  const cfg = STATUS_CONFIG[shipment.status];
  const ServiceIcon = shipment.serviceIcon;
  const isSeaFreight = shipment.service === "Sea Freight";

  return (
    <div className="relative bg-[#020c28] border border-white/[0.07] overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"32px 32px" }}
        aria-hidden="true"/>

      <div className="relative z-10 p-5 sm:p-7">
        <div className="flex items-center gap-3 sm:gap-6">

          {/* Origin */}
          <div className="flex flex-col items-center text-center flex-shrink-0 min-w-[72px]">
            <div className="w-10 h-10 rounded-full bg-[#0818A8]/30 border border-[#0818A8]/40 flex items-center justify-center mb-2">
              <span className="text-[#1F51FF] font-black text-[13px] leading-none">{shipment.origin.code}</span>
            </div>
            <p className="text-white font-bold text-[13px] leading-tight">{shipment.origin.city}</p>
            <p className="text-white/50 text-[13px] leading-tight">{shipment.origin.country}</p>
          </div>

          {/* Animated path */}
          <div className="flex-1 relative flex flex-col items-center gap-2 px-2">
            {/* Path line */}
            <div className="relative w-full h-[2px] bg-white/[0.06] overflow-hidden">
              <motion.div className="absolute inset-y-0 left-0 h-full"
                style={{ background:`linear-gradient(to right, #0818A8, ${cfg.color})` }}
                initial={{ width:"0%" }} animate={{ width:`${shipment.progress}%` }}
                transition={{ duration:1.5, ease:[0.25,0.46,0.45,0.94], delay:0.4 }}/>
              {/* Travelling dot */}
              {shipment.status !== "delivered" && (
                <motion.div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#00061a] shadow-lg"
                  style={{ backgroundColor:cfg.color, boxShadow:`0 0 8px ${cfg.color}` }}
                  initial={{ left:"0%" }} animate={{ left:`${shipment.progress}%` }}
                  transition={{ duration:1.5, ease:[0.25,0.46,0.45,0.94], delay:0.4 }}
                  aria-hidden="true"/>
              )}
            </div>
            {/* Icon + progress */}
            <div className="flex items-center gap-2">
              <ServiceIcon size={13} style={{ color:cfg.color }} aria-hidden="true"/>
              <span className="text-[13px] font-bold" style={{ color:cfg.color }}>{shipment.progress}% complete</span>
              <span className="text-white/40 text-[13px]">·</span>
              <span className="text-white/50 text-[13px]">ETA {shipment.eta}</span>
            </div>
          </div>

          {/* Destination */}
          <div className="flex flex-col items-center text-center flex-shrink-0 min-w-[72px]">
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center mb-2 ${
              shipment.status==="delivered" ? "bg-emerald-400/20 border-emerald-400/40" : "bg-white/[0.05] border-white/[0.12]"
            }`}>
              {shipment.status==="delivered"
                ? <CheckCircle size={16} className="text-emerald-400"/>
                : <span className="text-white/50 font-black text-[13px] leading-none">{shipment.destination.code}</span>
              }
            </div>
            <p className="text-white font-bold text-[13px] leading-tight">{shipment.destination.city}</p>
            <p className="text-white/50 text-[13px] leading-tight">{shipment.destination.country}</p>
          </div>
        </div>

        {/* Current location ticker */}
        <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-4">
          <div className="relative flex-shrink-0">
            <span className={`w-2 h-2 rounded-full inline-block ${cfg.dotClass}`} aria-hidden="true"/>
            {cfg.pulse&&<span className={`absolute inset-0 w-2 h-2 rounded-full animate-ping ${cfg.dotClass} opacity-60`} aria-hidden="true"/>}
          </div>
          <span className="text-white/50 text-[13px] font-normal">Current location:</span>
          <span className="text-white font-semibold text-[13px]">{shipment.currentLocation}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Timeline event ───────────────────────────────────────────────────────────
function TimelineEvent({ event, index, isLast }) {
  return (
    <motion.div className="relative flex gap-4"
      initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }}
      transition={{ delay:index*0.055, duration:0.4, ease:[0.25,0.46,0.45,0.94] }}>

      {/* Spine + dot */}
      <div className="flex flex-col items-center flex-shrink-0 w-7">
        <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
          event.status==="done"
            ? "bg-[#0818A8] shadow-lg shadow-[#0818A8]/30"
            : event.status==="active"
            ? "bg-transparent border-2 border-[#1F51FF]"
            : "bg-transparent border border-white/[0.1]"
        }`}>
          {event.status==="done" ? (
            <CheckCircle size={12} className="text-white" aria-hidden="true"/>
          ) : event.status==="active" ? (
            <motion.div className="w-2.5 h-2.5 rounded-full bg-[#1F51FF]"
              animate={{ scale:[1,1.3,1], opacity:[1,0.5,1] }} transition={{ duration:1.4, repeat:Infinity }} aria-hidden="true"/>
          ) : (
            <div className="w-2 h-2 rounded-full bg-white/[0.1]" aria-hidden="true"/>
          )}
        </div>
        {!isLast && (
          <div className={`flex-1 w-px mt-1 min-h-[24px] ${event.status==="done"?"bg-[#0818A8]/35":"bg-white/[0.06]"}`}
            aria-hidden="true"/>
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-5 ${event.status==="pending"?"opacity-35":""}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className={`text-[13px] font-bold ${event.status==="done"?"text-white":event.status==="active"?"text-white":"text-white/40"}`}>
                {event.title}
              </span>
              {event.status==="active" && (
                <span className="inline-flex items-center gap-1 border border-[#1F51FF]/30 bg-[#1F51FF]/10 text-[#1F51FF] text-[13px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full">
                  <motion.span className="w-1 h-1 rounded-full bg-[#1F51FF]"
                    animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.2, repeat:Infinity }} aria-hidden="true"/>
                  Live
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-white/40 font-normal">
              <MapPin size={9} aria-hidden="true"/>
              <span>{event.location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end flex-shrink-0 gap-0.5 text-right">
            <span className={`text-[13px] font-semibold ${event.status!=="pending"?"text-white/60":"text-white/20"}`}>{event.date}</span>
            <span className={`text-[13px] font-normal ${event.status!=="pending"?"text-white/35":"text-white/15"}`}>{event.time}</span>
          </div>
        </div>

        {event.status!=="pending" && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} transition={{ duration:0.2 }}>
            <p className="mt-2 text-[13px] text-white/50 font-normal leading-relaxed bg-white/[0.03] border border-white/[0.06] px-3 py-2.5">
              {event.detail}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Full tracking result ─────────────────────────────────────────────────────
function TrackingResult({ shipment }) {
  const cfg = STATUS_CONFIG[shipment.status];
  const ServiceIcon = shipment.serviceIcon;
  const completed = shipment.events.filter(e=>e.status==="done").length;
  const total     = shipment.events.length;

  return (
    <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.5, ease:[0.25,0.46,0.45,0.94] }}
      className="mt-8">

      {/* ── Status header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {/* Status chip */}
          <span className={`inline-flex items-center gap-2 border px-3.5 py-1.5 text-[13px] font-bold tracking-[0.12em] uppercase ${cfg.chipClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass} ${cfg.pulse?"animate-pulse":""}`} aria-hidden="true"/>
            {cfg.label}
          </span>
          <span className="text-white/40 text-[13px] font-normal">{shipment.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white font-medium border border-white/[0.1] hover:border-white/[0.25] bg-white/[0.03] hover:bg-white/[0.07] px-3 py-1.5 transition-all duration-200"
            aria-label="Export tracking data">
            <Download size={11} aria-hidden="true"/> Export
          </button>
          <button className="flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white font-medium border border-white/[0.1] hover:border-white/[0.25] bg-white/[0.03] hover:bg-white/[0.07] px-3 py-1.5 transition-all duration-200"
            aria-label="Share tracking link">
            <Share2 size={11} aria-hidden="true"/> Share
          </button>
        </div>
      </div>

      {/* ── Service + reference bar ── */}
      <div className="border border-white/[0.09] bg-white/[0.03] px-5 py-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#0818A8]/25 border border-[#0818A8]/30 flex items-center justify-center flex-shrink-0">
            <ServiceIcon size={15} className="text-[#1F51FF]" aria-hidden="true"/>
          </div>
          <div>
            <p className="text-[#1F51FF] text-[13px] font-bold tracking-[0.18em] uppercase">{shipment.service}</p>
            <p className="text-white/60 text-[13px] font-normal">{shipment.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          {[
            { icon:Calendar, label:"Booked",   val:shipment.bookedDate },
            { icon:Clock,    label:"ETA",       val:shipment.eta        },
            { icon:FileText, label:"Reference", val:shipment.mawb       },
          ].map(({icon:Icon,label,val})=>(
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={11} className="text-white/35" aria-hidden="true"/>
              <span className="text-white/40 text-[13px]">{label}:</span>
              <span className="text-white/80 text-[13px] font-semibold">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Route visualiser ── */}
      <RouteVisualiser shipment={shipment}/>

      {/* ── Progress milestone bar ── */}
      <div className="border border-white/[0.09] bg-white/[0.03] px-5 py-4 mt-4 mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-white/50 text-[13px] font-normal">{completed} of {total} milestones completed</span>
          <span className="text-[13px] font-black" style={{ color:cfg.color }}>{shipment.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/[0.07] overflow-hidden">
          <motion.div className="h-full"
            style={{ background:`linear-gradient(to right, #0818A8, ${cfg.color})` }}
            initial={{ width:"0%" }} animate={{ width:`${shipment.progress}%` }}
            transition={{ duration:1.4, ease:[0.25,0.46,0.45,0.94], delay:0.3 }}/>
        </div>
        {/* Milestone ticks */}
        <div className="flex justify-between mt-1.5">
          {shipment.events.map((_,i)=>(
            <div key={i} className={`w-px h-2 ${i<completed?"bg-[#0818A8]":"bg-white/[0.08]"}`} aria-hidden="true"/>
          ))}
        </div>
      </div>

      {/* ── Cargo details grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.09] mb-4 overflow-hidden">
        {[
          { icon:Package,  label:"Shipper",   val:shipment.shipper   },
          { icon:MapPin,   label:"Consignee", val:shipment.consignee },
          { icon:BarChart3,label:"Pieces",    val:shipment.pieces    },
          { icon:Weight,   label:"Weight",    val:shipment.weight    },
        ].map(({icon:Icon,label,val})=>(
          <div key={label} className="bg-[#00061a] px-4 py-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Icon size={10} className="text-white/35" aria-hidden="true"/>
              <span className="text-[13px] font-bold text-white/35 tracking-[0.15em] uppercase">{label}</span>
            </div>
            <p className="text-white/80 font-semibold text-[13px] leading-snug">{val}</p>
          </div>
        ))}
      </div>

      {/* ── Timeline ── */}
      <div className="border border-white/[0.09] bg-white/[0.02] overflow-hidden">
        <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true"/>
        <div className="px-5 sm:px-7 py-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock size={13} className="text-[#1F51FF]" aria-hidden="true"/>
            <h3 className="text-white font-black text-[13px] tracking-[0.2em] uppercase">Shipment Timeline</h3>
            <span className="ml-auto text-white/40 text-[13px] font-normal">{completed}/{total} complete</span>
          </div>
          {shipment.events.map((event,i)=>(
            <TimelineEvent key={i} event={event} index={i} isLast={i===shipment.events.length-1}/>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TrackPage() {
  const [query,   setQuery]   = useState("");
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);

  const featuresRef  = useRef(null);
  const featuresInView = useInView(featuresRef, { once:true, margin:"-60px" });

  const handleTrack = async (id) => {
    const searchId = (id||query).trim().toUpperCase();
    if (!searchId) return;
    setLoading(true); setError(null); setResult(null); setScanned(false);
    await new Promise(r=>setTimeout(r,1100));
    const found = MOCK_SHIPMENTS[searchId];
    if (found) { setResult(found); setScanned(true); }
    else { setError(searchId); }
    setLoading(false);
  };

  const handleKey = (e) => { if (e.key==="Enter") handleTrack(); };

  return (
    <main className={`${montserrat.variable} font-[family-name:var(--font-mont)] bg-[#00061a] min-h-screen`}>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" aria-labelledby="track-hero-heading">

        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"64px 64px" }}/>

        {/* Atmospheric glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] left-[15%] w-[700px] h-[500px] bg-[#0818A8]/18 rounded-full blur-[150px]"/>
          <div className="absolute top-[30%] right-[-5%] w-[400px] h-[300px] bg-[#1F51FF]/10 rounded-full blur-[120px]"/>
        </div>

        {/* Vertical accent lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[20,50,80].map(p=>(
            <div key={p} className="absolute top-0 bottom-0 w-px opacity-[0.035]"
              style={{ left:`${p}%`, background:"linear-gradient(to bottom, transparent, rgba(31,81,255,0.8) 50%, transparent)" }}/>
          ))}
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-8 xl:px-10 pt-[110px] pb-12 md:pb-16">

          {/* Breadcrumb */}
          <motion.nav aria-label="Breadcrumb"
            className="flex items-center gap-2 justify-center mb-8"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.4 }}>
            <Link href="/" className="text-white/40 text-[13px] font-medium hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={10} className="text-white/30" aria-hidden="true"/>
            <span className="text-white/50 text-[13px] font-medium" aria-current="page">Track Shipment</span>
          </motion.nav>

          {/* #1 badge */}
          <motion.div className="flex justify-center mb-5"
            initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            <div className="inline-flex items-center gap-2 bg-[#0818A8]/20 border border-[#1F51FF]/25 px-4 py-2 rounded-full">
              <Award size={12} className="text-[#1F51FF]" aria-hidden="true"/>
              <span className="text-white text-[13px] font-bold">#1 Highest-Rated UK–Nigeria Cargo on Google · 100+ Five-Star Reviews</span>
            </div>
          </motion.div>

          {/* Tag pill */}
          <motion.div className="flex justify-center mb-5"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.05 }}>
            <div className="inline-flex items-center gap-2.5 border border-[#1F51FF]/25 bg-[#0818A8]/12 px-4 py-1.5 rounded-full">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-[#1F51FF] flex-shrink-0"
                animate={{ scale:[1,1.7,1], opacity:[1,0.4,1] }} transition={{ duration:2, repeat:Infinity }} aria-hidden="true"/>
              <span className="text-[#1F51FF] text-[13px] font-bold tracking-[0.3em] uppercase">Real-Time UK–Nigeria Tracking</span>
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1 id="track-hero-heading"
            className="text-white font-black text-center text-[clamp(30px,6vw,68px)] leading-[0.88] tracking-[-0.035em] uppercase mb-4"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.1 }}>
            Track Your{" "}
            <span className="relative inline-block text-[#1F51FF]">
              Shipment.
              <motion.span className="absolute -bottom-2 left-0 h-[4px] bg-[#1F51FF] rounded-full" aria-hidden="true"
                initial={{ width:0 }} animate={{ width:"100%" }} transition={{ duration:0.6, delay:0.8 }}/>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p className="text-white/60 text-[14px] font-normal leading-relaxed max-w-md mx-auto text-center mb-10"
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.22 }}>
            Enter your R-Zone booking reference, AWB, or Bill of Lading number
            for live status, full milestone timeline, and cargo details.
          </motion.p>

          {/* ── SEARCH BAR ── */}
          <motion.div className="max-w-[660px] mx-auto"
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.35 }}>

            {/* Input row */}
            <div className="relative flex items-stretch mb-5">
              {/* Scan ring when loading */}
              {loading && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 z-20" aria-hidden="true">
                  <ScanRing/>
                </div>
              )}
              <div className="relative flex-1">
                <Search size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${loading?"text-[#1F51FF]":"text-white/30"}`} aria-hidden="true"/>
                <input type="text"
                  placeholder="e.g. RZC-2024-00847  ·  AWB  ·  Bill of Lading"
                  value={query} onChange={e=>{setQuery(e.target.value);setError(null);}} onKeyDown={handleKey}
                  className="w-full h-[54px] pl-11 pr-4 bg-white/[0.07] border border-white/[0.12] border-r-0 text-white text-[14px] font-normal placeholder-white/25 focus:outline-none focus:bg-white/[0.1] focus:border-[#1F51FF]/50 transition-all duration-200 font-mono"
                  aria-label="Enter UK–Nigeria shipment tracking number"/>
              </div>
              <motion.button onClick={()=>handleTrack()} disabled={loading}
                className="h-[54px] px-8 bg-[#0818A8] hover:bg-[#0437F2] disabled:opacity-60 text-white text-[13px] font-black tracking-[0.1em] uppercase transition-all duration-200 flex items-center gap-2 flex-shrink-0 border border-[#1F51FF]/30"
                whileHover={{ scale:1.01 }} whileTap={{ scale:0.98 }}
                aria-label="Track UK–Nigeria shipment">
                {loading
                  ? <><Loader2 size={14} className="animate-spin" aria-hidden="true"/> Scanning…</>
                  : <><Zap size={14} aria-hidden="true"/> Track Now</>
                }
              </motion.button>
            </div>

            {/* Sample IDs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-white/30 text-[13px] font-normal">Try a sample:</span>
              {SAMPLE_IDS.map(id=>(
                <button key={id} onClick={()=>{setQuery(id); handleTrack(id);}}
                  className="text-white/40 hover:text-white text-[13px] font-mono border border-white/[0.1] hover:border-white/[0.3] bg-white/[0.03] hover:bg-white/[0.07] px-2.5 py-1 transition-all duration-200"
                  aria-label={`Track sample shipment ${id}`}>
                  {id}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── RESULTS ── */}
          <div className="mt-2">

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div className="mt-6 flex items-start gap-3 bg-red-500/8 border border-red-500/25 px-5 py-4"
                  initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }} transition={{ duration:0.3 }}>
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true"/>
                  <div>
                    <p className="text-red-300 font-bold text-[13.5px] mb-1">
                      No shipment found for <span className="font-mono text-red-200">{error}</span>
                    </p>
                    <p className="text-red-400/80 text-[13px] font-normal">
                      Check your reference format (RZC-XXXX-XXXXX) and try again. Need help?{" "}
                      <a href="tel:+448007720864" className="underline text-red-300 hover:text-white transition-colors">Call +44 800 772 0864</a>
                      {" "}or{" "}
                      <a href="https://wa.me/447915647119" target="_blank" rel="noopener noreferrer" className="underline text-red-300 hover:text-white transition-colors">WhatsApp us</a>.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading skeleton */}
            <AnimatePresence>
              {loading && (
                <motion.div className="mt-8 space-y-3"
                  initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                  {[90,70,85,55,75].map((w,i)=>(
                    <div key={i} className="h-4 bg-white/[0.05] animate-pulse" style={{ width:`${w}%` }}/>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result */}
            <AnimatePresence mode="wait">
              {result && !loading && <TrackingResult key={result.id} shipment={result}/>}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══════════════════════════════════════════════════════════ */}
      <section ref={featuresRef} className="relative border-t border-white/[0.06] py-16 md:py-20" aria-labelledby="features-heading">
        <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"64px 64px" }}/>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0818A8]/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true"/>

        <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 xl:px-10">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity:0 }} animate={featuresInView?{ opacity:1 }:{}} transition={{ duration:0.5 }}>
              <div className="inline-flex items-center gap-2.5 border border-[#1F51FF]/25 bg-[#0818A8]/12 px-4 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]" aria-hidden="true"/>
                <span className="text-[#1F51FF] text-[13px] font-bold tracking-[0.3em] uppercase">Why Track with R-Zone</span>
              </div>
            </motion.div>
            <motion.h2 id="features-heading"
              className="text-white font-black text-[clamp(24px,4vw,44px)] leading-[0.9] tracking-[-0.025em] uppercase mb-3"
              initial={{ opacity:0, y:16 }} animate={featuresInView?{ opacity:1, y:0 }:{}} transition={{ duration:0.6, delay:0.1 }}>
              Full Visibility.{" "}
              <span className="relative inline-block text-[#1F51FF]">
                Zero Surprises.
                <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full" aria-hidden="true"
                  initial={{ width:0 }} animate={featuresInView?{ width:"100%" }:{}} transition={{ duration:0.6, delay:0.5 }}/>
              </span>
            </motion.h2>
            <motion.p className="text-white/50 text-[14px] font-normal max-w-md mx-auto leading-relaxed"
              initial={{ opacity:0 }} animate={featuresInView?{ opacity:1 }:{}} transition={{ duration:0.5, delay:0.2 }}>
              R-Zone's tracking platform gives you live status, milestone alerts, and complete documentation — for every UK–Nigeria shipment.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon:Zap,      title:"Live Status Updates",    desc:"Real-time milestone tracking from booking to proof of delivery — air or sea.",     accent:"#1F51FF" },
              { icon:Shield,   title:"Secure Reference Access",desc:"Tracking data accessible only with your unique R-Zone booking reference.",          accent:"#0818A8" },
              { icon:Globe,    title:"UK & Nigeria Coverage",  desc:"Track UK-to-Nigeria and Nigeria-to-UK shipments across air, sea, and road.",        accent:"#1F51FF" },
              { icon:FileText, title:"Document Download",      desc:"Download AWBs, packing lists, and proof of delivery directly from tracking results.", accent:"#0818A8" },
            ].map((f,i)=>{const Icon=f.icon;return(
              <motion.div key={i}
                className="group border border-white/[0.07] bg-white/[0.03] p-6 hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-300 relative overflow-hidden"
                initial={{ opacity:0, y:16 }} animate={featuresInView?{ opacity:1, y:0 }:{}} transition={{ delay:i*0.1, duration:0.5 }}>
                <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor:f.accent }} aria-hidden="true"/>
                <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ backgroundColor:`${f.accent}18`, border:`1px solid ${f.accent}30` }} aria-hidden="true">
                  <Icon size={16} style={{ color:f.accent }}/>
                </div>
                <h3 className="text-white font-black text-[13.5px] mb-2 tracking-[-0.01em]">{f.title}</h3>
                <p className="text-white/50 text-[13px] font-normal leading-relaxed">{f.desc}</p>
              </motion.div>
            );})}
          </div>
        </div>
      </section>

      {/* ══ HELP STRIP ════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0818A8] overflow-hidden py-12 md:py-14"
        aria-label="Contact R-Zone for UK–Nigeria tracking help">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"44px 44px" }}/>
        <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 xl:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-white/60 text-[13px] font-bold tracking-[0.28em] uppercase mb-1">Need Help?</p>
            <h3 className="text-white font-black text-[clamp(18px,3vw,26px)] tracking-[-0.02em] uppercase mb-1">
              Can&apos;t find your UK–Nigeria shipment?
            </h3>
            <p className="text-white/60 text-[13px] font-normal">
              Our UK-based team is available Mon–Fri 10AM–6PM · Sat 11AM–2PM to assist with any tracking query.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a href="tel:+448007720864"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[13px] font-bold px-5 py-2.5 transition-all duration-200"
              aria-label="Call R-Zone UK: +44 800 772 0864">
              <Phone size={12} aria-hidden="true"/> +44 800 772 0864
            </a>
            <a href="https://wa.me/447915647119?text=Hello%2C%20I%20need%20help%20tracking%20my%20UK%20to%20Nigeria%20shipment."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/30 text-white text-[13px] font-bold px-5 py-2.5 transition-all duration-200"
              aria-label="WhatsApp R-Zone about tracking">
              <MessageSquare size={12} className="text-[#25D366]" aria-hidden="true"/> WhatsApp Us
            </a>
            <a href="mailto:info@r-zoneenterprises.com"
              className="flex items-center gap-2 bg-white text-[#0818A8] hover:bg-white/90 text-[13px] font-black px-5 py-2.5 transition-all duration-200"
              aria-label="Email R-Zone tracking support">
              <Mail size={12} aria-hidden="true"/> Email Support
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}