"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSessionStore } from "@/store/sessionStore";

export default function CulturalContext() {
  const { culturalContext, detectedMudra } = useSessionStore();
  const [expanded, setExpanded] = useState(false);
  const [displayMudra, setDisplayMudra] = useState("");

  useEffect(() => {
    if (culturalContext && detectedMudra && detectedMudra !== "Unknown") {
      setDisplayMudra(detectedMudra);
      setExpanded(false);
    }
  }, [culturalContext, detectedMudra]);

  const preview = culturalContext?.split("\n")[0] ?? "";
  const hasMore = culturalContext?.includes("\n");

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#555]">
          Cultural Context
        </p>
        {displayMudra && (
          <span className="text-xs text-[#FF9933] font-display italic">{displayMudra}</span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {culturalContext && displayMudra ? (
          <motion.div
            key={displayMudra}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Decorative saffron line */}
            <div
              className="w-10 h-px mb-3"
              style={{
                background: "linear-gradient(90deg, #FF9933, transparent)",
              }}
            />

            <div className="text-sm text-[#FAFAFA]/75 leading-relaxed font-body">
              <p>{preview}</p>

              <AnimatePresence>
                {expanded && hasMore && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 space-y-2">
                      {culturalContext
                        .split("\n")
                        .slice(1)
                        .filter(Boolean)
                        .map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {hasMore && (
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                className="mt-3 text-xs text-[#FF9933] hover:text-[#FFB347] transition-colors font-mono"
              >
                {expanded ? "Show less" : "Read more →"}
              </button>
            )}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-[#444] font-display italic font-light leading-relaxed"
          >
            Cultural history and significance will appear when a Mudra is detected.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
