"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { extrasSchema, ExtrasForm } from "@/src/schemas/register.schema";

import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { AvatarUploader } from "@/src/components/ui/AvatarUploader";
import { FormButton } from "@/src/components/ui/FormButton";

import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { Calendar } from "@/src/components/ui/calendar";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";

import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface RegisterStepExtrasProps {
  onSubmit: (data: ExtrasForm) => void;
  onSkip: () => void;
  onBack: () => void;
  loading: boolean;
}

// export function RegisterStepExtras({
//   onSubmit,
//   onSkip,
//   onBack,
//   loading,
// }: RegisterStepExtrasProps) {
//   const { control, handleSubmit, setValue, watch } = useForm<ExtrasForm>({
//     resolver: zodResolver(extrasSchema),
//     defaultValues: {
//       avatar: null,
//       bio: "",
//       dateOfBirth: "",
//       gender: undefined,
//       weight: undefined,
//       height: undefined,
//     },
//   });

//   const dateValue = watch("dateOfBirth");

//   return (
//     <motion.form
//       onSubmit={handleSubmit(onSubmit)}
//       initial={{ opacity: 0, x: 40 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.25 }}
//       className="space-y-6"
//     >
//       <div className="space-y-6">
//         {/* Avatar */}
//         <Controller
//           name="avatar"
//           control={control}
//           render={({ field }) => (
//             <AvatarUploader value={field.value} onChange={field.onChange} />
//           )}
//         />

//         {/* Bio */}
//         <div className="space-y-2">
//           <Label className="text-foreground font-semibold">Bio</Label>
//           <Controller
//             name="bio"
//             control={control}
//             render={({ field }) => (
//               <Textarea
//                 {...field}
//                 placeholder="Talk about yourself like you're the next ranker..."
//                 className="bg-input/50 border-border/40 focus:border-primary focus:ring-primary/20 min-h-[110px]"
//                 maxLength={300}
//               />
//             )}
//           />
//           <p className="text-xs text-muted-foreground text-right">
//             {watch("bio")?.length || 0} / 300
//           </p>
//         </div>

//         {/* Date Picker */}
//         <div className="space-y-2">
//           <Label className="text-foreground font-semibold">Date of Birth</Label>

//           <Controller
//             name="dateOfBirth"
//             control={control}
//             render={({ field }) => {
//               return (
//                 <div className="flex flex-col gap-2">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <button
//                         type="button"
//                         className={cn(
//                           "flex w-full items-center justify-between rounded-lg border border-border/50 bg-input/50 px-3 py-2 text-left text-sm",
//                           "focus:outline-none focus:ring-2 focus:ring-primary/20"
//                         )}
//                       >
//                         {field.value ? (
//                           format(new Date(field.value), "PPP")
//                         ) : (
//                           <span className="text-muted-foreground">Pick a date</span>
//                         )}
//                         <CalendarIcon className="w-4 h-4 opacity-70" />
//                       </button>
//                     </PopoverTrigger>

//                     <PopoverContent className="p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={field.value ? new Date(field.value) : undefined}
//                         onSelect={(date) => {
//                           if (date) field.onChange(date.toISOString());
//                         }}
//                       />
//                     </PopoverContent>
//                   </Popover>

//                   {/* Manual Input Fallback */}
//                   <Input
//                     placeholder="YYYY-MM-DD"
//                     className="bg-input/50 border-border/40"
//                     value={dateValue}
//                     onChange={(e) => field.onChange(e.target.value)}
//                   />
//                 </div>
//               );
//             }}
//           />
//         </div>

//         {/* Gender */}
//         <div className="space-y-2">
//           <Label className="text-foreground font-semibold">Gender</Label>
//           <Controller
//             name="gender"
//             control={control}
//             render={({ field }) => (
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <SelectTrigger className="bg-input/50 border-border/40">
//                   <SelectValue placeholder="Select gender" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="male">Male</SelectItem>
//                   <SelectItem value="female">Female</SelectItem>
//                   <SelectItem value="other">Other</SelectItem>
//                   <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />
//         </div>

