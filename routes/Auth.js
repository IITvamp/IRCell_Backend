const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");
const {
  getToken,
  COOKIE_OPTIONS,
  verifyUser,
} = require("../authenticate");

router.post("/signup", (req, res, next) => {
  console.log("signup called");
  console.log(req.body.firstname);
    var user = new User({
      username: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    });

    User.register(user,req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.send(err);
      } else {
        console.log(user);
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname || "";
        const token = getToken({ _id: user._id });
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.cookie("token", token, COOKIE_OPTIONS);
            res.send({ success: true, token });
          }
        });
      }
    });
  
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
    try {
        const token = getToken({ _id: req.user._id });
        res.cookie("token", token, COOKIE_OPTIONS);
        res.status(200).send({ success: true, token, token });
    } catch (error) {
        res.status(404).send("doesnt exist");
    }
});


router.get("/logout", verifyUser, (req, res, next) => {
    try {
        res.clearCookie("token", COOKIE_OPTIONS);
        res.send({ success: true }); 
    } catch (error) {
        res.status(500).send("some error ocurred");
    }
});

module.exports = router;
