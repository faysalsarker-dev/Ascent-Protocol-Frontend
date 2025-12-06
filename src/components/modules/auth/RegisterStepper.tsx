
"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Trophy, Zap, Shield } from "lucide-react";
import { RegisterStepBasic, RegisterBasicForm } from "@/src/components/modules/auth/RegisterStepBasic";
import { RegisterStepExtras, ExtrasForm } from "@/src/components/modules/auth/RegisterStepExtras";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@/src/components/ui/progress";

type RegistrationStep = "basic" | "extras";
type RegistrationState = "idle" | "registering" | "registered" | "updating" | "completed";

export default function RegisterStepper() {
  const [step, setStep] = useState<RegistrationStep>("basic");
  const [state, setState] = useState<RegistrationState>("idle");
  const [basicData, setBasicData] = useState<RegisterBasicForm | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleBasicSubmit = async (data: RegisterBasicForm) => {
    if (step !== "basic") return;
    setSubmissionError(null);
    setState("registering");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setBasicData(data);
      setState("registered");
      toast.success("◆ HUNTER REGISTERED ◆ +50 XP");
      setStep("extras");
    } catch (error) {
      const message = error instanceof Error 
        ? error.message 
        : "Registration failed. Please try again.";
      setSubmissionError(message);
      toast.error(message);
      setState("idle");
    }
  };

  const handleExtrasSubmit = async (extrasData: ExtrasForm) => {
    const hasExtrasData = 
      extrasData.avatar || 
      extrasData.bio || 
      extrasData.dateOfBirth || 
      extrasData.gender || 
      extrasData.weight || 
      extrasData.height;

    if (!hasExtrasData) {
      setState("completed");
      navigate("/");
      return;
    }

    setState("updating");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("◆ PROFILE ENHANCED ◆ +50 XP");
      setState("completed");
    } catch (error) {
      toast.warning("Profile details couldn't be saved. You can update them later.");
      setState("completed");
    }
  };

  const handleSkip = () => {
    if (state !== "registered") {
      toast.error("Please complete registration first.");
      return;
    }
    setState("completed");
  };

  const handleBack = () => {
    if (state === "registered" || state === "updating") {
      toast.info("Account already created. Redirecting...");
      // navigate("/");
      return;
    }
    setSubmissionError(null);
    setStep("basic");
  };

  const progress = step === "basic" ? 50 : 100;
  const isLoading = state === "registering" || state === "updating";

  return (
    <div className="relative w-full max-w-xl">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 md:p-12 shadow-2xl"
      >
        {/* Subtle corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/40 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/40 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/40 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/40 rounded-br-2xl" />

        {/* Progress Section */}
        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground font-medium font-mono">
              STEP {step === "basic" ? "1" : "2"} / 2
            </span>
            <div className="flex items-center gap-2 text-primary">
              <Zap className="w-4 h-4" />
              <span className="font-bold font-mono">{progress} XP</span>
            </div>
          </div>

          <Progress value={progress} className="h-2" />

          {step === "extras" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-xs text-system-info"
            >
              <Trophy className="w-4 h-4" />
              <span className="font-mono">BONUS XP AVAILABLE</span>
            </motion.div>
          )}
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground font-system tracking-wide">
              {step === "basic" ? "AWAKEN YOUR ACCOUNT" : "ENHANCE PROFILE"}
            </h2>
          </div>
          <p className="text-muted-foreground font-mono text-sm">
            {step === "basic"
              ? "Begin your hunter journey"
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
              loading={isLoading}
              errorMessage={submissionError}
            />
          ) : (
            <RegisterStepExtras
              key="extras"
              onSubmit={handleExtrasSubmit}
              onSkip={handleSkip}
              onBack={handleBack}
              loading={isLoading}
              errorMessage={submissionError}
            />
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-[10px] text-muted-foreground/50 tracking-wider text-center mt-6"
        >
          ◆ HUNTER REGISTRATION SYSTEM ◆
        </motion.p>
      </motion.div>
    </div>
  );
}
