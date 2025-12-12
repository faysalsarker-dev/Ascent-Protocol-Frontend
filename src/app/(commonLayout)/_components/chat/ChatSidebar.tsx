import { useChatHistory } from "@/src/hooks/useChat";
import { Menu, MessageSquare, Plus, X } from "lucide-react";

const ChatSidebar = ({ 
 
  selectedDate, 
  onSelectDate, 
  onNewChat,
  isOpen, 
  onToggle 
}: {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onToggle: () => void;
}) => {

const {data , isLoading}=useChatHistory()
const dates = data?.data || []

 













  return (
    <>
      <button
        onClick={onToggle}
        className={`fixed top-14 ${isOpen ? "left-14 " :"left-4"} z-50 md:hidden p-2 rounded-lg bg-background border hover:bg-accent`}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed md:relative top-0 left-0 z-40 h-screen bg-background border-r flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-[280px]`}
      >
        <div className="p-3 border-b">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-muted rounded-lg mb-2 animate-pulse" />
            ))
          ) : dates.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No chat history</p>
          ) : (
            dates?.map((date:string) => (
              <button
                key={date}
                onClick={() => onSelectDate(date)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  selectedDate === date
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span className="text-sm truncate">{date}</span>
              </button>
            ))
          )}
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar