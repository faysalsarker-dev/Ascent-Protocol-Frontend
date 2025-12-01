
"use client"
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Dumbbell,
  TrendingUp,
  Zap,
  Calendar,
  Activity,
  Target,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/src/components/ui/tabs";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { AnatomyVisualization } from "@/src/components/modules/userDashboard/AnatomyVisualization";
import { AddExerciseDialog } from "@/src/components/modules/userDashboard/AddExerciseDialog";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: string;
  muscle: string;
}

interface Schedule {
  [key: string]: Exercise[];
}

interface DashboardData {
  userStats: {
    level: number;
    rank: string;
    streak: number;
    totalLifted: number;
  };
  progressData: Array<{
    date: string;
    volume: number;
    calories: number;
  }>;
  muscleScores: Array<{
    id: string;
    name: string;
    score: number;
  }>;
  schedule: Schedule;
}

interface DashboardClientProps {
  initialData: DashboardData;
}

export default function DashboardClient({ initialData }: DashboardClientProps) {
  const [schedule, setSchedule] = useState<Schedule>(initialData.schedule);
  const days = Object.keys(schedule);

  const handleAddExercise = (day: string, exercise: Exercise) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: [...prev[day], exercise],
    }));
  };

  const handleDeleteExercise = (day: string, index: number) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
    toast.success("Exercise removed");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-7xl">
        {/* Header - Mobile First */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Fitness Dashboard
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Welcome back! You're on a{" "}
              <span className="text-primary font-semibold">{initialData.userStats.streak} day streak</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="px-3 py-1.5 text-sm sm:text-base border-primary text-primary">
              Level {initialData.userStats.level}
            </Badge>
            <Badge className="px-3 py-1.5 text-sm sm:text-base bg-gradient-primary text-white">
              {initialData.userStats.rank}
            </Badge>
          </div>
        </motion.div>

        {/* Stats Grid - Mobile First (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              label: "Total Volume",
              value: `${(initialData.userStats.totalLifted / 1000).toFixed(0)}K`,
              unit: "kg",
              icon: Dumbbell,
              gradient: "from-primary to-info",
            },
            {
              label: "This Week",
              value: "6",
              unit: "workouts",
              icon: Activity,
              gradient: "from-accent to-warning",
            },
            {
              label: "Next Session",
              value: "Chest",
              unit: "Monday",
              icon: Calendar,
              gradient: "from-success to-primary",
            },
            {
              label: "Weekly Goal",
              value: "87%",
              unit: "complete",
              icon: Target,
              gradient: "from-info to-primary",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="shadow-card hover:shadow-glow transition-all duration-300 border-border/50">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div
                      className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                    >
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {stat.value}
                    <span className="text-xs sm:text-sm text-muted-foreground font-normal ml-1 sm:ml-2">
                      {stat.unit}
                    </span>
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid - Mobile First (Stack on mobile, side-by-side on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Anatomy Visualization - Full width on mobile, 4 cols on desktop */}
          <motion.div
            className="lg:col-span-4 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-card">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Muscle Development
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Visual progress tracker for all muscle groups
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] sm:h-[500px] flex items-center justify-center p-2 sm:p-6">
                <AnatomyVisualization scores={initialData.muscleScores} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts and Schedule - Full width on mobile, 8 cols on desktop */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-card">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Weekly Progress
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Training volume and calorie burn over the last 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] sm:h-[300px] p-2 sm:p-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={initialData.progressData}>
                      <defs>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis
                        dataKey="date"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Area
                        type="monotone"
                        dataKey="volume"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVolume)"
                        name="Volume (kg)"
                      />
                      <Area
                        type="monotone"
                        dataKey="calories"
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorCalories)"
                        name="Calories"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Workout Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="shadow-card">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Weekly Schedule
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Plan and track your workouts throughout the week
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <Tabs defaultValue="Monday" className="w-full">
                    <ScrollArea className="w-full pb-2">
                      <TabsList className="w-full justify-start flex-nowrap">
                        {days.map((day) => (
                          <TabsTrigger 
                            key={day} 
                            value={day} 
                            className="min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm"
                          >
                            {day.slice(0, 3)}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </ScrollArea>

                    {days.map((day) => (
                      <TabsContent key={day} value={day} className="space-y-4 mt-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold">{day}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {schedule[day].length > 0
                                ? `${schedule[day].length} exercise${schedule[day].length !== 1 ? 's' : ''}`
                                : "Rest day"}
                            </p>
                          </div>
                          <AddExerciseDialog
                            day={day}
                            onAdd={(exercise) => handleAddExercise(day, exercise)}
                          />
                        </div>

                        {schedule[day].length === 0 ? (
                          <div className="p-8 sm:p-12 text-center border-2 border-dashed border-border rounded-lg">
                            <Zap className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-sm sm:text-base text-muted-foreground">
                              Rest day or no exercises scheduled
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {schedule[day].map((exercise, index) => (
                              <motion.div
                                key={`${day}-${index}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                                  <CardContent className="p-3 sm:p-4 flex justify-between items-center gap-3">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-sm sm:text-base truncate">
                                          {exercise.name}
                                        </h4>
                                        <Badge variant="secondary" className="text-xs shrink-0">
                                          {exercise.muscle}
                                        </Badge>
                                      </div>
                                      <p className="text-xs sm:text-sm text-muted-foreground">
                                        {exercise.sets} sets × {exercise.reps} reps
                                        {exercise.weight !== "BW" && ` @ ${exercise.weight}`}
                                      </p>
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="shrink-0">
                                          <MoreVertical className="w-4 h-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          className="text-destructive"
                                          onClick={() => handleDeleteExercise(day, index)}
                                        >
                                          <Trash2 className="w-4 h-4 mr-2" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
