"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";



import { motion } from "framer-motion";
import { Home, Dumbbell, LayoutDashboard, User, LucideIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { INavItem } from "../../shared/AppBar";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  home: Home,
  dumbbell: Dumbbell,
  layoutdashboard: LayoutDashboard,
  user: User,
};



export default function AppBarContent({ navItems }: { navItems: INavItem[] }) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="fixed inset-x-0 bottom-0 z-50 p-4"
    >
      <nav
        className={cn(
          "relative h-16 mx-auto max-w-sm",
          "flex items-center justify-around",
          "bg-card/95 backdrop-blur-xl",
          "border border-primary/20 rounded-2xl",
          "shadow-[0_0_30px_hsl(var(--primary)/0.1)]"
        )}
      >
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = iconMap[item.icon.toLowerCase()] || Home;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full py-2"
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="nav-active-bg"
                  className="absolute inset-2 rounded-xl bg-primary/10 border border-primary/25"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{ scale: isActive ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-all duration-200",
                    isActive
                      ? "text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.7)]"
                      : "text-muted-foreground"
                  )}
                />
              </motion.div>

          

         
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}