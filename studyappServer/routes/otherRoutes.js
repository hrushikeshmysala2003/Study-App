const express = require("express");
const {isAuthenticated, authorizeAdmin} = require("../middlewares/auth");
const { contact, courseRequest, getDashBoardStats } = require("../controllers/otherController");
const router = express.Router();

// Contact Form
router.route("/contact").post(contact);

// Request form
router.route("/courserequest").post(courseRequest);

// Get admin dashboard Stats
router.route("/admin/stats").get(isAuthenticated, authorizeAdmin, getDashBoardStats)


module.exports = router;