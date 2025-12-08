import { FeaturesCard, SectionHeader } from "@/src/app/(commonLayout)/_components";
import { FeatureItem } from "@/src/app/(commonLayout)/_components/FeaturesCard";

const features:FeatureItem[] = [
  {
    icon: "Brain",
    title: "AI Personal Coach",
    description:
      "Get personalized workout plans and real-time guidance from your intelligent AI coach that evolves with you.",
    color: "primary",
  },
  {
    icon: "Target",
    title: "Daily Missions",
    description:
      "Complete challenging daily quests designed to push your limits and earn massive XP rewards.",
    color: "secondary",
  },
  {
    icon: "TrendingUp",
    title: "Solo Leveling System",
    description:
      "Watch your stats grow as you level up. Unlock new ranks, skills, and titles on your ascent.",
    color: "success",
  },
  {
    icon: "MessageSquare",
    title: "AI Feedback",
    description:
      "Receive intelligent suggestions and form corrections to optimize every workout session.",
    color: "warning",
  },
  {
    icon: "Award",
    title: "Achievement System",
    description:
      "Unlock rare achievements and showcase your progress. Compete on global leaderboards.",
    color: "primary",
  },
  {
    icon: "Flame",
    title: "Streak Bonuses",
    description:
      "Maintain your daily streak for bonus XP multipliers and exclusive legendary rewards.",
    color: "accent",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-28 relative overflow-hidden  ">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badgeIcon="sparkles"
          badgeText="Power-Ups"
          description={
            <>
              Every feature designed to make you stronger. Level up with tools
              built for hunters who refuse to stay average.
            </>
          }
        >
          UNLOCK YOUR{" "}
          <span className="text-primary text-glow-primary">POTENTIAL</span>
        </SectionHeader>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeaturesCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
