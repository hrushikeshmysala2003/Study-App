const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { buySubscription, paymentVerification, getRazorPayKey, cancelSubscription } = require("../controllers/paymentController");

const router = express.Router();

router.route("/subscribe").get( isAuthenticated, buySubscription );

router.route("/razorpaykey").get(getRazorPayKey);

router.route("/paymentverification").post(isAuthenticated, paymentVerification);

router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);
module.exports = router; 