/* eslint-disable no-undef */
import express from 'express'
import searchRecipe from './recipe.js'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import User from './models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
dotenv.config() 

const app = express()
app.use(express.json())
app.use(cors())


app.get("/api/search", async (req, res) => {

    try {
        const searchTerm = req.query.meal 
        const Page = req.query.Page || 1
        const result = await searchRecipe(searchTerm, Page)

        if(!result || result.length === 0) {
            return res.status(404).json({
                message: "No recipes found"
            })
        }
    
        return(res.json({
            searchResults: result.searchResults,
            recipeDetails: result.recipeDetails
        }))
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

})

app.post('/api/register', async(req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        return res.status(401).json({
            success: false,
            message: "Please Enter all fields"
        })
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword =  await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save()
        return res.status(200).json({
            success: true,
            message: "Information Saved",
            user:{
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server Error"
        })
    }
})

app.post('/api/login', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    try {
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not Found"
            })
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
    
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY)
        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            user:{name: user.name},
            token
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

})
app.listen(5000, () => {
    console.log("Server is listening on port 5000")
    connectDB();
})
