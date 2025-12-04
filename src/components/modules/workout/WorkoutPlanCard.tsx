"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Dumbbell, Crown, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

interface WorkoutDay {
  id: string;
  name: string;
  isRestDay: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exercises?: any[];
}

interface WorkoutPlan {
  id: string;
  name: string;
  description: string | null | undefined;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string | null;
  userId: string;
  workoutDays: WorkoutDay[];
  _count: { workoutDays: number };
}

interface WorkoutPlanCardProps {
  plan: WorkoutPlan;
  index?: number;
}

const WorkoutPlanCard: React.FC<WorkoutPlanCardProps> = ({ plan, index = 0 }) => {
  return (
    <motion.div
      key={plan.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card
        className={`glass-elevated overflow-hidden group hover:border-primary/50 transition-all duration-300 relative ${
          plan.isActive ? "border-primary/50" : ""
        }`}
      >
        {/* Active Badge */}
        {plan.isActive && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-primary/20 text-primary border-primary/30 gap-1">
              <Crown className="w-3 h-3" />
              Active
            </Badge>
          </div>
        )}

        {/* Header */}
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:glow-primary-sm transition-all">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0 pr-16">
              <CardTitle className="text-lg sm:text-xl font-display truncate">
                {plan.name}
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2">
                {plan.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>





        {/* Content */}
        <CardContent className="space-y-4">

 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {plan._count.workoutDays} days/week
                      </span>
                    </div>
                  </div>


     <Link href={`/user/planDetails/${plan.id}`}>
            <Button
              className={`w-full group/btn ${
                plan.isActive ? "bg-primary/20 text-primary hover:bg-primary/30" : ""
              }`}
              variant={plan.isActive ? "outline" : "default"}
            >
              {plan.isActive ? "Currently Active" : "Start Plan"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
     </Link>
        </CardContent>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-primary/5 to-transparent" />
      </Card>
    </motion.div>
  );
};

export default WorkoutPlanCard;
