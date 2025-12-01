import  RegisterStepper  from "@/src/components/modules/auth/RegisterStepper";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">

      {/* SOLO LEVELING BACK AURA */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />
      

      {/* Back Button */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </Link>

      <RegisterStepper />
    </div>
  );
};

export default RegisterPage;
