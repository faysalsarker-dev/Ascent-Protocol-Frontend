
import  AnimatedOrbs  from '@/src/components/ui/Animated-Orbs';
import { FloatingParticles ,GoldenCard } from "@/src/app/(commonLayout)/_components";

const GoldenChanceSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Animated Glow Orbs */}
 <AnimatedOrbs/>

 <FloatingParticles/>

      <div className="container mx-auto px-4 relative z-10">
      <GoldenCard/>
      </div>
    </section>
  );
};

export default GoldenChanceSection;