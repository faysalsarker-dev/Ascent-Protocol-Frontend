
"use client";
import { useState, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import MessageList, { Message } from "./MessageList";
import ChatInput from "./ChatInput";
import ChatSidebar, { Conversation } from "./ChatSidebar";
import LoginAlert from "./LoginAlert";

// Mock user state - will be made dynamic later
const user = false;

// Simulated AI responses for demo
const mockResponses = [
  "I'm here to help! What would you like to know?",
  "That's a great question. Let me think about that for a moment...\n\nBased on my understanding, I can provide you with some insights on this topic. Would you like me to elaborate further?",
  "I understand what you're asking. Here's my perspective:\n\n1. First, consider the context of your question\n2. Think about the various factors involved\n3. Look at different approaches to solve this\n\nWould you like me to go deeper into any of these points?",
  "Interesting! I'd be happy to explore this topic with you. There are several angles we could approach this from. What aspect interests you most?",
  "Thanks for sharing that. Based on what you've told me, I think the best approach would be to break this down into smaller steps. Should we start with the basics?",
];

const ChatLayout = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const messages = activeConversationId ? messagesMap[activeConversationId] || [] : [];

  // Check for user on mount


  const createNewConversation = useCallback(() => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }

    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: "New conversation",
      createdAt: new Date(),
      messages: 0,
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setMessagesMap((prev) => ({ ...prev, [newConversation.id]: [] }));
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const handleDeleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setMessagesMap((prev) => {
      const newMap = { ...prev };
      delete newMap[id];
      return newMap;
    });
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  }, [activeConversationId]);

  const handleSend = useCallback(async (content: string) => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }

    let conversationId = activeConversationId;

    // Create new conversation if none exists
    if (!conversationId) {
      const newConversation: Conversation = {
        id: crypto.randomUUID(),
        title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
        createdAt: new Date(),
        messages: 0,
      };
      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversationId(newConversation.id);
      setMessagesMap((prev) => ({ ...prev, [newConversation.id]: [] }));
      conversationId = newConversation.id;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      role: "user",
    };

    setMessagesMap((prev) => ({
      ...prev,
      [conversationId!]: [...(prev[conversationId!] || []), userMessage],
    }));

    // Update conversation title if it's the first message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId && c.messages === 0
          ? { ...c, title: content.slice(0, 30) + (content.length > 30 ? "..." : ""), messages: 1 }
          : c
      )
    );

    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

    setIsLoading(false);

    // Pick a random mock response
    const responseText = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      content: responseText,
      role: "assistant",
    };

    setMessagesMap((prev) => ({
      ...prev,
      [conversationId!]: [...(prev[conversationId!] || []), assistantMessage],
    }));

    // Update message count
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, messages: c.messages + 2 } : c
      )
    );
  }, [activeConversationId]);

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={createNewConversation}
        onDeleteConversation={handleDeleteConversation}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <MessageList messages={messages} isLoading={isLoading} />
        <ChatInput onSend={handleSend} disabled={isLoading} />
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
