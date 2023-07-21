const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Stats = require("../models/Stats");
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
        id: {
            type: String,
        },
        status: {
            type: String,
        },
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
    resetPasswordToken: String,
    resetPasswordExpire: String,
})



userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    })
}

userSchema.methods.comparePassword = async function (userpassword) {
    
    // console.log(this.password);
    return await bcrypt.compare(userpassword, this.password);
}

userSchema.methods.getResetToken =  function (){
    const resetToken =  crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken =  crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}


module.exports = mongoose.model("User", userSchema);