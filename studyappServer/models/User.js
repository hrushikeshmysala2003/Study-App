const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: [true, "Please enter your name"],

    },
    email : {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: validator.isEmail,
    },
    password : {
        type: String,
        required: [true, "Please enter your password"],
        minLemgth: [6, "Password must be atleast 6 characters"],
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    subscription: {
        id: String,
        status: String,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    playlist: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
            poster: String
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    ResetPasswordToken: String,
    ResetPasswordExpire: String,
})

module.exports = mongoose.model("User", userSchema);