'use client'
import React, { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Service from "@/components/Service";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// ─── Cookie Banner ────────────────────────────────────────────────────────────

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  // Only show if user hasn't already responded
  useEffect(() => {
    const consent = localStorage.getItem("rzone_cookie_consent");
    if (!consent) {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("rzone_cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("rzone_cookie_consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop — subtle dim */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Banner — slides up from bottom */}
          <motion.div
            className={`${montserrat.className} fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6`}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="max-w-[1100px] mx-auto bg-white border border-gray-200 shadow-2xl shadow-black/10 rounded-sm overflow-hidden">

              {/* Inner layout */}
              <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10 px-6 py-6 md:px-8 md:py-7">

                {/* ── Text content ── */}
                <div className="flex-1 min-w-0">

                  {/* Title */}
                  <h3 className="text-gray-900 font-bold text-[16px] md:text-[17px] tracking-[-0.01em] mb-3">
                    Your privacy matters.
                  </h3>

                  {/* Body */}
                  <p className="text-gray-500 text-[13px] font-light leading-relaxed mb-3">
                    R-Zone Cargo uses necessary cookies to personalise content
                    and ads, to provide social media features, and to analyse
                    our traffic. We also share information about your use of our
                    site with our social media, advertising and analytics
                    partners who may combine it with other information that
                    you've provided to them or that they've collected from your
                    use of their services.
                  </p>

                  {/* Policy links */}
                  <p className="text-gray-500 text-[13px] font-light leading-relaxed">
                    By accepting, you agree to the use of these cookies. To
                    learn more, view our{" "}
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
                </div>

                {/* ── Buttons ── */}
                <div className="flex items-center gap-3 flex-shrink-0 self-end md:self-auto pb-0.5">

                  {/* Decline — gray outlined, matches reference */}
                  <motion.button
                    onClick={decline}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[14px] font-medium px-6 py-2.5 rounded-sm transition-colors duration-150 tracking-[0.01em]"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Decline
                  </motion.button>

                  {/* Accept — solid blue (R-Zone brand, matches reference's green) */}
                  <motion.button
                    onClick={accept}
                    className="flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[14px] font-semibold px-6 py-2.5 rounded-sm transition-colors duration-150 tracking-[0.01em] shadow-md shadow-[#0818A8]/20"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Check size={15} strokeWidth={2.5} />
                    Yes, I accept
                  </motion.button>

                </div>
              </div>

              {/* Blue top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#0818A8]" />

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
 
      <div className="">
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