"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { loginSchema, LoginFormValues } from "@/src/schemas/auth.schema";
import { FormInput } from "@/src/components/ui/FormInput";
import { FormButton } from "@/src/components/ui/FormButton";
import { loginUser } from "@/src/services/auth/session.service";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    startTransition(async () => {
      setServerError(null);
      const result = await loginUser(formData);

      if (!result.success) {
        const message = result.message || "Login failed. Please try again.";
        setServerError(message);
        toast.error(message);
        return;
      }

      toast.success(result.message || "Login successful!");
      router.push("/user/dashboard");
    });
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-white">Welcome back</h1>
        <p className="text-gray-400">Enter your credentials to access your dashboard.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          name="email"
          label="Email address"
          control={control}
          placeholder="you@example.com"
          type="email"
          required
        />

        <div className="relative">
          <FormInput
            name="password"
            label="Password"
            control={control}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[35px] text-gray-400 hover:text-gray-200 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {serverError && (
          <p className="text-sm text-red-400 text-center">{serverError}</p>
        )}

        <FormButton type="submit" loading={isPending} className="w-full">
          Sign in
        </FormButton>
      </form>

      <p className="text-sm text-center text-gray-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary font-medium hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}




