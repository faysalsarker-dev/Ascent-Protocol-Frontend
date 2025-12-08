"use client";

import { motion } from "framer-motion";
import { iconMap } from "@/src/utils/iconMap";

interface SectionHeaderProps {
  badgeText?: string;
  badgeIcon?: string;                           // <-- string key from iconMap
  iconClassName?: string;                       // <-- override icon color/size
  children: React.ReactNode;                    // <-- headline text with span etc.
  description?: React.ReactNode;                // <-- p tag content
  className?: string;
}

export default function SectionHeader({
  badgeText,
  badgeIcon,
  iconClassName,
  children,
  description,
  className = "",
}: SectionHeaderProps) {
  
  const Icon = badgeIcon ? iconMap[badgeIcon.toLowerCase()] : null;

  return (
    <motion.div
      className={`text-center max-w-3xl mx-auto mb-20 space-y-6 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {badgeText && Icon && (
        <motion.div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
                     border border-primary/30 bg-primary/5 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          <Icon
            className={
              iconClassName || "h-4 w-4 text-primary"  // <-- default icon style
            }
          />
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">
            {badgeText}
          </span>
        </motion.div>
      )}

      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
        {children}
      </h2>

      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
