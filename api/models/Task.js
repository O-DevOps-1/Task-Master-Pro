const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  deadline: { type: Date },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Assign to multiple users
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  tags: [{ type: String }],
  attachments: [{ type: String }], // URLs of attached files
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
