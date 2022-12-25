const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { getTasks, postTask } = require("./controllers/task-controller");
const taskRoute = require("./routes/task-routes");

// const PORT = 3000;
const url =
  "mongodb+srv://iamsk:iamsk@cluster0.x0xxphf.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());

app.use("/api/v1", taskRoute);

app.use((res, req, next) => {
  return next(new Error("This Route Not Found"));
});
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ message: error.message || "Route not found" });
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`Database connected and Running${process.env.PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
