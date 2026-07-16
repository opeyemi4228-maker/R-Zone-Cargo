"use client";
// app/blog/[slug]/ArticleReader.jsx
// ─────────────────────────────────────────────────────────────────────────────
// CLIENT COMPONENT handles all interactive UI for a single article page.
// Receives `article` and `related` as props from the server component
// (app/blog/[slug]/page.jsx) no data fetching here.
//
// Navigation:
// "Back to Insights" → navigates to /blog (the blog listing page)
// Related card click → navigates to /blog/{slug}
//
// All SEO (metadata, schema, canonical, SSR HTML) is handled by page.jsx.
// This file is purely UI + interactivity.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
 ArrowRight,
 Clock,
 Globe,
 FileCheck,
 Zap,
 Star,
 Package,
 BookOpen,
 Calendar,
 User,
 ArrowLeft,
 Share2,
 Check,
 Link2,
 ChevronRight,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { CATEGORIES, SITE_URL } from "../../../lib/articles";

const montserrat = Montserrat({
 subsets: ["latin"],
 weight: ["300", "400", "500", "600", "700", "800", "900"],
 variable: "--font-montserrat",
 display: "swap",
});

// ─────────────────────────────────────────────────────────────────────────────
// ICON MAP resolves icon string names from articles.js to Lucide components
// ─────────────────────────────────────────────────────────────────────────────
const ICON_MAP = {
 BookOpen, Package, FileCheck, Globe, Zap, Star,
};

// ─────────────────────────────────────────────────────────────────────────────
// SMALL REUSABLE COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function CategoryBadge({ cat }) {
 const found = CATEGORIES.find((c) => c.id === cat) || CATEGORIES[1];
 return (
 <span
 className="inline-flex items-center gap-1.5 text-[9.5px] font-black tracking-[0.2em] uppercase px-2.5 py-1.5 border"
 style={{
 color: found.color,
 borderColor: `${found.color}30`,
 backgroundColor: `${found.color}10`,
 }}
 >
 {found.label}
 </span>
 );
}

