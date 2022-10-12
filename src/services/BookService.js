const BaseService = require('./BaseService');
const BaseModel = require('../models/Book');

class BookService extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

module.exports = new BookService();
