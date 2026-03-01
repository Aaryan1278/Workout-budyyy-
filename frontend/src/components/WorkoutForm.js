import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

/**
 * WorkoutForm Component
 * Form for adding new workouts to the application
 * Handles validation and submission of workout data
 */
const  WorkoutForm = ()=>{
    // Get dispatch from context to update global workout state
    const {dispatch} = useWorkoutsContext()
    
    // Local state for form fields
    const [title,setTitle] = useState('')
    const [load,setLoad] = useState('')
    const [reps,setReps] = useState('')
    const [error,setError] = useState(null)
    const [emptyFields,setEmptyFields] = useState([])

    // Handle form submission
    const handleSubmit = async(e) => {
      e.preventDefault()
      const workout = {title,load,reps}
      
      try {
        const response = await fetch('/api/workouts',{
          method:'POST',
          body:JSON.stringify(workout),
          headers:{
            'Content-Type':'application/json'
          }
        })
        const json = await response.json();

        if(!response.ok){
          setError(json.error)
          setEmptyFields(json.emptyFields)
        }
        else{
          // Clear form on successful submission
          setError(null);
          setLoad('')
          setTitle('')
          setReps('')
          setEmptyFields([])
          // Update global workout list
          dispatch({type:'CREATE_WORKOUT',payload: json})
        }
      } catch(err) {
        setError('Failed to create workout')
      }
    }
  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excerise Title</label>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}
      className={emptyFields.includes('title') ? 'error' : ''}/>

      <label>Load(in kg's):</label>
      <input type='number' value={load} onChange={(e) => setLoad(e.target.value)}
      className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps</label>
      <input type='number' value={reps} onChange={(e) => setReps(e.target.value)}
      className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}

    </form>
  )
}

export default WorkoutForm