import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare, Trash2, Menu, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  messages: number;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ChatSidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isOpen,
  onToggle,
}: ChatSidebarProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="fixed top-3 left-3 z-50 md:hidden h-8 w-8 text-muted-foreground hover:text-foreground"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed md:relative left-0 top-0 z-40 h-screen w-[280px] bg-sidebar border-r border-sidebar-border flex flex-col"
      >
        {/* Header */}
        <div className="p-3 border-b border-sidebar-border">
          <Button
            onClick={onNewConversation}
            className="w-full justify-start gap-2 bg-transparent hover:bg-sidebar-accent text-sidebar-foreground border border-sidebar-border"
            variant="outline"
          >
            <Plus className="w-4 h-4" />
            New chat
          </Button>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-2">
            <p className="text-xs font-medium text-muted-foreground px-2 py-2">
              Recent conversations
            </p>
            <AnimatePresence mode="popLayout">
              {conversations.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-2 py-8 text-center"
                >
                  <MessageSquare className="w-8 h-8 mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No conversations yet
                  </p>
                </motion.div>
              ) : (
                conversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onMouseEnter={() => setHoveredId(conversation.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => onSelectConversation(conversation.id)}
                    className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors mb-1 ${
                      activeConversationId === conversation.id
                        ? "bg-sidebar-accent text-sidebar-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm truncate flex-1">
                      {conversation.title}
                    </span>
                    <AnimatePresence>
                      {hoveredId === conversation.id && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteConversation(conversation.id);
                          }}
                          className="p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-sidebar-accent/30">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">G</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Guest User
              </p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default ChatSidebar;
