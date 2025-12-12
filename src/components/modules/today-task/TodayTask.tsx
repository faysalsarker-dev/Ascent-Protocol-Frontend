

"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleBackground } from "@/src/components/modules/today-task/ParticleBackground";
import { Header } from "@/src/components/modules/today-task/Header";
import { ProgressRing } from "@/src/components/modules/today-task/ProgressRing";
import { TaskCard } from "@/src/components/modules/today-task/TaskCard";
import { RestDayDisplay } from "@/src/components/modules/today-task/RestDayDisplay";
import { ExerciseDrawer } from "@/src/components/modules/today-task/ExerciseDrawer";
import {
  ScanlineOverlay,
  DataStream,
  CornerBracket,
  GlitchText,
} from "@/src/components/modules/today-task/GamifiedEffects";
import { Exercise } from "@/src/types/workout";
import { Trophy, Swords, Loader2, AlertCircle, Play, Flag } from "lucide-react";
import { useTodayWorkoutDay } from "@/src/hooks/useWorkoutPlan";
import {
  useCreateWorkoutSession,
  useCurrentWorkoutSession,
  useLastWorkoutSession,
  useCompleteWorkoutSession,
} from "@/src/hooks/useWorkoutSessions";
import { toast } from "sonner";
import { filterIncompleteExercises } from "@/src/utils/filterExercises";
import { getExercises, clearExercises } from "@/src/utils/exerciseStorage";
import PreMsg from "../systeam-ai/PreMsg";

