const Items = require('../models/Items');

// base-controller
const BaseController = require('./BaseController');

class ItemController extends BaseController {
  constructor() {
    super(Items, '/items', 'ITEMS');
  }

  routes() {
    const route = super.routes();

    return route;
  }
}

module.exports = ItemController;
