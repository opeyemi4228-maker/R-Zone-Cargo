"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { montserrat } from "../lib/fonts";

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
 short: "Fast and reliable received in less than 6 weeks.",
 text: "R-zone Cargo is fast and reliable service! I sent a bag from London to Nigeria, and my sister received it in less than six weeks. I truly enjoyed their service and will definitely keep using them.",
 },
 {
 id: 5,
 name: "ABOSEDE THOMAS",
 avatar: "AT",
 date: "1 month ago",
 stars: 5,
 short: "Prompt, exactly 6 weeks no hiccups at all.",
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
 short: "Arrived earlier than expected incredible service.",
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
 short: "Very efficient and reliable delivered in 6 weeks.",
 text: "My first time using R-Zone cargo and o must confess they are very efficient and reliable. My delivery was with 6 weeks as promised. My good were delivered straight to my house and intact. I'm really happy and impressed. Will definitely be using them and also recommend them people. 👌",
 },
 {
 id: 10,
 name: "billy ozigis",
 avatar: "BO",
 date: "1 year ago",
 stars: 5,
 short: "Highly coordinated with swift and organised delivery.",
 text: "Rzone as a Company is highly coordinated and I'm always impressed by their swift delivery services. Through their organised timetable, u get to have an insight of when your goods will arrive. I highly recommend.",
 },
 {
 id: 11,
 name: "Bola Ladejo",
 avatar: "BL",
 date: "1 year ago",
 stars: 5,
 short: "Referred by a friend did not disappoint us.",
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
const FEATURED_IDS = [2, 5, 1]; // centre column gets featured style on index 0
const DESKTOP_COLS = [
 [TESTIMONIALS[0], TESTIMONIALS[6]],
 [TESTIMONIALS[1], TESTIMONIALS[4]],
 [TESTIMONIALS[2], TESTIMONIALS[7]],
];

const fadeUp = {
 hidden: { opacity: 0, y: 30 },
 visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: d } }),
};

// ─── Card ─────────────────────────────────────────────────────────────────────
function TestimonialCard({ t, featured = false }) {
 return (
 <motion.div
 className={`relative flex flex-col justify-between rounded-[20px] border transition-all duration-300 cursor-default
 ${featured
 ? "bg-[#000f89] border-[#000f89] shadow-2xl shadow-[#000f89]/20 p-7 md:p-8"
 : "bg-[#F6FAFF] border-[#E3EAF7] hover:border-[#000f89]/25 p-6"
 }`}
 whileHover={{ y: -4, transition: { duration: 0.25 } }}
 >
 <div className={`absolute top-5 right-5 ${featured ? "opacity-20" : "opacity-[0.08]"}`} aria-hidden="true">
 <Quote size={28} className={featured ? "text-white" : "text-[#000f89]"} />
 </div>

 {/* Stars */}
 <div className="mb-4">
 <div className="flex items-center gap-0.5" aria-label={`${t.stars} out of 5 stars`}
>
 {Array.from({ length: t.stars }).map((_, i) => (
 <Star key={i} size={11} className={featured ? "fill-white text-white" : "fill-[#000f89] text-[#000f89]"} aria-hidden="true" />
 ))}
 </div>
 </div>

 {/* Pull quote */}
 <p className={`font-bold leading-snug mb-3 tracking-[-0.01em] ${featured ? "text-white text-[16px] md:text-[17px]" : "text-gray-900 text-[13.5px] md:text-[14px]"}`}
>
 &ldquo;{t.short}&rdquo;
 </p>

 {/* Full review text */}
 <p className={`font-normal leading-relaxed flex-1 mb-6 text-[13px] ${featured ? "text-white/80" : "text-gray-800"}`}
>
 {t.text}
 </p>

 {/* Author */}
 <div className={`flex items-center gap-3 pt-4 border-t ${featured ? "border-white/20" : "border-gray-100"}`}
>
 <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-black ${featured ? "bg-white/20 text-white" : "bg-[#000f89] text-white"}`}
 aria-hidden="true">
 {t.avatar}
 </div>
 <div>
 <p className={`font-semibold text-[13px] tracking-[0.02em] ${featured ? "text-white" : "text-gray-900"}`}
>{t.name}</p>
 <p className={`text-[11px] font-normal tracking-[0.04em] ${featured ? "text-white/80" : "text-gray-800"}`}>
 Verified Customer · {t.date}
 </p>
 </div>
 </div>

 </motion.div>
 );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
 const ref = useRef(null);
 const inView = useInView(ref, { once: true, margin: "-80px" });
 const [currentIndex, setCurrentIndex] = useState(0);
 const total = TESTIMONIALS.length;

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
 {/* No Review/AggregateRating markup here. Google's review snippet policy
 excludes "self-serving" reviews (a business marking up reviews of itself
 on its own site), and review markup without an aggregateRating triggers
 "Multiple reviews without aggregateRating object" in Search Console.
 The testimonials below stay visible to readers; stars in search come
 from the Google Business Profile. */}

 <section
 ref={ref}
 className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] relative bg-white overflow-hidden py-20 md:py-28`}
 aria-labelledby="testimonials-heading"
 >
 <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10">

 {/* Header */}
 <motion.div className="text-center mb-14 md:mb-16"
 initial="hidden" animate={inView ? "visible" : "hidden"}
 variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
 <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-4">
 <div className="inline-flex items-center gap-2 rounded-full bg-[#000f89]/[0.07] px-3.5 py-1.5">
 <Star size={12} className="fill-[#000f89] text-[#000f89]" aria-hidden="true" />
 <span className="text-[#000f89] text-[13px] font-semibold">
 120+ five-star reviews on Google
 </span>
 </div>
 </motion.div>

 <motion.h2 id="testimonials-heading" variants={fadeUp} custom={0.1}
 className="font-extrabold leading-[1.04] tracking-[-0.035em] text-[#00112E] mb-4"
 style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}>
 What our customers say.
 </motion.h2>

 <motion.p variants={fadeUp} custom={0.2}
 className="text-slate-600 text-[16px] font-normal max-w-lg mx-auto leading-relaxed">
 Real reviews from customers who ship with us between the UK and Nigeria.
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
 filter: testimonial.isCenter ? 'drop-shadow(0 20px 25px rgba(0,15,137, 0.15))' : 'none'
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
 className="w-12 h-12 rounded-full border-2 border-[#000f89]/20 bg-white hover:bg-[#000f89] hover:border-[#000f89] flex items-center justify-center text-[#000f89] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
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
 ? 'w-8 h-3 bg-[#000f89]'
 : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
 }`}
 aria-label={`Go to testimonial ${i + 1}`}
 />
 ))}
 </div>

 <button
 onClick={nextSlide}
 className="w-12 h-12 rounded-full border-2 border-[#000f89]/20 bg-white hover:bg-[#000f89] hover:border-[#000f89] flex items-center justify-center text-[#000f89] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
 aria-label="Next testimonials"
 >
 <ChevronRight size={20} />
 </button>
 </div>
 </div>


 </div>

 </section>
 </>
 );
}