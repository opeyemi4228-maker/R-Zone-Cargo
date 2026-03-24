"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Real verified customer reviews ───────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    name: "Halima Aro",
    avatar: "HA",
    date: "July 2023",
    stars: 5,
    short: "Nothing short of fantastic — real-time updates every step.",
    text: "From start to finish, R-Zone demonstrated the utmost professionalism, efficiency, and care. Communication was excellent — I was kept informed every step of the way, from pickup to delivery, with real-time updates. My items arrived in perfect condition and right on schedule. Without a doubt, I wholeheartedly recommend R-Zone for all shipping needs.",
  },
  {
    id: 2,
    name: "Adeola Enahoro",
    avatar: "AE",
    date: "November 2022",
    stars: 5,
    short: "Left the UK Friday, received in Lagos by Thursday.",
    text: "Very quick and swift delivery. Goods left the UK on Friday and I received them to my doorstep in Lagos by the following Thursday. My items were fragile and all were received in perfect state.",
  },
  {
    id: 3,
    name: "Oludotun Otesile",
    avatar: "OO",
    date: "August 2022",
    stars: 5,
    short: "Professional staff in both London and Lagos.",
    text: "I have always depended on R-Zone Enterprises for shipping my items from England to my home in Abeokuta. They always repackage my goods safely. They communicate excellently to inform me of when my goods are in Lagos and when it will be delivered. Their service is good value for money because my items are always delivered as given to them. Staff in London and Lagos are very professional.",
  },
  {
    id: 4,
    name: "Grace Somorin",
    avatar: "GS",
    date: "April 2021",
    stars: 5,
    short: "Efficient, reasonable pricing, superb customer service.",
    text: "I used R-Zone Cargo from London to Lagos, Nigeria. I'm really pleased — their service is not only efficient, their price is incredibly reasonable, their customer service is superb and their delivery date is spot on. All my luggage remained intact, they re-packed my bags for safety. I will use them again and again. I highly recommend them to anyone looking for efficiency, effectiveness and trustworthiness.",
  },
  {
    id: 5,
    name: "Vincent Adebiyi",
    avatar: "VA",
    date: "August 2023",
    stars: 5,
    short: "Used for 7 years — never lost a single package.",
    text: "A very reliable service which I have used for the past 7 years. Always accurate and on time with deliveries, with great communication. I have never lost a package and all products were delivered with extreme care and diligence.",
  },
  {
    id: 6,
    name: "Alake Taiwo",
    avatar: "AT",
    date: "December 2021",
    stars: 5,
    short: "Trustworthy, on time, and they work with integrity.",
    text: "They are so standard and on time. They work with integrity and we are so impressed. They respond swiftly and give wonderful service. Our goods arrived intact and in good shape. I will patronise them over and over and will also recommend them to anyone that wants to do business with them. They are awesome and trustworthy.",
  },
  {
    id: 7,
    name: "David Goliath",
    avatar: "DG",
    date: "March 2024",
    stars: 5,
    short: "Proactive, reliable and trusted — I'll recommend to everyone.",
    text: "Your company was proactive, reliable, and trusted. I will recommend you to my friends who want to ship their consignments.",
  },
  {
    id: 8,
    name: "Christiana Ogum",
    avatar: "CO",
    date: "September 2023",
    stars: 5,
    short: "Parcel received ahead of time — very professional team.",
    text: "The service was excellent, parcel was received way ahead of schedule. Very professional team — I was updated through each process. I will definitely come back.",
  },
  {
    id: 9,
    name: "Ijeoma Njoku",
    avatar: "IN",
    date: "May 2021",
    stars: 5,
    short: "Fantastic company — great service in great hands.",
    text: "R-Zone Enterprises Ltd — fantastic company, great service, reliable and efficient. Will advise you to use them for your international and domestic deliveries. Will definitely use them again. You're in great hands.",
  },
  {
    id: 10,
    name: "hauwa ummi",
    avatar: "HU",
    date: "March 2023",
    stars: 5,
    short: "Swift delivery, prompt response, trustworthy every time.",
    text: "Great service. Kudos. Swift delivery and prompt response to any enquiries. Good customer service and trustworthy. Will recommend them over and over.",
  },
  {
    id: 11,
    name: "Rose Igwegbe",
    avatar: "RI",
    date: "October 2022",
    stars: 5,
    short: "Using them for 5 years — items always arrive intact.",
    text: "Great service all the time. Items sent are intact when they arrive at the destination. I have been using the company for about 5 years now.",
  },
  {
    id: 12,
    name: "Ifeoma Dike",
    avatar: "ID",
    date: "June 2022",
    stars: 5,
    short: "Excellent, professional, very affordable.",
    text: "Excellent and professional cargo service to Nigeria. Most importantly, very affordable. I am one very happy customer. Thanks R-Zone Enterprises!",
  },
];

