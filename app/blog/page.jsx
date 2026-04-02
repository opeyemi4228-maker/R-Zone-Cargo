"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronRight, Clock, Tag,
  Search, TrendingUp, BookOpen, Package,
  Globe, FileCheck, Truck, Star, Mail,
  ChevronDown, X, Calendar, User,
  BarChart3, Zap, AlertCircle, CheckCircle,
  Loader2, Send,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",       label: "All Posts",      icon: BookOpen,   color: "#0818A8" },
  { id: "guides",    label: "Shipping Guides", icon: Package,    color: "#1F51FF" },
  { id: "customs",   label: "Customs & Duty",  icon: FileCheck,  color: "#0437F2" },
  { id: "news",      label: "Industry News",   icon: Globe,      color: "#0818A8" },
  { id: "updates",   label: "R-Zone Updates",  icon: Zap,        color: "#1F51FF" },
  { id: "tips",      label: "Expert Tips",     icon: Star,       color: "#0437F2" },
];

// ─── Articles ─────────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    id: 1,
    slug: "air-freight-vs-sea-freight-ultimate-guide",
    category: "guides",
    tag: "Shipping Guide",
    title: "Air Freight vs Sea Freight: The Ultimate UK–Nigeria Decision Guide",
    excerpt: "Not sure whether to fly or sail your cargo to Nigeria? We break down transit times, cost differences, cargo restrictions, and exactly when each method makes financial sense for your situation.",
    author: "R-Zone Operations Team",
    date: "18 March 2025",
    readTime: "8 min read",
    featured: true,
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "Cargo aircraft loading at London Heathrow for Nigeria shipment",
    tags: ["Air Freight", "Sea Freight", "Cost Comparison"],
  },
  {
    id: 2,
    slug: "nigeria-customs-duty-complete-guide-2025",
    category: "customs",
    tag: "Customs",
    title: "Nigeria Customs Duty 2025: What You'll Pay and How to Prepare",
    excerpt: "Import duties in Nigeria can catch shippers off guard. This complete guide covers current NCS tariff rates, NAFDAC requirements, prohibited items, and how to minimise delays at Apapa and Tin Can Island.",
    author: "R-Zone Compliance Team",
    date: "10 March 2025",
    readTime: "11 min read",
    featured: false,
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Customs documentation review for Nigeria import",
    tags: ["NCS", "Duty Rates", "NAFDAC"],
  },
  {
    id: 3,
    slug: "how-to-pack-cargo-nigeria-professionally",
    category: "guides",
    tag: "Packing Guide",
    title: "How to Pack Your Cargo for Nigeria Like a Professional",
    excerpt: "Poor packaging is the single biggest cause of damaged cargo. Learn the professional techniques our warehouse team uses daily — from double-walling boxes to protecting fragile items for 4,000-mile journeys.",
    author: "R-Zone Warehouse Team",
    date: "3 March 2025",
    readTime: "6 min read",
    featured: false,
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Professional cargo packing at R-Zone Essex warehouse",
    tags: ["Packing", "Fragile Cargo", "Warehouse"],
  },
  {
    id: 4,
    slug: "rzone-new-weekly-air-schedule-2025",
    category: "updates",
    tag: "R-Zone Update",
    title: "We're Adding a Third Weekly Air Departure — What It Means for You",
    excerpt: "From April 2025, R-Zone Cargo will operate three weekly air departures from London to Lagos. Here's everything you need to know about the new schedule, new cut-off times, and how to take advantage.",
    author: "R-Zone Management",
    date: "25 February 2025",
    readTime: "4 min read",
    featured: false,
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Cargo loading operations at UK airport",
    tags: ["Schedule", "Air Freight", "Announcement"],
  },
  {
    id: 5,
    slug: "nigerian-diaspora-shipping-guide-uk",
    category: "guides",
    tag: "Community Guide",
    title: "The Nigerian Diaspora's Complete UK Shipping Guide",
    excerpt: "Whether you're sending Christmas gifts, food to family, or goods to a business partner in Lagos — this guide covers everything the Nigerian community in the UK needs to know about shipping home.",
    author: "R-Zone Customer Team",
    date: "17 February 2025",
    readTime: "9 min read",
    featured: false,
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Shipping boxes and packages being prepared for Nigeria delivery",
    tags: ["Diaspora", "Family Shipping", "Guide"],
  },
  {
    id: 6,
    slug: "apapa-port-congestion-2025-what-to-know",
    category: "news",
    tag: "Industry News",
    title: "Apapa Port Congestion 2025: Current Situation and What Shippers Should Know",
    excerpt: "Port congestion at Apapa remains a challenge for sea freight shipments. We break down the current situation, expected clearance times, and practical steps to protect your supply chain from delays.",
    author: "R-Zone Operations Team",
    date: "10 February 2025",
    readTime: "7 min read",
    featured: false,
    img: "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Container ships waiting at Lagos Apapa port",
    tags: ["Apapa", "Port Delays", "Sea Freight"],
  },
  {
    id: 7,
    slug: "volumetric-weight-explained-uk-nigeria",
    category: "tips",
    tag: "Expert Tip",
    title: "Volumetric Weight Explained: Why Your 10 kg Box Might Cost Like 18 kg",
    excerpt: "One of the most common surprises in freight billing is volumetric weight. We explain exactly how it's calculated, why carriers use it, and how to pack smarter to avoid unexpected charges.",
    author: "R-Zone Pricing Team",
    date: "3 February 2025",
    readTime: "5 min read",
    featured: false,
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Cargo weighing and measurement at freight warehouse",
    tags: ["Pricing", "Volumetric Weight", "Cost Saving"],
  },
  {
    id: 8,
    slug: "uk-nafdac-requirements-food-exports-nigeria",
    category: "customs",
    tag: "Customs",
    title: "Sending Food to Nigeria from the UK? Here's What NAFDAC Requires",
    excerpt: "NAFDAC (National Agency for Food and Drug Administration and Control) regulates all food imports into Nigeria. Before you ship that consignment of groceries, read this to avoid seizure at the port.",
    author: "R-Zone Compliance Team",
    date: "27 January 2025",
    readTime: "7 min read",
    featured: false,
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Food items packaged for export to Nigeria",
    tags: ["NAFDAC", "Food Export", "Compliance"],
  },
  {
    id: 9,
    slug: "r-zone-100-five-star-reviews-milestone",
    category: "updates",
    tag: "Milestone",
    title: "100 Five-Star Reviews: What Our Customers Are Saying in 2025",
    excerpt: "We've hit 100 five-star Google reviews and we couldn't be more grateful. In this post we share some of our favourite customer stories and what drives us to keep raising the bar every single week.",
    author: "R-Zone Management",
    date: "20 January 2025",
    readTime: "4 min read",
    featured: false,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Happy customer reviewing R-Zone cargo delivery",
    tags: ["Reviews", "Customer Success", "Milestone"],
  },
];

