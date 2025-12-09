import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  content: string;
  role: "user" | "assistant";
  isStreaming?: boolean;
  useTypewriter?: boolean;
}

const MessageBubble = ({ content, role, isStreaming, useTypewriter }: MessageBubbleProps) => {
  const isUser = role === "user";
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isUser && useTypewriter && content && !isStreaming) {
      setIsTyping(true);
      setDisplayedContent("");
      
      let index = 0;
      const text = content;
      
      const typeNextChar = () => {
        if (index < text.length) {
          setDisplayedContent(text.slice(0, index + 1));
          index++;
          const delay = text[index - 1] === '.' || text[index - 1] === '?' || text[index - 1] === '!' 
            ? 100 
            : text[index - 1] === ',' 
              ? 50 
              : 15 + Math.random() * 15;
          setTimeout(typeNextChar, delay);
        } else {
          setIsTyping(false);
        }
      };
      
      typeNextChar();
    } else {
      setDisplayedContent(content);
      setIsTyping(false);
    }
  }, [content, isUser, useTypewriter, isStreaming]);

  const textToShow = isUser || isStreaming ? content : displayedContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-4 px-4 py-6 ${isUser ? "bg-transparent" : "bg-secondary/50"}`}
    >
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-sm flex items-center justify-center ${
            isUser ? "bg-primary" : "bg-muted"
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-primary-foreground" />
          ) : (
            <Bot className="w-5 h-5 text-foreground" />
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium mb-1 text-foreground">
          {isUser ? "You" : "Assistant"}
        </p>
        <div className="text-foreground leading-relaxed whitespace-pre-wrap break-words">
          {textToShow}
          {(isStreaming || isTyping) && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
