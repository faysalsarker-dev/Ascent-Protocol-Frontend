import { useState, useEffect, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  date: string;
  messages: ChatMessage[];
}

interface DailyLimit {
  date: string;
  count: number;
}

const STORAGE_KEYS = {
  SESSIONS: 'hunter_chat_sessions',
  DAILY_LIMIT: 'hunter_chat_daily_limit',
};

const MAX_MESSAGES_PER_DAY = 10;
const MAX_HISTORY_DAYS = 30;

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const getTodayDate = () => new Date().toISOString().split('T')[0];

const cleanOldSessions = (sessions: ChatSession[]): ChatSession[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - MAX_HISTORY_DAYS);
  
  return sessions.filter(session => new Date(session.date) >= cutoffDate);
};

export const useChatStorage = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [dailyLimit, setDailyLimit] = useState<DailyLimit>({ date: getTodayDate(), count: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    const storedLimit = localStorage.getItem(STORAGE_KEYS.DAILY_LIMIT);

    if (storedSessions) {
      try {
        const parsed = JSON.parse(storedSessions);
        const cleaned = cleanOldSessions(parsed);
        setSessions(cleaned);
        
        // Find or create today's session
        const today = getTodayDate();
        const todaySession = cleaned.find(s => s.date === today);
        if (todaySession) {
          setCurrentSession({
            ...todaySession,
            messages: todaySession.messages.map(m => ({
              ...m,
              timestamp: new Date(m.timestamp),
            })),
          });
        }
      } catch (e) {
        console.error('Failed to parse chat sessions:', e);
      }
    }

    if (storedLimit) {
      try {
        const parsed = JSON.parse(storedLimit);
        // Reset if it's a new day
        if (parsed.date !== getTodayDate()) {
          setDailyLimit({ date: getTodayDate(), count: 0 });
        } else {
          setDailyLimit(parsed);
        }
      } catch (e) {
        console.error('Failed to parse daily limit:', e);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    }
  }, [sessions, isLoaded]);

  // Save daily limit to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.DAILY_LIMIT, JSON.stringify(dailyLimit));
    }
  }, [dailyLimit, isLoaded]);

  const remainingMessages = MAX_MESSAGES_PER_DAY - dailyLimit.count;

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const today = getTodayDate();
    const newMessage: ChatMessage = {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
    };

    setCurrentSession(prev => {
      if (!prev || prev.date !== today) {
        // Create new session for today
        const newSession: ChatSession = {
          id: generateId(),
          date: today,
          messages: [newMessage],
        };
        setSessions(prevSessions => {
          const cleaned = cleanOldSessions(prevSessions);
          const filtered = cleaned.filter(s => s.date !== today);
          return [newSession, ...filtered];
        });
        return newSession;
      } else {
        // Add to existing session
        const updated = {
          ...prev,
          messages: [...prev.messages, newMessage],
        };
        setSessions(prevSessions => 
          prevSessions.map(s => s.id === updated.id ? updated : s)
        );
        return updated;
      }
    });

    // Increment daily count only for user messages
    if (role === 'user') {
      setDailyLimit(prev => ({
        date: today,
        count: prev.date === today ? prev.count + 1 : 1,
      }));
    }

    return newMessage;
  }, []);

  const loadSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession({
        ...session,
        messages: session.messages.map(m => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      });
    }
  }, [sessions]);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSession?.id === sessionId) {
      setCurrentSession(null);
    }
  }, [currentSession]);

  const startNewSession = useCallback(() => {
    const today = getTodayDate();
    const existing = sessions.find(s => s.date === today);
    
    if (existing) {
      setCurrentSession({
        ...existing,
        messages: existing.messages.map(m => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      });
    } else {
      const newSession: ChatSession = {
        id: generateId(),
        date: today,
        messages: [],
      };
      setCurrentSession(newSession);
    }
  }, [sessions]);

  const getSessionsForHistory = useCallback(() => {
    return sessions.map(s => ({
      id: s.id,
      date: s.date,
      messageCount: s.messages.length,
      preview: s.messages[0]?.content.slice(0, 100) || 'Empty session',
    }));
  }, [sessions]);

  return {
    currentSession,
    sessions,
    remainingMessages,
    maxMessages: MAX_MESSAGES_PER_DAY,
    addMessage,
    loadSession,
    deleteSession,
    startNewSession,
    getSessionsForHistory,
    isLoaded,
  };
};
