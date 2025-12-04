import { motion } from 'framer-motion';
import { BatteryCharging, Sparkles, Moon } from 'lucide-react';

export const RestDayDisplay = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Icon Container */}
      <div className="relative mb-8">
        {/* Outer Aura Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-secondary/30"
            style={{
              transform: `scale(${1.5 + i * 0.3})`,
            }}
            animate={{
              scale: [1.5 + i * 0.3, 1.7 + i * 0.3, 1.5 + i * 0.3],
              opacity: [0.3, 0.6, 0.3],
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
          className="rest-day-icon w-32 h-32 rounded-full bg-linear-to-br from-secondary/30 to-primary/20 flex items-center justify-center"
          animate={{
            boxShadow: [
              '0 0 30px hsl(var(--secondary) / 0.4)',
              '0 0 60px hsl(var(--secondary) / 0.6)',
              '0 0 30px hsl(var(--secondary) / 0.4)',
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
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <BatteryCharging className="w-16 h-16 text-secondary" />
          </motion.div>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * 60 * (Math.PI / 180)) * 80],
              y: [0, Math.sin(i * 60 * (Math.PI / 180)) * 80],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            <Sparkles className="w-4 h-4 text-secondary" />
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
        <h2 className="font-display text-2xl font-bold text-glow-purple mb-2">
          REST DAY
        </h2>
        <p className="text-lg text-secondary/80 tracking-wider uppercase">
          System Recharging
        </p>
      </motion.div>

      {/* Status Panel */}
      <motion.div
        className="mt-8 system-panel max-w-xs w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          borderColor: 'hsl(var(--secondary) / 0.3)',
        }}
      >
        <div className="flex items-center gap-3 text-sm">
          <Moon className="w-5 h-5 text-secondary" />
          <div>
            <p className="text-foreground">Recovery Mode Active</p>
            <p className="text-muted-foreground text-xs">
              Muscles regenerating • Energy restored
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
