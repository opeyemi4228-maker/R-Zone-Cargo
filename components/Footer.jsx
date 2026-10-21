"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import {
 Phone, Mail, ArrowRight, Plane, Ship, Truck, FileCheck, Anchor, Clock, ChevronUp, Send, CheckCircle, AlertCircle, ExternalLink, Navigation, Facebook,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { montserrat } from "../lib/fonts";
import { assets } from "@/assets/assets";

// ─── Instagram icon (not in lucide-react) ─────────────────────────────────────
function InstagramIcon({ size = 14, className = "" }) {
 return (
 <svg
 width={size}
 height={size}
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className={className}
 aria-hidden="true"
 >
 <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
 <circle cx="12" cy="12" r="4" />
 <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
 </svg>
 );
}

// ─── WhatsApp icon ─────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 14, className = "" }) {
 return (
 <svg
 width={size}
 height={size}
 viewBox="0 0 24 24"
 fill="currentColor"
 className={className}
 aria-hidden="true"
 >
 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
 </svg>
 );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
 { label: "Air Freight to Nigeria", href: "/services#air-freight", icon: Plane },
 { label: "Sea Shipping to Nigeria", href: "/services#sea-shipping-to-nigeria", icon: Ship },
 { label: "Door to Door Cargo", href: "/services#door-to-door-cargo", icon: Truck },
 { label: "Car & Vehicle Shipping", href: "/services#vehicles", icon: Truck },
 { label: "Customs Clearance", href: "/services#customs-clearance", icon: FileCheck },
 { label: "Importation from Nigeria", href: "/importation", icon: Anchor },
];

const COMPANY = [
 { label: "About Us", href: "/about" },
 { label: "Business Solutions", href: "/business-solutions" },
 { label: "Shipping Blog", href: "/blog" },
 { label: "Careers", href: "/careers" },
 { label: "Contact Us", href: "/contact" },
];

const SUPPORT = [
 { label: "Request a Quote", href: "/quote" },
 { label: "Track Shipment", href: "/track" },
 { label: "Prices & Schedules", href: "/schedulesprices" },
 { label: "Cargo FAQs", href: "/blog/uk-to-nigeria-cargo-faq" },
 { label: "Help & Support", href: "/support" },
 { label: "Partner With Us", href: "/partners" },
];

const OFFICES = [
 {
 flag: "\u{1F1EC}\u{1F1E7}",
 label: "UK Head Office & Warehouse",
 city: "Upminster, Essex",
 address: "Unit 9 Moorhen Yard, Elms Lane, Bulphan, Upminster, Essex RM14 3TS",
 phone: "+44 (0) 800 772 0864",
 phoneHref: "tel:+448007720864",
 hours: "Mon to Fri 10am to 6pm · Sat 11am to 2pm",
 note: "Drop-offs welcome. Please call ahead.",
 mapsUrl: "https://maps.app.goo.gl/QXnmYSxB8CeZ7hmv8",
 },
 {
 flag: "\u{1F1F3}\u{1F1EC}",
 label: "Nigeria Office & Warehouse",
 city: "Lagos",
 address: "1-3 R-Zone Crescent, Queens Park Estate II, Shagam Interchange, Lagos",
 phone: "+234 906 680 6861",
 phoneHref: "tel:+2349066806861",
 hours: "Mon to Fri 9am to 5pm",
 note: "Collection points: Egbeda, Surulere, Ajah and Ibadan.",
 mapsUrl: "https://maps.google.com/?q=Queens+Park+Estate+II+Shagam+Interchange+Lagos",
 },
];

const SOCIAL_LINKS = [
 {
 label: "Instagram",
 href: "https://www.instagram.com/rzoneenterprises",
 icon: InstagramIcon,
 handle: "@rzoneenterprises",
 },
 {
 label: "Facebook",
 href: "https://www.facebook.com/share/1Gfw2SvFgY/?mibextid=wwXIfr",
 icon: Facebook,
 handle: "R-Zone Enterprises",
 },
];

const LEGAL_LINKS = [
 { label: "Privacy Policy", href: "/privacy" },
 { label: "Terms of Service", href: "/terms" },
 { label: "Cookie Policy", href: "/cookies" },
 { label: "Compliance", href: "/compliance" },
];

// ─── Animation variants ───────────────────────────────────────────────────────

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

// ─── ColHeader ────────────────────────────────────────────────────────────────

