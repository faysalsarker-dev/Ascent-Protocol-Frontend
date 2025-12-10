import DecorativeElements from "@/src/components/ui/Decorative-Elements";
import { SectionHeader } from "@/src/app/(commonLayout)/_components";
import {HowItWorkCard} from "@/src/app/(commonLayout)/_components";
import { DeskTopLine } from "@/src/app/(commonLayout)/_components/HowItWork/HowItWorkCard";


export type HowItWorkItem = {
  step: string;
  title: string;
  description: string;
  color: string;
  icon: string; 
};

const steps: HowItWorkItem[] = [
  {
    step: "01",
    icon: "UserPlus",
    title: "Create Your Hunter Profile",
    description:
      "Sign up and set your fitness goals. Your AI coach analyzes your current level and creates a personalized path.",
    color: "from-primary/20 to-primary/5",
  },
  {
    step: "02",
    icon: "Dumbbell",
    title: "Accept Daily Missions",
    description:
      "Receive tailored quests based on your stats. Complete workouts, challenges, and special events for XP.",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    step: "03",
    icon: "TrendingUp",
    title: "Track & Level Up",
    description:
      "Watch your stats grow in real-time. Unlock new abilities, ranks, and achievements as you progress.",
    color: "from-success/20 to-success/5",
  },
  {
    step: "04",
    icon: "Crown",
    title: "Become S-Rank",
    description:
      "Reach the pinnacle of fitness. Join the elite hunters and inspire others on their journey.",
    color: "from-accent/20 to-accent/5",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-28 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-card/50 to-background" />

      {/* Decorative Elements */}
      <DecorativeElements />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badgeIcon="settings"
          iconClassName="text-secondary"
          badgeText="Your Path"
          description={
            <>Four steps to transform from a beginner to an S-Rank hunter.</>
          }
        >
          HOW THE{" "}
          <span className="text-secondary text-glow-secondary">SYSTEM</span>{" "}
          WORKS
        </SectionHeader>

        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2">
            <DeskTopLine />
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <HowItWorkCard key={index} item={item} index={index} totalSteps={4} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
