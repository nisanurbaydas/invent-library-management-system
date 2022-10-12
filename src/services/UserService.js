const BaseService = require('./BaseService');
const BaseModel = require('../models/User');
const Book = require('../models/Book');

class UserService extends BaseService {
  constructor() {
    super(BaseModel);
  }
  list() {
    return this.BaseModel?.findAll({
      include: [
        {
          model: Book, // include data from Book model
          attributes: ['name', 'average_rating', 'on_loan'], // include only these fields
          group: 'on_loan',
          through: {
            attributes: ['loaned_at', 'ratings'], // include these fields from Loan model
          },
        },
      ],
    });
  }
  findByPk(id) {
    return this.BaseModel.findByPk(id, {
      include: [
        {
          model: Book, // include data from Book model
          attributes: ['name', 'average_rating', 'on_loan'], // include only these fields
          group: 'on_loan',
          through: {
            attributes: ['loaned_at', 'ratings'], // include these fields from Loan model
          },
        },
      ],
    });
  }
}

module.exports = new UserService();