function ColHeader({ children }) {
 return (
 <div className="mb-5">
 <h3 className="text-white font-bold text-[15px] tracking-[-0.01em]">
 {children}
 </h3>
 </div>
 );
}

// ─── FooterLink ───────────────────────────────────────────────────────────────

function FooterLink({ href, children, icon: Icon, external = false }) {
 const isExternal = external || href.startsWith("http");
 const Tag = isExternal ? "a" : Link;
 const extraProps = isExternal
 ? { href, target: "_blank", rel: "noopener noreferrer" }
 : { href };

 return (
 <li role="listitem">
 <Tag
 {...extraProps}
 className="group flex items-center gap-2 text-white/70 hover:text-white text-[14px] font-normal py-[3px] transition-colors duration-200"
 aria-label={isExternal ? `${children} (opens in new tab)` : undefined}
 >
 {Icon && (
 <Icon
 size={12}
 className="text-[#A6A6FF] flex-shrink-0 group-hover:opacity-100 transition-opacity"
 aria-hidden="true"
 />
 )}
 <span className="group-hover:translate-x-1 transition-transform duration-200 leading-snug">
 {children}
 </span>
 {isExternal && (
 <ExternalLink
 size={9}
 className="opacity-0 group-hover:opacity-50 transition-opacity ml-0.5"
 aria-hidden="true"
 />
 )}
 </Tag>
 </li>
 );
}

// ─── NewsletterForm ───────────────────────────────────────────────────────────

