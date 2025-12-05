import { motion } from "framer-motion";
import { User, Edit2, Shield, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatar: string | null;
  level: number;
  onEditName: () => void;
}

const getRank = (level: number) => {
  if (level >= 50) return { rank: "S", class: "rank-s", title: "National Level" };
  if (level >= 40) return { rank: "A", class: "rank-a", title: "S-Class Hunter" };
  if (level >= 30) return { rank: "B", class: "rank-b", title: "A-Class Hunter" };
  if (level >= 20) return { rank: "C", class: "rank-c", title: "B-Class Hunter" };
  return { rank: "E", class: "text-muted-foreground", title: "E-Class Hunter" };
};

 const ProfileHeader = ({ name, email, avatar, level, onEditName }: ProfileHeaderProps) => {
  const { rank, class: rankClass, title } = getRank(level);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative px-4 pt-2 pb-6"
    >
      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center relative z-10">
        {/* Avatar with animated border */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative"
        >
          {/* Rotating glow ring */}
          <div className="absolute inset-0 rounded-full level-badge-game scale-110 blur-sm opacity-60" />
          
          {/* Avatar container */}
          <div className="relative p-1 rounded-full bg-gradient-to-br from-primary via-secondary to-accent">
            <Avatar className="w-28 h-28 border-4 border-background">
              <AvatarImage src={avatar || undefined} alt={name} />
              <AvatarFallback className="bg-card text-primary text-3xl font-display">
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Level badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            className="absolute -bottom-2 -right-2 w-14 h-14 rounded-lg level-badge-game flex items-center justify-center"
          >
            <div className="absolute inset-1 bg-background rounded-md flex items-center justify-center">
              <span className="font-display font-black text-xl glow-text-primary">
                {level}
              </span>
            </div>
          </motion.div>

          {/* Rank badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="absolute -top-1 -left-1 w-10 h-10 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center"
          >
            <span className={`rank-badge ${rankClass}`}>{rank}</span>
          </motion.div>
        </motion.div>

        {/* Name and info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <div className="flex items-center gap-2 justify-center">
            <h1 className="text-2xl font-display font-bold text-foreground glow-text-primary">
              {name}
            </h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEditName}
              className="p-1.5 rounded bg-primary/10 border border-primary/40 hover:border-primary transition-all"
            >
              <Edit2 className="w-3.5 h-3.5 text-primary" />
            </motion.button>
          </div>
          
          <p className="text-muted-foreground font-mono text-sm mt-1">
            {email}
          </p>

          {/* Title/Class */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-3 flex items-center justify-center gap-2"
          >
            <Shield className={`w-4 h-4 ${rankClass}`} />
            <span className={`font-display text-sm tracking-wider ${rankClass}`}>
              {title}
            </span>
            <Sparkles className={`w-4 h-4 ${rankClass} animate-pulse`} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};


export default ProfileHeader;