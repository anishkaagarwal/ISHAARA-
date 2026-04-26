"use client";

import { useRef, useEffect, useCallback } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useWebcam } from "@/hooks/useWebcam";
import { useAudio } from "@/hooks/useAudio";
import { useSessionStore } from "@/store/sessionStore";
import { drawOverlay } from "@/lib/overlayRenderer";

export default function VideoCanvas() {
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { overlayData, corrections, isStreaming, setStreaming, startSession } = useSessionStore();
  const { sendFrame } = useWebSocket();
  useAudio();

  const handleFrame = useCallback(
    (blob: Blob) => { sendFrame(blob); },
    [sendFrame],
  );

  const { videoRef, hasPermission, cameraError, startCamera, stopCamera } = useWebcam(handleFrame);

  const toggleStream = async () => {
    if (isStreaming) {
      stopCamera();
      setStreaming(false);
    } else {
      const ok = await startCamera();
      if (ok) {
        startSession();
        setStreaming(true);
      }
    }
  };

  useEffect(() => {
    if (!overlayData || !overlayCanvasRef.current) return;
    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawOverlay(ctx, overlayData, corrections, canvas.width, canvas.height);
  }, [overlayData, corrections]);

  return (
    <div className="flex flex-col gap-3">
      {/* Video container */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden bg-[#0A0A0A]"
        style={{
          aspectRatio: "4/3",
          maxHeight: "calc(100vh - 220px)",
          border: isStreaming
            ? "1px solid rgba(255,153,51,0.35)"
            : "1px solid rgba(255,153,51,0.1)",
          boxShadow: isStreaming ? "0 0 28px rgba(255,153,51,0.12)" : "none",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Mirrored video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ transform: "scaleX(-1)" }}
          muted
          playsInline
        />

        {/* Landmark overlay canvas */}
        <canvas
          ref={overlayCanvasRef}
          width={640}
          height={480}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: "scaleX(-1)" }}
        />

        {/* Placeholder */}
        {!isStreaming && !cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#030303]/90">
            <div className="text-5xl opacity-20">🔔</div>
            <p className="font-display text-2xl text-[#444] font-light tracking-wide">
              Ready to practice
            </p>
            <p className="text-xs text-[#333] font-body">
              Position yourself in frame — full body visible
            </p>
          </div>
        )}

        {/* Camera error */}
        {cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#030303]/95 px-6">
            <div className="text-4xl">🚫</div>
            <p className="text-[#E8335A] text-sm font-medium text-center">{cameraError}</p>
            {hasPermission === false && (
              <p className="text-[#555] text-xs text-center">
                In Chrome: click the camera icon in the address bar → Allow
              </p>
            )}
          </div>
        )}

        {/* Live indicator */}
        {isStreaming && (
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#030303]/75 backdrop-blur-sm rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E8335A] animate-pulse" />
            <span className="text-[10px] font-mono text-[#FAFAFA]/60 uppercase tracking-widest">
              Live
            </span>
          </div>
        )}
      </div>

      {/* Start / Stop button */}
      <button
        type="button"
        onClick={toggleStream}
        className={`w-full py-3 rounded-xl font-body font-semibold text-sm tracking-wide transition-all duration-300 ${
          isStreaming
            ? "bg-[rgba(232,51,90,0.1)] border border-[rgba(232,51,90,0.35)] text-[#E8335A] hover:bg-[rgba(232,51,90,0.2)]"
            : "bg-[rgba(255,153,51,0.12)] border border-[rgba(255,153,51,0.35)] text-[#FF9933] hover:bg-[rgba(255,153,51,0.22)] glow-saffron"
        }`}
      >
        {isStreaming ? "Stop Practice" : cameraError ? "Retry Camera" : "Begin Practice"}
      </button>
    </div>
  );
}
