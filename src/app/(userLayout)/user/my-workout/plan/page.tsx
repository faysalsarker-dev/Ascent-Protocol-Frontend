
"use client"
import { useState } from "react";
import  CreatePlanStep  from "@/src/components/modules/workout/CreatePlanStep";
import  AddExercisesStep  from "@/src/components/modules/workout/AddExercisesStep";
import { ProgressBar } from "@/src/components/modules/workout/ProgressBar";
import { Swords, Sparkles } from "lucide-react";
import { CreateDaysStep, WorkoutDay } from "@/src/components/modules/workout/CreateDaysStep";

interface WorkoutPlan {
  name: string;
  description: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [days, setDays] = useState<WorkoutDay[]>([]);

  const handlePlanCreate = async (data: WorkoutPlan) => {
    await simulateDataFetch();
    setPlan(data);
    setCurrentStep(2);
  };

  const handleDaysCreate = (createdDays: WorkoutDay[]) => {
    setDays(createdDays);
    setCurrentStep(3);
  };

  const handleExercisesComplete = (exercises: Record<string, unknown[]>) => {
    console.log("Final Workout Plan:", {
      plan,
      days,
      exercises,
    });
    // Could reset or show completion screen
  };

  // Placeholder for future data fetching
  const simulateDataFetch = async () => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden text-foreground">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-background/80" />
      </div>

      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/20 neon-glow">
              <Swords className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-foreground mb-2 tracking-tight">
            <span className="neon-text">WORKOUT</span>{" "}
            <span className="text-primary">BUILDER</span>
          </h1>
          <p className="text-muted-foreground font-body text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Design your path to power
            <Sparkles className="w-4 h-4 text-primary" />
          </p>
        </header>

        {/* Progress Bar */}
        <div className="mb-8 sm:mb-10">
          <ProgressBar currentStep={currentStep} totalSteps={3} />
        </div>

        {/* Step Content */}
        <section>
          {currentStep === 1 && <CreatePlanStep onSubmit={handlePlanCreate} />}

          {currentStep === 2 && (
            <CreateDaysStep
              onSubmit={handleDaysCreate}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <AddExercisesStep
              days={days}
              onComplete={handleExercisesComplete}
              onBack={() => setCurrentStep(2)}
            />
          )}
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-muted-foreground/50 font-display">
            ARISE AND CONQUER
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Index;