"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Copy, Check, X } from "lucide-react";
import { GlitchText } from "../today-task/GamifiedEffects";

const DEMO_EMAIL = "faysalsarker.dev@gmail.com";
const DEMO_PASSWORD = "Faysalsarker.dev1";

export default function DemoCredentialsBar() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState<"email" | "password" | null>(null);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 1200);
    const hideTimer = setTimeout(() => setVisible(false), 60_000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleCopy = async (
    text: string,
    type: "email" | "password"
  ) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);

    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-6 right-6 z-50 w-[260px]"
        >
          <Card className="relative rounded-xl border bg-background/80 text-foreground shadow-lg">
            <button
              onClick={() => setVisible(false)}
              className="absolute right-2 top-2 opacity-70 hover:opacity-100"
            >
              <X size={14} />
            </button>

            <div className="p-3">
                 <GlitchText className="text-glow font-system text-xl font-bold mb-2">Demo Access</GlitchText>
         

              {/* Email */}
              <div className="mb-1 flex items-center justify-between rounded-md bg-secondary/50 px-2 py-1.5 text-xs">
                <span className="truncate">{DEMO_EMAIL}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={() => handleCopy(DEMO_EMAIL, "email")}
                >
                  {copied === "email" ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}
                </Button>
              </div>

              {/* Password */}
              <div className="flex items-center justify-between rounded-md bg-secondary/40 px-2 py-1.5 text-xs">
                <span className="truncate">{DEMO_PASSWORD}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={() => handleCopy(DEMO_PASSWORD, "password")}
                >
                  {copied === "password" ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}
                </Button>
              </div>

              <p className="mt-2 text-[10px] opacity-70">
                Auto hides in 60s · Demo only
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
