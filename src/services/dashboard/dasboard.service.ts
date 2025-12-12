"use server";

import { dataFetch } from "@/src/lib/data-fetch";
import { revalidateTag } from "next/cache";


export interface StatCardData {
  totalVolume: number;
  totalSets: number;
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  thisWeekWorkouts: number;
  thisMonthWorkouts: number;
  avgWorkoutDuration: number;
  totalXpEarned: number;
}

export interface WeeklyVolumeData {
  weekLabel: string;
  weekStart: string;
  weekEnd: string;
  totalVolume: number;
  totalSets: number;
  workoutCount: number;
  avgVolumePerWorkout: number;
}

export interface VolumeChartData {
  data: WeeklyVolumeData[];
  summary: {
    totalVolume: number;
    totalWorkouts: number;
    avgWeeklyVolume: number;
    highestWeek: WeeklyVolumeData | null;
    lowestWeek: WeeklyVolumeData | null;
    trend: 'increasing' | 'decreasing' | 'stable';
  };
}

export type MuscleGroup =
  | "CHEST"
  | "BACK"
  | "SHOULDERS"
  | "BICEPS"
  | "TRICEPS"
  | "LEGS"
  | "GLUTES"
  | "CORE"
  | "CARDIO"
  | "FULL_BODY";

export interface MuscleGroupStats {
  muscleGroup: MuscleGroup;
  totalVolume: number;
  totalSets: number;
  workoutCount: number;
  percentage: number;
  avgVolumePerWorkout: number;
  lastWorkedOut: string | null;
  strengthScore: number;
}

export interface MuscleDistributionData {
  data: MuscleGroupStats[];
  summary: {
    strongestMuscle: MuscleGroupStats | null;
    weakestMuscle: MuscleGroupStats | null;
    mostFrequentMuscle: MuscleGroupStats | null;
    totalVolume: number;
    balanceScore: number;
  };
}

export type WorkoutStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "SKIPPED";
export type Mood = "EXCELLENT" | "GOOD" | "AVERAGE" | "TIRED" | "POOR";

export interface RecentWorkout {
  id: string;
  sessionDate: string;
  dayName: string;
  status: WorkoutStatus;
  durationMin: number | null;
  totalSets: number;
  totalVolume: number | null;
  xpEarned: number;
  mood: Mood | null;
}

export interface PersonalRecord {
  exerciseName: string;
  muscleGroup: MuscleGroup;
  maxWeight: number;
  maxReps: number;
  achievedAt: string;
  totalSets: number;
}

