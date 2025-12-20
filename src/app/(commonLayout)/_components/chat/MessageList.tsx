import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { MessageCircle, Sparkles } from "lucide-react";

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-full min-h-[60vh] px-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 shadow-lg">
          <MessageCircle className="w-9 h-9 text-primary" strokeWidth={1.5} />
        </div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <Sparkles className="w-3 h-3 text-primary" />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-2xl font-semibold text-foreground mb-3"
      >
        How can I help you today?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-muted-foreground text-center max-w-md leading-relaxed"
      >
        Start a conversation by typing a message below. I&apos;m here to assist you
        with any questions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex gap-2 mt-8"
      >
        {["Ask anything", "Get creative", "Solve problems"].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 text-xs font-medium bg-muted rounded-full text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );



interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  isStreaming?: boolean;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);



  return (
    <div className="flex-1 overflow-hidden bg-linear-to-b from-background to-muted/20">
      <ScrollArea className="h-full">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          {messages?.length === 0 && !isLoading ? (
           <> 
           
           <EmptyState />
    
           
           </>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="space-y-4">
                {messages?.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <MessageBubble {...message} />
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="bg-card rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-border/40">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} className="h-24" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageList;
