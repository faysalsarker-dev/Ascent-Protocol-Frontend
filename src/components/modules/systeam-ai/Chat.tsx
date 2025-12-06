"use client"
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Plus, Bot, Sparkles } from 'lucide-react';
import { ParticleBackground } from '@/src/components/modules/today-task/ParticleBackground';
import { CornerBracket, GlitchText, ScanlineOverlay, DataStream } from '@/src/components/modules/today-task/GamifiedEffects';
import { ChatMessage } from '@/src/components/modules/systeam-ai/ChatMessage';
import { ChatInput } from '@/src/components/modules/systeam-ai/ChatInput';
import { QuickActions } from '@/src/components/modules/systeam-ai/QuickActions';
import { ChatHistory } from '@/src/components/modules/systeam-ai/ChatHistory';
import { useChatStorage } from '@/src/hooks/useChatStorage';

// Simulated AI responses based on message type
const generateAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('diet') || lowerMessage.includes('meal') || lowerMessage.includes('food')) {
    return `⚡ SYSTEM PROTOCOL: NUTRITION MATRIX ACTIVATED

Based on your current power level and training intensity, here's your optimized fuel protocol:

🌅 MORNING PHASE (06:00-08:00)
• Protein: 40g (eggs, Greek yogurt)
• Complex Carbs: 50g (oats, whole grain)
• Healthy Fats: 15g (avocado, nuts)

⚔️ PRE-QUEST FUEL (1hr before training)
• Quick carbs: 30g
• Light protein: 20g
• Hydration: 500ml water

🔥 POST-BATTLE RECOVERY
• Protein shake: 30-40g within 30min
• Carb reload: 40-60g
• Electrolytes replenishment

🌙 EVENING RESTORATION
• Lean protein: 35g
• Vegetables: unlimited
• Slow carbs: 30g

Daily Macros Target:
• Protein: 1.8g per kg bodyweight
• Carbs: 3-4g per kg (training days)
• Fats: 0.8g per kg

Stay hydrated. Fuel your ascension. 💪`;
  }
  
  if (lowerMessage.includes('journey') || lowerMessage.includes('progress') || lowerMessage.includes('report')) {
    return `📊 HUNTER PROGRESS ANALYSIS COMPLETE

STATUS: ASCENDING
━━━━━━━━━━━━━━━━━━━━━━━

📈 STRENGTH METRICS
• Power Level: ↑ 15% this month
• Consistency Rate: 87%
• Quest Completion: 24/28 sessions

💪 ACHIEVEMENTS UNLOCKED
✓ 7-Day Streak Master
✓ Early Bird Protocol
✓ Weight PR Breaker

⚠️ AREAS FOR OPTIMIZATION
• Rest day recovery could be improved
• Hydration tracking shows gaps
• Sleep quality averaging 6.5hrs (target: 7-8)

🎯 NEXT MILESTONES
• 30-day streak: 6 days remaining
• Strength benchmark: 85% complete
• Body composition goal: On track

SYSTEM RECOMMENDATION:
Focus on recovery protocols. Your intensity is excellent, but sustainable power comes from balanced restoration. Consider adding mobility work on rest days.

Keep pushing, Hunter. The shadow realm awaits. 🌟`;
  }
  
  if (lowerMessage.includes('workout') || lowerMessage.includes('training') || lowerMessage.includes('plan')) {
    return `🎮 NEW QUEST LINE GENERATED

OPERATION: MAXIMUM OUTPUT PROTOCOL
━━━━━━━━━━━━━━━━━━━━━━━

📅 WEEKLY BATTLE SCHEDULE

DAY 1 - CHEST & TRICEPS [POWER]
• Bench Press: 4×6-8 (heavy)
• Incline DB Press: 3×8-10
• Cable Flyes: 3×12-15
• Tricep Dips: 3×10-12
• Rope Pushdowns: 3×12-15

DAY 2 - BACK & BICEPS [STRENGTH]
• Deadlifts: 4×5-6 (compound)
• Weighted Pull-ups: 4×6-8
• Barbell Rows: 3×8-10
• Face Pulls: 3×15-20
• Hammer Curls: 3×10-12

DAY 3 - ACTIVE RECOVERY
• Light cardio: 20-30min
• Mobility work: 15min
• Stretching: 10min

DAY 4 - LEGS [HYPERTROPHY]
• Squats: 4×8-10
• Romanian DL: 3×10-12
• Leg Press: 3×12-15
• Walking Lunges: 3×10/leg
• Calf Raises: 4×15-20

DAY 5 - SHOULDERS & ARMS [VOLUME]
• OHP: 4×6-8
• Lateral Raises: 4×12-15
• Rear Delt Flyes: 3×15
• Supersets: Biceps/Triceps

DAY 6-7 - RECOVERY PROTOCOL

Progressive overload every 2 weeks. Track all lifts. Level up! 🔥`;
  }
  
  // Default response for general messages
  return `SYSTEM RECEIVED YOUR TRANSMISSION

I've analyzed your query. As your training companion, I'm here to guide your fitness journey.

Here's what I can help you with:
• 🍽️ Nutrition protocols and meal planning
• 📊 Progress tracking and journey analysis  
• 💪 Custom workout programming
• 🎯 Goal setting and milestone tracking
• ⚡ Recovery and optimization strategies

What aspect of your training would you like to focus on? Remember, every rep brings you closer to your next level.

Stay focused, Hunter. 🌟`;
};

