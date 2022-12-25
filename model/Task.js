const mongoose = require("mongoose");

const schema = mongoose.Schema;

const taskSchema = new schema({
  userId: { type: String, required: true },
  task: { type: String, reqired: true },
  completed: { type: Boolean },
});

module.exports = mongoose.model("TASK", taskSchema);
