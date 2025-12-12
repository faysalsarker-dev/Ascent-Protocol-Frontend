import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useUpdateUser } from "@/src/hooks/useAuth";
import { Button } from '@/src/components/ui/button';

interface EditHeightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentHeight: number | null;
}

export const EditHeightDialog = ({
  open,
  onOpenChange,
  currentHeight,
}: EditHeightDialogProps) => {
  const [height, setHeight] = useState(currentHeight?.toString() || "");
  const updateUser = useUpdateUser();

  const handleSave = () => {
    const heightNum = parseFloat(height);

    updateUser.mutate({ height: heightNum }, {
          onSuccess: () => {
            onOpenChange(false);
          },
        });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-3 border-accent/40 max-w-[90vw] sm:max-w-md  overflow-hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="system-header" style={{ borderColor: "hsl(280, 90%, 60%, 0.3)" }}>
                <DialogTitle className="text-sm tracking-widest text-center text-foreground">
                  UPDATE HEIGHT DATA
                </DialogTitle>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 border border-secondary/40 flex items-center justify-center">
                    <Ruler className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Current Height</p>
                    <p className="font-display text-foreground">
                      {currentHeight ? `${currentHeight} cm` : "Not set"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    New Height (cm)
                  </Label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter height..."
                    className="input-system h-12 text-foreground"
                    step="1"
                    min="0"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                   variant={'outline'}
                    onClick={() => onOpenChange(false)}
                    className="flex-1  flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Cancel</span>
                  </Button>
                  <Button
                  
                    onClick={handleSave}
                    className="flex-1  flex items-center justify-center gap-2"
                 
                  >
                    <Check className="w-4 h-4 " />
                    <span >Confirm</span>
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
