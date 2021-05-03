const express = require("express");
const router = express.Router();
const signupTemplateCopy = require("../models/SignUpModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const checkoutToken = require("../middlewaree/checkoutToken");

const generateAccessToken = (id) => {
  const payload = { id };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkoutExistsUser = await signupTemplateCopy.findOne({ email });

    if (checkoutExistsUser) {
      return res.status(400).json({ message: "user Exists" });
    }
    const newUser = { ...req.body, password: bcrypt.hashSync(password, 7) };
    const addUser = new signupTemplateCopy(newUser);
    await addUser.save();
    res.json({ message: "user successfully added" });
  } catch (e) {
    // console.log(e);
    res.status(400).json({ message: "signup error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signupTemplateCopy.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: `user ${email} not found` });
    }
    const checkoutPassword = bcrypt.compareSync(password, user.password);
    if (!checkoutPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = generateAccessToken(user._id);
    return res.json({ token, lastName: user.lastName });
  } catch (e) {
    console.log("catch");
    res.status(400).json({ message: "signin error" });
  }
});
//
// router.get("/find", async (req, res) => {
//   try {
//
//   } catch (e) {
//     // console.log(e);
//     res.status(400).json({ message: "signin error" });
//   }
// });

router.post("/checkoutToken", checkoutToken, async (req, res) => {
  const usersEmails = [];
  const users = await signupTemplateCopy.find();
  users.map((i) => usersEmails.push(i.firstName));
  res.json(usersEmails);
});

module.exports = router;
