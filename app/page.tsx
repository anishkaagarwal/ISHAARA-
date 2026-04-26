import Link from "next/link";
import HeroSection from "@/components/HeroSection";

const MUDRA_STRIP = [
  "Pataka","Tripataka","Ardhapataka","Kartarimukha","Mayura",
  "Ardhachandra","Arala","Mushti","Shikhara","Katakamukha",
  "Suchi","Padmakosha","Sarpashire","Alapadma","Trishula",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[rgba(255,153,51,0.1)] backdrop-blur-sm bg-[rgba(3,3,3,0.7)] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔔</span>
          <span className="font-display text-xl font-semibold tracking-wide text-[#FAFAFA]">
            Ishaara
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/mudras"
            className="text-sm text-[#888] hover:text-[#FAFAFA] transition-colors font-body"
          >
            Mudra Library
          </Link>
          <Link
            href="/practice"
            className="text-sm bg-[rgba(255,153,51,0.12)] border border-[rgba(255,153,51,0.35)] text-[#FF9933] px-5 py-2 rounded-full hover:bg-[rgba(255,153,51,0.22)] hover:border-[rgba(255,153,51,0.6)] transition-all font-body font-medium"
          >
            Practice
          </Link>
        </div>
      </nav>

      {/* Animated hero */}
      <HeroSection />

      {/* Mudra showcase strip */}
      <section className="py-14 px-8 border-t border-[rgba(255,153,51,0.07)]">
        <p className="text-center text-[10px] font-mono uppercase tracking-[0.25em] text-[#555] mb-7">
          28 Classical Hasta Mudras
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {MUDRA_STRIP.map((m) => (
            <Link
              key={m}
              href={`/mudras?highlight=${m}`}
              className="text-xs font-body text-[#666] hover:text-[#FF9933] px-3 py-1.5 rounded-full border border-[rgba(255,153,51,0.08)] hover:border-[rgba(255,153,51,0.3)] bg-[#0A0A0A] transition-all"
            >
              {m}
            </Link>
          ))}
          <Link
            href="/mudras"
            className="text-xs font-body text-[#FF9933] px-3 py-1.5 rounded-full border border-[rgba(255,153,51,0.3)] bg-[rgba(255,153,51,0.07)] hover:bg-[rgba(255,153,51,0.14)] transition-all"
          >
            +13 more →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-5 border-t border-[rgba(255,153,51,0.07)] flex items-center justify-between">
        <span className="text-xs text-[#444] font-body">
          Built for classical Indian dance. Powered by AI.
        </span>
        <span className="font-display text-sm text-[#555]">
          इशारा — Ishaara
        </span>
      </footer>
    </main>
  );
}
