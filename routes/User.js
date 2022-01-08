const router = require("express").Router();
const User = require("../model/User");

const { getToken, COOKIE_OPTIONS, verifyUser } = require("../authenticate");

router.get("/userDetails", verifyUser, (req, res) => {
  res.send(req.user);
});

// router.delete("/:id", verifyUser, async (req, res) => {
//   const user = req.user;
//   const id = user._id;
//   try {
//     await User.findByIdAndDelete(id);
//     res.status(200).json("Account has been deleted");
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

module.exports = router;
