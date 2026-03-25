"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search, Phone, Mail, MessageSquare, MapPin,
  ChevronRight, ChevronDown, ArrowRight, Check,
  CheckCircle, Package, Plane, Ship, Truck,
  FileCheck, Warehouse, Clock, Shield,
  AlertCircle, Loader2, X, Star,
  LifeBuoy, BookOpen, Zap, HelpCircle,
  Globe, ExternalLink,
  TrendingUp, Hash,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── WhatsApp icon ─────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Instagram icon ─────────────────────────────────────────────────────────────
function InstagramIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FAQ_CATEGORIES = [
  {
    id: "shipping",
    icon: Package,
    label: "Shipping & Booking",
    color: "#0818A8",
    faqs: [
      { q: "How do I book a shipment with R-Zone?", a: "You can book online via our Get a Quote form, call us on +44 800 772 0864, email info@r-zoneenterprises.com, or visit our Upminster, Essex warehouse in person. We confirm all bookings in writing with a unique reference number." },
      { q: "What items can I ship to Nigeria?", a: "We accept most general cargo including clothing, electronics, foodstuffs, household goods, documents, and personal effects. Some items require prior approval (dangerous goods, pharmaceuticals, high-value items). Contact us to check a specific item." },
      { q: "What is the minimum weight for a shipment?", a: "There is no strict minimum, but sea freight has a minimum charge equivalent to 5kg. Air freight has no minimum weight restriction. Contact us for small parcel or document-only shipments." },
      { q: "Can I ship foodstuffs to Nigeria?", a: "Yes — we accept most food items including African foodstuffs. Some items require NAFDAC compliance documentation upon arrival in Nigeria. We advise on specific food categories on request." },
      { q: "How far in advance do I need to book sea freight?", a: "We recommend booking at least 5 working days before the published cut-off date to guarantee space on the weekly sailing. The cut-off is typically 5 days before the vessel departure date." },
      { q: "Can I change my delivery address after booking?", a: "Yes, in most cases. Contact us as early as possible — address changes before customs filing are straightforward. Changes after customs filing may incur a small administration fee." },
    ],
  },
  {
    id: "tracking",
    icon: Zap,
    label: "Tracking & Updates",
    color: "#1F51FF",
    faqs: [
      { q: "How do I track my shipment?", a: "Use our Track Shipment tool at r-zoneenterprises.com/track with your booking reference number (format: RZC-XXXX-XXXXX). You can also call +44 800 772 0864 or WhatsApp +44 7915 647 119 for a live update." },
      { q: "When will I receive my tracking number?", a: "Air freight tracking numbers are issued within 24 hours of cargo acceptance. Sea freight booking references are issued at booking confirmation, with vessel tracking details available after the sailing date." },
      { q: "My tracking hasn't updated in several days — what do I do?", a: "Occasional delays in tracking updates can occur, particularly during customs processing. If your tracking hasn't updated in more than 5 working days (air) or 2 weeks (sea), contact us and we'll investigate directly with the carrier." },
      { q: "How will I know when my cargo has arrived in Nigeria?", a: "We send SMS and email notifications at key milestones: departure, arrival at Lagos, customs clearance, and delivery attempt. If you haven't received notifications, check your contact details are up to date on your booking." },
      { q: "Can the recipient in Nigeria track the shipment?", a: "Yes — share your booking reference with the recipient and they can use our tracking tool or contact our Lagos team directly. We can also set up notifications to a Nigerian phone number on request." },
    ],
  },
  {
    id: "customs",
    icon: FileCheck,
    label: "Customs & Duties",
    color: "#0437F2",
    faqs: [
      { q: "Do I need to pay customs duty in Nigeria?", a: "Import duties may apply depending on the type and value of your goods. Duties are levied by the Nigeria Customs Service (NCS) and are payable by the recipient in Nigeria. We calculate expected duties and inform you at booking." },
      { q: "What documents do I need for customs?", a: "Typically: a completed packing list, commercial invoice (for business goods), and the recipient's address in Nigeria. We provide guidance on additional documents (NAFDAC, SON certificates) based on your cargo type." },
      { q: "Why is my cargo held at customs?", a: "Common reasons include: missing or incorrect documentation, prohibited item queries, undervalued declarations, or random inspection. Contact us immediately if you receive a customs hold notification — we handle clearance on your behalf." },
      { q: "Can R-Zone handle customs clearance for me?", a: "Yes — customs clearance is included in all our shipments. Our in-house customs team handles UK export declarations and our Lagos team manages Nigeria Customs Service (NCS) clearance." },
      { q: "How long does customs clearance take in Nigeria?", a: "Standard clearance takes 2–5 working days at Apapa or Tin Can Island ports. We apply for expedited clearance where available. Delays can occur during public holidays, port congestion, or if documentation is incomplete." },
      { q: "Can I declare a lower value to avoid customs duty?", a: "No — misdeclaration is a criminal offence in both the UK and Nigeria. R-Zone Enterprises will not file inaccurate customs declarations. We can advise on legitimate duty relief schemes." },
    ],
  },
  {
    id: "delivery",
    icon: Truck,
    label: "Delivery & Collection",
    color: "#0818A8",
    faqs: [
      { q: "Do you collect from my home in the UK?", a: "Yes — we offer door collection across the entire UK for an additional fee based on your location. Our Upminster, Essex warehouse also accepts drop-offs Mon–Fri 10AM–6PM and Sat 11AM–2PM." },
      { q: "How long does door delivery in Nigeria take after customs clearance?", a: "Lagos and surrounding areas: 1–3 working days. Other southern states: 3–5 working days. Northern states: 5–7 working days. We use our own delivery network in Lagos and trusted partners nationally." },
      { q: "What happens if the recipient isn't home for delivery?", a: "Our Nigeria delivery team will call the recipient ahead of delivery. If they are unavailable, the cargo is held at our Lagos facility for up to 5 working days at no charge. After 5 days, storage charges may apply." },
      { q: "Can I collect my cargo from your Lagos warehouse?", a: "Yes — recipients can collect from our Shagam Interchange, Lagos facility. Bring a valid ID and your booking reference. Call our Lagos team on arrival to arrange assisted collection." },
      { q: "Do you deliver to all 36 Nigerian states?", a: "Yes — we deliver to all 36 states and the FCT Abuja. Transit times vary by state. Some remote areas require the recipient to collect from a nearby town; our team advises at booking." },
    ],
  },
  {
    id: "payments",
    icon: Shield,
    label: "Payments & Pricing",
    color: "#1F51FF",
    faqs: [
      { q: "What payment methods do you accept?", a: "Bank transfer (BACS/Faster Payments), debit/credit card, and PayPal. Business accounts with regular shipments can apply for 14 or 30-day credit terms. We do not accept cash." },
      { q: "When do I need to pay?", a: "Individual customers: full payment is required before cargo is accepted. Business account customers: payment is due within the agreed credit period after invoice date." },
      { q: "Can I get a refund if I cancel my shipment?", a: "Cancellations more than 5 working days before sailing/dispatch: full refund minus £25 admin fee. 2–5 days before: 50% refund. Within 2 days or cargo received: no refund. See our Terms of Service for full details." },
      { q: "How is the shipping cost calculated?", a: "Charges are based on the greater of actual weight or volumetric weight. Volumetric weight = (Length × Width × Height in cm) ÷ 5,000 for air freight, ÷ 1,000 for sea freight." },
      { q: "Are there any hidden fees?", a: "No. Our quotes include customs clearance, standard packaging, and standard delivery. Additional charges (door collection, out-of-state delivery, insurance, packing service) are quoted separately and transparently at booking." },
    ],
  },
  {
    id: "claims",
    icon: AlertCircle,
    label: "Claims & Complaints",
    color: "#0437F2",
    faqs: [
      { q: "My cargo arrived damaged — what do I do?", a: "Report damage within 7 days of delivery to claims@r-zoneenterprises.com. Include your booking reference, photos of the damage, photos of the packaging, and an estimate of the value affected. We respond within 2 working days." },
      { q: "My cargo hasn't arrived — what do I do?", a: "If your cargo hasn't arrived within 14 days of the expected delivery date, contact us immediately. We will investigate with the carrier and our Nigeria team. Cargo missing for more than 30 days is classified as lost and a claim can be submitted." },
      { q: "How do I make a formal complaint?", a: "Email complaints@r-zoneenterprises.com with your booking reference, a detailed description of your concern, and what resolution you're looking for. We acknowledge within 2 working days and aim to resolve within 14." },
      { q: "What compensation can I claim for lost cargo?", a: "Air freight liability is capped at 19 SDR/kg under the Montreal Convention. Sea freight liability is capped under the Hague-Visby Rules. Cargo insurance significantly increases your compensation entitlement — we strongly recommend it for all shipments." },
      { q: "How do I claim on my cargo insurance?", a: "Contact claims@r-zoneenterprises.com with your booking reference and insurance certificate number. We will assist you with the insurer's claims process. Insurance claims should be submitted within 30 days of the incident." },
    ],
  },
];

