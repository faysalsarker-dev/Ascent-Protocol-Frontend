
"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
    }, 30);

    return () => clearInterval(timer);
  }, [message]);

  return (
    <motion.div
      className="system-message holo-effect"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-2">
        {/* Pulsing Indicator */}
        <motion.div
          className="w-2 h-2 rounded-full bg-primary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Message Text */}
        <span className="flex-1">
          {displayText}
          {!isComplete && (
            <motion.span
              className="inline-block w-2 h-4 bg-primary ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </span>
      </div>

      {/* Scan Line Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--primary) / 0.05) 50%, transparent 100%)',
          height: '2px',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
};
