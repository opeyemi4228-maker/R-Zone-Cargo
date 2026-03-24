"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Briefcase, ArrowRight, ChevronRight, Phone, Mail,
  Check, Star, Globe, Users, MapPin, Clock,
  Heart, Zap, TrendingUp, Shield, Award,
  CheckCircle, AlertCircle, Loader2, Send,
  User, ChevronDown, Building2, Upload,
  Package, Truck, BarChart3, Target,
  Coffee, Laptop, GraduationCap,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const OPEN_ROLES = [
  {
    id: "ops-coordinator",
    title: "Operations Coordinator",
    department: "Operations",
    location: "Essex, UK",
    type: "Full-time",
    level: "Mid-level",
    icon: Package,
    desc: "Own the day-to-day coordination of UK-side freight operations from cargo intake and consolidation scheduling to customer updates and carrier liaison. The beating heart of our Essex warehouse.",
    responsibilities: [
      "Coordinate daily cargo intake, labelling, and warehouse movement",
      "Maintain sailing and flight schedule accuracy across all systems",
      "Communicate shipment status updates to customers proactively",
      "Liaise with airline and carrier partners on bookings and manifests",
      "Support customs documentation preparation and filing",
      "Identify and report process improvement opportunities",
    ],
    requirements: [
      "1–3 years experience in freight forwarding, logistics, or warehousing",
      "Strong organisational skills and attention to detail",
      "Confident written and verbal communication",
      "Experience with freight management software (preferred)",
      "Nigerian language skills (Yoruba, Igbo, or Hausa) an advantage",
    ],
    salary: "£26,000 – £32,000",
    urgent: false,
  },
  {
    id: "customer-relations",
    title: "Customer Relations Advisor",
    department: "Customer Experience",
    location: "Essex, UK (Hybrid)",
    type: "Full-time",
    level: "Entry–Mid",
    icon: Users,
    desc: "Be the voice of R-Zone for our customers answering enquiries, tracking shipments, resolving issues, and turning every interaction into a reason to come back. You'll work across phone, email, and WhatsApp.",
    responsibilities: [
      "Handle inbound customer enquiries by phone, email and WhatsApp",
      "Provide accurate shipment tracking and status updates",
      "Resolve complaints and escalations with empathy and efficiency",
      "Process bookings and generate customer quotes",
      "Maintain accurate CRM records for every customer interaction",
      "Upsell appropriate services where relevant and natural",
    ],
    requirements: [
      "Experience in customer service, retail, or hospitality (minimum 1 year)",
      "Excellent spoken and written English",
      "Warm, professional telephone manner",
      "Patience and resilience: You'll handle complex situations",
      "Fluency in Yoruba, Igbo, or Pidgin English strongly preferred",
    ],
    salary: "£23,000 – £27,000",
    urgent: true,
  },
  {
    id: "nigeria-ops",
    title: "Nigeria Operations Manager",
    department: "Operations",
    location: "Lagos, Nigeria",
    type: "Full-time",
    level: "Senior",
    icon: Globe,
    desc: "Lead our Lagos operations managing the Nigeria-side logistics team, port clearance agents, last-mile delivery partners, and customer delivery experience across all 36 states. This is a senior leadership role with direct board visibility.",
    responsibilities: [
      "Manage all Nigeria-side logistics operations and team",
      "Oversee customs clearance at Apapa and Tin Can Island ports",
      "Build and maintain relationships with Nigerian delivery partners",
      "Ensure last-mile delivery standards meet R-Zone SLAs",
      "Report on Nigeria operations KPIs weekly to UK leadership",
      "Identify cost reduction and service improvement opportunities",
    ],
    requirements: [
      "5+ years experience in Nigerian freight, logistics, or supply chain",
      "Deep knowledge of Nigerian Customs Service (NCS) procedures",
      "Strong commercial acumen and contract negotiation skills",
      "Proven people management experience (team of 5+)",
      "Excellent English; Yoruba or Igbo an advantage",
    ],
    salary: "Competitive : Lagos market rate",
    urgent: false,
  },
  {
    id: "sales-exec",
    title: "Business Development Executive",
    department: "Sales & Growth",
    location: "Essex, UK (Field + Remote)",
    type: "Full-time",
    level: "Mid-level",
    icon: TrendingUp,
    desc: "Own the growth of R-Zone's B2B customer base prospecting, pitching, and closing commercial accounts with UK businesses that import from or export to Nigeria. Uncapped commission. Real autonomy.",
    responsibilities: [
      "Prospect and qualify B2B leads in target sectors (FMCG, retail, manufacturing)",
      "Deliver compelling sales presentations and freight consultations",
      "Negotiate and close commercial freight contracts",
      "Build pipeline through networking, LinkedIn, and trade events",
      "Collaborate with operations to ensure service delivery meets sales promises",
      "Achieve and exceed monthly revenue and new account targets",
    ],
    requirements: [
      "2+ years B2B sales experience (logistics, freight, or related preferred)",
      "Proven track record of hitting commercial targets",
      "Strong network in the UK–Nigerian business community an advantage",
      "Self-motivated and comfortable working independently",
      "Full UK driving licence",
    ],
    salary: "£28,000 – £35,000 base + uncapped commission",
    urgent: false,
  },
  {
    id: "customs-clerk",
    title: "Customs & Compliance Clerk",
    department: "Compliance",
    location: "Essex, UK",
    type: "Full-time",
    level: "Entry–Mid",
    icon: Shield,
    desc: "Support our customs and compliance operation preparing and filing UK export declarations, checking cargo documentation, and ensuring every shipment meets regulatory requirements before it leaves the UK.",
    responsibilities: [
      "Prepare and file UK export declarations via HMRC's CDS system",
      "Review shipping documentation for accuracy and completeness",
      "Classify commodities and apply correct tariff codes",
      "Liaise with customers to obtain missing or corrected documentation",
      "Maintain compliance records per HMRC retention requirements",
      "Stay current with UK trade regulations and tariff updates",
    ],
    requirements: [
      "Knowledge of UK customs procedures and CDS (or willingness to learn)",
      "Degree in International Trade, Law, or Business (desirable, not essential)",
      "Strong numerical and administrative accuracy",
      "Ability to work to strict deadlines",
      "CILT qualification or willingness to study an advantage",
    ],
    salary: "£22,000 – £28,000 + study support",
    urgent: false,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Executive",
    department: "Marketing",
    location: "Essex, UK (Hybrid)",
    type: "Full-time",
    level: "Mid-level",
    icon: BarChart3,
    desc: "Drive R-Zone's growth through digital channels managing SEO, paid social, content, and email campaigns that turn UK-based Nigerians into loyal customers. We're investing heavily in digital and need someone to own it.",
    responsibilities: [
      "Manage and optimise Google Ads, Facebook/Instagram paid campaigns",
      "Grow organic search visibility through SEO content and technical improvements",
      "Create and schedule social media content for Instagram, Facebook, and TikTok",
      "Manage email marketing calendar and campaign performance",
      "Report on digital KPIs weekly with clear insight and recommendations",
      "Work with external creative on video and graphic content",
    ],
    requirements: [
      "2+ years digital marketing experience (agency or in-house)",
      "Proficiency in Google Ads, Meta Ads Manager, and Google Analytics",
      "Strong copy writing in clear, accessible English",
      "Understanding of the Nigerian diaspora audience in the UK an advantage",
      "Experience with Mailchimp, Klaviyo, or similar email platforms",
    ],
    salary: "£27,000 – £33,000",
    urgent: false,
  },
];

