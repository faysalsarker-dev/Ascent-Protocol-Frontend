"use client";

import { Button } from '@/src/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, Crown, Shield, Rocket, Gift, Clock, Sparkles, Star } from "lucide-react";
import Link from 'next/link';

const features = [
  { icon: Zap, text: "AI Personal Coach" },
  { icon: Rocket, text: "Solo Leveling System" },
  { icon: Shield, text: "Unlimited Missions" },
  { icon: Star, text: "All Achievements" },
];

const info = [
  { icon: Clock, text: "Limited time offer" },
  { icon: Shield, text: "No credit card required" },
  { icon: Zap, text: "Instant access" },
];

const GoldenCard = () => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6 md:p-12 rounded-2xl bg-linear-to-r from-background via-muted to-background shadow-lg relative border-2 border-warning/50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success font-semibold text-sm border border-warning/40">
          <Crown className="h-5 w-5 text-success" />
          GOLDEN OPPORTUNITY
          <Crown className="h-5 w-5 text-success" />
        </div>
      </div>

      {/* Main Title */}
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-4 text-primary">
        Access <span className="text-success">Everything</span> for <span className="text-success">Free</span>
      </h2>

      {/* Description */}
      <p className="text-center text-muted-foreground mb-6 max-w-xl mx-auto">
        For a <span className="font-semibold text-success">limited time</span>, get full access to all features. No hidden fees, no credit card required.
      </p>

      {/* Features */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {features.map((item) => (
          <div key={item.text} className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 border border-warning/30">
            <item.icon className="h-5 w-5 text-success" />
            <span className="text-sm text-primary">{item.text}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex flex-col items-center gap-4 mb-4">
        <Link href="/register">
          <Button size="lg" className="px-10 flex items-center gap-2 border border-warning/40 text-primary hover:bg-success/10">
            <Gift className="h-5 w-5 text-success" /> Claim Free Access <Sparkles className="h-4 w-4 text-success" />
          </Button>
        </Link>
      </div>

      {/* Info */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        {info.map((item) => (
          <div key={item.text} className="flex items-center gap-1">
            <item.icon className="h-4 w-4 text-success" />
            <span className="text-primary">{item.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default GoldenCard;
