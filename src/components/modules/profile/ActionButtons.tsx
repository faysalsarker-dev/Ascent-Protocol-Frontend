import { motion } from "framer-motion";
import { Key, LogOut, Shield, AlertTriangle } from "lucide-react";
import { toast } from "@/src/hooks/use-toast";
import { LogoutDialog } from "../../shared/LogoutDialog";
import { useState } from "react";

interface ActionButtonsProps {
  onChangePassword: () => void;
}

export const ActionButtons = ({ onChangePassword }: ActionButtonsProps) => {
    const [logoutDialog, setLogoutDialog] = useState(false);

  const handleLogout = () => {
    toast({
      title: "◆ System Notice ◆",
      description: "Hunter has disconnected from the system.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="px-4 mt-8 pb-8 space-y-3"
    >
      {/* Security Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-linear-to-r from-destructive/50 to-transparent" />
        <h2 className="font-display text-sm tracking-[0.2em] text-destructive flex items-center gap-2">
          <Shield className="w-4 h-4" />
          SECURITY
        </h2>
        <div className="flex-1 h-px bg-linear-to-l from-destructive/50 to-transparent" />
      </div>

      {/* Change Password Button */}
      <motion.button
        whileHover={{ scale: 1.01, x: 4 }}
        whileTap={{ scale: 0.99 }}
        onClick={onChangePassword}
        className="w-full  bg-muted/30 p-2 rounded-lg flex items-center gap-4 group h-20"
      >
        <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors">
          <Key className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-display text-sm tracking-wider text-foreground">
            Change Password
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Update security credentials
          </p>
        </div>
      </motion.button>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.01, x: 4 }}
        whileTap={{ scale: 0.99 }}
        onClick={()=>setLogoutDialog(true)}
        className="w-full  p-2 rounded-lg flex items-center gap-4 group h-20 bg-muted/30"
      >
        <div className="w-12 h-12 rounded-lg  border border-destructive/30 flex items-center justify-center group-hover:border-destructive/60 transition-colors">
          <LogOut className="w-5 h-5 text-destructive" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-display text-sm tracking-wider text-destructive">
            Logout
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Disconnect from system
          </p>
        </div>
        <AlertTriangle className="w-4 h-4 text-destructive opacity-50" />
      </motion.button>

      {/* System footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="pt-6 text-center"
      >
        <p className="font-mono text-[10px] text-muted-foreground/50 tracking-wider">
          ◆ HUNTER ASSOCIATION SYSTEM v2.1.0 ◆
        </p>
      </motion.div>


      <LogoutDialog
       open={logoutDialog} onOpenChange={setLogoutDialog} />


    </motion.div>
  );
};