const TodayTask = () => {
  // API Hooks
  const {
    data: workoutDayData,
    isLoading: isWorkoutLoading,
    error: workoutError,
  } = useTodayWorkoutDay();

  const {
    data: currentSession,
    isLoading: isSessionLoading,
    error: sessionError,
  } = useCurrentWorkoutSession();

  const { data: lastSessionData } = useLastWorkoutSession();

  const { mutate: createSession, isPending: isCreatingSession } =
    useCreateWorkoutSession();

  const { mutate: endSession, isPending: isEndingSession } =
    useCompleteWorkoutSession();

  // Local State
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  // Extract data safely
  const workoutDay = workoutDayData?.data ?? {};
  const lastSession = lastSessionData?.data;
  


  const isSessionActive =
  !isSessionLoading &&
  !!currentSession?.data?.id;


  const sessionId = isSessionActive ? currentSession?.data?.id : undefined;


  const allExercises = useMemo(() => workoutDay.exercises ?? [], [workoutDay.exercises]);
  const incompleteExercises = filterIncompleteExercises(allExercises, isWorkoutLoading);
  
  const totalExercises = allExercises.length;
  const progress = totalExercises === 0 ? 0 : (completedCount / totalExercises) * 100;
  const allCompleted = totalExercises > 0 && completedCount === totalExercises;

  // System message

 




useEffect(() => {
  if (!isSessionActive) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (completedCount !== 0) setCompletedCount(0);
    return;
  }

  const completed = getExercises();
  const count = allExercises?.filter((ex:Exercise) =>
    completed?.some((c) => c?.exerciseName === ex.exerciseName)
  ).length;

  if (count !== completedCount) setCompletedCount(count);
}, [isSessionActive, allExercises,completedCount]);


  // Handlers
  const handleStartWorkout = () => {
    if (!workoutDay?.id) {
      toast.error("Workout data not available");
      return;
    }

    createSession(
      {
        workoutDayId: workoutDay.id,
        dayName: workoutDay.name ?? "Workout",
      },
      {
        onSuccess: () => {
          clearExercises();
          setCompletedCount(0);
          toast.success("Let's crush today's workout! 💪");
        },
        onError: (error) => {
          console.error("Start workout failed:", error);
          toast.error("Failed to start workout. Try again.");
        },
      }
    );
  };

  const handleEndWorkout = () => {
    if (!sessionId) {
      toast.error("No active session");
      return;
    }

    endSession(
       sessionId ,
      {
        onSuccess: () => {
          clearExercises();
          setCompletedCount(0);
          toast.success("Workout completed! Great job! 🎉");
        },
        onError: (error) => {
          console.error("End workout failed:", error);
          toast.error("Failed to end workout. Try again.");
        },
      }
    );
  };

  const handleSkipSession = () => {
    if (!sessionId) {
      toast.error("No active session to skip");
      return;
    }

    if (!confirm("Skip this session? Progress will be lost.")) {
      return;
    }

    
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsDrawerOpen(true);
  };

  const handleCompleteExercise = () => {
    setCompletedCount((prev) => prev + 1);
  };

  // Loading State
  if (isWorkoutLoading || isSessionLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-background">
        <ParticleBackground />
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <ScanlineOverlay />
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-sm text-muted-foreground font-mono">
              Loading workout data...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Error State
  if (workoutError || sessionError) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-background">
        <ParticleBackground />
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <ScanlineOverlay />
        </div>
        <div className="flex items-center justify-center min-h-screen px-4">
          <motion.div
            className="text-center max-w-md p-6 border border-destructive/30 rounded-lg bg-destructive/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Error Loading Workout</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {workoutError?.message || sessionError?.message || "Something went wrong"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition"
            >
              Reload Page
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

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

        {/* REST DAY */}
        {workoutDay.isRestDay ? (
          <RestDayDisplay />
        ) : (
          <>
            {/* SESSION NOT STARTED */}
            {!isSessionActive && (
              <motion.div
                className="mt-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative p-6 rounded-lg border border-primary/30 bg-card/20">
                  <CornerBracket position="tl" />
                  <CornerBracket position="tr" />
                  <CornerBracket position="bl" />
                  <CornerBracket position="br" />

                  <div className="relative z-10 text-center">
                    <Swords className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">
                      {workoutDay.name ?? "Today's Workout"}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6 font-mono">
                      {totalExercises} exercises • Ready to begin
                    </p>

                    <button
                      onClick={handleStartWorkout}
                      disabled={isCreatingSession}
                      className="w-full py-3 bg-primary text-white rounded-md font-bold tracking-wide border border-primary/40 hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isCreatingSession ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Starting...
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          Start Today&apos;s Workout
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SESSION ACTIVE */}
            {isSessionActive && (
              <>
                {/* Progress Ring */}
                <motion.div
                  className="flex justify-center my-8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <ProgressRing
                    progress={progress}
                    completedTasks={completedCount}
                    totalTasks={totalExercises}
                  />
                </motion.div>

                {/* System Message */}
                <div className="mb-6">
                  {/* <SystemMessage message={systemMessage} /> */}


<PreMsg/>

                </div>

                {/* Workout Name */}
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
                    <span className="text-[10px] uppercase text-muted-foreground font-mono">
                      Current Quest
                    </span>
                    <h2 className="text-sm font-bold">{workoutDay.name ?? "Workout"}</h2>
                  </div>
                </motion.div>

                {/* Exercise List */}
                <AnimatePresence mode="popLayout">
                  <div className="space-y-3">
                    {incompleteExercises.map((exercise, index) => (
                      <TaskCard
                        key={exercise.id}
                        exercise={exercise as Exercise}
                        index={index}
                        isCompleted={false}
                        onClick={() => handleExerciseClick(exercise as Exercise)}
                      />
                    ))}
                  </div>
                </AnimatePresence>

                {/* All Completed - Show End Workout */}
                {allCompleted && (
                  <motion.div
                    className="relative mt-8 p-6 bg-linear-to-br from-primary/10 to-yellow-500/10 border-primary/40 border rounded-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CornerBracket position="tl" />
                    <CornerBracket position="tr" />
                    <CornerBracket position="bl" />
                    <CornerBracket position="br" />

                    <div className="relative z-10 text-center">
                      <Trophy className="w-14 h-14 text-yellow-500 mx-auto mb-4" />

                      <h3 className="font-bold text-xl mb-2">
                        <GlitchText>QUEST COMPLETE</GlitchText>
                      </h3>

                      <p className="text-sm text-muted-foreground font-mono mb-6">
                        All exercises finished. Shadow power increased.
                      </p>

                      <button
                        onClick={handleEndWorkout}
                        disabled={isEndingSession}
                        className="w-full py-3 bg-primary text-white rounded-md font-bold tracking-wide border border-primary/40 hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isEndingSession ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Ending...
                          </>
                        ) : (
                          <>
                            <Flag className="w-5 h-5" />
                            Finish Workout
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Skip Button - Only show if not completed */}
                {!allCompleted && (
                  <motion.button
                    onClick={handleSkipSession}
                    disabled={isEndingSession}
                    className="w-full mt-6 py-3 border border-red-500/50 text-red-500 rounded-md hover:bg-red-500 hover:text-white hover:border-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {isEndingSession ? "Processing..." : "Skip Session"}
                  </motion.button>
                )}
              </>
            )}
          </>
        )}
      </motion.div>

      {/* Exercise Drawer */}

{sessionId && selectedExercise && (
  <ExerciseDrawer
    exercise={selectedExercise}
    sessoinId={sessionId}
    lastSession={lastSession}
    isOpen={isDrawerOpen}
    onClose={() => setIsDrawerOpen(false)}
    onComplete={handleCompleteExercise}
  />
)}

    
    </div>
  );
};

export default TodayTask;