const TRENDING = ARTICLES.slice(0, 4);

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d } }),
};

function useScrollReveal(margin = "-60px") {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return { ref, inView };
}

// ─── Tag Pill ─────────────────────────────────────────────────────────────────
function TagPill({ label, dark = false }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-5 ${
      dark ? "border-[#1F51FF]/30 bg-[#0818A8]/14" : "border-[#0818A8]/20 bg-[#0818A8]/6"
    }`}>
      <motion.span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dark ? "bg-[#1F51FF]" : "bg-[#0818A8]"}`}
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      />
      <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>{label}</span>
    </div>
  );
}

// ─── Category badge ───────────────────────────────────────────────────────────
function CategoryBadge({ cat }) {
  const found = CATEGORIES.find(c => c.id === cat) || CATEGORIES[1];
  return (
    <span className="inline-flex items-center gap-1.5 text-[9.5px] font-black tracking-[0.2em] uppercase px-2.5 py-1.5 border"
      style={{ color: found.color, borderColor: `${found.color}30`, backgroundColor: `${found.color}10` }}>
      {found.label}
    </span>
  );
}

// ─── Meta row ─────────────────────────────────────────────────────────────────
function ArticleMeta({ article, light = false }) {
  const cls = light ? "text-white/55" : "text-gray-500";
  return (
    <div className={`flex items-center flex-wrap gap-3 text-[11px] font-medium ${cls}`}>
      <span className="flex items-center gap-1.5"><User size={10} aria-hidden="true" />{article.author}</span>
      <span className="text-current opacity-30" aria-hidden="true">·</span>
      <span className="flex items-center gap-1.5"><Calendar size={10} aria-hidden="true" />{article.date}</span>
      <span className="text-current opacity-30" aria-hidden="true">·</span>
      <span className="flex items-center gap-1.5"><Clock size={10} aria-hidden="true" />{article.readTime}</span>
    </div>
  );
}

