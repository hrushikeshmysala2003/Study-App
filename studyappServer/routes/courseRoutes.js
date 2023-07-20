const  { getAllCourses,  getCourseLectures, addLecture, createCourse, deleteCourse, deleteLecture }  = require("../controllers/courseController");

const express = require("express");
const singleUpload = require("../middlewares/multer");
const { isAuthenticated, authorizeAdmin, authorizeSubscribers } = require("../middlewares/auth")
const router = express.Router();

router.route("/courses").get(getAllCourses);
router.route("/createcourse").post( isAuthenticated, authorizeAdmin , singleUpload ,createCourse);

// Add Lecture, Delete Course, Get Course Details 
router.route("/course/:id").get( isAuthenticated, authorizeSubscribers, getCourseLectures);
router.route("/course/:id").post(isAuthenticated, authorizeAdmin, singleUpload ,addLecture);
router.route("/course/:id").delete(isAuthenticated, authorizeAdmin ,deleteCourse);
router.route("/lecture").delete(isAuthenticated, authorizeAdmin , deleteLecture);
// Delete Lecture


module.exports = router;