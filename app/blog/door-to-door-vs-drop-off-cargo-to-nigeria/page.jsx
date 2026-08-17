// app/blog/door-to-door-vs-drop-off-cargo-to-nigeria/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Landing-structure blog post (same design as /cargo-from-uk-to-nigeria and the
// car-shipping page): editorial hero, comparison table, option cards, hidden-cost
// section, why-us, FAQ, CTA. Server component, static HTML, self-canonical,
// UK English, no em/en dashes. A matching ARTICLES entry provides the /blog
// listing card + count; this dedicated page.jsx wins the route.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Truck,
  Package,
  Plane,
  Ship,
  ShieldCheck,
  PoundSterling,
  Clock,
  MapPin,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Check,
  X,
  Award,
  Zap,
  Globe,
} from "lucide-react";
import { ORGANIZATION_SCHEMA } from "../../../lib/articles";
import ShareRow from "../../cargo-from-uk-to-nigeria/ShareRow";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = "https://r-zoneenterprises.com";
const PAGE_URL = `${SITE_URL}/blog/door-to-door-vs-drop-off-cargo-to-nigeria`;
const WHATSAPP = "447915647119";
const HERO_IMG =
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80&auto=format&fit=crop";

const TITLE =
  "Door to Door vs Drop-Off Cargo to Nigeria 2026: Which Is Cheaper? | R-Zone Enterprises";
const DESCRIPTION =
  "Door to door or drop-off cargo to Nigeria in 2026? We compare the real cost, convenience and speed so you can choose. Door to door from £6/kg with UK collection and delivery to any door in Nigeria. Free same-day quote.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "door to door vs drop off cargo Nigeria",
    "door to door cargo to Nigeria",
    "drop off cargo to Nigeria",
    "cheapest way to send cargo to Nigeria",
    "door to door shipping UK to Nigeria",
    "is door to door cargo to Nigeria worth it",
    "send parcel to Nigeria door to door",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: { absolute: TITLE },
    description: DESCRIPTION,
    siteName: "R-Zone Enterprises",
    locale: "en_GB",
    images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Cargo boxes packed for door to door shipping from the UK to Nigeria" }],
  },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: { absolute: TITLE }, description: DESCRIPTION, images: [HERO_IMG] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const FAQS = [
  {
    q: "Is door to door cargo to Nigeria worth the extra cost?",
    a: "For most senders, yes. Door to door removes the two hardest parts of shipping to Nigeria: getting your cargo to a UK depot and the recipient collecting it in Nigeria. For a 20kg box the extra cost over drop-off is usually only about £20 to £30, and it includes UK-wide collection and delivery to the recipient's door.",
  },
  {
    q: "How much more does door to door cost than drop-off?",
    a: "Door to door starts from £6/kg versus about £5/kg by air for drop-off, so on a 20kg box you are typically paying around £20 to £30 more. That premium covers collection from your UK address and final delivery to the door in Nigeria, which usually costs more than that to arrange yourself.",
  },
  {
    q: "What is the difference between door to door and drop-off cargo?",
    a: "With drop-off, you deliver your cargo to a UK depot and the recipient collects it from a location in Nigeria. With door to door, R-Zone collects from your UK address and delivers to the recipient's door in Nigeria, handling everything in between including customs clearance.",
  },
  {
    q: "Do you collect cargo from my home in the UK?",
    a: "Yes. With door to door we collect from any UK address, home or business, nationwide. You never need to visit a depot. Collection is arranged on a day that suits you.",
  },
  {
    q: "Which is faster, door to door or drop-off?",
    a: "The transit time is the same for both, 5 to 10 working days by air and 4 to 6 weeks by sea. Door to door can feel faster end to end because there is no waiting for the recipient to travel to a depot and collect in Nigeria.",
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: TITLE,
    description: DESCRIPTION,
    image: { "@type": "ImageObject", url: HERO_IMG, width: 1200, height: 630 },
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    author: { "@type": "Organization", name: "R-Zone Cargo Team", url: `${SITE_URL}/about` },
    publisher: ORGANIZATION_SCHEMA,
    mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
    inLanguage: "en-GB",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: "Door to Door vs Drop-Off Cargo to Nigeria", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: TITLE,
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] },
  },
  { "@context": "https://schema.org", ...ORGANIZATION_SCHEMA },
];

