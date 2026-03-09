"use client";

import { Montserrat } from "next/font/google";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Plane, Ship, Truck, Warehouse, FileCheck, Anchor,
  Package, MapPin, Calendar, Weight, ChevronDown,
  ArrowRight, Plus, Minus, CheckCircle, Info,
  Phone, Mail, Clock, Shield, Award, Globe,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICE_TYPES = [
  { id: "air",      label: "Air Freight",       icon: Plane },
  { id: "sea",      label: "Sea Freight",        icon: Ship },
  { id: "road",     label: "Road Transport",     icon: Truck },
  { id: "warehouse",label: "Warehousing",        icon: Warehouse },
  { id: "customs",  label: "Customs Clearance",  icon: FileCheck },
  { id: "cargo",    label: "Cargo Handling",     icon: Anchor },
];

const CARGO_TYPES = [
  "General Cargo", "Dangerous Goods", "Perishables",
  "Oversized/Heavy", "Vehicles", "Pharmaceuticals",
  "Electronics", "Bulk Cargo",
];

const INCOTERMS = [
  "EXW – Ex Works", "FOB – Free on Board", "CIF – Cost Insurance Freight",
  "DDP – Delivered Duty Paid", "DAP – Delivered at Place", "FCA – Free Carrier",
];

const FAQS = [
  {
    q: "How long does it take to receive a quote?",
    a: "Our logistics team reviews all quote requests within 2–4 business hours. For urgent shipments, call our 24/7 operations line for immediate assistance.",
  },
  {
    q: "What information do I need to get an accurate quote?",
    a: "Origin and destination, cargo type and dimensions, weight, desired service type, and preferred shipping dates. The more detail you provide, the more accurate your quote will be.",
  },
  {
    q: "Do you handle customs documentation?",
    a: "Yes. R-Zone Cargo provides full customs clearance services including import/export declarations, HS code classification, and duty management.",
  },
  {
    q: "Can I ship dangerous or hazardous goods?",
    a: "Yes, subject to IATA and IMDG regulations. Our certified dangerous goods specialists handle all required documentation and compliance requirements.",
  },
  {
    q: "What are your payment terms?",
    a: "We offer flexible payment terms including upfront, net-30, and corporate account billing for verified business clients. Details are confirmed at quote acceptance.",
  },
];

const WHY = [
  { icon: Clock,  title: "Response in 4 Hours",    desc: "Dedicated team reviews every quote within 4 business hours." },
  { icon: Shield, title: "Fully Insured Cargo",     desc: "All shipments covered with comprehensive cargo insurance." },
  { icon: Globe,  title: "50+ Global Destinations", desc: "Established network across Africa, Europe, Asia and beyond." },
  { icon: Award,  title: "ISO Certified Operations", desc: "International quality standards at every step of your shipment." },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ children, required }) {
  return (
    <label className="block text-[11.5px] font-semibold text-gray-600 tracking-[0.06em] uppercase mb-1.5">
      {children}
      {required && <span className="text-[#0818A8] ml-0.5">*</span>}
    </label>
  );
}

