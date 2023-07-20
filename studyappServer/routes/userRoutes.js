const express = require("express");
const { registerUser, loginUser, logoutUser, getMyProfile, changePassword, updateProfile, updateProfilePicture, 
    forgetPassword, resetPassword, addToPlaylist, removeFromPlaylist, getAllUsers, updateUserRole, deleteUser, deleteMyProfile } = require("../controllers/userController");
const {isAuthenticated, authorizeAdmin} = require("../middlewares/auth");
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

// Delete My profile
router.route("/me").delete(isAuthenticated, deleteMyProfile)

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

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers)

router.route("/admin/user/:id").put(isAuthenticated, authorizeAdmin, updateUserRole)

router.route("/admin/user/:id").delete(isAuthenticated, authorizeAdmin, deleteUser)

module.exports = router;