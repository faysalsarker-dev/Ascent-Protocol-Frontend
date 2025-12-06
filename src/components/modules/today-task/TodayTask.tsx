
"use client";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from '@/src/components/modules/today-task/ParticleBackground';
import { Header } from '@/src/components/modules/today-task/Header';
import { ProgressRing } from '@/src/components/modules/today-task/ProgressRing';
import { SystemMessage } from '@/src/components/modules/today-task/SystemMessage';
import { TaskCard } from '@/src/components/modules/today-task/TaskCard';
import { RestDayDisplay } from '@/src/components/modules/today-task/RestDayDisplay';
import { ExerciseDrawer } from '@/src/components/modules/today-task/ExerciseDrawer';
import { ScanlineOverlay, DataStream, CornerBracket, GlitchText } from '@/src/components/modules/today-task/GamifiedEffects';
import { Exercise, getRandomSystemMessage, WorkoutDay } from '@/src/types/workout';
import { Trophy, Swords, Crown, Sparkles } from 'lucide-react';

const sampleWorkoutDay: WorkoutDay = {
  id: '42f2c886-9e10-42b7-bb38-5dbd37e45a1e',
  name: 'Upper Body Power',
  dayOfWeek: 4,
  isRestDay: false,
  exercises: [
    {
      id: '11eced27-afa1-4849-9e3e-7f64810af2b3',
      exerciseName: 'Bench Press',
      muscleGroup: 'CHEST',
      targetSets: 4,
      targetReps: '8-10',
      notes: 'Focus on controlled descent',
    },
    {
      id: '22eced27-afa1-4849-9e3e-7f64810af2b4',
      exerciseName: 'Pull-ups',
      muscleGroup: 'BACK',
      targetSets: 3,
      targetReps: '10-12',
      notes: 'Full range of motion',
    },
    {
      id: '33eced27-afa1-4849-9e3e-7f64810af2b5',
      exerciseName: 'Shoulder Press',
      muscleGroup: 'SHOULDER',
      targetSets: 3,
      targetReps: '10',
    },
    {
      id: '44eced27-afa1-4849-9e3e-7f64810af2b6',
      exerciseName: 'Bicep Curls',
      muscleGroup: 'ARMS',
      targetSets: 3,
      targetReps: '12',
      notes: 'Squeeze at the top',
    },
  ],
};

const TodayTask = () => {
  const [workoutDay] = useState<WorkoutDay>(sampleWorkoutDay);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const systemMessage = useMemo(() => getRandomSystemMessage(), []);

  const progress = useMemo(() => {
    if (workoutDay.exercises.length === 0) return 0;
    return (completedExercises.size / workoutDay.exercises.length) * 100;
  }, [completedExercises, workoutDay.exercises.length]);

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsDrawerOpen(true);
  };

  const handleCompleteExercise = (exerciseId: string) => {
    setCompletedExercises((prev) => new Set([...prev, exerciseId]));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <ParticleBackground />
      
      {/* Subtle scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <ScanlineOverlay />
      </div>
      
      {/* Data streams */}
      <div className="fixed inset-0 pointer-events-none">
        <DataStream />
      </div>

      <motion.div
        className="relative z-10 container max-w-lg mx-auto px-4 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Header />

        {workoutDay.isRestDay ? (
          <RestDayDisplay />
        ) : (
          <>
            {/* Progress Section */}
            <motion.div
              className="flex justify-center my-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            >
              <ProgressRing
                progress={progress}
                completedTasks={completedExercises.size}
                totalTasks={workoutDay.exercises.length}
              />
            </motion.div>

            {/* System Message */}
            <div className="mb-6">
              <SystemMessage message={systemMessage} />
            </div>

            {/* Workout Name Section */}
            <motion.div
              className="relative flex items-center gap-3 mb-5 p-3 rounded-sm bg-card/20 border border-border/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CornerBracket position="tl" />
              <CornerBracket position="br" />
              
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Swords className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Current Quest</span>
                <h2 className="font-mono text-sm text-foreground font-bold">
                  {workoutDay.name}
                </h2>
              </div>
            </motion.div>

            {/* Task List */}
            <div className="space-y-3">
              {workoutDay.exercises.map((exercise, index) => (
                <TaskCard
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  isCompleted={completedExercises.has(exercise.id)}
                  onClick={() => handleExerciseClick(exercise)}
                />
              ))}
            </div>

            {/* Completion Message */}
            {progress === 100 && (
              <motion.div
                className="relative mt-8 p-6 rounded-sm bg-gradient-to-br from-primary/10 via-accent/5 to-yellow-500/10 border border-primary/40 text-center overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {/* Corner brackets */}
                <CornerBracket position="tl" />
                <CornerBracket position="tr" />
                <CornerBracket position="bl" />
                <CornerBracket position="br" />

                {/* Animated glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.2), transparent 70%)',
                  }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Floating sparkles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${10 + Math.random() * 80}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                ))}

                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-block mb-4"
                  >
                    <div className="relative">
                      <Trophy className="w-14 h-14 text-yellow-500 drop-shadow-[0_0_15px_hsl(45_100%_50%)]" />
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <Crown className="w-5 h-5 text-yellow-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <h3 className="font-display text-xl font-bold mb-2">
                    <GlitchText className="bg-gradient-to-r from-primary via-accent to-yellow-500 bg-clip-text text-transparent">
                      QUEST COMPLETE
                    </GlitchText>
                  </h3>
                  
                  <p className="text-sm text-muted-foreground font-mono mb-3">
                    All exercises finished. Shadow power increased.
                  </p>

                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-sm"
                    animate={{
                      boxShadow: ['0 0 0 0 hsl(45 100% 50% / 0)', '0 0 20px 4px hsl(45 100% 50% / 0.3)', '0 0 0 0 hsl(45 100% 50% / 0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-mono font-bold text-yellow-500">+100 XP EARNED</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      <ExerciseDrawer
        exercise={selectedExercise}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onComplete={handleCompleteExercise}
      />
    </div>
  );
};

export default TodayTask;
