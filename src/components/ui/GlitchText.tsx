"use client";

import { useEffect, useState } from "react";

const GlitchText = ({ children, className = "" }: { children: string; className?: string }) => {
  const [glitchActive, setGlitchActive] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`relative inline-block ${className}`}
      data-text={children}
    >
      {glitchActive && (
        <>
          <span className="absolute top-0 left-0.5 text-destructive opacity-70 animate-pulse">
            {children}
          </span>
          <span className="absolute top-0 -left-0.5 text-primary opacity-70 animate-pulse">
            {children}
          </span>
        </>
      )}
      {children}
    </span>
  );
};


export default GlitchText