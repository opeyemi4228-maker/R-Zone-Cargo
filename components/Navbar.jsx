"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown, Globe, Search, Bell, HelpCircle,
  MessageSquare, Menu, X, Package, MapPin,
  Truck, Warehouse, FileCheck, Anchor, Plane, Ship,
  Phone,
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

// ─── Navigation data — real R-Zone services & pages ───────────────────────────

const TOP_LINKS = [
  {
    label: "EN",
    icon: Globe,
    href: "#",
    ariaLabel: "Select language",
  },
  {
    label: "+44 800 772 0864",
    icon: Phone,
    href: "tel:+448007720864",
    ariaLabel: "Call R-Zone UK office: +44 800 772 0864",
  },
  {
    label: "Support",
    icon: HelpCircle,
    href: "/support",
    ariaLabel: "Get support from R-Zone",
  },
  {
    label: "Contact Us",
    icon: MessageSquare,
    href: "/contact",
    ariaLabel: "Contact R-Zone Enterprises",
  },
];

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    ariaLabel: "R-Zone Enterprises homepage",
  },
  {
    label: "Prices",
    href: "/prices",
    ariaLabel: "R-Zone cargo prices and rates",
  },
  {
    label: "Services",
    href: "/services",
    ariaLabel: "R-Zone shipping services",
    dropdown: [
      {
        label: "Air Freight to Nigeria",
        href: "/air-freight",
        icon: Plane,
        description: "Fast UK to Nigeria air cargo",
      },
      {
        label: "Sea Shipping to Nigeria",
        href: "/sea-shipping-to-nigeria",
        icon: Ship,
        description: "Affordable monthly sea freight",
      },
      {
        label: "Door to Door Cargo",
        href: "/door-to-door-cargo",
        icon: Truck,
        description: "Collection & delivery to your door",
      },
      {
        label: "Importation from Nigeria",
        href: "/importation-from-nigeria",
        icon: Package,
        description: "Weekly air & monthly sea imports",
      },
      {
        label: "Customs Clearance",
        href: "/customs-clearance",
        icon: FileCheck,
        description: "Expert customs handling",
      },
      {
        label: "Warehousing",
        href: "/warehousing",
        icon: Warehouse,
        description: "Secure UK storage solutions",
      },
    ],
  },
  {
    label: "Schedules",
    href: "/sailing-schedule",
    ariaLabel: "R-Zone sailing and flight schedules",
  },
  {
    label: "Track",
    href: "/track",
    ariaLabel: "Track your R-Zone shipment",
  },
  {
    label: "Company",
    href: "/about",
    ariaLabel: "About R-Zone Enterprises",
    dropdown: [
      {
        label: "About Us",
        href: "/about",
        icon: Globe,
        description: "Our story since 2012",
      },
      {
        label: "Why R-Zone",
        href: "/why-rzone",
        icon: Package,
        description: "Why thousands choose us",
      },
      {
        label: "Industries Served",
        href: "/industries",
        icon: MapPin,
        description: "Sectors we specialise in",
      },
      {
        label: "News & Insights",
        href: "/news",
        icon: MessageSquare,
        description: "Latest logistics news",
      },
      {
        label: "Careers",
        href: "/careers",
        icon: FileCheck,
        description: "Join the R-Zone team",
      },
    ],
  },
];

// ─── Dropdown ─────────────────────────────────────────────────────────────────

