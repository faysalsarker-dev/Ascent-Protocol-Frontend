import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface WorkoutErrorProps {
  onRetry?: () => void;
}

export function WorkoutError({ onRetry }: WorkoutErrorProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-elevated max-w-md w-full text-center">
          <CardContent className="py-12 px-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/20 mb-6"
            >
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </motion.div>
            
            <h3 className="text-xl font-bold font-display text-foreground mb-3">
              Quest Failed
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Unable to load your training program. The dungeon connection was interrupted.
            </p>
            
            {onRetry && (
              <Button 
                onClick={onRetry}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry Connection
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