function ArticleMeta({ article, light = false }) {
 const cls = light ? "text-white/55" : "text-gray-500";
 return (
 <div className={`flex items-center flex-wrap gap-3 text-[11px] font-medium ${cls}`}>
 <span className="flex items-center gap-1.5">
 <User size={10} aria-hidden="true" />
 {article.author}
 </span>
 <span className="opacity-30" aria-hidden="true">·</span>
 <span className="flex items-center gap-1.5">
 <Calendar size={10} aria-hidden="true" />
 {article.date}
 </span>
 <span className="opacity-30" aria-hidden="true">·</span>
 <span className="flex items-center gap-1.5">
 <Clock size={10} aria-hidden="true" />
 {article.readTime}
 </span>
 </div>
 );
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER BODY converts **bold** markdown + line breaks to JSX
// ─────────────────────────────────────────────────────────────────────────────
function RenderBody({ text }) {
 return (
 <div className="space-y-4">
 {text.split("\n\n").map((para, pi) => (
 <p
 key={pi}
 className="text-gray-700 text-[15px] font-normal leading-[1.85]"
 >
 {para.split(/\*\*(.*?)\*\*/g).map((part, idx) =>
 idx % 2 === 1 ? (
 <strong key={idx} className="font-bold text-gray-900">
 {part}
 </strong>
 ) : (
 part
 )
 )}
 </p>
 ))}
 </div>
 );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARE PANEL
// ─────────────────────────────────────────────────────────────────────────────
function SharePanel({ article }) {
 const [copied, setCopied] = useState(false);
 const [open, setOpen] = useState(false);
 const articleUrl = article.canonicalUrl || `${SITE_URL}/blog/${article.slug}`;

 const copy = useCallback(() => {
 if (navigator.clipboard) {
 navigator.clipboard.writeText(articleUrl).catch(() => fallbackCopy(articleUrl));
 } else {
 fallbackCopy(articleUrl);
 }
 setCopied(true);
 setTimeout(() => setCopied(false), 2500);
 }, [articleUrl]);

 const fallbackCopy = (url) => {
 const el = document.createElement("input");
 el.value = url;
 document.body.appendChild(el);
 el.select();
 document.execCommand("copy");
 document.body.removeChild(el);
 };

 const shareX = useCallback(() => {
 window.open(
 `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`,
 "_blank",
 "noopener"
 );
 }, [article.title, articleUrl]);

 const shareFb = useCallback(() => {
 window.open(
 `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
 "_blank",
 "noopener"
 );
 }, [articleUrl]);

 const shareWa = useCallback(() => {
 window.open(
 `https://wa.me/?text=${encodeURIComponent(`${article.title}\n${articleUrl}`)}`,
 "_blank",
 "noopener"
 );
 }, [article.title, articleUrl]);

 useEffect(() => {
 if (!open) return;
 const close = (e) => {
 if (!e.target.closest("[data-sp]")) setOpen(false);
 };
 document.addEventListener("mousedown", close);
 return () => document.removeEventListener("mousedown", close);
 }, [open]);

 return (
 <div className="relative" data-sp="">
 <button
 onClick={() => setOpen((o) => !o)}
 aria-expanded={open}
 className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#0818A8] hover:text-[#0818A8] text-gray-700 text-[11px] font-bold tracking-[0.08em] uppercase px-4 py-2.5 transition-all duration-200 bg-white"
 >
 <Share2 size={12} aria-hidden="true" /> Share Article
 </button>
 <AnimatePresence>
 {open && (
 <motion.div
 initial={{ opacity: 0, y: 8, scale: 0.96 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 8, scale: 0.96 }}
 transition={{ duration: 0.18 }}
 className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 shadow-2xl min-w-[230px] overflow-hidden"
 >
 {/* URL preview */}
 <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
 <p className="text-[9px] font-black tracking-[0.2em] uppercase text-gray-400 mb-1">
 Direct Article Link
 </p>
 <p className="text-[10.5px] font-mono text-[#0818A8] truncate max-w-[200px]">
 r-zoneenterprises.com/blog/{article.slug}
 </p>
 </div>

 {/* Copy link */}
 <button
 onClick={copy}
 className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#0818A8] transition-colors text-left border-b border-gray-100"
 >
 {copied ? (
 <Check size={14} className="text-emerald-500 flex-shrink-0" />
 ) : (
 <Link2 size={14} className="flex-shrink-0" />
 )}
 {copied ? "Link copied!" : "Copy direct link"}
 </button>

 {/* X / Twitter */}
 <button
 onClick={shareX}
 className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#0818A8] transition-colors text-left border-b border-gray-100"
 >
 <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
 </svg>
 Post on X (Twitter)
 </button>

 {/* Facebook */}
 <button
 onClick={shareFb}
 className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#0818A8] transition-colors text-left border-b border-gray-100"
 >
 <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
 </svg>
 Share on Facebook
 </button>

 {/* WhatsApp */}
 <button
 onClick={shareWa}
 className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-emerald-600 transition-colors text-left"
 >
 <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
 </svg>
 Share on WhatsApp
 </button>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
}

// ─────────────────────────────────────────────────────────────────────────────
// RELATED CARD
// ─────────────────────────────────────────────────────────────────────────────
function RelatedCard({ article, index }) {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-40px" });

 return (
 <motion.div
 ref={ref}
 initial={{ opacity: 0, y: 20 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.5, delay: index * 0.08 }}
 className="group flex flex-col border border-gray-200 bg-white hover:border-[#0818A8]/35 hover:shadow-lg hover:shadow-[#0818A8]/8 transition-all duration-300 overflow-hidden relative"
 >
 {/* Top accent bar */}
 <div
 className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]"
 aria-hidden="true"
 />

 {/* Use Next.js Link for real navigation updates the URL properly */}
 <Link
 href={`/blog/${article.slug}`}
 className="flex flex-col flex-1"
 aria-label={`Read: ${article.title}`}
 >
 <div className="relative h-[160px] overflow-hidden flex-shrink-0">
 <Image
 src={article.img}
 alt={article.imgAlt}
 fill
 className="object-cover group-hover:scale-105 transition-transform duration-500"
 sizes="33vw"
 />
 </div>
 <div className="p-5 flex-1 flex flex-col">
 <CategoryBadge cat={article.category} />
 <p className="font-black text-[13.5px] text-gray-900 leading-snug tracking-[-0.01em] mt-2 mb-3 group-hover:text-[#0818A8] transition-colors line-clamp-2">
 {article.title}
 </p>
 <ArticleMeta article={article} />
 </div>
 </Link>
 </motion.div>
 );
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE READER main component
// ─────────────────────────────────────────────────────────────────────────────
export default function ArticleReader({ article, related }) {
 const router = useRouter();
 const topRef = useRef(null);

 // Scroll to top when component mounts (navigating between articles)
 useEffect(() => {
 topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
 }, [article.slug]);

 const handleBack = useCallback(() => {
 router.push("/blog");
 }, [router]);

 return (
 <article
 ref={topRef}
 className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white min-h-screen`}
 aria-labelledby="article-h1"
 >
 {/* ── HERO ────────────────────────────────────────────────────────────── */}
 <div className="relative bg-[#000208] overflow-hidden">
 {/* Grid background */}
 <div
 className="absolute inset-0 opacity-[0.025] pointer-events-none"
 aria-hidden="true"
 style={{
 backgroundImage:
 "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
 backgroundSize: "64px 64px",
 }}
 />

 {/* Glow blobs */}
 <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
 <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[#0818A8]/15 rounded-full blur-[120px]" />
 <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#1F51FF]/10 rounded-full blur-[100px]" />
 </div>

 {/* Hero image */}
 <div className="relative h-[360px] md:h-[460px] overflow-hidden">
 <Image
 src={article.img}
 alt={article.imgAlt}
 fill
 priority
 sizes="100vw"
 className="object-cover opacity-20"
 />
 <div
 className="absolute inset-0 bg-gradient-to-t from-[#00061a] via-[#00061a]/55 to-[#00061a]/20"
 aria-hidden="true"
 />
 </div>

 {/* Hero content */}
 <div className="relative z-10 max-w-[860px] mx-auto px-5 sm:px-8 -mt-60 md:-mt-72 pb-12 md:pb-16">
 {/* Breadcrumb SEO internal link signal */}
 <motion.nav
 aria-label="Breadcrumb"
 className="flex items-center gap-2 mb-6"
 initial={{ opacity: 0, x: -12 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.4 }}
 >
 <Link
 href="/"
 className="text-white/50 hover:text-white text-[11px] font-medium transition-colors"
 >
 Home
 </Link>
 <ChevronRight size={10} className="text-white/25" aria-hidden="true" />
 <Link
 href="/blog"
 className="text-white/50 hover:text-white text-[11px] font-medium transition-colors"
 >
 Blog
 </Link>
 <ChevronRight size={10} className="text-white/25" aria-hidden="true" />
 <span className="text-white/80 text-[11px] font-medium line-clamp-1">
 {article.title}
 </span>
 </motion.nav>

 {/* Back button */}
 <motion.button
 onClick={handleBack}
 className="flex items-center gap-2 text-white/60 hover:text-white text-[12px] font-bold tracking-[0.08em] uppercase mb-8 transition-colors"
 initial={{ opacity: 0, x: -12 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.4, delay: 0.05 }}
 aria-label="Back to all articles"
 >
 <ArrowLeft size={14} aria-hidden="true" /> Back to Insights
 </motion.button>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.1 }}
 >
 {/* Category + read time */}
 <div className="flex items-center gap-3 mb-5 flex-wrap">
 <CategoryBadge cat={article.category} />
 <span className="text-white/40 text-[11px] font-medium">
 {article.readTime}
 </span>
 </div>

 {/* H1 THE most important on-page SEO element */}
 <h1
 id="article-h1"
 className="font-black text-[clamp(22px,4.5vw,50px)] text-white leading-[0.9] tracking-[-0.03em] uppercase mb-6"
 >
 {article.title}
 </h1>

 {/* Excerpt */}
 <p className="text-white/65 text-[15px] font-light leading-relaxed mb-8 max-w-2xl">
 {article.excerpt}
 </p>

 {/* Meta + share */}
 <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/[0.08]">
 <ArticleMeta article={article} light />
 <SharePanel article={article} />
 </div>
 </motion.div>
 </div>
 </div>

 {/* ── ARTICLE BODY ─────────────────────────────────────────────────────── */}
 <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-12 md:py-16">

 {/* Table of contents */}
 {article.content.length > 2 && (
 <motion.div
 className="border border-[#0818A8]/15 bg-[#0818A8]/4 p-6 mb-12"
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 >
 <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#0818A8] mb-4">
 In This Article
 </p>
 <ol className="space-y-2.5">
 {article.content.map((sec, i) => (
 <li key={i} className="flex items-start gap-3">
 <span className="font-black text-[#0818A8]/35 text-[12px] flex-shrink-0 w-5 mt-0.5">
 {i + 1}.
 </span>
 <span className="text-[13px] font-semibold text-gray-800 leading-snug">
 {sec.h}
 </span>
 </li>
 ))}
 </ol>
 </motion.div>
 )}

 {/* Article sections */}
 <div className="space-y-12">
 {article.content.map((sec, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.55, delay: 0.1 + i * 0.07 }}
 >
 {/* H2 secondary keyword hierarchy */}
 <h2 className="font-black text-[clamp(16px,2.5vw,22px)] text-[#0b0f1a] leading-tight tracking-[-0.02em] uppercase mb-5 pl-4 border-l-[3px] border-[#0818A8]">
 {sec.h}
 </h2>
 <RenderBody text={sec.body} />
 </motion.div>
 ))}
 </div>

 {/* ── FAQ SECTION ──────────────────────────────────────────────────── */}
 {/* Rendered visibly Google reads this and uses it for rich results */}
 {article.faqSchema && article.faqSchema.length > 0 && (
 <motion.div
 className="mt-14 pt-10 border-t border-gray-100"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.55, delay: 0.3 }}
 >
 <h2 className="font-black text-[clamp(18px,2.5vw,26px)] text-[#0b0f1a] tracking-[-0.02em] uppercase mb-8 pl-4 border-l-[3px] border-[#0818A8]">
 Frequently Asked Questions
 </h2>
 <div className="space-y-6">
 {article.faqSchema.map((faq, i) => (
 <details
 key={i}
 className="group border border-gray-200 hover:border-[#0818A8]/30 transition-colors duration-200"
 >
 <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none">
 {/* H3 inside FAQ proper keyword hierarchy */}
 <h3 className="font-bold text-[14px] text-gray-900 leading-snug group-open:text-[#0818A8] transition-colors">
 {faq.question}
 </h3>
 <span
 className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-all duration-200 rounded-full"
 aria-hidden="true"
 >
 <svg
 width="10"
 height="10"
 viewBox="0 0 10 10"
 fill="none"
 className="group-open:rotate-180 transition-transform duration-200"
 >
 <path
 d="M2 3.5L5 6.5L8 3.5"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 className="group-open:stroke-white stroke-gray-500"
 />
 </svg>
 </span>
 </summary>
 <div className="px-5 pb-5 pt-1">
 <p className="text-gray-600 text-[14px] font-normal leading-relaxed">
 {faq.answer}
 </p>
 </div>
 </details>
 ))}
 </div>
 </motion.div>
 )}

 {/* Tags */}
 <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
 {article.tags.map((t) => (
 <span
 key={t}
 className="text-[10px] font-semibold text-gray-500 border border-gray-200 px-3 py-1.5 hover:border-[#0818A8] hover:text-[#0818A8] transition-colors"
 >
 #{t}
 </span>
 ))}
 </div>

 {/* Share + back row */}
 <div className="flex items-center justify-between flex-wrap gap-4 mt-8 pt-8 border-t border-gray-100">
 <div>
 <p className="text-[13px] font-bold text-gray-900 mb-0.5">
 Found this useful?
 </p>
 <p className="text-gray-500 text-[12px] font-normal">
 Share this article with someone who ships to Nigeria.
 </p>
 </div>
 <div className="flex items-center gap-3 flex-wrap">
 <SharePanel article={article} />
 <button
 onClick={handleBack}
 className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#0818A8] text-gray-600 hover:text-[#0818A8] text-[11px] font-bold tracking-[0.08em] uppercase px-4 py-2.5 transition-all duration-200"
 >
 <ArrowLeft size={11} aria-hidden="true" /> All Articles
 </button>
 </div>
 </div>

 {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
 <div className="mt-12 bg-[#0818A8] p-7 md:p-10 relative overflow-hidden">
 <div
 className="absolute inset-0 opacity-[0.07] pointer-events-none"
 aria-hidden="true"
 style={{
 backgroundImage:
 "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
 backgroundSize: "44px 44px",
 }}
 />
 <div className="relative z-10">
 <p className="text-white/60 text-[10px] font-black tracking-[0.3em] uppercase mb-2">
 Ready to Ship?
 </p>
 <h3 className="text-white font-black text-[22px] md:text-[26px] tracking-[-0.015em] mb-3 leading-tight">
 Get a free UK Nigeria cargo quote from R-Zone.
 </h3>
 <p className="text-white/70 text-[13px] font-normal mb-7 max-w-lg leading-relaxed">
 Air from £5/kg · Sea from £3/kg · Weekly departures · Same-day
 response · 107+ five-star reviews · #1 on Google.
 </p>
 <div className="flex flex-wrap gap-3">
 <Link
 href="/quote"
 className="group inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0818A8] text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3.5 transition-all duration-200"
 >
 Get a Free Quote{" "}
 <ArrowRight
 size={11}
 className="group-hover:translate-x-1 transition-transform"
 aria-hidden="true"
 />
 </Link>
 <a
 href="tel:+448007720864"
 className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-all duration-200"
 >
 Call +44 800 772 0864
 </a>
 </div>
 </div>
 </div>

 {/* ── INTERNAL LINKS BLOCK ─────────────────────────────────────────── */}
 {/* Distributes SEO authority to other key pages on every article view */}
 <div className="mt-10 pt-8 border-t border-gray-100">
 <p className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400 mb-4">
 Explore R-Zone Services
 </p>
 <div className="flex flex-wrap gap-3">
 {[
 { href: "/services", label: "Our Shipping Services" },
 { href: "/quote", label: "Get a Free Quote" },
 { href: "/blog", label: "All Shipping Guides" },
 { href: "/contact", label: "Contact Our Team" },
 ].map((link) => (
 <Link
 key={link.href}
 href={link.href}
 className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-gray-600 hover:text-[#0818A8] border border-gray-200 hover:border-[#0818A8]/40 px-4 py-2 transition-all duration-200"
 >
 {link.label}
 <ArrowRight size={10} aria-hidden="true" />
 </Link>
 ))}
 </div>
 </div>
 </div>

 {/* ── RELATED ARTICLES ─────────────────────────────────────────────────── */}
 {related && related.length > 0 && (
 <div className="bg-gray-50 border-t border-gray-100 py-14 md:py-16">
 <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10">
 <div className="flex items-center gap-4 mb-9">
 <p className="text-[10px] font-black tracking-[0.35em] uppercase text-gray-400">
 More to Read
 </p>
 <div className="h-px flex-1 bg-gray-200" aria-hidden="true" />
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {related.map((a, i) => (
 <RelatedCard key={a.id} article={a} index={i} />
 ))}
 </div>
 <div className="text-center mt-10">
 <Link
 href="/blog"
 className="group inline-flex items-center gap-2 border-2 border-[#0818A8]/20 hover:border-[#0818A8] text-[#0818A8] text-[12px] font-black tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-[#0818A8] hover:text-white transition-all duration-200"
 >
 <ArrowLeft
 size={12}
 className="group-hover:-translate-x-0.5 transition-transform"
 aria-hidden="true"
 />
 Back to All Insights
 </Link>
 </div>
 </div>
 </div>
 )}
 </article>
 );
}