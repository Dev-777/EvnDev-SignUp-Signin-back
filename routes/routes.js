const express = require("express");
const router = express.Router();
const signupTemplateCopy = require("../models/SignUpModels");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cors = require("cors");

let code = null;
let user = {};

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

router.post("/approve", cors(), async (req, res) => {
  if (code === +req.body.code) {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(user.password, saltPassword);

    const signedUpUser = new signupTemplateCopy({
      name: user.name,
      username: user.username,
      email: user.email,
      password: securePassword,
    });
    signedUpUser
      .save()
      .then(() => console.log("data added~!"))
      .catch((error) => {
        res.json(error);
      });
  }
});

router.post("/signup", cors(), (req, res) => {
  user = req.body;
  code = Math.floor(Math.random() * 1000);
  sendMailFunc(req.body.email, code);
});

router.get("/data17", cors(), (req, res) => {
  signupTemplateCopy.find().then((data) => res.json(data));
});

router.delete("/data1723/:id", cors(), (req, res) => {
  signupTemplateCopy
    .findByIdAndDelete(req.params.id)
    .then(() => res.json({ remove: true }));
});

module.exports = router;
