import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/src/components/modules/auth/LoginForm";
import { Card } from "@/src/components/ui/card";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
     

      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </Link>

      <div className="relative z-10 w-full px-4">
        <div className="mx-auto max-w-lg">
          <Card className="bg-gray-900/80 border border-purple-500/20 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
            <LoginForm />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