function DropdownMenu({ items, isOpen, transparent, menuId }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={menuId}
          role="menu"
          aria-label="Submenu"
          className={`
            absolute top-full left-0 mt-0 w-60 shadow-2xl z-50 overflow-hidden border
            ${transparent
              ? "bg-[#0e0e20] border-white/10 shadow-black/50"
              : "bg-white border-gray-200 shadow-gray-200/60"
            }
          `}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
        >
          {/* Accent top line */}
          <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />

          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className={`
                  flex items-start gap-3 px-4 py-3 text-[13px]
                  transition-colors duration-100 group border-b last:border-0
                  ${transparent
                    ? "text-white/70 hover:bg-[#0818A8]/80 hover:text-white border-white/5"
                    : "text-gray-700 hover:bg-[#0818A8] hover:text-white border-gray-100"
                  }
                `}
              >
                {Icon && (
                  <Icon
                    size={13}
                    className={`
                      flex-shrink-0 mt-0.5 transition-colors
                      ${transparent
                        ? "text-[#1F51FF] group-hover:text-white"
                        : "text-[#0818A8] group-hover:text-white"
                      }
                    `}
                    aria-hidden="true"
                  />
                )}
                <div>
                  <span className="block font-semibold leading-tight">{item.label}</span>
                  {item.description && (
                    <span
                      className={`
                        block text-[11px] font-normal mt-0.5 leading-snug
                        ${transparent
                          ? "text-white/35 group-hover:text-white/70"
                          : "text-gray-400 group-hover:text-white/75"
                        }
                      `}
                    >
                      {item.description}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
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

  // Close on outside click
  const handleOutside = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [handleOutside]);

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  const textBase = transparent
    ? isActive ? "text-white font-semibold" : "text-white/80 hover:text-white"
    : isActive ? "text-gray-900 font-semibold" : "text-gray-700 hover:text-gray-900";

  const underlineBg = transparent ? "bg-white" : "bg-[#0818A8]";

  const baseClass = `
    relative flex items-center gap-1 text-[14px] font-normal
    tracking-normal transition-colors duration-150 py-1 group
    ${textBase}
  `;

  const underline = (
    <span
      className={`
        absolute -bottom-[17px] left-0 h-[2px] ${underlineBg}
        transition-all duration-200
        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
      `}
      aria-hidden="true"
    />
  );

  if (!item.dropdown) {
    return (
      <Link
        href={item.href}
        className={baseClass}
        aria-label={item.ariaLabel}
        aria-current={isActive ? "page" : undefined}
      >
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
          size={13}
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
      />
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({ isOpen, onClose, pathname }) {
  const [expanded, setExpanded] = useState(null);
  const menuRef = useRef(null);

  // Focus trap — keep focus inside when open
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
        if (document.activeElement === last)  { e.preventDefault(); first?.focus(); }
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/55 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={`
              ${montserrat.variable} font-[family-name:var(--font-montserrat)]
              fixed top-0 right-0 h-full w-[300px] max-w-full
              bg-[#0d0d1f] border-l border-white/10
              flex flex-col z-50 lg:hidden
            `}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Top accent */}
            <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2.5"
                aria-label="R-Zone Enterprises — home"
              >
                <Image
                  src={assets.logo}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-sm"
                  aria-hidden="true"
                />
                <div className="flex items-baseline gap-1.5">
                  <span className="font-black text-white text-[15px] tracking-[0.08em] uppercase">R-ZONE</span>
                  <span className="font-light text-white/38 text-[15px] uppercase">CARGO</span>
                </div>
              </Link>

              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
                aria-label="Close navigation menu"
              >
                <X size={18} className="text-white/55" aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-white/5">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setExpanded(expanded === item.label ? null : item.label)
                        }
                        className="w-full flex items-center justify-between px-5 py-4 text-[14px] text-white/62 hover:text-white transition-colors"
                        aria-expanded={expanded === item.label}
                        aria-haspopup="true"
                        aria-label={item.ariaLabel}
                      >
                        {item.label}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${
                            expanded === item.label ? "rotate-180" : ""
                          }`}
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
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="flex items-center gap-3 pl-8 pr-5 py-3 text-[13px] text-white/45 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
                                  aria-label={sub.label}
                                >
                                  {Icon && (
                                    <Icon size={12} className="text-[#1F51FF] flex-shrink-0" aria-hidden="true" />
                                  )}
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
                      aria-label={item.ariaLabel}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`
                        block px-5 py-4 text-[14px] transition-colors
                        ${pathname === item.href
                          ? "text-white font-semibold"
                          : "text-white/62 hover:text-white"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Contact strip */}
            <div className="px-5 pt-4 pb-2 border-t border-white/8">
              <a
                href="tel:+448007720864"
                className="flex items-center gap-2 text-white/45 hover:text-white text-[12px] transition-colors mb-1"
                aria-label="Call R-Zone: +44 800 772 0864"
              >
                <Phone size={11} className="text-[#1F51FF]" aria-hidden="true" />
                +44 (0) 800 772 0864
              </a>
              <a
                href="mailto:info@r-zoneenterprises.com"
                className="flex items-center gap-2 text-white/45 hover:text-white text-[12px] transition-colors"
                aria-label="Email R-Zone: info@r-zoneenterprises.com"
              >
                <MessageSquare size={11} className="text-[#1F51FF]" aria-hidden="true" />
                info@r-zoneenterprises.com
              </a>
            </div>

            {/* CTAs */}
            <div className="px-5 pb-6 pt-3 flex flex-col gap-2.5">
              <Link
                href="/track"
                onClick={onClose}
                className="w-full text-center border border-white/22 text-white text-[13px] font-bold py-2.5 hover:bg-white/8 transition-colors rounded-sm"
                aria-label="Track your R-Zone shipment"
              >
                Track Now
              </Link>
              <Link
                href="/quote"
                onClick={onClose}
                className="w-full text-center bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black py-2.5 transition-colors rounded-sm tracking-[0.06em] uppercase"
                aria-label="Get a shipping quote from R-Zone"
              >
                Ship Now
              </Link>
            </div>
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

  // Transparent ONLY on homepage before scroll
  const isHome     = pathname === "/";
  const transparent = isHome && !scrolled;

  // Scroll listener — passive for performance
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Sync on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-sync on route change (handles direct navigation to non-home)
  useEffect(() => {
    setScrolled(window.scrollY > 80);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/*
        ── Structured data: SiteNavigationElement
        Tells Google the exact nav structure for Sitelinks.
        Each navitem gets its own schema entry.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteLinksSearchBox",
            "url": "https://r-zoneenterprises.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://r-zoneenterprises.com/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

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
                item.dropdown.forEach((sub) => {
                  entries.push({
                    "@type": "SiteNavigationElement",
                    "name": sub.label,
                    "url": `https://r-zoneenterprises.com${sub.href}`,
                  });
                });
              }
              return entries;
            }),
          }),
        }}
      />

      <motion.header
        className={`
          ${montserrat.variable} font-[family-name:var(--font-montserrat)]
          fixed top-0 left-0 right-0 z-30 w-full
        `}
        animate={{
          backgroundColor: transparent ? "rgba(0,6,26,0)" : "#ffffff",
          boxShadow: transparent
            ? "none"
            : "0 1px 0 rgba(0,0,0,0.08), 0 2px 16px rgba(0,0,0,0.07)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        role="banner"
        aria-label="R-Zone Enterprises site navigation"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        {/* ══ ROW 1 — Logo + utility links ═══════════════════════════════ */}
        <div
          className={`
            border-b transition-colors duration-300
            ${transparent ? "border-white/8" : "border-gray-200"}
          `}
        >
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 flex items-center justify-between h-[52px]">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group flex-shrink-0"
              aria-label="R-Zone Enterprises — UK to Nigeria cargo specialists, home"
              itemProp="url"
            >
              <Image
                src={assets.logo}
                alt=""
                width={36}
                height={36}
                className="flex-shrink-0 rounded-sm"
                aria-hidden="true"
              />
              <div className="flex items-baseline gap-1.5" itemProp="name">
                <span
                  className={`
                    font-black text-[19px] tracking-[0.06em] uppercase leading-none
                    transition-colors duration-300
                    ${transparent ? "text-white" : "text-gray-900"}
                  `}
                >
                  R-ZONE
                </span>
                <span
                  className={`
                    font-light text-[19px] tracking-wide uppercase leading-none
                    transition-colors duration-300
                    ${transparent ? "text-white/45" : "text-gray-400"}
                  `}
                >
                  CARGO
                </span>
              </div>
            </Link>

            {/* Utility links — desktop */}
            <div
              className="hidden lg:flex items-center gap-5"
              aria-label="Utility links"
            >
              {TOP_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    className={`
                      flex items-center gap-1.5 text-[12.5px] font-normal
                      transition-colors duration-200
                      ${transparent
                        ? "text-white/50 hover:text-white"
                        : "text-gray-500 hover:text-gray-900"
                      }
                    `}
                  >
                    <Icon size={13} strokeWidth={1.6} aria-hidden="true" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`
                lg:hidden p-2 rounded transition-colors
                ${transparent ? "hover:bg-white/10" : "hover:bg-gray-100"}
              `}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              <Menu
                size={22}
                className={`transition-colors duration-300 ${transparent ? "text-white" : "text-gray-700"}`}
                aria-hidden="true"
              />
            </button>

          </div>
        </div>

        {/* ══ ROW 2 — Nav items + CTAs ════════════════════════════════════ */}
        <div
          className={`
            hidden lg:block border-b transition-colors duration-300
            ${transparent ? "border-white/8" : "border-gray-200"}
          `}
        >
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 flex items-center justify-between h-[52px]">

            {/* Nav items */}
            <nav
              className="flex items-center gap-7 h-full"
              aria-label="Main navigation"
              role="navigation"
              itemScope
              itemType="https://schema.org/SiteLinksSearchBox"
            >
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  transparent={transparent}
                />
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="flex items-center gap-2" role="group" aria-label="Primary actions">
              <Link
                href="/track"
                className={`
                  flex items-center gap-2 text-[13.5px] font-semibold
                  px-5 py-[7px] border transition-all duration-200 rounded-sm
                  ${transparent
                    ? "border-white/28 text-white hover:border-white/55 hover:bg-white/10"
                    : "border-gray-300 text-gray-700 hover:border-[#0818A8] hover:text-[#0818A8] bg-white"
                  }
                `}
                aria-label="Track your R-Zone shipment"
              >
                <MapPin size={13} strokeWidth={1.6} aria-hidden="true" />
                Track Now
              </Link>
              <Link
                href="/quote"
                className="
                  flex items-center gap-2 text-[13.5px] font-black tracking-[0.06em] uppercase
                  px-5 py-[7px] bg-[#0818A8] hover:bg-[#0437F2] text-white
                  transition-colors duration-200 rounded-sm
                  shadow-md shadow-[#0818A8]/25 hover:shadow-[#0437F2]/30
                "
                aria-label="Get a shipping quote from R-Zone Enterprises"
              >
                Ship Now
              </Link>
            </div>

          </div>
        </div>

      </motion.header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={closeMobile}
        pathname={pathname}
      />
    </>
  );
}