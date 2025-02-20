/* eslint-disable no-undef */
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }

}
export default connectDB;