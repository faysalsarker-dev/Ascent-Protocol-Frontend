import { useState, useEffect } from 'react';
import type { 
  DashboardStats, 
  VolumeChartData, 
  MuscleDistributionData, 
  RecentWorkout, 
  PersonalRecord,
  DashboardData 
} from './types';

// Fake data objects
const fakeStats: DashboardStats = {
  totalVolume: 245680,
  totalSets: 1245,
  totalWorkouts: 87,
  currentStreak: 5,
  longestStreak: 12,
  thisWeekWorkouts: 4,
  thisMonthWorkouts: 18,
  avgWorkoutDuration: 65,
  totalXpEarned: 8700,
};

const fakeVolumeChart: VolumeChartData = {
  data: [
    { weekLabel: "W1", weekStart: "2024-09-16", weekEnd: "2024-09-22", totalVolume: 12450, totalSets: 45, workoutCount: 4, avgVolumePerWorkout: 3113 },
    { weekLabel: "W2", weekStart: "2024-09-23", weekEnd: "2024-09-29", totalVolume: 15120, totalSets: 52, workoutCount: 5, avgVolumePerWorkout: 3024 },
    { weekLabel: "W3", weekStart: "2024-09-30", weekEnd: "2024-10-06", totalVolume: 13800, totalSets: 48, workoutCount: 4, avgVolumePerWorkout: 3450 },
    { weekLabel: "W4", weekStart: "2024-10-07", weekEnd: "2024-10-13", totalVolume: 16230, totalSets: 53, workoutCount: 5, avgVolumePerWorkout: 3246 },
    { weekLabel: "W5", weekStart: "2024-10-14", weekEnd: "2024-10-20", totalVolume: 17100, totalSets: 56, workoutCount: 5, avgVolumePerWorkout: 3420 },
    { weekLabel: "W6", weekStart: "2024-10-21", weekEnd: "2024-10-27", totalVolume: 15500, totalSets: 49, workoutCount: 4, avgVolumePerWorkout: 3875 },
    { weekLabel: "W7", weekStart: "2024-10-28", weekEnd: "2024-11-03", totalVolume: 18000, totalSets: 60, workoutCount: 6, avgVolumePerWorkout: 3000 },
    { weekLabel: "W8", weekStart: "2024-11-04", weekEnd: "2024-11-10", totalVolume: 16200, totalSets: 54, workoutCount: 5, avgVolumePerWorkout: 3240 },
    { weekLabel: "W9", weekStart: "2024-11-11", weekEnd: "2024-11-17", totalVolume: 17500, totalSets: 58, workoutCount: 5, avgVolumePerWorkout: 3500 },
    { weekLabel: "W10", weekStart: "2024-11-18", weekEnd: "2024-11-24", totalVolume: 16800, totalSets: 55, workoutCount: 5, avgVolumePerWorkout: 3360 },
    { weekLabel: "W11", weekStart: "2024-11-25", weekEnd: "2024-12-01", totalVolume: 18100, totalSets: 61, workoutCount: 6, avgVolumePerWorkout: 3016 },
    { weekLabel: "W12", weekStart: "2024-12-02", weekEnd: "2024-12-08", totalVolume: 19135, totalSets: 65, workoutCount: 7, avgVolumePerWorkout: 2733 },
  ],
  summary: { totalVolume: 191350, totalWorkouts: 53, avgWeeklyVolume: 15946, trend: "increasing" },
};

