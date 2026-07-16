"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, AlertCircle, ShieldCheck } from "lucide-react";
import { adminLogin } from "../../../lib/adminAuth";

const montserrat = Montserrat({
 subsets: ["latin"],
 weight: ["300", "400", "500", "600", "700", "800", "900"],
 variable: "--font-montserrat",
 display: "swap",
});

export default function AdminLoginPage() {
 const router = useRouter();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [showPw, setShowPw] = useState(false);
 const [status, setStatus] = useState("idle");
 const [errMsg, setErrMsg] = useState("");

 const handleSubmit = async (e) => {
 e.preventDefault();
 if (!email.trim() || !password) {
 setErrMsg("Please enter your email and password.");
 setStatus("error");
 return;
 }
 setStatus("loading");
 const result = await adminLogin(email, password);
 if (result.ok) {
 router.replace("/admin/dashboard");
 } else {
 setErrMsg(result.error);
 setStatus("error");
 }
 };

 return (
 <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] min-h-screen bg-[#f1f5f9] flex items-center justify-center px-4`}>

 {/* Subtle grid pattern */}
 <div className="fixed inset-0 pointer-events-none" aria-hidden="true"
 style={{ backgroundImage: "linear-gradient(#e2e8f0 1px,transparent 1px),linear-gradient(90deg,#e2e8f0 1px,transparent 1px)", backgroundSize: "48px 48px", opacity: 0.5 }} />

 <motion.div
 className="relative w-full max-w-[420px]"
 initial={{ opacity: 0, y: 24 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
 >
 {/* Card */}
 <div className="bg-white border border-[#e2e8f0] shadow-xl shadow-black/[0.06] p-8 sm:p-10 rounded-sm">

 {/* Brand */}
 <div className="flex flex-col items-center mb-8">
 <div className="w-12 h-12 bg-[#0818A8] flex items-center justify-center mb-4 shadow-lg shadow-[#0818A8]/25 rounded-sm">
 <ShieldCheck size={22} className="text-white" />
 </div>
 <h1 className="text-[#0f172a] font-black text-[20px] tracking-[-0.02em] uppercase">
 R-Zone Admin
 </h1>
 <p className="text-[#64748b] text-[13px] font-medium mt-1">
 Secure access · Staff only
 </p>
 </div>

 {/* Error */}
 <AnimatePresence>
 {status === "error" && (
 <motion.div
 className="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-3 mb-6 rounded-sm"
 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
 role="alert"
 >
 <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
 <span className="text-red-600 text-[13px] font-medium">{errMsg}</span>
 </motion.div>
 )}
 </AnimatePresence>

 <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

 {/* Email */}
 <div>
 <label className="block text-[12px] font-bold tracking-[0.16em] uppercase text-[#374151] mb-2">
 Email Address
 </label>
 <div className="relative">
 <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" aria-hidden="true" />
 <input
 type="email"
 value={email}
 onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
 placeholder="admin@rzonecargo.com"
 autoComplete="email"
 className="w-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] placeholder-[#94a3b8] text-[13px] pl-10 pr-4 py-3 outline-none focus:border-[#0818A8] focus:bg-white focus:ring-2 focus:ring-[#0818A8]/10 transition-all duration-200 rounded-sm"
 />
 </div>
 </div>

 {/* Password */}
 <div>
 <label className="block text-[12px] font-bold tracking-[0.16em] uppercase text-[#374151] mb-2">
 Password
 </label>
 <div className="relative">
 <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" aria-hidden="true" />
 <input
 type={showPw ? "text" : "password"}
 value={password}
 onChange={e => { setPassword(e.target.value); setStatus("idle"); }}
 placeholder="••••••••••••"
 autoComplete="current-password"
 className="w-full bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] placeholder-[#94a3b8] text-[13px] pl-10 pr-11 py-3 outline-none focus:border-[#0818A8] focus:bg-white focus:ring-2 focus:ring-[#0818A8]/10 transition-all duration-200 rounded-sm"
 />
 <button type="button" onClick={() => setShowPw(v => !v)}
 className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569] transition-colors"
 aria-label={showPw ? "Hide password" : "Show password"}>
 {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
 </button>
 </div>
 </div>

 {/* Submit */}
 <motion.button
 type="submit"
 disabled={status === "loading"}
 className="mt-2 w-full bg-[#0818A8] hover:bg-[#0437F2] disabled:opacity-60 text-white text-[13px] font-black tracking-[0.12em] uppercase py-3.5 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#0818A8]/20 rounded-sm"
 whileTap={{ scale: 0.98 }}
 >
 {status === "loading" ? (
 <>
 <motion.div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full"
 animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} />
 Signing in…
 </>
 ) : "Sign In to Admin Panel"}
 </motion.button>
 </form>

 <p className="text-[#94a3b8] text-[11px] text-center mt-8 font-medium">
 R-Zone Enterprises · Admin Portal · Confidential
 </p>
 </div>
 </motion.div>
 </div>
 );
}
