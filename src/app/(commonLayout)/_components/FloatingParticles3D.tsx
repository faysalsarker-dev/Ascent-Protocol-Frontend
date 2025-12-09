"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingParticles3DProps {
  count?: number;
  scrollProgress: number;
  primaryColor: string;
  secondaryColor: string;
}

const FloatingParticles3D = ({ 
  count = 200, 
  scrollProgress, 
  primaryColor, 
  secondaryColor 
}: FloatingParticles3DProps) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesRef2 = useRef<THREE.Points>(null);
  
  const color1 = useMemo(() => new THREE.Color(primaryColor), [primaryColor]);
  const color2 = useMemo(() => new THREE.Color(secondaryColor), [secondaryColor]);
  
  const { positions, speeds, positions2, speeds2 } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const positions2 = new Float32Array(count * 3);
    const speeds2 = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      speeds[i] = Math.random() * 0.8 + 0.3;
      
      positions2[i * 3] = (Math.random() - 0.5) * 30;
      positions2[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions2[i * 3 + 2] = (Math.random() - 0.5) * 30;
      speeds2[i] = Math.random() * 0.5 + 0.2;
    }
    
    return { positions, speeds, positions2, speeds2 };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const geometry2 = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions2, 3));
    return geo;
  }, [positions2]);

  useFrame((state) => {
    if (particlesRef.current) {
      const positionAttr = particlesRef.current.geometry.attributes.position;
      const posArray = positionAttr.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        posArray[i3 + 1] += Math.sin(state.clock.elapsedTime * speeds[i] + i * 0.1) * 0.015;
        posArray[i3] += Math.cos(state.clock.elapsedTime * speeds[i] * 0.4 + i) * 0.008;
        posArray[i3 + 2] += Math.sin(state.clock.elapsedTime * speeds[i] * 0.3 + i) * 0.008;
        
        if (posArray[i3 + 1] > 25) posArray[i3 + 1] = -25;
        if (posArray[i3 + 1] < -25) posArray[i3 + 1] = 25;
      }
      
      positionAttr.needsUpdate = true;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      
      const mat = particlesRef.current.material as THREE.PointsMaterial;
      mat.color.lerp(color1, 0.03);
    }
    
    if (particlesRef2.current) {
      const positionAttr = particlesRef2.current.geometry.attributes.position;
      const posArray = positionAttr.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        posArray[i3 + 1] += Math.cos(state.clock.elapsedTime * speeds2[i] + i * 0.05) * 0.01;
        posArray[i3] += Math.sin(state.clock.elapsedTime * speeds2[i] * 0.5 + i) * 0.006;
      }
      
      positionAttr.needsUpdate = true;
      particlesRef2.current.rotation.y = -state.clock.elapsedTime * 0.02;
      
      const mat = particlesRef2.current.material as THREE.PointsMaterial;
      mat.color.lerp(color2, 0.03);
    }
  });

  return (
    <>
      <points ref={particlesRef} geometry={geometry}>
        <pointsMaterial
          size={0.12}
          color={primaryColor}
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      <points ref={particlesRef2} geometry={geometry2}>
        <pointsMaterial
          size={0.08}
          color={secondaryColor}
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};

export default FloatingParticles3D;
