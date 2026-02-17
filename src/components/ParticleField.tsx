import { memo, useMemo } from "react";

/**
 * CSS-only particle field for zero-lag background animation.
 * Uses GPU-accelerated CSS animations instead of JS-driven framer-motion.
 */
const colors = [
  "hsl(var(--primary) / 0.3)",
  "hsl(var(--accent) / 0.25)",
  "hsl(var(--warm) / 0.2)",
];

const ParticleField = memo(({ count = 40 }: { count?: number }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      color: colors[i % colors.length],
      dx: Math.random() > 0.5 ? 15 : -15,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full floating-dot"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>
  );
});

ParticleField.displayName = "ParticleField";

export default ParticleField;