function CTAButtons({ light = false }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/quote" className="group inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0a1fce] text-white text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3.5 transition-colors">
        Get a Free Quote
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </Link>
      <a href="tel:+448007720864" className={`inline-flex items-center gap-2 border text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-colors ${light ? "border-white/30 hover:border-white text-white" : "border-gray-300 hover:border-[#0818A8] text-gray-800 hover:text-[#0818A8]"}`}>
        <PhoneCall size={13} aria-hidden="true" /> Call Us
      </a>
      <a href={`https://wa.me/${WHATSAPP}`} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-colors">
        <MessageCircle size={13} aria-hidden="true" /> WhatsApp
      </a>
    </div>
  );
}

function H2({ id, eyebrow, children }) {
  return (
    <div className="mb-7">
      {eyebrow && <p className="text-[12px] font-black tracking-[0.3em] uppercase text-[#0818A8] mb-3">{eyebrow}</p>}
      <h2 id={id} className="font-black text-[clamp(26px,4.2vw,40px)] text-[#0b0f1a] leading-[1.03] tracking-[-0.02em] uppercase">{children}</h2>
    </div>
  );
}

const COMPARE = [
  ["Price from", "Air £5/kg, sea £3/kg", "From £6/kg", false],
  ["UK first mile", "You deliver to a depot", "We collect from your address", true],
  ["Nigeria last mile", "Recipient collects it", "We deliver to the door", true],
  ["Your effort", "Depot run, your time and fuel", "None, we handle it", true],
  ["Recipient effort", "Travel and collect in Nigeria", "None, delivered home", true],
  ["Transit time", "5 to 10 days air, 4 to 6 weeks sea", "Same", false],
];

const OPTIONS = [
  { icon: Package, name: "Drop-Off", price: "Air from £5/kg", href: "/quote",
    points: ["Lowest headline price per kg", "You deliver cargo to a UK depot", "Recipient collects it in Nigeria", "Best if you both live near a point"] },
  { icon: Truck, name: "Door to Door", price: "From £6/kg", href: "/quote",
    points: ["We collect from your UK address", "We deliver to the recipient's door", "No depot runs at either end", "Best for heavy cargo and busy families"] },
];

const WHY = [
  [Award, "12+ years of experience", "Shipping UK to Nigeria cargo since 2012, with 50,000+ shipments delivered."],
  [PoundSterling, "Transparent pricing", "All inclusive rates with no hidden fees. The price we quote is the price you pay."],
  [ShieldCheck, "Own teams in UK and Lagos", "One company handles collection, customs clearance and delivery end to end."],
  [Zap, "Weekly departures", "Your cargo joins the next available air or sea service, with no long waits."],
  [Globe, "Delivery across Nigeria", "Lagos, Abuja, Port Harcourt, Ibadan, Kano and every state."],
  [Clock, "Same transit either way", "5 to 10 working days by air, 4 to 6 weeks by sea, whichever option you pick."],
];

