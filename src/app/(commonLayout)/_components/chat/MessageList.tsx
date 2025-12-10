import MessageBubble from "./MessageBubble";
import { useEffect } from "react";
import { Message } from "./ChatLayout";
import  TypingIndicator  from "./TypingIndicator";
import { ScrollArea } from "@/src/components/ui/scroll-area";

const MessageList = ({ messages, isLoading }: { messages: Message[], isLoading: boolean }) => {
  useEffect(() => {
    const container = document.getElementById("message-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div id="message-container" className="flex-1 overflow-y-auto bg-muted/30">
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
           <div className="flex gap-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
             <TypingIndicator/>
           </div>
          
          )}
  
          <div className="h-32" />
        </div>
   </ScrollArea>
    </div>
  );
};

export default MessageList