"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchemaBasic, RegisterBasicForm } from '@/src/schemas/register.schema';

// import { PasswordStrength } from '@/components/ui/PasswordStrength';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { FormInput } from '@/src/components/ui/FormInput';
import { FormButton } from '@/src/components/ui/FormButton';
import { motion } from 'framer-motion';

interface RegisterStepBasicProps {
  onNext: (data: RegisterBasicForm) => void;
  defaultValues?: Partial<RegisterBasicForm>;
}

// export function RegisterStepBasic({ onNext, defaultValues }: RegisterStepBasicProps) {
//   const [showPassword, setShowPassword] = useState(false);

//   const { control, handleSubmit, watch, formState: { isSubmitting } } = useForm<RegisterBasicForm>({
//     resolver: zodResolver(registerSchemaBasic),
//     defaultValues: defaultValues || {
//       name: '',
//       email: '',
//       password: '',
//     },
//   });

//   const password = watch('password');

//   return (
//     <form onSubmit={handleSubmit(onNext)} className="space-y-5 animate-slide-in-right">
//       <div className="space-y-4">
//         <FormInput
//           name="name"
//           label="Full Name"
//           control={control}
//           placeholder="Enter your name"
//           required
//         />

//         <FormInput
//           name="email"
//           label="Email"
//           control={control}
//           type="email"
//           placeholder="your@email.com"
//           required
//         />

//         <div className="space-y-2">
//           <div className="relative">
//             <FormInput
//               name="password"
//               label="Password"
//               control={control}
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Create a strong password"
//               required
//             />
//             <Button
//               type="button"
//               variant="ghost"
//               size="sm"
//               className="absolute right-2 top-[38px] h-8 w-8 p-0 hover:bg-muted"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <EyeOff className="h-4 w-4 text-muted-foreground" />
//               ) : (
//                 <Eye className="h-4 w-4 text-muted-foreground" />
//               )}
//             </Button>
//           </div>
          
//           {/* <PasswordStrength password={password || ''} /> */}
//         </div>

       
//       </div>

//       <FormButton type="submit" loading={isSubmitting} className="w-full">
//         Continue
//       </FormButton>
//     </form>
//   );
// }

export function RegisterStepBasic({ onNext, defaultValues }: { onNext: (data: RegisterBasicForm) => void; defaultValues?: Partial<RegisterBasicForm> }) {
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<RegisterBasicForm>({
    resolver: zodResolver(registerSchemaBasic),
    defaultValues: defaultValues || {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onSubmit={handleSubmit(onNext)}
      className="space-y-5"
    >
      <FormInput
        name="name"
        label="Full Name"
        control={control}
        placeholder="Enter your name"
        required
      />

      <FormInput
        name="email"
        label="Email"
        control={control}
        type="email"
        placeholder="your@email.com"
        required
      />

      <div className="relative">
        <FormInput
          name="password"
          label="Password"
          control={control}
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-300"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>



      <FormButton type="submit" loading={isSubmitting} className="w-full mt-6">
        Continue to Extras
      </FormButton>
    </motion.form>
  );
}
