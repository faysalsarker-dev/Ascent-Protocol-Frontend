import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, AlertTriangle } from 'lucide-react';
import { CornerBracket } from '@/src/components/modules/today-task/GamifiedEffects';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  remainingMessages: number;
  maxMessages: number;
}

export const ChatInput = ({ onSend, disabled, remainingMessages, maxMessages }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && remainingMessages > 0) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const isLimitReached = remainingMessages <= 0;

  return (
    <div className="space-y-3">
      {/* Message Limit Warning */}
      {remainingMessages <= 3 && remainingMessages > 0 && (
        <motion.div
          className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle className="w-4 h-4 text-accent" />
          <span className="text-xs text-accent">
            Warning: {remainingMessages} transmission{remainingMessages !== 1 ? 's' : ''} remaining today
          </span>
        </motion.div>
      )}

      {isLimitReached && (
        <motion.div
          className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <span className="text-xs text-destructive">
            Daily transmission limit reached. System resets at midnight.
          </span>
        </motion.div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          className={`relative rounded-xl border backdrop-blur-sm transition-all ${
            isFocused 
              ? 'bg-card/80 border-primary/50' 
              : 'bg-card/40 border-border/50'
          } ${isLimitReached ? 'opacity-50' : ''}`}
          animate={isFocused ? {
            boxShadow: '0 0 30px hsl(var(--primary)/0.2)',
          } : {
            boxShadow: '0 0 0px transparent',
          }}
        >
          <CornerBracket position="tl" color="primary" />
          <CornerBracket position="br" color="primary" />

          <div className="flex items-end gap-2 p-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder={isLimitReached ? "Daily limit reached..." : "Enter your message to the System..."}
              disabled={disabled || isLimitReached}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none text-sm min-h-[44px] max-h-[120px]"
              rows={1}
            />

            <motion.button
              type="submit"
              disabled={disabled || !message.trim() || isLimitReached}
              className={`p-3 rounded-lg transition-all ${
                disabled || !message.trim() || isLimitReached
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
              whileHover={!disabled && message.trim() && !isLimitReached ? { scale: 1.05 } : {}}
              whileTap={!disabled && message.trim() && !isLimitReached ? { scale: 0.95 } : {}}
            >
              {disabled ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Character count & limit */}
          <div className="px-3 pb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{message.length} / 500</span>
            <span className={remainingMessages <= 3 ? 'text-accent' : ''}>
              {remainingMessages}/{maxMessages} transmissions today
            </span>
          </div>
        </motion.div>
      </form>
    </div>
  );
};