export default function Page() {
  return (
    <main className={`${montserrat.className} bg-white`}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[940px] mx-auto px-5 sm:px-8 pt-[128px] md:pt-[140px]">
          <h1 className="font-black text-[clamp(30px,5.4vw,55px)] text-[#0b0f1a] leading-[1.05] tracking-[-0.02em] mb-5">
            Door to Door vs Drop-Off Cargo to Nigeria: Which Is Cheaper and Better in 2026?
          </h1>
          <p className="text-gray-500 text-[17px] md:text-[20px] font-normal leading-relaxed mb-8 max-w-3xl">
            Drop-off looks cheaper on paper, but door to door often wins once you count the hidden
            costs of getting cargo to a depot and the recipient collecting it in Nigeria. Here is
            the honest 2026 comparison.
          </p>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/7.5]">
            <Image src={HERO_IMG} alt="Cargo boxes packed and labelled for door to door shipping from the UK to Nigeria" fill priority sizes="(max-width: 940px) 100vw, 940px" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 flex gap-8 sm:gap-10">
              <div>
                <p className="text-white/65 text-[11px] font-medium mb-1">Written by</p>
                <p className="text-white text-[14px] font-bold">R-Zone Cargo Team</p>
              </div>
              <div>
                <p className="text-white/65 text-[11px] font-medium mb-1">Published on</p>
                <p className="text-white text-[14px] font-bold">17 August 2026</p>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8">
              <ShareRow url={PAGE_URL} title={TITLE} />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="comparison" eyebrow="Side by side">Door to Door vs Drop-Off at a Glance</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">
          Both options use the same air and sea services to Nigeria. The only difference is who
          handles the first mile in the UK and the last mile in Nigeria, and that difference is
          where the real cost hides.
        </p>
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="bg-[#0818A8] text-white text-[12px] uppercase tracking-[0.06em]">
                <th className="p-4 font-bold">What matters</th>
                <th className="p-4 font-bold">Drop-Off</th>
                <th className="p-4 font-bold">Door to Door</th>
              </tr>
            </thead>
            <tbody className="text-[14.5px] text-gray-800">
              {COMPARE.map(([feature, drop, door, doorWins], i) => (
                <tr key={feature} className={i % 2 ? "bg-gray-50" : ""}>
                  <td className="p-4 font-bold">{feature}</td>
                  <td className="p-4">{drop}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-2">
                      {doorWins && <Check size={15} className="text-emerald-600 flex-shrink-0" aria-hidden="true" />}
                      <span className={doorWins ? "font-semibold text-gray-900" : ""}>{door}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── OPTION CARDS ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="options" eyebrow="Two ways to send">Your Two Options Explained</H2>
          <div className="grid gap-5 md:grid-cols-2 mt-2">
            {OPTIONS.map(({ icon: Icon, name, price, href, points }) => (
              <div key={name} className="group bg-white border border-gray-200 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/5 transition-all duration-300 flex flex-col">
                <div className="p-6 pb-5 border-b border-gray-100">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={22} aria-hidden="true" /></span>
                  <h3 className="font-black text-[18.5px] text-gray-900 uppercase tracking-[-0.01em] mb-1">{name}</h3>
                  <p className="text-[#0818A8] font-black text-[16px]">{price}</p>
                </div>
                <ul className="p-6 pt-5 space-y-2.5 flex-1">
                  {points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-gray-700 text-[14.5px] leading-snug"><Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />{pt}</li>
                  ))}
                </ul>
                <Link href={href} className="flex items-center gap-1.5 px-6 py-4 border-t border-gray-100 text-[#0818A8] text-[12px] font-black tracking-[0.06em] uppercase group-hover:bg-[#0818A8] group-hover:text-white transition-colors">Get a quote<ArrowRight size={13} aria-hidden="true" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIDDEN COSTS ──────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="hidden-costs" eyebrow="The catch with drop-off">The Hidden Costs of Drop-Off</H2>
        <p className="text-gray-700 text-[16.5px] leading-[1.85] mb-8 max-w-3xl">
          Drop-off is only cheaper if getting your cargo to the depot, and the recipient getting it
          home, costs nothing. It rarely does. For a 20kg box the door to door premium is often just
          £20 to £30, and these hidden costs can wipe that out.
        </p>
        <div className="grid gap-5 md:grid-cols-2 mt-2">
          <div className="border border-gray-200 p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><MapPin size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">Your side in the UK</h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">
              Fuel or a courier to the depot, parking, your time, and sometimes a second trip if the
              depot is far or busy. For heavy or bulky boxes you may also need help loading and
              unloading the car.
            </p>
          </div>
          <div className="border border-gray-200 p-7">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Globe size={20} aria-hidden="true" /></span>
            <h3 className="font-black text-[17px] text-gray-900 uppercase mb-3">Their side in Nigeria</h3>
            <p className="text-gray-700 text-[15px] leading-relaxed">
              The recipient has to travel to the collection point, often through Lagos traffic, pay
              for transport back home, and carry heavy boxes. For elderly parents or busy family,
              that is a real burden, and a real cost.
            </p>
          </div>
        </div>
        <div className="mt-6 max-w-3xl border-l-[4px] border-[#0818A8] bg-[#0818A8]/[0.04] p-5">
          <p className="text-gray-800 text-[14.5px] leading-relaxed">
            <strong className="text-gray-900">The verdict:</strong> for a small premium, door to
            door removes the two hardest, most expensive parts of sending cargo to Nigeria. That is
            why most R-Zone customers choose it.
          </p>
        </div>
      </section>

      {/* ── WHEN EACH WINS ────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="which-to-choose" eyebrow="Choose with confidence">When to Choose Each Option</H2>
          <div className="grid gap-5 md:grid-cols-2 mt-2">
            <div className="bg-white border border-gray-200 p-7">
              <h3 className="font-black text-[17px] text-gray-900 uppercase mb-4">Choose drop-off if</h3>
              <ul className="space-y-2.5">
                {["You live near a drop-off point", "The recipient can easily collect in Nigeria", "You are sending something light where every pound counts"].map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-gray-700 text-[14.5px] leading-snug"><Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />{p}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#0818A8]/25 p-7">
              <h3 className="font-black text-[17px] text-[#0818A8] uppercase mb-4">Choose door to door if</h3>
              <ul className="space-y-2.5">
                {["The cargo is heavy or bulky", "The recipient cannot easily travel to collect", "You value your time and want it handled"].map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-gray-700 text-[14.5px] leading-snug"><Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY R-ZONE ────────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
        <H2 id="why-r-zone" eyebrow="Trusted by 100+ customers">Why Send Your Cargo with R-Zone</H2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-2">
          {WHY.map(([Icon, t, d]) => (
            <li key={t} className="border border-gray-200 p-6">
              <span className="inline-flex items-center justify-center w-11 h-11 bg-[#0818A8]/8 text-[#0818A8] mb-4"><Icon size={20} aria-hidden="true" /></span>
              <h3 className="font-bold text-gray-900 text-[15px] mb-2">{t}</h3>
              <p className="text-gray-600 text-[14px] leading-relaxed">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <H2 id="faq" eyebrow="Everything you need to know">Door to Door vs Drop-Off FAQs</H2>
          <div className="space-y-3 mt-2">
            {FAQS.map((f) => (
              <details key={f.q} className="group bg-white border border-gray-200 open:border-[#0818A8]/40 transition-colors">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none">
                  <h3 className="font-bold text-[15.5px] text-gray-900 group-open:text-[#0818A8] transition-colors">{f.q}</h3>
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full group-open:border-[#0818A8] group-open:bg-[#0818A8] transition-colors" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-open:rotate-180 transition-transform"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-gray-500 group-open:stroke-white" /></svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0818A8] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-16 md:py-20">
          <p className="text-white/60 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Not sure which to pick?</p>
          <h2 className="font-black text-[clamp(26px,4.4vw,44px)] text-white tracking-[-0.02em] mb-4 leading-[1.05] max-w-3xl">Get both options priced in one free quote</h2>
          <p className="text-white/80 text-[16px] mb-8 max-w-2xl leading-relaxed">
            Door to door from £6/kg. Drop-off air from £5/kg, sea from £3/kg. Weekly departures and
            delivery to every state in Nigeria. Tell us what you are sending and we will price both
            so you can choose.
          </p>
          <CTAButtons light />
          <nav aria-label="Related pages" className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-white/70">
            <Link href="/blog/door-to-door-shipping-uk-to-nigeria" className="hover:text-white transition-colors">Door to Door Guide</Link>
            <Link href="/blog/how-door-to-door-cargo-to-nigeria-works" className="hover:text-white transition-colors">How Door to Door Works</Link>
            <Link href="/cargo-from-uk-to-nigeria" className="hover:text-white transition-colors">Cargo from UK to Nigeria</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Shipping Guides</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
