const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
        lowercase:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
    }
})

module.exports = mongoose.model('User',userSchema)