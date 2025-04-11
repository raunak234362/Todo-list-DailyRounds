import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Low' },
  mentionedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  notes: [noteSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Todo', todoSchema);