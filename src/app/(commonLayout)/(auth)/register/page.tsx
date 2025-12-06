import RegisterStepper from "@/src/components/modules/auth/RegisterStepper";

const RegisterPage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Subtle glow effect */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-primary/20 blur-[90px]" />
      
      {/* Content */}
      <RegisterStepper />
      
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent -z-10" />
    </div>
  );
};

export default RegisterPage;
