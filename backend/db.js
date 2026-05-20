const mongoose = require('mongoose');
const mongo_URI = "mongodb://localhost:27017/focus-tracker";

const dbConnection=async()=>{
    try {
        await mongoose.connect(mongo_URI);
        console.log("Database connected successfully.");
        
    } catch (error) {
        console.log("Database connection failed.");
        
    }
}

module.exports = dbConnection;