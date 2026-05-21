const mongoose = require("mongoose");
const DB_URI = process.env.MONGO_URI
const connectDB = async ()=>{
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB connected — Machanic_Dost_DB ready")
    } catch (error) {
    console.error("MongoDB connection failed:", error.message)
    process.exit(1)
    }
}

module.exports = connectDB;