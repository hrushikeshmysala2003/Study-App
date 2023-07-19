const app = require("./app")
const connectDB = require("./config/database");
const cloudinary = require("cloudinary");


connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
})
app.listen(process.env.PORT, () => {
    console.log(`Server id working on port: ${process.env.PORT}`);
})