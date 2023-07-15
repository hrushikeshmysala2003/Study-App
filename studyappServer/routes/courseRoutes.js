const  { getAllCourses, createCourse }  = require("../controllers/courseController");

const express = require("express");

const router = express.Router();

router.route("/courses").get(getAllCourses);
router.route("/createcourse").post(createCourse);



module.exports = router;