const CONTACT_CHANNELS = [
  {
    icon: Phone,
    title: "Call Us — UK",
    desc: "Speak directly to our UK team",
    value: "+44 (0) 800 772 0864",
    sub: "Free to call · Mon–Fri 10AM–6PM · Sat 11AM–2PM",
    href: "tel:+448007720864",
    action: "Call Now",
    color: "#0818A8",
    badge: "Fastest",
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    desc: "Message us directly",
    value: "+44 7915 647 119",
    sub: "Typical response within 1 hour",
    href: "https://wa.me/447915647119",
    action: "Chat Now",
    color: "#25D366",
    badge: "Popular",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Detailed enquiries & documents",
    value: "info@r-zoneenterprises.com",
    sub: "Same-day response on weekdays",
    href: "mailto:info@r-zoneenterprises.com",
    action: "Send Email",
    color: "#0437F2",
    badge: null,
  },
  {
    icon: InstagramIcon,
    title: "Instagram DM",
    desc: "Quick questions & updates",
    value: "@rzoneenterprises",
    sub: "Active daily — Mon to Sat",
    href: "https://instagram.com/rzoneenterprises",
    action: "Open Instagram",
    color: "#0818A8",
    badge: null,
  },
];

const STATUS_ITEMS = [
  { label: "UK Air Departures",    status: "operational", detail: "Mon · Wed · Fri — on schedule"          },
  { label: "Sea Freight Sailings", status: "operational", detail: "Weekly sailings — spaces available"      },
  { label: "Nigeria Deliveries",   status: "operational", detail: "Lagos deliveries running normally"       },
  { label: "Customs Clearance",    status: "delayed",     detail: "Minor delays at Apapa — +1–2 days est." },
  { label: "UK Customer Support",  status: "operational", detail: "Lines open · +44 800 772 0864"          },
  { label: "Online Tracking",      status: "operational", detail: "System fully operational"               },
];

