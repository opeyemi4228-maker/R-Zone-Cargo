"use client";

import { Montserrat, Outfit } from "next/font/google";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, ArrowRight,
  ChevronRight, CheckCircle, Send, User,
  MessageSquare, Package, Plane, Ship,
  Truck, Building2, Globe, Instagram,
  AlertCircle, Loader2, Star, Shield,
  ChevronDown, Warehouse, FileCheck,
  Anchor, BarChart3,
} from "lucide-react";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const CONTACT_CHANNELS = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+44 800 772 0864",
    sub: "Free to call · Mon–Fri 9am–6pm, Sat 10am–2pm",
    href: "tel:+448007720864",
    accent: "#0818A8",
    cta: "Call Now",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@r-zoneenterprises.com",
    sub: "Same-day response guaranteed on weekdays",
    href: "mailto:info@r-zoneenterprises.com",
    accent: "#1F51FF",
    cta: "Send Email",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@rzoneenterprise",
    sub: "DM us for quick quotes & updates",
    href: "https://www.instagram.com/rzoneenterprise",
    accent: "#0437F2",
    cta: "Follow Us",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Essex, RM14 3TS",
    sub: "Unit 10 Moorhen Yard, Elms Lane, Upminster",
    href: "https://maps.google.com/?q=Unit+10+Moorhen+Yard+Elms+Lane+Essex+RM14+3TS",
    accent: "#0818A8",
    cta: "Get Directions",
  },
];

const OFFICES = [
  {
    flag: "🇬🇧",
    country: "United Kingdom",
    role: "Headquarters & Warehouse",
    address: "Unit 10 Moorhen Yard, Elms Lane, Upminster, Essex RM14 3TS",
    phone: "+44 800 772 0864",
    email: "info@r-zoneenterprises.com",
    hours: [
      { day: "Monday – Friday", time: "9:00am – 6:00pm" },
      { day: "Saturday",        time: "10:00am – 2:00pm" },
      { day: "Sunday",          time: "Closed" },
    ],
    accent: "#0818A8",
  },
  {
    flag: "🇳🇬",
    country: "Nigeria",
    role: "Operations Hub — Lagos",
    address: "2 Esan Olusegun Close, Igando, Lagos State, Nigeria",
    phone: "+234 (0) 808 000 0000",
    email: "nigeria@r-zoneenterprises.com",
    hours: [
      { day: "Monday – Friday", time: "8:00am – 5:00pm WAT" },
      { day: "Saturday",        time: "9:00am – 1:00pm WAT" },
      { day: "Sunday",          time: "Closed" },
    ],
    accent: "#1F51FF",
  },
];

const ENQUIRY_TYPES = [
  { value: "quote",      label: "Get a Quote",             icon: BarChart3  },
  { value: "air",        label: "Air Freight",             icon: Plane      },
  { value: "sea",        label: "Sea Shipping",            icon: Ship       },
  { value: "door",       label: "Door to Door",            icon: Truck      },
  { value: "import",     label: "Importation from Nigeria",icon: Package    },
  { value: "customs",    label: "Customs Clearance",       icon: FileCheck  },
  { value: "warehouse",  label: "Warehousing",             icon: Warehouse  },
  { value: "cargo",      label: "Cargo Handling",          icon: Anchor     },
  { value: "business",   label: "Business / B2B",          icon: Building2  },
  { value: "tracking",   label: "Track a Shipment",        icon: MapPin     },
  { value: "other",      label: "General Enquiry",         icon: MessageSquare },
];

