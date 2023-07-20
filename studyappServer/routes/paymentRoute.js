const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { buySubscription } = require("../controllers/paymentController");

const router = express.Router();

router.route("/subscribe").get( isAuthenticated, buySubscription );


module.exports = router;