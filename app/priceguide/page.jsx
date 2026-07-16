"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Clock, User, Calendar,
  Share2, Check, Link2, ChevronRight, TrendingUp,
  Package, Zap, AlertCircle, CheckCircle,
  Calculator, ChevronDown, ChevronUp, Phone, Mail,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Article Data ─────────────────────────────────────────────────────────────
const ARTICLE = {
  slug: "uk-to-nigeria-shipping-price-guide-2026",
  category: "guides",
  title: "UK to Nigeria Shipping Price Guide 2026   Full Cost Breakdown",
  excerpt:
    "How much does it really cost to ship from the UK to Nigeria in 2026? Air from £5/kg. Sea from £2/kg. Full breakdown by item type, weight, and destination   plus a free shipping calculator.",
  author: "R-Zone Operations Team",
  date: "12 May 2026",
  readTime: "14 min read",
  img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1400&q=80&auto=format&fit=crop",
  imgAlt: "UK to Nigeria cargo shipping price guide 2026   R-Zone",
  tags: [
    "Shipping Price",
    "UK to Nigeria",
    "Air Freight",
    "Sea Freight",
    "Customs",
    "Price Calculator",
  ],
};

// ─── Price Data ───────────────────────────────────────────────────────────────
const ITEM_PRICES = [
  { name: "iPhone (latest)", weight: 0.5, category: "Electronics", airTotal: 3, seaTotal: 2, note: "Minimum charges apply" },
  { name: "MacBook / Laptop", weight: 2.5, category: "Electronics", airTotal: 13, seaTotal: 7, note: "Includes packaging" },
  { name: "PS5 Console", weight: 5, category: "Electronics", airTotal: 26, seaTotal: 15, note: "Box adds volume weight" },
  { name: "50\" LED TV", weight: 18, category: "Electronics", airTotal: 120, seaTotal: 55, note: "Volumetric may apply" },
  { name: "Generator (small)", weight: 30, category: "Machinery", airTotal: 180, seaTotal: 75, note: "Sea recommended" },
  { name: "Pair of Sneakers", weight: 1, category: "Fashion", airTotal: 6, seaTotal: 4, note: "Standard box size" },
  { name: "20kg Clothes Bale", weight: 20, category: "Fashion", airTotal: 104, seaTotal: 48, note: "Vacuum pack saves cost" },
  { name: "Perfume (100ml)", weight: 0.3, category: "Beauty", airTotal: 3, seaTotal: 2, note: "Min charge applies" },
  { name: "Car Parts (20kg)", weight: 20, category: "Auto", airTotal: 104, seaTotal: 48, note: "Varies by item" },
  { name: "Food Items (20kg)", weight: 20, category: "Food", airTotal: 110, seaTotal: 50, note: "Min 20kg for food" },
];

const STATE_RATES = [
  { state: "Lagos", door: "£6.00", office: "£5.70", minKg: 10, days: 7 },
  { state: "Abuja (FCT)", door: "£6.50", office: "£6.20", minKg: 20, days: 10 },
  { state: "Anambra", door: "£6.50", office: "£6.20", minKg: 20, days: 10 },
  { state: "Rivers / PH", door: "£6.50", office: "£6.20", minKg: 20, days: 10 },
  { state: "Kano", door: "£7.00", office: "£7.00", minKg: 30, days: 10 },
  { state: "Ogun", door: "£6.20", office: "£5.90", minKg: 20, days: 8 },
  { state: "Delta", door: "£6.50", office: "£6.20", minKg: 20, days: 10 },
  { state: "Enugu", door: "£6.50", office: "£6.20", minKg: 20, days: 10 },
  { state: "Imo", door: "£6.50", office: "£6.20", minKg: 20, days: 10 },
  { state: "Kaduna", door: "£7.00", office: "£7.00", minKg: 30, days: 10 },
];

const FAQS = [
  {
    q: "How much does it cost to ship 20kg from the UK to Nigeria?",
    a: "By sea: approximately £40 60 depending on your destination state. By air: approximately £104 130. Door-to-door delivery adds £20 35 for Nigerian delivery.",
  },
  {
    q: "Is air freight or sea freight cheaper?",
    a: "Sea freight is always cheaper per kg   from £2/kg vs air at £5.20/kg. But for small shipments under 10kg, air freight is often better value when you factor in the time cost of waiting 4 6 weeks.",
  },
  {
    q: "Are there hidden charges?",
    a: "At R-Zone, no. Your quote includes UK export documentation, transit, Lagos customs clearance, and standard delivery. UK door collection and Nigerian door delivery are quoted separately and transparently.",
  },
  {
    q: "Do I pay customs duty in Nigeria?",
    a: "For personal-use goods, most items are cleared without additional duty for individuals. Commercial quantities attract NCS tariff rates. R-Zone handles all Nigerian customs clearance   no extra fee for standard shipments.",
  },
  {
    q: "How is my shipping price calculated?",
    a: "You pay based on the greater of actual weight or volumetric weight. For air: L×W×H (cm) ÷ 6,000. For sea: L×W×H ÷ 1,000. Dense, well-packed boxes are always cheaper than half-empty large ones.",
  },
  {
    q: "Can I ship food from the UK to Nigeria?",
    a: "Yes. R-Zone accepts most dry goods   garri, fufu, crayfish, egusi, ogbono, tinned goods, dry spices. Minimum 20kg for food shipments. Some restricted items apply (no chicken-flavour seasonings, fresh produce, or alcohol).",
  },
];

