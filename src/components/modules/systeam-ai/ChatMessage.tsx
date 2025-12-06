import { motion } from 'framer-motion';
import { Bot, User, Sparkles } from 'lucide-react';
import { CornerBracket, GlitchText } from '@/src/components/modules/today-task/GamifiedEffects';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  index: number;
}

export const ChatMessage = ({ role, content, timestamp, index }: ChatMessageProps) => {
  const isAssistant = role === 'assistant';

  return (
    <motion.div
      className={`flex gap-3 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      {/* Avatar */}
      <motion.div
        className={`relative w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          isAssistant 
            ? 'bg-primary/20 border border-primary/40' 
            : 'bg-accent/20 border border-accent/40'
        }`}
        animate={{
          boxShadow: isAssistant 
            ? ['0 0 10px hsl(var(--primary)/0.3)', '0 0 20px hsl(var(--primary)/0.5)', '0 0 10px hsl(var(--primary)/0.3)']
            : ['0 0 10px hsl(var(--accent)/0.3)', '0 0 20px hsl(var(--accent)/0.5)', '0 0 10px hsl(var(--accent)/0.3)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isAssistant ? (
          <Bot className="w-5 h-5 text-primary" />
        ) : (
          <User className="w-5 h-5 text-accent" />
        )}
        
        {isAssistant && (
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-3 h-3 text-primary" />
          </motion.div>
        )}
      </motion.div>

      {/* Message Bubble */}
      <div className={`relative max-w-[80%] ${isAssistant ? '' : 'text-right'}`}>
        <motion.div
          className={`relative p-4 rounded-xl border backdrop-blur-sm ${
            isAssistant
              ? 'bg-card/60 border-primary/30'
              : 'bg-accent/10 border-accent/30'
          }`}
          whileHover={{ scale: 1.01 }}
        >
          <CornerBracket position="tl" color={isAssistant ? 'primary' : 'accent'} />
          <CornerBracket position="br" color={isAssistant ? 'primary' : 'accent'} />

          {/* Scanline effect for assistant */}
          {isAssistant && (
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
              style={{
                background: 'linear-gradient(transparent 50%, hsl(var(--primary)/0.03) 50%)',
                backgroundSize: '100% 4px',
              }}
            />
          )}

          <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap relative z-10">
            {content}
          </p>

          {/* Timestamp */}
          <div className={`mt-2 text-xs text-muted-foreground ${isAssistant ? '' : 'text-right'}`}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </motion.div>

        {/* Role Label */}
        <div className={`mt-1 text-xs ${isAssistant ? 'text-primary' : 'text-accent text-right'}`}>
        {isAssistant ? (
            <GlitchText className="text-xs">SYSTEM</GlitchText>
          ) : (
            <span className="uppercase tracking-wider">HUNTER</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
