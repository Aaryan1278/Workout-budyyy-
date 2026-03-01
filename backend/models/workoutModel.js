const mongoose = require('mongoose')

const Schema = mongoose.Schema;

/**
 * Workout Schema
 * Defines the structure of a workout document in MongoDB
 */
const workoutSchema = new Schema({
    title:{
        type: String,
        required:true,
        description: 'Name/title of the exercise'
    },
    reps:{
        type:Number,
        required:true,
        description: 'Number of repetitions'
    },
    load:{
        type:Number,
        required:true,
        description: 'Weight/load in kilograms'
    }
},
{
    // Automatically add createdAt and updatedAt timestamps
    timestamps:true
}
)

// Create and export the Workout model
module.exports = mongoose.model('workout',workoutSchema)
