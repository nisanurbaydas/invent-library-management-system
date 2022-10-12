const BookService = require('../services/BookService');

const index = (req, res) => {
  BookService.list()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error.message + 'b');
    });
};

const getBookDetails = (req, res) => {
  BookService.findByPk(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).send('No such book with that id');
      } else {
        res.status(200).send(response);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const create = (req, res) => {
  BookService.create(req.body)
    .then((response) => {
      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        response,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  index,
  getBookDetails,
  create,
};
