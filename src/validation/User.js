const Joi = require('joi');

const createUser = Joi.object({
  name: Joi.string().required().min(2).max(50),
});

module.exports = createUser;
