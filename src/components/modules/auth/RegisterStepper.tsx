/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Trophy, Zap, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  RegisterStepExtras,
  ExtrasForm,
} from "@/src/components/modules/auth/RegisterStepExtras";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@/src/components/ui/progress";
import { useCreateUser, useUpdateUser } from "@/src/hooks/useAuth";
import { RegisterStepBasic } from "./RegisterStepBasic";
import { RegisterFormValues } from "@/src/schemas/register.schema";


type RegistrationStep = "basic" | "extras";

export default function RegisterStepper() {
  const router = useRouter();
  const [step, setStep] = useState<RegistrationStep>("basic");
  const [userId, setUserId] = useState<string | null>(null);

  // Register mutation
  const {
    mutate: registerUser,
    isPending: isRegistering,
    error: registerError,
  } = useCreateUser({
    onSuccess: (data) => {
      toast.success("◆ HUNTER REGISTERED ◆ +50 XP");
      const id = data.data?.userId || data.data?.id || data.data?.user?.id;
      setUserId(id);
      setStep("extras");
    }
  });

  // Update profile mutation - using your existing hook
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateUser();

  const handleBasicSubmit = (data: RegisterFormValues) => {
    registerUser(data);
  };

  const handleExtrasSubmit = (extrasData: ExtrasForm) => {
  // Check if any data was provided
  const hasExtrasData =
    extrasData.avatar ||
    extrasData.dateOfBirth ||
    extrasData.gender ||
    extrasData.weight !== undefined ||
    extrasData.height !== undefined ||
    extrasData.currentGoal;

  if (!hasExtrasData) {
    router.push("/user");
    return;
  }

  const updateData: Record<string, any> = {};

  // Add fields only if they have values
  if (extrasData.avatar) updateData.avatar = extrasData.avatar;
  if (extrasData.dateOfBirth) updateData.dateOfBirth = extrasData.dateOfBirth;
  if (extrasData.gender) updateData.gender = extrasData.gender;
  if (extrasData.weight !== undefined && extrasData.weight !== null) {
    updateData.weight = extrasData.weight;
  }
  if (extrasData.height !== undefined && extrasData.height !== null) {
    updateData.height = extrasData.height;
  }
  if (extrasData.currentGoal) updateData.currentGoal = extrasData.currentGoal;

  updateProfile(updateData, {
    onSuccess: () => {
      toast.success("◆ PROFILE ENHANCED ◆ +50 XP");
      router.push("/user");
    },
    onError: () => {
      toast.warning("Profile details couldn't be saved. You can update them later.");
      router.push("/user"); // Still redirect on error
    },
  });
};

  const handleSkip = () => {
    if (!userId) {
      toast.error("Please complete registration first.");
      return;
    }
    router.push("/user");
  };

  const handleBack = () => {
    if (userId) {
      toast.info("Account already created. Redirecting...");
      router.push("/user");
      return;
    }
    setStep("basic");
  };

  const progress = step === "basic" ? 50 : 100;
  const isLoading = isRegistering || isUpdating;

  return (
    <div className="relative w-full max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 md:p-12 shadow-2xl"
      >
        {/* Corner accents */}
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
              loading={isLoading}
              errorMessage={registerError?.message || null}
            />
          ) : (
            <RegisterStepExtras
              key="extras"
              onSubmit={handleExtrasSubmit}
              onSkip={handleSkip}
              onBack={handleBack}
              loading={isLoading}
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