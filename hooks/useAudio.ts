"use client";

import { useRef, useCallback, useEffect } from "react";
import { useSessionStore } from "@/store/sessionStore";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastUrlRef = useRef<string | null>(null);
  const audioUrl = useSessionStore((s) => s.audioUrl);

  useEffect(() => {
    if (!audioUrl || audioUrl === lastUrlRef.current) return;
    lastUrlRef.current = audioUrl;

    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;

    // Don't interrupt currently playing audio
    if (!audio.paused) return;

    audio.src = `${BACKEND}${audioUrl}`;
    audio.play().catch(() => {/* autoplay policy — user interaction required */});
  }, [audioUrl]);

  const speak = useCallback((text: string) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
}
