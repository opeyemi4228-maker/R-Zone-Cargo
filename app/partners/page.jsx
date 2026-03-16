"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Handshake, ArrowRight, ChevronRight, Phone, Mail,
  Check, Star, Globe, Users, TrendingUp, Zap,
  Package, Truck, Building2, ShieldCheck, BarChart3,
  Award, Clock, CheckCircle, AlertCircle, Loader2,
  Send, User, ChevronDown, MapPin, Briefcase,
  Plane, Ship, Anchor, Target, Heart,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const PARTNER_TYPES = [
  {
    id: "freight-agent",
    icon: Anchor,
    title: "Freight Agent",
    tagline: "Already in logistics? Grow with us.",
    desc: "Freight agents, customs brokers, and logistics consultants who want to expand their UK–Nigeria offering. Earn competitive commission on every shipment you refer or co-handle with our team.",
    benefits: [
      "Commission from 5% on referred shipments",
      "Co-branded service documentation",
      "Joint customs handling capability",
      "Dedicated R-Zone agent liaison",
      "Access to our weekly air & monthly sea schedule",
      "Marketing materials & rate cards provided",
    ],
    color: "#0818A8",
    featured: false,
  },
  {
    id: "referral",
    icon: Users,
    title: "Referral Partner",
    tagline: "Recommend R-Zone. Earn every time.",
    desc: "Anyone with a network of Nigerian diaspora, businesses, or importers. Whether you're a community leader, accountant, lawyer, or social media influencer — if you can refer customers, we reward you for every completed shipment.",
    benefits: [
      "Fixed referral fee per completed booking",
      "Real-time referral tracking dashboard",
      "Custom referral link and code",
      "Monthly payment by bank transfer",
      "No minimum volume requirement",
      "Full training and support provided",
    ],
    color: "#1F51FF",
    featured: true,
  },
  {
    id: "ecommerce",
    icon: Package,
    title: "E-commerce & Retail",
    tagline: "Sell more. Ship it with R-Zone.",
    desc: "Online retailers, Amazon sellers, and e-commerce businesses who source from or sell to the Nigerian market. We handle the logistics so you can focus on growth — with volume rates, API integration options, and fulfilment support.",
    benefits: [
      "Volume-discounted rates from first shipment",
      "Dedicated account manager",
      "API integration for order fulfilment",
      "Branded tracking portal for your customers",
      "Priority boarding on busy sailings",
      "Net-30 payment terms available",
    ],
    color: "#0437F2",
    featured: false,
  },
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Account",
    tagline: "Enterprise-grade logistics. Personal service.",
    desc: "UK businesses with regular Nigeria import/export requirements — manufacturing, retail, FMCG, media, and professional services. We offer bespoke SLAs, dedicated account management, and custom reporting.",
    benefits: [
      "Bespoke SLA and KPI agreement",
      "Dedicated UK-based account manager",
      "Weekly volume reporting",
      "Multi-user account portal access",
      "Credit terms up to net-60",
      "Board-level account reviews on request",
    ],
    color: "#0818A8",
    featured: false,
  },
  {
    id: "ngo",
    icon: Heart,
    title: "NGO & Charitable",
    tagline: "Doing good work? Ship it affordably.",
    desc: "Non-governmental organisations, charities, churches, and community groups sending humanitarian supplies, medical equipment, or community resources to Nigeria. We offer specially reduced rates and expedited customs support.",
    benefits: [
      "Reduced NGO freight rates",
      "Expedited customs for humanitarian goods",
      "Donation receipts for UK charities",
      "Flexible scheduling around fundraising cycles",
      "Free pre-shipment consultation",
      "Nigerian beneficiary notifications",
    ],
    color: "#1F51FF",
    featured: false,
  },
  {
    id: "importer",
    icon: Ship,
    title: "Nigerian Importer",
    tagline: "Source from the UK. We bring it home.",
    desc: "Nigerian businesses and entrepreneurs importing UK goods — electronics, fashion, machinery, raw materials. We make the UK–Nigeria supply chain straightforward with transparent pricing and a trusted London-Lagos corridor.",
    benefits: [
      "UK buying agent connections available",
      "FCL & LCL container options",
      "Port-to-port or door-to-door delivery",
      "NAFDAC & SON compliance guidance",
      "Duty calculator and pre-shipment advice",
      "Local Lagos account management",
    ],
    color: "#0437F2",
    featured: false,
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Apply Online",          body: "Complete our short partner application form below. Tell us about your network, your business, and how you'd like to work with us. Takes 3 minutes.",         icon: Send       },
  { num: "02", title: "We Review & Call You",  body: "Our partnerships team will review your application and call you within 2 working days. We'll discuss the right programme for you and answer any questions.", icon: Phone      },
  { num: "03", title: "Agreement & Onboarding", body: "We'll send you a simple partner agreement, set up your account or referral tracking, and provide everything you need to start earning or co-delivering.", icon: CheckCircle },
  { num: "04", title: "Start Earning",          body: "Refer your first customer, co-handle a shipment, or close your first corporate contract. Your commission or commercial terms kick in from day one.",        icon: TrendingUp  },
];

