"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
 ChevronDown, Globe, HelpCircle, MessageSquare,
 Menu, X, Package, MapPin, Truck, Warehouse,
 FileCheck, Plane, Ship, Phone, ArrowRight,
 BookOpen, Anchor, Newspaper,
 Briefcase, BarChart3, ShieldCheck, Car,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/assets/assets";
import { montserrat } from "../lib/fonts";

// ─── Font ─────────────────────────────────────────────────────────────────────

// ─── Header ───────────────────────────────────────────────────────────────────
// Modelled on Manuport, Labour and BitLayerX, which all open the same way:
//  • A slim utility strip on a pale tint (small uppercase links), which folds
//    away once the reader scrolls.
//  • One solid white bar: logo left, a few readable links, and two solid pill
//    actions (dark "Track", blue "Get a quote"), like Labour's Join / Donate.
//  • Never see-through. A solid bar reads the same over every hero, and the
//    navy hero below gets a clean edge to start from.
//
// Heights stay within what page heroes already pad for (80px mobile, 101px
// desktop): 72px on mobile; 36px strip + 64px bar + 1px rule on desktop.
// ─── Top utility strip ────────────────────────────────────────────────────────
const TOP_LINKS = [
 { label: "+44 800 772 0864", icon: Phone, href: "tel:+448007720864", ariaLabel: "Call R-Zone UK office: +44 800 772 0864" },
 { label: "Support", icon: HelpCircle, href: "/support", ariaLabel: "Get support from R-Zone" },
 { label: "Contact Us", icon: MessageSquare, href: "/contact", ariaLabel: "Contact R-Zone Enterprises" },
];

