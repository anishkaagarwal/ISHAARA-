"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSessionStore, type Correction } from "@/store/sessionStore";

const SEVERITY_CONFIG = {
  critical: {
    dot: "#E8335A",
    bg: "rgba(232,51,90,0.07)",
    border: "rgba(232,51,90,0.22)",
    label: "Critical",
  },
  medium: {
    dot: "#FF9933",
    bg: "rgba(255,153,51,0.07)",
    border: "rgba(255,153,51,0.22)",
    label: "Adjust",
  },
};

function CorrectionItem({ correction, index }: { correction: Correction; index: number }) {
  const cfg = SEVERITY_CONFIG[correction.severity];
  return (
    <motion.div
      key={`${correction.joint}-${correction.angle_diff}`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ delay: index * 0.06 }}
      className="flex items-start gap-3 p-3 rounded-xl"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      <span
        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
        style={{ background: cfg.dot, boxShadow: `0 0 6px ${cfg.dot}80` }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-mono text-[#555] mb-0.5 uppercase tracking-wider">
          {cfg.label}
        </p>
        <p className="text-sm text-[#FAFAFA]/80 leading-snug">{correction.message}</p>
      </div>
      <span className="text-xs font-mono flex-shrink-0 mt-0.5" style={{ color: cfg.dot }}>
        {correction.angle_diff}°
      </span>
    </motion.div>
  );
}

export default function CorrectionPanel() {
  const { corrections, detectedMudra } = useSessionStore();
  const hasCorrections = corrections.length > 0;

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#555]">
          Real-time Corrections
        </p>
        {hasCorrections && (
          <span className="text-xs font-mono text-[#FF9933] bg-[rgba(255,153,51,0.1)] px-2.5 py-0.5 rounded-full border border-[rgba(255,153,51,0.2)]">
            {corrections.length} found
          </span>
        )}
      </div>

      <div className="space-y-2 min-h-[80px]">
        <AnimatePresence mode="popLayout">
          {hasCorrections ? (
            corrections.map((c, i) => (
              <CorrectionItem key={`${c.joint}-${i}`} correction={c} index={i} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{
                background: "rgba(0,201,167,0.06)",
                border: "1px solid rgba(0,201,167,0.2)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "#00C9A7", boxShadow: "0 0 6px #00C9A780" }}
              />
              <p className="text-sm text-[#00C9A7]">
                {detectedMudra && detectedMudra !== "Unknown"
                  ? "Form looks good — hold steady"
                  : "Corrections will appear here"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
