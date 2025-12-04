import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Zap, Calendar } from 'lucide-react';

export const Header = () => {
  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM d');

  return (
    <motion.header
      className="relative text-center py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Aura */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at center top, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Date */}
      <motion.div
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Calendar className="w-4 h-4" />
        <span className="uppercase tracking-widest">{formattedDate}</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="font-display text-3xl font-bold text-glow tracking-wider"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        TODAY'S PROGRESSION
      </motion.h1>

      {/* Subtitle with Icon */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Zap className="w-4 h-4 text-system-gold" />
        </motion.div>
        <span className="text-sm text-muted-foreground">Power Level Rising</span>
      </motion.div>

      {/* Decorative Lines */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <motion.div
          className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-primary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </div>
    </motion.header>
  );
};
