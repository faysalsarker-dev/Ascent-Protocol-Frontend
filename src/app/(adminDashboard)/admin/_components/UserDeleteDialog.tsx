import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { AdminUser } from "./types";
import { useDeleteUser } from "@/src/hooks/useAdmin";
import { toast } from "sonner";

interface UserDeleteDialogProps {
  user: AdminUser | null;
  onClose: () => void;
}

export function UserDeleteDialog({ user, onClose }: UserDeleteDialogProps) {


const { mutate, isPending } = useDeleteUser();

const handleDelete = () => {
  if(!user){
    return       toast.error("user id not found");

  }
  mutate(user?.id, {
    onSuccess: () => {
      toast.success("Delete successful!");
      onClose();
    },
  });
};


  return (
    <AlertDialog open={!!user} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong>{user?.name}</strong> ({user?.email}). 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
