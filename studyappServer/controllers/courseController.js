const catchAsyncError = require("../middlewares/catchAsyncErrors");
const Course = require("../models/Course");
const ErrorHandler = require("../utils/ErrorHandler");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary");

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
    const file = req.file;
    // console.log(file);

    const fileUri = getDataUri(file)
    // console.log(fileUri);

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    await Course.create({
        title, description, category, createdBy, poster:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    })
    res.status(201).json({
        success: true,
        message: "Course created SuccessFully. You can add lectures now"
    })
})


// addlecture , delete Course, Get course details
exports.getCourseLectures = catchAsyncError(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    
    if(!course) return next(new ErrorHandler("Course not found", 404));

    course.views+=1;

    await course.save();

    res.status(200).json({
        success: true,
        lectures: course.lectures,
    })
})

exports.addLecture = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const {title, description} = req.body;

    // const file = req.file 

    const course = await Course.findById(req.params.id);
    
    if(!course) return next(new ErrorHandler("Course not found", 404));

    // upload File here

    course.lectures.push({
        title, description, 
        video: {
            public_id: "url",
            url: "url"
        }
    })

    course.numOfVideos = course.lectures.length;
    await course.save();

    res.status(200).json({
        success: true,
        lectures: course.lectures,
        message: "Lecture add In Course"
    })
})

// Delete lecture