"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Package, Phone, Mail, MapPin, ArrowRight,
  Plane, Ship, Truck, Warehouse, FileCheck, Anchor,
  Instagram, Globe, Clock, Shield, Award, ChevronUp,
  Send, CheckCircle, AlertCircle, ExternalLink,
  Navigation, Zap, Star, MessageSquare,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Data — sourced from r-zoneenterprises.com ────────────────────────────────

const SERVICES = [
  { label: "Air Freight to Nigeria",    href: "/services#air-freight",       icon: Plane },
  { label: "Sea Shipping to Nigeria",   href: "/services#sea-shipping-to-nigeria",      icon: Ship },
  { label: "Door to Door Cargo",        href: "/services#door-to-door-cargo",icon: Truck },
  { label: "Customs Clearance",         href: "/services#customs-clearance", icon: FileCheck },
  { label: "Warehousing",               href: "/services#warehousing",       icon: Warehouse },
  { label: "Cargo Handling",            href: "/services#cargo-handling",    icon: Anchor },
];

const COMPANY = [
  { label: "About Us",          href: "/about" },
  { label: "Why R-Zone",        href: "/why-rzone" },
  { label: "Industries Served", href: "/industries" },
  { label: "News & Insights",   href: "/news" },
  { label: "Careers",           href: "/careers" },
  { label: "Contact Us",        href: "/contact" },
];

const QUICK = [
  { label: "Request a Quote",        href: "/quote" },
  { label: "Track Shipment",         href: "/track" },
  { label: "Sailing Schedule",       href: "/sailing-schedule" },
  { label: "Prices & Rates",         href: "/prices" },
  { label: "Importation from Nigeria",href: "/importation-from-nigeria" },
  { label: "Partner With Us",        href: "/partners" },
];

const TRUST_BADGES = [
  { icon: Shield, label: "Secure Shipping",    sub: "End-to-end insured" },
  { icon: Award,  label: "IATA Registered",    sub: "Certified air cargo" },
  { icon: Globe,  label: "6 Continents",       sub: "Worldwide network" },
  { icon: Clock,  label: "24/7 Support",       sub: "+44 800 772 0864" },
  { icon: Star,   label: "107+ Reviews",       sub: "Excellent on Google" },
  { icon: Zap,    label: "Fast Clearance",     sub: "Priority customs" },
];

