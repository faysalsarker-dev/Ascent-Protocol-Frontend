"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Flame, LayoutGrid, Sword } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area";
import { ExerciseCard } from "@/src/components/modules/workout/ExerciseCard";
import DayTab from "@/src/components/modules/workout/DayTab";
import RestDayCard from "@/src/components/modules/workout/RestDayCard";
import { useGetAllPlansById } from "@/src/hooks/useWorkoutPlan";
import { WorkoutSkeleton } from "./WorkoutSkeleton";
import { WorkoutError } from "./WorkoutError";
import { useState } from "react";

interface Exercise {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface WorkoutDay {
  id: string;
  name: string;
  dayOfWeek: number;
  isRestDay: boolean;
  exercises: Exercise[];
}

interface WorkoutPlan {
  name: string;
  description: string;
  isActive: boolean;
  workoutDays: WorkoutDay[];
}

interface SinglePlanProps {
  id: string;
}

const SinglePlan = ({ id }: SinglePlanProps) => {
  const { data: info, isLoading, isError, refetch } = useGetAllPlansById(id);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const today = new Date();
  const currentDayOfWeek = today.getDay();

  const data = info?.data as WorkoutPlan | undefined;
  const workoutDays = data?.workoutDays ?? [];


  const todayWorkoutIndex = (() => {
    if (!workoutDays.length) return 0;
    const idx = workoutDays.findIndex((d) => d.dayOfWeek === currentDayOfWeek);
    return idx >= 0 ? idx : 0;
  })();

  const selectedIndex = activeIndex ?? todayWorkoutIndex;

  if (isLoading) return <WorkoutSkeleton />;
  if (isError || !data) return <WorkoutError onRetry={() => refetch()} />;

  const selectedDay = workoutDays[selectedIndex];

  // Safety check for selectedDay
  if (!selectedDay) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        No workout data available for this day.
      </div>
    );
  }

  return (
    <div className="relative z-10 px-3 py-4 sm:p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/20 glow-primary-sm shrink-0">
                  <Sword className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-display tracking-wider text-foreground glow-text-primary truncate">
                  {data.name}
                </h1>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl line-clamp-2">
                {data.description}
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg glass">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  {format(today, "EEE, MMM d")}
                </span>
              </div>

              <Link href="/plans">
                <Button variant="outline" size="sm" className="border-border/50 gap-1.5">
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">All Plans</span>
                </Button>
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6 flex-wrap"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-destructive" />
              <span className="text-muted-foreground">
                {workoutDays.filter((d) => !d.isRestDay).length} Training Days
              </span>
            </div>

            <div className="w-px h-3 sm:h-4 bg-border hidden sm:block" />

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  data.isActive ? "bg-primary animate-pulse" : "bg-muted"
                }`}
              />
              <span className="text-xs sm:text-sm text-muted-foreground">
                {data.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </motion.div>
        </motion.header>

        {/* Day Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mb-6 sm:mb-8 -mx-3 px-3 sm:mx-0 sm:px-0"
        >
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 sm:gap-3 pb-3">
              {workoutDays.map((day, idx) => (
                <DayTab
                  key={day.id}
                  name={day.name}
                  dayNumber={day.dayOfWeek}
                  isActive={selectedIndex === idx}
                  isRestDay={day.isRestDay}
                  isToday={day.dayOfWeek === currentDayOfWeek}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {selectedDay.isRestDay ? (
              <RestDayCard />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {selectedDay.exercises?.map((exercise, idx) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} index={idx} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SinglePlan;