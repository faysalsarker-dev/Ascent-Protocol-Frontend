import Navbar from "@/src/components/shared/Navbar";
import Footer from "@/src/components/shared/Footer";

export default function commonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

  
   <>
         <Navbar />

   
    <main className="mt-14">

     {children}

  </main>

 
      
    <Footer />
  </>
  );
}
