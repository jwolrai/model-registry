const modelHub = require("../../../modelsHub");
const postModel = modelHub.getModel("posts");
const userModel = modelHub.getModel("users"); // access another module

function list(req, res) {
    
  res.json(postModel.postModel.getAll());
}

function createPost(req, res) {
  const { userId, title } = req.body;
  if (!userId || !title) return res.status(400).json({ message: "userId and title required" });

  const user = userModel.userModel.getById(Number(userId));
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(201).json(postModel.postModel.create(Number(userId), title));
}

module.exports = { list, createPost };