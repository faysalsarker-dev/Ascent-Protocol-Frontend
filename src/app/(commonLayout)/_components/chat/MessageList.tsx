import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export interface Message {
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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full min-h-[60vh] px-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              How can I help you today?
            </h2>
            <p className="text-muted-foreground text-center max-w-md">
              Start a conversation by typing a message below.
            </p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              content={message.content}
              role={message.role}
              isStreaming={message.isStreaming}
              useTypewriter={message.role === "assistant" && index === messages.length - 1}
            />
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="bg-secondary/50 px-4 py-6">
            <div className="max-w-3xl mx-auto flex gap-4">
              <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-foreground"
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
              <div>
                <p className="text-sm font-medium mb-1 text-foreground">
                  Assistant
                </p>
                <TypingIndicator />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} className="h-32" />
      </div>
    </div>
  );
};

export default MessageList;
