"use client";

import { motion } from "framer-motion";
import { iconMap } from "@/src/utils/iconMap";
import { LucideIcon } from "lucide-react";

// ---------- Types ----------
export type FeatureColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "accent";

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;           
  color?: FeatureColor | string;

}

interface FeaturesCardProps {
  feature: FeatureItem;
  index: number;
}

// ---------- Color Logic ----------
const getColorClasses = (color: FeatureColor ) => {
  const colorMap: Record<
    FeatureColor,
    { icon: string; border: string; bg: string; glow: string }
  > = {
    primary: {
      icon: "text-primary",
      border: "border-primary/20 group-hover:border-primary/50",
      bg: "bg-primary/10 group-hover:bg-primary/20",
      glow: "group-hover:shadow-glow",
    },
    secondary: {
      icon: "text-secondary",
      border: "border-secondary/20 group-hover:border-secondary/50",
      bg: "bg-secondary/10 group-hover:bg-secondary/20",
      glow: "group-hover:shadow-glow-secondary",
    },
    success: {
      icon: "text-success",
      border: "border-success/20 group-hover:border-success/50",
      bg: "bg-success/10 group-hover:bg-success/20",
      glow: "group-hover:shadow-[0_0_25px_hsl(155_85%_45%/0.3)]",
    },
    warning: {
      icon: "text-warning",
      border: "border-warning/20 group-hover:border-warning/50",
      bg: "bg-warning/10 group-hover:bg-warning/20",
      glow: "group-hover:shadow-[0_0_25px_hsl(38_100%_55%/0.3)]",
    },
    accent: {
      icon: "text-accent",
      border: "border-accent/20 group-hover:border-accent/50",
      bg: "bg-accent/10 group-hover:bg-accent/20",
      glow: "group-hover:shadow-glow-accent",
    },
  };

  return colorMap[color] ?? colorMap.primary;
};

// ---------- Component ----------
export default function FeaturesCard({ feature, index }: FeaturesCardProps) {
  const colors = getColorClasses(feature.color);

  // Lookup icon from iconMap
  const Icon: LucideIcon | undefined = iconMap[feature.icon.toLowerCase()];

  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`group relative bg-card-gradient rounded-2xl p-6 border ${colors.border} ${colors.glow} transition-all duration-300`}
    >
      {/* Icon */}
      <motion.div
        className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-5 transition-all duration-300`}
        whileHover={{ rotate: 5, scale: 1.1 }}
      >
        {Icon ? (
          <Icon className={`h-7 w-7 ${colors.icon}`} />
        ) : (
          <div className="text-red-500 text-xs">No Icon</div>
        )}
      </motion.div>

      {/* Content */}
      <h3 className="font-display text-xl font-bold text-foreground mb-3">
        {feature.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm">
        {feature.description}
      </p>

      {/* Corner Accent */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 ${colors.bg} rounded-bl-3xl rounded-tr-2xl opacity-30 transition-opacity group-hover:opacity-60`}
      />

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className={`absolute inset-0 ${colors.bg} blur-xl rounded-2xl`} />
      </div>
    </motion.div>
  );
}
