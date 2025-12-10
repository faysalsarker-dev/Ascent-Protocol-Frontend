"use client";

import { useRef, useEffect, useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-background">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <motion.div
          animate={{
            boxShadow: isFocused
              ? "0 0 0 2px hsl(var(--ring))"
              : "0 0 0 1px hsl(var(--border))",
          }}
          transition={{ duration: 0.15 }}
          className="relative flex items-end gap-2 bg-input rounded-xl p-3"
        >
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            disabled={disabled}
            rows={1}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground text-sm leading-relaxed max-h-[200px]"
          />

          <Button
            size="icon"
            disabled={!message.trim() || disabled}
            className="h-8 w-8 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            onClick={handleSend}
          >
            <Send className="w-4 h-4" />
          </Button>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center mt-3">
          AI might not always be perfect — double-check important info.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
