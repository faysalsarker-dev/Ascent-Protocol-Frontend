"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/src/components/ui/card";
import { INavItem } from "../../shared/AppBar";
import { iconMap } from "@/src/utils/iconMap";
import { cn } from "@/src/lib/utils";

export default function AppBarContent({ navItems }: { navItems: INavItem[] }) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="fixed inset-x-0 bottom-0 z-50 p-4"
    >
      <Card
        className={cn(
          "relative h-16 md:h-20 p-3 mx-auto max-w-lg",
          "flex items-center justify-center overflow-hidden",
          "glassy-card border border-white/10 rounded-2xl backdrop-blur-xl"
        )}
      >
        {/* Global top glow */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-full h-12 bg-white rounded-full blur-3xl  opacity-40" />

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full h-12 bg-white rounded-full blur-3xl  opacity-40" />

        <div className="absolute top-0 left-0 -translate-x-1/2 w-12 h-full bg-primary rounded-full blur-3xl opacity-40" />

        <div className="absolute top-0 -right-2  w-12 h-full bg-primary rounded-full blur-3xl opacity-40 " />




        {/* <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-12 bg-primary/40 blur-3xl rounded-full opacity-40" /> */}

        {/* Subtle inner aura */}
        <div className="absolute inset-0 bg-linear-to-t from-white/5 to-transparent blur-xl -z-10" />

        <div className="relative flex justify-between items-center w-full h-full px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = iconMap[item.icon.toLowerCase()];

            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <div
                  className={cn(
                    "relative flex items-center justify-center py-2",
                    "transition-all duration-300"
                  )}
                >
                  {/* SLIDING highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute w-12 h-12 rounded-2xl bg-primary/20 backdrop-blur-sm 
                                 shadow-[0_0_25px_rgba(0,255,255,0.35)]"
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        duration: 0.55,
                      }}
                    />
                  )}

                  {/* SOFT RING under active icon */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-ring"
                      className="absolute w-20 h-20 rounded-full bg-primary/10 blur-3xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  {/* ICON — neon style */}
                  <Icon
                    className={cn(
                      "w-7 h-7 transition-all duration-300 drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]",
                      isActive
                        ? "scale-125 text-primary"
                        : "text-white/50 hover:text-white/80 hover:scale-110"
                    )}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
