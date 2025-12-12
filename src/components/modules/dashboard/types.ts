// Dashboard Types
export interface DashboardStats {
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

export interface VolumeWeek {
  weekLabel: string;
  weekStart: string;
  weekEnd: string;
  totalVolume: number;
  totalSets: number;
  workoutCount: number;
  avgVolumePerWorkout: number;
}

export interface VolumeChartData {
  data: VolumeWeek[];
  summary: {
    totalVolume: number;
    totalWorkouts: number;
    avgWeeklyVolume: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  };
}

export interface MuscleDistributionItem {
  muscleGroup: string;
  totalVolume: number;
  totalSets: number;
  workoutCount: number;
  percentage: number;
  avgVolumePerWorkout: number;
  lastWorkedOut: string;
  strengthScore: number;
}

export interface MuscleDistributionData {
  data: MuscleDistributionItem[];
  summary: {
    strongestMuscle: { muscleGroup: string; strengthScore: number };
    weakestMuscle: { muscleGroup: string; strengthScore: number };
    totalVolume: number;
    balanceScore: number;
  };
}

export interface RecentWorkout {
  id: string;
  sessionDate: string;
  dayName: string;
  status: 'COMPLETED' | 'SKIPPED' | 'IN_PROGRESS';
  durationMin: number;
  totalSets: number;
  totalVolume: number;
  xpEarned: number;
  mood: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'TIRED' | 'EXHAUSTED';
}

export interface PersonalRecord {
  exerciseName: string;
  muscleGroup: string;
  maxWeight: number;
  maxReps: number;
  achievedAt: string;
  totalSets: number;
}

// Widget State Types
export type WidgetState<T> = 
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };

export interface DashboardData {
  stats: WidgetState<DashboardStats>;
  volumeChart: WidgetState<VolumeChartData>;
  muscleDistribution: WidgetState<MuscleDistributionData>;
  recentWorkouts: WidgetState<RecentWorkout[]>;
  personalRecords: WidgetState<PersonalRecord[]>;
}
