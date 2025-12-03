// "use client";

import WorkoutExerciseDialog from "@/src/components/modules/workout/dialogs/Workout-Exercise-Dialog";
import WorkoutDayDialog from "@/src/components/modules/workout/dialogs/WorkoutDayDialog";
import { getAllWorkoutPlans } from "@/src/services/workout/workout.service";

// import { PlanDialog } from "@/src/components/modules/workout/workout-plans-dialog";
// import { Button } from "@/src/components/ui/button";
// import React from "react";

const MyWorkout = async () => {

const data = await getAllWorkoutPlans()
console.log(data)
    
// const [open, setOpen] = React.useState(false);
//   const [mode, setMode] = React.useState<"create" | "update">("create");
//   const [editingData, setEditingData] = React.useState<Partial<PlanForm> | undefined>(undefined);

//   const openCreate = () => {
//     setEditingData(undefined);
//     setMode("create");
//     setOpen(true);
//   };

//   const openUpdate = () => {
//     setEditingData({
//       name: "Updated Plan Name",
//       description: "New description",
//       endDate: "2024-12-31T00:00:00.000Z",
//     });
//     setMode("update");
//     setOpen(true);
//   };









    return (
      <div className="p-6">
      <h1 className="text-2xl font-semibold">Plan Dialog Demo</h1>

      {/* <div className="mt-6 flex gap-3">
        <Button onClick={openCreate}>Create Plan</Button>
        <Button variant="ghost" onClick={openUpdate}>Open Update Example</Button>
      </div> */}

<WorkoutDayDialog/>
<WorkoutExerciseDialog/>
      {/* <PlanDialog open={open} onOpenChange={setOpen} mode={mode} initialData={editingData} /> */}
    </div>
    );
};

export default MyWorkout;