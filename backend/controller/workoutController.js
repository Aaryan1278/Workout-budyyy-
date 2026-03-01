const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

/**
 * GET all workouts
 * Retrieves all workout documents from the database
 * Returns them sorted by most recent first
 */
exports.getWorkouts = async(req,res)=>{
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1})
        res.status(200).json({workouts})
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}


/**
 * GET a single workout by ID
 * Validates the provided ID format and retrieves the specific workout
 */
exports.getWorkout = async(req,res)=>{
    const {id} = req.params;

    // Validate MongoDB ObjectId format
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid workout ID"})
    }

    try {
        const workout = await Workout.findById(id);
        if(!workout) {
            return res.status(404).json({error:"Workout not found"})
        }
        res.status(200).json(workout)
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}

/**
 * POST create a new workout
 * Validates required fields and creates a new workout document
 */
exports.createWorkout = async(req,res)=>{
    const {title,load,reps} = req.body;

    // Validate that all required fields are provided
    let emptyFields = [];
    if(!title) emptyFields.push('title')
    if(!load) emptyFields.push('load')
    if(!reps) emptyFields.push('reps')
    
    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill out all the fields',emptyFields})
    }

    // Add the new workout to the database
    try{
        const workout = await Workout.create({title,load,reps})
        res.status(201).json(workout)    
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}


/**
 * DELETE a workout by ID
 * Removes the workout document from the database
 */
exports.deleteWorkout = async(req,res)=>{
    const {id} = req.params;

    // Validate MongoDB ObjectId format
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid workout ID"})
    }

    try {
        const workout = await Workout.findOneAndDelete({_id:id})

        if(!workout){
            return res.status(404).json({error:"Workout not found"})
        }
        res.status(200).json(workout)
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}

/**
 * PATCH update a workout by ID
 * Updates specific fields of the workout document
 */
exports.updateWorkout = async(req,res)=>{
    const {id} = req.params;

    // Validate MongoDB ObjectId format
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid workout ID"})
    }

    try {
        // Find the workout and update with new data (new:true returns the updated document)
        const workout = await Workout.findOneAndUpdate(
            {_id:id},
            {...req.body},
            {new:true}
        )

        if(!workout){
            return res.status(404).json({error:"Workout not found"})
        }
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}