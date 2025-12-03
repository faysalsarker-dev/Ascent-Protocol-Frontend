

import { createContext, useContext, useReducer, ReactNode } from "react";
import { PlannedExercise, WorkoutBuilderState, WorkoutDay, WorkoutPlan } from "../types/workout.types";

type WorkoutBuilderAction =
  | { type: "SET_PLAN"; payload: WorkoutPlan }
  | { type: "SET_DAYS"; payload: WorkoutDay[] }
  | { type: "ADD_DAY"; payload: WorkoutDay }
  | { type: "SET_EXERCISES"; payload: Record<string, PlannedExercise[]> }
  | { type: "ADD_EXERCISE"; payload: { dayId: string; exercise: PlannedExercise } }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET" };

interface WorkoutBuilderContextType {
  state: WorkoutBuilderState;
  dispatch: React.Dispatch<WorkoutBuilderAction>;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setPlan: (plan: WorkoutPlan) => void;
  addDay: (day: WorkoutDay) => void;
  setDays: (days: WorkoutDay[]) => void;
  addExercise: (dayId: string, exercise: PlannedExercise) => void;
  reset: () => void;
}

const WorkoutBuilderContext = createContext<WorkoutBuilderContextType | null>(null);

const initialState: WorkoutBuilderState = {
  currentStep: 1,
  workoutPlan: null,
  workoutDays: [],
  exercises: {},
};

function workoutBuilderReducer(
  state: WorkoutBuilderState,
  action: WorkoutBuilderAction
): WorkoutBuilderState {
  switch (action.type) {
    case "SET_PLAN":
      return { ...state, workoutPlan: action.payload };
    case "SET_DAYS":
      return { ...state, workoutDays: action.payload };
    case "ADD_DAY":
      return {
        ...state,
        workoutDays: [...state.workoutDays, action.payload],
      };
    case "SET_EXERCISES":
      return { ...state, exercises: action.payload };
    case "ADD_EXERCISE":
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.payload.dayId]: [
            ...(state.exercises[action.payload.dayId] || []),
            action.payload.exercise,
          ],
        },
      };
    case "NEXT_STEP":
      return { ...state, currentStep: state.currentStep + 1 };
    case "PREV_STEP":
      return { ...state, currentStep: Math.max(1, state.currentStep - 1) };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function WorkoutBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(workoutBuilderReducer, initialState);

  const contextValue: WorkoutBuilderContextType = {
    state,
    dispatch,
    goToNextStep: () => dispatch({ type: "NEXT_STEP" }),
    goToPreviousStep: () => dispatch({ type: "PREV_STEP" }),
    setPlan: (plan) => dispatch({ type: "SET_PLAN", payload: plan }),
    addDay: (day) => dispatch({ type: "ADD_DAY", payload: day }),
    setDays: (days) => dispatch({ type: "SET_DAYS", payload: days }),
    addExercise: (dayId, exercise) =>
      dispatch({ type: "ADD_EXERCISE", payload: { dayId, exercise } }),
    reset: () => dispatch({ type: "RESET" }),
  };

  return (
    <WorkoutBuilderContext.Provider value={contextValue}>
      {children}
    </WorkoutBuilderContext.Provider>
  );
}

export function useWorkoutBuilder() {
  const context = useContext(WorkoutBuilderContext);
  if (!context) {
    throw new Error("useWorkoutBuilder must be used within WorkoutBuilderProvider");
  }
  return context;
}