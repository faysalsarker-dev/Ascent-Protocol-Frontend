"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from '@/src/components/modules/today-task/ParticleBackground';
import { Header } from '@/src/components/modules/today-task/Header';
import { ProgressRing } from '@/src/components/modules/today-task/ProgressRing';
import { SystemMessage } from '@/src/components/modules/today-task/SystemMessage';
import { TaskCard } from '@/src/components/modules/today-task/TaskCard';
import { RestDayDisplay } from '@/src/components/modules/today-task/RestDayDisplay';
import { ExerciseDrawer } from '@/src/components/modules/today-task/ExerciseDrawer';
import { ScanlineOverlay, DataStream, CornerBracket, GlitchText } from '@/src/components/modules/today-task/GamifiedEffects';
import { Exercise, getRandomSystemMessage } from '@/src/types/workout';
import { Trophy, Swords } from 'lucide-react';
import { useTodayWorkoutDay } from '@/src/hooks/useWorkoutPlan';
import { useCreateWorkoutSession, useCurrentWorkoutSession,useLastWorkoutSession } from '@/src/hooks/useWorkoutSessions';
import { toast } from 'sonner';

const TodayTask = () => {

  const { data } = useTodayWorkoutDay();
  const {data: currentSesson}=useCurrentWorkoutSession()
  const {data: lastSesson}=useLastWorkoutSession()
const {mutate}=useCreateWorkoutSession()



  const workoutDay = data?.data ?? {};

  console.log(lastSesson,'currentSesson')
  const exercises = workoutDay.exercises ?? [];

  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ⭐ NEW STATE
  const [sessionStarted, setSessionStarted] = useState(true);

  const systemMessage = getRandomSystemMessage();

  const progress =
    exercises.length === 0
      ? 0
      : (completedExercises.size / exercises.length) * 100;

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsDrawerOpen(true);
  };

  const handleCompleteExercise = (exerciseId: string) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]));
  };


  const onWorkoutStart = async () => {
  if (!workoutDay?.id) {
    toast.error("Workout day data not loaded.");
    return;
  }

  const payload = {
    workoutDayId: workoutDay.id,
    dayName: workoutDay.name,
  };

  mutate(payload, {
    onSuccess: () => {
      setSessionStarted(true);

      toast.success("Let's crush today's workout! 💪");

      console.log("start your workout");
    },

    
  });
};



// useEffect(()=>{
// if(currentSesson?.data){
// setSessionStarted(true)
// }

// },[currentSesson.data])

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <ParticleBackground />

      <div className="fixed inset-0 pointer-events-none opacity-20">
        <ScanlineOverlay />
      </div>

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

        {/* ⭐ REST DAY CHECK */}
        {workoutDay.isRestDay ? (
          <RestDayDisplay />
        ) : (

          <>
            {/* ⭐ IF SESSION NOT STARTED → Show Start Button */}
            {!sessionStarted && (
              <motion.button
                onClick={onWorkoutStart}
                className="w-full mt-8 py-3 bg-primary text-white rounded-md font-bold tracking-wide border border-primary/40 hover:bg-primary/80 transition"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                Start Session
              </motion.button>
            )}

            {/* ⭐ IF SESSION STARTED → Show Exercises */}
            {sessionStarted && (
              <>
                {/* Progress Circle */}
                <motion.div
                  className="flex justify-center my-8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <ProgressRing
                    progress={progress}
                    completedTasks={completedExercises.size}
                    totalTasks={exercises.length}
                  />
                </motion.div>

                {/* System Message */}
                <div className="mb-6">
                  <SystemMessage message={systemMessage} />
                </div>

                {/* Day Name */}
                <motion.div
                  className="relative flex items-center gap-3 mb-5 p-3 rounded-sm bg-card/20 border border-border/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <CornerBracket position="tl" />
                  <CornerBracket position="br" />

                  <Swords className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-[10px] uppercase text-muted-foreground">
                      Current Quest
                    </span>
                    <h2 className="text-sm font-bold">
                      {workoutDay.name ?? "Loading..."}
                    </h2>
                  </div>
                </motion.div>

                {/* Exercise List */}
                <div className="space-y-3">
                  {exercises.map((exercise, index) => (
                    <TaskCard
                      key={exercise.id}
                      exercise={exercise}
                      index={index}
                      isCompleted={completedExercises.has(exercise.id)}
                      onClick={() => handleExerciseClick(exercise)}
                    />
                  ))}
                </div>

                {/* Complete State */}
                {progress === 100 && (
                  <motion.div className="relative mt-8 p-6 bg-linear-to-br from-primary/10 to-yellow-500/10 border-primary/40 border">
                    <CornerBracket position="tl" />
                    <CornerBracket position="tr" />
                    <CornerBracket position="bl" />
                    <CornerBracket position="br" />

                    <div className="relative z-10">
                      <Trophy className="w-14 h-14 text-yellow-500 mx-auto" />

                      <h3 className="font-bold text-xl mt-4">
                        <GlitchText>QUEST COMPLETE</GlitchText>
                      </h3>

                      <p className="text-sm text-muted-foreground font-mono">
                        All exercises finished. Shadow power increased.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ⭐ SKIP BUTTON */}
                <button
                  className="w-full mt-6 py-3 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                >
                  Skip Session
                </button>
              </>
            )}
          </>
        )}
      </motion.div>

      <ExerciseDrawer
        exercise={selectedExercise}
        sessoinId={currentSesson?.data?.id}
        currentSeasion={currentSesson?.data}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onComplete={handleCompleteExercise}
      />
    </div>
  );
};

export default TodayTask;
