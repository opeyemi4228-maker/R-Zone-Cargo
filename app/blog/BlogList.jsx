"use client";
// app/blog/BlogList.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Blog listing UI. Receives `articles`, `featured` and `categories` from the
// server component (app/blog/page.jsx), which also owns metadata + JSON-LD.
//
// Layout, top to bottom: one hero (single H1, search), the featured guide with
// a short "start here" list, then every guide as a filterable grid. Each card
// is a real <Link> so Google can crawl every article from this page.
// No newsletter or topic grid here: the footer carries the newsletter, and the
// topic chips above the grid already do the topic job.
// ─────────────────────────────────────────────────────────────────────────────
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Search, X } from "lucide-react";
import { montserrat } from "../../lib/fonts";

// Guides most readers need first, shown beside the featured article.
const START_HERE = [
  "how-much-does-cargo-cost-from-uk-to-nigeria",
  "how-long-shipping-uk-to-nigeria-takes",
  "prohibited-items-shipping-to-nigeria-from-uk",
  "nigeria-customs-duty-guide",
];

function formatDate(iso) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function categoryLabel(categories, id) {
  return categories.find((c) => c.id === id)?.label || "Guide";
}

function ArticleCard({ article, categories, priority = false }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white ring-1 ring-[#E3EAF7] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(8,24,168,0.35)] hover:ring-[#000f89]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000f89]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#F6FAFF]">
        <Image
          src={article.img}
          alt={article.imgAlt || ""}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[12.5px] font-semibold text-[#000f89]">{categoryLabel(categories, article.category)}</p>
        <h3 className="mt-2 text-[18px] font-extrabold leading-snug tracking-[-0.02em] text-[#00112E] group-hover:text-[#000f89]">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-2 flex-1 text-[14.5px] leading-relaxed text-slate-600">{article.excerpt}</p>
        <p className="mt-5 flex items-center gap-1.5 text-[13px] font-medium text-slate-500">
          <Clock size={13} aria-hidden="true" />
          {article.readTime}
        </p>
      </div>
    </Link>
  );
}

export default function BlogList({ articles, featured, categories }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const lastUpdated = useMemo(() => {
    const latest = articles
      .map((a) => a.dateModified || a.datePublished)
      .filter(Boolean)
      .sort()
      .pop();
    return latest ? formatDate(latest) : "";
  }, [articles]);

  const startHere = useMemo(
    () => START_HERE.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean),
    [articles]
  );

  // Newest three guides for the hero panel.
 const latest = useMemo(
 () => [...articles].sort((x, y) => String(y.datePublished).localeCompare(String(x.datePublished))).slice(0, 3),
 [articles]
 );

 const searching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (!searching && a.id === featured?.id) return false; // featured is shown above
      if (activeCategory !== "all" && a.category !== activeCategory) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        (a.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [articles, featured, activeCategory, query, searching]);

  // First screenful only until "Show all" is pressed. The rest stay in the
  // HTML (just hidden) so every article link remains crawlable.
  const INITIAL = 12;
  const collapsible = !expanded && !searching && activeCategory === "all" && filtered.length > INITIAL;

  const usedCategories = categories.filter(
    (c) => c.id === "all" || articles.some((a) => a.category === c.id)
  );

  return (
    <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white`}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
 {/* Same ground as every other hero (navy, grid, one glow). Left: the H1,
 intro and search. Right: the three newest guides, so the page shows it is
 alive without repeating the featured guide or "start here" list below. */}
 <section className="relative isolate overflow-hidden bg-[#00112E] text-white hero-section" aria-labelledby="blog-hero-h1">
 <div
 className="absolute inset-0 -z-10 opacity-[0.035]"
 style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }}
 aria-hidden="true"
 />
 <div className="absolute -left-40 -top-24 -z-10 h-[520px] w-[760px] rounded-full bg-[#000f89]/30 blur-[150px]" aria-hidden="true" />
 <div className="absolute -bottom-40 right-0 -z-10 h-[420px] w-[620px] rounded-full bg-[#0000FF]/10 blur-[140px]" aria-hidden="true" />

 <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-[97px] sm:px-8 md:pb-24 lg:pt-[124px] xl:px-10">
 <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-medium">
 <Link href="/" className="text-white/70 transition-colors hover:text-white">Home</Link>
 <span className="text-white/40" aria-hidden="true">›</span>
 <span className="text-white" aria-current="page">Blog</span>
 </nav>

 <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
 <div className="lg:col-span-7">
 <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[13px] font-semibold text-[#A6A6FF]">
 <span className="h-1.5 w-1.5 rounded-full bg-[#4D4DFF]" aria-hidden="true" />
 Shipping guides
 </p>
 <h1
 id="blog-hero-h1"
 className="mt-6 max-w-[13ch] font-extrabold leading-[0.98] tracking-[-0.045em] text-white"
 style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
 >
 The UK to Nigeria shipping blog<span className="text-[#4D4DFF]">.</span>
 </h1>
 <p className="mt-7 max-w-[54ch] text-[clamp(1.05rem,1.4vw,1.2rem)] font-medium leading-[1.6] text-white/75">
 Plain-English guides on prices, customs, packing and transit times, written
 by the team that ships to Nigeria every week.
 </p>

 <div className="mt-9 flex max-w-[600px] items-center gap-3 rounded-full bg-white p-1.5 pl-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ring-4 ring-white/[0.06] focus-within:ring-[#4D4DFF]/40">
 <Search size={19} className="flex-shrink-0 text-slate-400" aria-hidden="true" />
 <input
 type="search"
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 placeholder="Search guides, e.g. customs"
 aria-label="Search the shipping guides"
 className="min-w-0 flex-1 bg-transparent py-3.5 text-[16px] text-[#00112E] placeholder-slate-400 outline-none"
 />
 {searching ? (
 <button
 type="button"
 onClick={() => setQuery("")}
 className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
 aria-label="Clear search"
 >
 <X size={17} aria-hidden="true" />
 </button>
 ) : (
 <span className="hidden h-11 flex-shrink-0 items-center rounded-full bg-[#0000CD] px-5 text-[14.5px] font-bold text-white sm:inline-flex" aria-hidden="true">
 Search
 </span>
 )}
 </div>

 <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] font-medium text-white/60">
 <span><strong className="font-bold text-white">{articles.length}</strong> guides</span>
 {lastUpdated && (
 <>
 <span className="h-3.5 w-px bg-white/20" aria-hidden="true" />
 <span>Last updated {lastUpdated}</span>
 </>
 )}
 </p>
 </div>

 {/* New this month */}
 <aside className="hidden lg:col-span-5 lg:block" aria-labelledby="latest-h2">
 <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
 <h2 id="latest-h2" className="flex items-center justify-between text-[14px] font-bold text-white">
 New this month
 <span className="rounded-full bg-[#0000CD] px-2.5 py-0.5 text-[12px] font-bold">{latest.length} new</span>
 </h2>
 <ul className="mt-5 space-y-3">
 {latest.map((a) => (
 <li key={a.slug}>
 <Link href={`/blog/${a.slug}`} className="group flex items-center gap-4 rounded-[18px] p-2 transition-colors hover:bg-white/[0.06]">
 <span className="relative h-[72px] w-[96px] flex-shrink-0 overflow-hidden rounded-[14px] bg-white/10">
 <Image src={a.img} alt="" fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
 </span>
 <span className="min-w-0">
 <span className="block text-[12.5px] font-semibold text-[#A6A6FF]">{categoryLabel(categories, a.category)}</span>
 <span className="mt-1 line-clamp-2 block text-[15px] font-bold leading-snug text-white group-hover:text-[#A6A6FF]">{a.title}</span>
 </span>
 </Link>
 </li>
 ))}
 </ul>
 <a href="#articles-h2" className="group mt-4 flex items-center justify-between rounded-[16px] border-t border-white/10 px-2 pt-4 text-[14px] font-bold text-white transition-colors hover:text-[#A6A6FF]">
 Browse all {articles.length} guides
 <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
 </a>
 </div>
 </aside>
 </div>
 </div>
 </section>

 {/* ── Featured + start here (hidden while searching) ───────────────── */}
      {!searching && featured && (
        <section className="mx-auto max-w-[1400px] px-5 pt-16 sm:px-8 md:pt-20 xl:px-10" aria-labelledby="featured-h2">
          <h2 id="featured-h2" className="sr-only">Featured guide</h2>
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-[28px] bg-[#F6FAFF] ring-1 ring-[#E3EAF7] transition-shadow hover:shadow-[0_30px_70px_-34px_rgba(8,24,168,0.4)] md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] md:aspect-auto">
                <Image
                  src={featured.img}
                  alt={featured.imgAlt || ""}
                  fill
                  priority
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col p-7 md:p-9">
                <p className="text-[13px] font-semibold text-[#000f89]">
                  Featured · {categoryLabel(categories, featured.category)}
                </p>
                <h3 className="mt-3 text-[clamp(22px,2.4vw,30px)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#00112E] group-hover:text-[#000f89]">
                  {featured.title}
                </h3>
                <p className="mt-4 line-clamp-3 flex-1 text-[15.5px] leading-relaxed text-slate-600">{featured.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-bold text-[#000f89]">
                  Read the guide
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>

            {startHere.length > 0 && (
              <div className="rounded-[28px] p-7 ring-1 ring-[#E3EAF7] md:p-8">
                <p className="text-[15px] font-extrabold text-[#00112E]">New to shipping to Nigeria? Start here.</p>
                <ol className="mt-5 divide-y divide-[#E3EAF7]">
                  {startHere.map((a, i) => (
                    <li key={a.slug}>
                      <Link href={`/blog/${a.slug}`} className="group flex items-start gap-4 py-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#000f89]/[0.07] text-[13px] font-bold text-[#000f89]" aria-hidden="true">
                          {i + 1}
                        </span>
                        <span className="text-[15px] font-semibold leading-snug text-[#00112E] group-hover:text-[#000f89]">
                          {a.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── All guides ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 md:py-20 xl:px-10" aria-labelledby="articles-h2">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="articles-h2"
            className="font-extrabold leading-[1.04] tracking-[-0.035em] text-[#00112E]"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            {searching ? `Results for “${query.trim()}”` : "All guides."}
          </h2>
          <p className="text-[14px] font-medium text-slate-500" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "guide" : "guides"}
          </p>
        </div>

        <div className="-mx-5 mt-7 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter guides by topic">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {usedCategories.map((c) => {
              const active = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(c.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                    active ? "bg-[#000f89] text-white" : "bg-[#F6FAFF] text-[#00112E] ring-1 ring-[#E3EAF7] hover:ring-[#000f89]/30"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-[20px] bg-[#F6FAFF] p-12 text-center ring-1 ring-[#E3EAF7]">
            <p className="text-[17px] font-bold text-[#00112E]">No guides match that search.</p>
            <p className="mt-2 text-[15px] text-slate-600">Try a simpler word, or ask our team directly.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => { setQuery(""); setActiveCategory("all"); }}
                className="rounded-full bg-[#000f89] px-6 py-3 text-[14px] font-bold text-white hover:bg-[#0000CD]"
              >
                Show all guides
              </button>
              <Link href="/contact" className="rounded-full px-6 py-3 text-[14px] font-semibold text-[#000f89] ring-1 ring-[#000f89]/25 hover:bg-white">
                Ask our team
              </Link>
            </div>
          </div>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a, i) => (
              <li key={a.id} className={collapsible && i >= INITIAL ? "hidden" : undefined}>
                <ArticleCard article={a} categories={categories} priority={i < 3 && searching} />
              </li>
            ))}
          </ul>
        )}
        {collapsible && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="rounded-full bg-[#000f89] px-7 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#0000CD]"
            >
              Show all {filtered.length} guides
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
