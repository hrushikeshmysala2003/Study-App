const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema({
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_subscription_id: {
        type: String,
        required: true,
    },
    razorpay_signature : {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("Payment", paymentSchema);