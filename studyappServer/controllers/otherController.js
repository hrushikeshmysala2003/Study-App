const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendEmail = require("../utils/sendEmail");


exports.contact = catchAsyncError( async (req, res, next) => {
    const {name, email, message} = req.body;

    if(!name || !email || !message) return next(new ErrorHandler("All fields are mandatory", 400))
    const to = process.env.MY_MAIL;
    const subject = "Contact from courseBundler";
    const text = `I am ${name} and my Email is ${email}. \n ${message}`

    await sendEmail(to, subject, text);
    res.status(200).json({
        success: true,
        message: "Your message has been sent"
    })
} )

exports.courseRequest = catchAsyncError( async (req, res, next) => {
    const {name, email, course} = req.body;

    if(!name || !email || !course) return next(new ErrorHandler("All fields are mandatory", 400))
    const to = process.env.MY_MAIL;
    const subject = "Requesting a course on a StudyApp";
    const text = `I am ${name} and my Email is ${email}. \n ${course}`

    await sendEmail(to, subject, text);
    res.status(200).json({
        success: true,
        message: "Your request has been sent"
    })
} )

exports.getDashBoardStats = catchAsyncError( async (req, res, next) => {
    res.status(200).json({
        success: true,
    })
} )