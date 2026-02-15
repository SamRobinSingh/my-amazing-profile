import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingRobot = () => {
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth spring for mouse tracking
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Scroll-based position changes
  const robotY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [80, 200, 350, 500, 650]);
  const robotRotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 5, -5]);
  const eyeGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth - 60;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) * 0.03);
      mouseY.set((e.clientY - centerY) * 0.03);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed right-4 z-40 pointer-events-auto cursor-pointer hidden lg:block"
      style={{ top: robotY, x: springX, rotateZ: robotRotateZ }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Robot glow aura */}
        <motion.div
          className="absolute -inset-4 rounded-full blur-xl"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)",
          }}
          animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 0.8 : 0.4 }}
          transition={{ duration: 0.4 }}
        />

        {/* Robot SVG */}
        <motion.svg
          width="70"
          height="90"
          viewBox="0 0 70 90"
          fill="none"
          style={{ y: springY }}
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Antenna */}
          <motion.line
            x1="35" y1="8" x2="35" y2="0"
            stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"
          />
          <motion.circle
            cx="35" cy="0" r="3"
            fill="hsl(var(--primary))"
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Head */}
          <motion.rect
            x="12" y="8" width="46" height="32" rx="10"
            fill="hsl(var(--card))"
            stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5"
          />
          {/* Visor */}
          <rect x="17" y="14" width="36" height="18" rx="6" fill="hsl(var(--background))" opacity="0.8" />

          {/* Eyes */}
          <motion.circle
            cx="27" cy="23" r="4"
            fill="hsl(var(--primary))"
            style={{ opacity: eyeGlow }}
            animate={isHovered ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
          />
          <motion.circle
            cx="43" cy="23" r="4"
            fill="hsl(var(--accent))"
            style={{ opacity: eyeGlow }}
            animate={isHovered ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, delay: 0.15 }}
          />
          {/* Eye highlights */}
          <circle cx="25" cy="21" r="1.5" fill="white" opacity="0.7" />
          <circle cx="41" cy="21" r="1.5" fill="white" opacity="0.7" />

          {/* Mouth */}
          <motion.rect
            x="28" y="28" width="14" height="2" rx="1"
            fill="hsl(var(--primary) / 0.6)"
            animate={isHovered ? { width: [14, 18, 14], x: [28, 26, 28] } : {}}
            transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
          />

          {/* Neck */}
          <rect x="30" y="40" width="10" height="6" rx="2" fill="hsl(var(--muted))" />

          {/* Body */}
          <motion.rect
            x="15" y="46" width="40" height="28" rx="8"
            fill="hsl(var(--card))"
            stroke="hsl(var(--primary) / 0.4)" strokeWidth="1.5"
          />
          {/* Body panel */}
          <rect x="22" y="52" width="26" height="10" rx="3" fill="hsl(var(--background))" opacity="0.5" />
          {/* Core light */}
          <motion.circle
            cx="35" cy="57" r="3"
            fill="hsl(var(--primary))"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Body dots */}
          <circle cx="28" cy="68" r="1.5" fill="hsl(var(--accent) / 0.5)" />
          <circle cx="35" cy="68" r="1.5" fill="hsl(var(--primary) / 0.5)" />
          <circle cx="42" cy="68" r="1.5" fill="hsl(var(--warm) / 0.5)" />

          {/* Left arm */}
          <motion.rect
            x="5" y="48" width="8" height="20" rx="4"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--primary) / 0.3)" strokeWidth="1"
            animate={isHovered ? { rotate: [0, -15, 0], y: [0, -5, 0] } : {}}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            style={{ transformOrigin: "9px 48px" }}
          />
          {/* Right arm */}
          <motion.rect
            x="57" y="48" width="8" height="20" rx="4"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--primary) / 0.3)" strokeWidth="1"
            animate={isHovered ? { rotate: [0, 15, 0], y: [0, -5, 0] } : {}}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, delay: 0.2 }}
            style={{ transformOrigin: "61px 48px" }}
          />

          {/* Feet */}
          <rect x="19" y="74" width="12" height="6" rx="3" fill="hsl(var(--muted))" />
          <rect x="39" y="74" width="12" height="6" rx="3" fill="hsl(var(--muted))" />

          {/* Jet effect (bottom glow) */}
          <motion.ellipse
            cx="35" cy="82" rx="15" ry="4"
            fill="hsl(var(--primary) / 0.15)"
            animate={{ opacity: [0.2, 0.5, 0.2], ry: [3, 5, 3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.svg>

        {/* Speech bubble on hover */}
        <motion.div
          className="absolute -left-32 top-0 px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--primary) / 0.3)",
            color: "hsl(var(--primary))",
          }}
          initial={{ opacity: 0, scale: 0.8, x: 10 }}
          animate={isHovered ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: 10 }}
          transition={{ duration: 0.3 }}
        >
          Hello! 👋
          <div
            className="absolute top-1/2 -right-1 w-2 h-2 rotate-45 -translate-y-1/2"
            style={{ background: "hsl(var(--card))", borderRight: "1px solid hsl(var(--primary) / 0.3)", borderBottom: "1px solid hsl(var(--primary) / 0.3)" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingRobot;
