const Task = require("../model/Task");

const getTasks = (req, res, next) => {
  res.json({ taskId: 664654215, task: "Get Up Early" });
};

//POSTING TASK
const postTask = async (req, res, next) => {
  const { task, userId } = req.body;
  const newTask = new Task({
    task,
    userId,
    completed: false,
  });

  try {
    await newTask.save();
  } catch (e) {
    console.log(e);
    const error = new Error("Unable To Save Task");
    error.code = 500;
    next(error);
  }

  res.status(201).json({ message: "Saved", newTask });
};

const getSingleTask = async (req, res, next) => {
  const taskId = req.params.tid;

  let foundTask;
  try {
    foundTask = await Task.findById(taskId);
  } catch (err) {
    const error = new Error("Some Error Occured");
    error.code = 500;
    next(error);
  }

  if (!foundTask) {
    const error = new Error("Task Not Found");
    error.code = 404;
    return next(error);
  }

  res.status(200).json({ task: foundTask });
};

//UPDATING TASK
const updateTask = (req, res, next) => {
  const taskId = req.params.tid;
  const { completed, task } = req.body;

  const taskFound = Task.findById(taskId);
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.tid;
  const taskFound = await Task.findById(taskId);

  if (!taskFound) {
    const error = new Error("Task Not Found");
    error.code = 500;
    return next(error);
  }

  try {
    await taskFound.remove();
  } catch (err) {
    const error = new Error("Not able to Delete Task");
    error.code = 500;
    return next(error);
  }

  res.status(200).json({ message: "Task Deleted" });
};

exports.getSingleTask = getSingleTask;
exports.getTasks = getTasks;
exports.postTask = postTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
