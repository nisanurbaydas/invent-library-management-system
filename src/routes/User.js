const express = require('express');

const validate = require('../middlewares/validate');
const createUser = require('../validation/User');

const { index, getUserDetails, create, borrowBook, returnBook } = require('../controllers/User');

const router = express.Router();

//List all users
router.get('/', index);

//Get user details
router.get('/:id', getUserDetails);

//Create a new user
router.post('/', validate(createUser, 'body'), create);

//Borrow a book
router.post('/:userId/borrow/:bookId', borrowBook);

//Return borrowed book
router.post('/:userId/return/:bookId', returnBook);

module.exports = router;
