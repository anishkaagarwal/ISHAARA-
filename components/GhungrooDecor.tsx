"use client";

/* Ghungroo: traditional ankle-bell ornament of Kathak dancers */

const BELLS = [
  { x: 15,  sy: 16, s: 0.70, delay: 0.00 },
  { x: 48,  sy: 18, s: 0.80, delay: 0.25 },
  { x: 81,  sy: 19, s: 0.90, delay: 0.40 },
  { x: 114, sy: 20, s: 0.97, delay: 0.15 },
  { x: 147, sy: 21, s: 1.00, delay: 0.55 },
  { x: 180, sy: 20, s: 0.97, delay: 0.30 },
  { x: 213, sy: 19, s: 0.90, delay: 0.10 },
  { x: 246, sy: 18, s: 0.80, delay: 0.45 },
  { x: 279, sy: 16, s: 0.70, delay: 0.20 },
] as const;

interface BellProps {
  x: number;
  sy: number;
  s: number;
  delay: number;
}

function Bell({ x, sy, s, delay }: BellProps) {
  const bw = 7 * s;
  const bh = 19 * s;
  const bellPath = [
    `M 0,0`,
    `C ${-bw * 0.3},0 ${-bw},${bh * 0.22} ${-bw},${bh * 0.62}`,
    `Q ${-bw},${bh} 0,${bh}`,
    `Q ${bw},${bh} ${bw},${bh * 0.62}`,
    `C ${bw},${bh * 0.22} ${bw * 0.3},0 0,0 Z`,
  ].join(" ");

  return (
    <g
      transform={`translate(${x}, ${sy})`}
      style={{
        animationName: "bell-sway",
        animationDuration: "2.6s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDirection: "alternate",
        animationDelay: `${delay}s`,
        transformOrigin: "50% 0%",
        transformBox: "fill-box",
      } as React.CSSProperties}
    >
      {/* Top knob (where string threads through) */}
      <ellipse cx={0} cy={-2.5 * s} rx={2.5 * s} ry={1.8 * s} fill="#FFD580" />
      {/* Bell body */}
      <path d={bellPath} fill="url(#ghunghrooGrad)" />
      {/* Decorative groove ring */}
      <path
        d={`M ${-bw * 0.78},${bh * 0.62} Q 0,${bh * 0.72} ${bw * 0.78},${bh * 0.62}`}
        stroke="rgba(0,0,0,0.28)"
        strokeWidth={0.8 * s}
        fill="none"
      />
      {/* Clapper */}
      <circle cx={0} cy={bh + 3.8 * s} r={2.8 * s} fill="#7A2800" />
    </g>
  );
}

export default function GhungrooDecor({
  className = "",
  width = 300,
}: {
  className?: string;
  width?: number;
}) {
  const h = Math.round((width / 300) * 56);
  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 300 56"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ghunghrooGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFD580" />
          <stop offset="45%"  stopColor="#FF9933" />
          <stop offset="100%" stopColor="#9A3D00" />
        </linearGradient>
        <linearGradient id="ghunghrooString" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="transparent" />
          <stop offset="12%"  stopColor="rgba(255,153,51,0.7)" />
          <stop offset="88%"  stopColor="rgba(255,153,51,0.7)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* String — catenary sag toward center */}
      <path
        d="M 5,15 Q 150,22 295,15"
        stroke="url(#ghunghrooString)"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />

      {BELLS.map((bell, i) => (
        <Bell key={i} {...bell} />
      ))}
    </svg>
  );
}