//         {/* Weight & Height */}
//         <div className="grid grid-cols-2 gap-4">
//           {/* Weight */}
//           <Controller
//             name="weight"
//             control={control}
//             render={({ field }) => (
//               <div className="space-y-2">
//                 <Label className="font-semibold">Weight (kg)</Label>
//                 <Input
//                   {...field}
//                   type="number"
//                   step="0.1"
//                   placeholder="70"
//                   className="bg-input/50 border-border/40"
//                   onChange={(e) =>
//                     field.onChange(
//                       e.target.value ? parseFloat(e.target.value) : undefined
//                     )
//                   }
//                 />
//               </div>
//             )}
//           />

//           {/* Height */}
//           <Controller
//             name="height"
//             control={control}
//             render={({ field }) => (
//               <div className="space-y-2">
//                 <Label className="font-semibold">Height (cm)</Label>
//                 <Input
//                   {...field}
//                   type="number"
//                   step="0.1"
//                   placeholder="175"
//                   className="bg-input/50 border-border/40"
//                   onChange={(e) =>
//                     field.onChange(
//                       e.target.value ? parseFloat(e.target.value) : undefined
//                     )
//                   }
//                 />
//               </div>
//             )}
//           />
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-3 pt-2">
//         <FormButton
//           type="button"
//           variant="outline"
//           onClick={onBack}
//           className="flex-1"
//         >
//           Back
//         </FormButton>

//         <FormButton
//           type="button"
//           variant="secondary"
//           onClick={onSkip}
//           className="flex-1"
//         >
//           Skip
//         </FormButton>

//         <FormButton type="submit" loading={loading} className="flex-1">
//           Complete
//         </FormButton>
//       </div>
//     </motion.form>
//   );
// }

export function RegisterStepExtras({
  onSubmit,
  onSkip,
  onBack,
  loading,
}: {
  onSubmit: (data: ExtrasForm) => void;
  onSkip: () => void;
  onBack: () => void;
  loading: boolean;
}) {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<ExtrasForm>({
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

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Avatar */}
      <Controller
        name="avatar"
        control={control}
        render={({ field }) => (
          <AvatarUploader value={field.value} onChange={field.onChange} />
        )}
      />

      {/* Bio */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-200">Bio</label>
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Talk about yourself like you're the next ranker..."
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[100px] resize-none"
              maxLength={300}
            />
          )}
        />
        <p className="text-xs text-gray-400 text-right">{bioLength} / 300</p>
      </div>

      {/* Date of Birth - Custom Dropdown Picker */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
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

            const handleDateChange = (day: number, month: number, year: number) => {
              if (day && month && year) {
                const date = new Date(year, month - 1, day);
                field.onChange(date.toISOString());
              }
            };

            const days = Array.from({ length: 31 }, (_, i) => i + 1);
            const months = [
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
            ];
            
            // Generate years from 1920 to current year
            const currentYearNum = new Date().getFullYear();
            const years = Array.from({ length: currentYearNum - 1919 }, (_, i) => currentYearNum - i);

            return (
              <div className="grid grid-cols-3 gap-3">
                {/* Day */}
                <select
                  value={currentDay}
                  onChange={(e) => {
                    const day = parseInt(e.target.value);
                    if (currentMonth && currentYear) {
                      handleDateChange(day, currentMonth as number, currentYear as number);
                    }
                  }}
                  className="px-3 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
                    const month = parseInt(e.target.value);
                    if (currentDay && currentYear) {
                      handleDateChange(currentDay as number, month, currentYear as number);
                    }
                  }}
                  className="px-3 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
                    const year = parseInt(e.target.value);
                    if (currentDay && currentMonth) {
                      handleDateChange(currentDay as number, currentMonth as number, year);
                    }
                  }}
                  className="px-3 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          )}
        />
      </div>

      {/* Weight & Height */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-200">Weight (kg)</label>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                step="0.1"
                placeholder="70"
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-200">Height (cm)</label>
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                step="0.1"
                placeholder="175"
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            )}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <FormButton type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </FormButton>
        <FormButton type="button" variant="secondary" onClick={onSkip} className="flex-1">
          Skip
        </FormButton>
        <FormButton type="submit" loading={loading} className="flex-1">
          Complete
        </FormButton>
      </div>
    </motion.form>
  );
}
