import { motion } from 'framer-motion';
import { Flame, Swords, Trophy, Zap } from 'lucide-react';
import { GlitchText, CornerBracket } from './GamifiedEffects';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  completedTasks: number;
  totalTasks: number;
}

export const ProgressRing = ({
  progress,
  size = 180,
  strokeWidth = 10,
  completedTasks,
  totalTasks,
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  const isComplete = progress === 100;

  return (
    <div className="relative" style={{ width: size + 40, height: size + 40 }}>
      {/* Outer decorative ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-dashed border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Corner accents */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* Outer Glow */}
      <motion.div
        className="absolute inset-4 rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 60%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Energy particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            top: "50%",
            left: "50%",
            boxShadow: "0 0 6px hsl(var(--primary))",
          }}
          animate={{
            x: Math.cos((i * Math.PI * 2) / 6 + Date.now() / 1000) * (size / 2 + 10),
            y: Math.sin((i * Math.PI * 2) / 6 + Date.now() / 1000) * (size / 2 + 10),
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* SVG Progress Ring */}
      <svg 
        width={size} 
        height={size} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90"
      >
        {/* Background Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className="stroke-muted/20"
        />
        
        {/* Progress Ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className="stroke-primary"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.6))',
          }}
        />

        {/* Secondary glow ring */}
        {isComplete && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius + 8}
            strokeWidth={2}
            fill="none"
            className="stroke-yellow-500"
            strokeDasharray="8 4"
            animate={{ 
              rotate: 360,
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              opacity: { duration: 1.5, repeat: Infinity }
            }}
            style={{
              transformOrigin: "center",
              filter: 'drop-shadow(0 0 6px hsl(45 100% 50% / 0.5))',
            }}
          />
        )}
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="text-center"
        >
          {isComplete ? (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <Trophy className="w-10 h-10 text-yellow-500 mx-auto drop-shadow-[0_0_12px_hsl(45_100%_50%)]" />
            </motion.div>
          ) : (
            <>
              <motion.div
                className="relative"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-4xl font-display font-bold">
                  <GlitchText className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                    {`${Math.round(progress)}%`}
                  </GlitchText>
                </span>
              </motion.div>
              <div className="flex items-center gap-1 mt-1">
                <Swords className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-mono">
                  {completedTasks}/{totalTasks} Complete
                </span>
              </div>
            </>
          )}
        </motion.div>

        {/* XP indicator */}
        <motion.div
          className="absolute -bottom-2 flex items-center gap-1 px-2 py-0.5 bg-primary/10 border border-primary/30 rounded-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Zap className="w-3 h-3 text-yellow-500" />
          <span className="text-[10px] font-mono text-primary font-bold">+{completedTasks * 25} XP</span>
        </motion.div>
      </div>
    </div>
  );
};
