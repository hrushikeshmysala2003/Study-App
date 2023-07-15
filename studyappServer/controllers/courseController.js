const catchAsyncError = require("../middlewares/catchAsyncErrors");
const Course = require("../models/Course");
const ErrorHandler = require("../utils/ErrorHandler");


exports.getAllCourses = catchAsyncError(async (req, res, next) => {
    const courses = await Course.find().select("-lectures");
    res.status(200).json({
        success: true,
        courses
    })
})

exports.createCourse = catchAsyncError(async (req, res, next) => {
    const {title, description, category, createdBy} = req.body;
    if(!category || !description || !category || !createdBy){
        return next(new ErrorHandler("Please add all fields", 400))
    }
    // const file = req.file;



    await Course.create({
        title, description, category, createdBy, poster:{
            public_id: "temp",
            url: "url"
        }
    })
    res.status(201).json({
        success: true,
        message: "Course created SuccessFully. You can add lectures now"
    })
})


// addlecture , delete Course, Get course details


// Delete lecture