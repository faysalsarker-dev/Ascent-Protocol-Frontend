


"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldAlert, X, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import CornerBracket from "@/src/components/ui/CornerBracket";
import WarningIcon from "@/src/components/ui/WarningIcon";
import DataStream from "@/src/components/ui/DataStream";
import GlitchText from "../ui/GlitchText";

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}







export const LogoutDialog = ({ open, onOpenChange }: LogoutDialogProps) => {
  const [confirmProgress, setConfirmProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const handleConfirm = () => {
    toast.success("◆ SYSTEM OVERRIDE ◆");
    onOpenChange(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHolding) {
      interval = setInterval(() => {
        setConfirmProgress(prev => {
          if (prev >= 100) {
            handleConfirm();
            return 0;
          }
          return prev + 5;
        });
      }, 50);
    } else {
      setConfirmProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHolding]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-md p-0 overflow-hidden bg-transparent border-none shadow-none [&>button]:hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="relative"
            >
              {/* Outer glow */}
              <div className="absolute -inset-4 bg-destructive/20 blur-3xl rounded-full" />
              
              {/* Main panel */}
              <div className="relative bg-background/95 backdrop-blur-xl border border-destructive/50 rounded-sm overflow-hidden">
                {/* Corner brackets */}
                <CornerBracket position="tl" />
                <CornerBracket position="tr" />
                <CornerBracket position="bl" />
                <CornerBracket position="br" />
                
                {/* Effects */}
                <DataStream />
                
                {/* Border animation */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(var(--destructive) / 0.5), transparent)`,
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative z-10 p-6 space-y-6">
                  {/* Header */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <ShieldAlert className="w-4 h-4 text-destructive" />
                      </motion.div>
                      <DialogTitle className="font-system text-xs tracking-[0.3em] text-destructive uppercase">
                        <GlitchText>SYSTEM ALERT</GlitchText>
                      </DialogTitle>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <ShieldAlert className="w-4 h-4 text-destructive" />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      className="h-px bg-linear-to-r from-transparent via-destructive to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                  </motion.div>

                  {/* Warning content */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center text-center space-y-4"
                  >
                    <WarningIcon />

                    <div className="space-y-2">
                      <h2 className="font-system text-lg text-foreground tracking-wide">
                        <GlitchText className="text-destructive">DISCONNECT</GlitchText>
                        <span className="text-muted-foreground"> SEQUENCE</span>
                      </h2>
                      
                      <motion.p
                        className="font-mono text-xs text-muted-foreground max-w-[280px] leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Initiating logout will terminate your active hunter session.
                        All unsaved progress will be lost. Re-authentication required
                        to reconnect to the SYSTEM.
                      </motion.p>
                    </div>

                    {/* Warning boxes */}
                    <motion.div
                      className="w-full space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 bg-destructive/10 border border-destructive/30 rounded-sm">
                        <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                        <span className="font-mono text-[10px] text-destructive/80">
                          WARNING: Session data will be purged
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div
                    className="flex gap-3 pt-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      onClick={() => onOpenChange(false)}
                      className="flex-1 relative overflow-hidden bg-secondary/50 hover:bg-secondary/70 border border-primary/30 hover:border-primary/50 text-foreground font-system text-xs tracking-wider h-12 rounded-sm transition-all duration-300"
                    >
                      <X className="w-4 h-4 mr-2" />
                      <span>CANCEL</span>
                    </Button>

                    <Button
                      onMouseDown={() => setIsHolding(true)}
                      onMouseUp={() => setIsHolding(false)}
                      onMouseLeave={() => setIsHolding(false)}
                      onTouchStart={() => setIsHolding(true)}
                      onTouchEnd={() => setIsHolding(false)}
                      className="flex-1 relative overflow-hidden bg-destructive/20 hover:bg-destructive/30 border border-destructive/50 hover:border-destructive text-destructive font-system text-xs tracking-wider h-12 rounded-sm transition-all duration-300 animate-danger-pulse"
                    >
                      {/* Progress bar */}
                      <motion.div
                        className="absolute inset-0 bg-destructive/40"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: confirmProgress / 100 }}
                        style={{ transformOrigin: "left" }}
                      />
                      
                      <span className="relative z-10 flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        {isHolding ? "HOLD..." : "CONFIRM"}
                      </span>
                    </Button>
                  </motion.div>

                  {/* Footer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center space-y-2"
                  >
                    <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    <p className="font-mono text-[9px] text-primary/50 tracking-[0.2em] uppercase">
                      ◆ Security Protocol v2.4.1 Active ◆
                    </p>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 bg-primary/50 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ 
                            duration: 1, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
