const catchAsyncError = require("../middlewares/catchAsyncErrors");
const Course = require("../models/Course");
const ErrorHandler = require("../utils/ErrorHandler");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary");
const Stats = require("../models/Stats")
exports.getAllCourses = catchAsyncError(async (req, res, next) => {
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";


    const courses = await Course.find({
        title: {
            $regex: keyword,
            $options: "i",
        },
        category: {
            $regex: category,
            $options: "i",
        }
    }).select("-lectures");
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
    const file = req.file;
    // console.log(file);

    const fileUri = getDataUri(file)
    // console.log(fileUri);

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
        resource_type: "video",
    });

    course.lectures.push({
        title, description, 
        video: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
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

exports.deleteCourse = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const course = await Course.findById(req.params.id);
    
    if(!course) return next(new ErrorHandler("Course not found", 404));

    console.log(course);
    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    for(let i=0; i< course.lectures.length; i++){
        const singleLecture = course.lectures[i];

        await cloudinary.v2.uploader.destroy(singleLecture.video.public_id,{
            resource_type: "video",
        });
    }

    await Course.deleteOne(course);

    res.status(200).json({
        success: true,
        message: "Course deleted Successfully"
    })
})

// Delete lecture

exports.deleteLecture = catchAsyncError(async (req, res, next) => {
    const {courseId, lectureId} = req.query;


    const course = await Course.findById(courseId);
    
    if(!course) return next(new ErrorHandler("Course not found", 404));

    const lecture = course.lectures.find( item => {
        if(item._id.toString() === lectureId.toString() ) return item;
    } )

    // console.log(lecture);
    await cloudinary.v2.uploader.destroy(lecture.video.public_id ,{
        resource_type: "video",
    });

    course.lectures = course.lectures.filter( item => {
        if(item._id.toString() !== lectureId.toString() ) return item;
    } )
    
    course.numOfVideos = course.lectures.length;
    await course.save();

    res.status(200).json({
        success: true,
        message: "Lecture deleted Successfully"
    })
})

Course.watch().on("change", async () => {
    const stats = await Stats.find({}).sort({createdAt: "desc" }).limit(1)

    const courses = await Course.find({});

    totalViews= 0;
    for (let i = 0; i < courses.length; i++) {
        totalViews += courses[i].views;
    }

    stats[0].views = totalViews;

    stats[0].createdAt = new Date(Date.now());

    await stats[0].save();


})