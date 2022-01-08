const dotenv = require('dotenv');
dotenv.config();

const mongoose = require("mongoose");
const url = process.env.MONGO; 

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect
  .then((db) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
