import { AnimatedBackground, FloatingParticles, HeroContent, PlayerCard } from "@/src/app/(commonLayout)/_components";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background & Effects */}
      <AnimatedBackground />
      <FloatingParticles count={6} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <HeroContent />
          
          {/* Right Content - Player Card */}
          <PlayerCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
