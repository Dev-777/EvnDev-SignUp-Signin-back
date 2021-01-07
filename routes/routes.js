const express = require("express");
const router = express.Router();
const signupTemplateCopy = require("../models/SignUpModels");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

let code = null;
let user;

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
  transporter
    .sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    })
    .catch((err) => console.log(err));
};

router.post("/approve", async (req, res) => {
  if (code === +res.code) {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(user.password, saltPassword);

    const signedUpUser = new signupTemplateCopy({
      name: user.name,
      username: user.username,
      email: user.email,
      password: securePassword,
    });
    signedUpUser.save().catch((error) => {
      res.json(error);
    });
  }
});

router.post("/signup", async (req, res) => {
  user = req;
  code = Math.floor(Math.random() * 10);
  await sendMailFunc(req.email, code);
});

router.get("/data17", (req, res) => {
  signupTemplateCopy
    .find()
    .then((data) => res.json(data))
    .then(() => sendMailFunc());
});

router.delete("/data1723/:id", (req, res) => {
  signupTemplateCopy
    .findByIdAndDelete(req.params.id)
    .then(() => res.json({ remove: true }));
});

module.exports = router;
