import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Moon, Sparkles, Battery } from "lucide-react";

function RestDayCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] px-4"
    >
      <Card className="glass-elevated max-w-md w-full text-center overflow-hidden relative">
        <CardContent className="py-8 px-5 sm:py-12 sm:px-8">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/20 mb-4 sm:mb-6"
          >
            <Moon className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
          </motion.div>
          
          <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground mb-2 sm:mb-3 tracking-wide">
            Rest & Recover
          </h3>
          
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
            Even the Shadow Monarch needs to recover. Your muscles grow stronger during rest.
            Take this day to recharge for battles ahead.
          </p>
          
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Battery className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span>Recharge</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
              <span>Level Up</span>
            </div>
          </div>
        </CardContent>
        
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </Card>
    </motion.div>
  );
}


export default RestDayCard;