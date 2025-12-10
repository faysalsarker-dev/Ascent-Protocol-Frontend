"use client";

import { motion } from "framer-motion";
import { iconMap } from "@/src/utils/iconMap"; 
import { RankItem } from "@/src/components/modules/landing/RankSystemSection";

type RanksCardProps = {
  rank: RankItem;
  index: number;
};

const RanksCard = ({ rank, index }: RanksCardProps) => {
  // Convert icon string → actual component
  const Icon = iconMap[rank.icon.toLowerCase()] ?? iconMap["star"];

  return (
   <>
        <motion.div
          key={rank.rank}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="group relative"
        >
          {/* Glow for S Rank */}
          {rank.rank === "S" && (
            <motion.div
              className="absolute -inset-1 bg-linear-to-r from-accent via-secondary to-primary rounded-2xl blur-lg opacity-50"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}
    
          <div
            className={`relative bg-card-gradient rounded-2xl p-6 border ${rank.borderColor} overflow-hidden transition-all duration-300 h-full`}
          >
            {/* Background */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${rank.color} opacity-30 group-hover:opacity-60 transition-opacity`}
            />
    
            {/* Header */}
            <div className="relative flex items-center justify-between mb-6">
              <motion.div
                className={`w-16 h-16 rounded-xl bg-linear-to-br ${rank.color} ${rank.borderColor} border-2 flex items-center justify-center`}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <span className={`font-display text-3xl font-black ${rank.textColor}`}>
                  {rank.rank}
                </span>
              </motion.div>
    
              <div className="text-right">
                <div className={`font-display text-lg font-bold ${rank.textColor}`}>
                  {rank.name}
                </div>
                <div className="text-sm text-muted-foreground">Level {rank.level}</div>
              </div>
            </div>
    
            {/* Icon (dynamic via iconMap) */}
            <motion.div
              className={`absolute top-4 right-4 ${rank.textColor} opacity-20 group-hover:opacity-40 transition-opacity`}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Icon className="h-12 w-12" />
            </motion.div>
    
            {/* Description */}
            <p className="relative text-muted-foreground text-sm mb-6 leading-relaxed">
              {rank.description}
            </p>
    
            {/* Perks */}
            <div className="relative space-y-2">
              {rank.perks.map((perk, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${rank.textColor.replace(
                      "text-",
                      "bg-"
                    )}`}
                  />
                  <span className="text-foreground/80">{perk}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
   </>
  );
};

export default RanksCard;
