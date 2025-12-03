"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import WorkoutCard from "./WorkoutCard";
import { NeonCircularProgress } from "../../ui/animated-circular-progress-bar";

const TodoList = () => {
  return (
    <div
      className="
      min-h-screen w-full px-4 py-6
      bg-linear-to-b from-[#0b0a10] via-[#14131b] to-[#0f0e15]
      flex flex-col gap-8
      "
    >
      {/* TOP CIRCLE */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <NeonCircularProgress value={124} max={180} />
      </div>

      {/* ACTION CARD */}
    

      {/* MAIN CARD */}
      <Card
        className="
        w-full rounded-3xl
        bg-[#1a1822]/70 backdrop-blur-xl
        border border-white/10
        shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        "
      >
        <CardHeader>
          <CardTitle className="text-white tracking-wide">
            Recent Workouts
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <WorkoutCard  />
            <WorkoutCard  />
            <WorkoutCard  />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoList;
