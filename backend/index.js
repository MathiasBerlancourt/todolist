const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
const todoRoutes = require("./routes/todo");
app.use(todoRoutes);

mongoose.connect("mongodb://localhost:27017/todolist");
app.get("/", (req, res) => {
  res.status(200).json({ message: "connexion OK" });
});

app.listen(3000, () => {
  console.log("server started 🚦");
});
