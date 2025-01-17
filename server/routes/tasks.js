const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const Task = new mongoose.model(
  'Task',
  mongoose.Schema({
    title: { type: String, minlength: 3, maxlength: 50, required: true },
    description: { type: String, minlength: 10, maxlength: 70 },
    status: { type: Boolean },
  })
);

module.exports = router;
