const Joi = require('joi');

const createBook = Joi.object({
  name: Joi.string().required().min(2).max(50),
});

module.exports = createBook;
