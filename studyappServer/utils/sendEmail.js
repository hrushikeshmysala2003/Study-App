const {createTransport} = require("nodemailer");

const sendEmail = async (to, subject, text) => {

    const transporter = createTransport({
        // host: process.env.SMPT_HOST,
        // port: process.env.SMPT_PORT,
        // auth: {
        //   user: process.env.SMPT_USER,
        //   pass: process.env.SMPT_PASS   
        // }
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "7ba78c135fabc4",
            pass: "47eab781e904a6"
        }
      });

    await transporter.sendMail({
        to, subject, text
    })
}

module.exports = sendEmail;