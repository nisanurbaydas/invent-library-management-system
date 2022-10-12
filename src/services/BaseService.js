BaseModel = null;

class BaseService {
  constructor(model) {
    this.BaseModel = model;
  }

  list() {
    return this.BaseModel?.findAll();
  }

  create(data) {
    return this.BaseModel.create(data);
  }

  findByPk(id) {
    return this.BaseModel.findByPk(id);
  }

  update(data, id) {
    return this.BaseModel.update(data, { where: { id: id.id } });
  }
}

module.exports = BaseService;
