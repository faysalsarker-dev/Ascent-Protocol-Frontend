
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
import { Exercise, getRandomSystemMessage, WorkoutDay } from '@/src/types/workout';

// Sample workout data
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
      notes: '',
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


  const progress_1 = ()=>{
    if(workoutDay.exercises.length ===0) return 0;
    return (completedExercises.size / workoutDay.exercises.length) *100;
  }
  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsDrawerOpen(true);
  };

  const handleCompleteExercise = (exerciseId: string) => {
    setCompletedExercises((prev) => new Set([...prev, exerciseId]));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Main Content */}
      <motion.div
        className="relative z-10 container max-w-lg mx-auto px-4 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <Header />

        {workoutDay.isRestDay ? (
          <RestDayDisplay />
        ) : (
          <>
            {/* Progress Ring Section */}
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

            {/* Workout Name */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="font-display text-lg text-muted-foreground tracking-wider">
                {workoutDay.name}
              </h2>
            </motion.div>

            {/* Task List */}
            <div className="space-y-4">
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
                className="mt-8 system-panel text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <h3 className="font-display text-xl text-glow mb-2">
                  QUEST COMPLETE
                </h3>
                <p className="text-muted-foreground">
                  All exercises finished. Shadow power increased.
                </p>
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      {/* Exercise Drawer */}
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
