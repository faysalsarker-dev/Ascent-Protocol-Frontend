"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import DNAHelix from "./DNAHelix";
import FloatingParticles3D from "./FloatingParticles3D";

interface DNAAnimationBackgroundProps {
  scrollProgress: number;
  scrollVelocity: number;
  primaryColor: string;
  secondaryColor: string;
}

const DNAAnimationBackground = ({ 
  scrollProgress, 
  scrollVelocity, 
  primaryColor, 
  secondaryColor 
}: DNAAnimationBackgroundProps) => {
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setMounted(true);
}, []);



  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-radial from-secondary/20 via-background to-background" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-[oklch(0.06_0.02_280)] via-[oklch(0.08_0.02_280)] to-[oklch(0.06_0.02_280)]" />
      
      {/* Dynamic glow effects based on current color */}
      <div className="absolute inset-0 transition-all duration-1000">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[180px] opacity-30 transition-colors duration-1000"
          style={{ backgroundColor: primaryColor }}
        />
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 transition-colors duration-1000"
          style={{ backgroundColor: secondaryColor }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 transition-colors duration-1000"
          style={{ backgroundColor: primaryColor }}
        />
      </div>
      
      {/* 3D Canvas - Full viewport */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 50 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[20, 20, 20]} intensity={2} color={primaryColor} />
            <pointLight position={[-20, -20, -20]} intensity={1.5} color={secondaryColor} />
            <pointLight position={[0, 0, 15]} intensity={0.8} color="#ffffff" />
            
            <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
              <DNAHelix 
                scrollProgress={scrollProgress} 
                scrollVelocity={scrollVelocity}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            </Float>
            
            <FloatingParticles3D 
              count={300} 
              scrollProgress={scrollProgress}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
            
            <Stars
              radius={100}
              depth={80}
              count={2500}
              factor={6}
              saturation={0.3}
              fade
              speed={1}
            />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0,0,0,0.6) 100%)"
        }}
      />
      
      {/* Subtle scan lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)"
        }}
      />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default DNAAnimationBackground;
