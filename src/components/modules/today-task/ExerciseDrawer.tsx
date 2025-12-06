import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/src/components/ui/drawer';
import { Target, TrendingUp, MessageSquare, ChevronRight, Plus, Trash2, Zap, Swords, Award } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Exercise, PreviousPerformance } from '@/src/types/workout';
import { GlitchText, CornerBracket, ScanlineOverlay } from './GamifiedEffects';

interface ExerciseDrawerProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (exerciseId: string) => void;
}

interface SetInput {
  id: string;
  reps: string;
  weight: string;
}

export const ExerciseDrawer = ({ exercise, isOpen, onClose, onComplete }: ExerciseDrawerProps) => {
  const [sets, setSets] = useState<SetInput[]>([]);

  useEffect(() => {
    if (exercise && isOpen) {
      setSets(
        Array.from({ length: exercise.targetSets }, (_, i) => ({
          id: `set-${i}-${Date.now()}`,
          reps: '',
          weight: '',
        }))
      );
    }
  }, [exercise, isOpen]);

  const previousPerformance: PreviousPerformance = {
    date: '2024-01-10',
    sets: [
      { reps: 13, weight: 50 },
      { reps: 12, weight: 50 },
      { reps: 13, weight: 45 },
    ],
  };

  const handleSetChange = (id: string, field: 'reps' | 'weight', value: string) => {
    setSets((prev) =>
      prev.map((set) => (set.id === id ? { ...set, [field]: value } : set))
    );
  };

  const handleAddSet = () => {
    setSets((prev) => [
      ...prev,
      { id: `set-${prev.length}-${Date.now()}`, reps: '', weight: '' },
    ]);
  };

  const handleRemoveSet = (id: string) => {
    if (sets.length > 1) {
      setSets((prev) => prev.filter((set) => set.id !== id));
    }
  };

  const handleComplete = () => {
    if (!exercise) return;
    onComplete(exercise.id);
    onClose();
  };

  if (!exercise) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-background/95 backdrop-blur-xl border-t border-primary/40 overflow-hidden">
        {/* Scanline effect */}
        <ScanlineOverlay />

        {/* Top Glow Line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative z-10 mx-auto w-full max-w-lg px-4 pb-8">
          <DrawerHeader className="px-0 relative">
            {/* Corner brackets */}
            <CornerBracket position="tl" />
            <CornerBracket position="tr" />

            <DrawerTitle className="font-display text-lg text-foreground flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <Target className="w-5 h-5 text-primary" />
              </motion.div>
              <GlitchText>{exercise.exerciseName}</GlitchText>
            </DrawerTitle>
            
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] rounded-sm bg-primary/10 text-primary border border-primary/30 font-mono uppercase">
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                {exercise.muscleGroup}
              </span>
              <span className="text-sm text-muted-foreground font-mono">
                {exercise.targetSets} sets × {exercise.targetReps} reps
              </span>
            </div>
          </DrawerHeader>

          {/* Previous Performance */}
          <motion.div
            className="relative mb-5 p-4 rounded-sm bg-card/30 border border-accent/30 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CornerBracket position="tl" color="accent" />
            <CornerBracket position="br" color="accent" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-xs text-accent font-mono uppercase tracking-wider">Previous Session</span>
              </div>
              <div className="flex gap-2">
                {previousPerformance.sets.map((set, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 p-3 rounded-sm bg-background/50 border border-border/30 text-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-xl font-bold text-foreground font-mono">{set.reps}</span>
                    <span className="text-[10px] text-muted-foreground block font-mono uppercase">reps</span>
                    {set.weight && (
                      <span className="text-xs text-primary font-mono font-bold">{set.weight}kg</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* System Tip */}
          <motion.div
            className="flex items-start gap-3 mb-5 p-3 rounded-sm bg-primary/5 border border-primary/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageSquare className="w-4 h-4 text-primary mt-0.5" />
            </motion.div>
            <p className="text-xs text-primary/90 font-mono leading-relaxed">
              ◆ SYSTEM: Exceed your limits. Shadow extraction awaits the worthy. ◆
            </p>
          </motion.div>

          {/* Set Inputs */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs text-muted-foreground flex items-center gap-2 font-mono uppercase tracking-wider">
                <Swords className="w-4 h-4 text-primary" />
                Log Your Sets
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddSet}
                className="text-primary hover:text-primary hover:bg-primary/10 gap-1 h-7 text-xs font-mono"
              >
                <Plus className="w-3 h-3" />
                Add Set
              </Button>
            </div>

            <AnimatePresence mode="popLayout">
              {sets.map((set, i) => (
                <motion.div
                  key={set.id}
                  layout
                  className="relative flex items-center gap-3 p-3 rounded-sm bg-card/20 border border-border/30 group overflow-hidden"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {/* Set number badge */}
                  <motion.span
                    className="w-9 h-9 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.span>

                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Reps"
                      className="w-full px-3 py-2.5 rounded-sm bg-background/50 border border-border/40 text-foreground text-center text-sm font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                      value={set.reps}
                      onChange={(e) => handleSetChange(set.id, 'reps', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Weight (kg)"
                      className="w-full px-3 py-2.5 rounded-sm bg-background/50 border border-border/40 text-foreground text-center text-sm font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                      value={set.weight}
                      onChange={(e) => handleSetChange(set.id, 'weight', e.target.value)}
                    />
                  </div>

                  {sets.length > 1 && (
                    <motion.button
                      className="p-1.5 rounded-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => handleRemoveSet(set.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Complete Button */}
          <motion.button
            className="relative w-full py-4 px-6 rounded-sm bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleComplete}
            style={{
              boxShadow: '0 0 20px hsl(var(--primary) / 0.4)',
            }}
          >
            {/* Animated shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            
            <Award className="w-5 h-5" />
            <span>Complete Exercise</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* XP Preview */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-mono text-yellow-500">+25 XP on completion</span>
          </motion.div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
