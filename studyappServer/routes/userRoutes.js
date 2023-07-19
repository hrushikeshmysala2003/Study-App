const express = require("express");
const { registerUser, loginUser, logoutUser, getMyProfile, changePassword, updateProfile, updateProfilePicture, forgetPassword, resetPassword, addToPlaylist, removeFromPlaylist } = require("../controllers/userController");
const {isAuthenticated} = require("../middlewares/auth");
const singleUpload = require("../middlewares/multer");
const router = express.Router();

// To register a new user
router.route("/register").post( singleUpload ,registerUser)

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
router.route("/updateprofilepicture").put( isAuthenticated, singleUpload ,updateProfilePicture);


// ForgetPassword
router.route("/forgetpassword").post( isAuthenticated ,forgetPassword);


// ResetPassword
router.route("/resetpassword/:token").put( isAuthenticated ,resetPassword);


// Add to Playlist
router.route("/addtoplaylist").post( isAuthenticated ,addToPlaylist);

// Remove from Playlist
router.route("/removefromplaylist").delete( isAuthenticated ,removeFromPlaylist);


module.exports = router;