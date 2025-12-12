"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { StatCards } from "./StatCards";
import { StreakCard } from "./StreakCard";
import { XpProgress } from "./XpProgress";
import { RecentWorkouts } from "./RecentWorkouts";
import { VolumeChart } from "./VolumeChart";
import { MuscleDistribution } from "./MuscleDistribution";
import { PersonalRecords } from "./PersonalRecords";
import { useDashboardStats ,useVolumeChart ,useMuscleDistribution, useDashboardOverview} from "@/src/hooks/useDashboard";
import { Card, CardContent } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";


export function DashboardPage() {



  const {data:dashboard,isLoading , isError,refetch  }=useDashboardOverview()
  const data = dashboard?.data 
console.log(dashboard)

  const handleRetry = useCallback(() => {
refetch()
  }, []);





  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="card-glow">
            <CardContent className="p-4">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }





  return (
    <div className="min-h-screen bg-background px-4">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20 glow-primary">
                <Swords className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-display font-bold text-foreground tracking-wide">
                  HUNTER STATS
                </h1>
                <p className="text-xs text-muted-foreground">Level up your training</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container py-4 space-y-4">
        {/* Stat Cards Grid */}
     <StatCards data={data?.stats} isLoading={isLoading}  onRetry={handleRetry} />

        <StreakCard data={data?.stats} isLoading={isLoading}  onRetry={handleRetry} />  






        {/* XP Progress */}
        <XpProgress data={data?.stats} onRetry={handleRetry} />

        {/* Recent Workouts */}
        <RecentWorkouts data={data?.recentWorkouts} onRetry={handleRetry} />

        {/* Volume Chart */}
        <VolumeChart data={data?.volumeChart} onRetry={handleRetry} />

        {/* Muscle Distribution */}
        <MuscleDistribution data={data?.muscleDistribution} onRetry={handleRetry} />

        {/* Personal Records */}
        <PersonalRecords data={data?.personalRecords} onRetry={handleRetry} />

        {/* Bottom spacing for mobile */}
        <div className="h-8" />
      </main>
    </div>
  );
}

export default DashboardPage;
