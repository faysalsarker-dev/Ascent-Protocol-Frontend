"use client";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  User,
  Weight,
  Ruler,
  Upload,
  X,
  ArrowLeft,
  SkipForward,
  CheckCircle,
  Camera,
  Activity,
  Cpu,
  AlertTriangle,
  Target,
} from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { CornerBracket, GlitchText, HexagonIcon } from '@/src/components/modules/today-task/GamifiedEffects';

// ===== Schema =====
const extrasSchema = z.object({
  avatar: z.any().optional(),
  dateOfBirth: z.string().optional(),
  gender: z
    .enum(["MALE", "FEMALE", "OTHERS"])
    .optional(),
  weight: z.number().optional().or(z.string().optional()),
  height: z.number().optional().or(z.string().optional()),
  currentGoal: z.enum([
    "BUILD_MUSCLE",
    "LOSE_WEIGHT",
    "GAIN_STRENGTH",
    "IMPROVE_ENDURANCE",
    "GENERAL_FITNESS",
  ]),
});

export type ExtrasForm = z.infer<typeof extrasSchema>;

interface RegisterStepExtrasProps {
  onSubmit: (data: ExtrasForm) => void | Promise<void>;
  onSkip?: () => void;
  onBack?: () => void;
  loading?: boolean;
  errorMessage?: string | null;
}

