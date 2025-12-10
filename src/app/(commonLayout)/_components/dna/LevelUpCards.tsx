"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Dna, Zap, Flame, Shield, Crown, Sparkles } from "lucide-react";

export interface ProgressCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  stats: { label: string; value: string; color?: string }[];
  accentColor: string;
  primaryHex: string;
  secondaryHex: string;
  progress: number;
  rank: string;
}

export const progressCards: ProgressCard[] = [
  {
    id: 1,
    icon: <Dna className="w-7 h-7" />,
    title: "Genetic Override",
    subtitle: "Phase 1 — Awakening",
    description: "Your dormant potential awakens. DNA sequences are being rewritten to unlock superhuman capabilities.",
    stats: [
      { label: "Gene Activation", value: "78%", color: "text-cyan-400" },
      { label: "Cellular Regen", value: "ACTIVE", color: "text-emerald-400" },
    ],
    accentColor: "from-cyan-400 to-teal-400",
    primaryHex: "#22D3EE",
    secondaryHex: "#2DD4BF",
    progress: 78,
    rank: "E",
  },
  {
    id: 2,
    icon: <Zap className="w-7 h-7" />,
    title: "Neural Enhancement",
    subtitle: "Phase 2 — Evolution",
    description: "Mind-muscle synchronization complete. Your reflexes now exceed human limitations.",
    stats: [
      { label: "Synaptic Speed", value: "+340%", color: "text-purple-400" },
      { label: "Focus Protocol", value: "UNLOCKED", color: "text-violet-400" },
    ],
    accentColor: "from-purple-500 to-violet-500",
    primaryHex: "#A855F7",
    secondaryHex: "#8B5CF6",
    progress: 92,
    rank: "D",
  },
  {
    id: 3,
    icon: <Flame className="w-7 h-7" />,
    title: "Power Surge",
    subtitle: "Phase 3 — Transcendence",
    description: "Physical barriers shattered. Your strength output rivals legendary hunters.",
    stats: [
      { label: "Power Class", value: "S-RANK", color: "text-orange-400" },
      { label: "Limit Break", value: "READY", color: "text-amber-400" },
    ],
    accentColor: "from-orange-500 to-amber-500",
    primaryHex: "#F97316",
    secondaryHex: "#F59E0B",
    progress: 100,
    rank: "B",
  },
  {
    id: 4,
    icon: <Shield className="w-7 h-7" />,
    title: "Adaptive Defense",
    subtitle: "Phase 4 — Immortal Protocol",
    description: "Your body learns from every challenge. Recovery approaches instantaneous.",
    stats: [
      { label: "Recovery Rate", value: "∞", color: "text-emerald-400" },
      { label: "Damage Shield", value: "MAXIMUM", color: "text-green-400" },
    ],
    accentColor: "from-emerald-500 to-green-500",
    primaryHex: "#10B981",
    secondaryHex: "#22C55E",
    progress: 85,
    rank: "A",
  },
  {
    id: 5,
    icon: <Crown className="w-7 h-7" />,
    title: "Sovereign Awakening",
    subtitle: "Final Phase — Ascension",
    description: "You have transcended mortality. Welcome to the realm of the Monarchs.",
    stats: [
      { label: "Hunter Rank", value: "MONARCH", color: "text-amber-400" },
      { label: "Power Level", value: "LIMITLESS", color: "text-yellow-300" },
    ],
    accentColor: "from-amber-400 to-yellow-400",
    primaryHex: "#FBBF24",
    secondaryHex: "#FACC15",
    progress: 100,
    rank: "S",
  },
];

interface LevelUpCardsProps {
  onCardInView?: (cardIndex: number) => void;
}

const LevelUpCards = ({ onCardInView }: LevelUpCardsProps) => {
  return (
    <div className="relative flex flex-col items-center gap-[40vh] py-[15vh] max-w-7xl mx-auto px-4">
      {progressCards.map((card, index) => (
        <CardItem 
          key={card.id} 
          card={card} 
          index={index} 
          total={progressCards.length}
          onInView={() => onCardInView?.(index)}
        />
      ))}
    </div>
  );
};

interface CardItemProps {
  card: ProgressCard;
  index: number;
  total: number;
  onInView?: () => void;
}

const CardItem = ({ card, index, onInView }: CardItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.8], [isLeft ? -250 : 250, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.95, 1]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [isLeft ? -20 : 20, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x, scale, rotateY, perspective: 1200 }}
      onViewportEnter={() => onInView?.()}
      viewport={{ amount: 0.6 }}
      className={`w-full max-w-lg ${isLeft ? 'self-start' : 'self-end'}`}
    >
      <div className="relative">
        {/* Outer glow */}
        <motion.div 
          className={`absolute -inset-8 bg-linear-to-r ${card.accentColor} opacity-0 blur-3xl rounded-3xl`}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Card */}
        <motion.div
          whileHover={{ scale: 1.03, y: -10 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative overflow-hidden rounded-2xl border border-white/15 backdrop-blur-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)",
            boxShadow: `0 0 80px ${card.primaryHex}25, 0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`
          }}
        >
          {/* Animated border gradient */}
        
          
          {/* Content */}
          <div className="relative p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      `0 0 25px ${card.primaryHex}60`,
                      `0 0 50px ${card.primaryHex}90`,
                      `0 0 25px ${card.primaryHex}60`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`p-3.5 rounded-xl bg-linear-to-br ${card.accentColor} text-black`}
                >
                  {card.icon}
                </motion.div>
                
                <div>
                  <p 
                    className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1"
                    style={{ color: card.primaryHex }}
                  >
                    {card.subtitle}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {card.title}
                  </h3>
                </div>
              </div>
              
              {/* Rank badge */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-14 h-14 rounded-xl bg-linear-to-br ${card.accentColor} flex items-center justify-center`}
                style={{ boxShadow: `0 0 40px ${card.primaryHex}70` }}
              >
                <span className="text-2xl font-black text-black">{card.rank}</span>
              </motion.div>
            </div>
            
            {/* Description */}
            <p className="text-white/60 text-sm md:text-base mb-6 leading-relaxed">
              {card.description}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {card.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className={`text-lg font-bold font-mono ${stat.color || 'text-white'}`}>{stat.value}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/40 uppercase tracking-wider">Evolution Progress</span>
                <span 
                  className="font-mono font-bold"
                  style={{ color: card.primaryHex }}
                >
                  {card.progress}%
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${card.progress}%` }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                  className={`h-full rounded-full bg-linear-to-r ${card.accentColor} relative`}
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent"
                  />
                </motion.div>
              </div>
            </div>
            
            {/* Status */}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: card.primaryHex }}
                />
                <span 
                  className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: card.primaryHex }}
                >
                  System Active
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-white/30" />
            </div>
          </div>
          
          {/* Corner accents */}
          <div 
            className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 rounded-tr-xl"
            style={{ borderColor: `${card.primaryHex}50` }}
          />
          <div 
            className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 rounded-bl-xl"
            style={{ borderColor: `${card.secondaryHex}50` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LevelUpCards;
