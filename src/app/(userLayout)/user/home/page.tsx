"use client";
import TodoList from "@/src/components/modules/home/TodoList";
import { useTodayWorkoutDay } from "@/src/hooks/useWorkoutPlan";

const HomePage = () => {

    const { data, isLoading, isError } = useTodayWorkoutDay();

    console.log(data,'dataa')
    return (
        <div>
            
            <TodoList/>
        </div>
    );
};

export default HomePage;