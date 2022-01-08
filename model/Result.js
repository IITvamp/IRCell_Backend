const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Result = new Schema(
  {
    project: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    projectCtegory: {
      type: String,
    },
    status: {
      type: String,
    },
    applicationLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", Result);
