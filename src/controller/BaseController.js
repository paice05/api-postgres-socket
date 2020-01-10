const { Router } = require('express');

// middleware
const auth = require('../middleware/auth');

// utils
const { generateHash } = require('../utils/hash');

class BaseController {
  constructor(model, path) {
    this.model = model;
    this.path = path;
  }

  async index(req, res) {
    try {
      const response = await this.model.findAll();

      return res.json(response);
    } catch (error) {
      return res.json(error);
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const response = await this.model.findByPk(id);

    if (!response) return res.json({ message: 'Record not found' });

    return res.json(response);
  }

  async store(req, res) {
    if (req.body.password) {
      const password = await generateHash(req.body.password);
      req.body.password = password;
    }

    try {
      const response = await this.model.create(req.body);

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: String(error) });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    const isRecord = await this.model.findByPk(id);

    if (!isRecord) return res.json({ message: 'record not found!' });

    await this.model.update(
      { ...body },
      { where: { id } }
    );

    const response = await this.model.findByPk(id);

    return res.json(response);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const isRecord = await this.model.findByPk(id);

    if (!isRecord) return res.json({ message: 'record not found!' });

    await this.model.destroy({ where: { id } });

    return res.send();
  }

  routes() {
    const route = Router();

    route.get(this.path, this.index.bind(this));
    route.get(`${this.path}/:id`, this.show.bind(this));
    route.post(this.path, this.store.bind(this));
    route.put(`${this.path}/:id`, this.update.bind(this));
    route.delete(`${this.path}/:id`, this.destroy.bind(this));

    return route;
  }
}

module.exports = BaseController;
