"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Montserrat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Settings, ChevronDown, ShieldCheck } from "lucide-react";
import Link from "next/link";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Config ───────────────────────────────────────────────────────────────────
const STORAGE_KEY   = "rzone_cookie_consent";   // "accepted" | "declined" | "custom"
const TIMESTAMP_KEY = "rzone_cookie_timestamp"; // Unix ms of last decision
const PREFS_KEY     = "rzone_cookie_prefs";     // JSON of granular toggles
const RESHOW_HOURS  = 6;
const RESHOW_MS     = RESHOW_HOURS * 60 * 60 * 1000;

const DEFAULT_PREFS = {
  necessary:   true,   // always on — cannot be toggled
  analytics:   false,
  marketing:   false,
  preferences: false,
};

// ─── SSR-safe localStorage helpers ───────────────────────────────────────────
function safeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}
function safeJSON(raw, fallback) {
  try { return raw ? { ...fallback, ...JSON.parse(raw) } : fallback; } catch { return fallback; }
}

// ─── Core visibility logic ────────────────────────────────────────────────────
//  "accepted"     → Full consent. Never re-show.
//  "declined"     → Re-show after RESHOW_MS (6 hrs).
//  "custom"       → Re-show after RESHOW_MS (6 hrs).
//  null / missing → First visit. Show immediately.
function shouldShowBanner() {
  const consent   = safeGet(STORAGE_KEY);
  const timestamp = safeGet(TIMESTAMP_KEY);

  if (!consent)               return true;
  if (consent === "accepted") return false;
  if (!timestamp)             return true;
  return Date.now() - parseInt(timestamp, 10) >= RESHOW_MS;
}

