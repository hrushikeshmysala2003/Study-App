const express = require("express");
const { registerUser, loginUser, logoutUser, getMyProfile, changePassword, updateProfile, updateProfilePicture, forgetPassword, resetPassword } = require("../controllers/userController");
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
router.route("/changepassword").put( isAuthenticated ,changePassword);

// UpdateProfile
router.route("/updateprofile").put( isAuthenticated ,updateProfile);


// UpdateProfilePicture
router.route("/updateprofilepicture").put( isAuthenticated ,updateProfilePicture);


// ForgetPassword
router.route("/forgetpassword").post( isAuthenticated ,forgetPassword);


// ResetPassword
router.route("/resetpassword/:token").put( isAuthenticated ,resetPassword);


// Add to Playlist
// Remove from Playlist

module.exports = router;