"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * R-Zone Enterprises — Business Solutions Page (SEO-Optimised)
 * /business-solutions
 *
 * ADD TO /business-solutions/layout.tsx or page.tsx:
 * export const metadata = {
 *   title: "UK–Nigeria Business Cargo & Logistics Solutions | R-Zone Enterprises",
 *   description:
 *     "The highest-rated UK-to-Nigeria cargo company on Google. Air freight from £5/kg, sea freight from £3/kg. Door-to-door, customs clearance, warehousing and importation. 100+ five-star reviews. Weekly departures. Same-day response.",
 *   keywords: [
 *     "UK Nigeria cargo company","air freight Nigeria","sea freight Nigeria UK",
 *     "door to door cargo Nigeria","customs clearance Nigeria UK",
 *     "import from Nigeria to UK","cargo Abuja","cargo Lagos",
 *     "UK Nigeria shipping company","freight forwarding Nigeria",
 *   ],
 *   alternates: { canonical: "https://r-zoneenterprises.com/business-solutions" },
 * };
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Montserrat } from "next/font/google";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion, useInView, useScroll, useTransform, AnimatePresence,
} from "framer-motion";
import {
  Plane, Ship, Truck, Package, FileCheck, Warehouse, Anchor,
  ArrowRight, Check, ChevronRight, Clock, Shield, Star, MapPin,
  BarChart3, Phone, AlertTriangle, XCircle, CheckCircle2,
  TrendingUp, Users, Zap, Globe, Briefcase,
  Award, MessageSquare,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
  variable: "--font-montserrat",
  display: "swap",
});

const IMGS = {
  airFreight:  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80&auto=format&fit=crop",
  seaFreight:  "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1200&q=80&auto=format&fit=crop",
  doorToDoor:  "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=1200&q=80&auto=format&fit=crop",
  importation: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80&auto=format&fit=crop",
  customs:     "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&auto=format&fit=crop",
  warehousing: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop",
  cargo:       "https://images.unsplash.com/photo-1468818419799-3d02e0b85c1a?w=1200&q=80&auto=format&fit=crop",
  stats:       "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80&auto=format&fit=crop",
};

const BUSINESS_PROBLEMS = [
  { id:"customs-delays",     problem:"Cargo stuck at UK or Nigerian customs?",        solve:"We clear both ends — in-house, no delays."                 },
  { id:"supply-chain",       problem:"Supply chain breaking down?",                   solve:"Weekly fixed departures. Zero interruptions."              },
  { id:"expensive-shipping", problem:"Air freight too expensive for bulk cargo?",     solve:"Sea freight from £3/kg — weekly UK–Nigeria sailings."      },
  { id:"nigeria-collection", problem:"Need goods collected anywhere in Nigeria?",     solve:"Our Lagos team picks up from all 36 states."               },
  { id:"no-tracking",        problem:"No visibility on your shipment?",               solve:"Real-time tracking from UK departure to Nigerian door."    },
];

