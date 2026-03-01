const express = require('express');
const { createWorkout, getWorkouts,getWorkout, deleteWorkout, updateWorkout } = require('../controller/workoutController');

const router = express.Router()

/**
 * GET /api/workouts
 * Retrieves all workouts from the database
 * Returns them sorted by most recent first
 */
router.get('/', getWorkouts)

/**
 * GET /api/workouts/:id
 * Retrieves a single workout by its ID
 * Params: id (MongoDB ObjectId)
 */
router.get('/:id',getWorkout)

/**
 * POST /api/workouts
 * Creates a new workout with title, load, and reps
 * Validates that all fields are provided
 */
router.post('/',createWorkout)

/**
 * DELETE /api/workouts/:id
 * Deletes a workout by its ID
 * Params: id (MongoDB ObjectId)
 */
router.delete('/:id',deleteWorkout)

/**
 * PATCH /api/workouts/:id
 * Updates a workout's fields (partial update)
 * Params: id (MongoDB ObjectId)
 */
router.patch('/:id',updateWorkout)


module.exports = router