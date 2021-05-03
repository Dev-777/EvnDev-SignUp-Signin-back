const jwt = require("jsonwebtoken");
// const { secret } = require("../config");

module.exports = (req, res, next) => {
  try {
    const token = req.body.token;
    if (token) {
      next();
    }
  } catch (e) {
    console.log("catch error middleware");
  }
};
