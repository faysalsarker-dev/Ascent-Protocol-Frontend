import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/src/components/ui/drawer';
import { Target, TrendingUp, MessageSquare, ChevronRight, Plus, Trash2, Zap } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Exercise, PreviousPerformance } from '@/src/types/workout';

interface ExerciseDrawerProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (exerciseId: string, sets: Array<{ reps: number; weight?: number }>) => void;
}

interface SetInput {
  id: string;
  reps: string;
  weight: string;
}

export const ExerciseDrawer = ({ exercise, isOpen, onClose, onComplete }: ExerciseDrawerProps) => {
  const [sets, setSets] = useState<SetInput[]>([]);

  // Initialize sets when exercise changes
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

  // Mock previous performance data
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

    const completedSets = sets.map((set) => ({
      reps: parseInt(set.reps) || 0,
      weight: set.weight ? parseFloat(set.weight) : undefined,
    }));

    onComplete(exercise.id, completedSets);
    onClose();
  };

  if (!exercise) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-background/80 backdrop-blur-2xl border-t border-primary/40 shadow-[0_-10px_60px_-10px_hsl(var(--primary)/0.3)]">
        {/* Animated Top Edge */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{
            opacity: [0.4, 1, 0.4],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="mx-auto w-full max-w-lg px-4 pb-8">
          <DrawerHeader className="px-0">
            <DrawerTitle className="font-display text-xl text-foreground flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Target className="w-5 h-5 text-primary" />
              </motion.div>
              {exercise.exerciseName}
            </DrawerTitle>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
                {exercise.muscleGroup}
              </span>
              <span className="text-sm text-muted-foreground">
                {exercise.targetSets} sets × {exercise.targetReps} reps
              </span>
            </div>
          </DrawerHeader>

          {/* Previous Performance - Glassmorphic */}
          <motion.div
            className="relative mb-6 p-4 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Glass shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="font-display text-sm text-accent">Previous Session</span>
              </div>
              <div className="flex gap-2">
                {previousPerformance.sets.map((set, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 p-3 rounded-xl bg-background/60 backdrop-blur-sm border border-border/40 text-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-lg font-bold text-foreground">{set.reps}</span>
                    <span className="text-xs text-muted-foreground block">reps</span>
                    {set.weight && (
                      <span className="text-xs text-primary font-medium">{set.weight}kg</span>
                    )}
                  </motion.div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Previous session was strong. Hit all sections this time.
              </p>
            </div>
          </motion.div>

          {/* System Suggestion - Glassmorphic */}
          <motion.div
            className="flex items-start gap-3 mb-6 p-4 rounded-2xl bg-secondary/10 backdrop-blur-xl border border-secondary/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageSquare className="w-4 h-4 text-secondary mt-0.5" />
            </motion.div>
            <p className="text-sm text-secondary font-medium">
              SYSTEM: Maintain full aura output. Push beyond limits.
            </p>
          </motion.div>

          {/* Dynamic Set Inputs */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Log Your Sets
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddSet}
                className="text-primary hover:text-primary hover:bg-primary/10 gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Set
              </Button>
            </div>

            <AnimatePresence mode="popLayout">
              {sets.map((set, i) => (
                <motion.div
                  key={set.id}
                  layout
                  className="relative flex items-center gap-3 p-4 rounded-2xl bg-card/30 backdrop-blur-xl border border-border/40 shadow-md overflow-hidden group"
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />

                  <motion.span
                    className="relative z-10 w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center text-sm font-bold text-primary"
                    whileHover={{ scale: 1.1 }}
                  >
                    {i + 1}
                  </motion.span>

                  <div className="relative z-10 flex-1 grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Reps"
                      className="w-full px-4 py-3 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 text-foreground text-center placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                      value={set.reps}
                      onChange={(e) => handleSetChange(set.id, 'reps', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Weight (kg)"
                      className="w-full px-4 py-3 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 text-foreground text-center placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                      value={set.weight}
                      onChange={(e) => handleSetChange(set.id, 'weight', e.target.value)}
                    />
                  </div>

                  {sets.length > 1 && (
                    <motion.button
                      className="relative z-10 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
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

          {/* Complete Button - Enhanced */}
          <motion.button
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-display font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleComplete}
          >
            Complete Session
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};