import { create } from "zustand";

export interface Correction {
  joint: string;
  message: string;
  severity: "critical" | "medium";
  angle_diff: number;
}

export interface OverlayData {
  width: number;
  height: number;
  pose: { x: number; y: number }[];
  left_hand: { x: number; y: number }[];
  right_hand: { x: number; y: number }[];
}

interface SessionState {
  isConnected: boolean;
  isStreaming: boolean;
  detectedMudra: string;
  confidence: number;
  previousMudra: string;
  corrections: Correction[];
  culturalContext: string;
  audioUrl: string | null;
  overlayData: OverlayData | null;
  frameCount: number;
  sessionStartTime: number | null;
  mudrasDetected: number;
  accuracyHistory: number[];
  mudraHistory: string[];

  setConnected: (v: boolean) => void;
  setStreaming: (v: boolean) => void;
  updateFrame: (data: {
    mudra: string;
    confidence: number;
    corrections: Correction[];
    cultural_context: string;
    audio_url: string | null;
    overlay_data: OverlayData;
    frame_count: number;
  }) => void;
  startSession: () => void;
  resetSession: () => void;
  getAccuracy: () => number;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  isConnected: false,
  isStreaming: false,
  detectedMudra: "",
  confidence: 0,
  previousMudra: "",
  corrections: [],
  culturalContext: "",
  audioUrl: null,
  overlayData: null,
  frameCount: 0,
  sessionStartTime: null,
  mudrasDetected: 0,
  accuracyHistory: [],
  mudraHistory: [],

  setConnected: (v) => set({ isConnected: v }),
  setStreaming: (v) => set({ isStreaming: v }),

  updateFrame: (data) =>
    set((state) => {
      const isMudraChange = data.mudra !== state.detectedMudra && data.mudra !== "Unknown";
      const newAccuracy = data.confidence * 100;
      return {
        previousMudra: state.detectedMudra,
        detectedMudra: data.mudra,
        confidence: data.confidence,
        corrections: data.corrections,
        culturalContext: data.cultural_context || state.culturalContext,
        audioUrl: data.audio_url,
        overlayData: data.overlay_data,
        frameCount: data.frame_count,
        mudrasDetected: isMudraChange ? state.mudrasDetected + 1 : state.mudrasDetected,
        accuracyHistory: [...state.accuracyHistory.slice(-29), newAccuracy],
        mudraHistory: isMudraChange
          ? [...state.mudraHistory.slice(-7), data.mudra]
          : state.mudraHistory,
      };
    }),

  startSession: () =>
    set({ sessionStartTime: Date.now(), mudrasDetected: 0, accuracyHistory: [], mudraHistory: [] }),

  resetSession: () =>
    set({
      detectedMudra: "",
      confidence: 0,
      previousMudra: "",
      corrections: [],
      culturalContext: "",
      audioUrl: null,
      overlayData: null,
      frameCount: 0,
      sessionStartTime: null,
      mudrasDetected: 0,
      accuracyHistory: [],
      mudraHistory: [],
    }),

  getAccuracy: () => {
    const { accuracyHistory } = get();
    if (!accuracyHistory.length) return 0;
    return Math.round(accuracyHistory.reduce((a, b) => a + b, 0) / accuracyHistory.length);
  },
}));