export function RegisterStepExtras({
  onSubmit,
  onSkip,
  onBack,
  loading,
  errorMessage,
}: RegisterStepExtrasProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    setValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isDirty },
  } = useForm<ExtrasForm>({
    resolver: zodResolver(extrasSchema),
    defaultValues: {
      avatar: undefined,
      dateOfBirth: "",
      gender: undefined,
      weight: undefined,
      height: undefined,
      currentGoal: "GENERAL_FITNESS",
    },
  });

  // --- Watch form values using useWatch (React Compiler compatible) ---
  const avatar = useWatch({ control, name: "avatar" });
  const dateOfBirth = useWatch({ control, name: "dateOfBirth" });
  const gender = useWatch({ control, name: "gender" });
  const weight = useWatch({ control, name: "weight" });
  const height = useWatch({ control, name: "height" });
  const currentGoal = useWatch({ control, name: "currentGoal" });

  // --- hasAnyData ---
  const hasAnyData =
    !!avatar || !!dateOfBirth || !!gender || weight !== undefined || height !== undefined;

  // Calculate completion percentage for the status bar (6 fields)
  const filledFields = [
    avatar,
    dateOfBirth,
    gender,
    weight,
    height,
    currentGoal,
  ].filter(val => val !== undefined && val !== null && val !== "").length;
  const completionPercent = Math.round((filledFields / 6) * 100);

  // static lists
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: "1", label: "Jan" },
    { value: "2", label: "Feb" },
    { value: "3", label: "Mar" },
    { value: "4", label: "Apr" },
    { value: "5", label: "May" },
    { value: "6", label: "Jun" },
    { value: "7", label: "Jul" },
    { value: "8", label: "Aug" },
    { value: "9", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file, { shouldDirty: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setValue("avatar", undefined, { shouldDirty: true });
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle date change
  const handleDateChange = (day: string, month: string, year: string) => {
    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);

    if (day && month && year) {
      const d = parseInt(day);
      const m = parseInt(month);
      const y = parseInt(year);

      // Validate date
      const date = new Date(y, m - 1, d);
      if (date.getDate() === d && date.getMonth() === m - 1 && date.getFullYear() === y) {
        // Format as YYYY-MM-DD for consistency
        const formattedDate = `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
        setValue("dateOfBirth", formattedDate, { shouldDirty: true });
      }
    } else {
      setValue("dateOfBirth", "", { shouldDirty: true });
    }
  };

  // Form submission - return raw form data, not FormData
  const handleFormSubmit = (data: ExtrasForm) => {
    
    const cleanedData: ExtrasForm = {
      currentGoal: data.currentGoal,
    };

    if (data.avatar && data.avatar instanceof File) {
      cleanedData.avatar = data.avatar;
    }
    if (data.dateOfBirth) {
      cleanedData.dateOfBirth = data.dateOfBirth;
    }
    if (data.gender) {
      cleanedData.gender = data.gender;
    }
    if (data.weight !== undefined && data.weight !== null && data.weight !== "") {
      cleanedData.weight = typeof data.weight === 'string' ? parseFloat(data.weight) : data.weight;
    }
    if (data.height !== undefined && data.height !== null && data.height !== "") {
      cleanedData.height = typeof data.height === 'string' ? parseFloat(data.height) : data.height;
    }
    onSubmit(cleanedData);
  };



  return (
    <form 
     onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-5"
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header Status Section */}
        <div className="relative p-4 rounded-lg border border-primary/30 bg-primary/5 overflow-hidden mb-5">
          <CornerBracket position="tl" color="primary" />
          <CornerBracket position="tr" color="primary" />
          <CornerBracket position="bl" color="primary" />
          <CornerBracket position="br" color="primary" />

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"
            animate={{ y: [0, 80, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <div className="flex items-center gap-3">
            <HexagonIcon icon={Activity} color="primary" size="sm" />
            <div>
              <h3 className="font-mono text-sm text-primary tracking-wider">
                <GlitchText>HUMAN CONDITION STATUS</GlitchText>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Optional data for performance optimization
              </p>
            </div>
          </div>

          {/* Completion Bar */}
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">DATA_SYNC</span>
              <span className="text-primary">{completionPercent}%</span>
            </div>
            <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden border border-primary/20">
              <motion.div
                className="h-full bg-linear-to-r from-primary via-primary to-primary/60"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence mode="wait">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="relative p-3 rounded-lg border border-destructive/50 bg-destructive/10 overflow-hidden mb-5"
            >
              <CornerBracket position="tl" color="destructive" />
              <CornerBracket position="br" color="destructive" />

              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
                <span className="text-sm font-mono text-destructive">{errorMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar Upload - Identity Module */}
        <div className="relative p-4 rounded-lg border border-border/50 bg-card/30 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground tracking-wider">
              IDENTITY_MODULE
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="relative group cursor-pointer"
              onClick={() => !loading && fileInputRef.current?.click()}
            >
              {/* Rotating ring */}
              <motion.div
                className="absolute -inset-3 border border-primary/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Glow ring */}
              <div className="absolute -inset-2 bg-linear-to-r from-primary/40 via-primary/20 to-primary/40 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />

              {/* Avatar */}
              <Avatar className="relative w-20 h-20 border-2 border-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.3)] ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                <AvatarImage src={avatarPreview || ""} />
                <AvatarFallback className="bg-primary/10 text-primary font-mono text-xl">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-primary" />
              </div>

              {/* Remove button */}
              {avatarPreview && (
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAvatar();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-destructive rounded-full flex items-center justify-center shadow-lg hover:bg-destructive/80 transition-colors border border-destructive/50"
                >
                  <X className="w-3 h-3 text-destructive-foreground" />
                </motion.button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={loading}
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="font-mono text-xs border-primary/30 hover:border-primary/50 hover:bg-primary/10"
            >
              <Upload className="w-3 h-3 mr-2" />
              UPLOAD_AVATAR
            </Button>
          </motion.div>
        </div>

        {/* Bio Data Stream Section */}
        <div className="relative p-4 rounded-lg border border-border/50 bg-card/30 space-y-4 mb-5">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs font-mono text-muted-foreground tracking-wider">
              BIO_DATA_STREAM
            </span>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xs font-mono text-muted-foreground tracking-wider">
              <CalendarIcon className="w-3.5 h-3.5 text-primary" />
              BIRTH_TIMESTAMP
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <Select
                value={selectedDay}
                onValueChange={(value) => handleDateChange(value, selectedMonth, selectedYear)}
                disabled={loading}
              >
                <SelectTrigger className="h-10 bg-muted/20 border-border/50 focus:ring-primary/30 font-mono text-sm">
                  <SelectValue placeholder="DD" />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {days.map((day) => (
                    <SelectItem key={day} value={day.toString()} className="font-mono">
                      {day.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedMonth}
                onValueChange={(value) => handleDateChange(selectedDay, value, selectedYear)}
                disabled={loading}
              >
                <SelectTrigger className="h-10 bg-muted/20 border-border/50 focus:ring-primary/30 font-mono text-sm">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value} className="font-mono">
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedYear}
                onValueChange={(value) => handleDateChange(selectedDay, selectedMonth, value)}
                disabled={loading}
              >
                <SelectTrigger className="h-10 bg-muted/20 border-border/50 focus:ring-primary/30 font-mono text-sm">
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="font-mono">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className="text-xs font-mono text-muted-foreground tracking-wider flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-primary" />
              GENDER_CLASS
            </Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select value={field.value || ""} onValueChange={field.onChange} disabled={loading}>
                  <SelectTrigger className="h-10 bg-muted/20 border-border/50 focus:ring-primary/30 font-mono">
                    <SelectValue placeholder="[ SELECT ]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE" className="font-mono">Male</SelectItem>
                    <SelectItem value="FEMALE" className="font-mono">Female</SelectItem>
                    <SelectItem value="OTHERS" className="font-mono">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Weight & Height */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs font-mono text-muted-foreground tracking-wider">
                <Weight className="w-3.5 h-3.5 text-primary" />
                MASS_KG
              </Label>
              <div className="relative">
                <Controller
                  name="weight"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="500"
                      placeholder="00.0"
                      value={field.value || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val ? parseFloat(val) : undefined);
                      }}
                      disabled={loading}
                      className="h-10 bg-muted/20 border-border/50 focus:ring-primary/30 font-mono pr-10"
                    />
                  )}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">kg</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs font-mono text-muted-foreground tracking-wider">
                <Ruler className="w-3.5 h-3.5 text-primary" />
                HEIGHT_CM
              </Label>
              <div className="relative">
                <Controller
                  name="height"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="300"
                      placeholder="000"
                      value={field.value || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val ? parseFloat(val) : undefined);
                      }}
                      disabled={loading}
                      className="h-10 bg-muted/20 border-border/50 focus:ring-primary/30 font-mono pr-10"
                    />
                  )}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">cm</span>
              </div>
            </div>
          </div>

          {/* Current Goal */}
          <div className="space-y-2 pt-2">
            <Label className="text-xs font-mono text-muted-foreground tracking-wider flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-primary" />
              CURRENT_GOAL
            </Label>
            <Controller
              name="currentGoal"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={loading}>
                  <SelectTrigger className="h-10 bg-muted/20 border-border/50 focus:ring-primary/30 font-mono">
                    <SelectValue placeholder="[ SELECT GOAL ]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUILD_MUSCLE" className="font-mono">Build Muscle</SelectItem>
                    <SelectItem value="LOSE_WEIGHT" className="font-mono">Lose Weight</SelectItem>
                    <SelectItem value="GAIN_STRENGTH" className="font-mono">Gain Strength</SelectItem>
                    <SelectItem value="IMPROVE_ENDURANCE" className="font-mono">Improve Endurance</SelectItem>
                    <SelectItem value="GENERAL_FITNESS" className="font-mono">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Data Sync Notice */}
        <AnimatePresence>
          {hasAnyData && isDirty && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="relative p-3 rounded-lg border border-primary/30 bg-primary/5 overflow-hidden mb-5"
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="flex items-center gap-2 pl-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-xs font-mono text-primary">DATA_SYNC_PENDING • Update anytime in settings</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={loading}
            className="flex-1 h-11 border-border/50 hover:bg-muted/50 hover:border-primary/50 transition-all group font-mono"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs">BACK</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onSkip}
            disabled={loading}
            className="flex-1 h-11 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all group font-mono"
          >
            <span className="text-xs">SKIP</span>
            <SkipForward className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="relative flex-1 h-11 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-[0_0_15px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] transition-all overflow-hidden group font-mono"
          >
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-primary-foreground/10 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />

            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-xs">COMPLETE</span>
              </>
            )}
          </Button>
        </div>

        {/* Footer Status */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/50 font-mono pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary/50"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span>SYSTEM_READY</span>
          <span className="text-primary/50">•</span>
          <span>OPTIONAL_DATA</span>
        </div>
      </motion.div>
    </form>
  );
}