// import React, { useEffect, useState } from 'react'
import React, { useEffect} from 'react'

// Component imports
import WorkoutDetail from '../components/WorkoutDetail'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

/**
 * Home Page Component
 * Displays the main workout tracker interface
 * Fetches workouts from the API and renders them alongside the add form
 */
const Home = () => {
    // Get workouts and dispatch from global context
    const {workouts,dispatch} = useWorkoutsContext()

    // Fetch workouts on component mount
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('/api/workouts/')
                const json = await response.json()

                if (response.ok) {
                    // Backend returns { workouts: [...] }
                    dispatch({ type: 'SET_WORKOUTS', payload: json.workouts })
                } else {
                    console.error('Failed to fetch workouts:', json)
                }
            } catch (err) {
                console.error('Network error fetching workouts:', err)
            }
        }
        fetchWorkouts()
    }, [dispatch])
    return (
      <div className='home'>
        <div className='workouts'>
            {
                workouts && workouts.map((workout) => (
                    <WorkoutDetail key={workout._id} workout={workout} />
                ))
            }
        </div>
        <WorkoutForm/>
      </div>
    )
}

export default Home