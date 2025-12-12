import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useState } from "react";
import { AdminUser } from "./types";

interface UserEditDialogProps {
  user: AdminUser | null;
  onClose: () => void;
}

export function UserEditDialog({ user, onClose }: UserEditDialogProps) {
  if (!user) return null;

  // 🔥 Keyed remount → resets state *every time modal opens*
  return <EditForm key={user.id} user={user} onClose={onClose} />;
}

function EditForm({
  user,
  onClose,
}: {
  user: AdminUser;
  onClose: () => void;
}) {
  const [isVerified, setIsVerified] = useState(user.isVerified);
  const [status, setStatus] = useState<AdminUser["status"]>(user.status);

  const handleSave = () => {
    console.log("Update user:", {
      userId: user.id,
      isVerified,
      status,
    });

    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User: {user.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="verified" className="flex flex-col gap-1">
              <span>Verified</span>
              <span className="text-sm text-muted-foreground font-normal">
                Mark user as verified
              </span>
            </Label>

            <Switch
              id="verified"
              checked={isVerified}
              onCheckedChange={setIsVerified}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>

            <Select
              value={status}
              onValueChange={(v) => setStatus(v as AdminUser["status"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
