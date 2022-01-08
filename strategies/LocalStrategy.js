const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");

passport.use(new LocalStrategy("local", User.authenticate()));

passport.serializeUser(User.serializeUser());
