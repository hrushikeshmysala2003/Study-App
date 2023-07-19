const  { getAllCourses, createCourse, getCourseLectures, addLecture }  = require("../controllers/courseController");

const express = require("express");
const singleUpload = require("../middlewares/multer");

const router = express.Router();

router.route("/courses").get(getAllCourses);
router.route("/createcourse").post( singleUpload ,createCourse);

// Add Lecture, Delete Course, Get Course Details 
router.route("/course/:id").get(getCourseLectures);
router.route("/course/:id").post( singleUpload ,addLecture);
// Delete Lecture


module.exports = router;