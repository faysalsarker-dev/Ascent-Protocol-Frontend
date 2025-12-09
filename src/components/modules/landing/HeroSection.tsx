import { HeroAnimations } from "@/src/app/(commonLayout)/_components";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-muted/20" />

      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <HeroAnimations />
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
