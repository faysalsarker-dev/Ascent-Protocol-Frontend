import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Dumbbell, Crown, ArrowRight, Calendar, Shield, Flame } from "lucide-react";
import Link from "next/link";

interface WorkoutDay {
  id: string;
  name: string;
  isRestDay: boolean;
  exercises?: unknown[];
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
      className="relative group"
    >
      {/* Corner Brackets */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors z-10" />
      <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-primary/40 group-hover:border-primary transition-colors z-10" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors z-10" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors z-10" />

      <Card
        className={`overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 relative ${
          plan.isActive ? "border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.2)]" : ""
        }`}
      >
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--primary)/0.05)_2px,hsl(var(--primary)/0.05)_4px)]" />
        </div>

        {/* Active Badge */}
        {plan.isActive && (
          <motion.div 
            className="absolute top-4 right-4 z-10"
            animate={{ 
              boxShadow: ["0 0 10px hsl(var(--primary)/0.3)", "0 0 20px hsl(var(--primary)/0.5)", "0 0 10px hsl(var(--primary)/0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Badge className="bg-primary/20 text-primary border-primary/50 gap-1 font-bold">
              <Crown className="w-3 h-3" />
              ACTIVE
            </Badge>
          </motion.div>
        )}

        {/* Header */}
        <CardHeader className="pb-3 relative">
          <div className="flex items-start gap-3">
            <motion.div 
              className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 ${
                plan.isActive ? "shadow-[0_0_15px_hsl(var(--primary)/0.3)]" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {plan.isActive ? (
                <Flame className="w-6 h-6 text-primary" />
              ) : (
                <Dumbbell className="w-6 h-6 text-primary" />
              )}
            </motion.div>
            <div className="flex-1 min-w-0 pr-16">
              <CardTitle className="text-lg sm:text-xl font-bold truncate text-foreground">
                {plan.name}
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2 text-muted-foreground">
                {plan.description || "No description provided"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4 relative">
          {/* Stats Row */}
          <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">{plan._count.workoutDays}</span> days/week
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Level <span className="text-foreground font-semibold">1</span>
              </span>
            </div>
          </div>

          <Link href={`/plan-details/${plan.id}`}>
            <Button
              className={`w-full group/btn relative overflow-hidden ${
                plan.isActive 
                  ? "bg-primary/20 text-primary border-primary/50 hover:bg-primary/30" 
                  : ""
              }`}
              variant={plan.isActive ? "outline" : "default"}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                {plan.isActive ? "CURRENTLY ACTIVE" : "START PLAN"}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
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
