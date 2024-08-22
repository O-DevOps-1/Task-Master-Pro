const Task = require('../models/Task');
const Project = require('../models/Project');



exports.getTaskAnalytics = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'done').length;
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
    const todoTasks = tasks.filter(task => task.status === 'todo').length;

    res.json({
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};

exports.getProjectAnalytics = async (req, res) => {
  try {
    const projects = await Project.find({ users: req.user._id });
    const totalProjects = projects.length;
    const completedProjects = projects.filter(project => project.tasks.every(task => task.status === 'done')).length;

    res.json({
      totalProjects,
      completedProjects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};
