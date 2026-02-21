import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, Suspense } from "react";
import { Send, X, Bot } from "lucide-react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const CHAT_RESPONSES = [
  "Hey! I'm Sam's AI assistant 🤖 Ask me anything about his work!",
  "Sam specializes in AI/ML, Deep Learning, and Data Science.",
  "Check out the Projects section for Sam's latest work!",
  "Sam has published research in NLP and Computer Vision.",
  "Feel free to reach out via the Contact section below!",
  "Sam is open to collaborations and new opportunities!",
  "I'm just a portfolio bot, but Sam would love to chat with you directly! 😊",
];

function RobotModel({ isHovered }: { isHovered: boolean }) {
  const { scene } = useGLTF("/models/robot.glb");
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 1.5;
        }
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    // Gentle float
    ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.15;
    // Mouse tracking rotation
    const targetRotY = pointer.x * 0.4;
    const targetRotX = -pointer.y * 0.2;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, delta * 3);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX, delta * 3);
    // Hover scale
    const targetScale = isHovered ? 1.15 : 1;
    ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, targetScale, delta * 5);
    ref.current.scale.y = ref.current.scale.x;
    ref.current.scale.z = ref.current.scale.x;
  });

  return <primitive ref={ref} object={scene} scale={1} />;
}

// Preload the model
useGLTF.preload("/models/robot.glb");

const FloatingRobot = () => {
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! I'm Sam's robot assistant. Click to chat! 🤖", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });

  const robotY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [80, 200, 350, 500, 650]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth - 80;
      mouseX.set((e.clientX - centerX) * 0.02);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);
    setTimeout(() => {
      const response = CHAT_RESPONSES[Math.floor(Math.random() * CHAT_RESPONSES.length)];
      setMessages((prev) => [...prev, { text: response, isBot: true }]);
    }, 800);
  };

  return (
    <>
      {/* 3D Robot */}
      <motion.div
        className="fixed right-2 z-40 pointer-events-auto cursor-pointer hidden lg:block"
        style={{ top: robotY, x: springX, width: 140, height: 140 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setChatOpen(!chatOpen)}
      >
        {/* Glow aura */}
        <motion.div
          className="absolute -inset-4 rounded-full blur-2xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.25), hsl(var(--accent) / 0.1), transparent 70%)",
          }}
          animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 0.8 : 0.4 }}
          transition={{ duration: 0.4 }}
        />

        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 4], fov: 35 }}
          style={{ pointerEvents: "none" }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-3, 2, -3]} intensity={0.4} color="#8b5cf6" />
          <pointLight position={[0, 2, 3]} intensity={0.8} color="#06b6d4" />
          <Suspense fallback={null}>
            <RobotModel isHovered={isHovered} />
            <Environment preset="city" />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={5} blur={2} />
          </Suspense>
        </Canvas>

        {/* Hover tooltip */}
        <AnimatePresence>
          {isHovered && !chatOpen && (
            <motion.div
              className="absolute -left-36 top-2 px-3 py-2 rounded-xl text-xs font-mono whitespace-nowrap"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--primary) / 0.4)",
                color: "hsl(var(--primary))",
                boxShadow: "0 4px 20px hsl(var(--primary) / 0.15)",
              }}
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              Click to chat! 💬
              <div
                className="absolute top-1/2 -right-1 w-2 h-2 rotate-45 -translate-y-1/2"
                style={{ background: "hsl(var(--card))", borderRight: "1px solid hsl(var(--primary) / 0.4)", borderBottom: "1px solid hsl(var(--primary) / 0.4)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="fixed right-6 bottom-6 z-50 hidden lg:flex flex-col"
            style={{
              width: 340,
              height: 440,
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--primary) / 0.3)",
              borderRadius: 16,
              boxShadow: "0 8px 40px hsl(var(--primary) / 0.15), 0 0 0 1px hsl(var(--primary) / 0.05)",
            }}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 rounded-t-2xl"
              style={{ borderBottom: "1px solid hsl(var(--border))" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--primary) / 0.15)" }}>
                  <Bot size={16} style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Sam's Bot</p>
                  <p className="text-[10px] text-muted-foreground">Always online</p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setChatOpen(false); }}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X size={14} className="text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: "none" }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                    style={{
                      background: msg.isBot ? "hsl(var(--muted))" : "hsl(var(--primary) / 0.15)",
                      color: msg.isBot ? "hsl(var(--foreground))" : "hsl(var(--primary))",
                      borderBottomLeftRadius: msg.isBot ? 4 : 12,
                      borderBottomRightRadius: msg.isBot ? 12 : 4,
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3" style={{ borderTop: "1px solid hsl(var(--border))" }}>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about Sam..."
                  className="flex-1 bg-muted text-foreground text-xs px-3 py-2.5 rounded-xl outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/30"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => { e.stopPropagation(); handleSend(); }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: "hsl(var(--primary) / 0.15)" }}
                >
                  <Send size={14} style={{ color: "hsl(var(--primary))" }} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingRobot;
