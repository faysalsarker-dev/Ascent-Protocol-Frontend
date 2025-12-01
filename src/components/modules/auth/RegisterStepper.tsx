"use client";

import { useActionState, useState } from "react";
import { RegisterBasicForm, ExtrasForm } from "@/src/schemas/register.schema";
import { RegisterPayload } from "@/src/types/auth";
import { Trophy, Zap } from "lucide-react";
import { RegisterStepBasic } from "./RegisterStepBasic";
import { RegisterStepExtras } from "./RegisterStepExtras";
import { Card } from "@/src/components/ui/card";
import { AnimatePresence, motion } from 'framer-motion';
import { registerUser } from "@/src/services/auth/auth.service";




export default function RegisterStepper() {
    const [state, formAction, isPending] = useActionState(registerUser, null);

  const [step, setStep] = useState<"basic" | "extras">("basic");
  const [basicData, setBasicData] = useState<RegisterBasicForm | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBasicSubmit = (data: RegisterBasicForm) => {
    console.log("Basic data submitted:", data);
    setBasicData(data);
    setStep("extras");
  };

  const handleExtrasSubmit = async (extrasData: ExtrasForm) => {
    if (!basicData) return;
    
    setLoading(true);
    console.log("Full registration payload:", { ...basicData, ...extrasData });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert("Registration complete! Check console for data.");
    setLoading(false);
  };

  const handleSkip = async () => {
    if (!basicData) return;
    
    setLoading(true);
    console.log("Skipped extras, basic data:", basicData);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert("Registration complete (extras skipped)! Check console.");
    setLoading(false);
  };

  const handleBack = () => setStep("basic");

  const progress = step === "basic" ? 50 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl">
        {/* Glow Effects */}
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-purple-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full" />
        
        {/* Card */}
        <div className="relative bg-gray-900/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 md:p-12 shadow-2xl">
          {/* Progress Bar */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-medium">
                Step {step === "basic" ? "1" : "2"} of 2
              </span>
              <div className="flex items-center gap-2 text-purple-400">
                <Zap className="w-4 h-4" />
                <span className="font-bold">{progress} XP</span>
              </div>
            </div>

            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {step === "extras" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs text-blue-400"
              >
                <Trophy className="w-4 h-4" />
                <span>Bonus XP available!</span>
              </motion.div>
            )}
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === "basic" ? "Awaken Your Account" : "Enhance Your Profile"}
            </h2>
            <p className="text-gray-400">
              {step === "basic"
                ? "Begin your leveling journey"
                : "Optional upgrades for your character"}
            </p>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {step === "basic" ? (
              <RegisterStepBasic
                key="basic"
                onNext={handleBasicSubmit}
                defaultValues={basicData || undefined}
              />
            ) : (
              <RegisterStepExtras
                key="extras"
                onSubmit={handleExtrasSubmit}
                onSkip={handleSkip}
                onBack={handleBack}
                loading={loading}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}