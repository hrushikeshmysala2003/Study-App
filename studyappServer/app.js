const express = require("express");
const app = express();
const dotenv = require("dotenv")

dotenv.config({path: "./config/config.env"})
// Importing  and using Routes
const course = require("./routes/courseRoutes");
const user = require("./routes/userRoutes");
const ErrorMiddlerware = require("./middlewares/Error");
app.use("/api/v1", course);
app.use("/api/v1", user);




app.use(ErrorMiddlerware);

module.exports = app