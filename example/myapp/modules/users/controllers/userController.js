const modelHub = require("../../../modelsHub");
const userModel = modelHub.getModel("users");

function list(req, res) {
  res.json(userModel.userModel.getAll());
}

function get(req, res) {
  const user = userModel.userModel.getById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}

function createUser(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name required" });
  res.status(201).json(userModel.userModel.create(name));
}

module.exports = { list, get, createUser };