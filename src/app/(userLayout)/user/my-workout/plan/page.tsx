
"use client";

import CreatePlanStep from "@/src/components/modules/workout/create/CreatePlanStep";
import AddExercisesStep from "@/src/components/modules/workout/create/AddExercisesStep";
import CreateDaysStep from "@/src/components/modules/workout/create/CreateDaysStep";
import { Swords, Sparkles } from "lucide-react";
import { ProgressBar } from "@/src/components/ui/ProgressBar";
import { WorkoutBuilderProvider, useWorkoutBuilder } from "@/src/context/WorkoutBuilderContext";
import { CornerBracket, GlitchText, HexagonIcon } from "@/src/components/modules/today-task/GamifiedEffects";
import { motion } from 'framer-motion';
import { ParticleBackground } from "@/src/components/modules/today-task/ParticleBackground";

// Separate component to use the context
function WorkoutBuilderContent() {
  const { state } = useWorkoutBuilder();
  const { currentStep } = state;

  return (
     <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <ParticleBackground />
   

      {/* Ambient Glow */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <HexagonIcon icon={Swords} color="primary" size="lg" />
          </div>
          
          <h1 className="font-system text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <GlitchText className="text-glow">WORKOUT</GlitchText>{" "}
            <span className="text-primary">BUILDER</span>
          </h1>
          
          <motion.p
            className="text-muted-foreground text-sm sm:text-base flex items-center justify-center gap-2 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            Design your path to power
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.p>
        </motion.header>

        {/* Main Card */}
        <motion.div
          className="relative bg-card/50 backdrop-blur-xl border border-primary/20 rounded-sm p-6 sm:p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Corner Brackets */}
          <CornerBracket position="tl" color="primary" />
          <CornerBracket position="tr" color="primary" />
          <CornerBracket position="bl" color="primary" />
          <CornerBracket position="br" color="primary" />

          {/* Animated Border Glow */}
          <motion.div
            className="absolute inset-0 rounded-sm pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 20px hsl(var(--primary) / 0.1), inset 0 0 20px hsl(var(--primary) / 0.02)",
                "0 0 40px hsl(var(--primary) / 0.2), inset 0 0 40px hsl(var(--primary) / 0.05)",
                "0 0 20px hsl(var(--primary) / 0.1), inset 0 0 20px hsl(var(--primary) / 0.02)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Progress Bar */}
          <div className="mb-8 sm:mb-10">
            <ProgressBar currentStep={currentStep} totalSteps={3} />
          </div>

          {/* Step Content */}
          <section>
            {currentStep === 1 && <CreatePlanStep />}
            {currentStep === 2 && <CreateDaysStep />}
            {currentStep === 3 && <AddExercisesStep />}
          </section>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-muted-foreground/60 font-system tracking-widest">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ◆
            </motion.span>
            {" "}ARISE AND CONQUER{" "}
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              ◆
            </motion.span>
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

// Main exported component with provider
export default function WorkoutBuilderPage() {
  return (
    <WorkoutBuilderProvider>
      <WorkoutBuilderContent />
    </WorkoutBuilderProvider>
  );
}