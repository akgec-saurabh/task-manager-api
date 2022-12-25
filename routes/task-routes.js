const express = require("express");
const {
  getTasks,
  postTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/task-controller");

const router = express.Router();

router.get("/tasks", getTasks);

router.post("/tasks", postTask);

router.get("/tasks/:tid", getSingleTask);

router.patch("/tasks/:tid", updateTask);

router.delete("/tasks/:tid", deleteTask);

module.exports = router;
