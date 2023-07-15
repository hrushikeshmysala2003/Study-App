const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/User")
exports.registerUser = catchAsyncError( async (req, res, next) => {
    const {name, email, password} = req.body;

    // const file = req.file 

    if(!name || !email || !password){
        next(new ErrorHandler("Please eter all fields", 400));
    }

    let user = await User.findOne({ email });

    if(user) return next(new ErrorHandler("User Already request", 409))

    // Upload file on cloudinary

    user = await User.create({
        name, 
        email, 
        password,
        avatar: {
            public_id: "temp",
            url: "temp"
        }
    });


    
} )