const POPULAR_ARTICLES = [
  { title: "How to pack your cargo correctly",              cat: "Packing Guide", href: "#" },
  { title: "Understanding Nigerian customs duties",         cat: "Customs",       href: "#" },
  { title: "What the tracking statuses mean",               cat: "Tracking",      href: "#" },
  { title: "Air freight vs sea freight — which to choose",  cat: "Shipping",      href: "#" },
  { title: "How to avoid cargo delays at Apapa port",      cat: "Delivery",      href: "#" },
  { title: "Making a claim for lost or damaged cargo",      cat: "Claims",        href: "#" },
];

const GUIDES = [
  { icon: Package,   title: "First-Time Shipper Guide",    desc: "Everything you need to know to send your first shipment", href: "#", time: "5 min read" },
  { icon: FileCheck, title: "Customs Documentation Guide", desc: "What documents you need and why they matter",            href: "#", time: "4 min read" },
  { icon: Ship,      title: "Sea Freight Booking Guide",   desc: "How to book, cut-off dates, and what to expect",         href: "#", time: "6 min read" },
  { icon: Plane,     title: "Air Freight FAQ",              desc: "Transit times, restrictions, and airline partners",     href: "#", time: "3 min read" },
];

const MOCK_SHIPMENTS = {
  "RZC-2024-00847": {
    status: "In Transit",
    origin: "London, UK", destination: "Lagos, Nigeria",
    service: "Air Freight", weight: "18 kg",
    timeline: [
      { label: "Booked",              date: "02 Oct", time: "14:32", done: true  },
      { label: "Cargo Received",      date: "04 Oct", time: "09:15", done: true  },
      { label: "Departed LHR",        date: "06 Oct", time: "21:45", done: true  },
      { label: "Arrived Lagos (LOS)", date: "08 Oct", time: "06:30", done: true  },
      { label: "Customs Clearance",   date: "09 Oct", time: "—",     done: false, active: true },
      { label: "Out for Delivery",    date: "Expected 11 Oct", time: "—", done: false },
      { label: "Delivered",           date: "—",      time: "—",     done: false },
    ],
  },
  "RZC-2024-00612": {
    status: "Delivered",
    origin: "Manchester, UK", destination: "Abuja, Nigeria",
    service: "Air Freight", weight: "6 kg",
    timeline: [
      { label: "Booked",              date: "12 Sep", time: "11:00", done: true },
      { label: "Cargo Received",      date: "14 Sep", time: "10:22", done: true },
      { label: "Departed MAN",        date: "15 Sep", time: "18:15", done: true },
      { label: "Arrived Lagos (LOS)", date: "17 Sep", time: "07:10", done: true },
      { label: "Customs Cleared",     date: "18 Sep", time: "14:45", done: true },
      { label: "Out for Delivery",    date: "19 Sep", time: "08:00", done: true },
      { label: "Delivered",           date: "19 Sep", time: "15:30", done: true },
    ],
  },
};

// ─── Animation ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

