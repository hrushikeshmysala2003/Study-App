const catchAsyncError = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const instance = require("../utils/instance");


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
    console.log(id, status);
    if(!id || !status) return next(new ErrorHandler("Please specify id and status"));

    user.subscription.id = id;
    user.subscription.status = status;

    await user.save();
    res.status(201).json({
        success: true,
        subscriptionId: subscription.id,
    })
})