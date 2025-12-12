"use client";

import { usePreWorkout } from "@/src/hooks/useChat";
import { SystemMessage } from "../today-task/SystemMessage";

const PreMsg = () => {
  const { data, isLoading, isError } = usePreWorkout();

  if (isLoading) return <p>Loading pre-workout suggestion...</p>;
  if (isError) return <p>Error loading pre-workout suggestion.</p>;
console.log(data);
  return (
    <div>
      {/* data from hook is already the AI message */}
      <SystemMessage message={data?.data?.data?.content} />
    </div>
  );
};

export default PreMsg;
