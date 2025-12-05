import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, Check } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from '@/src/components/ui/button';
import { useUpdateUser } from "@/src/hooks/useAuth";

interface EditDOBDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDOB: Date | null;
}

export const EditDOBDialog = ({
  open,
  onOpenChange,
  currentDOB,
}: EditDOBDialogProps) => {
  const [dob, setDob] = useState(
    currentDOB ? format(currentDOB, "yyyy-MM-dd") : ""
  );

    const updateUser = useUpdateUser();
  

const handleSave = () => {
  const date = dob ? new Date(dob).toISOString() : null;
  
  updateUser.mutate({ dateOfBirth: date }, {
    onSuccess: () => {
      onOpenChange(false);
    },
  });
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-3 border-primary/40 max-w-[90vw] sm:max-w-md  overflow-hidden">
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
                  UPDATE BIRTH DATA
                </DialogTitle>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Current Date</p>
                    <p className="font-display text-foreground">
                      {currentDOB ? format(currentDOB, "MMMM dd, yyyy") : "Not set"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Date of Birth
                  </Label>
                  <Input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="input-system h-12 text-foreground"
                    max={format(new Date(), "yyyy-MM-dd")}
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
