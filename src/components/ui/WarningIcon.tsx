
import { motion } from 'framer-motion';
import { Skull } from 'lucide-react';

const WarningIcon = () => (
  <div className="relative">
    <motion.div
      className="w-20 h-20 relative"
      animate={{ 
        rotateY: [0, 180, 360],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      {/* Hexagon background */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <motion.polygon
          points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-destructive"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.polygon
          points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5"
          fill="hsl(var(--destructive) / 0.1)"
          stroke="currentColor"
          strokeWidth="1"
          className="text-destructive/50"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </motion.div>
    
    {/* Center icon */}
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <Skull className="w-8 h-8 text-destructive drop-shadow-[0_0_10px_hsl(var(--destructive))]" />
    </motion.div>
    
    {/* Orbiting particles */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-destructive rounded-full"
        style={{ 
          top: "50%", 
          left: "50%",
          boxShadow: "0 0 10px hsl(var(--destructive))"
        }}
        animate={{
          x: [0, Math.cos((i * 2 * Math.PI) / 3) * 40, 0],
          y: [0, Math.sin((i * 2 * Math.PI) / 3) * 40, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);


export default WarningIcon