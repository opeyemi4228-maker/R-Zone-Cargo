"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown, Globe, HelpCircle, MessageSquare,
  Menu, X, Package, MapPin, Truck, Warehouse,
  FileCheck, Plane, Ship, Phone, ArrowRight,
  Building2, BookOpen, Anchor, Users, Newspaper,
  Briefcase, BarChart3, ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/assets/assets";

// ─── Font ─────────────────────────────────────────────────────────────────────
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Top utility bar ──────────────────────────────────────────────────────────
const TOP_LINKS = [
  { label: "EN",               icon: Globe,         href: "#",                 ariaLabel: "Select language" },
  { label: "+44 800 772 0864", icon: Phone,         href: "tel:+448007720864", ariaLabel: "Call R-Zone UK office: +44 800 772 0864" },
  { label: "Support",          icon: HelpCircle,    href: "/support",          ariaLabel: "Get support from R-Zone" },
  { label: "Contact Us",       icon: MessageSquare, href: "/contact",          ariaLabel: "Contact R-Zone Enterprises" },
];

// ─── Navigation — 8 items ────────────────────────────────────────────────────
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
      { label: "Services",    href: "/services",              icon: Globe,     description: "" },
      { label: "Air Freight to Nigeria",    href: "/services#air-freight",              icon: Plane,     description: "Fast UK–Nigeria air cargo, 5–10 days" },
      { label: "Sea Shipping to Nigeria",   href: "/services#sea-shipping-to-nigeria",  icon: Ship,      description: "Affordable monthly sea freight" },
      { label: "Door to Door Cargo",        href: "/services#door-to-door-cargo",       icon: Truck,     description: "UK collection · Nigeria delivery" },
      { label: "Importation from Nigeria",  href: "/services#importation-from-nigeria", icon: Package,   description: "Weekly air & monthly sea imports" },
      { label: "Customs Clearance",         href: "/services#customs-clearance",        icon: FileCheck, description: "Expert end-to-end customs handling" },
      { label: "Warehousing",               href: "/services#warehousing",              icon: Warehouse, description: "Secure UK & Nigeria storage" },
      { label: "Cargo Handling",            href: "/services#cargo-handling",           icon: Anchor,    description: "Port ops & specialist cargo" },
    ],
    featured: {
      label: "Track in Real Time",
      href: "/track",
      sub: "Live GPS updates on every shipment",
      icon: MapPin,
    },
  },

  // ── Standalone CTAs: rendered as styled buttons, not plain links
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
    label: "Shipping Guide",
    href: "/news",
    ariaLabel: "R-Zone shipping guide, news and insights",
    dropdown: [
      { label: "How Shipping Works",  href: "/services",         icon: BookOpen,   description: "4-step guide from booking to delivery" },
      { label: "Cargo We Accept",     href: "/services",         icon: Package,    description: "Boxes, foodstuffs, vehicles, machinery" },
      { label: "Sailing Schedules",   href: "/schedulesprices#schedules", icon: Ship,       description: "Monthly sea freight departure dates" },
      { label: "Prices & Rates",      href: "/schedulesprices#prices", icon: BarChart3,  description: "Transparent UK–Nigeria pricing" },
      { label: "News & Insights",     href: "/news",             icon: Newspaper,  description: "Latest logistics & trade news" },
      { label: "FAQs",                href: "/support",          icon: HelpCircle, description: "Answers to common questions" },
    ],
  },

  {
    label: "About",
    href: "/about",
    ariaLabel: "About R-Zone Enterprises",
    dropdown: [
      { label: "About Us",          href: "/about",      icon: Globe,       description: "Our story — founded 2012, Essex UK" },
      { label: "R-Zone Enterprise",        href: "/rzone",  icon: ShieldCheck, description: "Why thousands of customers trust us" },
      { label: "Industries Served", href: "/industries", icon: MapPin,      description: "Sectors we specialise in" },
      { label: "Careers",           href: "/careers",    icon: Briefcase,   description: "Join the R-Zone team" },
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
function DropdownMenu({ items, isOpen, transparent, menuId, featured }) {
  const wide = !!featured;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={menuId}
          role="menu"
          aria-label="Submenu"
          className={`
            absolute top-full left-0 mt-0 shadow-2xl z-50 overflow-hidden border
            ${wide ? "w-[460px]" : "w-60"}
            ${transparent
              ? "bg-[#0c0c1e] border-white/10 shadow-black/60"
              : "bg-white border-gray-200 shadow-gray-300/40"
            }
          `}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
        >
          {/* Accent line */}
          <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />

          <div className={wide ? "flex" : ""}>
            {/* Items */}
            <div className={`flex flex-col ${wide ? "flex-1" : "w-full"}`}>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    role="menuitem"
                    className={`
                      flex items-start gap-3 px-4 py-2.5 text-[13px]
                      transition-colors duration-100 group border-b last:border-0
                      ${transparent
                        ? "text-white/70 hover:bg-[#0818A8]/75 hover:text-white border-white/5"
                        : "text-gray-700 hover:bg-[#0818A8] hover:text-white border-gray-100"
                      }
                    `}
                  >
                    {Icon && (
                      <Icon
                        size={13}
                        className={`flex-shrink-0 mt-0.5 transition-colors ${
                          transparent ? "text-[#1F51FF] group-hover:text-white" : "text-[#0818A8] group-hover:text-white"
                        }`}
                        aria-hidden="true"
                      />
                    )}
                    <div>
                      <span className="block font-semibold leading-tight">{item.label}</span>
                      {item.description && (
                        <span className={`block text-[10.5px] font-normal mt-0.5 leading-snug ${
                          transparent ? "text-white/40 group-hover:text-white/65" : "text-gray-800 group-hover:text-white/75"
                        }`}>
                          {item.description}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Featured panel */}
            {featured && (
              <div className={`w-44 flex-shrink-0 flex flex-col justify-between border-l p-4 ${
                transparent ? "border-black/80 bg-[#0818A8]/14" : "border-black/80 bg-[#0818A8]/4"
              }`}>
                <div>
                  <p className={`text-[9px] font-bold tracking-[0.24em] uppercase mb-3 ${
                    transparent ? "text-[#1F51FF]" : "text-[#0818A8]"
                  }`}>
                    Featured
                  </p>
                  <Link
                    href={featured.href}
                    role="menuitem"
                    className={`group block p-3 transition-colors duration-200 rounded-sm ${
                      transparent ? "hover:bg-white/8" : "hover:bg-[#0818A8]/8"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-sm flex items-center justify-center mb-2.5 ${
                        transparent ? "bg-[#0818A8]/40" : "bg-[#0818A8]/12"
                      }`}
                      aria-hidden="true"
                    >
                      <featured.icon
                        size={14}
                        className={transparent ? "text-[#1F51FF]" : "text-[#0818A8]"}
                      />
                    </div>
                    <p className={`font-bold text-[12px] leading-snug mb-1 ${transparent ? "text-white/85" : "text-gray-800"}`}>
                      {featured.label}
                    </p>
                    <p className={`text-[10.5px] font-light leading-relaxed ${transparent ? "text-white/40" : "text-gray-800"}`}>
                      {featured.sub}
                    </p>
                  </Link>
                </div>
                <Link
                  href={featured.href}
                  className={`flex items-center gap-1.5 text-[9.5px] font-bold tracking-[0.1em] uppercase mt-4 transition-colors duration-200 ${
                    transparent ? "text-[#1F51FF] hover:text-white" : "text-[#0818A8] hover:text-[#0437F2]"
                  }`}
                >
                  Track Now <ArrowRight size={9} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── NavItem ──────────────────────────────────────────────────────────────────
function NavItem({ item, pathname, transparent }) {
  const [open, setOpen] = useState(false);
  const ref    = useRef(null);
  const menuId = `nav-menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`;

  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(item.href + "/");

  const handleOutside = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [handleOutside]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  // ── Primary CTA — "Get Quote"
  if (item.isPrimary) {
    return (
      <Link
        href={item.href}
        aria-label={item.ariaLabel}
        className="flex items-center gap-1.5 text-[12.5px] font-black tracking-[0.07em] uppercase bg-[#0818A8] hover:bg-[#0437F2] text-white px-4 py-[5px] rounded-sm transition-all duration-200 shadow-sm shadow-[#0818A8]/30"
      >
        {item.label}
        <ArrowRight size={10} aria-hidden="true" />
      </Link>
    );
  }

  // ── Track Shipment — outlined ghost pill
  if (item.isTrack) {
    return (
      <Link
        href={item.href}
        aria-label={item.ariaLabel}
        className={`flex items-center gap-1.5 text-[12.5px] font-semibold px-4 py-[5px] border rounded-sm transition-all duration-200 ${
          transparent
            ? "border-white/28 text-white/80 hover:border-white/55 hover:text-white"
            : "border-gray-600 text-gray-600 hover:border-[#0818A8] hover:text-[#0818A8] bg-white"
        }`}
      >
        <MapPin size={11} aria-hidden="true" />
        {item.label}
      </Link>
    );
  }

  // ── Standard text link
  const textBase = transparent
    ? isActive ? "text-white font-semibold" : "text-white/80 hover:text-white"
    : isActive ? "text-black font-semibold" : "text-black hover:text-black";

  const underlineBg = transparent ? "bg-white" : "bg-[#0818A8]";

  const baseClass = `
    relative flex items-center gap-1 text-[13px] font-normal
    tracking-normal transition-colors duration-150 py-1 group
    ${textBase}
  `;

  const underline = (
    <span
      className={`absolute -bottom-[17px] left-0 h-[2px] ${underlineBg} transition-all duration-200 ${
        isActive ? "w-full" : "w-0 group-hover:w-full"
      }`}
      aria-hidden="true"
    />
  );

  if (!item.dropdown) {
    return (
      <Link href={item.href} className={baseClass} aria-label={item.ariaLabel} aria-current={isActive ? "page" : undefined}>
        {item.label}
        {underline}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <button
        className={baseClass}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-label={item.ariaLabel}
      >
        {item.label}
        <ChevronDown
          size={12}
          className={`mt-px transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
        {underline}
      </button>
      <DropdownMenu
        items={item.dropdown}
        isOpen={open}
        transparent={transparent}
        menuId={menuId}
        featured={item.featured}
      />
    </div>
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
    const last  = focusable[focusable.length - 1];

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

  // Exclude isPrimary/isTrack from the normal nav list — they appear as quick actions
  const mobileNavItems = NAV_ITEMS.filter((i) => !i.isPrimary && !i.isTrack);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/55 lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={`
              ${montserrat.variable} font-[family-name:var(--font-montserrat)]
              fixed top-0 right-0 h-full w-[300px] max-w-full
              bg-[#0d0d1f] border-l border-white/10 flex flex-col z-50 lg:hidden
            `}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5" aria-label="R-Zone Enterprises — home">
                <Image src={assets.logo} alt="" width={30} height={30} className="rounded-sm flex-shrink-0" aria-hidden="true" />
                <div className="flex items-baseline gap-1.5">
                  <span className="font-black text-white text-[14px] tracking-[0.08em] uppercase">R-ZONE</span>
                  <span className="font-light text-white/40 text-[14px] uppercase">CARGO</span>
                </div>
              </Link>
              <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded transition-colors" aria-label="Close navigation menu">
                <X size={17} className="text-white/55" aria-hidden="true" />
              </button>
            </div>

            {/* Quick action strip */}
            <div className="px-5 py-3 border-b border-white/8 flex gap-2">
              <Link
                href="/track"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-1.5 border border-black/80 text-white text-[11.5px] font-bold py-2 rounded-sm hover:bg-white/8 transition-colors"
                aria-label="Track your shipment"
              >
                <MapPin size={11} className="text-[#1F51FF]" aria-hidden="true" />
                Track Shipment
              </Link>
              <Link
                href="/quote"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black py-2 rounded-sm transition-colors tracking-[0.05em] uppercase"
                aria-label="Get a shipping quote"
              >
                Get Quote
                <ArrowRight size={10} aria-hidden="true" />
              </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto" aria-label="Mobile navigation">
              {mobileNavItems.map((item) => (
                <div key={item.label} className="border-b border-white/5">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-5 py-3.5 text-[13px] text-white/62 hover:text-white transition-colors"
                        aria-expanded={expanded === item.label}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${expanded === item.label ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence>
                        {expanded === item.label && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-white/[0.03]"
                          >
                            {item.dropdown.map((sub) => {
                              const Icon = sub.icon;
                              return (
                                <Link
                                  key={sub.href + sub.label}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="flex items-center gap-3 pl-8 pr-5 py-2.5 text-[12.5px] text-white/80 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
                                >
                                  {Icon && <Icon size={11} className="text-[#1F51FF] flex-shrink-0" aria-hidden="true" />}
                                  {sub.label}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`block px-5 py-3.5 text-[13px] transition-colors ${
                        pathname === item.href ? "text-white font-semibold" : "text-white/62 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Contact strip */}
            <div className="px-5 pt-4 pb-2 border-t border-white/8">
              <a href="tel:+448007720864" className="flex items-center gap-2 text-white/45 hover:text-white text-[11.5px] transition-colors mb-1.5" aria-label="Call R-Zone: +44 800 772 0864">
                <Phone size={11} className="text-[#1F51FF]" aria-hidden="true" />
                +44 (0) 800 772 0864
              </a>
              <a href="mailto:info@r-zoneenterprises.com" className="flex items-center gap-2 text-white/45 hover:text-white text-[11.5px] transition-colors" aria-label="Email R-Zone">
                <MessageSquare size={11} className="text-[#1F51FF]" aria-hidden="true" />
                info@r-zoneenterprises.com
              </a>
            </div>
            <div className="pb-6" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname    = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [hasHero,    setHasHero]    = useState(false);

  const isHome = pathname === "/";

  // detect any hero section on non-home pages by looking for a marker class
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setHasHero(!!document.querySelector(".hero-section"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [pathname]);

  const transparent = (isHome || hasHero) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setScrolled(window.scrollY > 80); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ── SEO schemas ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SiteLinksSearchBox",
          "url": "https://r-zoneenterprises.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": { "@type": "EntryPoint", "urlTemplate": "https://r-zoneenterprises.com/search?q={search_term_string}" },
            "query-input": "required name=search_term_string",
          },
        }),
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": NAV_ITEMS.flatMap((item) => {
            const entries = [{ "@type": "SiteNavigationElement", "name": item.label, "url": `https://r-zoneenterprises.com${item.href}` }];
            if (item.dropdown) {
              item.dropdown.forEach((sub) => entries.push({
                "@type": "SiteNavigationElement",
                "name": sub.label,
                "url": `https://r-zoneenterprises.com${sub.href}`,
              }));
            }
            return entries;
          }),
        }),
      }} />

      <motion.header
        className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] fixed top-0 left-0 right-0 z-30 w-full`}
        animate={{
          backgroundColor: transparent ? "rgba(0,6,26,0)" : "#ffffff",
          boxShadow: transparent ? "none" : "0 1px 0 rgba(0,0,0,0.08), 0 2px 16px rgba(0,0,0,0.07)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        role="banner"
        aria-label="R-Zone Enterprises site navigation"
        itemScope
        itemType="https://schema.org/WPHeader"
      >

        {/* ── ROW 1 — Logo + utility ── */}
        <div className={`border-b transition-colors duration-300 ${transparent ? "border-white/8" : "border-black"}`}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 flex items-center justify-between h-[80px] md:h-[50px]">

            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="R-Zone Enterprises — UK to Nigeria cargo specialists, home" itemProp="url">
              <Image src={assets.logo} alt="" width={34} height={34} className="flex-shrink-0 rounded-sm group-hover:opacity-90 transition-opacity" aria-hidden="true" />
              <div className="flex items-baseline gap-1.5" itemProp="name">
                <span className={`font-black text-[18px] tracking-[0.06em] uppercase leading-none transition-colors duration-300 ${transparent ? "text-white" : "text-#00020"}`}>
                  R-ZONE
                </span>
                <span className={`font-normal text-[18px] tracking-wide uppercase leading-none transition-colors duration-300 ${transparent ? "text-white" : "text-black"}`}>
                  CARGO
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-5" aria-label="Utility links">
              {TOP_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.label} href={link.href} aria-label={link.ariaLabel}
                    className={`flex items-center gap-1.5 text-[12px] font-normal transition-colors duration-200 ${
                      transparent ? "text-white/50 hover:text-white" : "text-black hover:text-black"
                    }`}
                  >
                    <Icon size={12} strokeWidth={1.6} aria-hidden="true" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden p-2 rounded transition-colors ${transparent ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              <Menu size={21} className={`transition-colors duration-300 ${transparent ? "text-white" : "text-black"}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── ROW 2 — Nav ── */}
        <div className={`hidden lg:block border-b transition-colors duration-300 ${transparent ? "border-white/8" : "border-black"}`}>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 flex items-center justify-between h-[50px]">

            {/* Left — text nav links */}
            <nav className="flex items-center gap-5 xl:gap-6 h-full" aria-label="Main navigation" role="navigation">
              {NAV_ITEMS.filter((i) => !i.isTrack && !i.isPrimary).map((item) => (
                <NavItem key={item.label} item={item} pathname={pathname} transparent={transparent} />
              ))}
            </nav>

            {/* Right — CTA buttons */}
            <div className="flex items-center gap-2 flex-shrink-0" role="group" aria-label="Primary actions">
              {NAV_ITEMS.filter((i) => i.isTrack || i.isPrimary).map((item) => (
                <NavItem key={item.label} item={item} pathname={pathname} transparent={transparent} />
              ))}
            </div>

          </div>
        </div>

      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} pathname={pathname} />
    </>
  );
}