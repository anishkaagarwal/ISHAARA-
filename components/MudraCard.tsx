"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSessionStore } from "@/store/sessionStore";

const MUDRA_EMOJIS: Record<string, string> = {
  Pataka: "🖐", Tripataka: "✋", Ardhapataka: "🤚", Kartarimukha: "✌️",
  Mayura: "🦚", Ardhachandra: "🌙", Arala: "🫰", Shukatunda: "🦜",
  Mushti: "✊", Shikhara: "☝️", Kapittha: "🤙", Katakamukha: "👌",
  Suchi: "👆", Chandrakala: "🌛", Padmakosha: "🪷", Sarpashire: "🐍",
  Mrigashirsha: "🦌", Simhamukha: "🦁", Kangula: "🔔", Alapadma: "🌸",
  Chatura: "💎", Bhramara: "🐝", Hamsasya: "🦢", Hamsapaksha: "🕊️",
  Sandamsha: "✂️", Mukula: "🌷", Tamrachuda: "🐓", Trishula: "🔱",
};

function confidenceColor(pct: number) {
  if (pct > 80) return "#00C9A7";
  if (pct > 50) return "#FF9933";
  return "#E8335A";
}

function ConfidenceRing({ confidence }: { confidence: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - confidence);
  const color = confidenceColor(Math.round(confidence * 100));

  return (
    <svg
      width="100"
      height="100"
      className="absolute inset-0 m-auto"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.4s ease, stroke 0.3s", filter: `drop-shadow(0 0 6px ${color}60)` }}
      />
    </svg>
  );
}

export default function MudraCard() {
  const { detectedMudra, confidence, isStreaming } = useSessionStore();
  const emoji = MUDRA_EMOJIS[detectedMudra] ?? "🤲";
  const pct = Math.round(confidence * 100);
  const color = confidenceColor(pct);

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#555] mb-4">
        Detected Mudra
      </p>

      <AnimatePresence mode="wait">
        {detectedMudra && detectedMudra !== "Unknown" ? (
          <motion.div
            key={detectedMudra}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="relative w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center">
              <ConfidenceRing confidence={confidence} />
              <span className="text-4xl relative z-10">{emoji}</span>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-display text-3xl font-semibold text-[#FAFAFA] leading-tight truncate">
                {detectedMudra}
              </h2>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-mono font-bold" style={{ color }}>
                  {pct}%
                </span>
                <span className="text-xs text-[#555]">confidence</span>
              </div>

              <div className="mt-3 h-1 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color, boxShadow: `0 0 8px ${color}80` }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-[100px] flex items-center">
            <p className="text-[#555] font-display text-xl font-light">
              {isStreaming ? "Detecting gesture…" : "Start practice to detect Mudras"}
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
