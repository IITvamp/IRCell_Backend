"use strict";

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

mongoose.models = {};
mongoose.modelSchemas = {};

const User = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bookmarks: {
      type: Array,
      default: [],
    },
    Projects: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
