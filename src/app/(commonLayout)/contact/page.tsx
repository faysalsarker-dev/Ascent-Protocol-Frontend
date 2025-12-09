
import Navbar from "@/src/components/shared/Navbar";
import Footer from "@/src/components/shared/Footer";
import { SectionHeader ,ContactForm } from "../_components";

const ContactPage = () => {


  return (
    <>
<Navbar/>

    <main className="min-h-screen bg-background overflow-x-hidden">
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
   

        <div className="container mx-auto px-4 relative z-10">

      <SectionHeader
          badgeIcon="sparkles"
          badgeText="Get In Touch"
          description={
            <>
              Have questions? We&apos;d love to hear from you.
            </>
          }
        >
        CONTACT <span className="text-primary text-glow-primary">US</span>
        </SectionHeader>
<ContactForm/>

         

        
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
};

export default ContactPage;