"use client"
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface MuscleScore {
  id: string;
  name: string;
  score: number;
}

interface AnatomyVisualizationProps {
  scores: MuscleScore[];
  className?: string;
}

const getMuscleColor = (score: number) => {
  if (score >= 80) return "hsl(var(--success))";
  if (score >= 50) return "hsl(var(--primary))";
  if (score >= 30) return "hsl(var(--warning))";
  return "hsl(var(--destructive))";
};

const getMuscleOpacity = (score: number) => {
  return Math.max(0.3, score / 100);
};

export const AnatomyVisualization = ({ scores, className }: AnatomyVisualizationProps) => {
  const getScoreById = (id: string) => {
    const muscle = scores.find((s) => s.id === id);
    return muscle?.score || 0;
  };

  const getMuscleStyle = (id: string) => {
    const score = getScoreById(id);
    return {
      fill: getMuscleColor(score),
      fillOpacity: getMuscleOpacity(score),
      transition: "all 0.5s ease",
    };
  };

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 280 600"
        className="w-full h-full drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Base body outline */}
        <g opacity="0.15" stroke="hsl(var(--border))" strokeWidth="1" fill="none">
          {/* Head outline */}
          <ellipse cx="140" cy="50" rx="28" ry="35" />
          {/* Neck */}
          <path d="M 125 80 L 125 95 L 155 95 L 155 80" />
          {/* Torso outline */}
          <path d="M 95 95 Q 85 120 85 180 L 85 280 Q 85 300 105 310 L 140 320 L 175 310 Q 195 300 195 280 L 195 180 Q 195 120 185 95" />
          {/* Arms outline */}
          <path d="M 85 110 Q 60 120 45 180 L 40 220 Q 38 240 50 250" />
          <path d="M 195 110 Q 220 120 235 180 L 240 220 Q 242 240 230 250" />
          {/* Legs outline */}
          <path d="M 105 320 L 100 420 Q 98 470 105 520 L 110 560" />
          <path d="M 175 320 L 180 420 Q 182 470 175 520 L 170 560" />
        </g>

        {/* Muscle Groups - Interactive and Color-Coded */}
        
        {/* Shoulders (Deltoids) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <path
            d="M 95 95 Q 70 100 60 120 Q 55 135 65 145 L 85 130 L 85 105 Z"
            style={getMuscleStyle("shoulders")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
          <path
            d="M 185 95 Q 210 100 220 120 Q 225 135 215 145 L 195 130 L 195 105 Z"
            style={getMuscleStyle("shoulders")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
        </motion.g>

        {/* Chest (Pectorals) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <path
            d="M 110 100 Q 100 110 100 135 Q 100 160 120 170 L 140 165 L 140 105 Z"
            style={getMuscleStyle("chest")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
          <path
            d="M 170 100 Q 180 110 180 135 Q 180 160 160 170 L 140 165 L 140 105 Z"
            style={getMuscleStyle("chest")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
        </motion.g>

        {/* Arms (Biceps/Triceps) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ellipse
            cx="55"
            cy="160"
            rx="12"
            ry="35"
            style={getMuscleStyle("arms")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
          <ellipse
            cx="225"
            cy="160"
            rx="12"
            ry="35"
            style={getMuscleStyle("arms")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
        </motion.g>

        {/* Abs/Core */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <path
            d="M 120 180 L 160 180 L 165 240 L 115 240 Z"
            style={getMuscleStyle("abs")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
          {/* Ab segments */}
          <line x1="120" y1="200" x2="160" y2="200" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
          <line x1="118" y1="220" x2="162" y2="220" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
          <line x1="140" y1="180" x2="140" y2="240" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
        </motion.g>

        {/* Back (Lats/Traps) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <path
            d="M 105 105 Q 90 115 88 145 L 88 200 Q 90 215 105 220 L 118 180 Z"
            style={getMuscleStyle("back")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
            opacity="0.6"
          />
          <path
            d="M 175 105 Q 190 115 192 145 L 192 200 Q 190 215 175 220 L 162 180 Z"
            style={getMuscleStyle("back")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
            opacity="0.6"
          />
        </motion.g>

        {/* Quads/Legs */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ellipse
            cx="115"
            cy="390"
            rx="18"
            ry="70"
            style={getMuscleStyle("quads")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
          <ellipse
            cx="165"
            cy="390"
            rx="18"
            ry="70"
            style={getMuscleStyle("quads")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
        </motion.g>

        {/* Calves */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ellipse
            cx="110"
            cy="510"
            rx="12"
            ry="40"
            style={getMuscleStyle("calves")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
          <ellipse
            cx="170"
            cy="510"
            rx="12"
            ry="40"
            style={getMuscleStyle("calves")}
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
        </motion.g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--success))" }} />
          <span className="text-muted-foreground">Excellent (80+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--primary))" }} />
          <span className="text-muted-foreground">Good (50-79)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--warning))" }} />
          <span className="text-muted-foreground">Fair (30-49)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--destructive))" }} />
          <span className="text-muted-foreground">Needs Work (&lt;30)</span>
        </div>
      </div>
    </div>
  );
};
