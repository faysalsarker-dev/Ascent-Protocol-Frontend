import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CalendarIcon, User, Weight, Ruler, Upload, X } from "lucide-react";
import { useMemo, useState, useRef } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";

// Schema
const extrasSchema = z.object({
  avatar: z.any().optional(),
  bio: z.string().max(300, "Bio must be less than 300 characters").optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]).optional(),
  weight: z.number().min(0).max(500).optional(),
  height: z.number().min(0).max(300).optional(),
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { 
    control, 
    handleSubmit, 
    watch,
    setValue,
    formState: { errors, isDirty } 
  } = useForm<ExtrasForm>({
    resolver: zodResolver(extrasSchema),
    defaultValues: {
      avatar: null,
      bio: "",
      dateOfBirth: "",
      gender: undefined,
      weight: undefined,
      height: undefined,
    },
  });

  const bioLength = watch("bio")?.length || 0;
  const formValues = watch();

  const hasAnyData = useMemo(() => {
    return !!(
      formValues.avatar ||
      (formValues.bio && formValues.bio.trim()) ||
      formValues.dateOfBirth ||
      formValues.gender ||
      formValues.weight ||
      formValues.height
    );
  }, [formValues]);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i);
  }, []);

  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

  const months = useMemo(() => [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ], []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setValue("avatar", null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Avatar Upload */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Avatar className="w-24 h-24 border-2 border-primary/30">
            <AvatarImage src={avatarPreview || ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-mono">
              ?
            </AvatarFallback>
          </Avatar>
          {avatarPreview && (
            <button
              type="button"
              onClick={removeAvatar}
              className="absolute -top-1 -right-1 w-6 h-6 bg-destructive rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3 text-destructive-foreground" />
            </button>
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
          className="font-mono text-xs"
        >
          <Upload className="w-3 h-3 mr-2" />
          UPLOAD AVATAR
        </Button>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Bio
        </Label>
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value || ""}
              placeholder="Describe yourself as a hunter..."
              disabled={loading}
              className="bg-background/50 border-border/50 focus:border-primary/50 min-h-[80px] resize-none"
              maxLength={300}
            />
          )}
        />
        <p className="text-xs text-muted-foreground text-right font-mono">
          {bioLength} / 300
        </p>
        {errors.bio && (
          <p className="text-xs text-destructive">{errors.bio.message}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          Date of Birth
        </Label>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => {
            const currentDate = field.value ? new Date(field.value) : null;
            const currentDay = currentDate?.getDate()?.toString() || "";
            const currentMonth = currentDate ? (currentDate.getMonth() + 1).toString() : "";
            const currentYear = currentDate?.getFullYear()?.toString() || "";

            const handleDateChange = (day: string, month: string, year: string) => {
              const d = parseInt(day);
              const m = parseInt(month);
              const y = parseInt(year);
              
              if (d && m && y) {
                const date = new Date(y, m - 1, d);
                if (date.getDate() === d && date.getMonth() === m - 1) {
                  field.onChange(date.toISOString());
                }
              } else if (!d && !m && !y) {
                field.onChange("");
              }
            };

            return (
              <div className="grid grid-cols-3 gap-2">
                <Select
                  value={currentDay}
                  onValueChange={(value) => handleDateChange(value, currentMonth, currentYear)}
                  disabled={loading}
                >
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={currentMonth}
                  onValueChange={(value) => handleDateChange(currentDay, value, currentYear)}
                  disabled={loading}
                >
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={currentYear}
                  onValueChange={(value) => handleDateChange(currentDay, currentMonth, value)}
                  disabled={loading}
                >
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }}
        />
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Gender</Label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value || ""}
              onValueChange={field.onChange}
              disabled={loading}
            >
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Weight & Height */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Weight className="w-4 h-4 text-primary" />
            Weight (kg)
          </Label>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                step="0.1"
                min="0"
                max="500"
                placeholder="70"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                disabled={loading}
                className="bg-background/50 border-border/50 focus:border-primary/50"
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Ruler className="w-4 h-4 text-primary" />
            Height (cm)
          </Label>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                step="0.1"
                min="0"
                max="300"
                placeholder="175"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                disabled={loading}
                className="bg-background/50 border-border/50 focus:border-primary/50"
              />
            )}
          />
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-destructive/10 border border-destructive/50 rounded-lg"
        >
          <p className="text-sm text-destructive text-center font-mono">{errorMessage}</p>
        </motion.div>
      )}

      {/* Info Message */}
      {hasAnyData && isDirty && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-system-info/10 border border-system-info/50 rounded-lg"
        >
          <p className="text-xs text-system-info text-center font-mono">
            Profile data will be saved. Update anytime in settings.
          </p>
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack} 
          disabled={loading}
          className="flex-1 font-mono text-xs"
        >
          ← BACK
        </Button>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onSkip} 
          disabled={loading}
          className="flex-1 font-mono text-xs"
        >
          SKIP
        </Button>
        <Button 
          type="submit" 
          disabled={loading}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs"
        >
          {loading ? "SAVING..." : "COMPLETE →"}
        </Button>
      </div>
    </motion.form>
  );
}
