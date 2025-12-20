import { motion } from "framer-motion";
import { User, Bot, Copy, Check } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


interface MessageBubbleProps {
  id: string;
  content: string;
  role: "user" | "assistant";
  isStreaming?: boolean;
}

const MessageBubble = ({ content, role, isStreaming }: MessageBubbleProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-start gap-3 group ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" strokeWidth={2} />
        ) : (
          <Bot className="w-4 h-4" strokeWidth={2} />
        )}
      </motion.div>

      {/* Message Content */}
      <div
        className={`flex flex-col max-w-[80%] sm:max-w-[75%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`relative px-4 py-3 shadow-sm ${
            isUser
              ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-md"
              : "bg-card text-card-foreground rounded-2xl rounded-tl-md border border-border/40"
          }`}
        >
          <>

     <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: (props) => <p className="mb-3 leading-relaxed" {...props} />,
                  ul: (props) => <ul className="list-disc ml-6 mb-3" {...props} />,
                  ol: (props) => <ol className="list-decimal ml-6 mb-3" {...props} />,
                  li: (props) => <li className="mb-1" {...props} />,
                  strong: (props) => <strong className="font-semibold" {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>

            {isStreaming && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-current ml-0.5 align-middle"
              />
            )}
          </>

          {/* Copy button for assistant messages */}
          {!isUser && !isStreaming && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={handleCopy}
              className="absolute -bottom-8 left-0 flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors opacity-0 group-hover:opacity-100"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MessageBubble;