// ─── Featured (best for desktop highlight column) ──────────────────────────────
const FEATURED_IDS  = [2, 5, 1]; // centre column gets featured style on index 0
const DESKTOP_COLS  = [
  [TESTIMONIALS[0], TESTIMONIALS[6]],
  [TESTIMONIALS[1], TESTIMONIALS[4]],
  [TESTIMONIALS[2], TESTIMONIALS[7]],
];

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};

// ─── Card ─────────────────────────────────────────────────────────────────────
function TestimonialCard({ t, featured = false }) {
  return (
    <motion.div
      className={`relative flex flex-col justify-between border transition-all duration-300 cursor-default
        ${featured
          ? "bg-[#0818A8] border-[#0818A8] shadow-2xl shadow-[#0818A8]/20 p-7 md:p-8"
          : "bg-white border-gray-200 hover:border-[#0818A8]/30 hover:shadow-lg hover:shadow-[#0818A8]/8 p-6"
        }`}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      itemScope
      itemType="https://schema.org/Review"
    >
      <div className={`absolute top-5 right-5 ${featured ? "opacity-20" : "opacity-[0.08]"}`} aria-hidden="true">
        <Quote size={28} className={featured ? "text-white" : "text-[#0818A8]"} />
      </div>

      {/* Stars */}
      <div className="mb-4">
        <div className="flex items-center gap-0.5" aria-label={`${t.stars} out of 5 stars`}
          itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
          <meta itemProp="ratingValue" content={t.stars} />
          <meta itemProp="bestRating" content="5" />
          {Array.from({ length: t.stars }).map((_, i) => (
            <Star key={i} size={11} className={featured ? "fill-white text-white" : "fill-[#0818A8] text-[#0818A8]"} aria-hidden="true" />
          ))}
        </div>
      </div>

      {/* Pull quote */}
      <p className={`font-bold leading-snug mb-3 tracking-[-0.01em] ${featured ? "text-white text-[16px] md:text-[17px]" : "text-gray-900 text-[13.5px] md:text-[14px]"}`}
        itemProp="name">
        &ldquo;{t.short}&rdquo;
      </p>

      {/* Full review text */}
      <p className={`font-normal leading-relaxed flex-1 mb-6 text-[13px] ${featured ? "text-white/80" : "text-gray-800"}`}
        itemProp="reviewBody">
        {t.text}
      </p>

      {/* Author */}
      <div className={`flex items-center gap-3 pt-4 border-t ${featured ? "border-white/20" : "border-gray-100"}`}
        itemProp="author" itemScope itemType="https://schema.org/Person">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-black ${featured ? "bg-white/20 text-white" : "bg-[#0818A8] text-white"}`}
          aria-hidden="true">
          {t.avatar}
        </div>
        <div>
          <p className={`font-semibold text-[13px] tracking-[0.02em] ${featured ? "text-white" : "text-gray-900"}`}
            itemProp="name">{t.name}</p>
          <p className={`text-[11px] font-normal tracking-[0.04em] ${featured ? "text-white/80" : "text-gray-800"}`}>
            Verified Customer · {t.date}
          </p>
        </div>
      </div>

      {/* Hidden itemProp for schema */}
      <meta itemProp="itemReviewed" content="R-Zone Enterprises — UK to Nigeria Cargo" />
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const total  = TESTIMONIALS.length;

  return (
    <>
      {/* AggregateRating + Review schema — powers Google star ratings in search */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://r-zoneenterprises.com/#organization",
          "name": "R-Zone Enterprises",
          "description": "The highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — 107+ five-star reviews, organically earned.",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "107",
            "bestRating": "5",
            "worstRating": "1",
          },
          "review": TESTIMONIALS.map(t => ({
            "@type": "Review",
            "author": { "@type": "Person", "name": t.name },
            "datePublished": t.date,
            "reviewRating": { "@type": "Rating", "ratingValue": t.stars, "bestRating": "5" },
            "reviewBody": t.text,
            "name": t.short,
            "itemReviewed": {
              "@type": "Service",
              "name": "UK to Nigeria Cargo Shipping — R-Zone Enterprises",
              "provider": { "@type": "Organization", "name": "R-Zone Enterprises" },
            },
          })),
        }),
      }} />

      <section
        ref={ref}
        className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] relative bg-white overflow-hidden py-20 md:py-28`}
        aria-labelledby="testimonials-heading"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        {/* Backgrounds */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle, #0818A8 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/30 to-transparent" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#0818A8]/5 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">

          {/* Header */}
          <motion.div className="text-center mb-14 md:mb-16"
            initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 border border-[#0818A8]/20 bg-[#0818A8]/5 px-4 py-1.5 rounded-full">
                <Star size={10} className="fill-[#0818A8] text-[#0818A8]" aria-hidden="true" />
                <span className="text-[#0818A8] text-[13px] font-bold tracking-[0.22em] uppercase">
                  107+ Five-Star Reviews · #1 Ranked UK–Nigeria Cargo
                </span>
              </div>
            </motion.div>

            <motion.h2 id="testimonials-heading" variants={fadeUp} custom={0.1}
              className="text-gray-900 font-black text-[clamp(28px,5vw,56px)] leading-tight tracking-[-0.02em] mb-3">
              What Our Customers{" "}
              <span className="relative inline-block text-[#0818A8]">
                Say About Us
                <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#0818A8] rounded-full"
                  initial={{ width: 0 }} animate={inView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }} aria-hidden="true" />
              </span>
              .
            </motion.h2>

            <motion.p variants={fadeUp} custom={0.2}
              className="text-gray-800 text-[14px] font-normal max-w-lg mx-auto leading-relaxed">
              The{" "}
              <strong className="text-gray-900 font-semibold">highest-rated and highest-ranked UK-to-Nigeria cargo company on Google</strong>
              {" "}— 107+ verified five-star reviews from real customers across the UK and Nigeria.
            </motion.p>
          </motion.div>

          {/* Desktop 3-col grid */}
          <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
            {DESKTOP_COLS.map((col, colIdx) => (
              <motion.div key={colIdx}
                className={`flex flex-col gap-5 ${colIdx === 0 ? "pt-8" : colIdx === 2 ? "pt-14" : ""}`}
                initial="hidden" animate={inView ? "visible" : "hidden"}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 * colIdx } } }}>
                {col.map((t, i) => (
                  <motion.div key={t.id} variants={fadeUp}>
                    <TestimonialCard t={t} featured={colIdx === 1 && i === 0} />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <motion.div key={active}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <TestimonialCard t={TESTIMONIALS[active]} featured={active === 1} />
            </motion.div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2" role="tablist" aria-label="Customer review navigation">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)} role="tab"
                    aria-selected={i === active} aria-label={`View review ${i + 1}`}
                    className={`rounded-full transition-all duration-200 ${i === active ? "w-5 h-1.5 bg-[#0818A8]" : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-800"}`} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setActive(a => (a - 1 + total) % total)}
                  className="w-9 h-9 rounded border border-gray-200 flex items-center justify-center text-gray-800 hover:text-[#0818A8] hover:border-[#0818A8]/40 transition-all"
                  aria-label="Previous customer review">
                  <ChevronLeft size={15} aria-hidden="true" />
                </button>
                <button onClick={() => setActive(a => (a + 1) % total)}
                  className="w-9 h-9 rounded border border-gray-200 flex items-center justify-center text-gray-800 hover:text-[#0818A8] hover:border-[#0818A8]/40 transition-all"
                  aria-label="Next customer review">
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom stat bar */}
          <motion.div
            className="mt-14 md:mt-16 pt-8 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }} role="list"
            aria-label="R-Zone Enterprises customer satisfaction statistics">
            {[
              { value: "107+",  label: "Five-Star Reviews"     },
              { value: "12+",   label: "Years of Service"      },
              { value: "5.0",   label: "Google Rating"         },
              { value: "50K+",  label: "Shipments Delivered"   },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1 text-center md:text-left" role="listitem">
                <span className="text-[#0818A8] font-black text-[clamp(24px,3vw,36px)] leading-none tracking-tight">
                  {s.value}
                </span>
                <span className="text-gray-800 text-[13px] font-medium tracking-[0.12em] uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/20 to-transparent" aria-hidden="true" />
      </section>
    </>
  );
}