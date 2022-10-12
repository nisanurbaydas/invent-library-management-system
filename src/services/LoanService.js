const BaseService = require('./BaseService');
const BaseModel = require('../models/Loan');

class LoanService extends BaseService {
  constructor() {
    super(BaseModel);
  }
  update(data, id) {
    return this.BaseModel.update(data, { where: { bookId: id.bookId } });
  }

  findOne(where) {
    return this.BaseModel.findOne(where);
  }
}

module.exports = new LoanService();
