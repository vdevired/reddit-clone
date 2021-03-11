const nodemailer = require("nodemailer");

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const mailAuth = {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
};

const sendEmail = (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, // If using gmail, allow less secure apps in settings
        auth: mailAuth,
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

module.exports = {
    validateEmail,
    sendEmail,
};
