import { useState } from "react";

import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { LogoutDialog } from "@/src/components/shared/LogoutDialog";
import { LogIn, UserPlus, LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";

interface UserData {
  name?: string;
  avatar?: string;
  role?: string;
  email?: string;
}

interface NavActionProps {
  user: UserData | null;
}

const NavAction = ({ user }: NavActionProps) => {
  const dashboardLink = user?.role === "admin" ? "/admin" : "/dashboard";
  const [logoutDialog, setLogoutDialog] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative outline-none focus:outline-none"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity" />
                <Avatar className="h-10 w-10 cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all duration-300">
                  <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold uppercase">
                    {user?.name?.slice(0, 2) || "US"}
                  </AvatarFallback>
                </Avatar>
              </motion.button>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
              className="w-56 mt-2 glass-strong border-border/30 p-2"
              align="end"
              sideOffset={8}
            >
              {/* User info header */}
              <div className="px-3 py-2 mb-2">
                <p className="text-sm font-medium text-foreground">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
              </div>
              
              <DropdownMenuSeparator className="bg-border/30" />
              
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg hover:bg-secondary/50 focus:bg-secondary/50">
                <Link href={dashboardLink} className="flex items-center gap-3 py-2">
                  <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer rounded-lg hover:bg-secondary/50 focus:bg-secondary/50">
                <Link href="/profile" className="flex items-center gap-3 py-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>

            

              <DropdownMenuSeparator className="bg-border/30" />

              <DropdownMenuItem
                onClick={() => setLogoutDialog(true)}
                className="cursor-pointer rounded-lg hover:bg-destructive/10 focus:bg-destructive/10 text-destructive"
              >
                <div className="flex items-center gap-3 py-2">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <LogoutDialog open={logoutDialog} onOpenChange={setLogoutDialog} />
        </>
      ) : (
        <div className="md:inline-block hidden">
          <div className="flex justify-center items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 btn-glow animate-pulse-glow"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavAction;
