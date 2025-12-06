import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageSquare, ChevronRight, Trash2 } from 'lucide-react';
import { CornerBracket, GlitchText, ScanlineOverlay } from '@/src/components/modules/today-task/GamifiedEffects';
import { format, isToday, isYesterday, differenceInDays } from 'date-fns';

interface ChatSession {
  id: string;
  date: string;
  messageCount: number;
  preview: string;
}

interface ChatHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ChatSession[];
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  currentSessionId: string | null;
}

const formatSessionDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  const days = differenceInDays(new Date(), date);
  if (days < 7) return `${days} days ago`;
  return format(date, 'MMM d, yyyy');
};

export const ChatHistory = ({ 
  isOpen, 
  onClose, 
  sessions, 
  onSelectSession, 
  onDeleteSession,
  currentSessionId 
}: ChatHistoryProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed left-0 top-0 bottom-0 w-80 bg-card/95 backdrop-blur-xl border-r border-primary/30 z-50 overflow-hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <ScanlineOverlay />
            <CornerBracket position="tr" color="primary" />
            <CornerBracket position="br" color="primary" />

            {/* Header */}
            <div className="relative p-4 border-b border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Calendar className="w-5 h-5 text-primary" />
                  </motion.div>
                  <GlitchText className="text-sm">TRANSMISSION LOG</GlitchText>
                </div>
                
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                Last 30 days • {sessions.length} sessions
              </p>
            </div>

            {/* Sessions List */}
            <div className="overflow-y-auto h-[calc(100%-80px)] p-3 space-y-2">
              {sessions.length === 0 ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No transmission history</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Start a new session to begin</p>
                </motion.div>
              ) : (
                sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    className={`relative group p-3 rounded-xl border cursor-pointer transition-all ${
                      currentSessionId === session.id
                        ? 'bg-primary/20 border-primary/50'
                        : 'bg-card/40 border-border/30 hover:border-primary/30 hover:bg-card/60'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => onSelectSession(session.id)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium ${
                            currentSessionId === session.id ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            {formatSessionDate(session.date)}
                          </span>
                          <span className="text-xs text-muted-foreground/60">
                            • {session.messageCount} msgs
                          </span>
                        </div>
                        <p className="text-sm text-foreground/80 mt-1 line-clamp-2">
                          {session.preview}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSession(session.id);
                          }}
                          className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                        <ChevronRight className={`w-4 h-4 ${
                          currentSessionId === session.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                    </div>

                    {currentSessionId === session.id && (
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r"
                        layoutId="activeSession"
                      />
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
