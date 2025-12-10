import Navbar from "@/src/components/shared/Navbar";
import Footer from "@/src/components/shared/Footer";
import { getUser } from "@/src/utils/getUser";

export default async function commonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const user = await getUser();


  return (

  
   <>
         <Navbar user={user} />

   
    <main className="mt-14">

     {children}

  </main>

 
      
    <Footer />
  </>
  );
}
