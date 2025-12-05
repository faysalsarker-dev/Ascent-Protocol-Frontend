import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Weight, X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useUpdateUser } from "@/src/hooks/useAuth";
import { Button } from '@/src/components/ui/button';

interface EditWeightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentWeight: number | null;
}

export const EditWeightDialog = ({
  open,
  onOpenChange,
  currentWeight,
}: EditWeightDialogProps) => {
  const [weight, setWeight] = useState(currentWeight?.toString() || "");
  const updateUser = useUpdateUser();

  const handleSave = () => {
    const weightNum = parseFloat(weight);

       updateUser.mutate({ weight: weightNum }, {
          onSuccess: () => {
            onOpenChange(false);
          },
        });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-3 border-secondary/40 max-w-[90vw] sm:max-w-md  overflow-hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="system-header" style={{ borderColor: "hsl(260, 80%, 55%, 0.3)" }}>
                <DialogTitle className="font-display text-sm tracking-widest text-center text-secondary">
                  UPDATE WEIGHT DATA
                </DialogTitle>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 border border-secondary/40 flex items-center justify-center">
                    <Weight className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Current Weight</p>
                    <p className="font-display text-foreground">
                      {currentWeight ? `${currentWeight} kg` : "Not set"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    New Weight (kg)
                  </Label>
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight..."
                    className="input-system h-12 text-foreground"
                    step="0.1"
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
