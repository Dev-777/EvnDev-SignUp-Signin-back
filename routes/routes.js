const express = require("express");
const router = express.Router();
const signupTemplateCopy = require("../models/SignUpModels");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const users = [];

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

router.post("/signup", async (req, res) => {
  const code = Math.floor(Math.random() * 10000);
  const request1 = req.body;
  request1.code = code;
  users.push(request1);
  await sendMailFunc(req.body.email, code);
  await res.send({ message: "mail was sanded" }).status(200);
});

router.post("/approve", async (req, res) => {
  const foundUser = users.find((i) => {
    if (i.code === +req.body.code) {
      return i;
    }
  });
  if (foundUser) {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(foundUser.password, saltPassword);

    const signedUpUser = new signupTemplateCopy({
      name: foundUser.name,
      username: foundUser.username,
      email: foundUser.email,
      password: securePassword,
    });
    signedUpUser
      .save()
      .then(() => res.sendStatus(200))
      .then(() => console.log("data added~!"))
      .catch((error) => {
        res.json(error);
      });
  }
});
router.get("/data17", (req, res) => {
  signupTemplateCopy.find().then((data) => res.json(data));
});
router.post("/testGet", (req, res) => {
  signupTemplateCopy
    .find()
    .then((data) => {
      for (let i = 0; i < data.length; ++i) {
        if (data[i].email === req.body.email) {
          return res.json(`find bro ${data[i].name}`);
        }
      }
    })
    .then(() => res.json(false));
});
router.delete("/data1723/:id", (req, res) => {
  signupTemplateCopy
    .findByIdAndDelete(req.params.id)
    .then(() => res.json({ remove: true }));
});

module.exports = router;
