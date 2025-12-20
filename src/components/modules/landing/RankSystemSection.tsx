


import AnimatedOrbs from '@/src/components/ui/Animated-Orbs';
import { RanksCard, SectionHeader } from "@/src/app/(commonLayout)/_components";



export type RankItem = {
  rank: string;
  name: string;
  level: string;
  description: string;
  perks: string[];
  color: string; 
  borderColor: string; 
  textColor: string; 
  icon: string; 
};








const ranks:RankItem[] = [
  {
    rank: "E",
    name: "Novice",
    level: "1-10",
    color: "from-muted-foreground/30 to-muted-foreground/10",
    borderColor: "border-muted-foreground/30",
    textColor: "text-muted-foreground",
    icon: "shield",
    description: "Every hunter starts here. Learn the basics and build your foundation.",
    perks: ["Basic AI coaching", "Daily missions", "Progress tracking"],
  },
  {
    rank: "D",
    name: "Apprentice",
    level: "11-25",
    color: "from-success/30 to-success/10",
    borderColor: "border-success/30",
    textColor: "text-success",
    icon: "sword",
    description: "You're getting stronger. Unlock new workout types and challenges.",
    perks: ["Advanced workouts", "Weekly challenges", "Achievement badges"],
  },
  {
    rank: "C",
    name: "Warrior",
    level: "26-45",
    color: "from-primary/30 to-primary/10",
    borderColor: "border-primary/30",
    textColor: "text-primary",
    icon: "Flame",
    description: "A true warrior emerges. Access specialized training programs.",
    perks: ["Specialized programs", "Streak multipliers", "Community access"],
  },
  {
    rank: "B",
    name: "Elite",
    level: "46-65",
    color: "from-warning/30 to-warning/10",
    borderColor: "border-warning/30",
    textColor: "text-warning",
    icon: "Star",
    description: "Elite status achieved. Lead and inspire other hunters.",
    perks: ["Elite challenges", "Mentorship access", "Exclusive events"],
  },
  {
    rank: "A",
    name: "Champion",
    level: "66-85",
    color: "from-secondary/30 to-secondary/10",
    borderColor: "border-secondary/30",
    textColor: "text-secondary",
    icon: "Zap",
    description: "Among the strongest. Only the most dedicated reach this tier.",
    perks: ["Champion quests", "Priority support", "Beta features"],
  },
  {
    rank: "S",
    name: "Monarch",
    level: "86-99",
    color: "from-accent/40 to-accent/10",
    borderColor: "border-white/10",
    textColor: "text-white",
    icon: "Crown",
    description: "The pinnacle of power. You've achieved legendary status.",
    perks: ["Unlimited power", "Legendary rewards", "Eternal glory"],
  },
];

const RankSystemSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-warning/60 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1 left-1 w-96 h-96 bg-warning/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />


      <div className="absolute inset-0 bg-linear-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Animated Orbs */}
  <AnimatedOrbs/>

      <div className="max-w-6xl mx-auto px-4 relative z-10">

 <SectionHeader
          badgeIcon="crown"
          iconClassName="text-accent"
          badgeText="Ranking System"
          description={
            <>
                From E-Rank to S-Rank Monarch — every level unlocks new power
            </>
          }
        >
         CLIMB THE <span className="text-accent text-glow-accent">RANKS</span>
        </SectionHeader>




      

        {/* Ranks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ranks.map((rank:RankItem, index:number) => (
          <RanksCard key={index} rank={rank} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RankSystemSection;
