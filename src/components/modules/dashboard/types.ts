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
  muscleGroup: string | null;
  totalVolume: number;
  totalSets: number;
  workoutCount: number;
  percentage: number;
  avgVolumePerWorkout: number;
  lastWorkedOut: string | null;
  strengthScore: number;
}

export interface MuscleDistributionData {
  data: MuscleDistributionItem[];
  summary: {
strongestMuscle: { muscleGroup: string | null; strengthScore: number | null } | null;
weakestMuscle: { muscleGroup: string | null; strengthScore: number | null } | null;

    totalVolume: number | null;
    balanceScore: number | null;
  };
}

export type WorkoutStatus = "COMPLETED" | "SKIPPED" | "IN_PROGRESS" | "PLANNED";


export interface RecentWorkout {
  id: string;
  sessionDate: string;
  dayName: string;
  status: WorkoutStatus;
  durationMin: number | null;
  totalSets: number | null;
  totalVolume: number | null;
  xpEarned: number | null;
  mood: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'TIRED' | 'EXHAUSTED' | "POOR" | null;
}

export interface PersonalRecord {
  exerciseName: string;
  muscleGroup: string;
  maxWeight: number | null;
  maxReps: number | null;
  achievedAt: string | null;
  totalSets: number | null;
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
