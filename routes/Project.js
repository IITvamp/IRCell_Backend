const router = require("express").Router();
const Project = require("../model/Project");
const User = require("../model/User");

const { verifyUser } = require("../authenticate");

router.get("/projects", async (req, res) => {
  try {
    const Projects = await Project.find();
    res.status(200).json(Projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a Project
router.post("/", async (req, res) => {
  const newProject = new Project(req.body);
  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//update a Project
router.put("/:id", async (req, res) => {
  try {
    const Project = await Project.findById(req.params.id);
      await Project.updateOne({ $set: req.body });
      res.status(200).json("the Project has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a Project
router.delete("/:id", async (req, res) => {
  try {
    const Project = await Project.findById(req.params.id);
    await Project.deleteOne();
    if (Project.userId === req.body.userId) {
      await Project.deleteOne();
      res.status(200).json("the Project has been deleted");
    } else {
      res.status(403).json("you can delete only your Project");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a Project
router.get("/:id", async (req, res) => {
  try {
    const Project = await Project.findById(req.params.id);
    res.status(200).json(Project);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/bookmark",verifyUser,  async (req, res) => {
  try {
      const user = req.user;
      const Projects = user.bookmarks;
    console.log(Projects);

    await Projects.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    });

    res.status(200).json(Projects);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put(
  "/profile/:userId/bookmarks/:projectId/add",
  verifyUser,
  async (req, res) => {
    try {
      const user = await req.user;
      const ProjectId = req.params.projectId;
      user.bookmarks.push(ProjectId);
      const newUser = await user.save();
      res.status(200).json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.delete(":projectId/removeBookmark", verifyUser, async (req, res) => {
  try {
    const user = req.user;
    const ProjectId = req.params.projectId;
    user.bookmarks.filter((project) => {
      project !== ProjectId;
    });
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