// ─── Preference toggle row ────────────────────────────────────────────────────
function PrefRow({ label, description, checked, onChange, disabled = false }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-[12.5px] font-semibold leading-tight mb-0.5">
          {label}
          {disabled && (
            <span className="ml-2 text-[9.5px] font-black tracking-[0.1em] uppercase text-[#0818A8] bg-[#0818A8]/8 px-1.5 py-0.5">
              Always On
            </span>
          )}
        </p>
        <p className="text-gray-800 text-[11px] font-light leading-snug">
          {description}
        </p>
      </div>

      <button
        role="switch"
        aria-checked={checked}
        aria-label={`${checked ? "Disable" : "Enable"} ${label} cookies`}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          relative flex-shrink-0 w-9 h-5 rounded-full border-2
          transition-all duration-200 mt-0.5
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0818A8] focus-visible:ring-offset-1
          ${disabled
            ? "bg-[#0818A8] border-[#0818A8] opacity-70 cursor-not-allowed"
            : checked
              ? "bg-[#0818A8] border-[#0818A8] cursor-pointer"
              : "bg-gray-200 border-gray-300 cursor-pointer hover:border-gray-400"
          }
        `}
      >
        <span
          className={`
            absolute top-[1px] w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-200
            ${checked || disabled ? "translate-x-[18px]" : "translate-x-[1px]"}
          `}
        />
      </button>
    </div>
  );
}

// ─── Cookie Banner ────────────────────────────────────────────────────────────
function CookieBanner() {
  const [visible,  setVisible]  = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs,    setPrefs]    = useState(DEFAULT_PREFS);

  // Client-only mount — all localStorage access here
  useEffect(() => {
    const savedPrefs = safeGet(PREFS_KEY);
    const parsed     = safeJSON(savedPrefs, DEFAULT_PREFS);
    setPrefs({ ...parsed, necessary: true });

    if (shouldShowBanner()) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  // Escape key closes banner (decline)
  useEffect(() => {
    if (!visible) return;
    const handler = (e) => { if (e.key === "Escape") handleDecline(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Persist decision + fire consent event for analytics scripts
  const persist = useCallback((consentValue, prefValues) => {
    safeSet(STORAGE_KEY,   consentValue);
    safeSet(TIMESTAMP_KEY, String(Date.now()));
    safeSet(PREFS_KEY,     JSON.stringify(prefValues));
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("rzone:cookie-consent", {
          detail: { consent: consentValue, prefs: prefValues },
        })
      );
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const all = { necessary: true, analytics: true, marketing: true, preferences: true };
    setPrefs(all);
    persist("accepted", all);
    setVisible(false);
  }, [persist]);

  const handleDecline = useCallback(() => {
    const minimal = { ...DEFAULT_PREFS };
    setPrefs(minimal);
    persist("declined", minimal);
    setVisible(false);
  }, [persist]);

  const handleSaveCustom = useCallback(() => {
    persist("custom", prefs);
    setVisible(false);
  }, [persist, prefs]);

  const togglePref = useCallback(
    (key) => (val) => setPrefs((p) => ({ ...p, [key]: val })),
    []
  );

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />

          {/* Banner — slides up from bottom */}
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-label="Cookie consent"
            aria-describedby="cookie-description"
            className={`
              ${montserrat.variable} font-[family-name:var(--font-montserrat)]
              fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6
            `}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="max-w-[1100px] mx-auto bg-white border border-gray-200 shadow-2xl shadow-black/10 rounded-sm overflow-hidden relative">

              {/* Blue top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]"
                aria-hidden="true"
              />

              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 px-6 py-6 md:px-8 md:py-7">

                {/* ── Text content ── */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-3">
                    <ShieldCheck size={15} className="text-[#0818A8] flex-shrink-0" aria-hidden="true" />
                    <h3 className="text-gray-900 font-bold text-[16px] md:text-[17px] tracking-[-0.01em]">
                      Your privacy matters.
                    </h3>
                  </div>

                  <p
                    id="cookie-description"
                    className="text-gray-800 text-[13px] font-light leading-relaxed mb-3"
                  >
                    R-Zone Cargo uses cookies to personalise content and ads, to provide
                    social media features, and to analyse our traffic. We also share
                    information about your use of our site with our social media,
                    advertising and analytics partners who may combine it with other
                    information that you&apos;ve provided to them or that they&apos;ve collected
                    from your use of their services.
                  </p>

                  <p className="text-gray-800 text-[13px] font-light leading-relaxed">
                    By accepting, you agree to the use of these cookies. To learn more,
                    view our{" "}
                    <Link
                      href="/cookies"
                      className="text-[#0818A8] underline underline-offset-2 hover:text-[#0437F2] transition-colors"
                    >
                      Cookie Policy
                    </Link>
                    {" "}&amp;{" "}
                    <Link
                      href="/privacy"
                      className="text-[#0818A8] underline underline-offset-2 hover:text-[#0437F2] transition-colors"
                    >
                      Privacy Policy.
                    </Link>
                  </p>

                  {/* Re-prompt notice */}
                  <p className="text-gray-800 text-[10.5px] font-light mt-2 tracking-wide">
                    ↺&nbsp; Your preferences are reviewed every {RESHOW_HOURS} hours to ensure consent remains current.
                  </p>
                </div>

                {/* ── Action buttons ── */}
                <div className="flex flex-row md:flex-col items-center md:items-stretch gap-2.5 flex-shrink-0 md:min-w-[150px] self-end md:self-auto pb-0.5">

                  <motion.button
                    onClick={handleAcceptAll}
                    className="flex items-center justify-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-semibold px-6 py-2.5 rounded-sm transition-colors duration-150 tracking-[0.01em] shadow-md shadow-[#0818A8]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0818A8] focus-visible:ring-offset-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Accept all cookies"
                  >
                    <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                    Yes, I accept
                  </motion.button>

                  <motion.button
                    onClick={handleDecline}
                    className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 text-[13px] font-medium px-6 py-2.5 rounded-sm transition-colors duration-150 tracking-[0.01em] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Decline optional cookies"
                  >
                    Decline
                  </motion.button>

                  <button
                    onClick={() => setExpanded((p) => !p)}
                    aria-expanded={expanded}
                    aria-controls="cookie-prefs-panel"
                    className="flex items-center justify-center gap-1.5 text-[#0818A8] hover:text-[#0437F2] text-[11px] font-bold tracking-[0.06em] uppercase transition-colors duration-150 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0818A8] focus-visible:ring-offset-2"
                  >
                    <Settings size={11} aria-hidden="true" />
                    Manage
                    <ChevronDown
                      size={11}
                      className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>

              {/* ── Expanded preferences panel ── */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    id="cookie-prefs-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 pt-2 border-t border-gray-100">
                      <p className="text-gray-800 text-[10px] font-black tracking-[0.25em] uppercase mb-3 pt-4">
                        Cookie Categories
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        <PrefRow
                          label="Strictly Necessary"
                          description="Core site functions — sessions, forms, and security. Cannot be disabled."
                          checked={true}
                          onChange={() => {}}
                          disabled
                        />
                        <PrefRow
                          label="Analytics"
                          description="Helps us understand how visitors use the site so we can improve it."
                          checked={prefs.analytics}
                          onChange={togglePref("analytics")}
                        />
                        <PrefRow
                          label="Marketing"
                          description="Used to display relevant adverts on third-party platforms."
                          checked={prefs.marketing}
                          onChange={togglePref("marketing")}
                        />
                        <PrefRow
                          label="Preferences"
                          description="Remembers your settings — language, region, and display choices."
                          checked={prefs.preferences}
                          onChange={togglePref("preferences")}
                        />
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <motion.button
                          onClick={handleSaveCustom}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-1.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-bold tracking-[0.06em] uppercase px-5 py-2 rounded-sm transition-colors duration-150 shadow-sm shadow-[#0818A8]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0818A8] focus-visible:ring-offset-2"
                          aria-label="Save selected cookie preferences"
                        >
                          <Check size={11} strokeWidth={2.5} aria-hidden="true" />
                          Save Preferences
                        </motion.button>
                        <span className="text-gray-800 text-[11px] font-light">
                          Only enabled categories will be active.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const Home = () => {
  return (
    <>
      <div>
        <HeaderSlider />
        <HomeProducts />
        <NewsLetter />
        <Banner />
      </div>

      {/* Cookie banner — renders on top of everything */}
      <CookieBanner />
    </>
  );
};

export default Home;