import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const todoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Low' },
  completed: { type: Boolean, default: false },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [String],
  notes: [noteSchema],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Todo', todoSchema);