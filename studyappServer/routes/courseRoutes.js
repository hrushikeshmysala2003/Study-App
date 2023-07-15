const  { getAllCourses }  = require("../controllers/courseController");

const express = require("express");

const router = express.Router();

router.route("/courses").get(getAllCourses);




module.exports = router;