"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { useFakeDashboardData } from "./useFakeDashboardData";
import { StatCards } from "./StatCards";
import { StreakCard } from "./StreakCard";
import { XpProgress } from "./XpProgress";
import { RecentWorkouts } from "./RecentWorkouts";
import { VolumeChart } from "./VolumeChart";
import { MuscleDistribution } from "./MuscleDistribution";
import { PersonalRecords } from "./PersonalRecords";
import { useDashboardStats ,useVolumeChart ,useMuscleDistribution, useDashboardOverview} from "@/src/hooks/useDashboard";


export function DashboardPage() {
  const [, setRetryCount] = useState(0);
  const data = useFakeDashboardData(false); 

  const {data:stats,isLoading ,isError}=useDashboardStats()
  const {data:volumeData}=useVolumeChart()
  const {data:muscleDistribution}=useMuscleDistribution()
  const {data:dashboard}=useDashboardOverview()
console.log(dashboard)

  const handleRetry = useCallback(() => {
    setRetryCount((c) => c + 1);
  }, []);

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
       {/* <StatCards data={stats} isLoading={isLoading} isError={isError} onRetry={handleRetry} />

        <StreakCard data={stats} isLoading={isLoading} isError={isError} onRetry={handleRetry} />  */}






        {/* XP Progress */}
        <XpProgress data={data.stats} onRetry={handleRetry} />

        {/* Recent Workouts */}
        <RecentWorkouts data={data.recentWorkouts} onRetry={handleRetry} />

        {/* Volume Chart */}
        {/* <VolumeChart data={volumeData} onRetry={handleRetry} /> */}

        {/* Muscle Distribution */}
        {/* <MuscleDistribution data={muscleDistribution} onRetry={handleRetry} /> */}

        {/* Personal Records */}
        <PersonalRecords data={data.personalRecords} onRetry={handleRetry} />

        {/* Bottom spacing for mobile */}
        <div className="h-8" />
      </main>
    </div>
  );
}

export default DashboardPage;
