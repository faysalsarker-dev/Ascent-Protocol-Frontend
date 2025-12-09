
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, LogIn } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface LoginAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginAlert = ({ isOpen, onClose, onLogin }: LoginAlertProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <MessageCircle className="w-8 h-8 text-primary" />
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Login Required
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  You need to login to chat with our AI assistant. Create an account or sign in to continue your conversation.
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-3"
              >
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-11 border-border text-foreground hover:bg-muted"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={onLogin}
                  className="flex-1 h-11 bg-primary hover:bg-primary/90"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginAlert;
