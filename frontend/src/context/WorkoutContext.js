const {createContext,useReducer} = require("react");

/**
 * WorkoutsContext
 * Global context for managing workout state across the application
 */
export const WorkoutsContext = createContext();

/**
 * Workout Reducer
 * Handles all workout-related state updates
 */
export const workoutsReducer = (state,action)=>{
    switch(action.type){
        case 'SET_WORKOUTS':
            // Initialize or refresh the entire workouts list from API
            return {
                workouts:action.payload
            }
        case 'CREATE_WORKOUT':
            // Add new workout to the beginning of the list
            return {
                workouts:[action.payload,...state.workouts]
            }
        case 'DELETE_WORKOUT':
            // Remove workout by ID from the list
            return {
                workouts : state.workouts.filter((each) => each._id !== action.payload._id)
            }
        default:
            return state
    }
}    

/**
 * WorkoutsContextProvider
 * Wraps application with workout state management
 * Must be placed at the top level of the app
 */
export const WorkoutsContextProvider = ({children}) => {
    // Initialize reducer with empty workouts array
    const [state,dispatch] = useReducer(workoutsReducer,{
        workouts:null
    })
    
    return (
        <WorkoutsContext.Provider value={{...state,dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}