const Chat = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    currentSession,
    remainingMessages,
    maxMessages,
    addMessage,
    loadSession,
    deleteSession,
    startNewSession,
    getSessionsForHistory,
    isLoaded,
  } = useChatStorage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  useEffect(() => {
    if (isLoaded && !currentSession) {
      startNewSession();
    }
  }, [isLoaded, currentSession, startNewSession]);

  const handleSendMessage = async (content: string) => {
    if (remainingMessages <= 0) return;

    // Add user message
    addMessage('user', content);
    setIsLoading(true);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Generate and add AI response
    const response = generateAIResponse(content);
    addMessage('assistant', response);
    setIsLoading(false);
  };

  const messages = currentSession?.messages || [];
  const historySessions = getSessionsForHistory();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <ParticleBackground />
      <ScanlineOverlay />
      
      {/* Data streams */}
      <DataStream />

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 z-20">
        <CornerBracket position="tl" color="primary" />
      </div>
      <div className="fixed top-4 right-4 z-20">
        <CornerBracket position="tr" color="primary" />
      </div>
      <div className="fixed bottom-4 left-4 z-20">
        <CornerBracket position="bl" color="primary" />
      </div>
      <div className="fixed bottom-4 right-4 z-20">
        <CornerBracket position="br" color="primary" />
      </div>

      <div className="relative z-10 container max-w-2xl mx-auto px-4 h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="py-4 flex items-center justify-between border-b border-primary/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={() => setIsHistoryOpen(true)}
            className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="w-6 h-6" />
          </motion.button>

          <div className="flex items-center gap-3">
            <motion.div
              className="p-2 rounded-lg bg-primary/20 border border-primary/40"
              animate={{
                boxShadow: ['0 0 10px hsl(var(--primary)/0.3)', '0 0 25px hsl(var(--primary)/0.5)', '0 0 10px hsl(var(--primary)/0.3)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bot className="w-5 h-5 text-primary" />
            </motion.div>
            <div>
              <GlitchText className="text-sm">SYSTEM INTERFACE</GlitchText>
              <p className="text-xs text-muted-foreground">AI Training Companion</p>
            </div>
          </div>

          <motion.button
            onClick={startNewSession}
            className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </motion.header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.length === 0 ? (
            <motion.div
              className="h-full flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Welcome State */}
              <motion.div
                className="relative mb-8"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  className="w-24 h-24 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center"
                  animate={{
                    boxShadow: ['0 0 20px hsl(var(--primary)/0.3)', '0 0 40px hsl(var(--primary)/0.5)', '0 0 20px hsl(var(--primary)/0.3)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Bot className="w-12 h-12 text-primary" />
                </motion.div>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-6 h-6 text-accent" />
                </motion.div>
              </motion.div>

              <GlitchText className="text-xl mb-2">SYSTEM ONLINE</GlitchText>
              <p className="text-muted-foreground text-center mb-8 max-w-sm">
                Welcome, Hunter. I'm your AI training companion. Select a quick command or type your query.
              </p>

              {/* Quick Actions */}
              <div className="w-full max-w-md">
                <QuickActions 
                  onSelect={handleSendMessage} 
                  disabled={isLoading || remainingMessages <= 0}
                />
              </div>
            </motion.div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                  index={index}
                />
              ))}
              
              {isLoading && (
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="p-4 rounded-xl bg-card/60 border border-primary/30">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="py-4 border-t border-primary/20">
          {messages.length > 0 && (
            <div className="mb-4">
              <QuickActions 
                onSelect={handleSendMessage} 
                disabled={isLoading || remainingMessages <= 0}
              />
            </div>
          )}
          <ChatInput
            onSend={handleSendMessage}
            disabled={isLoading}
            remainingMessages={remainingMessages}
            maxMessages={maxMessages}
          />
        </div>
      </div>

      {/* History Sidebar */}
      <ChatHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        sessions={historySessions}
        onSelectSession={(id) => {
          loadSession(id);
          setIsHistoryOpen(false);
        }}
        onDeleteSession={deleteSession}
        currentSessionId={currentSession?.id || null}
      />
    </div>
  );
};

export default Chat;