const fakeMuscleDistribution: MuscleDistributionData = {
  data: [
    { muscleGroup: "CHEST", totalVolume: 45600, totalSets: 156, workoutCount: 12, percentage: 23.8, avgVolumePerWorkout: 3800, lastWorkedOut: "2024-12-10T08:30:00.000Z", strengthScore: 87 },
    { muscleGroup: "BACK", totalVolume: 42300, totalSets: 148, workoutCount: 12, percentage: 22.1, avgVolumePerWorkout: 3525, lastWorkedOut: "2024-12-09T08:30:00.000Z", strengthScore: 85 },
    { muscleGroup: "LEGS", totalVolume: 38200, totalSets: 140, workoutCount: 11, percentage: 19.9, avgVolumePerWorkout: 3472, lastWorkedOut: "2024-12-08T07:30:00.000Z", strengthScore: 78 },
    { muscleGroup: "SHOULDERS", totalVolume: 21000, totalSets: 78, workoutCount: 8, percentage: 10.4, avgVolumePerWorkout: 2625, lastWorkedOut: "2024-12-07T07:30:00.000Z", strengthScore: 72 },
    { muscleGroup: "CORE", totalVolume: 14000, totalSets: 52, workoutCount: 7, percentage: 6.9, avgVolumePerWorkout: 2000, lastWorkedOut: "2024-12-06T07:00:00.000Z", strengthScore: 68 },
    { muscleGroup: "GLUTES", totalVolume: 6700, totalSets: 30, workoutCount: 4, percentage: 3.5, avgVolumePerWorkout: 1675, lastWorkedOut: "2024-12-01T07:00:00.000Z", strengthScore: 35 },
  ],
  summary: {
    strongestMuscle: { muscleGroup: "CHEST", strengthScore: 87 },
    weakestMuscle: { muscleGroup: "GLUTES", strengthScore: 35 },
    totalVolume: 191500,
    balanceScore: 72,
  },
};

const fakeRecentWorkouts: RecentWorkout[] = [
  { id: "uuid-123", sessionDate: "2024-12-12T08:30:00.000Z", dayName: "Chest & Shoulder", status: "COMPLETED", durationMin: 65, totalSets: 15, totalVolume: 3450, xpEarned: 100, mood: "EXCELLENT" },
  { id: "uuid-124", sessionDate: "2024-12-10T07:00:00.000Z", dayName: "Leg Day", status: "COMPLETED", durationMin: 80, totalSets: 18, totalVolume: 5200, xpEarned: 140, mood: "GOOD" },
  { id: "uuid-125", sessionDate: "2024-12-08T06:30:00.000Z", dayName: "Back & Biceps", status: "COMPLETED", durationMin: 55, totalSets: 12, totalVolume: 2900, xpEarned: 90, mood: "AVERAGE" },
  { id: "uuid-126", sessionDate: "2024-12-06T18:00:00.000Z", dayName: "Core Focus", status: "COMPLETED", durationMin: 40, totalSets: 8, totalVolume: 800, xpEarned: 50, mood: "TIRED" },
  { id: "uuid-127", sessionDate: "2024-12-01T08:30:00.000Z", dayName: "Full Body", status: "COMPLETED", durationMin: 70, totalSets: 16, totalVolume: 4100, xpEarned: 120, mood: "GOOD" },
];

const fakePersonalRecords: PersonalRecord[] = [
  { exerciseName: "Barbell Squat", muscleGroup: "LEGS", maxWeight: 140, maxReps: 8, achievedAt: "2024-12-10T10:15:00.000Z", totalSets: 48 },
  { exerciseName: "Bench Press", muscleGroup: "CHEST", maxWeight: 100, maxReps: 6, achievedAt: "2024-12-08T08:30:00.000Z", totalSets: 52 },
];

// Simulated loading delay
const LOADING_DELAY = 800;

/**
 * Hook to simulate dashboard data fetching
 * Toggle `simulateError` to test error states
 */
export function useFakeDashboardData(simulateError = false): DashboardData {
  const [data, setData] = useState<DashboardData>({
    stats: { status: 'loading' },
    volumeChart: { status: 'loading' },
    muscleDistribution: { status: 'loading' },
    recentWorkouts: { status: 'loading' },
    personalRecords: { status: 'loading' },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (simulateError) {
        setData({
          stats: { status: 'error', message: 'Failed to load stats' },
          volumeChart: { status: 'error', message: 'Failed to load volume chart' },
          muscleDistribution: { status: 'error', message: 'Failed to load muscle data' },
          recentWorkouts: { status: 'error', message: 'Failed to load workouts' },
          personalRecords: { status: 'error', message: 'Failed to load records' },
        });
      } else {
        setData({
          stats: { status: 'success', data: fakeStats },
          volumeChart: { status: 'success', data: fakeVolumeChart },
          muscleDistribution: { status: 'success', data: fakeMuscleDistribution },
          recentWorkouts: { status: 'success', data: fakeRecentWorkouts },
          personalRecords: { status: 'success', data: fakePersonalRecords },
        });
      }
    }, LOADING_DELAY);

    return () => clearTimeout(timer);
  }, [simulateError]);

  return data;
}
