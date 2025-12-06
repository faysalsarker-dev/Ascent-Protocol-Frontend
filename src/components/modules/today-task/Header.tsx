import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Zap, Calendar, Shield, Flame, Target } from 'lucide-react';
import { GlitchText, CornerBracket, StatusBadge } from './GamifiedEffects';

export const Header = () => {
  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM d');

  return (
    <motion.header
      className="relative py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Aura */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at center top, hsl(var(--primary) / 0.15) 0%, transparent 60%)',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Top Status Bar */}
      <motion.div
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatusBadge label="STATUS" value="ACTIVE" color="primary" />
        <motion.div
          className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-sm"
          animate={{ 
            boxShadow: ['0 0 0 0 hsl(45 100% 50% / 0)', '0 0 8px 2px hsl(45 100% 50% / 0.3)', '0 0 0 0 hsl(45 100% 50% / 0)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Flame className="w-3 h-3 text-yellow-500" />
          <span className="text-xs font-mono text-yellow-500">STREAK: 7</span>
        </motion.div>
      </motion.div>

      {/* Main Title Area */}
      <div className="relative text-center py-4">
        {/* Corner Brackets */}
        <CornerBracket position="tl" />
        <CornerBracket position="tr" />
        <CornerBracket position="bl" />
        <CornerBracket position="br" />

        {/* Hunter Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-sm bg-primary/10 border border-primary/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-3 h-3 text-primary" />
          </motion.div>
          <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
            Hunter Protocol Active
          </span>
        </motion.div>

        {/* Date */}
        <motion.div
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Calendar className="w-4 h-4" />
          <span className="uppercase tracking-[0.15em] font-mono text-xs">{formattedDate}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-display text-2xl md:text-3xl font-bold tracking-wider"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <GlitchText className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            DAILY QUEST
          </GlitchText>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-4 h-4 text-yellow-500" />
          </motion.div>
          <span className="text-xs text-muted-foreground font-mono tracking-wider">
            POWER LEVEL RISING
          </span>
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Target className="w-4 h-4 text-primary" />
          </motion.div>
        </motion.div>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <motion.div
            className="h-px w-16 bg-gradient-to-r from-transparent to-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
          <motion.div
            className="w-2 h-2 rotate-45 bg-primary"
            animate={{ 
              boxShadow: ['0 0 4px hsl(var(--primary))', '0 0 12px hsl(var(--primary))', '0 0 4px hsl(var(--primary))'],
              rotate: [45, 225, 45]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="h-px w-16 bg-gradient-to-l from-transparent to-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
        </div>
      </div>
    </motion.header>
  );
};