const FAQS = [
  {
    q: "How quickly will you respond to my enquiry?",
    a: "We respond to all enquiries received Monday–Friday within the same business day. Weekend messages are answered first thing Monday morning.",
  },
  {
    q: "Can I get a quote over the phone?",
    a: "Absolutely — call +44 800 772 0864 and our team will provide an instant quote based on your shipment details. It takes less than 5 minutes.",
  },
  {
    q: "Do you offer collections from all UK locations?",
    a: "Yes, we collect from anywhere in the UK. Collection charges vary by location. Our Essex warehouse also accepts drop-offs during opening hours.",
  },
  {
    q: "Can I visit your warehouse to drop off cargo?",
    a: "Yes — our Essex warehouse accepts drop-offs Monday–Friday 9am–6pm and Saturday 10am–2pm. Please call ahead so we can prepare for your arrival.",
  },
  {
    q: "Do you ship commercial / business cargo?",
    a: "Yes — we serve both individuals and businesses. For high-volume or regular shipments, contact us to discuss tailored commercial rates and SLA agreements.",
  },
  {
    q: "What information do I need to get a quote?",
    a: "We need your cargo dimensions/weight, the destination in Nigeria, whether you need air or sea, and whether you want door collection or warehouse drop-off.",
  },
];

const TRUST_BADGES = [
  { icon: Star,         label: "107+ Five-Star Reviews" },
  { icon: Shield,       label: "Fully Insured Cargo"    },
  { icon: Clock,        label: "Same-Day Response"      },
  { icon: CheckCircle,  label: "No Automated Replies"   },
];

// ─── Animation ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

