const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = express.Router();

const app = express();

app.use(express.json());
app.use(router);
mongoose.connect("mongodb://localhost:27017/todolist");
app.get("/", (req, res) => {
  res.status(200).json({ message: "connexion OK" });
});

app.listen(3000, () => {
  console.log("server started 🚦");
});
