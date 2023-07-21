const app = require("./app")
const connectDB = require("./config/database");
const cloudinary = require("cloudinary");
const Razorpay = require("razorpay");
const catchAsyncError = require("./middlewares/catchAsyncErrors");
const nodecron = require("node-cron");
const Stats = require("./models/Stats");

connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
})

const temp = async () => {
    await Stats.create({});
}
// temp();
nodecron.schedule("0 0 0 1 * *", async () => {
    try{
        temp();
    }catch(error){
        console.log(error);
    }

})

app.listen(process.env.PORT, () => {
    console.log(`Server id working on port: ${process.env.PORT}`);
})


