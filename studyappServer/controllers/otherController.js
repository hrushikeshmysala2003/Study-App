const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendEmail = require("../utils/sendEmail");
const Stats = require("../models/Stats");

exports.contact = catchAsyncError( async (req, res, next) => {
    const {name, email, message} = req.body;

    if(!name || !email || !message) return next(new ErrorHandler("All fields are mandatory", 400))
    const to = process.env.MY_MAIL;
    const subject = "Contact from courseBundler";
    const text = `I am ${name} and my Email is ${email}. \n ${message}`

    await sendEmail(to, subject, text);
    res.status(200).json({
        success: true,
        message: "Your message has been sent"
    })
} )

exports.courseRequest = catchAsyncError( async (req, res, next) => {
    const {name, email, course} = req.body;

    if(!name || !email || !course) return next(new ErrorHandler("All fields are mandatory", 400))
    const to = process.env.MY_MAIL;
    const subject = "Requesting a course on a StudyApp";
    const text = `I am ${name} and my Email is ${email}. \n ${course}`

    await sendEmail(to, subject, text);
    res.status(200).json({
        success: true,
        message: "Your request has been sent"
    })
} )

exports.getDashBoardStats = catchAsyncError( async (req, res, next) => {
    const stats = await Stats.find({}).sort({created: "desc"}).limit(12);

    // console.log(stats)
    const statsData = [];

    for(let i=0;i < stats.length; i++){
        statsData.unshift(stats[i]);
    }

    const requiredSize = 12 - stats.length;

    for (let i = 0; i < requiredSize; i++) {
        statsData.unshift({
            users: 0,
            subscription: 0,
            views: 0
        });
    }

    const userCount = statsData[11].users;
    const subscriptionCount = statsData[11].subscription;
    const viewsCount = statsData[11].views;

    let userProfit=true;
    let viewsProfit=true;
    let subscriptionProfit = true;

    let userPercent=0;
    let viewsPercent=0;
    let subscriptionPercent=0;

    if(statsData[10].users===0) userPercent=userCount * 100;
    if(statsData[10].views===0) userPercent=userCount * 100;
    if(statsData[10].subscription===0) userPercent=userCount * 100;

    else{
        const difference = {
            users: statsData[11].users - statsData[10].users,
            views: statsData[11].views - statsData[10].views,
            subscription: statsData[11].subscription - statsData[10].subscription
        };

        userPercent = (difference.users / statsData[10].users) * 100;
        viewsPercent = (difference.views / statsData[10].views) * 100;
        subscriptionPercent = (difference.subscription / statsData[10].subscription) * 100;

        if(userPercent < 0) userProfit = false;
        if(viewsPercent < 0) viewsProfit = false;
        if(subscriptionPercent < 0) subscriptionProfit = false;
    }


    res.status(200).json({
        success: true,
        stats: statsData,
        userCount,
        subscriptionCount,
        viewsCount,
        subscriptionPercent, 
        viewsPercent, 
        userPercent,
        userProfit,
        viewsProfit,
        subscriptionProfit,

    })
} )