const mongoose = require('mongoose');
const Joi = require('joi');

const User = new mongoose.model(
  'User',
  mongoose.Schema({
    username: { type: String, minlength: 3, maxlength: 15, required: true },
    password: { type: String, minlength: 8, maxlength: 20 },
  })
);

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(8).max(20),
  });

  return schema.validate(user);
};

module.exports = { User, validateUser };
