"use client";

import Link from "next/link";
import VideoCanvas from "@/components/VideoCanvas";
import MudraCard from "@/components/MudraCard";
import CorrectionPanel from "@/components/CorrectionPanel";
import CulturalContext from "@/components/CulturalContext";
import SessionStats from "@/components/SessionStats";
import MudraHistory from "@/components/MudraHistory";
import { useSessionStore } from "@/store/sessionStore";

function ConnectionBadge() {
  const isConnected = useSessionStore((s) => s.isConnected);
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full ${
          isConnected
            ? "bg-[#00C9A7] [box-shadow:0_0_6px_rgba(0,201,167,0.6)] animate-pulse"
            : "bg-[#E8335A]"
        }`}
      />
      <span className="text-[10px] font-mono text-[#555] uppercase tracking-wider">
        {isConnected ? "Connected" : "Reconnecting…"}
      </span>
    </div>
  );
}

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-[#030303] flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,153,51,0.08)] flex-shrink-0 backdrop-blur-sm bg-[rgba(3,3,3,0.8)] sticky top-0 z-50">
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl">🔔</span>
            <span className="font-display text-lg font-semibold text-[#FAFAFA] group-hover:text-[#FF9933] transition-colors">
              Ishaara
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-[#444]">
            <span>/</span>
            <span className="text-[#FF9933]">Practice</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <ConnectionBadge />
          <Link
            href="/mudras"
            className="text-xs font-body text-[#555] hover:text-[#FAFAFA] transition-colors"
          >
            Mudra Library
          </Link>
        </div>
      </nav>

      {/* Main grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 p-4 lg:p-6 max-w-[1400px] mx-auto w-full">
        {/* Left: video + session history */}
        <div className="flex flex-col gap-4 min-h-0">
          <VideoCanvas />
          <MudraHistory />
        </div>

        {/* Right: info panels */}
        <div className="flex flex-col gap-4">
          <MudraCard />
          <CorrectionPanel />
          <CulturalContext />
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-4 lg:px-6 pb-4 lg:pb-6 max-w-[1400px] mx-auto w-full">
        <SessionStats />
      </div>
    </div>
  );
}
