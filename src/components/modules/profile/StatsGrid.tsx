import { motion } from "framer-motion";
import { Swords, Flame, Trophy, Target, TrendingUp } from "lucide-react";

interface StatsGridProps {
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  suffix?: string;
  accentColor: string;
  delay: number;
  trend?: string;
}

const StatCard = ({ icon, label, value, suffix, accentColor, delay, trend }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-muted/30 p-2 relative"
    >
      {/* Corner decoration */}
      <div 
        className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 rounded-tl"
        style={{ borderColor: accentColor }}
      />
      <div 
        className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 rounded-br"
        style={{ borderColor: accentColor }}
      />

      {/* Icon */}
      <div 
        className="w-10 h-10 rounded flex items-center justify-center mb-2"
        style={{ 
          backgroundColor: `${accentColor}20`,
          boxShadow: `0 0 20px ${accentColor}30`
        }}
      >
        <div style={{ color: accentColor }}>{icon}</div>
      </div>

      {/* Label */}
      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </p>

      {/* Value */}
      <div className="flex items-baseline gap-1">
        <span 
          className="font-display text-3xl font-bold"
          style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}50` }}
        >
          {value}
        </span>
        {suffix && (
          <span className="font-body text-sm text-muted-foreground">{suffix}</span>
        )}
      </div>

      {/* Trend indicator */}
      {trend && (
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="w-3 h-3 text-success" />
          <span className="font-mono text-[10px] text-success">{trend}</span>
        </div>
      )}
    </motion.div>
  );
};

export const StatsGrid = ({ totalWorkouts, currentStreak, longestStreak }: StatsGridProps) => {
  const questClear = Math.round((totalWorkouts / (totalWorkouts + 10)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="px-4 mt-6"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-linear-to-r from-primary/50 to-transparent" />
        <h2 className="font-display text-sm tracking-[0.2em] text-primary">
          COMBAT STATS
        </h2>
        <div className="flex-1 h-px bg-linear-to-l from-primary/50 to-transparent" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<Swords className="w-5 h-5" />}
          label="Dungeons Cleared"
          value={totalWorkouts}
          accentColor="hsl(195, 100%, 50%)"
          delay={0.7}
          trend="+12 this week"
        />
        <StatCard
          icon={<Flame className="w-5 h-5" />}
          label="Active Streak"
          value={currentStreak}
          suffix="days"
          accentColor="hsl(0, 90%, 55%)"
          delay={0.8}
          trend="On fire!"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5" />}
          label="Best Record"
          value={longestStreak}
          suffix="days"
          accentColor="hsl(45, 100%, 50%)"
          delay={0.9}
        />
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Quest Clear Rate"
          value={questClear}
          suffix="%"
          accentColor="hsl(260, 80%, 55%)"
          delay={1.0}
        />
      </div>
    </motion.div>
  );
};
