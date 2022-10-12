const UserService = require('../services/UserService');
const BookService = require('../services/BookService');
const LoanService = require('../services/LoanService');

const moment = require('moment');

const index = (req, res) => {
  UserService.list()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const getUserDetails = (req, res) => {
  UserService.findByPk(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).send('No such user with that id');
      } else {
        res.status(200).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const create = (req, res) => {
  UserService.create(req.body)
    .then((response) => {
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        response,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const borrowBook = (req, res) => {
  UserService.findByPk(req.params.userId)
    .then((response) => {
      if (!response) {
        res.status(404).send('No such user with that id');
      } else {
        BookService.findByPk(req.params.bookId)
          .then((book) => {
            if (!book) {
              res.status(404).send('No such book with that id');
            } else {
              if (book.on_loan) {
                res.status(409).send('Book already on loan');
              } else {
                try {
                  LoanService.create({
                    userId: req.params.userId,
                    bookId: req.params.bookId,
                  });
                } catch (e) {
                  res.status(500).send(e.message);
                }
                var newLoanCount = book.loan_count + 1;
                console.log(newLoanCount);
                BookService.update({ on_loan: true, loan_count: newLoanCount }, { id: req.params.bookId })
                  .then((response) => {
                    res.status(200).json({
                      success: true,
                      message: 'Book borrowed successfully',
                      response,
                    });
                  })
                  .catch((error) => {
                    res.status(500).send(error.message);
                  });
              }
            }
          })
          .catch((error) => {
            res.status(404).send(error.message);
          });
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const returnBook = (req, res) => {
  BookService.findByPk(req.params.bookId)
    .then((book) => {
      if (!book.on_loan) {
        res.status(500).send('Book not borrowed');
      } else {
        LoanService.findOne({
          where: {
            userId: req.params.userId,
            bookId: req.params.bookId,
          },
        })
          .then((loan) => {
            console.log(loan.bookId);
            var returned_at = moment().format();
            var ratings = req.body.score;
            LoanService.update({ returned_at: returned_at, ratings: ratings }, { bookId: loan.bookId })
              .then((response) => {
                var loan_count = book.loan_count;
                var updatedRatings = ratings + (loan_count - 1) * book.average_rating;
                var averageRating = updatedRatings / loan_count;
                BookService.update({ average_rating: averageRating, on_loan: false }, { id: req.params.bookId });
                res.status(200).json({
                  success: true,
                  message: 'Book returned successfully',
                  response,
                });
              })
              .catch((error) => res.status(500).send(error.message));
          })
          .catch(() => {
            res.status(500).send('You do not have permission to return the book if it was not issued to you.');
          });
      }
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
};

module.exports = {
  index,
  getUserDetails,
  create,
  borrowBook,
  returnBook,
};
