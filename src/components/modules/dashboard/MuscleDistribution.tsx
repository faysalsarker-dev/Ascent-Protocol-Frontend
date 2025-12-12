import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Progress } from "@/src/components/ui/progress";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Target, TrendingUp, TrendingDown } from "lucide-react";
import type { MuscleDistributionData, WidgetState } from "./types";
import { ErrorCard } from "./ErrorCard";

interface MuscleDistributionProps {
  data: MuscleDistributionData | undefined;
  onRetry: () => void;
}

const COLORS = [
  'hsl(187, 100%, 50%)',  // Primary cyan
  'hsl(45, 100%, 55%)',   // Gold accent
  'hsl(142, 76%, 45%)',   // Success green
  'hsl(280, 80%, 60%)',   // Purple
  'hsl(15, 90%, 55%)',    // Orange
  'hsl(200, 80%, 50%)',   // Blue
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 }
};

export function MuscleDistribution({ data, onRetry }: MuscleDistributionProps) {
 
if (!data) {
  return <ErrorCard message="No muscle distribution data available" onRetry={onRetry} />;
}


  const { data: muscleData, summary } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    >
      <Card className="card-glow">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Muscle Distribution
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">Balance Score:</span>
            <span className="text-sm font-display font-bold text-primary">{summary?.balanceScore}%</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-[140px] h-[140px] mx-auto sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={muscleData}
                    dataKey="percentage"
                    nameKey="muscleGroup"
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                    strokeWidth={2}
                    stroke="hsl(222, 47%, 6%)"
                  >
                    {muscleData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(222, 47%, 9%)',
                      border: '1px solid hsl(222, 30%, 18%)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number, name: string) => [`${value?.toFixed(1)}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <motion.div 
              className="flex-1 space-y-2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {muscleData.slice(0, 4).map((muscle, index) => (
                <motion.div key={muscle?.muscleGroup} variants={item} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="capitalize text-muted-foreground">
                        {muscle?.muscleGroup?.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{muscle?.strengthScore}</span>
                      {muscle?.muscleGroup === summary?.strongestMuscle?.muscleGroup ? (
                        <TrendingUp className="h-3 w-3 text-success" />
                      ) : muscle?.muscleGroup === summary?.weakestMuscle?.muscleGroup ? (
                        <TrendingDown className="h-3 w-3 text-warning" />
                      ) : null}
                    </div>
                  </div>
                  <Progress 
                    value={muscle.strengthScore} 
                    className="h-1.5"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