// ─── Tag Pill ─────────────────────────────────────────────────────────────────
function TagPill({ label, dark = true }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-6 ${
      dark ? "border-[#1F51FF]/30 bg-[#0818A8]/14" : "border-[#0818A8]/20 bg-[#0818A8]/6"
    }`}>
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-[#1F51FF] flex-shrink-0"
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        aria-hidden="true"
      />
      <span className={`text-[10px] font-bold tracking-[0.28em] uppercase ${
        dark ? "text-[#1F51FF]" : "text-[#0818A8]"
      }`}>{label}</span>
    </div>
  );
}

// ─── Heading with animated underline ─────────────────────────────────────────
function PageHeading({ line1, accent, dark = true, as: Tag = "h2", id }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <Tag
      id={id}
      ref={ref}
      className={`font-black text-[clamp(26px,4.5vw,52px)] leading-[0.92] tracking-[-0.028em] uppercase ${
        dark ? "text-white" : "text-[#0b0f1a]"
      }`}
    >
      {line1}{" "}
      <span className="relative inline-block text-[#1F51FF]">
        {accent}
        <motion.span
          className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#1F51FF]"
          aria-hidden="true"
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : {}}
          transition={{ duration: 0.55, delay: 0.5 }}
        />
      </span>
    </Tag>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════
function Hero() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      className="relative bg-[#00061a] overflow-hidden hero-section"
      aria-labelledby="contact-hero-heading"
    >
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[15%] w-[800px] h-[500px] bg-[#0818A8]/16 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[400px] bg-[#1F51FF]/10 rounded-full blur-[120px]" />
      </div>
      {/* Vertical accent */}
      <div className="absolute top-0 right-[20%] w-px h-full opacity-[0.06] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1F51FF 40%, transparent)" }}
        aria-hidden="true"
      />

      <div
        ref={ref}
        className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pt-[120px] pb-16 md:pb-20"
      >
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}
        >
          <Link href="/" className="text-white/40 text-[11.5px] font-medium hover:text-white transition-colors">Home</Link>
          <ChevronRight size={11} className="text-white/40" aria-hidden="true" />
          <span className="text-white/55 text-[11.5px] font-medium" aria-current="page">Contact Us</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">

          {/* LEFT */}
          <div className="lg:col-span-6">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp} custom={0}>
                <TagPill label="Talk to a Real Person" dark />
              </motion.div>

              <motion.h1
                id="contact-hero-heading"
                variants={fadeUp}
                custom={0.1}
                className="text-white font-black text-[clamp(36px,7vw,80px)] leading-[0.88] tracking-[-0.035em] uppercase mb-6"
              >
                Let's{" "}
                <span className="relative inline-block">
                  <span className="text-[#1F51FF]">Talk.</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[4px] rounded-full bg-[#1F51FF]"
                    aria-hidden="true"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : {}}
                    transition={{ duration: 0.6, delay: 0.75 }}
                  />
                </span>
                <br />
                <span className="text-white/40">We're Ready.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="text-white/50 text-[15px] font-light leading-relaxed tracking-wide max-w-lg mb-9"
              >
                No call centres. No automated emails. When you contact R-Zone Enterprises,
                you speak directly to our UK-based logistics team — same day, every time.
              </motion.p>

              {/* Trust row */}
              <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap gap-4">
                {TRUST_BADGES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={12} className="text-[#1F51FF]" aria-hidden="true" />
                    <span className="text-white/45 text-[11.5px] font-light">{label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — quick contact cards */}
          <motion.div
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {CONTACT_CHANNELS.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <motion.a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative border border-white/[0.08] bg-white/[0.04] p-5 hover:border-white/[0.22] hover:bg-white/[0.08] transition-all duration-300 overflow-hidden"
                  aria-label={`${ch.label}: ${ch.value}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                >
                  <div
                    className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
                    style={{ backgroundColor: ch.accent }}
                    aria-hidden="true"
                  />
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${ch.accent}20` }}
                    aria-hidden="true"
                  >
                    <Icon size={15} style={{ color: ch.accent }} />
                  </div>
                  <p className="text-[9.5px] font-bold tracking-[0.22em] uppercase text-white/40 mb-1">{ch.label}</p>
                  <p className="text-white font-semibold text-[12.5px] leading-tight mb-1 break-all">{ch.value}</p>
                  <p className="text-white/40 text-[11px] font-light leading-snug mb-3">{ch.sub}</p>
                  <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.08em] transition-colors duration-200"
                    style={{ color: ch.accent }}>
                    {ch.cta}
                    <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#00061a] to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════════════════════════════
function ContactForm() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [form, setForm] = useState({
    name: "", email: "", phone: "", enquiryType: "", subject: "", message: "",
  });
  const [errors, setErrors]     = useState({});
  const [status, setStatus]     = useState("idle"); // idle | loading | success | error
  const [touched, setTouched]   = useState({});

  const validate = useCallback((data) => {
    const e = {};
    if (!data.name.trim())         e.name         = "Your name is required.";
    if (!data.email.trim())        e.email        = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Please enter a valid email.";
    if (!data.enquiryType)         e.enquiryType  = "Please select an enquiry type.";
    if (!data.message.trim())      e.message      = "Please tell us about your enquiry.";
    else if (data.message.trim().length < 20) e.message = "Please provide a little more detail (20 chars min).";
    return e;
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const e = validate({ ...form, [field]: value });
      setErrors(prev => ({ ...prev, [field]: e[field] }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const e = validate(form);
    setErrors(prev => ({ ...prev, [field]: e[field] }));
  };

  const handleSubmit = async () => {
    const allTouched = Object.fromEntries(Object.keys(form).map(k => [k, true]));
    setTouched(allTouched);
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus("loading");
    // Simulate API call — replace with real endpoint
    await new Promise(r => setTimeout(r, 1800));
    setStatus("success");
  };

  const fieldClass = (field) =>
    `w-full bg-white/[0.05] border text-white text-[13px] font-light placeholder-white/25
     px-4 py-3 outline-none transition-all duration-200
     focus:bg-white/[0.08] focus:border-[#1F51FF]/60
     ${errors[field] && touched[field]
       ? "border-red-400/60 bg-red-400/5"
       : "border-white/[0.1] hover:border-white/[0.2]"
     }`;

  const labelClass = "block text-[10.5px] font-bold tracking-[0.2em] uppercase text-white/45 mb-2";

  return (
    <section
      ref={ref}
      className="relative bg-[#00061a] overflow-hidden"
      aria-labelledby="contact-form-heading"
      id="contact-form"
    >
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/50 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] bg-[#0818A8]/08 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

          {/* LEFT — copy + why contact us */}
          <div className="lg:col-span-4">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp} custom={0}>
                <TagPill label="Send a Message" dark />
              </motion.div>
              <motion.div variants={fadeUp} custom={0.05}>
                <PageHeading line1="Send Us" accent="A Message." dark id="contact-form-heading" />
              </motion.div>
              <motion.p
                variants={fadeUp}
                custom={0.15}
                className="text-white/45 text-[13.5px] font-light leading-relaxed mt-5 mb-8"
              >
                Fill in the form and a member of our UK team will respond within the same
                business day — usually within a few hours.
              </motion.p>

              {/* What happens next */}
              <motion.div variants={fadeUp} custom={0.2} className="border border-white/[0.08] bg-white/[0.03] p-6 mb-6">
                <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] -mx-6 -mt-6 mb-6" aria-hidden="true" />
                <p className="text-[9.5px] font-bold tracking-[0.28em] uppercase text-white/40 mb-5">What Happens Next</p>
                {[
                  { n: "01", t: "You submit the form",        d: "Takes less than 2 minutes" },
                  { n: "02", t: "We review your enquiry",     d: "By our UK logistics team" },
                  { n: "03", t: "We respond same day",        d: "Mon–Fri business hours" },
                  { n: "04", t: "We get your cargo moving",   d: "From booking to delivery" },
                ].map((s, si) => (
                  <div key={s.n} className="flex items-start gap-3 pb-4 last:pb-0 relative">
                    {si < 3 && (
                      <div className="absolute left-[11px] top-[26px] w-px h-[calc(100%-12px)] bg-white/[0.08]" aria-hidden="true" />
                    )}
                    <div className="w-6 h-6 rounded-full bg-[#0818A8]/30 border border-[#0818A8]/40 flex items-center justify-center flex-shrink-0 text-[9px] font-black text-[#1F51FF]" aria-label={`Step ${s.n}`}>
                      {s.n}
                    </div>
                    <div>
                      <p className="text-white/70 text-[12.5px] font-semibold leading-tight">{s.t}</p>
                      <p className="text-white/40 text-[11px] font-light">{s.d}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Direct contact */}
              <motion.div variants={fadeUp} custom={0.3} className="space-y-3">
                <p className="text-[9.5px] font-bold tracking-[0.28em] uppercase text-white/40 mb-3">Or Contact Directly</p>
                <a href="tel:+448007720864" className="flex items-center gap-3 group" aria-label="Call: +44 800 772 0864">
                  <div className="w-8 h-8 bg-[#0818A8]/20 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#0818A8]/40 transition-colors" aria-hidden="true">
                    <Phone size={13} className="text-[#1F51FF]" />
                  </div>
                  <div>
                    <p className="text-white/55 text-[10px] font-light">Phone</p>
                    <p className="text-white text-[13px] font-semibold">+44 800 772 0864</p>
                  </div>
                </a>
                <a href="mailto:info@r-zoneenterprises.com" className="flex items-center gap-3 group" aria-label="Email: info@r-zoneenterprises.com">
                  <div className="w-8 h-8 bg-[#0818A8]/20 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#0818A8]/40 transition-colors" aria-hidden="true">
                    <Mail size={13} className="text-[#1F51FF]" />
                  </div>
                  <div>
                    <p className="text-white/55 text-[10px] font-light">Email</p>
                    <p className="text-white text-[13px] font-semibold">info@r-zoneenterprises.com</p>
                  </div>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — Form */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-[#1F51FF]/30 bg-[#0818A8]/12 p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="w-16 h-16 bg-[#0818A8] rounded-full flex items-center justify-center mx-auto mb-6"
                    aria-hidden="true"
                  >
                    <CheckCircle size={28} className="text-white" />
                  </motion.div>
                  <h3 className="text-white font-black text-[26px] tracking-[-0.015em] mb-3">Message Sent!</h3>
                  <p className="text-white/50 text-[14px] font-light leading-relaxed max-w-sm mx-auto mb-8">
                    Thank you for reaching out. A member of our UK team will respond to your enquiry within the same business day.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/services" className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3 rounded-sm transition-all duration-200" aria-label="View R-Zone services">
                      View Services
                    </Link>
                    <Link href="/track" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/45 text-white text-[12px] font-bold px-6 py-3 rounded-sm transition-all duration-200" aria-label="Track a shipment">
                      Track Shipment
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  className="border border-white/[0.09] bg-white/[0.03] p-7 md:p-9 relative overflow-hidden"
                >
                  <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] absolute top-0 left-0 right-0" aria-hidden="true" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>Full Name *</label>
                      <div className="relative">
                        <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" aria-hidden="true" />
                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={e => handleChange("name", e.target.value)}
                          onBlur={() => handleBlur("name")}
                          className={`${fieldClass("name")} pl-9`}
                          aria-required="true"
                          aria-invalid={!!(errors.name && touched.name)}
                          aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                        />
                      </div>
                      {errors.name && touched.name && (
                        <p id="name-error" role="alert" className="flex items-center gap-1.5 text-red-400 text-[11px] mt-1.5">
                          <AlertCircle size={10} aria-hidden="true" />{errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className={labelClass}>Email Address *</label>
                      <div className="relative">
                        <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" aria-hidden="true" />
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={e => handleChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          className={`${fieldClass("email")} pl-9`}
                          aria-required="true"
                          aria-invalid={!!(errors.email && touched.email)}
                          aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                        />
                      </div>
                      {errors.email && touched.email && (
                        <p id="email-error" role="alert" className="flex items-center gap-1.5 text-red-400 text-[11px] mt-1.5">
                          <AlertCircle size={10} aria-hidden="true" />{errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="contact-phone" className={labelClass}>Phone Number <span className="text-white/40 normal-case font-light tracking-normal">(optional)</span></label>
                      <div className="relative">
                        <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" aria-hidden="true" />
                        <input
                          id="contact-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+44 or +234..."
                          value={form.phone}
                          onChange={e => handleChange("phone", e.target.value)}
                          className={`${fieldClass("phone")} pl-9 border-white/[0.08]`}
                        />
                      </div>
                    </div>

                    {/* Enquiry type */}
                    <div>
                      <label htmlFor="contact-enquiry" className={labelClass}>Enquiry Type *</label>
                      <div className="relative">
                        <Package size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10" aria-hidden="true" />
                        <ChevronDown size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" aria-hidden="true" />
                        <select
                          id="contact-enquiry"
                          value={form.enquiryType}
                          onChange={e => handleChange("enquiryType", e.target.value)}
                          onBlur={() => handleBlur("enquiryType")}
                          className={`${fieldClass("enquiryType")} pl-9 pr-8 appearance-none cursor-pointer`}
                          aria-required="true"
                          aria-invalid={!!(errors.enquiryType && touched.enquiryType)}
                          aria-describedby={errors.enquiryType && touched.enquiryType ? "enquiry-error" : undefined}
                          style={{ backgroundImage: "none" }}
                        >
                          <option value="" disabled style={{ backgroundColor: "#0d0d20", color: "rgba(255,255,255,0.4)" }}>Select enquiry type…</option>
                          {ENQUIRY_TYPES.map(t => (
                            <option key={t.value} value={t.value} style={{ backgroundColor: "#0d0d20", color: "#fff" }}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.enquiryType && touched.enquiryType && (
                        <p id="enquiry-error" role="alert" className="flex items-center gap-1.5 text-red-400 text-[11px] mt-1.5">
                          <AlertCircle size={10} aria-hidden="true" />{errors.enquiryType}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-5">
                    <label htmlFor="contact-subject" className={labelClass}>Subject <span className="text-white/40 normal-case font-light tracking-normal">(optional)</span></label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Brief subject line…"
                      value={form.subject}
                      onChange={e => handleChange("subject", e.target.value)}
                      className={`${fieldClass("subject")} border-white/[0.08]`}
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-7">
                    <label htmlFor="contact-message" className={labelClass}>Your Message *</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us about your cargo — origin, destination, weight/size, any special requirements…"
                      value={form.message}
                      onChange={e => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      className={`${fieldClass("message")} resize-none`}
                      aria-required="true"
                      aria-invalid={!!(errors.message && touched.message)}
                      aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                    />
                    <div className="flex items-center justify-between mt-1.5">
                      {errors.message && touched.message ? (
                        <p id="message-error" role="alert" className="flex items-center gap-1.5 text-red-400 text-[11px]">
                          <AlertCircle size={10} aria-hidden="true" />{errors.message}
                        </p>
                      ) : <span />}
                      <span className={`text-[10.5px] font-light ml-auto ${form.message.length >= 20 ? "text-green-400/60" : "text-white/40"}`}>
                        {form.message.length} chars
                      </span>
                    </div>
                  </div>

                  {/* Privacy note */}
                  <p className="text-white/40 text-[10.5px] font-light mb-5 leading-relaxed">
                    By submitting this form, you agree that R-Zone Enterprises may contact you
                    regarding your enquiry. We never share your data with third parties.
                    See our <Link href="/privacy" className="text-white/40 hover:text-white underline underline-offset-2 transition-colors">Privacy Policy</Link>.
                  </p>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[12px] font-black tracking-[0.1em] uppercase px-10 py-4 rounded-sm transition-all duration-200 shadow-xl shadow-[#0818A8]/30"
                    aria-label="Submit contact form"
                    aria-busy={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p role="alert" className="flex items-center gap-2 text-red-400 text-[12px] mt-4">
                      <AlertCircle size={13} aria-hidden="true" />
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}
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
// OFFICES
// ═══════════════════════════════════════════════════════════════════════════════
function Offices() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative bg-white overflow-hidden"
      aria-labelledby="offices-heading"
      id="offices"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            <TagPill label="Our Locations" dark={false} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <PageHeading line1="Two Countries," accent="One Team." dark={false} id="offices-heading" />
          </motion.div>
          <motion.p className="text-gray-500 text-[14px] font-light mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            Both offices are staffed by our own people — no third-party agents, no outsourcing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {OFFICES.map((office, i) => (
            <motion.div
              key={office.country}
              className="group relative border border-gray-200 bg-gray-50 overflow-hidden hover:shadow-xl hover:shadow-[#0818A8]/8 transition-all duration-400"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              {/* Top accent */}
              <div className="h-[3px] w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: office.accent }}
                aria-hidden="true"
              />

              <div className="p-8 md:p-9">
                {/* Header */}
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <span className="text-[40px] leading-none block mb-2" aria-hidden="true">{office.flag}</span>
                    <h3 className="text-[#0b0f1a] font-black text-[22px] tracking-[-0.015em]" itemProp="addressCountry">
                      {office.country}
                    </h3>
                    <p className="text-[10.5px] font-bold tracking-[0.2em] uppercase mt-0.5" style={{ color: office.accent }}>
                      {office.role}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${office.accent}12` }}
                    aria-hidden="true"
                  >
                    <Building2 size={17} style={{ color: office.accent }} />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 mb-7">
                  <div className="flex items-start gap-3">
                    <MapPin size={13} className="flex-shrink-0 mt-0.5 text-gray-400" aria-hidden="true" />
                    <p className="text-gray-600 text-[13px] font-light leading-snug" itemProp="address">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={13} className="flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <a href={`tel:${office.phone.replace(/[\s()]/g, "")}`}
                      className="text-gray-700 text-[13px] font-medium hover:text-[#0818A8] transition-colors"
                      itemProp="telephone"
                      aria-label={`Call ${office.country} office: ${office.phone}`}
                    >{office.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={13} className="flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <a href={`mailto:${office.email}`}
                      className="text-gray-700 text-[13px] font-medium hover:text-[#0818A8] transition-colors"
                      itemProp="email"
                      aria-label={`Email ${office.country} office: ${office.email}`}
                    >{office.email}</a>
                  </div>
                </div>

                {/* Hours table */}
                <div className="border-t border-gray-100 pt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={11} className="text-gray-400" aria-hidden="true" />
                    <p className="text-[9.5px] font-bold tracking-[0.22em] uppercase text-gray-400">Opening Hours</p>
                  </div>
                  <dl className="space-y-1.5">
                    {office.hours.map(({ day, time }) => (
                      <div key={day} className="flex items-center justify-between">
                        <dt className="text-gray-500 text-[12px] font-light">{day}</dt>
                        <dd className={`text-[12px] font-semibold ${time === "Closed" ? "text-gray-400" : "text-gray-800"}`}
                          itemProp="openingHours"
                        >{time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map placeholder */}
        <motion.div
          className="relative border border-gray-200 overflow-hidden bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.4 }}
        >
          <div className="aspect-[21/6] md:aspect-[21/5] flex items-center justify-center relative"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          >
            <div className="text-center z-10 relative">
              <div className="w-14 h-14 bg-[#0818A8] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#0818A8]/30" aria-hidden="true">
                <MapPin size={22} className="text-white" />
              </div>
              <p className="text-[#0b0f1a] font-bold text-[14px] mb-1">Unit 10 Moorhen Yard, Elms Lane</p>
              <p className="text-gray-500 text-[12px] font-light mb-5">Upminster, Essex RM14 3TS, United Kingdom</p>
              <a
                href="https://maps.google.com/?q=Unit+10+Moorhen+Yard+Elms+Lane+Essex+RM14+3TS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.08em] uppercase px-6 py-2.5 rounded-sm transition-colors duration-200"
                aria-label="Get directions to R-Zone Essex warehouse (opens Google Maps)"
              >
                <MapPin size={11} aria-hidden="true" />
                Get Directions
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════════════════════
function FAQ() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState(null);

  return (
    <section
      ref={ref}
      className="relative bg-[#00061a] overflow-hidden"
      aria-labelledby="faq-heading"
      id="faq"
    >
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0818A8]/08 rounded-full blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left — heading */}
          <div className="lg:col-span-4">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp} custom={0}>
                <TagPill label="Common Questions" dark />
              </motion.div>
              <motion.div variants={fadeUp} custom={0.05}>
                <PageHeading line1="Frequently" accent="Asked." dark id="faq-heading" />
              </motion.div>
              <motion.p variants={fadeUp} custom={0.15} className="text-white/42 text-[13.5px] font-light leading-relaxed mt-5 mb-8">
                Can't find your answer? Call us on{" "}
                <a href="tel:+448007720864" className="text-[#1F51FF] hover:text-white transition-colors font-medium">
                  +44 800 772 0864
                </a>{" "}
                or use the contact form above.
              </motion.p>

              <motion.div variants={fadeUp} custom={0.25}>
                <a
                  href="#contact-form"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-[#0818A8] hover:bg-[#0818A8]/20 text-white text-[11.5px] font-bold tracking-[0.07em] uppercase px-5 py-2.5 rounded-sm transition-all duration-200"
                  aria-label="Scroll to contact form"
                >
                  <MessageSquare size={12} aria-hidden="true" />
                  Send a Message
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-8">
            <dl className="space-y-0">
              {FAQS.map((item, i) => (
                <motion.div
                  key={i}
                  className="border-b border-white/[0.07] last:border-0"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <dt>
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                      aria-expanded={open === i}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <span className={`text-[13.5px] font-semibold leading-snug transition-colors duration-200 ${
                        open === i ? "text-white" : "text-white/70 group-hover:text-white"
                      }`}>
                        {item.q}
                      </span>
                      <motion.div
                        animate={{ rotate: open === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <ChevronDown size={15} className={`transition-colors duration-200 ${
                          open === i ? "text-[#1F51FF]" : "text-white/40 group-hover:text-white/55"
                        }`} />
                      </motion.div>
                    </button>
                  </dt>
                  <AnimatePresence>
                    {open === i && (
                      <motion.dd
                        id={`faq-answer-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/45 text-[13px] font-light leading-relaxed pb-5 pr-8">
                          {item.a}
                        </p>
                      </motion.dd>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SOCIAL PROOF BAR
// ═══════════════════════════════════════════════════════════════════════════════
function SocialProofBar() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="bg-[#0818A8] relative overflow-hidden"
      role="region"
      aria-label="Customer trust statistics"
    >
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-8 md:py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0 justify-between">
          <p className="text-white/50 text-[10px] font-bold tracking-[0.3em] uppercase flex-shrink-0">Why Customers Choose Us</p>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              { val: "107+",    label: "5-Star Reviews",       icon: Star },
              { val: "99%",     label: "Delivery Rate",        icon: CheckCircle },
              { val: "12+",     label: "Years in Business",    icon: Clock },
              { val: "50,000+", label: "Shipments Delivered",  icon: Package },
            ].map(({ val, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Icon size={14} className="text-white/55" aria-hidden="true" />
                <span className="text-white font-black text-[16px] leading-none">{val}</span>
                <span className="text-white/50 text-[11px] font-light">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FINAL CTA
// ═══════════════════════════════════════════════════════════════════════════════
function FinalCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative bg-white overflow-hidden"
      aria-label="Get a quote or call R-Zone"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Quote CTA */}
          <motion.div
            className="relative bg-[#0818A8] p-10 overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none translate-x-16 translate-y-16" aria-hidden="true" />
            <div className="relative z-10">
              <div className="w-11 h-11 bg-white/15 rounded-sm flex items-center justify-center mb-6" aria-hidden="true">
                <BarChart3 size={18} className="text-white" />
              </div>
              <h3 className="text-white font-black text-[22px] leading-tight tracking-[-0.01em] mb-3">
                Get a Free Quote
              </h3>
              <p className="text-white/62 text-[13px] font-light leading-relaxed mb-8">
                Tell us about your shipment and we'll provide a transparent, competitive quote — no hidden charges.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2.5 bg-white text-[#0818A8] text-[11.5px] font-black tracking-[0.08em] uppercase px-6 py-3 hover:bg-white/90 transition-colors duration-200"
                aria-label="Get a free shipping quote"
              >
                Get Quote
                <ArrowRight size={11} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* Call CTA */}
          <motion.div
            className="relative border-2 border-[#0818A8]/15 bg-gray-50 p-10 overflow-hidden hover:border-[#0818A8]/40 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <div className="w-11 h-11 bg-[#0818A8]/10 rounded-sm flex items-center justify-center mb-6" aria-hidden="true">
              <Phone size={18} className="text-[#0818A8]" />
            </div>
            <h3 className="text-[#0b0f1a] font-black text-[22px] leading-tight tracking-[-0.01em] mb-3">
              Prefer to Call?
            </h3>
            <p className="text-gray-500 text-[13px] font-light leading-relaxed mb-8">
              Our UK team is available Monday–Friday 9am–6pm and Saturday 10am–2pm. Free to call.
            </p>
            <a
              href="tel:+448007720864"
              className="inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-colors duration-200"
              aria-label="Call R-Zone Enterprises: +44 800 772 0864"
            >
              <Phone size={11} aria-hidden="true" />
              +44 800 772 0864
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function ContactPageClient() {
  return (
    <>
      {/* ── Structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact R-Zone Enterprises",
            "url": "https://r-zoneenterprises.com/contact",
            "description": "Contact R-Zone Enterprises for UK–Nigeria cargo shipping enquiries, quotes and tracking support.",
            "mainEntity": {
              "@type": ["Organization", "LocalBusiness"],
              "name": "R-Zone Enterprises",
              "url": "https://r-zoneenterprises.com",
              "telephone": "+448007720864",
              "email": "info@r-zoneenterprises.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Unit 10 Moorhen Yard, Elms Lane",
                "addressLocality": "Upminster",
                "addressRegion": "Essex",
                "postalCode": "RM14 3TS",
                "addressCountry": "GB",
              },
              "openingHoursSpecification": [
                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" },
                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "10:00", "closes": "14:00" },
              ],
              "contactPoint": [
                { "@type": "ContactPoint", "telephone": "+44-800-772-0864", "contactType": "customer service", "areaServed": "GB", "availableLanguage": "English" },
                { "@type": "ContactPoint", "email": "info@r-zoneenterprises.com", "contactType": "customer support" },
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map(item => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": { "@type": "Answer", "text": item.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home",       "item": "https://r-zoneenterprises.com" },
              { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://r-zoneenterprises.com/contact" },
            ],
          }),
        }}
      />

      <div className={`${montserrat.variable} ${outfit.variable} font-[family-name:var(--font-montserrat)] w-full`}>
        <Hero />
        <SocialProofBar />
        <ContactForm />
        <Offices />
        <FAQ />
        <FinalCTA />
      </div>
    </>
  );
}