"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChatSidebar from "./ChatSidebar";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import LoginAlert from "./LoginAlert";
import { useChatHistoryToday, useSendChatMessage } from "@/src/hooks/useChat";

// Mock services - replace with your actual implementations
const mockGetUser = async () => ({ id: "user123", name: "User" });



// Types
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  isStreaming?: boolean;
}







// Main Chat Layout Component
const ChatLayout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatDate = searchParams.get("chat-date");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const {data ,isLoading, refetch}=useChatHistoryToday()
  const { mutateAsync ,isPending} = useSendChatMessage();
const msg = data?.data || []

  const handleSelectDate = (date: string) => {
    router.push(`?chat-date=${date}`);
  };

  const handleNewChat = () => {
    router.push(window.location.pathname);
    setSelectedDate(null);
  };

  const handleSend = async (content: string) => {
    const user = await mockGetUser();
    if (!user) {
      setShowLoginAlert(true);
      return;
    }

  const message = { message: content };

  try {
    const result = await mutateAsync(message); 
    refetch()
  } catch (err) {
    console.error("Failed to send message:", err);
  }
 
 
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-background ">
      <ChatSidebar
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <MessageList messages={msg} isLoading={isLoading || isPending} />
        <ChatInput onSend={handleSend} disabled={isPending} />
      </div>

      <LoginAlert
        isOpen={showLoginAlert}
        onClose={() => setShowLoginAlert(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default ChatLayout;