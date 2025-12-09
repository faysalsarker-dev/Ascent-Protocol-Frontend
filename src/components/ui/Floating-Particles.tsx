"use client";
import { motion } from "framer-motion";


const FloatingParticles = () => {
    return (
        <>
              {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${30 + (i % 3) * 20}%`,
            background: i % 2 === 0 ? "hsl(45 100% 55%)" : "hsl(180 100% 45%)",
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
        </>
    );
};

export default FloatingParticles;