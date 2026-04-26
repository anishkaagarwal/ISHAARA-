import type { OverlayData, Correction } from "@/store/sessionStore";

// MediaPipe Pose connections (landmark index pairs)
const POSE_CONNECTIONS: [number, number][] = [
  [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
  [11, 23], [12, 24], [23, 24], [23, 25], [24, 26],
  [25, 27], [26, 28],
];

// MediaPipe Hand connections
const HAND_CONNECTIONS: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],
  [0,5],[5,6],[6,7],[7,8],
  [0,9],[9,10],[10,11],[11,12],
  [0,13],[13,14],[14,15],[15,16],
  [0,17],[17,18],[18,19],[19,20],
];

function severityColor(corrections: Correction[], jointSet: Set<string>): string {
  const relevant = corrections.filter((c) => jointSet.has(c.joint));
  if (relevant.some((c) => c.severity === "critical")) return "#ef4444";
  if (relevant.some((c) => c.severity === "medium")) return "#f59e0b";
  return "#22c55e";
}

export function drawOverlay(
  ctx: CanvasRenderingContext2D,
  overlay: OverlayData,
  corrections: Correction[],
  displayW: number,
  displayH: number,
) {
  const scaleX = displayW / (overlay.width || 640);
  const scaleY = displayH / (overlay.height || 480);

  const scale = (pts: { x: number; y: number }[]) =>
    pts.map((p) => ({ x: p.x * scaleX, y: p.y * scaleY }));

  ctx.clearRect(0, 0, displayW, displayH);
  ctx.lineWidth = 2;

  // Pose skeleton
  const pose = scale(overlay.pose ?? []);
  if (pose.length >= 17) {
    ctx.strokeStyle = "rgba(232,160,32,0.8)";
    for (const [a, b] of POSE_CONNECTIONS) {
      if (!pose[a] || !pose[b]) continue;
      ctx.beginPath();
      ctx.moveTo(pose[a].x, pose[a].y);
      ctx.lineTo(pose[b].x, pose[b].y);
      ctx.stroke();
    }
    // Joints
    for (const pt of pose) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(232,160,32,0.9)";
      ctx.fill();
    }
  }

  // Hands
  for (const [key, color] of [
    ["left_hand", "#0F9B8E"],
    ["right_hand", "#C4386B"],
  ] as const) {
    const hand = scale((overlay as unknown as Record<string, {x:number;y:number}[]>)[key] ?? []);
    if (!hand.length) continue;

    const jointSet = new Set(corrections.map((c) => c.joint));

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    for (const [a, b] of HAND_CONNECTIONS) {
      if (!hand[a] || !hand[b]) continue;
      ctx.beginPath();
      ctx.moveTo(hand[a].x, hand[a].y);
      ctx.lineTo(hand[b].x, hand[b].y);
      ctx.stroke();
    }

    // Fingertip dots colored by correction severity
    const tips = [4, 8, 12, 16, 20];
    for (let i = 0; i < hand.length; i++) {
      const isTip = tips.includes(i);
      const dotColor = isTip ? severityColor(corrections, jointSet) : color;
      ctx.beginPath();
      ctx.arc(hand[i].x, hand[i].y, isTip ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();
    }
  }
}
