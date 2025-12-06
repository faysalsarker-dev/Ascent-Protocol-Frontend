import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Terminal, Cpu } from 'lucide-react';
import { CornerBracket } from './GamifiedEffects';

interface SystemMessageProps {
  message: string;
}

export const SystemMessage = ({ message }: SystemMessageProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayText(message.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [message]);

  return (
    <motion.div
      className="relative p-4 rounded-sm bg-primary/5 border border-primary/30 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Corner brackets */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none"
        initial={{ top: "-32px" }}
        animate={{ top: "100%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Border glow animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-sm"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)`,
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 flex items-start gap-3">
        {/* Icon */}
        <motion.div
          className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0"
          animate={{
            boxShadow: ['0 0 0 0 hsl(var(--primary) / 0)', '0 0 12px 2px hsl(var(--primary) / 0.4)', '0 0 0 0 hsl(var(--primary) / 0)'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Cpu className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
        
        {/* Message */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-3 h-3 text-primary" />
            <span className="text-[10px] text-primary/70 font-mono uppercase tracking-[0.2em]">
              System Message
            </span>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <p className="text-sm text-foreground font-mono leading-relaxed">
            {displayText}
            {!isComplete && (
              <motion.span
                className="inline-block w-2 h-4 bg-primary ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </p>
        </div>
      </div>

      {/* Bottom status */}
      <motion.div
        className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-primary/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? 1 : 0.5 }}
      >
        <span className="text-[9px] font-mono text-primary/50 tracking-wider">
          ◆ TRANSMISSION {isComplete ? "COMPLETE" : "IN PROGRESS"} ◆
        </span>
      </motion.div>
    </motion.div>
  );
};
