import { motion } from 'framer-motion';
import { Utensils, TrendingUp, Dumbbell, Sparkles } from 'lucide-react';
import { CornerBracket } from '@/src/components/modules/today-task/GamifiedEffects';

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  message: string;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'diet',
    icon: <Utensils className="w-5 h-5" />,
    label: 'DIET PROTOCOL',
    message: 'Create a personalized diet plan based on my current progress and fitness goals. Include meal timing, macros breakdown, and food suggestions that align with my workout schedule.',
    color: 'primary',
  },
  {
    id: 'report',
    icon: <TrendingUp className="w-5 h-5" />,
    label: 'JOURNEY ANALYSIS',
    message: 'Analyze my fitness journey so far. Give me a detailed report on my progress, areas of improvement, consistency patterns, and recommendations to level up faster.',
    color: 'accent',
  },
  {
    id: 'workout',
    icon: <Dumbbell className="w-5 h-5" />,
    label: 'NEW QUEST LINE',
    message: 'Design an optimized workout plan tailored for my best output. Consider my current level, recovery capacity, and goals to create a challenging but achievable training protocol.',
    color: 'secondary',
  },
];

interface QuickActionsProps {
  onSelect: (message: string) => void;
  disabled?: boolean;
}

export const QuickActions = ({ onSelect, disabled }: QuickActionsProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
        <Sparkles className="w-3 h-3 text-primary" />
        <span>Quick Commands</span>
      </div>
      
      <div className="grid gap-3">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.id}
            onClick={() => onSelect(action.message)}
            disabled={disabled}
            className={`relative p-4 rounded-xl text-left transition-all ${
              disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-[1.02] active:scale-[0.98]'
            } ${
              action.color === 'primary' 
                ? 'bg-primary/10 border border-primary/30 hover:border-primary/50'
                : action.color === 'accent'
                ? 'bg-accent/10 border border-accent/30 hover:border-accent/50'
                : 'bg-secondary/10 border border-secondary/30 hover:border-secondary/50'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!disabled ? { 
              boxShadow: action.color === 'primary'
                ? '0 0 20px hsl(var(--primary)/0.3)'
                : action.color === 'accent'
                ? '0 0 20px hsl(var(--accent)/0.3)'
                : '0 0 20px hsl(var(--secondary)/0.3)'
            } : {}}
          >
            <CornerBracket position="tl" color={action.color === 'secondary' ? 'primary' : action.color as 'primary' | 'accent'} />
            <CornerBracket position="br" color={action.color === 'secondary' ? 'primary' : action.color as 'primary' | 'accent'} />

            <div className="flex items-center gap-3">
              <motion.div
                className={`p-2 rounded-lg ${
                  action.color === 'primary' 
                    ? 'bg-primary/20 text-primary'
                    : action.color === 'accent'
                    ? 'bg-accent/20 text-accent'
                    : 'bg-secondary/20 text-secondary'
                }`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
              >
                {action.icon}
              </motion.div>
              
              <div>
                <h4 className={`font-display text-sm font-semibold ${
                  action.color === 'primary' 
                    ? 'text-primary'
                    : action.color === 'accent'
                    ? 'text-accent'
                    : 'text-secondary'
                }`}>
                  {action.label}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {action.message.slice(0, 50)}...
                </p>
              </div>
            </div>

            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              animate={{
                boxShadow: [
                  `inset 0 0 0 1px hsl(var(--${action.color})/0.1)`,
                  `inset 0 0 0 1px hsl(var(--${action.color})/0.3)`,
                  `inset 0 0 0 1px hsl(var(--${action.color})/0.1)`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
