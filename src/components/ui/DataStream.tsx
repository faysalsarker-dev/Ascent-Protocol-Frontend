"use client";

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const DataStream = () => {
  const chars = "01アイウエオカキクケコサシスセソ";
  
  // Initialize streams state with lazy initialization
  const [streams, setStreams] = useState<string[]>(() =>
    Array(8).fill(0).map(() => 
      Array(10).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
    )
  );

  const [animationConfig] = useState(() => 
    Array(8).fill(0).map(() => ({
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStreams(prev => prev.map(stream => 
        stream.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
      ));
    }, 100);
    
    return () => clearInterval(interval);
  }, [chars]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {streams.map((stream, i) => (
        <motion.div
          key={i}
          className="absolute text-primary text-[8px] font-mono whitespace-nowrap"
          style={{ 
            left: `${(i * 12.5)}%`,
            writingMode: "vertical-rl"
          }}
          initial={{ top: "-100%" }}
          animate={{ top: "100%" }}
          transition={{
            duration: animationConfig[i].duration,
            repeat: Infinity,
            ease: "linear",
            delay: animationConfig[i].delay
          }}
        >
          {stream}
        </motion.div>
      ))}
    </div>
  );
};

export default DataStream