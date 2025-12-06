import { motion } from 'framer-motion';
import { BatteryCharging, Moon, Sparkles } from 'lucide-react';

export const RestDayDisplay = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Icon Container */}
      <div className="relative mb-8">
        {/* Aura Rings */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-accent/20"
            style={{
              transform: `scale(${1.4 + i * 0.3})`,
            }}
            animate={{
              scale: [1.4 + i * 0.3, 1.6 + i * 0.3, 1.4 + i * 0.3],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Central Icon */}
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center border border-accent/30"
          animate={{
            boxShadow: [
              '0 0 20px hsl(var(--accent) / 0.2)',
              '0 0 40px hsl(var(--accent) / 0.3)',
              '0 0 20px hsl(var(--accent) / 0.2)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <BatteryCharging className="w-10 h-10 text-accent" />
          </motion.div>
        </motion.div>

        {/* Floating Sparkles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * 90 * (Math.PI / 180)) * 50],
              y: [0, Math.sin(i * 90 * (Math.PI / 180)) * 50],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            <Sparkles className="w-3 h-3 text-accent" />
          </motion.div>
        ))}
      </div>

      {/* Message */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="font-display text-xl font-bold text-accent mb-2">
          REST DAY
        </h2>
        <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">
          System Recharging
        </p>
      </motion.div>

      {/* Status Panel */}
      <motion.div
        className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/20 max-w-xs w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-3 text-sm">
          <Moon className="w-5 h-5 text-accent" />
          <div>
            <p className="text-foreground font-medium">Recovery Mode Active</p>
            <p className="text-muted-foreground text-xs font-mono">
              Muscles regenerating • Energy restored
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
