const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
exports.isAuthenticated = catchAsyncError( async (req, res, next) => {
    const {token} = req.cookies;

    if(!token) return next(new ErrorHandler("Please Login to access this resource", 401));


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user =  await User.findById(decoded._id);

    next();
} )

exports.authorizeAdmin = (req, res, next) => {
    if(req.user.role !== "admin"){
        return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource`, 403));
    }

    next();
}

