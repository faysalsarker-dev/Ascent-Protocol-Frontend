"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RegisterBasicForm, ExtrasForm } from "@/src/schemas/register.schema";
import { Trophy, Zap } from "lucide-react";
import { RegisterStepBasic } from "./RegisterStepBasic";
import { RegisterStepExtras } from "./RegisterStepExtras";
import { AnimatePresence, motion } from 'framer-motion';
import { registerUser, updateProfileExtras } from "@/src/services/auth/auth.service";

type RegistrationStep = "basic" | "extras";
type RegistrationState = "idle" | "registering" | "registered" | "updating" | "completed";

export default function RegisterStepper() {
  const router = useRouter();
  const [step, setStep] = useState<RegistrationStep>("basic");
  const [state, setState] = useState<RegistrationState>("idle");
  const [basicData, setBasicData] = useState<RegisterBasicForm | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleBasicSubmit = async (data: RegisterBasicForm) => {
    if(step !== "basic") return;
    console.log('call register');
    setSubmissionError(null);
    setState("registering");

    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const registerResult = await registerUser(payload);

      if (!registerResult.success) {
        const message = registerResult.message || "Registration failed. Please try again.";
        setSubmissionError(message);
        toast.error(message);
        setState("idle");
        return;
      }

      // Store basic data and mark as registered
      setBasicData(data);
      setState("registered");
      
      toast.success(registerResult.message || "Account created successfully! +50 XP");
      
      // Move to extras step
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

  /**
   * Handle extras form submission
   * Updates profile with additional information
   */
const handleExtrasSubmit = async (extrasData: ExtrasForm) => {
    console.log('call updates');
  const hasExtrasData = 
    extrasData.avatar || 
    extrasData.bio || 
    extrasData.dateOfBirth || 
    extrasData.gender || 
    extrasData.weight || 
    extrasData.height;

  if (!hasExtrasData) {
    setState("completed");
    router.push("/dashboard");
    return;
  }

  setState("updating");

  try {
    const formData = new FormData();
    
    // Build data object for non-file fields
    const data: Record<string, any> = {};
    if (extrasData.bio) data.bio = extrasData.bio;
    if (extrasData.dateOfBirth) data.dateOfBirth = extrasData.dateOfBirth;
    if (extrasData.gender) data.gender = extrasData.gender;
    if (extrasData.weight) data.weight = extrasData.weight;
    if (extrasData.height) data.height = extrasData.height;

    // Append as JSON string with key 'data' (for Multer)
    if (Object.keys(data).length > 0) {
      formData.append('data', JSON.stringify(data));
    }
    
    if (extrasData.avatar) {
      formData.append('file', extrasData.avatar);
    }

    const updateResult = await updateProfileExtras(formData);
    console.log(updateResult);
    
    if (!updateResult.success) {
      toast.warning("Some profile details couldn't be saved. You can update them later in settings.");
    } else {
      toast.success("Profile enhanced successfully! +50 XP");
    }
    
  } catch (error) {
    console.error("Profile update error:", error);
    toast.warning("Profile details couldn't be saved. You can update them later in settings.");
  } 
  
  // finally {
  //   setState("completed");
  //   router.push("/dashboard");
  // }
};

  /**
   * Handle skip extras step
   * Redirects directly to dashboard
   */
  const handleSkip = () => {
    if (state !== "registered") {
      toast.error("Please complete registration first.");
      return;
    }
    
    setState("completed");
    router.push("/dashboard");
  };

  /**
   * Handle back navigation
   * Prevents going back after registration is complete
   */
  const handleBack =() => {
    if (state === "registered" || state === "updating") {
      toast.info("Account already created. Redirecting to dashboard...");
      router.push("/dashboard");
      return;
    }

    setSubmissionError(null);
    setStep("basic");
  };

  // Calculate progress percentage
  const progress = step === "basic" ? 50 : 100;
  
  // Determine loading state
  const isLoading = state === "registering" || state === "updating";

  return (
    <>
      <div className="relative w-full max-w-xl">

        {/* Card */}
        <div className="relative  backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 md:p-12 shadow-2xl">
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
                className="h-full bg-linear-to-r from-purple-600 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {step === "extras" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
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
        </div>
      </div>
    </>
  );
}