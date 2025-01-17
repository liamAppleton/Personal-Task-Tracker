const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { validateTask } = require('../utils');

const Task = new mongoose.model(
  'Task',
  mongoose.Schema({
    title: { type: String, minlength: 3, maxlength: 50, required: true },
    description: { type: String, minlength: 10, maxlength: 70 },
    status: { type: String },
  })
);

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    res.send(task);
  } catch (error) {
    return res.status(404).send('ID not valid');
  }
});

router.post('/', async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: 'unfinished',
    });
    task = await task.save();

    res.send(task);
  } catch (error) {
    res.status(500).send('Please enter all required fields.');
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedFields = {};
    const allowedFields = ['title', 'description', 'status'];

    for (let field of allowedFields) {
      if (req.body[field] !== undefined) {
        updatedFields[field] = req.body[field];
      }
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.send(task);
  } catch (error) {
    return res.status(404).send('ID not valid');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    res.send(task);
  } catch (error) {
    return res.status(404).send('ID not valid');
  }
});

module.exports = router;
