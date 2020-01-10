const Fields = require('../models/Fields');

// base-controller
const BaseController = require('./BaseController');

class FieldController extends BaseController {
  constructor() {
    super(Fields, '/fields', 'FIELDS');
  }

  routes() {
    const route = super.routes();

    return route;
  }
}

module.exports = FieldController;
