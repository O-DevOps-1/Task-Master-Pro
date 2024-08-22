const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user._id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message }); }};



exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Emit real-time updates
    req.io.emit('taskUpdated', task);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).populate('subtasks').populate('dependencies');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};

exports.addAttachment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.attachments.push(req.body.attachmentUrl);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};
