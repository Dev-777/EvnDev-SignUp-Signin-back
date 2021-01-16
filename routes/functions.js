const nodemailer = require("nodemailer");

const sendMailFunc = (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arsen.ghazaryanT@gmail.com",
      pass: "Aa!234567890",
    },
  });
  const mailOptions = {
    from: "arsen.ghazaryanT@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    text: `this is the approve code\` ${code}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.sendMailFunc = sendMailFunc;
