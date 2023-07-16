const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/userController");
const router = express.Router();

// To register a new user
router.route("/register").post(registerUser)

// Login
router.route("/login").post(loginUser);
// Logout
router.route("/logout").get(logoutUser);
// Get my Profile


// changePassword
// UpdateProfile
// UpdateProfilePicture

// ForgetPassword
// ResetPassword


// Add to Playlist
// Remove from Playlist

module.exports = router;