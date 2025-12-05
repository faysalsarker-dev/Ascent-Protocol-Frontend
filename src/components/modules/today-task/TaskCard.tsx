import { motion } from 'framer-motion';
import { Exercise, getMuscleGroupImage } from '@/src/types/workout';
import { Dumbbell, Target, FileText } from 'lucide-react';
import { Card } from '@/src/components/ui/card';
import Image from 'next/image';




interface TaskCardProps {
  exercise: Exercise;
  index: number;
  isCompleted?: boolean;
  onClick: () => void;
}

export const TaskCard = ({ exercise, index, isCompleted = false, onClick }: TaskCardProps) => {
  const imagePath = getMuscleGroupImage(exercise.muscleGroup);

  return (
   <Card className='p-0'>
      <motion.div
        className={`task-card p-4 ${isCompleted ? 'opacity-60' : ''}`}
        initial={{ opacity: 0, y: 30, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          {/* Muscle Group Icon/Image */}
          <div className="relative w-16 h-16 shrink-0">
            <motion.div
              className="absolute inset-0 rounded-lg bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 10px hsl(var(--primary) / 0.3)',
                  '0 0 20px hsl(var(--primary) / 0.5)',
                  '0 0 10px hsl(var(--primary) / 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
<Image 
src={imagePath}
alt="Muscle Group"
width={64}
height={64}
/>
            </motion.div>
            
            {/* Completion Badge */}
            {isCompleted && (
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <span className="text-xs">✓</span>
              </motion.div>
            )}
          </div>
  
          {/* Exercise Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-semibold text-foreground truncate">
              {exercise.exerciseName}
            </h3>
            
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1 text-sm text-primary">
                <Target className="w-3 h-3" />
                <span>{exercise.targetSets} sets</span>
              </div>
              
              {exercise.targetReps !== '0' && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>×{exercise.targetReps} reps</span>
                </div>
              )}
            </div>
  
            {/* Muscle Group Tag */}
            <div className="mt-2">
              <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                {exercise.muscleGroup}
              </span>
            </div>
          </div>
  
          {/* Arrow Indicator */}
          <motion.div
            className="text-muted-foreground"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.div>
        </div>
  
        {/* Notes Preview */}
        {exercise.notes && (
          <div className="mt-3 pt-3 border-t border-border/30">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <FileText className="w-3 h-3 mt-0.5 shrink-0" />
              <span className="line-clamp-2">{exercise.notes}</span>
            </div>
          </div>
        )}
  
        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0"
          style={{
            background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
          }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
   </Card>
  );
};
