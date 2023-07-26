const catchAsyncError = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const instance = require("../utils/instance");
const crypto = require("crypto");
const Payment = require("../models/Payment");

 
exports.buySubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if(!user) return next(new ErrorHandler("User not found", 404));
    if(!user.role==="admin") return next(new ErrorHandler("Admin can't buy subscription", 404))

    const plan_id = process.env.PLAN_ID; 

    const subscription = await instance.subscriptions.create({
        plan_id,
        customer_notify: 1,
        total_count: 12,
    })
    // console.log(subscription);
    // console.log("New one ***************")
    // console.log(instance.subscriptions);
    const id = subscription.id;
    const status = subscription.status;
    // console.log(id, status);
    if(!id || !status) return next(new ErrorHandler("Please specify id and status"));

    user.subscription.id = id;
    user.subscription.status = status;

    await user.save();
    res.status(201).json({
        success: true,
        subscriptionId: subscription.id,
    })
})

exports.paymentVerification = catchAsyncError(async (req, res, next) => {
    const {razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;
    const user = await User.findById(req.user._id);

    const subscription_id = user.subscription.id;

    const generated_signature = crypto.createHmac("sha256", 
    process.env.RAZORPAY_API_SECRET
    ).update(razorpay_payment_id+"|"+subscription_id, "utf-8")
    .digest("hex");

    const isAuthentic = generated_signature === razorpay_signature;
    if(!isAuthentic) return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`)
    
    // Database comes here
    await Payment.create({
        razorpay_signature,
        razorpay_payment_id,
        razorpay_subscription_id,
    });

    user.subscription.status="active"
    await user.save();
    
    res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`)
})

exports.getRazorPayKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_API_KEY,
    })
})

exports.cancelSubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    const subscriptionId = user.subscription.id;

    let refund = false;

    await instance.subscriptions.cancel(subscriptionId);

    const payment = await Payment.findOne({
        razorpay_subscription_id: subscriptionId,
    })

    const gap = Date.now()-payment.createdAt;

    const refundTime = process.env.REFUND_DAYS * 24*60*60*1000

    if(refundTime > gap) {
        await instance.payments.refund(payment.razorpay_payment_id);
        refund = true;
    }

    await Payment.deleteOne(payment);
    user.subscription.id = undefined;
    user.subscription.status = undefined;

    await user.save();
    res.status(200).json({
        success: true,
        message:  refund?"Subscription cancelled, You will receive full refund within 7 days"
        :"Subscription cancelled, No refund initiated as subscription was cancelled after 7 days."
    })
})