const SOLUTIONS = [
  {
    id:"air-freight", slug:"/air-freight", icon:Plane, label:"Air Freight", badge:"Fastest Option",
    problemTitle:"Need cargo in Nigeria fast — from the UK?",
    problemBody:"Delayed stock means lost revenue. Time-sensitive shipments cannot wait weeks at sea. Your business needs a reliable, fast air corridor from the UK to Nigeria with guaranteed weekly departures.",
    solutionTitle:"Air Freight UK to Nigeria.",
    solutionBody:"Weekly air freight from London Heathrow, Gatwick and Manchester direct to Lagos and Abuja. IATA-certified handling on every consignment. Air cargo from the UK to Nigeria in 5–10 working days.",
    sub:"5–10 working days UK to Nigeria", rate:"from £5/kg", accent:"#0818A8",
    img:IMGS.airFreight, imgAlt:"Cargo aircraft loaded at Heathrow for air freight to Nigeria",
    points:["5–10 working days UK to Nigeria","Weekly departures — Heathrow, Gatwick, Manchester","All 36 Nigerian states covered","UK door collection available","Real-time tracking on every shipment","IATA-certified cargo handling"],
    metric:{ val:"5–10", unit:"working days", label:"UK to Nigeria air freight" },
    airlines:["British Airways","Virgin Atlantic","Emirates","Ethiopian Airlines"],
  },
  {
    id:"sea-freight", slug:"/sea-shipping-to-nigeria", icon:Ship, label:"Sea Freight", badge:"Best Value",
    problemTitle:"High UK–Nigeria shipping costs eating your margins?",
    problemBody:"Air freight at scale is not viable for bulk goods, vehicles or machinery. You need an affordable, reliable sea corridor between the UK and Nigeria without hidden charges.",
    solutionTitle:"Weekly Sea Freight UK to Nigeria.",
    solutionBody:"Weekly consolidated sea freight from UK ports to Lagos. 4–6 weeks transit time. The most cost-effective way to move bulk, heavy, or high-volume cargo between the UK and Nigeria, every single week.",
    sub:"4–6 weeks transit · Weekly sailings", rate:"from £3/kg", accent:"#1F51FF",
    img:IMGS.seaFreight, imgAlt:"Container ship departing UK port with weekly sea freight to Nigeria",
    points:["Weekly fixed-schedule UK–Nigeria sailings","FCL (full container) & LCL (shared) options","Vehicles, heavy machinery & bulk cargo accepted","Customs clearance UK & Nigeria included","4–6 weeks transit time","Essex consolidation warehouse available"],
    metric:{ val:"£3", unit:"/kg", label:"from — UK to Nigeria sea freight" },
    airlines:[],
  },
  {
    id:"door-to-door", slug:"/door-to-door-cargo", icon:Truck, label:"Door to Door", badge:"Most Popular",
    problemTitle:"Managing UK–Nigeria logistics from two countries?",
    problemBody:"Coordinating UK collections, Nigerian customs, and last-mile delivery through multiple providers is a management nightmare. One mistake and your shipment stalls.",
    solutionTitle:"Complete Door-to-Door UK–Nigeria Cargo.",
    solutionBody:"We collect from your UK address and deliver to any address across all 36 Nigerian states — including Abuja, Lagos, Port Harcourt, and Kano. Both UK and Nigerian customs handled in-house. Air or sea — your choice. One point of contact from start to finish.",
    sub:"UK collection · Nigeria delivery", rate:"from £6/kg", accent:"#0437F2",
    img:IMGS.doorToDoor, imgAlt:"R-Zone door-to-door cargo van collecting from UK address for Nigeria delivery",
    points:["Single point of contact UK to Nigeria","UK-wide door collection","Delivery to all 36 Nigerian states","Air or sea — you choose","UK & Nigeria customs both handled in-house","SMS & email notifications throughout"],
    metric:{ val:"1", unit:"contact", label:"end-to-end UK–Nigeria management" },
    airlines:[],
  },
  {
    id:"importation", slug:"/importation-from-nigeria", icon:Package, label:"Import from Nigeria", badge:"Two-Way",
    problemTitle:"Importing goods from Nigeria to the UK?",
    problemBody:"Getting goods out of Nigeria is complex — port clearance, NCS compliance, UK customs, VAT. Without the right partner your goods sit in Lagos for weeks.",
    solutionTitle:"Importation from Nigeria to the UK, Solved.",
    solutionBody:"Weekly air and sea services bringing Nigerian goods to the UK. African foodstuffs, textiles, commercial merchandise — our Lagos team handles collection from anywhere in Nigeria and delivers to your UK door, customs cleared.",
    sub:"Weekly air · Weekly sea · Nigeria to UK", rate:"from £5/kg", accent:"#0818A8",
    img:IMGS.importation, imgAlt:"Nigerian goods prepared for importation to UK with R-Zone Enterprises",
    points:["Weekly air cargo collections from Lagos","Weekly sea departures from Apapa port","African foodstuffs accepted","Full UK customs clearance included","Collection from all 36 Nigerian states","Commercial & personal cargo both welcome"],
    metric:{ val:"Weekly", unit:"departures", label:"Nigeria to UK" },
    airlines:[],
  },
  {
    id:"customs", slug:"/customs-clearance", icon:FileCheck, label:"Customs Clearance", badge:"Specialist",
    problemTitle:"Cargo held at UK or Nigerian customs — again?",
    problemBody:"Incorrect documentation, wrong HS codes, missed compliance checks — customs errors cost businesses thousands in demurrage and delays. UK–Nigeria customs requires specialists who know both systems inside out.",
    solutionTitle:"UK & Nigeria Customs Clearance, Handled.",
    solutionBody:"End-to-end customs brokerage by our in-house team — covering UK HMRC and Nigeria Customs Service (NCS). HS code classification, duty calculation, compliance checks, and all filings. Your cargo moves on time, every time.",
    sub:"UK HMRC & Nigeria NCS", rate:"Included", accent:"#1F51FF",
    img:IMGS.customs, imgAlt:"Customs clearance documentation being processed for UK–Nigeria shipment",
    points:["UK import & export customs clearance (HMRC)","Nigeria Customs Service (NCS) compliant","Accurate HS code classification","Duty & VAT calculation handled","Urgent priority clearance available","HMRC authorised customs agent"],
    metric:{ val:"0", unit:"surprises", label:"transparent customs clearance" },
    airlines:[],
  },
  {
    id:"warehousing", slug:"/warehousing", icon:Warehouse, label:"Warehousing", badge:"UK & Nigeria",
    problemTitle:"No storage solution at the UK or Nigerian end?",
    problemBody:"Without a trusted warehouse partner at both ends of the UK–Nigeria corridor, your stock sits untracked, uninsured, and managed by third parties who do not understand your cargo.",
    solutionTitle:"Secure UK & Nigeria Warehousing.",
    solutionBody:"Monitored storage at our Upminster, Essex (UK) and Lagos (Nigeria) facilities. Pre-consolidation, long-term distribution, or just-in-time despatch — managed by the same team that ships your cargo.",
    sub:"Upminster Essex UK · Lagos Nigeria", rate:"from £25/wk", accent:"#0437F2",
    img:IMGS.warehousing, imgAlt:"Secure R-Zone warehouse in Upminster Essex for UK and Nigeria cargo storage",
    points:["Upminster, Essex UK warehouse facility","Lagos, Nigeria storage hub","24/7 CCTV monitored & fully insured","Flexible short & long-term storage terms","Full inventory management system","Pick, pack & same-day despatch"],
    metric:{ val:"2", unit:"locations", label:"UK & Nigeria warehousing" },
    airlines:[],
  },
  {
    id:"cargo-handling", slug:"/services", icon:Anchor, label:"Cargo Handling", badge:"Specialist",
    problemTitle:"Oversized, hazardous or heavy-lift cargo for Nigeria?",
    problemBody:"Standard couriers will not touch it. Freight forwarders without Nigerian port experience create expensive mistakes. Your project cargo needs a certified specialist team.",
    solutionTitle:"Specialist Port & Cargo Handling — Nigeria.",
    solutionBody:"Port stevedoring, heavy lift, oversized and out-of-gauge cargo at Apapa, Tin Can Island, Onne, and Calabar ports. IATA/IMDG dangerous goods certified. Full compliance from UK origin to Nigerian final placement.",
    sub:"Nigerian port operations · Heavy lift", rate:"POA", accent:"#0818A8",
    img:IMGS.cargo, imgAlt:"Port crane loading specialist out-of-gauge cargo at Nigerian Apapa port",
    points:["Port stevedoring at all major Nigerian ports","Heavy lift & project cargo expertise","Oversized & out-of-gauge cargo (OOG)","IATA/IMDG dangerous goods certified","Third-party independent cargo inspection","Apapa, Tin Can, Onne & Calabar ports"],
    metric:{ val:"IATA", unit:"certified", label:"specialist cargo handling Nigeria" },
    airlines:[],
  },
];