// ─── TOC ─────────────────────────────────────────────────────────────────────
const SECTIONS = [
  "Quick Summary: UK Nigeria Shipping Rates 2026",
  "Air Freight Prices: UK to Nigeria",
  "Sea Freight Prices: UK to Nigeria",
  "Shipping Cost by Item Type",
  "Free Shipping Cost Calculator",
  "Nigerian Delivery Rates by State",
  "Hidden Charges to Watch For",
  "How to Ship Cheaper: 7 Pro Tips",
  "Frequently Asked Questions",
  "Get a Free Quote from R-Zone",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useReveal(margin = "-60px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return { ref, inView };
}

function TagPill({ label, dark = false }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-5 ${dark ? "border-[#1F51FF]/30 bg-[#0818A8]/14" : "border-[#0818A8]/20 bg-[#0818A8]/6"}`}>
      <motion.span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dark ? "bg-[#1F51FF]" : "bg-[#0818A8]"}`}
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>{label}</span>
    </div>
  );
}

function SectionHeading({ children, index }) {
  return (
    <h2 className="font-black text-[clamp(17px,2.5vw,23px)] text-[#0b0f1a] leading-tight tracking-[-0.02em] uppercase mb-5 pl-4 border-l-[3px] border-[#0818A8]">
      <span className="text-[#0818A8]/30 text-[14px] font-black mr-2">{String(index).padStart(2, "0")}.</span>
      {children}
    </h2>
  );
}

