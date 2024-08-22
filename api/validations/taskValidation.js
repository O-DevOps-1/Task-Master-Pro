const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('todo', 'in-progress', 'done').default('todo'),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  deadline: Joi.date().optional(),
  subtasks: Joi.array().items(Joi.string().optional()),
  tags: Joi.array().items(Joi.string().optional()),
  dependencies: Joi.array().items(Joi.string().optional()),
});

module.exports = taskSchema;
