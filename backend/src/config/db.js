const mongoose = require("mongoose");
const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/blogSiteData")
        console.log('Connected to MongoDB Database');
    }catch (err){
        console.log('Mongo Connection Err' + err);
    }
}

module.exports = connectDB;