// ─── Share Panel ──────────────────────────────────────────────────────────────
function SharePanel({ article }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const getUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${window.location.pathname}#article/${article.slug}`;
  }, [article.slug]);

  const copy = useCallback(() => {
    const url = getUrl();
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [getUrl]);

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!e.target.closest("[data-sp]")) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="relative" data-sp="">
      <button onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#0818A8] hover:text-[#0818A8] text-gray-700 text-[11px] font-bold tracking-[0.08em] uppercase px-4 py-2.5 transition-all duration-200 bg-white">
        <Share2 size={12} /> Share Article
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.18 }}
            className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 shadow-2xl min-w-[230px] overflow-hidden">
            <button onClick={copy} className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#0818A8] transition-colors text-left border-b border-gray-100">
              {copied ? <Check size={14} className="text-emerald-500" /> : <Link2 size={14} />}
              {copied ? "Copied!" : "Copy link"}
            </button>
            <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(article.title + "\n" + getUrl())}`, "_blank")}
              className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-emerald-600 transition-colors text-left">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Share on WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Shipping Calculator ───────────────────────────────────────────────────────
function ShippingCalculator() {
  const [weight, setWeight] = useState(10);
  const [length, setLength] = useState(50);
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(30);
  const [method, setMethod] = useState("air");
  const [state, setState] = useState("Lagos");
  const { ref, inView } = useReveal("-40px");

  const volAir = Math.round((length * width * height) / 6000 * 10) / 10;
  const volSea = Math.round((length * width * height) / 1000 * 10) / 10;
  const chargeableAir = Math.max(weight, volAir);
  const chargeableSea = Math.max(weight, volSea);

  const ratePerKgAir = 5.20;
  const ratePerKgSea = 2.00;
  const deliveryAdd = state === "Lagos" ? 20 : state === "Abuja (FCT)" ? 30 : 35;

  const airCost = Math.round(chargeableAir * ratePerKgAir + deliveryAdd);
  const seaCost = Math.round(chargeableSea * ratePerKgSea + deliveryAdd);
  const displayed = method === "air" ? airCost : seaCost;
  const displayedChargeable = method === "air" ? chargeableAir : chargeableSea;
  const isVolumetric = method === "air" ? volAir > weight : volSea > weight;

  const STATES = ["Lagos", "Abuja (FCT)", "Anambra", "Rivers / PH", "Ogun", "Delta", "Enugu", "Imo", "Kano", "Kaduna", "Abia", "Akwa Ibom", "Other"];

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
      className="border-2 border-black bg-white overflow-hidden my-8">
      <div className="bg-[#0818A8] px-6 py-4 flex items-center gap-3">
        <Calculator size={18} className="text-white" />
        <div>
          <p className="text-white font-black text-[14px] tracking-[-0.01em] uppercase">UK Nigeria Shipping Calculator</p>
          <p className="text-white/60 text-[11px] font-light">Estimate your cargo cost instantly   air & sea</p>
        </div>
        <span className="ml-auto text-[9px] font-black tracking-[0.2em] uppercase bg-white/15 text-white px-3 py-1.5">2026 Rates</span>
      </div>
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left: inputs */}
          <div className="space-y-4">
            <div>
              <label className="text-[10.5px] font-black tracking-[0.2em] uppercase text-gray-500 block mb-2">Actual Weight (kg)</label>
              <div className="flex items-center gap-3">
                <input type="range" min={1} max={200} value={weight} onChange={e => setWeight(Number(e.target.value))}
                  className="flex-1 accent-[#0818A8]" />
                <span className="font-black text-[#0818A8] text-[16px] w-16 text-right">{weight} kg</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[["Length (cm)", length, setLength], ["Width (cm)", width, setWidth], ["Height (cm)", height, setHeight]].map(([label, val, setter]) => (
                <div key={label}>
                  <label className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-gray-500 block mb-1">{label}</label>
                  <input type="number" min={1} max={300} value={val} onChange={e => setter(Number(e.target.value))}
                    className="w-full border border-gray-200 px-3 py-2 text-[14px] font-semibold text-black bg-white outline-none focus:border-[#0818A8] transition-all" />
                </div>
              ))}
            </div>
            <div>
              <label className="text-[10.5px] font-black tracking-[0.2em] uppercase text-gray-500 block mb-2">Delivery State in Nigeria</label>
              <select value={state} onChange={e => setState(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-[13.5px] font-medium text-black outline-none focus:border-[#0818A8] transition-all bg-white">
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              {["air", "sea"].map(m => (
                <button key={m} onClick={() => setMethod(m)}
                  className={`flex-1 py-2.5 text-[11.5px] font-black tracking-[0.08em] uppercase border transition-all duration-200 ${method === m ? "bg-[#0818A8] text-white border-[#0818A8]" : "border-gray-200 text-gray-600 hover:border-[#0818A8]/40"}`}>
                  {m === "air" ? "✈ Air Freight" : "🚢 Sea Freight"}
                </button>
              ))}
            </div>
          </div>
          {/* Right: result */}
          <div className="bg-gray-50 border border-gray-100 p-5 flex flex-col justify-between">
            <div>
              <p className="text-[9.5px] font-black tracking-[0.25em] uppercase text-gray-400 mb-1">Estimated Cost</p>
              <p className="font-black text-[52px] text-[#0818A8] leading-none tracking-[-0.03em]">£{displayed}</p>
              <p className="text-gray-500 text-[11.5px] font-light mt-1">including {state} delivery</p>
            </div>
            <div className="space-y-2 mt-5 pt-5 border-t border-gray-200">
              <div className="flex justify-between text-[12px]">
                <span className="text-gray-500">Actual weight</span>
                <span className="font-semibold text-gray-800">{weight} kg</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-gray-500">Volumetric weight</span>
                <span className="font-semibold text-gray-800">{method === "air" ? volAir : volSea} kg</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-gray-500 flex items-center gap-1">Chargeable weight {isVolumetric && <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 font-bold rounded">VOL</span>}</span>
                <span className="font-black text-[#0818A8]">{displayedChargeable} kg</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-gray-500">Rate</span>
                <span className="font-semibold text-gray-800">£{method === "air" ? "5.20" : "2.00"}/kg</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-gray-500">Delivery ({state})</span>
                <span className="font-semibold text-gray-800">£{deliveryAdd}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              {isVolumetric && (
                <p className="text-amber-700 text-[11px] font-medium flex items-start gap-1.5 mb-3">
                  <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                  Volumetric weight exceeds actual. Pack denser to reduce cost.
                </p>
              )}
              <a href="https://r-zoneenterprises.com/quote" target="_blank" rel="noopener noreferrer"
                className="group block w-full text-center bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12px] font-black tracking-[0.08em] uppercase py-3.5 transition-all duration-200">
                Get Exact Quote Free <ArrowRight size={11} className="inline ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-gray-400 text-[10px] font-light text-center mt-2">Estimates only. Final price confirmed at booking.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.06 }}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors">
        <span className="font-bold text-[14px] text-gray-900 pr-4 leading-snug">{q}</span>
        {open ? <ChevronUp size={16} className="text-[#0818A8] flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}>
            <p className="px-6 pb-5 text-gray-600 text-[14px] font-light leading-relaxed border-t border-gray-100 pt-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── CTA Box ─────────────────────────────────────────────────────────────────
function CTABox() {
  return (
    <div className="mt-12 bg-[#0818A8] p-7 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className="relative z-10">
        <p className="text-white/60 text-[10px] font-black tracking-[0.3em] uppercase mb-2">Ready to Ship?</p>
        <h3 className="text-white font-black text-[22px] md:text-[28px] tracking-[-0.015em] mb-3 leading-tight">
          Get a free UK Nigeria cargo quote from R-Zone.
        </h3>
        <p className="text-white/70 text-[13px] font-normal mb-7 max-w-xl leading-relaxed">
          Air from £5/kg · Sea from £2/kg · Weekly departures · Same-day response · 107+ five-star reviews · #1 on Google.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="https://r-zoneenterprises.com/quote" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0818A8] text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3.5 transition-all duration-200">
            Get a Free Quote <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="tel:+448007720864"
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-all duration-200">
            <Phone size={12} /> Call +44 800 772 0864
          </a>
          <a href="https://wa.me/447915647119" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-all duration-200">
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function PriceGuideArticle() {
  const topRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `${window.location.pathname}#article/${ARTICLE.slug}`);
    }
  }, []);

  const { ref: s1, inView: v1 } = useReveal();
  const { ref: s2, inView: v2 } = useReveal();
  const { ref: s3, inView: v3 } = useReveal();
  const { ref: s4, inView: v4 } = useReveal();
  const { ref: s6, inView: v6 } = useReveal();
  const { ref: s7, inView: v7 } = useReveal();
  const { ref: s8, inView: v8 } = useReveal();

  return (
    <>
      {/* Schema.org structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": ARTICLE.title,
        "description": ARTICLE.excerpt,
        "datePublished": "2026-05-12",
        "dateModified": "2026-05-12",
        "author": { "@type": "Organization", "name": "R-Zone Operations Team" },
        "publisher": { "@type": "Organization", "name": "R-Zone Enterprises", "url": "https://r-zoneenterprises.com" },
        "url": `https://r-zoneenterprises.com/blog#article/${ARTICLE.slug}`,
        "image": ARTICLE.img,
        "keywords": ARTICLE.tags.join(", "),
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://r-zoneenterprises.com/blog#article/${ARTICLE.slug}` },
        "faqPage": {
          "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
        }
      })}} />

      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white min-h-screen`}>
        <article ref={topRef} aria-labelledby="article-h1">

          {/* ── Hero ── */}
          <div className="relative bg-[#00061a] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[#0818A8]/15 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#1F51FF]/10 rounded-full blur-[100px]" />
            </div>
            <div className="relative h-[380px] md:h-[500px] overflow-hidden">
              <Image src={ARTICLE.img} alt={ARTICLE.imgAlt} fill priority sizes="100vw" className="object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00061a] via-[#00061a]/55 to-[#00061a]/20" />
            </div>
            <div className="relative z-10 max-w-[860px] mx-auto px-5 sm:px-8 -mt-72 md:-mt-80 pb-12 md:pb-16">
              <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <a href="https://r-zoneenterprises.com" className="text-white/60 text-[11.5px] font-medium hover:text-white transition-colors">Home</a>
                <ChevronRight size={11} className="text-white/25" />
                <a href="/blog" className="text-white/60 text-[11.5px] font-medium hover:text-white transition-colors">Insights</a>
                <ChevronRight size={11} className="text-white/25" />
                <span className="text-white/80 text-[11.5px] font-medium" aria-current="page">Price Guide</span>
              </motion.nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-[9.5px] font-black tracking-[0.2em] uppercase px-2.5 py-1.5 border border-[#1F51FF]/30 bg-[#1F51FF]/10 text-[#1F51FF]">
                    Shipping Guides
                  </span>
                  <span className="text-white/40 text-[11px] font-medium">{ARTICLE.readTime}</span>
                  <span className="text-white/40 text-[11px] font-medium">Updated Monthly</span>
                </div>
                <h1 id="article-h1" className="font-black text-[clamp(24px,5vw,56px)] text-white leading-[0.88] tracking-[-0.03em] uppercase mb-5">
                  UK to Nigeria<br />
                  <span className="text-[#1F51FF]">Shipping Price</span><br />
                  Guide 2026.
                </h1>
                <p className="text-white/65 text-[15px] font-light leading-relaxed mb-8 max-w-2xl">{ARTICLE.excerpt}</p>
                <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/[0.08]">
                  <div className="flex items-center flex-wrap gap-3 text-[11px] font-medium text-white/55">
                    <span className="flex items-center gap-1.5"><User size={10} />{ARTICLE.author}</span>
                    <span className="opacity-30">·</span>
                    <span className="flex items-center gap-1.5"><Calendar size={10} />{ARTICLE.date}</span>
                    <span className="opacity-30">·</span>
                    <span className="flex items-center gap-1.5"><Clock size={10} />{ARTICLE.readTime}</span>
                  </div>
                  <SharePanel article={ARTICLE} />
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Key Stats Bar ── */}
          <div className="bg-[#0818A8] py-4 border-b border-[#0437F2]/40">
            <div className="max-w-[860px] mx-auto px-5 sm:px-8">
              <div className="flex flex-wrap gap-6 md:gap-10">
                {[
                  ["Air Freight from", "£5.20/kg"],
                  ["Sea Freight from", "£2.00/kg"],
                  ["Air Transit", "7 days (Fri Fri)"],
                  ["Sea Transit", "4 6 weeks"],
                  ["Google Reviews", "100+ ★★★★★"],
                ].map(([label, val]) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-white/50 text-[9px] font-bold tracking-[0.2em] uppercase">{label}</span>
                    <span className="text-white font-black text-[15px] tracking-[-0.01em]">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-12 md:py-16">

            {/* Table of Contents */}
            <motion.div className="border border-[#0818A8]/15 bg-[#0818A8]/4 p-6 mb-12"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#0818A8] mb-4">In This Article</p>
              <ol className="space-y-2.5 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {SECTIONS.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-black text-[#0818A8]/35 text-[12px] flex-shrink-0 w-5 mt-0.5">{i + 1}.</span>
                    <span className="text-[12.5px] font-semibold text-gray-800 leading-snug">{s}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* S1   Quick Summary */}
            <motion.section ref={s1} initial={{ opacity: 0, y: 20 }} animate={v1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-14">
              <SectionHeading index={1}>Quick Summary: UK Nigeria Shipping Rates 2026</SectionHeading>
              <p className="text-gray-700 text-[15px] font-normal leading-[1.85] mb-6">
                R-Zone Enterprises operates the UK's highest-rated door-to-door cargo service to Nigeria. Here are the current 2026 rates   transparent, all-inclusive, no hidden fees.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: "✈", mode: "Air Freight", rate: "from £5.20/kg", transit: "7 working days (Friday to Friday)", best: "Electronics, clothing, documents, urgent shipments", color: "#0818A8" },
                  { icon: "🚢", mode: "Sea Freight", rate: "from £2.00/kg", transit: "4 6 weeks", best: "Household goods, furniture, bulk clothing, machinery", color: "#0437F2" },
                ].map(s => (
                  <div key={s.mode} className="border-2 border-[#0818A8]/20 bg-white p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[3px]" style={{ backgroundColor: s.color }} />
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <p className="font-black text-gray-900 text-[15px] tracking-[-0.01em]">{s.mode}</p>
                        <p className="font-black text-[#0818A8] text-[22px] tracking-[-0.02em]">{s.rate}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[12.5px]">
                        <span className="text-gray-400 font-medium w-20 flex-shrink-0">Transit</span>
                        <span className="font-semibold text-gray-800">{s.transit}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[12.5px]">
                        <span className="text-gray-400 font-medium w-20 flex-shrink-0">Best for</span>
                        <span className="font-normal text-gray-700">{s.best}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 px-5 py-4 flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800 text-[13px] font-normal leading-relaxed">
                  <strong className="font-bold">Important:</strong> All prices are charged on the greater of actual weight or volumetric weight. Dense, well-packed boxes save you money. See Section 5 for our calculator.
                </p>
              </div>
            </motion.section>

            {/* S2   Air Freight */}
            <motion.section ref={s2} initial={{ opacity: 0, y: 20 }} animate={v2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-14">
              <SectionHeading index={2}>Air Freight Prices: UK to Nigeria</SectionHeading>
              <p className="text-gray-700 text-[15px] font-normal leading-[1.85] mb-5">
                R-Zone air freight departs every <strong className="font-bold text-gray-900">Friday</strong> from London Heathrow (LHR), Gatwick (LGW) and Manchester (MAN). Your cargo arrives at Lagos Murtala Muhammed Airport (LOS) or Abuja Airport (ABV) the following <strong className="font-bold text-gray-900">Friday</strong> (7 working days).
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-[#0818A8]">
                      {["Service", "Rate", "Transit", "Departures", "Includes"].map(h => (
                        <th key={h} className="text-white font-black text-[10px] tracking-[0.15em] uppercase px-4 py-3 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Air Freight (standard)", "£5.20/kg", "7 working days (Fri Fri)", "Friday", "UK docs + customs + tracking"],
                      ["Air Freight + UK Collection", "£5.20/kg + £25+", "7 working days (Fri Fri)", "Friday", "Door-to-UK warehouse"],
                      ["Air Door-to-Door", "£6.00+/kg", "10 working days (Fri Fri + delivery)", "Friday", "UK door + NG delivery"],
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3 border-b border-gray-100 text-gray-700 font-normal">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-500 text-[12px] font-light mt-3">Volumetric formula: L × W × H (cm) ÷ 6,000. Charged on whichever is greater   actual or volumetric.</p>
            </motion.section>

            {/* S3   Sea Freight */}
            <motion.section ref={s3} initial={{ opacity: 0, y: 20 }} animate={v3 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-14">
              <SectionHeading index={3}>Sea Freight Prices: UK to Nigeria</SectionHeading>
              <p className="text-gray-700 text-[15px] font-normal leading-[1.85] mb-5">
                Sea freight from the UK to Nigeria sails weekly from UK ports to <strong className="font-bold text-gray-900">Apapa Port and Tin Can Island</strong> in Lagos. At £2/kg, it is the most cost-effective way to ship large, heavy, or bulky cargo.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-[#0437F2]">
                      {["Service", "Rate", "Transit", "Sailings", "Includes"].map(h => (
                        <th key={h} className="text-white font-black text-[10px] tracking-[0.15em] uppercase px-4 py-3 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["LCL Sea Freight", "£2.00/kg", "4 6 weeks", "Weekly", "UK docs + customs + tracking"],
                      ["FCL Container", "Custom", "4 6 weeks", "Weekly", "Full container load"],
                      ["Vehicle (RoRo)", "Custom", "4 6 weeks", "Monthly", "Car, van, motorcycle"],
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3 border-b border-gray-100 text-gray-700 font-normal">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-500 text-[12px] font-light">Volumetric formula for sea: L × W × H (cm) ÷ 1,000. Dense cargo is dramatically cheaper than bulky, light cargo by sea.</p>
            </motion.section>

            {/* S4   By Item Type */}
            <motion.section ref={s4} initial={{ opacity: 0, y: 20 }} animate={v4 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-14">
              <SectionHeading index={4}>Shipping Cost by Item Type</SectionHeading>
              <p className="text-gray-700 text-[15px] font-normal leading-[1.85] mb-6">
                Below are estimated shipping costs from the UK to Lagos for the most commonly shipped items. Prices include transit and Lagos customs clearance   no hidden extras.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ITEM_PRICES.map((item, i) => (
                  <motion.div key={item.name}
                    className="border border-gray-200 p-4 hover:border-[#0818A8]/30 transition-all duration-200 bg-white group"
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-black text-[13.5px] text-gray-900 group-hover:text-[#0818A8] transition-colors">{item.name}</p>
                        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#0818A8]/60 mt-0.5">{item.category}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium text-right">{item.weight}kg actual</span>
                    </div>
                    <div className="flex gap-3 mt-3">
                      <div className="flex-1 bg-[#0818A8]/5 px-3 py-2 text-center">
                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#0818A8]/60">Air ✈</p>
                        <p className="font-black text-[#0818A8] text-[17px] tracking-[-0.01em]">~£{item.airTotal}</p>
                      </div>
                      <div className="flex-1 bg-gray-50 px-3 py-2 text-center">
                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">Sea 🚢</p>
                        <p className="font-black text-gray-700 text-[17px] tracking-[-0.01em]">~£{item.seaTotal}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-[10.5px] font-light mt-2">{item.note}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 bg-[#0818A8]/5 border border-[#0818A8]/10 px-5 py-4">
                <p className="text-[12.5px] text-gray-600 font-normal leading-relaxed">
                  <strong className="font-bold text-gray-900">Note:</strong> Prices above are estimates based on standard packaging for the item. Actual cost depends on how you pack   large boxes with lots of air space increase volumetric weight significantly. Use the calculator below to get your exact estimate.
                </p>
              </div>
            </motion.section>

            {/* S5   Calculator */}
            <section className="mb-14">
              <SectionHeading index={5}>Free Shipping Cost Calculator</SectionHeading>
              <p className="text-gray-700 text-[15px] font-normal leading-[1.85] mb-2">
                Enter your box dimensions and weight for an instant cost estimate. The calculator automatically applies the correct volumetric weight formula for air or sea.
              </p>
              <ShippingCalculator />
            </section>

            {/* S6   State Rates */}
            <motion.section ref={s6} initial={{ opacity: 0, y: 20 }} animate={v6 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-14">
              <SectionHeading index={6}>Nigerian Delivery Rates by State</SectionHeading>
              <p className="text-gray-700 text-[15px] font-normal leading-[1.85] mb-5">
                R-Zone delivers to all 36 Nigerian states and the FCT. Below are door-to-door and office-collection rates for the most popular destinations. All rates are per kg on top of the base freight cost.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-[#0b0f1a]">
                      {["State", "Door-to-Door", "Office Collection", "Min Weight", "Delivery Days"].map(h => (
                        <th key={h} className="text-white font-black text-[10px] tracking-[0.12em] uppercase px-4 py-3 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {STATE_RATES.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 border-b border-gray-100 font-bold text-gray-900">{row.state}</td>
                        <td className="px-4 py-3 border-b border-gray-100 text-[#0818A8] font-black">{row.door}</td>
                        <td className="px-4 py-3 border-b border-gray-100 text-gray-700">{row.office}</td>
                        <td className="px-4 py-3 border-b border-gray-100 text-gray-600">{row.minKg}kg</td>
                        <td className="px-4 py-3 border-b border-gray-100 text-gray-600">{row.days} days</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-500 text-[12px] font-light mt-3">
                States not listed above (Adamawa, Bauchi, Sokoto, Zamfara, etc.) are office-collection only. Call <strong className="font-semibold">+44 800 772 0864</strong> for an exact quote to any Nigerian state.
              </p>
            </motion.section>

            {/* S7   Hidden Charges */}
            <motion.section ref={s7} initial={{ opacity: 0, y: 20 }} animate={v7 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-14">
              <SectionHeading index={7}>Hidden Charges to Watch For</SectionHeading>
              <p className="text-gray-700 text-[15px] font-normal leading-[1.85] mb-6">
                Not all cargo companies are as transparent as R-Zone. Here are the most common hidden charges in the UK Nigeria shipping industry   and how R-Zone handles each one.
              </p>
              <div className="space-y-3">
                {[
                  { charge: "Fuel Surcharge", industry: "Often added silently   5 25% on top of quoted rate", rzone: "Zero. R-Zone pricing is all-inclusive. What we quote, you pay." },
                  { charge: "Volumetric Upsell", industry: "Some companies quote by actual weight then charge volumetric", rzone: "We always calculate both and communicate upfront before you pay." },
                  { charge: "Nigeria Customs Clearance Fee", industry: "£50 300 charged separately after arrival", rzone: "Included in every R-Zone shipment. No separate customs fee." },
                  { charge: "Last-Mile Delivery", industry: "Often excluded from quoted price   £20 80 extra", rzone: "Quoted separately and transparently. Always disclosed before booking." },
                  { charge: "Packing / Repacking Fee", industry: "Charged without warning if cargo arrives poorly packed", rzone: "Our team advises upfront. Packing services quoted at £15+/item." },
                  { charge: "Storage/Demurrage", industry: "If cargo sits at port due to poor documentation", rzone: "R-Zone pre-files all NCS documents electronically. Clearance delays are rare." },
                ].map((row, i) => (
                  <motion.div key={i} className="grid grid-cols-1 md:grid-cols-3 border border-gray-200 overflow-hidden"
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                    <div className="bg-gray-900 px-4 py-4 flex items-center">
                      <p className="text-white font-black text-[13px]">{row.charge}</p>
                    </div>
                    <div className="bg-red-50 border-l border-gray-200 px-4 py-4 flex items-start gap-2">
                      <span className="text-red-400 text-[12px] mt-0.5 flex-shrink-0">✗</span>
                      <p className="text-red-800 text-[12px] font-normal leading-relaxed">{row.industry}</p>
                    </div>
                    <div className="bg-emerald-50 border-l border-gray-200 px-4 py-4 flex items-start gap-2">
                      <CheckCircle size={12} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p className="text-emerald-800 text-[12px] font-normal leading-relaxed">{row.rzone}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* S8   Pro Tips */}
            <motion.section ref={s8} initial={{ opacity: 0, y: 20 }} animate={v8 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-14">
              <SectionHeading index={8}>How to Ship Cheaper: 7 Pro Tips</SectionHeading>
              <p className="text-gray-700 text-[15px] font-normal leading-[1.85] mb-6">
                These are the strategies R-Zone's warehouse team uses every day to help customers reduce their shipping costs without compromising safety.
              </p>
              <div className="space-y-4">
                {[
                  { tip: "Use vacuum packing bags for clothing", detail: "Clothing is voluminous but light. Vacuum bags can reduce a 60L bag of clothes to a third of its size   slashing volumetric weight dramatically, especially for sea freight." },
                  { tip: "Choose the right box size", detail: "A half-empty box is an expensive box. Use the smallest box that safely fits your cargo. Avoid supermarket boxes   their weakened walls can't survive a sea freight journey." },
                  { tip: "Consolidate multiple boxes into one", detail: "Two half-full boxes generate more volumetric weight than one full box. Combine your shipments and pack tightly with appropriate cushioning." },
                  { tip: "Ship by sea for large, heavy cargo", detail: "For anything over 30kg that is not time-sensitive, sea freight is dramatically cheaper. The saving on a 50kg shipment versus air is typically £100+." },
                  { tip: "Book early to avoid rush charges", detail: "Last-minute air freight can attract surcharges. Book at least 3 days before departure day for guaranteed space at the standard rate." },
                  { tip: "Declare accurately to avoid re-weigh fees", detail: "If your declared weight differs significantly from our warehouse measurement, a re-weigh fee may apply. Weigh your cargo at home using bathroom scales before booking." },
                  { tip: "Use office collection for lower delivery cost", detail: "If you or a trusted person can collect from our R-Zone partner offices in Lagos or key state capitals, office-collection rates are typically 5 10% cheaper than door delivery." },
                ].map((item, i) => (
                  <motion.div key={i} className="flex gap-4 border border-gray-100 bg-white p-5 hover:border-[#0818A8]/20 hover:shadow-md hover:shadow-[#0818A8]/5 transition-all duration-200"
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                    <span className="font-black text-[28px] text-[#0818A8]/12 leading-none flex-shrink-0 w-8 text-right mt-1">{i + 1}</span>
                    <div>
                      <p className="font-black text-[14px] text-gray-900 mb-1.5">{item.tip}</p>
                      <p className="text-gray-600 text-[13px] font-light leading-relaxed">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* S9   FAQ */}
            <section className="mb-14">
              <SectionHeading index={9}>Frequently Asked Questions</SectionHeading>
              <p className="text-gray-700 text-[15px] font-normal leading-[1.85] mb-6">
                The most common questions R-Zone receives about UK Nigeria shipping prices, costs and charges.
              </p>
              <div className="space-y-2">
                {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
              </div>
            </section>

            {/* S10   Get Quote CTA */}
            <section className="mb-8">
              <SectionHeading index={10}>Get a Free Quote from R-Zone</SectionHeading>
              <p className="text-gray-700 text-[15px] font-normal leading-[1.85] mb-6">
                Ready to ship from the UK to Nigeria? R-Zone offers same-day quotes, transparent pricing, weekly departures and our own teams at both ends. <strong className="font-bold text-gray-900">No hidden fees. No surprises.</strong>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Phone, label: "Call Us", value: "+44 800 772 0864", sub: "Mon Fri 9am 6pm", href: "tel:+448007720864" },
                  { icon: Mail, label: "WhatsApp", value: "+44 7915 647 119", sub: "7 days a week", href: "https://wa.me/447915647119" },
                  { icon: Package, label: "Visit Us", value: "Upminster, Essex", sub: "Mon Fri 10am 6pm, Sat 11am 2pm", href: "https://r-zoneenterprises.com/contact" },
                ].map(({ icon: Icon, label, value, sub, href }) => (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="group border border-gray-200 p-5 hover:border-[#0818A8] hover:shadow-md hover:shadow-[#0818A8]/8 transition-all duration-200 bg-white flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-[#0818A8]/8 flex items-center justify-center mb-3 group-hover:bg-[#0818A8]/15 transition-colors">
                      <Icon size={18} className="text-[#0818A8]" />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.18em] uppercase text-gray-400 mb-1">{label}</span>
                    <span className="font-black text-[14px] text-gray-900 group-hover:text-[#0818A8] transition-colors">{value}</span>
                    <span className="text-gray-400 text-[11px] font-light mt-0.5">{sub}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
              {ARTICLE.tags.map(t => (
                <span key={t} className="text-[10px] font-semibold text-gray-500 border border-gray-200 px-3 py-1.5 hover:border-[#0818A8] hover:text-[#0818A8] transition-colors cursor-default">#{t}</span>
              ))}
            </div>

            {/* Bottom share */}
            <div className="flex items-center justify-between flex-wrap gap-4 mt-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-[13px] font-bold text-gray-900 mb-0.5">Found this useful?</p>
                <p className="text-gray-500 text-[12px] font-normal">Share with someone who ships to Nigeria.</p>
              </div>
              <SharePanel article={ARTICLE} />
            </div>

            {/* CTA Block */}
            <CTABox />
          </div>

          {/* ── Trust Bar ── */}
          <div className="bg-[#00061a] border-t border-white/[0.06] py-10">
            <div className="max-w-[860px] mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
                {[
                  { val: "100+", label: "Five-Star Reviews" },
                  { val: "12+", label: "Years Experience" },
                  { val: "50,000+", label: "Shipments Delivered" },
                  { val: "#1", label: "on Google UK Nigeria" },
                ].map(s => (
                  <div key={s.label}>
                    <p className="font-black text-white text-[26px] md:text-[32px] leading-none tracking-[-0.02em]">{s.val}</p>
                    <p className="text-white/45 text-[10.5px] font-semibold tracking-[0.1em] uppercase mt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}