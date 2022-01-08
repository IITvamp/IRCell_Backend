const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.COOKIE_OPTIONS = {
  httpOnly: true,
  signed: true,
  sameSite: "none",
};

exports.getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

exports.verifyUser = passport.authenticate("jwt", { session: false });
