"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { extrasSchema, ExtrasForm } from "@/src/schemas/register.schema";
import { AvatarUploader } from "@/src/components/ui/AvatarUploader";
import { FormButton } from "@/src/components/ui/FormButton";
import { motion } from "framer-motion";
import { CalendarIcon, User, Weight, Ruler } from "lucide-react";
import { useMemo } from "react";

interface RegisterStepExtrasProps {
  onSubmit: (data: ExtrasForm) => void | Promise<void>;
  onSkip: () => void;
  onBack: () => void;
  loading: boolean;
  errorMessage?: string | null;
}

export function RegisterStepExtras({
  onSubmit,
  onSkip,
  onBack,
  loading,
  errorMessage,
}: RegisterStepExtrasProps) {
  const { 
    control, 
    handleSubmit, 
    watch, 
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

  // Check if user has entered any data
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

  // Generate years array (from 1920 to current year)
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i);
  }, []);

  // Days array
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

  // Months array
  const months = useMemo(() => [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ], []);

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Avatar */}
      <div>
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <AvatarUploader 
              value={field.value} 
              onChange={field.onChange}
            />
          )}
        />
        {errors.avatar && (
          <p className="text-xs text-red-400 mt-2">{errors.avatar.message as string}</p>
        )}
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
          <User className="w-4 h-4" />
          Bio
        </label>
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              value={field.value || ''}
              placeholder="Talk about yourself like you're the next ranker..."
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent min-h-[100px] resize-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              maxLength={300}
              disabled={loading}
            />
          )}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">{bioLength} / 300 characters</p>
          {bioLength > 250 && (
            <p className="text-xs text-yellow-400">
              {300 - bioLength} characters remaining
            </p>
          )}
        </div>
        {errors.bio && (
          <p className="text-xs text-red-400">{errors.bio.message}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          Date of Birth
        </label>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => {
            const currentDate = field.value ? new Date(field.value) : null;
            const currentDay = currentDate?.getDate() || '';
            const currentMonth = currentDate ? currentDate.getMonth() + 1 : '';
            const currentYear = currentDate?.getFullYear() || '';

            const handleDateChange = (day: string, month: string, year: string) => {
              const d = parseInt(day);
              const m = parseInt(month);
              const y = parseInt(year);
              
              if (d && m && y) {
                // Validate the date
                const date = new Date(y, m - 1, d);
                // Check if the date is valid (handles invalid dates like Feb 30)
                if (date.getDate() === d && date.getMonth() === m - 1) {
                  field.onChange(date.toISOString());
                }
              } else if (!d && !m && !y) {
                // Clear the date if all fields are empty
                field.onChange('');
              }
            };

            return (
              <div className="grid grid-cols-3 gap-3">
                {/* Day */}
                <select
                  value={currentDay}
                  onChange={(e) => {
                    handleDateChange(e.target.value, currentMonth.toString(), currentYear.toString());
                  }}
                  disabled={loading}
                  className="px-3 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Day"
                >
                  <option value="">Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>

                {/* Month */}
                <select
                  value={currentMonth}
                  onChange={(e) => {
                    handleDateChange(currentDay.toString(), e.target.value, currentYear.toString());
                  }}
                  disabled={loading}
                  className="px-3 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Month"
                >
                  <option value="">Month</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>

                {/* Year */}
                <select
                  value={currentYear}
                  onChange={(e) => {
                    handleDateChange(currentDay.toString(), currentMonth.toString(), e.target.value);
                  }}
                  disabled={loading}
                  className="px-3 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Year"
                >
                  <option value="">Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            );
          }}
        />
        {errors.dateOfBirth && (
          <p className="text-xs text-red-400">{errors.dateOfBirth.message as string}</p>
        )}
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-200">Gender</label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={field.value || ''}
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Gender"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          )}
        />
        {errors.gender && (
          <p className="text-xs text-red-400">{errors.gender.message}</p>
        )}
      </div>

      {/* Weight & Height */}
      <div className="grid grid-cols-2 gap-4">
        {/* Weight */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
            <Weight className="w-4 h-4" />
            Weight (kg)
          </label>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                step="0.1"
                min="0"
                max="500"
                placeholder="70"
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Weight in kilograms"
              />
            )}
          />
          {errors.weight && (
            <p className="text-xs text-red-400">{errors.weight.message}</p>
          )}
        </div>

        {/* Height */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
            <Ruler className="w-4 h-4" />
            Height (cm)
          </label>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                step="0.1"
                min="0"
                max="300"
                placeholder="175"
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Height in centimeters"
              />
            )}
          />
          {errors.height && (
            <p className="text-xs text-red-400">{errors.height.message}</p>
          )}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg"
        >
          <p className="text-sm text-red-400 text-center">{errorMessage}</p>
        </motion.div>
      )}

      {/* Info Message */}
      {hasAnyData && isDirty && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-blue-500/10 border border-blue-500/50 rounded-lg"
        >
          <p className="text-xs text-blue-400 text-center">
            Your profile information will be saved. You can always update it later in settings.
          </p>
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <FormButton 
          type="button" 
          variant="outline" 
          onClick={onBack} 
          className="flex-1" 
          disabled={loading}
        >
          Back
        </FormButton>
        <FormButton 
          type="button" 
          variant="secondary" 
          onClick={onSkip} 
          className="flex-1" 
          disabled={loading}
        >
          {hasAnyData ? 'Skip & Continue' : 'Skip'}
        </FormButton>
        <FormButton 
          type="submit" 
          loading={loading} 
          className="flex-1"
          disabled={loading}
        >
          {loading ? 'Saving...' : hasAnyData ? 'Complete Setup' : 'Continue'}
        </FormButton>
      </div>
    </motion.form>
  );
}