// ─── Featured Article Card ────────────────────────────────────────────────────
function FeaturedCard({ article }) {
  const { ref, inView } = useScrollReveal("-40px");

  return (
    <motion.article
      ref={ref}
      className="group relative overflow-hidden bg-[#00061a] border border-white/[0.07] hover:border-[#0818A8]/50 transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      {/* Image */}
      <div className="relative h-[340px] lg:h-[480px] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={article.img}
            alt={article.imgAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </motion.div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00061a] via-[#00061a]/50 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00061a]/60 to-transparent" aria-hidden="true" />

        {/* Featured badge */}
        <div className="absolute top-5 left-5">
          <span className="inline-flex items-center gap-2 bg-[#0818A8] text-white text-[9px] font-black tracking-[0.22em] uppercase px-3.5 py-2">
            <TrendingUp size={9} aria-hidden="true" /> Featured Article
          </span>
        </div>
      </div>

      {/* Content — overlaps image */}
      <div className="relative p-7 md:p-9 -mt-24 lg:-mt-36 z-10">
        <div className="flex items-center gap-3 mb-4">
          <CategoryBadge cat={article.category} />
        </div>

        <h2
          className="font-black text-[clamp(22px,3.5vw,38px)] text-white leading-[0.92] tracking-[-0.025em] uppercase mb-4 group-hover:text-white transition-colors"
          itemProp="headline"
        >
          <Link href={`/blog/${article.slug}`} className="hover:text-white" aria-label={`Read: ${article.title}`}>
            {article.title}
          </Link>
        </h2>

        <p className="text-white/65 text-[14px] font-light leading-relaxed max-w-2xl mb-6" itemProp="description">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <ArticleMeta article={article} light />
          <Link href={`/blog/${article.slug}`}
            className="group/btn inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.1em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
            aria-label={`Read full article: ${article.title}`}>
            Read Article <ArrowRight size={11} className="group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/[0.07]">
          {article.tags.map(t => (
            <span key={t} className="text-[10px] font-semibold text-white/40 border border-white/[0.08] px-2.5 py-1 hover:text-white/70 hover:border-white/20 transition-colors cursor-pointer">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Standard Article Card ────────────────────────────────────────────────────
function ArticleCard({ article, index = 0 }) {
  const { ref, inView } = useScrollReveal("-40px");

  return (
    <motion.article
      ref={ref}
      className="group flex flex-col border border-gray-200 bg-white hover:border-[#0818A8]/35 hover:shadow-xl hover:shadow-[#0818A8]/8 transition-all duration-300 overflow-hidden relative"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      {/* Hover top-border sweep */}
      <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />

      {/* Image */}
      <div className="relative h-[200px] overflow-hidden bg-gray-100 flex-shrink-0">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={article.img}
            alt={article.imgAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge cat={article.category} />
        </div>

        <h3
          className="font-black text-[15.5px] text-gray-900 leading-snug tracking-[-0.015em] mb-3 group-hover:text-[#0818A8] transition-colors duration-200 line-clamp-3"
          itemProp="headline"
        >
          <Link href={`/blog/${article.slug}`} aria-label={`Read: ${article.title}`}>
            {article.title}
          </Link>
        </h3>

        <p className="text-gray-600 text-[13px] font-light leading-relaxed mb-5 line-clamp-3 flex-1" itemProp="description">
          {article.excerpt}
        </p>

        <div className="mt-auto space-y-4">
          <ArticleMeta article={article} />
          <Link href={`/blog/${article.slug}`}
            className="group/lnk inline-flex items-center gap-1.5 text-[#0818A8] hover:text-[#0437F2] text-[12px] font-black tracking-[0.08em] uppercase transition-colors"
            aria-label={`Read full: ${article.title}`}>
            Read More
            <ArrowRight size={11} className="group-hover/lnk:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Large list article (for alternating list layout) ────────────────────────
function ArticleRow({ article, index = 0 }) {
  const { ref, inView } = useScrollReveal("-40px");
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      className="group grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200 bg-white hover:border-[#0818A8]/35 hover:shadow-xl hover:shadow-[#0818A8]/8 transition-all duration-300 overflow-hidden relative"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      itemScope itemType="https://schema.org/BlogPosting"
    >
      <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />

      {/* Image */}
      <div className={`relative h-[260px] md:h-full overflow-hidden bg-gray-100 ${!isEven ? "md:order-2" : ""}`}>
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}>
          <Image src={article.img} alt={article.imgAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" aria-hidden="true" />
        <div className="absolute top-5 left-5">
          <CategoryBadge cat={article.category} />
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center p-7 md:p-9 ${!isEven ? "md:order-1" : ""}`}>
        <h3 className="font-black text-[clamp(17px,2vw,22px)] text-gray-900 leading-[0.92] tracking-[-0.02em] uppercase mb-4 group-hover:text-[#0818A8] transition-colors duration-200" itemProp="headline">
          <Link href={`/blog/${article.slug}`} aria-label={`Read: ${article.title}`}>{article.title}</Link>
        </h3>
        <p className="text-gray-600 text-[13.5px] font-light leading-relaxed mb-6" itemProp="description">{article.excerpt}</p>
        <ArticleMeta article={article} />
        <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, 2).map(t => (
              <span key={t} className="text-[10px] font-semibold text-gray-500 border border-gray-200 px-2 py-1">#{t}</span>
            ))}
          </div>
          <Link href={`/blog/${article.slug}`}
            className="group/lnk inline-flex items-center gap-1.5 text-[#0818A8] hover:text-[#0437F2] text-[11.5px] font-black tracking-[0.08em] uppercase transition-colors"
            aria-label={`Read: ${article.title}`}>
            Read <ArrowRight size={10} className="group-hover/lnk:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Newsletter ────────────────────────────────────────────────────────────────
function NewsletterSection() {
  const { ref, inView } = useScrollReveal("-40px");
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError]   = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    setError(""); setStatus("loading");
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
  };

  return (
    <section ref={ref} className="relative bg-[#0818A8] overflow-hidden" aria-labelledby="newsletter-heading">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(31,81,255,0.35) 0%, transparent 65%)", transform: "translate(20%, -20%)" }} />

      <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2.5 mb-5">
              <Mail size={16} className="text-white/60" aria-hidden="true" />
              <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase">Newsletter</span>
            </div>
            <h2 id="newsletter-heading" className="font-black text-[clamp(24px,4vw,42px)] text-white leading-[0.92] tracking-[-0.025em] uppercase mb-4">
              Get Freight Insights<br />
              <span className="text-white/40">Delivered Weekly.</span>
            </h2>
            <p className="text-white/65 text-[14px] font-light leading-relaxed">
              Join 2,000+ UK–Nigeria shippers who get our weekly logistics briefing — no spam, unsubscribe any time.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.2 }}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="s" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-4 border border-white/20 bg-white/10 px-6 py-5">
                  <CheckCircle size={24} className="text-emerald-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-white font-black text-[15px]">You're subscribed!</p>
                    <p className="text-white/65 text-[13px] font-light">First briefing arrives next Friday.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex gap-0">
                    <div className="relative flex-1">
                      <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" aria-hidden="true" />
                      <input
                        type="email" placeholder="your@email.com" value={email}
                        onChange={e => { setEmail(e.target.value); setError(""); }}
                        onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        className="w-full bg-white/[0.1] border border-white/20 border-r-0 text-white text-[13.5px] font-light placeholder-white/30 pl-11 pr-4 py-4 outline-none focus:border-white/50 focus:bg-white/[0.15] transition-all duration-200"
                        aria-label="Email address for newsletter"
                        aria-invalid={!!error}
                        aria-describedby={error ? "nl-error" : undefined}
                      />
                    </div>
                    <button onClick={handleSubmit} disabled={status === "loading"}
                      className="flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0818A8] text-[12px] font-black tracking-[0.08em] uppercase px-6 py-4 transition-all duration-200 flex-shrink-0 disabled:opacity-60"
                      aria-label="Subscribe to newsletter" aria-busy={status === "loading"}>
                      {status === "loading" ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <><Send size={12} aria-hidden="true" /> Subscribe</>}
                    </button>
                  </div>
                  {error && <p id="nl-error" role="alert" className="flex items-center gap-1.5 text-red-300 text-[11.5px] mt-2"><AlertCircle size={11} />{error}</p>}
                  <p className="text-white/38 text-[10.5px] font-light mt-3">
                    By subscribing you agree to our <Link href="/privacy" className="underline underline-offset-2 hover:text-white/60 transition-colors">Privacy Policy</Link>. Unsubscribe any time.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Trending sidebar ─────────────────────────────────────────────────────────
function TrendingList() {
  const { ref, inView } = useScrollReveal("-40px");
  return (
    <aside ref={ref} className="border border-gray-200 bg-white overflow-hidden sticky top-[80px]" aria-label="Trending articles">
      <div className="h-[3px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
      <div className="p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <TrendingUp size={14} className="text-[#0818A8]" aria-hidden="true" />
          <p className="text-[9.5px] font-black tracking-[0.28em] uppercase text-gray-500">Trending Now</p>
        </div>
        <div className="space-y-5">
          {TRENDING.map((a, i) => (
            <motion.div key={a.id}
              className="group flex items-start gap-3"
              initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}>
              <span className="font-black text-[28px] leading-none text-[#0818A8]/12 flex-shrink-0 w-8 text-right">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className="inline-block text-[9px] font-bold tracking-[0.18em] uppercase text-[#0818A8] mb-1">{CATEGORIES.find(c => c.id === a.category)?.label}</span>
                <Link href={`/blog/${a.slug}`}
                  className="block text-[12.5px] font-semibold text-gray-800 group-hover:text-[#0818A8] transition-colors leading-snug"
                  aria-label={`Read trending: ${a.title}`}>
                  {a.title}
                </Link>
                <span className="text-gray-400 text-[11px] font-light">{a.readTime}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Category filter bar ──────────────────────────────────────────────────────
function CategoryFilter({ active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {CATEGORIES.map(cat => {
        const Icon = cat.icon;
        const isActive = active === cat.id;
        return (
          <button key={cat.id} onClick={() => onSelect(cat.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-[11.5px] font-semibold border transition-all duration-200 ${
              isActive
                ? "text-white border-[#0818A8] bg-[#0818A8] shadow-md shadow-[#0818A8]/20"
                : "text-gray-600 border-gray-200 bg-white hover:border-[#0818A8]/40 hover:text-[#0818A8]"
            }`}
            aria-pressed={isActive} aria-label={`Filter by ${cat.label}`}>
            <Icon size={12} aria-hidden="true" />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery,    setSearchQuery]    = useState("");
  const [searchOpen,     setSearchOpen]     = useState(false);
  const heroRef    = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const featuredArticle  = ARTICLES.find(a => a.featured);
  const secondaryArticles = ARTICLES.filter(a => !a.featured);

  const filtered = useMemo(() => {
    let list = activeCategory === "all" ? secondaryArticles : secondaryArticles.filter(a => a.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  // First 2 after featured → row layout; rest → grid
  const rowArticles  = filtered.slice(0, 2);
  const gridArticles = filtered.slice(2);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "BreadcrumbList", "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://r-zoneenterprises.com" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://r-zoneenterprises.com/blog" },
          ]},
          { "@type": "Blog",
            "name": "R-Zone Cargo Insights & News",
            "url": "https://r-zoneenterprises.com/blog",
            "description": "Shipping guides, customs tips, industry news and logistics insights from R-Zone Cargo.",
            "publisher": { "@type": "Organization", "name": "R-Zone Enterprises", "url": "https://r-zoneenterprises.com" },
            "blogPost": ARTICLES.map(a => ({
              "@type": "BlogPosting",
              "headline": a.title,
              "description": a.excerpt,
              "url": `https://r-zoneenterprises.com/blog/${a.slug}`,
              "datePublished": a.date,
              "author": { "@type": "Organization", "name": a.author },
              "publisher": { "@type": "Organization", "name": "R-Zone Enterprises" },
            })),
          },
        ],
      })}} />

      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white min-h-screen`}>

        {/* ════════════════════════════════════════════════════════════════
            HERO — Dark, editorial masthead
        ════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#00061a] overflow-hidden" aria-labelledby="blog-hero-heading">
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
          {/* Atmospheric glows */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-[-15%] left-[-5%] w-[700px] h-[600px] bg-[#0818A8]/18 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-20%] right-[-5%] w-[500px] h-[400px] bg-[#1F51FF]/10 rounded-full blur-[130px]" />
          </div>
          {/* Accent lines */}
          {[10, 30].map((p, i) => (
            <motion.div key={p} className="absolute top-0 bottom-0 w-px pointer-events-none"
              style={{ left: `${p}%`, background: "linear-gradient(to bottom, transparent 5%, rgba(31,81,255,0.3) 45%, transparent 95%)" }}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.4, delay: 0.8 + i * 0.15 }}
              aria-hidden="true" />
          ))}

          <div ref={heroRef} className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 pt-[100px] pb-14 md:pb-16">

            {/* Breadcrumb */}
            <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10"
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
              <Link href="/" className="text-white/60 text-[11.5px] font-medium hover:text-white transition-colors">Home</Link>
              <ChevronRight size={11} className="text-white/25" aria-hidden="true" />
              <span className="text-white/80 text-[11.5px] font-medium" aria-current="page">Insights & News</span>
            </motion.nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                  <TagPill label="R-Zone Cargo Blog" dark />
                </motion.div>
                <motion.h1 id="blog-hero-heading"
                  className="font-black text-[clamp(36px,7vw,82px)] text-white leading-[0.87] tracking-[-0.038em] uppercase mb-5"
                  initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
                  Insights &<br />
                  <span className="relative inline-block">
                    <span className="text-[#1F51FF]">News.</span>
                    <motion.span className="absolute -bottom-2 left-0 h-[4px] rounded-full"
                      style={{ background: "linear-gradient(to right, #0818A8, #1F51FF)" }}
                      aria-hidden="true" initial={{ width: 0 }} animate={heroInView ? { width: "100%" } : {}} transition={{ duration: 0.65, delay: 0.9 }} />
                  </span>
                </motion.h1>
                <motion.p className="text-white/65 text-[15px] font-light leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }}>
                  Shipping guides, customs tips, logistics news and industry insights from the R-Zone Cargo team — keeping UK–Nigeria shippers informed.
                </motion.p>
              </div>

              {/* Stats row */}
              <motion.div className="lg:col-span-4 grid grid-cols-3 gap-3"
                initial={{ opacity: 0, x: 16 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.35 }}>
                {[
                  { val: `${ARTICLES.length}+`, label: "Articles" },
                  { val: "6",  label: "Topics"    },
                  { val: "Weekly", label: "Updates"   },
                ].map((s, i) => (
                  <div key={s.label} className="border border-white/[0.07] bg-white/[0.05] p-4 text-center">
                    <p className="text-white font-black text-[20px] leading-none tracking-[-0.02em]">{s.val}</p>
                    <p className="text-white/50 text-[10px] font-semibold tracking-[0.1em] uppercase mt-1">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom rule */}
          <div className="relative z-10">
            <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 pb-6">
              {/* Search bar */}
              <motion.div className="flex items-center gap-3 flex-wrap"
                initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.45 }}>
                <div className="relative flex-1 min-w-[240px] max-w-sm">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" aria-hidden="true" />
                  <input
                    type="search" placeholder="Search articles…"
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.08] border border-white/15 text-white text-[13px] font-light placeholder-white/25 pl-11 pr-4 py-3 outline-none focus:border-[#1F51FF]/50 focus:bg-white/[0.12] transition-all duration-200"
                    aria-label="Search blog articles"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors" aria-label="Clear search">
                      <X size={13} aria-hidden="true" />
                    </button>
                  )}
                </div>
                <span className="text-white/25 text-[11px] font-light hidden sm:block">{ARTICLES.length} articles published</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            FEATURED + TRENDING — Two-column header layout
        ════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#00061a] pb-0" aria-labelledby="featured-heading">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10">

            {/* Section label */}
            <div className="flex items-center gap-4 py-7 border-b border-white/[0.06]">
              <div className="h-px flex-1 bg-white/[0.06]" aria-hidden="true" />
              <span className="text-[9px] font-black tracking-[0.35em] uppercase text-white/28">Editor's Pick</span>
              <div className="h-px flex-1 bg-white/[0.06]" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8">

              {/* Featured article — takes 8/12 */}
              <div className="lg:col-span-8">
                <h2 id="featured-heading" className="sr-only">Featured Article</h2>
                {featuredArticle && <FeaturedCard article={featuredArticle} />}
              </div>

              {/* Trending sidebar — 4/12 */}
              <div className="lg:col-span-4">
                <TrendingList />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            ARTICLES — Category filter + mixed layout
        ════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-white overflow-hidden" aria-labelledby="articles-heading">
          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
            style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

          <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-18">

            {/* ── Header + filter ── */}
            {(() => {
              const { ref, inView } = useScrollReveal("-40px");
              return (
                <div ref={ref} className="mb-10">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-7">
                    <div>
                      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                        <TagPill label="All Articles" />
                      </motion.div>
                      <motion.h2 id="articles-heading"
                        className="font-black text-[clamp(24px,4vw,44px)] text-gray-900 leading-[0.92] tracking-[-0.025em] uppercase"
                        initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                        Latest{" "}
                        <span className="relative inline-block text-[#0818A8]">
                          Insights.
                          <motion.span className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#0818A8]" aria-hidden="true"
                            initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.6 }} />
                        </span>
                      </motion.h2>
                    </div>
                    <motion.p className="text-gray-500 text-[13px] font-light max-w-sm text-right hidden sm:block"
                      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
                      {filtered.length} article{filtered.length !== 1 ? "s" : ""}{activeCategory !== "all" ? ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}` : ""}
                    </motion.p>
                  </div>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.2 }}>
                    <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
                  </motion.div>
                </div>
              );
            })()}

            {/* ── Content ── */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="border border-gray-200 bg-gray-50 p-14 text-center">
                  <Search size={32} className="text-gray-300 mx-auto mb-4" aria-hidden="true" />
                  <p className="text-gray-800 font-bold text-[16px] mb-2">No articles found</p>
                  <p className="text-gray-500 text-[13.5px] font-light mb-5">
                    {searchQuery ? `No results for "${searchQuery}". Try a different search term.` : `No articles in this category yet. Check back soon.`}
                  </p>
                  <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                    className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200"
                    aria-label="Show all articles">
                    Show All Articles
                  </button>
                </motion.div>
              ) : (
                <motion.div key={`${activeCategory}-${searchQuery}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

                  {/* Row layout — first 2 articles */}
                  {rowArticles.length > 0 && (
                    <div className="space-y-5 mb-5">
                      {rowArticles.map((a, i) => <ArticleRow key={a.id} article={a} index={i} />)}
                    </div>
                  )}

                  {/* Divider with label */}
                  {rowArticles.length > 0 && gridArticles.length > 0 && (
                    <div className="flex items-center gap-4 my-10">
                      <div className="h-px flex-1 bg-gray-100" aria-hidden="true" />
                      <span className="text-[9px] font-black tracking-[0.3em] uppercase text-gray-400">More Articles</span>
                      <div className="h-px flex-1 bg-gray-100" aria-hidden="true" />
                    </div>
                  )}

                  {/* Grid layout — remaining articles */}
                  {gridArticles.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {gridArticles.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Load more — placeholder */}
            {filtered.length >= 6 && (
              <div className="text-center mt-12">
                {(() => {
                  const { ref, inView } = useScrollReveal("-20px");
                  return (
                    <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
                      <button className="group inline-flex items-center gap-2.5 border-2 border-[#0818A8]/20 hover:border-[#0818A8] text-[#0818A8] text-[12px] font-black tracking-[0.1em] uppercase px-8 py-4 hover:bg-[#0818A8] hover:text-white transition-all duration-200"
                        aria-label="Load more articles">
                        Load More Articles
                        <ChevronDown size={13} className="group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
                      </button>
                    </motion.div>
                  );
                })()}
              </div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            NEWSLETTER
        ════════════════════════════════════════════════════════════════ */}
        <NewsletterSection />

        {/* ════════════════════════════════════════════════════════════════
            CATEGORIES GRID — Visual category picker
        ════════════════════════════════════════════════════════════════ */}
        {(() => {
          const { ref, inView } = useScrollReveal("-40px");
          return (
            <section ref={ref} className="relative bg-[#00061a] overflow-hidden" aria-labelledby="topics-heading">
              <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />

              <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-18">
                <div className="text-center mb-10">
                  <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                    <TagPill label="Browse by Topic" dark />
                  </motion.div>
                  <motion.h2 id="topics-heading" className="font-black text-[clamp(22px,3.5vw,40px)] text-white leading-[0.92] tracking-[-0.025em] uppercase"
                    initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                    Explore Our{" "}<span className="text-[#1F51FF]">Topics.</span>
                  </motion.h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {CATEGORIES.filter(c => c.id !== "all").map((cat, i) => {
                    const Icon = cat.icon;
                    const count = ARTICLES.filter(a => a.category === cat.id).length;
                    return (
                      <motion.button key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          document.getElementById("articles-heading")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group flex flex-col items-center gap-3 border border-white/[0.07] bg-white/[0.04] p-6 hover:border-white/[0.2] hover:bg-white/[0.08] transition-all duration-300 relative overflow-hidden text-center"
                        initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }}
                        aria-label={`Browse ${cat.label} articles`}>
                        <div className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-400"
                          style={{ backgroundColor: cat.color }} aria-hidden="true" />
                        <div className="w-11 h-11 flex items-center justify-center" style={{ backgroundColor: `${cat.color}20` }} aria-hidden="true">
                          <Icon size={18} style={{ color: cat.color }} />
                        </div>
                        <div>
                          <p className="text-white/85 font-bold text-[12.5px] leading-tight">{cat.label}</p>
                          <p className="text-white/35 text-[10.5px] font-light mt-0.5">{count} article{count !== 1 ? "s" : ""}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })()}

      </div>
    </>
  );
}