const OFFICES = [
  {
    flag: "🇬🇧",
    city: "Essex, UK",
    label: "UK Office",
    address: "Unit 10 Moorhen Yard, Elms Lane, Essex RM14 3TS",
    phone: "+44 (0) 800 772 0864",
    hours: "Mon–Fri: 10AM–6PM · Sat: 11AM–2PM",
    mapsUrl: "https://maps.app.goo.gl/QXnmYSxB8CeZ7hmv8",
  },
  {
    flag: "🇳🇬",
    city: "Lagos, Nigeria",
    label: "Nigeria Office",
    address: "2 Esan Olusegun Close, Off Hotel Solus Bus Stop, Igando, Lagos",
    phone: "+234 000 000 0000",
    hours: "Mon–Fri: 9AM–5PM",
    mapsUrl: "https://maps.google.com",
  },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/rzoneenterprise",
    icon: Instagram,
    handle: "@rzoneenterprise",
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy",    href: "/cookies" },
  { label: "Compliance",       href: "/compliance" },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

// ─── Scroll-weight hook ───────────────────────────────────────────────────────
// Returns true once the user has scrolled the footer into view.
// Used to upgrade font-weight from normal → semibold on scroll.

function useFooterScrolled(ref) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setScrolled(true);
      },
      { threshold: 0.08 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return scrolled;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ColHeader({ children }) {
  return (
    <div className="mb-5">
      <h3 className="text-white font-black text-[11px] tracking-[0.22em] uppercase mb-2.5">
        {children}
      </h3>
      <motion.div
        className="h-[2px] bg-[#0818A8] rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 24 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

function FooterLink({ href, children, icon: Icon, external = false, scrolled = false }) {
  const isExternal = external || href.startsWith("http");
  const Tag = isExternal ? "a" : Link;
  const extraProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <li role="listitem">
      <Tag
        {...extraProps}
        className={`
          group flex items-center gap-2 text-white/60 hover:text-white
          text-[12.5px] tracking-[0.02em] py-[3px]
          transition-all duration-300
          ${scrolled ? "font-semibold" : "font-normal"}
        `}
        aria-label={isExternal ? `${children} (opens in new tab)` : undefined}
      >
        {Icon && (
          <Icon
            size={10}
            className="text-[#1F51FF] flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
          />
        )}
        <span className="group-hover:translate-x-1 transition-transform duration-200 leading-snug">
          {children}
        </span>
        {isExternal && (
          <ExternalLink size={9} className="opacity-0 group-hover:opacity-50 transition-opacity ml-0.5" aria-hidden="true" />
        )}
      </Tag>
    </li>
  );
}

// ─── Newsletter Form ──────────────────────────────────────────────────────────

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
      return;
    }
    setState("loading");
    // Simulated API — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
    setEmail("");
  };

  return (
    <div>
      <p className="text-white/60 text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
        Stay Updated
      </p>
      <p className="text-white/50 text-[11.5px] font-light leading-relaxed mb-4">
        Shipping updates, pricing alerts &amp; logistics insights.
      </p>

      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            className="flex items-center gap-2.5 bg-green-500/10 border border-green-500/25 px-4 py-3 rounded-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
            <span className="text-green-400 text-[12px] font-medium">You're subscribed!</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Newsletter subscription form"
          >
            <div className="flex gap-0">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  autoComplete="email"
                  aria-label="Email address for newsletter"
                  aria-required="true"
                  aria-invalid={state === "error"}
                  className={`
                    w-full bg-white/[0.05] border-y border-l text-white
                    placeholder-white/22 text-[11.5px] px-3.5 py-2.5 outline-none
                    focus:bg-white/[0.08] transition-all duration-200 min-w-0
                    rounded-l-sm
                    ${state === "error"
                      ? "border-red-500/50 focus:border-red-500/70"
                      : "border-white/10 focus:border-[#0818A8]"
                    }
                  `}
                />
                {state === "error" && (
                  <AlertCircle
                    size={12}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400"
                    aria-hidden="true"
                  />
                )}
              </div>
              <motion.button
                type="submit"
                disabled={state === "loading"}
                className="bg-[#0818A8] hover:bg-[#0437F2] disabled:opacity-60 text-white px-4 py-2.5 rounded-r-sm transition-colors duration-200 flex-shrink-0 flex items-center justify-center min-w-[42px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Subscribe to newsletter"
              >
                {state === "loading" ? (
                  <motion.div
                    className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <Send size={13} aria-hidden="true" />
                )}
              </motion.button>
            </div>
            {state === "error" && (
              <motion.p
                className="text-red-400 text-[10.5px] mt-1.5 font-medium"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                aria-live="polite"
              >
                Please enter a valid email address.
              </motion.p>
            )}
            <p className="text-white/40 text-[10px] mt-2 tracking-wide font-light">
              No spam. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();
  const footerRef = useRef(null);
  const inView = useInView(footerRef, { once: true, margin: "-80px" });
  const scrolled = useFooterScrolled(footerRef);

  return (
    <footer
      ref={footerRef}
      className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-[#00061a] relative overflow-hidden`}
      aria-label="R-Zone Enterprises site footer"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/WPFooter"
    >

      {/* ══ SEO: Organisation schema embedded in footer ══════════════════ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "R-Zone Enterprises",
            "url": "https://r-zoneenterprises.com",
            "logo": "https://r-zoneenterprises.com/wp-content/uploads/2022/09/Logo-colour-112.png",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+44-800-772-0864",
                "contactType": "customer service",
                "areaServed": "GB",
                "availableLanguage": "English",
                "hoursAvailable": "Mo-Fr 10:00-18:00"
              },
              {
                "@type": "ContactPoint",
                "email": "info@r-zoneenterprises.com",
                "contactType": "customer support"
              }
            ],
            "address": [
              {
                "@type": "PostalAddress",
                "streetAddress": "Unit 10 Moorhen Yard, Elms Lane",
                "addressLocality": "Essex",
                "postalCode": "RM14 3TS",
                "addressCountry": "GB"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "2 Esan Olusegun Close, Off Hotel Solus Bus Stop, Igando",
                "addressLocality": "Lagos",
                "addressCountry": "NG"
              }
            ],
            "sameAs": ["https://www.instagram.com/rzoneenterprise"]
          }),
        }}
      />

      {/* ── Background decorations ─────────────────────────────────────── */}
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none select-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0818A8]/14 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-24 right-0 w-80 h-80 bg-[#1F51FF]/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-[#0818A8]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* ══ SECTION 1 — CTA BAND ══════════════════════════════════════════ */}
      <motion.div
        className="relative border-b border-white/[0.07]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Diagonal blue accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0818A8] via-[#1F51FF] to-transparent" aria-hidden="true" />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-12 md:py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            {/* Left — headline */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-3">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white/60 text-[10px] font-bold tracking-[0.22em] uppercase">
                  Ready to Ship?
                </span>
              </div>
              <h2 className="text-white font-black text-[clamp(24px,3.8vw,46px)] leading-[0.9] tracking-[-0.025em] uppercase">
                Move Your Cargo{" "}
                <span className="relative inline-block text-[#1F51FF]">
                  With Confidence
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full"
                    aria-hidden="true"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  />
                </span>
                .
              </h2>
              <p className="text-white/60 text-[13px] font-light leading-relaxed mt-3 max-w-lg">
                Door to door cargo from the UK to Nigeria air freight, sea freight
                &amp; car shipping. Get a quote in minutes.
              </p>
            </div>

            {/* Right — CTAs */}
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.1em] uppercase px-7 py-3.5 rounded-sm transition-all duration-200 shadow-xl shadow-[#0818A8]/25 hover:shadow-[#0437F2]/30"
                aria-label="Request a shipping quote from R-Zone Enterprises"
              >
                Request a Quote
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
              <Link
                href="/track"
                className="group inline-flex items-center gap-2.5 border border-white/18 hover:border-white/45 bg-white/[0.05] hover:bg-white/10 text-white text-[11.5px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-sm transition-all duration-200"
                aria-label="Track your R-Zone shipment in real time"
              >
                Track Shipment
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
              <a
                href="https://wa.me/448007720864"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 border border-[#25D366]/30 hover:border-[#25D366]/60 bg-[#25D366]/8 hover:bg-[#25D366]/15 text-[#25D366] text-[11.5px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 rounded-sm transition-all duration-200"
                aria-label="Chat with R-Zone on WhatsApp (opens in new tab)"
              >
                <MessageSquare size={13} aria-hidden="true" />
                WhatsApp
              </a>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ══ SECTION 2 — TRUST BADGES ══════════════════════════════════════ */}
      <motion.div
        className="relative border-b border-white/[0.06]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4" role="list" aria-label="Trust credentials">
            {TRUST_BADGES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-2.5 group"
                  role="listitem"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <div
                    className="w-8 h-8 bg-[#0818A8]/15 border border-[#0818A8]/25 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-[#0818A8] group-hover:border-[#0818A8] transition-all duration-250"
                    aria-hidden="true"
                  >
                    <Icon size={13} className="text-[#1F51FF] group-hover:text-white transition-colors duration-250" />
                  </div>
                  <div>
                    <p className="text-white/80 text-[11px] font-bold tracking-[0.04em] leading-none mb-0.5">{item.label}</p>
                    <p className="text-white/45 text-[10px] font-light leading-none">{item.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ══ SECTION 3 — MAIN LINK GRID ════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-18">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >

          {/* ── Brand Column ── */}
          <motion.div
            className="sm:col-span-2 lg:col-span-4"
            variants={fadeUp}
            custom={0}
          >
            {/* Logo mark */}
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-5 group"
              aria-label="R-Zone Enterprises — home"
            >
              <div
                className="w-10 h-10 bg-[#0818A8] rounded-sm flex items-center justify-center group-hover:bg-[#0437F2] transition-colors duration-200 shadow-lg shadow-[#0818A8]/30"
                aria-hidden="true"
              >
                <Package size={18} className="text-white" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-white text-[17px] tracking-[0.1em] uppercase">R-Zone</span>
                <span className="font-light text-white/40 text-[17px] tracking-[0.06em] uppercase">Cargo</span>
              </div>
            </Link>

            <p className="text-white/60 text-[12.5px] font-light leading-[1.8] mb-6 max-w-[280px]">
              Your trusted cargo specialist from the UK to Nigeria. Air freight,
              sea freight &amp; door to door delivery since 2012.
            </p>

            {/* Contact block — real data */}
            <address
              className="not-italic flex flex-col gap-3 mb-6"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <a
                href="tel:+448007720864"
                className="group flex items-center gap-3 text-white/60 hover:text-white text-[12px] font-normal transition-colors duration-200"
                aria-label="Call R-Zone UK: +44 800 772 0864"
                itemProp="telephone"
              >
                <div
                  className="w-7 h-7 bg-white/[0.05] border border-white/10 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-[#0818A8]/60 group-hover:border-[#0818A8] transition-all duration-200"
                  aria-hidden="true"
                >
                  <Phone size={11} className="text-[#1F51FF]" />
                </div>
                <span>+44 (0) 800 772 0864</span>
              </a>

              <a
                href="mailto:info@r-zoneenterprises.com"
                className="group flex items-center gap-3 text-white/60 hover:text-white text-[12px] font-normal transition-colors duration-200"
                aria-label="Email R-Zone: info@r-zoneenterprises.com"
                itemProp="email"
              >
                <div
                  className="w-7 h-7 bg-white/[0.05] border border-white/10 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-[#0818A8]/60 group-hover:border-[#0818A8] transition-all duration-200"
                  aria-hidden="true"
                >
                  <Mail size={11} className="text-[#1F51FF]" />
                </div>
                <span>info@r-zoneenterprises.com</span>
              </a>

              {OFFICES.map((office, i) => (
                <a
                  key={i}
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-white/60 hover:text-white text-[12px] font-normal transition-colors duration-200"
                  aria-label={`${office.label} — ${office.address} (opens Google Maps)`}
                >
                  <div
                    className="w-7 h-7 bg-white/[0.05] border border-white/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0818A8]/60 group-hover:border-[#0818A8] transition-all duration-200"
                    aria-hidden="true"
                  >
                    <Navigation size={10} className="text-[#1F51FF]" />
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] font-bold tracking-[0.12em] uppercase block mb-0.5">
                      {office.flag} {office.label}
                    </span>
                    <span className="leading-snug block">{office.address}</span>
                    <span className="text-white/40 text-[10.5px] font-light block mt-0.5">{office.hours}</span>
                  </div>
                </a>
              ))}
            </address>

            {/* Social — only real ones */}
            <div className="flex items-center gap-2.5" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label={`Follow R-Zone on ${s.label} (opens in new tab)`}
                    className="w-9 h-9 bg-white/[0.05] border border-white/10 rounded-sm flex items-center justify-center text-white/40 hover:text-white hover:bg-[#0818A8] hover:border-[#0818A8] transition-all duration-200 group relative"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={14} aria-hidden="true" />
                  </motion.a>
                );
              })}
              {/* WhatsApp contact */}
              <motion.a
                href="https://wa.me/448007720864"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message R-Zone on WhatsApp (opens in new tab)"
                className="w-9 h-9 border border-[#25D366]/25 rounded-sm flex items-center justify-center text-[#25D366]/50 hover:text-[#25D366] hover:bg-[#25D366]/12 hover:border-[#25D366]/50 transition-all duration-200"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare size={14} aria-hidden="true" />
              </motion.a>
            </div>
          </motion.div>

          {/* ── Services ── */}
          <motion.div className="lg:col-span-3" variants={fadeUp} custom={0.1}>
            <ColHeader>Our Services</ColHeader>
            <ul className="flex flex-col gap-0.5" role="list" aria-label="R-Zone services">
              {SERVICES.map((s) => (
                <FooterLink key={s.href} href={s.href} icon={s.icon} scrolled={scrolled}>
                  {s.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* ── Company ── */}
          <motion.div className="lg:col-span-2" variants={fadeUp} custom={0.2}>
            <ColHeader>Company</ColHeader>
            <ul className="flex flex-col gap-0.5" role="list" aria-label="Company links">
              {COMPANY.map((c) => (
                <FooterLink key={c.href} href={c.href} scrolled={scrolled}>
                  {c.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* ── Quick Links + Newsletter ── */}
          <motion.div className="lg:col-span-3" variants={fadeUp} custom={0.3}>
            <ColHeader>Quick Links</ColHeader>
            <ul className="flex flex-col gap-0.5 mb-8" role="list" aria-label="Quick links">
              {QUICK.map((q) => (
                <FooterLink key={q.href} href={q.href} scrolled={scrolled}>
                  {q.label}
                </FooterLink>
              ))}
            </ul>

            {/* Divider */}
            <div className="w-full h-px bg-white/[0.07] mb-7" aria-hidden="true" />

            {/* Newsletter */}
            <NewsletterForm />
          </motion.div>

        </motion.div>
      </div>

      {/* ══ SECTION 4 — OFFICE HOURS BAND ════════════════════════════════ */}
      <motion.div
        className="relative border-t border-white/[0.06] border-b border-b-white/[0.06]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-5">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
            <div className="flex items-center gap-2.5">
              <Clock size={12} className="text-[#1F51FF] flex-shrink-0" aria-hidden="true" />
              <span className="text-white/50 text-[10.5px] font-bold tracking-[0.14em] uppercase">Operating Hours</span>
            </div>
            {[
              { label: "UK Office", hours: "Mon–Fri 10AM–6PM · Sat 11AM–2PM · Closed Sunday" },
              { label: "Nigeria Office", hours: "Mon–Fri 9AM–5PM" },
              { label: "Support Line", hours: "24/7 via WhatsApp & Email" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-white/40 text-[10px] font-bold tracking-[0.1em] uppercase">{item.label}:</span>
                <span className="text-white/60 text-[11px] font-light">{item.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ══ SECTION 5 — BOTTOM BAR ════════════════════════════════════════ */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Copyright */}
            <p
              className="text-white/50 text-[11px] font-normal tracking-[0.04em] text-center sm:text-left"
              itemProp="copyrightYear"
            >
              © {year}{" "}
              <a
                href="https://r-zoneenterprises.com"
                className="hover:text-white/80 transition-colors duration-200"
                rel="noopener"
              >
                R-Zone Enterprises
              </a>
              . All rights reserved. Registered in England &amp; Wales.
            </p>

            {/* Legal links */}
            <nav aria-label="Legal links" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {LEGAL_LINKS.map((l, i) => (
                <span key={l.href} className="flex items-center gap-4">
                  <Link
                    href={l.href}
                    className="text-white/50 hover:text-white/80 text-[11px] tracking-[0.03em] transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                  {i < LEGAL_LINKS.length - 1 && (
                    <span className="text-white/40 text-[10px]" aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </nav>

            {/* Back to top */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-white/50 hover:text-white/80 text-[10.5px] font-bold tracking-[0.1em] uppercase transition-colors duration-200 group flex-shrink-0"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll back to top of page"
            >
              Back to Top
              <div
                className="w-6 h-6 border border-white/25 group-hover:border-white/55 group-hover:bg-white/[0.06] rounded-sm flex items-center justify-center transition-all duration-200"
                aria-hidden="true"
              >
                <ChevronUp size={11} />
              </div>
            </motion.button>

          </div>
        </div>
      </motion.div>

    </footer>
  );
}