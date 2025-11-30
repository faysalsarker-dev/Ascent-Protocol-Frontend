import DashboardClientContent from "@/src/components/modules/userDashboard/DashboardClientContent";
import { Metadata } from "next";








export const metadata: Metadata = {
  title: 'Dashboard | AuraFit AI',
  description: 'Hunter System Status and Schedule Management',
};

const MOCK_DATA = {
  userStats: {
    level: 24,
    rank: "Advanced",
    streak: 14,
    totalLifted: 145000, // kg
  },
  progressData: [
    { date: "Mon", volume: 7200, calories: 380 },
    { date: "Tue", volume: 0, calories: 0 },
    { date: "Wed", volume: 8500, calories: 420 },
    { date: "Thu", volume: 6200, calories: 340 },
    { date: "Fri", volume: 9800, calories: 480 },
    { date: "Sat", volume: 7100, calories: 390 },
    { date: "Sun", volume: 0, calories: 0 },
  ],
  muscleScores: [
    { id: "chest", name: "Chest", score: 85 },
    { id: "shoulders", name: "Shoulders", score: 78 },
    { id: "abs", name: "Core", score: 92 },
    { id: "quads", name: "Quads", score: 45 },
    { id: "back", name: "Back", score: 68 },
    { id: "arms", name: "Arms", score: 72 },
    { id: "calves", name: "Calves", score: 55 },
  ],
  schedule: {
    Monday: [
      { name: "Bench Press", sets: 4, reps: "8-10", weight: "80kg", muscle: "Chest" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", weight: "30kg", muscle: "Chest" },
      { name: "Cable Flys", sets: 3, reps: "12-15", weight: "20kg", muscle: "Chest" },
    ],
    Tuesday: [
      { name: "Deadlift", sets: 4, reps: "5-6", weight: "140kg", muscle: "Back" },
      { name: "Pull Ups", sets: 3, reps: "8-10", weight: "BW", muscle: "Back" },
      { name: "Barbell Rows", sets: 3, reps: "8-10", weight: "70kg", muscle: "Back" },
    ],
    Wednesday: [],
    Thursday: [
      { name: "Squats", sets: 4, reps: "8-10", weight: "120kg", muscle: "Legs" },
      { name: "Leg Press", sets: 3, reps: "12-15", weight: "180kg", muscle: "Legs" },
      { name: "Leg Curls", sets: 3, reps: "12-15", weight: "50kg", muscle: "Legs" },
    ],
    Friday: [
      { name: "Overhead Press", sets: 4, reps: "8-10", weight: "50kg", muscle: "Shoulders" },
      { name: "Lateral Raises", sets: 4, reps: "12-15", weight: "12kg", muscle: "Shoulders" },
      { name: "Face Pulls", sets: 3, reps: "15-20", weight: "25kg", muscle: "Shoulders" },
    ],
    Saturday: [
      { name: "Barbell Curls", sets: 3, reps: "10-12", weight: "35kg", muscle: "Arms" },
      { name: "Tricep Dips", sets: 3, reps: "8-12", weight: "BW", muscle: "Arms" },
      { name: "Hammer Curls", sets: 3, reps: "10-12", weight: "18kg", muscle: "Arms" },
    ],
    Sunday: [],
  },
};

const UserDashboard = () => {
    return (
        <div>
             <DashboardClientContent initialData={MOCK_DATA} />
        </div>
    );
};

export default UserDashboard;

