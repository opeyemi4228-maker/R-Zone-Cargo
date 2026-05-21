"use client";

import { Montserrat } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Cookie, ChevronRight, ArrowLeft, Phone, Mail, ArrowRight,
  ChevronDown, Check, Shield, ToggleLeft, ToggleRight,
  Clock, Globe, FileText, ExternalLink, Info,
  Eye, BarChart3, Megaphone, Lock,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"], weight: ["300","400","500","600","700","800","900"],
  variable: "--font-montserrat", display: "swap",
});

const TOC = [
  { id: "c1",  label: "What Are Cookies",           num: "01" },
  { id: "c2",  label: "How We Use Cookies",          num: "02" },
  { id: "c3",  label: "Strictly Necessary",          num: "03" },
  { id: "c4",  label: "Analytics Cookies",           num: "04" },
  { id: "c5",  label: "Functionality Cookies",       num: "05" },
  { id: "c6",  label: "Marketing Cookies",           num: "06" },
  { id: "c7",  label: "Third-Party Cookies",         num: "07" },
  { id: "c8",  label: "Managing Preferences",        num: "08" },
  { id: "c9",  label: "Your Consent",                num: "09" },
  { id: "c10", label: "Do Not Track",                num: "10" },
  { id: "c11", label: "Changes",                     num: "11" },
  { id: "c12", label: "Contact Us",                  num: "12" },
];

