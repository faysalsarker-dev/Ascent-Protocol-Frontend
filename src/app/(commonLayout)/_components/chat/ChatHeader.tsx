
import { Bot, MoreHorizontal, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const ChatHeader = ({ isSidebarOpen, onToggleSidebar }: ChatHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hidden md:flex h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeft className="w-5 h-5" />
          )}
        </Button>
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
          <Bot className="w-5 h-5 text-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground">ChatGPT</h1>
          <p className="text-xs text-muted-foreground">AI Assistant</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
        <MoreHorizontal className="w-5 h-5" />
      </Button>
    </header>
  );
};

export default ChatHeader;