const WHY_PARTNER = [
  { icon: Star,        title: "107+ Five-Star Reviews",    body: "Your customers get a service that's already proven. Our Google rating means you're referring with confidence, not risk."                    },
  { icon: Clock,       title: "12+ Years of Track Record", body: "Established in 2012 — we've operated through a pandemic, currency crises, and Brexit without missing a sailing."                           },
  { icon: Globe,       title: "All 36 Nigerian States",    body: "Wherever your customers need cargo to go in Nigeria, we can get it there. No off-limits destinations."                                      },
  { icon: BarChart3,   title: "Transparent Partner Portal", body: "Real-time visibility of referred shipments, commissions earned, and payment schedules — no chasing, no guesswork."                         },
  { icon: ShieldCheck, title: "IATA & HMRC Certified",     body: "Your customers and clients trust you more when you partner with a certified, regulated operator. Our credentials reinforce yours."           },
  { icon: Award,       title: "Competitive Commissions",   body: "We pay on time, every month. No payment thresholds, no convoluted structures. Simple, reliable income from every completed referral."        },
];

const STATS = [
  { val: "50,000+", label: "Shipments Delivered",  icon: Package },
  { val: "12+",     label: "Years Operating",       icon: Clock   },
  { val: "107+",    label: "5-Star Reviews",        icon: Star    },
  { val: "36",      label: "Nigerian States",       icon: MapPin  },
];

const FAQS = [
  { q: "Is there a minimum volume requirement to join the referral programme?",  a: "No minimum at all. Whether you refer one customer per year or one hundred, you earn a commission on every completed booking." },
  { q: "How quickly do you pay partner commissions?",                             a: "Commissions are calculated at the end of each calendar month and paid by bank transfer within 5 working days of month-end." },
  { q: "Can I be both a freight agent partner and a referral partner?",           a: "Yes — many of our partners operate across categories. We'll structure your agreement to reflect the different ways you work with us." },
  { q: "Do NGOs need to be registered charities to access reduced rates?",        a: "No. We work with unregistered community groups and churches too. We'll ask for a brief description of the humanitarian mission." },
  { q: "Can I white-label R-Zone services under my own brand?",                   a: "Yes, for freight agent and corporate partners. We can provide co-branded documentation and operate behind your brand for customer-facing communications." },
  { q: "Is there a partner agreement I need to sign?",                            a: "Yes — a simple 2-page agreement covering commission rates, payment terms, and confidentiality. We send it digitally via DocuSign." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};

function TagPill({ label, dark = false }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-5 ${
      dark ? "border-[#1F51FF]/30 bg-[#0818A8]/14" : "border-[#0818A8]/20 bg-[#0818A8]/6"
    }`}>
      <motion.span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dark ? "bg-[#1F51FF]" : "bg-[#0818A8]"}`}
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} aria-hidden="true" />
      <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>{label}</span>
    </div>
  );
}

function SectionHeading({ eyebrow, line1, accent, dark = false, id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      {eyebrow && <p className={`text-[10px] font-bold tracking-[0.32em] uppercase mb-3 ${dark ? "text-white/70" : "text-gray-500"}`}>{eyebrow}</p>}
      <h2 id={id} className={`font-black text-[clamp(26px,4.5vw,52px)] leading-[0.92] tracking-[-0.028em] uppercase ${dark ? "text-white" : "text-gray-900"}`}>
        {line1}{" "}
        <span className="relative inline-block text-[#0818A8]">
          {accent}
          <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full"
            aria-hidden="true" initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.5 }} />
        </span>
      </h2>
    </div>
  );
}

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-start justify-between gap-4 py-5 text-left group" aria-expanded={open}>
        <span className={`text-[14px] font-semibold leading-snug transition-colors duration-150 ${open ? "text-[#0818A8]" : "text-gray-800 group-hover:text-[#0818A8]"}`}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-0.5" aria-hidden="true">
          <ChevronDown size={15} className={open ? "text-[#0818A8]" : "text-gray-400"} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <p className="text-gray-700 text-[13.5px] font-light leading-relaxed pb-5 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Application form ─────────────────────────────────────────────────────────
function ApplicationForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", type: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = useCallback((data) => {
    const e = {};
    if (!data.name.trim())      e.name    = "Your name is required.";
    if (!data.email.trim())     e.email   = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Please enter a valid email address.";
    if (!data.phone.trim())     e.phone   = "Phone number is required.";
    if (!data.type)             e.type    = "Please select a partnership type.";
    if (!data.message.trim())   e.message = "Please tell us a little about your network.";
    return e;
  }, []);

  const onBlur = (field) => {
    setTouched(p => ({ ...p, [field]: true }));
    const e = validate(form);
    setErrors(p => ({ ...p, [field]: e[field] }));
  };

  const handleChange = (field, val) => {
    setForm(p => ({ ...p, [field]: val }));
    if (touched[field]) {
      const e = validate({ ...form, [field]: val });
      setErrors(p => ({ ...p, [field]: e[field] }));
    }
  };

  const handleSubmit = async () => {
    const allTouched = Object.fromEntries(Object.keys(form).map(k => [k, true]));
    setTouched(allTouched);
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1800));
    setStatus("success");
  };

  const inputCls = (field) =>
    `w-full border text-gray-900 text-[13.5px] font-light placeholder-gray-400 px-4 py-3.5 outline-none transition-all duration-200 rounded-none
     focus:border-[#0818A8] focus:ring-1 focus:ring-[#0818A8]/20 bg-white
     ${errors[field] && touched[field] ? "border-red-400 bg-red-50/30" : "border-gray-300 hover:border-gray-400"}`;

  const labelCls = "block text-[10.5px] font-bold tracking-[0.2em] uppercase text-gray-600 mb-2";

  return (
    <div className="border border-gray-200 bg-white overflow-hidden">
      <div className="h-[3px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="p-10 md:p-14 text-center">
            <motion.div className="w-16 h-16 bg-[#0818A8] rounded-full flex items-center justify-center mx-auto mb-6 relative"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
              <motion.div className="absolute inset-0 rounded-full bg-[#0818A8]/20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} aria-hidden="true" />
              <CheckCircle size={28} className="text-white relative z-10" aria-hidden="true" />
            </motion.div>
            <h3 className="font-black text-[24px] text-gray-900 tracking-[-0.015em] mb-3">Application Received!</h3>
            <p className="text-gray-600 text-[14px] font-light leading-relaxed max-w-md mx-auto mb-8">
              Thank you, <strong className="font-semibold text-gray-800">{form.name}</strong>. Our partnerships team will call you within 2 working days to discuss the right programme for you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/services" className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25" aria-label="View R-Zone services">
                Explore Services
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:border-[#0818A8] hover:text-[#0818A8] text-[11.5px] font-bold uppercase px-6 py-3 transition-all duration-200" aria-label="Back to home">
                Back to Home
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" className="p-7 md:p-9">
            <div className="mb-7">
              <h3 className="font-black text-[20px] text-gray-900 tracking-[-0.015em] mb-1">Apply to Partner With Us</h3>
              <p className="text-gray-600 text-[13.5px] font-light">Takes 3 minutes. We'll call you within 2 working days.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="p-name" className={labelCls}>Full Name *</label>
                <div className="relative">
                  <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
                  <input id="p-name" type="text" autoComplete="name" placeholder="Your full name"
                    value={form.name} onChange={e => handleChange("name", e.target.value)} onBlur={() => onBlur("name")}
                    className={`${inputCls("name")} pl-9`} aria-required="true" aria-invalid={!!(errors.name && touched.name)} />
                </div>
                {errors.name && touched.name && <p role="alert" className="flex items-center gap-1.5 text-red-500 text-[11px] mt-1.5"><AlertCircle size={10} />{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="p-company" className={labelCls}>Company / Organisation <span className="text-gray-400 normal-case font-light tracking-normal">(optional)</span></label>
                <div className="relative">
                  <Building2 size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
                  <input id="p-company" type="text" autoComplete="organization" placeholder="Company or trading name"
                    value={form.company} onChange={e => handleChange("company", e.target.value)}
                    className={`${inputCls("company").replace("border-red-400 bg-red-50/30", "").replace("border-gray-300 hover:border-gray-400", "border-gray-300 hover:border-gray-400")} pl-9`} />
                </div>
              </div>

              <div>
                <label htmlFor="p-email" className={labelCls}>Email Address *</label>
                <div className="relative">
                  <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
                  <input id="p-email" type="email" autoComplete="email" placeholder="your@email.com"
                    value={form.email} onChange={e => handleChange("email", e.target.value)} onBlur={() => onBlur("email")}
                    className={`${inputCls("email")} pl-9`} aria-required="true" aria-invalid={!!(errors.email && touched.email)} />
                </div>
                {errors.email && touched.email && <p role="alert" className="flex items-center gap-1.5 text-red-500 text-[11px] mt-1.5"><AlertCircle size={10} />{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="p-phone" className={labelCls}>Phone Number *</label>
                <div className="relative">
                  <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
                  <input id="p-phone" type="tel" autoComplete="tel" placeholder="+44 or +234..."
                    value={form.phone} onChange={e => handleChange("phone", e.target.value)} onBlur={() => onBlur("phone")}
                    className={`${inputCls("phone")} pl-9`} aria-required="true" aria-invalid={!!(errors.phone && touched.phone)} />
                </div>
                {errors.phone && touched.phone && <p role="alert" className="flex items-center gap-1.5 text-red-500 text-[11px] mt-1.5"><AlertCircle size={10} />{errors.phone}</p>}
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="p-type" className={labelCls}>Partnership Type *</label>
              <div className="relative">
                <Handshake size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" aria-hidden="true" />
                <ChevronDown size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
                <select id="p-type" value={form.type} onChange={e => handleChange("type", e.target.value)} onBlur={() => onBlur("type")}
                  className={`${inputCls("type")} pl-9 pr-8 appearance-none cursor-pointer`}
                  aria-required="true" aria-invalid={!!(errors.type && touched.type)} style={{ backgroundImage: "none" }}>
                  <option value="" disabled>Select your partnership type…</option>
                  {PARTNER_TYPES.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>
              {errors.type && touched.type && <p role="alert" className="flex items-center gap-1.5 text-red-500 text-[11px] mt-1.5"><AlertCircle size={10} />{errors.type}</p>}
            </div>

            <div className="mb-7">
              <label htmlFor="p-message" className={labelCls}>Tell Us About Your Network *</label>
              <textarea id="p-message" rows={4}
                placeholder="Describe your business, your customer base, and how you see the partnership working…"
                value={form.message} onChange={e => handleChange("message", e.target.value)} onBlur={() => onBlur("message")}
                className={`${inputCls("message")} resize-none`} aria-required="true" aria-invalid={!!(errors.message && touched.message)} />
              {errors.message && touched.message && <p role="alert" className="flex items-center gap-1.5 text-red-500 text-[11px] mt-1.5"><AlertCircle size={10} />{errors.message}</p>}
            </div>

            <p className="text-gray-500 text-[10.5px] font-light leading-relaxed mb-5">
              By submitting, you agree that R-Zone Enterprises may contact you about our partner programme. See our <Link href="/privacy" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">Privacy Policy</Link>.
            </p>

            <button onClick={handleSubmit} disabled={status === "loading"}
              className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[12px] font-black tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200 shadow-xl shadow-[#0818A8]/25 w-full sm:w-auto justify-center"
              aria-label="Submit partner application" aria-busy={status === "loading"}>
              {status === "loading"
                ? <><Loader2 size={13} className="animate-spin" aria-hidden="true" /> Submitting…</>
                : <>Submit Application <Send size={12} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" /></>
              }
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function PartnerPage() {
  const heroRef    = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "BreadcrumbList", "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home",           "item": "https://r-zoneenterprises.com" },
            { "@type": "ListItem", "position": 2, "name": "Partner With Us","item": "https://r-zoneenterprises.com/partners" },
          ]},
          { "@type": "WebPage", "name": "Partner With R-Zone Enterprises",
            "url": "https://r-zoneenterprises.com/partners",
            "description": "Explore partnership opportunities with R-Zone Enterprises — the UK's leading UK–Nigeria freight and logistics company.",
          },
        ],
      })}} />

      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white min-h-screen`}>

        {/* ── HERO ── */}
        <section className="relative bg-[#00061a] overflow-hidden" aria-labelledby="partner-hero-heading">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-[-15%] left-[5%] w-[800px] h-[600px] bg-[#0818A8]/18 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-20%] right-[-5%] w-[600px] h-[500px] bg-[#1F51FF]/10 rounded-full blur-[130px]" />
          </div>
          {[15, 35, 65, 82].map(p => (
            <div key={p} className="absolute top-0 bottom-0 w-px opacity-[0.04] pointer-events-none"
              style={{ left: `${p}%`, background: "linear-gradient(to bottom, transparent, rgba(31,81,255,1) 40%, transparent)" }} aria-hidden="true" />
          ))}

          <div ref={heroRef} className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 pt-[100px] pb-16 md:pb-20">
            <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10"
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
              <Link href="/" className="text-white/60 text-[11.5px] font-medium hover:text-white transition-colors">Home</Link>
              <ChevronRight size={11} className="text-white/30" aria-hidden="true" />
              <span className="text-white/80 text-[11.5px] font-medium" aria-current="page">Partner With Us</span>
            </motion.nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                <TagPill label="Partnership Programmes" dark />
                <h1 id="partner-hero-heading" className="font-black text-[clamp(38px,7vw,80px)] text-white leading-[0.88] tracking-[-0.035em] uppercase mb-6">
                  Grow Together.<br />
                  <span className="relative inline-block text-[#1F51FF]">
                    Win Together.
                    <motion.span className="absolute -bottom-2 left-0 h-[4px] bg-[#1F51FF] rounded-full" aria-hidden="true"
                      initial={{ width: 0 }} animate={heroInView ? { width: "100%" } : {}} transition={{ duration: 0.6, delay: 0.8 }} />
                  </span>
                </h1>
                <p className="text-white/70 text-[15px] font-light leading-relaxed max-w-xl mb-9">
                  R-Zone Enterprises is looking for agents, referrers, businesses, and community organisations who share our belief that the UK–Nigeria corridor deserves world-class logistics. If that's you, let's build something together.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#apply" className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12px] font-black tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-200 shadow-2xl shadow-[#0818A8]/35" aria-label="Apply to become a partner">
                    Apply Now <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
                  <a href="#programmes" className="inline-flex items-center gap-2.5 border border-white/22 hover:border-white/50 text-white/80 hover:text-white text-[12px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-200" aria-label="View partnership programmes">
                    View Programmes
                  </a>
                </div>
              </motion.div>

              <motion.div className="grid grid-cols-2 gap-3" initial={{ opacity: 0, x: 20 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
                {STATS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div key={s.label} className="border border-white/[0.08] bg-white/[0.05] p-6 hover:border-white/[0.18] hover:bg-white/[0.08] transition-all duration-300 group"
                      initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}>
                      <Icon size={16} className="text-[#1F51FF] mb-3" aria-hidden="true" />
                      <p className="text-white font-black text-[28px] leading-none tracking-[-0.025em]">{s.val}</p>
                      <p className="text-white/60 text-[11px] font-semibold tracking-[0.08em] uppercase mt-1">{s.label}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PROGRAMMES ── */}
        <section id="programmes" className="relative bg-white scroll-mt-20" aria-labelledby="programmes-heading">
          <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
            style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

          <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
            {(() => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <div ref={ref} className="text-center mb-14">
                  <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                    <TagPill label="6 Ways to Partner" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                    <SectionHeading line1="Partnership" accent="Programmes." id="programmes-heading" />
                  </motion.div>
                  <motion.p className="text-gray-600 text-[14px] font-light mt-4 max-w-xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
                    Whether you're a freight agent, a community influencer, an NGO, or a FTSE-listed importer — we have a programme structured for how you work.
                  </motion.p>
                </div>
              );
            })()}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PARTNER_TYPES.map((p, i) => {
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: "-60px" });
                const Icon = p.icon;
                return (
                  <motion.div key={p.id} ref={ref}
                    className={`relative border overflow-hidden group ${p.featured ? "border-[#0818A8] shadow-xl shadow-[#0818A8]/15" : "border-gray-200 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/8"} transition-all duration-300`}
                    initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: i * 0.07 }}>

                    {p.featured && (
                      <div className="bg-[#0818A8] text-center py-1.5">
                        <span className="text-white text-[9px] font-bold tracking-[0.25em] uppercase">Most Popular</span>
                      </div>
                    )}

                    <div className={`h-[3px] transition-all duration-500 ${p.featured ? "opacity-100" : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"}`}
                      style={{ background: `linear-gradient(to right, ${p.color}, #1F51FF)` }} aria-hidden="true" />

                    <div className="p-7">
                      <div className="w-11 h-11 flex items-center justify-center mb-5" style={{ backgroundColor: `${p.color}10` }} aria-hidden="true">
                        <Icon size={18} style={{ color: p.color }} />
                      </div>
                      <p className="text-[9.5px] font-bold tracking-[0.22em] uppercase mb-1" style={{ color: p.color }}>{p.tagline}</p>
                      <h3 className="text-gray-900 font-black text-[19px] tracking-[-0.015em] mb-3">{p.title}</h3>
                      <p className="text-gray-600 text-[13px] font-light leading-relaxed mb-6">{p.desc}</p>

                      <ul className="space-y-2 mb-7" role="list">
                        {p.benefits.map(b => (
                          <li key={b} className="flex items-start gap-2.5">
                            <CheckCircle size={12} style={{ color: p.color }} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-gray-700 text-[12.5px] font-light">{b}</span>
                          </li>
                        ))}
                      </ul>

                      <a href="#apply"
                        className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.1em] uppercase transition-colors duration-200"
                        style={{ color: p.color }}
                        aria-label={`Apply for ${p.title} programme`}>
                        Apply for This Programme <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── WHY PARTNER ── */}
        <section className="relative bg-[#00061a] overflow-hidden" aria-labelledby="why-partner-heading">
          <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#0818A8]/10 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
            {(() => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <div ref={ref} className="text-center mb-14">
                  <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                    <TagPill label="Why Partner With Us" dark />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                    <h2 id="why-partner-heading" className="font-black text-[clamp(26px,4.5vw,52px)] text-white leading-[0.92] tracking-[-0.028em] uppercase">
                      Partner With a Company{" "}
                      <span className="relative inline-block text-[#1F51FF]">
                        Worth Backing.
                        <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full" aria-hidden="true"
                          initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.5 }} />
                      </span>
                    </h2>
                  </motion.div>
                </div>
              );
            })()}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY_PARTNER.map((item, i) => {
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: "-60px" });
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} ref={ref}
                    className="group border border-white/[0.07] bg-white/[0.03] p-7 hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-300 relative overflow-hidden"
                    initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.07 }}>
                    <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                    <div className="w-10 h-10 bg-[#0818A8]/20 flex items-center justify-center mb-5" aria-hidden="true">
                      <Icon size={16} className="text-[#1F51FF]" />
                    </div>
                    <h3 className="text-white font-black text-[16px] tracking-[-0.01em] mb-3">{item.title}</h3>
                    <p className="text-white/70 text-[13px] font-light leading-relaxed">{item.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="relative bg-white overflow-hidden" aria-labelledby="how-it-works-heading">
          <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
            style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

          <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
            {(() => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <div ref={ref} className="text-center mb-14">
                  <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                    <TagPill label="Getting Started" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                    <SectionHeading line1="How it" accent="Works." id="how-it-works-heading" />
                  </motion.div>
                </div>
              );
            })()}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROCESS_STEPS.map((step, i) => {
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: "-60px" });
                const Icon = step.icon;
                return (
                  <motion.div key={step.num} ref={ref}
                    className="relative border border-gray-200 bg-gray-50 p-7 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/8 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
                    <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-[#0818A8]" aria-hidden="true" />
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-black text-[42px] text-[#0818A8]/10 leading-none tracking-[-0.02em]" aria-hidden="true">{step.num}</span>
                      <div className="w-10 h-10 bg-[#0818A8]/8 flex items-center justify-center" aria-hidden="true">
                        <Icon size={16} className="text-[#0818A8]" />
                      </div>
                    </div>
                    <h3 className="text-gray-900 font-black text-[16px] tracking-[-0.01em] mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-[13px] font-light leading-relaxed">{step.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── APPLY + FAQS ── */}
        <section id="apply" className="relative bg-gray-50 scroll-mt-20 overflow-hidden" aria-labelledby="apply-heading">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.03) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

          <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

              {/* Left — FAQs */}
              <div className="lg:col-span-5">
                {(() => {
                  const ref = useRef(null);
                  const inView = useInView(ref, { once: true, margin: "-60px" });
                  return (
                    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                      <TagPill label="Common Questions" />
                      <SectionHeading line1="Partner" accent="FAQs." id="apply-heading" />
                      <p className="text-gray-600 text-[14px] font-light mt-4 mb-8 leading-relaxed">
                        Still have questions? Call us on{" "}
                        <a href="tel:+448007720864" className="text-[#0818A8] font-semibold hover:text-[#0437F2] transition-colors">+44 800 772 0864</a>{" "}
                        or email <a href="mailto:partners@r-zoneenterprises.com" className="text-[#0818A8] font-semibold hover:text-[#0437F2] transition-colors">partners@r-zoneenterprises.com</a>.
                      </p>

                      <div className="border border-gray-200 bg-white divide-y divide-gray-100 mb-8">
                        {FAQS.map((item, i) => <FAQ key={i} q={item.q} a={item.a} />)}
                      </div>

                      <div className="border border-[#0818A8]/15 bg-[#0818A8]/4 p-5">
                        <p className="text-[9.5px] font-bold tracking-[0.28em] uppercase text-[#0818A8] mb-2">Direct Contact</p>
                        <p className="text-gray-700 text-[13.5px] font-light leading-relaxed mb-4">Prefer to speak to someone first? Our partnerships team is available Mon–Fri 9am–6pm.</p>
                        <div className="space-y-2.5">
                          <a href="tel:+448007720864" className="flex items-center gap-3 text-gray-800 hover:text-[#0818A8] font-semibold text-[13px] transition-colors" aria-label="Call R-Zone: +44 800 772 0864">
                            <Phone size={13} className="text-[#0818A8]" aria-hidden="true" /> +44 800 772 0864
                          </a>
                          <a href="mailto:partners@r-zoneenterprises.com" className="flex items-center gap-3 text-gray-800 hover:text-[#0818A8] font-semibold text-[13px] transition-colors" aria-label="Email partnerships team">
                            <Mail size={13} className="text-[#0818A8]" aria-hidden="true" /> partners@r-zoneenterprises.com
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </div>

              {/* Right — Form */}
              <div className="lg:col-span-7">
                {(() => {
                  const ref = useRef(null);
                  const inView = useInView(ref, { once: true, margin: "-60px" });
                  return (
                    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.2 }}>
                      <ApplicationForm />
                    </motion.div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}