export interface DashboardOverview {
  stats: StatCardData;
  volumeChart: VolumeChartData;
  muscleDistribution: MuscleDistributionData;
  recentWorkouts: RecentWorkout[];
  personalRecords: PersonalRecord[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, unknown>;
  error?: {
    code: string;
    message: string;
  };
}


export async function getDashboardStats(): Promise<ApiResponse<StatCardData>> {
  try {
    const response = await dataFetch.get("/dashboard/stats", {
      next: { tags: ["dashboard-stats"], revalidate: 300 }, 
    });
    return response.json();
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    throw error;
  }
}

/**
 * GET Volume Chart Data
 * Returns: Weekly volume breakdown for last 3 months (line chart)
 * @returns {Promise<ApiResponse<VolumeChartData>>}
 */
export async function getVolumeChart(): Promise<ApiResponse<VolumeChartData>> {
  try {
    const response = await dataFetch.get("/dashboard/volume-chart", {
      next: { tags: ["volume-chart"], revalidate: 3600 }, // 1 hour cache
    });
    return response.json();
  } catch (error) {
    console.error("Get volume chart error:", error);
    throw error;
  }
}

/**
 * GET Muscle Distribution Data
 * Returns: Muscle group breakdown with strength rankings (pie chart)
 * @param {string} period - Time period: '1month' | '3months' | '6months' | 'all'
 * @returns {Promise<ApiResponse<MuscleDistributionData>>}
 */
export async function getMuscleDistribution(
  period: '1month' | '3months' | '6months' | 'all' = '3months'
): Promise<ApiResponse<MuscleDistributionData>> {
  try {
    const response = await dataFetch.get(
      `/dashboard/muscle-distribution?period=${period}`,
      {
        next: { 
          tags: ["muscle-distribution", `muscle-distribution-${period}`], 
          revalidate: 3600 
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error("Get muscle distribution error:", error);
    throw error;
  }
}

/**
 * GET Recent Workouts
 * Returns: List of recent completed workout sessions
 * @param {number} limit - Number of workouts to return (default: 10, max: 50)
 * @returns {Promise<ApiResponse<RecentWorkout[]>>}
 */
export async function getRecentWorkouts(
  limit: number = 10
): Promise<ApiResponse<RecentWorkout[]>> {
  try {
    const response = await dataFetch.get(
      `/dashboard/recent-workouts?limit=${limit}`,
      {
        next: { tags: ["recent-workouts"], revalidate: 300 },
      }
    );
    return response.json();
  } catch (error) {
    console.error("Get recent workouts error:", error);
    throw error;
  }
}

/**
 * GET Personal Records
 * Returns: Top personal records across all exercises
 * @returns {Promise<ApiResponse<PersonalRecord[]>>}
 */
export async function getPersonalRecords(): Promise<ApiResponse<PersonalRecord[]>> {
  try {
    const response = await dataFetch.get("/dashboard/personal-records", {
      next: { tags: ["personal-records"], revalidate: 3600 },
    });
    return response.json();
  } catch (error) {
    console.error("Get personal records error:", error);
    throw error;
  }
}

/**
 * GET Complete Dashboard Overview
 * Returns: All dashboard data in one call (stats, charts, workouts, records)
 * @returns {Promise<ApiResponse<DashboardOverview>>}
 */
export async function getDashboardOverview(): Promise<ApiResponse<DashboardOverview>> {
  try {
    const response = await dataFetch.get("/dashboard/overview", {
      next: { tags: ["dashboard-overview"], revalidate: 300 },
    });
    return response.json();
  } catch (error) {
    console.error("Get dashboard overview error:", error);
    throw error;
  }
}

/**
 * Revalidate Dashboard Data
 * Force refresh all dashboard cache tags
 * Use after completing a workout or updating user stats
 */
export async function revalidateDashboard(): Promise<void> {
  try {
    revalidateTag("dashboard-stats", {});
    revalidateTag("volume-chart", {});
    revalidateTag("muscle-distribution", {});
    revalidateTag("recent-workouts", {});
    revalidateTag("personal-records", {});
    revalidateTag("dashboard-overview", {});
  } catch (error) {
    console.error("Revalidate dashboard error:", error);
    throw error;
  }
}

/**
 * Revalidate Muscle Distribution by Period
 * Force refresh specific period cache
 * @param {string} period - Period to revalidate
 */
export async function revalidateMuscleDistribution(
  period: '1month' | '3months' | '6months' | 'all' = '3months'
): Promise<void> {
  try {
    revalidateTag(`muscle-distribution-${period}`, {});
    revalidateTag("muscle-distribution", {});
  } catch (error) {
    console.error("Revalidate muscle distribution error:", error);
    throw error;
  }
}

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Example 1: Fetch all dashboard stats
const statsResult = await getDashboardStats();
if (statsResult.success && statsResult.data) {
  console.log('Total Volume:', statsResult.data.totalVolume);
  console.log('Current Streak:', statsResult.data.currentStreak);
}

// Example 2: Fetch volume chart data
const volumeResult = await getVolumeChart();
if (volumeResult.success && volumeResult.data) {
  console.log('Weekly Data:', volumeResult.data.data);
  console.log('Trend:', volumeResult.data.summary.trend);
}

// Example 3: Fetch muscle distribution with period
const muscleResult = await getMuscleDistribution('3months');
if (muscleResult.success && muscleResult.data) {
  console.log('Strongest Muscle:', muscleResult.data.summary.strongestMuscle);
  console.log('Balance Score:', muscleResult.data.summary.balanceScore);
}

// Example 4: Fetch recent workouts
const workoutsResult = await getRecentWorkouts(5);
if (workoutsResult.success && workoutsResult.data) {
  console.log('Recent Workouts:', workoutsResult.data);
}

// Example 5: Fetch personal records
const recordsResult = await getPersonalRecords();
if (recordsResult.success && recordsResult.data) {
  console.log('Personal Records:', recordsResult.data);
}

// Example 6: Fetch complete dashboard (ONE CALL!)
const overviewResult = await getDashboardOverview();
if (overviewResult.success && overviewResult.data) {
  const { stats, volumeChart, muscleDistribution, recentWorkouts, personalRecords } = overviewResult.data;
  console.log('Complete Dashboard:', overviewResult.data);
}

// Example 7: Revalidate after workout completion
await completeWorkoutSession(sessionId);
await revalidateDashboard(); // Refresh all dashboard data
*/

// ============================================
// RESPONSE EXAMPLES
// ============================================

/*
==========================================
EXAMPLE 1: getDashboardStats()
==========================================
{
  "success": true,
  "message": "Dashboard stats fetched successfully",
  "data": {
    "totalVolume": 245680,
    "totalSets": 1245,
    "totalWorkouts": 87,
    "currentStreak": 5,
    "longestStreak": 12,
    "thisWeekWorkouts": 4,
    "thisMonthWorkouts": 18,
    "avgWorkoutDuration": 65,
    "totalXpEarned": 8700
  }
}

==========================================
EXAMPLE 2: getVolumeChart()
==========================================
{
  "success": true,
  "message": "Volume chart data fetched successfully",
  "data": {
    "data": [
      {
        "weekLabel": "Week 1",
        "weekStart": "2024-09-16",
        "weekEnd": "2024-09-22",
        "totalVolume": 12450,
        "totalSets": 45,
        "workoutCount": 4,
        "avgVolumePerWorkout": 3113
      }
      // ... 11 more weeks
    ],
    "summary": {
      "totalVolume": 191350,
      "totalWorkouts": 53,
      "avgWeeklyVolume": 15946,
      "highestWeek": { "weekLabel": "Week 12", "totalVolume": 20500 },
      "lowestWeek": { "weekLabel": "Week 3", "totalVolume": 11800 },
      "trend": "increasing"
    }
  }
}

==========================================
EXAMPLE 3: getMuscleDistribution('3months')
==========================================
{
  "success": true,
  "message": "Muscle distribution data fetched successfully",
  "data": {
    "data": [
      {
        "muscleGroup": "CHEST",
        "totalVolume": 45600,
        "totalSets": 156,
        "workoutCount": 12,
        "percentage": 23.8,
        "avgVolumePerWorkout": 3800,
        "lastWorkedOut": "2024-12-10T08:30:00.000Z",
        "strengthScore": 87
      }
      // ... more muscle groups
    ],
    "summary": {
      "strongestMuscle": { "muscleGroup": "CHEST", "strengthScore": 87 },
      "weakestMuscle": { "muscleGroup": "GLUTES", "strengthScore": 35 },
      "mostFrequentMuscle": { "muscleGroup": "CHEST", "workoutCount": 12 },
      "totalVolume": 191500,
      "balanceScore": 72
    }
  }
}

==========================================
EXAMPLE 4: getRecentWorkouts(5)
==========================================
{
  "success": true,
  "message": "Recent workouts fetched successfully",
  "data": [
    {
      "id": "uuid-123",
      "sessionDate": "2024-12-12T08:30:00.000Z",
      "dayName": "Chest & Shoulder",
      "status": "COMPLETED",
      "durationMin": 65,
      "totalSets": 15,
      "totalVolume": 3450,
      "xpEarned": 100,
      "mood": "EXCELLENT"
    }
    // ... 4 more workouts
  ]
}

==========================================
EXAMPLE 5: getPersonalRecords()
==========================================
{
  "success": true,
  "message": "Personal records fetched successfully",
  "data": [
    {
      "exerciseName": "Barbell Squat",
      "muscleGroup": "LEGS",
      "maxWeight": 140,
      "maxReps": 8,
      "achievedAt": "2024-12-10T10:15:00.000Z",
      "totalSets": 48
    }
    // ... more records
  ]
}
*/