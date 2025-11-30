'use client';
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface AddExerciseDialogProps {
  day: string;
  onAdd: (exercise: any) => void;
}

const MUSCLE_GROUPS = [
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Legs",
  "Abs",
  "Cardio",
];

export const AddExerciseDialog = ({ day, onAdd }: AddExerciseDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    muscle: "",
    sets: "",
    reps: "",
    weight: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.muscle || !formData.sets || !formData.reps) {
      toast.error("Please fill in all required fields");
      return;
    }

    onAdd({
      name: formData.name,
      muscle: formData.muscle,
      sets: parseInt(formData.sets),
      reps: formData.reps,
      weight: formData.weight || "BW",
    });

    toast.success(`${formData.name} added to ${day}!`);
    
    setFormData({
      name: "",
      muscle: "",
      sets: "",
      reps: "",
      weight: "",
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Exercise to {day}</DialogTitle>
          <DialogDescription>
            Create a new exercise for your workout routine. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Exercise Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Bench Press"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="muscle">Muscle Group *</Label>
              <Select
                value={formData.muscle}
                onValueChange={(value) => setFormData({ ...formData, muscle: value })}
              >
                <SelectTrigger id="muscle">
                  <SelectValue placeholder="Select muscle group" />
                </SelectTrigger>
                <SelectContent>
                  {MUSCLE_GROUPS.map((muscle) => (
                    <SelectItem key={muscle} value={muscle}>
                      {muscle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sets">Sets *</Label>
                <Input
                  id="sets"
                  type="number"
                  min="1"
                  placeholder="3"
                  value={formData.sets}
                  onChange={(e) => setFormData({ ...formData, sets: e.target.value })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="reps">Reps *</Label>
                <Input
                  id="reps"
                  placeholder="8-12"
                  value={formData.reps}
                  onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  placeholder="80kg"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Exercise</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
