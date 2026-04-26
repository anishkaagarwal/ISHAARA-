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

export default function MudraHistory() {
  const mudraHistory = useSessionStore((s) => s.mudraHistory);

  if (mudraHistory.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-2xl px-5 py-3"
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#555] mb-3">
        This Session
      </p>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {mudraHistory.map((name, i) => (
            <motion.div
              key={`${name}-${i}`}
              initial={{ opacity: 0, scale: 0.75, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-1.5 bg-[rgba(255,153,51,0.08)] border border-[rgba(255,153,51,0.2)] rounded-full px-3 py-1"
            >
              <span className="text-xs">{MUDRA_EMOJIS[name] ?? "🤲"}</span>
              <span className="text-xs font-mono text-[#FF9933]">{name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
