const express = require('express');
const app = express();

const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");

const userRoute = require("./routes/User");
const authRoute = require("./routes/Auth");
const projectRoute = require("./routes/Project");
const resultRoute = require("./routes/Result");


require("./utils/db");
require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");

dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());


app.use("/images", express.static(path.join(__dirname, "public/resume")));


var PORT = process.env.PORT || 8081;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/uploadFile", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/project", projectRoute); 
app.use("/result", resultRoute);

app.listen(PORT, () => {
    console.log("backend surver is running on localhost" + PORT);
});
