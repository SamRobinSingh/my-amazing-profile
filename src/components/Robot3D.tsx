import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

const RobotHead = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const antennaGlowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (headRef.current) {
      // Smooth head tracking towards mouse
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mouseX * 0.4,
        0.05
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -mouseY * 0.2,
        0.05
      );
    }

    // Eye glow pulse
    if (leftEyeRef.current && rightEyeRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }

    // Antenna glow
    if (antennaGlowRef.current) {
      antennaGlowRef.current.intensity = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 1;
    }
  });

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(225, 25%, 12%)"),
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(165, 85%, 48%)"),
        metalness: 0.6,
        roughness: 0.3,
        emissive: new THREE.Color("hsl(165, 85%, 48%)"),
        emissiveIntensity: 0.3,
      }),
    []
  );

  const eyeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(165, 85%, 60%)"),
        emissive: new THREE.Color("hsl(165, 85%, 48%)"),
        emissiveIntensity: 0.8,
        metalness: 0.2,
        roughness: 0.1,
      }),
    []
  );

  const purpleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(270, 65%, 60%)"),
        emissive: new THREE.Color("hsl(270, 65%, 50%)"),
        emissiveIntensity: 0.2,
        metalness: 0.7,
        roughness: 0.3,
      }),
    []
  );

  return (
    <group ref={headRef}>
      {/* Main head */}
      <mesh position={[0, 0.5, 0]} material={bodyMaterial}>
        <boxGeometry args={[1.4, 1.2, 1.2]} />
      </mesh>

      {/* Head top plate */}
      <mesh position={[0, 1.15, 0]} material={accentMaterial}>
        <boxGeometry args={[1.0, 0.08, 0.9]} />
      </mesh>

      {/* Antenna base */}
      <mesh position={[0, 1.2, 0]} material={bodyMaterial}>
        <cylinderGeometry args={[0.06, 0.08, 0.3, 8]} />
      </mesh>

      {/* Antenna tip sphere */}
      <mesh position={[0, 1.45, 0]} material={accentMaterial}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>
      <pointLight
        ref={antennaGlowRef}
        position={[0, 1.5, 0]}
        color="hsl(165, 85%, 48%)"
        intensity={1}
        distance={3}
      />

      {/* Face plate */}
      <mesh position={[0, 0.5, 0.61]}>
        <boxGeometry args={[1.2, 0.9, 0.02]} />
        <meshStandardMaterial
          color="hsl(225, 22%, 8%)"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Left eye */}
      <mesh ref={leftEyeRef} position={[-0.3, 0.6, 0.63]} material={eyeMaterial}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>

      {/* Right eye */}
      <mesh ref={rightEyeRef} position={[0.3, 0.6, 0.63]} material={eyeMaterial}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>

      {/* Mouth - a small rectangle */}
      <mesh position={[0, 0.25, 0.63]} material={purpleMaterial}>
        <boxGeometry args={[0.5, 0.08, 0.02]} />
      </mesh>

      {/* Ear panels */}
      <mesh position={[-0.75, 0.5, 0]} material={purpleMaterial}>
        <boxGeometry args={[0.12, 0.5, 0.6]} />
      </mesh>
      <mesh position={[0.75, 0.5, 0]} material={purpleMaterial}>
        <boxGeometry args={[0.12, 0.5, 0.6]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -0.2, 0]} material={bodyMaterial}>
        <cylinderGeometry args={[0.2, 0.25, 0.3, 8]} />
      </mesh>
    </group>
  );
};

const RobotBody = () => {
  const bodyRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Gentle body sway
    if (bodyRef.current) {
      bodyRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }

    // Arm wave animation
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z =
        -0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      rightArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.2) * 0.1;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z =
        0.3 + Math.sin(state.clock.elapsedTime * 1.5 + Math.PI) * 0.1;
    }
  });

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(225, 25%, 12%)"),
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(165, 85%, 48%)"),
        metalness: 0.6,
        roughness: 0.3,
        emissive: new THREE.Color("hsl(165, 85%, 48%)"),
        emissiveIntensity: 0.15,
      }),
    []
  );

  return (
    <group ref={bodyRef} position={[0, -1.2, 0]}>
      {/* Torso */}
      <mesh material={bodyMaterial}>
        <boxGeometry args={[1.6, 1.6, 1.0]} />
      </mesh>

      {/* Chest plate */}
      <mesh position={[0, 0.1, 0.51]} material={accentMaterial}>
        <boxGeometry args={[0.8, 0.8, 0.02]} />
      </mesh>

      {/* Core light */}
      <mesh position={[0, 0.1, 0.52]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial
          color="hsl(165, 85%, 60%)"
          emissive="hsl(165, 85%, 48%)"
          emissiveIntensity={1}
        />
      </mesh>
      <pointLight
        position={[0, 0.1, 0.8]}
        color="hsl(165, 85%, 48%)"
        intensity={0.5}
        distance={2}
      />

      {/* Left arm */}
      <group ref={leftArmRef} position={[-1.0, 0.3, 0]}>
        <mesh position={[0, -0.4, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
        </mesh>
        <mesh position={[0, -0.85, 0]} material={accentMaterial}>
          <sphereGeometry args={[0.18, 12, 12]} />
        </mesh>
      </group>

      {/* Right arm (waving) */}
      <group ref={rightArmRef} position={[1.0, 0.3, 0]}>
        <mesh position={[0, -0.4, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
        </mesh>
        <mesh position={[0, -0.85, 0]} material={accentMaterial}>
          <sphereGeometry args={[0.18, 12, 12]} />
        </mesh>
      </group>
    </group>
  );
};

const RobotScene = ({
  mouseX,
  mouseY,
}: {
  mouseX: number;
  mouseY: number;
}) => {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group scale={0.85}>
        <RobotHead mouseX={mouseX} mouseY={mouseY} />
        <RobotBody />
      </group>
    </Float>
  );
};

const Robot3D = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <div
      className="w-full h-full min-h-[400px]"
      onMouseMove={handleMouseMove}
      style={{ cursor: "grab" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-3, 2, 4]} intensity={0.3} color="hsl(270, 65%, 60%)" />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="hsl(165, 85%, 48%)" />
        <Environment preset="city" />
        <RobotScene mouseX={mouse.x} mouseY={mouse.y} />
      </Canvas>
    </div>
  );
};

export default Robot3D;
