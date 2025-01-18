const mongoose = require('mongoose');
const Joi = require('joi');

const Task = new mongoose.model(
  'Task',
  mongoose.Schema({
    title: { type: String, minlength: 3, maxlength: 50, required: true },
    description: { type: String, minlength: 10, maxlength: 70 },
    dueDate: Date,
    status: { type: String },
  })
);

const validateTask = (task) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50),
    description: Joi.string().min(10).max(50),
    dueDate: Joi.date()
      .greater('now')
      .messages({ 'date.greater': 'Due date must be in the future' }),
    status: Joi.string(),
  });

  return schema.validate(task);
};

module.exports = { Task, validateTask };