const DEPARTMENTS = ["All", "Operations", "Customer Experience", "Sales & Growth", "Compliance", "Marketing"];

const VALUES = [
  { icon: Target,        title: "Own It",          body: "We give people responsibility and trust them to run with it. No micromanagement. No permission-seeking. If something needs doing, you do it."                      },
  { icon: Users,         title: "Team First",       body: "We win as a team. Egos at the door. Whether it's a bank holiday sea freight crisis or a last-minute customer escalation — we've all got each other's backs."    },
  { icon: TrendingUp,    title: "Keep Growing",     body: "The UK–Nigeria logistics space is changing fast. We need people who are curious, who read, who ask questions, and who bring new ideas to the table every week."   },
  { icon: Heart,         title: "Serve Well",       body: "Every cargo shipment we handle matters to a real family or a real business. We never lose sight of that. Service isn't a department — it's who we are."         },
];

const BENEFITS = [
  { icon: BarChart3,     title: "Competitive Salary",    body: "Market-rate pay reviewed annually, with clear progression frameworks" },
  { icon: GraduationCap,title: "Learning Budget",        body: "£500/year personal development budget for courses, qualifications, and conferences" },
  { icon: Coffee,        title: "Flexible Working",      body: "Hybrid options for eligible roles — we trust our people to get the work done" },
  { icon: Award,         title: "Performance Bonus",     body: "Company-wide bonus pool based on business performance, distributed fairly" },
  { icon: Laptop,        title: "Equipment Provided",    body: "Everything you need to do your best work, provided from day one" },
  { icon: Globe,         title: "Nigeria Travel",        body: "Opportunity to travel to our Lagos operations hub for relevant roles" },
  { icon: Users,         title: "Real Impact",           body: "Work for a company where your contribution is visible, valued, and consequential" },
  { icon: Heart,         title: "Inclusive Culture",     body: "A team that reflects the community we serve — diverse, welcoming, and human" },
];

