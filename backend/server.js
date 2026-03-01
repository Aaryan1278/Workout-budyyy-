// Import required packages
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//Routes
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

// Load environment variables from .env file
dotenv.config()

// Initialize Express application
const app = express()

// Middleware setup
// Parse incoming JSON request bodies
app.use(express.json())

// Custom logging middleware to track all incoming requests
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path}`)
    next()
})

// Simple health check endpoint
app.get('/',(req,res)=>{
    res.json({msg:"Welcome to Workout Tracker API"})
})

app.use('/api/workouts',workoutRoutes)
app.use('/api/users',userRoutes)

// Get port from environment variables or use default port 4000
const PORT = process.env.PORT || 4000;

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    // Once DB connection is successful, start the Express server
    app.listen(PORT,()=>{
        console.log(`✓ Server is running at http://localhost:${PORT}`);
        console.log('✓ Connected to MongoDB database');
    })
})
.catch((error)=>{
    console.error('✗ Database connection failed:', error.message)
    process.exit(1)
})


