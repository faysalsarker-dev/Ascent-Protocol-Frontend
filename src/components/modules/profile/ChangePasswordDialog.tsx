import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X, Check, Eye, EyeOff, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { usePassWordChange } from "@/src/hooks/useAuth";
import { toast } from "sonner";

// Validation schema
const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


const getPasswordStrength = (password: string) => {
  if (!password) return { strength: 0, label: "" };

  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong", "Very Strong"];
  const colors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-500", "bg-emerald-500"];

  // Cap strength at 5 for array access
  const cappedStrength = Math.min(strength, 6);
  
  return { 
    strength: cappedStrength, 
    label: labels[cappedStrength],
    color: colors[cappedStrength]
  };
};


interface PasswordFieldComponentProps {
  label: string;
  name: keyof PasswordFormData;
  show: boolean;
  onToggle: () => void;
  placeholder: string;
  error?: string;
  isSubmitting: boolean; // Pass this down as a prop
  register: ReturnType<typeof useForm<PasswordFormData>>['register']; // Pass the register function
}

const PasswordField = ({
  label,
  name,
  show,
  onToggle,
  placeholder,
  error,
  isSubmitting,
  register
}: PasswordFieldComponentProps) => (
  <div className="space-y-2">
    <Label className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
      {label}
    </Label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type={show ? "text" : "password"}
        {...register(name)}
        placeholder={placeholder}
        className={`input-system h-12 text-foreground pl-10 pr-10 ${
          error ? "border-destructive" : ""
        }`}
        disabled={isSubmitting}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        disabled={isSubmitting}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
    {error && (
      <p className="text-xs text-destructive font-mono">{error}</p>
    )}
  </div>
);



export const ChangePasswordDialog = ({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const passwordMutation = usePassWordChange();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
  });

  const newPassword = useWatch({
    control, 
    name: "newPassword",
  });

  const onSubmit = async (data: PasswordFormData) => {
    const payload = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    passwordMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('Password updated successfully')
      
        reset();
        onOpenChange(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
   onError: (error: any) => {
  const apiErrorMessage = 
    error.response?.data?.message || 
    error.message;                   

  toast.error(apiErrorMessage || "An unknown error occurred while changing your password.");
},
    });
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  // Now the helper function is called here, but defined outside
  const passwordStrength = getPasswordStrength(newPassword || "");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="p-3 border-destructive/40 max-w-[90vw] sm:max-w-md overflow-hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="system-header" style={{ borderColor: "hsl(0, 90%, 55%, 0.3)" }}>
                <DialogTitle className="font-display text-sm tracking-widest text-center text-destructive">
                  SECURITY PROTOCOL
                </DialogTitle>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-destructive/20 border border-destructive/40 flex items-center justify-center animate-pulse">
                    <Shield className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <p className="font-display text-sm text-foreground">Change Password</p>
                    <p className="font-mono text-xs text-muted-foreground">Update security credentials</p>
                  </div>
                </div>

                {/* PasswordField uses register and isSubmitting from the form hook */}
                <PasswordField
                  label="Current Password"
                  name="currentPassword"
                  show={showCurrent}
                  onToggle={() => setShowCurrent(!showCurrent)}
                  placeholder="Enter current..."
                  error={errors.currentPassword?.message}
                  isSubmitting={isSubmitting}
                  register={register}
                />

                <PasswordField
                  label="New Password"
                  name="newPassword"
                  show={showNew}
                  onToggle={() => setShowNew(!showNew)}
                  placeholder="Enter new..."
                  error={errors.newPassword?.message}
                  isSubmitting={isSubmitting}
                  register={register}
                />

                {/* Password Strength Indicator */}
                <AnimatePresence>
                  {newPassword && (
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              level <= passwordStrength.strength
                                ? passwordStrength.color
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-mono text-muted-foreground">
                        Strength: {passwordStrength.label}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  show={showConfirm}
                  onToggle={() => setShowConfirm(!showConfirm)}
                  placeholder="Confirm new..."
                  error={errors.confirmPassword?.message}
                  isSubmitting={isSubmitting}
                  register={register}
                />

                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1 btn-system py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Cancel</span>
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-lg flex items-center justify-center gap-2 animate-glow-pulse disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, hsl(0, 90%, 55%, 0.3), hsl(0, 70%, 40%, 0.3))",
                      border: "1px solid hsl(0, 90%, 55%, 0.6)"
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-destructive/30 border-t-destructive rounded-full animate-spin" />
                        <span className="text-destructive font-display tracking-wider">Updating...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 text-destructive" />
                        <span className="text-destructive font-display tracking-wider">Update</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};