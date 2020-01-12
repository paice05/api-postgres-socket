const jwt = require('jsonwebtoken');
const { compare } = require('bcrypt');

// models
const User = require('../models/User');

// base-controller
const BaseController = require('./BaseController');

class UserController extends BaseController {
  constructor() {
    super(User, '/users', 'USERS');
  }

  async login(req, res) {
    const { username, password } = req.body;

    const isUser = await this.model.findOne({ where: { username } });

    if (!isUser) return res.status(500).json({ message: 'User not found!' });

    return compare(password, isUser.password, (err, data) => {
      if (!data) { return res.status(500).json({ message: 'Password not found!' }); }
      return jwt.sign(
        { isUser },
        process.env.SECRET_JWT,
        { expiresIn: '8d' },
        (err, token) => {
          if (err) return res.json({ message: String(err) });

          return res.json({
            token,
            user: isUser
          });
        }
      );
    });
  }

  routes() {
    const route = super.routes();

    route.post('/auth', this.login.bind(this));

    return route;
  }
}

module.exports = UserController;