const WHY_RZONE = [
  { icon:Shield,    title:"Fully Insured, IATA-Certified & HMRC-Registered",    accent:"#0818A8", body:"Every R-Zone shipment carries comprehensive cargo insurance. IATA-certified, NCS-compliant, and HMRC-registered — operating to international standards at every stage of the UK–Nigeria corridor." },
  { icon:Users,     title:"Real People. No Bots. No Call Centres.",              accent:"#1F51FF", body:"Our UK-based team answers calls and responds to emails the same day, Mon to Fri. You will never be routed to a call centre, an automated system, or an overseas outsourced team." },
  { icon:Globe,     title:"Both Ends of the Corridor, In-House",                 accent:"#0818A8", body:"Unlike brokers who outsource Nigeria-side operations, R-Zone runs its own Lagos hub. Seamless customs clearance, port handling, and last-mile delivery across all 36 Nigerian states." },
  { icon:Zap,       title:"Weekly Departures — Air & Sea, Every Week",           accent:"#1F51FF", body:"Air freight departs weekly. Sea freight sails weekly. You are never waiting weeks for a vessel. Your UK–Nigeria cargo moves on schedule every week of the year." },
  { icon:Award,     title:"#1 Highest-Rated UK–Nigeria Cargo Company on Google", accent:"#0818A8", body:"100+ five-star Google reviews — organically earned, never incentivised. The most trusted cargo and logistics company between the UK, Nigeria, and across Africa since 2012." },
  { icon:TrendingUp,title:"Transparent Pricing. No Hidden Charges.",             accent:"#1F51FF", body:"R-Zone quotes include customs, handling, and all fees upfront. What you are quoted is what you pay. We have built our 12-year reputation on complete pricing transparency." },
];

const TRUST_STATS = [
  { val:"50,000+", label:"Shipments Delivered",       icon:Package,   sub:"Safely delivered, on time"       },
  { val:"12+",     label:"Years Operating",           icon:Clock,     sub:"Trusted since 2012"              },
  { val:"100+",    label:"Five-Star Google Reviews",  icon:Star,      sub:"Organically earned"              },
  { val:"99%",     label:"Delivery Success Rate",     icon:Shield,    sub:"Industry-leading record"         },
  { val:"36",      label:"Nigerian States Served",    icon:MapPin,    sub:"Full national NG coverage"       },
  { val:"2",       label:"Warehouse Locations",       icon:Warehouse, sub:"Upminster UK & Lagos Nigeria"    },
];

const PROCESS = [
  { num:"01", title:"Tell Us Your UK–Nigeria Logistics Challenge",  body:"Share your cargo details, destination in Nigeria, and timeline. Air, sea, import or export — we identify the right solution and quote the same day.", icon:Briefcase, label:"Free consultation" },
  { num:"02", title:"We Build Your Personalised Solution",          body:"Our UK team produces a transparent, itemised quote — no hidden charges, no guesswork. You know exactly what you are paying and when your cargo moves.", icon:BarChart3, label:"Itemised quote" },
  { num:"03", title:"R-Zone Handles Everything End-to-End",         body:"Collection, export manifests, UK customs, airline or vessel booking, Nigerian customs clearance, and last-mile delivery — your dedicated handler manages every step.", icon:Shield, label:"End-to-end managed" },
  { num:"04", title:"Real-Time Tracking to the Nigerian Door",      body:"Live updates from UK departure to Nigeria delivery. Your team is notified at every milestone — no chasing, no guessing, no calls to a call centre.", icon:MapPin, label:"Live tracking" },
];

const FAQ_ITEMS = [
  { q:"How does R-Zone handle customs clearance between the UK and Nigeria?", a:"R-Zone's in-house customs team handles all UK HMRC and Nigeria Customs Service (NCS) documentation, HS code classification, duty and VAT calculation, and compliance filings — included in all standard shipments. We are an HMRC-authorised customs agent." },
  { q:"Does R-Zone offer weekly sea freight to Nigeria?", a:"Yes. R-Zone operates weekly sea freight sailings from UK ports to Lagos, Nigeria. Both LCL (shared container) and FCL (full container load) options are available. Sea freight transit time from the UK to Nigeria is 4–6 weeks." },
  { q:"Can R-Zone collect cargo from anywhere in the UK?", a:"Yes — R-Zone offers UK-wide door collection for both air and sea freight shipments to Nigeria. Cargo can also be dropped off at our Upminster, Essex consolidation warehouse." },
  { q:"How long does air freight from the UK to Nigeria take?", a:"Air freight from the UK to Nigeria takes 5–10 working days, depending on the destination state and Nigerian customs clearance speed. R-Zone operates weekly air departures from London Heathrow, Gatwick, and Manchester." },
  { q:"Does R-Zone deliver to Abuja, Lagos, and all Nigerian states?", a:"Yes. R-Zone delivers to all 36 Nigerian states including Abuja (FCT), Lagos, Rivers, Kano, Delta, Oyo, Anambra, Enugu, and every other state. Our Lagos-based hub manages last-mile delivery across the country." },
  { q:"What types of cargo does R-Zone ship from the UK to Nigeria?", a:"R-Zone ships general cargo, clothing and textiles, electronics, household goods, foodstuffs, machinery, vehicles, building materials, commercial merchandise, and personal effects. Hazardous goods and oversized cargo are handled by our specialist port team." },
];

const fadeUp = {
  hidden:  { opacity:0, y:32 },
  visible: (d=0) => ({ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1], delay:d } }),
};

