const express = require("express");
const Todo = require("../schemas/Todos");
const router = express.Router();
const app = express();

app.use(express.json());

app.use(router);
let timeNow = new Date().toLocaleTimeString();
router.post("/add", async (req, res) => {
  const { name, description, completed } = req.body;

  try {
    const newTodo = new Todo({
      name: name,
      description: description,
      completed: completed,
    });
    await newTodo.save();
    res.status(200).json({
      message: `Todo -${name}- created with success at ${timeNow} `,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  const { _id, name, description, completed } = req.body;

  try {
    const findTodo = await Todo.findById(_id);
    if (findTodo) {
      findTodo.name = name;
      findTodo.description = description;
      findTodo.completed = completed;

      await findTodo.save();
      res.status(200).json({
        message:
          "todo updated with name:" +
          name +
          " descriptoion:" +
          description +
          " completed:" +
          completed,
      });
    } else {
      res.status(400).json({ message: "todo not found" });
    }
  } catch {
    res.status(400).json({ message: "error" });
  }
});

router.put("/delete", async (req, res) => {
  const { _id } = req.body;
  try {
    const deletedTodo = await Todo.findByIdAndRemove(_id);
    if (deletedTodo) {
      res.status(200).json({
        message: `todo with the id ${deletedTodo._id} and the name ${deletedTodo.name} deleted with success`,
      });
    } else {
      res.status(400).json({ message: "todo not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});
module.exports = router;
