"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GhungrooDecor from "@/components/GhungrooDecor";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const up = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const STATS = [
  { label: "28 Mudras" },
  { label: "Real-time AI" },
  { label: "Voice Coach" },
  { label: "Cultural Context" },
];

export default function HeroSection() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">

      {/* Ambient glow blobs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 60%, rgba(255,153,51,0.07) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(232,51,90,0.05) 0%, transparent 65%)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Devanagari watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-bold text-[22vw] leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,153,51,0.045)",
          }}
        >
          इशारा
        </span>
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        {/* Badge */}
        <motion.div variants={up}>
          <div className="inline-flex items-center gap-2.5 border border-[rgba(255,153,51,0.3)] bg-[rgba(255,153,51,0.07)] rounded-full px-5 py-2 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-pulse" />
            <span className="text-[11px] font-mono text-[#FF9933] uppercase tracking-[0.18em]">
              Kathak AI Coach
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={up}
          className="font-display font-light leading-[0.92] mb-6"
          style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)" }}
        >
          <span className="text-[#FAFAFA]">Learn Kathak.</span>
          <br />
          <span
            style={{
              background: "linear-gradient(125deg, #FF9933 0%, #FFB347 40%, #E8650A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Feel the Art.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={up}
          className="max-w-lg font-body text-base md:text-lg text-[#888] leading-relaxed mb-10"
        >
          Real-time AI detects your Mudras, corrects your posture, and explains
          centuries of Indian culture — live, as you dance.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={up} className="flex flex-col sm:flex-row items-center gap-3 mb-12">
          <Link
            href="/practice"
            className="font-body font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 glow-saffron"
            style={{
              background: "linear-gradient(135deg, #FF9933, #E8650A)",
              color: "#030303",
              boxShadow: "0 0 28px rgba(255,153,51,0.35)",
            }}
          >
            Begin Practice →
          </Link>
          <Link
            href="/mudras"
            className="font-body px-8 py-3.5 rounded-full text-sm tracking-wide border border-[rgba(255,153,51,0.28)] text-[#FAFAFA] hover:border-[rgba(255,153,51,0.55)] hover:bg-[rgba(255,153,51,0.06)] transition-all"
          >
            Explore Mudras
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div variants={up} className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-16">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-6">
              <span className="text-xs font-mono text-[#666] uppercase tracking-widest">
                {s.label}
              </span>
              {i < STATS.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-[rgba(255,153,51,0.4)]" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Ghungroo decoration */}
        <motion.div
          variants={up}
          className="flex flex-col items-center gap-2"
        >
          <GhungrooDecor width={280} />
          <p className="text-[10px] font-mono text-[rgba(255,153,51,0.35)] uppercase tracking-[0.25em]">
            घुंघरू — Ghungroo
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
