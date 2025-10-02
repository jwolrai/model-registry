const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");



router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", controller.createUser);

module.exports = router;