const COOKIE_CATEGORIES = [
  {
    id: "strictly",
    icon: Lock,
    title: "Strictly Necessary",
    color: "#0818A8",
    required: true,
    desc: "Essential for the website to function. Cannot be disabled.",
    cookies: [
      { name: "rzone_session",        purpose: "Maintains your login session",                            duration: "Session"   },
      { name: "rzone_csrf",           purpose: "Cross-site request forgery protection",                  duration: "Session"   },
      { name: "rzone_cookie_consent", purpose: "Stores your cookie consent preference",                  duration: "12 months" },
      { name: "rzone_auth_token",     purpose: "Secure authentication token",                            duration: "30 days"   },
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    color: "#1F51FF",
    required: false,
    desc: "Help us understand how visitors use our site. All data is anonymised.",
    cookies: [
      { name: "_ga",     purpose: "Google Analytics — distinguishes users",    duration: "2 years"   },
      { name: "_ga_[ID]", purpose: "Google Analytics — session state",         duration: "2 years"   },
      { name: "_gid",    purpose: "Google Analytics — distinguishes users",    duration: "24 hours"  },
      { name: "_gat",    purpose: "Google Analytics — request throttle",       duration: "1 minute"  },
    ],
  },
  {
    id: "functionality",
    icon: Eye,
    title: "Functionality",
    color: "#0437F2",
    required: false,
    desc: "Enable enhanced features and personalisation on our site.",
    cookies: [
      { name: "rzone_tracking_id", purpose: "Enables tracking without login",          duration: "7 days"    },
      { name: "rzone_quote_draft", purpose: "Saves quote form progress",               duration: "24 hours"  },
      { name: "rzone_lang",        purpose: "Language preference",                     duration: "12 months" },
    ],
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Marketing",
    color: "#0818A8",
    required: false,
    desc: "Used with your consent to show relevant advertising on other sites.",
    cookies: [
      { name: "_fbp", purpose: "Facebook Pixel — conversion tracking",     duration: "3 months" },
      { name: "fr",   purpose: "Facebook — advertising delivery",          duration: "3 months" },
    ],
  },
];

const BROWSER_LINKS = [
  { name: "Google Chrome",    href: "https://support.google.com/chrome/answer/95647" },
  { name: "Mozilla Firefox",  href: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" },
  { name: "Apple Safari",     href: "https://support.apple.com/en-gb/guide/safari/sfri11471/mac" },
  { name: "Microsoft Edge",   href: "https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-168dab11-0753-043d-7c16-ede5947fc64d" },
];

const THIRD_PARTIES = [
  { name: "Google Analytics", purpose: "Website analytics",       policy: "https://policies.google.com/privacy",                                                                  note: "IP anonymisation enabled; no advertising features" },
  { name: "Stripe",           purpose: "Payment processing",      policy: "https://stripe.com/gb/privacy",                                                                        note: "PCI-DSS Level 1 compliant" },
  { name: "PayPal",           purpose: "Payment processing",      policy: "https://www.paypal.com/uk/webapps/mpp/ua/privacy-full",                                               note: "PCI-DSS Level 1 compliant" },
  { name: "Meta (Facebook)",  purpose: "Advertising measurement", policy: "https://www.facebook.com/policy.php",                                                                  note: "Only set with your explicit consent" },
];

// ─── Shared components ────────────────────────────────────────────────────────
function P({ children }) { return <p className="text-gray-700 text-[14px] font-normal leading-relaxed mb-4">{children}</p>; }
function H3({ children }) { return <h3 className="text-gray-900 font-bold text-[13px] tracking-[0.1em] uppercase mb-3 mt-6 first:mt-0">{children}</h3>; }
function UL({ children }) { return <ul className="space-y-2.5 mb-5">{children}</ul>; }
function LI({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0818A8] flex-shrink-0 mt-[0.48em]" aria-hidden="true" />
      <span className="text-gray-700 text-[13.5px] font-normal leading-relaxed">{children}</span>
    </li>
  );
}
function Callout({ type = "blue", children }) {
  const s = {
    blue:  "border-l-[3px] border-[#0818A8] bg-[#0818A8]/4 text-gray-800",
    green: "border-l-[3px] border-emerald-600 bg-emerald-50 text-emerald-900",
    amber: "border-l-[3px] border-amber-500 bg-amber-50 text-amber-900",
  };
  return <div className={`px-5 py-4 my-6 text-[13px] font-normal leading-relaxed ${s[type]}`}>{children}</div>;
}

function CookieTable({ cookies }) {
  return (
    <div className="overflow-x-auto mb-5 border border-gray-200">
      <table className="w-full" style={{ minWidth: 460 }} aria-label="Cookie details">
        <thead>
          <tr className="bg-[#0818A8]">
            {["Cookie Name","Purpose","Duration"].map(h => (
              <th key={h} className="px-5 py-3 text-left text-[13px] font-bold tracking-[0.18em] uppercase text-white">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cookies.map((c, i) => (
            <tr key={i} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-[#0818A8]/3 transition-colors`}>
              <td className="px-5 py-3">
                <code className="text-[13px] font-semibold text-gray-900 bg-gray-100 px-2 py-0.5">{c.name}</code>
              </td>
              <td className="px-5 py-3 text-[13px] text-gray-700 font-normal">{c.purpose}</td>
              <td className="px-5 py-3 text-[13px] text-gray-700 font-normal whitespace-nowrap">{c.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ id, num, title, children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section id={id} ref={ref} className="scroll-mt-[80px] py-10 border-b border-gray-100 last:border-0"
      aria-labelledby={`${id}-h`}
      initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <div className="flex items-start gap-5 mb-7">
        <div className="w-10 h-10 bg-[#0818A8] flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <span className="text-white font-black text-[13px] tracking-[0.06em]">{num}</span>
        </div>
        <h2 id={`${id}-h`} className="font-black text-[clamp(18px,2.8vw,25px)] text-gray-900 leading-tight tracking-[-0.02em] pt-1.5">{title}</h2>
      </div>
      <div className="pl-[60px]">{children}</div>
    </motion.section>
  );
}

export default function CookiePolicyPage() {
  const [activeId, setActiveId] = useState("c1");
  const [navScrolled, setNavScrolled] = useState(false);
  const [tocMobile, setTocMobile] = useState(false);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true }); fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = [];
    TOC.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveId(item.id); }, { rootMargin: "-20% 0px -70% 0px" });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white min-h-screen`}>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebPage",
        "name": "Cookie Policy — R-Zone Enterprises",
        "url": "https://r-zoneenterprises.com/cookies",
        "description": "R-Zone Enterprises Cookie Policy — how we use cookies and tracking technologies under UK PECR and UK GDPR.",
        "dateModified": "2025-01-15",
        "publisher": { "@type": "Organization", "name": "R-Zone Enterprises", "url": "https://r-zoneenterprises.com" },
      })}} />

      {/* Top bar */}
      <div className="bg-[#0818A8]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 h-9 flex items-center justify-between">
          <p className="text-white/80 text-[13px] font-medium">R-Zone Enterprises — Legal &amp; Compliance</p>
          <div className="hidden sm:flex items-center gap-6">
            <a href="tel:+448007720864" className="flex items-center gap-1.5 text-white/75 hover:text-white text-[13px] font-medium transition-colors" aria-label="Call R-Zone"><Phone size={10} aria-hidden="true" /> +44 800 772 0864</a>
            <a href="mailto:privacy@r-zoneenterprises.com" className="flex items-center gap-1.5 text-white/75 hover:text-white text-[13px] font-medium transition-colors" aria-label="Email privacy team"><Mail size={10} aria-hidden="true" /> privacy@r-zoneenterprises.com</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-gray-500 text-[13px] font-medium hover:text-gray-800 transition-colors">Home</Link>
            <ChevronRight size={11} className="text-gray-300" aria-hidden="true" />
            <span className="text-gray-800 text-[13px] font-medium" aria-current="page">Cookie Policy</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#0818A8] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Cookie size={20} className="text-white" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[#0818A8]/30 to-transparent" aria-hidden="true" />
              </div>
              <h1 className="font-black text-[clamp(32px,6vw,64px)] text-gray-900 leading-[0.88] tracking-[-0.035em] uppercase mb-5">
                Cookie<br /><span className="text-[#0818A8]">Policy.</span>
              </h1>
              <p className="text-gray-600 text-[15px] font-normal leading-relaxed max-w-lg">
                We use cookies to make our website work properly and to understand how you use it. This policy tells you exactly which cookies we use, why, and how to control them — including how to say no.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Last Updated", val: "15 January 2025",    icon: Clock    },
                { label: "Version",      val: "v3.0 — 2025",        icon: FileText },
                { label: "Jurisdiction", val: "UK — PECR & UK GDPR",icon: Globe    },
                { label: "Regulator",    val: "ICO — ico.org.uk",   icon: Shield   },
              ].map(({ label, val, icon: Icon }) => (
                <div key={label} className="border border-gray-200 bg-gray-50 p-4 hover:border-[#0818A8]/25 transition-colors">
                  <Icon size={13} className="text-[#0818A8] mb-2" aria-hidden="true" />
                  <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-0.5">{label}</p>
                  <p className="text-gray-800 font-semibold text-[13px] leading-snug">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cookie category overview */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {COOKIE_CATEGORIES.map(cat => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="border border-gray-200 bg-gray-50 p-4 hover:border-[#0818A8]/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 bg-[#0818A8]/8 flex items-center justify-center" aria-hidden="true">
                      <Icon size={14} className="text-[#0818A8]" />
                    </div>
                    {cat.required ? (
                      <span className="text-[13px] font-bold tracking-[0.15em] uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5">Always On</span>
                    ) : (
                      <span className="text-[13px] font-bold tracking-[0.15em] uppercase text-gray-500 bg-white border border-gray-200 px-2 py-0.5">Optional</span>
                    )}
                  </div>
                  <p className="text-gray-900 font-bold text-[13px]">{cat.title}</p>
                  <p className="text-gray-600 text-[13px] font-normal mt-0.5 leading-snug">{cat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Mobile TOC */}
          <div className="mt-8 lg:hidden">
            <button onClick={() => setTocMobile(o => !o)}
              className="w-full flex items-center justify-between border border-gray-200 bg-gray-50 hover:bg-gray-100 px-5 py-3.5 transition-colors" aria-expanded={tocMobile}>
              <span className="text-[13px] font-bold text-gray-800">Table of Contents</span>
              <ChevronDown size={15} className={`text-gray-500 transition-transform ${tocMobile ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {tocMobile && (
                <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.22 }}
                  className="overflow-hidden border border-t-0 border-gray-200" aria-label="Table of contents">
                  <div className="grid grid-cols-2 gap-0">
                    {TOC.map(item => (
                      <a key={item.id} href={`#${item.id}`} onClick={() => setTocMobile(false)}
                        className={`flex items-center gap-2.5 px-4 py-3 border-b border-r border-gray-100 text-[13px] transition-colors odd:border-r even:border-r-0 ${activeId === item.id ? "bg-[#0818A8]/5 text-[#0818A8] font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
                        <span className="text-[13px] font-black text-gray-400">{item.num}</span>
                        <span className="leading-snug">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2" aria-label="Table of contents">
            <div className="sticky top-[74px]">
              <p className="text-[13px] font-black tracking-[0.35em] uppercase text-gray-400 mb-4 px-1">Contents</p>
              <nav aria-label="Section navigation">
                {TOC.map(item => (
                  <a key={item.id} href={`#${item.id}`}
                    className={`group flex items-center gap-3 px-3 py-2.5 text-[13px] border-l-2 transition-all duration-150 ${activeId === item.id ? "border-[#0818A8] text-[#0818A8] font-semibold bg-[#0818A8]/4" : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50"}`}>
                    <span className={`text-[13px] font-black flex-shrink-0 ${activeId === item.id ? "text-[#0818A8]" : "text-gray-400"}`}>{item.num}</span>
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 border border-[#0818A8]/15 bg-[#0818A8]/4 p-4">
                <Cookie size={14} className="text-[#0818A8] mb-2" aria-hidden="true" />
                <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-[#0818A8] mb-2">Manage Cookies</p>
                <p className="text-gray-700 text-[13px] font-normal leading-snug">Change your preferences anytime via our cookie banner or browser settings.</p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9 xl:col-span-10 min-w-0" id="main-content">

            <Section id="c1" num="01" title="What Are Cookies">
              <P>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, improve performance, and provide information to the site owner. Some are essential; others are optional and used for analytics or personalisation.</P>
              <P>Similar technologies — such as web beacons, pixel tags, and local storage — work in comparable ways and are also covered by this policy. We refer to all of these collectively as "cookies".</P>
              <Callout type="blue"><strong className="font-semibold">Legal basis:</strong> Our use of cookies is governed by the UK Privacy and Electronic Communications Regulations (PECR) and UK GDPR. Non-essential cookies require your prior consent. We obtain consent through our cookie banner, with granular category-level control.</Callout>
            </Section>

            <Section id="c2" num="02" title="How We Use Cookies">
              <P>We use cookies for these purposes:</P>
              <UL>
                <LI><strong className="text-gray-900 font-semibold">Essential operation:</strong> Keeping you logged in, maintaining your session, and enabling secure access</LI>
                <LI><strong className="text-gray-900 font-semibold">Security:</strong> Detecting fraud and preventing cross-site request forgery (CSRF)</LI>
                <LI><strong className="text-gray-900 font-semibold">Preferences:</strong> Remembering your cookie consent, language, and display settings</LI>
                <LI><strong className="text-gray-900 font-semibold">Analytics:</strong> Understanding how visitors use our site so we can improve it (with your consent)</LI>
                <LI><strong className="text-gray-900 font-semibold">Shipment tracking:</strong> Enabling our tracking tools to display your shipment status</LI>
                <LI><strong className="text-gray-900 font-semibold">Marketing:</strong> Measuring the effectiveness of our advertising (with your consent only)</LI>
              </UL>
            </Section>

            <Section id="c3" num="03" title="Strictly Necessary Cookies">
              <P>These cookies are essential for the website to function. They cannot be switched off in our system because without them the website won't work. <strong className="text-gray-900 font-semibold">You cannot opt out of these cookies.</strong></P>
              <CookieTable cookies={COOKIE_CATEGORIES[0].cookies} />
              <Callout type="green"><strong className="font-semibold">No consent required:</strong> Under UK PECR, strictly necessary cookies are exempt from the consent requirement. We use the absolute minimum set of these cookies.</Callout>
            </Section>

            <Section id="c4" num="04" title="Analytics Cookies">
              <P>These cookies allow us to count visits and understand how visitors use our website. The information is aggregated and anonymised — it does not identify you. <strong className="text-gray-900 font-semibold">These cookies are only set with your prior consent.</strong></P>
              <CookieTable cookies={COOKIE_CATEGORIES[1].cookies} />
              <P>We have configured Google Analytics with:</P>
              <UL>
                <LI>IP anonymisation enabled — your IP address is never stored in full</LI>
                <LI>Data sharing with Google disabled — analytics data stays with us</LI>
                <LI>Advertising features disabled — no remarketing or audience reporting</LI>
                <LI>Data retention set to 26 months (Google's shortest available)</LI>
              </UL>
              <P>Google's data processing terms: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors inline-flex items-center gap-1">policies.google.com <ExternalLink size={10} aria-hidden="true" /></a></P>
            </Section>

            <Section id="c5" num="05" title="Functionality Cookies">
              <P>These cookies enable enhanced features and personalisation. They may be set by us or by third-party providers whose services we use. <strong className="text-gray-900 font-semibold">These cookies are optional and only set with your consent.</strong></P>
              <CookieTable cookies={COOKIE_CATEGORIES[2].cookies} />
            </Section>

            <Section id="c6" num="06" title="Marketing Cookies">
              <P>These cookies may be set by our advertising partners to measure the effectiveness of our advertising and help us show you relevant R-Zone services on other websites. <strong className="text-gray-900 font-semibold">These cookies are only set with your explicit prior consent.</strong></P>
              <CookieTable cookies={COOKIE_CATEGORIES[3].cookies} />
              <P>We currently use Meta (Facebook) Pixel to measure conversions from our Facebook and Instagram advertising campaigns. We do not use Google Ads remarketing cookies.</P>
              <Callout type="amber"><strong className="font-semibold">Your choice:</strong> Refusing marketing cookies does not affect your ability to use our website or services. It simply means our advertising will be less targeted to your interests.</Callout>
            </Section>

            <Section id="c7" num="07" title="Third-Party Cookies">
              <P>Some cookies are set by third-party services and governed by their own privacy and cookie policies. Third-party services we use that may set cookies:</P>
              <div className="overflow-x-auto mb-6 border border-gray-200">
                <table className="w-full" style={{ minWidth: 520 }} aria-label="Third-party services">
                  <thead>
                    <tr className="bg-[#0818A8]">
                      {["Service","Purpose","Privacy Policy","Notes"].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-[13px] font-bold tracking-[0.18em] uppercase text-white">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {THIRD_PARTIES.map((tp, i) => (
                      <tr key={i} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-[#0818A8]/3 transition-colors`}>
                        <td className="px-5 py-3 text-[13px] text-gray-800 font-semibold">{tp.name}</td>
                        <td className="px-5 py-3 text-[13px] text-gray-700 font-normal">{tp.purpose}</td>
                        <td className="px-5 py-3">
                          <a href={tp.policy} target="_blank" rel="noopener noreferrer" className="text-[#0818A8] text-[13px] font-semibold hover:text-[#0437F2] transition-colors inline-flex items-center gap-1">
                            View <ExternalLink size={9} aria-hidden="true" />
                          </a>
                        </td>
                        <td className="px-5 py-3 text-[13px] text-gray-600 font-normal">{tp.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="c8" num="08" title="Managing Your Preferences">
              <H3>8.1 — Cookie Banner</H3>
              <P>When you first visit our website you will see our cookie consent banner. You can accept all cookies, refuse non-essential cookies, or manage preferences by category. You can change your preferences at any time — look for "Cookie Settings" in the footer of any page.</P>

              <H3>8.2 — Browser Settings</H3>
              <P>Most browsers let you control cookies through their settings. However, blocking all cookies may affect website functionality. Browser cookie controls:</P>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {BROWSER_LINKS.map(b => (
                  <a key={b.name} href={b.href} target="_blank" rel="noopener noreferrer"
                    className="border border-gray-200 bg-gray-50 p-3 text-center hover:border-[#0818A8]/40 hover:bg-[#0818A8]/4 transition-colors group">
                    <p className="text-gray-800 font-semibold text-[13px] group-hover:text-[#0818A8] transition-colors">{b.name}</p>
                    <p className="text-[#0818A8] text-[13px] font-semibold mt-1 flex items-center justify-center gap-1">Cookie Guide <ExternalLink size={8} aria-hidden="true" /></p>
                  </a>
                ))}
              </div>

              <H3>8.3 — Opt-Out Tools</H3>
              <UL>
                <LI>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">Google Analytics Opt-Out Browser Add-on</a></LI>
                <LI>Facebook ads: <a href="https://www.facebook.com/help/568137493302217" target="_blank" rel="noopener noreferrer" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">Facebook Ad Preferences</a></LI>
                <LI>All UK online advertising: <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-[#0818A8] font-semibold underline underline-offset-2 hover:text-[#0437F2] transition-colors">youronlinechoices.com</a></LI>
              </UL>
            </Section>

            <Section id="c9" num="09" title="Your Consent">
              <P>In compliance with UK PECR and UK GDPR, we obtain your consent before placing any non-essential cookies on your device. Your consent is:</P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Freely given",   desc: "Refusing non-essential cookies doesn't prevent you using our core services"  },
                  { label: "Specific",       desc: "You can consent or refuse by category — analytics, marketing, functionality" },
                  { label: "Informed",       desc: "We explain what each cookie category does before you decide"                  },
                  { label: "Unambiguous",    desc: "Clear opt-in mechanism — no pre-ticked boxes or dark patterns"                },
                  { label: "Withdrawable",   desc: "Change your preferences at any time via Cookie Settings"                     },
                  { label: "Time-limited",   desc: "Consent is stored for 12 months, then we ask for your preferences again"     },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 border border-gray-100 bg-gray-50 p-4">
                    <div className="w-5 h-5 bg-[#0818A8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                      <Check size={9} className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-[13px]">{item.label}</p>
                      <p className="text-gray-600 text-[13px] font-normal leading-snug mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <P>Consent is stored in our <code className="text-[13px] font-semibold text-gray-900 bg-gray-100 px-2 py-0.5">rzone_cookie_consent</code> cookie, valid for 12 months.</P>
            </Section>

            <Section id="c10" num="10" title="Do Not Track">
              <P>Some browsers include a "Do Not Track" (DNT) feature. There is currently no universal standard for how websites should respond to DNT signals. We honour DNT signals by not setting analytics or marketing cookies when we detect a DNT header — even where you have previously consented.</P>
            </Section>

            <Section id="c11" num="11" title="Changes">
              <P>We review and update this Cookie Policy regularly. Material changes — such as adding new cookie categories — will be communicated via our consent banner and by posting an updated policy with a new "Last Updated" date.</P>
            </Section>

            <Section id="c12" num="12" title="Contact Us">
              <P>Questions about our use of cookies or to exercise your PECR/UK GDPR rights:</P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Data Protection",  val: "privacy@r-zoneenterprises.com",  href: "mailto:privacy@r-zoneenterprises.com",  icon: Shield   },
                  { label: "General",          val: "info@r-zoneenterprises.com",      href: "mailto:info@r-zoneenterprises.com",      icon: Mail     },
                  { label: "ICO (Regulator)",  val: "ico.org.uk — 0303 123 1113",      href: "https://ico.org.uk",                    icon: Globe    },
                  { label: "Phone",            val: "+44 800 772 0864",                href: "tel:+448007720864",                      icon: Phone    },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="border border-gray-200 bg-gray-50 p-5 hover:border-[#0818A8]/25 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={13} className="text-[#0818A8]" aria-hidden="true" />
                        <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-gray-500">{item.label}</p>
                      </div>
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-gray-800 font-semibold text-[13px] hover:text-[#0818A8] transition-colors break-all">{item.val}</a>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Footer CTA */}
            <div className="mt-12 border border-[#0818A8]/20 bg-[#0818A8]/4 p-7 md:p-9">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-[13px] font-bold tracking-[0.28em] uppercase text-[#0818A8] mb-1">Questions?</p>
                  <h3 className="text-gray-900 font-black text-[20px] tracking-[-0.01em]">We're Transparent About Cookies.</h3>
                  <p className="text-gray-600 text-[13.5px] font-normal mt-1">Contact our privacy team — we respond within one business day.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:privacy@r-zoneenterprises.com" className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25" aria-label="Email privacy team">
                    <Mail size={12} aria-hidden="true" /> Email Privacy Team
                  </a>
                  <Link href="/" className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:border-[#0818A8] hover:text-[#0818A8] text-[13px] font-bold tracking-[0.06em] uppercase px-6 py-3 transition-all duration-200" aria-label="Back to site">
                    <ArrowLeft size={11} aria-hidden="true" /> Back to Site
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

    </div>
  );
}