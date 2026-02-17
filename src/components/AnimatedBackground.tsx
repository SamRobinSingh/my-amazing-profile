import { memo } from "react";

/**
 * Performant CSS-only animated background with floating orbs,
 * grid lines, and neural-network inspired dots.
 * Uses CSS animations (GPU-accelerated) instead of JS for zero lag.
 */
const AnimatedBackground = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />

      {/* Subtle grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="bg-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grid)" />
      </svg>

      {/* Floating dots - CSS animated */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="floating-dot"
          style={{
            left: `${(i * 5.3 + 2) % 100}%`,
            top: `${(i * 7.1 + 10) % 100}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${8 + (i % 5) * 2}s`,
            background: i % 3 === 0
              ? "hsl(var(--primary) / 0.4)"
              : i % 3 === 1
              ? "hsl(var(--accent) / 0.3)"
              : "hsl(var(--warm) / 0.25)",
          }}
        />
      ))}

      {/* Scan line effect */}
      <div className="scan-line" />
    </div>
  );
});

AnimatedBackground.displayName = "AnimatedBackground";

export default AnimatedBackground;
