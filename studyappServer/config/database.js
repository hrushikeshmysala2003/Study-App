const mongoose = require("mongoose");

// const connectDB = async () => {
//     const connection = await mongoose.connect(process.env.MONGO_URI)
//     console.log(`MongoDB connected with ${connection.host}`);
// } 

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/study_app")
    .then( () => {
        console.log("Connecting to database is sucessful");
    } )
    .catch( (err) => {
        console.log(err);
    } )
}



module.exports = connectDB;