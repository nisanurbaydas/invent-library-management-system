const express = require('express');

const validate = require('../middlewares/validate');
const createBook = require('../validation/Book');

const { index, getBookDetails, create } = require('../controllers/Book');

const router = express.Router();

//List all books
router.get('/', index);

//Get book details
router.get('/:id', getBookDetails);

//Create a new book
router.post('/', validate(createBook, 'body'), create);

module.exports = router;
