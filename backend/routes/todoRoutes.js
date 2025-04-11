import express from "express";
import Todo from "../model/Todo.js";
import Users from "../model/Users.js";
import { Parser } from "json2csv";
const router = express.Router();

// Create todo
router.post("/", async (req, res) => {
  try {
    const { title, description, tags, priority, assignedUsers, notes } =
      req.body;
    console.log(req.body);
    const assignedUsersData  = await Users.find({
      username: { $in: assignedUsers },
    });
    const todo = new Todo({
      title,
      description,
      tags,
      priority,
      assignedUsers:assignedUsersData ,
      notes,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().populate("assignedUsers", "username");
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Delete todo by ID
router.delete('/:id', async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: 'Todo deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/export", async (req, res) => {
    try {
      const fields = [
        { label: "ID", value: "_id" },
        { label: "Title", value: "title" },
        { label: "Description", value: "description" },
        { label: "Priority", value: "priority" },
        { label: "Completed", value: "completed" },
        {
          label: "Assigned Users",
          value: row => row.assignedUsers?.map(user => user.username).join(", ") || ""
        },
        { label: "Created At", value: "createdAt" },
      ];
  
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(todos);
  
      res.header("Content-Type", "text/csv");
      res.attachment("todos.csv");
      res.send(csv);
    } catch (error) {
      console.error("Error exporting todos:", error);
      res.status(500).json({ error: "Failed to export todos" });
    }
  });
  
  
  

export default router;
