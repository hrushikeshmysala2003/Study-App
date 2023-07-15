const catchAsyncError = require("../middlewares/catchAsyncErrors");
const Course = require("../models/Course");


exports.getAllCourses = catchAsyncError(async (req, res, next) => {
    const courses = await Course.find();
    res.status(200).json({
        success: true,
        courses
    })
})