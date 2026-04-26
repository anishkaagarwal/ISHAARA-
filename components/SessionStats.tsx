"use client";

import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/sessionStore";

function useElapsed(startTime: number | null) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!startTime) { setElapsed(0); return; }
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(id);
  }, [startTime]);
  return elapsed;
}

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const COLOR_CLASSES: Record<string, string> = {
  saffron: "text-[#FF9933]",
  teal:    "text-[#00C9A7]",
  rose:    "text-[#E8335A]",
  muted:   "text-[#444444]",
};

function Stat({ label, value, colorKey = "saffron" }: { label: string; value: string; colorKey?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4">
      <span className={`text-lg font-mono font-bold ${COLOR_CLASSES[colorKey] ?? COLOR_CLASSES.saffron}`}>
        {value}
      </span>
      <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#444]">{label}</span>
    </div>
  );
}

export default function SessionStats() {
  const { sessionStartTime, mudrasDetected, getAccuracy, isStreaming, frameCount } =
    useSessionStore();
  const elapsed = useElapsed(isStreaming ? sessionStartTime : null);
  const accuracy = getAccuracy();
  const accuracyKey = accuracy > 80 ? "teal" : accuracy > 50 ? "saffron" : "rose";

  return (
    <div className="glass-card rounded-2xl px-2 py-3 border-[rgba(255,153,51,0.08)]">
      <div className="flex items-center justify-between divide-x divide-[rgba(255,153,51,0.08)]">
        <div className="flex-1 flex justify-center">
          <Stat label="Session" value={isStreaming ? fmt(elapsed) : "--:--"} />
        </div>
        <div className="flex-1 flex justify-center">
          <Stat label="Accuracy" value={isStreaming ? `${accuracy}%` : "--"} colorKey={accuracyKey} />
        </div>
        <div className="flex-1 flex justify-center">
          <Stat label="Mudras" value={mudrasDetected.toString()} colorKey="teal" />
        </div>
        <div className="flex-1 flex justify-center">
          <Stat label="Frames" value={isStreaming ? frameCount.toString() : "0"} colorKey="muted" />
        </div>
      </div>
    </div>
  );
}
