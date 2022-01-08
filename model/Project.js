const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Project = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    cg: {
      type: Number,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    bmk: {
      type: Boolean,
        required: true,
      default:false,
    },
    content: {
      type: String,
      required: true,
    },
    applicants: {
      type: String,
      default:[],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", Project);
