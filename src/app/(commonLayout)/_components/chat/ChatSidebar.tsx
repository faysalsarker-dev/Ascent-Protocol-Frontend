import { Menu, MessageSquare, Plus, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatHistory } from "@/src/hooks/useChat";

interface ChatSidebarProps {

  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ChatSidebar = ({

  selectedDate,
  onSelectDate,
  onNewChat,
  isOpen,
  onToggle,
}: ChatSidebarProps) => {

const {data , isLoading}=useChatHistory()
const dates = data?.data || []



  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        onClick={onToggle}
        initial={false}
        animate={{ left: isOpen ? 268 : 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-4 z-50 md:hidden p-2.5 rounded-xl bg-card shadow-md border border-border/50 hover:bg-accent hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-foreground" />
        ) : (
          <Menu className="w-5 h-5 text-foreground" />
        )}
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30 md:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed md:relative top-0 left-0 z-40 h-full bg-sidebar border-r border-border/60 flex flex-col w-[280px] shadow-lg md:shadow-none"
      >
        {/* Header */}
        <div className="p-4 border-b border-border/60">
          <motion.button
            onClick={onNewChat}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            <span>New Chat</span>
            <Sparkles className="w-3.5 h-3.5 ml-auto opacity-70" />
          </motion.button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto chat-scrollbar p-3 space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
            Recent Chats
          </p>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="h-11 bg-muted/60 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : dates?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12 px-4"
            >
              <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                No chat history yet
              </p>
              <p className="text-xs text-muted-foreground/70 text-center mt-1">
                Start a new conversation
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.03,
                  },
                },
              }}
            >
              {dates?.map((date: string) => (
                <motion.button
                  key={date}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  onClick={() => onSelectDate(date)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    selectedDate === date
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-accent text-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      selectedDate === date
                        ? "bg-primary-foreground/20"
                        : "bg-muted/60 group-hover:bg-muted"
                    }`}
                  >
                    <MessageSquare
                      className={`w-4 h-4 ${
                        selectedDate === date
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    />
                  </div>
                  <span className="text-sm font-medium truncate">{date}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/60">
          <p className="text-[10px] text-muted-foreground/60 text-center">
            Powered by AI
          </p>
        </div>
      </motion.aside>
    </>
  );
};

export default ChatSidebar;
