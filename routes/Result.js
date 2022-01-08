const router = require("express").Router();
const Project = require("../model/Project");
const User = require("../model/User");
const Result = require("../model/Result");

const { getToken, COOKIE_OPTIONS, verifyUser } = require("../authenticate");

router.post("/apply/:projectId", verifyUser, async (req, res) => {
    const user = req.user;
  const projectId = req.params.projectId;
  try {
    const project = Project.findById(projectId);
      await project.applicants.push(user._id);
      await project.save();
      await user.projects.push(projectID);
      await user.save();
      const result = {
          project : projectId,
          user : userId,
          college:"IIT Roorkee",
          status:"applied",
          projectCategory : "",
          applicationLink : "",
      }
      await result.save();
    res.status(200).json("you have applied sucessfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//update a Project
router.put("/:resultId", async (req, res) => {
  try {
      const result = await Result.findById(req.params.id);
      result.status = req.body.status;
    await result.save();
    res.status(200).json("status of the application has been modified");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
