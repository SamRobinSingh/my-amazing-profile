import { motion, useMotionValue, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: 750, suffix: "+", label: "Problems Solved", color: "primary" as const },
  { value: 3, suffix: "+", label: "Internships", color: "accent" as const },
  { value: 6, suffix: "+", label: "Awards", color: "warm" as const },
  { value: 4, suffix: "+", label: "Projects", color: "primary" as const },
];

const colorMap = {
  primary: "text-primary",
  accent: "text-accent",
  warm: "text-warm",
};

const bgColorMap = {
  primary: "hsl(var(--primary) / 0.06)",
  accent: "hsl(var(--accent) / 0.06)",
  warm: "hsl(var(--warm) / 0.06)",
};

const borderColorMap = {
  primary: "hsl(var(--primary) / 0.15)",
  accent: "hsl(var(--accent) / 0.15)",
  warm: "hsl(var(--warm) / 0.15)",
};

const glowColorMap = {
  primary: "hsl(var(--primary) / 0.2)",
  accent: "hsl(var(--accent) / 0.2)",
  warm: "hsl(var(--warm) / 0.2)",
};

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="rounded-xl p-5 text-center backdrop-blur-xl transition-all duration-500 cursor-default"
      style={{
        background: bgColorMap[stat.color],
        border: `1px solid ${borderColorMap[stat.color]}`,
        perspective: "600px",
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      whileHover={{
        scale: 1.08,
        boxShadow: `0 0 30px ${glowColorMap[stat.color]}`,
      }}
    >
      <div className={`text-3xl md:text-4xl font-bold mb-1 ${colorMap[stat.color]}`}>
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </div>
      <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider">{stat.label}</p>
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

      <div className="max-w-4xl mx-auto">
        <SectionHeading label="About" title="Building Intelligence" />

        <motion.p
          className="text-muted-foreground text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          AI & Machine Learning Engineer with strong expertise in Deep Learning, Computer Vision, NLP, and Data Analytics.
          Skilled in building end-to-end AI solutions from data preprocessing and model training to deployment and monitoring.
          Experienced in developing scalable enterprise applications using Java, Groovy, FastAPI, and integrating LLMs/SLMs
          with Retrieval-Augmented Generation (RAG) for intelligent automation. Proven ability in deploying optimized models
          on edge devices (Jetson Nano, Raspberry Pi) using TensorFlow Lite, OpenCV, and OCR.
        </motion.p>

        {/* Stats Row with 3D tilt */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 glass-accent rounded-xl p-6"
          style={{ perspective: "800px" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: "hsl(var(--accent))" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-sm" style={{ color: "hsl(var(--accent))" }}>Education</span>
          </div>
          <h4 className="text-foreground font-semibold text-lg">B.Tech in AI & Data Science</h4>
          <p className="text-muted-foreground text-sm">Francis Xavier Engineering College, Tirunelveli</p>
          <p className="text-muted-foreground text-sm mt-1">Minor in Business Analytics · Nov 2022 — May 2026</p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
