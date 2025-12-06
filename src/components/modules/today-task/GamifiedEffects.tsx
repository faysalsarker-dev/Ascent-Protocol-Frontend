import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const GlitchText = ({ children, className = "" }: { children: string; className?: string }) => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {glitchActive && (
        <>
          <span className="absolute top-0 left-0.5 text-primary opacity-70">
            {children}
          </span>
          <span className="absolute top-0 -left-0.5 text-accent opacity-70">
            {children}
          </span>
        </>
      )}
      {children}
    </span>
  );
};

export const ScanlineOverlay = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-30">
    <div 
      className="absolute inset-0"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          hsl(var(--primary) / 0.03) 2px,
          hsl(var(--primary) / 0.03) 4px
        )`
      }}
    />
    <motion.div
      className="absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
      initial={{ top: "-48px" }}
      animate={{ top: "100%" }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export const DataStream = () => {
  const chars = "01アイウエオカキクケコ◆◇▲▼";
  const [streams, setStreams] = useState<string[]>([]);

  useEffect(() => {
    const newStreams = Array(6).fill(0).map(() => 
      Array(12).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
    );
    setStreams(newStreams);
    
    const interval = setInterval(() => {
      setStreams(prev => prev.map(stream => 
        stream.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
      ));
    }, 120);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
      {streams.map((stream, i) => (
        <motion.div
          key={i}
          className="absolute text-primary text-[8px] font-mono whitespace-nowrap"
          style={{ 
            left: `${i * 16}%`,
            writingMode: "vertical-rl"
          }}
          initial={{ top: "-100%" }}
          animate={{ top: "100%" }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2
          }}
        >
          {stream}
        </motion.div>
      ))}
    </div>
  );
};

export const CornerBracket = ({ position, color = "primary" }: { position: "tl" | "tr" | "bl" | "br"; color?: "primary" | "accent" | "destructive" }) => {
  const positionClasses = {
    tl: "top-0 left-0 border-t-2 border-l-2",
    tr: "top-0 right-0 border-t-2 border-r-2",
    bl: "bottom-0 left-0 border-b-2 border-l-2",
    br: "bottom-0 right-0 border-b-2 border-r-2",
  };
  
  const colorClasses = {
    primary: "border-primary",
    accent: "border-accent",
    destructive: "border-destructive",
  };

  return (
    <motion.div
      className={`absolute w-4 h-4 ${positionClasses[position]} ${colorClasses[color]}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    />
  );
};

export const HexagonIcon = ({ icon: Icon, color = "primary", size = "md" }: { 
  icon: React.ComponentType<{ className?: string }>; 
  color?: "primary" | "accent" | "yellow";
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };
  
  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };
  
  const colorVars = {
    primary: "var(--primary)",
    accent: "var(--accent)",
    yellow: "45, 100%, 50%",
  };

  return (
    <div className="relative">
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{ rotateY: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <motion.polygon
            points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
            fill="none"
            stroke={`hsl(${colorVars[color]})`}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.polygon
            points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5"
            fill={`hsl(${colorVars[color]} / 0.1)`}
            stroke={`hsl(${colorVars[color]} / 0.5)`}
            strokeWidth="1"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Icon className={`${iconSizes[size]} text-primary`} />
      </motion.div>
      
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ 
            top: "50%", 
            left: "50%",
            background: `hsl(${colorVars[color]})`,
            boxShadow: `0 0 8px hsl(${colorVars[color]})`
          }}
          animate={{
            x: [0, Math.cos((i * 2 * Math.PI) / 3) * 30, 0],
            y: [0, Math.sin((i * 2 * Math.PI) / 3) * 30, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export const StatusBadge = ({ label, value, color = "primary" }: { 
  label: string; 
  value: string; 
  color?: "primary" | "accent" | "yellow" 
}) => {
  const colorClasses = {
    primary: "border-primary/30 text-primary bg-primary/10",
    accent: "border-accent/30 text-accent bg-accent/10",
    yellow: "border-yellow-500/30 text-yellow-500 bg-yellow-500/10",
  };

  return (
    <motion.div
      className={`px-3 py-1.5 rounded-sm border ${colorClasses[color]} font-mono text-xs`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <span className="opacity-60">{label}:</span> <span className="font-bold">{value}</span>
    </motion.div>
  );
};
