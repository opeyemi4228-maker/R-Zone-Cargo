"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, ChevronDown, ChevronUp, Search, Filter } from "lucide-react";
import { getQuoteRequests, updateQuoteStatus } from "../../../lib/adminAuth";

function fmt(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

const STATUS_OPTIONS = ["All", "New", "Contacted", "Closed"];

const PILL = {
  New:       "bg-blue-50 text-blue-700 border border-blue-200",
  Contacted: "bg-green-50 text-green-700 border border-green-200",
  Closed:    "bg-gray-100 text-gray-500 border border-gray-200",
};

function StatusPill({ text }) {
  return (
    <span className={`inline-flex px-2 py-0.5 text-[11px] font-bold tracking-[0.06em] uppercase rounded-full ${PILL[text] || PILL.Closed}`}>
      {text}
    </span>
  );
}

function DetailModal({ quote, onClose, onStatusChange }) {
  const rows = [
    ["Service",          quote.service || "—"],
    ["Cargo Type",       quote.cargoType || "—"],
    ["Weight",           quote.weight ? `${quote.weight} kg` : "—"],
    ["Items",            quote.items || "—"],
    ["Cargo Value",      quote.cargoValue || "—"],
    ["Direction",        quote.direction || "—"],
    ["From",             quote.fromCity || "—"],
    ["To State",         quote.toState || "—"],
    ["Collection",       quote.collection || "—"],
    ["Target Date",      quote.targetDate || "—"],
    ["Delivery Address", quote.deliveryAddress || "—"],
    ["Company",          quote.company || "—"],
    ["Source",           quote.source || "—"],
    ["Notes",            quote.notes || "—"],
    ["Submitted",        fmt(quote.submittedAt)],
  ];

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative bg-white border border-[#e2e8f0] w-full max-w-[620px] max-h-[90vh] overflow-y-auto shadow-2xl rounded-sm"
        initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#f1f5f9] sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-[#0f172a] font-black text-[16px] uppercase tracking-[-0.01em]">
              {quote.firstName} {quote.lastName}
            </h2>
            <p className="text-[#64748b] text-[13px] font-medium mt-0.5">{quote.email} · {quote.phone}</p>
          </div>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#0f172a] transition-colors ml-4 mt-0.5 flex-shrink-0" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#f1f5f9] bg-[#f8fafc]">
          <span className="text-[#64748b] text-[12px] font-bold tracking-[0.12em] uppercase">Status</span>
          <div className="flex gap-2 flex-wrap">
            {["New", "Contacted", "Closed"].map(s => (
              <button key={s} onClick={() => onStatusChange(quote.id, s)}
                className={`px-3 py-1 text-[11px] font-bold tracking-[0.06em] uppercase transition-all duration-200 rounded-full border ${
                  quote.status === s ? PILL[s] : "border-[#e2e8f0] text-[#94a3b8] hover:border-[#cbd5e1] hover:text-[#475569]"
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {rows.map(([label, val]) => (
            <div key={label} className={label === "Notes" || label === "Delivery Address" ? "sm:col-span-2" : ""}>
              <p className="text-[#94a3b8] text-[10px] font-bold tracking-[0.18em] uppercase mb-1">{label}</p>
              <p className="text-[#0f172a] text-[13px] font-medium leading-relaxed break-words">{val}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function QuotesPage() {
  const [quotes,   setQuotes]   = useState([]);
  const [filter,   setFilter]   = useState("All");
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState(null);
  const [sortAsc,  setSortAsc]  = useState(false);

  useEffect(() => {
    let active = true;
    getQuoteRequests().then(q => { if (active) setQuotes(q); });
    return () => { active = false; };
  }, []);

  const handleStatusChange = async (id, status) => {
    setQuotes(q => q.map(r => r.id === id ? { ...r, status } : r));
    if (selected?.id === id) setSelected(s => ({ ...s, status }));
    try {
      await updateQuoteStatus(id, status);
    } catch {
      getQuoteRequests().then(setQuotes); // re-sync if the update failed
    }
  };

  const filtered = quotes
    .filter(q => filter === "All" || q.status === filter)
    .filter(q => {
      if (!search.trim()) return true;
      const s = search.toLowerCase();
      return (
        `${q.firstName} ${q.lastName}`.toLowerCase().includes(s) ||
        q.email?.toLowerCase().includes(s) ||
        q.phone?.toLowerCase().includes(s) ||
        q.service?.toLowerCase().includes(s) ||
        q.direction?.toLowerCase().includes(s)
      );
    })
    .sort((a, b) => sortAsc
      ? new Date(a.submittedAt) - new Date(b.submittedAt)
      : new Date(b.submittedAt) - new Date(a.submittedAt));

  return (
    <div className="max-w-[1200px] mx-auto">

      {/* Header */}
      <motion.div className="mb-7" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-2 mb-1">
          <FileText size={13} className="text-[#0818A8]" aria-hidden="true" />
          <span className="text-[#0818A8] text-[11px] font-bold tracking-[0.2em] uppercase">Submissions</span>
        </div>
        <h1 className="text-[#0f172a] font-black text-[28px] sm:text-[32px] tracking-[-0.02em] uppercase leading-none">
          Quote Requests
        </h1>
        <p className="text-[#64748b] text-[13px] font-medium mt-2">
          {quotes.length} total · {quotes.filter(q => q.status === "New").length} new
        </p>
      </motion.div>

      {/* Toolbar */}
      <motion.div className="flex flex-col sm:flex-row gap-3 mb-5"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" aria-hidden="true" />
          <input type="search" placeholder="Search by name, email, service…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-[#e2e8f0] text-[#0f172a] placeholder-[#94a3b8] text-[13px] pl-9 pr-4 py-2.5 outline-none focus:border-[#0818A8] focus:ring-2 focus:ring-[#0818A8]/10 rounded-sm transition-all duration-200 shadow-sm" />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-[#94a3b8]" aria-hidden="true" />
          {STATUS_OPTIONS.map(s => (
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
            <FileText size={32} className="mb-3 opacity-30" aria-hidden="true" />
            <p className="text-[14px] font-semibold text-[#64748b]">
              {quotes.length === 0 ? "No quote requests yet" : "No results match your filters"}
            </p>
            <p className="text-[12px] mt-1">
              {quotes.length === 0 ? "Submissions from /quote will appear here" : "Try adjusting the search or filter"}
            </p>
          </div>
        ) : (
          <>
            <div className="hidden sm:grid grid-cols-[1fr_1fr_100px_100px_90px] gap-4 px-5 py-3 border-b border-[#f1f5f9] bg-[#f8fafc]">
              {["Name / Contact", "Service & Route", "Weight", "Date", "Status"].map((col, i) => (
                <button key={col}
                  onClick={() => i === 3 ? setSortAsc(v => !v) : undefined}
                  className={`text-[10px] font-bold tracking-[0.16em] uppercase text-[#94a3b8] text-left flex items-center gap-1 ${i === 3 ? "hover:text-[#475569] cursor-pointer" : "cursor-default"}`}>
                  {col}
                  {i === 3 && (sortAsc ? <ChevronUp size={10} /> : <ChevronDown size={10} />)}
                </button>
              ))}
            </div>

            <div className="divide-y divide-[#f8fafc]">
              {filtered.map(q => (
                <motion.button key={q.id} onClick={() => setSelected(q)}
                  className="w-full text-left px-5 py-4 hover:bg-[#f8fafc] transition-colors duration-150 grid sm:grid-cols-[1fr_1fr_100px_100px_90px] gap-3 sm:gap-4 items-start sm:items-center"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="min-w-0">
                    <p className="text-[#0f172a] text-[13px] font-semibold truncate">{q.firstName} {q.lastName}</p>
                    <p className="text-[#94a3b8] text-[11px] font-medium mt-0.5 truncate">{q.email}</p>
                    <p className="text-[#94a3b8] text-[11px] mt-0.5 truncate sm:hidden">{fmt(q.submittedAt)}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#374151] text-[13px] font-medium truncate">{q.service || "—"}</p>
                    <p className="text-[#94a3b8] text-[11px] mt-0.5 truncate">{q.direction || "—"}</p>
                  </div>
                  <p className="text-[#374151] text-[13px] font-medium hidden sm:block">{q.weight ? `${q.weight} kg` : "—"}</p>
                  <p className="text-[#94a3b8] text-[12px] font-medium hidden sm:block">{fmt(q.submittedAt)}</p>
                  <div><StatusPill text={q.status} /></div>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <DetailModal quote={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />
        )}
      </AnimatePresence>
    </div>
  );
}
