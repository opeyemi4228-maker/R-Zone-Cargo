"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
    name: "Dotun Fowowe",
    avatar: "DF",
    date: "1 month ago",
    stars: 5,
    short: "Timely delivery and amazing communication throughout.",
    text: "I am really pleased and excited with timely delivery and the commitment of R-Zone Cargo. The intervals communication they gave all through the transaction was amazing. I will definitely keep coming back again and again to do business with them.",
  },
  {
    id: 2,
    name: "Charles Eze",
    avatar: "CE",
    date: "3 months ago",
    stars: 5,
    short: "Consistently exceeded expectations over 8 years of service.",
    text: "I have been using and trusted R-ZONE CARGO for over eight years, and their delivery service has consistently exceeded my expectations. Every item arrives on time, professionally packaged, and in perfect condition. Their reliability, efficiency, and attention to detail make them a standout logistics partner. I highly recommend R-ZONE CARGO for dependable and high-quality delivery services. TRY THEM TODAY & THANK ME LATER.",
  },
  {
    id: 3,
    name: "Shola Oluwatobi",
    avatar: "SO",
    date: "4 months ago",
    stars: 5,
    short: "Superb packaging and reliable service overall.",
    text: "I am happy with this cargo company, most expecially the packaging, its superb. Just that there was a bit of differ in the the delivery date but all other is👌. I would recommend them.",
  },
  {
    id: 4,
    name: "Musa Femi",
    avatar: "MF",
    date: "7 months ago",
    stars: 5,
    short: "Fast and reliable — received in less than 6 weeks.",
    text: "R-zone Cargo is fast and reliable service! I sent a bag from London to Nigeria, and my sister received it in less than six weeks. I truly enjoyed their service and will definitely keep using them.",
  },
  {
    id: 5,
    name: "ABOSEDE THOMAS",
    avatar: "AT",
    date: "1 month ago",
    stars: 5,
    short: "Prompt, exactly 6 weeks — no hiccups at all.",
    text: "It was prompt, exactly 6 weeks. No hiccups. I like the cargo and shipping services.",
  },
  {
    id: 6,
    name: "Olusegun Olaniyi",
    avatar: "OO",
    date: "10 months ago",
    stars: 5,
    short: "Reliable, trusted, and consistent in every transaction.",
    text: "R-Zone Cargo & Shipping Services are reliable, trusted and consistent when it to general either diaspora or locally. This is my second time of doing business with them, please be assured that all goes well.",
  },
  {
    id: 7,
    name: "Jane Moore",
    avatar: "JM",
    date: "1 year ago",
    stars: 5,
    short: "Arrived earlier than expected — incredible service.",
    text: "I recently used R-Zone Enterprises Ltd to send a package to my sister in Abuja, and I couldn't be more impressed with their service! The delivery arrived even earlier than expected, which was a wonderful surprise. My sister received everything in perfect condition.",
  },
  {
    id: 8,
    name: "ANYIAM CHUKWUDI EUGENE",
    avatar: "AC",
    date: "9 months ago",
    stars: 5,
    short: "Items delivered exactly on the promised date.",
    text: "Great service! My family is so happy to receive the items I sent to them in Lagos. I feel relieved and glad. The items were delivered exactly on the date promised. Thank you, R-Zone Cargo & Shipping Service. Thank you once again!",
  },
  {
    id: 9,
    name: "Mo Judith",
    avatar: "MJ",
    date: "1 year ago",
    stars: 5,
    short: "Very efficient and reliable — delivered in 6 weeks.",
    text: "My first time using R-Zone cargo and o must confess they are very efficient and reliable. My delivery was with 6 weeks as promised. My good were delivered straight to my house and intact. I'm really happy and impressed. Will definitely be using them and also recommend them people. 👌",
  },
  {
    id: 10,
    name: "billy ozigis",
    avatar: "BO",
    date: "1 year ago",
    stars: 5,
    short: "Highly coordinated with swift and organized delivery.",
    text: "Rzone as a Company is highly coordinated and I'm always impressed by their swift delivery services. Through their organized timetable, u get to have an insight of when your goods will arrive. I highly recommend.",
  },
  {
    id: 11,
    name: "Bola Ladejo",
    avatar: "BL",
    date: "1 year ago",
    stars: 5,
    short: "Referred by a friend — did not disappoint us.",
    text: "R-Zone Cargo and Shipping lived upto expectations, they were referred by a friend and we surely were not disappointed. Professional service from start to finish.",
  },
  {
    id: 12,
    name: "h u",
    avatar: "HU",
    date: "3 years ago",
    stars: 5,
    short: "Swift delivery, excellent service, highly trustworthy.",
    text: "Great service. Kudos. Swift delivery and prompt response to any enquiries. Good Customer service! And trustworthy. Will recommend them over and over.",
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const total  = TESTIMONIALS.length;

  // Auto-advance every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [total]);

  // Get the 3 testimonials to show (with wrapping)
  const getVisibleTestimonials = () => {
    const testimonials = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + total) % total;
      testimonials.push({
        ...TESTIMONIALS[index],
        position: i + 1, // 0, 1, 2 (left, center, right)
        isCenter: i === 0
      });
    }
    return testimonials;
  };

  const visibleTestimonials = getVisibleTestimonials();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <>
      {/* AggregateRating + Review schema — powers Google star ratings in search */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://r-zoneenterprises.com/#organization",
          "name": "R-Zone Enterprises",
          "description": "The highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — 100+ five-star reviews, organically earned.",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "100",
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
                  100+ Five-Star Reviews · #1 Ranked UK–Nigeria Cargo
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
              {" "}— 100+ verified five-star reviews from real customers across the UK and Nigeria.
            </motion.p>
          </motion.div>

          {/* Testimonials Slider */}
          <div className="relative overflow-hidden">
            <div className="flex justify-center gap-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.id}-${currentIndex}-${index}`}
                    className={`flex-shrink-0 transition-all duration-700 ${
                      testimonial.isCenter 
                        ? 'w-full max-w-[400px] md:max-w-[420px] z-10' 
                        : 'w-full max-w-[350px] md:max-w-[380px]'
                    }`}
                    initial={{ 
                      scale: 0.8, 
                      opacity: 0, 
                      x: index === 0 ? -200 : index === 2 ? 200 : 0,
                      y: 20
                    }}
                    animate={{ 
                      scale: testimonial.isCenter ? 1.08 : 0.92,
                      opacity: testimonial.isCenter ? 1 : 0.8,
                      x: 0,
                      y: testimonial.isCenter ? -10 : 0
                    }}
                    exit={{ 
                      scale: 0.8, 
                      opacity: 0, 
                      x: index === 0 ? -200 : index === 2 ? 200 : 0,
                      y: 20
                    }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      scale: { duration: 1.0, ease: "easeOut" }
                    }}
                    style={{
                      filter: testimonial.isCenter ? 'drop-shadow(0 20px 25px rgba(8, 24, 168, 0.15))' : 'none'
                    }}
                  >
                    <TestimonialCard t={testimonial} featured={testimonial.isCenter} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-[#0818A8]/20 bg-white hover:bg-[#0818A8] hover:border-[#0818A8] flex items-center justify-center text-[#0818A8] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Dots indicator */}
              <div className="flex items-center gap-2">
                {Array.from({ length: total }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentIndex 
                        ? 'w-8 h-3 bg-[#0818A8]' 
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-2 border-[#0818A8]/20 bg-white hover:bg-[#0818A8] hover:border-[#0818A8] flex items-center justify-center text-[#0818A8] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Next testimonials"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Bottom stat bar */}
          <motion.div
            className="mt-14 md:mt-16 pt-8 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }} role="list"
            aria-label="R-Zone Enterprises customer satisfaction statistics">
            {[
              { value: "100+",  label: "Five-Star Reviews"     },
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