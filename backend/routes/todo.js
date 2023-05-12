const express = require("express");
const Todo = require("../schemas/Todos");
const router = express.Router();
const app = express();

app.use(express.json());

app.use(router);
let timeNow = new Date();

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  const { name, description, completed } = req.body;

  try {
    const newTodo = new Todo({
      name: name,
      description: description,
      completed: false,
    });
    await newTodo.save();
    res.status(200).json({
      message: `Todo -${name}- created with success  ${timeNow} `,
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
        timeNow,
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
        message: `todo with the id ${deletedTodo._id} and the name ${deletedTodo.name} deleted with success  ${timeNow}`,
      });
    } else {
      res.status(400).json({ message: "todo not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.put("/complete", async (req, res) => {
  const { _id, completed } = req.body;
  try {
    const completeTodo = await Todo.findById(_id);
    if (completeTodo) {
      completeTodo.completed = !completed;
      await completeTodo.save();
      res.status(200).json({
        message: `todo with the id ${completeTodo._id} and the name ${completeTodo.name} set his status completed to ${completeTodo.completed}  ${timeNow}`,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

router.put("/removeAll", async (req, res) => {
  try {
    const deletedAll = await Todo.deleteMany();
    res.status(200).json({
      message: `all todos deleted with success  ${timeNow}`,
    });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});
module.exports = router;