// ─── Tag Pill ─────────────────────────────────────────────────────────────────
function TagPill({ label, dark = false }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-5 ${
      dark ? "border-[#1F51FF]/30 bg-[#0818A8]/14" : "border-[#0818A8]/20 bg-[#0818A8]/6"
    }`}>
      <motion.span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dark ? "bg-[#1F51FF]" : "bg-[#0818A8]"}`}
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      />
      <span className={`text-[13px] font-bold tracking-[0.3em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>
        {label}
      </span>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ faq, dark = false }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b last:border-0 ${dark ? "border-white/[0.07]" : "border-gray-100"}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
        aria-expanded={open}
      >
        <span className={`text-[13.5px] font-semibold leading-snug transition-colors duration-150 ${
          dark
            ? open ? "text-white" : "text-white/80 group-hover:text-white"
            : open ? "text-[#0818A8]" : "text-gray-800 group-hover:text-[#0818A8]"
        }`}>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <ChevronDown size={15} className={
            dark
              ? open ? "text-[#1F51FF]" : "text-white/80"
              : open ? "text-[#0818A8]" : "text-gray-800"
          } />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className={`text-[13.5px] font-normal leading-relaxed pb-5 pr-8 ${dark ? "text-white/80" : "text-gray-800"}`}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════
function Hero({ onSearch, searchQuery, setSearchQuery }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const handleKey = (e) => { if (e.key === "Enter") onSearch(); };

  return (
    <section
      className="relative bg-[#00061a] overflow-hidden hero-section"
      aria-labelledby="support-hero-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }}
      />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-15%] left-[10%] w-[700px] h-[500px] bg-[#0818A8]/18 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[400px] bg-[#1F51FF]/10 rounded-full blur-[130px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pt-[100px] pb-16 md:pb-20">

        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="text-white/80 text-[13px] font-medium hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={11} className="text-white/80" aria-hidden="true" />
          <span className="text-white text-[13px] font-medium" aria-current="page">Support</span>
        </motion.nav>

        <div className="text-center max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="Help Centre" dark />
          </motion.div>

          <motion.h1
            id="support-hero-heading"
            className="font-black text-[clamp(34px,6vw,68px)] text-white leading-[0.88] tracking-[-0.035em] uppercase mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            How Can We<br />
            <span className="relative inline-block text-[#1F51FF]">
              Help You?
              <motion.span
                className="absolute -bottom-2 left-0 h-[4px] bg-[#1F51FF] rounded-full"
                aria-hidden="true"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-white/80 text-[15px] font-normal leading-relaxed mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22 }}
          >
            Search our help articles, track your shipment, or get directly in touch
            with our UK-based team. The highest-rated cargo company between the UK,
            Nigeria, and across Africa.
          </motion.p>

          {/* Search bar */}
          <motion.div
            className="relative max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
            <div className="relative">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search — e.g. 'track shipment', 'customs duty', 'damaged cargo'…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleKey}
                className="w-full bg-white/[0.08] border border-white/[0.15] text-white text-[14px] font-normal placeholder-white/60 pl-12 pr-[120px] py-4 outline-none focus:border-[#1F51FF]/60 focus:bg-white/[0.12] transition-all duration-200"
                aria-label="Search support articles"
              />
              <button
                onClick={onSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-5 py-2 transition-all duration-200"
                aria-label="Search"
              >
                Search
              </button>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["Track shipment", "Customs duty", "Booking help", "Make a claim", "Delivery times"].map(t => (
                <button
                  key={t}
                  onClick={() => { setSearchQuery(t); onSearch(t); }}
                  className="text-[13px] font-medium text-white/80 hover:text-white border border-white/[0.15] hover:border-white/30 px-3 py-1.5 transition-all duration-150 bg-white/[0.03] hover:bg-white/[0.07]"
                  aria-label={`Search for "${t}"`}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Quick action cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              { icon: Hash,     label: "Track Shipment", desc: "Enter your reference", href: "#track",   color: "#0818A8" },
              { icon: BookOpen, label: "FAQs",           desc: "Common questions",     href: "#faqs",    color: "#1F51FF" },
              { icon: Phone,    label: "Contact Us",     desc: "+44 800 772 0864",     href: "#contact", color: "#0437F2" },
            ].map(item => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 border border-white/[0.08] bg-white/[0.05] hover:border-white/[0.2] hover:bg-white/[0.09] p-4 transition-all duration-200 relative overflow-hidden"
                  aria-label={item.label}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-400"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}20` }}
                    aria-hidden="true"
                  >
                    <Icon size={15} style={{ color: item.color }} />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-[13px] leading-tight">{item.label}</p>
                    <p className="text-white/80 text-[13px] font-normal">{item.desc}</p>
                  </div>
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SYSTEM STATUS
// ═══════════════════════════════════════════════════════════════════════════════
function SystemStatus() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const hasIssue = STATUS_ITEMS.some(s => s.status !== "operational");

  return (
    <div
      ref={ref}
      className={`border-b ${hasIssue ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"}`}
      role="region"
      aria-label="Service status"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${hasIssue ? "bg-amber-500" : "bg-emerald-500"}`}
              aria-hidden="true"
            />
            <span className={`text-[13px] font-bold ${hasIssue ? "text-amber-800" : "text-emerald-800"}`}>
              {hasIssue ? "Minor Disruption" : "All Systems Operational"}
            </span>
          </div>
          <div className="h-px bg-gray-300 flex-1 hidden sm:block" aria-hidden="true" />
          <div className="flex flex-wrap gap-3">
            {STATUS_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.05 }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    item.status === "operational" ? "bg-emerald-500"
                    : item.status === "delayed" ? "bg-amber-500"
                    : "bg-red-500"
                  }`}
                  aria-hidden="true"
                />
                <span className="text-[13px] font-medium text-gray-800">{item.label}</span>
              </motion.div>
            ))}
          </div>
          <a
            href="#"
            className="text-[13px] font-semibold text-[#0818A8] hover:text-[#0437F2] transition-colors flex-shrink-0 flex items-center gap-1 whitespace-nowrap"
            aria-label="View full system status"
          >
            Full Status <ExternalLink size={9} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRACK WIDGET
