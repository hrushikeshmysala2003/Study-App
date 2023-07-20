const app = require("./app")
const connectDB = require("./config/database");
const cloudinary = require("cloudinary");
const Razorpay = require("razorpay");
const catchAsyncError = require("./middlewares/catchAsyncErrors");

connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
})

// const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET,
// });


// console.log(instance.subscriptions);
// module.exports = { instance, createSubscription }

app.listen(process.env.PORT, () => {
    console.log(`Server id working on port: ${process.env.PORT}`);
})


