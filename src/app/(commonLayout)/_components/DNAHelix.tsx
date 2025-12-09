"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DNAHelixProps {
  scrollProgress: number;
  scrollVelocity: number;
  primaryColor: string;
  secondaryColor: string;
}

const DNAHelix = ({ scrollProgress, scrollVelocity, primaryColor, secondaryColor }: DNAHelixProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const strand1Ref = useRef<THREE.Points>(null);
  const strand2Ref = useRef<THREE.Points>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  // Convert hex color to THREE.Color
  const color1 = useMemo(() => new THREE.Color(primaryColor), [primaryColor]);
  const color2 = useMemo(() => new THREE.Color(secondaryColor), [secondaryColor]);
  
  // DNA helix parameters
  const helixParams = useMemo(() => ({
    radius: 3,
    height: 35,
    turns: 6,
    pointsPerTurn: 50,
  }), []);

  // Generate DNA helix geometry
  const { strand1Positions, strand2Positions, connectionPositions } = useMemo(() => {
    const strand1Positions: number[] = [];
    const strand2Positions: number[] = [];
    const connectionPositions: number[] = [];
    
    const totalPoints = helixParams.turns * helixParams.pointsPerTurn;
    
    for (let i = 0; i < totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * Math.PI * 2 * helixParams.turns;
      const y = (t - 0.5) * helixParams.height;
      
      const x1 = Math.cos(angle) * helixParams.radius;
      const z1 = Math.sin(angle) * helixParams.radius;
      strand1Positions.push(x1, y, z1);
      
      const x2 = Math.cos(angle + Math.PI) * helixParams.radius;
      const z2 = Math.sin(angle + Math.PI) * helixParams.radius;
      strand2Positions.push(x2, y, z2);
      
      if (i % 4 === 0) {
        connectionPositions.push(x1, y, z1, x2, y, z2);
      }
    }
    
    return { strand1Positions, strand2Positions, connectionPositions };
  }, [helixParams]);

  const strand1Geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(strand1Positions, 3));
    return geometry;
  }, [strand1Positions]);

  const strand2Geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(strand2Positions, 3));
    return geometry;
  }, [strand2Positions]);

  const connectionGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(connectionPositions, 3));
    return geometry;
  }, [connectionPositions]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003 + scrollVelocity * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
    }
    
    // Update strand colors with smooth transition
    if (strand1Ref.current) {
      const mat = strand1Ref.current.material as THREE.PointsMaterial;
      mat.color.lerp(color1, 0.05);
      mat.size = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
    }
    
    if (strand2Ref.current) {
      const mat = strand2Ref.current.material as THREE.PointsMaterial;
      mat.color.lerp(color2, 0.05);
      mat.size = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
    }
    
    if (connectionsRef.current) {
      const mat = connectionsRef.current.material as THREE.LineBasicMaterial;
      mat.color.lerp(color1, 0.05);
    }
    
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshBasicMaterial;
      mat.color.lerp(color1, 0.05);
    }
    
    if (glowRingRef.current) {
      glowRingRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      glowRingRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.1);
      const mat = glowRingRef.current.material as THREE.MeshBasicMaterial;
      mat.color.lerp(color2, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <points ref={strand1Ref} geometry={strand1Geometry}>
        <pointsMaterial
          size={0.2}
          color={primaryColor}
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      <points ref={strand2Ref} geometry={strand2Geometry}>
        <pointsMaterial
          size={0.2}
          color={secondaryColor}
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      <lineSegments ref={connectionsRef} geometry={connectionGeometry}>
        <lineBasicMaterial
          color={primaryColor}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      <mesh ref={coreRef}>
        <cylinderGeometry args={[0.3, 0.3, helixParams.height * 0.8, 16]} />
        <meshBasicMaterial
          color={primaryColor}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh ref={glowRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[helixParams.radius + 1.5, 0.1, 16, 64]} />
        <meshBasicMaterial
          color={secondaryColor}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <EnergyParticles radius={helixParams.radius + 0.5} color={primaryColor} />
    </group>
  );
};

const EnergyParticles = ({ radius, color }: { radius: number; color: string }) => {
  const ref = useRef<THREE.Points>(null);
  const targetColor = useMemo(() => new THREE.Color(color), [color]);
  
  const geometry = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      const angle = (i / 100) * Math.PI * 2;
      const y = (Math.random() - 0.5) * 30;
      const r = radius + Math.random() * 2;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [radius]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      const mat = ref.current.material as THREE.PointsMaterial;
      mat.color.lerp(targetColor, 0.05);
      
      const posAttr = ref.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < 100; i++) {
        arr[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.02;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default DNAHelix;
