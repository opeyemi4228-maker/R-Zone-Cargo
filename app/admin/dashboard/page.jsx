"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText, MessageSquare, Users, ChevronRight, Activity,
} from "lucide-react";
import {
  getQuoteRequests, getContactMessages, getSubscribers, getAdminSession,
} from "../../../lib/adminAuth";

function fmt(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function StatCard({ label, value, sub, subColor, icon: Icon, iconBg, iconColor, href, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <Link href={href}
        className="group flex flex-col gap-5 bg-white border border-[#e2e8f0] hover:border-[#0818A8]/30 hover:shadow-md shadow-sm p-6 rounded-sm transition-all duration-200">
        <div className="flex items-start justify-between">
          <div className={`w-10 h-10 flex items-center justify-center rounded-sm ${iconBg}`}>
            <Icon size={18} className={iconColor} />
          </div>
          <ChevronRight size={14} className="text-[#cbd5e1] group-hover:text-[#0818A8] transition-colors mt-1" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[#0f172a] font-black text-[34px] leading-none tracking-[-0.03em] tabular-nums">
            {value}
          </p>
          <p className="text-[#64748b] text-[12px] font-semibold uppercase tracking-[0.12em] mt-2">
            {label}
          </p>
          {sub && (
            <p className={`text-[12px] font-medium mt-1 ${subColor}`}>{sub}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

function StatusPill({ text }) {
  const styles = {
    New:       "bg-blue-50 text-blue-700 border border-blue-200",
    Unread:    "bg-amber-50 text-amber-700 border border-amber-200",
    Read:      "bg-gray-100 text-gray-500 border border-gray-200",
    Contacted: "bg-green-50 text-green-700 border border-green-200",
    Closed:    "bg-gray-100 text-gray-500 border border-gray-200",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 text-[11px] font-bold tracking-[0.06em] uppercase rounded-full ${styles[text] || styles.Read}`}>
      {text}
    </span>
  );
}

export default function AdminDashboard() {
  const [quotes,   setQuotes]   = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subs,     setSubs]     = useState([]);
  const [session,  setSession]  = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const [q, c, s, sess] = await Promise.all([
        getQuoteRequests(),
        getContactMessages(),
        getSubscribers(),
        getAdminSession(),
      ]);
      if (!active) return;
      setQuotes(q);
      setContacts(c);
      setSubs(s);
      setSession(sess);
    })();
    return () => { active = false; };
  }, []);

  const newQuotes  = quotes.filter(q => q.status === "New").length;
  const unreadMsgs = contacts.filter(c => c.status === "Unread").length;
  const todaySubs  = subs.filter(s => s.subscribedAt?.slice(0, 10) === new Date().toISOString().slice(0, 10)).length;

  return (
    <div className="max-w-[1200px] mx-auto">

      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-2 mb-1">
          <Activity size={13} className="text-[#0818A8]" aria-hidden="true" />
          <span className="text-[#0818A8] text-[11px] font-bold tracking-[0.2em] uppercase">Live Overview</span>
        </div>
        <h1 className="text-[#0f172a] font-black text-[28px] sm:text-[32px] tracking-[-0.02em] uppercase leading-none">
          Dashboard
        </h1>
        {session && (
          <p className="text-[#64748b] text-[13px] font-medium mt-2">
            Signed in as <span className="text-[#0f172a] font-semibold">{session.email}</span>
            {" · "}Last login {fmt(session.loginAt)} at {fmtTime(session.loginAt)}
          </p>
        )}
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
        <StatCard delay={0.05} label="Quote Requests" value={quotes.length}
          sub={newQuotes > 0 ? `${newQuotes} new` : "All reviewed"}
          subColor={newQuotes > 0 ? "text-blue-600" : "text-[#94a3b8]"}
          icon={FileText} iconBg="bg-blue-50" iconColor="text-[#0818A8]" href="/admin/quotes" />
        <StatCard delay={0.1} label="Contact Messages" value={contacts.length}
          sub={unreadMsgs > 0 ? `${unreadMsgs} unread` : "All read"}
          subColor={unreadMsgs > 0 ? "text-amber-600" : "text-[#94a3b8]"}
          icon={MessageSquare} iconBg="bg-amber-50" iconColor="text-amber-600" href="/admin/contacts" />
        <StatCard delay={0.15} label="Subscribers" value={subs.length}
          sub={todaySubs > 0 ? `+${todaySubs} today` : "No new today"}
          subColor={todaySubs > 0 ? "text-emerald-600" : "text-[#94a3b8]"}
          icon={Users} iconBg="bg-emerald-50" iconColor="text-emerald-600" href="/admin/subscribers" />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Recent quotes */}
        <motion.div className="bg-white border border-[#e2e8f0] rounded-sm shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f1f5f9]">
            <h2 className="text-[#0f172a] font-black text-[13px] tracking-[0.08em] uppercase flex items-center gap-2">
              <FileText size={13} className="text-[#0818A8]" aria-hidden="true" />
              Recent Quotes
            </h2>
            <Link href="/admin/quotes" className="text-[#0818A8] text-[11px] font-bold tracking-[0.1em] uppercase hover:text-[#0437F2] transition-colors flex items-center gap-1">
              View all <ChevronRight size={10} />
            </Link>
          </div>
          {quotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-[#94a3b8]">
              <FileText size={28} className="mb-3 opacity-40" aria-hidden="true" />
              <p className="text-[13px] font-semibold text-[#64748b]">No quote requests yet</p>
              <p className="text-[12px] mt-1">Submissions from /quote will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-[#f8fafc]">
              {quotes.slice(0, 5).map(q => (
                <div key={q.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#f8fafc] transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="text-[#0f172a] text-[13px] font-semibold truncate">{q.firstName} {q.lastName}</p>
                    <p className="text-[#94a3b8] text-[11px] font-medium mt-0.5 truncate">{q.service || "—"} · {q.direction || "—"}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                    <span className="text-[#94a3b8] text-[11px] font-medium hidden sm:block">{fmt(q.submittedAt)}</span>
                    <StatusPill text={q.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent contacts */}
        <motion.div className="bg-white border border-[#e2e8f0] rounded-sm shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.25 }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f1f5f9]">
            <h2 className="text-[#0f172a] font-black text-[13px] tracking-[0.08em] uppercase flex items-center gap-2">
              <MessageSquare size={13} className="text-amber-500" aria-hidden="true" />
              Recent Messages
            </h2>
            <Link href="/admin/contacts" className="text-[#0818A8] text-[11px] font-bold tracking-[0.1em] uppercase hover:text-[#0437F2] transition-colors flex items-center gap-1">
              View all <ChevronRight size={10} />
            </Link>
          </div>
          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-[#94a3b8]">
              <MessageSquare size={28} className="mb-3 opacity-40" aria-hidden="true" />
              <p className="text-[13px] font-semibold text-[#64748b]">No contact messages yet</p>
              <p className="text-[12px] mt-1">Submissions from /contact will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-[#f8fafc]">
              {contacts.slice(0, 5).map(c => (
                <div key={c.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#f8fafc] transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="text-[#0f172a] text-[13px] font-semibold truncate">{c.name}</p>
                    <p className="text-[#94a3b8] text-[11px] font-medium mt-0.5 truncate">{c.enquiryLabel || c.enquiryType || "—"} · {c.subject || "—"}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                    <span className="text-[#94a3b8] text-[11px] font-medium hidden sm:block">{fmt(c.submittedAt)}</span>
                    <StatusPill text={c.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent subscribers */}
      {subs.length > 0 && (
        <motion.div className="mt-5 bg-white border border-[#e2e8f0] rounded-sm shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.3 }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f1f5f9]">
            <h2 className="text-[#0f172a] font-black text-[13px] tracking-[0.08em] uppercase flex items-center gap-2">
              <Users size={13} className="text-emerald-500" aria-hidden="true" />
              Recent Subscribers
            </h2>
            <Link href="/admin/subscribers" className="text-[#0818A8] text-[11px] font-bold tracking-[0.1em] uppercase hover:text-[#0437F2] transition-colors flex items-center gap-1">
              View all <ChevronRight size={10} />
            </Link>
          </div>
          <div className="flex flex-wrap divide-x divide-[#f1f5f9]">
            {subs.slice(0, 6).map(s => (
              <div key={s.id} className="px-5 py-3.5 min-w-0">
                <p className="text-[#0f172a] text-[13px] font-medium truncate max-w-[200px]">{s.email}</p>
                <p className="text-[#94a3b8] text-[11px] mt-0.5">{fmt(s.subscribedAt)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
