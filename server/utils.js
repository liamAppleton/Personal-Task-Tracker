const Joi = require('joi');

const validateTask = (task) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50),
    description: Joi.string().min(10).max(50),
    status: Joi.string(),
  });

  return schema.validate(task);
};

module.exports = {
  validateTask,
};
