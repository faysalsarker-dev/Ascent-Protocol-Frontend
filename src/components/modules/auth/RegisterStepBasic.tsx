"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchemaBasic, RegisterBasicForm } from '@/src/schemas/register.schema';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FormInput } from '@/src/components/ui/FormInput';
import { FormButton } from '@/src/components/ui/FormButton';
import { motion } from 'framer-motion';

interface RegisterStepBasicProps {
  onNext: (data: RegisterBasicForm) => void | Promise<void>;
  defaultValues?: Partial<RegisterBasicForm>;
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
    formState: { isSubmitting } 
  } = useForm<RegisterBasicForm>({
    resolver: zodResolver(registerSchemaBasic),
    defaultValues: defaultValues || {
      name: '',
      email: '',
      password: '',
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
      <FormInput
        name="name"
        label="Full Name"
        control={control}
        placeholder="Enter your name"
        required
        disabled={isProcessing}
      />

      <FormInput
        name="email"
        label="Email"
        control={control}
        type="email"
        placeholder="your@email.com"
        required
        disabled={isProcessing}
      />

      <div className="relative">
        <FormInput
          name="password"
          label="Password"
          control={control}
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          required
          disabled={isProcessing}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={isProcessing}
          className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
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

      <FormButton 
        type="submit" 
        loading={isProcessing} 
        className="w-full mt-6"
        disabled={isProcessing}
      >
        {isProcessing ? 'Creating Account...' : 'Continue to Extras'}
      </FormButton>
    </motion.form>
  );
}