const PROCESS = [
  { num: "01", title: "Apply Online",          body: "Submit your CV and a short covering note below. We review every application personally — no automated rejections.",          time: "3 min"       },
  { num: "02", title: "Initial Phone Call",    body: "If your background looks like a fit, we'll call for a 20-minute conversation about the role and your experience.",          time: "20 min"      },
  { num: "03", title: "Interview",             body: "A focused interview with the hiring manager — in person at our Essex office or via video call depending on the role.",     time: "45–60 min"   },
  { num: "04", title: "Offer & Start",         body: "We move fast. Successful candidates typically receive an offer within a week of interview and can start within 2–4 weeks.", time: "1–4 weeks"   },
];

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
      <span className={`text-[13px] font-bold tracking-[0.3em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>{label}</span>
    </div>
  );
}

function SectionHeading({ line1, accent, dark = false, id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <h2 id={id} ref={ref} className={`font-black text-[clamp(26px,4.5vw,52px)] leading-[0.92] tracking-[-0.028em] uppercase ${dark ? "text-white" : "text-gray-900"}`}>
      {line1}{" "}
      <span className="relative inline-block text-[#0818A8]">
        {accent}
        <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full" aria-hidden="true"
          initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.5 }} />
      </span>
    </h2>
  );
}

// ─── Job card ─────────────────────────────────────────────────────────────────
function JobCard({ role, onApply }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = role.icon;

  return (
    <motion.article
      ref={ref}
      className={`border bg-white overflow-hidden transition-all duration-300 ${role.urgent ? "border-[#0818A8]" : "border-gray-200 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/8"}`}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
      itemScope itemType="https://schema.org/JobPosting"
    >
      {role.urgent && (
        <div className="bg-[#0818A8] px-5 py-1.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
          <span className="text-white text-[13px] font-bold tracking-[0.25em] uppercase">Urgently Hiring</span>
        </div>
      )}
      <div className={`h-[2px] ${!role.urgent ? "bg-gradient-to-r from-gray-100 to-gray-100 group-hover:from-[#0818A8] group-hover:to-[#1F51FF]" : "bg-gradient-to-r from-[#0818A8] to-[#1F51FF]"}`} aria-hidden="true" />

      <div className="p-6 md:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 bg-[#0818A8]/8 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <Icon size={18} className="text-[#0818A8]" />
            </div>
            <div>
              <h3 className="text-gray-900 font-black text-[17px] tracking-[-0.015em] mb-1" itemProp="title">{role.title}</h3>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-[13px] text-gray-600 font-normal">
                  <Building2 size={11} className="text-gray-400" aria-hidden="true" />{role.department}
                </span>
                <span className="text-gray-300 text-[13px]">|</span>
                <span className="flex items-center gap-1.5 text-[13px] text-gray-600 font-normal" itemProp="jobLocation">
                  <MapPin size={11} className="text-gray-400" aria-hidden="true" />{role.location}
                </span>
                <span className="text-gray-300 text-[13px]">|</span>
                <span className="flex items-center gap-1.5 text-[13px] text-gray-600 font-normal">
                  <Clock size={11} className="text-gray-400" aria-hidden="true" />{role.type}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-0.5">Salary</p>
            <p className="text-[#0818A8] font-bold text-[13px] leading-tight" itemProp="baseSalary">{role.salary}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-[13.5px] font-normal leading-relaxed mb-5" itemProp="description">{role.desc}</p>

        {/* Expand/collapse */}
        <button
          onClick={() => setExpanded(o => !o)}
          className="flex items-center gap-2 text-[13px] font-semibold text-[#0818A8] hover:text-[#0437F2] transition-colors mb-5"
          aria-expanded={expanded}>
          {expanded ? "Show Less" : "View Full Job Description"}
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} aria-hidden="true">
            <ChevronDown size={13} />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100 mb-5">
                <div>
                  <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-gray-500 mb-3">Responsibilities</p>
                  <ul className="space-y-2">
                    {role.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle size={11} className="text-[#0818A8] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-700 text-[13px] font-normal leading-snug">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-gray-500 mb-3">Requirements</p>
                  <ul className="space-y-2">
                    {role.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8] flex-shrink-0 mt-[0.45em]" aria-hidden="true" />
                        <span className="text-gray-700 text-[13px] font-normal leading-snug">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Level badge + Apply */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 bg-[#0818A8]/8 text-[#0818A8]">
            {role.level}
          </span>
          <button
            onClick={() => onApply(role)}
            className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-6 py-2.5 transition-all duration-200 shadow-md shadow-[#0818A8]/20"
            aria-label={`Apply for ${role.title}`}>
            Apply Now <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Application form ─────────────────────────────────────────────────────────
function ApplyModal({ role, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", cv: "", cover: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = useCallback((data) => {
    const e = {};
    if (!data.name.trim())  e.name  = "Your name is required.";
    if (!data.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Please enter a valid email.";
    if (!data.phone.trim()) e.phone = "Phone number is required.";
    if (!data.cover.trim()) e.cover = "Please include a brief covering note.";
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
    const allTouched = { name: true, email: true, phone: true, cover: true };
    setTouched(allTouched);
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1800));
    setStatus("success");
  };

  const inputCls = (field) =>
    `w-full border text-gray-900 text-[13.5px] font-normal placeholder-gray-400 px-4 py-3.5 outline-none transition-all duration-200
     focus:border-[#0818A8] focus:ring-1 focus:ring-[#0818A8]/20 bg-white
     ${errors[field] && touched[field] ? "border-red-400 bg-red-50/30" : "border-gray-300 hover:border-gray-400"}`;

  const labelCls = "block text-[13px] font-bold tracking-[0.2em] uppercase text-gray-600 mb-2";

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        className="relative bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="h-[3px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />

        {status === "success" ? (
          <div className="p-10 text-center">
            <motion.div className="w-14 h-14 bg-[#0818A8] rounded-full flex items-center justify-center mx-auto mb-5"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
              <CheckCircle size={24} className="text-white" aria-hidden="true" />
            </motion.div>
            <h3 className="font-black text-[22px] text-gray-900 tracking-[-0.015em] mb-3">Application Submitted!</h3>
            <p className="text-gray-600 text-[14px] font-normal leading-relaxed mb-6">
              Thank you, <strong className="font-semibold text-gray-800">{form.name}</strong>. We've received your application for <strong className="font-semibold text-gray-800">{role?.title}</strong> and will be in touch within 3–5 working days.
            </p>
            <button onClick={onClose} className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200" aria-label="Close modal">
              Close
            </button>
          </div>
        ) : (
          <div className="p-7 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 id="modal-title" className="font-black text-[18px] text-gray-900 tracking-[-0.015em]">Apply: {role?.title}</h3>
                <p className="text-gray-600 text-[13px] font-normal mt-0.5">{role?.location} · {role?.type}</p>
              </div>
              <button onClick={onClose} className="p-1.5 hover:bg-gray-100 transition-colors" aria-label="Close application form">
                <span className="text-gray-400 text-[18px] leading-none font-normal">&times;</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="a-name" className={labelCls}>Full Name *</label>
                <div className="relative">
                  <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
                  <input id="a-name" type="text" autoComplete="name" placeholder="Your full name"
                    value={form.name} onChange={e => handleChange("name", e.target.value)} onBlur={() => onBlur("name")}
                    className={`${inputCls("name")} pl-9`} aria-required="true" />
                </div>
                {errors.name && touched.name && <p role="alert" className="flex items-center gap-1.5 text-red-500 text-[13px] mt-1.5"><AlertCircle size={10} />{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="a-phone" className={labelCls}>Phone Number *</label>
                <div className="relative">
                  <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
                  <input id="a-phone" type="tel" autoComplete="tel" placeholder="+44..."
                    value={form.phone} onChange={e => handleChange("phone", e.target.value)} onBlur={() => onBlur("phone")}
                    className={`${inputCls("phone")} pl-9`} aria-required="true" />
                </div>
                {errors.phone && touched.phone && <p role="alert" className="flex items-center gap-1.5 text-red-500 text-[13px] mt-1.5"><AlertCircle size={10} />{errors.phone}</p>}
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="a-email" className={labelCls}>Email Address *</label>
              <div className="relative">
                <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
                <input id="a-email" type="email" autoComplete="email" placeholder="your@email.com"
                  value={form.email} onChange={e => handleChange("email", e.target.value)} onBlur={() => onBlur("email")}
                  className={`${inputCls("email")} pl-9`} aria-required="true" />
              </div>
              {errors.email && touched.email && <p role="alert" className="flex items-center gap-1.5 text-red-500 text-[13px] mt-1.5"><AlertCircle size={10} />{errors.email}</p>}
            </div>

            <div className="mb-5">
              <label htmlFor="a-cv" className={labelCls}>CV Link <span className="text-gray-400 normal-case font-normal tracking-normal">(Google Drive, Dropbox, or LinkedIn URL)</span></label>
              <div className="relative">
                <Upload size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
                <input id="a-cv" type="url" placeholder="https://drive.google.com/..."
                  value={form.cv} onChange={e => handleChange("cv", e.target.value)}
                  className={`${inputCls("cv").replace("border-red-400 bg-red-50/30","").replace("border-gray-300","border-gray-300")} pl-9`} />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="a-cover" className={labelCls}>Covering Note * <span className="text-gray-400 normal-case font-normal tracking-normal">(why you, why R-Zone?)</span></label>
              <textarea id="a-cover" rows={4} placeholder="Tell us what excites you about this role and what you'd bring to R-Zone…"
                value={form.cover} onChange={e => handleChange("cover", e.target.value)} onBlur={() => onBlur("cover")}
                className={`${inputCls("cover")} resize-none`} aria-required="true" />
              {errors.cover && touched.cover && <p role="alert" className="flex items-center gap-1.5 text-red-500 text-[13px] mt-1.5"><AlertCircle size={10} />{errors.cover}</p>}
            </div>

            <p className="text-gray-500 text-[13px] font-normal leading-relaxed mb-5">
              Your data will be used only for recruitment purposes. See our <Link href="/privacy" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">Privacy Policy</Link>.
            </p>

            <button onClick={handleSubmit} disabled={status === "loading"}
              className="inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13px] font-black tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-200 shadow-lg shadow-[#0818A8]/25 w-full justify-center"
              aria-label="Submit application" aria-busy={status === "loading"}>
              {status === "loading"
                ? <><Loader2 size={13} className="animate-spin" aria-hidden="true" /> Submitting…</>
                : <>Submit Application <Send size={12} /></>
              }
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function CareersPage() {
  const heroRef    = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [filter, setFilter]       = useState("All");
  const [applyRole, setApplyRole] = useState(null);

  const filtered = filter === "All" ? OPEN_ROLES : OPEN_ROLES.filter(r => r.department === filter);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "BreadcrumbList", "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home",    "item": "https://r-zoneenterprises.com" },
            { "@type": "ListItem", "position": 2, "name": "Careers", "item": "https://r-zoneenterprises.com/careers" },
          ]},
          ...OPEN_ROLES.map(role => ({
            "@type": "JobPosting",
            "title": role.title,
            "description": role.desc,
            "datePosted": "2025-01-15",
            "validThrough": "2025-12-31",
            "employmentType": "FULL_TIME",
            "hiringOrganization": { "@type": "Organization", "name": "R-Zone Enterprises", "url": "https://r-zoneenterprises.com" },
            "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": role.location.includes("Nigeria") ? "Lagos" : "Upminster", "addressCountry": role.location.includes("Nigeria") ? "NG" : "GB" } },
            "baseSalary": { "@type": "MonetaryAmount", "currency": role.location.includes("Nigeria") ? "NGN" : "GBP", "value": { "@type": "QuantitativeValue", "value": role.salary } },
          })),
        ],
      })}} />

      <AnimatePresence>{applyRole && <ApplyModal role={applyRole} onClose={() => setApplyRole(null)} />}</AnimatePresence>

      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white min-h-screen`}>

        {/* ── HERO ── */}
        <section className="relative bg-[#00061a] overflow-hidden" aria-labelledby="careers-hero-heading">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-[-20%] right-[5%] w-[700px] h-[600px] bg-[#0818A8]/16 rounded-full blur-[140px]" />
            <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[400px] bg-[#1F51FF]/10 rounded-full blur-[120px]" />
          </div>

          <div ref={heroRef} className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 pt-[100px] pb-16 md:pb-20">
            <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10"
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
              <Link href="/" className="text-white/60 text-[13px] font-medium hover:text-white transition-colors">Home</Link>
              <ChevronRight size={11} className="text-white/30" aria-hidden="true" />
              <span className="text-white/80 text-[13px] font-medium" aria-current="page">Careers</span>
            </motion.nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                  <TagPill label={`${OPEN_ROLES.length} Open Roles`} dark />
                  <h1 id="careers-hero-heading" className="font-black text-[clamp(38px,7vw,78px)] text-white leading-[0.88] tracking-[-0.035em] uppercase mb-6">
                    Build Something<br />
                    <span className="relative inline-block">
                      <span className="text-[#1F51FF]">That Matters.</span>
                      <motion.span className="absolute -bottom-2 left-0 h-[4px] bg-[#1F51FF] rounded-full" aria-hidden="true"
                        initial={{ width: 0 }} animate={heroInView ? { width: "100%" } : {}} transition={{ duration: 0.6, delay: 0.8 }} />
                    </span>
                  </h1>
                  <p className="text-white/70 text-[15px] font-normal leading-relaxed max-w-xl mb-9">
                    We're a small team doing big things keeping families connected, businesses supplied, and the UK – Nigeria corridor moving. If you want your work to have a real-world impact from day one, you're in the right place.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="#open-roles" className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-200 shadow-2xl shadow-[#0818A8]/35" aria-label="View open roles">
                      View Open Roles <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </a>
                    <a href="#culture" className="inline-flex items-center gap-2.5 border border-white/22 hover:border-white/50 text-white/80 hover:text-white text-[13px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-200" aria-label="Learn about our culture">
                      Our Culture
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <motion.div className="grid grid-cols-2 gap-3"
                  initial={{ opacity: 0, x: 20 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
                  {[
                    { val: `${OPEN_ROLES.length}`,   label: "Open Roles",    sub: "UK & Nigeria",         icon: Briefcase  },
                    { val: "Essex",                   label: "UK HQ",         sub: "Upminster, Essex",     icon: MapPin     },
                    { val: "Lagos",                   label: "Nigeria Hub",   sub: "Igando, Lagos State",  icon: Globe      },
                    { val: "15+",                     label: "Team Members",  sub: "And growing",          icon: Users      },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.div key={s.label} className="border border-white/[0.08] bg-white/[0.05] p-5 hover:border-white/[0.18] hover:bg-white/[0.08] transition-all duration-300"
                        initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}>
                        <Icon size={15} className="text-[#1F51FF] mb-3" aria-hidden="true" />
                        <p className="text-white font-black text-[22px] leading-none tracking-[-0.02em]">{s.val}</p>
                        <p className="text-white/70 text-[13px] font-semibold tracking-[0.06em] uppercase mt-0.5">{s.label}</p>
                        <p className="text-white/45 text-[13px] font-normal mt-0.5">{s.sub}</p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OPEN ROLES ── */}
        <section id="open-roles" className="relative bg-white scroll-mt-20" aria-labelledby="open-roles-heading">
          <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
            style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

          <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
            {(() => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <div ref={ref} className="mb-12">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
                    <div>
                      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                        <TagPill label="Current Openings" />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                        <SectionHeading line1="Open" accent="Roles." id="open-roles-heading" />
                      </motion.div>
                    </div>
                    <motion.p className="text-gray-600 text-[13.5px] font-normal max-w-sm"
                      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
                      Don't see your perfect role? Email <a href="mailto:careers@r-zoneenterprises.com" className="text-[#0818A8] font-semibold hover:text-[#0437F2] transition-colors">careers@r-zoneenterprises.com</a> — we always keep speculative applications on file.
                    </motion.p>
                  </div>

                  {/* Department filter */}
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by department">
                    {DEPARTMENTS.map(dept => (
                      <button key={dept} onClick={() => setFilter(dept)}
                        className={`px-4 py-2 text-[13px] font-semibold tracking-[0.04em] border transition-all duration-150 ${
                          filter === dept ? "border-[#0818A8] bg-[#0818A8] text-white" : "border-gray-200 text-gray-600 hover:border-[#0818A8]/40 hover:text-[#0818A8] bg-white"
                        }`}
                        aria-pressed={filter === dept}>
                        {dept}
                        {dept !== "All" && <span className="ml-1.5 text-[13px] opacity-70">({OPEN_ROLES.filter(r => r.department === dept).length})</span>}
                        {dept === "All" && <span className="ml-1.5 text-[13px] opacity-70">({OPEN_ROLES.length})</span>}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                  className="space-y-4">
                  {filtered.map(role => <JobCard key={role.id} role={role} onApply={setApplyRole} />)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── CULTURE ── */}
        <section id="culture" className="relative bg-[#00061a] scroll-mt-20 overflow-hidden" aria-labelledby="culture-heading">
          <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div>
                {(() => {
                  const ref = useRef(null);
                  const inView = useInView(ref, { once: true, margin: "-60px" });
                  return (
                    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                      <TagPill label="Life at R-Zone" dark />
                      <h2 id="culture-heading" className="font-black text-[clamp(26px,4.5vw,50px)] text-white leading-[0.92] tracking-[-0.028em] uppercase mb-6">
                        Small Team.<br />
                        <span className="relative inline-block text-[#1F51FF]">
                          Real Impact.
                          <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full" aria-hidden="true"
                            initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.5 }} />
                        </span>
                      </h2>
                      <div className="space-y-4 text-white/70 text-[14px] font-normal leading-relaxed">
                        <p>We're not a corporate. We're a tight, driven team of logistics professionals, customer experience specialists, and tech-minded operators who care about doing things properly.</p>
                        <p>R-Zone was built to serve the UK–Nigerian community. Many of our team are part of that community, which means the work is personal. When a shipment arrives, a family gets their Christmas gifts, or a business gets its stock — and we all feel that.</p>
                        <p>We believe in giving people real responsibility early. If you're good at your job and you want to grow, R-Zone is the kind of place where your career can accelerate in ways it never would at a larger company.</p>
                      </div>
                    </motion.div>
                  );
                })()}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VALUES.map((v, i) => {
                  const ref = useRef(null);
                  const inView = useInView(ref, { once: true, margin: "-60px" });
                  const Icon = v.icon;
                  return (
                    <motion.div key={v.title} ref={ref}
                      className="group border border-white/[0.07] bg-white/[0.04] p-6 hover:border-white/[0.18] hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden"
                      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
                      <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                      <div className="w-9 h-9 bg-[#0818A8]/25 flex items-center justify-center mb-4" aria-hidden="true">
                        <Icon size={15} className="text-[#1F51FF]" />
                      </div>
                      <h3 className="text-white font-black text-[15px] tracking-[-0.01em] mb-2">{v.title}</h3>
                      <p className="text-white/65 text-[13px] font-normal leading-relaxed">{v.body}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="relative bg-white overflow-hidden" aria-labelledby="benefits-heading">
          <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true"
            style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

          <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
            {(() => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <div ref={ref} className="text-center mb-14">
                  <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                    <TagPill label="Why Join Us" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                    <SectionHeading line1="Benefits &" accent="Perks." id="benefits-heading" />
                  </motion.div>
                </div>
              );
            })()}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BENEFITS.map((b, i) => {
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: "-60px" });
                const Icon = b.icon;
                return (
                  <motion.div key={b.title} ref={ref}
                    className="border border-gray-200 bg-gray-50 p-6 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/8 transition-all duration-300 group relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.06 }}>
                    <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-[#0818A8]" aria-hidden="true" />
                    <div className="w-10 h-10 bg-[#0818A8]/8 flex items-center justify-center mb-4" aria-hidden="true">
                      <Icon size={16} className="text-[#0818A8]" />
                    </div>
                    <h3 className="text-gray-900 font-bold text-[14px] mb-2">{b.title}</h3>
                    <p className="text-gray-600 text-[13px] font-normal leading-relaxed">{b.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="relative bg-gray-50 overflow-hidden" aria-labelledby="process-heading">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.03) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

          <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
            {(() => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <div ref={ref} className="text-center mb-14">
                  <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                    <TagPill label="Our Hiring Process" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                    <SectionHeading line1="Simple &" accent="Fast." id="process-heading" />
                  </motion.div>
                  <motion.p className="text-gray-600 text-[14px] font-normal mt-4 max-w-xl mx-auto"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
                    We respect your time. Our hiring process is designed to be quick, fair, and human — no endless assessments, no months-long waits.
                  </motion.p>
                </div>
              );
            })()}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROCESS.map((step, i) => {
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: "-60px" });
                const Icon = step.icon;
                return (
                  <motion.div key={step.num} ref={ref}
                    className="relative border border-gray-200 bg-white p-7 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/8 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
                    <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-[#0818A8]" aria-hidden="true" />
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-black text-[48px] text-[#0818A8]/8 leading-none tracking-[-0.02em]" aria-hidden="true">{step.num}</span>
                      <div className="flex items-center gap-1.5 border border-[#0818A8]/15 bg-[#0818A8]/5 px-2.5 py-1">
                        <Clock size={9} className="text-[#0818A8]" aria-hidden="true" />
                        <span className="text-[13px] font-bold text-[#0818A8] tracking-[0.1em]">{step.time}</span>
                      </div>
                    </div>
                    <h3 className="text-gray-900 font-black text-[16px] tracking-[-0.01em] mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-[13px] font-normal leading-relaxed">{step.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative bg-[#00061a] overflow-hidden" aria-label="Apply to join R-Zone">
          <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.22) 0%, transparent 70%)" }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-24 text-center">
            {(() => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-40px" });
              return (
                <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }}>
                  <TagPill label="Join the Team" dark />
                  <h2 className="font-black text-[clamp(28px,5.5vw,58px)] text-white leading-[0.9] tracking-[-0.03em] uppercase mb-5">
                    Don't See Your Role?<br /><span className="text-[#1F51FF]">Apply Anyway.</span>
                  </h2>
                  <p className="text-white/70 text-[14px] font-normal leading-relaxed max-w-xl mx-auto mb-10">
                    We keep all speculative applications on file and contact strong candidates when the right opportunity opens. Email your CV and a covering note to our team.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mb-10">
                    <a href="mailto:careers@r-zoneenterprises.com"
                      className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.1em] uppercase px-8 py-4 transition-all duration-200 shadow-xl shadow-[#0818A8]/30"
                      aria-label="Email careers team">
                      <Mail size={13} aria-hidden="true" /> careers@r-zoneenterprises.com
                    </a>
                    <a href="#open-roles" className="inline-flex items-center gap-2.5 border border-white/22 hover:border-white/50 text-white/80 hover:text-white text-[13px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-200" aria-label="View all open roles">
                      View Open Roles
                    </a>
                  </div>
                  <div className="flex flex-wrap justify-center gap-6">
                    {["No closing dates", "Personal applications read by humans", "Response within 5 working days", "Inclusive employer"].map(t => (
                      <span key={t} className="flex items-center gap-2 text-white/60 text-[13px] font-normal">
                        <Check size={11} className="text-[#1F51FF]" aria-hidden="true" />{t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </section>
      </div>
    </>
  );
}