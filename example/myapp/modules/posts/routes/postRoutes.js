const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");

router.get("/", controller.list);
router.post("/", controller.createPost);

module.exports = router;
