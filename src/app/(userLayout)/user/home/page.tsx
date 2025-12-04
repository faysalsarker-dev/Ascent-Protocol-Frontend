"use client";
import TodoList from "@/src/components/modules/home/TodoList";
import TodayTask from "@/src/components/modules/today-task/TodayTask";
import { useTodayWorkoutDay } from "@/src/hooks/useWorkoutPlan";

const HomePage = () => {

    const { data, isLoading, isError } = useTodayWorkoutDay();

    console.log(data,'dataa')
    return (
        <div>
            
            <TodoList/>



            <TodayTask/>
        </div>
    );
};

export default HomePage;