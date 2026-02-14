import { motion, useMotionValue, useTransform } from "framer-motion";

const Robot3D = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      className="relative w-full max-w-[280px] md:max-w-[340px] mx-auto"
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Glow behind robot */}
        <motion.div
          className="absolute inset-0 rounded-full blur-[60px] opacity-30"
          style={{ background: "hsl(var(--primary))" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.svg
          viewBox="0 0 300 400"
          className="w-full h-auto drop-shadow-2xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Antenna */}
          <motion.circle
            cx="150" cy="30" r="8"
            fill="hsl(var(--primary))"
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <line x1="150" y1="38" x2="150" y2="70" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />

          {/* Head */}
          <motion.rect
            x="85" y="70" width="130" height="100" rx="24"
            fill="hsl(var(--surface))"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            animate={{ strokeOpacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Eyes */}
          <motion.circle
            cx="120" cy="115" r="14"
            fill="hsl(var(--primary))"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.circle
            cx="180" cy="115" r="14"
            fill="hsl(var(--accent))"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
          {/* Eye glare */}
          <circle cx="114" cy="110" r="4" fill="hsl(var(--primary-foreground))" opacity="0.6" />
          <circle cx="174" cy="110" r="4" fill="hsl(var(--primary-foreground))" opacity="0.6" />

          {/* Mouth */}
          <motion.rect
            x="118" y="142" width="64" height="8" rx="4"
            fill="hsl(var(--primary))"
            animate={{ width: [64, 50, 64], x: [118, 125, 118] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Neck */}
          <rect x="135" y="170" width="30" height="20" rx="4" fill="hsl(var(--border))" />

          {/* Body */}
          <motion.rect
            x="70" y="190" width="160" height="130" rx="20"
            fill="hsl(var(--surface))"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            animate={{ strokeOpacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Chest arc reactor */}
          <motion.circle
            cx="150" cy="245" r="22"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="150" cy="245" r="10"
            fill="hsl(var(--primary))"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Left arm */}
          <motion.rect
            x="30" y="200" width="35" height="90" rx="14"
            fill="hsl(var(--surface))"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            animate={{ rotate: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ transformOrigin: "47px 200px" }}
          />

          {/* Right arm */}
          <motion.rect
            x="235" y="200" width="35" height="90" rx="14"
            fill="hsl(var(--surface))"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            style={{ transformOrigin: "253px 200px" }}
          />

          {/* Left leg */}
          <rect x="100" y="320" width="35" height="60" rx="12" fill="hsl(var(--surface))" stroke="hsl(var(--border))" strokeWidth="2" />

          {/* Right leg */}
          <rect x="165" y="320" width="35" height="60" rx="12" fill="hsl(var(--surface))" stroke="hsl(var(--border))" strokeWidth="2" />

          {/* Feet */}
          <rect x="90" y="370" width="55" height="16" rx="8" fill="hsl(var(--border))" />
          <rect x="155" y="370" width="55" height="16" rx="8" fill="hsl(var(--border))" />
        </motion.svg>

        {/* Floating particles around robot */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              background: i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--accent))",
              left: `${20 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Robot3D;
