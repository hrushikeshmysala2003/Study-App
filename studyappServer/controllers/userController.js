const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/User");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Course = require("../models/Course");

exports.registerUser = catchAsyncError( async (req, res, next) => {
    const {name, email, password} = req.body;

    // const file = req.file 

    if(!name || !email || !password){
        next(new ErrorHandler("Please enter all fields", 400));
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

    sendToken(res, user, "Registered SuccessFully", 201)
    
} )

exports.loginUser = catchAsyncError( async (req, res, next) => {
    const {email, password} = req.body;

    // const file = req.file 

    if(!email || !password){
        next(new ErrorHandler("Please enter all fields", 400));
    }

    const user = await User.findOne({ email }).select("+password")

    if(!user) return next(new ErrorHandler("Incorrect Email or Password", 401))

    // Upload file on cloudinary
    const isMatch = await user.comparePassword(password);

    if(!isMatch) return next(new ErrorHandler("Incorrect Email or Password", 401))


    sendToken(res, user, `Welcome back, ${user.name}`, 201)
    
} )

exports.logoutUser = catchAsyncError( async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        // secure: true,
        sameSite: "none",
    }).json({
        success: true,
        message: "Logged Out SuccessFully"
    })
} )

exports.getMyProfile = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
} )

exports.changePassword = catchAsyncError( async (req, res, next) => {
    const {oldPassword, newPassword} = req.body;

    if(!oldPassword || !newPassword){
        next(new ErrorHandler("Please enter all fields", 400));
    }


    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(oldPassword);

    if(!isMatch){
        return next(new ErrorHandler("Incorrect old password", 400));
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Password changed successfully",
    })
} )


exports.updateProfile = catchAsyncError( async (req, res, next) => {
    const {name, email} = req.body;

    const user = await User.findById(req.user._id);

    if(name) user.name=name;
    if(email) user.email=name;

    await user.save();
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
    })
} )

exports.updateProfilePicture = catchAsyncError( async (req, res, next) => {
    //  Cloudinary Todo
    res.status(200).json({
        success: true,
        message: "Profile Picture Updated Sucessfully"
    })
} )

exports.forgetPassword = catchAsyncError( async (req, res, next) => {
    const {email} = req.body;

    const user = await User.findOne({email});

    if(!user) return next(new ErrorHandler("No User with this email", 400))

    const resetToken = await user.getResetToken()

    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    // Send Token via email
    const message = `Click on the link to reset password ${url}. If u have not requested then please ignore`

    await sendEmail(user.email, "StudyApp Reset Password", message);


    res.status(200).json({
        success: true,
        message: `Reset Token has been sent to ${user.email}`
    })
} )

exports.resetPassword = catchAsyncError( async (req, res, next) => {
    //  Cloudinary Todo

    const {token} = req.params;

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now()
        }
    })

    if(!user) return next(new ErrorHandler("Reset Token is invalid or has been expired", 401))

    user.password=req.body.password;
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;

    await user.save();
    res.status(200).json({
        success: true,
        message: "Password changed Sucessfully"
    })
} )


exports.addToPlaylist = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.body.id);

    if(!course) return next(new ErrorHandler("Invalid Course id", 404));

    const itemExist = user.playlist?.find((item) => {
        if(item.course.toString() === course._id.toString()){
            return true;
        }
    })
    if(itemExist) return next(new ErrorHandler("Item Already exist", 409))

    user.playlist.push({
        course: course._id,
        poster: course.poster.url
    })

    await user.save();
    res.status(200).json({
        success: true,
        message: "Added to playlist Sucessfully",
        user
    })
} )

exports.removeFromPlaylist = catchAsyncError( async (req, res, next) => {

    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.query.id);
    if(!course) return next(new ErrorHandler("Invalid Course id", 404));

   const newPlaylist = user.playlist.filter(item => {
    if(item.course.toString() !== course._id.toString()) return item;
   });

   user.playlist = newPlaylist;

    await user.save();
    res.status(200).json({
        success: true,
        message: "Removed from playlist Sucessfully",
        user
    })
} )