function TagPill({ label, dark=false }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-6 ${dark ? "border-[#1F51FF]/30 bg-[#0818A8]/14" : "border-[#0818A8]/20 bg-[#0818A8]/6"}`}>
      <motion.span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dark ? "bg-[#1F51FF]" : "bg-[#0818A8]"}`}
        animate={{ scale:[1,1.8,1], opacity:[1,0.3,1] }} transition={{ duration:2, repeat:Infinity }} aria-hidden="true" />
      <span className={`text-[10px] font-bold tracking-[0.32em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>{label}</span>
    </div>
  );
}

function Hero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true });
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0,500], [0,80]);
  const [activeProblem, setActiveProblem] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveProblem(p => (p+1)%BUSINESS_PROBLEMS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-[#00061a] min-h-[80vh] flex flex-col justify-end overflow-hidden" aria-labelledby="biz-hero-heading">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y:bgY }} aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[500px] bg-[#0818A8]/18 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[-5%] w-[500px] h-[400px] bg-[#1F51FF]/10 rounded-full blur-[120px]" />
      </div>
      <div className="absolute top-0 right-0 w-px h-full opacity-[0.08] pointer-events-none"
        style={{ background:"linear-gradient(to bottom, transparent, #1F51FF 40%, transparent)" }} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#00061a] to-transparent pointer-events-none" aria-hidden="true" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 w-full pt-[120px] pb-16 md:pb-20">
        <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10 -mt-2.5"
          initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ duration:0.4 }}>
          <Link href="/" className="text-white/80 text-[13px] font-medium hover:text-white transition-colors">Home</Link>
          <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
          <span className="text-white text-[13px] font-medium" aria-current="page">Business Solutions</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          <div className="lg:col-span-7">
            <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
              variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } }}>

              {/* Trust badge — #1 claim */}
              <motion.div variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 bg-[#0818A8]/20 border border-[#1F51FF]/25 px-4 py-2 rounded-full mb-4">
                <Award size={13} className="text-[#1F51FF]" aria-hidden="true" />
                <span className="text-white text-[13px] font-bold">Highest-Ranked UK–Nigeria Cargo on Google · 100+ Five-Star Reviews</span>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.02}>
                <div className="inline-flex items-center gap-2.5 border border-[#1F51FF]/30 bg-[#0818A8]/14 px-4 py-1.5 rounded-full mb-6 w-fit">
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-[#1F51FF] flex-shrink-0"
                    animate={{ scale:[1,1.7,1], opacity:[1,0.4,1] }} transition={{ duration:2.2, repeat:Infinity }} aria-hidden="true" />
                  <span className="text-[#1F51FF] text-[13px] font-bold tracking-[0.28em] uppercase">UK–Nigeria Business Logistics Solutions</span>
                </div>
              </motion.div>

              {/* H1 — primary keyword embedded */}
              <motion.h1 id="biz-hero-heading" variants={fadeUp} custom={0.1}
                className="text-white font-black text-[clamp(36px,7vw,84px)] leading-[0.88] tracking-[-0.035em] uppercase mb-7">
                Your UK–Nigeria Cargo.{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#1F51FF]">Our Solution.</span>
                  <motion.span className="absolute -bottom-2 left-0 h-[4px] rounded-full bg-[#1F51FF]" aria-hidden="true"
                    initial={{ width:0 }} animate={inView ? { width:"100%" } : {}} transition={{ duration:0.6, delay:0.7 }} />
                </span>
                <br /><span className="text-white/80">Guaranteed.</span>
              </motion.h1>

              {/* Problem ticker */}
              <motion.div variants={fadeUp} custom={0.18} className="h-[36px] overflow-hidden mb-6"
                aria-live="polite" aria-label="Cargo logistics problems R-Zone solves">
                <AnimatePresence mode="wait">
                  <motion.div key={activeProblem}
                    initial={{ y:24, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:-24, opacity:0 }}
                    transition={{ duration:0.36, ease:[0.22,1,0.36,1] }}
                    className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#1F51FF] flex-shrink-0" aria-hidden="true" />
                    <span className="text-[14px]">
                      <span className="text-white font-semibold">{BUSINESS_PROBLEMS[activeProblem].problem}</span>{" "}
                      <span className="text-[#1F51FF] font-semibold">{BUSINESS_PROBLEMS[activeProblem].solve}</span>
                    </span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* SEO body — keyword-rich */}
              <motion.p variants={fadeUp} custom={0.2}
                className="text-white/80 text-[15px] font-normal leading-relaxed max-w-xl mb-10">
                Cargo delayed at customs. Supply chains stalled. No visibility on your UK-to-Nigeria shipment.
                R-Zone Enterprises solves every UK–Nigeria logistics challenge —
                with our own teams on <strong className="text-white font-semibold">both sides of the corridor</strong> since 2012.
                Air freight, sea freight, door-to-door, customs clearance, warehousing and importation — all under one roof.
              </motion.p>

              <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap gap-3">
                <Link href="/quote"
                  className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.1em] uppercase px-7 py-3.5 rounded-sm transition-all duration-200 shadow-lg shadow-[#0818A8]/30"
                  aria-label="Get a free UK–Nigeria business shipping quote">
                  Solve My Logistics Problem
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
                <a href="https://wa.me/448007720864?text=Hello%2C%20I%27d%20like%20to%20discuss%20UK%20to%20Nigeria%20cargo."
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border border-[#25D366]/30 bg-[#25D366]/08 hover:bg-[#25D366]/14 text-white text-[13px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-sm transition-all duration-200"
                  aria-label="WhatsApp R-Zone for a UK–Nigeria cargo solution">
                  <MessageSquare size={13} className="text-[#25D366]" aria-hidden="true" /> WhatsApp Us
                </a>
                <a href="#solutions"
                  className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.05] hover:bg-white/10 text-white text-[13px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-sm transition-all duration-200"
                  aria-label="View all UK–Nigeria business logistics solutions">
                  See All Solutions
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Quick Facts card */}
          <motion.div className="lg:col-span-5"
            initial={{ opacity:0, x:24 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.75, delay:0.35, ease:[0.25,0.46,0.45,0.94] }}>
            <div className="border border-white/10 bg-white/[0.04] backdrop-blur-sm p-7 space-y-5">
              <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] -mx-7 -mt-7 mb-7" aria-hidden="true" />
              <p className="text-[13px] font-bold tracking-[0.3em] uppercase text-white/80 mb-4">Quick Facts</p>
              {[
                { icon:MapPin,  label:"UK Headquarters",        val:"Upminster, Essex"               },
                { icon:Globe,   label:"Nigeria Hub",             val:"Shagam Interchange, Lagos"     },
                { icon:Clock,   label:"Operating Since",         val:"2012 — 12+ years"               },
                { icon:Package, label:"Shipments Delivered",     val:"50,000+"                        },
                { icon:Star,    label:"Google Reviews",          val:"100 × Five-Star (organically)"  },
                { icon:Shield,  label:"Certification",           val:"IATA · HMRC Authorised"         },
                { icon:Zap,     label:"Weekly Departures",       val:"Air & Sea — every week"         },
                { icon:Globe,   label:"Nigerian States Covered", val:"All 36 + FCT Abuja"             },
              ].map(({ icon:Icon, label, val }) => (
                <div key={label} className="flex items-center justify-between border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2.5">
                    <Icon size={12} className="text-[#1F51FF] flex-shrink-0" aria-hidden="true" />
                    <span className="text-white/80 text-[13px] font-normal">{label}</span>
                  </div>
                  <span className="text-white text-[13px] font-semibold text-right ml-4">{val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SolutionNav() {
  const [active, setActive] = useState(SOLUTIONS[0].id);
  useEffect(() => {
    const obs = [];
    SOLUTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(s.id); }, { rootMargin:"-30% 0px -60% 0px" });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
      role="navigation" aria-label="UK–Nigeria business logistics solutions navigation">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {SOLUTIONS.map(s => {
            const Icon = s.icon; const isActive = active === s.id;
            return (
              <a key={s.id} href={`#${s.id}`}
                aria-label={`${s.label} — UK–Nigeria ${s.label.toLowerCase()} service`}
                className={`flex items-center gap-2 px-4 py-3.5 text-[12px] font-semibold tracking-[0.03em] whitespace-nowrap flex-shrink-0 border-b-2 transition-all duration-150 ${
                  isActive ? "border-[#0818A8] text-[#0818A8]" : "border-transparent text-gray-600 hover:text-[#0818A8] hover:border-gray-300"
                }`}>
                <Icon size={13} aria-hidden="true" />{s.label}
              </a>
            );
          })}
          <div className="ml-auto flex-shrink-0 pl-4">
            <Link href="/quote"
              className="inline-flex items-center gap-1.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11px] font-black tracking-[0.08em] uppercase px-5 py-2 transition-all duration-200 my-2"
              aria-label="Get a free UK–Nigeria shipping quote">
              Free Quote <ArrowRight size={10} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SolutionSection({ sol, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const Icon   = sol.icon;
  const isDark = index % 2 === 1;
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], [-40,40]);

  return (
    <section id={sol.id} ref={ref}
      className={`relative overflow-hidden scroll-mt-[56px] ${isDark ? "bg-[#00061a]" : "bg-white"}`}
      aria-labelledby={`${sol.id}-heading`}
      itemScope itemType="https://schema.org/Service">
      {isDark ? (
        <>
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
            style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
          <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full pointer-events-none"
            style={{ background:`radial-gradient(circle, ${sol.accent}15 0%, transparent 65%)`, transform:"translate(20%,-20%)" }} aria-hidden="true" />
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
          style={{ backgroundImage:"radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize:"44px 44px" }} />
      )}
      <div className={`absolute top-10 ${index%2===0?"right-6 lg:right-16":"left-6 lg:left-16"} font-black pointer-events-none select-none leading-none ${isDark?"text-white/[0.04]":"text-[#0818A8]/[0.05]"}`}
        style={{ fontSize:"clamp(70px,12vw,160px)" }} aria-hidden="true">
        {String(index+1).padStart(2,"0")}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28 lg:py-32">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center ${index%2===1?"lg:grid-flow-col-dense":""}`}>

          {/* Content */}
          <motion.div className={index%2===1?"lg:col-start-2":""} initial="hidden"
            animate={inView?"visible":"hidden"} variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } }}>

            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor:`${sol.accent}18` }} aria-hidden="true">
                <Icon size={21} style={{ color:sol.accent }} />
              </div>
              <span className={`text-[11px] font-bold tracking-[0.22em] uppercase px-3 py-1.5 border ${
                isDark?"border-white/15 text-white/70 bg-white/5":"border-[#0818A8]/20 text-[#0818A8] bg-[#0818A8]/5"
              }`}>{sol.badge}</span>
            </motion.div>

            {/* Problem block */}
            <motion.div variants={fadeUp} custom={0.08}
              className={`mb-7 p-5 border-l-4 ${isDark?"bg-red-500/5 border-red-500/40":"bg-red-50 border-red-400"}`}>
              <div className="flex items-start gap-3">
                <AlertTriangle size={14} className={`flex-shrink-0 mt-0.5 ${isDark?"text-red-400":"text-red-500"}`} aria-hidden="true" />
                <div>
                  <p className={`font-bold text-[11px] mb-1 tracking-[0.15em] uppercase ${isDark?"text-red-400":"text-red-600"}`}>The Problem</p>
                  <p className={`font-black text-[16px] leading-tight mb-2 ${isDark?"text-white":"text-gray-900"}`}>{sol.problemTitle}</p>
                  <p className={`text-[13px] font-light leading-relaxed ${isDark?"text-white/70":"text-gray-700"}`}>{sol.problemBody}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.05} className="flex items-center gap-3 mb-3">
              <motion.div className="h-[2px] rounded-full" style={{ backgroundColor:sol.accent }}
                initial={{ width:0 }} animate={inView?{ width:28 }:{}} transition={{ duration:0.45, delay:0.35 }} aria-hidden="true" />
              <span className={`text-[10px] font-bold tracking-[0.28em] uppercase ${isDark?"text-white/60":"text-gray-500"}`}>R-Zone Solution</span>
            </motion.div>

            {/* H2 — keyword per service */}
            <motion.h2 id={`${sol.id}-heading`} variants={fadeUp} custom={0.1}
              className={`font-black text-[clamp(26px,4.5vw,48px)] leading-[0.92] tracking-[-0.03em] uppercase mb-3 ${isDark?"text-white":"text-gray-900"}`}
              itemProp="name">
              <span className="relative inline-block" style={{ color:sol.accent }}>
                {sol.solutionTitle}
                <motion.span className="absolute -bottom-1 left-0 h-[3px] rounded-full" style={{ backgroundColor:sol.accent }}
                  aria-hidden="true" initial={{ width:0 }} animate={inView?{ width:"100%" }:{}} transition={{ duration:0.55, delay:0.7 }} />
              </span>
            </motion.h2>

            <motion.div variants={fadeUp} custom={0.15} className="flex items-center gap-4 mb-4">
              <span className={`text-[13px] font-semibold ${isDark?"text-white/70":"text-gray-600"}`}>{sol.sub}</span>
              <span className="w-1 h-1 rounded-full bg-gray-400" aria-hidden="true" />
              <span className="text-[13px] font-black" style={{ color:sol.accent }}>{sol.rate}</span>
            </motion.div>

            <motion.p variants={fadeUp} custom={0.2}
              className={`text-[14px] font-light leading-relaxed mb-8 ${isDark?"text-white/70":"text-gray-600"}`}
              itemProp="description">{sol.solutionBody}</motion.p>

            <motion.ul variants={fadeUp} custom={0.25}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8" role="list"
              aria-label={`${sol.label} service features`}>
              {sol.points.map(p => (
                <li key={p} className="flex items-center gap-3">
                  <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-full"
                    style={{ backgroundColor:`${sol.accent}18`, border:`1.5px solid ${sol.accent}30` }} aria-hidden="true">
                    <Check size={9} style={{ color:sol.accent }} />
                  </span>
                  <span className={`text-[13px] font-medium ${isDark?"text-white/75":"text-gray-700"}`}>{p}</span>
                </li>
              ))}
            </motion.ul>

            {sol.airlines.length > 0 && (
              <motion.div variants={fadeUp} custom={0.3}
                className={`flex flex-wrap gap-2 mb-8 pb-8 border-b ${isDark?"border-white/[0.08]":"border-gray-100"}`}>
                <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mr-1 flex-shrink-0 self-center ${isDark?"text-white/50":"text-gray-400"}`}>Airline Partners</span>
                {sol.airlines.map(a => (
                  <span key={a} className={`text-[11.5px] font-semibold px-3 py-1.5 border ${
                    isDark?"border-white/15 text-white/70 bg-white/5":"border-gray-200 text-gray-600 bg-gray-50"
                  }`}>{a}</span>
                ))}
              </motion.div>
            )}

            <motion.div variants={fadeUp} custom={0.35} className="flex flex-wrap gap-3">
              <Link href="/quote"
                className="group inline-flex items-center gap-2 text-[12px] font-black tracking-[0.1em] uppercase px-7 py-3.5 text-white transition-all duration-200 shadow-lg"
                style={{ backgroundColor:sol.accent, boxShadow:`0 8px 28px ${sol.accent}30` }}
                aria-label={`Get a free quote for ${sol.label} UK to Nigeria`}>
                Get a Free Quote
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link href={sol.slug}
                className={`inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 border transition-all duration-200 ${
                  isDark?"border-white/22 text-white/80 hover:border-white/50 hover:text-white":"border-gray-300 text-gray-700 hover:border-[#0818A8] hover:text-[#0818A8]"
                }`}
                aria-label={`Full details about ${sol.label} UK to Nigeria`}>
                Full Details
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div className={`relative ${index%2===1?"lg:col-start-1 lg:row-start-1":""}`}
            initial={{ opacity:0, scale:0.96 }} animate={inView?{ opacity:1, scale:1 }:{}}
            transition={{ duration:0.85, delay:0.25, ease:[0.22,1,0.36,1] }}>
            <div className="relative overflow-hidden aspect-[16/11]">
              <motion.div className="absolute inset-0" style={{ y:imgY }}>
                <Image src={sol.img} alt={sol.imgAlt} fill className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" />
                <div className={`absolute inset-0 ${isDark?"bg-gradient-to-br from-[#00061a]/20 to-transparent":"bg-gradient-to-br from-white/10 to-transparent"}`} aria-hidden="true" />
              </motion.div>
              <motion.div className="absolute bottom-4 left-4 border backdrop-blur-md"
                style={{ borderColor:`${sol.accent}40`, backgroundColor:isDark?"rgba(0,6,26,0.88)":"rgba(255,255,255,0.94)" }}
                initial={{ opacity:0, y:10 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.5, delay:0.8 }}>
                <div className="px-5 py-3">
                  <p className="font-black text-[24px] leading-none tracking-[-0.02em]" style={{ color:sol.accent }}>
                    {sol.metric.val}<span className="text-[13px] font-semibold ml-0.5">{sol.metric.unit}</span>
                  </p>
                  <p className={`text-[11px] font-bold tracking-[0.15em] uppercase mt-0.5 ${isDark?"text-white/60":"text-gray-500"}`}>{sol.metric.label}</p>
                </div>
              </motion.div>
              <div className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background:`linear-gradient(to right, ${sol.accent}, #1F51FF)` }} aria-hidden="true" />
              <motion.div className="absolute top-4 right-4 flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/10 backdrop-blur-sm px-3 py-2"
                initial={{ opacity:0, scale:0.9 }} animate={inView?{ opacity:1, scale:1 }:{}} transition={{ duration:0.4, delay:1.0 }}>
                <CheckCircle2 size={11} className="text-emerald-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-emerald-400 text-[10px] font-bold tracking-[0.12em] uppercase">Problem Solved</span>
              </motion.div>
            </div>
            <div className="absolute -bottom-3 -right-3 left-3 h-[80%] -z-10"
              style={{ backgroundColor:`${sol.accent}18` }} aria-hidden="true" />
          </motion.div>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-px ${isDark?"bg-white/[0.05]":"bg-gray-100"}`} aria-hidden="true" />
    </section>
  );
}

function WhyRZone() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <section ref={ref} className="relative bg-[#00061a] overflow-hidden" aria-labelledby="why-heading">
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#0818A8]/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ duration:0.5 }}>
            <TagPill label="Why Businesses Choose R-Zone for UK–Nigeria Cargo" dark />
          </motion.div>
          <motion.h2 id="why-heading" initial={{ opacity:0, y:16 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.6, delay:0.1 }}
            className="font-black text-[clamp(26px,4.5vw,52px)] text-white leading-[0.92] tracking-[-0.028em] uppercase">
            Why R-Zone Wins{" "}
            <span className="relative inline-block text-[#1F51FF]">
              Every Time.
              <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full" aria-hidden="true"
                initial={{ width:0 }} animate={inView?{ width:"100%" }:{}} transition={{ duration:0.55, delay:0.55 }} />
            </span>
          </motion.h2>
          <motion.p className="text-white/65 text-[14px] font-light mt-4 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ duration:0.5, delay:0.2 }}>
            Other UK–Nigeria freight providers route your cargo through third-party networks and hope for the best.
            R-Zone owns both ends of the corridor — UK and Nigeria — and that changes everything.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_RZONE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title}
                className="group relative border border-white/[0.07] bg-white/[0.03] p-7 hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-300"
                initial={{ opacity:0, y:24 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.6, delay:i*0.09 }}>
                <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor:item.accent }} aria-hidden="true" />
                <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-5"
                  style={{ backgroundColor:`${item.accent}18` }} aria-hidden="true">
                  <Icon size={18} style={{ color:item.accent }} />
                </div>
                <h3 className="text-white font-black text-[15px] tracking-[-0.01em] mb-3">{item.title}</h3>
                <p className="text-white/65 text-[13px] font-light leading-relaxed">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
        <motion.div className="text-center mt-10" initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ duration:0.5, delay:0.5 }}>
          <Link href="/about"
            className="inline-flex items-center gap-2 text-[#1F51FF] hover:text-white text-[13px] font-bold tracking-[0.08em] uppercase transition-colors"
            aria-label="Learn more about R-Zone Enterprises — 12 years of UK–Nigeria logistics">
            About R-Zone — 12 years of UK–Nigeria logistics <ChevronRight size={13} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStats() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <section className="relative overflow-hidden bg-[#0818A8]" aria-labelledby="trust-heading" ref={ref}>
      <div className="absolute inset-0">
        <Image src={IMGS.stats} alt="" fill className="object-cover opacity-10" aria-hidden="true" sizes="100vw" />
        <div className="absolute inset-0 bg-[#0818A8]/80" aria-hidden="true" />
      </div>
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"44px 44px" }} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ duration:0.5 }}>
            <div className="inline-flex items-center gap-2.5 border border-white/25 bg-white/10 px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80" aria-hidden="true" />
              <span className="text-white/80 text-[10px] font-bold tracking-[0.3em] uppercase">R-Zone UK–Nigeria Cargo — By the Numbers</span>
            </div>
          </motion.div>
          <motion.h2 id="trust-heading" initial={{ opacity:0, y:16 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.6, delay:0.1 }}
            className="font-black text-[clamp(26px,4.5vw,50px)] text-white leading-[0.92] tracking-[-0.03em] uppercase">
            The #1 Highest-Rated{" "}
            <span className="text-white/60">UK–Nigeria Cargo Company on Google.</span>
          </motion.h2>
          <motion.p className="text-white/70 text-[14px] font-light mt-4 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ duration:0.5, delay:0.2 }}>
            Trusted by over 10,000 businesses and families shipping between the UK and Nigeria since 2012.
          </motion.p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {TRUST_STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} className="flex flex-col items-center text-center group"
                initial={{ opacity:0, y:20 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.55, delay:i*0.07 }}>
                <div className="w-11 h-11 bg-white/12 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors" aria-hidden="true">
                  <Icon size={17} className="text-white" />
                </div>
                <p className="text-white font-black text-[28px] leading-none tracking-[-0.025em] mb-1">{s.val}</p>
                <p className="text-white/80 text-[10.5px] font-bold tracking-[0.1em] uppercase">{s.label}</p>
                <p className="text-white/60 text-[10.5px] font-light mt-0.5">{s.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowRZoneWorks() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <section ref={ref} className="relative bg-white overflow-hidden" aria-labelledby="how-heading">
      <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
        style={{ backgroundImage:"radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize:"44px 44px" }} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ duration:0.5 }}>
            <TagPill label="How UK–Nigeria Shipping Works with R-Zone" />
          </motion.div>
          <motion.h2 id="how-heading" initial={{ opacity:0, y:16 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.6, delay:0.1 }}
            className="font-black text-[clamp(26px,4.5vw,52px)] text-gray-900 leading-[0.92] tracking-[-0.028em] uppercase">
            How R-Zone{" "}
            <span className="relative inline-block text-[#0818A8]">
              Solves Your Problem.
              <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full" aria-hidden="true"
                initial={{ width:0 }} animate={inView?{ width:"100%" }:{}} transition={{ duration:0.55, delay:0.55 }} />
            </span>
          </motion.h2>
          <motion.p className="text-gray-600 text-[14px] font-light mt-4 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ duration:0.5, delay:0.2 }}>
            Four steps. One UK–Nigeria team. Zero handoffs. Your freight challenge becomes our fully-managed solution.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.num}
                className="relative border border-gray-200 bg-gray-50 p-7 hover:border-[#0818A8]/40 hover:shadow-xl hover:shadow-[#0818A8]/10 transition-all duration-300 group overflow-hidden"
                initial={{ opacity:0, y:24 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.6, delay:i*0.1 }}>
                <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                <div className="flex items-center justify-between mb-5">
                  <span className="font-black text-[52px] text-[#0818A8]/8 leading-none tracking-[-0.02em]" aria-hidden="true">{step.num}</span>
                  <div className="w-11 h-11 bg-[#0818A8]/8 group-hover:bg-[#0818A8]/15 flex items-center justify-center transition-colors" aria-hidden="true">
                    <Icon size={18} className="text-[#0818A8]" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#0818A8]/8 px-2.5 py-1 mb-4">
                  <span className="text-[#0818A8] text-[10px] font-bold tracking-[0.18em] uppercase">{step.label}</span>
                </div>
                <h3 className="text-gray-900 font-black text-[15.5px] tracking-[-0.01em] mb-3">{step.title}</h3>
                <p className="text-gray-600 text-[13px] font-light leading-relaxed">{step.body}</p>
                {i < PROCESS.length-1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 z-10 w-8 h-px bg-gradient-to-r from-gray-300 to-gray-200" aria-hidden="true" />
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link href="/quote"
            className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.09em] uppercase px-8 py-3.5 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
            aria-label="Get your free UK–Nigeria cargo quote from R-Zone">
            Get Your Free Quote <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <section ref={ref} aria-labelledby="faq-heading" className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
        style={{ backgroundImage:"radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize:"44px 44px" }} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <motion.div initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ duration:0.5 }}>
              <TagPill label="Common Questions About UK–Nigeria Shipping" />
            </motion.div>
            <motion.h2 id="faq-heading" initial={{ opacity:0, y:16 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.6, delay:0.1 }}
              className="font-black text-[clamp(24px,4vw,42px)] text-gray-900 leading-[0.92] tracking-[-0.025em] uppercase mb-4">
              UK–Nigeria Cargo{" "}<span className="text-[#0818A8]">FAQ</span>
            </motion.h2>
            <motion.p className="text-gray-600 text-[14px] font-light leading-relaxed"
              initial={{ opacity:0 }} animate={inView?{ opacity:1 }:{}} transition={{ duration:0.5, delay:0.2 }}>
              Common questions about shipping cargo between the UK and Nigeria.
              Can&apos;t find your answer?{" "}
              <Link href="/contact" className="text-[#0818A8] hover:text-[#0437F2] underline underline-offset-2 font-semibold transition-colors">Contact our team</Link>.
            </motion.p>
          </div>
          <div className="space-y-2" itemScope itemType="https://schema.org/FAQPage">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={i} className="border border-gray-200 bg-gray-50 overflow-hidden"
                initial={{ opacity:0, y:12 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.45, delay:i*0.06 }}
                itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <button type="button" onClick={() => setOpen(open===i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-100 transition-all duration-200"
                  aria-expanded={open===i} aria-controls={`faq-ans-${i}`}>
                  <span className="text-gray-900 font-bold text-[14px] leading-snug" itemProp="name">{item.q}</span>
                  <ChevronRight size={14} className={`text-[#0818A8] flex-shrink-0 transition-transform duration-200 ${open===i?"rotate-90":""}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {open===i && (
                    <motion.div id={`faq-ans-${i}`}
                      initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.25, ease:[0.25,0.46,0.45,0.94] }} className="overflow-hidden"
                      itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <div className="px-5 pb-5 pt-1 border-t border-gray-200">
                        <p className="text-gray-600 text-[13.5px] font-normal leading-relaxed" itemProp="text">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-40px" });
  return (
    <section ref={ref} className="relative bg-[#00061a] overflow-hidden"
      aria-label="Contact R-Zone — UK–Nigeria cargo and logistics specialists">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background:"radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.28) 0%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/50 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity:0, y:20 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.65 }}>
            <TagPill label="Speak to Our UK–Nigeria Logistics Team" dark />
            <h2 className="font-black text-[clamp(30px,5.5vw,60px)] text-white leading-[0.9] tracking-[-0.03em] uppercase mb-5">
              Ready to Solve<br /><span className="text-[#1F51FF]">Your UK–Nigeria Logistics Problem?</span>
            </h2>
            <p className="text-white/65 text-[15px] font-light leading-relaxed max-w-lg mb-8">
              Our UK-based team responds the same day — no call centres, no automated replies.
              Real cargo experts who know the UK–Nigeria corridor inside out. Air freight, sea freight, or door-to-door — we solve it.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/quote"
                className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12.5px] font-black tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200 shadow-2xl shadow-[#0818A8]/40"
                aria-label="Get a free UK–Nigeria business cargo quote from R-Zone">
                Get a Free Quote
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a href="tel:+448007720864"
                className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 text-white/80 hover:text-white text-[12.5px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-200"
                aria-label="Call R-Zone Enterprises: +44 800 772 0864">
                <Phone size={13} aria-hidden="true" /> +44 800 772 0864
              </a>
              <a href="https://wa.me/448007720864?text=Hello%2C%20I%20need%20help%20with%20UK%20to%20Nigeria%20cargo."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-[#25D366]/30 bg-[#25D366]/08 hover:bg-[#25D366]/14 text-white text-[12.5px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-200"
                aria-label="WhatsApp R-Zone Enterprises for UK–Nigeria cargo">
                <MessageSquare size={13} className="text-[#25D366]" aria-hidden="true" /> WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              {["Free Consultation","Same-Day Response","No Hidden Fees","IATA Certified","Weekly UK–Nigeria Departures"].map(t => (
                <span key={t} className="flex items-center gap-2 text-white/65 text-[12px] font-light">
                  <Check size={12} className="text-[#1F51FF]" aria-hidden="true" /> {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-3"
            initial={{ opacity:0, x:20 }} animate={inView?{ opacity:1, x:0 }:{}} transition={{ duration:0.7, delay:0.3 }}>
            {SOLUTIONS.map((sol, i) => {
              const Icon = sol.icon;
              return (
                <motion.a key={sol.id} href={`#${sol.id}`}
                  className="group border border-white/[0.07] bg-white/[0.04] p-5 hover:border-white/[0.18] hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden"
                  initial={{ opacity:0, y:12 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.45, delay:0.4+i*0.06 }}
                  aria-label={`View ${sol.label} — UK to Nigeria`}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-400"
                    style={{ backgroundColor:sol.accent }} aria-hidden="true" />
                  <Icon size={16} style={{ color:sol.accent }} className="mb-3" aria-hidden="true" />
                  <p className="text-white/85 font-bold text-[13px] mb-0.5">{sol.label}</p>
                  <p className="text-white/50 text-[11px] font-light">{sol.rate}</p>
                  <ArrowRight size={12} className="text-white/25 group-hover:text-white/70 mt-3 transition-colors" aria-hidden="true" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function BusinessSolutionsClient() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@graph":[
          { "@type":"BreadcrumbList", "itemListElement":[
            { "@type":"ListItem","position":1,"name":"Home","item":"https://r-zoneenterprises.com" },
            { "@type":"ListItem","position":2,"name":"Business Solutions","item":"https://r-zoneenterprises.com/business-solutions" },
          ]},
          {
            "@type":"LocalBusiness","@id":"https://r-zoneenterprises.com/#business",
            "name":"R-Zone Enterprises",
            "description":"The highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — 100+ five-star reviews organically earned. Air freight from £5/kg, sea freight from £3/kg, door-to-door delivery to all 36 Nigerian states. 12+ years trusted by businesses and families.",
            "url":"https://r-zoneenterprises.com","telephone":"+448007720864","email":"info@r-zoneenterprises.com",
            "address":{ "@type":"PostalAddress","addressLocality":"Upminster","addressRegion":"Essex","addressCountry":"GB" },
            "areaServed":["United Kingdom","Nigeria"],
            "aggregateRating":{ "@type":"AggregateRating","ratingValue":"5","reviewCount":"100","bestRating":"5" },
          },
          {
            "@type":"ItemList",
            "name":"R-Zone Enterprises — UK–Nigeria Cargo & Logistics Services",
            "url":"https://r-zoneenterprises.com/business-solutions",
            "numberOfItems":SOLUTIONS.length,
            "itemListElement":SOLUTIONS.map((s,i) => ({
              "@type":"ListItem","position":i+1,
              "item":{ "@type":"Service","name":s.label,"description":s.solutionBody,
                "url":`https://r-zoneenterprises.com${s.slug}`,
                "provider":{ "@type":"Organization","name":"R-Zone Enterprises","@id":"https://r-zoneenterprises.com/#business" },
                "offers":{ "@type":"Offer","priceCurrency":"GBP","description":s.rate },
                "areaServed":["United Kingdom","Nigeria"],
              },
            })),
          },
          {
            "@type":"FAQPage",
            "mainEntity":FAQ_ITEMS.map(item => ({
              "@type":"Question","name":item.q,
              "acceptedAnswer":{ "@type":"Answer","text":item.a },
            })),
          },
        ],
      })}} />

      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] w-full`}>
        <Hero />
        <SolutionNav />
        <main id="solutions" aria-label="UK–Nigeria business logistics solutions">
          {SOLUTIONS.map((sol, i) => <SolutionSection key={sol.id} sol={sol} index={i} />)}
        </main>
        <WhyRZone />
        <TrustStats />
        <HowRZoneWorks />
        <FAQSection />
        <BusinessCTA />
      </div>
    </>
  );
}