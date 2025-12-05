import  RegisterStepper  from "@/src/components/modules/auth/RegisterStepper";


const RegisterPage = () => {
  return (
    <div className=" bg-background min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-2">

      {/* <div className="absolute inset-0 bg-linear-to-b from-black via-[#0a0a0f] to-black" /> */}
      

         <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-[#6726E3]/30 blur-[90px]" />

  
        <RegisterStepper />
          <div className="absolute inset-0 bg-linear-to-t from-[#5A1BCF] via-transparent to-transparent opacity-90 -z-10" />

    </div>
  );
};

export default RegisterPage;