function Input({ placeholder, type = "text", value, onChange, icon: Icon }) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Icon size={14} />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border border-gray-200 bg-white text-gray-900 text-[13.5px] font-normal placeholder-gray-400 rounded-sm py-3 focus:outline-none focus:border-[#0818A8] focus:ring-1 focus:ring-[#0818A8]/20 transition-all duration-200 ${
          Icon ? "pl-10 pr-4" : "px-4"
        }`}
      />
    </div>
  );
}

function Select({ options, value, onChange, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 bg-white text-gray-900 text-[13.5px] font-normal rounded-sm px-4 py-3 focus:outline-none focus:border-[#0818A8] focus:ring-1 focus:ring-[#0818A8]/20 transition-all duration-200 appearance-none cursor-pointer"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border border-gray-200 bg-white overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
      >
        <span className={`text-[13.5px] font-semibold tracking-[0.01em] transition-colors duration-200 ${open ? "text-[#0818A8]" : "text-gray-800 group-hover:text-[#0818A8]"}`}>
          {faq.q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} className={`flex-shrink-0 ml-4 transition-colors duration-200 ${open ? "text-[#0818A8]" : "text-gray-400"}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-[12.5px] font-light text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function GetQuotePage() {
  const formRef = useRef(null);
  const faqRef = useRef(null);
  const whyRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-40px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-40px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-40px" });

  // ─── Form state ───────────────────────────────────────────────────────────
  const [serviceType, setServiceType] = useState("");
  const [shipmentType, setShipmentType] = useState("one-way");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [arriveDate, setArriveDate] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [incoterm, setIncoterm] = useState("");
  const [pieces, setPieces] = useState(1);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className={`${montserrat.className} bg-white min-h-screen`}>

      {/* ══ HERO / FORM SECTION ══════════════════════════════════════════════ */}
      <section className="bg-[#f0f4ff] pt-10 pb-16 md:pb-20 border-b border-gray-200">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11.5px] text-gray-400 font-medium tracking-[0.04em] mb-8">
            <span className="hover:text-[#0818A8] cursor-pointer transition-colors">Home</span>
            <span>/</span>
            <span className="text-gray-600">Request a Quote</span>
          </div>

          {/* Page title */}
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 border border-[#0818A8]/20 bg-[#0818A8]/8 px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8]" />
                <span className="text-[#0818A8] text-[10px] font-semibold tracking-[0.22em] uppercase">
                  Free Quote
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="text-gray-900 font-black text-[clamp(28px,5vw,52px)] leading-tight tracking-[-0.02em] mb-3"
            >
              Request a{" "}
              <span className="relative inline-block text-[#0818A8]">
                Freight Quote
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-gray-500 text-[13px] font-light tracking-[0.02em] max-w-lg mx-auto"
            >
              Fill in your shipment details below and our logistics team will
              respond with a tailored quote within 4 business hours.
            </motion.p>
          </motion.div>

          {/* ── FORM CARD ── */}
          <motion.div
            ref={formRef}
            className="bg-white border border-gray-200 shadow-xl shadow-[#0818A8]/5 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Blue top accent */}
            <div className="h-1 bg-[#0818A8] w-full" />

            <div className="px-6 sm:px-8 md:px-10 py-8 md:py-10">

              {submitted ? (
                /* ── SUCCESS STATE ── */
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle size={56} className="text-[#0818A8] mb-5" />
                  </motion.div>
                  <h2 className="text-gray-900 font-black text-[24px] tracking-[-0.01em] mb-2">
                    Quote Request Received
                  </h2>
                  <p className="text-gray-500 text-[13px] font-light max-w-md leading-relaxed mb-6">
                    Thank you! Our logistics team will review your shipment details
                    and respond with a tailored quote within <strong className="text-gray-700">4 business hours</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 border border-[#0818A8] text-[#0818A8] text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-2.5 hover:bg-[#0818A8] hover:text-white transition-all duration-200"
                    >
                      Submit Another
                    </button>
                    <a
                      href="/track"
                      className="inline-flex items-center gap-2 bg-[#0818A8] text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-2.5 hover:bg-[#0437F2] transition-colors duration-200"
                    >
                      Track a Shipment
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-8">

                  {/* ── STEP 1: Service Type ── */}
                  <div>
                    <p className="text-[11px] font-bold text-[#0818A8] tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                      <span className="w-5 h-5 bg-[#0818A8] text-white rounded-full flex items-center justify-center text-[9px] font-black">1</span>
                      Select Service Type
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                      {SERVICE_TYPES.map((s) => {
                        const Icon = s.icon;
                        const active = serviceType === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => setServiceType(s.id)}
                            className={`flex flex-col items-center gap-2 px-3 py-4 border text-center transition-all duration-200 rounded-sm ${
                              active
                                ? "border-[#0818A8] bg-[#0818A8]/5 text-[#0818A8]"
                                : "border-gray-200 bg-gray-50 text-gray-500 hover:border-[#0818A8]/40 hover:text-[#0818A8]"
                            }`}
                          >
                            <Icon size={20} strokeWidth={1.75} />
                            <span className="text-[10.5px] font-semibold tracking-[0.03em] leading-tight">
                              {s.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── STEP 2: Shipment Type tabs ── */}
                  <div>
                    <p className="text-[11px] font-bold text-[#0818A8] tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                      <span className="w-5 h-5 bg-[#0818A8] text-white rounded-full flex items-center justify-center text-[9px] font-black">2</span>
                      Shipment Direction
                    </p>
                    <div className="flex items-center gap-5 mb-6">
                      {["one-way", "round-trip", "multi-point"].map((t) => (
                        <label key={t} className="flex items-center gap-2 cursor-pointer">
                          <div
                            onClick={() => setShipmentType(t)}
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                              shipmentType === t ? "border-[#0818A8]" : "border-gray-300"
                            }`}
                          >
                            {shipmentType === t && (
                              <div className="w-2 h-2 rounded-full bg-[#0818A8]" />
                            )}
                          </div>
                          <span className="text-[13px] text-gray-700 capitalize font-normal">
                            {t.replace("-", " ")}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Origin + Destination */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label required>Origin</Label>
                        <Input
                          placeholder="City or country"
                          value={origin}
                          onChange={(e) => setOrigin(e.target.value)}
                          icon={MapPin}
                        />
                      </div>
                      <div>
                        <Label required>Destination</Label>
                        <Input
                          placeholder="City or country"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          icon={MapPin}
                        />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <Label required>Departure Date</Label>
                        <Input
                          type="date"
                          value={departDate}
                          onChange={(e) => setDepartDate(e.target.value)}
                          icon={Calendar}
                        />
                      </div>
                      <div>
                        <Label>Arrival By (optional)</Label>
                        <Input
                          type="date"
                          value={arriveDate}
                          onChange={(e) => setArriveDate(e.target.value)}
                          icon={Calendar}
                        />
                      </div>
                      <div>
                        <Label>Incoterms</Label>
                        <Select
                          options={INCOTERMS}
                          value={incoterm}
                          onChange={(e) => setIncoterm(e.target.value)}
                          placeholder="Select incoterm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── STEP 3: Cargo Details ── */}
                  <div>
                    <p className="text-[11px] font-bold text-[#0818A8] tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                      <span className="w-5 h-5 bg-[#0818A8] text-white rounded-full flex items-center justify-center text-[9px] font-black">3</span>
                      Cargo Details
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <Label required>Cargo Type</Label>
                        <Select
                          options={CARGO_TYPES}
                          value={cargoType}
                          onChange={(e) => setCargoType(e.target.value)}
                          placeholder="Select type"
                        />
                      </div>
                      <div>
                        <Label required>Total Weight</Label>
                        <Input
                          placeholder="e.g. 500 kg"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          icon={Weight}
                        />
                      </div>
                      <div>
                        <Label>Volume (CBM)</Label>
                        <Input
                          placeholder="e.g. 2.5 m³"
                          value={volume}
                          onChange={(e) => setVolume(e.target.value)}
                          icon={Package}
                        />
                      </div>
                      <div>
                        <Label>No. of Pieces</Label>
                        <div className="flex items-center border border-gray-200 bg-white rounded-sm overflow-hidden">
                          <button
                            onClick={() => setPieces((p) => Math.max(1, p - 1))}
                            className="px-3.5 py-3 text-gray-500 hover:text-[#0818A8] hover:bg-gray-50 transition-colors border-r border-gray-200"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="flex-1 text-center text-[14px] font-semibold text-gray-800">
                            {pieces}
                          </span>
                          <button
                            onClick={() => setPieces((p) => p + 1)}
                            className="px-3.5 py-3 text-gray-500 hover:text-[#0818A8] hover:bg-gray-50 transition-colors border-l border-gray-200"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Dimensions hint */}
                    <div className="flex items-start gap-2 bg-[#0818A8]/4 border border-[#0818A8]/15 px-4 py-3 rounded-sm">
                      <Info size={13} className="text-[#0818A8] flex-shrink-0 mt-0.5" />
                      <p className="text-[11.5px] text-[#0818A8]/80 font-light leading-relaxed">
                        For oversized or project cargo, include dimensions (L × W × H) in the
                        additional notes below for the most accurate quote.
                      </p>
                    </div>
                  </div>

                  {/* ── STEP 4: Contact Details ── */}
                  <div>
                    <p className="text-[11px] font-bold text-[#0818A8] tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                      <span className="w-5 h-5 bg-[#0818A8] text-white rounded-full flex items-center justify-center text-[9px] font-black">4</span>
                      Your Details
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label required>Full Name</Label>
                        <Input
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Company</Label>
                        <Input
                          placeholder="Company name (optional)"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label required>Email Address</Label>
                        <Input
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          icon={Mail}
                        />
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <Input
                          type="tel"
                          placeholder="+234 000 000 0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          icon={Phone}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Additional Notes</Label>
                      <textarea
                        rows={3}
                        placeholder="Special handling requirements, dimensions, delivery instructions..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border border-gray-200 bg-white text-gray-900 text-[13.5px] font-normal placeholder-gray-400 rounded-sm px-4 py-3 focus:outline-none focus:border-[#0818A8] focus:ring-1 focus:ring-[#0818A8]/20 transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>

                  {/* ── Submit Row ── */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
                    <p className="text-[11.5px] text-gray-400 font-light leading-relaxed max-w-xs">
                      By submitting, you agree to our{" "}
                      <a href="/privacy" className="text-[#0818A8] underline underline-offset-2">
                        Privacy Policy
                      </a>
                      . We'll never share your data.
                    </p>

                    <motion.button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] disabled:opacity-70 text-white text-[13px] font-bold tracking-[0.08em] uppercase px-8 py-3.5 transition-colors duration-200 shadow-lg shadow-[#0818A8]/25 flex-shrink-0"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <ArrowRight size={14} />
                          Get My Quote
                        </>
                      )}
                    </motion.button>
                  </div>

                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ WHY RZONE ════════════════════════════════════════════════════════ */}
      <section
        ref={whyRef}
        className="py-16 md:py-20 bg-white border-b border-gray-100"
      >
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate={whyInView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {WHY.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="flex flex-col gap-3 p-5 border border-gray-100 hover:border-[#0818A8]/25 hover:shadow-md hover:shadow-[#0818A8]/5 transition-all duration-300 rounded-sm"
                  variants={fadeUp}
                  custom={i * 0.08}
                >
                  <div className="w-10 h-10 bg-[#0818A8]/8 border border-[#0818A8]/15 rounded flex items-center justify-center">
                    <Icon size={18} className="text-[#0818A8]" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-black text-[14px] tracking-[-0.01em] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-[12px] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ PROCESS STEPS ════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-[#f0f4ff] border-b border-gray-200">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <p className="text-[#0818A8] text-[10px] font-bold tracking-[0.22em] uppercase mb-2">
              How It Works
            </p>
            <h2 className="text-gray-900 font-black text-[clamp(22px,3.5vw,36px)] tracking-[-0.02em]">
              Your quote in 3 simple steps.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line desktop */}
            <div className="hidden md:block absolute top-10 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] h-px bg-[#0818A8]/20 z-0" />
            {[
              { step: "01", icon: Package,    title: "Submit Your Details",   desc: "Fill in your shipment info — origin, destination, cargo type, weight, and contact details." },
              { step: "02", icon: FileCheck,  title: "We Review & Prepare",   desc: "Our logistics specialists analyse your requirements and source the best rates across our network." },
              { step: "03", icon: CheckCircle,title: "Receive Your Quote",    desc: "Get a tailored, itemised quote via email within 4 business hours. Accept and we handle the rest." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="relative z-10 flex flex-col items-center text-center bg-white border border-gray-200 px-6 py-7 rounded-sm shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <div className="w-14 h-14 bg-[#0818A8] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#0818A8]/25">
                    <Icon size={22} className="text-white" strokeWidth={1.75} />
                  </div>
                  <span className="text-[#0818A8]/30 font-black text-[28px] leading-none mb-2 tracking-[-0.02em]">
                    {item.step}
                  </span>
                  <h3 className="text-gray-900 font-black text-[14.5px] mb-2 tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-[12px] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
      <section ref={faqRef} className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#0818A8] text-[10px] font-bold tracking-[0.22em] uppercase mb-1">
              FAQ
            </p>
            <h2 className="text-gray-900 font-black text-[clamp(20px,3vw,32px)] tracking-[-0.02em]">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT STRIP ════════════════════════════════════════════════════ */}
      <section className="py-12 bg-[#0818A8]">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/60 text-[10px] font-semibold tracking-[0.2em] uppercase mb-1">
              Need Immediate Help?
            </p>
            <h3 className="text-white font-black text-[20px] md:text-[24px] tracking-[-0.01em]">
              Speak to our logistics team now.
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:+2340000000000"
              className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[12.5px] font-semibold px-5 py-2.5 rounded transition-all duration-200"
            >
              <Phone size={14} />
              +234 000 000 0000
            </a>
            <a
              href="mailto:quotes@r-zoneenterprises.com"
              className="flex items-center gap-2.5 bg-white text-[#0818A8] hover:bg-gray-100 text-[12.5px] font-bold px-5 py-2.5 rounded transition-all duration-200"
            >
              <Mail size={14} />
              Email Us
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}