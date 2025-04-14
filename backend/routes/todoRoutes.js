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
    const assignedUsersData = await Users.find({
      _id: { $in: assignedUsers },
    });
    const todo = new Todo({
      title,
      description,
      tags,
      priority,
      assignedUsers: assignedUsersData,
      notes,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Todos with Pagination, Sorting, Filtering
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      tags,
      priority,
      search,
      user,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;
    const filter = {};
    if (tags) filter.tags = { $in: tags.split(",") };
    if (priority) filter.priority = priority;
    if (user) filter.assignedUsers = { $in: [user] };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const todos = await Todo.find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("assignedUsers", "username");

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/export", async (req, res) => {
  try {
    // Fetch all todos from the database
    const todos = await Todo.find().populate("assignedUsers", "username");

    const fields = [
      { label: "ID", value: "_id" },
      { label: "Title", value: "title" },
      { label: "Description", value: "description" },
      { label: "Priority", value: "priority" },
      { label: "Completed", value: "completed" },
      {
        label: "Assigned Users",
        value: (row) =>
          row.assignedUsers?.map((user) => user.username).join(", ") || "",
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

//get todo by ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).populate(
      "assignedUsers",
      "username"
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Todo
router.patch("/:id", async (req, res) => {
  try {
    const { title, description, tags, priority, completed } = req.body;
    console.log("console the request body", req.body);

    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        tags,
        priority,
        completed
      },
      { new: true }
    );
    console.log("console the updatedData", updated);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete todo by ID
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
