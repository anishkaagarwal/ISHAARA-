"use client";

import { useRef, useCallback, useState } from "react";

const CAPTURE_FPS = 10;
const JPEG_QUALITY = 0.5;

export function useWebcam(onFrame: (blob: Blob) => void) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startCamera = useCallback(async (): Promise<boolean> => {
    setCameraError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      const msg = "Camera API not available. Ensure you're on HTTPS or localhost.";
      console.error("[useWebcam]", msg);
      setCameraError(msg);
      setHasPermission(false);
      return false;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: false,
      });
    } catch (err) {
      const e = err as Error;
      console.error("[useWebcam] getUserMedia failed:", e.name, e.message);
      const msg =
        e.name === "NotAllowedError"
          ? "Camera permission denied. Allow access in browser settings."
          : e.name === "NotFoundError"
            ? "No camera found on this device."
            : `Camera error: ${e.message}`;
      setCameraError(msg);
      setHasPermission(false);
      return false;
    }

    streamRef.current = stream;

    // Wait for videoRef to be available (should be mounted, but guard anyway)
    const video = videoRef.current;
    if (!video) {
      console.error("[useWebcam] videoRef is null after getUserMedia — ref not attached");
      stream.getTracks().forEach((t) => t.stop());
      setCameraError("Internal error: video element not ready.");
      setHasPermission(false);
      return false;
    }

    video.srcObject = stream;
    try {
      await video.play();
    } catch (err) {
      console.error("[useWebcam] video.play() failed:", err);
    }

    setHasPermission(true);

    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
      canvasRef.current.width = 640;
      canvasRef.current.height = 480;
    }

    intervalRef.current = setInterval(() => {
      const v = videoRef.current;
      const canvas = canvasRef.current;
      if (!v || !canvas || v.readyState < 2) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(v, 0, 0, 640, 480);
      canvas.toBlob((blob) => blob && onFrame(blob), "image/jpeg", JPEG_QUALITY);
    }, 1000 / CAPTURE_FPS);

    return true;
  }, [onFrame]);

  const stopCamera = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    const video = videoRef.current;
    if (video) video.srcObject = null;
    setHasPermission(null);
    setCameraError(null);
  }, []);

  return { videoRef, hasPermission, cameraError, startCamera, stopCamera };
}
