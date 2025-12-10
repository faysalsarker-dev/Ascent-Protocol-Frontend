"use client";

import { motion } from "framer-motion";
import { iconMap } from "@/src/utils/iconMap";
import { ArrowRight } from "lucide-react";
import { HowItWorkItem } from "@/src/components/modules/landing/HowItWorksSection";



type Props = {
  item: HowItWorkItem;
  index: number;
  totalSteps: number; 
};


export const DeskTopLine = () => {
  return (
    <motion.div
      className="h-full bg-linear-to-r from-primary via-secondary to-accent"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 0.5 }}
      style={{ transformOrigin: "left" }}
    />
  );
};

const HowItWorkCard = ({ item, index, totalSteps }: Props) => {
  const Icon = iconMap[item.icon.toLowerCase()] ?? iconMap["sparkles"];

  return (
    <motion.div
      key={item.step}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative group"
    >
      {/* Card */}
      <motion.div
        className="bg-card border border-border/30 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 relative overflow-hidden h-full"
        whileHover={{ y: -8, boxShadow: "0 0 30px hsl(180 100% 45% / 0.2)" }}
      >
        {/* Background Gradient on Hover */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        {/* Step Number */}
        <motion.div
          className="absolute -top-2 -right-2 font-display text-7xl font-black text-primary/5 group-hover:text-primary/15 transition-colors"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {item.step}
        </motion.div>

        {/* Icon */}
        <motion.div
          className="relative w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all z-10"
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Icon className="h-8 w-8 text-primary" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="font-display text-lg font-bold text-foreground mb-3">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>

      {/* Arrow (Desktop Only) */}
      {index < totalSteps - 1 && (
        <motion.div
          className="hidden lg:flex absolute top-1/2 -right-4 w-8 h-8 -translate-y-1/2 z-20 items-center justify-center"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 + 0.5 }}
        >
          <div className="w-8 h-8 rounded-full bg-card border border-primary/50 flex items-center justify-center">
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HowItWorkCard;
