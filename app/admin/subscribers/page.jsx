"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Trash2, Download, ChevronDown, ChevronUp } from "lucide-react";
import { getSubscribers, deleteSubscriber } from "../../../lib/adminAuth";

function fmt(iso) {
  if (!iso) return " ";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtTime(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export default function SubscribersPage() {
  const [subs,    setSubs]    = useState([]);
  const [search,  setSearch]  = useState("");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    let active = true;
    getSubscribers().then(s => { if (active) setSubs(s); });
    return () => { active = false; };
  }, []);

  const handleDelete = async (id) => {
    const prev = subs;
    setSubs(s => s.filter(x => x.id !== id));
    try {
      await deleteSubscriber(id);
    } catch {
      setSubs(prev); // restore on failure
    }
  };

  const filtered = subs
    .filter(s => !search.trim() || s.email.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortAsc
      ? new Date(a.subscribedAt) - new Date(b.subscribedAt)
      : new Date(b.subscribedAt) - new Date(a.subscribedAt));

  const handleExport = () => {
    const csv = ["Email,Date Subscribed,Time",
      ...filtered.map(s => `${s.email},${fmt(s.subscribedAt)},${fmtTime(s.subscribedAt)}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "rzone-subscribers.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const todayCount  = subs.filter(s => s.subscribedAt?.slice(0, 10) === new Date().toISOString().slice(0, 10)).length;
  const monthCount  = subs.filter(s => s.subscribedAt?.slice(0, 7) === new Date().toISOString().slice(0, 7)).length;

  const byMonth = subs.reduce((acc, s) => {
    const month = s.subscribedAt?.slice(0, 7) || "unknown";
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  const monthEntries = Object.entries(byMonth).sort(([a], [b]) => a.localeCompare(b)).slice(-6);
  const maxMonthVal  = Math.max(...monthEntries.map(([, v]) => v), 1);

  return (
    <div className="max-w-[1000px] mx-auto">

      {/* Header */}
      <motion.div className="mb-7" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-2 mb-1">
          <Users size={13} className="text-emerald-600" aria-hidden="true" />
          <span className="text-emerald-600 text-[11px] font-bold tracking-[0.2em] uppercase">Newsletter</span>
        </div>
        <h1 className="text-[#0f172a] font-black text-[28px] sm:text-[32px] tracking-[-0.02em] uppercase leading-none">
          Subscribers
        </h1>
        <p className="text-[#64748b] text-[13px] font-medium mt-2">
          {subs.length} total · {todayCount > 0 ? `+${todayCount} today` : "None today"}
        </p>
      </motion.div>

      {/* Stats */}
      {subs.length > 0 && (
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>

          <div className="bg-white border border-[#e2e8f0] rounded-sm shadow-sm p-5">
            <p className="text-[#94a3b8] text-[10px] font-bold tracking-[0.16em] uppercase mb-2">Total Subscribers</p>
            <p className="text-[#0f172a] font-black text-[36px] tracking-[-0.03em] leading-none">{subs.length}</p>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-sm shadow-sm p-5">
            <p className="text-[#94a3b8] text-[10px] font-bold tracking-[0.16em] uppercase mb-2">This Month</p>
            <p className="text-[#0f172a] font-black text-[36px] tracking-[-0.03em] leading-none">{monthCount}</p>
          </div>

          {/* Mini bar chart */}
          <div className="bg-white border border-[#e2e8f0] rounded-sm shadow-sm p-5">
            <p className="text-[#94a3b8] text-[10px] font-bold tracking-[0.16em] uppercase mb-3">Growth (last 6 months)</p>
            <div className="flex items-end gap-1.5 h-10">
              {monthEntries.map(([month, count]) => (
                <div key={month} className="flex-1 flex flex-col items-center">
                  <motion.div
                    className="w-full bg-[#0818A8]/20 hover:bg-[#0818A8]/50 transition-colors duration-200 rounded-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${(count / maxMonthVal) * 100}%` }}
                    transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                    title={`${month}: ${count}`}
                    style={{ minHeight: "4px" }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-1.5 mt-1.5">
              {monthEntries.map(([month]) => (
                <div key={month} className="flex-1 text-center">
                  <span className="text-[#cbd5e1] text-[8px] font-medium">{month.slice(5)}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Toolbar */}
      <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }}>
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" aria-hidden="true" />
          <input type="search" placeholder="Search email address…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-[#e2e8f0] text-[#0f172a] placeholder-[#94a3b8] text-[13px] pl-9 pr-4 py-2.5 outline-none focus:border-[#0818A8] focus:ring-2 focus:ring-[#0818A8]/10 rounded-sm transition-all duration-200 shadow-sm" />
        </div>
        {filtered.length > 0 && (
          <button onClick={handleExport}
            className="flex items-center gap-2 bg-white border border-[#e2e8f0] hover:border-[#0818A8]/40 hover:text-[#0818A8] text-[#475569] text-[12px] font-bold tracking-[0.08em] uppercase px-4 py-2.5 rounded-sm shadow-sm transition-all duration-200">
            <Download size={12} aria-hidden="true" />
            Export CSV
          </button>
        )}
      </motion.div>

      {/* Table */}
      <motion.div className="bg-white border border-[#e2e8f0] rounded-sm shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#94a3b8]">
            <Users size={32} className="mb-3 opacity-30" aria-hidden="true" />
            <p className="text-[14px] font-semibold text-[#64748b]">
              {subs.length === 0 ? "No subscribers yet" : "No emails match your search"}
            </p>
            <p className="text-[12px] mt-1">
              {subs.length === 0 ? "Newsletter sign-ups from the footer will appear here" : "Try a different search term"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[1fr_160px_44px] gap-4 px-5 py-3 border-b border-[#f1f5f9] bg-[#f8fafc]">
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#94a3b8]">Email Address</span>
              <button onClick={() => setSortAsc(v => !v)}
                className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#94a3b8] hover:text-[#475569] flex items-center gap-1 cursor-pointer text-left transition-colors">
                Subscribed
                {sortAsc ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
              </button>
              <span />
            </div>

            <div className="divide-y divide-[#f8fafc]">
              {filtered.map((s, i) => (
                <motion.div key={s.id}
                  className="grid grid-cols-[1fr_160px_44px] gap-4 px-5 py-3.5 items-center hover:bg-[#f8fafc] transition-colors duration-150"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}>
                  <p className="text-[#0f172a] text-[13px] font-medium truncate">{s.email}</p>
                  <div>
                    <p className="text-[#374151] text-[12px] font-semibold">{fmt(s.subscribedAt)}</p>
                    <p className="text-[#94a3b8] text-[11px]">{fmtTime(s.subscribedAt)}</p>
                  </div>
                  <button onClick={() => handleDelete(s.id)}
                    className="w-8 h-8 flex items-center justify-center text-[#cbd5e1] hover:text-red-500 hover:bg-red-50 rounded-sm transition-all duration-200 ml-auto"
                    aria-label={`Remove ${s.email}`}>
                    <Trash2 size={13} />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="px-5 py-3 border-t border-[#f1f5f9] bg-[#f8fafc]">
              <p className="text-[#94a3b8] text-[11px] font-medium">
                Showing {filtered.length} of {subs.length} subscriber{subs.length !== 1 ? "s" : ""}
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
