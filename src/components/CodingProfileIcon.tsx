import { motion } from "framer-motion";

interface CodingProfileIconProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const CodingProfileIcon = ({ href, label, icon, color, delay = 0 }: CodingProfileIconProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-3 rounded-xl border border-border/50 backdrop-blur-sm transition-all duration-500"
      style={{ perspective: "600px" }}
      initial={{ opacity: 0, y: 20, rotateX: 90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{
        scale: 1.15,
        rotateY: 15,
        rotateX: -10,
        boxShadow: `0 0 30px ${color}50, 0 10px 40px ${color}20`,
        borderColor: color,
      }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Glow ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
        }}
      />

      {/* Orbiting dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100"
        style={{ background: color }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: color,
            top: "-18px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 flex items-center justify-center w-5 h-5 text-foreground group-hover:text-white transition-colors duration-300">
        {icon}
      </div>

      {/* Tooltip */}
      <motion.span
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none px-2 py-0.5 rounded-md"
        style={{
          background: `${color}20`,
          color: color,
          border: `1px solid ${color}30`,
        }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
};

export default CodingProfileIcon;