function NewsletterForm() {
 const [email, setEmail] = useState("");
 const [state, setState] = useState("idle"); // idle | loading | success | error
 const [errorMsg, setErrorMsg] = useState("Please enter a valid email address.");

 const handleSubmit = async (e) => {
 e.preventDefault();
 if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
 setErrorMsg("Please enter a valid email address.");
 setState("error");
 setTimeout(() => setState("idle"), 3000);
 return;
 }
 setState("loading");
 try {
 const { saveSubscriber } = await import("../lib/adminAuth");
 await saveSubscriber(email);
 setState("success");
 setEmail("");
 } catch (err) {
 setErrorMsg(err?.message || "Something went wrong. Please try again.");
 setState("error");
 setTimeout(() => setState("idle"), 4000);
 }
 };

 return (
 <div>
 <p className="text-white/80 text-[13px] font-normal leading-relaxed mb-4">
 Shipping updates, pricing alerts &amp; logistics insights delivered weekly.
 </p>

 <AnimatePresence mode="wait">
 {state === "success" ? (
 <motion.div
 key="success"
 className="flex items-center gap-2.5 bg-green-500/10 border border-green-500/25 px-4 py-3 rounded-full"
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0 }}
 >
 <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
 <span className="text-green-400 text-[13px] font-medium">You&apos;re subscribed!</span>
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
 w-full bg-white/[0.06] border-y border-l text-white
 placeholder-white/60 text-[13px] px-3.5 py-2.5 outline-none
 focus:bg-white/[0.08] transition-all duration-200 min-w-0
 rounded-l-full pl-5
 ${state === "error"
 ? "border-red-500/50 focus:border-red-500/70"
 : "border-white/10 focus:border-[#000f89]"
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
 className="bg-[#0000CD] hover:bg-[#000f89] disabled:opacity-60 text-white px-5 py-2.5 rounded-r-full transition-colors duration-200 flex-shrink-0 flex items-center justify-center min-w-[42px]"
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
 className="text-red-400 text-[13px] mt-1.5 font-medium"
 initial={{ opacity: 0, y: -4 }}
 animate={{ opacity: 1, y: 0 }}
 role="alert"
 aria-live="polite"
 >
 {errorMsg}
 </motion.p>
 )}

 <p className="text-white/80 text-[13px] mt-2 tracking-wide font-normal">
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

 return (
 <footer
 ref={footerRef}
 className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-[#00112E] relative isolate overflow-hidden`}
 aria-label="R-Zone Enterprises site footer"
 role="contentinfo"
 itemScope
 itemType="https://schema.org/WPFooter"
 >

      {/* No Organization schema here: app/layout.js already declares the
          business once, for every page, including the Lagos branch. Repeating
          it in the footer created a second, competing entity for the same
          company. */}

      {/* Same ground as the homepage hero: navy, a faint 64px grid, two soft brand lights */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }}
        aria-hidden="true"
      />
      <div className="absolute -top-40 left-1/4 -z-10 h-[460px] w-[760px] rounded-full bg-[#000f89]/25 blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 -z-10 h-[360px] w-[560px] rounded-full bg-[#0000FF]/12 blur-[120px] pointer-events-none" aria-hidden="true" />
      {/* ══ ROW 1 · CTA ════════════════════════════════════════════════ */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pt-14 md:pt-16 pb-4">
          <div className="relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 rounded-[28px] bg-[#000f89] px-7 py-10 md:px-12 md:py-12">
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "40px 40px" }}
              aria-hidden="true"
            />
            <div className="relative max-w-xl">
              <h2 className="text-white font-extrabold text-[clamp(26px,3.4vw,42px)] leading-[1.05] tracking-[-0.035em]">
                Ready to ship to Nigeria?
              </h2>
              <p className="text-white/80 text-[16px] font-normal leading-relaxed mt-3">
                Tell us what you are sending and we will quote the cheapest way
                to move it, the same day.
              </p>
            </div>

            <div className="relative flex flex-wrap gap-3 flex-shrink-0">
              <Link
                href="/quote"
                className="group inline-flex min-h-[52px] items-center gap-2.5 bg-white hover:bg-[#E8EEFF] text-[#00112E] text-[15px] font-bold px-7 rounded-full transition-colors duration-200"
                aria-label="Request a shipping quote from R-Zone Enterprises"
              >
                Request a quote
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>

              <a
                href="https://wa.me/447915647119"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[52px] items-center gap-2.5 border border-white/30 hover:border-white/60 hover:bg-white/[0.08] text-white text-[15px] font-semibold px-7 rounded-full transition-colors duration-200"
                aria-label="Chat with R-Zone on WhatsApp (opens in new tab)"
              >
                <WhatsAppIcon size={16} className="text-[#25D366]" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ══ ROW 2 · BRAND + LINKS ══════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-16">
        <motion.div
          className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-12 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Brand + contact */}
          <motion.div className="col-span-2 lg:col-span-4 lg:pr-8" variants={fadeUp} custom={0}>
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-5 group"
              aria-label="R-Zone Enterprises home"
            >
              <Image
                src={assets.logo}
                alt=""
                width={44}
                height={44}
                className="flex-shrink-0 rounded-sm group-hover:opacity-90 transition-opacity duration-200"
                aria-hidden="true"
              />
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-white text-[17px] tracking-[0.1em] uppercase">R-Zone</span>
                <span className="font-normal text-white text-[17px] tracking-[0.06em] uppercase">Cargo</span>
              </div>
            </Link>

            <p className="text-white/70 text-[13.5px] font-normal leading-[1.8] mb-7 max-w-[300px]">
              Air freight, sea freight and door to door cargo between the UK and
              Nigeria since 2012, with customs clearance handled by our own teams
              at both ends.
            </p>

            <div className="flex flex-col gap-3 mb-7">
              <a
                href="tel:+448007720864"
                className="group flex items-center gap-3 text-white/75 hover:text-white text-[13.5px] transition-colors duration-200"
                aria-label="Call R-Zone UK: +44 800 772 0864"
              >
                <span className="w-7 h-7 bg-white/[0.05] border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#000f89]/60 group-hover:border-[#000f89] transition-all duration-200" aria-hidden="true">
                  <Phone size={12} className="text-[#A6A6FF]" />
                </span>
                +44 (0) 800 772 0864
              </a>

              <a
                href="mailto:info@r-zoneenterprises.com"
                className="group flex items-center gap-3 text-white/75 hover:text-white text-[13.5px] transition-colors duration-200"
                aria-label="Email R-Zone: info@r-zoneenterprises.com"
              >
                <span className="w-7 h-7 bg-white/[0.05] border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#000f89]/60 group-hover:border-[#000f89] transition-all duration-200" aria-hidden="true">
                  <Mail size={12} className="text-[#A6A6FF]" />
                </span>
                info@r-zoneenterprises.com
              </a>
            </div>

            <div className="flex items-center gap-2.5" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label={`Follow R-Zone on ${social.label} (opens in new tab)`}
                    className="w-10 h-10 bg-white/[0.06] border border-white/10 rounded-full flex items-center justify-center text-white/75 hover:text-white hover:bg-[#000f89] hover:border-[#000f89] transition-all duration-200"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={14} />
                  </motion.a>
                );
              })}

              <motion.a
                href="https://wa.me/447915647119"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message R-Zone on WhatsApp (opens in new tab)"
                className="w-10 h-10 border border-[#25D366]/30 rounded-full flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/15 hover:border-[#25D366]/60 transition-all duration-200"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <WhatsAppIcon size={14} />
              </motion.a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div className="lg:col-span-3" variants={fadeUp} custom={0.1}>
            <ColHeader>Services</ColHeader>
            <ul className="flex flex-col gap-1" role="list" aria-label="R-Zone services">
              {SERVICES.map((item) => (
                <FooterLink key={item.label} href={item.href} icon={item.icon}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div className="lg:col-span-2" variants={fadeUp} custom={0.18}>
            <ColHeader>Company</ColHeader>
            <ul className="flex flex-col gap-1" role="list" aria-label="Company links">
              {COMPANY.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div className="lg:col-span-3" variants={fadeUp} custom={0.26}>
            <ColHeader>Support</ColHeader>
            <ul className="flex flex-col gap-1" role="list" aria-label="Support links">
              {SUPPORT.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* ══ ROW 3 · LOCATIONS + NEWSLETTER ═════════════════════════════ */}
      <div className="relative border-t border-white/[0.07]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-16">
          <motion.div
            className="grid gap-10 lg:grid-cols-12 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div className="lg:col-span-8" variants={fadeUp} custom={0}>
              <ColHeader>Where to find us</ColHeader>

              <div className="grid gap-5 sm:grid-cols-2">
                {OFFICES.map((office) => (
                  <address
                    key={office.label}
                    className="not-italic rounded-[20px] bg-white/[0.05] ring-1 ring-white/[0.08] p-6 md:p-7 transition-colors duration-200 hover:bg-white/[0.08]"
                  >
                    <p className="flex items-center gap-2 text-white font-bold text-[14px] tracking-[0.02em]">
                      <span aria-hidden="true">{office.flag}</span>
                      {office.city}
                    </p>
                    <p className="text-[#A6A6FF] text-[13px] font-semibold mt-1">
                      {office.label}
                    </p>

                    <p className="text-white/75 text-[13.5px] font-normal leading-[1.7] mt-4">
                      {office.address}
                    </p>

                    <p className="flex items-start gap-2.5 text-white/60 text-[13px] font-normal leading-snug mt-3">
                      <Clock size={12} className="text-[#A6A6FF] flex-shrink-0 mt-[3px]" aria-hidden="true" />
                      {office.hours}
                    </p>

                    <p className="text-white/50 text-[12.5px] font-normal leading-snug mt-2">
                      {office.note}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 pt-5 border-t border-white/[0.07]">
                      <a
                        href={office.phoneHref}
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white text-[13px] font-semibold transition-colors duration-200"
                        aria-label={`Call R-Zone ${office.city}: ${office.phone}`}
                      >
                        <Phone size={12} className="text-[#A6A6FF]" aria-hidden="true" />
                        {office.phone}
                      </a>

                      <a
                        href={office.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3.5 py-1.5 text-white hover:bg-white hover:text-[#00112E] text-[13px] font-semibold transition-colors duration-200"
                        aria-label={`Open ${office.city} office in Google Maps (opens in new tab)`}
                      >
                        <Navigation size={11} aria-hidden="true" />
                        Directions
                      </a>
                    </div>
                  </address>
                ))}
              </div>
            </motion.div>

            <motion.div className="lg:col-span-4 lg:pl-4" variants={fadeUp} custom={0.12}>
              <ColHeader>Stay updated</ColHeader>
              <NewsletterForm />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══ ROW 4 · BOTTOM BAR ═════════════════════════════════════════ */}
      <div className="relative border-t border-white/[0.07]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/55 text-[12.5px] font-normal tracking-[0.03em] text-center sm:text-left">
              © {year}{" "}
              <a
                href="https://r-zoneenterprises.com"
                className="hover:text-white transition-colors duration-200"
                rel="noopener"
              >
                R-Zone Enterprises
              </a>
              . All rights reserved. Registered in England &amp; Wales.
            </p>

            <nav aria-label="Legal links" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/55 hover:text-white text-[12.5px] tracking-[0.03em] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-white/55 hover:text-white text-[13px] font-semibold transition-colors duration-200 group flex-shrink-0"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll back to top of page"
            >
              Back to top
              <span
                className="w-7 h-7 border border-white/25 group-hover:border-white/60 group-hover:bg-white/[0.06] rounded-full flex items-center justify-center transition-all duration-200"
                aria-hidden="true"
              >
                <ChevronUp size={11} />
              </span>
            </motion.button>
          </div>
        </div>
      </div>

 </footer>
 );
}