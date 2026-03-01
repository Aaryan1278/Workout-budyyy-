const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

//signup user
const signupUser = async(req,res)=>{
    const {email, password} = req.body
    const trimmedEmail = email?.trim().toLowerCase()
    
    try{
        // Validate email format
        if(!trimmedEmail || !validator.isEmail(trimmedEmail)){
            return res.status(400).json({error:'Please provide a valid email address'})
        }
        
        // Validate password
        if(!password || password.length < 6){
            return res.status(400).json({error:'Password must be at least 6 characters long'})
        }
        
        // Check if user already exists
        const userExists = await User.findOne({email: trimmedEmail})
        if(userExists){
            return res.status(400).json({error:'Email already exists'})
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        // Create new user
        const user = await User.create({
            email: trimmedEmail,
            password: hashedPassword
        })
        
        // Create JWT token
        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.status(200).json({email: trimmedEmail, token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    const trimmedEmail = email?.trim().toLowerCase()

    try {
        if (!trimmedEmail || !validator.isEmail(trimmedEmail)) {
            return res.status(400).json({ error: 'Please provide a valid email address' })
        }

        const user = await User.findOne({ email: trimmedEmail })
        if (!user) return res.status(400).json({ error: 'Invalid email' })

        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(400).json({ error: 'Invalid password' })

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })

        return res.status(200).json({ email: trimmedEmail, token })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser
}
