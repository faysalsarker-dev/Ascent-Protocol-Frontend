"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
  getVolumeChart,
  getMuscleDistribution,
  getRecentWorkouts,
  getPersonalRecords,
  getDashboardOverview,
} from "@/src/services/dashboard/dasboard.service";

// Cache 1 hour
const ONE_HOUR = 1000 * 60 * 60;

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    // staleTime: ONE_HOUR,
    // gcTime: ONE_HOUR,
  });
}

export function useVolumeChart() {
  return useQuery({
    queryKey: ["volume-chart"],
    queryFn: getVolumeChart,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
  });
}

export function useMuscleDistribution(period: "1month" | "3months" | "6months" | "all" = "3months") {
  return useQuery({
    queryKey: ["muscle-distribution", period],
    queryFn: () => getMuscleDistribution(period),
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
  });
}

export function useRecentWorkouts(limit = 5) {
  return useQuery({
    queryKey: ["recent-workouts", limit],
    queryFn: () => getRecentWorkouts(limit),
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
  });
}

export function usePersonalRecords() {
  return useQuery({
    queryKey: ["personal-records"],
    queryFn: getPersonalRecords,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
  });
}

export function useDashboardOverview() {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: getDashboardOverview,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
  });
}