// ═══════════════════════════════════════════════════════════════════════════════
function TrackWidget() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [trackInput, setTrackInput]   = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackStatus, setTrackStatus] = useState("idle");

  const handleTrack = async () => {
    if (!trackInput.trim()) return;
    setTrackStatus("loading");
    await new Promise(r => setTimeout(r, 900));
    const ref = trackInput.trim().toUpperCase();
    if (MOCK_SHIPMENTS[ref]) {
      setTrackResult(MOCK_SHIPMENTS[ref]);
      setTrackStatus("found");
    } else {
      setTrackResult(null);
      setTrackStatus("notfound");
    }
  };

  const statusColors = {
    "In Transit": "bg-amber-50 text-amber-700 border-amber-200",
    "Delivered":  "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <section
      id="track"
      ref={ref}
      className="relative bg-white scroll-mt-20 overflow-hidden"
      aria-labelledby="track-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <TagPill label="Real-Time Tracking" />
            <h2
              id="track-heading"
              className="font-black text-[clamp(24px,4vw,42px)] text-gray-900 leading-[0.92] tracking-[-0.025em] uppercase mb-4"
            >
              Track Your<br />
              <span className="relative inline-block text-[#0818A8]">
                Shipment.
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full"
                  aria-hidden="true"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 0.55, delay: 0.5 }}
                />
              </span>
            </h2>
            <p className="text-gray-800 text-[14px] font-normal leading-relaxed mb-7">
              Enter your R-Zone booking reference to see exactly where your cargo is right now.
              Your reference looks like:{" "}
              <code className="text-gray-900 font-semibold bg-gray-100 px-2 py-0.5 text-[13px]">
                RZC-2024-00847
              </code>
            </p>

            {/* Track input */}
            <div className="flex gap-0 mb-4">
              <div className="relative flex-1">
                <Hash size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="RZC-XXXX-XXXXX"
                  value={trackInput}
                  onChange={e => setTrackInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleTrack()}
                  className="w-full border border-gray-300 border-r-0 text-gray-900 text-[14px] font-mono placeholder-gray-800 pl-10 pr-4 py-3.5 outline-none focus:border-[#0818A8] transition-all duration-200 bg-white"
                  aria-label="Enter booking reference"
                />
              </div>
              <button
                onClick={handleTrack}
                disabled={trackStatus === "loading"}
                className="flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] disabled:opacity-60 text-white text-[13px] font-black tracking-[0.08em] uppercase px-6 py-3.5 transition-all duration-200 flex-shrink-0"
                aria-label="Track shipment"
              >
                {trackStatus === "loading"
                  ? <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                  : <><Zap size={13} aria-hidden="true" /> Track</>
                }
              </button>
            </div>

            {/* Demo hints */}
            <div className="flex flex-wrap gap-2">
              <span className="text-[13px] text-gray-800 font-normal flex-shrink-0 self-center">Try:</span>
              {Object.keys(MOCK_SHIPMENTS).map(ref => (
                <button
                  key={ref}
                  onClick={() => setTrackInput(ref)}
                  className="text-[13px] font-semibold text-[#0818A8] border border-[#0818A8]/20 bg-[#0818A8]/5 hover:bg-[#0818A8]/10 px-2.5 py-1 transition-colors"
                  aria-label={`Use sample tracking number ${ref}`}
                >
                  {ref}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — tracking result */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">

              {trackStatus === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border border-gray-200 bg-gray-50 p-8 text-center"
                >
                  <div className="w-14 h-14 bg-[#0818A8]/8 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                    <Package size={24} className="text-[#0818A8]" />
                  </div>
                  <p className="text-gray-800 font-bold text-[16px] mb-2">Enter Your Reference</p>
                  <p className="text-gray-800 text-[13px] font-normal">
                    Your booking reference is in your confirmation email or text message from R-Zone.
                  </p>
                </motion.div>
              )}

              {trackStatus === "notfound" && (
                <motion.div
                  key="notfound"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="border border-red-200 bg-red-50 p-8 text-center"
                >
                  <AlertCircle size={32} className="text-red-400 mx-auto mb-4" aria-hidden="true" />
                  <p className="text-red-800 font-bold text-[16px] mb-2">Reference Not Found</p>
                  <p className="text-red-800 text-[13px] font-normal mb-5">
                    We couldn&apos;t find a shipment with that reference. Please check the format and try again.
                  </p>
                  <a
                    href="tel:+448007720864"
                    className="inline-flex items-center gap-2 bg-[#0818A8] text-white text-[13px] font-black tracking-[0.08em] uppercase px-5 py-2.5 hover:bg-[#0437F2] transition-colors"
                    aria-label="Call R-Zone for help"
                  >
                    <Phone size={11} aria-hidden="true" /> Call for Help
                  </a>
                </motion.div>
              )}

              {trackStatus === "found" && trackResult && (
                <motion.div
                  key="found"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border border-gray-200 bg-white overflow-hidden"
                >
                  <div className="h-[3px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <p className="text-[13px] font-bold tracking-[0.25em] uppercase text-gray-800 mb-1">Booking Reference</p>
                        <p className="font-mono font-bold text-[15px] text-gray-900">{trackInput.trim().toUpperCase()}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 border text-[13px] font-bold rounded-full ${statusColors[trackResult.status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${trackResult.status === "Delivered" ? "bg-emerald-500" : "bg-amber-500"}`} aria-hidden="true" />
                        {trackResult.status}
                      </span>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-3 border border-gray-100 bg-gray-50 px-4 py-3 mb-6">
                      <div className="text-center flex-shrink-0">
                        <p className="text-[13px] font-bold tracking-[0.15em] uppercase text-gray-800 mb-0.5">From</p>
                        <p className="font-bold text-[13px] text-gray-800">{trackResult.origin}</p>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="h-px flex-1 bg-gradient-to-r from-[#0818A8]/30 to-[#1F51FF]/30 relative">
                          <ArrowRight size={12} className="absolute -right-1 top-1/2 -translate-y-1/2 text-[#1F51FF]" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="text-center flex-shrink-0">
                        <p className="text-[13px] font-bold tracking-[0.15em] uppercase text-gray-800 mb-0.5">To</p>
                        <p className="font-bold text-[13px] text-gray-800">{trackResult.destination}</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-0">
                      {trackResult.timeline.map((step, i) => (
                        <div key={i} className="flex items-start gap-3.5 relative">
                          {i < trackResult.timeline.length - 1 && (
                            <div
                              className={`absolute left-[11px] top-[24px] w-px h-full ${step.done ? "bg-[#0818A8]/30" : "bg-gray-100"}`}
                              aria-hidden="true"
                            />
                          )}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 ${
                              step.done ? "border-[#0818A8] bg-[#0818A8]"
                              : step.active ? "border-[#1F51FF] bg-white animate-pulse"
                              : "border-gray-200 bg-white"
                            }`}
                            aria-label={step.done ? "Completed" : step.active ? "In progress" : "Pending"}
                          >
                            {step.done && <Check size={10} className="text-white" aria-hidden="true" />}
                            {step.active && <div className="w-2 h-2 rounded-full bg-[#1F51FF]" aria-hidden="true" />}
                          </div>
                          <div className={`pb-4 flex-1 flex items-start justify-between ${step.done ? "opacity-100" : step.active ? "opacity-100" : "opacity-40"}`}>
                            <p className={`text-[13px] ${step.done || step.active ? "font-semibold" : "font-normal"} ${step.active ? "text-[#0818A8]" : "text-gray-800"}`}>
                              {step.label}
                            </p>
                            <div className="text-right flex-shrink-0 ml-4">
                              <p className={`text-[13px] ${step.done ? "font-semibold" : "font-normal"} text-gray-800`}>{step.date}</p>
                              {step.time !== "—" && <p className="text-[13px] font-normal text-gray-800">{step.time}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="border-t border-gray-100 pt-4 mt-2 grid grid-cols-2 gap-3">
                      {[["Service", trackResult.service], ["Weight", trackResult.weight]].map(([k, v]) => (
                        <div key={k}>
                          <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-gray-800">{k}</p>
                          <p className="text-gray-800 font-semibold text-[13px]">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function FAQSection({ searchResults, searchQuery, clearSearch }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState("shipping");
  const currentCategory = FAQ_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <section
      id="faqs"
      ref={ref}
      className="relative bg-[#00061a] scroll-mt-20 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">

        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="Frequently Asked Questions" dark />
          </motion.div>
          <motion.h2
            id="faq-heading"
            className="font-black text-[clamp(26px,4.5vw,50px)] text-white leading-[0.92] tracking-[-0.028em] uppercase"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Find Your{" "}
            <span className="relative inline-block text-[#1F51FF]">
              Answer.
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full"
                aria-hidden="true"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ duration: 0.55, delay: 0.5 }}
              />
            </span>
          </motion.h2>
        </div>

        {/* Search results mode */}
        <AnimatePresence>
          {searchQuery && searchResults.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <p className="text-white/80 text-[13.5px] font-normal">
                  <span className="text-white font-semibold">{searchResults.length} result{searchResults.length !== 1 ? "s" : ""}</span>{" "}
                  for &ldquo;{searchQuery}&rdquo;
                </p>
                <button
                  onClick={clearSearch}
                  className="flex items-center gap-1.5 text-[13px] font-semibold text-white/80 hover:text-white transition-colors"
                  aria-label="Clear search results"
                >
                  <X size={12} aria-hidden="true" /> Clear search
                </button>
              </div>
              <div className="border border-white/[0.09] bg-white/[0.03] overflow-hidden">
                <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                <div className="divide-y divide-white/[0.06]">
                  {searchResults.map((result, i) => (
                    <div key={i} className="px-6">
                      <FAQItem faq={result} dark />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {searchQuery && searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border border-white/[0.08] bg-white/[0.03] p-8 text-center mb-10"
            >
              <HelpCircle size={32} className="text-white/80 mx-auto mb-3" aria-hidden="true" />
              <p className="text-white/80 font-semibold text-[15px] mb-1">No results for &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-white/80 text-[13px] font-normal mb-5">
                Try different keywords, or contact our team directly.
              </p>
              <button
                onClick={clearSearch}
                className="text-[13px] font-semibold text-[#1F51FF] hover:text-white transition-colors"
                aria-label="Clear search"
              >
                Clear and browse all FAQs
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category tabs + content */}
        {!searchQuery && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Category sidebar */}
            <div className="lg:col-span-3" role="tablist" aria-label="FAQ categories">
              <p className="text-[13px] font-black tracking-[0.35em] uppercase text-white/80 mb-4 px-1">
                Categories
              </p>
              <div className="space-y-1">
                {FAQ_CATEGORIES.map(cat => {
                  const Icon    = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`tab-${cat.id}`}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left border-l-2 transition-all duration-150 ${
                        isActive
                          ? "border-[#1F51FF] bg-white/[0.06] text-white"
                          : "border-transparent text-white/80 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon
                        size={14}
                        style={{ color: isActive ? cat.color : undefined }}
                        className={!isActive ? "text-white/80" : ""}
                        aria-hidden="true"
                      />
                      <div>
                        <p className={`text-[13px] font-semibold ${isActive ? "text-white" : "text-white/80"}`}>
                          {cat.label}
                        </p>
                        <p className={`text-[13px] font-normal ${isActive ? "text-white/80" : "text-white/80"}`}>
                          {cat.faqs.length} questions
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FAQ content */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  id={`tab-${activeCategory}`}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="border border-white/[0.09] bg-white/[0.03] overflow-hidden"
                >
                  <div
                    className="h-[2px]"
                    style={{ background: `linear-gradient(to right, ${currentCategory?.color}, #1F51FF)` }}
                    aria-hidden="true"
                  />
                  <div className="divide-y divide-white/[0.06]">
                    {currentCategory?.faqs.map((faq, i) => (
                      <div key={i} className="px-6">
                        <FAQItem faq={faq} dark />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GUIDES
// ═══════════════════════════════════════════════════════════════════════════════
function GuidesSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative bg-white overflow-hidden" aria-labelledby="guides-heading">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">

          {/* Left */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <TagPill label="Guides & Resources" />
              <h2
                id="guides-heading"
                className="font-black text-[clamp(22px,3.5vw,38px)] text-gray-900 leading-[0.92] tracking-[-0.025em] uppercase mb-4"
              >
                Helpful<br /><span className="text-[#0818A8]">Guides.</span>
              </h2>
              <p className="text-gray-800 text-[14px] font-normal leading-relaxed mb-6">
                Step-by-step guides for common tasks — written by our operations team in plain language.
              </p>
              <div className="border border-gray-200 bg-gray-50 p-5">
                <p className="text-[13px] font-bold tracking-[0.25em] uppercase text-gray-800 mb-4">Popular Articles</p>
                <div className="space-y-3">
                  {POPULAR_ARTICLES.map((a, i) => (
                    <a
                      key={i}
                      href={a.href}
                      className="group flex items-start gap-2.5 text-[13px] text-gray-800 hover:text-[#0818A8] font-normal transition-colors"
                    >
                      <ChevronRight size={12} className="flex-shrink-0 mt-0.5 text-gray-800 group-hover:text-[#0818A8] transition-colors" aria-hidden="true" />
                      <span>{a.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — guide cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GUIDES.map((guide, i) => {
              const Icon = guide.icon;
              return (
                <motion.a
                  key={i}
                  href={guide.href}
                  className="group border border-gray-200 bg-white p-6 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/8 transition-all duration-300 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  aria-label={guide.title}
                >
                  <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                  <div className="w-10 h-10 bg-[#0818A8]/8 flex items-center justify-center mb-4" aria-hidden="true">
                    <Icon size={17} className="text-[#0818A8]" />
                  </div>
                  <p className="text-gray-900 font-bold text-[14px] leading-snug mb-2">{guide.title}</p>
                  <p className="text-gray-800 text-[13px] font-normal leading-relaxed mb-4">{guide.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 text-[13px] font-normal flex items-center gap-1.5">
                      <Clock size={10} aria-hidden="true" /> {guide.time}
                    </span>
                    <span className="flex items-center gap-1 text-[13px] font-bold text-[#0818A8] group-hover:text-[#0437F2] transition-colors">
                      Read <ArrowRight size={9} aria-hidden="true" />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function ContactSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-[#00061a] scroll-mt-20 overflow-hidden"
      aria-labelledby="contact-support-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#0818A8]/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">

        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="Still Need Help?" dark />
          </motion.div>
          <motion.h2
            id="contact-support-heading"
            className="font-black text-[clamp(26px,4.5vw,50px)] text-white leading-[0.92] tracking-[-0.028em] uppercase"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Talk to a Real{" "}
            <span className="relative inline-block text-[#1F51FF]">
              Person.
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full"
                aria-hidden="true"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ duration: 0.55, delay: 0.5 }}
              />
            </span>
          </motion.h2>
          <motion.p
            className="text-white/80 text-[14px] font-normal mt-4 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our UK-based team responds every time — no bots, no ticket queues.
            Call, WhatsApp, or email.
          </motion.p>
        </div>

        {/* Channel cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CONTACT_CHANNELS.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <motion.a
                key={ch.title}
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative border border-white/[0.08] bg-white/[0.04] p-6 hover:border-white/[0.2] hover:bg-white/[0.07] transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                aria-label={`${ch.title}: ${ch.value}`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: ch.color }}
                  aria-hidden="true"
                />
                {ch.badge && (
                  <span
                    className="absolute top-4 right-4 text-[13px] font-bold tracking-[0.18em] uppercase px-2 py-0.5 border"
                    style={{ borderColor: `${ch.color}40`, color: ch.color, backgroundColor: `${ch.color}12` }}
                  >
                    {ch.badge}
                  </span>
                )}
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${ch.color}18` }}
                  aria-hidden="true"
                >
                  <Icon size={18} style={{ color: ch.color }} />
                </div>
                <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-white/80 mb-1">{ch.desc}</p>
                <p className="text-white font-black text-[15px] leading-tight mb-1.5">{ch.title}</p>
                <p className="text-white/80 text-[13px] font-semibold mb-1 break-all">{ch.value}</p>
                <p className="text-white/80 text-[13px] font-normal mb-5 leading-snug">{ch.sub}</p>
                <span
                  className="flex items-center gap-1.5 text-[13px] font-bold tracking-[0.08em] uppercase transition-colors group-hover:text-white"
                  style={{ color: ch.color }}
                >
                  {ch.action} <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Office hours */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {[
            {
              flag: "🇬🇧", country: "UK Office — Upminster, Essex",
              addr: "Unit 9 Moorhen Yard, Elms Lane, Bulphan, Upminster, Essex RM14 3TS",
              hours: [
                { d: "Mon–Fri",  t: "10:00AM – 6:00PM" },
                { d: "Saturday", t: "11:00AM – 2:00PM"  },
                { d: "Sunday",   t: "Closed"             },
              ],
              color: "#0818A8",
            },
            {
              flag: "🇳🇬", country: "Nigeria Hub — Lagos",
              addr: "1-3 R-Zone Crescent, Queens Park Estate II, Shagam Interchange, Lagos. <strong>Collection Points:</strong> Egbeda, Surulele, Ajah, Ibadan",
              hours: [
                { d: "Mon–Fri",  t: "9:00AM – 5:00PM WAT" },
                { d: "Saturday", t: "9:00AM – 1:00PM WAT"  },
                { d: "Sunday",   t: "Closed"               },
              ],
              color: "#1F51FF",
            },
          ].map(office => (
            <div
              key={office.country}
              className="group border border-white/[0.07] bg-white/[0.04] p-6 hover:border-white/[0.15] transition-all duration-300 relative overflow-hidden"
            >
              <div
                className="h-[2px] w-0 group-hover:w-full transition-all duration-500 absolute top-0 left-0"
                style={{ backgroundColor: office.color }}
                aria-hidden="true"
              />
              <div className="flex items-start gap-4 mb-4">
                <span className="text-[32px] leading-none flex-shrink-0" aria-hidden="true">{office.flag}</span>
                <div>
                  <p className="text-white font-black text-[15px] tracking-[-0.01em]">{office.country}</p>
                  <p className="text-white/80 text-[13px] font-normal mt-1 leading-snug" dangerouslySetInnerHTML={{ __html: office.addr }}></p>
                </div>
              </div>
              <div className="border-t border-white/[0.07] pt-4 grid grid-cols-3 gap-2">
                {office.hours.map(h => (
                  <div key={h.d}>
                    <p className="text-white/80 text-[13px] font-bold tracking-[0.1em] uppercase">{h.d}</p>
                    <p className={`text-[13px] font-semibold mt-0.5 ${h.t === "Closed" ? "text-white/80" : "text-white/80"}`}>
                      {h.t}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ESCALATION CTA
// ═══════════════════════════════════════════════════════════════════════════════
function EscalationCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative bg-white overflow-hidden"
      aria-label="Escalation and claims"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Damaged cargo */}
          <motion.div
            className="border border-[#0818A8]/15 bg-[#0818A8]/4 p-7 relative overflow-hidden group hover:border-[#0818A8]/35 transition-all duration-300"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-[#0818A8]" aria-hidden="true" />
            <AlertCircle size={22} className="text-[#0818A8] mb-4" aria-hidden="true" />
            <h3 className="text-gray-900 font-black text-[16px] tracking-[-0.01em] mb-2">Report Damaged Cargo</h3>
            <p className="text-gray-800 text-[13px] font-normal leading-relaxed mb-5">
              Cargo arrived damaged? Report within 7 days for a full investigation and claim.
            </p>
            <a
              href="mailto:claims@r-zoneenterprises.com"
              className="inline-flex items-center gap-2 text-[13px] font-black tracking-[0.08em] uppercase text-[#0818A8] hover:text-[#0437F2] transition-colors"
              aria-label="Email claims team about damaged cargo"
            >
              Report Damage <ArrowRight size={10} aria-hidden="true" />
            </a>
          </motion.div>

          {/* Delayed cargo */}
          <motion.div
            className="border border-amber-200 bg-amber-50 p-7 relative overflow-hidden group hover:border-amber-300 transition-all duration-300"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-amber-500" aria-hidden="true" />
            <Clock size={22} className="text-amber-600 mb-4" aria-hidden="true" />
            <h3 className="text-gray-900 font-black text-[16px] tracking-[-0.01em] mb-2">Missing or Delayed Cargo</h3>
            <p className="text-gray-800 text-[13px] font-normal leading-relaxed mb-5">
              Cargo not arrived? Let us investigate. Contact us if you&apos;re outside the expected delivery window.
            </p>
            <a
              href="tel:+448007720864"
              className="inline-flex items-center gap-2 text-[13px] font-black tracking-[0.08em] uppercase text-amber-700 hover:text-amber-900 transition-colors"
              aria-label="Call R-Zone about delayed cargo"
            >
              Call Us Now <ArrowRight size={10} aria-hidden="true" />
            </a>
          </motion.div>

          {/* Formal complaint */}
          <motion.div
            className="bg-[#0818A8] p-7 relative overflow-hidden"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <div
              className="absolute inset-0 opacity-[0.07]"
              aria-hidden="true"
              style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "32px 32px" }}
            />
            <div className="relative z-10">
              <LifeBuoy size={22} className="text-white/80 mb-4" aria-hidden="true" />
              <h3 className="text-white font-black text-[16px] tracking-[-0.01em] mb-2">Make a Formal Complaint</h3>
              <p className="text-white/80 text-[13px] font-normal leading-relaxed mb-5">
                Not satisfied? Our complaints team aims to resolve all cases within 14 working days.
              </p>
              <a
                href="mailto:complaints@r-zoneenterprises.com"
                className="inline-flex items-center gap-2 bg-white text-[#0818A8] text-[13px] font-black tracking-[0.08em] uppercase px-5 py-2.5 hover:bg-white/90 transition-colors"
                aria-label="Email formal complaints team"
              >
                Submit Complaint <ArrowRight size={10} aria-hidden="true" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function SupportClient() {
  const [searchQuery, setSearchQuery]     = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeSearch, setActiveSearch]   = useState("");

  const performSearch = useCallback((query) => {
    const q = (typeof query === "string" ? query : searchQuery).toLowerCase().trim();
    if (!q) { setSearchResults([]); setActiveSearch(""); return; }
    const results = [];
    FAQ_CATEGORIES.forEach(cat => {
      cat.faqs.forEach(faq => {
        if (faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)) {
          results.push(faq);
        }
      });
    });
    setSearchResults(results);
    setActiveSearch(q);
    document.getElementById("faqs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchQuery]);

  const clearSearch = () => { setSearchQuery(""); setSearchResults([]); setActiveSearch(""); };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home",    "item": "https://r-zoneenterprises.com" },
                  { "@type": "ListItem", "position": 2, "name": "Support", "item": "https://r-zoneenterprises.com/support" },
                ],
              },
              {
                "@type": "FAQPage",
                "mainEntity": FAQ_CATEGORIES.flatMap(cat =>
                  cat.faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": { "@type": "Answer", "text": faq.a },
                  }))
                ),
              },
              {
                "@type": "ContactPage",
                "name": "R-Zone Cargo Support Centre",
                "url": "https://r-zoneenterprises.com/support",
                "mainEntity": {
                  "@type": "Organization",
                  "name": "R-Zone Enterprises",
                  "telephone": "+448007720864",
                  "email": "info@r-zoneenterprises.com",
                  "contactPoint": [
                    { "@type": "ContactPoint", "telephone": "+44-800-772-0864",  "contactType": "customer support", "availableLanguage": "English", "areaServed": "GB" },
                    { "@type": "ContactPoint", "telephone": "+234-906-680-6861", "contactType": "customer support", "availableLanguage": "English", "areaServed": "NG" },
                    { "@type": "ContactPoint", "email": "info@r-zoneenterprises.com", "contactType": "customer support" },
                  ],
                },
              },
            ],
          }),
        }}
      />

      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] w-full`}>
        <Hero onSearch={performSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SystemStatus />
        <TrackWidget />
        <FAQSection searchResults={searchResults} searchQuery={activeSearch} clearSearch={clearSearch} />
        <GuidesSection />
        <ContactSection />
        <EscalationCTA />
      </div>
    </>
  );
}