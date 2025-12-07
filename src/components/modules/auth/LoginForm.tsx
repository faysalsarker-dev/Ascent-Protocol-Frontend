"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ShieldCheck, Zap, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { 
  GlitchText, 
  CornerBracket,
  HexagonIcon,
  StatusBadge
} from "@/src/components/modules/today-task/GamifiedEffects";
import { ParticleBackground } from "@/src/components/modules/today-task/ParticleBackground";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";
import { useLoginUser } from "@/src/hooks/useAuth";
import { useState } from "react";
import { LoginFormValues, loginSchema } from "@/src/schemas/auth.schema";

// Login Schema


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending, error } = useLoginUser({
    onSuccess: (data) => {
      toast.success(data.message || "Hunter authentication successful!");
      router.push("/user");
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <ParticleBackground />
      
      {/* Ambient Glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Login Panel */}
        <div className="relative bg-card/60 backdrop-blur-xl border border-primary/30 rounded-sm p-8 shadow-2xl">
          {/* Corner Brackets */}
          <CornerBracket position="tl" color="primary" />
          <CornerBracket position="tr" color="primary" />
          <CornerBracket position="bl" color="primary" />
          <CornerBracket position="br" color="primary" />
          
          {/* Animated Border Glow */}
          <motion.div
            className="absolute inset-0 rounded-sm pointer-events-none"
            style={{
              boxShadow: "0 0 30px hsl(var(--primary) / 0.2), inset 0 0 30px hsl(var(--primary) / 0.05)"
            }}
            animate={{
              boxShadow: [
                "0 0 30px hsl(var(--primary) / 0.2), inset 0 0 30px hsl(var(--primary) / 0.05)",
                "0 0 50px hsl(var(--primary) / 0.4), inset 0 0 50px hsl(var(--primary) / 0.1)",
                "0 0 30px hsl(var(--primary) / 0.2), inset 0 0 30px hsl(var(--primary) / 0.05)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Hexagon Icon */}
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <HexagonIcon icon={ShieldCheck} color="primary" size="lg" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-system text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlitchText className="text-glow">REAWAKEN</GlitchText>
            </motion.h1>
            
            <motion.p
              className="text-muted-foreground text-sm tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              :: HUNTER AUTHENTICATION REQUIRED ::
            </motion.p>

            {/* Status Badge */}
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <StatusBadge 
                label="SYSTEM" 
                value={isPending ? "AUTHENTICATING" : "STANDBY"} 
                color="primary" 
              />
            </motion.div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Zap className="w-3 h-3 text-primary" />
                Hunter ID
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="hunter@system.com"
                  disabled={isPending}
                  className={`bg-background/60 border-primary/30 focus:border-primary focus:ring-primary/30 placeholder:text-muted-foreground/50 ${
                    errors.email ? "border-destructive" : ""
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <motion.div
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  </motion.div>
                )}
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    className="text-xs text-destructive flex items-center gap-1"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password Field */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-primary" />
                Security Code
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isPending}
                  className={`bg-background/60 border-primary/30 focus:border-primary focus:ring-primary/30 pr-10 placeholder:text-muted-foreground/50 ${
                    errors.password ? "border-destructive" : ""
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isPending}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    className="text-xs text-destructive flex items-center gap-1"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Server Error Display */}
            <AnimatePresence>
              {error && (
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
                        {error.message || "Verify your credentials and try again."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 font-system text-sm uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group"
              >
                {/* Button Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  animate={{ x: isPending ? "100%" : "-100%" }}
                  transition={{ 
                    duration: 1, 
                    repeat: isPending ? Infinity : 0,
                    ease: "linear"
                  }}
                />
                
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AUTHENTICATING...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    INITIATE SESSION
                  </span>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Footer Link */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-muted-foreground">
              New to the system?{" "}
              <Link 
                href="/register" 
                className="text-primary hover:text-primary/80 font-medium transition-colors relative group"
              >
                <span className="relative">
                  Awaken Now
                  <motion.span
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </Link>
            </p>
          </motion.div>

          {/* System Footer */}
          <motion.div
            className="mt-6 pt-4 border-t border-primary/20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-xs text-muted-foreground/60 font-mono">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ◆
              </motion.span>
              {" "}SYSTEM v2.0 :: SECURE PORTAL{" "}
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                ◆
              </motion.span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;