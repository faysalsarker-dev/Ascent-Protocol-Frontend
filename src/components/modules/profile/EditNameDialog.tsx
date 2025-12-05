import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, Check, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from '@/src/components/ui/button';
import { useUpdateUser } from "@/src/hooks/useAuth";

interface EditNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentName: string;
}

export const EditNameDialog = ({
  open,
  onOpenChange,
  currentName,
}: EditNameDialogProps) => {
    const safeName = currentName || "";       

  const [name, setName] = useState(safeName);
  const updateUser = useUpdateUser();

  const handleSave = () => {
    if (!name.trim()) return;

 
const userName = name.trim()
  

    updateUser.mutate({ name: userName }, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="system-window border-primary/40 max-w-[90vw] sm:max-w-md p-2 overflow-hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="system-header">
                <DialogTitle className="font-display text-sm tracking-widest text-center text-primary">
                  MODIFY HUNTER NAME
                </DialogTitle>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Current Name</p>
                    <p className="font-display text-foreground">{currentName}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    New Hunter Name
                  </Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter new name..."
                    className="input-system h-12 text-foreground"
                  />
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <AlertCircle className="w-3 h-3" />
                    Name will be visible to other hunters
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => onOpenChange(false)}
                    className="flex-1 btn-system py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Cancel</span>
                  </Button>

                  <Button
                    onClick={handleSave}
                    disabled={!name.trim()}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
