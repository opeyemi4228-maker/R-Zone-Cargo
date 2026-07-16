"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { getContactMessages, markContactRead } from "../../../lib/adminAuth";

function fmt(iso) {
  if (!iso) return " ";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtTime(iso) {
  if (!iso) return " ";
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

const PILL = {
  Unread: "bg-amber-50 text-amber-700 border border-amber-200",
  Read:   "bg-gray-100 text-gray-500 border border-gray-200",
};

function StatusPill({ text }) {
  return (
    <span className={`inline-flex px-2 py-0.5 text-[11px] font-bold tracking-[0.06em] uppercase rounded-full ${PILL[text] || PILL.Read}`}>
      {text}
    </span>
  );
}

function MessageModal({ msg, onClose, onMarkRead }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative bg-white border border-[#e2e8f0] w-full max-w-[580px] max-h-[90vh] overflow-y-auto shadow-2xl rounded-sm"
        initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#f1f5f9] sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-[#0f172a] font-black text-[16px] uppercase tracking-[-0.01em]">{msg.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-[#64748b] text-[13px] font-medium">{msg.email}</span>
              {msg.phone && <span className="text-[#94a3b8] text-[12px]">· {msg.phone}</span>}
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            {msg.status === "Unread" && (
              <button onClick={() => onMarkRead(msg.id)}
                className="text-[11px] font-bold tracking-[0.08em] uppercase text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-sm transition-all duration-200">
                Mark Read
              </button>
            )}
            <button onClick={onClose} className="text-[#94a3b8] hover:text-[#0f172a] transition-colors" aria-label="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-3 border-b border-[#f1f5f9] bg-[#f8fafc]">
          {[
            ["Enquiry Type", msg.enquiryLabel || msg.enquiryType || " "],
            ["Subject",      msg.subject || " "],
            ["Received",     `${fmt(msg.submittedAt)} ${fmtTime(msg.submittedAt)}`],
          ].map(([label, val]) => (
            <div key={label} className="px-5 py-3.5 border-r border-[#f1f5f9] last:border-r-0">
              <p className="text-[#94a3b8] text-[10px] font-bold tracking-[0.16em] uppercase mb-1">{label}</p>
              <p className="text-[#0f172a] text-[13px] font-medium">{val}</p>
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="px-6 py-5">
          <p className="text-[#94a3b8] text-[10px] font-bold tracking-[0.16em] uppercase mb-3">Message</p>
          <p className="text-[#374151] text-[14px] font-normal leading-relaxed whitespace-pre-wrap break-words">
            {msg.message || " "}
          </p>
        </div>

        {/* Reply */}
        <div className="mx-6 mb-6 bg-blue-50 border border-blue-100 px-4 py-3 rounded-sm">
          <p className="text-[#475569] text-[12px] font-medium">
            Reply to:{" "}
            <a href={`mailto:${msg.email}`} className="text-[#0818A8] hover:text-[#0437F2] font-semibold transition-colors">
              {msg.email}
            </a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ContactsPage() {
  const [messages,  setMessages]  = useState([]);
  const [filter,    setFilter]    = useState("All");
  const [search,    setSearch]    = useState("");
  const [selected,  setSelected]  = useState(null);
  const [sortAsc,   setSortAsc]   = useState(false);

  useEffect(() => {
    let active = true;
    getContactMessages().then(m => { if (active) setMessages(m); });
    return () => { active = false; };
  }, []);

  const handleMarkRead = async (id) => {
    setMessages(m => m.map(c => c.id === id ? { ...c, status: "Read" } : c));
    if (selected?.id === id) setSelected(s => ({ ...s, status: "Read" }));
    try {
      await markContactRead(id);
    } catch {
      getContactMessages().then(setMessages); // re-sync if the update failed
    }
  };

  const handleOpen = (msg) => {
    setSelected(msg);
    if (msg.status === "Unread") handleMarkRead(msg.id);
  };

  const filtered = messages
    .filter(m => filter === "All" || m.status === filter)
    .filter(m => {
      if (!search.trim()) return true;
      const s = search.toLowerCase();
      return (
        m.name?.toLowerCase().includes(s) ||
        m.email?.toLowerCase().includes(s) ||
        m.subject?.toLowerCase().includes(s) ||
        m.message?.toLowerCase().includes(s) ||
        (m.enquiryLabel || m.enquiryType || "").toLowerCase().includes(s)
      );
    })
    .sort((a, b) => sortAsc
      ? new Date(a.submittedAt) - new Date(b.submittedAt)
      : new Date(b.submittedAt) - new Date(a.submittedAt));

  const unreadCount = messages.filter(m => m.status === "Unread").length;

  return (
    <div className="max-w-[1200px] mx-auto">

      {/* Header */}
      <motion.div className="mb-7" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare size={13} className="text-amber-500" aria-hidden="true" />
          <span className="text-amber-600 text-[11px] font-bold tracking-[0.2em] uppercase">Inbox</span>
        </div>
        <h1 className="text-[#0f172a] font-black text-[28px] sm:text-[32px] tracking-[-0.02em] uppercase leading-none">
          Contact Messages
        </h1>
        <p className="text-[#64748b] text-[13px] font-medium mt-2">
          {messages.length} total · {unreadCount} unread
        </p>
      </motion.div>

      {/* Toolbar */}
      <motion.div className="flex flex-col sm:flex-row gap-3 mb-5"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" aria-hidden="true" />
          <input type="search" placeholder="Search by name, email, subject…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-[#e2e8f0] text-[#0f172a] placeholder-[#94a3b8] text-[13px] pl-9 pr-4 py-2.5 outline-none focus:border-[#0818A8] focus:ring-2 focus:ring-[#0818A8]/10 rounded-sm transition-all duration-200 shadow-sm" />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-[#94a3b8]" aria-hidden="true" />
          {["All", "Unread", "Read"].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3.5 py-2 text-[11px] font-bold tracking-[0.08em] uppercase rounded-sm transition-all duration-200 ${
                filter === s
                  ? "bg-[#0818A8] text-white shadow-sm"
                  : "bg-white border border-[#e2e8f0] text-[#64748b] hover:text-[#0f172a] hover:border-[#cbd5e1] shadow-sm"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div className="bg-white border border-[#e2e8f0] rounded-sm shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#94a3b8]">
            <MessageSquare size={32} className="mb-3 opacity-30" aria-hidden="true" />
            <p className="text-[14px] font-semibold text-[#64748b]">
              {messages.length === 0 ? "No contact messages yet" : "No results match your filters"}
            </p>
            <p className="text-[12px] mt-1">
              {messages.length === 0 ? "Submissions from /contact will appear here" : "Try adjusting the search or filter"}
            </p>
          </div>
        ) : (
          <>
            <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_100px_80px] gap-4 px-5 py-3 border-b border-[#f1f5f9] bg-[#f8fafc]">
              {["Sender", "Enquiry / Subject", "Preview", "Date", "Status"].map((col, i) => (
                <button key={col}
                  onClick={() => i === 3 ? setSortAsc(v => !v) : undefined}
                  className={`text-[10px] font-bold tracking-[0.16em] uppercase text-[#94a3b8] text-left flex items-center gap-1 ${i === 3 ? "hover:text-[#475569] cursor-pointer" : "cursor-default"}`}>
                  {col}
                  {i === 3 && (sortAsc ? <ChevronUp size={10} /> : <ChevronDown size={10} />)}
                </button>
              ))}
            </div>

            <div className="divide-y divide-[#f8fafc]">
              {filtered.map(m => (
                <motion.button key={m.id} onClick={() => handleOpen(m)}
                  className={`w-full text-left px-5 py-4 hover:bg-[#f8fafc] transition-colors duration-150 grid sm:grid-cols-[1fr_1fr_1fr_100px_80px] gap-3 sm:gap-4 items-start sm:items-center ${m.status === "Unread" ? "bg-amber-50/40" : ""}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="min-w-0">
                    <p className={`text-[13px] font-semibold truncate ${m.status === "Unread" ? "text-[#0f172a]" : "text-[#374151]"}`}>{m.name}</p>
                    <p className="text-[#94a3b8] text-[11px] font-medium mt-0.5 truncate">{m.email}</p>
                  </div>
                  <div className="min-w-0 hidden sm:block">
                    <p className="text-[#374151] text-[13px] font-medium truncate">{m.enquiryLabel || m.enquiryType || " "}</p>
                    <p className="text-[#94a3b8] text-[11px] mt-0.5 truncate">{m.subject || " "}</p>
                  </div>
                  <p className="text-[#94a3b8] text-[12px] truncate hidden sm:block leading-relaxed">
                    {m.message ? m.message.slice(0, 55) + (m.message.length > 55 ? "…" : "") : " "}
                  </p>
                  <p className="text-[#94a3b8] text-[12px] font-medium hidden sm:block">{fmt(m.submittedAt)}</p>
                  <div><StatusPill text={m.status} /></div>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <MessageModal msg={selected} onClose={() => setSelected(null)} onMarkRead={handleMarkRead} />
        )}
      </AnimatePresence>
    </div>
  );
}
