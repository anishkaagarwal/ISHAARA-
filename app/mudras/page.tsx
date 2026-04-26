"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";

interface Mudra {
  name: string;
  devanagari: string;
  meaning: string;
  classification: string;
  description: string;
  cultural_context: string;
  usage: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
}

const DIFFICULTY_COLORS = {
  beginner:     { bg: "rgba(0,201,167,0.08)",   border: "rgba(0,201,167,0.3)",   text: "#00C9A7" },
  intermediate: { bg: "rgba(255,153,51,0.08)",  border: "rgba(255,153,51,0.3)",  text: "#FF9933" },
  advanced:     { bg: "rgba(232,51,90,0.08)",   border: "rgba(232,51,90,0.3)",   text: "#E8335A" },
};

const MUDRA_EMOJIS: Record<string, string> = {
  Pataka: "🖐", Tripataka: "✋", Ardhapataka: "🤚", Kartarimukha: "✌️",
  Mayura: "🦚", Ardhachandra: "🌙", Arala: "🫰", Shukatunda: "🦜",
  Mushti: "✊", Shikhara: "☝️", Kapittha: "🤙", Katakamukha: "👌",
  Suchi: "👆", Chandrakala: "🌛", Padmakosha: "🪷", Sarpashire: "🐍",
  Mrigashirsha: "🦌", Simhamukha: "🦁", Kangula: "🔔", Alapadma: "🌸",
  Chatura: "💎", Bhramara: "🐝", Hamsasya: "🦢", Hamsapaksha: "🕊️",
  Sandamsha: "✂️", Mukula: "🌷", Tamrachuda: "🐓", Trishula: "🔱",
};

