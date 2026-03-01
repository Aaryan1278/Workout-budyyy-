import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";

/**
 * useWorkoutsContext Hook
 * Custom hook to access the workouts context
 * Must be used within a WorkoutsContextProvider
 */
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    // Throw error if hook is used outside of provider
    if(!context){
        throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
    }

    return context
}