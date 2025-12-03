"use client";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { Moon, Dumbbell } from "lucide-react";

interface DayTabProps {
  name: string;
  dayNumber: number;
  isActive: boolean;
  isRestDay: boolean;
  isToday: boolean;
  onClick: () => void;
}

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function DayTab({ name, dayNumber, isActive, isRestDay, isToday, onClick }: DayTabProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-0.5 sm:gap-1 px-2.5 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 min-w-[64px] sm:min-w-[80px]",
        "border border-border/50 backdrop-blur-sm",
        isActive
          ? "bg-primary/20 border-primary glow-primary-sm"
          : "bg-card/50 hover:bg-card/80 hover:border-primary/30",
        isToday && !isActive && "ring-2 ring-accent/50"
      )}
    >
      {isToday && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-bold tracking-wider text-accent uppercase">
          Today
        </span>
      )}
      
      <span className={cn(
        "text-[10px] sm:text-xs font-medium tracking-wider uppercase",
        isActive ? "text-primary" : "text-muted-foreground"
      )}>
        {dayNames[dayNumber]}
      </span>
      
      <div className={cn(
        "flex items-center gap-1 sm:gap-1.5",
        isActive ? "text-foreground" : "text-foreground/80"
      )}>
        {isRestDay ? (
          <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
        ) : (
          <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
        )}
        <span className="text-xs sm:text-sm font-semibold truncate max-w-[45px] sm:max-w-[60px]">{name}</span>
      </div>
      
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-lg bg-primary/10 -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}

export default DayTab;