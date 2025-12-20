import { motion } from "framer-motion";

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1.5 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          className="w-2 h-2 rounded-full bg-muted-foreground/60"
        />
      ))}
    </div>
  );
};

export default TypingIndicator;
