const express = require("express");
const { registerUser, loginUser, logoutUser, getMyProfile } = require("../controllers/userController");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

// To register a new user
router.route("/register").post(registerUser)

// Login
router.route("/login").post(loginUser);

// Logout
router.route("/logout").get(logoutUser);

// Get my Profile
router.route("/me").get( isAuthenticated ,getMyProfile);

// changePassword
// UpdateProfile
// UpdateProfilePicture

// ForgetPassword
// ResetPassword


// Add to Playlist
// Remove from Playlist

module.exports = router;