import { Loader2 } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { useEffect } from "react";
import { Message } from "./ChatLayout";
import { ScrollArea } from "@/src/components/ui/scroll-area";

const MessageList = ({ messages, isLoading }: { messages: Message[], isLoading: boolean }) => {
  useEffect(() => {
    const container = document.getElementById("message-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div id="message-container" className="flex-1 overflow-y-auto">
   <ScrollArea className="h-full" >
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] px-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">How can I help you today?</h2>
              <p className="text-muted-foreground text-center max-w-md">Start a conversation by typing a message below.</p>
            </div>
          )}
  
          {messages.map((message) => (
            <MessageBubble key={message.id} {...message} />
          ))}
  
          {isLoading && (
            <div className="bg-secondary/50 px-4 py-6">
              <div className="max-w-3xl mx-auto flex gap-4">
                <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Assistant</p>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            </div>
          )}
  
          <div className="h-32" />
        </div>
   </ScrollArea>
    </div>
  );
};

export default MessageList