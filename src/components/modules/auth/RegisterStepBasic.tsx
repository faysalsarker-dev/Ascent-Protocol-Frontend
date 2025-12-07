import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, AlertTriangle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { CornerBracket } from "../today-task/GamifiedEffects";
import { RegisterFormValues, registerSchema } from "@/src/schemas/register.schema";



interface RegisterStepBasicProps {
  onNext: (data: RegisterFormValues) => void | Promise<void>;
  defaultValues?: Partial<RegisterFormValues>;
  loading?: boolean;
  errorMessage?: string | null;
}

export function RegisterStepBasic({ 
  onNext, 
  defaultValues,
  loading = false,
  errorMessage = null
}: RegisterStepBasicProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      password: "",
    },
  });

  const isProcessing = isSubmitting || loading;

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onNext)}
      className="space-y-5"
    >
      {/* Name Field */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Hunter Name
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter your name"
              disabled={isProcessing}
              className="bg-background/50 border-border/50 focus:border-primary/50"
            />
          )}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          Email
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              placeholder="your@email.com"
              disabled={isProcessing}
              className="bg-background/50 border-border/50 focus:border-primary/50"
            />
          )}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" />
          Password
        </Label>
        <div className="relative">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                disabled={isProcessing}
                className="bg-background/50 border-border/50 focus:border-primary/50 pr-10"
              />
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isProcessing}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

 <AnimatePresence>
              {errorMessage && (
                <motion.div
                  className="relative p-4 bg-destructive/10 border border-destructive/30 rounded-sm"
                  initial={{ opacity: 0, scale: 0.95, height: 0 }}
                  animate={{ opacity: 1, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, scale: 0.95, height: 0 }}
                >
                  <CornerBracket position="tl" color="destructive" />
                  <CornerBracket position="br" color="destructive" />
                  
                  <div className="flex items-start gap-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1] 
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                    </motion.div>
                    <div>
                      <p className="font-system text-sm text-destructive font-medium">
                        AUTHENTICATION FAILED
                      </p>
                      <p className="text-xs text-destructive/80 mt-1">
                        {errorMessage || "Verify your credentials and try again."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

 
      {/* Submit Button */}
      <Button 
        type="submit" 
        disabled={isProcessing}
        className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-mono tracking-wide"
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
            />
            INITIALIZING...
          </span>
        ) : (
          "CONTINUE →"
        )}
      </Button>
    </motion.form>
  );
}
