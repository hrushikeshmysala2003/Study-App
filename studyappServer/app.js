const express = require("express");
const app = express();
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const Razorpay = require("razorpay");

dotenv.config({path: "./config/config.env"})
// Importing  and using Routes
const course = require("./routes/courseRoutes");
const user = require("./routes/userRoutes");
const payment = require("./routes/paymentRoute");
const ErrorMiddlerware = require("./middlewares/Error");
// const { instance } = require("./server");
const others = require("./routes/otherRoutes");
const cors = require("cors");
// cors : Cross Origin Resource sharing
// browser security feature 
// restricts different origin HTTP requests


// Using middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(express.urlencoded({
    extended: true
}))

app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", others);
app.use("/api/v1", payment);




app.use(ErrorMiddlerware);

module.exports = app