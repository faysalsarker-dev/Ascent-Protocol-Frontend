import { cn } from "@/src/lib/utils";
import { Check, Dumbbell, Calendar, Zap } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_INFO = [
  { label: "Create Plan", icon: Dumbbell },
  { label: "Add Days", icon: Calendar },
  { label: "Add Exercises", icon: Zap },
];

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full space-y-4">
      {/* XP Bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-display text-primary uppercase tracking-wider">
            Quest Progress
          </span>
          <span className="text-xs font-display text-muted-foreground">
            Step {currentStep}/{totalSteps}
          </span>
        </div>
        <div className="xp-bar h-3">
          <div
            className="xp-bar-fill"
            style={{ width: `${Math.max(progress, 5)}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {STEP_INFO.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;
          const Icon = step.icon;

          return (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center gap-2 transition-all duration-300",
                isCurrent && "scale-110"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 border-2",
                  isCompleted
                    ? "bg-primary border-primary neon-glow"
                    : isCurrent
                    ? "bg-primary/20 border-primary animate-pulse-glow"
                    : "bg-muted/30 border-border/50"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-display text-center hidden sm:block",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};