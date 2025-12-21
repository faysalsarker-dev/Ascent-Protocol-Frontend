
import DemoCredentialsBar from "@/src/components/modules/auth/DemoCredentialsBar";
import  LoginForm  from "@/src/components/modules/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen  relative overflow-hidden ">
     

   <DemoCredentialsBar />
      <div className="relative z-10 w-full md:px-4">
        <div className="mx-auto max-w-lg">
          
            <LoginForm />
         
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