function MudraDetail({ mudra, onClose }: { mudra: Mudra; onClose: () => void }) {
  const diff = DIFFICULTY_COLORS[mudra.difficulty];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ background: "rgba(3,3,3,0.88)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card rounded-2xl max-w-lg w-full max-h-[82vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-4xl">{MUDRA_EMOJIS[mudra.name] ?? "🤲"}</span>
              <div>
                <h2 className="font-display text-3xl font-semibold text-[#FAFAFA]">{mudra.name}</h2>
                <p className="font-display text-lg text-[#555]">{mudra.devanagari}</p>
              </div>
            </div>
            <p className="text-xs font-mono text-[#FF9933] italic mt-1">"{mudra.meaning}"</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#555] hover:text-[#FAFAFA] text-2xl leading-none ml-4 flex-shrink-0 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[rgba(255,153,51,0.1)] border border-[rgba(255,153,51,0.25)] text-[#FF9933]">
            {mudra.classification}
          </span>
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full"
            style={{ background: diff.bg, border: `1px solid ${diff.border}`, color: diff.text }}
          >
            {mudra.difficulty}
          </span>
        </div>

        <div className="w-10 h-px mb-4" style={{ background: "linear-gradient(90deg, #FF9933, transparent)" }} />

        <p className="text-sm text-[#FAFAFA]/70 font-body leading-relaxed mb-4">{mudra.description}</p>

        <div className="space-y-3">
          {mudra.cultural_context.split("\n\n").filter(Boolean).map((para, i) => (
            <p key={i} className="text-sm text-[#FAFAFA]/65 font-body leading-relaxed">{para}</p>
          ))}
        </div>

        {mudra.usage && (
          <div className="mt-5 p-3 bg-[rgba(0,201,167,0.06)] border border-[rgba(0,201,167,0.18)] rounded-xl">
            <p className="text-[10px] font-mono text-[#00C9A7] mb-1 uppercase tracking-wider">Used in</p>
            <p className="text-sm text-[#FAFAFA]/65">{mudra.usage}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-5">
          {mudra.tags.map((t) => (
            <span
              key={t}
              className="text-xs font-mono text-[#555] bg-[rgba(255,255,255,0.04)] px-2.5 py-1 rounded-full"
            >
              #{t}
            </span>
          ))}
        </div>

        <Link
          href="/practice"
          className="mt-6 w-full flex items-center justify-center py-3 rounded-xl text-sm font-body font-semibold bg-[rgba(255,153,51,0.1)] border border-[rgba(255,153,51,0.3)] text-[#FF9933] hover:bg-[rgba(255,153,51,0.2)] transition-all"
        >
          Practice {mudra.name} →
        </Link>
      </motion.div>
    </div>
  );
}

function MudraGrid() {
  const [mudras, setMudras] = useState<Mudra[]>([]);
  const [selected, setSelected] = useState<Mudra | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const params = useSearchParams();

  useEffect(() => {
    fetch("http://localhost:8000/api/mudras")
      .then((r) => r.json())
      .then(setMudras)
      .catch(() => {/* backend may not be running yet */});
  }, []);

  useEffect(() => {
    const highlight = params.get("highlight");
    if (highlight && mudras.length) {
      const m = mudras.find((x) => x.name === highlight);
      if (m) setSelected(m);
    }
  }, [params, mudras]);

  const filtered = mudras.filter((m) => {
    const matchFilter = filter === "all" || m.difficulty === filter || m.classification === filter;
    const matchSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.meaning.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some((t) => t.includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <>
      {selected && <MudraDetail mudra={selected} onClose={() => setSelected(null)} />}

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search Mudras, meanings, tags…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 glass-card rounded-xl px-4 py-2.5 text-sm font-body text-[#FAFAFA] placeholder-[#444] outline-none focus:border-[rgba(255,153,51,0.4)] transition-colors"
        />
        <div className="flex gap-2">
          {["all", "beginner", "intermediate", "advanced"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-mono capitalize transition-all ${
                filter === f
                  ? "bg-[rgba(255,153,51,0.15)] border border-[rgba(255,153,51,0.4)] text-[#FF9933]"
                  : "bg-[#0A0A0A] border border-[rgba(255,153,51,0.08)] text-[#555] hover:text-[#FAFAFA]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {mudras.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-display text-2xl text-[#333] mb-2">Loading Mudras…</p>
          <p className="text-sm text-[#2A2A2A]">Make sure the backend is running on port 8000</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((m, index) => {
            const diff = DIFFICULTY_COLORS[m.difficulty];
            return (
              <motion.button
                key={m.name}
                type="button"
                onClick={() => setSelected(m)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.7), ease: [0.22, 1, 0.36, 1] }}
                className="group text-left glass-card rounded-xl p-4 hover:border-[rgba(255,153,51,0.35)] hover:bg-[rgba(255,153,51,0.04)] transition-all"
              >
                <div className="text-3xl mb-3">{MUDRA_EMOJIS[m.name] ?? "🤲"}</div>
                <h3 className="font-display text-base font-semibold text-[#FAFAFA] group-hover:text-[#FF9933] transition-colors leading-tight">
                  {m.name}
                </h3>
                <p className="font-display text-xs text-[#444] italic mt-0.5">{m.devanagari}</p>
                <p className="text-xs text-[#555] mt-1.5 font-body line-clamp-1">{m.meaning}</p>
                <div className="mt-3">
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{ background: diff.bg, border: `1px solid ${diff.border}`, color: diff.text }}
                  >
                    {m.difficulty}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </>
  );
}

export default function MudrasPage() {
  return (
    <div className="min-h-screen bg-[#030303]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[rgba(255,153,51,0.08)] backdrop-blur-sm bg-[rgba(3,3,3,0.8)] sticky top-0 z-50">
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl">🔔</span>
            <span className="font-display text-lg font-semibold text-[#FAFAFA] group-hover:text-[#FF9933] transition-colors">
              Ishaara
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-[#444]">
            <span>/</span>
            <span className="text-[#FF9933]">Mudra Library</span>
          </div>
        </div>
        <Link
          href="/practice"
          className="text-sm bg-[rgba(255,153,51,0.12)] border border-[rgba(255,153,51,0.35)] text-[#FF9933] px-5 py-2 rounded-full hover:bg-[rgba(255,153,51,0.22)] transition-all font-body font-medium"
        >
          Practice
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#444] mb-3">
            Classical Hasta Mudras
          </p>
          <h1 className="font-display text-5xl font-light text-[#FAFAFA] mb-3">
            28 Gestures of{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF9933, #E8650A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Meaning
            </span>
          </h1>
          <p className="text-[#555] font-body max-w-xl leading-relaxed">
            Each Mudra carries centuries of meaning — mythological, emotional, and poetic. Click
            any gesture to explore its history and significance in Kathak.
          </p>
        </div>

        <Suspense fallback={<p className="text-[#444]">Loading…</p>}>
          <MudraGrid />
        </Suspense>
      </main>
    </div>
  );
}