// ─── Navigation ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
 {
 label: "Home",
 href: "/",
 ariaLabel: "R-Zone Enterprises homepage",
 },

 {
 label: "Services",
 href: "/services",
 ariaLabel: "R-Zone shipping and cargo services",
 dropdown: [
 { label: "All Services", href: "/services", icon: Globe, description: "Full overview of R-Zone cargo solutions" },
 { label: "Air Freight to Nigeria", href: "/services#air-freight", icon: Plane, description: "Fast UK Nigeria air cargo, 5 to 10 days" },
 { label: "Sea Freight to Nigeria", href: "/services#sea-freight", icon: Ship, description: "Affordable weekly sea freight departures" },
 { label: "Door to Door Cargo", href: "/services#door-to-door", icon: Truck, description: "UK collection · Nigeria delivery" },
 { label: "Importation from Nigeria", href: "/services#importation", icon: Package, description: "Weekly air & sea imports handled end-to-end" },
 { label: "Customs Clearance", href: "/services#customs-clearance", icon: FileCheck, description: "Expert end-to-end customs handling" },
 { label: "Car & Vehicle Shipping", href: "/services#vehicles", icon: Car, description: "Specialist vehicle transport to Nigeria" },
 ],
 featured: {
 label: "Track in Real Time",
 href: "/track",
 sub: "Live GPS updates on every shipment",
 icon: MapPin,
 },
 },

 {
 label: "Track Shipment",
 href: "/track",
 ariaLabel: "Track your R-Zone cargo shipment",
 isTrack: true,
 },
 {
 label: "Get Quote",
 href: "/quote",
 ariaLabel: "Get a free shipping quote from R-Zone",
 isPrimary: true,
 },

 {
 label: "Information Hub",
 href: "/blog",
 ariaLabel: "R-Zone shipping guide, news and insights",
 dropdown: [
 { label: "Importation", href: "/importation", icon: Package, description: "Importation guide" },
 { label: "Sailing Schedules", href: "/schedulesprices", icon: Ship, description: "Weekly sea freight departure dates" },
 { label: "Prices & Rates", href: "/schedulesprices#pricing", icon: BarChart3, description: "Transparent UK Nigeria pricing" },
 { label: "News & Insights", href: "/blog", icon: Newspaper, description: "Latest logistics & trade news" },
 { label: "FAQs", href: "/support", icon: HelpCircle, description: "Answers to common questions" },
 ],
 },

 {
 label: "About",
 href: "/about",
 ariaLabel: "About R-Zone Enterprises",
 dropdown: [
 { label: "About Us", href: "/about", icon: Globe, description: "Our story founded 2012, Essex UK" },
 { label: "R-Zone Enterprise", href: "/rzone", icon: ShieldCheck, description: "Why thousands of customers trust us" },
 { label: "Business Solutions", href: "/business-solutions", icon: Briefcase, description: "B2B shipping solutions & enterprise services" },
 
 ],
 },

 {
 label: "Business Solutions",
 href: "/business-solutions",
 ariaLabel: "R-Zone business and commercial freight solutions",
 },

 {
 label: "Contact",
 href: "/contact",
 ariaLabel: "Contact R-Zone Enterprises",
 },
];

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function DropdownMenu({ items, isOpen, menuId, featured }) {
 return (
 <AnimatePresence>
 {isOpen && (
 <motion.div
 id={menuId}
 role="menu"
 aria-label="Submenu"
 className={`absolute top-full left-0 z-50 overflow-hidden rounded-b-[18px] bg-white ring-1 ring-black/[0.06] shadow-[0_28px_60px_-24px_rgba(0,17,46,0.4)] ${
 featured ? "w-[580px]" : "w-[320px]"
 }`}
 initial={{ opacity: 0, y: -4 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -4 }}
 transition={{ duration: 0.16, ease: "easeOut" }}
 >
 <div className={featured ? "flex" : ""}>
 <div className="flex-1 p-2">
 {items.map((item) => {
 const Icon = item.icon;
 return (
 <Link
 key={item.href + item.label}
 href={item.href}
 role="menuitem"
 className="group flex items-start gap-3 rounded-[12px] px-3 py-2.5 transition-colors duration-150 hover:bg-[#F3F6FF] focus-visible:bg-[#F3F6FF] focus-visible:outline-none"
 >
 {Icon && (
 <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#0000CD]/[0.08] text-[#4D4DFF] transition-colors duration-150 group-hover:bg-[#000f89] group-hover:text-white" aria-hidden="true">
 <Icon size={15} />
 </span>
 )}
 <span>
 <span className="block text-[15px] font-semibold leading-tight text-[#00112E]">{item.label}</span>
 {item.description && (
 <span className="mt-0.5 block text-[13.5px] leading-snug text-gray-500">{item.description}</span>
 )}
 </span>
 </Link>
 );
 })}
 </div>

 {/* Featured panel: the hero's navy and grid, in miniature */}
 {featured && (
 <div className="relative w-[200px] flex-shrink-0 overflow-hidden bg-[#00112E] p-5 text-white">
 <span
 className="absolute inset-0 opacity-[0.05] pointer-events-none"
 style={{
 backgroundImage:
 "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
 backgroundSize: "32px 32px",
 }}
 aria-hidden="true"
 />
 <div className="relative flex h-full flex-col">
 <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#0000FF]" aria-hidden="true">
 <featured.icon size={18} />
 </span>
 <p className="mt-4 text-[15px] font-bold leading-snug text-white">{featured.label}</p>
 <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/65">{featured.sub}</p>
 <Link
 href={featured.href}
 role="menuitem"
 className="group mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-[#00112E] transition-colors hover:bg-[#000f89] hover:text-white"
 >
 Track now
 <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
 </Link>
 </div>
 </div>
 )}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}

// ─── NavItem ──────────────────────────────────────────────────────────────────
function NavItem({ item, pathname }) {
 const [open, setOpen] = useState(false);
 const ref = useRef(null);
 const menuId = `nav-menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`;

 const isActive =
 item.href === "/"
 ? pathname === "/"
 : pathname === item.href ||
 pathname.startsWith(item.href + "/") ||
 !!item.dropdown?.some((d) => pathname === d.href.split("#")[0]);

 useEffect(() => {
 if (!open) return;
 const outside = (e) => {
 if (ref.current && !ref.current.contains(e.target)) setOpen(false);
 };
 document.addEventListener("mousedown", outside);
 return () => document.removeEventListener("mousedown", outside);
 }, [open]);

 useEffect(() => { setOpen(false); }, [pathname]);

 // The marker sits on the bar's bottom edge, so it reads as "you are in this
 // section" rather than as a link underline.
 const marker = (
 <span
 aria-hidden="true"
 className={`absolute inset-x-4 -bottom-px h-[2px] rounded-full bg-[#0000CD] transition-opacity duration-200 ${
 isActive ? "opacity-100" : "opacity-0"
 }`}
 />
 );

 // Soft pill on hover/open, a blue-tinted pill for the current section, plus
 // a short rule on the bar's edge so "you are here" reads at a glance.
 const linkClass = `group relative flex h-full items-center px-1 focus-visible:outline-none`;
 const pillClass = `flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-150 group-focus-visible:ring-2 group-focus-visible:ring-[#0000FF] xl:px-4 xl:text-[15.5px] ${
 isActive
 ? "bg-[#0000CD]/[0.07] text-[#0000CD]"
 : open
 ? "bg-[#F2F4FA] text-[#00112E]"
 : "text-[#00112E] hover:bg-[#F2F4FA]"
 }`;

 if (!item.dropdown) {
 return (
 <Link
 href={item.href}
 className={linkClass}
 aria-label={item.ariaLabel}
 aria-current={isActive ? "page" : undefined}
 >
 <span className={pillClass}>{item.label}</span>
 {marker}
 </Link>
 );
 }

 return (
 <div
 ref={ref}
 className="relative h-full"
 onMouseEnter={() => setOpen(true)}
 onMouseLeave={() => setOpen(false)}
 onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
 >
 <button
 type="button"
 className={linkClass}
 onClick={() => setOpen((v) => !v)}
 aria-expanded={open}
 aria-haspopup="true"
 aria-controls={menuId}
 aria-label={item.ariaLabel}
 >
 <span className={pillClass}>
 {item.label}
 <ChevronDown
 size={15}
 className={`mt-px flex-shrink-0 opacity-55 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
 aria-hidden="true"
 />
 </span>
 {marker}
 </button>
 <DropdownMenu
 items={item.dropdown}
 isOpen={open}
 menuId={menuId}
 featured={item.featured}
 />
 </div>
 );
}

// ─── Pill actions (shared by the bar and the drawer) ──────────────────────────
function TrackPill({ className = "", onClick }) {
 return (
 <Link
 href="/track"
 onClick={onClick}
 aria-label="Track your R-Zone cargo shipment"
 className={`inline-flex flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#00112E]/15 bg-white px-4 py-2.5 text-[15px] font-semibold text-[#00112E] transition-colors duration-200 hover:border-[#00112E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FF] focus-visible:ring-offset-2 ${className}`}
 >
 <MapPin size={14} aria-hidden="true" />
 Track
 </Link>
 );
}

function QuotePill({ className = "", onClick }) {
 return (
 <Link
 href="/quote"
 onClick={onClick}
 aria-label="Get a free shipping quote from R-Zone"
 className={`group inline-flex flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#0000CD] px-5 py-2.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(0,0,205,0.6)] transition-colors duration-200 hover:bg-[#000f89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FF] focus-visible:ring-offset-2 ${className}`}
 >
 Get a quote
 <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
 </Link>
 );
}

function Wordmark({ size = 19 }) {
 return (
 <span className="flex items-center gap-3">
 <Image
 src={assets.logo}
 alt=""
 width={size + 21}
 height={size + 21}
 className="flex-shrink-0 rounded-[10px] ring-1 ring-black/[0.06]"
 aria-hidden="true"
 />
 <span className="flex items-baseline gap-[0.3em] leading-none" style={{ fontSize: size }} itemProp="name">
 <span className="font-black tracking-[0.02em] text-[#00112E]">R-ZONE</span>
 <span className="font-black tracking-[0.02em] text-[#0000CD]">CARGO</span>
 </span>
 </span>
 );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ isOpen, onClose, pathname }) {
 const [expanded, setExpanded] = useState(null);
 const menuRef = useRef(null);

 useEffect(() => {
 if (!isOpen) return;
 const el = menuRef.current;
 if (!el) return;
 const focusable = el.querySelectorAll(
 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
 );
 const first = focusable[0];
 const last = focusable[focusable.length - 1];

 const trap = (e) => {
 if (e.key !== "Tab") return;
 if (e.shiftKey) {
 if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
 } else {
 if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
 }
 };
 const escClose = (e) => { if (e.key === "Escape") onClose(); };

 el.addEventListener("keydown", trap);
 el.addEventListener("keydown", escClose);
 first?.focus();
 return () => {
 el.removeEventListener("keydown", trap);
 el.removeEventListener("keydown", escClose);
 };
 }, [isOpen, onClose]);

 const mobileNavItems = NAV_ITEMS.filter((i) => !i.isPrimary && !i.isTrack);

 return (
 <AnimatePresence>
 {isOpen && (
 <>
 <motion.div
 className="fixed inset-0 z-40 bg-[#00112E]/50 backdrop-blur-sm lg:hidden"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={onClose}
 aria-hidden="true"
 />

 <motion.div
 ref={menuRef}
 id="mobile-menu"
 role="dialog"
 aria-modal="true"
 aria-label="Navigation menu"
 className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] fixed top-0 right-0 z-50 flex h-full w-full max-w-[380px] flex-col bg-white shadow-[-8px_0_40px_rgba(0,17,46,0.18)] lg:hidden`}
 initial={{ x: "100%" }}
 animate={{ x: 0 }}
 exit={{ x: "100%" }}
 transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
 >
 <div className="flex h-[72px] items-center justify-between border-b border-black/[0.08] px-5">
 <Link href="/" onClick={onClose} aria-label="R-Zone Enterprises home">
 <Wordmark size={16} />
 </Link>
 <button
 onClick={onClose}
 className="rounded-full p-2 transition-colors hover:bg-black/[0.05]"
 aria-label="Close navigation menu"
 >
 <X size={20} className="text-[#00112E]/70" aria-hidden="true" />
 </button>
 </div>

 <nav className="flex-1 overflow-y-auto px-5 py-2" aria-label="Mobile navigation">
 {mobileNavItems.map((item) => {
 const active = pathname === item.href;
 return (
 <div key={item.label} className="border-b border-black/[0.06]">
 {item.dropdown ? (
 <>
 <button
 onClick={() => setExpanded(expanded === item.label ? null : item.label)}
 className="flex w-full items-center justify-between px-1 py-4 text-[17px] font-medium tracking-[-0.01em] text-[#00112E]"
 aria-expanded={expanded === item.label}
 >
 {item.label}
 <ChevronDown
 size={18}
 className={`text-[#00112E]/40 transition-transform duration-200 ${expanded === item.label ? "rotate-180" : ""}`}
 aria-hidden="true"
 />
 </button>
 <AnimatePresence initial={false}>
 {expanded === item.label && (
 <motion.div
 initial={{ height: 0 }}
 animate={{ height: "auto" }}
 exit={{ height: 0 }}
 transition={{ duration: 0.2 }}
 className="overflow-hidden"
 >
 <div className="pb-3">
 {item.dropdown.map((sub) => {
 const Icon = sub.icon;
 return (
 <Link
 key={sub.href + sub.label}
 href={sub.href}
 onClick={onClose}
 className="flex items-center gap-3 rounded-[12px] px-2 py-2.5 text-[15px] text-[#00112E]/80 transition-colors hover:bg-[#F3F6FF] hover:text-[#00112E]"
 >
 {Icon && (
 <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#0000FF]/[0.08] text-[#4D4DFF]" aria-hidden="true">
 <Icon size={15} />
 </span>
 )}
 {sub.label}
 </Link>
 );
 })}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </>
 ) : (
 <Link
 href={item.href}
 onClick={onClose}
 aria-current={active ? "page" : undefined}
 className={`flex items-center justify-between px-1 py-4 text-[17px] font-medium tracking-[-0.01em] transition-colors ${
 active ? "text-[#4D4DFF]" : "text-[#00112E] hover:text-[#4D4DFF]"
 }`}
 >
 {item.label}
 <span aria-hidden="true" className="text-[#00112E]/30">›</span>
 </Link>
 )}
 </div>
 );
 })}
 </nav>

 <div className="space-y-2.5 border-t border-black/[0.08] px-5 py-5">
 <QuotePill onClick={onClose} className="w-full py-3.5 text-[15px]" />
 <TrackPill onClick={onClose} className="w-full py-3.5 text-[15px]" />
 <a
 href="tel:+448007720864"
 className="flex items-center justify-center gap-2 pt-1 text-[13.5px] text-gray-500 transition-colors hover:text-[#4D4DFF]"
 aria-label="Call R-Zone UK: +44 800 772 0864"
 >
 <Phone size={13} aria-hidden="true" />
 +44 (0) 800 772 0864
 </a>
 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>
 );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
 const pathname = usePathname();
 const [mobileOpen, setMobileOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);

 useEffect(() => {
 let frame = null;
 const onScroll = () => {
 if (frame) return;
 frame = requestAnimationFrame(() => {
 setScrolled(window.scrollY > 8);
 frame = null;
 });
 };
 window.addEventListener("scroll", onScroll, { passive: true });
 onScroll();
 return () => {
 window.removeEventListener("scroll", onScroll);
 if (frame) cancelAnimationFrame(frame);
 };
 }, []);

 useEffect(() => {
 document.body.style.overflow = mobileOpen ? "hidden" : "";
 return () => { document.body.style.overflow = ""; };
 }, [mobileOpen]);

 useEffect(() => { setMobileOpen(false); }, [pathname]);

 const closeMobile = useCallback(() => setMobileOpen(false), []);
 const barItems = NAV_ITEMS.filter((i) => !i.isTrack && !i.isPrimary && i.href !== "/");

 return (
 <>
 {/* ── SEO schemas ──
 No sitelinks-searchbox markup here: "SiteLinksSearchBox" is not a
 schema.org type (the valid form is WebSite + potentialAction), and the
 site has no /search page for the target URL to point at. Invalid types
 and search targets that 404 are reported as errors in the Rich Results
 Test, so the block was removed rather than corrected. */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@graph": NAV_ITEMS.flatMap((item) => {
 const entries = [
 {
 "@type": "SiteNavigationElement",
 "name": item.label,
 "url": `https://r-zoneenterprises.com${item.href}`,
 },
 ];
 if (item.dropdown) {
 item.dropdown.forEach((sub) =>
 entries.push({
 "@type": "SiteNavigationElement",
 "name": sub.label,
 "url": `https://r-zoneenterprises.com${sub.href}`,
 })
 );
 }
 return entries;
 }),
 }),
 }}
 />

 <header
 className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] fixed top-0 left-0 right-0 z-30 w-full`}
 role="banner"
 aria-label="R-Zone Enterprises site navigation"
 itemScope
 itemType="https://schema.org/WPHeader"
 >
 {/* ── Utility strip (desktop): folds away once the reader scrolls ── */}
 <div
 className="hidden overflow-hidden bg-[#F3F6FF] lg:block"
 style={{
 maxHeight: scrolled ? 0 : 36,
 transition: "max-height 0.3s cubic-bezier(0.22,1,0.36,1)",
 }}
 >
 <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-5 sm:px-8 xl:px-10">
 <p className="text-[13px] font-medium text-[#00112E]/65">
 Air &amp; sea freight, UK ⇄ Nigeria, since 2012
 </p>
 <ul className="flex items-center divide-x divide-[#000f89]/15" aria-label="Utility links">
 {TOP_LINKS.map((link) => {
 const Icon = link.icon;
 return (
 <li key={link.label} className="px-4 last:pr-0">
 <Link
 href={link.href}
 aria-label={link.ariaLabel}
 className="flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[#000f89] transition-colors hover:text-[#4D4DFF]"
 >
 <Icon size={12} strokeWidth={2} aria-hidden="true" />
 {link.label}
 </Link>
 </li>
 );
 })}
 </ul>
 </div>
 </div>

 {/* ── Main bar: solid white, always ── */}
 <div
 className="border-b border-black/[0.08] bg-white transition-shadow duration-300"
 style={{ boxShadow: scrolled ? "0 8px 30px -12px rgba(0,17,46,0.18)" : "none" }}
 >
 <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[64px] xl:px-10">
 <Link
 href="/"
 className="flex-shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0000FF] focus-visible:ring-offset-2"
 aria-label="R-Zone Enterprises UK to Nigeria cargo specialists, home"
 itemProp="url"
 >
 <Wordmark />
 </Link>

 {/* The logo is the route home, so "Home" is not repeated here */}
 <nav
 className="hidden h-full flex-1 items-stretch justify-center lg:flex"
 aria-label="Main navigation"
 >
 {barItems.map((item) => (
 <div
 key={item.label}
 className={`h-full ${item.href === "/business-solutions" || item.href === "/contact" ? "hidden xl:block" : ""}`}
 >
 <NavItem item={item} pathname={pathname} />
 </div>
 ))}
 </nav>

 <div className="flex items-center gap-2">
 <TrackPill className="hidden lg:inline-flex" />
 <QuotePill className="hidden sm:inline-flex" />
 <button
 onClick={() => setMobileOpen(true)}
 className="rounded-full p-2.5 transition-colors hover:bg-black/[0.05] lg:hidden"
 aria-label="Open navigation menu"
 aria-expanded={mobileOpen}
 aria-controls="mobile-menu"
 aria-haspopup="true"
 >
 <Menu size={22} className="text-[#00112E]" aria-hidden="true" />
 </button>
 </div>
 </div>
 </div>
 </header>

 <MobileMenu isOpen={mobileOpen} onClose={closeMobile} pathname={pathname} />
 </>
 );
}
