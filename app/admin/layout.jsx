"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, MessageSquare, Users, LogOut,
  Menu, X, ShieldCheck, ChevronRight,
} from "lucide-react";
import { isAdminAuthenticated, adminLogout } from "../../lib/adminAuth";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const NAV = [
  { href: "/admin/dashboard",   label: "Dashboard",        icon: LayoutDashboard },
  { href: "/admin/quotes",      label: "Quote Requests",   icon: FileText },
  { href: "/admin/contacts",    label: "Contact Messages", icon: MessageSquare },
  { href: "/admin/subscribers", label: "Subscribers",      icon: Users },
];

function Sidebar({ pathname, onClose }) {
  const router = useRouter();

  const handleLogout = async () => {
    await adminLogout();
    router.replace("/admin/login");
  };

  return (
    <aside className="flex flex-col h-full bg-white border-r border-[#e2e8f0]">

      {/* Brand */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0818A8] flex items-center justify-center flex-shrink-0 rounded-sm shadow shadow-[#0818A8]/20">
            <ShieldCheck size={15} className="text-white" />
          </div>
          <div>
            <p className="text-[#0f172a] font-black text-[13px] tracking-[-0.01em] uppercase leading-none">
              R-Zone Admin
            </p>
            <p className="text-[#94a3b8] text-[10px] font-medium mt-0.5">Control Panel</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#0f172a] lg:hidden transition-colors" aria-label="Close sidebar">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5" aria-label="Admin navigation">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} onClick={onClose}
              className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-sm transition-all duration-200 ${
                active
                  ? "bg-[#eff6ff] text-[#0818A8] border-l-2 border-[#0818A8]"
                  : "text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] border-l-2 border-transparent"
              }`}
            >
              <Icon size={15} className={active ? "text-[#0818A8]" : "text-[#94a3b8] group-hover:text-[#475569]"} aria-hidden="true" />
              <span className="text-[13px] font-semibold">{label}</span>
              {active && <ChevronRight size={11} className="ml-auto text-[#0818A8]" aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#e2e8f0]">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-[#94a3b8] hover:text-red-600 hover:bg-red-50 transition-all duration-200 group">
          <LogOut size={15} aria-hidden="true" />
          <span className="text-[13px] font-semibold">Sign Out</span>
        </button>
        <p className="text-[#cbd5e1] text-[10px] font-medium px-3.5 mt-3">
          R-Zone Enterprises © 2026
        </p>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  const pathname     = usePathname();
  const router       = useRouter();
  const [ready,      setReady]      = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login" || pathname === "/admin";

  // Page-level access is enforced server-side by middleware.js (session cookie).
  // We verify once on mount as a defence-in-depth check before rendering the shell.
  useEffect(() => {
    if (isLoginPage) { setReady(true); return; }
    let active = true;
    isAdminAuthenticated().then(ok => {
      if (!active) return;
      if (!ok) router.replace("/admin/login");
      else setReady(true);
    });
    return () => { active = false; };
  }, [pathname]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  if (!ready && !isLoginPage) {
    return (
      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] min-h-screen bg-[#f1f5f9] flex items-center justify-center`}>
        <motion.div className="w-5 h-5 border-2 border-[#0818A8]/20 border-t-[#0818A8] rounded-full"
          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)]`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] min-h-screen bg-[#f1f5f9] flex`}>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-[240px] flex-shrink-0 flex-col h-screen sticky top-0">
        <Sidebar pathname={pathname} />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)} />
            <motion.div className="fixed left-0 top-0 bottom-0 w-[240px] z-50 lg:hidden"
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <Sidebar pathname={pathname} onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">

        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3.5 bg-white border-b border-[#e2e8f0] sticky top-0 z-30 shadow-sm">
          <button onClick={() => setMobileOpen(true)} className="text-[#64748b] hover:text-[#0f172a] transition-colors" aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0818A8] flex items-center justify-center rounded-sm">
              <ShieldCheck size={12} className="text-white" />
            </div>
            <span className="text-[#0f172a] font-black text-[13px] uppercase tracking-[-0.01em]">R-Zone Admin</span>
          </div>
        </div>

        <main className="flex-1 p-5 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
