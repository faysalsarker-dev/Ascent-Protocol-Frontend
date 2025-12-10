import { Message } from "./ChatLayout";

const MessageBubble = ({ content, role, isStreaming }: Message) => (
  <div className={`px-4 py-6 ${role === "assistant" ? "bg-secondary/50" : ""}`}>
    <div className="max-w-3xl mx-auto flex gap-4">
      <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center shrink-0">
        {role === "user" ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium mb-1">{role === "user" ? "You" : "Assistant"}</p>
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        {isStreaming && <span className="inline-block w-2 h-4 bg-foreground ml-1 animate-pulse" />}
      </div>
    </div>
  </div>
);

export default MessageBubble