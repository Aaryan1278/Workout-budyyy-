import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { formatTimeAgo } from '../utils/formatDate'

/**
 * WorkoutDetail Component
 * Displays a single workout card with exercise details
 * Includes delete functionality and human-readable timestamps
 */
const WorkoutDetail = ({workout}) => {

  // Get dispatch from context to update workout list
  const {dispatch} = useWorkoutsContext();

  // Handle deletion of a workout
  const handleClick = async() =>{
    try {
      const response = await fetch('/api/workouts/'+ workout._id,{
        method:'DELETE'
      })

      const json = await response.json()
      
      if(response.ok){
        dispatch({type:'DELETE_WORKOUT',payload:json})
      } else {
        console.error('Failed to delete workout')
      }
    } catch(err) {
      console.error('Error deleting workout:', err)
    }
  }

  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (in kgs):</strong>{workout.load}</p>
        <p><strong>Reps:</strong>{workout.reps}</p>
        <p>{formatTimeAgo(workout.createdAt)}</p>
        <span onClick={handleClick}>×</span>
    </div>
  )
}

export default WorkoutDetail